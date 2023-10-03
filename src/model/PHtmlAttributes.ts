import { IPHtmlAttributes } from "../interface";
import * as he from "he";


export class PHtmlAttributes implements IPHtmlAttributes {
  get length(): number {
    return this.items.length;
  }
  items: { 0: string; 1: string; 2: string | undefined; }[] = [];

  add(key: string, attr: string, attrWithKey: string): void {
    this.items.push([key, attr, attrWithKey]);
  }
  remove(key: string, index?: number | undefined): void {
    this.items = this.items.filter((k) => k[0] !== key);
  }
  set(key: string, attr: string): void {
    const escaped = he.encode(attr);
    const rawAttr = escaped ? ` ${key}="${escaped}"` : ` ${key}`;

    const index = this.items.findIndex((v) => v[0] == key);
    if (index != -1) {
      this.remove(key);
      this.items.splice(index, 0, [key, attr, rawAttr]);
    } else {
      this.add(key, attr, rawAttr);
    }
  }

  get(key: string): string | undefined {
    const attr = this.items.find((v) => v[0] == key);
    if (!attr) return undefined;
    return attr[1];
  }

  has(key: string): boolean {
    const attr = this.items.find((v) => v[0] == key);
    return !!attr;
  }

  getAttributeText() {
    return this.items
      .map((v) => {
        return v[2];
      })
      .join("");
  }
}
