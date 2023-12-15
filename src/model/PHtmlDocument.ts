import {
  IPHtmlDocument,
  IPHtmlElement,
  IPHtmlNode,
  IPHtmlRange
} from "../interface";
import { PHtmlNode } from "./PHtmlNode";
import { PHtmlElement } from "./PHtmlElement";
import { pHtmlParser } from "../pHtmlParser";
import * as he from 'he';

export class PHtmlDocument extends PHtmlElement implements IPHtmlDocument {
  constructor(_parser: pHtmlParser, _range: IPHtmlRange) {
    super("", undefined, undefined, false, "", _parser, _range);
  }
  createElement(tagName: string, option?: object): IPHtmlElement {
    return new PHtmlElement(tagName, undefined, undefined, false, "", this._parser);
  }
  createTextNode(text: string): IPHtmlNode {
    let heText = he.encode(text, {useNamedReferences:true});
    return new PHtmlNode(heText, undefined, this._parser);
  }
  createComment(text: string): IPHtmlNode {
    let heText = he.encode(text, {useNamedReferences:true});
    return new PHtmlNode(`<!--${heText}-->`, undefined, this._parser);
  }
}
