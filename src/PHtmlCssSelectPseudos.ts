import { Pseudo } from "css-select/lib/pseudo-selectors/pseudos";
import { InternalOptions } from "css-select/lib/types";
import { IPHtmlElement, IPHtmlNode } from "./interface";
import { PHtmlParser } from "./pHtmlParser";
import * as CSSselect from "css-select";

export function pHtmlPseudos(_parser: PHtmlParser) :Record<string, ((elem: IPHtmlElement, value?: string | null) => boolean)> {
  return {
    /** escape for angular style */
    angular(elem, subselect){
      const match = /(.+?)((=|~=|\|=|\*=|\^=|\$=|!=).*)/.exec(subselect!)!
      const {1:name, 2:tmp_op} = match || [ null,subselect ];
      const op = tmp_op ?? "";
      const escaped = name
        .replace("[", "\\[")
        .replace("]", "\\]")
        .replace("(", "\\(")
        .replace(")", "\\)")
      ;
  
      return CSSselect.is(elem, `[${escaped}${op}]`, _parser.cssSelectOption);
    },
    angular_prop(elem, subselect){
      const match = /(.+?)((=|~=|\|=|\*=|\^=|\$=|!=).*)/.exec(subselect!)!
      const {1:name, 2:tmp_op} = match || [ null,subselect ];
      const op = tmp_op ?? "";
      
      const attr = `${name}${op}`;
      return CSSselect.is(elem, `:is([${attr}${op}], [\\*${attr}${op}], [\\[${attr}\\]${op}], [\\(${attr}\\)${op}], [\\[\\(${attr}\\)\\]${op}])`, _parser.cssSelectOption);
    }
  }
}