<template><div><h1 id="reflect" tabindex="-1"><a class="header-anchor" href="#reflect" aria-hidden="true">#</a> Reflect</h1>
<h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2>
<p><code v-pre>Reflect</code>对象与<code v-pre>Proxy</code>对象一样，也是 ES6 为了操作对象而提供的新 API。<code v-pre>Reflect</code>对象的设计目的有这样几个。</p>
<p>（1） **将<code v-pre>Object</code>对象的一些明显属于语言内部的方法（比如<code v-pre>Object.defineProperty</code>），放到<code v-pre>Reflect</code>对象上。**现阶段，某些方法同时在<code v-pre>Object</code>和<code v-pre>Reflect</code>对象上部署，未来的新方法将只部署在<code v-pre>Reflect</code>对象上。也就是说，从<code v-pre>Reflect</code>对象上可以拿到语言内部的方法。</p>
<!-- more -->
<p>（2） <strong>修改某些<code v-pre>Object</code>方法的返回结果，让其变得更合理</strong>。比如，<code v-pre>Object.defineProperty(obj, name, desc)</code>在无法定义属性时，会抛出一个错误，而<code v-pre>Reflect.defineProperty(obj, name, desc)</code>则会返回<code v-pre>false</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 老写法
try {
  Object.defineProperty(target, property, attributes);
  // success
} catch (e) {
  // failure
}

// 新写法
if (Reflect.defineProperty(target, property, attributes)) {
  // success
} else {
  // failure
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（3） <strong>让<code v-pre>Object</code>操作都变成函数行为</strong>。某些<code v-pre>Object</code>操作是命令式，比如<code v-pre>name in obj</code>和<code v-pre>delete obj[name]</code>，而<code v-pre>Reflect.has(obj, name)</code>和<code v-pre>Reflect.deleteProperty(obj, name)</code>让它们变成了函数行为。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 老写法
'assign' in Object // true

// 新写法
Reflect.has(Object, 'assign') // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（4）<code v-pre>Reflect</code>对象的方法与<code v-pre>Proxy</code>对象的方法一一对应，只要是<code v-pre>Proxy</code>对象的方法，就能在<code v-pre>Reflect</code>对象上找到对应的方法。这就让<code v-pre>Proxy</code>对象可以方便地调用对应的<code v-pre>Reflect</code>方法，完成默认行为，作为修改行为的基础。也就是说，<strong>不管<code v-pre>Proxy</code>怎么修改默认行为，你总可以在<code v-pre>Reflect</code>上获取默认行为</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Proxy(target, {
  set: function(target, name, value, receiver) {
    var success = Reflect.set(target, name, value, receiver);
    if (success) {
      console.log('property ' + name + ' on ' + target + ' set to ' + value);
    }
    return success;
  }
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>Proxy</code>方法拦截<code v-pre>target</code>对象的属性赋值行为。它采用<code v-pre>Reflect.set</code>方法将值赋值给对象的属性，确保完成原有的行为，然后再部署额外的功能。</p>
<p>下面是另一个例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var loggedObj = new Proxy(obj, {
  get(target, name) {
    console.log('get', target, name);
    return Reflect.get(target, name);
  },
  deleteProperty(target, name) {
    console.log('delete' + name);
    return Reflect.deleteProperty(target, name);
  },
  has(target, name) {
    console.log('has' + name);
    return Reflect.has(target, name);
  }
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，每一个<code v-pre>Proxy</code>对象的拦截操作（<code v-pre>get</code>、<code v-pre>delete</code>、<code v-pre>has</code>），内部都调用对应的<code v-pre>Reflect</code>方法，保证原生行为能够正常执行。添加的工作，就是将每一个操作输出一行日志。</p>
<p>有了<code v-pre>Reflect</code>对象以后，很多操作会更易读。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 老写法
Function.prototype.apply.call(Math.floor, undefined, [1.75]) // 1

// 新写法
Reflect.apply(Math.floor, undefined, [1.75]) // 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="静态方法" tabindex="-1"><a class="header-anchor" href="#静态方法" aria-hidden="true">#</a> 静态方法</h2>
<p><code v-pre>Reflect</code>对象一共有 13 个静态方法。</p>
<ul>
<li>Reflect.apply(target, thisArg, args)</li>
<li>Reflect.construct(target, args)</li>
<li>Reflect.get(target, name, receiver)</li>
<li>Reflect.set(target, name, value, receiver)</li>
<li>Reflect.defineProperty(target, name, desc)</li>
<li>Reflect.deleteProperty(target, name)</li>
<li>Reflect.has(target, name)</li>
<li>Reflect.ownKeys(target)</li>
<li>Reflect.isExtensible(target)</li>
<li>Reflect.preventExtensions(target)</li>
<li>Reflect.getOwnPropertyDescriptor(target, name)</li>
<li>Reflect.getPrototypeOf(target)</li>
<li>Reflect.setPrototypeOf(target, prototype)</li>
</ul>
<p>上面这些方法的作用，大部分与<code v-pre>Object</code>对象的同名方法的作用都是相同的，而且它与<code v-pre>Proxy</code>对象的方法是一一对应的。下面是对它们的解释。</p>
<h3 id="reflect-get-target-name-receiver" tabindex="-1"><a class="header-anchor" href="#reflect-get-target-name-receiver" aria-hidden="true">#</a> Reflect.get(target, name, receiver)</h3>
<p><code v-pre>Reflect.get</code>方法查找并返回<code v-pre>target</code>对象的<code v-pre>name</code>属性，如果没有该属性，则返回<code v-pre>undefined</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var myObject = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar;
  },
}

Reflect.get(myObject, 'foo') // 1
Reflect.get(myObject, 'bar') // 2
Reflect.get(myObject, 'baz') // 3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果<code v-pre>name</code>属性部署了读取函数（getter），则读取函数的<code v-pre>this</code>绑定<code v-pre>receiver</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var myObject = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar;
  },
};

var myReceiverObject = {
  foo: 4,
  bar: 4,
};

Reflect.get(myObject, 'baz', myReceiverObject) // 8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果第一个参数不是对象，<code v-pre>Reflect.get</code>方法会报错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Reflect.get(1, 'foo') // 报错
Reflect.get(false, 'foo') // 报错
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="reflect-set-target-name-value-receiver" tabindex="-1"><a class="header-anchor" href="#reflect-set-target-name-value-receiver" aria-hidden="true">#</a> Reflect.set(target, name, value, receiver)</h3>
<p><code v-pre>Reflect.set</code>方法设置<code v-pre>target</code>对象的<code v-pre>name</code>属性等于<code v-pre>value</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var myObject = {
  foo: 1,
  set bar(value) {
    return this.foo = value;
  },
}

myObject.foo // 1

Reflect.set(myObject, 'foo', 2);
myObject.foo // 2

Reflect.set(myObject, 'bar', 3)
myObject.foo // 3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果<code v-pre>name</code>属性设置了赋值函数，则赋值函数的<code v-pre>this</code>绑定<code v-pre>receiver</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var myObject = {
  foo: 4,
  set bar(value) {
    return this.foo = value;
  },
};

var myReceiverObject = {
  foo: 0,
};

Reflect.set(myObject, 'bar', 1, myReceiverObject);
myObject.foo // 4
myReceiverObject.foo // 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，如果 <code v-pre>Proxy</code>对象和 <code v-pre>Reflect</code>对象联合使用，前者拦截赋值操作，后者完成赋值的默认行为，而且传入了<code v-pre>receiver</code>，那么<code v-pre>Reflect.set</code>会触发<code v-pre>Proxy.defineProperty</code>拦截。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let p = {
  a: 'a'
};

let handler = {
  set(target, key, value, receiver) {
    console.log('set');
    Reflect.set(target, key, value, receiver)
  },
  defineProperty(target, key, attribute) {
    console.log('defineProperty');
    Reflect.defineProperty(target, key, attribute);
  }
};

let obj = new Proxy(p, handler);
obj.a = 'A';
// set
// defineProperty
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>Proxy.set</code>拦截里面使用了<code v-pre>Reflect.set</code>，而且传入了<code v-pre>receiver</code>，导致触发<code v-pre>Proxy.defineProperty</code>拦截。这是因为<code v-pre>Proxy.set</code>的<code v-pre>receiver</code>参数总是指向当前的 <code v-pre>Proxy</code>实例（即上例的<code v-pre>obj</code>），而<code v-pre>Reflect.set</code>一旦传入<code v-pre>receiver</code>，就会将属性赋值到<code v-pre>receiver</code>上面（即<code v-pre>obj</code>），导致触发<code v-pre>defineProperty</code>拦截。如果<code v-pre>Reflect.set</code>没有传入<code v-pre>receiver</code>，那么就不会触发<code v-pre>defineProperty</code>拦截。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let p = {
  a: 'a'
};

let handler = {
  set(target, key, value, receiver) {
    console.log('set');
    Reflect.set(target, key, value)
  },
  defineProperty(target, key, attribute) {
    console.log('defineProperty');
    Reflect.defineProperty(target, key, attribute);
  }
};

let obj = new Proxy(p, handler);
obj.a = 'A';
// set
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果第一个参数不是对象，<code v-pre>Reflect.set</code>会报错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Reflect.set(1, 'foo', {}) // 报错
Reflect.set(false, 'foo', {}) // 报错
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="reflect-has-obj-name" tabindex="-1"><a class="header-anchor" href="#reflect-has-obj-name" aria-hidden="true">#</a> Reflect.has(obj, name)</h3>
<p><code v-pre>Reflect.has</code>方法对应<code v-pre>name in obj</code>里面的<code v-pre>in</code>运算符。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var myObject = {
  foo: 1,
};

// 旧写法
'foo' in myObject // true

// 新写法
Reflect.has(myObject, 'foo') // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果<code v-pre>Reflect.has()</code>方法的第一个参数不是对象，会报错。</p>
<h3 id="reflect-deleteproperty-obj-name" tabindex="-1"><a class="header-anchor" href="#reflect-deleteproperty-obj-name" aria-hidden="true">#</a> Reflect.deleteProperty(obj, name)</h3>
<p><code v-pre>Reflect.deleteProperty</code>方法等同于<code v-pre>delete obj[name]</code>，用于删除对象的属性。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const myObj = { foo: 'bar' };

// 旧写法
delete myObj.foo;

// 新写法
Reflect.deleteProperty(myObj, 'foo');
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该方法返回一个布尔值。如果删除成功，或者被删除的属性不存在，返回<code v-pre>true</code>；删除失败，被删除的属性依然存在，返回<code v-pre>false</code>。</p>
<p>如果<code v-pre>Reflect.deleteProperty()</code>方法的第一个参数不是对象，会报错。</p>
<h3 id="reflect-construct-target-args" tabindex="-1"><a class="header-anchor" href="#reflect-construct-target-args" aria-hidden="true">#</a> Reflect.construct(target, args)</h3>
<p><code v-pre>Reflect.construct</code>方法等同于<code v-pre>new target(...args)</code>，这提供了一种不使用<code v-pre>new</code>，来调用构造函数的方法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function Greeting(name) {
  this.name = name;
}

// new 的写法
const instance = new Greeting('张三');

// Reflect.construct 的写法
const instance = Reflect.construct(Greeting, ['张三']);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果<code v-pre>Reflect.construct()</code>方法的第一个参数不是函数，会报错。</p>
<h3 id="reflect-getprototypeof-obj" tabindex="-1"><a class="header-anchor" href="#reflect-getprototypeof-obj" aria-hidden="true">#</a> Reflect.getPrototypeOf(obj)</h3>
<p><code v-pre>Reflect.getPrototypeOf</code>方法用于读取对象的<code v-pre>__proto__</code>属性，对应<code v-pre>Object.getPrototypeOf(obj)</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const myObj = new FancyThing();

// 旧写法
Object.getPrototypeOf(myObj) === FancyThing.prototype;

// 新写法
Reflect.getPrototypeOf(myObj) === FancyThing.prototype;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>Reflect.getPrototypeOf</code>和<code v-pre>Object.getPrototypeOf</code>的一个区别是，如果参数不是对象，<code v-pre>Object.getPrototypeOf</code>会将这个参数转为对象，然后再运行，而<code v-pre>Reflect.getPrototypeOf</code>会报错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Object.getPrototypeOf(1) // Number {[[PrimitiveValue]]: 0}
Reflect.getPrototypeOf(1) // 报错
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="reflect-setprototypeof-obj-newproto" tabindex="-1"><a class="header-anchor" href="#reflect-setprototypeof-obj-newproto" aria-hidden="true">#</a> Reflect.setPrototypeOf(obj, newProto)</h3>
<p><code v-pre>Reflect.setPrototypeOf</code>方法用于设置目标对象的原型（prototype），对应<code v-pre>Object.setPrototypeOf(obj, newProto)</code>方法。它返回一个布尔值，表示是否设置成功。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const myObj = {};

// 旧写法
Object.setPrototypeOf(myObj, Array.prototype);

// 新写法
Reflect.setPrototypeOf(myObj, Array.prototype);

myObj.length // 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果无法设置目标对象的原型（比如，目标对象禁止扩展），<code v-pre>Reflect.setPrototypeOf</code>方法返回<code v-pre>false</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Reflect.setPrototypeOf({}, null)
// true
Reflect.setPrototypeOf(Object.freeze({}), null)
// false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果第一个参数不是对象，<code v-pre>Object.setPrototypeOf</code>会返回第一个参数本身，而<code v-pre>Reflect.setPrototypeOf</code>会报错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Object.setPrototypeOf(1, {})
// 1

Reflect.setPrototypeOf(1, {})
// TypeError: Reflect.setPrototypeOf called on non-object
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果第一个参数是<code v-pre>undefined</code>或<code v-pre>null</code>，<code v-pre>Object.setPrototypeOf</code>和<code v-pre>Reflect.setPrototypeOf</code>都会报错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Object.setPrototypeOf(null, {})
// TypeError: Object.setPrototypeOf called on null or undefined

Reflect.setPrototypeOf(null, {})
// TypeError: Reflect.setPrototypeOf called on non-object
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="reflect-apply-func-thisarg-args" tabindex="-1"><a class="header-anchor" href="#reflect-apply-func-thisarg-args" aria-hidden="true">#</a> Reflect.apply(func, thisArg, args)</h3>
<p><code v-pre>Reflect.apply</code>方法等同于<code v-pre>Function.prototype.apply.call(func, thisArg, args)</code>，用于绑定<code v-pre>this</code>对象后执行给定函数。</p>
<p>一般来说，如果要绑定一个函数的<code v-pre>this</code>对象，可以这样写<code v-pre>fn.apply(obj, args)</code>，但是如果函数定义了自己的<code v-pre>apply</code>方法，就只能写成<code v-pre>Function.prototype.apply.call(fn, obj, args)</code>，采用<code v-pre>Reflect</code>对象可以简化这种操作。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const ages = [11, 33, 12, 54, 18, 96];

// 旧写法
const youngest = Math.min.apply(Math, ages);
const oldest = Math.max.apply(Math, ages);
const type = Object.prototype.toString.call(youngest);

// 新写法
const youngest = Reflect.apply(Math.min, Math, ages);
const oldest = Reflect.apply(Math.max, Math, ages);
const type = Reflect.apply(Object.prototype.toString, youngest, []);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="reflect-defineproperty-target-propertykey-attributes" tabindex="-1"><a class="header-anchor" href="#reflect-defineproperty-target-propertykey-attributes" aria-hidden="true">#</a> Reflect.defineProperty(target, propertyKey, attributes)</h3>
<p><code v-pre>Reflect.defineProperty</code>方法基本等同于<code v-pre>Object.defineProperty</code>，用来为对象定义属性。未来，后者会被逐渐废除，请从现在开始就使用<code v-pre>Reflect.defineProperty</code>代替它。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function MyDate() {
  /*…*/
}

// 旧写法
Object.defineProperty(MyDate, 'now', {
  value: () =&gt; Date.now()
});

// 新写法
Reflect.defineProperty(MyDate, 'now', {
  value: () =&gt; Date.now()
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果<code v-pre>Reflect.defineProperty</code>的第一个参数不是对象，就会抛出错误，比如<code v-pre>Reflect.defineProperty(1, 'foo')</code>。</p>
<p>这个方法可以与<code v-pre>Proxy.defineProperty</code>配合使用。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const p = new Proxy({}, {
  defineProperty(target, prop, descriptor) {
    console.log(descriptor);
    return Reflect.defineProperty(target, prop, descriptor);
  }
});

p.foo = 'bar';
// {value: &quot;bar&quot;, writable: true, enumerable: true, configurable: true}

p.foo // &quot;bar&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>Proxy.defineProperty</code>对属性赋值设置了拦截，然后使用<code v-pre>Reflect.defineProperty</code>完成了赋值。</p>
<h3 id="reflect-getownpropertydescriptor-target-propertykey" tabindex="-1"><a class="header-anchor" href="#reflect-getownpropertydescriptor-target-propertykey" aria-hidden="true">#</a> Reflect.getOwnPropertyDescriptor(target, propertyKey)</h3>
<p><code v-pre>Reflect.getOwnPropertyDescriptor</code>基本等同于<code v-pre>Object.getOwnPropertyDescriptor</code>，用于得到指定属性的描述对象，将来会替代掉后者。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var myObject = {};
Object.defineProperty(myObject, 'hidden', {
  value: true,
  enumerable: false,
});

// 旧写法
var theDescriptor = Object.getOwnPropertyDescriptor(myObject, 'hidden');

// 新写法
var theDescriptor = Reflect.getOwnPropertyDescriptor(myObject, 'hidden');
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>Reflect.getOwnPropertyDescriptor</code>和<code v-pre>Object.getOwnPropertyDescriptor</code>的一个区别是，如果第一个参数不是对象，<code v-pre>Object.getOwnPropertyDescriptor(1, 'foo')</code>不报错，返回<code v-pre>undefined</code>，而<code v-pre>Reflect.getOwnPropertyDescriptor(1, 'foo')</code>会抛出错误，表示参数非法。</p>
<h3 id="reflect-isextensible-target" tabindex="-1"><a class="header-anchor" href="#reflect-isextensible-target" aria-hidden="true">#</a> Reflect.isExtensible (target)</h3>
<p><code v-pre>Reflect.isExtensible</code>方法对应<code v-pre>Object.isExtensible</code>，返回一个布尔值，表示当前对象是否可扩展。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const myObject = {};

// 旧写法
Object.isExtensible(myObject) // true

// 新写法
Reflect.isExtensible(myObject) // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果参数不是对象，<code v-pre>Object.isExtensible</code>会返回<code v-pre>false</code>，因为非对象本来就是不可扩展的，而<code v-pre>Reflect.isExtensible</code>会报错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Object.isExtensible(1) // false
Reflect.isExtensible(1) // 报错
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="reflect-preventextensions-target" tabindex="-1"><a class="header-anchor" href="#reflect-preventextensions-target" aria-hidden="true">#</a> Reflect.preventExtensions(target)</h3>
<p><code v-pre>Reflect.preventExtensions</code>对应<code v-pre>Object.preventExtensions</code>方法，用于让一个对象变为不可扩展。它返回一个布尔值，表示是否操作成功。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var myObject = {};

// 旧写法
Object.preventExtensions(myObject) // Object {}

// 新写法
Reflect.preventExtensions(myObject) // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果参数不是对象，<code v-pre>Object.preventExtensions</code>在 ES5 环境报错，在 ES6 环境返回传入的参数，而<code v-pre>Reflect.preventExtensions</code>会报错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// ES5 环境
Object.preventExtensions(1) // 报错

// ES6 环境
Object.preventExtensions(1) // 1

// 新写法
Reflect.preventExtensions(1) // 报错
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="reflect-ownkeys-target" tabindex="-1"><a class="header-anchor" href="#reflect-ownkeys-target" aria-hidden="true">#</a> Reflect.ownKeys (target)</h3>
<p><code v-pre>Reflect.ownKeys</code>方法用于返回对象的所有属性，基本等同于<code v-pre>Object.getOwnPropertyNames</code>与<code v-pre>Object.getOwnPropertySymbols</code>之和。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var myObject = {
  foo: 1,
  bar: 2,
  [Symbol.for('baz')]: 3,
  [Symbol.for('bing')]: 4,
};

// 旧写法
Object.getOwnPropertyNames(myObject)
// ['foo', 'bar']

Object.getOwnPropertySymbols(myObject)
//[Symbol(baz), Symbol(bing)]

// 新写法
Reflect.ownKeys(myObject)
// ['foo', 'bar', Symbol(baz), Symbol(bing)]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果<code v-pre>Reflect.ownKeys()</code>方法的第一个参数不是对象，会报错。</p>
<h2 id="实例-使用-proxy-实现观察者模式" tabindex="-1"><a class="header-anchor" href="#实例-使用-proxy-实现观察者模式" aria-hidden="true">#</a> 实例：使用 Proxy 实现观察者模式</h2>
<p><strong>观察者模式（Observer mode）指的是函数自动观察数据对象，一旦对象有变化，函数就会自动执行</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const person = observable({
  name: '张三',
  age: 20
}); // 观察目标

function print() {
  console.log(`${person.name}, ${person.age}`)
} // 观察者

observe(print); // 启动观察
person.name = '李四';
// 输出
// 李四, 20
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，数据对象<code v-pre>person</code>是观察目标，函数<code v-pre>print</code>是观察者。一旦数据对象发生变化，<code v-pre>print</code>就会自动执行。</p>
<p>下面，使用 Proxy 写一个观察者模式的最简单实现，即实现<code v-pre>observable</code>和<code v-pre>observe</code>这两个函数。思路是<code v-pre>observable</code>函数返回一个原始对象的 Proxy 代理，拦截赋值操作，触发充当观察者的各个函数。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const queuedObservers = new Set();

const observe = fn =&gt; queuedObservers.add(fn);
const observable = obj =&gt; new Proxy(obj, {set});

function set(target, key, value, receiver) {
  const result = Reflect.set(target, key, value, receiver);
  queuedObservers.forEach(observer =&gt; observer());
  return result;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，先定义了一个<code v-pre>Set</code>集合，所有观察者函数都放进这个集合。然后，<code v-pre>observable</code>函数返回原始对象的代理，拦截赋值操作。拦截函数<code v-pre>set</code>之中，会自动执行所有观察者。</p>
</div></template>
