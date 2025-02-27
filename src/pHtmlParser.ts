// import { PHtml, PHtmlAttributes, PHtmlElement, PHtmlNode } from "./model";
import { Options } from "css-select";
import * as _ from "lodash";
import { PHtmlCssSelectAdaptor } from "./PHtmlCssSelectAdaptor";
import { pHtmlPseudos } from "./PHtmlCssSelectPseudos";
import { kAttributePattern, kInlineCodeTagPattern, kMarkupPattern } from "./constants";
import { IPHtmlDocument, IPHtmlElement, IPHtmlNode, IPHtmlRange } from "./interface";
import { PHtmlRawAttributes } from "./model/PHtmlAttributes";
import { PHtmlDocument } from "./model/PHtmlDocument";
import { PHtmlElement } from "./model/PHtmlElement";
import { PHtmlNode } from "./model/PHtmlNode";

export class PHtmlOptions{
  skipComment: boolean = false;
  caseSensitive: boolean = false;
  inlineCodeTags: string[] = ['script', 'style'];

}
export class PHtmlParser{
  option: PHtmlOptions = new PHtmlOptions();
  readonly cssSelectOption: Options<IPHtmlNode, IPHtmlElement>;

  constructor(option?: Partial<PHtmlOptions>){
    this.option = {
      ...this.option,
      ...option
    }

    this.cssSelectOption = {
      xmlMode: option?.caseSensitive,
      adapter: new PHtmlCssSelectAdaptor(this),
      pseudos: pHtmlPseudos(this)
    } as const;
  }
  parse(data: string): IPHtmlDocument {
    let root = new PHtmlDocument(this, this.createRange(0, data.length));
    return this._base_parse(root, data);
  }

  _base_parse(root: PHtmlDocument, data: string) {
    let parent: PHtmlElement = root;
    let stack: PHtmlElement[] = [root];
    let match;
    let lastTextPos = 0;
    const { skipComment, inlineCodeTags } = this.option;
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
          parent.appendChild(new PHtmlNode(text, parent, this, this.createRange(lastTextPos, tagStartPos)));
        }
      }

      lastTextPos = matcher.lastIndex;

      if (matchText[1] === '!') {
        if (!skipComment) {
          parent.appendChild(new PHtmlNode(matchText, parent, this, this.createRange(tagStartPos, tagEndPos)));
        }
        continue;
      }

      if (!leadingSlash) {
        const attrs = new PHtmlRawAttributes(this);
        const attrMatcher = new RegExp(kAttributePattern);
        for (let attMatch; (attMatch = attrMatcher.exec(attributes));) {
          const { 0: raw, 1: key, 2: val, 3: withTrail } = attMatch;
          const isQuoted = val && ( (val[0] === `'` && val[val.length-1] === `'` ) || (val[0] === `"` && val[val.length-1] === `"` ));
          const attr = isQuoted ? val.slice(1, val.length - 1) : val;
          attrs.add(key, attr, raw);
        }

        const child = new PHtmlElement(tagName, parent, attrs, !!selfClosing, trailSpace, this, this.createElementRange(tagStartPos, tagEndPos));
        parent.appendChild(child);

        if( inlineCodeTags.includes(tagName.toLowerCase())){
          const inline = kInlineCodeTagPattern(tagName);
          inline.lastIndex = lastTextPos;
          const inlineMatch = inline.exec(data);
          if( !!inlineMatch){
            const {1: closeTag } = inlineMatch;
            child.appendChild(new PHtmlNode(data.substring(lastTextPos, inline.lastIndex - closeTag.length), parent, this, this.createRange(lastTextPos, inline.lastIndex - closeTag.length)));
            child._rawCloseTag = closeTag;
            child.range!.startCloseTag = inline.lastIndex - closeTag.length;
            child.range!.endCloseTag = inline.lastIndex;
            lastTextPos = inline.lastIndex;
            matcher.lastIndex = lastTextPos;
            continue;
          }
        } 
        
        if (!selfClosing) {
          stack.push(child);
          parent = child;
        }
      }
      if (leadingSlash) {
        const s = _.findLastIndex(stack, (v) => this.caseNormalize(v.tagName) === this.caseNormalize(tagName));
        if (s != -1) {
          // closeless tag 
          for( let i=stack.length-1 ; s<i; i-- ){
            stack[i].parentNode?.childNodes.push(...stack[i].childNodes)
            stack[i].replaceChildren();
            stack[i]._rawCloseTag = "";
          }
          if (s > 0) {
            stack[s]._rawCloseTag = matchText;
            stack[s].range!.startCloseTag = tagStartPos;
            stack[s].range!.endCloseTag = tagEndPos;
            parent = stack[s - 1];
          }
          stack = stack.slice(0, s);

        } else {
          // incorrect closing tag
          const child = new PHtmlNode(matchText, parent, this, this.createRange(tagStartPos, tagEndPos));
          parent.appendChild(child);
        }
      }

    }

    if( lastTextPos < data.length ){
      const text = data.substring(lastTextPos);
      parent.appendChild(new PHtmlNode(text, parent, this, this.createRange(lastTextPos, data.length)));
    }

    for( let i=stack.length-1 ; 0<i; i-- ){
      stack[i].parentNode?.childNodes.push(...stack[i].childNodes)
      stack[i].replaceChildren();
      stack[i]._rawCloseTag = "";
    }

    return root;
  }
  createElementRange(tagStartPos: number, tagEndPos: number): IPHtmlRange {
    return {
      startOpenTag: tagStartPos,
      endOpenTag: tagEndPos,
      startCloseTag: tagEndPos,
      endCloseTag: tagEndPos
   }
    
  }

  createRange(lastTextPos: number, tagStartPos: number): IPHtmlRange {
    return {
       startOpenTag: lastTextPos,
       endOpenTag: lastTextPos,
       startCloseTag: tagStartPos,
       endCloseTag: tagStartPos
    }
  }

  caseNormalize(a: string){
    return this.option.caseSensitive ? a : _.toLower(a);
  }
}

export const pHtmlParserDefault = new PHtmlParser();