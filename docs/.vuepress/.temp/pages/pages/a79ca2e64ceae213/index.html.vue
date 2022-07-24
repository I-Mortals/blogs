<template><div><h1 id="module-的加载实现" tabindex="-1"><a class="header-anchor" href="#module-的加载实现" aria-hidden="true">#</a> Module 的加载实现</h1>
<p>上一章介绍了模块的语法，本章介绍如何在浏览器和 Node.js 之中加载 ES6 模块，以及实际开发中经常遇到的一些问题（比如循环加载）。</p>
<!-- more -->
<h2 id="浏览器加载" tabindex="-1"><a class="header-anchor" href="#浏览器加载" aria-hidden="true">#</a> 浏览器加载</h2>
<h3 id="传统方法" tabindex="-1"><a class="header-anchor" href="#传统方法" aria-hidden="true">#</a> 传统方法</h3>
<p>HTML 网页中，浏览器通过<code v-pre>&lt;script&gt;</code>标签加载 JavaScript 脚本。</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;!-- 页面内嵌的脚本 --&gt;
&lt;script type=&quot;application/javascript&quot;&gt;
  // module code
&lt;/script&gt;

&lt;!-- 外部脚本 --&gt;
&lt;script type=&quot;application/javascript&quot; src=&quot;path/to/myModule.js&quot;&gt;
&lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，由于浏览器脚本的默认语言是 JavaScript，因此<code v-pre>type=&quot;application/javascript&quot;</code>可以省略。</p>
<p>默认情况下，浏览器是同步加载 JavaScript 脚本，即渲染引擎遇到<code v-pre>&lt;script&gt;</code>标签就会停下来，等到执行完脚本，再继续向下渲染。如果是外部脚本，还必须加入脚本下载的时间。</p>
<p>如果脚本体积很大，下载和执行的时间就会很长，因此造成浏览器堵塞，用户会感觉到浏览器“卡死”了，没有任何响应。这显然是很不好的体验，所以浏览器允许脚本异步加载，下面就是两种异步加载的语法。</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;script src=&quot;path/to/myModule.js&quot; defer&gt;&lt;/script&gt;
&lt;script src=&quot;path/to/myModule.js&quot; async&gt;&lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>&lt;script&gt;</code>标签打开<code v-pre>defer</code>或<code v-pre>async</code>属性，脚本就会异步加载。渲染引擎遇到这一行命令，就会开始下载外部脚本，但不会等它下载和执行，而是直接执行后面的命令。</p>
<p><code v-pre>defer</code>与<code v-pre>async</code>的区别是：<code v-pre>defer</code>要等到整个页面在内存中正常渲染结束（DOM 结构完全生成，以及其他脚本执行完成），才会执行；<code v-pre>async</code>一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。一句话，<strong><code v-pre>defer</code>是“渲染完再执行”，<code v-pre>async</code>是“下载完就执行”</strong>。另外，如果有多个<code v-pre>defer</code>脚本，会按照它们在页面出现的顺序加载，而多个<code v-pre>async</code>脚本是不能保证加载顺序的。</p>
<h3 id="加载规则" tabindex="-1"><a class="header-anchor" href="#加载规则" aria-hidden="true">#</a> 加载规则</h3>
<p>浏览器加载 ES6 模块，也使用<code v-pre>&lt;script&gt;</code>标签，但是要加入<code v-pre>type=&quot;module&quot;</code>属性。</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;script type=&quot;module&quot; src=&quot;./foo.js&quot;&gt;&lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码在网页中插入一个模块<code v-pre>foo.js</code>，由于<code v-pre>type</code>属性设为<code v-pre>module</code>，所以浏览器知道这是一个 ES6 模块。</p>
<p>浏览器对于<strong>带有<code v-pre>type=&quot;module&quot;</code>的<code v-pre>&lt;script&gt;</code>，都是异步加载</strong>，不会造成堵塞浏览器，即等到整个页面渲染完，再执行模块脚本，<strong>等同于打开了<code v-pre>&lt;script&gt;</code>标签的<code v-pre>defer</code>属性。</strong></p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;script type=&quot;module&quot; src=&quot;./foo.js&quot;&gt;&lt;/script&gt;
&lt;!-- 等同于 --&gt;
&lt;script type=&quot;module&quot; src=&quot;./foo.js&quot; defer&gt;&lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果网页有多个<code v-pre>&lt;script type=&quot;module&quot;&gt;</code>，它们会按照在页面出现的顺序依次执行。</p>
<p><code v-pre>&lt;script&gt;</code>标签的<code v-pre>async</code>属性也可以打开，这时只要加载完成，渲染引擎就会中断渲染立即执行。执行完成后，再恢复渲染。</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;script type=&quot;module&quot; src=&quot;./foo.js&quot; async&gt;&lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>一旦使用了<code v-pre>async</code>属性，<code v-pre>&lt;script type=&quot;module&quot;&gt;</code>就不会按照在页面出现的顺序执行，而是只要该模块加载完成，就执行该模块。</p>
<p>ES6 模块也允许内嵌在网页中，语法行为与加载外部脚本完全一致。</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;script type=&quot;module&quot;&gt;
  import utils from &quot;./utils.js&quot;;

  // other code
&lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>举例来说，jQuery 就支持模块加载。</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;script type=&quot;module&quot;&gt;
  import $ from &quot;./jquery/src/jquery.js&quot;;
  $('#message').text('Hi from jQuery!');
&lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于外部的模块脚本（上例是<code v-pre>foo.js</code>），有几点需要注意。</p>
<ul>
<li>代码是<strong>在模块作用域之中运行</strong>，而不是在全局作用域运行。模块内部的顶层变量，外部不可见。</li>
<li>模块脚本<strong>自动采用严格模式</strong>，不管有没有声明<code v-pre>use strict</code>。</li>
<li>模块之中，可以使用<code v-pre>import</code>命令加载其他模块（<code v-pre>.js</code>后缀不可省略，需要提供绝对 URL 或相对 URL），也可以使用<code v-pre>export</code>命令输出对外接口。</li>
<li>模块之中，<strong>顶层的<code v-pre>this</code>关键字返回<code v-pre>undefined</code></strong>，而不是指向<code v-pre>window</code>。也就是说，在模块顶层使用<code v-pre>this</code>关键字，是无意义的。</li>
<li>同一个模块如果加载多次，将只执行一次。</li>
</ul>
<p>下面是一个示例模块。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>import utils from 'https://example.com/js/utils.js';

const x = 1;

console.log(x === window.x); //false
console.log(this === undefined); // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>利用顶层的<code v-pre>this</code>等于<code v-pre>undefined</code>这个语法点，可以侦测当前代码是否在 ES6 模块之中。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const isNotModuleScript = this !== undefined;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="es6-模块与-commonjs-模块的差异" tabindex="-1"><a class="header-anchor" href="#es6-模块与-commonjs-模块的差异" aria-hidden="true">#</a> ES6 模块与 CommonJS 模块的差异</h2>
<p>讨论 Node.js 加载 ES6 模块之前，必须了解 ES6 模块与 CommonJS 模块完全不同。</p>
<p>它们有<strong>两个重大差异</strong>。</p>
<ul>
<li><strong>CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。</strong></li>
<li><strong>CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。</strong></li>
</ul>
<p>第二个差异是因为 CommonJS 加载的是一个对象（即<code v-pre>module.exports</code>属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。</p>
<p>下面重点解释第一个差异。</p>
<p>CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。请看下面这个模块文件<code v-pre>lib.js</code>的例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码输出内部变量<code v-pre>counter</code>和改写这个变量的内部方法<code v-pre>incCounter</code>。然后，在<code v-pre>main.js</code>里面加载这个模块。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// main.js
var mod = require('./lib');

console.log(mod.counter);  // 3
mod.incCounter();
console.log(mod.counter); // 3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码说明，<code v-pre>lib.js</code>模块加载以后，它的内部变化就影响不到输出的<code v-pre>mod.counter</code>了。这是因为<code v-pre>mod.counter</code>是一个原始类型的值，会被缓存。除非写成一个函数，才能得到内部变动后的值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  get counter() {
    return counter
  },
  incCounter: incCounter,
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，输出的<code v-pre>counter</code>属性实际上是一个取值器函数。现在再执行<code v-pre>main.js</code>，就可以正确读取内部变量<code v-pre>counter</code>的变动了。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ node main.js
3
4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令<code v-pre>import</code>，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。换句话说，ES6 的<code v-pre>import</code>有点像 Unix 系统的“符号连接”，原始值变了，<code v-pre>import</code>加载的值也会跟着变。因此，<strong>ES6 模块是动态引用，并且不会缓存值</strong>，模块里面的变量绑定其所在的模块。</p>
<p>还是举上面的例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// lib.js
export let counter = 3;
export function incCounter() {
  counter++;
}

// main.js
import { counter, incCounter } from './lib';
console.log(counter); // 3
incCounter();
console.log(counter); // 4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码说明，ES6 模块输入的变量<code v-pre>counter</code>是活的，完全反应其所在模块<code v-pre>lib.js</code>内部的变化。</p>
<p>再举一个出现在<code v-pre>export</code>一节中的例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// m1.js
export var foo = 'bar';
setTimeout(() =&gt; foo = 'baz', 500);

// m2.js
import {foo} from './m1.js';
console.log(foo);
setTimeout(() =&gt; console.log(foo), 500);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>m1.js</code>的变量<code v-pre>foo</code>，在刚加载时等于<code v-pre>bar</code>，过了 500 毫秒，又变为等于<code v-pre>baz</code>。</p>
<p>让我们看看，<code v-pre>m2.js</code>能否正确读取这个变化。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ babel-node m2.js

bar
baz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码表明，ES6 模块不会缓存运行结果，而是动态地去被加载的模块取值，并且变量总是绑定其所在的模块。</p>
<p>由于 ES6 输入的模块变量，只是一个“符号连接”，所以<strong>这个变量是只读的，对它进行重新赋值会报错</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// lib.js
export let obj = {};

// main.js
import { obj } from './lib';

obj.prop = 123; // OK
obj = {}; // TypeError
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>main.js</code>从<code v-pre>lib.js</code>输入变量<code v-pre>obj</code>，可以对<code v-pre>obj</code>添加属性，但是重新赋值就会报错。因为变量<code v-pre>obj</code>指向的地址是只读的，不能重新赋值，这就好比<code v-pre>main.js</code>创造了一个名为<code v-pre>obj</code>的<code v-pre>const</code>变量。</p>
<p>最后，<code v-pre>export</code>通过接口，输出的是同一个值。不同的脚本加载这个接口，得到的都是同样的实例。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// mod.js
function C() {
  this.sum = 0;
  this.add = function () {
    this.sum += 1;
  };
  this.show = function () {
    console.log(this.sum);
  };
}

export let c = new C();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的脚本<code v-pre>mod.js</code>，输出的是一个<code v-pre>C</code>的实例。不同的脚本加载这个模块，得到的都是同一个实例。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// x.js
import {c} from './mod';
c.add();

// y.js
import {c} from './mod';
c.show();

// main.js
import './x';
import './y';
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在执行<code v-pre>main.js</code>，输出的是<code v-pre>1</code>。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ babel-node main.js
1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这就证明了<code v-pre>x.js</code>和<code v-pre>y.js</code>加载的都是<code v-pre>C</code>的同一个实例。</p>
<h2 id="node-js-加载" tabindex="-1"><a class="header-anchor" href="#node-js-加载" aria-hidden="true">#</a> Node.js 加载</h2>
<h3 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h3>
<p>Node.js 对 ES6 模块的处理比较麻烦，因为它有自己的 CommonJS 模块格式，与 ES6 模块格式是不兼容的。目前的解决方案是，将两者分开，ES6 模块和 CommonJS 采用各自的加载方案。从 v13.2 版本开始，Node.js 已经默认打开了 ES6 模块支持。</p>
<p>Node.js 要求 ES6 模块<strong>采用<code v-pre>.mjs</code>后缀文件名</strong>。也就是说，只要脚本文件里面使用<code v-pre>import</code>或者<code v-pre>export</code>命令，那么就必须采用<code v-pre>.mjs</code>后缀名。Node.js 遇到<code v-pre>.mjs</code>文件，就认为它是 ES6 模块，默认启用严格模式，不必在每个模块文件顶部指定<code v-pre>&quot;use strict&quot;</code>。</p>
<p><strong>如果不希望将后缀名改成<code v-pre>.mjs</code>，可以在项目的<code v-pre>package.json</code>文件中，指定<code v-pre>type</code>字段为<code v-pre>module</code>。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>{
   &quot;type&quot;: &quot;module&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一旦设置了以后，该目录里面的 JS 脚本，就被解释用 ES6 模块。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code># 解释成 ES6 模块
$ node my-app.js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果这时还要使用 CommonJS 模块，那么<strong>需要将 CommonJS 脚本的后缀名都改成<code v-pre>.cjs</code>。如果没有<code v-pre>type</code>字段，或者<code v-pre>type</code>字段为<code v-pre>commonjs</code>，则<code v-pre>.js</code>脚本会被解释成 CommonJS 模块</strong>。</p>
<p>总结为一句话：<strong><code v-pre>.mjs</code>文件总是以 ES6 模块加载，<code v-pre>.cjs</code>文件总是以 CommonJS 模块加载，<code v-pre>.js</code>文件的加载取决于<code v-pre>package.json</code>里面<code v-pre>type</code>字段的设置</strong>。</p>
<p>注意，ES6 模块与 CommonJS 模块尽量<strong>不要混用</strong>。<code v-pre>require</code>命令不能加载<code v-pre>.mjs</code>文件，会报错，只有<code v-pre>import</code>命令才可以加载<code v-pre>.mjs</code>文件。反过来，<code v-pre>.mjs</code>文件里面也不能使用<code v-pre>require</code>命令，必须使用<code v-pre>import</code>。</p>
<h3 id="main-字段" tabindex="-1"><a class="header-anchor" href="#main-字段" aria-hidden="true">#</a> main 字段</h3>
<p><code v-pre>package.json</code>文件有两个字段可以指定模块的入口文件：<code v-pre>main</code>和<code v-pre>exports</code>。比较简单的模块，可以只使用<code v-pre>main</code>字段，指定模块加载的入口文件。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// ./node_modules/es-module-package/package.json
{
  &quot;type&quot;: &quot;module&quot;,
  &quot;main&quot;: &quot;./src/index.js&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码指定项目的入口脚本为<code v-pre>./src/index.js</code>，它的格式为 ES6 模块。如果没有<code v-pre>type</code>字段，<code v-pre>index.js</code>就会被解释为 CommonJS 模块。</p>
<p>然后，<code v-pre>import</code>命令就可以加载这个模块。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// ./my-app.mjs

import { something } from 'es-module-package';
// 实际加载的是 ./node_modules/es-module-package/src/index.js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<strong>运行该脚本以后，Node.js 就会到<code v-pre>./node_modules</code>目录下面，寻找<code v-pre>es-module-package</code>模块，然后根据该模块<code v-pre>package.json</code>的<code v-pre>main</code>字段去执行入口文件。</strong></p>
<p>这时，如果用 CommonJS 模块的<code v-pre>require()</code>命令去加载<code v-pre>es-module-package</code>模块会报错，因为 CommonJS 模块不能处理<code v-pre>export</code>命令。</p>
<h3 id="exports-字段" tabindex="-1"><a class="header-anchor" href="#exports-字段" aria-hidden="true">#</a> exports 字段</h3>
<p><strong><code v-pre>exports</code>字段的优先级高于<code v-pre>main</code>字段</strong>。它有多种用法。</p>
<p>（1）<strong>子目录别名</strong></p>
<p><code v-pre>package.json</code>文件的<code v-pre>exports</code>字段可以指定脚本或子目录的别名。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// ./node_modules/es-module-package/package.json
{
  &quot;exports&quot;: {
    &quot;./submodule&quot;: &quot;./src/submodule.js&quot;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码指定<code v-pre>src/submodule.js</code>别名为<code v-pre>submodule</code>，然后就可以从别名加载这个文件。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>import submodule from 'es-module-package/submodule';
// 加载 ./node_modules/es-module-package/src/submodule.js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>下面是子目录别名的例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// ./node_modules/es-module-package/package.json
{
  &quot;exports&quot;: {
    &quot;./features/&quot;: &quot;./src/features/&quot;
  }
}

import feature from 'es-module-package/features/x.js';
// 加载 ./node_modules/es-module-package/src/features/x.js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果没有指定别名，就不能用“模块+脚本名”这种形式加载脚本。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 报错
import submodule from 'es-module-package/private-module.js';

// 不报错
import submodule from './node_modules/es-module-package/private-module.js';
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（2）main 的别名</p>
<p><code v-pre>exports</code>字段的别名如果是<code v-pre>.</code>，就代表模块的主入口，优先级高于<code v-pre>main</code>字段，并且可以直接简写成<code v-pre>exports</code>字段的值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>{
  &quot;exports&quot;: {
    &quot;.&quot;: &quot;./main.js&quot;
  }
}

// 等同于
{
  &quot;exports&quot;: &quot;./main.js&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>由于<code v-pre>exports</code>字段只有支持 ES6 的 Node.js 才认识，所以可以用来兼容旧版本的 Node.js</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>{
  &quot;main&quot;: &quot;./main-legacy.cjs&quot;,
  &quot;exports&quot;: {
    &quot;.&quot;: &quot;./main-modern.cjs&quot;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，老版本的 Node.js （不支持 ES6 模块）的入口文件是<code v-pre>main-legacy.cjs</code>，新版本的 Node.js 的入口文件是<code v-pre>main-modern.cjs</code>。</p>
<p><strong>（3）条件加载</strong></p>
<p>利用<code v-pre>.</code>这个别名，可以为 ES6 模块和 CommonJS 指定不同的入口。目前，这个功能需要在 Node.js 运行的时候，打开<code v-pre>--experimental-conditional-exports</code>标志。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>{
  &quot;type&quot;: &quot;module&quot;,
  &quot;exports&quot;: {
    &quot;.&quot;: {
      &quot;require&quot;: &quot;./main.cjs&quot;,
      &quot;default&quot;: &quot;./main.js&quot;
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，别名<code v-pre>.</code>的<code v-pre>require</code>条件指定<code v-pre>require()</code>命令的入口文件（即 CommonJS 的入口），<code v-pre>default</code>条件指定其他情况的入口（即 ES6 的入口）。</p>
<p>上面的写法可以简写如下。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>{
  &quot;exports&quot;: {
    &quot;require&quot;: &quot;./main.cjs&quot;,
    &quot;default&quot;: &quot;./main.js&quot;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，如果同时还有其他别名，就不能采用简写，否则或报错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>{
  // 报错
  &quot;exports&quot;: {
    &quot;./feature&quot;: &quot;./lib/feature.js&quot;,
    &quot;require&quot;: &quot;./main.cjs&quot;,
    &quot;default&quot;: &quot;./main.js&quot;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="es6-模块加载-commonjs-模块" tabindex="-1"><a class="header-anchor" href="#es6-模块加载-commonjs-模块" aria-hidden="true">#</a> ES6 模块加载 CommonJS 模块</h3>
<p>目前，一个模块同时支持 ES6 和 CommonJS 两种格式的常见方法是，<code v-pre>package.json</code>文件的<code v-pre>main</code>字段指定 CommonJS 入口，给 Node.js 使用；<code v-pre>module</code>字段指定 ES6 模块入口，给打包工具使用，因为 Node.js 不认识<code v-pre>module</code>字段。</p>
<p>有了上一节的条件加载以后，Node.js 本身就可以同时处理两种模块。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// ./node_modules/pkg/package.json
{
  &quot;type&quot;: &quot;module&quot;,
  &quot;main&quot;: &quot;./index.cjs&quot;,
  &quot;exports&quot;: {
    &quot;require&quot;: &quot;./index.cjs&quot;,
    &quot;default&quot;: &quot;./wrapper.mjs&quot;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码指定了 CommonJS 入口文件<code v-pre>index.cjs</code>，下面是这个文件的代码。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// ./node_modules/pkg/index.cjs
exports.name = 'value';
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，ES6 模块可以加载这个文件。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// ./node_modules/pkg/wrapper.mjs
import cjsModule from './index.cjs';
export const name = cjsModule.name;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，<code v-pre>import</code>命令加载 CommonJS 模块，只能整体加载，不能只加载单一的输出项。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 正确
import packageMain from 'commonjs-package';

// 报错
import { method } from 'commonjs-package';
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>还有一种变通的加载方法，就是使用 Node.js 内置的<code v-pre>module.createRequire()</code>方法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// cjs.cjs
module.exports = 'cjs';

// esm.mjs
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const cjs = require('./cjs.cjs');
cjs === 'cjs'; // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，ES6 模块通过<code v-pre>module.createRequire()</code>方法可以加载 CommonJS 模块</p>
<h3 id="commonjs-模块加载-es6-模块" tabindex="-1"><a class="header-anchor" href="#commonjs-模块加载-es6-模块" aria-hidden="true">#</a> CommonJS 模块加载 ES6 模块</h3>
<p>CommonJS 的<code v-pre>require</code>命令不能加载 ES6 模块，会报错，只能使用<code v-pre>import()</code>这个方法加载。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>(async () =&gt; {
  await import('./my-app.mjs');
})();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码可以在 CommonJS 模块中运行。</p>
<h3 id="node-js-的内置模块" tabindex="-1"><a class="header-anchor" href="#node-js-的内置模块" aria-hidden="true">#</a> Node.js 的内置模块</h3>
<p>Node.js 的内置模块可以整体加载，也可以加载指定的输出项。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 整体加载
import EventEmitter from 'events';
const e = new EventEmitter();

// 加载指定的输出项
import { readFile } from 'fs';
readFile('./foo.txt', (err, source) =&gt; {
  if (err) {
    console.error(err);
  } else {
    console.log(source);
  }
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="加载路径" tabindex="-1"><a class="header-anchor" href="#加载路径" aria-hidden="true">#</a> 加载路径</h3>
<p>ES6 模块的加载路径必须给出脚本的完整路径，不能省略脚本的后缀名。<code v-pre>import</code>命令和<code v-pre>package.json</code>文件的<code v-pre>main</code>字段如果省略脚本的后缀名，会报错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// ES6 模块中将报错
import { something } from './index';
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>为了与浏览器的<code v-pre>import</code>加载规则相同，Node.js 的<code v-pre>.mjs</code>文件支持 URL 路径。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>import './foo.mjs?query=1'; // 加载 ./foo 传入参数 ?query=1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码中，脚本路径带有参数<code v-pre>?query=1</code>，Node 会按 URL 规则解读。同一个脚本只要参数不同，就会被加载多次，并且保存成不同的缓存。由于这个原因，只要文件名中含有<code v-pre>:</code>、<code v-pre>%</code>、<code v-pre>#</code>、<code v-pre>?</code>等特殊字符，最好对这些字符进行转义。</p>
<p>目前，Node.js 的<code v-pre>import</code>命令只支持加载本地模块（<code v-pre>file:</code>协议）和<code v-pre>data:</code>协议，不支持加载远程模块。另外，脚本路径只支持相对路径，不支持绝对路径（即以<code v-pre>/</code>或<code v-pre>//</code>开头的路径）。</p>
<p>最后，Node 的<code v-pre>import</code>命令是异步加载，这一点与浏览器的处理方法相同。</p>
<h3 id="内部变量" tabindex="-1"><a class="header-anchor" href="#内部变量" aria-hidden="true">#</a> 内部变量</h3>
<p>ES6 模块应该是通用的，同一个模块不用修改，就可以用在浏览器环境和服务器环境。为了达到这个目标，Node 规定 ES6 模块之中不能使用 CommonJS 模块的特有的一些内部变量。</p>
<p>首先，就是<code v-pre>this</code>关键字。ES6 模块之中，顶层的<code v-pre>this</code>指向<code v-pre>undefined</code>；CommonJS 模块的顶层<code v-pre>this</code>指向当前模块，这是两者的一个重大差异。</p>
<p>其次，以下这些顶层变量在 ES6 模块之中都是不存在的。</p>
<ul>
<li><code v-pre>arguments</code></li>
<li><code v-pre>require</code></li>
<li><code v-pre>module</code></li>
<li><code v-pre>exports</code></li>
<li><code v-pre>__filename</code></li>
<li><code v-pre>__dirname</code></li>
</ul>
<h2 id="循环加载" tabindex="-1"><a class="header-anchor" href="#循环加载" aria-hidden="true">#</a> 循环加载</h2>
<p>“循环加载”（circular dependency）指的是，<code v-pre>a</code>脚本的执行依赖<code v-pre>b</code>脚本，而<code v-pre>b</code>脚本的执行又依赖<code v-pre>a</code>脚本。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// a.js
var b = require('b');

// b.js
var a = require('a');
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通常，“循环加载”表示存在强耦合，如果处理不好，还可能导致递归加载，使得程序无法执行，因此应该避免出现。</p>
<p>但是实际上，这是很难避免的，尤其是依赖关系复杂的大项目，很容易出现<code v-pre>a</code>依赖<code v-pre>b</code>，<code v-pre>b</code>依赖<code v-pre>c</code>，<code v-pre>c</code>又依赖<code v-pre>a</code>这样的情况。这意味着，模块加载机制必须考虑“循环加载”的情况。</p>
<p>对于 JavaScript 语言来说，目前最常见的两种模块格式 CommonJS 和 ES6，处理“循环加载”的方法是不一样的，返回的结果也不一样。</p>
<h3 id="commonjs-模块的加载原理" tabindex="-1"><a class="header-anchor" href="#commonjs-模块的加载原理" aria-hidden="true">#</a> CommonJS 模块的加载原理</h3>
<p>介绍 ES6 如何处理“循环加载”之前，先介绍目前最流行的 CommonJS 模块格式的加载原理。</p>
<p>CommonJS 的一个模块，就是一个脚本文件。<code v-pre>require</code>命令第一次加载该脚本，就会执行整个脚本，然后在内存生成一个对象。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>{
  id: '...',
  exports: { ... },
  loaded: true,
  ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码就是 Node 内部加载模块后生成的一个对象。该对象的<code v-pre>id</code>属性是模块名，<code v-pre>exports</code>属性是模块输出的各个接口，<code v-pre>loaded</code>属性是一个布尔值，表示该模块的脚本是否执行完毕。其他还有很多属性，这里都省略了。</p>
<p>以后需要用到这个模块的时候，就会到<code v-pre>exports</code>属性上面取值。即使再次执行<code v-pre>require</code>命令，也不会再次执行该模块，而是到缓存之中取值。也就是说，CommonJS 模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，就返回第一次运行的结果，除非手动清除系统缓存。</p>
<h3 id="commonjs-模块的循环加载" tabindex="-1"><a class="header-anchor" href="#commonjs-模块的循环加载" aria-hidden="true">#</a> CommonJS 模块的循环加载</h3>
<p>CommonJS 模块的重要特性是加载时执行，即脚本代码在<code v-pre>require</code>的时候，就会全部执行。一旦出现某个模块被&quot;循环加载&quot;，就只输出已经执行的部分，还未执行的部分不会输出。</p>
<p>让我们来看，Node <a href="https://nodejs.org/api/modules.html#modules_cycles" target="_blank" rel="noopener noreferrer">官方文档</a>里面的例子。脚本文件<code v-pre>a.js</code>代码如下。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>exports.done = false;
var b = require('./b.js');
console.log('在 a.js 之中，b.done = %j', b.done);
exports.done = true;
console.log('a.js 执行完毕');
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码之中，<code v-pre>a.js</code>脚本先输出一个<code v-pre>done</code>变量，然后加载另一个脚本文件<code v-pre>b.js</code>。注意，此时<code v-pre>a.js</code>代码就停在这里，等待<code v-pre>b.js</code>执行完毕，再往下执行。</p>
<p>再看<code v-pre>b.js</code>的代码。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>exports.done = false;
var a = require('./a.js');
console.log('在 b.js 之中，a.done = %j', a.done);
exports.done = true;
console.log('b.js 执行完毕');
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码之中，<code v-pre>b.js</code>执行到第二行，就会去加载<code v-pre>a.js</code>，这时，就发生了“循环加载”。系统会去<code v-pre>a.js</code>模块对应对象的<code v-pre>exports</code>属性取值，可是因为<code v-pre>a.js</code>还没有执行完，从<code v-pre>exports</code>属性只能取回已经执行的部分，而不是最后的值。</p>
<p><code v-pre>a.js</code>已经执行的部分，只有一行。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>exports.done = false;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>因此，对于<code v-pre>b.js</code>来说，它从<code v-pre>a.js</code>只输入一个变量<code v-pre>done</code>，值为<code v-pre>false</code>。</p>
<p>然后，<code v-pre>b.js</code>接着往下执行，等到全部执行完毕，再把执行权交还给<code v-pre>a.js</code>。于是，<code v-pre>a.js</code>接着往下执行，直到执行完毕。我们写一个脚本<code v-pre>main.js</code>，验证这个过程。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var a = require('./a.js');
var b = require('./b.js');
console.log('在 main.js 之中, a.done=%j, b.done=%j', a.done, b.done);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行<code v-pre>main.js</code>，运行结果如下。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ node main.js

在 b.js 之中，a.done = false
b.js 执行完毕
在 a.js 之中，b.done = true
a.js 执行完毕
在 main.js 之中, a.done=true, b.done=true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码证明了两件事。一是，在<code v-pre>b.js</code>之中，<code v-pre>a.js</code>没有执行完毕，只执行了第一行。二是，<code v-pre>main.js</code>执行到第二行时，不会再次执行<code v-pre>b.js</code>，而是输出缓存的<code v-pre>b.js</code>的执行结果，即它的第四行。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>exports.done = true;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>总之，CommonJS 输入的是被输出值的拷贝，不是引用。</p>
<p>另外，由于 CommonJS 模块遇到循环加载时，返回的是当前已经执行的部分的值，而不是代码全部执行后的值，两者可能会有差异。所以，输入变量的时候，必须非常小心。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var a = require('a'); // 安全的写法
var foo = require('a').foo; // 危险的写法

exports.good = function (arg) {
  return a.foo('good', arg); // 使用的是 a.foo 的最新值
};

exports.bad = function (arg) {
  return foo('bad', arg); // 使用的是一个部分加载时的值
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，如果发生循环加载，<code v-pre>require('a').foo</code>的值很可能后面会被改写，改用<code v-pre>require('a')</code>会更保险一点。</p>
<h3 id="es6-模块的循环加载" tabindex="-1"><a class="header-anchor" href="#es6-模块的循环加载" aria-hidden="true">#</a> ES6 模块的循环加载</h3>
<p>ES6 处理“循环加载”与 CommonJS 有本质的不同。ES6 模块是动态引用，如果使用<code v-pre>import</code>从一个模块加载变量（即<code v-pre>import foo from 'foo'</code>），那些变量不会被缓存，而是成为一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能够取到值。</p>
<p>请看下面这个例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// a.mjs
import {bar} from './b';
console.log('a.mjs');
console.log(bar);
export let foo = 'foo';

// b.mjs
import {foo} from './a';
console.log('b.mjs');
console.log(foo);
export let bar = 'bar';
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>a.mjs</code>加载<code v-pre>b.mjs</code>，<code v-pre>b.mjs</code>又加载<code v-pre>a.mjs</code>，构成循环加载。执行<code v-pre>a.mjs</code>，结果如下。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ node --experimental-modules a.mjs
b.mjs
ReferenceError: foo is not defined
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，执行<code v-pre>a.mjs</code>以后会报错，<code v-pre>foo</code>变量未定义，这是为什么？</p>
<p>让我们一行行来看，ES6 循环加载是怎么处理的。首先，执行<code v-pre>a.mjs</code>以后，引擎发现它加载了<code v-pre>b.mjs</code>，因此会优先执行<code v-pre>b.mjs</code>，然后再执行<code v-pre>a.mjs</code>。接着，执行<code v-pre>b.mjs</code>的时候，已知它从<code v-pre>a.mjs</code>输入了<code v-pre>foo</code>接口，这时不会去执行<code v-pre>a.mjs</code>，而是认为这个接口已经存在了，继续往下执行。执行到第三行<code v-pre>console.log(foo)</code>的时候，才发现这个接口根本没定义，因此报错。</p>
<p>解决这个问题的方法，就是让<code v-pre>b.mjs</code>运行的时候，<code v-pre>foo</code>已经有定义了。这可以通过将<code v-pre>foo</code>写成函数来解决。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// a.mjs
import {bar} from './b';
console.log('a.mjs');
console.log(bar());
function foo() { return 'foo' }
export {foo};

// b.mjs
import {foo} from './a';
console.log('b.mjs');
console.log(foo());
function bar() { return 'bar' }
export {bar};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这时再执行<code v-pre>a.mjs</code>就可以得到预期结果。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ node --experimental-modules a.mjs
b.mjs
foo
a.mjs
bar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是因为函数具有提升作用，在执行<code v-pre>import {bar} from './b'</code>时，函数<code v-pre>foo</code>就已经有定义了，所以<code v-pre>b.mjs</code>加载的时候不会报错。这也意味着，如果把函数<code v-pre>foo</code>改写成函数表达式，也会报错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// a.mjs
import {bar} from './b';
console.log('a.mjs');
console.log(bar());
const foo = () =&gt; 'foo';
export {foo};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码的第四行，改成了函数表达式，就不具有提升作用，执行就会报错。</p>
<p>我们再来看 ES6 模块加载器<a href="https://github.com/ModuleLoader/es6-module-loader/blob/master/docs/circular-references-bindings.md" target="_blank" rel="noopener noreferrer">SystemJS</a>给出的一个例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// even.js
import { odd } from './odd'
export var counter = 0;
export function even(n) {
  counter++;
  return n === 0 || odd(n - 1);
}

// odd.js
import { even } from './even';
export function odd(n) {
  return n !== 0 &amp;&amp; even(n - 1);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>even.js</code>里面的函数<code v-pre>even</code>有一个参数<code v-pre>n</code>，只要不等于 0，就会减去 1，传入加载的<code v-pre>odd()</code>。<code v-pre>odd.js</code>也会做类似操作。</p>
<p>运行上面这段代码，结果如下。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>$ babel-node
&gt; import * as m from './even.js';
&gt; m.even(10);
true
&gt; m.counter
6
&gt; m.even(20)
true
&gt; m.counter
17
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，参数<code v-pre>n</code>从 10 变为 0 的过程中，<code v-pre>even()</code>一共会执行 6 次，所以变量<code v-pre>counter</code>等于 6。第二次调用<code v-pre>even()</code>时，参数<code v-pre>n</code>从 20 变为 0，<code v-pre>even()</code>一共会执行 11 次，加上前面的 6 次，所以变量<code v-pre>counter</code>等于 17。</p>
<p>这个例子要是改写成 CommonJS，就根本无法执行，会报错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// even.js
var odd = require('./odd');
var counter = 0;
exports.counter = counter;
exports.even = function (n) {
  counter++;
  return n == 0 || odd(n - 1);
}

// odd.js
var even = require('./even').even;
module.exports = function (n) {
  return n != 0 &amp;&amp; even(n - 1);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>even.js</code>加载<code v-pre>odd.js</code>，而<code v-pre>odd.js</code>又去加载<code v-pre>even.js</code>，形成“循环加载”。这时，执行引擎就会输出<code v-pre>even.js</code>已经执行的部分（不存在任何结果），所以在<code v-pre>odd.js</code>之中，变量<code v-pre>even</code>等于<code v-pre>undefined</code>，等到后面调用<code v-pre>even(n - 1)</code>就会报错。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ node
&gt; var m = require('./even');
&gt; m.even(10)
TypeError: even is not a function
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>
