<template><div><h1 id="兄弟组件传值" tabindex="-1"><a class="header-anchor" href="#兄弟组件传值" aria-hidden="true">#</a> 兄弟组件传值</h1>
<p>子组件1中把值传到父组件,父组件获取值传入子组件2</p>
<p>父组件：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>&lt;子组件1 @方法名x=&quot;方法名y&quot;&gt;&lt;/子组件1&gt;

&lt;子组件2 :值名称x=&quot;值x&quot;&gt;&lt;/子组件2 &gt;

data() {
	return {
	 值x: ''
	}
},
methods: {
	方法名y(值) {
		this.值x = 值
	}
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>子组件1：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>this.$emit('方法名x', 值) // 传出值
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>子组件2：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>props: {
    值名称x: { // 接收父组件传入值
        type: String,
        default: ''
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>
