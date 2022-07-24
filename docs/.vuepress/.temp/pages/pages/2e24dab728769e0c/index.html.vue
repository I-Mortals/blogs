<template><div><h1 id="父组件调用子组件方法并传入值" tabindex="-1"><a class="header-anchor" href="#父组件调用子组件方法并传入值" aria-hidden="true">#</a> 父组件调用子组件方法并传入值</h1>
<p>通过<code v-pre>ref</code>引用调用子组件内的方法并传入参数</p>
<p>父组件：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>&lt;子组件标签  ref=&quot;refName&quot;&gt;&lt;/子组件标签&gt;

methods: {
    fnX(x) {
      this.$refs.refName.fnY(x) // 调用子组件方法并传入值
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>子组件：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>methods: {
    fnY(x) {
      this.x = x
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>
