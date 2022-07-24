<template><div><h1 id="数组的扩展" tabindex="-1"><a class="header-anchor" href="#数组的扩展" aria-hidden="true">#</a> 数组的扩展</h1>
<h2 id="扩展运算符" tabindex="-1"><a class="header-anchor" href="#扩展运算符" aria-hidden="true">#</a> 扩展运算符</h2>
<h3 id="含义" tabindex="-1"><a class="header-anchor" href="#含义" aria-hidden="true">#</a> 含义</h3>
<p>扩展运算符（spread）是三个点（<code v-pre>...</code>）。它好比 rest 参数的逆运算，<strong>将一个数组转为用逗号分隔的参数序列</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console.log(...[1, 2, 3])
// 1 2 3

console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5

[...document.querySelectorAll('div')]
// [&lt;div&gt;, &lt;div&gt;, &lt;div&gt;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><!-- more -->
<p><strong>该运算符主要用于函数调用</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function push(array, ...items) {
  array.push(...items);
}

function add(x, y) {
  return x + y;
}

const numbers = [4, 38];
add(...numbers) // 42
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>array.push(...items)</code>和<code v-pre>add(...numbers)</code>这两行，都是函数的调用，它们都使用了扩展运算符。该运算符将一个数组，变为参数序列。</p>
<p>扩展运算符与正常的函数参数可以结合使用，非常灵活。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function f(v, w, x, y, z) { }
const args = [0, 1];
f(-1, ...args, 2, ...[3]);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>扩展运算符后面还可以放置表达式。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const arr = [
  ...(x &gt; 0 ? ['a'] : []),
  'b',
];
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果扩展运算符后面是一个空数组，则不产生任何效果。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>[...[], 1]
// [1]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，只有函数调用时，扩展运算符才可以放在圆括号中，否则会报错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>(...[1, 2])
// Uncaught SyntaxError: Unexpected number

console.log((...[1, 2]))
// Uncaught SyntaxError: Unexpected number

console.log(...[1, 2])
// 1 2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面三种情况，扩展运算符都放在圆括号里面，但是前两种情况会报错，因为扩展运算符所在的括号不是函数调用。</p>
<h3 id="替代函数的-apply-方法" tabindex="-1"><a class="header-anchor" href="#替代函数的-apply-方法" aria-hidden="true">#</a> 替代函数的 apply 方法</h3>
<p>由于扩展运算符可以展开数组，所以不再需要<code v-pre>apply</code>方法，将数组转为函数的参数了。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// ES5 的写法
function f(x, y, z) {
  // ...
}
var args = [0, 1, 2];
f.apply(null, args);

// ES6的写法
function f(x, y, z) {
  // ...
}
let args = [0, 1, 2];
f(...args);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面是扩展运算符取代<code v-pre>apply</code>方法的一个实际的例子，应用<code v-pre>Math.max</code>方法，简化求出一个数组最大元素的写法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// ES5 的写法
Math.max.apply(null, [14, 3, 77])

// ES6 的写法
Math.max(...[14, 3, 77])

// 等同于
Math.max(14, 3, 77);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，由于 JavaScript 不提供求数组最大元素的函数，所以只能套用<code v-pre>Math.max</code>函数，将数组转为一个参数序列，然后求最大值。有了扩展运算符以后，就可以直接用<code v-pre>Math.max</code>了。</p>
<p>另一个例子是通过<code v-pre>push</code>函数，将一个数组添加到另一个数组的尾部。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// ES5的 写法
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
Array.prototype.push.apply(arr1, arr2);

// ES6 的写法
let arr1 = [0, 1, 2];
let arr2 = [3, 4, 5];
arr1.push(...arr2);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码的 ES5 写法中，<code v-pre>push</code>方法的参数不能是数组，所以只好通过<code v-pre>apply</code>方法变通使用<code v-pre>push</code>方法。有了扩展运算符，就可以直接将数组传入<code v-pre>push</code>方法。</p>
<p>下面是另外一个例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// ES5
new (Date.bind.apply(Date, [null, 2015, 1, 1]))
// ES6
new Date(...[2015, 1, 1]);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="扩展运算符的应用" tabindex="-1"><a class="header-anchor" href="#扩展运算符的应用" aria-hidden="true">#</a> 扩展运算符的应用</h3>
<p><strong>（1）复制数组</strong></p>
<p>数组是复合的数据类型，直接复制的话，只是复制了指向底层数据结构的指针，而不是克隆一个全新的数组。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const a1 = [1, 2];
const a2 = a1;

a2[0] = 2;
a1 // [2, 2]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>a2</code>并不是<code v-pre>a1</code>的克隆，而是指向同一份数据的另一个指针。修改<code v-pre>a2</code>，会直接导致<code v-pre>a1</code>的变化。</p>
<p>ES5 只能用变通方法来复制数组。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const a1 = [1, 2];
const a2 = a1.concat();

a2[0] = 2;
a1 // [1, 2]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>a1</code>会返回原数组的克隆，再修改<code v-pre>a2</code>就不会对<code v-pre>a1</code>产生影响。</p>
<p>扩展运算符提供了复制数组的简便写法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const a1 = [1, 2];
// 写法一
const a2 = [...a1];
// 写法二
const [...a2] = a1;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的两种写法，<code v-pre>a2</code>都是<code v-pre>a1</code>的克隆。</p>
<p><strong>（2）合并数组</strong></p>
<p>扩展运算符提供了数组合并的新写法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const arr1 = ['a', 'b'];
const arr2 = ['c'];
const arr3 = ['d', 'e'];

// ES5 的合并数组
arr1.concat(arr2, arr3);
// [ 'a', 'b', 'c', 'd', 'e' ]

// ES6 的合并数组
[...arr1, ...arr2, ...arr3]
// [ 'a', 'b', 'c', 'd', 'e' ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不过，这两种方法都是浅拷贝，使用的时候需要注意。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const a1 = [{ foo: 1 }];
const a2 = [{ bar: 2 }];

const a3 = a1.concat(a2);
const a4 = [...a1, ...a2];

a3[0] === a1[0] // true
a4[0] === a1[0] // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>a3</code>和<code v-pre>a4</code>是用两种不同方法合并而成的新数组，但是它们的成员都是对原数组成员的引用，这就是浅拷贝。如果修改了引用指向的值，会同步反映到新数组。</p>
<p><strong>（3）与解构赋值结合</strong></p>
<p>扩展运算符可以与解构赋值结合起来，用于生成数组。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// ES5
a = list[0], rest = list.slice(1)
// ES6
[a, ...rest] = list
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面是另外一些例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest  // [2, 3, 4, 5]

const [first, ...rest] = [];
first // undefined
rest  // []

const [first, ...rest] = [&quot;foo&quot;];
first  // &quot;foo&quot;
rest   // []
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const [...butLast, last] = [1, 2, 3, 4, 5];
// 报错

const [first, ...middle, last] = [1, 2, 3, 4, 5];
// 报错
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>（4）字符串</strong></p>
<p>扩展运算符还可以将字符串转为真正的数组。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>[...'hello']
// [ &quot;h&quot;, &quot;e&quot;, &quot;l&quot;, &quot;l&quot;, &quot;o&quot; ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的写法，有一个重要的好处，那就是能够正确识别四个字节的 Unicode 字符。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'x\uD83D\uDE80y'.length // 4
[...'x\uD83D\uDE80y'].length // 3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码的第一种写法，JavaScript 会将四个字节的 Unicode 字符，识别为 2 个字符，采用扩展运算符就没有这个问题。因此，正确返回字符串长度的函数，可以像下面这样写。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function length(str) {
  return [...str].length;
}

length('x\uD83D\uDE80y') // 3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>凡是涉及到操作四个字节的 Unicode 字符的函数，都有这个问题。因此，最好都用扩展运算符改写。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let str = 'x\uD83D\uDE80y';

str.split('').reverse().join('')
// 'y\uDE80\uD83Dx'

[...str].reverse().join('')
// 'y\uD83D\uDE80x'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，如果不用扩展运算符，字符串的<code v-pre>reverse</code>操作就不正确。</p>
<p><strong>（5）实现了 Iterator 接口的对象</strong></p>
<p>任何定义了遍历器（Iterator）接口的对象（参阅 Iterator 一章），都可以用扩展运算符转为真正的数组。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let nodeList = document.querySelectorAll('div');
let array = [...nodeList];
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>querySelectorAll</code>方法返回的是一个<code v-pre>NodeList</code>对象。它不是数组，而是一个类似数组的对象。这时，扩展运算符可以将其转为真正的数组，原因就在于<code v-pre>NodeList</code>对象实现了 Iterator 。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Number.prototype[Symbol.iterator] = function*() {
  let i = 0;
  let num = this.valueOf();
  while (i &lt; num) {
    yield i++;
  }
}

console.log([...5]) // [0, 1, 2, 3, 4]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，先定义了<code v-pre>Number</code>对象的遍历器接口，扩展运算符将<code v-pre>5</code>自动转成<code v-pre>Number</code>实例以后，就会调用这个接口，就会返回自定义的结果。</p>
<p>对于那些没有部署 Iterator 接口的类似数组的对象，扩展运算符就无法将其转为真正的数组。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3
};

// TypeError: Cannot spread non-iterable object.
let arr = [...arrayLike];
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>arrayLike</code>是一个类似数组的对象，但是没有部署 Iterator 接口，扩展运算符就会报错。这时，可以改为使用<code v-pre>Array.from</code>方法将<code v-pre>arrayLike</code>转为真正的数组。</p>
<p><strong>（6）Map 和 Set 结构，Generator 函数</strong></p>
<p>扩展运算符内部调用的是数据结构的 Iterator 接口，因此只要具有 Iterator 接口的对象，都可以使用扩展运算符，比如 Map 结构。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

let arr = [...map.keys()]; // [1, 2, 3]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Generator 函数运行后，返回一个遍历器对象，因此也可以使用扩展运算符。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const go = function*(){
  yield 1;
  yield 2;
  yield 3;
};

[...go()] // [1, 2, 3]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，变量<code v-pre>go</code>是一个 Generator 函数，执行后返回的是一个遍历器对象，对这个遍历器对象执行扩展运算符，就会将内部遍历得到的值，转为一个数组。</p>
<p>如果对没有 Iterator 接口的对象，使用扩展运算符，将会报错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const obj = {a: 1, b: 2};
let arr = [...obj]; // TypeError: Cannot spread non-iterable object
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="array-from" tabindex="-1"><a class="header-anchor" href="#array-from" aria-hidden="true">#</a> Array.from()</h2>
<p><code v-pre>Array.from</code>方法<strong>用于将两类对象转为真正的数组</strong>：<strong>类似数组的对象</strong>（array-like object）和<strong>可遍历（iterable）的对象</strong>（包括 ES6 新增的数据结构 Set 和 Map）。</p>
<p>下面是一个类似数组的对象，<code v-pre>Array.from</code>将它转为真正的数组。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实际应用中，常见的类似数组的对象是 DOM 操作返回的 NodeList 集合，以及函数内部的<code v-pre>arguments</code>对象。<code v-pre>Array.from</code>都可以将它们转为真正的数组。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// NodeList对象
let ps = document.querySelectorAll('p');
Array.from(ps).filter(p =&gt; {
  return p.textContent.length &gt; 100;
});

// arguments对象
function foo() {
  var args = Array.from(arguments);
  // ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>querySelectorAll</code>方法返回的是一个类似数组的对象，可以将这个对象转为真正的数组，再使用<code v-pre>filter</code>方法。</p>
<p>只要是部署了 Iterator 接口的数据结构，<code v-pre>Array.from</code>都能将其转为数组。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Array.from('hello')
// ['h', 'e', 'l', 'l', 'o']

let namesSet = new Set(['a', 'b'])
Array.from(namesSet) // ['a', 'b']
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，字符串和 Set 结构都具有 Iterator 接口，因此可以被<code v-pre>Array.from</code>转为真正的数组。</p>
<p>如果参数是一个真正的数组，<code v-pre>Array.from</code>会返回一个一模一样的新数组。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Array.from([1, 2, 3])
// [1, 2, 3]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>值得提醒的是，<strong>扩展运算符</strong>（<code v-pre>...</code>）<strong>也可以将某些数据结构转为数组</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// arguments对象
function foo() {
  const args = [...arguments];
}

// NodeList对象
[...document.querySelectorAll('div')]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>扩展运算符背后调用的是遍历器接口（<code v-pre>Symbol.iterator</code>），如果一个对象没有部署这个接口，就无法转换。<code v-pre>Array.from</code>方法还支持类似数组的对象。所谓类似数组的对象，本质特征只有一点，即必须有<code v-pre>length</code>属性。因此，<strong>任何有<code v-pre>length</code>属性的对象，都可以通过<code v-pre>Array.from</code>方法转为数组</strong>，而此时扩展运算符就无法转换。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Array.from({ length: 3 });
// [ undefined, undefined, undefined ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>Array.from</code>返回了一个具有三个成员的数组，每个位置的值都是<code v-pre>undefined</code>。扩展运算符转换不了这个对象。</p>
<p>对于还没有部署该方法的浏览器，可以用<code v-pre>Array.prototype.slice</code>方法替代。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const toArray = (() =&gt;
  Array.from ? Array.from : obj =&gt; [].slice.call(obj)
)();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>Array.from</code>还可以<strong>接受第二个参数，作用类似于数组的<code v-pre>map</code>方法</strong>，用来对每个元素进行处理，将处理后的值放入返回的数组。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Array.from(arrayLike, x =&gt; x * x);
// 等同于
Array.from(arrayLike).map(x =&gt; x * x);

Array.from([1, 2, 3], (x) =&gt; x * x)
// [1, 4, 9]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面的例子是取出一组 DOM 节点的文本内容。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let spans = document.querySelectorAll('span.name');

// map()
let names1 = Array.prototype.map.call(spans, s =&gt; s.textContent);

// Array.from()
let names2 = Array.from(spans, s =&gt; s.textContent)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面的例子将数组中布尔值为<code v-pre>false</code>的成员转为<code v-pre>0</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Array.from([1, , 2, , 3], (n) =&gt; n || 0)
// [1, 0, 2, 0, 3]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>另一个例子是返回各种数据的类型。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function typesOf () {
  return Array.from(arguments, value =&gt; typeof value)
}
typesOf(null, [], NaN)
// ['object', 'object', 'number']
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果<code v-pre>map</code>函数里面用到了<code v-pre>this</code>关键字，还可以传入<code v-pre>Array.from</code>的<strong>第三个参数，用来绑定<code v-pre>this</code>。</strong></p>
<p><strong><code v-pre>Array.from()</code>可以将各种值转为真正的数组，并且还提供<code v-pre>map</code>功能。这实际上意味着，只要有一个原始的数据结构，你就可以先对它的值进行处理，然后转成规范的数组结构，进而就可以使用数量众多的数组方法。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Array.from({ length: 2 }, () =&gt; 'jack')
// ['jack', 'jack']
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>Array.from</code>的第一个参数指定了第二个参数运行的次数。这种特性可以让该方法的用法变得非常灵活。</p>
<p><code v-pre>Array.from()</code>的另一个应用是，将字符串转为数组，然后返回字符串的长度。因为它能正确处理各种 Unicode 字符，可以避免 JavaScript 将大于<code v-pre>\uFFFF</code>的 Unicode 字符，算作两个字符的 bug。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function countSymbols(string) {
  return Array.from(string).length;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="array-of-总是返回参数值组成的数组" tabindex="-1"><a class="header-anchor" href="#array-of-总是返回参数值组成的数组" aria-hidden="true">#</a> Array.of() 总是返回参数值组成的数组</h2>
<p><code v-pre>Array.of</code>方法<strong>用于将一组值，转换为数组</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个方法的主要目的，是弥补数组构造函数<code v-pre>Array()</code>的不足。因为参数个数的不同，会导致<code v-pre>Array()</code>的行为有差异。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>Array</code>方法没有参数、一个参数、三个参数时，返回结果都不一样。只有当参数个数不少于 2 个时，<code v-pre>Array()</code>才会返回由参数组成的新数组。参数个数只有一个时，实际上是指定数组的长度。</p>
<p><code v-pre>Array.of</code>基本上可以用来替代<code v-pre>Array()</code>或<code v-pre>new Array()</code>，并且不存在由于参数不同而导致的重载。<strong>它的行为非常统一</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Array.of() // []
Array.of(undefined) // [undefined]
Array.of(1) // [1]
Array.of(1, 2) // [1, 2]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>Array.of</code><strong>总是返回参数值组成的数组</strong>。如果没有参数，就返回一个空数组。</p>
<p><code v-pre>Array.of</code>方法可以用下面的代码模拟实现。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function ArrayOf(){
  return [].slice.call(arguments);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="数组实例的-copywithin" tabindex="-1"><a class="header-anchor" href="#数组实例的-copywithin" aria-hidden="true">#</a> 数组实例的 copyWithin()</h2>
<p>数组实例的<code v-pre>copyWithin()</code>方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，<strong>会修改当前数组</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Array.prototype.copyWithin(target, start = 0, end = this.length)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>它接受三个参数。</p>
<ul>
<li>target（必需）：从该位置开始替换数据。如果为负值，表示倒数。</li>
<li>start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算。</li>
<li>end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算。</li>
</ul>
<p>这三个参数都应该是数值，如果不是，会自动转为数值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>[1, 2, 3, 4, 5].copyWithin(0, 3)
// [4, 5, 3, 4, 5]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码表示将从 3 号位直到数组结束的成员（4 和 5），复制到从 0 号位开始的位置，结果覆盖了原来的 1 和 2。</p>
<p>下面是更多例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 将3号位复制到0号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)
// [4, 2, 3, 4, 5]

// -2相当于3号位，-1相当于4号位
[1, 2, 3, 4, 5].copyWithin(0, -2, -1)
// [4, 2, 3, 4, 5]

// 将3号位复制到0号位
[].copyWithin.call({length: 5, 3: 1}, 0, 3)
// {0: 1, 3: 1, length: 5}

// 将2号位到数组结束，复制到0号位
let i32a = new Int32Array([1, 2, 3, 4, 5]);
i32a.copyWithin(0, 2);
// Int32Array [3, 4, 5, 4, 5]

// 对于没有部署 TypedArray 的 copyWithin 方法的平台
// 需要采用下面的写法
[].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
// Int32Array [4, 2, 3, 4, 5]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="数组实例的-find-和-findindex" tabindex="-1"><a class="header-anchor" href="#数组实例的-find-和-findindex" aria-hidden="true">#</a> 数组实例的 find() 和 findIndex()</h2>
<p>数组实例的<code v-pre>find</code>方法，用于<strong>找出第一个符合条件的数组成员</strong>。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为<code v-pre>true</code>的成员，然后返回该成员。如果没有符合条件的成员，则返回<code v-pre>undefined</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>[1, 4, -5, 10].find((n) =&gt; n &lt; 0)
// -5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码找出数组中第一个小于 0 的成员。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>[1, 5, 10, 15].find(function(value, index, arr) {
  return value &gt; 9;
}) // 10
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>find</code>方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。</p>
<p>数组实例的<code v-pre>findIndex</code>方法的用法与<code v-pre>find</code>方法非常类似，<strong>返回第一个符合条件的数组成员的位置</strong>，如果所有成员都不符合条件，则返回<code v-pre>-1</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value &gt; 9;
}) // 2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这两个方法都可以<strong>接受第二个参数</strong>，用来<strong>绑定回调函数的<code v-pre>this</code>对象</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function f(v){
  return v &gt; this.age;
}
let person = {name: 'John', age: 20};
[10, 12, 26, 15].find(f, person);    // 26
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码中，<code v-pre>find</code>函数接收了第二个参数<code v-pre>person</code>对象，回调函数中的<code v-pre>this</code>对象指向<code v-pre>person</code>对象。</p>
<p>另外，这两个方法都可以发现<code v-pre>NaN</code>，弥补了数组的<code v-pre>indexOf</code>方法的不足。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>[NaN].indexOf(NaN)
// -1

[NaN].findIndex(y =&gt; Object.is(NaN, y))
// 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>indexOf</code>方法无法识别数组的<code v-pre>NaN</code>成员，但是<code v-pre>findIndex</code>方法可以借助<code v-pre>Object.is</code>方法做到。</p>
<h2 id="数组实例的-fill" tabindex="-1"><a class="header-anchor" href="#数组实例的-fill" aria-hidden="true">#</a> 数组实例的 fill()</h2>
<p><code v-pre>fill</code>方法使用给定值，填充一个数组。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>['a', 'b', 'c'].fill(7)
// [7, 7, 7]

new Array(3).fill(7)
// [7, 7, 7]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码表明，<code v-pre>fill</code>方法用于空数组的初始化非常方便。数组中已有的元素，会被全部抹去。</p>
<p><code v-pre>fill</code>方法还可以<strong>接受第二个</strong>和<strong>第三个参数</strong>，用于指定填充的<strong>起始位置</strong>和<strong>结束位置</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码表示，<code v-pre>fill</code>方法从 1 号位开始，向原数组填充 7，到 2 号位之前结束。</p>
<p>注意，如果填充的类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let arr = new Array(3).fill({name: &quot;Mike&quot;});
arr[0].name = &quot;Ben&quot;;
arr
// [{name: &quot;Ben&quot;}, {name: &quot;Ben&quot;}, {name: &quot;Ben&quot;}]

let arr = new Array(3).fill([]);
arr[0].push(5);
arr
// [[5], [5], [5]]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="数组实例的-entries-keys-和-values" tabindex="-1"><a class="header-anchor" href="#数组实例的-entries-keys-和-values" aria-hidden="true">#</a> 数组实例的 entries()，keys() 和 values()</h2>
<p>ES6 提供三个新的方法——<code v-pre>entries()</code>，<code v-pre>keys()</code>和<code v-pre>values()</code>——用于遍历数组。它们都<strong>返回一个遍历器对象</strong>（详见《Iterator》一章），可以用<code v-pre>for...of</code>循环进行遍历，唯一的区别是<code v-pre>keys()</code>是对<strong>键名</strong>的遍历、<code v-pre>values()</code>是对<strong>键值</strong>的遍历，<code v-pre>entries()</code>是对<strong>键值对</strong>的遍历。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 &quot;a&quot;
// 1 &quot;b&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果不使用<code v-pre>for...of</code>循环，可以手动调用遍历器对象的<code v-pre>next</code>方法，进行遍历。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let letter = ['a', 'b', 'c'];
let entries = letter.entries();
console.log(entries.next().value); // [0, 'a']
console.log(entries.next().value); // [1, 'b']
console.log(entries.next().value); // [2, 'c']
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="数组实例的-includes" tabindex="-1"><a class="header-anchor" href="#数组实例的-includes" aria-hidden="true">#</a> 数组实例的 includes()</h2>
<p><code v-pre>Array.prototype.includes</code>方法返回一个布尔值，表示某个数组<strong>是否包含给定的值</strong>，与字符串的<code v-pre>includes</code>方法类似。ES2016 引入了该方法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>[1, 2, 3].includes(2)     // true
[1, 2, 3].includes(4)     // false
[1, 2, NaN].includes(NaN) // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该方法的第二个参数表示搜索的起始位置，默认为<code v-pre>0</code>。如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（比如第二个参数为<code v-pre>-4</code>，但数组长度为<code v-pre>3</code>），则会重置为从<code v-pre>0</code>开始。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>没有该方法之前，我们通常使用数组的<code v-pre>indexOf</code>方法，检查是否包含某个值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>if (arr.indexOf(el) !== -1) {
  // ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>indexOf</code>方法有两个缺点，一是不够语义化，它的含义是找到参数值的第一个出现位置，所以要去比较是否不等于<code v-pre>-1</code>，表达起来不够直观。二是，它内部使用严格相等运算符（<code v-pre>===</code>）进行判断，这会导致对<code v-pre>NaN</code>的误判。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>[NaN].indexOf(NaN)
// -1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>includes</code>使用的是不一样的判断算法，就没有这个问题。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>[NaN].includes(NaN)
// true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>下面代码用来检查当前环境是否支持该方法，如果不支持，部署一个简易的替代版本。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const contains = (() =&gt;
  Array.prototype.includes
    ? (arr, value) =&gt; arr.includes(value)
    : (arr, value) =&gt; arr.some(el =&gt; el === value)
)();
contains(['foo', 'bar'], 'baz'); // =&gt; false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外，Map 和 Set 数据结构有一个<code v-pre>has</code>方法，需要注意与<code v-pre>includes</code>区分。</p>
<ul>
<li>Map 结构的<code v-pre>has</code>方法，是用来查找键名的，比如<code v-pre>Map.prototype.has(key)</code>、<code v-pre>WeakMap.prototype.has(key)</code>、<code v-pre>Reflect.has(target, propertyKey)</code>。</li>
<li>Set 结构的<code v-pre>has</code>方法，是用来查找值的，比如<code v-pre>Set.prototype.has(value)</code>、<code v-pre>WeakSet.prototype.has(value)</code>。</li>
</ul>
<h2 id="数组实例的-flat-flatmap" tabindex="-1"><a class="header-anchor" href="#数组实例的-flat-flatmap" aria-hidden="true">#</a> 数组实例的 flat()，flatMap()</h2>
<p>数组的成员有时还是数组，<code v-pre>Array.prototype.flat()</code>用于<strong>将嵌套的数组“拉平”，变成一维的数组</strong>。该方法返回一个新数组，对原数据没有影响。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>[1, 2, [3, 4]].flat()
// [1, 2, 3, 4]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，原数组的成员里面有一个数组，<code v-pre>flat()</code>方法将子数组的成员取出来，添加在原来的位置。</p>
<p><code v-pre>flat()</code>默认只会“拉平”一层，如果想要“拉平”多层的嵌套数组，可以将<code v-pre>flat()</code>方法的<strong>参数写成一个整数，表示想要拉平的层数，默认为1。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>[1, 2, [3, [4, 5]]].flat()
// [1, 2, 3, [4, 5]]

[1, 2, [3, [4, 5]]].flat(2)
// [1, 2, 3, 4, 5]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>flat()</code>的参数为2，表示要“拉平”两层的嵌套数组。</p>
<p>如果不管有多少层嵌套，都要转成一维数组，可以用<code v-pre>Infinity</code>关键字作为参数。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>[1, [2, [3]]].flat(Infinity)
// [1, 2, 3]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果原数组有空位，<code v-pre>flat()</code>方法会跳过空位。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>[1, 2, , 4, 5].flat()
// [1, 2, 4, 5]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>flatMap()</code>方法对原数组的每个成员执行一个函数（相当于执行<code v-pre>Array.prototype.map()</code>），然后对返回值组成的数组执行<code v-pre>flat()</code>方法。该方法返回一个新数组，不改变原数组。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 相当于 [2, 3, 4].map(x =&gt; [x, x*2]).flat()
[2, 3, 4].flatMap((x) =&gt; [x, x * 2])
// [2, 4, 3, 6, 4, 8]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>flatMap()</code><strong>只能展开一层数组</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 相当于 [[[2]], [[4]], [[6]], [[8]]].flat()
[1, 2, 3, 4].flatMap(x =&gt; [[x * 2]])
// [[2], [4], [6], [8]]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，遍历函数返回的是一个双层的数组，但是默认只能展开一层，因此<code v-pre>flatMap()</code>返回的还是一个嵌套数组。</p>
<p><code v-pre>flatMap()</code>方法的参数是一个遍历函数，该函数可以接受三个参数，分别是当前数组成员、当前数组成员的位置（从零开始）、原数组。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>arr.flatMap(function callback(currentValue[, index[, array]]) {
  // ...
}[, thisArg])
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>flatMap()</code>方法还可以有第二个参数，用来绑定遍历函数里面的<code v-pre>this</code>。</p>
<h2 id="数组的空位" tabindex="-1"><a class="header-anchor" href="#数组的空位" aria-hidden="true">#</a> 数组的空位</h2>
<p>数组的空位指，数组的某一个位置没有任何值。比如，<code v-pre>Array</code>构造函数返回的数组都是空位。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Array(3) // [, , ,]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>Array(3)</code>返回一个具有 3 个空位的数组。</p>
<p>注意，空位不是<code v-pre>undefined</code>，一个位置的值等于<code v-pre>undefined</code>，依然是有值的。空位是没有任何值，<code v-pre>in</code>运算符可以说明这一点。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>0 in [undefined, undefined, undefined] // true
0 in [, , ,] // false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码说明，第一个数组的 0 号位置是有值的，第二个数组的 0 号位置没有值。</p>
<p>ES5 对空位的处理，已经很不一致了，大多数情况下会忽略空位。</p>
<ul>
<li><code v-pre>forEach()</code>, <code v-pre>filter()</code>, <code v-pre>reduce()</code>, <code v-pre>every()</code> 和<code v-pre>some()</code>都会跳过空位。</li>
<li><code v-pre>map()</code>会跳过空位，但会保留这个值</li>
<li><code v-pre>join()</code>和<code v-pre>toString()</code>会将空位视为<code v-pre>undefined</code>，而<code v-pre>undefined</code>和<code v-pre>null</code>会被处理成空字符串。</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// forEach方法
[,'a'].forEach((x,i) =&gt; console.log(i)); // 1

// filter方法
['a',,'b'].filter(x =&gt; true) // ['a','b']

// every方法
[,'a'].every(x =&gt; x==='a') // true

// reduce方法
[1,,2].reduce((x,y) =&gt; x+y) // 3

// some方法
[,'a'].some(x =&gt; x !== 'a') // false

// map方法
[,'a'].map(x =&gt; 1) // [,1]

// join方法
[,'a',undefined,null].join('#') // &quot;#a##&quot;

// toString方法
[,'a',undefined,null].toString() // &quot;,a,,&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ES6 则是明确将空位转为<code v-pre>undefined</code>。</p>
<p><code v-pre>Array.from</code>方法会将数组的空位，转为<code v-pre>undefined</code>，也就是说，这个方法不会忽略空位。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Array.from(['a',,'b'])
// [ &quot;a&quot;, undefined, &quot;b&quot; ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>扩展运算符（<code v-pre>...</code>）也会将空位转为<code v-pre>undefined</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>[...['a',,'b']]
// [ &quot;a&quot;, undefined, &quot;b&quot; ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>copyWithin()</code>会连空位一起拷贝。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>[,'a','b',,].copyWithin(2,0) // [,&quot;a&quot;,,&quot;a&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>fill()</code>会将空位视为正常的数组位置。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>new Array(3).fill('a') // [&quot;a&quot;,&quot;a&quot;,&quot;a&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>for...of</code>循环也会遍历空位。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let arr = [, ,];
for (let i of arr) {
  console.log(1);
}
// 1
// 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，数组<code v-pre>arr</code>有两个空位，<code v-pre>for...of</code>并没有忽略它们。如果改成<code v-pre>map</code>方法遍历，空位是会跳过的。</p>
<p><code v-pre>entries()</code>、<code v-pre>keys()</code>、<code v-pre>values()</code>、<code v-pre>find()</code>和<code v-pre>findIndex()</code>会将空位处理成<code v-pre>undefined</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// entries()
[...[,'a'].entries()] // [[0,undefined], [1,&quot;a&quot;]]

// keys()
[...[,'a'].keys()] // [0,1]

// values()
[...[,'a'].values()] // [undefined,&quot;a&quot;]

// find()
[,'a'].find(x =&gt; true) // undefined

// findIndex()
[,'a'].findIndex(x =&gt; true) // 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于空位的处理规则非常不统一，所以建议避免出现空位。</p>
<h2 id="array-prototype-sort-的排序稳定性" tabindex="-1"><a class="header-anchor" href="#array-prototype-sort-的排序稳定性" aria-hidden="true">#</a> Array.prototype.sort() 的排序稳定性</h2>
<p>排序稳定性（stable sorting）是排序算法的重要属性，指的是排序关键字相同的项目，排序前后的顺序不变。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const arr = [
  'peach',
  'straw',
  'apple',
  'spork'
];

const stableSorting = (s1, s2) =&gt; {
  if (s1[0] &lt; s2[0]) return -1;
  return 1;
};

arr.sort(stableSorting)
// [&quot;apple&quot;, &quot;peach&quot;, &quot;straw&quot;, &quot;spork&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码对数组<code v-pre>arr</code>按照首字母进行排序。排序结果中，<code v-pre>straw</code>在<code v-pre>spork</code>的前面，跟原始顺序一致，所以排序算法<code v-pre>stableSorting</code>是稳定排序。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const unstableSorting = (s1, s2) =&gt; {
  if (s1[0] &lt;= s2[0]) return -1;
  return 1;
};

arr.sort(unstableSorting)
// [&quot;apple&quot;, &quot;peach&quot;, &quot;spork&quot;, &quot;straw&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，排序结果是<code v-pre>spork</code>在<code v-pre>straw</code>前面，跟原始顺序相反，所以排序算法<code v-pre>unstableSorting</code>是不稳定的。</p>
<p>常见的排序算法之中，插入排序、合并排序、冒泡排序等都是稳定的，堆排序、快速排序等是不稳定的。不稳定排序的主要缺点是，多重排序时可能会产生问题。假设有一个姓和名的列表，要求按照“姓氏为主要关键字，名字为次要关键字”进行排序。开发者可能会先按名字排序，再按姓氏进行排序。如果排序算法是稳定的，这样就可以达到“先姓氏，后名字”的排序效果。如果是不稳定的，就不行。</p>
<p>早先的 ECMAScript 没有规定，<code v-pre>Array.prototype.sort()</code>的默认排序算法是否稳定，留给浏览器自己决定，这导致某些实现是不稳定的。<a href="https://github.com/tc39/ecma262/pull/1340" target="_blank" rel="noopener noreferrer">ES2019</a> 明确规定，<code v-pre>Array.prototype.sort()</code>的默认排序算法必须稳定。这个规定已经做到了，现在 JavaScript 各个主要实现的默认排序算法都是稳定的。</p>
</div></template>
