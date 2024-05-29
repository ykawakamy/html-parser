import _ = require("lodash");
import { IPHtmlRawAttributes } from "../interface";
import * as he from "he";
import { PHtmlParser, pHtmlParserDefault } from "../pHtmlParser";

interface internalAttribute {
  0: string;
  1: string;
  2: string | undefined;
}
export class PHtmlRawAttributes implements IPHtmlRawAttributes {
  constructor(private _parser: PHtmlParser = pHtmlParserDefault){
  }

  get length(): number {
    return this.items.length;
  }
  items: internalAttribute[] = [];

  add(key: string, attr: string, attrWithKey: string): void {
    this.items.push([key, attr, attrWithKey]);
  }
  remove(key: string, index?: number | undefined): void {
    this.items = this.items.filter(_.negate(this.keyMatcher(key)));
  }
  set(key: string, attr: string): void {
    const escaped = he.encode(attr);
    const rawAttr = escaped ? ` ${key}="${escaped}"` : ` ${key}`;

    const index = this.items.findIndex(this.keyMatcher(key));
    if (index != -1) {
      // NOTE: remove many same key
      this.remove(key);
      this.items.splice(index, 0, [key, attr, rawAttr]);
    } else {
      this.add(key, attr, rawAttr);
    }
  }

  get(key: string): string | undefined {
    const attr = this.items.find(this.keyMatcher(key));
    if (!attr) return undefined;
    return attr[1];
  }

  has(key: string): boolean {
    const attr = this.items.find(this.keyMatcher(key));
    return !!attr;
  }

  getAttributeText() {
    return this.items
      .map((v) => {
        return v[2];
      })
      .join("");
  }

  private keyMatcher(key: string) {
    return (v: internalAttribute) => this._parser.caseNormalize(v[0]) == this._parser.caseNormalize(key);
  }
}

