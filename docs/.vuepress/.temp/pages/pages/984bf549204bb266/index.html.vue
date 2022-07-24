<template><div><h1 id="编程风格" tabindex="-1"><a class="header-anchor" href="#编程风格" aria-hidden="true">#</a> 编程风格</h1>
<p>本章探讨如何将 ES6 的新语法，运用到编码实践之中，与传统的 JavaScript 语法结合在一起，写出合理的、易于阅读和维护的代码。</p>
<p>多家公司和组织已经公开了它们的风格规范，下面的内容主要参考了 <a href="https://github.com/airbnb/javascript" target="_blank" rel="noopener noreferrer">Airbnb</a> 公司的 JavaScript 风格规范。</p>
<!-- more -->
<h2 id="块级作用域" tabindex="-1"><a class="header-anchor" href="#块级作用域" aria-hidden="true">#</a> 块级作用域</h2>
<p><strong>（1）let 取代 var</strong></p>
<p>ES6 提出了两个新的声明变量的命令：<code v-pre>let</code>和<code v-pre>const</code>。其中，<code v-pre>let</code>完全可以取代<code v-pre>var</code>，因为两者语义相同，而且<code v-pre>let</code>没有副作用。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'use strict';

if (true) {
  let x = 'hello';
}

for (let i = 0; i &lt; 10; i++) {
  console.log(i);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码如果用<code v-pre>var</code>替代<code v-pre>let</code>，实际上就声明了两个全局变量，这显然不是本意。变量应该只在其声明的代码块内有效，<code v-pre>var</code>命令做不到这一点。</p>
<p><code v-pre>var</code>命令存在变量提升效用，<code v-pre>let</code>命令没有这个问题。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'use strict';

if (true) {
  console.log(x); // ReferenceError
  let x = 'hello';
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码如果使用<code v-pre>var</code>替代<code v-pre>let</code>，<code v-pre>console.log</code>那一行就不会报错，而是会输出<code v-pre>undefined</code>，因为变量声明提升到代码块的头部。这违反了变量先声明后使用的原则。</p>
<p>所以，建议不再使用<code v-pre>var</code>命令，而是使用<code v-pre>let</code>命令取代。</p>
<p><strong>（2）全局常量和线程安全</strong></p>
<p>在<code v-pre>let</code>和<code v-pre>const</code>之间，建议优先使用<code v-pre>const</code>，尤其是在全局环境，不应该设置变量，只应设置常量。</p>
<p><code v-pre>const</code>优于<code v-pre>let</code>有几个原因。一个是<code v-pre>const</code>可以提醒阅读程序的人，这个变量不应该改变；另一个是<code v-pre>const</code>比较符合函数式编程思想，运算不改变值，只是新建值，而且这样也有利于将来的分布式运算；最后一个原因是 JavaScript <strong>编译器会对<code v-pre>const</code>进行优化</strong>，所以多使用<code v-pre>const</code>，有利于提高程序的运行效率，也就是说<code v-pre>let</code>和<code v-pre>const</code>的本质区别，其实是编译器内部的处理不同。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// bad
var a = 1, b = 2, c = 3;

// good
const a = 1;
const b = 2;
const c = 3;

// best
const [a, b, c] = [1, 2, 3];
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>const</code>声明常量还有两个好处，一是阅读代码的人立刻会意识到不应该修改这个值，二是防止了无意间修改变量值所导致的错误。</p>
<p>所有的函数都应该设置为常量。</p>
<p>长远来看，JavaScript 可能会有多线程的实现（比如 Intel 公司的 River Trail 那一类的项目），这时<code v-pre>let</code>表示的变量，只应出现在单线程运行的代码中，不能是多线程共享的，这样有利于保证线程安全。</p>
<h2 id="字符串" tabindex="-1"><a class="header-anchor" href="#字符串" aria-hidden="true">#</a> 字符串</h2>
<p>静态字符串一律使用单引号或反引号，不使用双引号。动态字符串使用反引号。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// bad
const a = &quot;foobar&quot;;
const b = 'foo' + a + 'bar';

// acceptable
const c = `foobar`;

// good
const a = 'foobar';
const b = `foo${a}bar`;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="解构赋值" tabindex="-1"><a class="header-anchor" href="#解构赋值" aria-hidden="true">#</a> 解构赋值</h2>
<p>使用数组成员对变量赋值时，优先使用解构赋值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const arr = [1, 2, 3, 4];

// bad
const first = arr[0];
const second = arr[1];

// good
const [first, second] = arr;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>函数的参数如果是对象的成员，优先使用解构赋值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// bad
function getFullName(user) {
  const firstName = user.firstName;
  const lastName = user.lastName;
}

// good
function getFullName(obj) {
  const { firstName, lastName } = obj;
}

// best
function getFullName({ firstName, lastName }) {
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果函数返回多个值，优先使用对象的解构赋值，而不是数组的解构赋值。这样便于以后添加返回值，以及更改返回值的顺序。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// bad
function processInput(input) {
  return [left, right, top, bottom];
}

// good
function processInput(input) {
  return { left, right, top, bottom };
}

const { left, right } = processInput(input);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="对象" tabindex="-1"><a class="header-anchor" href="#对象" aria-hidden="true">#</a> 对象</h2>
<p>单行定义的对象，最后一个成员不以逗号结尾。多行定义的对象，<strong>最后一个成员以逗号结尾</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// bad
const a = { k1: v1, k2: v2, };
const b = {
  k1: v1,
  k2: v2
};

// good
const a = { k1: v1, k2: v2 };
const b = {
  k1: v1,
  k2: v2,
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对象尽量静态化，一旦定义，就不得随意添加新的属性。如果添加属性不可避免，要使用<code v-pre>Object.assign</code>方法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// bad
const a = {};
a.x = 3;

// if reshape unavoidable
const a = {};
Object.assign(a, { x: 3 });

// good
const a = { x: null };
a.x = 3;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果对象的属性名是动态的，可以在创造对象的时候，使用属性表达式定义。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// bad
const obj = {
  id: 5,
  name: 'San Francisco',
};
obj[getKey('enabled')] = true;

// good
const obj = {
  id: 5,
  name: 'San Francisco',
  [getKey('enabled')]: true,
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，对象<code v-pre>obj</code>的最后一个属性名，需要计算得到。这时最好采用属性表达式，在新建<code v-pre>obj</code>的时候，将该属性与其他属性定义在一起。这样一来，所有属性就在一个地方定义了。</p>
<p>另外，对象的属性和方法，<strong>尽量采用简洁表达法</strong>，这样易于描述和书写。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var ref = 'some value';

// bad
const atom = {
  ref: ref,

  value: 1,

  addValue: function (value) {
    return atom.value + value;
  },
};

// good
const atom = {
  ref,

  value: 1,

  addValue(value) {
    return atom.value + value;
  },
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="数组" tabindex="-1"><a class="header-anchor" href="#数组" aria-hidden="true">#</a> 数组</h2>
<p>使用<strong>扩展运算符（...）拷贝数组</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// bad
const len = items.length;
const itemsCopy = [];
let i;

for (i = 0; i &lt; len; i++) {
  itemsCopy[i] = items[i];
}

// good
const itemsCopy = [...items];
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 <strong>Array.from 方法，将类似数组的对象转为数组</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const foo = document.querySelectorAll('.foo');
const nodes = Array.from(foo);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="函数" tabindex="-1"><a class="header-anchor" href="#函数" aria-hidden="true">#</a> 函数</h2>
<p>立即执行函数可以写成箭头函数的形式。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>(() =&gt; {
  console.log('Welcome to the Internet.');
})();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那些使用匿名函数当作参数的场合，<strong>尽量用箭头函数代替</strong>。因为这样更简洁，而且绑定了 this。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// bad
[1, 2, 3].map(function (x) {
  return x * x;
});

// good
[1, 2, 3].map((x) =&gt; {
  return x * x;
});

// best
[1, 2, 3].map(x =&gt; x * x);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>箭头函数取代<code v-pre>Function.prototype.bind</code>，不应再用 self/_this/that 绑定 this。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// bad
const self = this;
const boundMethod = function(...params) {
  return method.apply(self, params);
}

// acceptable
const boundMethod = method.bind(this);

// best
const boundMethod = (...params) =&gt; method.apply(this, params);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简单的、单行的、不会复用的函数，建议采用箭头函数。<strong>如果函数体较为复杂，行数较多，还是应该采用传统的函数写法。</strong></p>
<p><strong>所有配置项都应该集中在一个对象，放在最后一个参数，布尔值不可以直接作为参数</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// bad
function divide(a, b, option = false ) {
}

// good
function divide(a, b, { option = false } = {}) {
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不要在函数体内使用 arguments 变量，使用 rest 运算符（...）代替。因为 rest 运算符显式表明你想要获取参数，而且 arguments 是一个类似数组的对象，而 rest 运算符可以提供一个真正的数组。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// bad
function concatenateAll() {
  const args = Array.prototype.slice.call(arguments);
  return args.join('');
}

// good
function concatenateAll(...args) {
  return args.join('');
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用默认值语法设置函数参数的默认值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// bad
function handleThings(opts) {
  opts = opts || {};
}

// good
function handleThings(opts = {}) {
  // ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="map-结构" tabindex="-1"><a class="header-anchor" href="#map-结构" aria-hidden="true">#</a> Map 结构</h2>
<p>注意区分 Object 和 Map，只有模拟现实世界的实体对象时，才使用 Object。如果只是需要<code v-pre>key: value</code>的数据结构，使用 Map 结构。因为 Map 有内建的遍历机制。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let map = new Map(arr);

for (let key of map.keys()) {
  console.log(key);
}

for (let value of map.values()) {
  console.log(value);
}

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="class" tabindex="-1"><a class="header-anchor" href="#class" aria-hidden="true">#</a> Class</h2>
<p>总是用 Class，取代需要 prototype 的操作。因为 Class 的写法更简洁，更易于理解。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// bad
function Queue(contents = []) {
  this._queue = [...contents];
}
Queue.prototype.pop = function() {
  const value = this._queue[0];
  this._queue.splice(0, 1);
  return value;
}

// good
class Queue {
  constructor(contents = []) {
    this._queue = [...contents];
  }
  pop() {
    const value = this._queue[0];
    this._queue.splice(0, 1);
    return value;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用<code v-pre>extends</code>实现继承，因为这样更简单，不会有破坏<code v-pre>instanceof</code>运算的危险。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// bad
const inherits = require('inherits');
function PeekableQueue(contents) {
  Queue.apply(this, contents);
}
inherits(PeekableQueue, Queue);
PeekableQueue.prototype.peek = function() {
  return this._queue[0];
}

// good
class PeekableQueue extends Queue {
  peek() {
    return this._queue[0];
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="模块" tabindex="-1"><a class="header-anchor" href="#模块" aria-hidden="true">#</a> 模块</h2>
<p>首先，Module 语法是 JavaScript 模块的标准写法，坚持使用这种写法。使用<code v-pre>import</code>取代<code v-pre>require</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// bad
const moduleA = require('moduleA');
const func1 = moduleA.func1;
const func2 = moduleA.func2;

// good
import { func1, func2 } from 'moduleA';
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用<code v-pre>export</code>取代<code v-pre>module.exports</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// commonJS的写法
var React = require('react');

var Breadcrumbs = React.createClass({
  render() {
    return &lt;nav /&gt;;
  }
});

module.exports = Breadcrumbs;

// ES6的写法
import React from 'react';

class Breadcrumbs extends React.Component {
  render() {
    return &lt;nav /&gt;;
  }
};

export default Breadcrumbs;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果模块只有一个输出值，就使用<code v-pre>export default</code>，如果模块有多个输出值，就不使用<code v-pre>export default</code>，<code v-pre>export default</code>与普通的<code v-pre>export</code>不要同时使用。</p>
<p>不要在模块输入中使用通配符。因为这样可以确保你的模块之中，有一个默认输出（export default）。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// bad
import * as myObject from './importModule';

// good
import myObject from './importModule';
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果模块默认输出一个函数，函数名的首字母应该小写。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function makeStyleGuide() {
}

export default makeStyleGuide;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果模块默认输出一个对象，对象名的首字母应该大写。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const StyleGuide = {
  es6: {
  }
};

export default StyleGuide;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="eslint-的使用" tabindex="-1"><a class="header-anchor" href="#eslint-的使用" aria-hidden="true">#</a> ESLint 的使用</h2>
<p>ESLint 是一个语法规则和代码风格的检查工具，可以用来保证写出语法正确、风格统一的代码。</p>
<p>首先，安装 ESLint。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ npm i -g eslint
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后，安装 Airbnb 语法规则，以及 import、a11y、react 插件。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ npm i -g eslint-config-airbnb
$ npm i -g eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，在项目的根目录下新建一个<code v-pre>.eslintrc</code>文件，配置 ESLint。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>{
  &quot;extends&quot;: &quot;eslint-config-airbnb&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在就可以检查，当前项目的代码是否符合预设的规则。</p>
<p><code v-pre>index.js</code>文件的代码如下。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var unusued = 'I have no purpose!';

function greet() {
    var message = 'Hello, World!';
    alert(message);
}

greet();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 ESLint 检查这个文件，就会报出错误。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ eslint index.js
index.js
  1:1  error  Unexpected var, use let or const instead          no-var
  1:5  error  unusued is defined but never used                 no-unused-vars
  4:5  error  Expected indentation of 2 characters but found 4  indent
  4:5  error  Unexpected var, use let or const instead          no-var
  5:5  error  Expected indentation of 2 characters but found 4  indent

✖ 5 problems (5 errors, 0 warnings)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码说明，原文件有五个错误，其中两个是不应该使用<code v-pre>var</code>命令，而要使用<code v-pre>let</code>或<code v-pre>const</code>；一个是定义了变量，却没有使用；另外两个是行首缩进为 4 个空格，而不是规定的 2 个空格。</p>
</div></template>
