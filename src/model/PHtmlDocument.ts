import {
  IPHtmlDocument,
  IPHtmlElement,
  IPHtmlNode
} from "../interface";
import { PHtmlNode } from "./PHtmlNode";
import { PHtmlElement } from "./PHtmlElement";
import { pHtmlParser } from "../pHtmlParser";


export class PHtmlDocument extends PHtmlElement implements IPHtmlDocument {
  constructor(_parser: pHtmlParser) {
    super("", undefined, undefined, false, "", _parser);
  }
  createElement(tagName: string, option?: object): IPHtmlElement {
    return new PHtmlElement(tagName, undefined, undefined, false, "", this._parser);
  }
  createTextNode(text: string): IPHtmlNode {
    return new PHtmlNode(text, undefined, this._parser);
  }
  createComment(text: string): IPHtmlNode {
    return new PHtmlNode(text, undefined, this._parser);
  }
}
