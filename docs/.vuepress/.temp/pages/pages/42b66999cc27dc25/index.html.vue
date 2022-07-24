<template><div><h1 id="文字在一行或两行时超出显示省略号" tabindex="-1"><a class="header-anchor" href="#文字在一行或两行时超出显示省略号" aria-hidden="true">#</a> 文字在一行或两行时超出显示省略号</h1>
<h2 id="一行超出显示省略" tabindex="-1"><a class="header-anchor" href="#一行超出显示省略" aria-hidden="true">#</a> 一行超出显示省略</h2>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code>overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><!-- more -->
<p>:::demo [vanilla]</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;html&gt;
   &lt;div class=&quot;box-42b6&quot;&gt;演示文字演示文字演示文字演示文字演示文字演示文字演示文字演示文字演示文字演示文字演示文字演示文字演示文字演示文字演示文字演示文字演示文字&lt;/div&gt;
&lt;/html&gt;
&lt;style&gt;
    .box-42b6{
        border: 1px solid #999;
        width: 200px;
        
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
&lt;/style&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>:::</p>
<h2 id="两行-多行-超出显示省略号" tabindex="-1"><a class="header-anchor" href="#两行-多行-超出显示省略号" aria-hidden="true">#</a> 两行（多行）超出显示省略号</h2>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code>overflow: hidden;
white-space: normal;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>显示的行数由<code v-pre>line-clamp</code>样式的值决定。</p>
<p>:::demo [vanilla]</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;html&gt;
   &lt;div class=&quot;box2-42b6&quot;&gt;演示文字演示文字演示文字演示文字演示文字演示文字演示文字演示文字演示文字演示文字演示文字演示文字演示文字演示文字演示文字演示文字演示文字&lt;/div&gt;
&lt;/html&gt;
&lt;style&gt;
    .box2-42b6{
        border: 1px solid #999;
        width: 200px;
  
        overflow: hidden;
        white-space: normal;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        
      }
&lt;/style&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>:::</p>
</div></template>
