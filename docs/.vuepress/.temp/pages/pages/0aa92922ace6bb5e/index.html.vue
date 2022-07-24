<template><div><h1 id="transition-group列表过渡" tabindex="-1"><a class="header-anchor" href="#transition-group列表过渡" aria-hidden="true">#</a> transition-group列表过渡</h1>
<h2 id="列表的进入-离开过渡" tabindex="-1"><a class="header-anchor" href="#列表的进入-离开过渡" aria-hidden="true">#</a> 列表的进入/离开过渡</h2>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;transition-group tag=&quot;ul&quot;&gt; &lt;!--tag转为ul--&gt;
    &lt;li v-for=&quot;item in list&quot; :key=&quot;item&quot;&gt;{{item}}&lt;/li&gt; &lt;!--子元素要有key--&gt;
&lt;/transition-group&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意</strong>：列表元素一定要有<code v-pre>key</code></p>
<!-- more -->
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code>.v-enter,.v-leave-to{
  opacity: 0;
  transform: translateX(30px);
}
.v-enter-active,.v-leave-active{
  transition: all 1s;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p class="codepen" data-height="345" data-theme-id="light" data-default-tab="html,result" data-user="xugaoyi" data-slug-hash="WNvxGjQ" style="height: 345px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="vue列表过渡">
  <span>See the Pen <a href="https://codepen.io/xugaoyi/pen/WNvxGjQ">
  vue列表过渡</a> by xugaoyi (<a href="https://codepen.io/xugaoyi">@xugaoyi</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
<h2 id="列表的排序过渡" tabindex="-1"><a class="header-anchor" href="#列表的排序过渡" aria-hidden="true">#</a> 列表的排序过渡</h2>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code>.v-move {
  transition: transform 1s;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p class="codepen" data-height="313" data-theme-id="light" data-default-tab="html,result" data-user="xugaoyi" data-slug-hash="gOpMwXN" style="height: 313px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="vue列表过渡-排序过渡">
  <span>See the Pen <a href="https://codepen.io/xugaoyi/pen/gOpMwXN">
  vue列表过渡-排序过渡</a> by xugaoyi (<a href="https://codepen.io/xugaoyi">@xugaoyi</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
<p><strong>列表过渡&amp;排序过渡</strong></p>
<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="html,result" data-user="xugaoyi" data-slug-hash="VwLjmmw" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="vue列表过渡&amp;amp;排序过渡">
  <span>See the Pen <a href="https://codepen.io/xugaoyi/pen/VwLjmmw">
  vue列表过渡&amp;排序过渡</a> by xugaoyi (<a href="https://codepen.io/xugaoyi">@xugaoyi</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
</div></template>
