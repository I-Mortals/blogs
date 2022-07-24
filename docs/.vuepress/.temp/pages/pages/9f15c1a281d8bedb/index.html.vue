<template><div><h1 id="stylus混入-mixins" tabindex="-1"><a class="header-anchor" href="#stylus混入-mixins" aria-hidden="true">#</a> stylus混入(Mixins)</h1>
<h2 id="混入-mixins" tabindex="-1"><a class="header-anchor" href="#混入-mixins" aria-hidden="true">#</a> 混入(Mixins)</h2>
<p>混入和函数定义方法一致，但是应用却大相径庭。</p>
<p>一个简单的混入应用，定义一个超出显示省略号的<code v-pre>ellipsis()</code>方法，在需要用到的地方只需插入这个方法，其样式会扩展并复制到选择器中。</p>
<!-- more -->
<div class="language-stylus ext-styl line-numbers-mode"><pre v-pre class="language-stylus"><code>ellipsis()
  overflow hidden
  white-space nowrap
  text-overflow ellipsis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-stylus ext-styl line-numbers-mode"><pre v-pre class="language-stylus"><code>p
  ellipsis()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>下面有定义的<code v-pre>border-radius(n)</code>方法，其却作为一个<em>mixin</em>（如，作为状态调用，而非表达式）调用。</p>
<p>当<code v-pre>border-radius()</code>选择器中调用时候，属性会被扩展并复制在选择器中。</p>
<div class="language-stylus ext-styl line-numbers-mode"><pre v-pre class="language-stylus"><code>border-radius(n)
  -webkit-border-radius n
  -moz-border-radius n
  border-radius n

form input[type=button]
  border-radius(5px)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译成：</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code>form input[type=button] {
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用混入书写，你可以完全忽略括号，提供梦幻般私有属性的支持。</p>
<div class="language-stylus ext-styl line-numbers-mode"><pre v-pre class="language-stylus"><code>border-radius(n)
  -webkit-border-radius n
  -moz-border-radius n
  border-radius n

form input[type=button]
  border-radius 5px
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意到我们混合书写中的<code v-pre>border-radius</code>当作了属性，而不是一个递归函数调用。</p>
<p>更进一步，我们可以利用<code v-pre>arguments</code>这个局部变量，传递可以包含多值的表达式。</p>
<div class="language-stylus ext-styl line-numbers-mode"><pre v-pre class="language-stylus"><code>border-radius()
  -webkit-border-radius arguments
  -moz-border-radius arguments
  border-radius arguments
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们可以像这样子传值：<code v-pre>border-radius 1px 2px / 3px 4px</code>!</p>
<p>另外一个很赞的应用是特定的私有前缀支持——例如IE浏览器的透明度：</p>
<div class="language-stylus ext-styl line-numbers-mode"><pre v-pre class="language-stylus"><code>support-for-ie ?= true

opacity(n)
  opacity n
  if support-for-ie
    filter unquote('progid:DXImageTransform.Microsoft.Alpha(Opacity=' + round(n * 100) + ')')

#logo
  &amp;:hover
    opacity 0.5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>渲染为：</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code>#logo:hover {
  opacity: 0.5;
  filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=50);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>来源：<a href="https://www.zhangxinxu.com/jq/stylus/mixins.php" target="_blank" rel="noopener noreferrer">https://www.zhangxinxu.com/jq/stylus/mixins.php</a></p>
</div></template>
