<template><div><h1 id="flex布局案例-网格布局" tabindex="-1"><a class="header-anchor" href="#flex布局案例-网格布局" aria-hidden="true">#</a> flex布局案例-网格布局</h1>
<blockquote>
<p>可用<kbd>F12</kbd>开发者工具查看元素及样式，可打开codepen在线编辑代码。</p>
</blockquote>
<p>::: demo [vanilla]</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;html&gt;
  &lt;div class=&quot;grid&quot;&gt;
    &lt;div class=&quot;grid-cell&quot;&gt;1/2&lt;/div&gt;
    &lt;div class=&quot;grid-cell&quot;&gt;1/2&lt;/div&gt;
  &lt;/div&gt;

  &lt;div class=&quot;grid&quot;&gt;
    &lt;div class=&quot;grid-cell&quot;&gt;1/3&lt;/div&gt;
    &lt;div class=&quot;grid-cell&quot;&gt;1/3&lt;/div&gt;
    &lt;div class=&quot;grid-cell&quot;&gt;1/3&lt;/div&gt;
  &lt;/div&gt;

  &lt;div class=&quot;grid&quot;&gt;
    &lt;div class=&quot;grid-cell&quot;&gt;1/4&lt;/div&gt;
    &lt;div class=&quot;grid-cell&quot;&gt;1/4&lt;/div&gt;
    &lt;div class=&quot;grid-cell&quot;&gt;1/4&lt;/div&gt;
    &lt;div class=&quot;grid-cell&quot;&gt;1/4&lt;/div&gt;
  &lt;/div&gt;

  &lt;div class=&quot;grid text&quot;&gt;
    &lt;div class=&quot;grid-cell&quot;&gt;
      高度会跟随右侧元素变化
    &lt;/div&gt;
    &lt;div class=&quot;grid-cell&quot;&gt;
      内容填充内容填充内容填充内容填充内容填充内容填充内容填充内容填充内容填充内容填充内容填充内容填充内容填充内容填充内容填充内容填充内容填充内容填充内容填充内容填充内容填充内容填充内容填充内容填充
    &lt;/div&gt;
  &lt;/div&gt;

  &lt;h4&gt;某个网格设置百分比宽度&lt;/h4&gt;
  &lt;div class=&quot;grid&quot;&gt;
      &lt;div class=&quot;grid-cell u-full&quot;&gt;100%&lt;/div&gt;
  &lt;/div&gt;
  &lt;div class=&quot;grid&quot;&gt;
      &lt;div class=&quot;grid-cell u-1of2&quot;&gt;50%&lt;/div&gt;
      &lt;div class=&quot;grid-cell&quot;&gt;auto&lt;/div&gt;
      &lt;div class=&quot;grid-cell&quot;&gt;auto&lt;/div&gt;
  &lt;/div&gt;
  &lt;div class=&quot;grid&quot;&gt;
      &lt;div class=&quot;grid-cell u-1of3&quot;&gt;33.33%&lt;/div&gt;
      &lt;div class=&quot;grid-cell&quot;&gt;auto&lt;/div&gt;
      &lt;div class=&quot;grid-cell&quot;&gt;auto&lt;/div&gt;
  &lt;/div&gt;
  &lt;div class=&quot;grid&quot;&gt;
      &lt;div class=&quot;grid-cell u-1of4&quot;&gt;25%&lt;/div&gt;
      &lt;div class=&quot;grid-cell&quot;&gt;auto&lt;/div&gt;
      &lt;div class=&quot;grid-cell&quot;&gt;auto&lt;/div&gt;
      &lt;div class=&quot;grid-cell&quot;&gt;auto&lt;/div&gt;
      &lt;div class=&quot;grid-cell&quot;&gt;auto&lt;/div&gt;
      &lt;div class=&quot;grid-cell&quot;&gt;auto&lt;/div&gt;
      &lt;div class=&quot;grid-cell&quot;&gt;auto&lt;/div&gt;
  &lt;/div&gt;
&lt;/html&gt;
&lt;style&gt;
  .grid {
    display: flex;
  }
  .grid-cell {
    flex: 1;
  }
  .grid-cell.u-full {
    flex: 0 0 100%;
  }
  .grid-cell.u-1of2 {
    flex: 0 0 50%;
  }
  .grid-cell.u-1of3 {
    flex: 0 0 33.3333%;
  }
  .grid-cell.u-1of4 {
    flex: 0 0 25%;
  }
  /* 基础样式 */
  .grid-cell {
    background: #eee;
    text-align: center;
    margin: 5px;
    padding: 10px 0;
  }
  .text .grid-cell {
    text-align: left
  }
&lt;/style&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>:::</p>
<blockquote>
<p>参考：<a href="http://www.ruanyifeng.com/blog/2015/07/flex-examples.html" target="_blank" rel="noopener noreferrer">http://www.ruanyifeng.com/blog/2015/07/flex-examples.html</a></p>
</blockquote>
</div></template>
