<template><div><h1 id="比typeof运算符更准确的类型判断" tabindex="-1"><a class="header-anchor" href="#比typeof运算符更准确的类型判断" aria-hidden="true">#</a> 比typeof运算符更准确的类型判断</h1>
<p>不同数据类型的<code v-pre>Object.prototype.toString</code>方法返回值如下。</p>
<ul>
<li>数值：返回<code v-pre>[object Number]</code>。</li>
<li>字符串：返回<code v-pre>[object String]</code>。</li>
<li>布尔值：返回<code v-pre>[object Boolean]</code>。</li>
<li>undefined：返回<code v-pre>[object Undefined]</code>。</li>
<li>null：返回<code v-pre>[object Null]</code>。</li>
<li>数组：返回<code v-pre>[object Array]</code>。</li>
<li>arguments 对象：返回<code v-pre>[object Arguments]</code>。</li>
<li>函数：返回<code v-pre>[object Function]</code>。</li>
<li>Error 对象：返回<code v-pre>[object Error]</code>。</li>
<li>Date 对象：返回<code v-pre>[object Date]</code>。</li>
<li>RegExp 对象：返回<code v-pre>[object RegExp]</code>。</li>
<li>其他对象：返回<code v-pre>[object Object]</code>。</li>
</ul>
<p>这就是说，<code v-pre>Object.prototype.toString</code>可以看出一个值到底是什么类型。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Object.prototype.toString.call(2) // &quot;[object Number]&quot;
Object.prototype.toString.call('') // &quot;[object String]&quot;
Object.prototype.toString.call(true) // &quot;[object Boolean]&quot;
Object.prototype.toString.call(undefined) // &quot;[object Undefined]&quot;
Object.prototype.toString.call(null) // &quot;[object Null]&quot;
Object.prototype.toString.call(Math) // &quot;[object Math]&quot;
Object.prototype.toString.call({}) // &quot;[object Object]&quot;
Object.prototype.toString.call([]) // &quot;[object Array]&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>利用这个特性，可以写出一个比<code v-pre>typeof</code>运算符更准确的类型判断函数。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var type = function (o){
    var s = Object.prototype.toString.call(o)
    return s.match(/\[object (.*?)\]/)[1].toLowerCase()
}
type({}); // &quot;object&quot;
type([]); // &quot;array&quot;
type(5); // &quot;number&quot;
type(null); // &quot;null&quot;
type(); // &quot;undefined&quot;
type(/abcd/); // &quot;regex&quot;
type(new Date()); // &quot;date&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面这个<code v-pre>type</code>函数的基础上，还可以加上专门判断某种类型数据的方法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var type = function (o){
  var s = Object.prototype.toString.call(o);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};

['Null',
 'Undefined',
 'Object',
 'Array',
 'String',
 'Number',
 'Boolean',
 'Function',
 'RegExp'
].forEach(function (t) {
  type['is' + t] = function (o) {
    return type(o) === t.toLowerCase();
  };
});

type.isObject({}) // true
type.isNumber(NaN) // true
type.isRegExp(/abc/) // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>
