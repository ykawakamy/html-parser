// import { PHtmlElement } from "model";
// import { PHtmlNode } from "model/PHtmlNode";
import { pHtmlParser } from "../../src/pHtmlParser";
import { PHtmlElement } from "../../src/model/PHtmlElement";
import { PHtmlNode } from "../../src/model/PHtmlNode";

describe("PHtmlNode", () => {
  describe("firstChild", () => {
    test("not found", () => {
      const node = new PHtmlNode("rawText", undefined, new pHtmlParser());
      expect(node.firstChild).toBe(null);
    });
    test("found", () => {
      const node = new PHtmlNode("rawText", undefined, new pHtmlParser());
      const firstNode = new PHtmlNode("firstNode", undefined, new pHtmlParser());
      const seconrdNode = new PHtmlNode("seconrdNode", undefined, new pHtmlParser());
      node.appendChild(firstNode)
      node.appendChild(seconrdNode)
      expect(node.firstChild).toBe(firstNode);
    });
  });
  describe("lastChild", () => {
    test("not found", () => {
      const node = new PHtmlNode("rawText", undefined, new pHtmlParser());
      expect(node.lastChild).toBe(null);
    });
    test("found", () => {
      const node = new PHtmlNode("rawText", undefined, new pHtmlParser());
      const firstNode = new PHtmlNode("firstNode", undefined, new pHtmlParser());
      const seconrdNode = new PHtmlNode("seconrdNode", undefined, new pHtmlParser());
      node.appendChild(firstNode)
      node.appendChild(seconrdNode)
      expect(node.lastChild).toBe(seconrdNode);
    });
  });

  describe("nextSibling/previousSibling", () => {
    test("no parent", () => {
      const node = new PHtmlNode("rawText", undefined, new pHtmlParser());
      expect(node.previousSibling).toBe(null);
      expect(node.nextSibling).toBe(null);
    });
    test("no previousSibling", () => {
      const node = new PHtmlNode("rawText", undefined, new pHtmlParser());
      const firstNode = new PHtmlNode("firstNode", undefined, new pHtmlParser());
      const seconrdNode = new PHtmlNode("seconrdNode", undefined, new pHtmlParser());
      node.appendChild(firstNode)
      node.appendChild(seconrdNode)
      expect(firstNode.nextSibling).toBe(seconrdNode);
      expect(firstNode.previousSibling).toBe(null);
    });
    test("no nextSibling", () => {
      const node = new PHtmlNode("rawText", undefined, new pHtmlParser());
      const firstNode = new PHtmlNode("firstNode", undefined, new pHtmlParser());
      const seconrdNode = new PHtmlNode("seconrdNode", undefined, new pHtmlParser());
      node.appendChild(firstNode)
      node.appendChild(seconrdNode)
      expect(seconrdNode.nextSibling).toBe(null);
      expect(seconrdNode.previousSibling).toBe(firstNode);
    });
  });

  describe("parentNode/parentElement", () => {
    test("not found", () => {
      const node = new PHtmlNode("rawText", undefined, new pHtmlParser());
      expect(node.parentNode).toBe(null);
      expect(node.parentElement).toBe(null);
    });
    test("parentNode found", () => {
      const node = new PHtmlNode("rawText", undefined, new pHtmlParser());
      const firstNode = new PHtmlElement("firstNode", undefined, undefined, false, "",new pHtmlParser());
      const seconrdNode = new PHtmlNode("seconrdNode", undefined, new pHtmlParser());
      node.appendChild(firstNode)
      node.appendChild(seconrdNode)
      expect(firstNode.parentNode).toBe(node);
      expect(firstNode.parentElement).toBe(null);
      expect(seconrdNode.parentNode).toBe(node);
      expect(seconrdNode.parentElement).toBe(null);
    });
    test("parentElement found", () => {
      const node = new PHtmlElement("rawText", undefined, undefined, false, "", new pHtmlParser());
      const firstNode = new PHtmlElement("firstNode", undefined, undefined, false, "", new pHtmlParser());
      const seconrdNode = new PHtmlNode("seconrdNode", undefined, new pHtmlParser());
      node.appendChild(firstNode)
      node.appendChild(seconrdNode)
      expect(firstNode.parentNode).toBe(node);
      expect(firstNode.parentElement).toBe(node);
      expect(seconrdNode.parentNode).toBe(node);
      expect(seconrdNode.parentElement).toBe(node);
    });
  });

  describe("cloneNode", () => {
    test("PHtmlNode clone", () => {
      const node = new PHtmlNode("rawText", undefined, new pHtmlParser());
      const clone = node.cloneNode();
      expect(clone).not.toBe(node);
      expect(clone.outerHTML).toBe(node.outerHTML);
    });
    test("PHtmlElement clone", () => {
      const node = new PHtmlElement("rawText", undefined, undefined, false, "", new pHtmlParser());
      const clone = node.cloneNode();
      expect(clone).not.toBe(node);
      expect(clone.outerHTML).toBe(node.outerHTML);
    });
    test("nested element clone", () => {
      const node = new PHtmlElement("rawText", undefined, undefined, false, "", new pHtmlParser());
      const firstNode = new PHtmlElement("firstNode", undefined, undefined, false, "", new pHtmlParser());
      const seconrdNode = new PHtmlNode("seconrdNode", undefined, new pHtmlParser());

      const clone = node.cloneNode();
      expect(clone).not.toBe(node);
      expect(clone.outerHTML).toBe(node.outerHTML);
    });
  });

  describe("removeChild", () => {
    test("not child", () => {
      const node = new PHtmlNode("rawText", undefined, new pHtmlParser());
      const notChild = new PHtmlNode("notChild", undefined, new pHtmlParser());
      node.removeChild(notChild);
      expect(node.childNodes.length).toBe(0);
      expect(notChild.parentNode).toBe(null);
    });
    test("remove child", () => {
      const node = new PHtmlNode("rawText", undefined, new pHtmlParser());
      const firstNode = new PHtmlNode("firstNode", undefined, new pHtmlParser());
      const seconrdNode = new PHtmlNode("seconrdNode", undefined, new pHtmlParser());
      node.appendChild(firstNode)
      node.appendChild(seconrdNode)

      node.removeChild(firstNode)
      
      expect(node.childNodes.length).toBe(1);
      expect(firstNode.parentNode).toBe(null);
    });
  });
  
  describe("insertBefore", () => {
    test("insert newChild before oldChild", () => {
      const node = new PHtmlNode("rawText", undefined, new pHtmlParser());
      const oldChild = new PHtmlNode("oldChild", undefined, new pHtmlParser());
      const newChild = new PHtmlNode("newChild", undefined, new pHtmlParser());

      node.appendChild(oldChild);
      node.insertBefore(newChild, oldChild);
      expect(node.childNodes.length).toBe(2);
      expect(oldChild.previousSibling).toBe(newChild);
      expect(newChild.parentNode).toBe(node);
    });
    test("when refNode is null, append last", () => {
      const node = new PHtmlNode("rawText", undefined, new pHtmlParser());
      const oldChild = new PHtmlNode("oldChild", undefined, new pHtmlParser());
      const newChild = new PHtmlNode("newChild", undefined, new pHtmlParser());

      node.appendChild(oldChild);
      node.insertBefore(newChild, null);
      expect(node.childNodes.length).toBe(2);
      expect(oldChild.nextSibling).toBe(newChild);
      expect(newChild.parentNode).toBe(node);
    });
  });

  describe("replaceChild", () => {
    test("replace unreach node", () => {
      const node = new PHtmlNode("rawText", undefined, new pHtmlParser());
      const oldChild = new PHtmlNode("oldChild", undefined, new pHtmlParser());
      const newChild = new PHtmlNode("newChild", undefined, new pHtmlParser());

      node.appendChild(oldChild);
      node.replaceChild(newChild, oldChild);
      expect(node.childNodes.length).toBe(1);
      expect(oldChild.parentNode).toBe(null);
      expect(newChild.parentNode).toBe(node);
    });
    test("same parent", () => {
      const node = new PHtmlNode("rawText", undefined, new pHtmlParser());
      const oldChild = new PHtmlNode("oldChild", undefined, new pHtmlParser());
      const newChild = new PHtmlNode("newChild", undefined, new pHtmlParser());

      node.appendChild(oldChild);
      node.appendChild(newChild);
      node.replaceChild(newChild, oldChild);
      expect(node.childNodes.length).toBe(1);
      expect(oldChild.parentNode).toBe(null);
      expect(newChild.parentNode).toBe(node);
    });
  });
  test("test", ()=>{
    const html = `
		<ul>
		<li>
			<ul>
			<li>file1</li>
			<li>file2</li>
			</ul>
		</li>
		<li>file3</li>
		</ul>
		<ul>
		<li>file4</li>
		<li>file5</li>
		</ul>
		`
		const queryExpr = "ul:has(li)";
		const replaceExpr = `
		`;
		const expected = `
		<ul>
		
		<li>file3</li>
		</ul><li>
			<ul>
			<li>file1</li>
			<li>file2</li>
			</ul>
		</li>
		<ul>
		
		<li>file5</li>
		</ul><li>file4</li>
		`;
    const root = new pHtmlParser().parse(html);
    const uls = root.querySelectorAll(queryExpr);
    for( const $ of uls){
      var s = $.querySelector("li")!;
      $.removeChild(s);
      $.insertAdjacentHTML("afterend", s.outerHTML);
    }

    expect(root.outerHTML).toBe(expected);

  });
  
});
