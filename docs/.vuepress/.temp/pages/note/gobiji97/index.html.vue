<template><div><h1 id="golang-值" tabindex="-1"><a class="header-anchor" href="#golang-值" aria-hidden="true">#</a> golang-值</h1>
<p>Go 拥有各值类型，包括字符串，整形，浮点型，布尔
型等。下面是一些基本的例子。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>package main

import &quot;fmt&quot;

func main() {

    // 字符串可以通过 `+` 连接。
    fmt.Println(&quot;go&quot; + &quot;lang&quot;)

    // 整数和浮点数
    fmt.Println(&quot;1+1 =&quot;, 1+1)
    fmt.Println(&quot;7.0/3.0 =&quot;, 7.0/3.0)

    // 布尔型，还有你想要的逻辑运算符。
    fmt.Println(true &amp;&amp; false)
    fmt.Println(true || false)
    fmt.Println(!true)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>
