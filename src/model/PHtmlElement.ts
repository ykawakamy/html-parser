import {
  IPHtmlAttributes,
  IPHtmlClassList,
  IPHtmlElement,
  IPHtmlNode
} from "../interface";
import * as CSSselect from "css-select";
import { pHtmlParser } from "../pHtmlParser";
import { adaptor } from "../PHtmlCssSelectAdaptor";
import { PHtmlNode } from "./PHtmlNode";
import { PHtmlAttributes } from "./PHtmlAttributes";
import { PHtmlClassList } from "./PHtmlClassList";
// import { PHtmlNode, PHtmlAttributes, PHtmlClassList} from "../model";

export class PHtmlElement extends PHtmlNode implements IPHtmlElement {
  _rawCloseTag: string | undefined;
  _attributes: IPHtmlAttributes;
  private _classList: IPHtmlClassList;

  constructor(
    private _tagName: string,
    _parent: PHtmlNode | undefined,
    _attributes: IPHtmlAttributes | undefined,
    private _selfClosing: boolean,
    private _trailSpace: string,
    _parser: pHtmlParser
  ) {
    super(undefined, _parent, _parser, "element");
    this._attributes = _attributes ?? new PHtmlAttributes();
    this._classList = new PHtmlClassList(this);
  }
  get rawAttributes(): IPHtmlAttributes {
    return this._attributes;
  }
  get tagName(): string {
    return this._tagName;
  }
  get children(): IPHtmlElement[] {
    return this._childNodes.filter(
      (v) => v instanceof PHtmlElement
    ) as IPHtmlElement[];
  }
  get classList(): IPHtmlClassList {
    return this._classList;
  }
  get innerHTML(): string {
    const innerHTML = this._childNodes.map((v) => v.outerHTML).join("");
    return innerHTML;
  }
  set innerHTML(html: string) {
    this.replaceChildren(...this._parser.parse(html).childNodes);
  }
  getAttribute(name: string): string | null {
    return this._attributes.get(name) ?? null;
  }

  hasAttribute(name: string): boolean {
    return this._attributes.has(name);
  }
  querySelector(query: string): IPHtmlElement | null {
    const result = CSSselect.selectOne(query, this, {
      xmlMode: true,
      adapter: adaptor,
    });
    return (result instanceof PHtmlElement && result) || null;
  }
  querySelectorAll(query: string): readonly IPHtmlElement[] {
    const result = CSSselect.selectAll(query, this, {
      xmlMode: true,
      adapter: adaptor,
    });
    return result as IPHtmlElement[];
  }

  removeAttribute(name: string): void {
    this._attributes.remove(name);
  }
  replaceChildren(...nodes: (string | IPHtmlNode)[]): void {
    // this._childNodes.forEach(v=>this.removeChild(v));
    this._childNodes.forEach((v) => v.setParent(null));
    this._childNodes = [];
    for (const node of nodes) {
      if (typeof node === "string") {
        this.appendChild(new PHtmlNode(node, this, this._parser));
      } else {
        this.appendChild(node);
      }
    }
  }
  replaceWith(...nodes: (string | IPHtmlNode)[]): void {
    if (!this._parent) {
      return;
    }
    const index = this._parent.childNodes.findIndex((v) => v === this);
    if (index != -1) {
      const tmp = [];
      for (const node of nodes) {
        if (typeof node === "string") {
          tmp.push(new PHtmlNode(node, this, this._parser));
        } else {
          tmp.push(node);
        }
      }
      this._parent.childNodes.splice(index, 1, ...tmp);
    }
  }
  setAttribute(name: string, value: string): void {
    this._attributes.set(name, value);
    //
    if (name === "class") {
      this._classList = new PHtmlClassList(this);
    }
  }

  toString(): string {
    return this.outerHTML;
  }

  get outerHTML(): string {
    const tagName = this.tagName;
    if (tagName) {
      const attrText = this._attributes.getAttributeText();
      if (this._selfClosing && this.childNodes.length == 0) {
        return `<${tagName}${attrText}${this._trailSpace}/>`;
      }
      const innerHTML = this.innerHTML;
      const closeTag = this._rawCloseTag;
      if (closeTag !== undefined) {
        return `<${tagName}${attrText}${this._trailSpace}>${innerHTML}${closeTag}`;
      } else {
        return `<${tagName}${attrText}${this._trailSpace}>${innerHTML}</${tagName}>`;
      }
    } else {
      const innerHTML = this.innerHTML;
      return innerHTML;
    }
  }
  set outerHTML(html: string) {
    const root = this._parser.parse(html);
    this.replaceWith(...root.childNodes);
  }

  get range(){
    const tagName = this.tagName;
    if (tagName) {
      const attrText = this._attributes.getAttributeText();
      if (this._selfClosing && this.childNodes.length == 0) {
        const endOpenTag = tagName.length + attrText.length + this._trailSpace.length + 3;
        return {
          startOpenTag: 0,
          endOpenTag: endOpenTag,
          startCloseTag: endOpenTag,
          endCloseTag: endOpenTag,
        }
      }
      const innerHTML = this.innerHTML;
      const closeTag = this._rawCloseTag || `</${tagName}>`;
      const endOpenTag = tagName.length + attrText.length + this._trailSpace.length + 2;
      return {
        startOpenTag: 0,
        endOpenTag: endOpenTag,
        startCloseTag: endOpenTag + innerHTML.length,
        endCloseTag: endOpenTag + innerHTML.length + closeTag.length,
      }
  } else {
      return {
        startOpenTag: 0,
        endOpenTag: 0,
        startCloseTag: this.innerHTML.length,
        endCloseTag: this.innerHTML.length,
      }
    }
  }
}
