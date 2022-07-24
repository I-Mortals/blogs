<template><div><h1 id="内置对象篇" tabindex="-1"><a class="header-anchor" href="#内置对象篇" aria-hidden="true">#</a> 内置对象篇</h1>
<h2 id="一、object对象" tabindex="-1"><a class="header-anchor" href="#一、object对象" aria-hidden="true">#</a> 一、Object对象</h2>
<h2 id="_1、概述" tabindex="-1"><a class="header-anchor" href="#_1、概述" aria-hidden="true">#</a> 1、概述</h2>
<p>JavaScript 原生提供<code v-pre>Object</code>对象（注意起首的<code v-pre>O</code>是大写），本章介绍该对象原生的各种方法。</p>
<p>JavaScript 的所有其他对象都继承自<code v-pre>Object</code>对象，即那些对象都是<code v-pre>Object</code>的实例。</p>
<p><code v-pre>Object</code>对象的原生方法分成两类：<code v-pre>Object</code>本身的方法与<code v-pre>Object</code>的实例方法。</p>
<p><strong>（1）Object对象本身的方法</strong></p>
<p>所谓“本身的方法”就是直接定义在<code v-pre>Object</code>对象的方法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Object.print = function (o) { console.log(o) };
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>print</code>方法就是直接定义在<code v-pre>Object</code>对象上。</p>
<p><strong>（2）Object的实例方法</strong></p>
<p>所谓实例方法就是定义在<code v-pre>Object</code>原型对象<code v-pre>Object.prototype</code>上的方法。它可以被<code v-pre>Object</code>实例直接使用。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Object.prototype.print = function () {
  console.log(this);
};

var obj = new Object();
obj.print() // Object
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>Object.prototype</code>定义了一个<code v-pre>print</code>方法，然后生成一个<code v-pre>Object</code>的实例<code v-pre>obj</code>。<code v-pre>obj</code>直接继承了<code v-pre>Object.prototype</code>的属性和方法，可以直接使用<code v-pre>obj.print</code>调用<code v-pre>print</code>方法。也就是说，<code v-pre>obj</code>对象的<code v-pre>print</code>方法实质上就是调用<code v-pre>Object.prototype.print</code>方法。</p>
<p>关于原型对象<code v-pre>object.prototype</code>的详细解释，参见《面向对象编程》章节。这里只要知道，凡是定义在<code v-pre>Object.prototype</code>对象上面的属性和方法，将被所有实例对象共享就可以了。</p>
<p>以下先介绍<code v-pre>Object</code>作为函数的用法，然后再介绍<code v-pre>Object</code>对象的原生方法，分成对象自身的方法（又称为“静态方法”）和实例方法两部分。</p>
<h2 id="_2、object-当作工具方法-不通过new创建" tabindex="-1"><a class="header-anchor" href="#_2、object-当作工具方法-不通过new创建" aria-hidden="true">#</a> 2、Object() 当作工具方法（不通过new创建）</h2>
<p><code v-pre>Object()</code><strong>本身是一个函数</strong>，可以当作工具方法使用，将任意值转为对象。这个方法常用于保证某个值一定是对象。</p>
<p>如果参数为空（或者为<code v-pre>undefined</code>和<code v-pre>null</code>），<code v-pre>Object()</code>返回一个空对象。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = Object() // obj =&gt; {}
// 等同于
obj = Object(undefined)
obj = Object(null)
obj instanceof Object // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码的含义，是将<code v-pre>undefined</code>和<code v-pre>null</code>转为对象，结果得到了一个空对象<code v-pre>obj</code>。</p>
<p><code v-pre>instanceof</code>运算符用来验证，一个对象是否为指定的构造函数的实例。<code v-pre>obj instanceof Object</code>返回<code v-pre>true</code>，就表示<code v-pre>obj</code>对象是<code v-pre>Object</code>的实例。</p>
<p>如果参数是原始类型的值，<code v-pre>Object</code>方法将其转为对应的包装对象的实例（参见《原始类型的包装对象》一章）。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 包装对象实例

var obj = Object(1) // obj =&gt; Number{1}
obj instanceof Object // true     in s tan ce of 判断对象类型
obj instanceof Number // true


var obj = Object('foo') // obj =&gt; String{‘foo’}
obj instanceof Object // true
obj instanceof String // true

var obj = Object(true) // obj =&gt; Boolean{‘foo’}
obj instanceof Object // true
obj instanceof Boolean // true

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>Object</code>函数的参数是各种原始类型的值，转换成对象就是原始类型值对应的包装对象。</p>
<p>如果<code v-pre>Object</code>方法的参数是一个对象，它总是返回该对象，即不用转换。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var arr = []
var obj = Object(arr) // obj =&gt; []
obj === arr // true


var value = {}
var obj = Object(value) // obj =&gt; {}
obj === value // true


var fn = function() {}
var obj = Object(fn) // obj =&gt; function(){}
obj === fn // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>利用这一点，可以写一个<strong>判断变量是否为对象</strong>的函数。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>function isObject(value){
    return value === Object(value)
}

isObject([]) // true
isObject({}) // true
isObject('123') // false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3、object构造函数-通过new创建" tabindex="-1"><a class="header-anchor" href="#_3、object构造函数-通过new创建" aria-hidden="true">#</a> 3、Object构造函数（通过new创建）</h2>
<p><code v-pre>Object</code>构造函数的首要用途，是直接通过它来<strong>生成新对象</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = new Object() // 等同于 var obj = {}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>注意，通过<code v-pre>var obj = new Object()</code>的写法生成新对象，与字面量的写法<code v-pre>var obj = {}</code>是等价的。或者说，后者只是前者的一种简便写法。</p>
</blockquote>
<p><code v-pre>Object</code>构造函数的用法与工具方法很相似，几乎一模一样。使用时，可以接受一个参数，如果该参数是一个对象，则直接返回这个对象；如果是一个原始类型的值，则返回该值对应的包装对象（详见《包装对象》一章）。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>var o1 = {a: 1};
var o2 = new Object(o1);
o1 === o2 // true

var obj = new Object(123);
obj instanceof Number // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然用法相似，但是<code v-pre>Object(value)</code>与<code v-pre>new Object(value)</code>两者的语义是不同的，<code v-pre>Object(value)</code>表示将<code v-pre>value</code>转成一个对象，<code v-pre>new Object(value)</code>则表示新生成一个对象，它的值是<code v-pre>value</code>。</p>
<h2 id="_4、object-的静态方法" tabindex="-1"><a class="header-anchor" href="#_4、object-的静态方法" aria-hidden="true">#</a> 4、Object 的静态方法</h2>
<p>所谓“静态方法”，是指<strong>部署在<code v-pre>Object</code>对象自身</strong>的方法。</p>
<h3 id="object-keys" tabindex="-1"><a class="header-anchor" href="#object-keys" aria-hidden="true">#</a> Object.keys()</h3>
<p><code v-pre>Object.keys()</code>方法和<code v-pre>Object.getOwnPropertyNames()</code>方法都用来遍历对象的属性。</p>
<p><code v-pre>Object.keys()</code>方法的参数是一个对象，返回一个数组。该数组的成员都是该对象自身的（而不是继承的）所有<strong>属性名</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = {
    p1: 123,
    p2: 456
}

Object.keys(obj) // ['p1','p2']  注意是属性名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="object-getownpropertynames" tabindex="-1"><a class="header-anchor" href="#object-getownpropertynames" aria-hidden="true">#</a> Object.getOwnPropertyNames()</h3>
<p><code v-pre>Object.getOwnPropertyNames</code>方法与<code v-pre>Object.keys</code>类似，也是接受一个对象作为参数，返回一个数组，包含了该对象自身的所有属性名。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = {
    p1: 123,
    p2: 456
}
Object.getOwnPropertyNames(obj) // ['p1','p2']
// getOwnPropertyNames 中文含义：获取自己的属性名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于一般的对象来说，<code v-pre>Object.keys()</code>和<code v-pre>Object.getOwnPropertyNames()</code>返回的结果是一样的。只有涉及不可枚举属性时，才会有不一样的结果。<code v-pre>Object.keys</code>方法只返回可枚举的属性（详见《对象属性的描述对象》一章），<code v-pre>Object.getOwnPropertyNames</code>方法还返回<strong>不可枚举的属性名</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var a = ['hello','world']
Object.keys(a) // ['0',‘1’]  如果对象是数组时返回索引字符串
Object.getOwnPropertyNames(a) // [‘0’,‘1’,'length']
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，数组的<code v-pre>length</code>属性是<strong>不可枚举的属性</strong>，所以只出现在<code v-pre>Object.getOwnPropertyNames</code>方法的返回结果中。</p>
<p>由于 JavaScript 没有提供计算对象属性个数的方法，所以可以用这两个方法代替。</p>
<p><strong>获取对象属性个数长度</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>var obj = {
  p1: 123,
  p2: 456
};

Object.keys(obj).length // 2
Object.getOwnPropertyNames(obj).length // 2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一般情况下，几乎总是使用<code v-pre>Object.keys</code>方法，遍历对象的属性。</p>
<h3 id="object的其他静态方法" tabindex="-1"><a class="header-anchor" href="#object的其他静态方法" aria-hidden="true">#</a> Object的其他静态方法</h3>
<p>除了上面提到的两个方法，<code v-pre>Object</code>还有不少其他静态方法，将在后文逐一详细介绍。</p>
<h4 id="_1-对象属性模型的相关方法" tabindex="-1"><a class="header-anchor" href="#_1-对象属性模型的相关方法" aria-hidden="true">#</a> （1）对象属性模型的相关方法</h4>
<ul>
<li><code v-pre>Object.getOwnPropertyDescriptor()</code>：获取某个属性的描述对象。</li>
<li><code v-pre>Object.defineProperty()</code>：通过描述对象，定义某个属性。</li>
<li><code v-pre>Object.defineProperties()</code>：通过描述对象，定义多个属性。</li>
</ul>
<h4 id="_2-控制对象状态的方法" tabindex="-1"><a class="header-anchor" href="#_2-控制对象状态的方法" aria-hidden="true">#</a> （2）控制对象状态的方法</h4>
<ul>
<li><code v-pre>Object.preventExtensions()</code>：防止对象扩展。</li>
<li><code v-pre>Object.isExtensible()</code>：判断对象是否可扩展。</li>
<li><code v-pre>Object.seal()</code>：禁止对象配置。</li>
<li><code v-pre>Object.isSealed()</code>：判断一个对象是否可配置。</li>
<li><code v-pre>Object.freeze()</code>：冻结一个对象。</li>
<li><code v-pre>Object.isFrozen()</code>：判断一个对象是否被冻结。</li>
</ul>
<h4 id="_3-原型链相关方法" tabindex="-1"><a class="header-anchor" href="#_3-原型链相关方法" aria-hidden="true">#</a> （3）原型链相关方法</h4>
<ul>
<li><code v-pre>Object.create()</code>：该方法可以指定原型对象和属性，返回一个新的对象。</li>
<li><code v-pre>Object.getPrototypeOf()</code>：获取对象的<code v-pre>Prototype</code>对象。</li>
</ul>
<p>、</p>
<p>有部分方法为列入此文档，更多方法详情：<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object" target="_blank" rel="noopener noreferrer">https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object</a></p>
<h2 id="_5、object-的实例方法" tabindex="-1"><a class="header-anchor" href="#_5、object-的实例方法" aria-hidden="true">#</a> 5、Object 的实例方法</h2>
<p>除了静态方法，还有不少方法定义在<code v-pre>Object.prototype</code>对象。它们称为实例方法，所有<code v-pre>Object</code>的实例对象都继承了这些方法。</p>
<p><code v-pre>Object</code>实例对象的方法，主要有以下六个。</p>
<ul>
<li><code v-pre>Object.prototype.valueOf()</code>：返回当前对象对应的值。</li>
<li><code v-pre>Object.prototype.toString()</code>：返回当前对象对应的字符串形式。</li>
<li><code v-pre>Object.prototype.toLocaleString()</code>：返回当前对象对应的本地字符串形式。</li>
<li><code v-pre>Object.prototype.hasOwnProperty()</code>：判断某个属性是否为当前对象自身的属性，还是继承自原型对象的属性。</li>
<li><code v-pre>Object.prototype.isPrototypeOf()</code>：判断当前对象是否为另一个对象的原型。</li>
<li><code v-pre>Object.prototype.propertyIsEnumerable()</code>：判断某个属性是否可枚举。</li>
</ul>
<p>本节介绍前四个方法，另外两个方法将在后文相关章节介绍。</p>
<h3 id="object-prototype-valueof" tabindex="-1"><a class="header-anchor" href="#object-prototype-valueof" aria-hidden="true">#</a> Object.prototype.valueOf()</h3>
<p><code v-pre>valueOf</code>方法的作用是返回一个对象的“值”，默认情况下<strong>返回对象本身</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = new Object()
obj.valueof() === obj //true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码比较<code v-pre>obj.valueOf()</code>与<code v-pre>obj</code>本身，两者是一样的。</p>
<p><code v-pre>valueOf</code>方法的主要用途是，JavaScript <strong>自动类型转换</strong>时会默认调用这个方法（详见《数据类型转换》一章）。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = Object()
1+obj //&quot;1[object Object]&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码将对象<code v-pre>obj</code>与数字<code v-pre>1</code>相加，这时 JavaScript 就会<strong>自动调用</strong><code v-pre>valueOf()</code>方法，求出<code v-pre>obj</code>的值再与<code v-pre>1</code>相加。所以，如果自定义<code v-pre>valueOf</code>方法，就可以得到想要的结果。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = new Object()
obj.valueof = function () {
    return 2
}
1 + obj // 3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码自定义了<code v-pre>obj</code>对象的<code v-pre>valueOf</code>方法，于是<code v-pre>1 + obj</code>就得到了<code v-pre>3</code>。这种方法就相当于用自定义的<code v-pre>obj.valueOf</code>，覆盖<code v-pre>Object.prototype.valueOf</code>。</p>
<h3 id="object-prototype-tostring" tabindex="-1"><a class="header-anchor" href="#object-prototype-tostring" aria-hidden="true">#</a> Object.prototype.toString()</h3>
<p><code v-pre>toString</code>方法的作用是返回一个对象的字符串形式，默认情况下<strong>返回类型字符串</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var o1 = new Object()
o1.toString() // &quot;[object Object]&quot;

var o2 = {a:2}
o2.toString() // &quot;[object Object]&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码表示，对于一个对象调用<code v-pre>toString</code>方法，会返回字符串<code v-pre>[object Object]</code>，该字符串说明对象的类型。</p>
<p>字符串<code v-pre>[object Object]</code>本身没有太大的用处，但是通过自定义<code v-pre>toString</code>方法，可以让对象在自动类型转换时，得到想要的字符串形式。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = new Object()

obj.toString = function() {
    return 'hello'
}
obj + ' '+ 'world' // &quot;hello world&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码表示，当对象用于字符串加法时，会<strong>自动调用</strong><code v-pre>toString</code>方法。由于自定义了<code v-pre>toString</code>方法，所以返回字符串<code v-pre>hello world</code>。</p>
<p>数组、字符串、函数、Date 对象都分别部署了自定义的<code v-pre>toString</code>方法，覆盖了<code v-pre>Object.prototype.toString</code>方法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>[1, 2, 3].toString() // &quot;1,2,3&quot;

'123'.toString() // &quot;123&quot;

(function () {
  return 123;
}).toString()
// &quot;function () {
//   return 123;
// }&quot;

(new Date()).toString()
// &quot;Tue May 10 2016 09:11:31 GMT+0800 (CST)&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，数组、字符串、函数、Date 对象调用<code v-pre>toString</code>方法，并不会返回<code v-pre>[object Object]</code>，因为它们都自定义了<code v-pre>toString</code>方法，覆盖原始方法。</p>
<h4 id="tostring-的应用-判断数据类型" tabindex="-1"><a class="header-anchor" href="#tostring-的应用-判断数据类型" aria-hidden="true">#</a> toString() 的应用：判断数据类型</h4>
<p><code v-pre>Object.prototype.toString</code>方法返回对象的类型字符串，因此可以用来判断一个值的类型。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>var obj = {};
obj.toString() // &quot;[object Object]&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码调用空对象的<code v-pre>toString</code>方法，结果返回一个字符串<code v-pre>object Object</code>，其中第二个<code v-pre>Object</code>表示该值的构造函数。这是一个十分有用的判断数据类型的方法。</p>
<p>由于实例对象可能会自定义<code v-pre>toString</code>方法，覆盖掉<code v-pre>Object.prototype.toString</code>方法，所以为了得到类型字符串，最好直接使用<code v-pre>Object.prototype.toString</code>方法。通过函数的<code v-pre>call</code>方法，可以在任意值上调用这个方法，帮助我们判断这个值的类型。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Object.prototype.toString.call(value)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码表示对<code v-pre>value</code>这个值调用<code v-pre>Object.prototype.toString</code>方法。</p>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="object-prototype-tolocalestring" tabindex="-1"><a class="header-anchor" href="#object-prototype-tolocalestring" aria-hidden="true">#</a> Object.prototype.toLocaleString()</h3>
<p><code v-pre>Object.prototype.toLocaleString</code>方法与<code v-pre>toString</code>的返回结果相同，也是返回一个值的字符串形式。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = {};
obj.toString(obj) // &quot;[object Object]&quot;
obj.toLocaleString(obj) // &quot;[object Object]&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个方法的主要作用是留出一个接口，让各种不同的对象实现自己版本的<code v-pre>toLocaleString</code>，用来返回针对某些地域的特定的值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var person = {
  toString: function () {
    return 'Henry Norman Bethune';
  },
  toLocaleString: function () {
    return '白求恩';
  }
};

person.toString() // Henry Norman Bethune
person.toLocaleString() // 白求恩
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>toString()</code>方法返回对象的一般字符串形式，<code v-pre>toLocaleString()</code>方法返回本地的字符串形式。</p>
<p>目前，主要有三个对象自定义了<code v-pre>toLocaleString</code>方法。</p>
<ul>
<li>Array.prototype.toLocaleString()</li>
<li>Number.prototype.toLocaleString()</li>
<li>Date.prototype.toLocaleString()</li>
</ul>
<p>举例来说，日期的实例对象的<code v-pre>toString</code>和<code v-pre>toLocaleString</code>返回值就不一样，而且<code v-pre>toLocaleString</code>的返回值跟用户设定的所在地域相关。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var date = new Date();
date.toString() // &quot;Sun Oct 06 2019 15:50:04 GMT+0800 (中国标准时间)&quot;
date.toLocaleString() // &quot;2019/10/6 下午3:50:04&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="object-prototype-hasownproperty" tabindex="-1"><a class="header-anchor" href="#object-prototype-hasownproperty" aria-hidden="true">#</a> Object.prototype.hasOwnProperty()</h3>
<p><code v-pre>Object.prototype.hasOwnProperty</code>方法接受一个字符串作为参数，返回一个布尔值，表示该实例对象自身是否具有该属性。</p>
<p><strong>检查对象是否包含有某个属性，返回布尔值</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>var obj = {
  p: 123
};

obj.hasOwnProperty('p') // true
obj.hasOwnProperty('toString') // false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，对象<code v-pre>obj</code>自身具有<code v-pre>p</code>属性，所以返回<code v-pre>true</code>。<code v-pre>toString</code>属性是继承的，所以返回<code v-pre>false</code>。</p>
<h2 id="二、属性描述对象" tabindex="-1"><a class="header-anchor" href="#二、属性描述对象" aria-hidden="true">#</a> 二、属性描述对象</h2>
<h2 id="_1、概述-1" tabindex="-1"><a class="header-anchor" href="#_1、概述-1" aria-hidden="true">#</a> 1、概述</h2>
<p>JavaScript 提供了一个内部数据结构，用来描述对象的属性，控制它的行为，比如该属性是否可写、可遍历等等。这个内部数据结构称为“属性描述对象”（attributes object）。每个属性都有自己对应的属性描述对象，保存该属性的一些元信息。</p>
<p>下面是属性描述对象的一个例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>{
  value: 123, // 该属性的属性值，默认undefined
  writable: false, // 属性值是否可改变，默认为true
  enumerable: true, // 该属性是否可遍历，默认为true
  configurable: false, //属性描述对象的可配置性,默认为true
  get: undefined, // 该属性的取值函数（getter），默认为undefined
  set: undefined // 该属性的存值函数（setter），默认为undefined
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>属性描述对象提供6个元属性。</p>
<p>（1）<code v-pre>value</code></p>
<p><code v-pre>value</code>是该属性的属性值，默认为<code v-pre>undefined</code>。</p>
<p>（2）<code v-pre>writable</code></p>
<p><code v-pre>writable</code>是一个布尔值，表示属性值（value）是否可改变（即是否可写），默认为<code v-pre>true</code>。</p>
<p>（3）<code v-pre>enumerable</code></p>
<p><code v-pre>enumerable</code>是一个布尔值，表示该属性是否可遍历，默认为<code v-pre>true</code>。如果设为<code v-pre>false</code>，会使得某些操作（比如<code v-pre>for...in</code>循环、<code v-pre>Object.keys()</code>）跳过该属性。</p>
<p>（4）<code v-pre>configurable</code></p>
<p><code v-pre>configurable</code>是一个布尔值，表示可配置性，默认为<code v-pre>true</code>。如果设为<code v-pre>false</code>，将阻止某些操作改写该属性，比如无法删除该属性，也不得改变该属性的属性描述对象（<code v-pre>value</code>属性除外）。也就是说，<code v-pre>configurable</code>属性控制了属性描述对象的可写性。</p>
<p>（5）<code v-pre>get</code></p>
<p><code v-pre>get</code>是一个函数，表示该属性的取值函数（getter），默认为<code v-pre>undefined</code>。</p>
<p>（6）<code v-pre>set</code></p>
<p><code v-pre>set</code>是一个函数，表示该属性的存值函数（setter），默认为<code v-pre>undefined</code>。</p>
<h2 id="_2、object-getownpropertydescriptor" tabindex="-1"><a class="header-anchor" href="#_2、object-getownpropertydescriptor" aria-hidden="true">#</a> 2、Object.getOwnPropertyDescriptor()</h2>
<p><code v-pre>Object.getOwnPropertyDescriptor()</code>方法可以<strong>获取属性描述对象</strong>。它的第一个参数是目标对象，第二个参数是一个字符串，对应目标对象的某个属性名。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = {p:'a'}

Object.getOwnPropertyDescriptor(obj,'p')
// Object { value: &quot;a&quot;,  // 属性值'a'
//   writable: true, // 属性值'a' 可改写
//   enumerable: true, // 'p'属性可被遍历
//   configurable: true // 属性描述对象的可配置性
// }


// getOwnPropertyDescriptor 中文含义：获取自己的属性描述符
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，<code v-pre>Object.getOwnPropertyDescriptor()</code>方法只能用于对象自身的属性，不能用于继承的属性。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = { p: 'a' };

Object.getOwnPropertyDescriptor(obj, 'toString')
// undefined
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>toString</code>是<code v-pre>obj</code>对象继承的属性，<code v-pre>Object.getOwnPropertyDescriptor()</code>无法获取。</p>
<h2 id="_3、object-getownpropertynames" tabindex="-1"><a class="header-anchor" href="#_3、object-getownpropertynames" aria-hidden="true">#</a> 3、Object.getOwnPropertyNames()</h2>
<p><code v-pre>Object.getOwnPropertyNames</code>方法返回一个数组，成员是参数对象自身的全部属性的属性名，不管该属性是否可遍历。</p>
<p><strong>返回对象的全部属性名</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = Object.defineProperties({}, {
  p1: { value: 1, enumerable: true },
  p2: { value: 2, enumerable: false }
});

Object.getOwnPropertyNames(obj)
// [&quot;p1&quot;, &quot;p2&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>obj.p1</code>是可遍历的，<code v-pre>obj.p2</code>是不可遍历的。<code v-pre>Object.getOwnPropertyNames</code>会将它们都返回。</p>
<p>这跟<code v-pre>Object.keys</code>的行为不同，<code v-pre>Object.keys</code>只返回对象自身的可遍历属性的全部属性名。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Object.keys([]) // []
Object.getOwnPropertyNames([]) // [ 'length' ]

Object.keys(Object.prototype) // []
Object.getOwnPropertyNames(Object.prototype)
 /*[
	&quot;constructor&quot;,   // 构造函数
    &quot;__defineGetter__&quot;,
    &quot;__defineSetter__&quot;,
    &quot;hasOwnProperty&quot;,  // 检测属性名
    &quot;__lookupGetter__&quot;,
    &quot;__lookupSetter__&quot;,
    &quot;isPrototypeOf&quot;,
    &quot;propertyIsEnumerable&quot;,
    &quot;toString&quot;,  // 返回类型字符串
    &quot;valueOf&quot;,
    &quot;__proto__&quot;,  // 原型链
    &quot;toLocaleString&quot;
   ]
*/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，数组自身的<code v-pre>length</code>属性是不可遍历的，<code v-pre>Object.keys</code>不会返回该属性。第二个例子的<code v-pre>Object.prototype</code>也是一个对象，所有实例对象都会继承它，它自身的属性都是不可遍历的。</p>
<h2 id="_4、object-defineproperty-object-defineproperties" tabindex="-1"><a class="header-anchor" href="#_4、object-defineproperty-object-defineproperties" aria-hidden="true">#</a> 4、Object.defineProperty()，Object.defineProperties()</h2>
<p><code v-pre>Object.defineProperty()</code>方法允许通过属性描述对象，定义或修改一个属性，然后返回修改后的对象，它的用法如下。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Object.defineProperty(object, propertyName, attributesObject)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>Object.defineProperty</code>方法接受三个参数，依次如下。</p>
<ul>
<li>object：属性所在的对象</li>
<li>propertyName：字符串，表示属性名</li>
<li>attributesObject：属性描述对象</li>
</ul>
<p>举例来说，定义<code v-pre>obj.p</code>可以写成下面这样。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = Object.defineProperty({}, 'p', {
  value: 123,
  writable: false, // 设置为false，无法被改写
  enumerable: true, // 可遍历
  configurable: false // 属性描述不可再被配置
});

obj.p // 123

obj.p = 246; // 由于writable为false,改写无效
obj.p // 123
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>Object.defineProperty()</code>方法定义了<code v-pre>obj.p</code>属性。由于属性描述对象的<code v-pre>writable</code>属性为<code v-pre>false</code>，所以<code v-pre>obj.p</code>属性不可写。注意，这里的<code v-pre>Object.defineProperty</code>方法的第一个参数是<code v-pre>{}</code>（一个新建的空对象），<code v-pre>p</code>属性直接定义在这个空对象上面，然后返回这个对象，这是<code v-pre>Object.defineProperty()</code>的常见用法。</p>
<p>如果属性已经存在，<code v-pre>Object.defineProperty()</code>方法相当于更新该属性的属性描述对象。</p>
<p>如果<strong>一次性定义或修改多个属性</strong>，可以使用<code v-pre>Object.defineProperties()</code>方法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = Object.defineProperties({}, {
  p1: { value: 123, enumerable: true },
  p2: { value: 'abc', enumerable: true },
  p3: { get: function () { return this.p1 + this.p2 },
    enumerable:true,
    configurable:true
  }
});

obj.p1 // 123
obj.p2 // &quot;abc&quot;
obj.p3 // &quot;123abc&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>Object.defineProperties()</code>同时定义了<code v-pre>obj</code>对象的三个属性。其中，<code v-pre>p3</code>属性定义了取值函数<code v-pre>get</code>，即每次读取该属性，都会调用这个取值函数。</p>
<p><strong>注意</strong>，一旦定义了取值函数<code v-pre>get</code>（或存值函数<code v-pre>set</code>），就不能将<code v-pre>writable</code>属性设为<code v-pre>true</code>，或者同时定义<code v-pre>value</code>属性，否则会报错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = {};

Object.defineProperty(obj, 'p', {
  value: 123,
  get: function() { return 456; }
});
// TypeError: Invalid property.
// A property cannot both have accessors and be writable or have a value

Object.defineProperty(obj, 'p', {
  writable: true,
  get: function() { return 456; }
});
// TypeError: Invalid property descriptor.
// Cannot both specify accessors and a value or writable attribute
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，同时定义了<code v-pre>get</code>属性和<code v-pre>value</code>属性，以及将<code v-pre>writable</code>属性设为<code v-pre>true</code>，就会报错。</p>
<p><code v-pre>Object.defineProperty()</code>和<code v-pre>Object.defineProperties()</code>参数里面的属性描述对象，<code v-pre>writable</code>、<code v-pre>configurable</code>、<code v-pre>enumerable</code>这三个属性的默认值都为<code v-pre>false</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = {};
Object.defineProperty(obj, 'foo', {});
Object.getOwnPropertyDescriptor(obj, 'foo')
// {  // 默认值
//   value: undefined,
//   writable: false,
//   enumerable: false,
//   configurable: false
// }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，定义<code v-pre>obj.foo</code>时用了一个空的属性描述对象，就可以看到各个元属性的默认值。</p>
<h2 id="_5、object-prototype-propertyisenumerable" tabindex="-1"><a class="header-anchor" href="#_5、object-prototype-propertyisenumerable" aria-hidden="true">#</a> 5、Object.prototype.propertyIsEnumerable()</h2>
<p>实例对象的<code v-pre>propertyIsEnumerable()</code>方法返回一个布尔值，用来<strong>判断某个属性是否可遍历</strong>。注意，这个方法只能用于判断对象自身的属性，对于继承的属性一律返回<code v-pre>false</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = {};
obj.p = 123;

obj.propertyIsEnumerable('p') // true
obj.propertyIsEnumerable('toString') // false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>obj.p</code>是可遍历的，而<code v-pre>obj.toString</code>是继承的属性。</p>
<h2 id="_6、元属性" tabindex="-1"><a class="header-anchor" href="#_6、元属性" aria-hidden="true">#</a> 6、元属性</h2>
<p>属性描述对象的各个属性称为“元属性”，因为它们可以看作是控制属性的属性。</p>
<h3 id="value目标属性的值" tabindex="-1"><a class="header-anchor" href="#value目标属性的值" aria-hidden="true">#</a> value目标属性的值</h3>
<p><code v-pre>value</code>属性是目标属性的值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = {};
obj.p = 123;

Object.getOwnPropertyDescriptor(obj, 'p').value
// 123

Object.defineProperty(obj, 'p', { value: 246 });
obj.p // 246
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码是通过<code v-pre>value</code>属性，读取或改写<code v-pre>obj.p</code>的例子。</p>
<h3 id="writable可写性" tabindex="-1"><a class="header-anchor" href="#writable可写性" aria-hidden="true">#</a> writable可写性</h3>
<p><code v-pre>writable</code>属性是一个布尔值，决定了目标属性的值（value）是否可以被改变。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = {};

Object.defineProperty(obj, 'a', {
  value: 37,
  writable: false
});

obj.a // 37
obj.a = 25; // 可写性为false，值无法被修改
obj.a // 37
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>obj.a</code>的<code v-pre>writable</code>属性是<code v-pre>false</code>。然后，改变<code v-pre>obj.a</code>的值，不会有任何效果。</p>
<p><strong>注意</strong>，正常模式下，对<code v-pre>writable</code>为<code v-pre>false</code>的属性赋值不会报错，只会默默失败。但是，严格模式下会报错，即使对<code v-pre>a</code>属性重新赋予一个同样的值。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>'use strict';
var obj = {};

Object.defineProperty(obj, 'a', {
  value: 37,
  writable: false
});

obj.a = 37;
// Uncaught TypeError: Cannot assign to read only property 'a' of object
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码是严格模式，对<code v-pre>obj.a</code>任何赋值行为都会报错。</p>
<p>如果原型对象的某个属性的<code v-pre>writable</code>为<code v-pre>false</code>，那么子对象将无法自定义这个属性。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var proto = Object.defineProperty({}, 'foo', {
  value: 'a',
  writable: false
});

var obj = Object.create(proto); // obj对象继承proto对象

obj.foo = 'b';
obj.foo // 'a'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>proto</code>是原型对象，它的<code v-pre>foo</code>属性不可写。<code v-pre>obj</code>对象继承<code v-pre>proto</code>，也不可以再自定义这个属性了。如果是严格模式，这样做还会抛出一个错误。</p>
<p>但是，有一个规避方法，就是通过覆盖属性描述对象，绕过这个限制。原因是这种情况下，原型链会被完全忽视。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var proto = Object.defineProperty({}, 'foo', {
  value: 'a',
  writable: false
});

var obj = Object.create(proto);
Object.defineProperty(obj, 'foo', {
  value: 'b'
});

obj.foo // &quot;b&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="enumerable可遍历性" tabindex="-1"><a class="header-anchor" href="#enumerable可遍历性" aria-hidden="true">#</a> enumerable可遍历性</h3>
<p><code v-pre>enumerable</code>（可遍历性）返回一个布尔值，表示目标属性是否可遍历。</p>
<p>JavaScript 的早期版本，<code v-pre>for...in</code>循环是基于<code v-pre>in</code>运算符的。我们知道，<code v-pre>in</code>运算符不管某个属性是对象自身的还是继承的，都会返回<code v-pre>true</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = {};
'toString' in obj // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>toString</code>不是<code v-pre>obj</code>对象自身的属性，但是<code v-pre>in</code>运算符也返回<code v-pre>true</code>，这导致了<code v-pre>toString</code>属性也会被<code v-pre>for...in</code>循环遍历。</p>
<p>这显然不太合理，后来就引入了“可遍历性”这个概念。只有可遍历的属性，才会被<code v-pre>for...in</code>循环遍历，同时还规定<code v-pre>toString</code>这一类实例对象继承的原生属性，都是不可遍历的，这样就保证了<code v-pre>for...in</code>循环的可用性。</p>
<p>具体来说，如果一个属性的<code v-pre>enumerable</code>为<code v-pre>false</code>，下面三个操作不会取到该属性。</p>
<ul>
<li><code v-pre>for..in</code>循环</li>
<li><code v-pre>Object.keys</code>方法</li>
<li><code v-pre>JSON.stringify</code>方法</li>
</ul>
<p>因此，<code v-pre>enumerable</code>可以用来设置“秘密”属性。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = {};

Object.defineProperty(obj, 'x', {
  value: 123,
  enumerable: false
});

obj.x // 123

for (var key in obj) {
  console.log(key);
}
// undefined

Object.keys(obj)  // []
JSON.stringify(obj) // &quot;{}&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>obj.x</code>属性的<code v-pre>enumerable</code>为<code v-pre>false</code>，所以一般的遍历操作都无法获取该属性，使得它有点像“秘密”属性，但不是真正的私有属性，还是可以直接获取它的值。</p>
<p>注意，<code v-pre>for...in</code>循环包括继承的属性，<code v-pre>Object.keys</code>方法不包括继承的属性。如果需要获取对象自身的所有属性，不管是否可遍历，可以使用<code v-pre>Object.getOwnPropertyNames</code>方法。</p>
<p>另外，<code v-pre>JSON.stringify</code>方法会排除<code v-pre>enumerable</code>为<code v-pre>false</code>的属性，有时<strong>可以利用这一点。如果对象的 JSON 格式输出要排除某些属性，就可以把这些属性的<code v-pre>enumerable</code>设为<code v-pre>false</code>。</strong></p>
<h3 id="configurable可配置性" tabindex="-1"><a class="header-anchor" href="#configurable可配置性" aria-hidden="true">#</a> configurable可配置性</h3>
<p><code v-pre>configurable</code>(可配置性）返回一个布尔值，决定了<strong>是否可以修改属性描述对象</strong>。也就是说，<code v-pre>configurable</code>为<code v-pre>false</code>时，<code v-pre>value</code>、<code v-pre>writable</code>、<code v-pre>enumerable</code>和<code v-pre>configurable</code>都不能被修改了。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = Object.defineProperty({}, 'p', {
  value: 1,
  writable: false,
  enumerable: false,
  configurable: false
});

Object.defineProperty(obj, 'p', {value: 2})
// TypeError: Cannot redefine property: p

Object.defineProperty(obj, 'p', {writable: true})
// TypeError: Cannot redefine property: p

Object.defineProperty(obj, 'p', {enumerable: true})
// TypeError: Cannot redefine property: p

Object.defineProperty(obj, 'p', {configurable: true})
// TypeError: Cannot redefine property: p
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>obj.p</code>的<code v-pre>configurable</code>为<code v-pre>false</code>。然后，改动<code v-pre>value</code>、<code v-pre>writable</code>、<code v-pre>enumerable</code>、<code v-pre>configurable</code>，结果都报错。</p>
<p><strong>注意</strong>，<code v-pre>writable</code>只有在<code v-pre>false</code>改为<code v-pre>true</code>会报错，<code v-pre>true</code>改为<code v-pre>false</code>是允许的。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = Object.defineProperty({}, 'p', {
  writable: true,
  configurable: false
});

Object.defineProperty(obj, 'p', {writable: false})
// 修改成功
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>至于<code v-pre>value</code>，只要<code v-pre>writable</code>和<code v-pre>configurable</code>有一个为<code v-pre>true</code>，就允许改动。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var o1 = Object.defineProperty({}, 'p', {
  value: 1,
  writable: true,
  configurable: false
});

Object.defineProperty(o1, 'p', {value: 2})
// 修改成功

var o2 = Object.defineProperty({}, 'p', {
  value: 1,
  writable: false,
  configurable: true
});

Object.defineProperty(o2, 'p', {value: 2})
// 修改成功
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外，<code v-pre>writable</code>为<code v-pre>false</code>时，直接给目标属性赋值，不报错，但不会成功。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = Object.defineProperty({}, 'p', {
  value: 1,
  writable: false,
  configurable: false
});

obj.p = 2;
obj.p // 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>obj.p</code>的<code v-pre>writable</code>为<code v-pre>false</code>，对<code v-pre>obj.p</code>直接赋值不会生效。如果是严格模式，还会报错。</p>
<p>可配置性决定了目标属性是否可以被删除（delete）。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = Object.defineProperties({}, {
  p1: { value: 1, configurable: true },
  p2: { value: 2, configurable: false }
});

delete obj.p1 // true
delete obj.p2 // false

obj.p1 // undefined
obj.p2 // 2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>obj.p1</code>的<code v-pre>configurable</code>是<code v-pre>true</code>，所以可以被删除，<code v-pre>obj.p2</code>就无法删除。</p>
<h2 id="_7、存取器-get和set" tabindex="-1"><a class="header-anchor" href="#_7、存取器-get和set" aria-hidden="true">#</a> 7、存取器（get和set）</h2>
<p>除了直接定义以外，属性还可以用存取器（accessor）定义。其中，存值函数称为<code v-pre>setter</code>，使用属性描述对象的<code v-pre>set</code>属性；取值函数称为<code v-pre>getter</code>，使用属性描述对象的<code v-pre>get</code>属性。</p>
<p><strong>一旦对目标属性定义了存取器，那么存取的时候，都将执行对应的函数</strong>。利用这个功能，可以实现许多高级特性，比如某个属性禁止赋值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = Object.defineProperty({}, 'p', {
  get: function () { // 获取属性时执行
    return 'getter' // 这里相当于定义了p属性的值，如果设置了get则不能再设置value
  },
  set: function (value) { // 设置属性时执行
    console.log('setter: ' + value);
  }
});

obj.p // &quot;getter&quot;
obj.p = 123 // &quot;setter: 123&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>obj.p</code>定义了<code v-pre>get</code>和<code v-pre>set</code>属性。<code v-pre>obj.p</code>取值时，就会调用<code v-pre>get</code>；赋值时，就会调用<code v-pre>set</code>。</p>
<p>JavaScript 还提供了存取器的<strong>另一种写法</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = {
    get p(){ // 相当于为obj对象创建一个p属性，并且赋值为‘getter’
        return 'getter'
    },
    ser p(value){
        console.log('setter'+value)
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的写法与定义属性描述对象是等价的，而且使用更广泛。</p>
<p>注意，取值函数<code v-pre>get</code>不能接受参数，存值函数<code v-pre>set</code>只能接受一个参数（即属性的值）。</p>
<p>存取器往往用于，属性的值依赖对象内部数据的场合。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj ={
  $n : 5,
  get next() { return this.$n++ },
  set next(n) {
    if (n &gt;= this.$n) this.$n = n;
    else throw new Error('新的值必须大于当前值');
  }
};

obj.next // 5

obj.next = 10;
obj.next // 10

obj.next = 5;
// Uncaught Error: 新的值必须大于当前值
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>next</code>属性的存值函数和取值函数，都依赖于内部属性<code v-pre>$n</code>。</p>
<blockquote>
<p>vue框架就是通过存取器来实现的数据响应式</p>
</blockquote>
<h2 id="_8、对象的拷贝" tabindex="-1"><a class="header-anchor" href="#_8、对象的拷贝" aria-hidden="true">#</a> 8、对象的拷贝</h2>
<p>有时，我们需要将一个对象的所有属性，拷贝到另一个对象，可以用下面的方法实现。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var extend = function (to, from){
    for(var property in from) {
        to[property] = from[property]
    }
    return to
}
extend({}, {a: 1}) // {a:1}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面这个方法的问题在于，如果遇到存取器定义的属性，会只拷贝到属性和值，并不能拷贝到存取器</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>extend({}, {
  get a() { return 1 }
})
// {a: 1}   // 这里并没有拷贝到get方法
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了解决这个问题，我们可以通过<code v-pre>Object.defineProperty</code>方法来拷贝属性。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var extend = function (to, from){
    for(var property in from){
    	if(!from.hasOwnProperty()) continue //过滤继承属性 continue 终止本次循环，继续剩余循环
        Object.defineProperty(
            to,
            property,
            Object.getOwnPropertyDescriptor(from,property)
        )
    }
    return to
}
extend({},{get a(){return 1}}) // {get a(){return 1}}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>hasOwnProperty</code>那一行用来过滤掉继承的属性，否则可能会报错，因为<code v-pre>Object.getOwnPropertyDescriptor</code>读不到继承属性的属性描述对象。</p>
<h2 id="_9、控制对象读写状态" tabindex="-1"><a class="header-anchor" href="#_9、控制对象读写状态" aria-hidden="true">#</a> 9、控制对象读写状态</h2>
<p>有时需要<strong>冻结对象的读写状态，防止对象被改变</strong>。</p>
<p>JavaScript 提供了三种冻结方法：</p>
<ul>
<li>
<p>最弱的一种是<code v-pre>Object.preventExtensions</code> (不能新增，但能被删除和修改)</p>
</li>
<li>
<p>其次是<code v-pre>Object.seal</code> (不能新增和删除，但能修改)</p>
</li>
<li>
<p>最强的是<code v-pre>Object.freeze</code> (不能新增、删除和修改)</p>
</li>
</ul>
<h3 id="object-preventextensions-防止新增" tabindex="-1"><a class="header-anchor" href="#object-preventextensions-防止新增" aria-hidden="true">#</a> Object.preventExtensions() 防止新增</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = new Object()
Object.preventExtensions(obj) // prevent Extensions 中文： 防止扩展
Object.defineProperty(obj,'p',{
    value: 'hello'
}) // TypeError:cannot define property:p, object is not extensible

obj.p = 1
obj.p // undefined
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>obj</code>对象经过<code v-pre>Object.preventExtensions</code>以后，就无法添加新属性了。</p>
<h3 id="object-isextensible-是可新增的" tabindex="-1"><a class="header-anchor" href="#object-isextensible-是可新增的" aria-hidden="true">#</a> Object.isExtensible() 是可新增的？</h3>
<p><code v-pre>Object.isExtensible</code>方法用于<strong>检查一个对象是否使用了<code v-pre>Object.preventExtensions</code>方法</strong>。也就是说，检查是否可以为一个对象添加属性。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = new Object()
Object.isExtensible(obj) // true    is Extensible 中文： 是可扩展的？
Object.preventExtensions(obj)
Object.isExtensible(obj) // false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，对<code v-pre>obj</code>对象使用<code v-pre>Object.preventExtensions</code>方法以后，再使用<code v-pre>Object.isExtensible</code>方法，返回<code v-pre>false</code>，表示已经不能添加新属性了。</p>
<h3 id="object-seal-密封" tabindex="-1"><a class="header-anchor" href="#object-seal-密封" aria-hidden="true">#</a> Object.seal() 密封</h3>
<p><code v-pre>Object.seal</code>方法使得一个对象<strong>既无法添加新属性，也无法删除旧属性。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = {p: 'hello'}
Object.seal(obj) // seal 中文： 密封

delete obj.p // 删除属性无效
obj.p // hello

obj.p = 'hi' // 可修改值
obj.p // hi

obj.x = 'world' // 新增属性无效
obj.x // undefined
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>obj</code>对象执行<code v-pre>Object.seal</code>方法以后，就无法添加新属性和删除旧属性了。</p>
<p><code v-pre>Object.seal</code>实质是把属性描述对象的<code v-pre>configurable</code>属性设为<code v-pre>false</code>，因此属性描述对象不再能改变了。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = {p: 'a'}

Object.getOwnPropertyDescriptor(obj, 'p')
// Object {
//   value: &quot;a&quot;,
//   writable: true,
//   enumerable: true,
//   configurable: true
// }

Object.seal(obj)

Object.getOwnPropertyDescriptor(obj, 'p')
// Object {
//   value: &quot;a&quot;,
//   writable: true,
//   enumerable: true,
//   configurable: false
// }

Object.defineProperty(obj,'p',{
    enumerable:
})
// TypeError: Cannot redefine property: p
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，使用<code v-pre>Object.seal</code>方法之后，属性描述对象的<code v-pre>configurable</code>属性就变成了<code v-pre>false</code>，然后改变<code v-pre>enumerable</code>属性就会报错。</p>
<p><code v-pre>Object.seal</code>只是禁止新增或删除属性，并不影响修改某个属性的值。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>var obj = { p: 'a' };
Object.seal(obj);
obj.p = 'b';
obj.p // 'b'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>Object.seal</code>方法对<code v-pre>p</code>属性的<code v-pre>value</code>无效，是因为此时<code v-pre>p</code>属性的可写性由<code v-pre>writable</code>决定。</p>
<h3 id="object-issealed-是密封的" tabindex="-1"><a class="header-anchor" href="#object-issealed-是密封的" aria-hidden="true">#</a> Object.isSealed() 是密封的？</h3>
<p><code v-pre>Object.isSealed</code>方法用于<strong>检查一个对象是否使用了<code v-pre>Object.seal</code>方法</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = {p:'a'}
Object.seal(obj)
Object.isSealed(obj) // true   is Sealed 中文： 是密封的？
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这时，<code v-pre>Object.isExtensible</code>方法也返回<code v-pre>false</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = { p: 'a' };

Object.seal(obj);
Object.isExtensible(obj) // false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>isSealed为true，是密封的。isExtensible为false，不是可扩展的</p>
</blockquote>
<h3 id="object-freeze-冻结" tabindex="-1"><a class="header-anchor" href="#object-freeze-冻结" aria-hidden="true">#</a> Object.freeze() 冻结</h3>
<p><code v-pre>Object.freeze</code>方法可以使得一个对象<strong>无法添加新属性、无法删除旧属性、也无法改变属性的值</strong>，使得这个对象实际上变成了常量。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = {p:'hello'}
Object.freeze(obj)

obj.p = 'world'
obj.p // hello

obj.t = 'hello'
obj.t // nudefined

delete obj.p // false
obj.p // hello
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，对<code v-pre>obj</code>对象进行<code v-pre>Object.freeze()</code>以后，修改属性、新增属性、删除属性都无效了。这些操作并不报错，只是默默地失败。如果在严格模式下，则会报错。</p>
<h3 id="object-isfrozen-是冻结的" tabindex="-1"><a class="header-anchor" href="#object-isfrozen-是冻结的" aria-hidden="true">#</a> Object.isFrozen() 是冻结的？</h3>
<p><code v-pre>Object.isFrozen</code>方法用于<strong>检查一个对象是否使用了<code v-pre>Object.freeze</code>方法。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = {
  p: 'hello'
};

Object.freeze(obj);
Object.isFrozen(obj) // true // 是冻结的
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用<code v-pre>Object.freeze</code>方法以后，<code v-pre>Object.isSealed</code>将会返回<code v-pre>true</code>，<code v-pre>Object.isExtensible</code>返回<code v-pre>false</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = {
  p: 'hello'
};

Object.freeze(obj);

Object.isSealed(obj) // true // 是密封的
Object.isExtensible(obj) // false // 不是可扩展的
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>Object.isFrozen</code>的一个<strong>用途</strong>是，确认某个对象没有被冻结后，再对它的属性赋值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = {
  p: 'hello'
};

Object.freeze(obj);

if (!Object.isFrozen(obj)) {
  obj.p = 'world';
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，确认<code v-pre>obj</code>没有被冻结后，再对它的属性赋值，就不会报错了。</p>
<h3 id="局限性" tabindex="-1"><a class="header-anchor" href="#局限性" aria-hidden="true">#</a> 局限性</h3>
<p>上面的三个方法锁定对象的可写性有一个<strong>漏洞</strong>：<strong>可以通过改变原型对象，来为对象增加属性</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = new Object();
Object.preventExtensions(obj);

var proto = Object.getPrototypeOf(obj); // 获取原型对象
proto.t = 'hello';
obj.t
// hello
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，对象<code v-pre>obj</code>本身不能新增属性，但是可以在它的原型对象上新增属性，就依然能够在<code v-pre>obj</code>上读到。</p>
<p>一种解决方案是，把<code v-pre>obj</code>的原型也冻结住。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = new Object();
Object.preventExtensions(obj);

var proto = Object.getPrototypeOf(obj);
Object.preventExtensions(proto);

proto.t = 'hello';
obj.t // undefined
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>另外一个局限</strong>是，如果属性值是对象，上面这些方法只能冻结属性指向的对象，而不能冻结对象本身的内容。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = {
  foo: 1,
  bar: ['a', 'b']
};
Object.freeze(obj);

obj.bar.push('c');
obj.bar // [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>obj.bar</code>属性指向一个数组，<code v-pre>obj</code>对象被冻结以后，这个指向无法改变，即无法指向其他值，但是所指向的数组是可以改变的。</p>
<h2 id="三、array对象" tabindex="-1"><a class="header-anchor" href="#三、array对象" aria-hidden="true">#</a> 三、Array对象</h2>
<h2 id="_1、array构造函数" tabindex="-1"><a class="header-anchor" href="#_1、array构造函数" aria-hidden="true">#</a> 1、Array构造函数</h2>
<p><code v-pre>Array</code>是 JavaScript 的原生对象，同时也是一个构造函数，可以用它生成新的数组。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var arr = new Array(2); // Array是原生对象，也是构造函数； 2表示生成2个成员
arr.length // 2
arr // [ empty x 2 ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>Array</code>构造函数的参数<code v-pre>2</code>，表示生成一个两个成员的数组，每个位置都是空值。</p>
<p>如果没有使用<code v-pre>new</code>，运行结果也是一样的。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var arr = new Array(2);
// 等同于
var arr = Array(2);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>Array</code>构造函数有一个很大的<strong>缺陷</strong>，就是不同的参数，会导致它的行为不一致。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 无参数时，返回一个空数组
new Array() // []

// 单个正整数参数，表示返回的新数组的长度
new Array(1) // [ empty ]
new Array(2) // [ empty x 2 ]

// 非正整数的数值作为参数，会报错
new Array(3.2) // RangeError: Invalid array length
new Array(-3) // RangeError: Invalid array length

// 单个非数值（比如字符串、布尔值、对象等）作为参数，
// 则该参数是返回的新数组的成员
new Array('abc') // ['abc']
new Array([1]) // [Array[1]]

// 多参数时，所有参数都是返回的新数组的成员
new Array(1, 2) // [1, 2]
new Array('a', 'b', 'c') // ['a', 'b', 'c']
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，<code v-pre>Array</code>作为构造函数，行为很不一致。因此，不建议使用它生成新数组，直接使用数组字面量是更好的做法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// bad
var arr = new Array(1, 2);

// good
var arr = [1, 2];
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，如果参数是一个正整数，返回数组的成员都是空位。虽然读取的时候返回<code v-pre>undefined</code>，但实际上该位置没有任何值。虽然可以取到<code v-pre>length</code>属性，但是取不到键名。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var a = new Array(3);
var b = [undefined, undefined, undefined];

a.length // 3
b.length // 3

a[0] // undefined
b[0] // undefined

0 in a // false  // in运算符用于数组时，前面的参数为数组索引
0 in b // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>a</code>是一个长度为3的空数组，<code v-pre>b</code>是一个三个成员都是<code v-pre>undefined</code>的数组。读取键值的时候，<code v-pre>a</code>和<code v-pre>b</code>都返回<code v-pre>undefined</code>，但是<code v-pre>a</code>的键位都是空的，<code v-pre>b</code>的键位是有值的。</p>
<h2 id="_2、静态方法" tabindex="-1"><a class="header-anchor" href="#_2、静态方法" aria-hidden="true">#</a> 2、静态方法</h2>
<h3 id="array-isarray" tabindex="-1"><a class="header-anchor" href="#array-isarray" aria-hidden="true">#</a> Array.isArray()</h3>
<p><code v-pre>Array.isArray</code>方法返回一个布尔值，表示参数是否为数组。它可以弥补<code v-pre>typeof</code>运算符的不足。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var arr = [1,2,3]
typeof arr // object // 使用typeof返回的是object
Array.isArray(arr)// true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>typeof</code>运算符只能显示数组的类型是<code v-pre>Object</code>，而<code v-pre>Array.isArray</code>方法可以识别数组。</p>
<h2 id="_3、实例方法" tabindex="-1"><a class="header-anchor" href="#_3、实例方法" aria-hidden="true">#</a> 3、实例方法</h2>
<h3 id="valueof-原数组-tostring-转字符串" tabindex="-1"><a class="header-anchor" href="#valueof-原数组-tostring-转字符串" aria-hidden="true">#</a> valueOf() 原数组，toString() 转字符串</h3>
<p><code v-pre>valueOf</code>方法是一个所有对象都拥有的方法，表示对该对象求值。不同对象的<code v-pre>valueOf</code>方法不尽一致，数组的<code v-pre>valueOf</code>方法<strong>返回数组本身</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var arr = [1,2,3]
arr.valueOf() // [1,2,3]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>toString</code>方法也是对象的通用方法，数组的<code v-pre>toString</code>方法返回数组的字符串形式。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var arr = [1, 2, 3];
arr.toString() // &quot;1,2,3&quot;

var arr = [1, 2, 3, [4, 5, 6]];
arr.toString() // &quot;1,2,3,4,5,6&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="push-末尾添加-pop-删除末尾" tabindex="-1"><a class="header-anchor" href="#push-末尾添加-pop-删除末尾" aria-hidden="true">#</a> push() 末尾添加，pop() 删除末尾</h3>
<p><code v-pre>push</code>方法用于在数组的<strong>末端添加一个或多个元素</strong>，并返回添加新元素后的数组长度。注意，该方法会改变原数组。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var arr=[]
arr.push(1) // 1
arr.push('a') // 2
arr.push(true,{}) // 4
arr // [1,'a',true,{}]

// 注：push()方法 返回添加后的数组长度，会改变原数组
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码使用<code v-pre>push</code>方法，往数组中添加了四个成员。</p>
<p><code v-pre>pop</code>方法用于<strong>删除数组的最后一个元素</strong>，并返回该元素。注意，该方法会改变原数组。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var arr = ['a','b','c']
arr.pop() // 'c'  删除最后一个元素，并返回该元素
arr // ['a','b']
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对空数组使用<code v-pre>pop</code>方法，不会报错，而是返回<code v-pre>undefined</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>[].pop() // undefined
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>push</code>和<code v-pre>pop</code>结合使用，就构成了“后进先出”的<strong>栈结构</strong>（stack）。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var arr = [];
arr.push(1, 2);
arr.push(3);
arr.pop();
arr // [1, 2]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>3</code>是最后进入数组的，但是最早离开数组。</p>
<h3 id="unshift-首位添加-shift-删除首位" tabindex="-1"><a class="header-anchor" href="#unshift-首位添加-shift-删除首位" aria-hidden="true">#</a> unshift() 首位添加, shift() 删除首位</h3>
<p><code v-pre>unshift()</code>方法用于在数组的<strong>第一个位置添加元素</strong>，并返回添加新元素后的数组长度。注意，该方法会改变原数组。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var a = ['a', 'b', 'c'];

a.unshift('x'); // 4
a // ['x', 'a', 'b', 'c']
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>unshift()</code>方法可以接受多个参数，这些参数都会添加到目标数组头部。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var arr = [ 'c', 'd' ];
arr.unshift('a', 'b') // 4
arr // [ 'a', 'b', 'c', 'd' ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>shift()</code>方法用于<strong>删除数组的第一个元素</strong>，并返回该元素。注意，该方法会改变原数组。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var a = ['a','b','c']
a.shift() // 'a' 删除第一个元素，并返回该元素
a // ['b','c']
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，使用<code v-pre>shift()</code>方法以后，原数组就变了。</p>
<p><code v-pre>shift()</code>方法可以遍历并清空一个数组。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var list = [1, 2, 3, 4];
var item;

while (item = list.shift()) {
  console.log(item);
}

list // []
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码通过<code v-pre>list.shift()</code>方法每次取出一个元素，从而遍历数组。它的前提是数组元素不能是<code v-pre>0</code>或任何布尔值等于<code v-pre>false</code>的元素，因此<strong>这样的遍历不是很可靠</strong>。</p>
<p><code v-pre>push()</code>和<code v-pre>shift()</code>结合使用，就构成了“先进先出”的<strong>队列(堆)结构</strong>（queue）。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var queue = []
queue.push('1')
queue.push('2')
queue.push('3')
queue.shift()
queue // ['2','3']
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>push() 最后位置添加元素，unshift() 第一位置添加元素</p>
<p>pop() 删除最后一个元素，shift() 删除第一个元素</p>
</blockquote>
<h3 id="join-连接每个成员-转字符串" tabindex="-1"><a class="header-anchor" href="#join-连接每个成员-转字符串" aria-hidden="true">#</a> join() 连接每个成员-转字符串</h3>
<p><code v-pre>join()</code>方法以指定参数作为分隔符，<strong>将所有数组成员连接为一个字符串返回</strong>。如果不提供参数，默认用逗号分隔。</p>
<p><strong>数组转字符串</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var a = [1,2,3,4]

a.join('') // '1234'
a.join(' ') // '1 2 3 4'
a.join('|') // '1|2|3|4‘
a.join() // '1,2,3,4'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果数组成员是<code v-pre>undefined</code>或<code v-pre>null</code>或空位，会被转成空字符串。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>[undefined, null].join('#')
// '#'

['a',, 'b'].join('-')
// 'a--b'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过<code v-pre>call</code>方法，这个方法也可以用于字符串或类似数组的对象。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Array.prototype.join.call('hello', '-')
// &quot;h-e-l-l-o&quot;
// 等价 'hello'.split('').join('-')

var obj = { 0: 'a', 1: 'b', length: 2 }; // 数组的变形对象
Array.prototype.join.call(obj, '-')
// 'a-b'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="concat-合并数组" tabindex="-1"><a class="header-anchor" href="#concat-合并数组" aria-hidden="true">#</a> concat() 合并数组</h3>
<p><code v-pre>concat</code>方法用于<strong>多个数组的合并</strong>。它将新数组的成员，添加到原数组成员的后部，然后<strong>返回一个新数组，原数组不变</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>['hello'].concat(['world'])
// ['hello','world']

['hello'].concat(['world'],['!'])
// [&quot;hello&quot;, &quot;world&quot;, &quot;!&quot;]

[].concat({a: 1}, {b: 2})
// [{ a: 1 }, { b: 2 }]

[2].concat({a: 1})
// [2, {a: 1}]

[].concat(1,2)
// [1,2]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除了数组作为参数，<code v-pre>concat</code>也接受其他类型的值作为参数，添加到目标数组尾部。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>[1, 2, 3].concat(4, 5, 6)
// [1, 2, 3, 4, 5, 6]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果数组成员包括对象，<code v-pre>concat</code>方法返回当前数组的一个浅拷贝。所谓“<strong>浅拷贝</strong>”，指的是新数组拷贝的是对象的引用。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = { a: 1 };
var oldArray = [obj]; // 浅拷贝

var newArray = oldArray.concat();

obj.a = 2; // 改变原对象以后，新数组跟着改变
newArray[0].a // 2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，原数组包含一个对象，<code v-pre>concat</code>方法生成的新数组包含这个对象的引用。所以，<strong>改变原对象以后，新数组跟着改变</strong>。</p>
<h3 id="reverse-反转" tabindex="-1"><a class="header-anchor" href="#reverse-反转" aria-hidden="true">#</a> reverse() 反转</h3>
<p><code v-pre>reverse</code>方法用于<strong>颠倒排列数组元素</strong>，返回改变后的数组。注意，该方法将<strong>改变原数组</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var a = [1,2,3,4]
a.reverse() // [4,3,2,1]
a // [4,3,2,1]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="slice-部分-提取部分成员" tabindex="-1"><a class="header-anchor" href="#slice-部分-提取部分成员" aria-hidden="true">#</a> slice() 部分-提取部分成员</h3>
<p><code v-pre>slice</code>方法用于<strong>提取目标数组的一部分</strong>，返回一个新数组，<strong>原数组不变</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>arr.slice(start, end);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>它的第一个参数为起始位置（从0开始），第二个参数为终止位置（但该位置的元素本身不包括在内）。如果省略第二个参数，则一直返回到原数组的最后一个成员。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var a = ['a','b','c']
a.slice(0) // ['a','b','c'] 从0到最后一个成员
a.slice(1) // ['b','c'] 从1到最后一个成员
a.slice(1,2) // ['b'] 从1到2成员，不包含2成员
a.slice(2,6) // ['c'] 从2到6成员，超出的不计算在内
a.slice() //['a','b','c'] 无参数，默认全部，多用于拷贝数组到新的数组
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，最后一个例子<code v-pre>slice</code>没有参数，实际上等于返回一个原数组的拷贝。</p>
<p>如果<code v-pre>slice</code>方法的参数是<strong>负数</strong>，则表示<strong>倒数计算的位置</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var a = ['a', 'b', 'c'];
a.slice(-2) // [&quot;b&quot;, &quot;c&quot;]
a.slice(-2, -1) // [&quot;b&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>-2</code>表示倒数计算的第二个位置，<code v-pre>-1</code>表示倒数计算的第一个位置。</p>
<p>如果<strong>第一个参数大于等于数组长度</strong>，或者<strong>第二个参数小于第一个参数</strong>，则<strong>返回空数组</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var a = ['a', 'b', 'c'];
a.slice(4) // []
a.slice(2, 1) // []
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="应用-类数组转数组" tabindex="-1"><a class="header-anchor" href="#应用-类数组转数组" aria-hidden="true">#</a> 应用-类数组转数组</h4>
<p>slice`方法的<strong>一个重要应用</strong>，是<strong>将类似数组的对象转为真正的数组</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Array.prototype.slice.call({ 0: 'a', 1: 'b', length: 2 })
// ['a', 'b']

Array.prototype.slice.call(document.querySelectorAll(&quot;div&quot;));
Array.prototype.slice.call(arguments);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码的参数都不是数组，但是通过<code v-pre>call</code>方法，在它们上面调用<code v-pre>slice</code>方法，就可以把它们转为真正的数组。</p>
<h3 id="splice-从第几个开始-删除几个-并添加成员-返回被删除成员。" tabindex="-1"><a class="header-anchor" href="#splice-从第几个开始-删除几个-并添加成员-返回被删除成员。" aria-hidden="true">#</a> splice()  从第几个开始，删除几个，并添加成员，返回被删除成员。</h3>
<p><code v-pre>splice</code>方法用于<strong>删除原数组的一部分成员</strong>，<strong>并可以在删除的位置添加新的数组成员</strong>，<strong>返回值是被删除的元素</strong>。注意，该方法会<strong>改变原数组</strong>。</p>
<blockquote>
<p>也可以不删除成员同时在指定位置添加新成员</p>
</blockquote>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>arr.splice(start, count, addElement1, addElement2, ...);
// 第几个开始，删除几个，加入的新成员...(非必需）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>splice</code>的第一个参数是删除的起始位置（从0开始），第二个参数是被删除的元素个数。如果后面还有更多的参数，则表示这些就是要被插入数组的新元素。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var a = [1,2,3,4,5,6]
a.splice(2,2) // [3,4] 返回被删除成员
a.[1,2,5,6]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码从原数组2号位置，删除了2个数组成员。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var a = ['a', 'b', 'c', 'd', 'e', 'f'];
a.splice(4, 2, 1, 2) // [&quot;e&quot;, &quot;f&quot;]
a // [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;, &quot;d&quot;, 1, 2]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码从原数组4号位置删除2个成员，并插入了[1 , 2]新成员。</p>
<p>起始位置如果是负数，就表示从倒数位置开始删除。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var a = ['a', 'b', 'c', 'd', 'e', 'f'];
a.splice(-4, 2) // [&quot;c&quot;, &quot;d&quot;] 负数表示倒数
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码表示，从倒数第四个位置<code v-pre>c</code>开始删除两个成员。</p>
<p>如果只是单纯地插入元素，<code v-pre>splice</code>方法的第二个参数可以设为<code v-pre>0</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var a = [1, 1, 1];

a.splice(1, 0, 'a') // [] // 不删除成员，并加入新成员到指定位置
a // [1, 'a', 1, 1]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="应用-拆分数组" tabindex="-1"><a class="header-anchor" href="#应用-拆分数组" aria-hidden="true">#</a> 应用-拆分数组</h4>
<p>如果只提供第一个参数，等同于将原数组在指定位置<strong>拆分成两个数组</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var a = [1, 2, 3, 4];
var a2 = a.splice(2) // [3, 4]
a // [1, 2]
a2 // [3, 4]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="sort-排序" tabindex="-1"><a class="header-anchor" href="#sort-排序" aria-hidden="true">#</a> sort() 排序</h3>
<p><code v-pre>sort</code>方法对数组成员进行排序，默认是按照<strong>字典顺序排序</strong>。排序后，将<strong>改变原数组</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>['d', 'c', 'b', 'a'].sort()
// ['a', 'b', 'c', 'd']


[4, 3, 2, 1].sort()
// [1, 2, 3, 4]

['abc','ba','ea','ae'].sort()
// [&quot;abc&quot;, &quot;ae&quot;, &quot;ba&quot;, &quot;ea&quot;]

[11, 101].sort()
// [101, 11]

[10111, 1101, 111].sort()
// [10111, 1101, 111]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码的最后三个例子，需要特殊注意。<code v-pre>sort()</code>方法不是按照大小排序，而是<strong>按照字典顺序</strong>。也就是说，数值会被先转成字符串，再按照字典顺序进行比较，所以<code v-pre>101</code>排在<code v-pre>11</code>的前面。</p>
<blockquote>
<p>先转成字符串，再从0位置开始对比对应位置上的值的顺序</p>
</blockquote>
<p>如果想让<code v-pre>sort</code>方法按照自定义方式排序，可以传入一个函数作为参数。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>[10111, 1101, 111].sort(function (a, b) { // 返回值大于0,则a排于b之后，否则反之。
  return a - b; // 升序
})
// [111, 1101, 10111]

[10111, 1101, 111].sort(function (a, b) {
  return b - a; // 降序
})
// [10111，1101, 111]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>sort</code>的参数函数本身接受两个参数，表示进行比较的两个数组成员。如果该函数的返回值大于<code v-pre>0</code>，表示第一个成员排在第二个成员后面；其他情况下，都是第一个元素排在第二个元素前面。</p>
<h4 id="应用-自定义排序" tabindex="-1"><a class="header-anchor" href="#应用-自定义排序" aria-hidden="true">#</a> 应用-自定义排序</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>[
  { name: &quot;张三&quot;, age: 30 },
  { name: &quot;李四&quot;, age: 24 },
  { name: &quot;王五&quot;, age: 28  }
].sort(function (o1, o2) {
  return o1.age - o2.age;
})
// [
//   { name: &quot;李四&quot;, age: 24 },
//   { name: &quot;王五&quot;, age: 28  },
//   { name: &quot;张三&quot;, age: 30 }
// ]


// 自定义排序
[
    {day: '星期日'}, {day:'星期一'}, {day:'星期五'}
].sort(function(o1,o2){
    return computedDay(o1.day.charAt(2)) - computedDay(o2.day.charAt(2))
}) //[{ day: '星期一' }, { day: '星期五' }, { day: '星期日' }]

function computedDay(v){
   return v === '一' ? 1 : v === '二' ? 2 : v === '三' ? 3 : v === '四' ? 4 : v === '五' ? 5 : v === '六' ? 6 : 7
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，<strong>自定义的排序函数应该返回数值</strong>，否则不同的浏览器可能有不同的实现，不能保证结果都一致。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// bad
[1, 4, 2, 6, 0, 6, 2, 6].sort((a, b) =&gt; a &gt; b) // 返回布尔值，不推荐

// good
[1, 4, 2, 6, 0, 6, 2, 6].sort((a, b) =&gt; a - b) // 返回数值，推荐
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，前一种排序算法返回的是布尔值，这是不推荐使用的。后一种是数值，才是更好的写法。</p>
<h3 id="map-映射-每个成员-并返回" tabindex="-1"><a class="header-anchor" href="#map-映射-每个成员-并返回" aria-hidden="true">#</a> map() 映射 每个成员 并返回</h3>
<p><code v-pre>map</code>方法将数组的所有成员依次传入参数函数，然后把每一次的执行结果组成一个新数组返回。<strong>不改变原数组</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var numbers = [1, 2, 3];

numbers.map(function (n) {
  return n + 1;
});
// [2, 3, 4]

numbers
// [1, 2, 3]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>numbers</code>数组的所有成员依次执行参数函数，运行结果组成一个新数组返回，原数组没有变化。</p>
<p><code v-pre>map</code>方法接受一个函数作为参数。该函数调用时，<code v-pre>map</code>方法向它传入三个参数：<strong>当前成员</strong>、<strong>当前索引</strong>、<strong>数组本身</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>[1, 2, 3].map(function(elem, index, arr) { // 当前成员、当前索引、数组本身
  return elem * index;
});
// [0, 2, 6]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>map</code>方法的回调函数有三个参数，<code v-pre>elem</code>为当前成员的值，<code v-pre>index</code>为当前成员的索引，<code v-pre>arr</code>为原数组（<code v-pre>[1, 2, 3]</code>）。</p>
<p><code v-pre>map</code>方法还可以接受第二个参数，用来绑定回调函数内部的<code v-pre>this</code>变量（详见《this 变量》一章）。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var arr = ['a', 'b', 'c'];

[1, 2].map(function (e) {
  return this[e]; // this指向arr
}, arr) // 使内部this指向arr
// ['b', 'c']
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码通过<code v-pre>map</code>方法的第二个参数，将回调函数内部的<code v-pre>this</code>对象，指向<code v-pre>arr</code>数组。</p>
<p>如果数组有空位，<code v-pre>map</code>方法的回调函数在这个位置不会执行，会跳过数组的空位。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var f = function (n) { return 'a' };

[1, undefined, 2].map(f) // [&quot;a&quot;, &quot;a&quot;, &quot;a&quot;]
[1, null, 2].map(f) // [&quot;a&quot;, &quot;a&quot;, &quot;a&quot;]
[1, , 2].map(f) // [&quot;a&quot;, , &quot;a&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>map</code>方法不会跳过<code v-pre>undefined</code>和<code v-pre>null</code>，但是会跳过空位。</p>
<h3 id="foreach-循环每个成员" tabindex="-1"><a class="header-anchor" href="#foreach-循环每个成员" aria-hidden="true">#</a> forEach() 循环每个成员</h3>
<p><code v-pre>forEach</code>方法与<code v-pre>map</code>方法很相似，也是对数组的所有成员依次执行参数函数。但是，<code v-pre>forEach</code>方法<strong>不返回值</strong>，<strong>只用来操作数据</strong>。这就是说，如果数组遍历的目的是为了得到返回值，那么使用<code v-pre>map</code>方法，否则使用<code v-pre>forEach</code>方法。</p>
<p><code v-pre>forEach</code>的用法与<code v-pre>map</code>方法一致，参数是一个函数，该函数同样接受三个参数：<strong>当前成员、当前索引、整个数组</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function log(element, index, array) {  // 当前成员、当前索引、数组本身
  console.log('[' + index + '] = ' + element);
}

[2, 5, 9].forEach(log);
// [0] = 2
// [1] = 5
// [2] = 9
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>forEach</code>遍历数组不是为了得到返回值，而是为了在屏幕输出内容，所以不必使用<code v-pre>map</code>方法。</p>
<p><code v-pre>forEach</code>方法也可以接受第二个参数，绑定参数函数的<code v-pre>this</code>变量。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var out = [];

[1, 2, 3].forEach(function(elem) {
  this.push(elem * elem); // this指向为out
}, out); // 使内部this指向out

out // [1, 4, 9]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，空数组<code v-pre>out</code>是<code v-pre>forEach</code>方法的第二个参数，结果，回调函数内部的<code v-pre>this</code>关键字就指向<code v-pre>out</code>。</p>
<p>注意，<code v-pre>forEach</code>方法<strong>无法中断执行</strong>，总是会将所有成员遍历完。如果希望符合某种条件时，就中断遍历，要使用<code v-pre>for</code>循环。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var arr = [1, 2, 3];
for (var i = 0; i &lt; arr.length; i++) {
  if (arr[i] === 2) break;
  console.log(arr[i]);
}
// 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，执行到数组的第二个成员时，就会中断执行。<code v-pre>forEach</code>方法做不到这一点。</p>
<p><code v-pre>forEach</code>方法也会跳过数组的空位。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var log = function (n) {
  console.log(n + 1);
};

[1, undefined, 2].forEach(log)
// 2
// NaN
// 3

[1, null, 2].forEach(log)
// 2
// 1  // null+1 =&gt; 1
// 3

[1, , 2].forEach(log)
// 2
// 3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>forEach</code>方法不会跳过<code v-pre>undefined</code>和<code v-pre>null</code>，但会跳过空位。</p>
<h3 id="filter-过滤" tabindex="-1"><a class="header-anchor" href="#filter-过滤" aria-hidden="true">#</a> filter() 过滤</h3>
<p><code v-pre>filter</code>方法用于过滤数组成员，满足条件的成员组成一个新数组返回。</p>
<p>它的参数是一个函数，所有数组成员依次执行该函数，返回结果为<code v-pre>true</code>的成员组成一个新数组返回。</p>
<p>该方法<strong>不会改变原数组</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>[1,2,3,4,5].filter(function(elem){
    return elem &gt; 3
})
// [4,5]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码将大于<code v-pre>3</code>的数组成员，作为一个<strong>新数组返回</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var arr = [0, 1, 'a', false];

arr.filter(Boolean)
// [1, &quot;a&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>filter</code>方法返回数组<code v-pre>arr</code>里面所有布尔值为<code v-pre>true</code>的成员。</p>
<p><code v-pre>filter</code>方法的参数函数可以接受三个参数**：当前成员，当前位置、整个数组。**</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>[1, 2, 3, 4, 5].filter(function (elem, index, arr) { // 当前成员，当前位置、整个数组
  return index % 2 === 0;
});
// [1, 3, 5]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码返回偶数位置的成员组成的新数组。</p>
<p><code v-pre>filter</code>方法还可以接受第二个参数，用来绑定参数函数内部的<code v-pre>this</code>变量。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = { MAX: 3 };
var myFilter = function (item) {
  if (item &gt; this.MAX) return true; // this指向obj
};

var arr = [2, 8, 3, 4, 1, 3, 2, 9];
arr.filter(myFilter, obj) // [8, 4, 9]  // 使myFilter内部this指向obj
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，过滤器<code v-pre>myFilter</code>内部有<code v-pre>this</code>变量，它可以被<code v-pre>filter</code>方法的第二个参数<code v-pre>obj</code>绑定，返回大于<code v-pre>3</code>的成员。</p>
<h3 id="some-某个-every-每个" tabindex="-1"><a class="header-anchor" href="#some-某个-every-每个" aria-hidden="true">#</a> some()某个，every()每个</h3>
<p>这两个方法类似“<strong>断言</strong>”（assert），返回一个布尔值，表示判断数组成员是否符合某种条件。</p>
<p>它们接受一个函数作为参数，所有数组成员依次执行该函数。该函数接受三个参数：<strong>当前成员、当前位置、整个数组</strong>，然后<strong>返回一个布尔值</strong>。</p>
<p><code v-pre>some</code>方法是只要一个成员的返回值是<code v-pre>true</code>，则整个<code v-pre>some</code>方法的返回值就是<code v-pre>true</code>，否则返回<code v-pre>false</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var arr = [1,2,3,4,5]
arr.some(function(elem,index,arr){ // 返回值中有一个为true则此方法返回true
    return elem &gt;= 3
})
// true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，如果数组<code v-pre>arr</code>有一个成员大于等于3，<code v-pre>some</code>方法就返回<code v-pre>true</code>。</p>
<p><code v-pre>every</code>方法是所有成员的返回值都是<code v-pre>true</code>，整个<code v-pre>every</code>方法才返回<code v-pre>true</code>，否则返回<code v-pre>false</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var arr = [1, 2, 3, 4, 5];
arr.every(function (elem, index, arr) { // 每个返回值都为true，此方法才返回true，否则返回false
  return elem &gt;= 3;
});
// false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，数组<code v-pre>arr</code>并非所有成员大于等于<code v-pre>3</code>，所以返回<code v-pre>false</code>。</p>
<p>注意，对于空数组，<code v-pre>some</code>方法返回<code v-pre>false</code>，<code v-pre>every</code>方法返回<code v-pre>true</code>，回调函数都不会执行。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function isEven(x) { return x % 2 === 0 } // 不会执行此函数

[].some(isEven) // false
[].every(isEven) // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>some</code>和<code v-pre>every</code>方法还可以接受第二个参数，用来绑定参数函数内部的<code v-pre>this</code>变量。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var arr = [1,2,3]
var obj = {MAX:0}
function fn(elem) {
    return elem &gt; this.MAX // this指向obj
}

arr.some(fn,obj) // true
arr.every(fn,obj) // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="reduce-累计器-reduceright-反向累计器" tabindex="-1"><a class="header-anchor" href="#reduce-累计器-reduceright-反向累计器" aria-hidden="true">#</a> reduce() 累计器，reduceRight() 反向累计器</h3>
<p><code v-pre>reduce</code>方法和<code v-pre>reduceRight</code>方法依次处理数组的每个成员，最终累计为一个值。它们的差别是，<code v-pre>reduce</code>是从左到右处理（从第一个成员到最后一个成员），<code v-pre>reduceRight</code>则是从右到左（从最后一个成员到第一个成员），其他完全一样。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>[1,2,3,4,5].reduce(function(a,b,c,d){
    // 记住a是默认是第一个成员，然后是上一次运算的返回值。
    console.log(a,b)
    console.log(c)
    return a+b
})
// 1 2
// 3 3
// 6 4
// 10 5
// 最终结果 15
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>reduce</code>方法求出数组所有成员的和。第一次执行，<code v-pre>a</code>是数组的第一个成员<code v-pre>1</code>，<code v-pre>b</code>是数组的第二个成员<code v-pre>2</code>。第二次执行，<code v-pre>a</code>为上一轮的返回值<code v-pre>3</code>，<code v-pre>b</code>为第三个成员<code v-pre>3</code>。第三次执行，<code v-pre>a</code>为上一轮的返回值<code v-pre>6</code>，<code v-pre>b</code>为第四个成员<code v-pre>4</code>。第四次执行，<code v-pre>a</code>为上一轮返回值<code v-pre>10</code>，<code v-pre>b</code>为第五个成员<code v-pre>5</code>。至此所有成员遍历完成，整个方法的返回值就是最后一轮的返回值<code v-pre>15</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
// 说明：中括号代表可选参数
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>reduce</code>方法和<code v-pre>reduceRight</code>方法的第一个参数都是一个<code v-pre>callback</code>函数。该函数接受以下四个参数。</p>
<ol>
<li>累积变量，默认为数组的第一个成员</li>
<li>当前变量，默认为数组的第二个成员</li>
<li>当前位置（默认从1开始）, 如果提供了<code v-pre>initialValue</code>，则起始索引号为0，否则为1。 （可选）</li>
<li>原数组（可选）</li>
</ol>
<p><code v-pre>initialValue</code>可选</p>
<p>作为第一次调用 <code v-pre>callback函数时</code>的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。</p>
<p>如果要对累积变量指定初值，可以把它放在<code v-pre>reduce</code>方法和<code v-pre>reduceRight</code>方法的第二个参数。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>[1, 2, 3, 4, 5].reduce(function (a, b) {
  return a + b;
}, 10);
// 25
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码指定参数<code v-pre>a</code>的初值为10，所以数组从10开始累加，最终结果为25。注意，这时<code v-pre>b</code>是从数组的第一个成员开始遍历。</p>
<p>上面的第二个参数相当于设定了默认值，处理空数组时尤其有用。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function add(prev, cur) {
  return prev + cur;
}

[].reduce(add) // 报错
// TypeError: Reduce of empty array with no initial value
[].reduce(add, 1)
// 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，由于空数组取不到初始值，<code v-pre>reduce</code>方法会报错。这时，加上第二个参数，就能保证总是会返回一个值。</p>
<p>下面是一个<code v-pre>reduceRight</code>方法的例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function subtract(prev, cur) {
  return prev - cur;
}

[3, 2, 1].reduce(subtract) // 0
[3, 2, 1].reduceRight(subtract) // -4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>reduce</code>方法相当于<code v-pre>3</code>减去<code v-pre>2</code>再减去<code v-pre>1</code>，<code v-pre>reduceRight</code>方法相当于<code v-pre>1</code>减去<code v-pre>2</code>再减去<code v-pre>3</code>。</p>
<h4 id="应用-找出字符最长的数组成员" tabindex="-1"><a class="header-anchor" href="#应用-找出字符最长的数组成员" aria-hidden="true">#</a> 应用-找出字符最长的数组成员</h4>
<p>由于这两个方法会遍历数组，所以实际上还可以用来做一些遍历相关的操作。比如，找出字符长度最长的数组成员。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>function findLongest(entries) {
  return entries.reduce(function (longest, entry) {
    return entry.length &gt; longest.length ? entry : longest;
  }, '');
}

findLongest(['aaa', 'bb', 'c']) // &quot;aaa&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>reduce</code>的参数函数会将字符长度较长的那个数组成员，作为累积值。这导致遍历所有成员之后，累积值就是字符长度最长的那个成员。</p>
<h4 id="应用-按属性对object分类" tabindex="-1"><a class="header-anchor" href="#应用-按属性对object分类" aria-hidden="true">#</a> 应用-按属性对object分类</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var people = [
  { name: 'Alice', age: 21 },
  { name: 'Max', age: 20 },
  { name: 'Jane', age: 20 }
];

function groupBy(objectArray, property) {
  return objectArray.reduce(function (acc, obj) {
    var key = obj[property];
    if (!acc[key]) {// 当{}中没有对应分类属性时，先创建改属性
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {}); // 初始值为{}
}

var groupedPeople = groupBy(people, 'age');
// groupedPeople is:
// {
//   20: [
//     { name: 'Max', age: 20 },
//     { name: 'Jane', age: 20 }
//   ],
//   21: [{ name: 'Alice', age: 21 }]
// }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>更多例子：&lt; https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce &gt;</p>
<h3 id="indexof-搜索成员第一个出现的位置-lastindexof-搜索成员最后出现的位置" tabindex="-1"><a class="header-anchor" href="#indexof-搜索成员第一个出现的位置-lastindexof-搜索成员最后出现的位置" aria-hidden="true">#</a> indexOf() 搜索成员第一个出现的位置，lastIndexOf() 搜索成员最后出现的位置</h3>
<p><code v-pre>indexOf</code>方法返回<strong>给定元素在数组中第一次出现的位置</strong>，如果<strong>没有则返回<code v-pre>-1</code></strong>。</p>
<p><strong>indexOf语法</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>arr.indexOf(searchElement[, fromIndex = 0])
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var a = [1,2,3,4,5]
a.indexOf(3) // 2   3在数组a中第一次出现的位置为2
a.indexOf(6) // -1  6在数组a中没有出现，返回-1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>indexOf</code>方法还可以接受第二个参数，表示搜索的开始位置。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>['a', 'b', 'c'].indexOf('a', 1) // -1 从1位置开始搜索a，没有搜索到
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码从1号位置开始搜索字符<code v-pre>a</code>，结果为<code v-pre>-1</code>，表示没有搜索到。</p>
<p><strong>lastIndexOf()语法</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>arr.lastIndexOf(searchElement[, fromIndex = arr.length - 1])
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>lastIndexOf</code>方法返回<strong>给定元素在数组中最后一次出现的位置</strong>，如果没有则返回<code v-pre>-1</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var a = [2,3,4,2]
a.lastIndexOf(2) //3   2在数组a中最后一次出现的位置为3
a.lastIndexOf(5) //-1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，这两个方法不能用来搜索<code v-pre>NaN</code>的位置，即它们无法确定数组成员是否包含<code v-pre>NaN</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>[NaN].indexOf(NaN) // -1
[NaN].lastIndexOf(NaN) // -1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这是因为这两个方法内部，使用严格相等运算符（<code v-pre>===</code>）进行比较，而<code v-pre>NaN</code>是唯一一个不等于自身的值。</p>
<h3 id="链式使用" tabindex="-1"><a class="header-anchor" href="#链式使用" aria-hidden="true">#</a> 链式使用</h3>
<p>上面这些数组方法之中，有不少返回的还是数组，所以可以链式使用。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var users = [
  {name: 'tom', email: 'tom@example.com'},
  {name: 'peter', email: 'peter@example.com'}
];

users
.map(function (user) {
  return user.email;
}) // 对每个成员进行遍历，使用返回值组成一个新的数组并返回
.filter(function (email) { // 过滤返回值为false的成员，并返回一个过滤掉的新数组
  return /^t/.test(email);
})
.forEach(function (email) { // 遍历数组
  console.log(email);
});
// &quot;tom@example.com&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，先产生一个所有 Email 地址组成的数组，然后再过滤出以<code v-pre>t</code>开头的 Email 地址，最后将它打印出来。</p>
<blockquote>
<p>方法的返回值能满足下一个方法的调用，即可使用链式调用。</p>
</blockquote>
<h2 id="四、包装对象" tabindex="-1"><a class="header-anchor" href="#四、包装对象" aria-hidden="true">#</a> 四、包装对象</h2>
<h2 id="_1、定义" tabindex="-1"><a class="header-anchor" href="#_1、定义" aria-hidden="true">#</a> 1、定义</h2>
<p>对象是JavaScript语言中最主要的数据类型，三种原始类型的值——数字、字符串、布尔值 在一定条件下，也会自动转为对象，也就是原始类型的<strong>包装对象</strong>（wrapper）</p>
<p>所谓“包装对象”，<strong>指的是与数字、字符串、布尔值分别相对应的<code v-pre>Number</code>、<code v-pre>String</code>、<code v-pre>Boolean</code>三个原生对象。这三个原生对象可以把原始类型的值变成（包装成）对象</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var v1 = new Number(123);
var v2 = new String('abc');
var v3 = new Boolean(true);

typeof v1 // &quot;object&quot;
typeof v2 // &quot;object&quot;
typeof v3 // &quot;object&quot;

v1 === 123 // false
v2 === 'abc' // false
v3 === true // false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，基于原始类型的值，生成了三个对应的包装对象。可以看到，<code v-pre>v1</code>、<code v-pre>v2</code>、<code v-pre>v3</code>都是对象，且与对应的简单类型值不相等。</p>
<p><strong>包装对象的设计目的，首先是使得“对象”这种类型可以覆盖 JavaScript 所有的值，整门语言有一个通用的数据模型，其次是使得原始类型的值也有办法调用自己的方法。</strong></p>
<p><code v-pre>Number</code>、<code v-pre>String</code>和<code v-pre>Boolean</code>这三个原生对象，如果不作为构造函数调用（即调用时不加<code v-pre>new</code>），而是作为普通函数调用，常常用于将任意类型的值转为数值、字符串和布尔值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 字符串转为数值
Number('123') // 123

// 数值转为字符串
String(123) // &quot;123&quot;

// 数值转为布尔值
Boolean(123) // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面这种<strong>数据类型的转换</strong>，详见《数据类型转换》一节。</p>
<p>总结一下，这三个对象作为构造函数使用（带有<code v-pre>new</code>）时，可以将原始类型的值转为对象；作为普通函数使用时（不带有<code v-pre>new</code>），可以将任意类型的值，转为原始类型的值。</p>
<h2 id="_2、实例方法" tabindex="-1"><a class="header-anchor" href="#_2、实例方法" aria-hidden="true">#</a> 2、实例方法</h2>
<p>三种包装对象各自提供了许多实例方法，详见后文。这里介绍两种它们共同具有、从<code v-pre>Object</code>对象<strong>继承的方法</strong>：<code v-pre>valueOf()</code>和<code v-pre>toString()</code>。</p>
<h3 id="_2-1-valueof" tabindex="-1"><a class="header-anchor" href="#_2-1-valueof" aria-hidden="true">#</a> 2.1 valueOf()</h3>
<p><code v-pre>valueOf()</code>方法返回包装对象实例对应的原始类型的值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>new Number(123).valueOf()  // 123
new String('abc').valueOf() // &quot;abc&quot;
new Boolean(true).valueOf() // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-tostring" tabindex="-1"><a class="header-anchor" href="#_2-2-tostring" aria-hidden="true">#</a> 2.2 toString()</h3>
<p><code v-pre>toString()</code>方法返回对应的字符串形式。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>new Number(123).toString() // &quot;123&quot;
new String('abc').toString() // &quot;abc&quot;
new Boolean(true).toString() // &quot;true&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3、原始类型与实例对象的自动转换" tabindex="-1"><a class="header-anchor" href="#_3、原始类型与实例对象的自动转换" aria-hidden="true">#</a> 3、原始类型与实例对象的自动转换</h2>
<p>某些场合，原始类型的值会自动当作包装对象调用，即调用包装对象的属性和方法。这时，JavaScript 引擎会自动将原始类型的值转为包装对象实例，并在使用后立刻销毁实例。</p>
<p>比如，字符串可以调用<code v-pre>length</code>属性，返回字符串的长度。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'abc'.length // 3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>abc</code>是一个字符串，本身不是对象，不能调用<code v-pre>length</code>属性。JavaScript 引擎自动将其转为包装对象，在这个对象上调用<code v-pre>length</code>属性。调用结束后，这个临时对象就会被销毁。这就叫原始类型与实例对象的自动转换。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var str = 'abc';
str.length // 3

//等同于
var strObj = new String(str)
// String{
//		0:'a',1:'b',2:'c',length:3,[[PrimitiveValue]]: &quot;abc&quot;
// }
strObj.length // 3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，字符串<code v-pre>abc</code>的包装对象提供了多个属性，<code v-pre>length</code>只是其中之一。</p>
<p>自动转换生成的包装对象是只读的，无法修改。所以，字符串无法添加新属性。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var s = 'Hello World';
s.x = 123;
s.x // undefined
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码为字符串<code v-pre>s</code>添加了一个<code v-pre>x</code>属性，结果无效，总是返回<code v-pre>undefined</code>。</p>
<p>另一方面，调用结束后，包装对象实例会自动销毁。这意味着，下一次调用字符串的属性时，实际是调用一个新生成的对象，而不是上一次调用时生成的那个对象，所以取不到赋值在上一个对象的属性。如果要为字符串添加属性，只有在它的原型对象<code v-pre>String.prototype</code>上定义（参见《面向对象编程》章节）。</p>
<h2 id="_4、自定义方法" tabindex="-1"><a class="header-anchor" href="#_4、自定义方法" aria-hidden="true">#</a> 4、自定义方法</h2>
<p>除了原生的实例方法，包装对象还可以自定义方法和属性，供原始类型的值直接调用。</p>
<p>比如，我们可以新增一个<code v-pre>double</code>方法，使得字符串和数字翻倍。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>String.prototype.double = function () { // String是一个方法，String.prototype本质是一个实例对象
  return this.valueOf() + this.valueOf();
};

'abc'.double()
// abcabc

Number.prototype.double = function () {
  return this.valueOf() + this.valueOf();
};

(123).double() // 246 // 不加括号时点运算符会被解释成小数点
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码在<code v-pre>String</code>和<code v-pre>Number</code>这两个对象的原型上面，分别自定义了一个方法，从而可以在所有实例对象上调用。注意，最后一张的<code v-pre>123</code>外面必须要加上圆括号，否则后面的点运算符（<code v-pre>.</code>）会被解释成小数点。</p>
<h2 id="五、boolean对象" tabindex="-1"><a class="header-anchor" href="#五、boolean对象" aria-hidden="true">#</a> 五、Boolean对象</h2>
<h2 id="_1、概述-2" tabindex="-1"><a class="header-anchor" href="#_1、概述-2" aria-hidden="true">#</a> 1、概述</h2>
<p><code v-pre>Boolean</code>对象是 JavaScript 的三个包装对象之一。作为构造函数，它主要用于生成布尔值的包装对象实例。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var b = new Boolean(true)
typeof b // object
b.valueOf() // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码的变量<code v-pre>b</code>是一个<code v-pre>Boolean</code>对象的实例，它的类型是对象，值为布尔值<code v-pre>true</code>。</p>
<p>注意，<code v-pre>false</code>对应的包装对象实例，布尔运算结果也是<code v-pre>true</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>if (new Boolean(false)) { // 返回的是一个对象，所有对象对应的布尔值都是true
  console.log('true');
} // true

if (new Boolean(false).valueOf()) { // 它的值为false
  console.log('true');
} // 无输出
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码的第一个例子之所以得到<code v-pre>true</code>，是因为<code v-pre>false</code>对应的包装对象实例是一个对象，进行逻辑运算时，被自动转化成布尔值<code v-pre>true</code>（因为所有对象对应的布尔值都是<code v-pre>true</code>）。而实例的<code v-pre>valueOf</code>方法，则返回实例对应的原始值，本例为<code v-pre>false</code>。</p>
<h2 id="_2、boolean-函数的类型转换作用" tabindex="-1"><a class="header-anchor" href="#_2、boolean-函数的类型转换作用" aria-hidden="true">#</a> 2、Boolean 函数的类型转换作用</h2>
<p><code v-pre>Boolean</code>对象除了可以作为构造函数，还可以单独使用，将任意值转为布尔值。这时<code v-pre>Boolean</code>就是一个<strong>单纯的工具方法</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Boolean(undefined) // false
Boolean(null) // false
Boolean(0) // false
Boolean('') // false
Boolean(NaN) // false

Boolean(1) // true
Boolean('false') // true
Boolean([]) // true
Boolean({}) // true
Boolean(function () {}) // true
Boolean(/foo/) // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中几种得到<code v-pre>true</code>的情况，<strong>都值得认真记住</strong>。</p>
<blockquote>
<p>直接使用上面方法括号内的参数进行if逻辑运行相当于调用了Boolean方法并传入参数</p>
</blockquote>
<p>顺便提一下，使用双重的否运算符（<code v-pre>!</code>）也可以将任意值转为对应的布尔值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>!!undefined // false
!!null // false
!!0 // false
!!'' // false
!!NaN // false

!!1 // true
!!'false' // true
!![] // true
!!{} // true
!!function(){} // true
!!/foo/ // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，对于一些特殊值，<code v-pre>Boolean</code>对象前面加不加<code v-pre>new</code>，会得到完全相反的结果，必须小心。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>if (Boolean(false)) {
  console.log('true');
} // 无输出

if (new Boolean(false)) { // 加new 转为对象，对象为true
  console.log('true');
} // true

if (Boolean(null)) {
  console.log('true');
} // 无输出

if (new Boolean(null)) { // 加new 转为对象，对象为true
  console.log('true');
} // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="六、number对象" tabindex="-1"><a class="header-anchor" href="#六、number对象" aria-hidden="true">#</a> 六、Number对象</h2>
<h2 id="_1、概述-3" tabindex="-1"><a class="header-anchor" href="#_1、概述-3" aria-hidden="true">#</a> 1、概述</h2>
<p><code v-pre>Number</code>对象是数值对应的包装对象，可以作为构造函数使用，也可以作为工具函数使用。</p>
<p>作为构造函数时，它用于生成值为数值的对象。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var n =new Number(1) // 作为构造函数时，生成值为数值的对象
typeof n // object
n.valueOf() // 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>Number</code>对象作为构造函数使用，返回一个值为<code v-pre>1</code>的对象。</p>
<p>作为工具函数时，它可以将任何类型的值转为数值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Number(true) // 1

Number(false) // 0
Number(null) // 0
Number([]) // 0
Number('') // 0

Number({}) // NaN
Number(undefined) // NaN

Number('123')// 123
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码将布尔值<code v-pre>true</code>转为数值<code v-pre>1</code>。<code v-pre>Number</code>作为工具函数的用法，详见《数据类型转换》一章。</p>
<h2 id="_2、静态属性" tabindex="-1"><a class="header-anchor" href="#_2、静态属性" aria-hidden="true">#</a> 2、静态属性</h2>
<p><code v-pre>Number</code>对象拥有以下一些静态属性（即直接定义在<code v-pre>Number</code>对象上的属性，而不是定义在实例上的属性）。</p>
<ul>
<li><code v-pre>Number.POSITIVE_INFINITY</code>：正的无限，指向<code v-pre>Infinity</code>。</li>
<li><code v-pre>Number.NEGATIVE_INFINITY</code>：负的无限，指向<code v-pre>-Infinity</code>。</li>
<li><code v-pre>Number.NaN</code>：表示非数值，指向<code v-pre>NaN</code>。</li>
<li><code v-pre>Number.MAX_VALUE</code>：表示最大的正数<code v-pre>1.7976931348623157e+308</code>，相应的，最小的负数为<code v-pre>-Number.MAN_VALUE</code>。</li>
<li><code v-pre>Number.MIN_VALUE</code>：表示最小的正数（即最接近0的正数，在64位浮点数体系中为<code v-pre>5e-324</code>），相应的，最接近0的负数为<code v-pre>-Number.MIN_VALUE</code>。</li>
<li><code v-pre>Number.MAX_SAFE_INTEGER</code>：表示能够精确表示的最大整数，即<code v-pre>9007199254740991</code>。</li>
<li><code v-pre>Number.MIN_SAFE_INTEGER</code>：表示能够精确表示的最小整数，即<code v-pre>-9007199254740991</code>。</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Number.POSITIVE_INFINITY // Infinity
Number.NEGATIVE_INFINITY // -Infinity
Number.NaN // NaN

Number.MAX_VALUE
// 1.7976931348623157e+308
Number.MAX_VALUE &lt; Infinity
// true

Number.MIN_VALUE
// 5e-324
Number.MIN_VALUE &gt; 0
// true

Number.MAX_SAFE_INTEGER // 9007199254740991
Number.MIN_SAFE_INTEGER // -9007199254740991
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3、实例方法-1" tabindex="-1"><a class="header-anchor" href="#_3、实例方法-1" aria-hidden="true">#</a> 3、实例方法</h2>
<p><code v-pre>Number</code>对象有<strong>4个实例方法</strong>，都跟<strong>将数值转换成指定格式有关</strong>。</p>
<h3 id="_3-1-number-prototype-tostring-可转成多种进制字符串" tabindex="-1"><a class="header-anchor" href="#_3-1-number-prototype-tostring-可转成多种进制字符串" aria-hidden="true">#</a> 3.1 Number.prototype.toString() 可转成多种进制字符串</h3>
<p><code v-pre>Number</code>对象部署了自己的<code v-pre>toString</code>方法，用来将一个数值转为字符串形式。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>(10).toString() // &quot;10&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>toString</code>方法可以<strong>接受一个参数</strong>，表示输出的<strong>进制</strong>。如果省略这个参数，默认将数值先转为十进制，再输出字符串；否则，就根据参数指定的进制，将一个数字转化成某个进制的字符串。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>(10).toString(2) // &quot;1010&quot;
(10).toString(8) // &quot;12&quot;
(10).toString(16) // &quot;a&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>10</code>一定要放在括号里，这样表明后面的点表示调用对象属性。如果不加括号，这个点会被 JavaScript 引擎解释成小数点，从而报错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>10.toString(2) // 不加括号会把点解释成小数点，从而报错
// SyntaxError: Unexpected token ILLEGAL
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>只要能够让 JavaScript 引擎不混淆小数点和对象的点运算符，各种写法都能用。除了为<code v-pre>10</code>加上括号，还可以在<code v-pre>10</code>后面加两个点，JavaScript 会把第一个点理解成小数点（即<code v-pre>10.0</code>），把第二个点理解成调用对象属性，从而得到正确结果。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>10..toString(2)
// &quot;1010&quot;

// 其他方法还包括
10 .toString(2) // &quot;1010&quot;
10.0.toString(2) // &quot;1010&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这实际上意味着，可以直接对一个小数使用<code v-pre>toString</code>方法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>10.5.toString() // &quot;10.5&quot;
10.5.toString(2) // &quot;1010.1&quot;
10.5.toString(8) // &quot;12.4&quot;
10.5.toString(16) // &quot;a.8&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过方括号运算符也可以调用<code v-pre>toString</code>方法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>10['toString'](2) // &quot;1010&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>toString</code>方法只能将十进制的数，转为其他进制的字符串。如果要将其他进制的数，转回十进制，需要使用<code v-pre>parseInt</code>方法。</p>
<h3 id="_3-2-number-prototype-tofixed-转成保留指定小数位数的字符串" tabindex="-1"><a class="header-anchor" href="#_3-2-number-prototype-tofixed-转成保留指定小数位数的字符串" aria-hidden="true">#</a> 3.2 Number.prototype.toFixed() 转成保留指定小数位数的字符串</h3>
<p><code v-pre>toFixed()</code>方法先将一个数转为指定位数的小数，然后返回这个小数对应的字符串。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>(10).toFixed(2) // &quot;10.00&quot;
10.005.toFixed(2) // &quot;10.01&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>10</code>和<code v-pre>10.005</code>先转成2位小数，然后转成字符串。其中<code v-pre>10</code>必须放在括号里，否则后面的点会被处理成小数点。</p>
<p><code v-pre>toFixed()</code>方法的参数为小数位数，有效范围为0到20，超出这个范围将抛出 RangeError 错误。</p>
<p>由于浮点数的原因，小数<code v-pre>5</code>的四舍五入是不确定的，使用的时候必须小心。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>(10.055).toFixed(2) // 10.05
(10.005).toFixed(2) // 10.01
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-number-prototype-toexponential-转成科学计数法形式字符串" tabindex="-1"><a class="header-anchor" href="#_3-3-number-prototype-toexponential-转成科学计数法形式字符串" aria-hidden="true">#</a> 3.3 Number.prototype.toExponential() 转成科学计数法形式字符串</h3>
<p><code v-pre>toExponential</code>方法用于将一个数转为科学计数法形式。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>(10).toExponential()  // &quot;1e+1&quot;
(10).toExponential(1) // &quot;1.0e+1&quot;
(10).toExponential(2) // &quot;1.00e+1&quot;

(1234).toExponential()  // &quot;1.234e+3&quot;
(1234).toExponential(1) // &quot;1.2e+3&quot;
(1234).toExponential(2) // &quot;1.23e+3&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>toExponential</code>方法的参数是小数点后有效数字的位数，范围为0到20，超出这个范围，会抛出一个 RangeError 错误。</p>
<h3 id="_3-4-number-prototype-toprecision-转为指定位数的有效数字" tabindex="-1"><a class="header-anchor" href="#_3-4-number-prototype-toprecision-转为指定位数的有效数字" aria-hidden="true">#</a> 3.4 Number.prototype.toPrecision()转为指定位数的有效数字</h3>
<p><code v-pre>Number.prototype.toPrecision()</code>方法用于将一个数转为指定位数的有效数字。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>(12.34).toPrecision(1) // &quot;1e+1&quot;
(12.34).toPrecision(2) // &quot;12&quot;
(12.34).toPrecision(3) // &quot;12.3&quot;
(12.34).toPrecision(4) // &quot;12.34&quot;
(12.34).toPrecision(5) // &quot;12.340&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该方法的参数为有效数字的位数，范围是1到21，超出这个范围会抛出 RangeError 错误。</p>
<p>该方法用于四舍五入时不太可靠，跟浮点数不是精确储存有关。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>(12.35).toPrecision(3) // &quot;12.3&quot;
(12.25).toPrecision(3) // &quot;12.3&quot;
(12.15).toPrecision(3) // &quot;12.2&quot;
(12.45).toPrecision(3) // &quot;12.4&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-5-number-prototype-tolocalestring" tabindex="-1"><a class="header-anchor" href="#_4-5-number-prototype-tolocalestring" aria-hidden="true">#</a> 4.5 Number.prototype.toLocaleString()</h3>
<p><code v-pre>Number.prototype.toLocaleString()</code>方法接受一个地区码作为参数，返回一个字符串，表示当前数字在该地区的当地书写形式。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>(123).toLocaleString('zh-Hans-CN-u-nu-hanidec')
// &quot;一二三&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>该方法还可以接受第二个参数配置对象，用来定制指定用途的返回字符串。该对象的<code v-pre>style</code>属性指定输出样式，默认值是<code v-pre>decimal</code>，表示输出十进制形式。如果值为<code v-pre>percent</code>，表示输出百分数。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>(123).toLocaleString('zh-Hans-CN', { style: 'persent' })
// &quot;12,300%&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果<code v-pre>style</code>属性的值为<code v-pre>currency</code>，则可以搭配<code v-pre>currency</code>属性，输出指定格式的货币字符串形式。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>(123).toLocaleString('zh-Hans-CN', { style: 'currency', currency: 'CNY' })
// &quot;￥123.00&quot;

(123).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
// &quot;123,00 €&quot;

(123).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
// &quot;$123.00&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果<code v-pre>Number.prototype.toLocaleString()</code>省略了参数，则由浏览器自行决定如何处理，通常会使用操作系统的地区设定。注意，该方法如果使用浏览器不认识的地区码，会抛出一个错误。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>(123).toLocaleString('123') // 出错
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="应用-添加千位分隔符" tabindex="-1"><a class="header-anchor" href="#应用-添加千位分隔符" aria-hidden="true">#</a> 应用-添加千位分隔符</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>(123456.789).toLocaleString()
// 输出 &quot;123,456.789&quot;，常用。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>(1234566).toLocaleString('zh-Hans-CN-u-nu-hanidec');
// 输出&quot;一,二三四,五六六&quot;

(1234566).toLocaleString('zh-Hans-CN-u-nu-hanidec',{useGrouping: true});
// 给.toLocaleString()加第二个参数，依然输出&quot;一,二三四,五六六&quot;

// 不带千位分隔符
(1234566).toLocaleString('zh-Hans-CN-u-nu-hanidec',{useGrouping: false});
// 输出&quot;一二三四五六六&quot;，这个比较有用，也就是最简单的将阿拉伯数字变成汉字的办法。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4、自定义方法-1" tabindex="-1"><a class="header-anchor" href="#_4、自定义方法-1" aria-hidden="true">#</a> 4、自定义方法</h2>
<p>与其他对象一样，<code v-pre>Number.prototype</code>对象上面可以自定义方法，被<code v-pre>Number</code>的实例继承。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Number.prototype.add = function (x) {
  return this + x;
};

8['add'](2) // 10
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码为<code v-pre>Number</code>对象实例定义了一个<code v-pre>add</code>方法。在数值上调用某个方法，数值会自动转为<code v-pre>Number</code>的实例对象，所以就可以调用<code v-pre>add</code>方法了。由于<code v-pre>add</code>方法返回的还是数值，所以可以链式运算。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Number.prototype.subtract = function (x) {
  return this - x;
};

(8).add(2).subtract(4)
// 6
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码在<code v-pre>Number</code>对象的实例上部署了<code v-pre>subtract</code>方法，它可以与<code v-pre>add</code>方法链式调用。</p>
<p>我们还可以部署更复杂的方法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Number.prototype.iterate = function () {
  var result = [];
  for (var i = 0; i &lt;= this; i++) {
    result.push(i);
  }
  return result;
};

(8).iterate()
// [0, 1, 2, 3, 4, 5, 6, 7, 8]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码在<code v-pre>Number</code>对象的原型上部署了<code v-pre>iterate</code>方法，将一个数值自动遍历为一个数组。</p>
<p><strong>注意</strong>，数值的自定义方法，只能定义在它的原型对象<code v-pre>Number.prototype</code>上面，数值本身是无法自定义属性的。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var n = 1;
n.x = 1;
n.x // undefined
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>n</code>是一个原始类型的数值。直接在它上面新增一个属性<code v-pre>x</code>，不会报错，但毫无作用，总是返回<code v-pre>undefined</code>。这是因为一旦被调用属性，<code v-pre>n</code>就自动转为<code v-pre>Number</code>的实例对象，调用结束后，该对象自动销毁。所以，下一次调用<code v-pre>n</code>的属性时，实际取到的是另一个对象，属性<code v-pre>x</code>当然就读不出来。</p>
<h2 id="七、string对象" tabindex="-1"><a class="header-anchor" href="#七、string对象" aria-hidden="true">#</a> 七、String对象</h2>
<h2 id="_1、概述-4" tabindex="-1"><a class="header-anchor" href="#_1、概述-4" aria-hidden="true">#</a> 1、概述</h2>
<p><code v-pre>String</code>对象是 JavaScript 原生提供的三个包装对象之一，用来生成字符串对象。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var s1 = 'abc';
var s2 = new String('abc'); // 使用new关键字会变成包装对象

typeof s1 // &quot;string&quot;
typeof s2 // &quot;object&quot;

s2.valueOf() // &quot;abc&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，变量<code v-pre>s1</code>是字符串，<code v-pre>s2</code>是对象。由于<code v-pre>s2</code>是字符串对象，<code v-pre>s2.valueOf</code>方法返回的就是它所对应的原始字符串。</p>
<p><strong>字符串对象是一个类似数组的对象</strong>（很像数组，但不是数组）。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var strObj = new String('abc')
// String {0: &quot;a&quot;, 1: &quot;b&quot;, 2: &quot;c&quot;, length: 3}

strObj[1] // &quot;b&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，字符串<code v-pre>abc</code>对应的字符串对象，有数值键（<code v-pre>0</code>、<code v-pre>1</code>、<code v-pre>2</code>）和<code v-pre>length</code>属性，所以可以像数组那样取值。</p>
<p>除了用作构造函数，<code v-pre>String</code>对象还可以当作工具方法使用，将任意类型的值转为字符串。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>String(true) // &quot;true&quot;
String(false) // &quot;false&quot;
String(5) // &quot;5&quot;
String(null) // 'null'
String(undefined) //'undefined'
String({}) // '[object Object]'
String([]) // ''
String(['1','2']) // '1,2'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码将各种类型的值，分别转换为字符串。</p>
<h2 id="_2、静态方法-1" tabindex="-1"><a class="header-anchor" href="#_2、静态方法-1" aria-hidden="true">#</a> 2、静态方法</h2>
<h3 id="string-fromcharcode" tabindex="-1"><a class="header-anchor" href="#string-fromcharcode" aria-hidden="true">#</a> String.fromCharCode()</h3>
<p><code v-pre>String</code>对象提供的静态方法（即定义在对象本身，而不是定义在对象实例的方法），主要是<code v-pre>String.fromCharCode()</code>。<strong>该方法的参数是一个或多个数值，代表 Unicode 码点，返回值是这些码点组成的字符串。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>String.fromCharCode() // &quot;&quot;
String.fromCharCode(97) // &quot;a&quot;
String.fromCharCode(104, 101, 108, 108, 111)
// &quot;hello&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>String.fromCharCode</code>方法的参数为空，就返回空字符串；否则，返回参数对应的 Unicode 字符串。</p>
<p>注意，该方法不支持 Unicode 码点大于<code v-pre>0xFFFF</code>的字符，即传入的参数不能大于<code v-pre>0xFFFF</code>（即十进制的 65535）。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>String.fromCharCode(0x20BB7)
// &quot;ஷ&quot;
String.fromCharCode(0x20BB7) === String.fromCharCode(0x0BB7)
// true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>String.fromCharCode</code>参数<code v-pre>0x20BB7</code>大于<code v-pre>0xFFFF</code>，导致返回结果出错。<code v-pre>0x20BB7</code>对应的字符是汉字<code v-pre>𠮷</code>，但是返回结果却是另一个字符（码点<code v-pre>0x0BB7</code>）。这是因为<code v-pre>String.fromCharCode</code>发现参数值大于<code v-pre>0xFFFF</code>，就会忽略多出的位（即忽略<code v-pre>0x20BB7</code>里面的<code v-pre>2</code>）。</p>
<p>这种现象的根本原因在于，码点大于<code v-pre>0xFFFF</code>的字符占用四个字节，而 JavaScript 默认支持两个字节的字符。这种情况下，必须把<code v-pre>0x20BB7</code>拆成两个字符表示。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>String.fromCharCode(0xD842, 0xDFB7)
// &quot;𠮷&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>0x20BB7</code>拆成两个字符<code v-pre>0xD842</code>和<code v-pre>0xDFB7</code>（即两个两字节字符，合成一个四字节字符），就能得到正确的结果。码点大于<code v-pre>0xFFFF</code>的字符的四字节表示法，由 UTF-16 编码方法决定。</p>
<h2 id="_3、实例属性" tabindex="-1"><a class="header-anchor" href="#_3、实例属性" aria-hidden="true">#</a> 3、实例属性</h2>
<h3 id="string-prototype-length" tabindex="-1"><a class="header-anchor" href="#string-prototype-length" aria-hidden="true">#</a> String.prototype.length</h3>
<p>字符串实例的<code v-pre>length</code>属性返回字符串的长度。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'abc'.length // 3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4、实例方法" tabindex="-1"><a class="header-anchor" href="#_4、实例方法" aria-hidden="true">#</a> 4、实例方法</h2>
<h3 id="_4-1-string-prototype-charat-返回指定位置的字符" tabindex="-1"><a class="header-anchor" href="#_4-1-string-prototype-charat-返回指定位置的字符" aria-hidden="true">#</a> 4.1 String.prototype.charAt() 返回指定位置的字符</h3>
<p><code v-pre>charAt</code>方法<strong>返回指定位置的字符</strong>，参数是从<code v-pre>0</code>开始编号的位置。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var s = new String('abc');

s.charAt(1) // &quot;b&quot;
s.charAt(s.length - 1) // &quot;c&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个方法完全可以用数组下标替代。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'abc'.charAt(1) // &quot;b&quot;
'abc'[1] // &quot;b&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果参数为负数，或大于等于字符串的长度，<code v-pre>charAt</code>返回空字符串。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'abc'.charAt(-1) // &quot;&quot;
'abc'.charAt(3) // &quot;&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-string-prototype-charcodeat-返回字符串指定位置的-unicode-码点-十进制表示" tabindex="-1"><a class="header-anchor" href="#_4-2-string-prototype-charcodeat-返回字符串指定位置的-unicode-码点-十进制表示" aria-hidden="true">#</a> 4.2 String.prototype.charCodeAt()返回字符串指定位置的 Unicode 码点（十进制表示）</h3>
<p><code v-pre>charCodeAt</code>方法<strong>返回字符串指定位置的 Unicode 码点（十进制表示）</strong>，相当于<code v-pre>String.fromCharCode()</code>的逆操作。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'abc'.charCodeAt(1) // 98
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>abc</code>的<code v-pre>1</code>号位置的字符是<code v-pre>b</code>，它的 Unicode 码点是<code v-pre>98</code>。</p>
<p>如果没有任何参数，<code v-pre>charCodeAt</code>返回首字符的 Unicode 码点。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'abc'.charCodeAt() // 97
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果参数为负数，或大于等于字符串的长度，<code v-pre>charCodeAt</code>返回<code v-pre>NaN</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'abc'.charCodeAt(-1) // NaN
'abc'.charCodeAt(4) // NaN
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意</strong>，<code v-pre>charCodeAt</code>方法返回的 Unicode 码点不会大于65536（0xFFFF），也就是说，只返回两个字节的字符的码点。如果遇到码点大于 65536 的字符（四个字节的字符），必需连续使用两次<code v-pre>charCodeAt</code>，不仅读入<code v-pre>charCodeAt(i)</code>，还要读入<code v-pre>charCodeAt(i+1)</code>，将两个值放在一起，才能得到准确的字符。</p>
<h3 id="_4-3-string-prototype-concat-合并字符串-返回新字符串-不改变原字符串" tabindex="-1"><a class="header-anchor" href="#_4-3-string-prototype-concat-合并字符串-返回新字符串-不改变原字符串" aria-hidden="true">#</a> 4.3 String.prototype.concat() 合并字符串，返回新字符串，不改变原字符串</h3>
<p><code v-pre>concat</code>方法<strong>用于连接两个字符串，返回一个新字符串，不改变原字符串</strong>。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>var s1 = 'abc';
var s2 = 'def';

s1.concat(s2) // &quot;abcdef&quot;
s1 // &quot;abc&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该方法可以接受多个参数。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>'a'.concat('b', 'c') // &quot;abc&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果参数不是字符串，<code v-pre>concat</code>方法会将其先转为字符串，然后再连接。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>var one = 1;
var two = 2;
var three = '3';

''.concat(one, two, three) // &quot;123&quot;
one + two + three // &quot;33&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>concat</code>方法将参数先转成字符串再连接，所以返回的是一个三个字符的字符串。作为对比，加号运算符在两个运算数都是数值时，不会转换类型，所以返回的是一个两个字符的字符串。</p>
<h3 id="_4-4-string-prototype-slice-取出部分子字符串-不改变原字符串" tabindex="-1"><a class="header-anchor" href="#_4-4-string-prototype-slice-取出部分子字符串-不改变原字符串" aria-hidden="true">#</a> 4.4 String.prototype.slice() 取出部分子字符串，不改变原字符串</h3>
<p><code v-pre>slice</code>方法<strong>用于从原字符串取出子字符串并返回，不改变原字符串</strong>。它的第一个参数是子字符串的<strong>开始位置</strong>，第二个参数是子字符串的<strong>结束位置（不含该位置）</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'JavaScript'.slice(0, 4) // &quot;Java&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果省略第二个参数，则表示子字符串一直到原字符串结束。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'JavaScript'.slice(4) // &quot;Script&quot; 省略参数二，会取到结束
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果参数是负值，表示从结尾开始倒数计算的位置，即该负值加上字符串长度。</p>
<h5 id="负数表示倒数" tabindex="-1"><a class="header-anchor" href="#负数表示倒数" aria-hidden="true">#</a> 负数表示倒数</h5>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'JavaScript'.slice(-6) // &quot;Script&quot;
'JavaScript'.slice(0, -6) // &quot;Java&quot;
'JavaScript'.slice(-2, -1) // &quot;p&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果第一个参数大于第二个参数，<code v-pre>slice</code>方法返回一个空字符串。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'JavaScript'.slice(2, 1) // &quot;&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-5-string-prototype-substring-和slice类似" tabindex="-1"><a class="header-anchor" href="#_4-5-string-prototype-substring-和slice类似" aria-hidden="true">#</a> 4.5 String.prototype.substring() 和slice类似</h3>
<p><code v-pre>substring</code>方法<strong>用于从原字符串取出子字符串并返回，不改变原字符串</strong>，跟<code v-pre>slice</code>方法很相像。它的第一个参数表示子字符串的<strong>开始位置</strong>，第二个位置表示<strong>结束位置（返回结果不含该位置）</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'JavaScript'.substring(0, 4) // &quot;Java&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果省略第二个参数，则表示子字符串一直到原字符串的结束。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'JavaScript'.substring(4) // &quot;Script&quot; 省略参数二，会取到结束
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果第一个参数大于第二个参数，<code v-pre>substring</code>方法会自动更换两个参数的位置。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'JavaScript'.substring(10, 4) // &quot;Script&quot;   // substring自动更换位置，slice则是返回空字符
// 等同于
'JavaScript'.substring(4, 10) // &quot;Script&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，调换<code v-pre>substring</code>方法的两个参数，都得到同样的结果。</p>
<p>如果参数是负数，<code v-pre>substring</code>方法会自动将负数转为0。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'JavaScript'.substring(-3) // &quot;JavaScript&quot;  // substring负数自动转为0，slice负数表示倒数
'JavaScript'.substring(4, -3) // &quot;Java&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，第二个例子的参数<code v-pre>-3</code>会自动变成<code v-pre>0</code>，等同于<code v-pre>'JavaScript'.substring(4, 0)</code>。由于第二个参数小于第一个参数，会自动互换位置，所以返回<code v-pre>Java</code>。</p>
<p>由于这些规则违反直觉，因此<strong>不建议使用<code v-pre>substring</code>方法，应该优先使用<code v-pre>slice</code></strong>。</p>
<h4 id="小总结-substring-和-slice-的区别-有两个。" tabindex="-1"><a class="header-anchor" href="#小总结-substring-和-slice-的区别-有两个。" aria-hidden="true">#</a> 小总结：substring() 和 slice() 的区别，有两个。</h4>
<blockquote>
<ul>
<li>负数参数：substring负数自动转为0，slice负数表示倒数</li>
<li>参数一大于参数二：substring自动更换位置，slice则是返回空字符</li>
</ul>
</blockquote>
<h3 id="_4-6-string-prototype-substr-和-slice、substring类似-区别是参数二表示长度" tabindex="-1"><a class="header-anchor" href="#_4-6-string-prototype-substr-和-slice、substring类似-区别是参数二表示长度" aria-hidden="true">#</a> 4.6 String.prototype.substr() 和 slice、substring类似，区别是参数二表示长度</h3>
<p><code v-pre>substr</code>方法用于<strong>从原字符串取出子字符串并返回，不改变原字符串</strong>，跟<code v-pre>slice</code>和<code v-pre>substring</code>方法的作用相同。</p>
<p><code v-pre>substr</code>方法的第一个参数是子字符串的开始位置（从0开始计算），<strong>第二个参数是子字符串的长度</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'JavaScript'.substr(4, 6) // &quot;Script&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果省略第二个参数，则表示子字符串一直到原字符串的结束。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'JavaScript'.substr(4) // &quot;Script&quot; 省略参数二，会取到结束
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果第一个参数是负数，表示倒数计算的字符位置。如果第二个参数是负数，将被自动转为0，因此会返回空字符串。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'JavaScript'.substr(-6) // &quot;Script&quot; 参数一是负数表示倒数
'JavaScript'.substr(4, -1) // &quot;&quot;  参数二是负数转为0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，第二个例子的参数<code v-pre>-1</code>自动转为<code v-pre>0</code>，表示子字符串长度为<code v-pre>0</code>，所以返回空字符串。</p>
<h3 id="_4-7-string-prototype-indexof-搜索子串第一个出现的位置-string-prototype-lastindexof-搜索子串最后出现的位置" tabindex="-1"><a class="header-anchor" href="#_4-7-string-prototype-indexof-搜索子串第一个出现的位置-string-prototype-lastindexof-搜索子串最后出现的位置" aria-hidden="true">#</a> 4.7 String.prototype.indexOf() 搜索子串第一个出现的位置，String.prototype.lastIndexOf() 搜索子串最后出现的位置</h3>
<p><code v-pre>indexOf</code>方法<strong>用于确定一个字符串在另一个字符串中第一次出现的位置</strong>，<strong>返回结果是匹配开始的位置</strong>。如果返回<code v-pre>-1</code>，就表示不匹配。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'hello world'.indexOf('o') // 4
'JavaScript'.indexOf('script') // -1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>indexOf</code>方法还可以接受第二个参数，表示从该位置开始向后匹配。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'hello world'.indexOf('o', 6) // 7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>lastIndexOf</code>方法的用法跟<code v-pre>indexOf</code>方法一致，主要的区别是<code v-pre>lastIndexOf</code>从尾部开始匹配，<code v-pre>indexOf</code>则是从头部开始匹配。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'hello world'.lastIndexOf('o') // 7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>另外，<code v-pre>lastIndexOf</code>的第二个参数表示从该位置起向前匹配。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'hello world'.lastIndexOf('o', 6) // 4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-8-string-prototype-trim-修剪-两端空格-不改变原字符串" tabindex="-1"><a class="header-anchor" href="#_4-8-string-prototype-trim-修剪-两端空格-不改变原字符串" aria-hidden="true">#</a> 4.8 String.prototype.trim()  ''修剪'‘两端空格，不改变原字符串</h3>
<p><code v-pre>trim</code>方法<strong>用于去除字符串两端的空格，返回一个新字符串，不改变原字符串。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'  hello world  '.trim()
// &quot;hello world&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>该方法去除的不仅是空格，还包括<strong>制表符（<code v-pre>\t</code>、<code v-pre>\v</code>）、换行符（<code v-pre>\n</code>）和回车符（<code v-pre>\r</code>）</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'\r\nabc \t'.trim() // 'abc'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-9-string-prototype-tolowercase-全转小写-string-prototype-touppercase-全转大写-都不改变原字符串" tabindex="-1"><a class="header-anchor" href="#_4-9-string-prototype-tolowercase-全转小写-string-prototype-touppercase-全转大写-都不改变原字符串" aria-hidden="true">#</a> 4.9 String.prototype.toLowerCase() 全转小写，String.prototype.toUpperCase() 全转大写，都不改变原字符串</h3>
<p><code v-pre>toLowerCase</code>方法用于将一个字符串<strong>全部转为小写</strong>，<code v-pre>toUpperCase</code>则是<strong>全部转为大写</strong>。它们都<strong>返回一个新字符串，不改变原字符串</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'Hello World'.toLowerCase()
// &quot;hello world&quot;

'Hello World'.toUpperCase()
// &quot;HELLO WORLD&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-10-string-prototype-match-匹配子串-返回数组-数组带index、input属性" tabindex="-1"><a class="header-anchor" href="#_4-10-string-prototype-match-匹配子串-返回数组-数组带index、input属性" aria-hidden="true">#</a> 4.10 String.prototype.match() 匹配子串，返回数组（数组带index、input属性）</h3>
<p><code v-pre>match</code>方法<strong>用于确定原字符串是否匹配某个子字符串，返回一个数组，成员为匹配的第一个字符串</strong>。如果没有找到匹配，则返回<code v-pre>null</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'cat, bat, sat, fat'.match('at') // [&quot;at&quot;]
// [&quot;at&quot;, index: 1, input: &quot;cat, bat, sat, fat&quot;, groups: undefined]

'catbatsatbat'.match('bat') // [&quot;bat&quot;]
//[&quot;bat&quot;, index: 3, input: &quot;catbatsatbat&quot;, groups: undefined]
// index属性为bat首次出现的索引

'cat, bat, sat, fat'.match('xt') // null
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>返回的数组还有**<code v-pre>index</code>属性<strong>和</strong><code v-pre>input</code>属性**，分别表示匹配字符串<strong>开始的位置</strong>和<strong>原始字符串</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var matches = 'cat, bat, sat, fat'.match('at');
matches.index // 1  子串首次出现的索引位置
matches.input // &quot;cat, bat, sat, fat&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>match</code>方法还可以使用<strong>正则表达式</strong>作为参数，详见《正则表达式》一章。</p>
<h3 id="_4-11-string-prototype-search-搜索子串第一次出现的位置-没有则返-1-string-prototype-replace-替换子串-参数二替换参数一-不改变原字符串" tabindex="-1"><a class="header-anchor" href="#_4-11-string-prototype-search-搜索子串第一次出现的位置-没有则返-1-string-prototype-replace-替换子串-参数二替换参数一-不改变原字符串" aria-hidden="true">#</a> 4.11 String.prototype.search() 搜索子串第一次出现的位置，没有则返-1，String.prototype.replace() 替换子串，参数二替换参数一，不改变原字符串</h3>
<p><code v-pre>search</code>方法的用法基本等同于<code v-pre>match</code>，但是<strong>返回值为匹配的第一个位置。如果没有找到匹配，则返回<code v-pre>-1</code>。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'cat, bat, sat, fat'.search('at') // 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>search</code>方法还可以使用正则表达式作为参数，详见《正则表达式》一节。</p>
<p><code v-pre>replace</code>方法<strong>用于替换匹配的子字符串</strong>，一般情况下只替换第一个匹配（除非使用带有<code v-pre>g</code>修饰符的正则表达式）。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var str = 'aaa';
str.replace('a', 'b') // &quot;baa&quot; 一般情况只替换第一个，除非带有g的正则
str // 'aaa' 不改变原字符串
str.replace('c','b') // 'aaa' 匹配不到返回原字符串
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>replace</code>方法还可以使用正则表达式作为参数，详见《正则表达式》一节。</p>
<h3 id="_4-12-string-prototype-split-按给定规则分割字符串-返回数组" tabindex="-1"><a class="header-anchor" href="#_4-12-string-prototype-split-按给定规则分割字符串-返回数组" aria-hidden="true">#</a> 4.12 String.prototype.split() 按给定规则分割字符串，返回数组</h3>
<p><code v-pre>split</code>方法<strong>按照给定规则分割字符串，返回一个由分割出来的子字符串组成的数组。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'a|b|c'.split('|') // [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果分割规则为空字符串，则返回数组的成员是原字符串的每一个字符。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'a|b|c'.split('') // [&quot;a&quot;, &quot;|&quot;, &quot;b&quot;, &quot;|&quot;, &quot;c&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果<strong>省略参数，则返回数组的唯一成员就是原字符串</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'a|b|c'.split() // [&quot;a|b|c&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果满足分割规则的两个部分紧邻着（即两个分割符中间没有其他字符），则返回数组之中会有一个空字符串。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'a||c'.split('|') // ['a', '', 'c']
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果满足分割规则的部分处于字符串的开头或结尾（即它的前面或后面没有其他字符），则返回数组的第一个或最后一个成员是一个空字符串。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'|b|c'.split('|') // [&quot;&quot;, &quot;b&quot;, &quot;c&quot;]
'a|b|'.split('|') // [&quot;a&quot;, &quot;b&quot;, &quot;&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>split</code>方法还可以接受<strong>第二个参数</strong>，<strong>限定返回数组的最大成员数（数组长度）</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'a|b|c'.split('|', 0) // []
'a|b|c'.split('|', 1) // [&quot;a&quot;]
'a|b|c'.split('|', 2) // [&quot;a&quot;, &quot;b&quot;]
'a|b|c'.split('|', 3) // [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]
'a|b|c'.split('|', 4) // [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>split</code>方法的第二个参数，决定了返回数组的成员数。</p>
<p><code v-pre>split</code>方法还可以使用正则表达式作为参数，详见《正则表达式》一节。</p>
<h3 id="_4-13-string-prototype-localecompare-比较两个字符串-返回整数。" tabindex="-1"><a class="header-anchor" href="#_4-13-string-prototype-localecompare-比较两个字符串-返回整数。" aria-hidden="true">#</a> 4.13 String.prototype.localeCompare() 比较两个字符串，返回整数。</h3>
<p><code v-pre>localeCompare</code>方法 <strong>用于比较两个字符串。它返回一个整数</strong>，<strong>如果小于0，表示第一个字符串小于第二个字符串；如果等于0，表示两者相等；如果大于0，表示第一个字符串大于第二个字符串。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'apple'.localeCompare('banana') // -1
'apple'.localeCompare('apple') // 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>该方法的最大特点，就是会考虑自然语言的顺序。举例来说，正常情况下，大写的英文字母小于小写字母。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'B' &gt; 'a' // false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码中，字母<code v-pre>B</code>小于字母<code v-pre>a</code>。因为 JavaScript 采用的是 Unicode 码点比较，<code v-pre>B</code>的码点是66，而<code v-pre>a</code>的码点是97。</p>
<p>但是，<code v-pre>localeCompare</code>方法会考虑自然语言的排序情况，将<code v-pre>B</code>排在<code v-pre>a</code>的前面。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'B'.localeCompare('a') // 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>localeCompare</code>方法返回整数1，表示<code v-pre>B</code>较大。</p>
<p><code v-pre>localeCompare</code>还可以有第二个参数，指定所使用的语言（默认是英语），然后根据该语言的规则进行比较。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'ä'.localeCompare('z', 'de') // -1
'ä'.localeCompare('z', 'sv') // 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>de</code>表示德语，<code v-pre>sv</code>表示瑞典语。德语中，<code v-pre>ä</code>小于<code v-pre>z</code>，所以返回<code v-pre>-1</code>；瑞典语中，<code v-pre>ä</code>大于<code v-pre>z</code>，所以返回<code v-pre>1</code>。</p>
<h2 id="八、math对象" tabindex="-1"><a class="header-anchor" href="#八、math对象" aria-hidden="true">#</a> 八、Math对象</h2>
<p><code v-pre>Math</code>是 JavaScript 的原生对象，提供各种<strong>数学</strong>功能。该对象<strong>不是构造函数，不能生成实例</strong>，所有的属性和方法都必须在<code v-pre>Math</code>对象上调用。</p>
<h2 id="_1、静态属性" tabindex="-1"><a class="header-anchor" href="#_1、静态属性" aria-hidden="true">#</a> 1、静态属性</h2>
<p><code v-pre>Math</code>对象的静态属性，提供以下一些数学常数。</p>
<ul>
<li><code v-pre>Math.E</code>：常数<code v-pre>e</code>。</li>
<li><code v-pre>Math.LN2</code>：2 的自然对数。</li>
<li><code v-pre>Math.LN10</code>：10 的自然对数。</li>
<li><code v-pre>Math.LOG2E</code>：以 2 为底的<code v-pre>e</code>的对数。</li>
<li><code v-pre>Math.LOG10E</code>：以 10 为底的<code v-pre>e</code>的对数。</li>
<li><code v-pre>Math.PI</code>：常数<code v-pre>π</code>。</li>
<li><code v-pre>Math.SQRT1_2</code>：0.5 的平方根。</li>
<li><code v-pre>Math.SQRT2</code>：2 的平方根。</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math.E // 2.718281828459045
Math.LN2 // 0.6931471805599453
Math.LN10 // 2.302585092994046
Math.LOG2E // 1.4426950408889634
Math.LOG10E // 0.4342944819032518
Math.PI // 3.141592653589793
Math.SQRT1_2 // 0.7071067811865476
Math.SQRT2 // 1.4142135623730951
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些属性都是<strong>只读的</strong>，不能修改。</p>
<h2 id="_2、静态方法-2" tabindex="-1"><a class="header-anchor" href="#_2、静态方法-2" aria-hidden="true">#</a> 2、静态方法</h2>
<p><code v-pre>Math</code>对象提供以下一些静态方法。</p>
<ul>
<li><code v-pre>Math.abs()</code>：绝对值</li>
<li><code v-pre>Math.ceil()</code>：向上取整</li>
<li><code v-pre>Math.floor()</code>：向下取整</li>
<li><code v-pre>Math.max()</code>：最大值</li>
<li><code v-pre>Math.min()</code>：最小值</li>
<li><code v-pre>Math.pow()</code>：指数运算</li>
<li><code v-pre>Math.sqrt()</code>：平方根</li>
<li><code v-pre>Math.log()</code>：自然对数</li>
<li><code v-pre>Math.exp()</code>：<code v-pre>e</code>的指数</li>
<li><code v-pre>Math.round()</code>：四舍五入</li>
<li><code v-pre>Math.random()</code>：随机数</li>
</ul>
<h3 id="_2-1-math-abs-绝对值" tabindex="-1"><a class="header-anchor" href="#_2-1-math-abs-绝对值" aria-hidden="true">#</a> 2.1 Math.abs() 绝对值</h3>
<p><code v-pre>Math.abs</code>方法<strong>返回参数值的绝对值</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math.abs(1) // 1
Math.abs(-1) // 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-math-max-最大值-math-min-最-小值" tabindex="-1"><a class="header-anchor" href="#_2-2-math-max-最大值-math-min-最-小值" aria-hidden="true">#</a> 2.2 Math.max() 最大值，Math.min()最 小值</h3>
<p><code v-pre>Math.max</code>方法<strong>返回参数之中最大的那个值</strong>，<code v-pre>Math.min</code><strong>返回最小的那个值</strong>。如果参数为空, <code v-pre>Math.min</code>返回<code v-pre>Infinity</code>, <code v-pre>Math.max</code>返回<code v-pre>-Infinity</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math.max(2, -1, 5) // 5
Math.min(2, -1, 5) // -1
Math.min() // Infinity
Math.max() // -Infinity
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-math-floor-向下取整-math-ceil-向上取整" tabindex="-1"><a class="header-anchor" href="#_2-3-math-floor-向下取整-math-ceil-向上取整" aria-hidden="true">#</a> 2.3 Math.floor() 向下取整，Math.ceil() 向上取整</h3>
<p><code v-pre>Math.floor</code>方法<strong>返回小于参数值的最大整数（地板值）</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math.floor(3.2) // 3
Math.floor(-3.2) // -4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>Math.ceil</code>方法<strong>返回大于参数值的最小整数（天花板值）</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math.ceil(3.2) // 4
Math.ceil(-3.2) // -3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这两个方法可以结合起来，实现一个<strong>总是返回数值的整数部分的函数</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function ToInteger(x) {
  x = Number(x);
  return x &lt; 0 ? Math.ceil(x) : Math.floor(x);
}

ToInteger(3.2) // 3
ToInteger(3.5) // 3
ToInteger(3.8) // 3
ToInteger(-3.2) // -3
ToInteger(-3.5) // -3
ToInteger(-3.8) // -3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，不管正数或负数，<code v-pre>ToInteger</code>函数总是返回一个数值的整数部分。</p>
<h3 id="_2-4-math-round-四舍五入" tabindex="-1"><a class="header-anchor" href="#_2-4-math-round-四舍五入" aria-hidden="true">#</a> 2.4 Math.round() 四舍五入</h3>
<p><code v-pre>Math.round</code>方法用于<strong>四舍五入</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math.round(0.1) // 0
Math.round(0.5) // 1
Math.round(0.6) // 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意</strong>，它对负数的处理（主要是对<code v-pre>.5</code>的处理）。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math.round(-1.1) // -1
Math.round(-1.5) // -1
Math.round(-1.6) // -2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-5-math-pow-指数运算-次方运算" tabindex="-1"><a class="header-anchor" href="#_2-5-math-pow-指数运算-次方运算" aria-hidden="true">#</a> 2.5 Math.pow() 指数运算 （次方运算）</h3>
<p><code v-pre>Math.pow</code>方法返回<strong>以第一个参数为底数、第二个参数为幂的指数值</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 等同于 2 ** 2
Math.pow(2, 2) // 4   2的2次方
// 等同于 2 ** 3
Math.pow(2, 3) // 8   2的3次方
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面是<strong>计算圆面积的方法</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var radius = 20;
var area = Math.PI * Math.pow(radius, 2); // 1256.6370614359173
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-6-math-sqrt-平方根" tabindex="-1"><a class="header-anchor" href="#_2-6-math-sqrt-平方根" aria-hidden="true">#</a> 2.6 Math.sqrt() 平方根</h3>
<p><code v-pre>Math.sqrt</code>方法<strong>返回参数值的平方根</strong>。如果参数是一个负值，则返回<code v-pre>NaN</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math.sqrt(4) // 2
Math.sqrt(-4) // NaN
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-7-math-log-自然对数" tabindex="-1"><a class="header-anchor" href="#_2-7-math-log-自然对数" aria-hidden="true">#</a> 2.7 Math.log() 自然对数</h3>
<p><code v-pre>Math.log</code>方法返回以<code v-pre>e</code>为底的自然对数值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math.log(Math.E) // 1
Math.log(10) // 2.302585092994046
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果要计算以10为底的对数，可以先用<code v-pre>Math.log</code>求出自然对数，然后除以<code v-pre>Math.LN10</code>；求以2为底的对数，可以除以<code v-pre>Math.LN2</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math.log(100)/Math.LN10 // 2
Math.log(8)/Math.LN2 // 3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-8-math-exp-e的指数" tabindex="-1"><a class="header-anchor" href="#_2-8-math-exp-e的指数" aria-hidden="true">#</a> 2.8 Math.exp() <code v-pre>e</code>的指数</h3>
<p><code v-pre>Math.exp</code>方法返回常数<code v-pre>e</code>的参数次方。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math.exp(1) // 2.718281828459045
Math.exp(3) // 20.085536923187668
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-9-math-random-0到1的随机数-可能等于0-但一定小于1" tabindex="-1"><a class="header-anchor" href="#_2-9-math-random-0到1的随机数-可能等于0-但一定小于1" aria-hidden="true">#</a> 2.9 Math.random() 0到1的随机数（可能等于0，但一定小于1）</h3>
<p><code v-pre>Math.random()</code>返回<strong>0到1之间的一个伪随机数</strong>，可能等于0，但是一定小于1。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math.random() // 0.7151307314634323
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>任意范围的随机数生成函数</strong>如下。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

getRandomArbitrary(1.5, 6.5)
// 2.4942810038223864
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>任意范围的随机整数生成函数</strong>如下。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomInt(1, 6) // 5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>返回<strong>随机字符</strong>的例子如下。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function random_str(length) {
  var ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  ALPHABET += 'abcdefghijklmnopqrstuvwxyz';
  ALPHABET += '0123456789-_';
  var str = '';
  for (var i = 0; i &lt; length; ++i) {
    var rand = Math.floor(Math.random() * ALPHABET.length);
    str += ALPHABET.substring(rand, rand + 1);
  }
  return str;
}

random_str(6) // &quot;NdQKOr&quot; 参数为指定字符长度
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>random_str</code>函数接受一个整数作为参数，返回变量<code v-pre>ALPHABET</code>内的随机字符所组成的指定长度的字符串。</p>
<h3 id="_2-10-三角函数方法" tabindex="-1"><a class="header-anchor" href="#_2-10-三角函数方法" aria-hidden="true">#</a> 2.10 三角函数方法</h3>
<p><code v-pre>Math</code>对象还提供一系列三角函数方法。</p>
<ul>
<li><code v-pre>Math.sin()</code>：返回参数的正弦（参数为弧度值）</li>
<li><code v-pre>Math.cos()</code>：返回参数的余弦（参数为弧度值）</li>
<li><code v-pre>Math.tan()</code>：返回参数的正切（参数为弧度值）</li>
<li><code v-pre>Math.asin()</code>：返回参数的反正弦（返回值为弧度值）</li>
<li><code v-pre>Math.acos()</code>：返回参数的反余弦（返回值为弧度值）</li>
<li><code v-pre>Math.atan()</code>：返回参数的反正切（返回值为弧度值）</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math.sin(0) // 0
Math.cos(0) // 1
Math.tan(0) // 0

Math.sin(Math.PI / 2) // 1

Math.asin(1) // 1.5707963267948966
Math.acos(1) // 0
Math.atan(1) // 0.7853981633974483
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>三角函数的应用相关知识：&lt; https://www.w3cplus.com/javascript/trigonometry-you-must-know.html &gt;</p>
<h2 id="九、date对象" tabindex="-1"><a class="header-anchor" href="#九、date对象" aria-hidden="true">#</a> 九、Date对象</h2>
<p><code v-pre>Date</code>对象是 JavaScript 原生的时间库。它以国际标准时间（UTC）1970年1月1日00:00:00作为时间的零点，可以表示的时间范围是前后各1亿天（单位为毫秒）。</p>
<h2 id="_1、普通函数的用法" tabindex="-1"><a class="header-anchor" href="#_1、普通函数的用法" aria-hidden="true">#</a> 1、普通函数的用法</h2>
<p><code v-pre>Date</code>对象可以作为普通函数直接调用，返回一个代表当前时间的<strong>字符串</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Date()
// &quot;Tue Dec 01 2015 09:34:43 GMT+0800 (CST)&quot; 字符串类型
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意</strong>，即使带有参数，<code v-pre>Date</code>作为普通函数使用时，返回的还是当前时间。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Date(2000, 1, 1) // 作为普通函数使用时带有参数返回的也是当前时间
// &quot;Tue Dec 01 2015 09:34:43 GMT+0800 (CST)&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码说明，<strong>无论有没有参数，直接调用<code v-pre>Date</code>总是返回当前时间</strong>。</p>
<h2 id="_2、构造函数的用法" tabindex="-1"><a class="header-anchor" href="#_2、构造函数的用法" aria-hidden="true">#</a> 2、构造函数的用法</h2>
<p><code v-pre>Date</code>还可以当作构造函数使用。对它使用<code v-pre>new</code>命令，会返回一个<code v-pre>Date</code>对象的实例。如果不加参数，实例代表的就是当前时间。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var today = new Date();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>Date</code>实例有一个独特的地方。其他对象求值的时候，都是默认调用<code v-pre>.valueOf()</code>方法，但是<code v-pre>Date</code>实例求值的时候，默认调用的是<code v-pre>toString()</code>方法。这导致对<code v-pre>Date</code>实例求值，返回的是一个字符串，代表该实例对应的时间。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var today = new Date();

today
// &quot;Tue Dec 01 2015 09:34:43 GMT+0800 (CST)&quot;

// 等同于
today.toString()
// &quot;Tue Dec 01 2015 09:34:43 GMT+0800 (CST)&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>today</code>是<code v-pre>Date</code>的实例，<strong>直接求值等同于调用<code v-pre>toString</code>方法</strong>。</p>
<p>作为构造函数时，<code v-pre>Date</code>对象可<strong>以接受多种格式的参数</strong>，返回一个该参数对应的时间实例。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 参数为时间零点开始计算的毫秒数
new Date(1378218728000)
// Tue Sep 03 2013 22:32:08 GMT+0800 (CST)

// 参数为日期字符串
new Date('January 6, 2013');
// Sun Jan 06 2013 00:00:00 GMT+0800 (CST)

// 参数为多个整数，
// 代表年、月、日、小时、分钟、秒、毫秒
new Date(2013, 0, 1, 0, 0, 0, 0)
// Tue Jan 01 2013 00:00:00 GMT+0800 (CST)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关于<code v-pre>Date</code>构造函数的参数，有几点说明。</p>
<p><strong>第一点</strong>，参数可以是负整数，代表1970年元旦之前的时间。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>new Date(-1378218728000)
// Fri Apr 30 1926 17:27:52 GMT+0800 (CST)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>第二点</strong>，只要是能被<code v-pre>Date.parse()</code>方法解析的字符串，都可以当作参数。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>new Date('2013-2-15')
new Date('2013/2/15')
new Date('02/15/2013')
new Date('2013-FEB-15')
new Date('FEB, 15, 2013')
new Date('FEB 15, 2013')
new Date('February, 15, 2013')
new Date('February 15, 2013')
new Date('15 Feb 2013')
new Date('15, February, 2013')
// Fri Feb 15 2013 00:00:00 GMT+0800 (CST)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面多种日期字符串的写法，返回的都是同一个时间。</p>
<p><strong>第三</strong>，参数为年、月、日等多个整数时，年和月是不能省略的，其他参数都可以省略的。也就是说，这时至少需要两个参数，因为如果只使用“年”这一个参数，<code v-pre>Date</code>会将其解释为毫秒数。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>new Date(2013) // 只有一个数字的参数会解释为毫秒数
// Thu Jan 01 1970 08:00:02 GMT+0800 (CST)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，2013被解释为毫秒数，而不是年份。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>new Date(2013, 0)
// Tue Jan 01 2013 00:00:00 GMT+0800 (CST)
new Date(2013, 0, 1)
// Tue Jan 01 2013 00:00:00 GMT+0800 (CST)
new Date(2013, 0, 1, 0)
// Tue Jan 01 2013 00:00:00 GMT+0800 (CST)
new Date(2013, 0, 1, 0, 0, 0, 0)
// Tue Jan 01 2013 00:00:00 GMT+0800 (CST)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，不管有几个参数，返回的都是2013年1月1日零点。</p>
<p>最后，各个参数的取值范围如下。</p>
<ul>
<li>年：使用四位数年份，比如<code v-pre>2000</code>。如果写成两位数或个位数，则加上<code v-pre>1900</code>，即<code v-pre>10</code>代表1910年。如果是负数，表示公元前。</li>
<li>月：<strong><code v-pre>0</code>表示一月，依次类推，<code v-pre>11</code>表示12月</strong>。</li>
<li>日：<code v-pre>1</code>到<code v-pre>31</code>。</li>
<li>小时：<code v-pre>0</code>到<code v-pre>23</code>。</li>
<li>分钟：<code v-pre>0</code>到<code v-pre>59</code>。</li>
<li>秒：<code v-pre>0</code>到<code v-pre>59</code></li>
<li>毫秒：<code v-pre>0</code>到<code v-pre>999</code>。</li>
</ul>
<p>注意，月份从<code v-pre>0</code>开始计算，但是，天数从<code v-pre>1</code>开始计算。另外，除了日期的默认值为<code v-pre>1</code>，小时、分钟、秒钟和毫秒的默认值都是<code v-pre>0</code>。</p>
<p>这些参数如果超出了正常范围，会被自动折算。比如，如果月设为<code v-pre>15</code>，就折算为下一年的4月。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>new Date(2013, 15)
// Tue Apr 01 2014 00:00:00 GMT+0800 (CST)
new Date(2013, 0, 0)
// Mon Dec 31 2012 00:00:00 GMT+0800 (CST)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码的第二个例子，日期设为<code v-pre>0</code>，就代表上个月的最后一天。</p>
<p>参数还可以使用负数，表示扣去的时间。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>new Date(2013, -1)
// Sat Dec 01 2012 00:00:00 GMT+0800 (CST)
new Date(2013, 0, -1)
// Sun Dec 30 2012 00:00:00 GMT+0800 (CST)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，分别对月和日使用了负数，表示从基准日扣去相应的时间。</p>
<h2 id="_3、日期的运算" tabindex="-1"><a class="header-anchor" href="#_3、日期的运算" aria-hidden="true">#</a> 3、日期的运算</h2>
<p>类型自动转换时，<code v-pre>Date</code>实例如果转为数值，则等于对应的毫秒数；如果转为字符串，则等于对应的日期字符串。所以，两个日期实例对象进行减法运算时，返回的是它们间隔的毫秒数；进行加法运算时，返回的是两个字符串连接而成的新字符串。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var d1 = new Date(2000, 2, 1);
var d2 = new Date(2000, 3, 1);

d2 - d1 // 减法运算返回毫秒数
// 2678400000
d2 + d1 // 加法运算返回日期字符串
// &quot;Sat Apr 01 2000 00:00:00 GMT+0800 (CST)Wed Mar 01 2000 00:00:00 GMT+0800 (CST)&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4、静态方法" tabindex="-1"><a class="header-anchor" href="#_4、静态方法" aria-hidden="true">#</a> 4、静态方法</h2>
<h3 id="_4-1-date-now-当前时间戳" tabindex="-1"><a class="header-anchor" href="#_4-1-date-now-当前时间戳" aria-hidden="true">#</a> 4.1 Date.now() 当前时间戳</h3>
<p><code v-pre>Date.now</code>方法<strong>返回当前时间距离时间零点（1970年1月1日 00:00:00 UTC）的毫秒数（即时间戳）</strong>，相当于 Unix 时间戳乘以1000。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Date.now() // 1364026285194
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-2-date-parse-解析日期字符串-返回该时间点的时间戳" tabindex="-1"><a class="header-anchor" href="#_4-2-date-parse-解析日期字符串-返回该时间点的时间戳" aria-hidden="true">#</a> 4.2 Date.parse() 解析日期字符串，返回该时间点的时间戳</h3>
<p><code v-pre>Date.parse</code>方法用来<strong>解析日期字符串，返回该时间距离时间零点（1970年1月1日 00:00:00）的毫秒数</strong>。</p>
<p>日期字符串应该符合 RFC 2822 和 ISO 8061 这两个标准，即<code v-pre>YYYY-MM-DDTHH:mm:ss.sssZ</code>格式，其中最后的<code v-pre>Z</code>表示时区。但是，其他格式也可以被解析，请看下面的例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Date.parse('Aug 9, 1995')
Date.parse('January 26, 2011 13:51:50')
Date.parse('Mon, 25 Dec 1995 13:30:00 GMT')
Date.parse('Mon, 25 Dec 1995 13:30:00 +0430')
Date.parse('2011-10-10')
Date.parse('2011-10-10T14:48:00')
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的日期字符串都可以解析。</p>
<p>如果解析失败，返回<code v-pre>NaN</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Date.parse('xxx') // NaN
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-3-date-utc-以年、月、日等变量作为参数-返回该时间点的时间戳" tabindex="-1"><a class="header-anchor" href="#_4-3-date-utc-以年、月、日等变量作为参数-返回该时间点的时间戳" aria-hidden="true">#</a> 4.3 Date.UTC() 以年、月、日等变量作为参数，返回该时间点的时间戳</h3>
<p><code v-pre>Date.UTC</code>方法<strong>接受年、月、日等变量作为参数，返回该时间距离时间零点（1970年1月1日 00:00:00 UTC）的毫秒数。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 格式
Date.UTC(year, month[, date[, hrs[, min[, sec[, ms]]]]])

// 用法
Date.UTC(2011, 0, 1, 2, 3, 4, 567)
// 1293847384567
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该方法的参数用法与<code v-pre>Date</code>构造函数完全一致，比如月从<code v-pre>0</code>开始计算，日期从<code v-pre>1</code>开始计算。区别在于<code v-pre>Date.UTC</code>方法的参数，会被解释为 UTC 时间（世界标准时间），<code v-pre>Date</code>构造函数的参数会被解释为当前时区的时间。</p>
<h2 id="_5、实例方法" tabindex="-1"><a class="header-anchor" href="#_5、实例方法" aria-hidden="true">#</a> 5、实例方法</h2>
<p><code v-pre>Date</code>的实例对象，有几十个自己的方法，除了<code v-pre>valueOf</code>和<code v-pre>toString</code>，可以分为以下三类。</p>
<ul>
<li><code v-pre>to</code>类：从<code v-pre>Date</code>对象返回一个字符串，表示指定的时间。</li>
<li><code v-pre>get</code>类：获取<code v-pre>Date</code>对象的日期和时间。</li>
<li><code v-pre>set</code>类：设置<code v-pre>Date</code>对象的日期和时间。</li>
</ul>
<h3 id="_5-1-date-prototype-valueof-返回时间戳-等同于gettime-。-减法运算默认调用" tabindex="-1"><a class="header-anchor" href="#_5-1-date-prototype-valueof-返回时间戳-等同于gettime-。-减法运算默认调用" aria-hidden="true">#</a> 5.1 Date.prototype.valueOf() 返回时间戳，等同于getTime()。（减法运算默认调用）</h3>
<p><code v-pre>valueOf</code>方法<strong>返回实例对象距离时间零点（1970年1月1日00:00:00 UTC）对应的毫秒数</strong>，该方法等同于<code v-pre>getTime</code>方法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var d = new Date();

d.valueOf() // 1362790014817
d.getTime() // 1362790014817
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>预期为数值的场合，<code v-pre>Date</code>实例会自动调用该方法，所以<strong>可以用下面的方法计算时间的间隔</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var start = new Date();
// ...
var end = new Date();
var elapsed = end - start; // 自动调用valueOf()方法，返回时间戳的减法运算
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-to-类方法-返回字符串相关" tabindex="-1"><a class="header-anchor" href="#_5-2-to-类方法-返回字符串相关" aria-hidden="true">#</a> 5.2 to 类方法（返回字符串相关）</h3>
<h4 id="_1-date-prototype-tostring-返回一个完整的日期字符串-直接读取实例默认调用此方法" tabindex="-1"><a class="header-anchor" href="#_1-date-prototype-tostring-返回一个完整的日期字符串-直接读取实例默认调用此方法" aria-hidden="true">#</a> （1）Date.prototype.toString() 返回一个完整的日期字符串（直接读取实例默认调用此方法）</h4>
<p><code v-pre>toString</code>方法<strong>返回一个完整的日期字符串</strong>。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>var d = new Date(2013, 0, 1);

d.toString()
// &quot;Tue Jan 01 2013 00:00:00 GMT+0800 (CST)&quot;
d
// &quot;Tue Jan 01 2013 00:00:00 GMT+0800 (CST)&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为<code v-pre>toString</code>是<strong>默认的调用方法</strong>，所以如果<strong>直接读取<code v-pre>Date</code>实例，就相当于调用这个方法</strong>。</p>
<h4 id="_2-date-prototype-toutcstring-返回对应的utc时间-世界标准时-比北京时间晚8小时" tabindex="-1"><a class="header-anchor" href="#_2-date-prototype-toutcstring-返回对应的utc时间-世界标准时-比北京时间晚8小时" aria-hidden="true">#</a> （2）Date.prototype.toUTCString() 返回对应的UTC时间（世界标准时），比北京时间晚8小时</h4>
<p><code v-pre>toUTCString</code>方法返回对应的 UTC 时间，也就是比北京时间晚8个小时。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var d = new Date(2013, 0, 1);

d.toUTCString()
// &quot;Mon, 31 Dec 2012 16:00:00 GMT&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-date-prototype-toisostring-返回对应时间的-iso8601-写法-utc时间" tabindex="-1"><a class="header-anchor" href="#_3-date-prototype-toisostring-返回对应时间的-iso8601-写法-utc时间" aria-hidden="true">#</a> （3）Date.prototype.toISOString() 返回对应时间的 ISO8601 写法（UTC时间）</h4>
<p><code v-pre>toISOString</code>方法返回对应时间的 ISO8601 写法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var d = new Date(2013, 0, 1);

d.toISOString()
// &quot;2012-12-31T16:00:00.000Z&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意，<code v-pre>toISOString</code>方法返回的总是 UTC 时区的时间。</strong></p>
<h4 id="_4-date-prototype-tojson-返回符合json格式字符串-与toisostring方法的返回结果完全相同。" tabindex="-1"><a class="header-anchor" href="#_4-date-prototype-tojson-返回符合json格式字符串-与toisostring方法的返回结果完全相同。" aria-hidden="true">#</a> （4）Date.prototype.toJSON() 返回符合JSON格式字符串，与<code v-pre>toISOString</code>方法的返回结果完全相同。</h4>
<p><code v-pre>toJSON</code>方法返回一个符合 JSON 格式的 ISO 日期字符串，与<code v-pre>toISOString</code>方法的返回结果完全相同。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var d = new Date(2013, 0, 1);

d.toJSON()
// &quot;2012-12-31T16:00:00.000Z&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-date-prototype-todatestring-返回日期字符串-不含时分秒" tabindex="-1"><a class="header-anchor" href="#_5-date-prototype-todatestring-返回日期字符串-不含时分秒" aria-hidden="true">#</a> （5）Date.prototype.toDateString() 返回日期字符串（不含时分秒）</h4>
<p><code v-pre>toDateString</code>方法<strong>返回日期字符串（不含小时、分和秒）</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var d = new Date(2013, 0, 1);
d.toDateString() // &quot;Tue Jan 01 2013&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_6-date-prototype-totimestring-返回时间字符串-不含年月日" tabindex="-1"><a class="header-anchor" href="#_6-date-prototype-totimestring-返回时间字符串-不含年月日" aria-hidden="true">#</a> （6）Date.prototype.toTimeString() 返回时间字符串（不含年月日）</h4>
<p><code v-pre>toTimeString</code>方法<strong>返回时间字符串（不含年月日）</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var d = new Date(2013, 0, 1);
d.toTimeString() // &quot;00:00:00 GMT+0800 (CST)&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_7-本地时间" tabindex="-1"><a class="header-anchor" href="#_7-本地时间" aria-hidden="true">#</a> （7）本地时间</h4>
<p>以下三种方法，可以将 Date 实例转为表示本地时间的字符串。</p>
<ul>
<li><code v-pre>Date.prototype.toLocaleString()</code>：完整的本地时间。</li>
<li><code v-pre>Date.prototype.toLocaleDateString()</code>：本地日期（不含小时、分和秒）。</li>
<li><code v-pre>Date.prototype.toLocaleTimeString()</code>：本地时间（不含年月日）。</li>
</ul>
<p>下面是用法实例。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var d = new Date(2013, 0, 1);

d.toLocaleString()
// 中文版浏览器为&quot;2013年1月1日 上午12:00:00&quot;
// 英文版浏览器为&quot;1/1/2013 12:00:00 AM&quot;

d.toLocaleDateString()
// 中文版浏览器为&quot;2013年1月1日&quot;
// 英文版浏览器为&quot;1/1/2013&quot;

d.toLocaleTimeString()
// 中文版浏览器为&quot;上午12:00:00&quot;
// 英文版浏览器为&quot;12:00:00 AM&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这三个方法都有两个可选的参数。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>dateObj.toLocaleString([locales[, options]])
dateObj.toLocaleDateString([locales[, options]])
dateObj.toLocaleTimeString([locales[, options]])
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这两个参数中，<code v-pre>locales</code>是一个<strong>指定所用语言的字符串</strong>，<code v-pre>options</code>是一个<strong>配置对象</strong>。下面是<code v-pre>locales</code>的例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var d = new Date(2013, 0, 1);

d.toLocaleString('en-US') // &quot;1/1/2013, 12:00:00 AM&quot;
d.toLocaleString('zh-CN') // &quot;2013/1/1 上午12:00:00&quot;

d.toLocaleDateString('en-US') // &quot;1/1/2013&quot;
d.toLocaleDateString('zh-CN') // &quot;2013/1/1&quot;

d.toLocaleTimeString('en-US') // &quot;12:00:00 AM&quot;
d.toLocaleTimeString('zh-CN') // &quot;上午12:00:00&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面是<code v-pre>options</code>的例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var d = new Date(2013, 0, 1);

// 时间格式
// 下面的设置是，星期和月份为完整文字，年份和日期为数字
d.toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})
// &quot;Tuesday, January 1, 2013&quot;

// 指定时区
d.toLocaleTimeString('en-US', {
  timeZone: 'UTC',
  timeZoneName: 'short'
})
// &quot;4:00:00 PM UTC&quot;

d.toLocaleTimeString('en-US', {
  timeZone: 'Asia/Shanghai',
  timeZoneName: 'long'
})
// &quot;12:00:00 AM China Standard Time&quot;

// 小时周期为12还是24
d.toLocaleTimeString('en-US', {
  hour12: false
})
// &quot;00:00:00&quot;

d.toLocaleTimeString('en-US', {
  hour12: true
})
// &quot;12:00:00 AM&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-get类-获取年、月、日、时、分、秒等" tabindex="-1"><a class="header-anchor" href="#_5-3-get类-获取年、月、日、时、分、秒等" aria-hidden="true">#</a> 5.3 get类 （获取年、月、日、时、分、秒等）</h3>
<p><code v-pre>Date</code>对象提供了一系列<code v-pre>get*</code>方法，用来获取实例对象某个方面的值。</p>
<ul>
<li><code v-pre>getTime()</code>：返回实例距离1970年1月1日00:00:00的毫秒数，等同于<code v-pre>valueOf</code>方法。<strong>（时间戳）</strong></li>
<li><code v-pre>getDate()</code>：返回实例对象对应每个月的几号（从1开始）。<strong>（日）</strong></li>
<li><code v-pre>getDay()</code>：返回星期几，星期日为0，星期一为1，以此类推。<strong>（星期）</strong></li>
<li><code v-pre>getFullYear()</code>：返回四位的年份。<strong>（年）</strong></li>
<li><code v-pre>getMonth()</code>：返回月份（0表示1月，11表示12月）。<strong>（月）</strong></li>
<li><code v-pre>getHours()</code>：返回小时（0-23）。<strong>（时）</strong></li>
<li><code v-pre>getMilliseconds()</code>：返回毫秒（0-999）。<strong>（毫秒）</strong></li>
<li><code v-pre>getMinutes()</code>：返回分钟（0-59）。<strong>（分）</strong></li>
<li><code v-pre>getSeconds()</code>：返回秒（0-59）。<strong>（秒）</strong></li>
<li><code v-pre>getTimezoneOffset()</code>：返回当前时间与 UTC 的时区差异，以分钟表示，返回结果考虑到了夏令时因素。<strong>（与UTC差异）</strong></li>
</ul>
<p>所有这些<code v-pre>get*</code>方法返回的都是<strong>整数</strong>，不同方法返回值的范围不一样。</p>
<ul>
<li>分钟和秒：0 到 59</li>
<li>小时：0 到 23</li>
<li>星期：0（星期天）到 6（星期六）</li>
<li>日期：1 到 31</li>
<li>月份：0（一月）到 11（十二月）</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var d = new Date('January 6, 2013');

d.getDate() // 6
d.getMonth() // 0
d.getFullYear() // 2013
d.getTimezoneOffset() // -480   UTC时间减去当前时间，单位是分钟
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，最后一行返回<code v-pre>-480</code>，即 UTC 时间减去当前时间，单位是分钟。<code v-pre>-480</code>表示 UTC 比当前时间少480分钟，即当前时区比 UTC 早8个小时。</p>
<h6 id="例子-计算本年度还剩下多少天" tabindex="-1"><a class="header-anchor" href="#例子-计算本年度还剩下多少天" aria-hidden="true">#</a> 例子：计算本年度还剩下多少天</h6>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function leftDays() {
  var today = new Date();
  var endYear = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999);
  var msPerDay = 24 * 60 * 60 * 1000; // 一天的毫秒数
  return Math.round((endYear.getTime() - today.getTime()) / msPerDay);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面这些<code v-pre>get*</code>方法返回的都是当前时区的时间，<code v-pre>Date</code>对象还提供了这些方法对应的 UTC 版本，用来返回 UTC 时间。</p>
<p><strong>获取UTC时区相关方法：</strong></p>
<ul>
<li><code v-pre>getUTCDate()</code></li>
<li><code v-pre>getUTCFullYear()</code></li>
<li><code v-pre>getUTCMonth()</code></li>
<li><code v-pre>getUTCDay()</code></li>
<li><code v-pre>getUTCHours()</code></li>
<li><code v-pre>getUTCMinutes()</code></li>
<li><code v-pre>getUTCSeconds()</code></li>
<li><code v-pre>getUTCMilliseconds()</code></li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var d = new Date('January 6, 2013');

d.getDate() // 6
d.getUTCDate() // 5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，实例对象<code v-pre>d</code>表示当前时区（东八时区）的1月6日0点0分0秒，这个时间对于当前时区来说是1月6日，所以<code v-pre>getDate</code>方法返回6，对于 UTC 时区来说是1月5日，所以<code v-pre>getUTCDate</code>方法返回5。</p>
<h3 id="_5-4-set-类方法" tabindex="-1"><a class="header-anchor" href="#_5-4-set-类方法" aria-hidden="true">#</a> 5.4 set 类方法</h3>
<p><code v-pre>Date</code>对象提供了一系列<code v-pre>set*</code>方法，用来设置实例对象的各个方面。</p>
<ul>
<li><code v-pre>setDate(date)</code>：设置实例对象对应的每个月的几<strong>号</strong>（1-31），返回改变后毫秒时间戳。</li>
<li><code v-pre>setFullYear(year [, month, date])</code>：设置四位<strong>年份</strong>。</li>
<li><code v-pre>setHours(hour [, min, sec, ms])</code>：设置<strong>小时</strong>（0-23）。</li>
<li><code v-pre>setMilliseconds()</code>：设置<strong>毫秒</strong>（0-999）。</li>
<li><code v-pre>setMinutes(min [, sec, ms])</code>：设置<strong>分钟</strong>（0-59）。</li>
<li><code v-pre>setMonth(month [, date])</code>：设置<strong>月份</strong>（0-11）。</li>
<li><code v-pre>setSeconds(sec [, ms])</code>：设置<strong>秒</strong>（0-59）。</li>
<li><code v-pre>setTime(milliseconds)</code>：设置<strong>毫秒时间戳</strong>。</li>
</ul>
<p>这些方法基本是跟<code v-pre>get*</code>方法一一对应的，但是没有<code v-pre>setDay</code>方法，因为星期几是计算出来的，而不是设置的。另外，需要注意的是，凡是涉及到设置月份，都是从0开始算的，即<code v-pre>0</code>是1月，<code v-pre>11</code>是12月。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var d = new Date ('January 6, 2013');

d // Sun Jan 06 2013 00:00:00 GMT+0800 (CST)
d.setDate(9) // 1357660800000
d // Wed Jan 09 2013 00:00:00 GMT+0800 (CST)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>set*</code>方法的参数都会自动折算。以<code v-pre>setDate</code>为例，如果参数超过当月的最大天数，则向下一个月顺延，如果参数是负数，表示从上个月的最后一天开始减去的天数。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var d1 = new Date('January 6, 2013');

d1.setDate(32) // 1359648000000
d1 // Fri Feb 01 2013 00:00:00 GMT+0800 (CST)

var d2 = new Date ('January 6, 2013');

d.setDate(-1) // 1356796800000
d // Sun Dec 30 2012 00:00:00 GMT+0800 (CST)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>**set</code>类方法和<code v-pre>get</code>类方法，可以结合使用，得到相对时间。**</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var d = new Date();

// 将日期向后推1000天
d.setDate(d.getDate() + 1000);
// 将时间设为6小时后
d.setHours(d.getHours() + 6);
// 将年份设为去年
d.setFullYear(d.getFullYear() - 1);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>set*</code>系列方法除了<code v-pre>setTime()</code>，都有对应的 UTC 版本，即<strong>设置 UTC 时区的时间</strong>。</p>
<ul>
<li><code v-pre>setUTCDate()</code></li>
<li><code v-pre>setUTCFullYear()</code></li>
<li><code v-pre>setUTCHours()</code></li>
<li><code v-pre>setUTCMilliseconds()</code></li>
<li><code v-pre>setUTCMinutes()</code></li>
<li><code v-pre>setUTCMonth()</code></li>
<li><code v-pre>setUTCSeconds()</code></li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var d = new Date('January 6, 2013');
d.getUTCHours() // 16
d.setUTCHours(22) // 1357423200000
d // Sun Jan 06 2013 06:00:00 GMT+0800 (CST)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，本地时区（东八时区）的1月6日0点0分，是 UTC 时区的前一天下午16点。设为 UTC 时区的22点以后，就变为本地时区的上午6点。</p>
<h2 id="十、regexp-对象" tabindex="-1"><a class="header-anchor" href="#十、regexp-对象" aria-hidden="true">#</a> 十、RegExp 对象</h2>
<p><code v-pre>RegExp</code>对象提供正则表达式的功能。</p>
<h2 id="_1、概述-5" tabindex="-1"><a class="header-anchor" href="#_1、概述-5" aria-hidden="true">#</a> 1、概述</h2>
<p><strong>正则表达式（regular expression）是一种表达文本模式（即字符串结构）的方法，有点像字符串的模板，常常用来按照“给定模式”匹配文本</strong>。比如，正则表达式给出一个 Email 地址的模式，然后用它来确定一个字符串是否为 Email 地址。JavaScript 的正则表达式体系是参照 Perl 5 建立的。</p>
<p><strong>新建正则表达式有两种方法：</strong></p>
<p><strong>一种是使用字面量，以斜杠表示开始和结束。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var regex = /xyz/; // 效率较高，且直观，推荐。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>另一种是使用<code v-pre>RegExp</code>构造函数。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var regex = new RegExp('xyz');
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面两种写法是等价的，都新建了一个内容为<code v-pre>xyz</code>的正则表达式对象。它们的主要区别是，第一种方法在引擎编译代码时，就会新建正则表达式，第二种方法在运行时新建正则表达式，所以前者的效率较高。而且，前者比较便利和直观，所以实际应用中，基本上都采用字面量定义正则表达式。</p>
<p><code v-pre>RegExp</code>构造函数还可以接受第二个参数，表示修饰符（详细解释见下文）。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var regex = new RegExp('xyz', 'i'); // i为修饰符
// 等价于
var regex = /xyz/i;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，正则表达式<code v-pre>/xyz/</code>有一个修饰符<code v-pre>i</code>。</p>
<h2 id="_2、实例属性" tabindex="-1"><a class="header-anchor" href="#_2、实例属性" aria-hidden="true">#</a> 2、实例属性</h2>
<p>正则对象的实例属性分成两类。</p>
<p>一类是<strong>修饰符相关</strong>，用于了解设置了什么修饰符。</p>
<ul>
<li><code v-pre>RegExp.prototype.ignoreCase</code>：返回一个布尔值，表示是否设置了<code v-pre>i</code>修饰符。</li>
<li><code v-pre>RegExp.prototype.global</code>：返回一个布尔值，表示是否设置了<code v-pre>g</code>修饰符。</li>
<li><code v-pre>RegExp.prototype.multiline</code>：返回一个布尔值，表示是否设置了<code v-pre>m</code>修饰符。</li>
<li><code v-pre>RegExp.prototype.flags</code>：返回一个字符串，包含了已经设置的所有修饰符，按字母排序。</li>
</ul>
<p>上面四个属性都是<strong>只读</strong>的。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var r = /abc/igm;

r.ignoreCase // true 是否设置i修饰符
r.global // true 是否设置g修饰符
r.multiline // true 是否设置m修饰符
r.flags // 'gim' 字符串，包含设置的所有修饰符，按字母排序
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另一类是与<strong>修饰符无关的属性</strong>，主要是下面两个。</p>
<ul>
<li><code v-pre>RegExp.prototype.lastIndex</code>：返回一个整数，表示下一次开始搜索的位置。该属性可读写，但是只在进行连续搜索时有意义，详细介绍请看后文。</li>
<li><code v-pre>RegExp.prototype.source</code>：返回正则表达式的字符串形式（不包括反斜杠），该属性只读。</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var r = /abc/igm;

r.lastIndex // 0
r.source // &quot;abc&quot; 正则表达式的字符串形式
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3、实例方法-2" tabindex="-1"><a class="header-anchor" href="#_3、实例方法-2" aria-hidden="true">#</a> 3、实例方法</h2>
<h3 id="_3-1-regexp-prototype-test-当前模式是否匹配参数字符串-返回布尔值" tabindex="-1"><a class="header-anchor" href="#_3-1-regexp-prototype-test-当前模式是否匹配参数字符串-返回布尔值" aria-hidden="true">#</a> 3.1 RegExp.prototype.test() 当前模式是否匹配参数字符串，返回布尔值</h3>
<p>正则实例对象的<code v-pre>test</code>方法<strong>返回一个布尔值，表示当前模式是否能匹配参数字符串</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>/cat/.test('cats and dogs') // true 验证字符串是否包含cat
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码验证参数字符串之中是否包含<code v-pre>cat</code>，结果返回<code v-pre>true</code>。</p>
<p>如果正则表达式带有<code v-pre>g</code>修饰符，则每一次<code v-pre>test</code>方法都从上一次结束的位置开始向后匹配。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var r = /x/g; // 带有g全局匹配修饰符
var s = '_x_x';

r.lastIndex // 0  下一次开始搜索的位置
r.test(s) // true 内部原理：从0位置开始匹配，匹配到'x'在1位置，返回true，并把lastIndex属性设置为2，

r.lastIndex // 2 下一次开始搜索的位置
r.test(s) // true  内部原理：从2位置开始匹配，匹配到'x'在3位置，返回true，并把lastIndex属性设置为4

r.lastIndex // 4 下一次开始搜索的位置
r.test(s) // false 内部原理：从4位置开始匹配，匹配不到’x‘,返回false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码的正则表达式使用了<code v-pre>g</code>修饰符，表示是全局搜索，会有多个结果。接着，三次使用<code v-pre>test</code>方法，每一次开始搜索的位置都是上一次匹配的后一个位置。</p>
<p>带有<code v-pre>g</code>修饰符时，可以通过正则对象的<code v-pre>lastIndex</code>属性指定开始搜索的位置。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var r = /x/g;
var s = '_x_x';

r.lastIndex = 4; // lastIndex属性可读写，改写后，test方法将从该位置开始匹配
r.test(s) // false

r.lastIndex // 0  重置为0
r.test(s) // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码指定从字符串的第五个位置开始搜索，这个位置为空，所以返回<code v-pre>false</code>。同时，<code v-pre>lastIndex</code>属性重置为<code v-pre>0</code>，所以第二次执行<code v-pre>r.test(s)</code>会返回<code v-pre>true</code>。</p>
<p><strong>注意</strong>，<strong>带有<code v-pre>g</code>修饰符时，正则表达式内部会记住上一次的<code v-pre>lastIndex</code>属性</strong>，这时不应该更换所要匹配的字符串，否则会有一些难以察觉的错误。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var r = /bb/g;
r.test('bb') // true  由于带有g修饰符，匹配后会把lastIndex属性修改为了2
r.test('-bb-') // false 从2位置开始匹配'bb',并没有匹配到
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，由于正则表达式<code v-pre>r</code>是从上一次的<code v-pre>lastIndex</code>位置开始匹配，导致第二次执行<code v-pre>test</code>方法时出现预期以外的结果。</p>
<p><code v-pre>lastIndex</code>属性只对同一个正则表达式有效，所以下面这样写是错误的。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var count = 0;
while (/a/g.test('babaa')) count++;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码会导致无限循环，因为<code v-pre>while</code>循环的每次匹配条件都是一个新的正则表达式，导致<code v-pre>lastIndex</code>属性总是等于0。</p>
<p>如果正则模式是一个<strong>空字符串，则匹配所有字符串</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>new RegExp('').test('abc')
// true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-regexp-prototype-exec-返回匹配结果-如匹配则返回一个数组-成员是匹配到的子字符串-否则返回null" tabindex="-1"><a class="header-anchor" href="#_3-2-regexp-prototype-exec-返回匹配结果-如匹配则返回一个数组-成员是匹配到的子字符串-否则返回null" aria-hidden="true">#</a> 3.2 RegExp.prototype.exec() 返回匹配结果，如匹配则返回一个数组，成员是匹配到的子字符串，否则返回null</h3>
<p>正则实例对象的<code v-pre>exec</code>方法，用来<strong>返回匹配结果。如果发现匹配，就返回一个数组，成员是匹配成功的子字符串，否则返回<code v-pre>null</code>。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var s = '_x_x';
var r1 = /x/;
var r2 = /y/;

r1.exec(s) // [&quot;x&quot;] 返回一个成员
r2.exec(s) // null
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，正则对象<code v-pre>r1</code>匹配成功，返回一个数组，成员是匹配结果；正则对象<code v-pre>r2</code>匹配失败，返回<code v-pre>null</code>。</p>
<p><strong>如果正则表示式包含圆括号（即含有“组匹配”），则返回的数组会包括多个成员</strong>。第一个成员是整个匹配成功的结果，后面的成员就是圆括号对应的匹配成功的组。也就是说，第二个成员对应第一个括号，第三个成员对应第二个括号，以此类推。整个数组的<code v-pre>length</code>属性等于组匹配的数量再加1。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var s = '_x_x';
var r = /_(x)/; // 含有圆括号，组匹配

r.exec(s) // [&quot;_x&quot;, &quot;x&quot;]  返回多个成员，第一个成员是整个匹配的结果，第二个成员是圆括号匹配的结果
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码的<code v-pre>exec</code>方法，返回一个数组。第一个成员是整个匹配的结果，第二个成员是圆括号匹配的结果。</p>
<p><code v-pre>exec</code>方法的返回数组还包含以下两个属性：</p>
<ul>
<li><code v-pre>input</code>：整个原字符串。</li>
<li><code v-pre>index</code>：整个模式匹配成功的开始位置（从0开始计数）。</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var r = /a(b+)a/;
var arr = r.exec('_abbba_aba_');

arr // [&quot;abbba&quot;, &quot;bbb&quot;] // 第一个成员是整个匹配的结果，第二个成员是圆括号匹配的结果

arr.index // 1  表示是在1位置开始匹配成功的
arr.input // &quot;_abbba_aba_&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中的<code v-pre>index</code>属性等于1，是因为从原字符串的第二个位置开始匹配成功。</p>
<p>如果正则表达式加上<code v-pre>g</code>修饰符，则可以使用多次<code v-pre>exec</code>方法，下一次搜索的位置从上一次匹配成功结束的位置开始。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var reg = /a/g; // 带'g'修饰符
var str = 'abc_abc_abc'

var r1 = reg.exec(str);
r1 // [&quot;a&quot;]
r1.index // 0 在0位置匹配成功
reg.lastIndex // 1  下一次匹配开始位置为1

var r2 = reg.exec(str);
r2 // [&quot;a&quot;]
r2.index // 4 在4位置匹配成功
reg.lastIndex // 5 下一次匹配开始位置为5

var r3 = reg.exec(str);
r3 // [&quot;a&quot;]
r3.index // 8 在8位置匹配成功
reg.lastIndex // 9 下一次匹配开始位置为9

var r4 = reg.exec(str);
r4 // null 没有匹配到返回null
reg.lastIndex // 0 下一次匹配位置为0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码连续用了四次<code v-pre>exec</code>方法，前三次都是从上一次匹配结束的位置向后匹配。当第三次匹配结束以后，整个字符串已经到达尾部，匹配结果返回<code v-pre>null</code>，正则实例对象的<code v-pre>lastIndex</code>属性也重置为<code v-pre>0</code>，意味着第四次匹配将从头开始。</p>
<p>利用<code v-pre>g</code>修饰符允许多次匹配的特点，可以用一个循环完成全部匹配。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var reg = /a/g;
var str = 'abc_abc_abc'

while(true) {
  var match = reg.exec(str);
  if (!match) break;
  console.log('#' + match.index + ':' + match[0]);
}
// #0:a
// #4:a
// #8:a
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，只要<code v-pre>exec</code>方法不返回<code v-pre>null</code>，就会一直循环下去，每次输出匹配的位置和匹配的文本。</p>
<p>正则实例对象的<code v-pre>lastIndex</code>属性不仅可读，还可写。设置了<code v-pre>g</code>修饰符的时候，只要手动设置了<code v-pre>lastIndex</code>的值，就会从指定位置开始匹配。</p>
<h2 id="_4、字符串的实例方法" tabindex="-1"><a class="header-anchor" href="#_4、字符串的实例方法" aria-hidden="true">#</a> 4、字符串的实例方法</h2>
<p><strong>字符串的实例方法之中，有4种与正则表达式有关。</strong></p>
<ul>
<li><code v-pre>String.prototype.match()</code>：返回一个数组，成员是所有匹配的子字符串。</li>
<li><code v-pre>String.prototype.search()</code>：按照给定的正则表达式进行搜索，返回一个整数，表示匹配开始的位置。</li>
<li><code v-pre>String.prototype.replace()</code>：按照给定的正则表达式进行替换，返回替换后的字符串。</li>
<li><code v-pre>String.prototype.split()</code>：按照给定规则进行字符串分割，返回一个数组，包含分割后的各个成员。</li>
</ul>
<h3 id="_4-1-string-prototype-match-匹配-返回匹配结果数组或null" tabindex="-1"><a class="header-anchor" href="#_4-1-string-prototype-match-匹配-返回匹配结果数组或null" aria-hidden="true">#</a> 4.1 String.prototype.match() 匹配，返回匹配结果数组或null</h3>
<p>字符串实例对象的<code v-pre>match</code>方法<strong>对字符串进行正则匹配，返回匹配结果</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var s = '_x_x';
var r1 = /x/;
var r2 = /y/;

s.match(r1) // [&quot;x&quot;] // 未带g修饰符，匹配到一个即返回结果
s.match(r2) // null
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从上面代码可以看到，字符串的<code v-pre>match</code>方法与正则对象的<code v-pre>exec</code>方法非常类似：匹配成功返回一个数组，匹配失败返回<code v-pre>null</code>。</p>
<p>如果正则表达式带有<code v-pre>g</code>修饰符，则该方法与正则对象的<code v-pre>exec</code>方法行为不同，会一次性返回所有匹配成功的结果。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var s = 'abba';
var r = /a/g;

s.match(r) // [&quot;a&quot;, &quot;a&quot;]  带g修饰符，会返回全部结果到数组成员
r.exec(s) // [&quot;a&quot;] 正则实例的exec方法只返回一个
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>设置<strong>正则表达式的<code v-pre>lastIndex</code>属性，对<code v-pre>match</code>方法无效</strong>，匹配总是从字符串的第一个字符开始。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var r = /a|b/g;
r.lastIndex = 7;
'xaxb'.match(r) // ['a', 'b']
r.lastIndex // 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码表示，设置正则对象的<code v-pre>lastIndex</code>属性是无效的。</p>
<h3 id="_4-2-string-prototype-search-返回第一个满足匹配条件的位置-不满足则返-1" tabindex="-1"><a class="header-anchor" href="#_4-2-string-prototype-search-返回第一个满足匹配条件的位置-不满足则返-1" aria-hidden="true">#</a> 4.2 String.prototype.search() 返回第一个满足匹配条件的位置，不满足则返-1</h3>
<p>字符串对象的<code v-pre>search</code>方法，<strong>返回第一个满足条件的匹配结果在整个字符串中的位置</strong>。<strong>如果没有任何匹配，则返回<code v-pre>-1</code>。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'_x_x'.search(/x/)
// 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，第一个匹配结果出现在字符串的<code v-pre>1</code>号位置。</p>
<h3 id="_4-3-string-prototype-replace-替换匹配的值-参数一是子串或正则-参数二是替换内容" tabindex="-1"><a class="header-anchor" href="#_4-3-string-prototype-replace-替换匹配的值-参数一是子串或正则-参数二是替换内容" aria-hidden="true">#</a> 4.3 String.prototype.replace() 替换匹配的值，参数一是子串或正则，参数二是替换内容</h3>
<p>字符串对象的<code v-pre>replace</code>方法可以<strong>替换匹配的值</strong>。它接受两个参数，第一个是正则表达式，表示搜索模式，第二个是替换的内容。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>str.replace(search, replacement)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>正则表达式如果不加<code v-pre>g</code>修饰符，就替换第一个匹配成功的值，否则替换所有匹配成功的值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'aaa'.replace('a', 'b') // &quot;baa&quot;
'aaa'.replace(/a/, 'b') // &quot;baa&quot; 不带g修饰符，只匹配并替换第一个
'aaa'.replace(/a/g, 'b') // &quot;bbb&quot; 带g修饰符，匹配全局，并替换全部匹配到的值
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，最后一个正则表达式使用了<code v-pre>g</code>修饰符，导致所有的<code v-pre>b</code>都被替换掉了。</p>
<p><code v-pre>replace</code>方法的一个应用，就是消除字符串首尾两端的空格。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var str = '  #id div.class  ';

str.replace(/^\s+|\s+$/g, '')
// &quot;#id div.class&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>replace</code>方法的<strong>第二个参数可以使用美元符号<code v-pre>$</code>，用来指代所替换的内容</strong>。</p>
<ul>
<li><code v-pre>$&amp;</code>：匹配的子字符串。</li>
<li>$`：匹配结果前面的文本。</li>
<li><code v-pre>$'</code>：匹配结果后面的文本。</li>
<li><code v-pre>$n</code>：匹配成功的第<code v-pre>n</code>组内容，<code v-pre>n</code>是从1开始的自然数。</li>
<li><code v-pre>$$</code>：指代美元符号<code v-pre>$</code>。</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'hello world'.replace(/(\w+)\s(\w+)/, '$2 $1')
// &quot;world hello&quot;
/*说明：
$n 用于组内容，$2为匹配到的第二组，即world； $1为匹配到的第一组，即hello
*/

'abc'.replace('b', '[$`-$&amp;-$\'-$$]')
// &quot;a[a-b-c-$]c&quot;
/*说明：
$`为匹配结果 b 前面的文本，即 a
$&amp;为匹配的子字符串，即 b
$’为匹配结果 b 后面的文本，即 c
$$代表$符号本身
*/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，第一个例子是将匹配的组互换位置，第二个例子是改写匹配的值。</p>
<p><code v-pre>replace</code>方法的第<strong>二个参数还可以是一个函数，将每一个匹配内容替换为函数返回值</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'3 and 5'.replace(/[0-9]+/g, function (match) {
  return 2 * match; // match参数是匹配到的内容
})
// &quot;6 and 10&quot;

var a = 'The quick brown fox jumped over the lazy dog.';
var pattern = /quick|brown|lazy/ig;

a.replace(pattern, function replacer(match) {
  return match.toUpperCase();
});
// The QUICK BROWN fox jumped over the LAZY dog.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>作为<code v-pre>replace</code>方法第二个参数的替换函数，可以接受多个参数。其中，第一个参数是捕捉到的内容，第二个参数是捕捉到的组匹配（<strong>有多少个组匹配，就有多少个对应的参数</strong>）。此外，最后还可以添加两个参数，倒数第二个参数是捕捉到的内容在整个字符串中的位置（比如从第五个位置开始），最后一个参数是原字符串。下面是一个网页模板替换的例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var prices = {
  'p1': '$1.99',
  'p2': '$9.99',
  'p3': '$5.00'
};

var template = '&lt;span id=&quot;p1&quot;&gt;&lt;/span&gt;'
  + '&lt;span id=&quot;p2&quot;&gt;&lt;/span&gt;'
  + '&lt;span id=&quot;p3&quot;&gt;&lt;/span&gt;';

template.replace(
  /(&lt;span id=&quot;)(.*?)(&quot;&gt;)(&lt;\/span&gt;)/g,
  function(match, $1, $2, $3, $4, index, str){
    return $1 + $2 + $3 + prices[$2] + $4;
  }
);
// &quot;&lt;span id=&quot;p1&quot;&gt;$1.99&lt;/span&gt;&lt;span id=&quot;p2&quot;&gt;$9.99&lt;/span&gt;&lt;span id=&quot;p3&quot;&gt;$5.00&lt;/span&gt;&quot;

// 说明：
// match 整个匹配到的内容：&lt;span id=&quot;p*&quot;&gt;&lt;/span&gt;

// 以下参数分别是匹配到的组内容，有多少组就对应多少个参数
// $1 &lt;span id=&quot;
// $2  p1~p3
// $3  &quot;&gt;
// $4  &lt;/span&gt;

// 后面还可以接受两个参数：
// 倒数第二个是：捕捉到的内容(即match的内容)在整个字符串中的位置
// 最后一个是：原字符串

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码的捕捉模式中，有四个括号，所以会产生四个组匹配，在匹配函数中用<code v-pre>$1</code>到<code v-pre>$4</code>表示。匹配函数的作用是将价格插入模板中。</p>
<h3 id="_4-4-string-prototype-split-按给定规则分割字符串-返回数组" tabindex="-1"><a class="header-anchor" href="#_4-4-string-prototype-split-按给定规则分割字符串-返回数组" aria-hidden="true">#</a> 4.4 String.prototype.split() 按给定规则分割字符串，返回数组</h3>
<p>字符串对象的<code v-pre>split</code>方法<strong>按照正则规则分割字符串，返回一个由分割后的各个部分组成的数组。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>str.split(separator, [limit])
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该方法接受<strong>两个参数</strong>，第一个参数是正则表达式，表示分隔规则，第二个参数是返回数组的最大成员数（数组长度）。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 非正则分隔
'a,  b,c, d'.split(',')
// [ 'a', '  b', 'c', ' d' ]

// 正则分隔，去除多余的空格
'a,  b,c, d'.split(/, */)
// [ 'a', 'b', 'c', 'd' ]

// 指定返回数组的最大成员（数组长度）
'a,  b,c, d'.split(/, */, 2)
[ 'a', 'b' ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码使用正则表达式，去除了子字符串的逗号后面的空格。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 例一
'aaa*a*'.split(/a*/)
// [ '', '*', '*' ]  分隔符，即被过滤的符号，

// 例二
'aaa**a*'.split(/a*/)
// [&quot;&quot;, &quot;*&quot;, &quot;*&quot;, &quot;*&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码的分割规则是0次或多次的<code v-pre>a</code>，由于正则默认是贪婪匹配，所以例一的第一个分隔符是<code v-pre>aaa</code>，第二个分割符是<code v-pre>a</code>，将字符串分成三个部分，包含开始处的空字符串。例二的第一个分隔符是<code v-pre>aaa</code>，第二个分隔符是0个<code v-pre>a</code>（即空字符），第三个分隔符是<code v-pre>a</code>，所以将字符串分成四个部分。</p>
<p>如果正则表达式<strong>带有括号</strong>，则括号匹配的部分也会作为数组成员返回。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'aaa*a*'.split(/(a*)/)
// [ '', 'aaa', '*', 'a', '*' ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码的正则表达式使用了括号，第一个组匹配是<code v-pre>aaa</code>，第二个组匹配是<code v-pre>a</code>，它们都作为数组成员返回。</p>
<h2 id="_5、匹配规则" tabindex="-1"><a class="header-anchor" href="#_5、匹配规则" aria-hidden="true">#</a> 5、匹配规则</h2>
<p>搭配菜鸟教程一起学习更容易理解：<a href="https://www.runoob.com/regexp/regexp-tutorial.html" target="_blank" rel="noopener noreferrer">https://www.runoob.com/regexp/regexp-tutorial.html</a></p>
<p>正则表达式在线测试与常用正则表达式：<a href="http://c.runoob.com/front-end/854" target="_blank" rel="noopener noreferrer">http://c.runoob.com/front-end/854</a></p>
<p>正则表达式的规则很复杂，下面一一介绍这些规则。</p>
<h3 id="_5-1-字面量字符和元字符" tabindex="-1"><a class="header-anchor" href="#_5-1-字面量字符和元字符" aria-hidden="true">#</a> 5.1 字面量字符和元字符</h3>
<p><strong>大部分字符在正则表达式中，就是字面的含义，比如<code v-pre>/a/</code>匹配<code v-pre>a</code>，<code v-pre>/b/</code>匹配<code v-pre>b</code></strong>。如果在正则表达式之中，某个字符只表示它字面的含义（就像前面的<code v-pre>a</code>和<code v-pre>b</code>），那么它们就叫做“字面量字符”（literal characters）。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>/dog/.test('old dog') // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码中正则表达式的<code v-pre>dog</code>，就是字面量字符，所以<code v-pre>/dog/</code>匹配<code v-pre>old dog</code>，因为它就表示<code v-pre>d</code>、<code v-pre>o</code>、<code v-pre>g</code>三个字母连在一起。</p>
<p>除了字面量字符以外，还<strong>有一部分字符有特殊含义，不代表字面的意思。它们叫做“元字符”</strong>（metacharacters），主要有以下几个。</p>
<h4 id="_1-点字符-类似通配" tabindex="-1"><a class="header-anchor" href="#_1-点字符-类似通配" aria-hidden="true">#</a> （1）点字符（.)   类似通配</h4>
<p>点字符（<code v-pre>.</code>）<strong>匹配除回车（<code v-pre>\r</code>）、换行(<code v-pre>\n</code>) 、行分隔符（<code v-pre>\u2028</code>）和段分隔符（<code v-pre>\u2029</code>）以外的任何单个字符</strong>。注意，对于码点大于<code v-pre>0xFFFF</code>字符，点字符不能正确匹配，会认为这是两个字符。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>/c.t/        //匹配c和t之间包含任意一个字符的情况,注意：一个.只匹配一个字符

'cet c2t c-t c.t coot c我t'.match(/c.t/g)
// [&quot;cet&quot;, &quot;c2t&quot;, &quot;c-t&quot;, &quot;c.t&quot;, &quot;c我t&quot;]

'cet c2t c-t c.t coot c我t'.match(/c..t/g)
//[&quot;coot&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>c.t</code>匹配<code v-pre>c</code>和<code v-pre>t</code>之间包含任意一个字符的情况，只要这三个字符在同一行，比如<code v-pre>cat</code>、<code v-pre>c2t</code>、<code v-pre>c-t</code>等等，但是不匹配<code v-pre>coot</code>。</p>
<h4 id="_2-位置字符-开始位置和结束位置" tabindex="-1"><a class="header-anchor" href="#_2-位置字符-开始位置和结束位置" aria-hidden="true">#</a> （2）位置字符(^) ($)  开始位置和结束位置</h4>
<p>位置字符用来提示字符所处的位置，主要有两个字符。</p>
<ul>
<li><strong><code v-pre>^</code> 表示字符串的开始位置</strong></li>
<li><strong><code v-pre>$</code> 表示字符串的结束位置</strong></li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// test必须出现在开始位置
/^test/.test('test123') // true

// test必须出现在结束位置
/test$/.test('new test') // true

// 从开始位置到结束位置只有test
/^test$/.test('test') // true
/^test$/.test('test test') // false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-选择符-表示-或关系" tabindex="-1"><a class="header-anchor" href="#_3-选择符-表示-或关系" aria-hidden="true">#</a> （3）选择符（<code v-pre>|</code>） 表示''或关系''</h4>
<p>竖线符号（<code v-pre>|</code>）在正则表达式中表示“<strong>或关系</strong>”（OR），即<code v-pre>cat|dog</code>表示匹配<code v-pre>cat</code>或<code v-pre>dog</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>/11|22/.test('911') // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码中，正则表达式指定必须匹配<code v-pre>11</code>或<code v-pre>22</code>。</p>
<p>多个选择符可以联合使用。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 匹配fred、barney、betty之中的一个
/fred|barney|betty/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>选择符会包括它前后的多个字符，比如<code v-pre>/ab|cd/</code>指的是匹配<code v-pre>ab</code>或者<code v-pre>cd</code>，而不是指匹配<code v-pre>b</code>或者<code v-pre>c</code>。如果想修改这个行为，可以使用圆括号。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>/a( |\t)b/.test('a\tb') // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码指的是，<code v-pre>a</code>和<code v-pre>b</code>之间有一个空格或者一个制表符。</p>
<p>其他的元字符还包括<code v-pre>\</code>、<code v-pre>\*</code>、<code v-pre>+</code>、<code v-pre>?</code>、<code v-pre>()</code>、<code v-pre>[]</code>、<code v-pre>{}</code>等，将在下文解释。</p>
<h3 id="_5-2-转义符-反斜杠" tabindex="-1"><a class="header-anchor" href="#_5-2-转义符-反斜杠" aria-hidden="true">#</a> 5.2 转义符（\ 反斜杠）</h3>
<p>正则表达式中那些有特殊含义的元字符，如果要匹配它们本身，就需要在它们前面要加上反斜杠。比如要匹配<code v-pre>+</code>，就要写成<code v-pre>\+</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>/1+1/.test('1+1')
// false

/1\+1/.test('1+1')
// true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，第一个正则表达式之所以不匹配，因为加号是元字符，不代表自身。第二个正则表达式使用反斜杠对加号转义，就能匹配成功。</p>
<p>正则表达式中，<strong>需要反斜杠转义的，一共有12个字符</strong>：<code v-pre>^</code>、<code v-pre>.</code>、<code v-pre>[</code>、<code v-pre>$</code>、<code v-pre>(</code>、<code v-pre>)</code>、<code v-pre>|</code>、<code v-pre>*</code>、<code v-pre>+</code>、<code v-pre>?</code>、<code v-pre>{</code>和<code v-pre>\</code>。需要特别注意的是，如果使用<code v-pre>RegExp</code>方法生成正则对象，转义需要使用两个斜杠，因为字符串内部会先转义一次。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>(new RegExp('1\+1')).test('1+1')
// false

(new RegExp('1\\+1')).test('1+1')
// true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>RegExp</code>作为构造函数，参数是一个字符串。但是，在字符串内部，反斜杠也是转义字符，所以它会先被反斜杠转义一次，然后再被正则表达式转义一次，因此需要两个反斜杠转义。</p>
<h3 id="_5-3-特殊字符" tabindex="-1"><a class="header-anchor" href="#_5-3-特殊字符" aria-hidden="true">#</a> 5.3 特殊字符</h3>
<p>正则表达式对一些不能打印的特殊字符，提供了表达方法。</p>
<ul>
<li>
<p><code v-pre>\cX</code> 表示<code v-pre>Ctrl-[X]</code>，其中的<code v-pre>X</code>是A-Z之中任一个英文字母，用来匹配控制字符。</p>
</li>
<li>
<p><code v-pre>[\b]</code> 匹配退格键(U+0008)，不要与<code v-pre>\b</code>混淆。</p>
</li>
<li>
<p><code v-pre>\n</code> 匹配换行键。</p>
</li>
<li>
<p><code v-pre>\r</code> 匹配回车键。</p>
</li>
<li>
<p><code v-pre>\t</code> 匹配制表符 tab（U+0009）。</p>
</li>
<li>
<p><code v-pre>\v</code> 匹配垂直制表符（U+000B）。</p>
</li>
<li>
<p><code v-pre>\f</code> 匹配换页符（U+000C）。</p>
</li>
<li>
<p><code v-pre>\0</code> 匹配<code v-pre>null</code>字符（U+0000）。</p>
</li>
<li>
<p><code v-pre>\xhh</code> 匹配一个以两位十六进制数（<code v-pre>\x00</code>-<code v-pre>\xFF</code>）表示的字符。</p>
</li>
<li>
<p><code v-pre>\uhhhh</code> 匹配一个以四位十六进制数（<code v-pre>\u0000</code>-<code v-pre>\uFFFF</code>）表示的 Unicode 字符。</p>
</li>
</ul>
<h3 id="_5-4-字符类" tabindex="-1"><a class="header-anchor" href="#_5-4-字符类" aria-hidden="true">#</a> 5.4 字符类</h3>
<p>字符类（class）<strong>表示有一系列字符可供选择，只要匹配其中一个就可以了</strong>。所有可供选择的字符都放在<strong>方括号</strong>内，比如<code v-pre>[xyz]</code> 表示<code v-pre>x</code>、<code v-pre>y</code>、<code v-pre>z</code>之中任选一个匹配。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>/[abc]/.test('hello world') // false
/[abc]/.test('apple') // true  a、b、c其中任意一个
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，字符串<code v-pre>hello world</code>不包含<code v-pre>a</code>、<code v-pre>b</code>、<code v-pre>c</code>这三个字母中的任一个，所以返回<code v-pre>false</code>；字符串<code v-pre>apple</code>包含字母<code v-pre>a</code>，所以返回<code v-pre>true</code>。</p>
<p>有两个字符在字符类中有特殊含义。</p>
<h5 id="_1-脱字符-排除" tabindex="-1"><a class="header-anchor" href="#_1-脱字符-排除" aria-hidden="true">#</a> （1）脱字符（^  排除）</h5>
<p>如果方括号内的第一个字符是<code v-pre>[^]</code>，则表示<strong>除了字符类之中的字符，其他字符都可以匹配</strong>。比如，<code v-pre>[^xyz]</code>表示除了<code v-pre>x</code>、<code v-pre>y</code>、<code v-pre>z</code>之外都可以匹配。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>/[^abc]/.test('bbc news') // true  字符串中包含了a、b、c以为的字符
/[^abc]/.test('bbc') // false  字符串中没有除了a、b、c以外的字符
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，字符串<code v-pre>bbc news</code>包含<code v-pre>a</code>、<code v-pre>b</code>、<code v-pre>c</code>以外的其他字符，所以返回<code v-pre>true</code>；字符串<code v-pre>bbc</code>不包含<code v-pre>a</code>、<code v-pre>b</code>、<code v-pre>c</code>以外的其他字符，所以返回<code v-pre>false</code>。</p>
<p>如果方括号内没有其他字符，即<strong>只有<code v-pre>[^]</code>，就表示匹配一切字符，其中包括换行符</strong>。相比之下，点号作为元字符（<code v-pre>.</code>）是不包括换行符的。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var s = 'Please yes\nmake my day!';

s.match(/yes.*day/) // null
s.match(/yes[^]*day/) // [ 'yes\nmake my day']
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，字符串<code v-pre>s</code>含有一个换行符，点号不包括换行符，所以第一个正则表达式匹配失败；第二个正则表达式<code v-pre>[^]</code>包含一切字符，所以匹配成功。</p>
<blockquote>
<p>注意，脱字符只有在字符类的第一个位置才有特殊含义，否则就是字面含义。</p>
</blockquote>
<h5 id="_2-连字符-字符连续范围" tabindex="-1"><a class="header-anchor" href="#_2-连字符-字符连续范围" aria-hidden="true">#</a> （2）连字符（- 字符连续范围）</h5>
<p>某些情况下，对于连续序列的字符，连字符（<code v-pre>-</code>）用来提供简写形式，表示<strong>字符的连续范围</strong>。比如，<code v-pre>[abc]</code>可以写成<code v-pre>[a-c]</code>，<code v-pre>[0123456789]</code>可以写成<code v-pre>[0-9]</code>，同理<code v-pre>[A-Z]</code>表示26个大写字母。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>/a-z/.test('b') // false
/[a-z]/.test('b') // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，当连字号（dash）不出现在方括号之中，就不具备简写的作用，只代表字面的含义，所以不匹配字符<code v-pre>b</code>。只有当连字号用在方括号之中，才表示连续的字符序列。</p>
<p>以下都是合法的字符类简写形式。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>[0-9.,]
[0-9a-fA-F]
[a-zA-Z0-9-]
[1-31] // 注意：不代表1到31，只代表1到3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中最后一个字符类<code v-pre>[1-31]</code>，不代表<code v-pre>1</code>到<code v-pre>31</code>，只代表<code v-pre>1</code>到<code v-pre>3</code>。</p>
<p>连字符还可以用来指定 Unicode 字符的范围。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var str = &quot;\u0130\u0131\u0132&quot;;
/[\u0128-\uFFFF]/.test(str)
// true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>\u0128-\uFFFF</code>表示匹配码点在<code v-pre>0128</code>到<code v-pre>FFFF</code>之间的所有字符。</p>
<p>另外，不要过分使用连字符，设定一个很大的范围，否则很可能选中意料之外的字符。最典型的例子就是<code v-pre>[A-z]</code>，表面上它是选中从大写的<code v-pre>A</code>到小写的<code v-pre>z</code>之间52个字母，但是由于在 ASCII 编码之中，大写字母与小写字母之间还有其他字符，结果就会出现意料之外的结果。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>/[A-z]/.test('\\') // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码中，由于反斜杠（'\'）的ASCII码在大写字母与小写字母之间，结果会被选中。</p>
<h3 id="_5-5-预定义模式-常见模式简写-d-d-w-w-s-s-b-b" tabindex="-1"><a class="header-anchor" href="#_5-5-预定义模式-常见模式简写-d-d-w-w-s-s-b-b" aria-hidden="true">#</a> 5.5 预定义模式 (常见模式简写\d\D\w\W\s\S\b\B)</h3>
<p>预定义模式指的是<strong>某些常见模式的简写方式</strong>。</p>
<ul>
<li><code v-pre>\d</code> 匹配0-9之间的任一数字，相当于<code v-pre>[0-9]</code>。<strong>(数字)</strong></li>
<li><code v-pre>\D</code> 匹配所有0-9以外的字符，相当于<code v-pre>[^0-9]</code>。<strong>(非数字)</strong></li>
<li><code v-pre>\w</code> 匹配任意的字母、数字和下划线，相当于<code v-pre>[A-Za-z0-9_]</code>。<strong>(字母、数字、下划线)</strong></li>
<li><code v-pre>\W</code> 除所有字母、数字和下划线以外的字符，相当于<code v-pre>[^A-Za-z0-9_]</code>。<strong>(非：字母、数字、下划线)</strong></li>
<li><code v-pre>\s</code> 匹配空格（包括换行符、制表符、空格符等），相等于<code v-pre>[ \t\r\n\v\f]</code>。<strong>(空格)</strong></li>
<li><code v-pre>\S</code> 匹配非空格的字符，相当于<code v-pre>[^ \t\r\n\v\f]</code>。<strong>(非空格)</strong></li>
<li><code v-pre>\b</code> 匹配词的边界。<strong>(单词边界)</strong></li>
<li><code v-pre>\B</code> 匹配非词边界，即在词的内部。<strong>(非单词边界)</strong></li>
</ul>
<p>下面是一些例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// \s 的例子
/\s\w*/.exec('hello world') // [&quot; world&quot;]

// \b 的例子
/\bworld/.test('hello world') // true
/\bworld/.test('hello-world') // true
/\bworld/.test('helloworld') // false

// \B 的例子
/\Bworld/.test('hello-world') // false
/\Bworld/.test('helloworld') // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>\s</code>表示空格，所以匹配结果会包括空格。<code v-pre>\b</code>表示词的边界，所以<code v-pre>world</code>的词首必须独立（词尾是否独立未指定），才会匹配。同理，<code v-pre>\B</code>表示非词的边界，只有<code v-pre>world</code>的词首不独立，才会匹配。</p>
<p>通常，正则表达式遇到换行符（<code v-pre>\n</code>）就会停止匹配。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var html = &quot;&lt;b&gt;Hello&lt;/b&gt;\n&lt;i&gt;world!&lt;/i&gt;&quot;;

/.*/.exec(html)[0]
// &quot;&lt;b&gt;Hello&lt;/b&gt;&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，字符串<code v-pre>html</code>包含一个换行符，结果点字符（<code v-pre>.</code>）不匹配换行符，导致匹配结果可能不符合原意。这时使用<code v-pre>\s</code>字符类，就能包括换行符。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var html = &quot;&lt;b&gt;Hello&lt;/b&gt;\n&lt;i&gt;world!&lt;/i&gt;&quot;;

/[\S\s]*/.exec(html)[0]
// &quot;&lt;b&gt;Hello&lt;/b&gt;\n&lt;i&gt;world!&lt;/i&gt;&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>[\S\s]</code>指代一切字符。</p>
<h3 id="_5-6-重复类-n-n-n-m" tabindex="-1"><a class="header-anchor" href="#_5-6-重复类-n-n-n-m" aria-hidden="true">#</a> 5.6 重复类 （ {n} {n,} {n,m} ）</h3>
<p>模式的精确匹配次数，使用大括号（<code v-pre>{}</code>）表示。<code v-pre>{n}</code>表示恰好重复<code v-pre>n</code>次，<code v-pre>{n,}</code>表示至少重复<code v-pre>n</code>次，<code v-pre>{n,m}</code>表示重复不少于<code v-pre>n</code>次，不多于<code v-pre>m</code>次。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>/lo{2}k/.test('look') // true  2个o
/lo{2,5}k/.test('looook') // true   2到5个o
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，第一个模式指定<code v-pre>o</code>连续出现2次，第二个模式指定<code v-pre>o</code>连续出现2次到5次之间。</p>
<h3 id="_5-7-量词符" tabindex="-1"><a class="header-anchor" href="#_5-7-量词符" aria-hidden="true">#</a> 5.7 量词符（?）（*）（+）</h3>
<p>量词符用来设定<strong>某个模式出现的次数</strong>。</p>
<ul>
<li><code v-pre>?</code> 问号表示某个模式出现<strong>0次或1次</strong>，等同于<code v-pre>{0, 1}</code>。</li>
<li><code v-pre>*</code> 星号表示某个模式出现<strong>0次或多次</strong>，等同于<code v-pre>{0,}</code>。</li>
<li><code v-pre>+</code> 加号表示某个模式出现<strong>1次或多次</strong>，等同于<code v-pre>{1,}</code>。</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// t 出现0次或1次
/t?est/.test('test') // true
/t?est/.test('est') // true

// t 出现1次或多次
/t+est/.test('test') // true
/t+est/.test('ttest') // true
/t+est/.test('est') // false

// t 出现0次或多次
/t*est/.test('test') // true
/t*est/.test('ttest') // true
/t*est/.test('tttest') // true
/t*est/.test('est') // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-8-贪婪模式-对量词符可使用非贪婪模式" tabindex="-1"><a class="header-anchor" href="#_5-8-贪婪模式-对量词符可使用非贪婪模式" aria-hidden="true">#</a> 5.8 贪婪模式（对量词符可使用非贪婪模式）</h3>
<p>上一小节的三个量词符，默认情况下都是最大可能匹配，即<strong>匹配直到下一个字符不满足匹配规则为止</strong>。这被称为贪婪模式。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var s = 'aaa';
s.match(/a+/) // [&quot;aaa&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，模式是<code v-pre>/a+/</code>，表示匹配1个<code v-pre>a</code>或多个<code v-pre>a</code>，那么到底会匹配几个<code v-pre>a</code>呢？因为默认是贪婪模式，会一直匹配到字符<code v-pre>a</code>不出现为止，所以匹配结果是3个<code v-pre>a</code>。</p>
<p>如果想将贪婪模式改为非贪婪模式，可以在量词符后面加一个问号。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var s = 'aaa';
s.match(/a+?/) // [&quot;a&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，模式结尾添加了一个问号<code v-pre>/a+?/</code>，这时就改为<strong>非贪婪模式，一旦条件满足，就不再往下匹配</strong>。</p>
<p>除了非贪婪模式的加号，还有非贪婪模式的星号（<code v-pre>*</code>）和非贪婪模式的问号（<code v-pre>?</code>）。</p>
<ul>
<li><code v-pre>+?</code>：表示某个模式出现1次或多次，匹配时采用非贪婪模式。</li>
<li><code v-pre>*?</code>：表示某个模式出现0次或多次，匹配时采用非贪婪模式。</li>
<li><code v-pre>??</code>：表格某个模式出现0次或1次，匹配时采用非贪婪模式。</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'abb'.match(/ab*b/) // [&quot;abb&quot;]
'abb'.match(/ab*?b/) // [&quot;ab&quot;]

'abb'.match(/ab?b/) // [&quot;abb&quot;]
'abb'.match(/ab??b/) // [&quot;ab&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-9-修饰符" tabindex="-1"><a class="header-anchor" href="#_5-9-修饰符" aria-hidden="true">#</a> 5.9 修饰符</h3>
<p>修饰符（modifier）表示模式的附加规则，放在正则模式的最尾部。</p>
<p>修饰符可以单个使用，也可以多个一起使用。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 单个修饰符
var regex = /test/i;

// 多个修饰符
var regex = /test/ig;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-g-修饰符-全局匹配" tabindex="-1"><a class="header-anchor" href="#_1-g-修饰符-全局匹配" aria-hidden="true">#</a> （1）g 修饰符 （全局匹配）</h4>
<p>默认情况下，第一次匹配成功后，正则对象就停止向下匹配了。<code v-pre>g</code>修饰符表示全局匹配（global），加上它以后，正则对象将匹配全部符合条件的结果，主要用于搜索和替换。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var regex = /b/;
var str = 'abba';

regex.test(str); // true
regex.test(str); // true
regex.test(str); // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，正则模式不含<code v-pre>g</code>修饰符，每次都是从字符串头部开始匹配。所以，连续做了三次匹配，都返回<code v-pre>true</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var regex = /b/g;
var str = 'abba';

regex.test(str); // true
regex.test(str); // true
regex.test(str); // false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，正则模式含有<code v-pre>g</code>修饰符，每次都是从上一次匹配成功处，开始向后匹配。因为字符串<code v-pre>abba</code>只有两个<code v-pre>b</code>，所以前两次匹配结果为<code v-pre>true</code>，第三次匹配结果为<code v-pre>false</code>。</p>
<h4 id="_2-i-修饰符-不区分大小写" tabindex="-1"><a class="header-anchor" href="#_2-i-修饰符-不区分大小写" aria-hidden="true">#</a> （2）i 修饰符 （不区分大小写）</h4>
<p>默认情况下，正则对象区分字母的大小写，加上<code v-pre>i</code>修饰符以后表示忽略大小写（ignoreCase）。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>/abc/.test('ABC') // false
/abc/i.test('ABC') // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码表示，加了<code v-pre>i</code>修饰符以后，不考虑大小写，所以模式<code v-pre>abc</code>匹配字符串<code v-pre>ABC</code>。</p>
<h4 id="_3-m-修饰符-让-和-识别换行符" tabindex="-1"><a class="header-anchor" href="#_3-m-修饰符-让-和-识别换行符" aria-hidden="true">#</a> （3）m 修饰符（让^和$识别换行符）</h4>
<p><code v-pre>m</code>修饰符表示多行模式（multiline），会修改<code v-pre>^</code>和<code v-pre>$</code>的行为。默认情况下（即不加<code v-pre>m</code>修饰符时），<code v-pre>^</code>和<code v-pre>$</code>匹配字符串的开始处和结尾处，加上<code v-pre>m</code>修饰符以后，<code v-pre>^</code>和<code v-pre>$</code>还会匹配行首和行尾，即<code v-pre>^</code>和<code v-pre>$</code>会识别换行符（<code v-pre>\n</code>）。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>/world$/.test('hello world\n') // false
/world$/m.test('hello world\n') // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码中，字符串结尾处有一个换行符。如果不加<code v-pre>m</code>修饰符，匹配不成功，因为字符串的结尾不是<code v-pre>world</code>；加上以后，<code v-pre>$</code>可以匹配行尾。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>/^b/m.test('a\nb') // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码要求匹配行首的<code v-pre>b</code>，如果不加<code v-pre>m</code>修饰符，就相当于<code v-pre>b</code>只能处在字符串的开始处。加上<code v-pre>m</code>修饰符以后，换行符<code v-pre>\n</code>也会被认为是一行的开始。</p>
<h3 id="_5-10-组匹配" tabindex="-1"><a class="header-anchor" href="#_5-10-组匹配" aria-hidden="true">#</a> 5.10 组匹配</h3>
<h4 id="_1-概述-圆括号分组" tabindex="-1"><a class="header-anchor" href="#_1-概述-圆括号分组" aria-hidden="true">#</a> （1）概述 （圆括号分组）</h4>
<p>正则表达式的括号表示分组匹配，括号中的模式可以用来匹配分组的内容。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>/fred+/.test('fredd') // true +加号表示重复字母d
/(fred)+/.test('fredfred') // true  +加号表示重复单词fred
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，第一个模式没有括号，结果<code v-pre>+</code>只表示重复字母<code v-pre>d</code>，第二个模式有括号，结果<code v-pre>+</code>就表示匹配<code v-pre>fred</code>这个词。</p>
<p>下面是另外一个分组捕获的例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var m = 'abcabc'.match(/(.)b(.)/);
m
// ['abc', 'a', 'c']
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，正则表达式<code v-pre>/(.)b(.)/</code>一共使用两个括号，第一个括号捕获<code v-pre>a</code>，第二个括号捕获<code v-pre>c</code>。</p>
<p>注意，使用组匹配时，不宜同时使用<code v-pre>g</code>修饰符，否则<code v-pre>match</code>方法不会捕获分组的内容。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var m = 'abcabc'.match(/(.)b(.)/g);
m // ['abc', 'abc']
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码使用带<code v-pre>g</code>修饰符的正则表达式，结果<code v-pre>match</code>方法只捕获了匹配整个表达式的部分。这时必须使用正则表达式的<code v-pre>exec</code>方法，配合循环，才能读到每一轮匹配的组捕获。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var str = 'abcabc';
var reg = /(.)b(.)/g;
while (true) {
  var result = reg.exec(str);
  if (!result) break;
  console.log(result);
}
// [&quot;abc&quot;, &quot;a&quot;, &quot;c&quot;]
// [&quot;abc&quot;, &quot;a&quot;, &quot;c&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正则表达式内部，还可以用<code v-pre>\n</code>引用括号匹配的内容，<code v-pre>n</code>是从1开始的自然数，表示对应顺序的括号。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>/(.)b(.)\1b\2/.test(&quot;abcabc&quot;)
// true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码中，<code v-pre>\1</code>表示第一个括号匹配的内容（即<code v-pre>a</code>），<code v-pre>\2</code>表示第二个括号匹配的内容（即<code v-pre>c</code>）。</p>
<p>下面是另外一个例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>/y(..)(.)\2\1/.test('yabccab') // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>括号还可以嵌套。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>/y((..)\2)\1/.test('yabababab') // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>\1</code>指向外层括号，<code v-pre>\2</code>指向内层括号。</p>
<p>组匹配非常有用，下面是一个匹配网页标签的例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var tagName = /&lt;([^&gt;]+)&gt;[^&lt;]*&lt;\/\1&gt;/;

tagName.exec(&quot;&lt;b&gt;bold&lt;/b&gt;&quot;)[1]
// 'b'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，圆括号匹配尖括号之中的标签，而<code v-pre>\1</code>就表示对应的闭合标签。</p>
<p>上面代码略加修改，就能捕获带有属性的标签。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var html = '&lt;b class=&quot;hello&quot;&gt;Hello&lt;/b&gt;&lt;i&gt;world&lt;/i&gt;';
var tag = /&lt;(\w+)([^&gt;]*)&gt;(.*?)&lt;\/\1&gt;/g;

var match = tag.exec(html);

match[1] // &quot;b&quot;
match[2] // &quot; class=&quot;hello&quot;&quot;
match[3] // &quot;Hello&quot;

match = tag.exec(html);

match[1] // &quot;i&quot;
match[2] // &quot;&quot;
match[3] // &quot;world&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-非捕获组" tabindex="-1"><a class="header-anchor" href="#_2-非捕获组" aria-hidden="true">#</a> （2）非捕获组</h4>
<p><code v-pre>(?:x)</code>称为非捕获组（Non-capturing group），表示<strong>不返回该组匹配的内容，即匹配的结果中不计入这个括号</strong>。</p>
<p>非捕获组的作用请考虑这样一个场景，假定需要匹配<code v-pre>foo</code>或者<code v-pre>foofoo</code>，正则表达式就应该写成<code v-pre>/(foo){1, 2}/</code>，但是这样会占用一个组匹配。这时，就可以使用非捕获组，将正则表达式改为<code v-pre>/(?:foo){1, 2}/</code>，它的作用与前一个正则是一样的，但是不会单独输出括号内部的内容。</p>
<p>请看下面的例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var m = 'abc'.match(/(?:.)b(.)/);
m // [&quot;abc&quot;, &quot;c&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中的模式，一共使用了两个括号。其中第一个括号是非捕获组，所以最后返回的结果中没有第一个括号，只有第二个括号匹配的内容。</p>
<p>下面是用来分解网址的正则表达式。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 正常匹配
var url = /(http|ftp):\/\/([^/\r\n]+)(\/[^\r\n]*)?/;

url.exec('http://google.com/');
// [&quot;http://google.com/&quot;, &quot;http&quot;, &quot;google.com&quot;, &quot;/&quot;]

// 非捕获组匹配
var url = /(?:http|ftp):\/\/([^/\r\n]+)(\/[^\r\n]*)?/;

url.exec('http://google.com/');
// [&quot;http://google.com/&quot;, &quot;google.com&quot;, &quot;/&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码中，前一个正则表达式是正常匹配，第一个括号返回网络协议；后一个正则表达式是非捕获匹配，返回结果中不包括网络协议。</p>
<h4 id="_3-先行断言" tabindex="-1"><a class="header-anchor" href="#_3-先行断言" aria-hidden="true">#</a> （3）先行断言</h4>
<p><code v-pre>x(?=y)</code>称为先行断言（Positive look-ahead）<strong>，<code v-pre>x</code>只有在<code v-pre>y</code>前面才匹配，<code v-pre>y</code>不会被计入返回结果</strong>。比如，要匹配后面跟着百分号的数字，可以写成<code v-pre>/\d+(?=%)/</code>。</p>
<p>“先行断言”中，括号里的部分是不会返回的。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var m = 'abc'.match(/b(?=c)/);
m // [&quot;b&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码使用了先行断言，<code v-pre>b</code>在<code v-pre>c</code>前面所以被匹配，但是括号对应的<code v-pre>c</code>不会被返回。</p>
<h4 id="_4-先行否定断言" tabindex="-1"><a class="header-anchor" href="#_4-先行否定断言" aria-hidden="true">#</a> （4）先行否定断言</h4>
<p><code v-pre>x(?!y)</code>称为先行否定断言（Negative look-ahead），<strong><code v-pre>x</code>只有不在<code v-pre>y</code>前面才匹配，<code v-pre>y</code>不会被计入返回结果</strong>。比如，要匹配后面跟的不是百分号的数字，就要写成<code v-pre>/\d+(?!%)/</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>/\d+(?!\.)/.exec('3.14')
// [&quot;14&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，正则表达式指定，只有不在小数点前面的数字才会被匹配，因此返回的结果就是<code v-pre>14</code>。</p>
<p>“先行否定断言”中，括号里的部分是不会返回的。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var m = 'abd'.match(/b(?!c)/);
m // ['b']
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码使用了先行否定断言，<code v-pre>b</code>不在<code v-pre>c</code>前面所以被匹配，而且括号对应的<code v-pre>d</code>不会被返回。</p>
<h2 id="十一、json对象" tabindex="-1"><a class="header-anchor" href="#十一、json对象" aria-hidden="true">#</a> 十一、JSON对象</h2>
<h2 id="_1、json-格式" tabindex="-1"><a class="header-anchor" href="#_1、json-格式" aria-hidden="true">#</a> 1、JSON 格式</h2>
<p>JSON 格式（JavaScript Object Notation 的缩写）是一种用于数据交换的文本格式，2001年由 Douglas Crockford 提出，目的是取代繁琐笨重的 XML 格式。</p>
<p>相比 XML 格式，JSON 格式有两个显著的优点：书写简单，一目了然；符合 JavaScript 原生语法，可以由解释引擎直接处理，不用另外添加解析代码。所以，JSON 迅速被接受，已经成为各大网站交换数据的标准格式，并被写入标准。</p>
<p><strong>每个 JSON 对象就是一个值，可能是一个数组或对象，也可能是一个原始类型的值</strong>。总之，<strong>只能是一个值</strong>，不能是两个或更多的值。</p>
<p>JSON 对值的类型和格式有严格的<strong>规定</strong>。</p>
<blockquote>
<ol>
<li>复合类型的值只能是数组或对象，不能是函数、正则表达式对象、日期对象。</li>
<li>原始类型的值只有四种：字符串、数值（必须以十进制表示）、布尔值和<code v-pre>null</code>（不能使用<code v-pre>NaN</code>, <code v-pre>Infinity</code>, <code v-pre>-Infinity</code>和<code v-pre>undefined</code>）。</li>
<li>字符串必须使用双引号表示，不能使用单引号。</li>
<li>对象的键名必须放在双引号里面。</li>
<li>数组或对象最后一个成员的后面，不能加逗号。</li>
</ol>
</blockquote>
<p>以下都是合法的 JSON。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>[&quot;one&quot;, &quot;two&quot;, &quot;three&quot;]

{ &quot;one&quot;: 1, &quot;two&quot;: 2, &quot;three&quot;: 3 }

{&quot;names&quot;: [&quot;张三&quot;, &quot;李四&quot;] }

[ { &quot;name&quot;: &quot;张三&quot;}, {&quot;name&quot;: &quot;李四&quot;} ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以下都是不合法的 JSON。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>{ name: &quot;张三&quot;, 'age': 32 }  // 属性名必须使用双引号

[32, 64, 128, 0xFFF] // 不能使用十六进制值

{ &quot;name&quot;: &quot;张三&quot;, &quot;age&quot;: undefined } // 不能使用 undefined

{ &quot;name&quot;: &quot;张三&quot;,
  &quot;birthday&quot;: new Date('Fri, 26 Aug 2011 07:13:10 GMT'),
  &quot;getName&quot;: function () {
      return this.name;
  }
} // 属性值不能使用函数和日期对象
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意，<code v-pre>null</code>、空数组和空对象都是合法的 JSON 值。</strong></p>
<h2 id="_2、json-对象" tabindex="-1"><a class="header-anchor" href="#_2、json-对象" aria-hidden="true">#</a> 2、JSON 对象</h2>
<p><code v-pre>JSON</code>对象是 JavaScript 的原生对象，用来处理 JSON 格式数据。它有两个静态方法：<code v-pre>JSON.stringify()</code>和<code v-pre>JSON.parse()</code>。</p>
<h2 id="_3、json-stringify-转为json字符串" tabindex="-1"><a class="header-anchor" href="#_3、json-stringify-转为json字符串" aria-hidden="true">#</a> 3、JSON.stringify() 转为JSON字符串</h2>
<h3 id="_3-1-基本用法" tabindex="-1"><a class="header-anchor" href="#_3-1-基本用法" aria-hidden="true">#</a> 3.1 基本用法</h3>
<p><code v-pre>JSON.stringify</code>方法用于<strong>将一个值转为 JSON 字符串</strong>。该字符串符合 JSON 格式，并且可以被<code v-pre>JSON.parse</code>方法还原。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 单个字符串、数值、布尔值、null、空数组、空对象，都是合法json格式。
JSON.stringify('abc') // &quot;&quot;abc&quot;&quot; 注意：字符串会转json字符串会有两对双引号
JSON.stringify(1) // &quot;1&quot;
JSON.stringify(false) // &quot;false&quot;
JSON.stringify(null) // &quot;null&quot;
JSON.stringify([]) // &quot;[]&quot;
JSON.stringify({}) // &quot;{}&quot;

JSON.stringify([1, &quot;false&quot;, false])
// '[1,&quot;false&quot;,false]'

JSON.stringify({ name: &quot;张三&quot; })
// '{&quot;name&quot;:&quot;张三&quot;}'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码将各种类型的值，转成 JSON 字符串。</p>
<p>注意，<strong>对于原始类型的字符串，转换结果会带双引号</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>JSON.stringify('foo') === &quot;foo&quot; // false
JSON.stringify('foo') === &quot;\&quot;foo\&quot;&quot; // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，字符串<code v-pre>foo</code>，被转成了<code v-pre>&quot;\&quot;foo\&quot;&quot;</code>。这是因为将来还原的时候，内层双引号可以让 JavaScript 引擎知道，这是一个字符串，而不是其他类型的值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>JSON.stringify(false) // &quot;false&quot;
JSON.stringify('false') // &quot;\&quot;false\&quot;&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，如果不是内层的双引号，将来还原的时候，引擎就无法知道原始值是布尔值还是字符串。</p>
<p><strong>如果对象的属性是<code v-pre>undefined</code>、函数或 XML 对象，该属性会被<code v-pre>JSON.stringify</code>过滤</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = {
  a: undefined,
  b: function () {}
};

JSON.stringify(obj) // &quot;{}&quot; 对象属性是undefined、函数或 XML 对象会被过滤掉
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，对象<code v-pre>obj</code>的<code v-pre>a</code>属性是<code v-pre>undefined</code>，而<code v-pre>b</code>属性是一个函数，结果都被<code v-pre>JSON.stringify</code>过滤。</p>
<p><strong>如果数组的成员是<code v-pre>undefined</code>、函数或 XML 对象，则这些值被转成<code v-pre>null</code>。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var arr = [undefined, function () {}];
JSON.stringify(arr) // &quot;[null,null]&quot; 数组成员是undefined、函数或 XML 对象会被转成null
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，数组<code v-pre>arr</code>的成员是<code v-pre>undefined</code>和函数，它们都被转成了<code v-pre>null</code>。</p>
<p><strong>正则对象会被转成空对象</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>JSON.stringify(/foo/) // &quot;{}&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>JSON.stringify</code>方法会<strong>忽略对象的不可遍历的属性</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = {};
Object.defineProperties(obj, {
  'foo': {
    value: 1,
    enumerable: true
  },
  'bar': {
    value: 2,
    enumerable: false
  }
});

JSON.stringify(obj); // &quot;{&quot;foo&quot;:1}&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>bar</code>是<code v-pre>obj</code>对象的不可遍历属性，<code v-pre>JSON.stringify</code>方法会忽略这个属性。</p>
<h3 id="_3-2-第二个参数-一个数组-对象属性白名单-或一个函数-改写返回值" tabindex="-1"><a class="header-anchor" href="#_3-2-第二个参数-一个数组-对象属性白名单-或一个函数-改写返回值" aria-hidden="true">#</a> 3.2 第二个参数 （一个数组，对象属性白名单；或一个函数，改写返回值）</h3>
<p><code v-pre>JSON.stringify</code>方法还<strong>可以接受一个数组，作为第二个参数，指定需要转成字符串的属性</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = {
  'prop1': 'value1',
  'prop2': 'value2',
  'prop3': 'value3'
};

var selectedProperties = ['prop1', 'prop2']; // 指定prop1、prop2属性转成字符串

JSON.stringify(obj, selectedProperties)
// &quot;{&quot;prop1&quot;:&quot;value1&quot;,&quot;prop2&quot;:&quot;value2&quot;}&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>JSON.stringify</code>方法的第二个参数指定，只转<code v-pre>prop1</code>和<code v-pre>prop2</code>两个属性。</p>
<p>这个<strong>类似白名单的数组，只对对象的属性有效，对数组无效。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>JSON.stringify(['a', 'b'], ['0'])
// &quot;[&quot;a&quot;,&quot;b&quot;]&quot;

JSON.stringify({0: 'a', 1: 'b'}, ['0'])
// &quot;{&quot;0&quot;:&quot;a&quot;}&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，第二个参数指定 JSON 格式只转<code v-pre>0</code>号属性，实际上对数组是无效的，只对对象有效。</p>
<p>第二个参数还<strong>可以是一个函数</strong>，用来更改<code v-pre>JSON.stringify</code>的返回值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function f(key, value) { // 接收两个参数：键名、键值
  if (typeof value === &quot;number&quot;) {
    value = 2 * value;
  }
  return value;
}

JSON.stringify({ a: 1, b: 2 }, f)
// '{&quot;a&quot;: 2,&quot;b&quot;: 4}'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中的<code v-pre>f</code>函数，<strong>接受两个参数</strong>，分别是被转换的对象的<strong>键名和键值</strong>。如果键值是数值，就将它乘以<code v-pre>2</code>，否则就原样返回。</p>
<p>注意，这个处理函数是<strong>递归处理所有的键</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var o = {a: {b: 1}};

function f(key, value) { // 每一次处理的对象，都是前一次返回的值
  console.log(&quot;[&quot;+ key +&quot;]:&quot; + value);
  return value;
}

JSON.stringify(o, f)
// []:[object Object]  第一次键名 空，键值是o整个对象
// [a]:[object Object] 第二次键名 a，键值是{b:1}
// [b]:1               第三次键名 b，键值是 1
// '{&quot;a&quot;:{&quot;b&quot;:1}}'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，对象<code v-pre>o</code>一共会被<code v-pre>f</code>函数处理三次，最后那行是<code v-pre>JSON.stringify</code>的输出。第一次键名为空，键值是整个对象<code v-pre>o</code>；第二次键名为<code v-pre>a</code>，键值是<code v-pre>{b: 1}</code>；第三次键名为<code v-pre>b</code>，键值为1。</p>
<p>递归处理中，<strong>每一次处理的对象，都是前一次返回的值</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var o = {a: 1};

function f(key, value) {
  if (typeof value === 'object') {
    return {b: 2};
  }
  return value * 2;
}

JSON.stringify(o, f)
// &quot;{&quot;b&quot;: 4}&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>f</code>函数修改了对象<code v-pre>o</code>，接着<code v-pre>JSON.stringify</code>方法就递归处理修改后的对象<code v-pre>o</code>。</p>
<p>如果<strong>处理函数返回<code v-pre>undefined</code>或没有返回值，则该属性会被忽略</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function f(key, value) {
  if (typeof(value) === &quot;string&quot;) {
    return undefined;
  }
  return value;
}

JSON.stringify({ a: &quot;abc&quot;, b: 123 }, f)
// '{&quot;b&quot;: 123}'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>a</code>属性经过处理后，返回<code v-pre>undefined</code>，于是该属性被忽略了。</p>
<h3 id="_3-3-第三个参数-增加返回json字符串的可读性-json格式" tabindex="-1"><a class="header-anchor" href="#_3-3-第三个参数-增加返回json字符串的可读性-json格式" aria-hidden="true">#</a> 3.3 第三个参数 （增加返回JSON字符串的可读性；json格式）</h3>
<p><code v-pre>JSON.stringify</code>还可以接受第三个参数，用于<strong>增加返回的 JSON 字符串的可读性</strong>。如果是数字，表示每个属性前面添加的空格（最多不超过10个）；如果是字符串（不超过10个字符），则该字符串会添加在每行前面。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>JSON.stringify({ p1: 1, p2: 2 }, null, 2);
/*
&quot;{
  &quot;p1&quot;: 1,
  &quot;p2&quot;: 2
}&quot;
*/
// 参数三是数值在使用JSON.parse()解析时正常



JSON.stringify({ p1:1, p2:2 }, null, '|-');
/*
&quot;{
|-&quot;p1&quot;: 1,
|-&quot;p2&quot;: 2
}&quot;
*/
// 参数三是字符串在使用JSON.parse()解析时报错
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4-参数对象的-tojson-方法-对象自定义tojson方法-转字符串只取该方法返回值" tabindex="-1"><a class="header-anchor" href="#_3-4-参数对象的-tojson-方法-对象自定义tojson方法-转字符串只取该方法返回值" aria-hidden="true">#</a> 3.4 参数对象的 toJSON 方法（对象自定义toJSON方法，转字符串只取该方法返回值）</h3>
<p>如果参数对象有自定义的<code v-pre>toJSON</code>方法，那么<code v-pre>JSON.stringify</code>会<strong>使用这个方法的返回值作为参数，而忽略原对象的其他属性</strong>。</p>
<p>下面是一个普通的对象。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var user = {
  firstName: '三',
  lastName: '张',

  get fullName(){
    return this.lastName + this.firstName;
  }
};

JSON.stringify(user)
// &quot;{&quot;firstName&quot;:&quot;三&quot;,&quot;lastName&quot;:&quot;张&quot;,&quot;fullName&quot;:&quot;张三&quot;}&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，为这个对象加上<code v-pre>toJSON</code>方法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var user = {
  firstName: '三',
  lastName: '张',

  get fullName(){
    return this.lastName + this.firstName;
  },

  toJSON: function () { // 只使用toJSON的返回值作为参数，忽略user对象的其他参数
    return {
      name: this.lastName + this.firstName
    };
  }
};

JSON.stringify(user)
// &quot;{&quot;name&quot;:&quot;张三&quot;}&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>JSON.stringify</code>发现参数对象有<code v-pre>toJSON</code>方法，就直接使用这个方法的返回值作为参数，而<strong>忽略原对象的其他参数</strong>。</p>
<p><code v-pre>Date</code>对象就有一个自己的<code v-pre>toJSON</code>方法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var date = new Date('2015-01-01');
date.toJSON() // &quot;2015-01-01T00:00:00.000Z&quot;
JSON.stringify(date) // &quot;&quot;2015-01-01T00:00:00.000Z&quot;&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>JSON.stringify</code>发现处理的是<code v-pre>Date</code>对象实例，就会调用这个实例对象的<code v-pre>toJSON</code>方法，将该方法的返回值作为参数。</p>
<p><code v-pre>toJSON</code>方法的一个应用是，<strong>将正则对象自动转为字符串</strong>。因为<code v-pre>JSON.stringify</code>默认不能转换正则对象，但是设置了<code v-pre>toJSON</code>方法以后，就可以转换正则对象了。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = {
  reg: /foo/
};

// 不设置 toJSON 方法时
JSON.stringify(obj) // &quot;{&quot;reg&quot;:{}}&quot;

// 设置 toJSON 方法时
RegExp.prototype.toJSON = RegExp.prototype.toString;
JSON.stringify(/foo/) // &quot;&quot;/foo/&quot;&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码在正则对象的原型上面部署了<code v-pre>toJSON()</code>方法，将其指向<code v-pre>toString()</code>方法，因此转换成 JSON 格式时，正则对象就先调用<code v-pre>toJSON()</code>方法转为字符串，然后再被<code v-pre>JSON.stringify()</code>方法处理。</p>
<h2 id="_4、json-parse" tabindex="-1"><a class="header-anchor" href="#_4、json-parse" aria-hidden="true">#</a> 4、JSON.parse()</h2>
<p><code v-pre>JSON.parse</code>方法<strong>用于将 JSON 字符串转换成对应的JSON值</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>JSON.parse('{}') // {}
JSON.parse('true') // true
JSON.parse('&quot;foo&quot;') // &quot;foo&quot;
JSON.parse('[1, 5, &quot;false&quot;]') // [1, 5, &quot;false&quot;]
JSON.parse('null') // null

var o = JSON.parse('{&quot;name&quot;: &quot;张三&quot;}');
o.name // 张三
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果传入的字符串不是有效的 JSON 格式，<code v-pre>JSON.parse</code>方法将报错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>JSON.parse(&quot;'String'&quot;) // illegal single quotes
// SyntaxError: Unexpected token ILLEGAL
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，双引号字符串中是一个单引号字符串，因为单引号字符串不符合 JSON 格式，所以报错。</p>
<p>为了<strong>处理解析错误</strong>，可以将<code v-pre>JSON.parse</code>方法放在<code v-pre>try...catch</code>代码块中。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>try {
  JSON.parse(&quot;'String'&quot;);
} catch(e) {
  console.log('parsing error');
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>JSON.parse</code>方法<strong>可以接受一个处理函数，作为第二个参数，用法与<code v-pre>JSON.stringify</code>方法类似</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function f(key, value) {// 参数：键名、键值
  if (key === 'a') {
    return value + 10;
  }
  return value;
}

JSON.parse('{&quot;a&quot;: 1, &quot;b&quot;: 2}', f)
// {a: 11, b: 2}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>JSON.parse</code>的第二个参数是一个函数，如果键名是<code v-pre>a</code>，该函数会将键值加上10。</p>
<h2 id="文档" tabindex="-1"><a class="header-anchor" href="#文档" aria-hidden="true">#</a> 文档</h2>
<p>学习文档：<a href="https://wangdoc.com/javascript/" target="_blank" rel="noopener noreferrer">https://wangdoc.com/javascript/</a></p>
</div></template>
