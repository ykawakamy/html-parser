import { PHtmlRawAttributes } from "model/PHtmlAttributes";

describe("PHtmlAttributes", () => {
  describe("add", () => {
    test("add a attribute", () => {
      const attr = new PHtmlRawAttributes();
      attr.add("a", "aval", ` a="aval"`);
      expect(attr.getAttributeText()).toBe(` a="aval"`);
    });

    test("add two attributes of same name", () => {
      const attr = new PHtmlRawAttributes();
      attr.add("a", "aval", ` a="aval"`);
      attr.add("a", "aval2", ` a="aval2"`);
      expect(attr.getAttributeText()).toBe(` a="aval" a="aval2"`);
    });

    test("preserve single quote", () => {
      const attr = new PHtmlRawAttributes();
      attr.add("a", 'a"val', ` a='a"val'`);
      expect(attr.getAttributeText()).toBe(` a='a\"val'`);
      expect(attr.get("a")).toBe(`a"val`);
    });

    test("preserve double quote", () => {
      const attr = new PHtmlRawAttributes();
      attr.add("a", "a'val", ` a="a'val"`);
      expect(attr.getAttributeText()).toBe(` a="a'val"`);
      expect(attr.get("a")).toBe(`a'val`);
    });
  });
  test("remove two attributes of same name", () => {
    const attr = new PHtmlRawAttributes();
    attr.add("a", "aval", ` a="aval"`);
    attr.add("a", "aval2", ` a="aval2"`);
    attr.add("b", "aval3", ` b="aval3"`);
    attr.remove("a");
    expect(attr.getAttributeText()).toBe(` b="aval3"`);
  });

  describe("set", () => {
    test("set exist key", () => {
      const attr = new PHtmlRawAttributes();
      attr.add("a", "aval", ` a="aval"`);
      attr.add("a", "aval2", ` a="aval2"`);
      attr.add("b", "aval3", ` b="aval3"`);
      attr.set("a", "newval");
      expect(attr.getAttributeText()).toBe(` a="newval" b="aval3"`);
    });

    test("preserve double quote", () => {
      const attr = new PHtmlRawAttributes();
      attr.set("a", 'a"val');
      expect(attr.getAttributeText()).toBe(` a="a&#x22;val"`);
      expect(attr.get("a")).toBe(`a"val`);
    });

    test("preserve single quote", () => {
      const attr = new PHtmlRawAttributes();
      attr.set("a", "a'val");
      expect(attr.getAttributeText()).toBe(` a="a&#x27;val"`);
      expect(attr.get("a")).toBe(`a'val`);
    });

    test("set different-case key", () => {
      const attr = new PHtmlRawAttributes();
      attr.add("a", "aval", ` a="aval"`);
      attr.add("a", "aval2", ` a="aval2"`);
      attr.add("B", "aval3", ` b="aval3"`);
      attr.set("A", "newval");
      attr.set("b", "newval2");
      expect(attr.getAttributeText()).toBe(` A="newval" b="newval2"`);
    });
  });
});
