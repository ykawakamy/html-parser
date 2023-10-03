import { IPHtmlClassList } from "../interface";
import * as _ from "lodash";
import { PHtmlElement } from "./PHtmlElement";

const className = "class";

export class PHtmlClassList extends Array<string> implements IPHtmlClassList {
  constructor(private element : PHtmlElement){
    super(...(element.getAttribute && element.getAttribute(className)?.split(/\s+/).filter(v=>!!v)) ?? []);
  }

  get value(): string {
    return _.join(this, " ");
  }
  toString(): string {
    return _.join(this, " ");
  }
  add(...tokens: string[]): void {
    for( const token of tokens){
      if(!this.contains(token)){
        this[this.length++] = token;
      }
    }
    this.element.setAttribute(className, this.value);
  }
  contains(token: string): boolean {
    return !!_.find(this, v=>v===token);
  }
  item(index: number): string | null {
    return this[index] ?? null;
  }
  remove(...tokens: string[]): void {
    const tmp = new Array(...this).filter(v=>!tokens.includes(v))
    tmp.forEach( (v,i)=>{this[i] == v;})
    this.length = tmp.length;
    this.element.setAttribute(className, this.value);
  }
  replace(token: string, newToken: string): boolean {
    const idx = _.findIndex(this, v=>v===token);
    if( idx != -1){
      this[idx] = newToken;
      this.element.setAttribute(className, this.value);
      return true;
    }
    return false;
  }
  supports(token: string): boolean {
    return true;
  }
  toggle(token: string, force?: boolean | undefined): boolean {
    const idx = _.findIndex(this, v=>v===token);
    if( idx != -1){
      if( force === undefined || force === false ){
        this.remove(token);
        return false;
      }
      return true;
    }
    if( force === undefined || force === true ){
      this.add(token);
      return false;
    }
    return true;
  }
}
