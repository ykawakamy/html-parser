// import { PHtmlElement } from "model";
// import { PHtmlNode } from "model/PHtmlNode";
import { pHtmlParser } from "../../src/pHtmlParser";
import { PHtmlElement } from "../../src/model/PHtmlElement";
import { PHtmlNode } from "../../src/model/PHtmlNode";

describe("PHtmlNode", () => {
  describe("firstChild", () => {
    test("not found", () => {
      const node = new PHtmlNode("rawText", undefined, new pHtmlParser());
      expect(node.firstChild).toBe(null);
    });
    test("found", () => {
      const node = new PHtmlNode("rawText", undefined, new pHtmlParser());
      const firstNode = new PHtmlNode("firstNode", undefined, new pHtmlParser());
      const seconrdNode = new PHtmlNode("seconrdNode", undefined, new pHtmlParser());
      node.appendChild(firstNode)
      node.appendChild(seconrdNode)
      expect(node.firstChild).toBe(firstNode);
    });
  });
  describe("lastChild", () => {
    test("not found", () => {
      const node = new PHtmlNode("rawText", undefined, new pHtmlParser());
      expect(node.lastChild).toBe(null);
    });
    test("found", () => {
      const node = new PHtmlNode("rawText", undefined, new pHtmlParser());
      const firstNode = new PHtmlNode("firstNode", undefined, new pHtmlParser());
      const seconrdNode = new PHtmlNode("seconrdNode", undefined, new pHtmlParser());
      node.appendChild(firstNode)
      node.appendChild(seconrdNode)
      expect(node.lastChild).toBe(seconrdNode);
    });
  });

  describe("nextSibling/previousSibling", () => {
    test("no parent", () => {
      const node = new PHtmlNode("rawText", undefined, new pHtmlParser());
      expect(node.previousSibling).toBe(null);
      expect(node.nextSibling).toBe(null);
    });
    test("no previousSibling", () => {
      const node = new PHtmlNode("rawText", undefined, new pHtmlParser());
      const firstNode = new PHtmlNode("firstNode", undefined, new pHtmlParser());
      const seconrdNode = new PHtmlNode("seconrdNode", undefined, new pHtmlParser());
      node.appendChild(firstNode)
      node.appendChild(seconrdNode)
      expect(firstNode.nextSibling).toBe(seconrdNode);
      expect(firstNode.previousSibling).toBe(null);
    });
    test("no nextSibling", () => {
      const node = new PHtmlNode("rawText", undefined, new pHtmlParser());
      const firstNode = new PHtmlNode("firstNode", undefined, new pHtmlParser());
      const seconrdNode = new PHtmlNode("seconrdNode", undefined, new pHtmlParser());
      node.appendChild(firstNode)
      node.appendChild(seconrdNode)
      expect(seconrdNode.nextSibling).toBe(null);
      expect(seconrdNode.previousSibling).toBe(firstNode);
    });
  });

  describe("parentNode/parentElement", () => {
    test("not found", () => {
      const node = new PHtmlNode("rawText", undefined, new pHtmlParser());
      expect(node.parentNode).toBe(null);
      expect(node.parentElement).toBe(null);
    });
    test("parentNode found", () => {
      const node = new PHtmlNode("rawText", undefined, new pHtmlParser());
      const firstNode = new PHtmlElement("firstNode", undefined, undefined, false, "",new pHtmlParser());
      const seconrdNode = new PHtmlNode("seconrdNode", undefined, new pHtmlParser());
      node.appendChild(firstNode)
      node.appendChild(seconrdNode)
      expect(firstNode.parentNode).toBe(node);
      expect(firstNode.parentElement).toBe(null);
      expect(seconrdNode.parentNode).toBe(node);
      expect(seconrdNode.parentElement).toBe(null);
    });
    test("parentElement found", () => {
      const node = new PHtmlElement("rawText", undefined, undefined, false, "", new pHtmlParser());
      const firstNode = new PHtmlElement("firstNode", undefined, undefined, false, "", new pHtmlParser());
      const seconrdNode = new PHtmlNode("seconrdNode", undefined, new pHtmlParser());
      node.appendChild(firstNode)
      node.appendChild(seconrdNode)
      expect(firstNode.parentNode).toBe(node);
      expect(firstNode.parentElement).toBe(node);
      expect(seconrdNode.parentNode).toBe(node);
      expect(seconrdNode.parentElement).toBe(node);
    });
  });

  describe("cloneNode", () => {
    test("PHtmlNode clone", () => {
      const node = new PHtmlNode("rawText", undefined, new pHtmlParser());
      const clone = node.cloneNode();
      expect(clone).not.toBe(node);
      expect(clone.outerHTML).toBe(node.outerHTML);
    });
    test("PHtmlElement clone", () => {
      const node = new PHtmlElement("rawText", undefined, undefined, false, "", new pHtmlParser());
      const clone = node.cloneNode();
      expect(clone).not.toBe(node);
      expect(clone.outerHTML).toBe(node.outerHTML);
    });
    test("nested element clone", () => {
      const node = new PHtmlElement("rawText", undefined, undefined, false, "", new pHtmlParser());
      const firstNode = new PHtmlElement("firstNode", undefined, undefined, false, "", new pHtmlParser());
      const seconrdNode = new PHtmlNode("seconrdNode", undefined, new pHtmlParser());

      const clone = node.cloneNode();
      expect(clone).not.toBe(node);
      expect(clone.outerHTML).toBe(node.outerHTML);
    });
  });

  describe("removeChild", () => {
    test("not child", () => {
      const node = new PHtmlNode("rawText", undefined, new pHtmlParser());
      const notChild = new PHtmlNode("notChild", undefined, new pHtmlParser());
      node.removeChild(notChild);
      expect(node.childNodes.length).toBe(0);
      expect(notChild.parentNode).toBe(null);
    });
    test("remove child", () => {
      const node = new PHtmlNode("rawText", undefined, new pHtmlParser());
      const firstNode = new PHtmlNode("firstNode", undefined, new pHtmlParser());
      const seconrdNode = new PHtmlNode("seconrdNode", undefined, new pHtmlParser());
      node.appendChild(firstNode)
      node.appendChild(seconrdNode)

      node.removeChild(firstNode)
      
      expect(node.childNodes.length).toBe(1);
      expect(firstNode.parentNode).toBe(null);
    });
  });
  
  describe("insertBefore", () => {
    test("insert newChild before oldChild", () => {
      const node = new PHtmlNode("rawText", undefined, new pHtmlParser());
      const oldChild = new PHtmlNode("oldChild", undefined, new pHtmlParser());
      const newChild = new PHtmlNode("newChild", undefined, new pHtmlParser());

      node.appendChild(oldChild);
      node.insertBefore(newChild, oldChild);
      expect(node.childNodes.length).toBe(2);
      expect(oldChild.previousSibling).toBe(newChild);
      expect(newChild.parentNode).toBe(node);
    });
    test("when refNode is null, append last", () => {
      const node = new PHtmlNode("rawText", undefined, new pHtmlParser());
      const oldChild = new PHtmlNode("oldChild", undefined, new pHtmlParser());
      const newChild = new PHtmlNode("newChild", undefined, new pHtmlParser());

      node.appendChild(oldChild);
      node.insertBefore(newChild, null);
      expect(node.childNodes.length).toBe(2);
      expect(oldChild.nextSibling).toBe(newChild);
      expect(newChild.parentNode).toBe(node);
    });
  });

  describe("replaceChild", () => {
    test("replace unreach node", () => {
      const node = new PHtmlNode("rawText", undefined, new pHtmlParser());
      const oldChild = new PHtmlNode("oldChild", undefined, new pHtmlParser());
      const newChild = new PHtmlNode("newChild", undefined, new pHtmlParser());

      node.appendChild(oldChild);
      node.replaceChild(newChild, oldChild);
      expect(node.childNodes.length).toBe(1);
      expect(oldChild.parentNode).toBe(null);
      expect(newChild.parentNode).toBe(node);
    });
    test("same parent", () => {
      const node = new PHtmlNode("rawText", undefined, new pHtmlParser());
      const oldChild = new PHtmlNode("oldChild", undefined, new pHtmlParser());
      const newChild = new PHtmlNode("newChild", undefined, new pHtmlParser());

      node.appendChild(oldChild);
      node.appendChild(newChild);
      node.replaceChild(newChild, oldChild);
      expect(node.childNodes.length).toBe(1);
      expect(oldChild.parentNode).toBe(null);
      expect(newChild.parentNode).toBe(node);
    });
  });
  test("test", ()=>{
    const html = `
    <div class="hdrSearch  hidden" id="searchBlingBox" >
	<div id="searchInputEle" class="hdrSearchC" >
		<div >
			<form onsubmit="return false;">
				<input type="text" value="News, Quotes, Companies, Videos" class="hdrSearchInput unUsed" id="globalHeaderSearchInput" autocomplete="off" size="28">
				<button class="hdrSearchBtn" type="button">SEARCH</button>
			</form>
		</div>
	</div>
	<div id="globalHeaderAutoComplete" class="hdrSearchList hidden">
		<div class="autocompleteContent" >
		</div>		
	</div>
		<!--  Autocomplete viewTemplate content - could be used on pages where autocomplete is not in header -->
<!-- Do not change id of textArea its referred in dj.widget.autocomplete.autoCompleteViewTemplate.js-->	
<textarea id="wsj_autocomplete_template" style="display:none">	
 
	<div>
			<div class="acHeadline hidden"  >
			</div>
			<div class="dropdownContainerClass">
				<div class="suggestionblock hidden" templateType="C1">	
					<ul role="listbox" class="">
						<li role="menuitem" class="hdrSearchListName">
							headline
						</li>
						<li role="menuitem" class="lineItem">
							<a class="searchResult" href="javascript:void(0);">
							   <span class="searchTerm">gold</span>man
							</a>
						</li>						
					</ul>
				</div>
				<div class="suggestionblock hidden" templateType="C3">	
					<ul role="listbox" class="hdrSearchListComp">
						<li role="menuitem" class="hdrSearchListName">
							Companies
						</li>
						<li role="menuitem" class="lineItem">
							<a class="searchResult" href="javascript:void(0);">
								<div class="searchListCompTicker">
									<span class="searchTerm">GOLD</span>
								</div>
								<div class="searchListCompName">
									Ran
									<span class="searchTerm">gold</span> Resources Ltd. ADS
								</div>
								<div class="searchListCompMarkets">
									U.S.
								</div>
							</a>
						</li>						
					</ul>									
				</div>
			</div>
			<div class="acFooter hidden">
				<ul role="listbox" class="hdrSearchListSearch">
					<li role="menuitem" class="">
						<a class="footer" href="#">View All Search Results &raquo;</a>
					</li>
				</ul>
			</div>
			<div id="SearchSponsorBox" class="sponsorBox"></div>
		</div>
</textarea>

</div>`
    const root = new pHtmlParser({skipComment:false}).parse(html);
    const li = root.querySelector("li");
    console.log(li!.range);

  });
  
});
