<template><div><h1 id="数值的扩展" tabindex="-1"><a class="header-anchor" href="#数值的扩展" aria-hidden="true">#</a> 数值的扩展</h1>
<h2 id="二进制和八进制表示法" tabindex="-1"><a class="header-anchor" href="#二进制和八进制表示法" aria-hidden="true">#</a> 二进制和八进制表示法</h2>
<p>ES6 提供了二进制和八进制数值的新的写法，分别用前缀<code v-pre>0b</code>（或<code v-pre>0B</code>）和<code v-pre>0o</code>（或<code v-pre>0O</code>）表示。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>0b111110111 === 503 // true
0o767 === 503 // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><!-- more -->
<p>从 ES5 开始，在严格模式之中，八进制就不再允许使用前缀<code v-pre>0</code>表示，ES6 进一步明确，要使用前缀<code v-pre>0o</code>表示。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 非严格模式
(function(){
  console.log(0o11 === 011);
})() // true

// 严格模式
(function(){
  'use strict';
  console.log(0o11 === 011);
})() // Uncaught SyntaxError: Octal literals are not allowed in strict mode.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果要将<code v-pre>0b</code>和<code v-pre>0o</code>前缀的字符串数值转为十进制，要使用<code v-pre>Number</code>方法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Number('0b111')  // 7
Number('0o10')  // 8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="number-isfinite-是否为有限-number-isnan-是否为nan" tabindex="-1"><a class="header-anchor" href="#number-isfinite-是否为有限-number-isnan-是否为nan" aria-hidden="true">#</a> Number.isFinite() 是否为有限, Number.isNaN() 是否为NaN</h2>
<p>ES6 在<code v-pre>Number</code>对象上，新提供了<code v-pre>Number.isFinite()</code>和<code v-pre>Number.isNaN()</code>两个方法。</p>
<p><code v-pre>Number.isFinite()</code>用来检查一个数值是否为有限的（finite），即不是<code v-pre>Infinity</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Number.isFinite(15); // true
Number.isFinite(0.8); // true
Number.isFinite(NaN); // false
Number.isFinite(Infinity); // false
Number.isFinite(-Infinity); // false
Number.isFinite('foo'); // false
Number.isFinite('15'); // false
Number.isFinite(true); // false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，如果参数类型不是数值，<code v-pre>Number.isFinite</code>一律返回<code v-pre>false</code>。</p>
<p><code v-pre>Number.isNaN()</code>用来检查一个值是否为<code v-pre>NaN</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Number.isNaN(NaN) // true
Number.isNaN(15) // false
Number.isNaN('15') // false
Number.isNaN(true) // false
Number.isNaN(9/NaN) // true
Number.isNaN('true' / 0) // true
Number.isNaN('true' / 'true') // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果参数类型不是<code v-pre>NaN</code>，<code v-pre>Number.isNaN</code>一律返回<code v-pre>false</code>。</p>
<p>它们与传统的全局方法<code v-pre>isFinite()</code>和<code v-pre>isNaN()</code>的区别在于，传统方法先调用<code v-pre>Number()</code>将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效，<code v-pre>Number.isFinite()</code>对于非数值一律返回<code v-pre>false</code>, <code v-pre>Number.isNaN()</code>只有对于<code v-pre>NaN</code>才返回<code v-pre>true</code>，非<code v-pre>NaN</code>一律返回<code v-pre>false</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>isFinite(25) // true
isFinite(&quot;25&quot;) // true
Number.isFinite(25) // true
Number.isFinite(&quot;25&quot;) // false

isNaN(NaN) // true
isNaN(&quot;NaN&quot;) // true
Number.isNaN(NaN) // true
Number.isNaN(&quot;NaN&quot;) // false
Number.isNaN(1) // false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="number-parseint-number-parsefloat" tabindex="-1"><a class="header-anchor" href="#number-parseint-number-parsefloat" aria-hidden="true">#</a> Number.parseInt(), Number.parseFloat()</h2>
<p>ES6 将全局方法<code v-pre>parseInt()</code>和<code v-pre>parseFloat()</code>，移植到<code v-pre>Number</code>对象上面，行为完全保持不变。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// ES5的写法
parseInt('12.34') // 12
parseFloat('123.45#') // 123.45

// ES6的写法
Number.parseInt('12.34') // 12
Number.parseFloat('123.45#') // 123.45
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样做的目的，是<strong>逐步减少全局性方法，使得语言逐步模块化</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Number.parseInt === parseInt // true
Number.parseFloat === parseFloat // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="number-isinteger-是否为整数" tabindex="-1"><a class="header-anchor" href="#number-isinteger-是否为整数" aria-hidden="true">#</a> Number.isInteger() 是否为整数</h2>
<p><code v-pre>Number.isInteger()</code>用来判断一个数值是否为整数。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Number.isInteger(25) // true
Number.isInteger(25.1) // false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>JavaScript 内部，整数和浮点数采用的是同样的储存方法，所以 25  和 25.0 被视为同一个值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Number.isInteger(25) // true
Number.isInteger(25.0) // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果参数不是数值，<code v-pre>Number.isInteger</code>返回<code v-pre>false</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Number.isInteger() // false
Number.isInteger(null) // false
Number.isInteger('15') // false
Number.isInteger(true) // false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，由于 JavaScript 采用 IEEE 754 标准，数值存储为64位双精度格式，数值精度最多可以达到 53 个二进制位（1 个隐藏位与 52 个有效位）。如果数值的精度超过这个限度，第54位及后面的位就会被丢弃，这种情况下，<code v-pre>Number.isInteger</code>可能会误判。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Number.isInteger(3.0000000000000002) // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>Number.isInteger</code>的参数明明不是整数，但是会返回<code v-pre>true</code>。原因就是这个小数的精度达到了小数点后16个十进制位，转成二进制位超过了53个二进制位，导致最后的那个<code v-pre>2</code>被丢弃了。</p>
<p>类似的情况还有，如果一个数值的绝对值小于<code v-pre>Number.MIN_VALUE</code>（5E-324），即小于 JavaScript 能够分辨的最小值，会被自动转为 0。这时，<code v-pre>Number.isInteger</code>也会误判。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Number.isInteger(5E-324) // false
Number.isInteger(5E-325) // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>5E-325</code>由于值太小，会被自动转为0，因此返回<code v-pre>true</code>。</p>
<p>总之，如果对数据精度的要求较高，不建议使用<code v-pre>Number.isInteger()</code>判断一个数值是否为整数。</p>
<h2 id="number-epsilon-用于浮点数误差检查" tabindex="-1"><a class="header-anchor" href="#number-epsilon-用于浮点数误差检查" aria-hidden="true">#</a> Number.EPSILON 用于浮点数误差检查</h2>
<p>ES6 在<code v-pre>Number</code>对象上面，新增一个极小的常量<code v-pre>Number.EPSILON</code>。根据规格，它表示 1 与大于 1 的最小浮点数之间的差。</p>
<p>对于 64 位浮点数来说，大于 1 的最小浮点数相当于二进制的<code v-pre>1.00..001</code>，小数点后面有连续 51 个零。这个值减去 1 之后，就等于 2 的 -52 次方。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Number.EPSILON === Math.pow(2, -52)
// true
Number.EPSILON
// 2.220446049250313e-16
Number.EPSILON.toFixed(20)
// &quot;0.00000000000000022204&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>Number.EPSILON</code>实际上是 JavaScript 能够表示的最小精度。误差如果小于这个值，就可以认为已经没有意义了，即不存在误差了。</p>
<p>引入一个这么小的量的目的，在于为浮点数计算，设置一个误差范围。我们知道浮点数计算是不精确的。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>0.1 + 0.2
// 0.30000000000000004

0.1 + 0.2 - 0.3
// 5.551115123125783e-17

5.551115123125783e-17.toFixed(20)
// '0.00000000000000005551'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码解释了，为什么比较<code v-pre>0.1 + 0.2</code>与<code v-pre>0.3</code>得到的结果是<code v-pre>false</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>0.1 + 0.2 === 0.3 // false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>Number.EPSILON</code>可以用来设置“能够接受的误差范围”。比如，误差范围设为 2 的-50 次方（即<code v-pre>Number.EPSILON * Math.pow(2, 2)</code>），即如果两个浮点数的差小于这个值，我们就认为这两个浮点数相等。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>5.551115123125783e-17 &lt; Number.EPSILON * Math.pow(2, 2)
// true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，<code v-pre>Number.EPSILON</code>的实质是一个可以接受的最小误差范围。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function withinErrorMargin (left, right) {
  return Math.abs(left - right) &lt; Number.EPSILON * Math.pow(2, 2);
}

0.1 + 0.2 === 0.3 // false
withinErrorMargin(0.1 + 0.2, 0.3) // true

1.1 + 1.3 === 2.4 // false
withinErrorMargin(1.1 + 1.3, 2.4) // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码为浮点数运算，部署了一个<strong>误差检查函数</strong>。</p>
<h2 id="安全整数和-number-issafeinteger" tabindex="-1"><a class="header-anchor" href="#安全整数和-number-issafeinteger" aria-hidden="true">#</a> 安全整数和 Number.isSafeInteger()</h2>
<p>JavaScript 能够准确表示的整数范围在<code v-pre>-2^53</code>到<code v-pre>2^53</code>之间（不含两个端点），超过这个范围，无法精确表示这个值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math.pow(2, 53) // 9007199254740992

9007199254740992  // 9007199254740992
9007199254740993  // 9007199254740992

Math.pow(2, 53) === Math.pow(2, 53) + 1
// true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，超出 2 的 53 次方之后，一个数就不精确了。</p>
<p>ES6 引入了<code v-pre>Number.MAX_SAFE_INTEGER</code>和<code v-pre>Number.MIN_SAFE_INTEGER</code>这两个常量，用来表示这个范围的上下限。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1
// true
Number.MAX_SAFE_INTEGER === 9007199254740991
// true

Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER
// true
Number.MIN_SAFE_INTEGER === -9007199254740991
// true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，可以看到 JavaScript 能够精确表示的极限。</p>
<p><code v-pre>Number.isSafeInteger()</code>则是用来判断一个整数是否落在这个范围之内。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Number.isSafeInteger('a') // false
Number.isSafeInteger(null) // false
Number.isSafeInteger(NaN) // false
Number.isSafeInteger(Infinity) // false
Number.isSafeInteger(-Infinity) // false

Number.isSafeInteger(3) // true
Number.isSafeInteger(1.2) // false
Number.isSafeInteger(9007199254740990) // true
Number.isSafeInteger(9007199254740992) // false

Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1) // false
Number.isSafeInteger(Number.MIN_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1) // false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个函数的实现很简单，就是跟安全整数的两个边界值比较一下。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Number.isSafeInteger = function (n) {
  return (typeof n === 'number' &amp;&amp;
    Math.round(n) === n &amp;&amp;
    Number.MIN_SAFE_INTEGER &lt;= n &amp;&amp;
    n &lt;= Number.MAX_SAFE_INTEGER);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实际使用这个函数时，需要注意。验证运算结果是否落在安全整数的范围内，不要只验证运算结果，而要同时验证参与运算的每个值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Number.isSafeInteger(9007199254740993)
// false
Number.isSafeInteger(990)
// true
Number.isSafeInteger(9007199254740993 - 990)
// true
9007199254740993 - 990
// 返回结果 9007199254740002
// 正确答案应该是 9007199254740003
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>9007199254740993</code>不是一个安全整数，但是<code v-pre>Number.isSafeInteger</code>会返回结果，显示计算结果是安全的。这是因为，这个数超出了精度范围，导致在计算机内部，以<code v-pre>9007199254740992</code>的形式储存。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>9007199254740993 === 9007199254740992
// true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>所以，如果只验证运算结果是否为安全整数，很可能得到错误结果。下面的函数可以同时验证两个运算数和运算结果。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function trusty (left, right, result) {
  if (
    Number.isSafeInteger(left) &amp;&amp;
    Number.isSafeInteger(right) &amp;&amp;
    Number.isSafeInteger(result)
  ) {
    return result;
  }
  throw new RangeError('Operation cannot be trusted!');
}

trusty(9007199254740993, 990, 9007199254740993 - 990)
// RangeError: Operation cannot be trusted!

trusty(1, 2, 3)
// 3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="math-对象的扩展" tabindex="-1"><a class="header-anchor" href="#math-对象的扩展" aria-hidden="true">#</a> Math 对象的扩展</h2>
<p>ES6 在 Math 对象上新增了 <strong>17 个与数学相关的方法</strong>。所有这些方法都是静态方法，只能在 Math 对象上调用。</p>
<h3 id="math-trunc-去除一个数的小数部分-返回整数部分" tabindex="-1"><a class="header-anchor" href="#math-trunc-去除一个数的小数部分-返回整数部分" aria-hidden="true">#</a> Math.trunc() 去除一个数的小数部分，返回整数部分</h3>
<p><code v-pre>Math.trunc</code>方法<strong>用于去除一个数的小数部分，返回整数部分</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math.trunc(4.1) // 4
Math.trunc(4.9) // 4
Math.trunc(-4.1) // -4
Math.trunc(-4.9) // -4
Math.trunc(-0.1234) // -0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于非数值，<code v-pre>Math.trunc</code>内部使用<code v-pre>Number</code>方法将其先转为数值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math.trunc('123.456') // 123
Math.trunc(true) //1
Math.trunc(false) // 0
Math.trunc(null) // 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于空值和无法截取整数的值，返回<code v-pre>NaN</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math.trunc(NaN);      // NaN
Math.trunc('foo');    // NaN
Math.trunc();         // NaN
Math.trunc(undefined) // NaN
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于没有部署这个方法的环境，可以用下面的代码模拟。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math.trunc = Math.trunc || function(x) {
  return x &lt; 0 ? Math.ceil(x) : Math.floor(x);
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="math-sign-判断一个数是正数、负数、还是零" tabindex="-1"><a class="header-anchor" href="#math-sign-判断一个数是正数、负数、还是零" aria-hidden="true">#</a> Math.sign() 判断一个数是正数、负数、还是零</h3>
<p><code v-pre>Math.sign</code>方法用来<strong>判断一个数到底是正数、负数、还是零</strong>。对于非数值，会先将其转换为数值。</p>
<p>它会返回五种值。</p>
<ul>
<li>参数为正数，返回<code v-pre>+1</code>；</li>
<li>参数为负数，返回<code v-pre>-1</code>；</li>
<li>参数为 0，返回<code v-pre>0</code>；</li>
<li>参数为-0，返回<code v-pre>-0</code>;</li>
<li>其他值，返回<code v-pre>NaN</code>。</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math.sign(-5) // -1
Math.sign(5) // +1
Math.sign(0) // +0
Math.sign(-0) // -0
Math.sign(NaN) // NaN
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果参数是非数值，会自动转为数值。对于那些无法转为数值的值，会返回<code v-pre>NaN</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math.sign('')  // 0
Math.sign(true)  // +1
Math.sign(false)  // 0
Math.sign(null)  // 0
Math.sign('9')  // +1
Math.sign('foo')  // NaN
Math.sign()  // NaN
Math.sign(undefined)  // NaN
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于没有部署这个方法的环境，可以用下面的代码模拟。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math.sign = Math.sign || function(x) {
  x = +x; // convert to a number
  if (x === 0 || isNaN(x)) {
    return x;
  }
  return x &gt; 0 ? 1 : -1;
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="math-cbrt-计算一个数的立方根" tabindex="-1"><a class="header-anchor" href="#math-cbrt-计算一个数的立方根" aria-hidden="true">#</a> Math.cbrt() 计算一个数的立方根</h3>
<p><code v-pre>Math.cbrt</code>方法用于<strong>计算一个数的立方根</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math.cbrt(-1) // -1
Math.cbrt(0)  // 0
Math.cbrt(1)  // 1
Math.cbrt(2)  // 1.2599210498948734
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于非数值，<code v-pre>Math.cbrt</code>方法内部也是先使用<code v-pre>Number</code>方法将其转为数值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math.cbrt('8') // 2
Math.cbrt('hello') // NaN
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>对于没有部署这个方法的环境，可以用下面的代码模拟。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math.cbrt = Math.cbrt || function(x) {
  var y = Math.pow(Math.abs(x), 1/3);
  return x &lt; 0 ? -y : y;
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="math-clz32" tabindex="-1"><a class="header-anchor" href="#math-clz32" aria-hidden="true">#</a> Math.clz32()</h3>
<p><code v-pre>Math.clz32()</code>方法将<strong>参数转为 32 位无符号整数的形式</strong>，然后返回这个 32 位值里面有多少个前导 0。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math.clz32(0) // 32
Math.clz32(1) // 31
Math.clz32(1000) // 22
Math.clz32(0b01000000000000000000000000000000) // 1
Math.clz32(0b00100000000000000000000000000000) // 2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，0 的二进制形式全为 0，所以有 32 个前导 0；1 的二进制形式是<code v-pre>0b1</code>，只占 1 位，所以 32 位之中有 31 个前导 0；1000 的二进制形式是<code v-pre>0b1111101000</code>，一共有 10 位，所以 32 位之中有 22 个前导 0。</p>
<p><code v-pre>clz32</code>这个函数名就来自”count leading zero bits in 32-bit binary representation of a number“（计算一个数的 32 位二进制形式的前导 0 的个数）的缩写。</p>
<p>左移运算符（<code v-pre>&lt;&lt;</code>）与<code v-pre>Math.clz32</code>方法直接相关。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math.clz32(0) // 32
Math.clz32(1) // 31
Math.clz32(1 &lt;&lt; 1) // 30
Math.clz32(1 &lt;&lt; 2) // 29
Math.clz32(1 &lt;&lt; 29) // 2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于小数，<code v-pre>Math.clz32</code>方法只考虑整数部分。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math.clz32(3.2) // 30
Math.clz32(3.9) // 30
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>对于空值或其他类型的值，<code v-pre>Math.clz32</code>方法会将它们先转为数值，然后再计算。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math.clz32() // 32
Math.clz32(NaN) // 32
Math.clz32(Infinity) // 32
Math.clz32(null) // 32
Math.clz32('foo') // 32
Math.clz32([]) // 32
Math.clz32({}) // 32
Math.clz32(true) // 31
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="math-imul" tabindex="-1"><a class="header-anchor" href="#math-imul" aria-hidden="true">#</a> Math.imul()</h3>
<p><code v-pre>Math.imul</code>方法返回两个数以 32 位带符号整数形式相乘的结果，返回的也是一个 32 位的带符号整数。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math.imul(2, 4)   // 8
Math.imul(-1, 8)  // -8
Math.imul(-2, -2) // 4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果只考虑最后 32 位，大多数情况下，<code v-pre>Math.imul(a, b)</code>与<code v-pre>a * b</code>的结果是相同的，即该方法等同于<code v-pre>(a * b)|0</code>的效果（超过 32 位的部分溢出）。之所以需要部署这个方法，是因为 JavaScript 有精度限制，超过 2 的 53 次方的值无法精确表示。这就是说，对于那些很大的数的乘法，低位数值往往都是不精确的，<code v-pre>Math.imul</code>方法可以返回正确的低位数值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>(0x7fffffff * 0x7fffffff)|0 // 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面这个乘法算式，返回结果为 0。但是由于这两个二进制数的最低位都是 1，所以这个结果肯定是不正确的，因为根据二进制乘法，计算结果的二进制最低位应该也是 1。这个错误就是因为它们的乘积超过了 2 的 53 次方，JavaScript 无法保存额外的精度，就把低位的值都变成了 0。<code v-pre>Math.imul</code>方法可以返回正确的值 1。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math.imul(0x7fffffff, 0x7fffffff) // 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="math-fround" tabindex="-1"><a class="header-anchor" href="#math-fround" aria-hidden="true">#</a> Math.fround()</h3>
<p><code v-pre>Math.fround</code>方法返回一个数的32位单精度浮点数形式。</p>
<p>对于32位单精度格式来说，数值精度是24个二进制位（1 位隐藏位与 23 位有效位），所以对于 -2<sup>24</sup> 至 2<sup>24</sup> 之间的整数（不含两个端点），返回结果与参数本身一致。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math.fround(0)   // 0
Math.fround(1)   // 1
Math.fround(2 ** 24 - 1)   // 16777215
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果参数的绝对值大于 2<sup>24</sup>，返回的结果便开始丢失精度。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math.fround(2 ** 24)       // 16777216
Math.fround(2 ** 24 + 1)   // 16777216
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>Math.fround</code>方法的主要作用，是将64位双精度浮点数转为32位单精度浮点数。如果小数的精度超过24个二进制位，返回值就会不同于原值，否则返回值不变（即与64位双精度值一致）。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 未丢失有效精度
Math.fround(1.125) // 1.125
Math.fround(7.25)  // 7.25

// 丢失精度
Math.fround(0.3)   // 0.30000001192092896
Math.fround(0.7)   // 0.699999988079071
Math.fround(1.0000000123) // 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于 <code v-pre>NaN</code> 和 <code v-pre>Infinity</code>，此方法返回原值。对于其它类型的非数值，<code v-pre>Math.fround</code> 方法会先将其转为数值，再返回单精度浮点数。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math.fround(NaN)      // NaN
Math.fround(Infinity) // Infinity

Math.fround('5')      // 5
Math.fround(true)     // 1
Math.fround(null)     // 0
Math.fround([])       // 0
Math.fround({})       // NaN
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于没有部署这个方法的环境，可以用下面的代码模拟。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math.fround = Math.fround || function (x) {
  return new Float32Array([x])[0];
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="math-hypot" tabindex="-1"><a class="header-anchor" href="#math-hypot" aria-hidden="true">#</a> Math.hypot()</h3>
<p><code v-pre>Math.hypot</code>方法返回所有参数的平方和的平方根。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math.hypot(3, 4);        // 5
Math.hypot(3, 4, 5);     // 7.0710678118654755
Math.hypot();            // 0
Math.hypot(NaN);         // NaN
Math.hypot(3, 4, 'foo'); // NaN
Math.hypot(3, 4, '5');   // 7.0710678118654755
Math.hypot(-3);          // 3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，3 的平方加上 4 的平方，等于 5 的平方。</p>
<p>如果参数不是数值，<code v-pre>Math.hypot</code>方法会将其转为数值。只要有一个参数无法转为数值，就会返回 NaN。</p>
<h3 id="对数方法" tabindex="-1"><a class="header-anchor" href="#对数方法" aria-hidden="true">#</a> 对数方法</h3>
<p>ES6 新增了 4 个对数相关方法。</p>
<p><strong>（1） Math.expm1()</strong></p>
<p><code v-pre>Math.expm1(x)</code>返回 e<sup>x</sup> - 1，即<code v-pre>Math.exp(x) - 1</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math.expm1(-1) // -0.6321205588285577
Math.expm1(0)  // 0
Math.expm1(1)  // 1.718281828459045
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于没有部署这个方法的环境，可以用下面的代码模拟。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math.expm1 = Math.expm1 || function(x) {
  return Math.exp(x) - 1;
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>（2）Math.log1p()</strong></p>
<p><code v-pre>Math.log1p(x)</code>方法返回<code v-pre>1 + x</code>的自然对数，即<code v-pre>Math.log(1 + x)</code>。如果<code v-pre>x</code>小于-1，返回<code v-pre>NaN</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math.log1p(1)  // 0.6931471805599453
Math.log1p(0)  // 0
Math.log1p(-1) // -Infinity
Math.log1p(-2) // NaN
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于没有部署这个方法的环境，可以用下面的代码模拟。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math.log1p = Math.log1p || function(x) {
  return Math.log(1 + x);
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>（3）Math.log10()</strong></p>
<p><code v-pre>Math.log10(x)</code>返回以 10 为底的<code v-pre>x</code>的对数。如果<code v-pre>x</code>小于 0，则返回 NaN。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math.log10(2)      // 0.3010299956639812
Math.log10(1)      // 0
Math.log10(0)      // -Infinity
Math.log10(-2)     // NaN
Math.log10(100000) // 5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于没有部署这个方法的环境，可以用下面的代码模拟。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math.log10 = Math.log10 || function(x) {
  return Math.log(x) / Math.LN10;
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>（4）Math.log2()</strong></p>
<p><code v-pre>Math.log2(x)</code>返回以 2 为底的<code v-pre>x</code>的对数。如果<code v-pre>x</code>小于 0，则返回 NaN。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math.log2(3)       // 1.584962500721156
Math.log2(2)       // 1
Math.log2(1)       // 0
Math.log2(0)       // -Infinity
Math.log2(-2)      // NaN
Math.log2(1024)    // 10
Math.log2(1 &lt;&lt; 29) // 29
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于没有部署这个方法的环境，可以用下面的代码模拟。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math.log2 = Math.log2 || function(x) {
  return Math.log(x) / Math.LN2;
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="双曲函数方法" tabindex="-1"><a class="header-anchor" href="#双曲函数方法" aria-hidden="true">#</a> 双曲函数方法</h3>
<p>ES6 新增了 6 个双曲函数方法。</p>
<ul>
<li><code v-pre>Math.sinh(x)</code> 返回<code v-pre>x</code>的双曲正弦（hyperbolic sine）</li>
<li><code v-pre>Math.cosh(x)</code> 返回<code v-pre>x</code>的双曲余弦（hyperbolic cosine）</li>
<li><code v-pre>Math.tanh(x)</code> 返回<code v-pre>x</code>的双曲正切（hyperbolic tangent）</li>
<li><code v-pre>Math.asinh(x)</code> 返回<code v-pre>x</code>的反双曲正弦（inverse hyperbolic sine）</li>
<li><code v-pre>Math.acosh(x)</code> 返回<code v-pre>x</code>的反双曲余弦（inverse hyperbolic cosine）</li>
<li><code v-pre>Math.atanh(x)</code> 返回<code v-pre>x</code>的反双曲正切（inverse hyperbolic tangent）</li>
</ul>
<h2 id="指数运算符" tabindex="-1"><a class="header-anchor" href="#指数运算符" aria-hidden="true">#</a> 指数运算符</h2>
<p>ES2016 新增了一个指数运算符（<code v-pre>**</code>）。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>2 ** 2 // 4
2 ** 3 // 8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这个运算符的一个特点是右结合，而不是常见的左结合。多个指数运算符连用时，是从最右边开始计算的。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 相当于 2 ** (3 ** 2)
2 ** 3 ** 2
// 512
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，首先计算的是第二个指数运算符，而不是第一个。</p>
<p>指数运算符可以与等号结合，形成一个新的赋值运算符（<code v-pre>**=</code>）。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let a = 1.5;
a **= 2;
// 等同于 a = a * a;

let b = 4;
b **= 3;
// 等同于 b = b * b * b;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，V8 引擎的指数运算符与<code v-pre>Math.pow</code>的实现不相同，对于特别大的运算结果，两者会有细微的差异。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math.pow(99, 99)
// 3.697296376497263e+197

99 ** 99
// 3.697296376497268e+197
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，两个运算结果的最后一位有效数字是有差异的。</p>
<h2 id="bigint-数据类型" tabindex="-1"><a class="header-anchor" href="#bigint-数据类型" aria-hidden="true">#</a> BigInt 数据类型</h2>
<h3 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h3>
<p>JavaScript 所有数字都保存成 64 位浮点数，这给数值的表示带来了两大限制。一是数值的精度只能到 53 个二进制位（相当于 16 个十进制位），大于这个范围的整数，JavaScript 是无法精确表示的，这使得 JavaScript 不适合进行科学和金融方面的精确计算。二是大于或等于2的1024次方的数值，JavaScript 无法表示，会返回<code v-pre>Infinity</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 超过 53 个二进制位的数值，无法保持精度
Math.pow(2, 53) === Math.pow(2, 53) + 1 // true

// 超过 2 的 1024 次方的数值，无法表示
Math.pow(2, 1024) // Infinity
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="https://github.com/tc39/proposal-bigint" target="_blank" rel="noopener noreferrer">ES2020</a> 引入了一种新的数据类型 BigInt（大整数），来解决这个问题。BigInt 只用来表示整数，没有位数的限制，任何位数的整数都可以精确表示。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const a = 2172141653n;
const b = 15346349309n;

// BigInt 可以保持精度
a * b // 33334444555566667777n

// 普通整数无法保持精度
Number(a) * Number(b) // 33334444555566670000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了与 Number 类型区别，BigInt 类型的数据必须添加后缀<code v-pre>n</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>1234 // 普通整数
1234n // BigInt

// BigInt 的运算
1n + 2n // 3n
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>BigInt 同样可以使用各种进制表示，都要加上后缀<code v-pre>n</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>0b1101n // 二进制
0o777n // 八进制
0xFFn // 十六进制
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>BigInt 与普通整数是两种值，它们之间并不相等。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>42n === 42 // false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>typeof</code>运算符对于 BigInt 类型的数据返回<code v-pre>bigint</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>typeof 123n // 'bigint'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>BigInt 可以使用负号（<code v-pre>-</code>），但是不能使用正号（<code v-pre>+</code>），因为会与 asm.js 冲突。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>-42n // 正确
+42n // 报错
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>JavaScript 以前不能计算70的阶乘（即<code v-pre>70!</code>），因为超出了可以表示的精度。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let p = 1;
for (let i = 1; i &lt;= 70; i++) {
  p *= i;
}
console.log(p); // 1.197857166996989e+100
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在支持大整数了，就可以算了，浏览器的开发者工具运行下面代码，就OK。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let p = 1n;
for (let i = 1n; i &lt;= 70n; i++) {
  p *= i;
}
console.log(p); // 11978571...00000000n
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="bigint-对象" tabindex="-1"><a class="header-anchor" href="#bigint-对象" aria-hidden="true">#</a> BigInt 对象</h3>
<p>JavaScript 原生提供<code v-pre>BigInt</code>对象，可以用作构造函数生成 BigInt 类型的数值。转换规则基本与<code v-pre>Number()</code>一致，将其他类型的值转为 BigInt。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>BigInt(123) // 123n
BigInt('123') // 123n
BigInt(false) // 0n
BigInt(true) // 1n
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>BigInt()</code>构造函数必须有参数，而且参数必须可以正常转为数值，下面的用法都会报错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>new BigInt() // TypeError
BigInt(undefined) //TypeError
BigInt(null) // TypeError
BigInt('123n') // SyntaxError
BigInt('abc') // SyntaxError
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，尤其值得注意字符串<code v-pre>123n</code>无法解析成 Number 类型，所以会报错。</p>
<p>参数如果是小数，也会报错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>BigInt(1.5) // RangeError
BigInt('1.5') // SyntaxError
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>BigInt 对象继承了 Object 对象的两个实例方法。</p>
<ul>
<li><code v-pre>BigInt.prototype.toString()</code></li>
<li><code v-pre>BigInt.prototype.valueOf()</code></li>
</ul>
<p>它还继承了 Number 对象的一个实例方法。</p>
<ul>
<li><code v-pre>BigInt.prototype.toLocaleString()</code></li>
</ul>
<p>此外，还提供了三个静态方法。</p>
<ul>
<li><code v-pre>BigInt.asUintN(width, BigInt)</code>： 给定的 BigInt 转为 0 到 2<sup>width</sup> - 1 之间对应的值。</li>
<li><code v-pre>BigInt.asIntN(width, BigInt)</code>：给定的 BigInt 转为 -2<sup>width - 1</sup> 到 2<sup>width - 1</sup> - 1 之间对应的值。</li>
<li><code v-pre>BigInt.parseInt(string[, radix])</code>：近似于<code v-pre>Number.parseInt()</code>，将一个字符串转换成指定进制的 BigInt。</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const max = 2n ** (64n - 1n) - 1n;

BigInt.asIntN(64, max)
// 9223372036854775807n
BigInt.asIntN(64, max + 1n)
// -9223372036854775808n
BigInt.asUintN(64, max + 1n)
// 9223372036854775808n
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>max</code>是64位带符号的 BigInt 所能表示的最大值。如果对这个值加<code v-pre>1n</code>，<code v-pre>BigInt.asIntN()</code>将会返回一个负值，因为这时新增的一位将被解释为符号位。而<code v-pre>BigInt.asUintN()</code>方法由于不存在符号位，所以可以正确返回结果。</p>
<p>如果<code v-pre>BigInt.asIntN()</code>和<code v-pre>BigInt.asUintN()</code>指定的位数，小于数值本身的位数，那么头部的位将被舍弃。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const max = 2n ** (64n - 1n) - 1n;

BigInt.asIntN(32, max) // -1n
BigInt.asUintN(32, max) // 4294967295n
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>max</code>是一个64位的 BigInt，如果转为32位，前面的32位都会被舍弃。</p>
<p>下面是<code v-pre>BigInt.parseInt()</code>的例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// Number.parseInt() 与 BigInt.parseInt() 的对比
Number.parseInt('9007199254740993', 10)
// 9007199254740992
BigInt.parseInt('9007199254740993', 10)
// 9007199254740993n
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，由于有效数字超出了最大限度，<code v-pre>Number.parseInt</code>方法返回的结果是不精确的，而<code v-pre>BigInt.parseInt</code>方法正确返回了对应的 BigInt。</p>
<p>对于二进制数组，BigInt 新增了两个类型<code v-pre>BigUint64Array</code>和<code v-pre>BigInt64Array</code>，这两种数据类型返回的都是64位 BigInt。<code v-pre>DataView</code>对象的实例方法<code v-pre>DataView.prototype.getBigInt64()</code>和<code v-pre>DataView.prototype.getBigUint64()</code>，返回的也是 BigInt。</p>
<h3 id="转换规则" tabindex="-1"><a class="header-anchor" href="#转换规则" aria-hidden="true">#</a> 转换规则</h3>
<p>可以使用<code v-pre>Boolean()</code>、<code v-pre>Number()</code>和<code v-pre>String()</code>这三个方法，将 BigInt 可以转为布尔值、数值和字符串类型。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Boolean(0n) // false
Boolean(1n) // true
Number(1n)  // 1
String(1n)  // &quot;1&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，注意最后一个例子，转为字符串时后缀<code v-pre>n</code>会消失。</p>
<p>另外，取反运算符（<code v-pre>!</code>）也可以将 BigInt 转为布尔值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>!0n // true
!1n // false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="数学运算" tabindex="-1"><a class="header-anchor" href="#数学运算" aria-hidden="true">#</a> 数学运算</h3>
<p>数学运算方面，BigInt 类型的<code v-pre>+</code>、<code v-pre>-</code>、<code v-pre>*</code>和<code v-pre>**</code>这四个二元运算符，与 Number 类型的行为一致。除法运算<code v-pre>/</code>会舍去小数部分，返回一个整数。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>9n / 5n
// 1n
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>几乎所有的数值运算符都可以用在 BigInt，但是有两个例外。</p>
<ul>
<li>不带符号的右移位运算符<code v-pre>&gt;&gt;&gt;</code></li>
<li>一元的求正运算符<code v-pre>+</code></li>
</ul>
<p>上面两个运算符用在 BigInt 会报错。前者是因为<code v-pre>&gt;&gt;&gt;</code>运算符是不带符号的，但是 BigInt 总是带有符号的，导致该运算无意义，完全等同于右移运算符<code v-pre>&gt;&gt;</code>。后者是因为一元运算符<code v-pre>+</code>在 asm.js 里面总是返回 Number 类型，为了不破坏 asm.js 就规定<code v-pre>+1n</code>会报错。</p>
<p>BigInt 不能与普通数值进行混合运算。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>1n + 1.3 // 报错
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码报错是因为无论返回的是 BigInt 或 Number，都会导致丢失精度信息。比如<code v-pre>(2n**53n + 1n) + 0.5</code>这个表达式，如果返回 BigInt 类型，<code v-pre>0.5</code>这个小数部分会丢失；如果返回 Number 类型，有效精度只能保持 53 位，导致精度下降。</p>
<p>同样的原因，如果一个标准库函数的参数预期是 Number 类型，但是得到的是一个 BigInt，就会报错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 错误的写法
Math.sqrt(4n) // 报错

// 正确的写法
Math.sqrt(Number(4n)) // 2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>Math.sqrt</code>的参数预期是 Number 类型，如果是 BigInt 就会报错，必须先用<code v-pre>Number</code>方法转一下类型，才能进行计算。</p>
<p>asm.js 里面，<code v-pre>|0</code>跟在一个数值的后面会返回一个32位整数。根据不能与 Number 类型混合运算的规则，BigInt 如果与<code v-pre>|0</code>进行运算会报错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>1n | 0 // 报错
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="其他运算" tabindex="-1"><a class="header-anchor" href="#其他运算" aria-hidden="true">#</a> 其他运算</h3>
<p>BigInt 对应的布尔值，与 Number 类型一致，即<code v-pre>0n</code>会转为<code v-pre>false</code>，其他值转为<code v-pre>true</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>if (0n) {
  console.log('if');
} else {
  console.log('else');
}
// else
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>0n</code>对应<code v-pre>false</code>，所以会进入<code v-pre>else</code>子句。</p>
<p>比较运算符（比如<code v-pre>&gt;</code>）和相等运算符（<code v-pre>==</code>）允许 BigInt 与其他类型的值混合计算，因为这样做不会损失精度。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>0n &lt; 1 // true
0n &lt; true // true
0n == 0 // true
0n == false // true
0n === 0 // false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>BigInt 与字符串混合运算时，会先转为字符串，再进行运算。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'' + 123n // &quot;123&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>
