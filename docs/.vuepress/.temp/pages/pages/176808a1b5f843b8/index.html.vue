<template><div><h1 id="实例生命周期钩子" tabindex="-1"><a class="header-anchor" href="#实例生命周期钩子" aria-hidden="true">#</a> 实例生命周期钩子</h1>
<p><a href="https://cn.vuejs.org/v2/guide/instance.html#%E5%AE%9E%E4%BE%8B%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90" target="_blank" rel="noopener noreferrer">实例生命周期钩子API</a></p>
<p>简单理解，生命周期钩子函数就是vue实例在某一个时间点会自动执行的函数。</p>
<!-- more -->
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;div id=&quot;app&quot;&gt;{{msg}}&lt;/div&gt;

&lt;script src=&quot;https://cdn.bootcss.com/vue/2.4.2/vue.js&quot;&gt;&lt;/script&gt;
&lt;script&gt;
  var vm = new Vue({
    el: '#app',
    data: {
      msg: 'Vue的生命周期'
    },
    beforeCreate: function() {
      console.group('------beforeCreate创建前状态------');
      console.log(&quot;el     : &quot; + this.$el); //undefined
      console.log(&quot;data   : &quot; + this.$data); //undefined
      console.log(&quot;msg: &quot; + this.msg) //undefined
    },
    created: function() {
      console.group('------created创建完毕状态------');
      console.log(&quot;el     : &quot; + this.$el); //undefined
      console.log(&quot;data   : &quot; + this.$data); //已被初始化
      console.log(&quot;msg: &quot; + this.msg); //已被初始化
    },
    beforeMount: function() {
      console.group('------beforeMount挂载前状态------');
      console.log(this.$el);// &lt;div id=&quot;app&quot;&gt;{{msg}}&lt;/div&gt; 挂载前状态
    },
    mounted: function() {
      console.group('------mounted 挂载结束状态------');
      console.log(this.$el);// &lt;div id=&quot;app&quot;&gt;Vue的生命周期&lt;/div&gt;   msg内容被挂载并渲染到页面
    },
      // 当data被修改之前
    beforeUpdate: function () {
      console.group('beforeUpdate 更新前状态===============》');
      console.log(&quot;el     : &quot; + this.$el);
      console.log(this.$el);
      console.log(&quot;data   : &quot; + this.$data);
      console.log(&quot;msg: &quot; + this.msg);
    },
      // 触发beforeUpdate之后，虚拟DOM重新渲染并应用更新
      // 当data被修改之后
    updated: function () {
      console.group('updated 更新完成状态===============》');
      console.log(&quot;el     : &quot; + this.$el);
      console.log(this.$el);
      console.log(&quot;data   : &quot; + this.$data);
      console.log(&quot;msg: &quot; + this.msg);
    },
      // 调用vm.$destroy() 销毁前
    beforeDestroy: function () {
      console.group('beforeDestroy 销毁前状态===============》');
      console.log(&quot;el     : &quot; + this.$el);
      console.log(this.$el);
      console.log(&quot;data   : &quot; + this.$data);
      console.log(&quot;msg: &quot; + this.msg);
    },
       // 调用vm.$destroy() 销毁后
    destroyed: function () {
      console.group('destroyed 销毁完成状态===============》');
      console.log(&quot;el     : &quot; + this.$el);
      console.log(this.$el);
      console.log(&quot;data   : &quot; + this.$data);
      console.log(&quot;msg: &quot; + this.msg)
    }
  })
&lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="demo" tabindex="-1"><a class="header-anchor" href="#demo" aria-hidden="true">#</a> Demo</h2>
<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="xugaoyi" data-slug-hash="GRJZWjb" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="生命周期钩子">
  <span>See the Pen <a href="https://codepen.io/xugaoyi/pen/GRJZWjb">
  生命周期钩子</a> by xugaoyi (<a href="https://codepen.io/xugaoyi">@xugaoyi</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
<h2 id="生命周期图示" tabindex="-1"><a class="header-anchor" href="#生命周期图示" aria-hidden="true">#</a> 生命周期图示</h2>
<p><img src="https://cdn.jsdelivr.net/gh/xugaoyi/image_store/blog/20200204152241.png" alt=""></p>
</div></template>
