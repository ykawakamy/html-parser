import { PHtmlElement } from "./model/PHtmlElement";
import {
  IPHtmlElement,
  IPHtmlNode
} from "./interface";
import { Adapter, Predicate } from "css-select/lib/types";
// import { PHtmlElement } from "./model";

export class PHtmlCssSelectAdaptor implements Adapter<IPHtmlNode, IPHtmlNode> {
  isTag(node: IPHtmlNode): node is IPHtmlElement {
    return node instanceof PHtmlElement && node.tagName !== "";
  }
  existsOne(test: Predicate<IPHtmlElement>, elems: IPHtmlNode[]): boolean {
    return !!elems.find(test as any);
  }
  getAttributeValue(elem: IPHtmlNode, name: string): string | undefined {
    return (
      (elem instanceof PHtmlElement && elem.rawAttributes?.get(name)) ||
      undefined
    );
  }
  getChildren(node: IPHtmlNode): IPHtmlNode[] {
    return node.childNodes;
  }
  getName(elem: IPHtmlNode): string {
    return (elem instanceof PHtmlElement && elem.tagName?.toLowerCase()) || "";
  }
  getParent(node: IPHtmlNode): IPHtmlNode | null {
    return node.parentNode ?? null;
  }
  getSiblings(node: IPHtmlNode): IPHtmlNode[] {
    return node.parentNode ? node.parentNode.childNodes : [];
  }
  // prevElementSibling(node: IPHtmlNode):IPHtmlElement | null{ return null; };
  getText(node: IPHtmlNode): string {
    return node.outerHTML ?? "";
  }
  hasAttrib(elem: IPHtmlNode, name: string): boolean {
    return !!this.getAttributeValue(elem, name);
  }
  /* istanbul ignore next */
  removeSubsets(nodes: IPHtmlNode[]): IPHtmlNode[] {
    let idx = nodes.length;
    let node;
    let ancestor;
    let replace;

    // Check if each node (or one of its ancestors) is already contained in the
    // array.
    while (--idx > -1) {
      node = ancestor = nodes[idx];

      // Temporarily remove the node under consideration
      nodes[idx] = null!;
      replace = true;

      while (ancestor) {
        if (nodes.indexOf(ancestor) > -1) {
          replace = false;
          nodes.splice(idx, 1);
          break;
        }
        ancestor = this.getParent(ancestor);
      }

      // If the node has been found to be unique, re-insert it.
      if (replace) {
        nodes[idx] = node;
      }
    }

    return nodes;
  }
  findAll(test: Predicate<IPHtmlNode>, nodes: IPHtmlNode[]): IPHtmlNode[] {
    let result: IPHtmlNode[] = [];

    for (const node of nodes) {
      if (!this.isTag(node)) {
        continue;
      }
      if (test(node)) {
        result.push(node);
      }
      const childs = this.getChildren(node);
      if (childs) {
        result = result.concat(this.findAll(test, childs));
      }
    }
    return result;
  }
  findOne(test: Predicate<IPHtmlNode>, elems: IPHtmlNode[]): IPHtmlNode | null {
    let elem = null as IPHtmlNode | null;

    for (let i = 0, l = elems?.length; i < l && !elem; i++) {
      const el = elems[i];
      if (test(el)) {
        elem = el;
      } else {
        const childs = this.getChildren(el);
        if (childs && childs.length > 0) {
          elem = this.findOne(test, childs);
        }
      }
    }

    return elem;
  }
  equals(a: IPHtmlNode, b: IPHtmlNode): boolean {
    return a === b;
  }
}

export const adaptor = new PHtmlCssSelectAdaptor();

