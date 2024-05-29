import { PHtmlParser } from "pHtmlParser";

describe("angular style escape pseudo selector", () => {
  test('query tag with attribute(angular: sturcture directive style)', function () {
    const document = new PHtmlParser().parse(`<div><a *aTtr1="1"  attr2='2' attr3=3 attr4>1</a><a>2</a><a *aTtr1="5"/><b *aTtr1="5"/><b/></div>`);
    const selector = 'a:angular(*atTr1)';
    const elements = document.querySelectorAll(selector);
    const element = document.querySelector(selector);
    expect(elements[0].innerHTML).toBe('1');
    expect(elements[1].innerHTML).toBe('');
    expect(elements.length).toBe(2);

    expect(elements[0]).toBe(element);
  });

  test('query tag with attribute(angular: property binding style)', function () {
    const document = new PHtmlParser().parse(`<div><a [aTtr1]="1"  attr2='2' attr3=3 attr4>1</a><a>2</a><a [aTtr1]="5"/><b [aTtr1]="1"/<b/></div>`);
    const selector = 'a:angular([atTr1])';
    const elements = document.querySelectorAll(selector);
    const element = document.querySelector(selector);
    expect(elements[0].innerHTML).toBe('1');
    expect(elements[1].innerHTML).toBe('');;
    expect(elements.length).toBe(2);

    expect(elements[0]).toBe(element);
  });

  test('query tag with attribute(angular: event binding style)', function () {
    const document = new PHtmlParser().parse(`<div><a (aTtr1)="1"  attr2='2' attr3=3 attr4>1</a><a>2</a><a (aTtr1)="5"/><b (aTtr1)="1"/<b/></div>`);
    const selector = 'a:angular((atTr1))';
    const elements = document.querySelectorAll(selector);
    const element = document.querySelector(selector);
    expect(elements[0].innerHTML).toBe('1');
    expect(elements[1].innerHTML).toBe('');;
    expect(elements.length).toBe(2);

    expect(elements[0]).toBe(element);
  });

  test('query tag with attribute(angular: two-way property style)', function () {
    const document = new PHtmlParser().parse(`<div><a [(aTtr1)]="1"  attr2='2' attr3=3 attr4>1</a><a>2</a><a [(aTtr1)]="5"/><b *aTtr1="1"/<b/></div>`);
    const selector = 'a:angular([(atTr1)])';
    const elements = document.querySelectorAll(selector);
    const element = document.querySelector(selector);
    expect(elements[0].innerHTML).toBe('1');
    expect(elements[1].innerHTML).toBe('');;
    expect(elements.length).toBe(2);

    expect(elements[0]).toBe(element);
  });

  test('query tag with attribute2(angular: two-way property style)', function () {
    const document = new PHtmlParser().parse(`<div><a [(aTtr1)]="1"  attr2='2' attr3=3 attr4>1</a><a>2</a><a [(aTtr1)]="5"/><b *aTtr1="1"/<b/></div>`);
    const selector = 'a:angular([(atTr1)]=1)';
    const elements = document.querySelectorAll(selector);
    const element = document.querySelector(selector);
    expect(elements[0].innerHTML).toBe('1');
    expect(elements.length).toBe(1);

    expect(elements[0]).toBe(element);
  });

});

describe("angular prop pseudo selector", () => {
  test('query tag with attribute(angular: sturcture directive style)', function () {
    const document = new PHtmlParser().parse(`<div><a aTtr1="0"/><a *aTtr1="1"/><a [aTtr1]="2"/><a (aTtr1)="3"/><a [(aTtr1)]="4"/></div>`);
    const selector = 'a:angular_prop(atTr1)';
    const elements = document.querySelectorAll(selector);
    expect(elements[0].getAttribute("attr1")).toBe('0');
    expect(elements[1].getAttribute("*attr1")).toBe('1');
    expect(elements[2].getAttribute("[attr1]")).toBe('2');
    expect(elements[3].getAttribute("(attr1)")).toBe('3');
    expect(elements[4].getAttribute("[(attr1)]")).toBe('4');
    expect(elements.length).toBe(5);

    expect(elements[0]).toBe(document.querySelector(":angular(attr1)"));
    expect(elements[1]).toBe(document.querySelector(":angular(*attr1)"));
    expect(elements[2]).toBe(document.querySelector(":angular([attr1])"));
    expect(elements[3]).toBe(document.querySelector(":angular((attr1))"));
    expect(elements[4]).toBe(document.querySelector(":angular([(attr1)])"));
  });

  test('query tag with attribute(angular: property binding style)', function () {
    const document = new PHtmlParser().parse(`<div><a [aTtr1]="1"  attr2='2' attr3=3 attr4>1</a><a>2</a><a [aTtr1]="5"/><b [aTtr1]="1"/<b/></div>`);
    const selector = 'a:angular([atTr1])';
    const elements = document.querySelectorAll(selector);
    const element = document.querySelector(selector);
    expect(elements[0].innerHTML).toBe('1');
    expect(elements[1].innerHTML).toBe('');;
    expect(elements.length).toBe(2);

    expect(elements[0]).toBe(element);
  });

  test('query tag with attribute(angular: event binding style)', function () {
    const document = new PHtmlParser().parse(`<div><a (aTtr1)="1"  attr2='2' attr3=3 attr4>1</a><a>2</a><a (aTtr1)="5"/><b (aTtr1)="1"/<b/></div>`);
    const selector = 'a:angular((atTr1))';
    const elements = document.querySelectorAll(selector);
    const element = document.querySelector(selector);
    expect(elements[0].innerHTML).toBe('1');
    expect(elements[1].innerHTML).toBe('');;
    expect(elements.length).toBe(2);

    expect(elements[0]).toBe(element);
  });

  test('query tag with attribute(angular: two-way property style)', function () {
    const document = new PHtmlParser().parse(`<div><a [(aTtr1)]="1"  attr2='2' attr3=3 attr4>1</a><a>2</a><a [(aTtr1)]="5"/><b *aTtr1="1"/<b/></div>`);
    const selector = 'a:angular([(atTr1)])';
    const elements = document.querySelectorAll(selector);
    const element = document.querySelector(selector);
    expect(elements[0].innerHTML).toBe('1');
    expect(elements[1].innerHTML).toBe('');;
    expect(elements.length).toBe(2);

    expect(elements[0]).toBe(element);
  });

  test('query tag with attribute2(angular: two-way property style)', function () {
    const document = new PHtmlParser().parse(`<div><a [(aTtr1)]="1"  attr2='2' attr3=3 attr4>1</a><a>2</a><a [(aTtr1)]="5"/><b *aTtr1="1"/<b/></div>`);
    const selector = 'a:angular([(atTr1)]=1)';
    const elements = document.querySelectorAll(selector);
    const element = document.querySelector(selector);
    expect(elements[0].innerHTML).toBe('1');
    expect(elements.length).toBe(1);

    expect(elements[0]).toBe(element);
  });

});