# pHtmlParser (preserve html parser)

pHtmlParserは可能な限りオリジナルのHTMLを維持しながら、DOM操作を行うことを目的としたHTMLパーサです。

例えば、[HTML5](https://html.spec.whatwg.org/)では`13.2.6 Tree construction`にてノードの作成と挿入について触れられています。
これは一般的なブラウザでは`table`タグ内の`tbody`を補完することとして知られていますが、本パーサでは補完せずにHTMLファイルをありのまま解析します。

## 用語

### self-closing tag (ex. `<p/>``<br/>` )
`明示的に`クローズされたタグを示します。
例えば、`<p/>`に子要素を追加後、再び削除された場合、`<p></p>`でなく、`<p/>`として維持されます。

### unclosed tag (ex. `<a>"<b>"</a>` `<br>` )
クローズされていないタグを示します。
現状では、`<a><b>text</a>`は、`<a><b></b>text</a>`と等価として解析します。

### trail space (ex. `<a href="xxx.html"   >`)
タグ末尾に含まれる余計なスペースを示します。
