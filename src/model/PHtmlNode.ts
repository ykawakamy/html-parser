import {
  IPHtmlElement,
  IPHtmlNode,
  IPHtmlNodeList
} from "../interface";
import { pHtmlParser } from "../pHtmlParser";
// XXX avoid runtime error. "Class extends value undefined is not a constructor or null". maybe circular reference.
// import { PHtmlElement } from "./PHtmlElement";

export class PHtmlNode implements IPHtmlNode {
  protected _childNodes: IPHtmlNode[] = [];

  constructor(
    private _rawText: string | undefined,
    protected _parent: IPHtmlNode | undefined | null,
    protected _parser: pHtmlParser,
    public _type: string = "node",
  ) { }
  get outerHTML(): string {
    return this._rawText ?? "";
  }
  get childNodes(): IPHtmlNodeList {
    return this._childNodes;
  }
  get firstChild(): IPHtmlNode | null {
    return this._childNodes[0] ?? null;
  }
  get lastChild(): IPHtmlNode | null {
    return this._childNodes[this._childNodes.length - 1] ?? null;
  }
  get nextSibling(): IPHtmlNode | null {
    if (!this._parent) {
      return null;
    }
    const index = this._parent.childNodes.findIndex((v) => v === this) + 1;
    if (index < this._parent.childNodes.length) {
      return this._parent.childNodes[index];
    }
    return null;
  }
  get parentNode(): IPHtmlNode | null {
    return this._parent ?? null;
  }
  get parentElement(): IPHtmlElement | null {
    if (this._parent?.constructor.name === 'PHtmlElement') {
      return this._parent as IPHtmlElement ?? null;
    }
    return null;
  }
  get previousSibling(): IPHtmlNode | null {
    if (!this._parent) {
      return null;
    }
    const index = this._parent.childNodes.findIndex((v) => v === this) - 1;
    if (0 <= index) {
      return this._parent.childNodes[index];
    }
    return null;
  }
  appendChild(node: IPHtmlNode): void {
    node.setParent(this);
    this._childNodes.push(node);
  }
  cloneNode(): IPHtmlNode {
    return this._parser.parse(this.outerHTML);
  }
  insertBefore(node: IPHtmlNode, refNode: IPHtmlNode | null): void {
    const index = this.childNodes.findIndex((v) => v === refNode);
    if (0 <= index) {
      this.childNodes.splice(index, 0, node);
      node.setParent(this);
    } else {
      this.appendChild(node);
    }
    return;
  }
  removeChild(node: IPHtmlNode): void {
    const index = this.childNodes.findIndex((v) => v === node);
    if (0 <= index) {
      this.childNodes.splice(index, 1);
      node.setParent(null);
    }
    return;
  }
  replaceChild(newNode: IPHtmlNode, oldNode: IPHtmlNode): IPHtmlNode {
    const index = this.childNodes.findIndex((v) => v === oldNode);
    if (0 <= index) {
      oldNode.remove();
      newNode.setParent(this);
      this.childNodes.splice(index, 1, newNode);
    }
    return oldNode;
  }

  setParent(node: IPHtmlNode | null) {
    this._parent = node;
  }
  remove(): void {
    if (this._parent) {
      this._parent.removeChild(this);
    }
    this.setParent(null);
  }
  toString(): string {
    return `${this._rawText}`;
  }

  get range(){
    return {
      startOpenTag: 0,
      endOpenTag: 0,
      startCloseTag: this.outerHTML.length,
      endCloseTag: 0,
    }
  }
}
