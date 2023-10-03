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

describe("", () => {
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
    const node = new pHtmlParser().parse(html);
    // console.log(JSON.stringify(node, null, 2));
    expect(node.outerHTML).toBe(expected);
  });

  test("preserve comment", () => {
    const html = `<a>
    <b></b>
    <!--comment-->
    <c/>
    </a>`;
    const node = new pHtmlParser({skipComment: false}).parse(html);
    // console.log(JSON.stringify(node, null, 2));
    expect(node.outerHTML).toBe(html);
  });

  test("incorrect closing1", () => {
    const html = `<a><b><a></d><e/><f/></d>`;
    const node = new pHtmlParser().parse(html);
    // console.log(JSON.stringify(node, null, 2));
    expect(node.outerHTML).toBe(html);
  });

  test("incorrect closing2", () => {
    const html = `<a><input><input2></a>`;
    const node = new pHtmlParser().parse(html);
    // console.log(JSON.stringify(node, null, 2));
    expect(node.outerHTML).toBe(`<a><input><input2></a>`);
  });
});
