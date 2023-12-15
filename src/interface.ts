export type IPHtmlDomString = string;

export type IPHtmlAttributes = {
  get length(): number;
  add(key: string, attr: string, rawWithKey: string): void;
  remove(key: string, index?: number): void;
  set(key: string, attr: string): void;
  get(key: string): string | undefined;
  has(key: string): boolean;
  getAttributeText():string;
};

export type IPHtmlNodeList = Array<IPHtmlNode>;

export type InsertPosition = "afterbegin" | "afterend" | "beforebegin" | "beforeend";

export interface IPHtmlClassList extends ArrayLike<string> /* ,  IterableIterator<string> */{
  get length(): number ;
  get value(): string;
  toString(): string;
  add(...tokens: string[]): void;
  contains(token: string): boolean;
  item(index: number): string | null;
  remove(...tokens: string[]): void ;
  replace(token: string, newToken: string): boolean;
  supports(token: string): boolean ;
  toggle(token: string, force?: boolean | undefined): boolean;

  //---
  /** Iterator */
  [Symbol.iterator](): IterableIterator<string>;
  forEach(
    callbackfn: (value: string, key: number, parent: ArrayLike<string>) => void,
    thisArg?: any
  ): void;
  entries(): IterableIterator<[number, string]>;
  keys(): IterableIterator<number>;
  values(): IterableIterator<string>;
} ;

export interface IPHtmlDocument extends IPHtmlElement{
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Document/createElement | Document.createElement } */
  createElement(tagName: string, option?: object): IPHtmlElement;
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Document/createTextNode | Document.createTextNode } */
  createTextNode(text: string): IPHtmlNode;
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Document/createComment | Document.createComment } */
  createComment(text: string): IPHtmlNode;

}

/**
 * exposed 'Element' methods/fields
 * @see https://developer.mozilla.org/ja/docs/Web/API/Element
 */
export interface IPHtmlElement extends IPHtmlElementExtends {
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.assignedslot | Element.assignedSlot } readonly */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.attributes | Element.attributes } readonly */
  // get attributes(): IPHtmlAttributes | undefined;
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.childelementcount | Element.childElementCount } readonly */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.children | Element.children } readonly */
  get children(): IPHtmlElement[];
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.classlist | Element.classList } readonly */
  get classList(): IPHtmlClassList;
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.classname | Element.className }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.clientheight | Element.clientHeight } readonly */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.clientleft | Element.clientLeft } readonly */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.clienttop | Element.clientTop } readonly */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.clientwidth | Element.clientWidth } readonly */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.elementtiming_en-us | Element.elementTiming }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.firstelementchild | Element.firstElementChild } readonly */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.id | Element.id }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.innerhtml | Element.innerHTML }  */
  get innerHTML(): string;
  set innerHTML(html: string);
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.lastelementchild | Element.lastElementChild } readonly */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.localname | Element.localName } readonly */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.namespaceuri | Element.namespaceURI } readonly */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.nextelementsibling | Element.nextElementSibling } readonly */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.outerhtml | Element.outerHTML }  */
  get outerHTML(): string;
  set outerHTML(html: string);
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.part | Element.part }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.prefix | Element.prefix } readonly */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.previouselementsibling | Element.previousElementSibling } readonly */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.scrollheight | Element.scrollHeight } readonly */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.scrollleft | Element.scrollLeft }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.scrollleftmax | Element.scrollLeftMax } readonly */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.scrolltop | Element.scrollTop }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.scrolltopmax | Element.scrollTopMax } readonly */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.scrollwidth | Element.scrollWidth } readonly */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.shadowroot | Element.shadowRoot } readonly */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.slot | Element.slot }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.tagname | Element.tagName } readonly */
  get tagName(): string;
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.after | Element.after() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.attachshadow | Element.attachShadow() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.animate | Element.animate() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.append | Element.append() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.before | Element.before() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.closest | Element.closest() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.computedstylemap | Element.computedStyleMap() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.getanimations | Element.getAnimations() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.getattribute | Element.getAttribute() }  */
  getAttribute(name: string): string | null;
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.getattributenames | Element.getAttributeNames() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.getattributenode | Element.getAttributeNode() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.getattributenodens | Element.getAttributeNodeNS() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.getattributens | Element.getAttributeNS() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.getboundingclientrect | Element.getBoundingClientRect() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.getboxquads | Element.getBoxQuads() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.getclientrects | Element.getClientRects() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.getelementsbyclassname | Element.getElementsByClassName() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.getelementsbytagname | Element.getElementsByTagName() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.getelementsbytagnamens | Element.getElementsByTagNameNS() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.hasattribute | Element.hasAttribute() }  */
  hasAttribute(name: string): boolean;
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.hasattributens | Element.hasAttributeNS() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.hasattributes | Element.hasAttributes() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.haspointercapture | Element.hasPointerCapture() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.insertadjacentelement | Element.insertAdjacentElement() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.insertadjacenthtml | Element.insertAdjacentHTML() }  */
  insertAdjacentHTML(position: InsertPosition, text: string): void;
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.insertadjacenttext | Element.insertAdjacentText() }  */
  insertAdjacentText(position: InsertPosition, text: string): void;
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.matches | Element.matches() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.prepend | Element.prepend() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.queryselector | Element.querySelector() }  */
  querySelector(query: string): IPHtmlElement | null;
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.queryselectorall | Element.querySelectorAll() }  */
  querySelectorAll(query: string): readonly IPHtmlElement[];
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.releasepointercapture | Element.releasePointerCapture() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.remove | Element.remove() }  */
  remove(): void;
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.removeattribute | Element.removeAttribute() }  */
  removeAttribute(name: string): void;
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.removeattributenode | Element.removeAttributeNode() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.removeattributens | Element.removeAttributeNS() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.replacechildren | Element.replaceChildren() }  */
  replaceChildren(...nodes: (IPHtmlNode | IPHtmlDomString)[]): void;
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.replacewith | Element.replaceWith() }  */
  replaceWith(...nodes: (IPHtmlNode | IPHtmlDomString)[]): void;
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.requestfullscreen | Element.requestFullscreen() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.requestpointerlock | Element.requestPointerLock() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.scroll | Element.scroll() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.scrollby | Element.scrollBy() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.scrollintoview | Element.scrollIntoView() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.scrollintoviewifneeded_en-us | Element.scrollIntoViewIfNeeded() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.scrollto | Element.scrollTo() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.setattribute | Element.setAttribute() }  */
  setAttribute(name: string, value: string): void;
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.setattributenode | Element.setAttributeNode() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.setattributenodens | Element.setAttributeNodeNS() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.setattributens | Element.setAttributeNS() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.setcapture | Element.setCapture() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.sethtml | Element.setHTML() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.setpointercapture | Element.setPointerCapture() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.toggleattribute  | Element.toggleAttribute() }  */
}

/**
 * exposed 'Node' methods/fields
 * @see https://developer.mozilla.org/ja/docs/Web/API/Node
 */
export interface IPHtmlNode extends IPHtmlNodeExtends {
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Node#node.baseuri | Node.baseURI } readonly */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Node#node.childnodes | Node.childNodes } readonly */
  get childNodes(): IPHtmlNodeList;
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Node#node.firstchild | Node.firstChild } readonly */
  get firstChild(): IPHtmlNode | null;
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Node#node.isconnected | Node.isConnected } readonly */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Node#node.lastchild | Node.lastChild } readonly */
  get lastChild(): IPHtmlNode | null;
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Node#node.nextsibling | Node.nextSibling } readonly */
  get nextSibling(): IPHtmlNode | null;
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Node#node.nodename | Node.nodeName } readonly */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Node#node.nodetype | Node.nodeType } readonly */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Node#node.nodevalue | Node.nodeValue }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Node#node.ownerdocument | Node.ownerDocument } readonly */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Node#node.parentnode | Node.parentNode } readonly */
  get parentNode(): IPHtmlNode | null;
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Node#node.parentelement | Node.parentElement } readonly */
  get parentElement(): IPHtmlElement | null;
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Node#node.previoussibling | Node.previousSibling } readonly */
  get previousSibling(): IPHtmlNode | null;
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Node#node.textcontent | Node.textContent }  */

  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Node#node.appendchild | Node.appendChild() }  */
  appendChild(node: IPHtmlNode): void;
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Node#node.clonenode | Node.cloneNode() }  */
  cloneNode(): IPHtmlNode;
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Node#node.comparedocumentposition | Node.compareDocumentPosition() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Node#node.contains | Node.contains() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Node#node.getrootnode | Node.getRootNode() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Node#node.haschildnodes | Node.hasChildNodes() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Node#node.insertbefore | Node.insertBefore() }  */
  insertBefore(node: IPHtmlNode, refNode: IPHtmlNode | null): void;
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Node#node.isdefaultnamespace | Node.isDefaultNamespace() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Node#node.isequalnode | Node.isEqualNode() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Node#node.issamenode | Node.isSameNode() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Node#node.lookupprefix | Node.lookupPrefix() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Node#node.lookupnamespaceuri | Node.lookupNamespaceURI() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Node#node.normalize | Node.normalize() }  */
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Node#node.removechild | Node.removeChild() }  */
  removeChild(node: IPHtmlNode): void;
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Node#node.replacechild | Node.replaceChild() }  */
  replaceChild(newNode: IPHtmlNode, oldNode: IPHtmlNode): IPHtmlNode;
}


export interface IPHtmlElementExtends extends IPHtmlNode{
  get rawAttributes(): IPHtmlAttributes | undefined;
  _rawCloseTag: string | undefined
}
/**
 * QuerySearch's Node methods/fields
*/
export interface IPHtmlNodeExtends {
  setParent(node: IPHtmlNode | null): void;
  remove(): void;
  /** @see {@link https://developer.mozilla.org/ja/docs/Web/API/Element#element.outerhtml | Element.outerHTML }  */
  get outerHTML(): string;
  get range(): IPHtmlRange;
  _type: string;
}

export type IPHtmlRange = {
  startOpenTag: number;
  endOpenTag: number;
  startCloseTag: number;
  endCloseTag: number;
} | undefined;