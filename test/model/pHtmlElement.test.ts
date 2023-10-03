// import { PHtml, PHtmlElement, PHtmlNode } from "model";
import { pHtmlParser } from "../../src/pHtmlParser";
import { PHtmlDocument } from "./PHtmlDocument";
import { PHtmlElement } from "../../src/model/PHtmlElement";
import { PHtmlNode } from "../../src/model/PHtmlNode";

describe("PHtmlElement", () => {
  test("tagName", () => {
    const node = new PHtmlElement("tag", undefined, undefined, false, "", new pHtmlParser());
    expect(node.tagName).toBe("tag");
  });

  describe("attributes", () => {
    test("no attributes", () => {
      const document = new pHtmlParser().parse(`<a/>`);
      expect(document.children[0].rawAttributes!.length).toBe(0);
    });
    test("attributes", () => {
      const document = new pHtmlParser().parse(`<a attr1="1" attr2="2" />`);
      expect(document.children[0].rawAttributes!.length).toBe(2);
    });
  });

  describe("getAttribute/hasAttribute", () => {
    test("no attributes", () => {
      const document = new pHtmlParser().parse(`<a/>`);
      const aNode = document.children[0];
      expect(aNode.getAttribute("attr1")).toBe(null);
      expect(aNode.rawAttributes?.length).toBe(0);
    });
    test("attributes", () => {
      const document = new pHtmlParser().parse(`<a attr1="1"  attr2='2' attr3=3 attr4 />`);
      const aNode = document.children[0];
      expect(aNode.getAttribute("attr1")).toBe("1");
      expect(aNode.getAttribute("attr2")).toBe("2");
      expect(aNode.getAttribute("attr3")).toBe("3");
      expect(aNode.hasAttribute("attr4")).toBe(true);
      expect(aNode.getAttribute("attr4")).toBe(null);
      expect(aNode.rawAttributes?.length).toBe(4);
      expect(aNode.rawAttributes?.getAttributeText()).toBe(` attr1="1"  attr2='2' attr3=3 attr4`);
    });
  });

  describe("setAttribute", () => {
    test("when no attributes", () => {
      const document = new pHtmlParser().parse(`<a/>`);
      const aNode = document.children[0];
      aNode.setAttribute("attr1", "1")
      expect(aNode.getAttribute("attr1")).toBe("1");
      expect(document.outerHTML).toBe(`<a attr1="1"/>`);
    });
    test("overwrite attribute", () => {
      const document = new pHtmlParser().parse(`<a attr1="1" attr2="2" />`);
      const aNode = document.children[0];
      aNode.setAttribute("attr1", "overwrite")
      expect(aNode.getAttribute("attr1")).toBe("overwrite");
      expect(document.outerHTML).toBe(`<a attr1="overwrite" attr2="2" />`);
    });
    test("overwrite single quoted attribute", () => {
      const document = new pHtmlParser().parse(`<a attr1='1' attr2="2" />`);
      const aNode = document.children[0];
      aNode.setAttribute("attr1", "overwrite")
      expect(aNode.getAttribute("attr1")).toBe("overwrite");
      expect(document.outerHTML).toBe(`<a attr1="overwrite" attr2="2" />`);
    });
    test("overwrite attribute with head space", () => {
      const document = new pHtmlParser().parse(`<a  attr1='1'  attr2="2" />`);
      const aNode = document.children[0];
      aNode.setAttribute("attr1", "overwrite")
      expect(aNode.getAttribute("attr1")).toBe("overwrite");
      expect(document.outerHTML).toBe(`<a attr1="overwrite"  attr2="2" />`);
    });
    test("overwrite quoteless attribute", () => {
      const document = new pHtmlParser().parse(`<a attr1=1  attr2="2" />`);
      const aNode = document.children[0];
      aNode.setAttribute("attr1", "overwrite")
      expect(aNode.getAttribute("attr1")).toBe("overwrite");
      expect(document.outerHTML).toBe(`<a attr1="overwrite"  attr2="2" />`);
    });
    test("overwrite valueless attribute", () => {
      const document = new pHtmlParser().parse(`<a attr1  attr2="2" />`);
      const aNode = document.children[0];
      aNode.setAttribute("attr1", "overwrite")
      expect(aNode.getAttribute("attr1")).toBe("overwrite");
      expect(document.outerHTML).toBe(`<a attr1="overwrite"  attr2="2" />`);
    });

    test("overwrite with a valueless attribute", () => {
      const document = new pHtmlParser().parse(`<a attr1="1"  attr2="2" />`);
      const aNode = document.children[0];
      aNode.setAttribute("attr1", "")
      expect(aNode.getAttribute("attr1")).toBe("");
      expect(document.outerHTML).toBe(`<a attr1  attr2="2" />`);
    });
  });

  describe("setAttribute", () => {
    test("not found", () => {
      const document = new pHtmlParser().parse(`<a/>`);
      const aNode = document.children[0];
      aNode.removeAttribute("attr1")
      expect(aNode.hasAttribute("attr1")).toBe(false);
      expect(document.outerHTML).toBe(`<a/>`);
    });
    test("found", () => {
      const document = new pHtmlParser().parse(`<a attr1='1' attr2="2" />`);
      const aNode = document.children[0];
      aNode.removeAttribute("attr1")
      expect(aNode.hasAttribute("attr1")).toBe(false);
      expect(document.outerHTML).toBe(`<a attr2="2" />`);
    });
    test("found", () => {
      const document = new pHtmlParser().parse(`<a attr1='1' attr2="2" attr1='3'/>`);
      const aNode = document.children[0];
      aNode.removeAttribute("attr1")
      expect(aNode.hasAttribute("attr1")).toBe(false);
      expect(document.outerHTML).toBe(`<a attr2="2"/>`);
    });
    test("preserve dirty attributes", () => {
      const document = new pHtmlParser().parse(`<a attr1="1"  attr2='2'  attr3=3  attr4 />`);
      const aNode = document.children[0];
      aNode.removeAttribute("attr1")
      expect(aNode.hasAttribute("attr1")).toBe(false);
      expect(document.outerHTML).toBe(`<a  attr2='2'  attr3=3  attr4 />`);
    });
  });

  describe("querySelector/All", () => {
    test('query specific tag', function () {
      const document = new pHtmlParser().parse(`<div><a attr1="1"  attr2='2' attr3=3 attr4>1</a><a>2</a><a attr1="5"/><b/></div>`);
      const selector = 'a';
      const elements = document.querySelectorAll(selector);
      const element = document.querySelector(selector);
      expect(elements[0].innerHTML).toBe('1');
      expect(elements[1].innerHTML).toBe('2');
      expect(elements[2].innerHTML).toBe('');;

      expect(elements[0]).toBe(element);
    });
    test('query with parameter', function () {
      const document = new pHtmlParser().parse(`<div><a attr1="1"  attr2='2' attr3=3 attr4>1</a><a>2</a><a attr1="5"/><b/></div>`);
      const selector = 'a[attr1]';
      const elements = document.querySelectorAll(selector);
      const element = document.querySelector(selector);
      expect(elements[0].innerHTML).toBe('1');
      expect(elements[1].innerHTML).toBe('');;

      expect(elements[0]).toBe(element);
    });

    test('query nested tag', function () {
      const document = new pHtmlParser().parse(`<div><a attr1="1"  attr2='2' attr3=3 attr4>1</a><a>2</a><a attr1="5"/><b/></div>`);
      const selector = 'div a';
      const elements = document.querySelectorAll(selector);
      const element = document.querySelector(selector);
      expect(elements[0].innerHTML).toBe('1');
      expect(elements[1].innerHTML).toBe('2');
      expect(elements[2].innerHTML).toBe('');;

      expect(elements[0]).toBe(element);
    });

    test('query adjacent sibiling tag', function () {
      const document = new pHtmlParser().parse(`<div><a attr1="1"  attr2='2' attr3=3 attr4>1</a><a>2</a><a attr1="5"/><b/></div>`);
      const selector = 'a + a';
      const elements = document.querySelectorAll(selector);
      const element = document.querySelector(selector);
      expect(elements[0].innerHTML).toBe('2');
      expect(elements[1].innerHTML).toBe('');;

      expect(elements[0]).toBe(element);
    });

    test('query general sibiling tag', function () {
      const document = new pHtmlParser().parse(`<div><a attr1="1"  attr2='2' attr3=3 attr4>1</a><a>2</a><a attr1="5"/><b/></div>`);
      const selector = 'a ~ a';
      const elements = document.querySelectorAll(selector);
      const element = document.querySelector(selector);
      expect(elements[0].innerHTML).toBe('2');
      expect(elements[1].innerHTML).toBe('');;

      expect(elements[0]).toBe(element);
    });

    test('query pasedo-selector', function () {
      const document = new pHtmlParser().parse(`<div><a/><b><a/></b></div>`);
      const selector = 'div:has(b)';
      const elements = document.querySelectorAll(selector);
      const element = document.querySelector(selector);
      expect(elements[0].innerHTML).toBe('<a/><b><a/></b>');

      expect(elements[0]).toBe(element);
    });

    test('query general sibiling tag', function () {
      const document = new pHtmlParser().parse(`<div><a attr1="1"  attr2='2' attr3=3 attr4>1</a><a>2</a><a attr1="5"/><b/></div>`);
      const selector = 'a:contains("1")';
      const elements = document.querySelectorAll(selector);
      const element = document.querySelector(selector);
      expect(elements[0].innerHTML).toBe('1');

      expect(elements[0]).toBe(element);
    });


  });

  describe("replaceChildren", () => {
    test("clear children", () => {
      const node: PHtmlDocument = <PHtmlDocument>new pHtmlParser().parse(`<a/>`);
      const first = new PHtmlNode("first", undefined, new pHtmlParser());
      const second = new PHtmlNode("second", undefined, new pHtmlParser());

      const aNode = node.children[0];
      aNode.appendChild(first);
      aNode.appendChild(second);
      aNode.replaceChildren();
      expect(aNode.childNodes.length).toBe(0);
      expect(first.parentNode).toBe(null);
      expect(second.parentNode).toBe(null);
    });
    test("replace node", () => {
      const node = new pHtmlParser().parse(`<a><b/><c/></a>`);
      const aNode = node.children[0];
      const first = new PHtmlNode("first", undefined, new pHtmlParser());
      const second = new PHtmlNode("second", undefined, new pHtmlParser());

      aNode!.replaceChildren(first, second);
      expect(aNode.childNodes.length).toBe(2);
      expect(aNode.childNodes[0]).toBe(first);
      expect(aNode.childNodes[1]).toBe(second);
    });

    test("replace string", () => {
      const node = new pHtmlParser().parse(`<a><b/><c/></a>`);
      const aNode = node.children[0];

      aNode.replaceChildren("text1","text2");
      expect(aNode.childNodes.length).toBe(2);
      expect(aNode.childNodes[0].outerHTML).toBe("text1");
      expect(aNode.childNodes[1].outerHTML).toBe("text2");
    });

  });

  describe("replaceWith", () => {
    test("clear", () => {
      const node = new pHtmlParser().parse(`<a><b/><c/></a>`);
      const aNode = node.childNodes[0];
      const target = node.querySelector("b");
      target!.replaceWith();
      expect(aNode.childNodes.length).toBe(1);
      expect(aNode.outerHTML).toBe("<a><c/></a>");
    });
    test("replace node", () => {
      const node = new pHtmlParser().parse(`<a><b/><c/></a>`);
      const aNode = node.childNodes[0];
      const first = new PHtmlNode("first", undefined, new pHtmlParser());
      const second = new PHtmlElement("second", undefined, undefined, true, "", new pHtmlParser());

      const target = node.querySelector("b");
      target!.replaceWith(first, second);
      expect(aNode.outerHTML).toBe("<a>first<second/><c/></a>");
      expect(aNode.childNodes.length).toBe(3);
      expect(aNode.childNodes[0]).toBe(first);
      expect(aNode.childNodes[1]).toBe(second);
    });

    test("replace string", () => {
      const node = new pHtmlParser().parse(`<a><b/><c/></a>`);
      const aNode = node.childNodes[0];
      const target = node.querySelector("b");
      target!.replaceWith("first", "second");
      expect(aNode.outerHTML).toBe("<a>firstsecond<c/></a>");
      expect(aNode.childNodes.length).toBe(3);
    });

  });

  describe("classList", () => {
    test("no class", () => {
      const node = new pHtmlParser().parse(`<a><b/><c/></a>`);
      const aNode = node.childNodes[0];
      const target = node.querySelector("b");
      expect([...target!.classList]).toStrictEqual([]);
      expect(target!.getAttribute("class"))!.toStrictEqual(null);
    });
    test("single class", () => {
      const node = new pHtmlParser().parse(`<a><b class="cls1"/><c/></a>`);
      const aNode = node.childNodes[0];
      const target = node.querySelector("b");
      expect([...target!.classList]).toStrictEqual(["cls1"]);
      expect(target!.getAttribute("class"))!.toStrictEqual("cls1");
    });

    test("many classes", () => {
      const node = new pHtmlParser().parse(`<a><b class="cls1 cls2"/><c/></a>`);
      const aNode = node.childNodes[0];
      const target = node.querySelector("b");
      expect([...target!.classList]).toStrictEqual(["cls1", "cls2"]);
      expect(target!.getAttribute("class"))!.toStrictEqual("cls1 cls2");
    });

    test("add class", () => {
      const node = new pHtmlParser().parse(`<a><b class="cls1 cls2"/><c/></a>`);
      const aNode = node.childNodes[0];
      const target = node.querySelector("b");
      target!.classList.add("cls3");
      expect([...target!.classList]).toStrictEqual(["cls1", "cls2", "cls3"]);
      expect(target!.getAttribute("class"))!.toStrictEqual("cls1 cls2 cls3");
    });

    test("setAttribute class", () => {
      const node = new pHtmlParser().parse(`<a><b class="cls1 cls2"/><c/></a>`);
      const aNode = node.childNodes[0];
      const target = node.querySelector("b");
      target!.setAttribute("class", "cls3  cls4");
      expect([...target!.classList]).toStrictEqual(["cls3", "cls4"]);
      expect(target!.getAttribute("class"))!.toStrictEqual("cls3  cls4");
    });
  });

  describe("set outerHTML", () => {
    test("clear", () => {
      const node = new pHtmlParser().parse(`<a><b><c/></b></a>`);
      const aNode = node.children[0];
      aNode!.outerHTML = "";
      expect(node.outerHTML).toBe("");
      expect(node.childNodes.length).toBe(0);
    });
    test("replace node", () => {
      const node = new pHtmlParser().parse(`<a><b><c/></b></a>`);
      const aNode = node.children[0];
      aNode!.outerHTML = "<r1>text</r1><r2/>";
      expect(node.outerHTML).toBe("<r1>text</r1><r2/>");
      expect(node.childNodes.length).toBe(2);
    });

    test("replace string", () => {
      const node = new pHtmlParser().parse(`<a><b/><c/></a>`);
      const aNode = node.children[0];
      const target = node.querySelector("b");
      target!.outerHTML = "<r1>text</r1><r2/>";
      expect(node.outerHTML).toBe("<a><r1>text</r1><r2/><c/></a>");
    });

  });

  describe("set innerHTML", () => {
    test("clear", () => {
      const node = new pHtmlParser().parse(`<a><b><c/></b></a>`);
      const aNode = node.children[0];
      aNode!.innerHTML = "";
      expect(node.outerHTML).toBe("<a></a>");
    });
    test("replace node", () => {
      const node = new pHtmlParser().parse(`<a><b><c/></b></a>`);
      const aNode = node.children[0];
      aNode!.innerHTML = "<r1>text</r1><r2/>";
      expect(node.outerHTML).toBe("<a><r1>text</r1><r2/></a>");
    });

    test("replace string", () => {
      const node = new pHtmlParser().parse(`<a><b/><c/></a>`);
      const target = node.querySelector("b");
      target!.innerHTML = "<r1>text</r1><r2/>";
      expect(node.outerHTML).toBe("<a><b><r1>text</r1><r2/></b><c/></a>");
    });

  });
});
