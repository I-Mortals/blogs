<template><div><h1 id="mixin" tabindex="-1"><a class="header-anchor" href="#mixin" aria-hidden="true">#</a> Mixin</h1>
<p>JavaScript 语言的设计是单一继承，即子类只能继承一个父类，不允许继承多个父类。这种设计保证了对象继承的层次结构是树状的，而不是复杂的<a href="https://en.wikipedia.org/wiki/Multiple_inheritance#The_diamond_problem" target="_blank" rel="noopener noreferrer">网状结构</a>。</p>
<!-- more -->
<p>但是，这大大降低了编程的灵活性。因为实际开发中，有时不可避免，子类需要继承多个父类。举例来说，“猫”可以继承“哺乳类动物”，也可以继承“宠物”。</p>
<p>各种单一继承的编程语言，有不同的多重继承解决方案。比如，Java 语言也是子类只能继承一个父类，但是还允许继承多个界面（interface），这样就间接实现了多重继承。Interface 与父类一样，也是一个类，只不过它只定义接口（method signature），不定义实现，因此又被称为“抽象类”。凡是继承于 Interface 的方法，都必须自己定义实现，否则就会报错。这样就避免了多重继承的最大问题：多个父类的同名方法的碰撞（naming collision）。</p>
<p>JavaScript 语言没有采用 Interface 的方案，而是通过代理（delegation）实现了从其他类引入方法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var Enumerable_first = function () {
  this.first = function () {
    return this[0];
  };
};

var list = [&quot;foo&quot;, &quot;bar&quot;, &quot;baz&quot;];
Enumerable_first.call(list); // explicit delegation
list.first() // &quot;foo&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>list</code>是一个数组，本身并没有<code v-pre>first</code>方法。通过<code v-pre>call</code>方法，可以把<code v-pre>Enumerable_first</code>里面的方法，绑定到<code v-pre>list</code>，从而<code v-pre>list</code>就具有<code v-pre>first</code>方法。这就叫做“代理”（delegation），<code v-pre>list</code>对象代理了<code v-pre>Enumerable_first</code>的<code v-pre>first</code>方法。</p>
<h2 id="含义" tabindex="-1"><a class="header-anchor" href="#含义" aria-hidden="true">#</a> 含义</h2>
<p>Mixin 这个名字来自于冰淇淋，在基本口味的冰淇淋上面混入其他口味，这就叫做 Mix-in。</p>
<p>它允许向一个类里面注入一些代码，使得一个类的功能能够“混入”另一个类。实质上是多重继承的一种解决方案，但是避免了多重继承的复杂性，而且有利于代码复用。</p>
<p>Mixin 就是一个正常的类，不仅定义了接口，还定义了接口的实现。</p>
<p>子类通过在<code v-pre>this</code>对象上面绑定方法，达到多重继承的目的。</p>
<p>很多库提供了 Mixin 功能。下面以 Lodash 为例。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function vowels(string) {
  return /[aeiou]/i.test(this.value);
}

var obj = { value: 'hello' };
_.mixin(obj, {vowels: vowels})
obj.vowels() // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码通过 Lodash 库的<code v-pre>_.mixin</code>方法，让<code v-pre>obj</code>对象继承了<code v-pre>vowels</code>方法。</p>
<p>Underscore 的类似方法是<code v-pre>_.extend</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var Person = function (fName, lName) {
  this.firstName = fName;
  this.lastName = lName;
}

var sam = new Person('Sam', 'Lowry');

var NameMixin = {
  fullName: function () {
    return this.firstName + ' ' + this.lastName;
  },
  rename: function(first, last) {
    this.firstName = first;
    this.lastName = last;
    return this;
  }
};
_.extend(Person.prototype, NameMixin);
sam.rename('Samwise', 'Gamgee');
sam.fullName() // &quot;Samwise Gamgee&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码通过<code v-pre>_.extend</code>方法，在<code v-pre>sam</code>对象上面（准确说是它的原型对象<code v-pre>Person.prototype</code>上面），混入了<code v-pre>NameMixin</code>类。</p>
<p><code v-pre>extend</code>方法的实现非常简单。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function extend(destination, source) {
  for (var k in source) {
    if (source.hasOwnProperty(k)) {
      destination[k] = source[k];
    }
  }
  return destination;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码将<code v-pre>source</code>对象的所有方法，添加到<code v-pre>destination</code>对象。</p>
<h2 id="trait" tabindex="-1"><a class="header-anchor" href="#trait" aria-hidden="true">#</a> Trait</h2>
<p>Trait 是另外一种多重继承的解决方案。它与 Mixin 很相似，但是有一些细微的差别。</p>
<ul>
<li>Mixin 可以包含状态（state），Trait 不包含，即 Trait 里面的方法都是互不相干，可以线性包含的。比如，<code v-pre>Trait1</code>包含方法<code v-pre>A</code>和<code v-pre>B</code>，<code v-pre>Trait2</code>继承了<code v-pre>Trait1</code>，同时还包含一个自己的方法<code v-pre>C</code>，实际上就等同于直接包含方法<code v-pre>A</code>、<code v-pre>B</code>、<code v-pre>C</code>。</li>
<li>对于同名方法的碰撞，Mixin 包含了解决规则，Trait 则是报错。</li>
</ul>
</div></template>
