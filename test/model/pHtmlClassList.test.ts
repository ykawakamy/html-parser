// import { PHtmlAttributes } from "model";

import { PHtmlParser } from "pHtmlParser";

describe("PHtmlAttributes", () => {
  describe("add", () => {
    test("add class to tag without class attr.", () => {
      const html = `<a>`;
      const aNode = new PHtmlParser().parse(html).children[0];
      aNode.classList.add("className");
      expect(aNode.outerHTML).toBe(`<a class="className">`);
      aNode.classList.add("className2");
      expect(aNode.outerHTML).toBe(`<a class="className className2">`);
    });

    test("add class to tag with class attr.", () => {
      const html = `<a class="className">`;
      const aNode = new PHtmlParser().parse(html).children[0];
      aNode.classList.add("className2");
      expect(aNode.outerHTML).toBe(`<a class="className className2">`);
    });

    test("add class to tag with ahead space", () => {
      const html = `<a class=" className">`;
      const aNode = new PHtmlParser().parse(html).children[0];
      aNode.classList.add("className2");
      expect(aNode.outerHTML).toBe(`<a class="className className2">`);
    });

    test("add class to tag with trail space", () => {
      const html = `<a class="className ">`;
      const aNode = new PHtmlParser().parse(html).children[0];
      aNode.classList.add("className2");
      expect(aNode.outerHTML).toBe(`<a class="className className2">`);
    });
  });

  describe("remove", () => {
    test("remove class to tag without class", () => {
      const html = `<a>`;
      const aNode = new PHtmlParser().parse(html).children[0];
      aNode.classList.add("className");
      expect(aNode.outerHTML).toBe(`<a class="className">`);
      aNode.classList.remove("className");
      expect(aNode.outerHTML).toBe(`<a class>`);
    });

    test("remove class to tag with class", () => {
      const html = `<a class="className">`;
      const aNode = new PHtmlParser().parse(html).children[0];
      aNode.classList.remove("className");
      expect(aNode.outerHTML).toBe(`<a class>`);
    });

    test("remove class to tag with ahead space", () => {
      const html = `<a class=" className className2">`;
      const aNode = new PHtmlParser().parse(html).children[0];
      aNode.classList.remove("className2");
      expect(aNode.outerHTML).toBe(`<a class="className">`);
    });

    test("add class to tag with trail space", () => {
      const html = `<a class="className ">`;
      const aNode = new PHtmlParser().parse(html).children[0];
      aNode.classList.add("className2");
      expect(aNode.outerHTML).toBe(`<a class="className className2">`);
    });
  });

  describe("item", () => {
    test("no attr.", () => {
      const html = `<a>`;
      const aNode = new PHtmlParser().parse(html).children[0];
      expect(aNode.classList.item(0)).toBeNull();
      expect(aNode.classList.item(1)).toBeNull();
    });

    test("empty value.", () => {
      const html = `<a class="">`;
      const aNode = new PHtmlParser().parse(html).children[0];
      expect(aNode.classList.item(0)).toBeNull();
      expect(aNode.classList.item(1)).toBeNull();
    });

    test("no value", () => {
      const html = `<a class>`;
      const aNode = new PHtmlParser().parse(html).children[0];
      expect(aNode.classList.item(0)).toBeNull();
      expect(aNode.classList.item(1)).toBeNull();
    });

    test("single value", () => {
      const html = `<a class="className">`;
      const aNode = new PHtmlParser().parse(html).children[0];
      expect(aNode.classList.item(0)).toBe("className");
    });


  });

  describe("replace", () => {
    test("not exist attribute value.", () => {
      const html = `<a>`;
      const aNode = new PHtmlParser().parse(html).children[0];
      expect(aNode.classList.replace("noexist", "unreplace")).toBeFalsy();
      expect(aNode.outerHTML).toBe(`<a>`);
    });

    test("exist attribute value.", () => {
      const html = `<a class="exist">`;
      const aNode = new PHtmlParser().parse(html).children[0];
      expect(aNode.classList.replace("exist", "replaced")).toBeTruthy();
      expect(aNode.outerHTML).toBe(`<a class="replaced">`);
    });
  });
  
  describe("supports", () => {
    test("'support' is not support.", () => {
      const html = `<a>`;
      const aNode = new PHtmlParser().parse(html).children[0];
      expect(aNode.classList.supports("")).toBeFalsy();
    });
  });

  describe("toggle", () => {
    test("'not exist", () => {
      const html = `<a>`;
      const aNode = new PHtmlParser().parse(html).children[0];
      expect(aNode.classList.toggle("toggleon")).toBeTruthy();
      expect(aNode.outerHTML).toBe(`<a class="toggleon">`);
      expect(aNode.classList.toggle("toggleon")).toBeFalsy();
      expect(aNode.outerHTML).toBe(`<a class>`);
    });

    test("'force=true", () => {
      const html = `<a>`;
      const aNode = new PHtmlParser().parse(html).children[0];
      expect(aNode.classList.toggle("toggleon", true)).toBeTruthy();
      expect(aNode.outerHTML).toBe(`<a class="toggleon">`);
      expect(aNode.classList.toggle("toggleon", true)).toBeTruthy();
      expect(aNode.outerHTML).toBe(`<a class="toggleon">`);
    });

    test("'force=false", () => {
      const html = `<a class="toggleon">`;
      const aNode = new PHtmlParser().parse(html).children[0];
      expect(aNode.classList.toggle("toggleon", false)).toBeFalsy();
      expect(aNode.outerHTML).toBe(`<a class>`);
      expect(aNode.classList.toggle("toggleon", false)).toBeFalsy();
      expect(aNode.outerHTML).toBe(`<a class>`);
    });
  });

  describe("toString", () => {
    test("'", () => {
      const html = `<a class="tostring">`;
      const aNode = new PHtmlParser().parse(html).children[0];
      expect(aNode.classList.toString()).toBe("tostring");
    });
  });
});
