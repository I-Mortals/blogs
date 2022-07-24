<template><div><h1 id="函数式编程" tabindex="-1"><a class="header-anchor" href="#函数式编程" aria-hidden="true">#</a> 函数式编程</h1>
<p>JavaScript 语言从一诞生，就具有函数式编程的烙印。它将函数作为一种独立的数据类型，与其他数据类型处于完全平等的地位。在 JavaScript 语言中，你可以采用面向对象编程，也可以采用函数式编程。有人甚至说，JavaScript 是有史以来第一种被大规模采用的函数式编程语言。</p>
<!-- more -->
<p>ES6 的种种新增功能，使得函数式编程变得更方便、更强大。本章介绍 ES6 如何进行函数式编程。</p>
<h2 id="柯里化" tabindex="-1"><a class="header-anchor" href="#柯里化" aria-hidden="true">#</a> 柯里化</h2>
<p><strong>柯里化（currying）指的是将一个多参数的函数拆分成一系列函数，每个拆分后的函数都只接受一个参数</strong>（unary）。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function add (a, b) {
  return a + b;
}

add(1, 1) // 2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，函数<code v-pre>add</code>接受两个参数<code v-pre>a</code>和<code v-pre>b</code>。</p>
<p>柯里化就是将上面的函数拆分成两个函数，每个函数都只接受一个参数。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function add (a) {
  return function (b) {
    return a + b;
  }
}
// 或者采用箭头函数写法
const add = x =&gt; y =&gt; x + y;

const f = add(1);
f(1) // 2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，函数<code v-pre>add</code>只接受一个参数<code v-pre>a</code>，返回一个函数<code v-pre>f</code>。函数<code v-pre>f</code>也只接受一个参数<code v-pre>b</code>。</p>
<h2 id="函数合成" tabindex="-1"><a class="header-anchor" href="#函数合成" aria-hidden="true">#</a> 函数合成</h2>
<p>函数合成（function composition）指的是，将多个函数合成一个函数。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const compose = f =&gt; g =&gt; x =&gt; f(g(x));

const f = compose (x =&gt; x * 4) (x =&gt; x + 3);
f(2) // 20
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>compose</code>就是一个函数合成器，用于将两个函数合成一个函数。</p>
<p>可以发现，柯里化与函数合成有着密切的联系。前者用于将一个函数拆成多个函数，后者用于将多个函数合并成一个函数。</p>
<h2 id="参数倒置" tabindex="-1"><a class="header-anchor" href="#参数倒置" aria-hidden="true">#</a> 参数倒置</h2>
<p>参数倒置（flip）指的是改变函数前两个参数的顺序。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var divide = (a, b) =&gt; a / b;
var flip = f.flip(divide);

flip(10, 5) // 0.5
flip(1, 10) // 10

var three = (a, b, c) =&gt; [a, b, c];
var flip = f.flip(three);
flip(1, 2, 3); // =&gt; [2, 1, 3]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，如果按照正常的参数顺序，10 除以 5 等于 2。但是，参数倒置以后得到的新函数，结果就是 5 除以 10，结果得到 0.5。如果原函数有 3 个参数，则只颠倒前两个参数的位置。</p>
<p>参数倒置的代码非常简单。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let f = {};
f.flip =
  fn =&gt;
    (a, b, ...args) =&gt; fn(b, a, ...args.reverse());
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="执行边界" tabindex="-1"><a class="header-anchor" href="#执行边界" aria-hidden="true">#</a> 执行边界</h2>
<p>执行边界（until）指的是函数执行到满足条件为止。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let condition = x =&gt; x &gt; 100;
let inc = x =&gt; x + 1;
let until = f.until(condition, inc);

until(0) // 101

condition = x =&gt; x === 5;
until = f.until(condition, inc);

until(3) // 5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，第一段的条件是执行到<code v-pre>x</code>大于 100 为止，所以<code v-pre>x</code>初值为 0 时，会一直执行到 101。第二段的条件是执行到等于 5 为止，所以<code v-pre>x</code>最后的值是 5。</p>
<p>执行边界的实现如下。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let f = {};
f.until = (condition, f) =&gt;
  (...args) =&gt; {
    var r = f.apply(null, args);
    return condition(r) ? r : f.until(condition, f)(r);
  };
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码的关键就是，如果满足条件就返回结果，否则不断递归执行。</p>
<h2 id="队列操作" tabindex="-1"><a class="header-anchor" href="#队列操作" aria-hidden="true">#</a> 队列操作</h2>
<p>队列（list）操作包括以下几种。</p>
<ul>
<li><code v-pre>head</code>： 取出队列的第一个非空成员。</li>
<li><code v-pre>last</code>： 取出有限队列的最后一个非空成员。</li>
<li><code v-pre>tail</code>： 取出除了“队列头”以外的其他非空成员。</li>
<li><code v-pre>init</code>： 取出除了“队列尾”以外的其他非空成员。</li>
</ul>
<p>下面是例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>f.head(5, 27, 3, 1) // 5
f.last(5, 27, 3, 1) // 1
f.tail(5, 27, 3, 1) // [27, 3, 1]
f.init(5, 27, 3, 1) // [5, 27, 3]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些方法的实现如下。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let f = {};
f.head = (...xs) =&gt; xs[0];
f.last = (...xs) =&gt; xs.slice(-1);
f.tail = (...xs) =&gt; Array.prototype.slice.call(xs, 1);
f.init = (...xs) =&gt; xs.slice(0, -1);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="合并操作" tabindex="-1"><a class="header-anchor" href="#合并操作" aria-hidden="true">#</a> 合并操作</h2>
<p>合并操作分为<code v-pre>concat</code>和<code v-pre>concatMap</code>两种。前者就是将多个数组合成一个，后者则是先处理一下参数，然后再将处理结果合成一个数组。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>f.concat([5], [27], [3]) // [5, 27, 3]
f.concatMap(x =&gt; 'hi ' + x, 1, [[2]], 3) // ['hi 1', 'hi 2', 'hi 3']
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这两种方法的实现代码如下。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let f = {};
f.concat =
  (...xs) =&gt; xs.reduce((a, b) =&gt; a.concat(b));
f.concatMap =
  (f, ...xs) =&gt; f.concat(xs.map(f));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配对操作" tabindex="-1"><a class="header-anchor" href="#配对操作" aria-hidden="true">#</a> 配对操作</h2>
<p>配对操作分为<code v-pre>zip</code>和<code v-pre>zipWith</code>两种方法。<code v-pre>zip</code>操作将两个队列的成员，一一配对，合成一个新的队列。如果两个队列不等长，较长的那个队列多出来的成员，会被忽略。<code v-pre>zipWith</code>操作的第一个参数是一个函数，然后会将后面的队列成员一一配对，输入该函数，返回值就组成一个新的队列。</p>
<p>下面是例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let a = [0, 1, 2];
let b = [3, 4, 5];
let c = [6, 7, 8];

f.zip(a, b) // [[0, 3], [1, 4], [2, 5]]
f.zipWith((a, b) =&gt; a + b, a, b, c) // [9, 12, 15]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>zipWith</code>方法的第一个参数是一个求和函数，它将后面三个队列的成员，一一配对进行相加。</p>
<p>这两个方法的实现如下。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let f = {};

f.zip = (...xs) =&gt; {
  let r = [];
  let nple = [];
  let length = Math.min.apply(null, xs.map(x =&gt; x.length));

  for (var i = 0; i &lt; length; i++) {
    xs.forEach(
      x =&gt; nple.push(x[i])
    );

    r.push(nple);
    nple = [];
  }

  return r;
};

f.zipWith = (op, ...xs) =&gt;
  f.zip.apply(null, xs).map(
    (x) =&gt; x.reduce(op)
  );
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考链接" tabindex="-1"><a class="header-anchor" href="#参考链接" aria-hidden="true">#</a> 参考链接</h2>
<ul>
<li>Mateo Gianolio, <a href="http://casualjavascript.com/?1" target="_blank" rel="noopener noreferrer">Haskell in ES6: Part 1</a></li>
</ul>
</div></template>
