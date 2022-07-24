<template><div><h1 id="proxy" tabindex="-1"><a class="header-anchor" href="#proxy" aria-hidden="true">#</a> Proxy</h1>
<h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2>
<p>Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“<strong>元编程</strong>”（meta programming），即<strong>对编程语言进行编程</strong>。</p>
<p>Proxy 可以理解成，在目标对象之前架设一层“拦截”，<strong>外界对该对象的访问，都必须先通过这层拦截</strong>，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。</p>
<!-- more -->
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = new Proxy({}, {
  get: function (target, propKey, receiver) {
    console.log(`getting ${propKey}!`);
    return Reflect.get(target, propKey, receiver);
  },
  set: function (target, propKey, value, receiver) {
    console.log(`setting ${propKey}!`);
    return Reflect.set(target, propKey, value, receiver);
  }
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码对一个空对象架设了一层拦截，重定义了属性的读取（<code v-pre>get</code>）和设置（<code v-pre>set</code>）行为。这里暂时先不解释具体的语法，只看运行结果。对设置了拦截行为的对象<code v-pre>obj</code>，去读写它的属性，就会得到下面的结果。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>obj.count = 1
//  setting count!
++obj.count
//  getting count!
//  setting count!
//  2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码说明，Proxy 实际上重载（overload）了点运算符，即用自己的定义覆盖了语言的原始定义。</p>
<p>ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var proxy = new Proxy(target, handler);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Proxy 对象的所有用法，都是上面这种形式，不同的只是<code v-pre>handler</code>参数的写法。其中，<code v-pre>new Proxy()</code>表示生成一个<code v-pre>Proxy</code>实例，<code v-pre>target</code>参数表示所要拦截的目标对象，<code v-pre>handler</code>参数也是一个对象，用来定制拦截行为。</p>
<p>下面是另一个拦截读取属性行为的例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var proxy = new Proxy({}, {
  get: function(target, propKey) {
    return 35;
  }
});

proxy.time // 35
proxy.name // 35
proxy.title // 35
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，作为构造函数，<code v-pre>Proxy</code>接受两个参数。第一个参数是所要代理的目标对象（上例是一个空对象），即如果没有<code v-pre>Proxy</code>的介入，操作原来要访问的就是这个对象；第二个参数是一个配置对象，对于每一个被代理的操作，需要提供一个对应的处理函数，该函数将拦截对应的操作。比如，上面代码中，配置对象有一个<code v-pre>get</code>方法，用来拦截对目标对象属性的访问请求。<code v-pre>get</code>方法的两个参数分别是目标对象和所要访问的属性。可以看到，由于拦截函数总是返回<code v-pre>35</code>，所以访问任何属性都得到<code v-pre>35</code>。</p>
<p>注意，要使得<code v-pre>Proxy</code>起作用，必须针对<code v-pre>Proxy</code>实例（上例是<code v-pre>proxy</code>对象）进行操作，而不是针对目标对象（上例是空对象）进行操作。</p>
<p>如果<code v-pre>handler</code>没有设置任何拦截，那就等同于直接通向原对象。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var target = {};
var handler = {};
var proxy = new Proxy(target, handler);
proxy.a = 'b';
target.a // &quot;b&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>handler</code>是一个空对象，没有任何拦截效果，访问<code v-pre>proxy</code>就等同于访问<code v-pre>target</code>。</p>
<p>一个技巧是将 Proxy 对象，设置到<code v-pre>object.proxy</code>属性，从而可以在<code v-pre>object</code>对象上调用。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var object = { proxy: new Proxy(target, handler) };
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Proxy 实例也可以作为其他对象的原型对象。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var proxy = new Proxy({}, {
  get: function(target, propKey) {
    return 35;
  }
});

let obj = Object.create(proxy);
obj.time // 35
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>proxy</code>对象是<code v-pre>obj</code>对象的原型，<code v-pre>obj</code>对象本身并没有<code v-pre>time</code>属性，所以根据原型链，会在<code v-pre>proxy</code>对象上读取该属性，导致被拦截。</p>
<p>同一个拦截器函数，可以设置拦截多个操作。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var handler = {
  get: function(target, name) {
    if (name === 'prototype') {
      return Object.prototype;
    }
    return 'Hello, ' + name;
  },

  apply: function(target, thisBinding, args) {
    return args[0];
  },

  construct: function(target, args) {
    return {value: args[1]};
  }
};

var fproxy = new Proxy(function(x, y) {
  return x + y;
}, handler);

fproxy(1, 2) // 1
new fproxy(1, 2) // {value: 2}
fproxy.prototype === Object.prototype // true
fproxy.foo === &quot;Hello, foo&quot; // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于可以设置、但没有设置拦截的操作，则直接落在目标对象上，按照原先的方式产生结果。</p>
<p>下面是 Proxy 支持的拦截操作一览，一共 13 种。</p>
<ul>
<li><strong>get(target, propKey, receiver)</strong>：拦截对象属性的读取，比如<code v-pre>proxy.foo</code>和<code v-pre>proxy['foo']</code>。</li>
<li><strong>set(target, propKey, value, receiver)</strong>：拦截对象属性的设置，比如<code v-pre>proxy.foo = v</code>或<code v-pre>proxy['foo'] = v</code>，返回一个布尔值。</li>
<li><strong>has(target, propKey)</strong>：拦截<code v-pre>propKey in proxy</code>的操作，返回一个布尔值。</li>
<li><strong>deleteProperty(target, propKey)</strong>：拦截<code v-pre>delete proxy[propKey]</code>的操作，返回一个布尔值。</li>
<li><strong>ownKeys(target)</strong>：拦截<code v-pre>Object.getOwnPropertyNames(proxy)</code>、<code v-pre>Object.getOwnPropertySymbols(proxy)</code>、<code v-pre>Object.keys(proxy)</code>、<code v-pre>for...in</code>循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而<code v-pre>Object.keys()</code>的返回结果仅包括目标对象自身的可遍历属性。</li>
<li><strong>getOwnPropertyDescriptor(target, propKey)</strong>：拦截<code v-pre>Object.getOwnPropertyDescriptor(proxy, propKey)</code>，返回属性的描述对象。</li>
<li><strong>defineProperty(target, propKey, propDesc)</strong>：拦截<code v-pre>Object.defineProperty(proxy, propKey, propDesc）</code>、<code v-pre>Object.defineProperties(proxy, propDescs)</code>，返回一个布尔值。</li>
<li><strong>preventExtensions(target)</strong>：拦截<code v-pre>Object.preventExtensions(proxy)</code>，返回一个布尔值。</li>
<li><strong>getPrototypeOf(target)</strong>：拦截<code v-pre>Object.getPrototypeOf(proxy)</code>，返回一个对象。</li>
<li><strong>isExtensible(target)</strong>：拦截<code v-pre>Object.isExtensible(proxy)</code>，返回一个布尔值。</li>
<li><strong>setPrototypeOf(target, proto)</strong>：拦截<code v-pre>Object.setPrototypeOf(proxy, proto)</code>，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。</li>
<li><strong>apply(target, object, args)</strong>：拦截 Proxy 实例作为函数调用的操作，比如<code v-pre>proxy(...args)</code>、<code v-pre>proxy.call(object, ...args)</code>、<code v-pre>proxy.apply(...)</code>。</li>
<li><strong>construct(target, args)</strong>：拦截 Proxy 实例作为构造函数调用的操作，比如<code v-pre>new proxy(...args)</code>。</li>
</ul>
<h2 id="proxy-实例的方法" tabindex="-1"><a class="header-anchor" href="#proxy-实例的方法" aria-hidden="true">#</a> Proxy 实例的方法</h2>
<p>下面是上面这些拦截方法的详细介绍。</p>
<h3 id="get" tabindex="-1"><a class="header-anchor" href="#get" aria-hidden="true">#</a> get()</h3>
<p><code v-pre>get</code>方法用于拦截某个属性的读取操作，可以接受<strong>三个参数</strong>，依次为<strong>目标对象、属性名和 proxy 实例本身</strong>（严格地说，是操作行为所针对的对象），其中最后一个参数可选。</p>
<p><code v-pre>get</code>方法的用法，上文已经有一个例子，下面是另一个拦截读取操作的例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var person = {
  name: &quot;张三&quot;
};

var proxy = new Proxy(person, {
  get: function(target, propKey) {
    if (propKey in target) {
      return target[propKey];
    } else {
      throw new ReferenceError(&quot;Prop name \&quot;&quot; + propKey + &quot;\&quot; does not exist.&quot;);
    }
  }
});

proxy.name // &quot;张三&quot;
proxy.age // 抛出一个错误
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码表示，如果访问目标对象不存在的属性，会抛出一个错误。如果没有这个拦截函数，访问不存在的属性，只会返回<code v-pre>undefined</code>。</p>
<p><strong><code v-pre>get</code>方法可以继承</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let proto = new Proxy({}, {
  get(target, propertyKey, receiver) {
    console.log('GET ' + propertyKey);
    return target[propertyKey];
  }
});

let obj = Object.create(proto);
obj.foo // &quot;GET foo&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，拦截操作定义在<code v-pre>Prototype</code>对象上面，所以如果读取<code v-pre>obj</code>对象继承的属性时，拦截会生效。</p>
<p>下面的例子使用<code v-pre>get</code>拦截，实现数组读取负数的索引。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function createArray(...elements) {
  let handler = {
    get(target, propKey, receiver) {
      let index = Number(propKey);
      if (index &lt; 0) {
        propKey = String(target.length + index);
      }
      return Reflect.get(target, propKey, receiver);
    }
  };

  let target = [];
  target.push(...elements);
  return new Proxy(target, handler);
}

let arr = createArray('a', 'b', 'c');
arr[-1] // c
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，数组的位置参数是<code v-pre>-1</code>，就会输出数组的倒数第一个成员。</p>
<p>利用 Proxy，可以将读取属性的操作（<code v-pre>get</code>），转变为执行某个函数，从而实现属性的链式操作。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var pipe = (function () {
  return function (value) {
    var funcStack = [];
    var oproxy = new Proxy({} , {
      get : function (pipeObject, fnName) {
        if (fnName === 'get') {
          return funcStack.reduce(function (val, fn) {
            return fn(val);
          },value);
        }
        funcStack.push(window[fnName]);
        return oproxy;
      }
    });

    return oproxy;
  }
}());

var double = n =&gt; n * 2;
var pow    = n =&gt; n * n;
var reverseInt = n =&gt; n.toString().split(&quot;&quot;).reverse().join(&quot;&quot;) | 0;

pipe(3).double.pow.reverseInt.get; // 63
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码设置 Proxy 以后，达到了将函数名链式使用的效果。</p>
<p>下面的例子则是利用<code v-pre>get</code>拦截，实现一个生成各种 DOM 节点的通用函数<code v-pre>dom</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const dom = new Proxy({}, {
  get(target, property) {
    return function(attrs = {}, ...children) {
      const el = document.createElement(property);
      for (let prop of Object.keys(attrs)) {
        el.setAttribute(prop, attrs[prop]);
      }
      for (let child of children) {
        if (typeof child === 'string') {
          child = document.createTextNode(child);
        }
        el.appendChild(child);
      }
      return el;
    }
  }
});

const el = dom.div({},
  'Hello, my name is ',
  dom.a({href: '//example.com'}, 'Mark'),
  '. I like:',
  dom.ul({},
    dom.li({}, 'The web'),
    dom.li({}, 'Food'),
    dom.li({}, '…actually that\'s it')
  )
);

document.body.appendChild(el);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面是一个<code v-pre>get</code>方法的第三个参数的例子，它总是指向原始的读操作所在的那个对象，一般情况下就是 Proxy 实例。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const proxy = new Proxy({}, {
  get: function(target, key, receiver) {
    return receiver;
  }
});
proxy.getReceiver === proxy // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>proxy</code>对象的<code v-pre>getReceiver</code>属性是由<code v-pre>proxy</code>对象提供的，所以<code v-pre>receiver</code>指向<code v-pre>proxy</code>对象。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const proxy = new Proxy({}, {
  get: function(target, key, receiver) {
    return receiver;
  }
});

const d = Object.create(proxy);
d.a === d // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>d</code>对象本身没有<code v-pre>a</code>属性，所以读取<code v-pre>d.a</code>的时候，会去<code v-pre>d</code>的原型<code v-pre>proxy</code>对象找。这时，<code v-pre>receiver</code>就指向<code v-pre>d</code>，代表原始的读操作所在的那个对象。</p>
<p>如果一个属性不可配置（configurable）且不可写（writable），则 Proxy 不能修改该属性，否则通过 Proxy 对象访问该属性会报错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const target = Object.defineProperties({}, {
  foo: {
    value: 123,
    writable: false,
    configurable: false
  },
});

const handler = {
  get(target, propKey) {
    return 'abc';
  }
};

const proxy = new Proxy(target, handler);

proxy.foo
// TypeError: Invariant check failed
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="set" tabindex="-1"><a class="header-anchor" href="#set" aria-hidden="true">#</a> set()</h3>
<p><code v-pre>set</code>方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选。</p>
<p>假定<code v-pre>Person</code>对象有一个<code v-pre>age</code>属性，该属性应该是一个不大于 200 的整数，那么可以使用<code v-pre>Proxy</code>保证<code v-pre>age</code>的属性值符合要求。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let validator = {
  set: function(obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      }
      if (value &gt; 200) {
        throw new RangeError('The age seems invalid');
      }
    }

    // 对于满足条件的 age 属性以及其他属性，直接保存
    obj[prop] = value;
  }
};

let person = new Proxy({}, validator);

person.age = 100;

person.age // 100
person.age = 'young' // 报错
person.age = 300 // 报错
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，由于设置了存值函数<code v-pre>set</code>，任何不符合要求的<code v-pre>age</code>属性赋值，都会抛出一个错误，这是数据验证的一种实现方法。利用<code v-pre>set</code>方法，还可以数据绑定，即每当对象发生变化时，会自动更新 DOM。</p>
<p>有时，我们会在对象上面设置内部属性，属性名的第一个字符使用下划线开头，表示这些属性不应该被外部使用。结合<code v-pre>get</code>和<code v-pre>set</code>方法，就可以做到防止这些内部属性被外部读写。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const handler = {
  get (target, key) {
    invariant(key, 'get');
    return target[key];
  },
  set (target, key, value) {
    invariant(key, 'set');
    target[key] = value;
    return true;
  }
};
function invariant (key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private &quot;${key}&quot; property`);
  }
}
const target = {};
const proxy = new Proxy(target, handler);
proxy._prop
// Error: Invalid attempt to get private &quot;_prop&quot; property
proxy._prop = 'c'
// Error: Invalid attempt to set private &quot;_prop&quot; property
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，只要读写的属性名的第一个字符是下划线，一律抛错，从而达到禁止读写内部属性的目的。</p>
<p>下面是<code v-pre>set</code>方法第四个参数的例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const handler = {
  set: function(obj, prop, value, receiver) {
    obj[prop] = receiver;
  }
};
const proxy = new Proxy({}, handler);
proxy.foo = 'bar';
proxy.foo === proxy // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>set</code>方法的第四个参数<code v-pre>receiver</code>，指的是原始的操作行为所在的那个对象，一般情况下是<code v-pre>proxy</code>实例本身，请看下面的例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const handler = {
  set: function(obj, prop, value, receiver) {
    obj[prop] = receiver;
  }
};
const proxy = new Proxy({}, handler);
const myObj = {};
Object.setPrototypeOf(myObj, proxy);

myObj.foo = 'bar';
myObj.foo === myObj // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，设置<code v-pre>myObj.foo</code>属性的值时，<code v-pre>myObj</code>并没有<code v-pre>foo</code>属性，因此引擎会到<code v-pre>myObj</code>的原型链去找<code v-pre>foo</code>属性。<code v-pre>myObj</code>的原型对象<code v-pre>proxy</code>是一个 Proxy 实例，设置它的<code v-pre>foo</code>属性会触发<code v-pre>set</code>方法。这时，第四个参数<code v-pre>receiver</code>就指向原始赋值行为所在的对象<code v-pre>myObj</code>。</p>
<p>注意，如果目标对象自身的某个属性，不可写且不可配置，那么<code v-pre>set</code>方法将不起作用。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const obj = {};
Object.defineProperty(obj, 'foo', {
  value: 'bar',
  writable: false,
});

const handler = {
  set: function(obj, prop, value, receiver) {
    obj[prop] = 'baz';
  }
};

const proxy = new Proxy(obj, handler);
proxy.foo = 'baz';
proxy.foo // &quot;bar&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>obj.foo</code>属性不可写，Proxy 对这个属性的<code v-pre>set</code>代理将不会生效。</p>
<p>注意，严格模式下，<code v-pre>set</code>代理如果没有返回<code v-pre>true</code>，就会报错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'use strict';
const handler = {
  set: function(obj, prop, value, receiver) {
    obj[prop] = receiver;
    // 无论有没有下面这一行，都会报错
    return false;
  }
};
const proxy = new Proxy({}, handler);
proxy.foo = 'bar';
// TypeError: 'set' on proxy: trap returned falsish for property 'foo'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，严格模式下，<code v-pre>set</code>代理返回<code v-pre>false</code>或者<code v-pre>undefined</code>，都会报错。</p>
<h3 id="apply" tabindex="-1"><a class="header-anchor" href="#apply" aria-hidden="true">#</a> apply()</h3>
<p><code v-pre>apply</code>方法拦截函数的调用、<code v-pre>call</code>和<code v-pre>apply</code>操作。</p>
<p><code v-pre>apply</code>方法可以接受三个参数，分别是目标对象、目标对象的上下文对象（<code v-pre>this</code>）和目标对象的参数数组。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var handler = {
  apply (target, ctx, args) {
    return Reflect.apply(...arguments);
  }
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面是一个例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var target = function () { return 'I am the target'; };
var handler = {
  apply: function () {
    return 'I am the proxy';
  }
};

var p = new Proxy(target, handler);

p()
// &quot;I am the proxy&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，变量<code v-pre>p</code>是 Proxy 的实例，当它作为函数调用时（<code v-pre>p()</code>），就会被<code v-pre>apply</code>方法拦截，返回一个字符串。</p>
<p>下面是另外一个例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var twice = {
  apply (target, ctx, args) {
    return Reflect.apply(...arguments) * 2;
  }
};
function sum (left, right) {
  return left + right;
};
var proxy = new Proxy(sum, twice);
proxy(1, 2) // 6
proxy.call(null, 5, 6) // 22
proxy.apply(null, [7, 8]) // 30
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，每当执行<code v-pre>proxy</code>函数（直接调用或<code v-pre>call</code>和<code v-pre>apply</code>调用），就会被<code v-pre>apply</code>方法拦截。</p>
<p>另外，直接调用<code v-pre>Reflect.apply</code>方法，也会被拦截。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Reflect.apply(proxy, null, [9, 10]) // 38
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="has" tabindex="-1"><a class="header-anchor" href="#has" aria-hidden="true">#</a> has()</h3>
<p><code v-pre>has</code>方法用来拦截<code v-pre>HasProperty</code>操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是<code v-pre>in</code>运算符。</p>
<p><code v-pre>has</code>方法可以接受两个参数，分别是目标对象、需查询的属性名。</p>
<p>下面的例子使用<code v-pre>has</code>方法隐藏某些属性，不被<code v-pre>in</code>运算符发现。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var handler = {
  has (target, key) {
    if (key[0] === '_') {
      return false;
    }
    return key in target;
  }
};
var target = { _prop: 'foo', prop: 'foo' };
var proxy = new Proxy(target, handler);
'_prop' in proxy // false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，如果原对象的属性名的第一个字符是下划线，<code v-pre>proxy.has</code>就会返回<code v-pre>false</code>，从而不会被<code v-pre>in</code>运算符发现。</p>
<p>如果原对象不可配置或者禁止扩展，这时<code v-pre>has</code>拦截会报错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = { a: 10 };
Object.preventExtensions(obj);

var p = new Proxy(obj, {
  has: function(target, prop) {
    return false;
  }
});

'a' in p // TypeError is thrown
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>obj</code>对象禁止扩展，结果使用<code v-pre>has</code>拦截就会报错。也就是说，如果某个属性不可配置（或者目标对象不可扩展），则<code v-pre>has</code>方法就不得“隐藏”（即返回<code v-pre>false</code>）目标对象的该属性。</p>
<p>值得注意的是，<code v-pre>has</code>方法拦截的是<code v-pre>HasProperty</code>操作，而不是<code v-pre>HasOwnProperty</code>操作，即<code v-pre>has</code>方法不判断一个属性是对象自身的属性，还是继承的属性。</p>
<p>另外，虽然<code v-pre>for...in</code>循环也用到了<code v-pre>in</code>运算符，但是<code v-pre>has</code>拦截对<code v-pre>for...in</code>循环不生效。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let stu1 = {name: '张三', score: 59};
let stu2 = {name: '李四', score: 99};

let handler = {
  has(target, prop) {
    if (prop === 'score' &amp;&amp; target[prop] &lt; 60) {
      console.log(`${target.name} 不及格`);
      return false;
    }
    return prop in target;
  }
}

let oproxy1 = new Proxy(stu1, handler);
let oproxy2 = new Proxy(stu2, handler);

'score' in oproxy1
// 张三 不及格
// false

'score' in oproxy2
// true

for (let a in oproxy1) {
  console.log(oproxy1[a]);
}
// 张三
// 59

for (let b in oproxy2) {
  console.log(oproxy2[b]);
}
// 李四
// 99
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>has</code>拦截只对<code v-pre>in</code>运算符生效，对<code v-pre>for...in</code>循环不生效，导致不符合要求的属性没有被<code v-pre>for...in</code>循环所排除。</p>
<h3 id="construct" tabindex="-1"><a class="header-anchor" href="#construct" aria-hidden="true">#</a> construct()</h3>
<p><code v-pre>construct</code>方法用于拦截<code v-pre>new</code>命令，下面是拦截对象的写法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var handler = {
  construct (target, args, newTarget) {
    return new target(...args);
  }
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>construct</code>方法可以接受两个参数。</p>
<ul>
<li><code v-pre>target</code>：目标对象</li>
<li><code v-pre>args</code>：构造函数的参数对象</li>
<li><code v-pre>newTarget</code>：创造实例对象时，<code v-pre>new</code>命令作用的构造函数（下面例子的<code v-pre>p</code>）</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var p = new Proxy(function () {}, {
  construct: function(target, args) {
    console.log('called: ' + args.join(', '));
    return { value: args[0] * 10 };
  }
});

(new p(1)).value
// &quot;called: 1&quot;
// 10
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>construct</code>方法返回的必须是一个对象，否则会报错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var p = new Proxy(function() {}, {
  construct: function(target, argumentsList) {
    return 1;
  }
});

new p() // 报错
// Uncaught TypeError: 'construct' on proxy: trap returned non-object ('1')
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="deleteproperty" tabindex="-1"><a class="header-anchor" href="#deleteproperty" aria-hidden="true">#</a> deleteProperty()</h3>
<p><code v-pre>deleteProperty</code>方法用于拦截<code v-pre>delete</code>操作，如果这个方法抛出错误或者返回<code v-pre>false</code>，当前属性就无法被<code v-pre>delete</code>命令删除。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var handler = {
  deleteProperty (target, key) {
    invariant(key, 'delete');
    delete target[key];
    return true;
  }
};
function invariant (key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private &quot;${key}&quot; property`);
  }
}

var target = { _prop: 'foo' };
var proxy = new Proxy(target, handler);
delete proxy._prop
// Error: Invalid attempt to delete private &quot;_prop&quot; property
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>deleteProperty</code>方法拦截了<code v-pre>delete</code>操作符，删除第一个字符为下划线的属性会报错。</p>
<p>注意，目标对象自身的不可配置（configurable）的属性，不能被<code v-pre>deleteProperty</code>方法删除，否则报错。</p>
<h3 id="defineproperty" tabindex="-1"><a class="header-anchor" href="#defineproperty" aria-hidden="true">#</a> defineProperty()</h3>
<p><code v-pre>defineProperty</code>方法拦截了<code v-pre>Object.defineProperty</code>操作。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var handler = {
  defineProperty (target, key, descriptor) {
    return false;
  }
};
var target = {};
var proxy = new Proxy(target, handler);
proxy.foo = 'bar' // 不会生效
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>defineProperty</code>方法返回<code v-pre>false</code>，导致添加新属性总是无效。</p>
<p>注意，如果目标对象不可扩展（non-extensible），则<code v-pre>defineProperty</code>不能增加目标对象上不存在的属性，否则会报错。另外，如果目标对象的某个属性不可写（writable）或不可配置（configurable），则<code v-pre>defineProperty</code>方法不得改变这两个设置。</p>
<h3 id="getownpropertydescriptor" tabindex="-1"><a class="header-anchor" href="#getownpropertydescriptor" aria-hidden="true">#</a> getOwnPropertyDescriptor()</h3>
<p><code v-pre>getOwnPropertyDescriptor</code>方法拦截<code v-pre>Object.getOwnPropertyDescriptor()</code>，返回一个属性描述对象或者<code v-pre>undefined</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var handler = {
  getOwnPropertyDescriptor (target, key) {
    if (key[0] === '_') {
      return;
    }
    return Object.getOwnPropertyDescriptor(target, key);
  }
};
var target = { _foo: 'bar', baz: 'tar' };
var proxy = new Proxy(target, handler);
Object.getOwnPropertyDescriptor(proxy, 'wat')
// undefined
Object.getOwnPropertyDescriptor(proxy, '_foo')
// undefined
Object.getOwnPropertyDescriptor(proxy, 'baz')
// { value: 'tar', writable: true, enumerable: true, configurable: true }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>handler.getOwnPropertyDescriptor</code>方法对于第一个字符为下划线的属性名会返回<code v-pre>undefined</code>。</p>
<h3 id="getprototypeof" tabindex="-1"><a class="header-anchor" href="#getprototypeof" aria-hidden="true">#</a> getPrototypeOf()</h3>
<p><code v-pre>getPrototypeOf</code>方法主要用来拦截获取对象原型。具体来说，拦截下面这些操作。</p>
<ul>
<li><code v-pre>Object.prototype.__proto__</code></li>
<li><code v-pre>Object.prototype.isPrototypeOf()</code></li>
<li><code v-pre>Object.getPrototypeOf()</code></li>
<li><code v-pre>Reflect.getPrototypeOf()</code></li>
<li><code v-pre>instanceof</code></li>
</ul>
<p>下面是一个例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var proto = {};
var p = new Proxy({}, {
  getPrototypeOf(target) {
    return proto;
  }
});
Object.getPrototypeOf(p) === proto // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>getPrototypeOf</code>方法拦截<code v-pre>Object.getPrototypeOf()</code>，返回<code v-pre>proto</code>对象。</p>
<p>注意，<code v-pre>getPrototypeOf</code>方法的返回值必须是对象或者<code v-pre>null</code>，否则报错。另外，如果目标对象不可扩展（non-extensible）， <code v-pre>getPrototypeOf</code>方法必须返回目标对象的原型对象。</p>
<h3 id="isextensible" tabindex="-1"><a class="header-anchor" href="#isextensible" aria-hidden="true">#</a> isExtensible()</h3>
<p><code v-pre>isExtensible</code>方法拦截<code v-pre>Object.isExtensible</code>操作。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var p = new Proxy({}, {
  isExtensible: function(target) {
    console.log(&quot;called&quot;);
    return true;
  }
});

Object.isExtensible(p)
// &quot;called&quot;
// true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码设置了<code v-pre>isExtensible</code>方法，在调用<code v-pre>Object.isExtensible</code>时会输出<code v-pre>called</code>。</p>
<p>注意，该方法只能返回布尔值，否则返回值会被自动转为布尔值。</p>
<p>这个方法有一个强限制，它的返回值必须与目标对象的<code v-pre>isExtensible</code>属性保持一致，否则就会抛出错误。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Object.isExtensible(proxy) === Object.isExtensible(target)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>下面是一个例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var p = new Proxy({}, {
  isExtensible: function(target) {
    return false;
  }
});

Object.isExtensible(p)
// Uncaught TypeError: 'isExtensible' on proxy: trap result does not reflect extensibility of proxy target (which is 'true')
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="ownkeys" tabindex="-1"><a class="header-anchor" href="#ownkeys" aria-hidden="true">#</a> ownKeys()</h3>
<p><code v-pre>ownKeys</code>方法用来拦截对象自身属性的读取操作。具体来说，拦截以下操作。</p>
<ul>
<li><code v-pre>Object.getOwnPropertyNames()</code></li>
<li><code v-pre>Object.getOwnPropertySymbols()</code></li>
<li><code v-pre>Object.keys()</code></li>
<li><code v-pre>for...in</code>循环</li>
</ul>
<p>下面是拦截<code v-pre>Object.keys()</code>的例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let target = {
  a: 1,
  b: 2,
  c: 3
};

let handler = {
  ownKeys(target) {
    return ['a'];
  }
};

let proxy = new Proxy(target, handler);

Object.keys(proxy)
// [ 'a' ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码拦截了对于<code v-pre>target</code>对象的<code v-pre>Object.keys()</code>操作，只返回<code v-pre>a</code>、<code v-pre>b</code>、<code v-pre>c</code>三个属性之中的<code v-pre>a</code>属性。</p>
<p>下面的例子是拦截第一个字符为下划线的属性名。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let target = {
  _bar: 'foo',
  _prop: 'bar',
  prop: 'baz'
};

let handler = {
  ownKeys (target) {
    return Reflect.ownKeys(target).filter(key =&gt; key[0] !== '_');
  }
};

let proxy = new Proxy(target, handler);
for (let key of Object.keys(proxy)) {
  console.log(target[key]);
}
// &quot;baz&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，使用<code v-pre>Object.keys</code>方法时，有三类属性会被<code v-pre>ownKeys</code>方法自动过滤，不会返回。</p>
<ul>
<li>目标对象上不存在的属性</li>
<li>属性名为 Symbol 值</li>
<li>不可遍历（<code v-pre>enumerable</code>）的属性</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let target = {
  a: 1,
  b: 2,
  c: 3,
  [Symbol.for('secret')]: '4',
};

Object.defineProperty(target, 'key', {
  enumerable: false,
  configurable: true,
  writable: true,
  value: 'static'
});

let handler = {
  ownKeys(target) {
    return ['a', 'd', Symbol.for('secret'), 'key'];
  }
};

let proxy = new Proxy(target, handler);

Object.keys(proxy)
// ['a']
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>ownKeys</code>方法之中，显式返回不存在的属性（<code v-pre>d</code>）、Symbol 值（<code v-pre>Symbol.for('secret')</code>）、不可遍历的属性（<code v-pre>key</code>），结果都被自动过滤掉。</p>
<p><code v-pre>ownKeys</code>方法还可以拦截<code v-pre>Object.getOwnPropertyNames()</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var p = new Proxy({}, {
  ownKeys: function(target) {
    return ['a', 'b', 'c'];
  }
});

Object.getOwnPropertyNames(p)
// [ 'a', 'b', 'c' ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>for...in</code>循环也受到<code v-pre>ownKeys</code>方法的拦截。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const obj = { hello: 'world' };
const proxy = new Proxy(obj, {
  ownKeys: function () {
    return ['a', 'b'];
  }
});

for (let key in proxy) {
  console.log(key); // 没有任何输出
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>ownkeys</code>指定只返回<code v-pre>a</code>和<code v-pre>b</code>属性，由于<code v-pre>obj</code>没有这两个属性，因此<code v-pre>for...in</code>循环不会有任何输出。</p>
<p><code v-pre>ownKeys</code>方法返回的数组成员，只能是字符串或 Symbol 值。如果有其他类型的值，或者返回的根本不是数组，就会报错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = {};

var p = new Proxy(obj, {
  ownKeys: function(target) {
    return [123, true, undefined, null, {}, []];
  }
});

Object.getOwnPropertyNames(p)
// Uncaught TypeError: 123 is not a valid property name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>ownKeys</code>方法虽然返回一个数组，但是每一个数组成员都不是字符串或 Symbol 值，因此就报错了。</p>
<p>如果目标对象自身包含不可配置的属性，则该属性必须被<code v-pre>ownKeys</code>方法返回，否则报错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = {};
Object.defineProperty(obj, 'a', {
  configurable: false,
  enumerable: true,
  value: 10 }
);

var p = new Proxy(obj, {
  ownKeys: function(target) {
    return ['b'];
  }
});

Object.getOwnPropertyNames(p)
// Uncaught TypeError: 'ownKeys' on proxy: trap result did not include 'a'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>obj</code>对象的<code v-pre>a</code>属性是不可配置的，这时<code v-pre>ownKeys</code>方法返回的数组之中，必须包含<code v-pre>a</code>，否则会报错。</p>
<p>另外，如果目标对象是不可扩展的（non-extensible），这时<code v-pre>ownKeys</code>方法返回的数组之中，必须包含原对象的所有属性，且不能包含多余的属性，否则报错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = {
  a: 1
};

Object.preventExtensions(obj);

var p = new Proxy(obj, {
  ownKeys: function(target) {
    return ['a', 'b'];
  }
});

Object.getOwnPropertyNames(p)
// Uncaught TypeError: 'ownKeys' on proxy: trap returned extra keys but proxy target is non-extensible
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>obj</code>对象是不可扩展的，这时<code v-pre>ownKeys</code>方法返回的数组之中，包含了<code v-pre>obj</code>对象的多余属性<code v-pre>b</code>，所以导致了报错。</p>
<h3 id="preventextensions" tabindex="-1"><a class="header-anchor" href="#preventextensions" aria-hidden="true">#</a> preventExtensions()</h3>
<p><code v-pre>preventExtensions</code>方法拦截<code v-pre>Object.preventExtensions()</code>。该方法必须返回一个布尔值，否则会被自动转为布尔值。</p>
<p>这个方法有一个限制，只有目标对象不可扩展时（即<code v-pre>Object.isExtensible(proxy)</code>为<code v-pre>false</code>），<code v-pre>proxy.preventExtensions</code>才能返回<code v-pre>true</code>，否则会报错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var proxy = new Proxy({}, {
  preventExtensions: function(target) {
    return true;
  }
});

Object.preventExtensions(proxy)
// Uncaught TypeError: 'preventExtensions' on proxy: trap returned truish but the proxy target is extensible
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>proxy.preventExtensions</code>方法返回<code v-pre>true</code>，但这时<code v-pre>Object.isExtensible(proxy)</code>会返回<code v-pre>true</code>，因此报错。</p>
<p>为了防止出现这个问题，通常要在<code v-pre>proxy.preventExtensions</code>方法里面，调用一次<code v-pre>Object.preventExtensions</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var proxy = new Proxy({}, {
  preventExtensions: function(target) {
    console.log('called');
    Object.preventExtensions(target);
    return true;
  }
});

Object.preventExtensions(proxy)
// &quot;called&quot;
// Proxy {}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="setprototypeof" tabindex="-1"><a class="header-anchor" href="#setprototypeof" aria-hidden="true">#</a> setPrototypeOf()</h3>
<p><code v-pre>setPrototypeOf</code>方法主要用来拦截<code v-pre>Object.setPrototypeOf</code>方法。</p>
<p>下面是一个例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var handler = {
  setPrototypeOf (target, proto) {
    throw new Error('Changing the prototype is forbidden');
  }
};
var proto = {};
var target = function () {};
var proxy = new Proxy(target, handler);
Object.setPrototypeOf(proxy, proto);
// Error: Changing the prototype is forbidden
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，只要修改<code v-pre>target</code>的原型对象，就会报错。</p>
<p>注意，该方法只能返回布尔值，否则会被自动转为布尔值。另外，如果目标对象不可扩展（non-extensible），<code v-pre>setPrototypeOf</code>方法不得改变目标对象的原型。</p>
<h2 id="proxy-revocable" tabindex="-1"><a class="header-anchor" href="#proxy-revocable" aria-hidden="true">#</a> Proxy.revocable()</h2>
<p><code v-pre>Proxy.revocable</code>方法返回一个可取消的 Proxy 实例。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let target = {};
let handler = {};

let {proxy, revoke} = Proxy.revocable(target, handler);

proxy.foo = 123;
proxy.foo // 123

revoke();
proxy.foo // TypeError: Revoked
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>Proxy.revocable</code>方法返回一个对象，该对象的<code v-pre>proxy</code>属性是<code v-pre>Proxy</code>实例，<code v-pre>revoke</code>属性是一个函数，可以取消<code v-pre>Proxy</code>实例。上面代码中，当执行<code v-pre>revoke</code>函数之后，再访问<code v-pre>Proxy</code>实例，就会抛出一个错误。</p>
<p><code v-pre>Proxy.revocable</code>的一个使用场景是，目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问。</p>
<h2 id="this-问题" tabindex="-1"><a class="header-anchor" href="#this-问题" aria-hidden="true">#</a> this 问题</h2>
<p>虽然 Proxy 可以代理针对目标对象的访问，但它不是目标对象的透明代理，即不做任何拦截的情况下，也无法保证与目标对象的行为一致。主要原因就是在 Proxy 代理的情况下，目标对象内部的<code v-pre>this</code>关键字会指向 Proxy 代理。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const target = {
  m: function () {
    console.log(this === proxy);
  }
};
const handler = {};

const proxy = new Proxy(target, handler);

target.m() // false
proxy.m()  // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，一旦<code v-pre>proxy</code>代理<code v-pre>target.m</code>，后者内部的<code v-pre>this</code>就是指向<code v-pre>proxy</code>，而不是<code v-pre>target</code>。</p>
<p>下面是一个例子，由于<code v-pre>this</code>指向的变化，导致 Proxy 无法代理目标对象。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const _name = new WeakMap();

class Person {
  constructor(name) {
    _name.set(this, name);
  }
  get name() {
    return _name.get(this);
  }
}

const jane = new Person('Jane');
jane.name // 'Jane'

const proxy = new Proxy(jane, {});
proxy.name // undefined
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，目标对象<code v-pre>jane</code>的<code v-pre>name</code>属性，实际保存在外部<code v-pre>WeakMap</code>对象<code v-pre>_name</code>上面，通过<code v-pre>this</code>键区分。由于通过<code v-pre>proxy.name</code>访问时，<code v-pre>this</code>指向<code v-pre>proxy</code>，导致无法取到值，所以返回<code v-pre>undefined</code>。</p>
<p>此外，有些原生对象的内部属性，只有通过正确的<code v-pre>this</code>才能拿到，所以 Proxy 也无法代理这些原生对象的属性。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const target = new Date();
const handler = {};
const proxy = new Proxy(target, handler);

proxy.getDate();
// TypeError: this is not a Date object.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>getDate</code>方法只能在<code v-pre>Date</code>对象实例上面拿到，如果<code v-pre>this</code>不是<code v-pre>Date</code>对象实例就会报错。这时，<code v-pre>this</code>绑定原始对象，就可以解决这个问题。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const target = new Date('2015-01-01');
const handler = {
  get(target, prop) {
    if (prop === 'getDate') {
      return target.getDate.bind(target);
    }
    return Reflect.get(target, prop);
  }
};
const proxy = new Proxy(target, handler);

proxy.getDate() // 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="实例-web-服务的客户端" tabindex="-1"><a class="header-anchor" href="#实例-web-服务的客户端" aria-hidden="true">#</a> 实例：Web 服务的客户端</h2>
<p>Proxy 对象可以拦截目标对象的任意属性，这使得它很合适用来写 Web 服务的客户端。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const service = createWebService('http://example.com/data');

service.employees().then(json =&gt; {
  const employees = JSON.parse(json);
  // ···
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码新建了一个 Web 服务的接口，这个接口返回各种数据。Proxy 可以拦截这个对象的任意属性，所以不用为每一种数据写一个适配方法，只要写一个 Proxy 拦截就可以了。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function createWebService(baseUrl) {
  return new Proxy({}, {
    get(target, propKey, receiver) {
      return () =&gt; httpGet(baseUrl + '/' + propKey);
    }
  });
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同理，Proxy 也可以用来实现数据库的 ORM 层。</p>
</div></template>
