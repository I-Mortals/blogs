<template><div><h1 id="flex布局案例-骰子" tabindex="-1"><a class="header-anchor" href="#flex布局案例-骰子" aria-hidden="true">#</a> flex布局案例-骰子</h1>
<blockquote>
<p>可用<kbd>F12</kbd>开发者工具查看元素及样式，可打开codepen在线编辑代码。</p>
</blockquote>
<p>::: demo [vanilla]</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;html&gt;
  &lt;div class=&quot;box2&quot;&gt;
    &lt;div class=&quot;first-face&quot;&gt;
      &lt;span class=&quot;pip&quot;&gt;&lt;/span&gt;
    &lt;/div&gt;
    &lt;div class=&quot;second-face&quot;&gt;
      &lt;span class=&quot;pip&quot;&gt;&lt;/span&gt;
      &lt;span class=&quot;pip&quot;&gt;&lt;/span&gt;
    &lt;/div&gt;
    &lt;div class=&quot;third-face&quot;&gt;
      &lt;span class=&quot;pip&quot;&gt;&lt;/span&gt;
      &lt;span class=&quot;pip&quot;&gt;&lt;/span&gt;
      &lt;span class=&quot;pip&quot;&gt;&lt;/span&gt;
    &lt;/div&gt;
    &lt;div class=&quot;fourth-face&quot;&gt;
      &lt;div class=&quot;column&quot;&gt;
        &lt;span class=&quot;pip&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;pip&quot;&gt;&lt;/span&gt;
      &lt;/div&gt;
      &lt;div class=&quot;column&quot;&gt;
        &lt;span class=&quot;pip&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;pip&quot;&gt;&lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;fifth-face&quot;&gt;
      &lt;div class=&quot;column&quot;&gt;
        &lt;span class=&quot;pip&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;pip&quot;&gt;&lt;/span&gt;
      &lt;/div&gt;
      &lt;div class=&quot;column&quot;&gt;
        &lt;span class=&quot;pip&quot;&gt;&lt;/span&gt;
      &lt;/div&gt;
      &lt;div class=&quot;column&quot;&gt;
        &lt;span class=&quot;pip&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;pip&quot;&gt;&lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;sixth-face&quot;&gt;
      &lt;div class=&quot;column&quot;&gt;
        &lt;span class=&quot;pip&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;pip&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;pip&quot;&gt;&lt;/span&gt;
      &lt;/div&gt;
      &lt;div class=&quot;column&quot;&gt;
        &lt;span class=&quot;pip&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;pip&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;pip&quot;&gt;&lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/html&gt;
&lt;style&gt;
  /* 一 */
  .first-face { /* 形成上下左右居中 */
    display: flex;
    /* 项目在主轴上居中 */
    justify-content: center;
    /* 项目在交叉轴上居中 */
    align-items: center;
  }
  /* 二 */
  .second-face {
    display: flex;
    /* 两侧对齐 */
    justify-content: space-between;
  }
  .second-face .pip:nth-of-type(2) {
    /* 居下 */
    align-self: flex-end;
  }/* 三 */
  .third-face {
    display: flex;
    /* 两侧对齐 */
    justify-content: space-between;
  }
  .third-face .pip:nth-of-type(2) {
    /* 居中 */
    align-self: center;
  }
  .third-face .pip:nth-of-type(3) {
    /* 居下 */
    align-self: flex-end;
  }
  /* 四 、六*/
  .fourth-face,
  .sixth-face {
    display: flex;
    /* 两侧对齐 */
    justify-content: space-between;
  }
  .fourth-face .column,
  .sixth-face .column {
    display: flex;
    /* 纵向排列 */
    flex-direction: column;
    /* 两侧对齐 */
    justify-content: space-between;
  }
  /* 五 */
  .fifth-face {
    display: flex;
    /* 两侧对齐 */
    justify-content: space-between;
  }
  .fifth-face .column {
    display: flex;
    /* 纵向排列 */
    flex-direction: column;
    /* 两侧对齐 */
    justify-content: space-between;
  }
  .fifth-face .column:nth-of-type(2) {
    /* 居中对齐 */
    justify-content: center;
  }
/* 基础样式 */
.box2 {
  display: flex;
  /* 项目在交叉轴上居中 */
  align-items: center;
  /* 项目在主轴上居中 */
  justify-content: center;
  vertical-align: center;
  /* 允许项目换行 */
  flex-wrap: wrap;  /* 项目是多行时以交叉轴中心对齐 */
  align-content: center;
  font-family: 'Open Sans', sans-serif;
}
/* 类名包含face的元素 */
[class$=&quot;face&quot;] {
  margin: 5px;
  padding: 4px;  background-color: #e7e7e7;
  width: 104px;
  height: 104px;
  object-fit: contain;  box-shadow:
    inset 0 5px white,
    inset 0 -5px #bbb,
    inset 5px 0 #d7d7d7,
    inset -5px 0 #d7d7d7;  border-radius: 10%;
}
.pip {
  display: block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin: 4px;  background-color: #333;
  box-shadow: inset 0 3px #111, inset 0 -3px #555;
}
&lt;/style&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>:::</p>
<blockquote>
<p>参考：<a href="http://www.ruanyifeng.com/blog/2015/07/flex-examples.html" target="_blank" rel="noopener noreferrer">http://www.ruanyifeng.com/blog/2015/07/flex-examples.html</a></p>
</blockquote>
</div></template>
