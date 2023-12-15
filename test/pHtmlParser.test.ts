import { pHtmlParser } from "../src/pHtmlParser";

function toObject(obj: any): any {
  if (obj instanceof Array) {
    return obj.map(toObject);
  } else if (obj instanceof Object) {
    const res: any = {};
    for (const [k, v] of Object.entries(obj)) {
      if (k == "_parent") continue;
      if (k == "parentNode") continue;
      if (k == "parentElement") continue;
      res[k] = toObject(v);
    }
    return res;
  }
  return obj;
}

describe("pHtmlParser", () => {
  test("parse", () => {
    const html = `<a><b></b><c/></a><d><e/><f/></d>`;
    const node = new pHtmlParser().parse(html);
    // console.log(JSON.stringify(node, null, 2));
    expect(node.outerHTML).toBe(html);
  });

  test("inner text", () => {
    const html = `<a><b>x</b><c/></a>`;
    const node = new pHtmlParser().parse(html);
    // console.log(JSON.stringify(node, null, 2));
    expect(node.outerHTML).toBe(html);
  });

  test("preserve tag's trail space ", () => {
    const html = `<a><b ></b ><c  /></a>`;
    const node = new pHtmlParser().parse(html);
    // console.log(JSON.stringify(node, null, 2));
    expect(node.outerHTML).toBe(html);
  });

  test("parse trail string", () => {
    const html = `<a><b ></b ><c  /></a>text`;
    const node = new pHtmlParser().parse(html);
    // console.log(JSON.stringify(node, null, 2));
    expect(node.outerHTML).toBe(html);
  });
  
  test("simple attribute", () => {
    const html = `<a><b x="a"></b><c/></a>`;
    const node = new pHtmlParser().parse(html);
    // console.log(JSON.stringify(node, null, 2));
    expect(node.outerHTML).toBe(html);
  });
  test("preserve head space", () => {
    const html = `<a  x="a"/>`;
    const node = new pHtmlParser().parse(html);
    // console.log(JSON.stringify(node, null, 2));
    expect(node.outerHTML).toBe(html);
  });

  test("preserve head space", () => {
    const html = `<a  x="a"  y="b"/>`;
    const node = new pHtmlParser().parse(html);
    // console.log(JSON.stringify(node, null, 2));
    expect(node.outerHTML).toBe(html);
  });
  
  test("preserve quoteless attribute", () => {
    const html = `<a x=a y=b/>`;
    const node = new pHtmlParser().parse(html);
    // console.log(JSON.stringify(node, null, 2));
    expect(node.outerHTML).toBe(html);
  });

  test("preserve self closing tag", () => {
    const html = `<a/><b/>`;
    const node = new pHtmlParser().parse(html);
    node.querySelector("a")!.innerHTML = "inner";
    const tmpChild = node.createElement("inner");
    node.querySelector("b")!.appendChild(tmpChild);
    expect(node.outerHTML).toBe(`<a>inner</a><b><inner></inner></b>`);
    node.querySelector("a")!.innerHTML = "";
    node.querySelector("b")!.removeChild(tmpChild);
    expect(node.outerHTML).toBe(html);
  });

  test("new line", () => {
    const html = `<a>
    <b></b>
    <c/>
    </a>
    <d>
    <e/><f/>
    </d>`;
    const node = new pHtmlParser().parse(html);
    // console.log(JSON.stringify(node, null, 2));
    expect(node.outerHTML).toBe(html);
  });

  test("skip comment", () => {
    const html = `<a>
    <b></b>
    <!--comment-->
    <c/>
    </a>`;
    const expected = `<a>
    <b></b>
    
    <c/>
    </a>`;
    const node = new pHtmlParser({skipComment: true}).parse(html);
    // console.log(JSON.stringify(node, null, 2));
    expect(node.outerHTML).toBe(expected);
  });

  test("preserve comment", () => {
    const html = `<a>
    <b></b>
    <!--comment-->
    <c/>
    </a>`;
    const node = new pHtmlParser().parse(html);
    // console.log(JSON.stringify(node, null, 2));
    expect(node.outerHTML).toBe(html);
  });

  test("incorrect closing - 1", () => {
    const html = `<a><b><a></d><e/><f/></d>`;
    const node = new pHtmlParser().parse(html);
    // console.log(JSON.stringify(node, null, 2));
    expect(node.outerHTML).toBe(html);
  });

  test("unclosing tag - 1", () => {
    const html = `<a><input><input2></a>`;
    const node = new pHtmlParser().parse(html);
    // console.log(JSON.stringify(node, null, 2));
    expect(node.outerHTML).toBe(`<a><input><input2></a>`);
  });

  test("unclosing tag - 2", ()=>{
    const html = `			<form onsubmit="return false;">
    <input type="text" value="News, Quotes, Companies, Videos" class="hdrSearchInput unUsed" id="globalHeaderSearchInput" autocomplete="off" size="28">
    <button class="hdrSearchBtn" type="button">SEARCH</button>
  </form>`;
    const node = new pHtmlParser({skipComment: false}).parse(html, );
    // console.log(JSON.stringify(node, null, 2));
    expect(node.toString()).toBe(html);
    expect(node.range).toStrictEqual({
      startOpenTag: 0,
      endOpenTag: 0,
      startCloseTag: html.length,
      endCloseTag: html.length,
    })
    expect(node.childNodes[1].range).toStrictEqual({
      startOpenTag: 3,
      endOpenTag: 34,
      startCloseTag: 252,
      endCloseTag: 259,
    })  

  })

  test("skip code in script tag", ()=>{
    const html = `			<form onsubmit="return false;">
    <input type="text" value="News, Quotes, Companies, Videos" class="hdrSearchInput unUsed" id="globalHeaderSearchInput" autocomplete="off" size="28">
    <script>
    encodeURI('<iframe width="562" height="316" src="http://'+"www.pcworld.com"+'/video/iframe/26362/iframe.html" frameborder="0" allowfullscreen></iframe>')
    </script>
    <button class="hdrSearchBtn" type="button">SEARCH</button>
  </form>`;
    const node = new pHtmlParser({skipComment: false}).parse(html, );
    // console.log(JSON.stringify(node, null, 2));
    expect(node.toString()).toBe(html);
    expect(node.querySelector("iframe")).toBe(null);
  })

  test("incorrect script tag", ()=>{
    const html = `			<form onsubmit="return false;">
    <input type="text" value="News, Quotes, Companies, Videos" class="hdrSearchInput unUsed" id="globalHeaderSearchInput" autocomplete="off" size="28">
    <script>
    encodeURI('<iframe width="562" height="316" src="http://'+"www.pcworld.com"+'/video/iframe/26362/iframe.html" frameborder="0" allowfullscreen></iframe>')
    <button class="hdrSearchBtn" type="button">SEARCH</button>
  </form>`;
    const node = new pHtmlParser({skipComment: false}).parse(html, );
    // console.log(JSON.stringify(node, null, 2));
    expect(node.toString()).toBe(html);
    expect(node.querySelector("iframe")).not.toBe(null);
    expect(node.querySelector("script")?.childNodes.length).toBe(0);

  })

});
