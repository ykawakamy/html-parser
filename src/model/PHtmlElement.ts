import * as CSSselect from "css-select";
import * as he from 'he';
import * as _ from "lodash";
import {
  IPHtmlClassList,
  IPHtmlElement,
  IPHtmlNode,
  IPHtmlRange,
  IPHtmlRawAttributes,
  InsertPosition
} from "../interface";
import { PHtmlParser } from "../pHtmlParser";
import { PHtmlRawAttributes } from "./PHtmlAttributes";
import { PHtmlClassList } from "./PHtmlClassList";
import { PHtmlNode } from "./PHtmlNode";

export class PHtmlElement extends PHtmlNode implements IPHtmlElement {
  _rawCloseTag: string | undefined;
  _attributes: IPHtmlRawAttributes;
  private _classList: IPHtmlClassList;

  constructor(
    private _tagName: string,
    _parent: IPHtmlNode | undefined,
    _attributes: IPHtmlRawAttributes | undefined,
    private _selfClosing: boolean,
    private _trailSpace: string,
    _parser: PHtmlParser,
    _range: IPHtmlRange = undefined,
  ) {
    super(undefined, _parent, _parser, _range, "element");
    this._attributes = _attributes ?? new PHtmlRawAttributes(_parser);
    this._classList = new PHtmlClassList(this);
  }
  get rawAttributes(): IPHtmlRawAttributes {
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
  insertAdjacentHTML(position: InsertPosition, text: string): void {
    const node = this._parser.parse(text);
    if(!this.parentNode){
      throw new Error();
    }
    switch(_.toLower(position)){
      case 'beforebegin':{
        const idx = this.parentNode.childNodes.findIndex((v)=>v===this);
        node.childNodes.forEach(v=>v.setParent(this.parentNode))
        this.parentNode.childNodes.splice(idx, 0, ...node.childNodes);
        break;
      }
      case "afterbegin":{
        node.childNodes.forEach(v=>v.setParent(this))
        this.childNodes.unshift(...node.childNodes);
        break;
      }
      case "beforeend":{
        node.childNodes.forEach(v=>v.setParent(this))
        this.childNodes.push(...node.childNodes);
        break;
      }
      case "afterend":{
        const idx = this.parentNode.childNodes.findIndex((v)=>v===this);
        node.childNodes.forEach(v=>v.setParent(this.parentNode))
        this.parentNode.childNodes.splice(idx+1, 0, ...node.childNodes);
        break;

      }
    }
  }
  insertAdjacentText(position: InsertPosition, text: string): void {
    if(!this.parentNode){
      throw new Error();
    }
    let heText = he.encode(text, {useNamedReferences:true});
    switch(_.toLower(position)){
      case 'beforebegin':{
        const node = new PHtmlNode(heText, this.parentNode, this._parser);
        const idx = this.parentNode.childNodes.findIndex((v)=>v===this);
        this.parentNode.childNodes.splice(idx, 0, node);
        break;
      }
      case "afterbegin":{
        const node = new PHtmlNode(heText, this.parentNode, this._parser);
        this.childNodes.unshift(node);
        break;
      }
      case "beforeend":{
        const node = new PHtmlNode(heText, this.parentNode, this._parser);
        this.childNodes.push(node);
        break;
      }
      case "afterend":{
        const node = new PHtmlNode(heText, this.parentNode, this._parser);
        const idx = this.parentNode.childNodes.findIndex((v)=>v===this);
        this.parentNode.childNodes.splice(idx+1, 0, node);
        break;

      }
    }
  }
  querySelector(query: string): IPHtmlElement | null {
    const result = CSSselect.selectOne(query, this, this._parser.cssSelectOption);
    return (result instanceof PHtmlElement && result) || null;
  }
  querySelectorAll(query: string): readonly IPHtmlElement[] {
    const result = CSSselect.selectAll(query, this, this._parser.cssSelectOption);
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
          tmp.push(new PHtmlNode(node, this._parent, this._parser));
        } else {
          tmp.push(node);
          node.setParent(this._parent);
        }
      }
      this._parent.childNodes.splice(index, 1, ...tmp);
    }
  }
  setAttribute(name: string, value: string): void {
    this._attributes.set(name, value);
    //
    if (this._parser.caseNormalize(name) === "class") {
      this._classList = new PHtmlClassList(this);
    }
  }

  toString(): string {
    const tagName = this.tagName;
    const attrText = this._attributes.length > 0 ? ` ...${this._attributes.length}` : "";
    const childCount = this.childNodes.length;
    if (this._selfClosing && childCount == 0) {
      return `<${tagName}${attrText}/>`;
    }
    if ( childCount > 0 ){
      return `<${this._tagName}${attrText}>...${childCount}`;
    }
    return `<${this._tagName}${attrText}>`;
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

  // get range(){
  //   const tagName = this.tagName;
  //   if (tagName) {
  //     const attrText = this._attributes.getAttributeText();
  //     if (this._selfClosing && this.childNodes.length == 0) {
  //       const endOpenTag = tagName.length + attrText.length + this._trailSpace.length + 3;
  //       return {
  //         startOpenTag: 0,
  //         endOpenTag: endOpenTag,
  //         startCloseTag: endOpenTag,
  //         endCloseTag: endOpenTag,
  //       }
  //     }
  //     const innerHTML = this.innerHTML;
  //     const closeTag = this._rawCloseTag || `</${tagName}>`;
  //     const endOpenTag = tagName.length + attrText.length + this._trailSpace.length + 2;
  //     return {
  //       startOpenTag: 0,
  //       endOpenTag: endOpenTag,
  //       startCloseTag: endOpenTag + innerHTML.length,
  //       endCloseTag: endOpenTag + innerHTML.length + closeTag.length,
  //     }
  // } else {
  //     return {
  //       startOpenTag: 0,
  //       endOpenTag: 0,
  //       startCloseTag: this.innerHTML.length,
  //       endCloseTag: this.innerHTML.length,
  //     }
  //   }
  // }
}
