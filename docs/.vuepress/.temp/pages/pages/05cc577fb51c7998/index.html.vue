<template><div><h1 id="flex布局案例-输入框布局" tabindex="-1"><a class="header-anchor" href="#flex布局案例-输入框布局" aria-hidden="true">#</a> flex布局案例-输入框布局</h1>
<blockquote>
<p>可用<kbd>F12</kbd>开发者工具查看元素及样式，可打开codepen在线编辑代码。</p>
</blockquote>
<p>::: demo [vanilla]</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;html&gt;
  &lt;div class=&quot;InputAddOn&quot;&gt;
    &lt;span class=&quot;InputAddOn-item&quot;&gt;icon&lt;/span&gt;
    &lt;input class=&quot;InputAddOn-field&quot; placeholder=&quot;input宽度自适应&quot;&gt;
    &lt;button class=&quot;InputAddOn-item&quot;&gt;提交&lt;/button&gt;
  &lt;/div&gt;
  &lt;br/&gt;
  &lt;div class=&quot;Media&quot;&gt;
    &lt;div class=&quot;Media-figure&quot;&gt;左侧固定&lt;/div&gt;
    &lt;p class=&quot;Media-body&quot;&gt;右侧自适应右侧自适应右侧自适应右侧自适应右侧自适应右侧自适应右侧自适应右侧自适应右侧自适应右侧自适应右侧自适应右侧自适应右侧自适应右侧自适应&lt;/p&gt;
  &lt;/div&gt;
&lt;/html&gt;
&lt;style&gt;
  .InputAddOn {
    display: flex;
  }
  .InputAddOn-field {
    flex: 1;
  }
  .Media {
    display: flex;
    align-items: flex-start;
  }
  .Media-figure {
    width: 100px;
    height: 100px;
    background: #eee;
    margin-right: 1em;
  }
  .Media-body {
    flex: 1;
  }
  /* 基础样式 */
  input:-webkit-autofill,
  select:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset !important;
  }
  input {
    outline-color: invert;
    outline-style: none;
    outline-width: 0px;
    text-shadow: none;
    -webkit-appearance: none;
    -webkit-user-select: text;
    outline-color: transparent;
    box-shadow: none;
  }
  .InputAddOn-item {
    width: 100px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #ccc;
    background: #eee
  }
  .InputAddOn-field {
    height: 30px;
    padding: 1px 6px;
    border: 1px solid #ccc;
    border-left: none;
    border-right: none;
  }
&lt;/style&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>:::</p>
<blockquote>
<p>参考：<a href="http://www.ruanyifeng.com/blog/2015/07/flex-examples.html" target="_blank" rel="noopener noreferrer">http://www.ruanyifeng.com/blog/2015/07/flex-examples.html</a></p>
</blockquote>
</div></template>
