<template><div><h1 id="对象的新增方法" tabindex="-1"><a class="header-anchor" href="#对象的新增方法" aria-hidden="true">#</a> 对象的新增方法</h1>
<p>本章介绍 Object 对象的新增方法。</p>
<h2 id="object-is" tabindex="-1"><a class="header-anchor" href="#object-is" aria-hidden="true">#</a> Object.is()</h2>
<p>ES5 比较两个值是否相等，只有两个运算符：相等运算符（<code v-pre>==</code>）和严格相等运算符（<code v-pre>===</code>）。它们都有缺点，前者会自动转换数据类型，后者的<code v-pre>NaN</code>不等于自身，以及<code v-pre>+0</code>等于<code v-pre>-0</code>。JavaScript 缺乏一种运算，在所有环境中，只要两个值是一样的，它们就应该相等。</p>
<p>ES6 提出“Same-value equality”（同值相等）算法，用来解决这个问题。<code v-pre>Object.is</code>就是部署这个算法的新方法。它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。</p>
<!-- more -->
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Object.is('foo', 'foo')
// true
Object.is({}, {})
// false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不同之处只有两个：一是<code v-pre>+0</code>不等于<code v-pre>-0</code>，二是<code v-pre>NaN</code>等于自身。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ES5 可以通过下面的代码，部署<code v-pre>Object.is</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Object.defineProperty(Object, 'is', {
  value: function(x, y) {
    if (x === y) {
      // 针对+0 不等于 -0的情况
      return x !== 0 || 1 / x === 1 / y;
    }
    // 针对NaN的情况
    return x !== x &amp;&amp; y !== y;
  },
  configurable: true,
  enumerable: false,
  writable: true
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="object-assign" tabindex="-1"><a class="header-anchor" href="#object-assign" aria-hidden="true">#</a> Object.assign()</h2>
<h3 id="基本用法" tabindex="-1"><a class="header-anchor" href="#基本用法" aria-hidden="true">#</a> 基本用法</h3>
<p><code v-pre>Object.assign</code>方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const target = { a: 1 };

const source1 = { b: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>Object.assign</code>方法的第一个参数是目标对象，后面的参数都是源对象。</p>
<p>注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const target = { a: 1, b: 1 };

const source1 = { b: 2, c: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果只有一个参数，<code v-pre>Object.assign</code>会直接返回该参数。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const obj = {a: 1};
Object.assign(obj) === obj // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果该参数不是对象，则会先转成对象，然后返回。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>typeof Object.assign(2) // &quot;object&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>由于<code v-pre>undefined</code>和<code v-pre>null</code>无法转成对象，所以如果它们作为参数，就会报错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Object.assign(undefined) // 报错
Object.assign(null) // 报错
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果非对象参数出现在源对象的位置（即非首参数），那么处理规则有所不同。首先，这些参数都会转成对象，如果无法转成对象，就会跳过。这意味着，如果<code v-pre>undefined</code>和<code v-pre>null</code>不在首参数，就不会报错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let obj = {a: 1};
Object.assign(obj, undefined) === obj // true
Object.assign(obj, null) === obj // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其他类型的值（即数值、字符串和布尔值）不在首参数，也不会报错。但是，除了字符串会以数组形式，拷贝入目标对象，其他值都不会产生效果。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const v1 = 'abc';
const v2 = true;
const v3 = 10;

const obj = Object.assign({}, v1, v2, v3);
console.log(obj); // { &quot;0&quot;: &quot;a&quot;, &quot;1&quot;: &quot;b&quot;, &quot;2&quot;: &quot;c&quot; }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>v1</code>、<code v-pre>v2</code>、<code v-pre>v3</code>分别是字符串、布尔值和数值，结果只有字符串合入目标对象（以字符数组的形式），数值和布尔值都会被忽略。这是因为只有字符串的包装对象，会产生可枚举属性。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Object(true) // {[[PrimitiveValue]]: true}
Object(10)  //  {[[PrimitiveValue]]: 10}
Object('abc') // {0: &quot;a&quot;, 1: &quot;b&quot;, 2: &quot;c&quot;, length: 3, [[PrimitiveValue]]: &quot;abc&quot;}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，布尔值、数值、字符串分别转成对应的包装对象，可以看到它们的原始值都在包装对象的内部属性<code v-pre>[[PrimitiveValue]]</code>上面，这个属性是不会被<code v-pre>Object.assign</code>拷贝的。只有字符串的包装对象，会产生可枚举的实义属性，那些属性则会被拷贝。</p>
<p><code v-pre>Object.assign</code>拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性（<code v-pre>enumerable: false</code>）。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Object.assign({b: 'c'},
  Object.defineProperty({}, 'invisible', {
    enumerable: false,
    value: 'hello'
  })
)
// { b: 'c' }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>Object.assign</code>要拷贝的对象只有一个不可枚举属性<code v-pre>invisible</code>，这个属性并没有被拷贝进去。</p>
<p>属性名为 Symbol 值的属性，也会被<code v-pre>Object.assign</code>拷贝。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Object.assign({ a: 'b' }, { [Symbol('c')]: 'd' })
// { a: 'b', Symbol(c): 'd' }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="注意点" tabindex="-1"><a class="header-anchor" href="#注意点" aria-hidden="true">#</a> 注意点</h3>
<p><strong>（1）浅拷贝</strong></p>
<p><code v-pre>Object.assign</code>方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const obj1 = {a: {b: 1}};
const obj2 = Object.assign({}, obj1);

obj1.a.b = 2;
obj2.a.b // 2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，源对象<code v-pre>obj1</code>的<code v-pre>a</code>属性的值是一个对象，<code v-pre>Object.assign</code>拷贝得到的是这个对象的引用。这个对象的任何变化，都会反映到目标对象上面。</p>
<p><strong>（2）同名属性的替换</strong></p>
<p>对于这种嵌套的对象，一旦遇到同名属性，<code v-pre>Object.assign</code>的处理方法是替换，而不是添加。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const target = { a: { b: 'c', d: 'e' } }
const source = { a: { b: 'hello' } }
Object.assign(target, source)
// { a: { b: 'hello' } }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>target</code>对象的<code v-pre>a</code>属性被<code v-pre>source</code>对象的<code v-pre>a</code>属性整个替换掉了，而不会得到<code v-pre>{ a: { b: 'hello', d: 'e' } }</code>的结果。这通常不是开发者想要的，需要特别小心。</p>
<p>一些函数库提供<code v-pre>Object.assign</code>的定制版本（比如 Lodash 的<code v-pre>_.defaultsDeep</code>方法），可以得到深拷贝的合并。</p>
<p><strong>（3）数组的处理</strong></p>
<p><code v-pre>Object.assign</code>可以用来处理数组，但是会把数组视为对象。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Object.assign([1, 2, 3], [4, 5])
// [4, 5, 3]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>Object.assign</code>把数组视为属性名为 0、1、2 的对象，因此源数组的 0 号属性<code v-pre>4</code>覆盖了目标数组的 0 号属性<code v-pre>1</code>。</p>
<p><strong>（4）取值函数的处理</strong></p>
<p><code v-pre>Object.assign</code>只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const source = {
  get foo() { return 1 }
};
const target = {};

Object.assign(target, source)
// { foo: 1 }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>source</code>对象的<code v-pre>foo</code>属性是一个取值函数，<code v-pre>Object.assign</code>不会复制这个取值函数，只会拿到值以后，将这个值复制过去。</p>
<h3 id="常见用途" tabindex="-1"><a class="header-anchor" href="#常见用途" aria-hidden="true">#</a> 常见用途</h3>
<p><code v-pre>Object.assign</code>方法有很多用处。</p>
<p><strong>（1）为对象添加属性</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>class Point {
  constructor(x, y) {
    Object.assign(this, {x, y});
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面方法通过<code v-pre>Object.assign</code>方法，将<code v-pre>x</code>属性和<code v-pre>y</code>属性添加到<code v-pre>Point</code>类的对象实例。</p>
<p><strong>（2）为对象添加方法</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Object.assign(SomeClass.prototype, {
  someMethod(arg1, arg2) {
    ···
  },
  anotherMethod() {
    ···
  }
});

// 等同于下面的写法
SomeClass.prototype.someMethod = function (arg1, arg2) {
  ···
};
SomeClass.prototype.anotherMethod = function () {
  ···
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码使用了对象属性的简洁表示法，直接将两个函数放在大括号中，再使用<code v-pre>assign</code>方法添加到<code v-pre>SomeClass.prototype</code>之中。</p>
<p><strong>（3）克隆对象</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function clone(origin) {
  return Object.assign({}, origin);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码将原始对象拷贝到一个空对象，就得到了原始对象的克隆。</p>
<p>不过，采用这种方法克隆，只能克隆原始对象自身的值，不能克隆它继承的值。如果想要保持继承链，可以采用下面的代码。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function clone(origin) {
  let originProto = Object.getPrototypeOf(origin);
  return Object.assign(Object.create(originProto), origin);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>（4）合并多个对象</strong></p>
<p>将多个对象合并到某个对象。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const merge =
  (target, ...sources) =&gt; Object.assign(target, ...sources);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果希望合并后返回一个新对象，可以改写上面函数，对一个空对象合并。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const merge =
  (...sources) =&gt; Object.assign({}, ...sources);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>（5）为属性指定默认值</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const DEFAULTS = {
  logLevel: 0,
  outputFormat: 'html'
};

function processContent(options) {
  options = Object.assign({}, DEFAULTS, options);
  console.log(options);
  // ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>DEFAULTS</code>对象是默认值，<code v-pre>options</code>对象是用户提供的参数。<code v-pre>Object.assign</code>方法将<code v-pre>DEFAULTS</code>和<code v-pre>options</code>合并成一个新对象，如果两者有同名属性，则<code v-pre>options</code>的属性值会覆盖<code v-pre>DEFAULTS</code>的属性值。</p>
<p>注意，由于存在浅拷贝的问题，<code v-pre>DEFAULTS</code>对象和<code v-pre>options</code>对象的所有属性的值，最好都是简单类型，不要指向另一个对象。否则，<code v-pre>DEFAULTS</code>对象的该属性很可能不起作用。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const DEFAULTS = {
  url: {
    host: 'example.com',
    port: 7070
  },
};

processContent({ url: {port: 8000} })
// {
//   url: {port: 8000}
// }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码的原意是将<code v-pre>url.port</code>改成 8000，<code v-pre>url.host</code>不变。实际结果却是<code v-pre>options.url</code>覆盖掉<code v-pre>DEFAULTS.url</code>，所以<code v-pre>url.host</code>就不存在了。</p>
<h2 id="object-getownpropertydescriptors" tabindex="-1"><a class="header-anchor" href="#object-getownpropertydescriptors" aria-hidden="true">#</a> Object.getOwnPropertyDescriptors()</h2>
<p>ES5 的<code v-pre>Object.getOwnPropertyDescriptor()</code>方法会返回某个对象属性的描述对象（descriptor）。ES2017 引入了<code v-pre>Object.getOwnPropertyDescriptors()</code>方法，返回指定对象所有自身属性（非继承属性）的描述对象。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const obj = {
  foo: 123,
  get bar() { return 'abc' }
};

Object.getOwnPropertyDescriptors(obj)
// { foo:
//    { value: 123,
//      writable: true,
//      enumerable: true,
//      configurable: true },
//   bar:
//    { get: [Function: get bar],
//      set: undefined,
//      enumerable: true,
//      configurable: true } }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>Object.getOwnPropertyDescriptors()</code>方法返回一个对象，所有原对象的属性名都是该对象的属性名，对应的属性值就是该属性的描述对象。</p>
<p>该方法的实现非常容易。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function getOwnPropertyDescriptors(obj) {
  const result = {};
  for (let key of Reflect.ownKeys(obj)) {
    result[key] = Object.getOwnPropertyDescriptor(obj, key);
  }
  return result;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该方法的引入目的，主要是为了解决<code v-pre>Object.assign()</code>无法正确拷贝<code v-pre>get</code>属性和<code v-pre>set</code>属性的问题。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const source = {
  set foo(value) {
    console.log(value);
  }
};

const target1 = {};
Object.assign(target1, source);

Object.getOwnPropertyDescriptor(target1, 'foo')
// { value: undefined,
//   writable: true,
//   enumerable: true,
//   configurable: true }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>source</code>对象的<code v-pre>foo</code>属性的值是一个赋值函数，<code v-pre>Object.assign</code>方法将这个属性拷贝给<code v-pre>target1</code>对象，结果该属性的值变成了<code v-pre>undefined</code>。这是因为<code v-pre>Object.assign</code>方法总是拷贝一个属性的值，而不会拷贝它背后的赋值方法或取值方法。</p>
<p>这时，<code v-pre>Object.getOwnPropertyDescriptors()</code>方法配合<code v-pre>Object.defineProperties()</code>方法，就可以实现正确拷贝。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const source = {
  set foo(value) {
    console.log(value);
  }
};

const target2 = {};
Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source));
Object.getOwnPropertyDescriptor(target2, 'foo')
// { get: undefined,
//   set: [Function: set foo],
//   enumerable: true,
//   configurable: true }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，两个对象合并的逻辑可以写成一个函数。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const shallowMerge = (target, source) =&gt; Object.defineProperties(
  target,
  Object.getOwnPropertyDescriptors(source)
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>Object.getOwnPropertyDescriptors()</code>方法的另一个用处，是配合<code v-pre>Object.create()</code>方法，将对象属性克隆到一个新对象。这属于浅拷贝。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const clone = Object.create(Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj));

// 或者

const shallowClone = (obj) =&gt; Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码会克隆对象<code v-pre>obj</code>。</p>
<p>另外，<code v-pre>Object.getOwnPropertyDescriptors()</code>方法可以实现一个对象继承另一个对象。以前，继承另一个对象，常常写成下面这样。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const obj = {
  __proto__: prot,
  foo: 123,
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ES6 规定<code v-pre>__proto__</code>只有浏览器要部署，其他环境不用部署。如果去除<code v-pre>__proto__</code>，上面代码就要改成下面这样。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const obj = Object.create(prot);
obj.foo = 123;

// 或者

const obj = Object.assign(
  Object.create(prot),
  {
    foo: 123,
  }
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有了<code v-pre>Object.getOwnPropertyDescriptors()</code>，我们就有了另一种写法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const obj = Object.create(
  prot,
  Object.getOwnPropertyDescriptors({
    foo: 123,
  })
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>Object.getOwnPropertyDescriptors()</code>也可以用来实现 Mixin（混入）模式。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let mix = (object) =&gt; ({
  with: (...mixins) =&gt; mixins.reduce(
    (c, mixin) =&gt; Object.create(
      c, Object.getOwnPropertyDescriptors(mixin)
    ), object)
});

// multiple mixins example
let a = {a: 'a'};
let b = {b: 'b'};
let c = {c: 'c'};
let d = mix(c).with(a, b);

d.c // &quot;c&quot;
d.b // &quot;b&quot;
d.a // &quot;a&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码返回一个新的对象<code v-pre>d</code>，代表了对象<code v-pre>a</code>和<code v-pre>b</code>被混入了对象<code v-pre>c</code>的操作。</p>
<p>出于完整性的考虑，<code v-pre>Object.getOwnPropertyDescriptors()</code>进入标准以后，以后还会新增<code v-pre>Reflect.getOwnPropertyDescriptors()</code>方法。</p>
<h2 id="proto-属性-object-setprototypeof-object-getprototypeof" tabindex="-1"><a class="header-anchor" href="#proto-属性-object-setprototypeof-object-getprototypeof" aria-hidden="true">#</a> <code v-pre>__proto__</code>属性，Object.setPrototypeOf()，Object.getPrototypeOf()</h2>
<p>JavaScript 语言的对象继承是通过原型链实现的。ES6 提供了更多原型对象的操作方法。</p>
<h3 id="proto-属性" tabindex="-1"><a class="header-anchor" href="#proto-属性" aria-hidden="true">#</a> <code v-pre>__proto__</code>属性</h3>
<p><code v-pre>__proto__</code>属性（前后各两个下划线），用来读取或设置当前对象的<code v-pre>prototype</code>对象。目前，所有浏览器（包括 IE11）都部署了这个属性。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// es5 的写法
const obj = {
  method: function() { ... }
};
obj.__proto__ = someOtherObj;

// es6 的写法
var obj = Object.create(someOtherObj);
obj.method = function() { ... };
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该属性没有写入 ES6 的正文，而是写入了附录，原因是<code v-pre>__proto__</code>前后的双下划线，说明它本质上是一个内部属性，而不是一个正式的对外的 API，只是由于浏览器广泛支持，才被加入了 ES6。标准明确规定，只有浏览器必须部署这个属性，其他运行环境不一定需要部署，而且新的代码最好认为这个属性是不存在的。因此，无论从语义的角度，还是从兼容性的角度，都不要使用这个属性，而是使用下面的<code v-pre>Object.setPrototypeOf()</code>（写操作）、<code v-pre>Object.getPrototypeOf()</code>（读操作）、<code v-pre>Object.create()</code>（生成操作）代替。</p>
<p>实现上，<code v-pre>__proto__</code>调用的是<code v-pre>Object.prototype.__proto__</code>，具体实现如下。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Object.defineProperty(Object.prototype, '__proto__', {
  get() {
    let _thisObj = Object(this);
    return Object.getPrototypeOf(_thisObj);
  },
  set(proto) {
    if (this === undefined || this === null) {
      throw new TypeError();
    }
    if (!isObject(this)) {
      return undefined;
    }
    if (!isObject(proto)) {
      return undefined;
    }
    let status = Reflect.setPrototypeOf(this, proto);
    if (!status) {
      throw new TypeError();
    }
  },
});

function isObject(value) {
  return Object(value) === value;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果一个对象本身部署了<code v-pre>__proto__</code>属性，该属性的值就是对象的原型。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Object.getPrototypeOf({ __proto__: null })
// null
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="object-setprototypeof" tabindex="-1"><a class="header-anchor" href="#object-setprototypeof" aria-hidden="true">#</a> Object.setPrototypeOf()</h3>
<p><code v-pre>Object.setPrototypeOf</code>方法的作用与<code v-pre>__proto__</code>相同，用来设置一个对象的<code v-pre>prototype</code>对象，返回参数对象本身。它是 ES6 正式推荐的设置原型对象的方法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 格式
Object.setPrototypeOf(object, prototype)

// 用法
const o = Object.setPrototypeOf({}, null);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该方法等同于下面的函数。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function setPrototypeOf(obj, proto) {
  obj.__proto__ = proto;
  return obj;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面是一个例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let proto = {};
let obj = { x: 10 };
Object.setPrototypeOf(obj, proto);

proto.y = 20;
proto.z = 40;

obj.x // 10
obj.y // 20
obj.z // 40
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码将<code v-pre>proto</code>对象设为<code v-pre>obj</code>对象的原型，所以从<code v-pre>obj</code>对象可以读取<code v-pre>proto</code>对象的属性。</p>
<p>如果第一个参数不是对象，会自动转为对象。但是由于返回的还是第一个参数，所以这个操作不会产生任何效果。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Object.setPrototypeOf(1, {}) === 1 // true
Object.setPrototypeOf('foo', {}) === 'foo' // true
Object.setPrototypeOf(true, {}) === true // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于<code v-pre>undefined</code>和<code v-pre>null</code>无法转为对象，所以如果第一个参数是<code v-pre>undefined</code>或<code v-pre>null</code>，就会报错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Object.setPrototypeOf(undefined, {})
// TypeError: Object.setPrototypeOf called on null or undefined

Object.setPrototypeOf(null, {})
// TypeError: Object.setPrototypeOf called on null or undefined
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="object-getprototypeof" tabindex="-1"><a class="header-anchor" href="#object-getprototypeof" aria-hidden="true">#</a> Object.getPrototypeOf()</h3>
<p>该方法与<code v-pre>Object.setPrototypeOf</code>方法配套，用于读取一个对象的原型对象。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Object.getPrototypeOf(obj);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>下面是一个例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function Rectangle() {
  // ...
}

const rec = new Rectangle();

Object.getPrototypeOf(rec) === Rectangle.prototype
// true

Object.setPrototypeOf(rec, Object.prototype);
Object.getPrototypeOf(rec) === Rectangle.prototype
// false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果参数不是对象，会被自动转为对象。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 等同于 Object.getPrototypeOf(Number(1))
Object.getPrototypeOf(1)
// Number {[[PrimitiveValue]]: 0}

// 等同于 Object.getPrototypeOf(String('foo'))
Object.getPrototypeOf('foo')
// String {length: 0, [[PrimitiveValue]]: &quot;&quot;}

// 等同于 Object.getPrototypeOf(Boolean(true))
Object.getPrototypeOf(true)
// Boolean {[[PrimitiveValue]]: false}

Object.getPrototypeOf(1) === Number.prototype // true
Object.getPrototypeOf('foo') === String.prototype // true
Object.getPrototypeOf(true) === Boolean.prototype // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果参数是<code v-pre>undefined</code>或<code v-pre>null</code>，它们无法转为对象，所以会报错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Object.getPrototypeOf(null)
// TypeError: Cannot convert undefined or null to object

Object.getPrototypeOf(undefined)
// TypeError: Cannot convert undefined or null to object
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="object-keys-object-values-object-entries" tabindex="-1"><a class="header-anchor" href="#object-keys-object-values-object-entries" aria-hidden="true">#</a> Object.keys()，Object.values()，Object.entries()</h2>
<h3 id="object-keys" tabindex="-1"><a class="header-anchor" href="#object-keys" aria-hidden="true">#</a> Object.keys()</h3>
<p>ES5 引入了<code v-pre>Object.keys</code>方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = { foo: 'bar', baz: 42 };
Object.keys(obj)
// [&quot;foo&quot;, &quot;baz&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ES2017 <a href="https://github.com/tc39/proposal-object-values-entries" target="_blank" rel="noopener noreferrer">引入</a>了跟<code v-pre>Object.keys</code>配套的<code v-pre>Object.values</code>和<code v-pre>Object.entries</code>，作为遍历一个对象的补充手段，供<code v-pre>for...of</code>循环使用。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let {keys, values, entries} = Object;
let obj = { a: 1, b: 2, c: 3 };

for (let key of keys(obj)) {
  console.log(key); // 'a', 'b', 'c'
}

for (let value of values(obj)) {
  console.log(value); // 1, 2, 3
}

for (let [key, value] of entries(obj)) {
  console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="object-values" tabindex="-1"><a class="header-anchor" href="#object-values" aria-hidden="true">#</a> Object.values()</h3>
<p><code v-pre>Object.values</code>方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const obj = { foo: 'bar', baz: 42 };
Object.values(obj)
// [&quot;bar&quot;, 42]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>返回数组的成员顺序，与本章的《属性的遍历》部分介绍的排列规则一致。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const obj = { 100: 'a', 2: 'b', 7: 'c' };
Object.values(obj)
// [&quot;b&quot;, &quot;c&quot;, &quot;a&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，属性名为数值的属性，是按照数值大小，从小到大遍历的，因此返回的顺序是<code v-pre>b</code>、<code v-pre>c</code>、<code v-pre>a</code>。</p>
<p><code v-pre>Object.values</code>只返回对象自身的可遍历属性。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const obj = Object.create({}, {p: {value: 42}});
Object.values(obj) // []
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>Object.create</code>方法的第二个参数添加的对象属性（属性<code v-pre>p</code>），如果不显式声明，默认是不可遍历的，因为<code v-pre>p</code>的属性描述对象的<code v-pre>enumerable</code>默认是<code v-pre>false</code>，<code v-pre>Object.values</code>不会返回这个属性。只要把<code v-pre>enumerable</code>改成<code v-pre>true</code>，<code v-pre>Object.values</code>就会返回属性<code v-pre>p</code>的值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const obj = Object.create({}, {p:
  {
    value: 42,
    enumerable: true
  }
});
Object.values(obj) // [42]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>Object.values</code>会过滤属性名为 Symbol 值的属性。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Object.values({ [Symbol()]: 123, foo: 'abc' });
// ['abc']
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果<code v-pre>Object.values</code>方法的参数是一个字符串，会返回各个字符组成的一个数组。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Object.values('foo')
// ['f', 'o', 'o']
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，字符串会先转成一个类似数组的对象。字符串的每个字符，就是该对象的一个属性。因此，<code v-pre>Object.values</code>返回每个属性的键值，就是各个字符组成的一个数组。</p>
<p>如果参数不是对象，<code v-pre>Object.values</code>会先将其转为对象。由于数值和布尔值的包装对象，都不会为实例添加非继承的属性。所以，<code v-pre>Object.values</code>会返回空数组。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Object.values(42) // []
Object.values(true) // []
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="object-entries" tabindex="-1"><a class="header-anchor" href="#object-entries" aria-hidden="true">#</a> Object.entries()</h3>
<p><code v-pre>Object.entries()</code>方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const obj = { foo: 'bar', baz: 42 };
Object.entries(obj)
// [ [&quot;foo&quot;, &quot;bar&quot;], [&quot;baz&quot;, 42] ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除了返回值不一样，该方法的行为与<code v-pre>Object.values</code>基本一致。</p>
<p>如果原对象的属性名是一个 Symbol 值，该属性会被忽略。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Object.entries({ [Symbol()]: 123, foo: 'abc' });
// [ [ 'foo', 'abc' ] ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，原对象有两个属性，<code v-pre>Object.entries</code>只输出属性名非 Symbol 值的属性。将来可能会有<code v-pre>Reflect.ownEntries()</code>方法，返回对象自身的所有属性。</p>
<p><code v-pre>Object.entries</code>的基本用途是遍历对象的属性。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let obj = { one: 1, two: 2 };
for (let [k, v] of Object.entries(obj)) {
  console.log(
    `${JSON.stringify(k)}: ${JSON.stringify(v)}`
  );
}
// &quot;one&quot;: 1
// &quot;two&quot;: 2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>Object.entries</code>方法的另一个用处是，将对象转为真正的<code v-pre>Map</code>结构。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const obj = { foo: 'bar', baz: 42 };
const map = new Map(Object.entries(obj));
map // Map { foo: &quot;bar&quot;, baz: 42 }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>自己实现<code v-pre>Object.entries</code>方法，非常简单。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// Generator函数的版本
function* entries(obj) {
  for (let key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
}

// 非Generator函数的版本
function entries(obj) {
  let arr = [];
  for (let key of Object.keys(obj)) {
    arr.push([key, obj[key]]);
  }
  return arr;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="object-fromentries" tabindex="-1"><a class="header-anchor" href="#object-fromentries" aria-hidden="true">#</a> Object.fromEntries()</h2>
<p><code v-pre>Object.fromEntries()</code>方法是<code v-pre>Object.entries()</code>的逆操作，用于将一个键值对数组转为对象。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Object.fromEntries([
  ['foo', 'bar'],
  ['baz', 42]
])
// { foo: &quot;bar&quot;, baz: 42 }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该方法的主要目的，是将键值对的数据结构还原为对象，因此特别适合将 Map 结构转为对象。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 例一
const entries = new Map([
  ['foo', 'bar'],
  ['baz', 42]
]);

Object.fromEntries(entries)
// { foo: &quot;bar&quot;, baz: 42 }

// 例二
const map = new Map().set('foo', true).set('bar', false);
Object.fromEntries(map)
// { foo: true, bar: false }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该方法的一个用处是配合<code v-pre>URLSearchParams</code>对象，将查询字符串转为对象。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Object.fromEntries(new URLSearchParams('foo=bar&amp;baz=qux'))
// { foo: &quot;bar&quot;, baz: &quot;qux&quot; }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></div></template>
