<template><div><h1 id="vue中的scoped和scoped穿透" tabindex="-1"><a class="header-anchor" href="#vue中的scoped和scoped穿透" aria-hidden="true">#</a> Vue中的scoped和scoped穿透</h1>
<h2 id="什么是scoped" tabindex="-1"><a class="header-anchor" href="#什么是scoped" aria-hidden="true">#</a> 什么是scoped？</h2>
<p>在Vue文件中的style标签上有一个特殊的属性<code v-pre>scoped</code>。当一个style标签拥有<code v-pre>scoped</code>属性时候，它的css样式只能用于当前的Vue组件，可以使组件的样式不相互污染。如果一个项目的所有style标签都加上了<code v-pre>scoped</code>属性，相当于实现了样式的模块化。</p>
<!-- more -->
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;style lang=&quot;less&quot; scoped&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="scoped的实现原理" tabindex="-1"><a class="header-anchor" href="#scoped的实现原理" aria-hidden="true">#</a> scoped的实现原理</h2>
<p>Vue中的<code v-pre>scoped</code>属性的效果主要是通过<code v-pre>PostCss</code>实现的。以下是转译前后的代码:</p>
<p>转译前:</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;style lang=&quot;less&quot; scoped&gt;
    .example{
        color:red;
    }
&lt;/style&gt;
&lt;template&gt;
    &lt;div class=&quot;example&quot;&gt;scoped测试案例&lt;/div&gt;
&lt;/template&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>转译后:</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;style&gt;
    .example[data-v-5558831a] {
      color: red;
    }
&lt;/style&gt;
&lt;template&gt;
    &lt;div class=&quot;example&quot; data-v-5558831a&gt;scoped测试案例&lt;/div&gt;
&lt;/template&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>PostCSS</code>给一个组件中的所有DOM添加了一个独一无二的动态属性，给css选择器额外添加一个对应的属性选择器，来选择组件中的DOM,这种做法使得样式只作用于含有该属性的DOM元素(组件内部的DOM)。</p>
<p><strong>总结：<code v-pre>scoped</code>的渲染规则</strong>：</p>
<ol>
<li>给HTML的DOM节点添加一个不重复的data属性(例如: data-v-5558831a)来唯一标识这个DOM 元素</li>
<li>在每句css选择器的末尾(编译后生成的css语句)加一个当前组件的data属性选择器(例如：[data-v-5558831a])来私有化样式</li>
</ol>
<h2 id="scoped穿透" tabindex="-1"><a class="header-anchor" href="#scoped穿透" aria-hidden="true">#</a> scoped穿透</h2>
<p><code v-pre>scoped</code>看起来很好用，当时在Vue项目中，当我们引入第三方组件库时(如使用vue-awesome-swiper实现移动端轮播)，需要在局部组件中修改第三方组件库的样式，而又不想去除<code v-pre>scoped</code>属性造成组件之间的样式覆盖。这时我们可以通过特殊的方式穿透scoped。</p>
<p><strong>stylus的样式穿透 使用 <code v-pre>&gt;&gt;&gt;</code></strong></p>
<div class="language-stylus ext-styl line-numbers-mode"><pre v-pre class="language-stylus"><code>外层 &gt;&gt;&gt; 子组件元素
  样式
        
.wrapper &gt;&gt;&gt; .swiper-pagination-bullet-active
  background: #fff
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>sass和less的样式穿透 使用<code v-pre>/deep/</code></strong></p>
<div class="language-less ext-less line-numbers-mode"><pre v-pre class="language-less"><code>外层 /deep/ 子组件元素 {
    样式
}
.wrapper /deep/ .swiper-pagination-bullet-active{
    background: #fff;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="在组件中修改第三方组件库样式的其它方法" tabindex="-1"><a class="header-anchor" href="#在组件中修改第三方组件库样式的其它方法" aria-hidden="true">#</a> 在组件中修改第三方组件库样式的其它方法</h2>
<p>上面我们介绍了在使用<code v-pre>scoped</code> 属性时，通过<code v-pre>scoped</code>穿透的方式修改引入第三方组件库样式的方法，下面我们介绍其它方式来修改引入第三方组件库的样式：</p>
<ul>
<li>
<p>在vue组件中不使用<code v-pre>scoped</code>属性</p>
</li>
<li>
<p>在vue组建中使用两个style标签，一个加上<code v-pre>scoped</code>属性，一个不加<code v-pre>scoped</code>属性，把需要覆盖的css样式写在不加<code v-pre>scoped</code>属性的style标签里</p>
</li>
<li>
<p>建立一个reset.css(基础全局样式)文件，里面写覆盖的css样式，在入口文件main.js 中引入</p>
</li>
</ul>
</div></template>
