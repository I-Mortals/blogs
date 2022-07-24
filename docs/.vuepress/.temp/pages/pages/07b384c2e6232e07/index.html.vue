<template><div><h1 id="父组件给子组件传值" tabindex="-1"><a class="header-anchor" href="#父组件给子组件传值" aria-hidden="true">#</a> 父组件给子组件传值</h1>
<p>父组件中，通过给子组件标签v-bind绑定属性的方式传入值</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;ComponentName v-bind:name=&quot;value&quot;&gt;&lt;/ComponentName&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>如果不使用v-bind传入的值为字符串，使用v-bind绑定传入的值为表达式。</p>
</blockquote>
<!-- more -->
<p>子组件中，通过props对象接收值</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code> props: {
    name: { // 接收父组件传入值
        type: String || ...,
        default: ''
    }
 }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="单向数据流" tabindex="-1"><a class="header-anchor" href="#单向数据流" aria-hidden="true">#</a> 单向数据流</h2>
<p>所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。</p>
<p><strong>子组件不能直接修改父组件传入的值</strong></p>
<p>这里有两种常见的试图改变一个 prop 的情形：</p>
<ol>
<li>这个 prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 prop 数据来使用。在这种情况下，最好定义一个本地的 data 属性并将这个 prop 用作其初始值：</li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>props: ['initialCounter'],
data: function () {
  return {
    counter: this.initialCounter
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>这个 prop 以一种原始的值传入且需要进行转换。在这种情况下，最好使用这个 prop 的值来定义一个计算属性：</li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="父子组件间传递数据-demo" tabindex="-1"><a class="header-anchor" href="#父子组件间传递数据-demo" aria-hidden="true">#</a> 父子组件间传递数据 demo</h2>
<p class="codepen" data-height="400" data-theme-id="light" data-default-tab="js,result" data-user="xugaoyi" data-slug-hash="mdJVqgg" style="height: 400px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="mdJVqgg">
  <span>See the Pen <a href="https://codepen.io/xugaoyi/pen/mdJVqgg">
  mdJVqgg</a> by xugaoyi (<a href="https://codepen.io/xugaoyi">@xugaoyi</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
</div></template>
