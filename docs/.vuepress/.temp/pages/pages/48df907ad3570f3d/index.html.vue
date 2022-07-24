<template><div><h1 id="iterator-和-for-of-循环" tabindex="-1"><a class="header-anchor" href="#iterator-和-for-of-循环" aria-hidden="true">#</a> Iterator 和 for...of 循环</h1>
<h2 id="iterator-遍历器-的概念" tabindex="-1"><a class="header-anchor" href="#iterator-遍历器-的概念" aria-hidden="true">#</a> Iterator（遍历器）的概念</h2>
<p>JavaScript 原有的表示“集合”的数据结构，主要是数组（<code v-pre>Array</code>）和对象（<code v-pre>Object</code>），ES6 又添加了<code v-pre>Map</code>和<code v-pre>Set</code>。这样就有了四种数据集合，用户还可以组合使用它们，定义自己的数据结构，比如数组的成员是<code v-pre>Map</code>，<code v-pre>Map</code>的成员是对象。这样就需要一种统一的接口机制，来处理所有不同的数据结构。</p>
<!-- more -->
<p>遍历器（Iterator）就是这样一种机制。<strong>它是一种接口，为各种不同的数据结构提供统一的访问机制</strong>。<strong>任何数据结构只要部署 Iterator 接口，就可以完成遍历操作</strong>（即依次处理该数据结构的所有成员）。</p>
<p>Iterator 的作用有三个：一是为各种数据结构，提供一个统一的、简便的访问接口；二是使得数据结构的成员能够按某种次序排列；三是 ES6 创造了一种新的遍历命令<code v-pre>for...of</code>循环，Iterator 接口主要供<code v-pre>for...of</code>消费。</p>
<p>Iterator 的遍历过程是这样的。</p>
<p>（1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。</p>
<p>（2）第一次调用指针对象的<code v-pre>next</code>方法，可以将指针指向数据结构的第一个成员。</p>
<p>（3）第二次调用指针对象的<code v-pre>next</code>方法，指针就指向数据结构的第二个成员。</p>
<p>（4）不断调用指针对象的<code v-pre>next</code>方法，直到它指向数据结构的结束位置。</p>
<p>每一次调用<code v-pre>next</code>方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含<code v-pre>value</code>和<code v-pre>done</code>两个属性的对象。其中，<code v-pre>value</code>属性是当前成员的值，<code v-pre>done</code>属性是一个布尔值，表示遍历是否结束。</p>
<p>下面是一个模拟<code v-pre>next</code>方法返回值的例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var it = makeIterator(['a', 'b']);

it.next() // { value: &quot;a&quot;, done: false }
it.next() // { value: &quot;b&quot;, done: false }
it.next() // { value: undefined, done: true }

function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex &lt; array.length ?
        {value: array[nextIndex++], done: false} :
        {value: undefined, done: true};
    }
  };
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码定义了一个<code v-pre>makeIterator</code>函数，它是一个遍历器生成函数，作用就是返回一个遍历器对象。对数组<code v-pre>['a', 'b']</code>执行这个函数，就会返回该数组的遍历器对象（即指针对象）<code v-pre>it</code>。</p>
<p>指针对象的<code v-pre>next</code>方法，用来移动指针。开始时，指针指向数组的开始位置。然后，每次调用<code v-pre>next</code>方法，指针就会指向数组的下一个成员。第一次调用，指向<code v-pre>a</code>；第二次调用，指向<code v-pre>b</code>。</p>
<p><code v-pre>next</code>方法返回一个对象，表示当前数据成员的信息。这个对象具有<code v-pre>value</code>和<code v-pre>done</code>两个属性，<code v-pre>value</code>属性返回当前位置的成员，<code v-pre>done</code>属性是一个布尔值，表示遍历是否结束，即是否还有必要再一次调用<code v-pre>next</code>方法。</p>
<p>总之，调用指针对象的<code v-pre>next</code>方法，就可以遍历事先给定的数据结构。</p>
<p>对于遍历器对象来说，<code v-pre>done: false</code>和<code v-pre>value: undefined</code>属性都是可以省略的，因此上面的<code v-pre>makeIterator</code>函数可以简写成下面的形式。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex &lt; array.length ?
        {value: array[nextIndex++]} :
        {done: true};
    }
  };
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于 Iterator 只是把接口规格加到数据结构之上，所以，遍历器与它所遍历的那个数据结构，实际上是分开的，完全可以写出没有对应数据结构的遍历器对象，或者说用遍历器对象模拟出数据结构。下面是一个无限运行的遍历器对象的例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var it = idMaker();

it.next().value // 0
it.next().value // 1
it.next().value // 2
// ...

function idMaker() {
  var index = 0;

  return {
    next: function() {
      return {value: index++, done: false};
    }
  };
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的例子中，遍历器生成函数<code v-pre>idMaker</code>，返回一个遍历器对象（即指针对象）。但是并没有对应的数据结构，或者说，遍历器对象自己描述了一个数据结构出来。</p>
<p>如果使用 TypeScript 的写法，遍历器接口（Iterable）、指针对象（Iterator）和<code v-pre>next</code>方法返回值的规格可以描述如下。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>interface Iterable {
  [Symbol.iterator]() : Iterator,
}

interface Iterator {
  next(value?: any) : IterationResult,
}

interface IterationResult {
  value: any,
  done: boolean,
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="默认-iterator-接口" tabindex="-1"><a class="header-anchor" href="#默认-iterator-接口" aria-hidden="true">#</a> 默认 Iterator 接口</h2>
<p>I<strong>terator 接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即<code v-pre>for...of</code>循环（详见下文）</strong>。当使用<code v-pre>for...of</code>循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。</p>
<p><strong>一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是“可遍历的”</strong>（iterable）。</p>
<p>ES6 规定，<strong>默认的 Iterator 接口部署在数据结构的<code v-pre>Symbol.iterator</code>属性</strong>，或者说，一个数据结构只要具有<code v-pre>Symbol.iterator</code>属性，就可以认为是“可遍历的”（iterable）。<code v-pre>Symbol.iterator</code>属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，就会返回一个遍历器。至于属性名<code v-pre>Symbol.iterator</code>，它是一个表达式，返回<code v-pre>Symbol</code>对象的<code v-pre>iterator</code>属性，这是一个预定义好的、类型为 Symbol 的特殊值，所以要放在方括号内（参见《Symbol》一章）。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const obj = {
  [Symbol.iterator] : function () {
    return {
      next: function () {
        return {
          value: 1,
          done: true
        };
      }
    };
  }
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，对象<code v-pre>obj</code>是可遍历的（iterable），因为具有<code v-pre>Symbol.iterator</code>属性。执行这个属性，会返回一个遍历器对象。该对象的根本特征就是具有<code v-pre>next</code>方法。每次调用<code v-pre>next</code>方法，都会返回一个代表当前成员的信息对象，具有<code v-pre>value</code>和<code v-pre>done</code>两个属性。</p>
<p>ES6 的有些数据结构原生具备 Iterator 接口（比如数组），即不用任何处理，就可以被<code v-pre>for...of</code>循环遍历。原因在于，这些数据结构原生部署了<code v-pre>Symbol.iterator</code>属性（详见下文），另外一些数据结构没有（比如对象）。凡是部署了<code v-pre>Symbol.iterator</code>属性的数据结构，就称为部署了遍历器接口。调用这个接口，就会返回一个遍历器对象。</p>
<p><strong>原生具备 Iterator 接口的数据结构如下。</strong></p>
<ul>
<li>Array</li>
<li>Map</li>
<li>Set</li>
<li>String</li>
<li>TypedArray</li>
<li>函数的 arguments 对象</li>
<li>NodeList 对象</li>
</ul>
<p>下面的例子是数组的<code v-pre>Symbol.iterator</code>属性。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();

iter.next() // { value: 'a', done: false }
iter.next() // { value: 'b', done: false }
iter.next() // { value: 'c', done: false }
iter.next() // { value: undefined, done: true }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，变量<code v-pre>arr</code>是一个数组，原生就具有遍历器接口，部署在<code v-pre>arr</code>的<code v-pre>Symbol.iterator</code>属性上面。所以，调用这个属性，就得到遍历器对象。</p>
<p>对于原生部署 Iterator 接口的数据结构，不用自己写遍历器生成函数，<code v-pre>for...of</code>循环会自动遍历它们。除此之外，其他数据结构（主要是对象）的 Iterator 接口，都需要自己在<code v-pre>Symbol.iterator</code>属性上面部署，这样才会被<code v-pre>for...of</code>循环遍历。</p>
<p>对象（Object）之所以没有默认部署 Iterator 接口，是因为对象的哪个属性先遍历，哪个属性后遍历是不确定的，需要开发者手动指定。本质上，遍历器是一种线性处理，对于任何非线性的数据结构，部署遍历器接口，就等于部署一种线性转换。不过，严格地说，对象部署遍历器接口并不是很必要，因为这时对象实际上被当作 Map 结构使用，ES5 没有 Map 结构，而 ES6 原生提供了。</p>
<p>一个对象如果要具备可被<code v-pre>for...of</code>循环调用的 Iterator 接口，就必须在<code v-pre>Symbol.iterator</code>的属性上部署遍历器生成方法（原型链上的对象具有该方法也可）。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>class RangeIterator {
  constructor(start, stop) {
    this.value = start;
    this.stop = stop;
  }

  [Symbol.iterator]() { return this; }

  next() {
    var value = this.value;
    if (value &lt; this.stop) {
      this.value++;
      return {done: false, value: value};
    }
    return {done: true, value: undefined};
  }
}

function range(start, stop) {
  return new RangeIterator(start, stop);
}

for (var value of range(0, 3)) {
  console.log(value); // 0, 1, 2
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码是一个类部署 Iterator 接口的写法。<code v-pre>Symbol.iterator</code>属性对应一个函数，执行后返回当前对象的遍历器对象。</p>
<p>下面是通过遍历器实现指针结构的例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function Obj(value) {
  this.value = value;
  this.next = null;
}

Obj.prototype[Symbol.iterator] = function() {
  var iterator = { next: next };

  var current = this;

  function next() {
    if (current) {
      var value = current.value;
      current = current.next;
      return { done: false, value: value };
    } else {
      return { done: true };
    }
  }
  return iterator;
}

var one = new Obj(1);
var two = new Obj(2);
var three = new Obj(3);

one.next = two;
two.next = three;

for (var i of one){
  console.log(i); // 1, 2, 3
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码首先在构造函数的原型链上部署<code v-pre>Symbol.iterator</code>方法，调用该方法会返回遍历器对象<code v-pre>iterator</code>，调用该对象的<code v-pre>next</code>方法，在返回一个值的同时，自动将内部指针移到下一个实例。</p>
<p>下面是另一个为对象添加 Iterator 接口的例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let obj = {
  data: [ 'hello', 'world' ],
  [Symbol.iterator]() {
    const self = this;
    let index = 0;
    return {
      next() {
        if (index &lt; self.data.length) {
          return {
            value: self.data[index++],
            done: false
          };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于类似数组的对象（存在数值键名和<code v-pre>length</code>属性），部署 Iterator 接口，有一个简便方法，就是<code v-pre>Symbol.iterator</code>方法直接引用数组的 Iterator 接口。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
// 或者
NodeList.prototype[Symbol.iterator] = [][Symbol.iterator];

[...document.querySelectorAll('div')] // 可以执行了
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>NodeList 对象是类似数组的对象，本来就具有遍历接口，可以直接遍历。上面代码中，我们将它的遍历接口改成数组的<code v-pre>Symbol.iterator</code>属性，可以看到没有任何影响。</p>
<p>下面是另一个<strong>类似数组的对象调用数组的<code v-pre>Symbol.iterator</code>方法的例子</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let iterable = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable) {
  console.log(item); // 'a', 'b', 'c'
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，<strong>普通对象部署数组的<code v-pre>Symbol.iterator</code>方法，并无效果</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let iterable = {
  a: 'a',
  b: 'b',
  c: 'c',
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable) {
  console.log(item); // undefined, undefined, undefined
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果<code v-pre>Symbol.iterator</code>方法对应的不是遍历器生成函数（即会返回一个遍历器对象），解释引擎将会报错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = {};

obj[Symbol.iterator] = () =&gt; 1;

[...obj] // TypeError: [] is not a function
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，变量<code v-pre>obj</code>的<code v-pre>Symbol.iterator</code>方法对应的不是遍历器生成函数，因此报错。</p>
<p>有了遍历器接口，数据结构就可以用<code v-pre>for...of</code>循环遍历（详见下文），也可以使用<code v-pre>while</code>循环遍历。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var $iterator = ITERABLE[Symbol.iterator]();
var $result = $iterator.next();
while (!$result.done) {
  var x = $result.value;
  // ...
  $result = $iterator.next();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>ITERABLE</code>代表某种可遍历的数据结构，<code v-pre>$iterator</code>是它的遍历器对象。遍历器对象每次移动指针（<code v-pre>next</code>方法），都检查一下返回值的<code v-pre>done</code>属性，如果遍历还没结束，就移动遍历器对象的指针到下一步（<code v-pre>next</code>方法），不断循环。</p>
<h2 id="调用-iterator-接口的场合" tabindex="-1"><a class="header-anchor" href="#调用-iterator-接口的场合" aria-hidden="true">#</a> 调用 Iterator 接口的场合</h2>
<p>有一些场合会默认调用 Iterator 接口（即<code v-pre>Symbol.iterator</code>方法），除了下文会介绍的<code v-pre>for...of</code>循环，还有几个别的场合。</p>
<p><strong>（1）解构赋值</strong></p>
<p>对数组和 Set 结构进行解构赋值时，会默认调用<code v-pre>Symbol.iterator</code>方法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let set = new Set().add('a').add('b').add('c');

let [x,y] = set;
// x='a'; y='b'

let [first, ...rest] = set;
// first='a'; rest=['b','c'];
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>（2）扩展运算符</strong></p>
<p>扩展运算符（...）也会调用默认的 Iterator 接口。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 例一
var str = 'hello';
[...str] //  ['h','e','l','l','o']

// 例二
let arr = ['b', 'c'];
['a', ...arr, 'd']
// ['a', 'b', 'c', 'd']
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码的扩展运算符内部就调用 Iterator 接口。</p>
<p>实际上，这提供了一种简便机制，可以将任何部署了 Iterator 接口的数据结构，转为数组。也就是说，<strong>只要某个数据结构部署了 Iterator 接口，就可以对它使用扩展运算符，将其转为数组</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let arr = [...iterable];
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>（3）yield*</strong></p>
<p><code v-pre>yield*</code>后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let generator = function* () {
  yield 1;
  yield* [2,3,4];
  yield 5;
};

var iterator = generator();

iterator.next() // { value: 1, done: false }
iterator.next() // { value: 2, done: false }
iterator.next() // { value: 3, done: false }
iterator.next() // { value: 4, done: false }
iterator.next() // { value: 5, done: false }
iterator.next() // { value: undefined, done: true }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>（4）其他场合</strong></p>
<p>由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口。下面是一些例子。</p>
<ul>
<li>for...of</li>
<li>Array.from()</li>
<li>Map(), Set(), WeakMap(), WeakSet()（比如<code v-pre>new Map([['a',1],['b',2]])</code>）</li>
<li>Promise.all()</li>
<li>Promise.race()</li>
</ul>
<h2 id="字符串的-iterator-接口" tabindex="-1"><a class="header-anchor" href="#字符串的-iterator-接口" aria-hidden="true">#</a> 字符串的 Iterator 接口</h2>
<p><strong>字符串是一个类似数组的对象，也原生具有 Iterator 接口</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var someString = &quot;hi&quot;;
typeof someString[Symbol.iterator]
// &quot;function&quot;

var iterator = someString[Symbol.iterator]();

iterator.next()  // { value: &quot;h&quot;, done: false }
iterator.next()  // { value: &quot;i&quot;, done: false }
iterator.next()  // { value: undefined, done: true }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，调用<code v-pre>Symbol.iterator</code>方法返回一个遍历器对象，在这个遍历器上可以调用 next 方法，实现对于字符串的遍历。</p>
<p>可以覆盖原生的<code v-pre>Symbol.iterator</code>方法，达到修改遍历器行为的目的。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var str = new String(&quot;hi&quot;);

[...str] // [&quot;h&quot;, &quot;i&quot;]

str[Symbol.iterator] = function() {
  return {
    next: function() {
      if (this._first) {
        this._first = false;
        return { value: &quot;bye&quot;, done: false };
      } else {
        return { done: true };
      }
    },
    _first: true
  };
};

[...str] // [&quot;bye&quot;]
str // &quot;hi&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，字符串 str 的<code v-pre>Symbol.iterator</code>方法被修改了，所以扩展运算符（<code v-pre>...</code>）返回的值变成了<code v-pre>bye</code>，而字符串本身还是<code v-pre>hi</code>。</p>
<h2 id="iterator-接口与-generator-函数" tabindex="-1"><a class="header-anchor" href="#iterator-接口与-generator-函数" aria-hidden="true">#</a> Iterator 接口与 Generator 函数</h2>
<p><code v-pre>Symbol.iterator</code>方法的最简单实现，还是使用下一章要介绍的 Generator 函数。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let myIterable = {
  [Symbol.iterator]: function* () {
    yield 1;
    yield 2;
    yield 3;
  }
}
[...myIterable] // [1, 2, 3]

// 或者采用下面的简洁写法

let obj = {
  * [Symbol.iterator]() {
    yield 'hello';
    yield 'world';
  }
};

for (let x of obj) {
  console.log(x);
}
// &quot;hello&quot;
// &quot;world&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>Symbol.iterator</code>方法几乎不用部署任何代码，只要用 yield 命令给出每一步的返回值即可。</p>
<h2 id="遍历器对象的-return-throw" tabindex="-1"><a class="header-anchor" href="#遍历器对象的-return-throw" aria-hidden="true">#</a> 遍历器对象的 return()，throw()</h2>
<p>遍历器对象除了具有<code v-pre>next</code>方法，还可以具有<code v-pre>return</code>方法和<code v-pre>throw</code>方法。如果你自己写遍历器对象生成函数，那么<code v-pre>next</code>方法是必须部署的，<code v-pre>return</code>方法和<code v-pre>throw</code>方法是否部署是可选的。</p>
<p><code v-pre>return</code>方法的使用场合是，如果<code v-pre>for...of</code>循环提前退出（通常是因为出错，或者有<code v-pre>break</code>语句），就会调用<code v-pre>return</code>方法。如果一个对象在完成遍历前，需要清理或释放资源，就可以部署<code v-pre>return</code>方法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function readLinesSync(file) {
  return {
    [Symbol.iterator]() {
      return {
        next() {
          return { done: false };
        },
        return() {
          file.close();
          return { done: true };
        }
      };
    },
  };
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，函数<code v-pre>readLinesSync</code>接受一个文件对象作为参数，返回一个遍历器对象，其中除了<code v-pre>next</code>方法，还部署了<code v-pre>return</code>方法。下面的两种情况，都会触发执行<code v-pre>return</code>方法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 情况一
for (let line of readLinesSync(fileName)) {
  console.log(line);
  break;
}

// 情况二
for (let line of readLinesSync(fileName)) {
  console.log(line);
  throw new Error();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，情况一输出文件的第一行以后，就会执行<code v-pre>return</code>方法，关闭这个文件；情况二会在执行<code v-pre>return</code>方法关闭文件之后，再抛出错误。</p>
<p>注意，<code v-pre>return</code>方法必须返回一个对象，这是 Generator 规格决定的。</p>
<p><code v-pre>throw</code>方法主要是配合 Generator 函数使用，一般的遍历器对象用不到这个方法。请参阅《Generator 函数》一章。</p>
<h2 id="for-of-循环" tabindex="-1"><a class="header-anchor" href="#for-of-循环" aria-hidden="true">#</a> for...of 循环</h2>
<p>ES6 借鉴 C++、Java、C# 和 Python 语言，引入了<code v-pre>for...of</code>循环，<strong>作为遍历所有数据结构的统一的方法</strong>。</p>
<p>一个数据结构只要部署了<code v-pre>Symbol.iterator</code>属性，就被视为具有 iterator 接口，就可以用<code v-pre>for...of</code>循环遍历它的成员。也就是说，<strong><code v-pre>for...of</code>循环内部调用的是数据结构的<code v-pre>Symbol.iterator</code>方法</strong>。</p>
<p><code v-pre>for...of</code>循环可以使用的范围包括<strong>数组、Set 和 Map 结构、某些类似数组的对象（比如<code v-pre>arguments</code>对象、DOM NodeList 对象）、后文的 Generator 对象，以及字符串。</strong></p>
<h3 id="数组" tabindex="-1"><a class="header-anchor" href="#数组" aria-hidden="true">#</a> 数组</h3>
<p>数组原生具备<code v-pre>iterator</code>接口（即默认部署了<code v-pre>Symbol.iterator</code>属性），<code v-pre>for...of</code>循环本质上就是调用这个接口产生的遍历器，可以用下面的代码证明。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const arr = ['red', 'green', 'blue'];

for(let v of arr) {
  console.log(v); // red green blue
}

const obj = {};
obj[Symbol.iterator] = arr[Symbol.iterator].bind(arr);

for(let v of obj) {
  console.log(v); // red green blue
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，空对象<code v-pre>obj</code>部署了数组<code v-pre>arr</code>的<code v-pre>Symbol.iterator</code>属性，结果<code v-pre>obj</code>的<code v-pre>for...of</code>循环，产生了与<code v-pre>arr</code>完全一样的结果。</p>
<p><code v-pre>for...of</code>循环可以代替数组实例的<code v-pre>forEach</code>方法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const arr = ['red', 'green', 'blue'];

arr.forEach(function (element, index) {
  console.log(element); // red green blue
  console.log(index);   // 0 1 2
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>JavaScript 原有的**<code v-pre>for...in</code>循环，只能获得对象的键名**，不能直接获取键值。ES6 提供<code v-pre>for...of</code>循环，允许遍历获得键值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var arr = ['a', 'b', 'c', 'd'];

for (let a in arr) {
  console.log(a); // 0 1 2 3
}

for (let a of arr) {
  console.log(a); // a b c d
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码表明，<strong><code v-pre>for...in</code>循环读取键名，<code v-pre>for...of</code>循环读取键值</strong>。如果要通过<code v-pre>for...of</code>循环，获取数组的索引，可以借助数组实例的<code v-pre>entries</code>方法和<code v-pre>keys</code>方法（参见《数组的扩展》一章）。</p>
<p><code v-pre>for...of</code>循环调用遍历器接口，数组的遍历器接口只返回具有数字索引的属性。这一点跟<code v-pre>for...in</code>循环也不一样。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let arr = [3, 5, 7];
arr.foo = 'hello';

for (let i in arr) {
  console.log(i); // &quot;0&quot;, &quot;1&quot;, &quot;2&quot;, &quot;foo&quot;
}

for (let i of arr) {
  console.log(i); //  &quot;3&quot;, &quot;5&quot;, &quot;7&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>for...of</code>循环不会返回数组<code v-pre>arr</code>的<code v-pre>foo</code>属性。</p>
<h3 id="set-和-map-结构" tabindex="-1"><a class="header-anchor" href="#set-和-map-结构" aria-hidden="true">#</a> Set 和 Map 结构</h3>
<p>Set 和 Map 结构也原生具有 Iterator 接口，可以直接使用<code v-pre>for...of</code>循环。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var engines = new Set([&quot;Gecko&quot;, &quot;Trident&quot;, &quot;Webkit&quot;, &quot;Webkit&quot;]);
for (var e of engines) {
  console.log(e);
}
// Gecko
// Trident
// Webkit

var es6 = new Map();
es6.set(&quot;edition&quot;, 6);
es6.set(&quot;committee&quot;, &quot;TC39&quot;);
es6.set(&quot;standard&quot;, &quot;ECMA-262&quot;);
for (var [name, value] of es6) {
  console.log(name + &quot;: &quot; + value);
}
// edition: 6
// committee: TC39
// standard: ECMA-262
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码演示了如何遍历 Set 结构和 Map 结构。值得注意的地方有两个，首先，遍历的顺序是按照各个成员被添加进数据结构的顺序。其次，Set 结构遍历时，返回的是一个值，而 Map 结构遍历时，返回的是一个数组，该数组的两个成员分别为当前 Map 成员的键名和键值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let map = new Map().set('a', 1).set('b', 2);
for (let pair of map) {
  console.log(pair);
}
// ['a', 1]
// ['b', 2]

for (let [key, value] of map) {
  console.log(key + ' : ' + value);
}
// a : 1
// b : 2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="计算生成的数据结构" tabindex="-1"><a class="header-anchor" href="#计算生成的数据结构" aria-hidden="true">#</a> 计算生成的数据结构</h3>
<p>有些数据结构是在现有数据结构的基础上，计算生成的。比如，ES6 的数组、Set、Map 都部署了以下三个方法，调用后都返回遍历器对象。</p>
<ul>
<li><code v-pre>entries()</code> 返回一个遍历器对象，用来遍历<code v-pre>[键名, 键值]</code>组成的数组。对于数组，键名就是索引值；对于 Set，键名与键值相同。Map 结构的 Iterator 接口，默认就是调用<code v-pre>entries</code>方法。</li>
<li><code v-pre>keys()</code> 返回一个遍历器对象，用来遍历所有的键名。</li>
<li><code v-pre>values()</code> 返回一个遍历器对象，用来遍历所有的键值。</li>
</ul>
<p>这三个方法调用后生成的遍历器对象，所遍历的都是计算生成的数据结构。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let arr = ['a', 'b', 'c'];
for (let pair of arr.entries()) {
  console.log(pair);
}
// [0, 'a']
// [1, 'b']
// [2, 'c']
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="类似数组的对象" tabindex="-1"><a class="header-anchor" href="#类似数组的对象" aria-hidden="true">#</a> 类似数组的对象</h3>
<p>类似数组的对象包括好几类。下面是<code v-pre>for...of</code>循环用于字符串、DOM NodeList 对象、<code v-pre>arguments</code>对象的例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 字符串
let str = &quot;hello&quot;;

for (let s of str) {
  console.log(s); // h e l l o
}

// DOM NodeList对象
let paras = document.querySelectorAll(&quot;p&quot;);

for (let p of paras) {
  p.classList.add(&quot;test&quot;);
}

// arguments对象
function printArgs() {
  for (let x of arguments) {
    console.log(x);
  }
}
printArgs('a', 'b');
// 'a'
// 'b'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于字符串来说，<code v-pre>for...of</code>循环还有一个特点，就是会正确识别 32 位 UTF-16 字符。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>for (let x of 'a\uD83D\uDC0A') {
  console.log(x);
}
// 'a'
// '\uD83D\uDC0A'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>并不是所有类似数组的对象都具有 Iterator 接口，一个简便的解决方法，就是使用<code v-pre>Array.from</code>方法将其转为数组。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let arrayLike = { length: 2, 0: 'a', 1: 'b' };

// 报错
for (let x of arrayLike) {
  console.log(x);
}

// 正确
for (let x of Array.from(arrayLike)) {
  console.log(x);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="对象" tabindex="-1"><a class="header-anchor" href="#对象" aria-hidden="true">#</a> 对象</h3>
<p>对于普通的对象，<code v-pre>for...of</code>结构不能直接使用，会报错，必须部署了 Iterator 接口后才能使用。但是，这样情况下，<code v-pre>for...in</code>循环依然可以用来遍历键名。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let es6 = {
  edition: 6,
  committee: &quot;TC39&quot;,
  standard: &quot;ECMA-262&quot;
};

for (let e in es6) {
  console.log(e);
}
// edition
// committee
// standard

for (let e of es6) {
  console.log(e);
}
// TypeError: es6[Symbol.iterator] is not a function
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码表示，对于普通的对象，<code v-pre>for...in</code>循环可以遍历键名，<code v-pre>for...of</code>循环会报错。</p>
<p>一种解决方法是，使用<code v-pre>Object.keys</code>方法将对象的键名生成一个数组，然后遍历这个数组。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>for (var key of Object.keys(someObject)) {
  console.log(key + ': ' + someObject[key]);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另一个方法是使用 Generator 函数将对象重新包装一下。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function* entries(obj) {
  for (let key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
}

for (let [key, value] of entries(obj)) {
  console.log(key, '-&gt;', value);
}
// a -&gt; 1
// b -&gt; 2
// c -&gt; 3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="与其他遍历语法的比较" tabindex="-1"><a class="header-anchor" href="#与其他遍历语法的比较" aria-hidden="true">#</a> 与其他遍历语法的比较</h3>
<p>以数组为例，JavaScript 提供多种遍历语法。最原始的写法就是<code v-pre>for</code>循环。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>for (var index = 0; index &lt; myArray.length; index++) {
  console.log(myArray[index]);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种写法比较麻烦，因此数组提供内置的<code v-pre>forEach</code>方法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>myArray.forEach(function (value) {
  console.log(value);
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种写法的问题在于，无法中途跳出<code v-pre>forEach</code>循环，<code v-pre>break</code>命令或<code v-pre>return</code>命令都不能奏效。</p>
<p><code v-pre>for...in</code>循环可以遍历数组的键名。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>for (var index in myArray) {
  console.log(myArray[index]);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>for...in</code>循环有几个缺点。</p>
<ul>
<li>数组的键名是数字，但是<code v-pre>for...in</code>循环是以字符串作为键名“0”、“1”、“2”等等。</li>
<li><code v-pre>for...in</code>循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键。</li>
<li>某些情况下，<code v-pre>for...in</code>循环会以任意顺序遍历键名。</li>
</ul>
<p>总之，<code v-pre>for...in</code>循环主要是为遍历对象而设计的，不适用于遍历数组。</p>
<p><code v-pre>for...of</code>循环相比上面几种做法，有一些显著的优点。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>for (let value of myArray) {
  console.log(value);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>有着同<code v-pre>for...in</code>一样的简洁语法，但是没有<code v-pre>for...in</code>那些缺点。</li>
<li>不同于<code v-pre>forEach</code>方法，它可以与<code v-pre>break</code>、<code v-pre>continue</code>和<code v-pre>return</code>配合使用。</li>
<li>提供了遍历所有数据结构的统一操作接口。</li>
</ul>
<p>下面是一个使用 break 语句，跳出<code v-pre>for...of</code>循环的例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>for (var n of fibonacci) {
  if (n &gt; 1000)
    break;
  console.log(n);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的例子，会输出斐波纳契数列小于等于 1000 的项。如果当前项大于 1000，就会使用<code v-pre>break</code>语句跳出<code v-pre>for...of</code>循环。</p>
</div></template>
