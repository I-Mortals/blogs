<template><div><h1 id="mixin混入" tabindex="-1"><a class="header-anchor" href="#mixin混入" aria-hidden="true">#</a> Mixin混入</h1>
<h2 id="基础" tabindex="-1"><a class="header-anchor" href="#基础" aria-hidden="true">#</a> 基础</h2>
<p>混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。</p>
<!-- more -->
<blockquote>
<p>组件选项：指的是组件对象中的 <code v-pre>data</code>、<code v-pre>created</code>、<code v-pre>methods</code> 等等选项。</p>
<p>可通过 <code v-pre>this.$options</code> 查看选项</p>
</blockquote>
<p>例子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 定义一个混入对象
var myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}

// 定义一个使用混入对象的组件
var Component = Vue.extend({
  mixins: [myMixin]
})

var component = new Component() // =&gt; &quot;hello from mixin!&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>通俗讲，就是把组件的部分代码抽离出来，再&quot;混合&quot;进入组件。当多个组件有相同的选项代码时，可以把相同的选项代码抽离到一个文件，再混入到每个组件，从而达到共享部分代码的目的。</strong></p>
<h2 id="选项合并" tabindex="-1"><a class="header-anchor" href="#选项合并" aria-hidden="true">#</a> 选项合并</h2>
<p>当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行“合并”。</p>
<p>比如，数据对象在内部会进行递归合并，并<strong>在发生冲突时以组件数据优先</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var mixin = {
  data: function () {
    return {
      message: 'hello',
      foo: 'abc'
    }
  }
}

new Vue({
  mixins: [mixin],
  data: function () {
    return {
      message: 'goodbye',
      bar: 'def'
    }
  },
  created: function () {
    console.log(this.$data)
    // =&gt; { message: &quot;goodbye&quot;, foo: &quot;abc&quot;, bar: &quot;def&quot; }
    // message同名，组件数据优先，而foo被混入
  }
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>同名钩子函数将合并为一个数组，因此都将被调用</strong>。另外，混入对象的钩子将在组件自身钩子<strong>之前</strong>调用。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var mixin = {
  created: function () {
    console.log('混入对象的钩子被调用')
  }
}

new Vue({
  mixins: [mixin],
  created: function () {
    console.log('组件钩子被调用')
  }
})

// =&gt; &quot;混入对象的钩子被调用&quot;
// =&gt; &quot;组件钩子被调用&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值为对象的选项，例如 <code v-pre>methods</code>、<code v-pre>components</code> 和 <code v-pre>directives</code>，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var mixin = {
  methods: {
    foo: function () {
      console.log('foo')
    },
    conflicting: function () {
      console.log('from mixin')
    }
  }
}

var vm = new Vue({
  mixins: [mixin],
  methods: {
    bar: function () {
      console.log('bar')
    },
    conflicting: function () {
      console.log('from self')
    }
  }
})

vm.foo() // =&gt; &quot;foo&quot;
vm.bar() // =&gt; &quot;bar&quot;
vm.conflicting() // =&gt; &quot;from self&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：<code v-pre>Vue.extend()</code> 也使用同样的策略进行合并。</p>
<h2 id="某项目中使用的mixin示例" tabindex="-1"><a class="header-anchor" href="#某项目中使用的mixin示例" aria-hidden="true">#</a> 某项目中使用的Mixin示例</h2>
<p>抽离各组件相同的代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// mixin.js
export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playlist'
    ])
  },
  mounted() {
    this.handlePlaylist(this.playlist)
  },
  activated() {
    this.handlePlaylist(this.playlist)
  },
  watch: {
    playlist(newVal) {
      this.handlePlaylist(newVal)
    }
  },
  methods: {
    // 根据选项合并策略，此方法和组件中的方法同名时，则被覆盖。如组件中没有相同名称方法时则会使用此方法，从而抛出错误。
    handlePlaylist() {
      throw new Error('component must implement handlePlaylist method')
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>混入到组件：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 使用，可在多个组件中共用mixin的代码
import { playlistMixin } from '@/common/js/mixin' // 共享代码的引入
export default {
    mixins: [playlistMixin],
    methods: {
        handlePlaylist(playlist) { // 此方法可针对不同组件做不同处理
            ...
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>
