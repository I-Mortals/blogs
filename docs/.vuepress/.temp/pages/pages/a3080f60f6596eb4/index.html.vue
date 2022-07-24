<template><div><h1 id="prop-验证-与-非-prop-的-attribute" tabindex="-1"><a class="header-anchor" href="#prop-验证-与-非-prop-的-attribute" aria-hidden="true">#</a> Prop 验证 与 非 Prop 的 Attribute</h1>
<h2 id="prop-验证" tabindex="-1"><a class="header-anchor" href="#prop-验证" aria-hidden="true">#</a> Prop 验证</h2>
<p><a href="https://cn.vuejs.org/v2/guide/components-props.html#Prop-%E9%AA%8C%E8%AF%81" target="_blank" rel="noopener noreferrer">API</a></p>
<p>子组件对父组件传递来的参数进行校验</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Vue.component('my-component', {
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
  }
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="非-prop-的-attribute" tabindex="-1"><a class="header-anchor" href="#非-prop-的-attribute" aria-hidden="true">#</a> 非 Prop 的 Attribute</h2>
<p><a href="https://cn.vuejs.org/v2/guide/components-props.html#%E9%9D%9E-Prop-%E7%9A%84-Attribute" target="_blank" rel="noopener noreferrer">API</a></p>
<p>当子组件没有定义对应的Prop来接收父组件传来的值时，这个值将会出现在组件根元素的<code v-pre>Attribute</code>上面。</p>
<h3 id="用处" tabindex="-1"><a class="header-anchor" href="#用处" aria-hidden="true">#</a> 用处</h3>
<p>例如，想象一下你通过一个 Bootstrap 插件使用了一个第三方的 <code v-pre>&lt;bootstrap-date-input&gt;</code> 组件，这个插件需要在其 <code v-pre>&lt;input&gt;</code> 上用到一个 <code v-pre>data-date-picker</code> attribute。我们可以将这个 attribute 添加到你的组件实例上：</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;bootstrap-date-input data-date-picker=&quot;activated&quot;&gt;&lt;/bootstrap-date-input&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后这个 <code v-pre>data-date-picker=&quot;activated&quot;</code> attribute 就会自动添加到 <code v-pre>&lt;bootstrap-date-input&gt;</code>组件的根元素上。</p>
</div></template>
