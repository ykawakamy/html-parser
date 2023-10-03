// import { PHtml, PHtmlAttributes, PHtmlElement, PHtmlNode } from "./model";
import { PHtmlDocument } from "./model/PHtmlDocument";
import { PHtmlAttributes } from "./model/PHtmlAttributes";
import { PHtmlElement } from "./model/PHtmlElement";
import { PHtmlNode } from "./model/PHtmlNode";
import { kMarkupPattern, kAttributePattern } from "./constants";
import { IPHtmlDocument, IPHtmlElement } from "./interface";
import * as _ from "lodash";

export class pHtmlParser {
  skipComment: boolean = true;

  constructor(option: { skipComment: boolean} = { skipComment: true}){
    this.skipComment = !!option.skipComment;
  }
  parse(data: string): IPHtmlDocument {
    let root = new PHtmlDocument(this);
    return this._base_parse(root, data);
  }

  _base_parse(root: PHtmlDocument, data: string) {
    let parent: PHtmlElement = root;
    let stack: PHtmlElement[] = [root];
    let match;
    let lastTextPos = 0;
    const { skipComment: skipComment } = this;
    const matcher = new RegExp(kMarkupPattern);
    while ((match = matcher.exec(data))) {
      let {
        0: matchText, 1: leadingSlash, 2: tagName, 3: attributes, 4: trailSpace, 5: selfClosing,
      } = match;
      const matchLength = matchText.length;
      const tagStartPos = matcher.lastIndex - matchLength;
      const tagEndPos = matcher.lastIndex;

      // Add TextNode if content
      if (lastTextPos > -1) {
        if (lastTextPos + matchLength < tagEndPos) {
          const text = data.substring(lastTextPos, tagStartPos);
          parent.appendChild(new PHtmlNode(text, parent, this));
        }
      }

      lastTextPos = matcher.lastIndex;

      if (matchText[1] === '!') {
        if (!skipComment) {
          parent.appendChild(new PHtmlNode(matchText, parent, this));
        }
        continue;
      }

      if (!leadingSlash) {
        const attrs = new PHtmlAttributes();
        const matcher = new RegExp(kAttributePattern);
        for (let attMatch; (attMatch = matcher.exec(attributes));) {
          const { 0: raw, 1: key, 2: val, 3: withTrail } = attMatch;
          const isQuoted = val && ( val[0] === `'` || val[0] === `"`);
          const attr = isQuoted ? val.slice(1, val.length - 1) : val;
          attrs.add(key, attr, raw);
        }

        const child = new PHtmlElement(tagName, parent, attrs, !!selfClosing, trailSpace, this);
        parent.appendChild(child);
        if (!selfClosing) {
          stack.push(child);
          parent = child;
        }
      }
      if (leadingSlash) {
        const s = _.findLastIndex(stack, (v) => v.tagName == tagName);
        if (s != -1) {
          // closeless tag 
          for( let i=stack.length-1 ; s<i; i-- ){
            stack[i].parentNode?.childNodes.push(...stack[i].childNodes)
            stack[i].replaceChildren();
            stack[i]._rawCloseTag = "";
          }
          if (s > 0) {
            stack[s]._rawCloseTag = matchText;
            parent = stack[s - 1];
          }
          stack = stack.slice(0, s);

        } else {
          // incorrect closing tag
          const child = new PHtmlNode(matchText, parent, this);
          parent.appendChild(child);
          // parent = child;
        }
      }

    }

    if( lastTextPos < data.length ){
      const text = data.substring(lastTextPos);
      parent.appendChild(new PHtmlNode(text, parent, this));
    }

    for( let i=stack.length-1 ; 0<i; i-- ){
      stack[i].parentNode?.childNodes.push(...stack[i].childNodes)
      stack[i].replaceChildren();
      stack[i]._rawCloseTag = "";
    }

    return root;
  }
}
