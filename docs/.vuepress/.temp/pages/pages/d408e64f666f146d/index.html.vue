<template><div><h1 id="非父子组件间传值" tabindex="-1"><a class="header-anchor" href="#非父子组件间传值" aria-hidden="true">#</a> 非父子组件间传值</h1>
<p>当组件的嵌套多时，非父子组件间传值就显得复杂，除了使用<a href="https://vuex.vuejs.org/zh/" target="_blank" rel="noopener noreferrer">vuex</a>实现之外，还可以通过Bus（或者叫 总线/发布订阅模式/观察者模式）的方式实现非父子组件间传值。</p>
<!-- more -->
<div id="root">
		<child1 content="组件1：点我传出值"></child1>
		<child2 content="组件2"></child2>
	</div>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;div id=&quot;root&quot;&gt;
    &lt;child1 content=&quot;组件1：点我传出值&quot;&gt;&lt;/child1&gt;
    &lt;child2 content=&quot;组件2&quot;&gt;&lt;/child2&gt;
&lt;/div&gt;

&lt;script type=&quot;text/javascript&quot;&gt;
	Vue.prototype.bus = new Vue()
	// 每个Vue原型上都会有bus属性,而且指向同一个Vue实例

	Vue.component('child1', {
		props: {
			content: String
		},
		template: '&lt;button @click=&quot;handleClick&quot;&gt;{{content}}&lt;/button&gt;',
		methods: {
			handleClick(){
				this.bus.$emit('change', '我是组件1过来的~') // 触发change事件，传出值
			}
		}
	})

	Vue.component('child2', {
		data() {
			return {
				childVal: ''
			}
		},
		props: {
			content: String,
		},
		template: '&lt;button&gt;{{content}} + {{childVal}}&lt;/button&gt;',
		mounted() {
			this.bus.$on('change', (msg) =&gt; { // 绑定change事件，执行函数接收值
				this.childVal = msg
			})
		}
	})

	var vm = new Vue({
		el: '#root'
	})
&lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，在Vue原型上绑定一个<code v-pre>bus</code>属性，指向一个Vue实例，之后每个Vue实例都会有一个<code v-pre>bus</code>属性。</p>
<blockquote>
<p>此方法传值，不限于兄弟组件之间，其他关系组件间都适用。</p>
</blockquote>
<p class="codepen" data-height="400" data-theme-id="light" data-default-tab="js,result" data-user="xugaoyi" data-slug-hash="wvaGwEj" style="height: 400px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="非父子组件间传值2（Bus /总线/发布订阅模式/观察者模式）">
  <span>See the Pen <a href="https://codepen.io/xugaoyi/pen/wvaGwEj">
  非父子组件间传值2（Bus /总线/发布订阅模式/观察者模式）</a> by xugaoyi (<a href="https://codepen.io/xugaoyi">@xugaoyi</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
</div></template>
