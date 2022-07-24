<template><div><h1 id="flex布局案例-圣杯布局" tabindex="-1"><a class="header-anchor" href="#flex布局案例-圣杯布局" aria-hidden="true">#</a> flex布局案例-圣杯布局</h1>
<blockquote>
<p>可用<kbd>F12</kbd>开发者工具查看元素及样式，可打开codepen在线编辑代码。</p>
</blockquote>
<p>::: demo [vanilla]</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;html&gt;
  &lt;div class=&quot;HolyGrail&quot;&gt;
    &lt;header&gt;#header&lt;/header&gt;
    &lt;div class=&quot;wrap&quot;&gt;
      &lt;nav class=&quot;left&quot;&gt;left 宽度固定200px&lt;/nav&gt;
      &lt;main class=&quot;content&quot;&gt;center 宽度自适应&lt;/main&gt;
      &lt;aside class=&quot;right&quot;&gt;right 宽度固定200px&lt;/aside&gt;
    &lt;/div&gt;
    &lt;footer&gt;#footer&lt;/footer&gt;
  &lt;/div&gt;
&lt;/html&gt;
&lt;style&gt;
  .HolyGrail {
    text-align: center;
    display: flex;
    min-height: 40vh;
    flex-direction: column;
  }
  .HolyGrail .wrap {
    display: flex;
    flex: 1;
  }
  .HolyGrail .content {
    background: #eee;
    flex: 1;
  }
  .HolyGrail .left,.HolyGrail .right {
    background:lightgreen;
    flex: 0 0 200px;
  }
  .HolyGrail header,.HolyGrail footer{
    background:#999;
    height: 50px;
    line-height: 50px;
  }
  .HolyGrail .left {
    background:salmon;
  }
&lt;/style&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>:::</p>
<blockquote>
<p>参考：<a href="http://www.ruanyifeng.com/blog/2015/07/flex-examples.html" target="_blank" rel="noopener noreferrer">http://www.ruanyifeng.com/blog/2015/07/flex-examples.html</a></p>
</blockquote>
</div></template>
