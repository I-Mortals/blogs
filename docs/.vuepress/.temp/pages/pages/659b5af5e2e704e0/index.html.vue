<template><div><h1 id="面向对象编程" tabindex="-1"><a class="header-anchor" href="#面向对象编程" aria-hidden="true">#</a> 面向对象编程</h1>
<h2 id="一、实例对象与new命令" tabindex="-1"><a class="header-anchor" href="#一、实例对象与new命令" aria-hidden="true">#</a> 一、实例对象与new命令</h2>
<h3 id="_1、对象是什么" tabindex="-1"><a class="header-anchor" href="#_1、对象是什么" aria-hidden="true">#</a> 1、对象是什么</h3>
<p>面向对象编程（Object Oriented Programming，缩写为 OOP）是目前主流的编程范式。它将真实世界各种复杂的关系，抽象为一个个对象，然后由对象之间的分工与合作，完成对真实世界的模拟。</p>
<p>每一个对象都是<strong>功能中心</strong>，具有明确分工，可以完成<strong>接受信息、处理数据、发出信息</strong>等任务。对象<strong>可以复用</strong>，通过继承机制还<strong>可以定制</strong>。因此，面向对象编程具有<strong>灵活、代码可复用、高度模块化</strong>等特点，容易维护和开发，比起由一系列函数或指令组成的传统的<strong>过程式编程</strong>（procedural programming），更适合多人合作的<strong>大型软件项目</strong>。</p>
<p>那么，“对象”（object）到底是什么？我们从两个层次来理解。</p>
<p><strong>（1）对象是单个实物的抽象。</strong></p>
<p>一本书、一辆汽车、一个人都可以是对象，一个数据库、一张网页、一个与远程服务器的连接也可以是对象。当<strong>实物被抽象成对象，实物之间的关系就变成了对象之间的关系，从而就可以模拟现实情况，针对对象进行编程。</strong></p>
<p><strong>（2）对象是一个容器，封装了属性（property）和方法（method）。</strong></p>
<p><strong>属性</strong>是对象的状态，<strong>方法</strong>是对象的行为（完成某种任务）。比如，我们可以把动物抽象为<code v-pre>animal</code>对象，使用“属性”记录具体是那一种动物，使用“方法”表示动物的某种行为（奔跑、捕猎、休息等等）。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var person = { // 对象
    name: '张三', // 属性
    interest: function(){ // 方法(行为)
        return this.name + '正在喝酒'
    }
}
person.interest() // 张三正在喝酒

// 真实世界： 有一个人，名字叫张三，他正在喝酒。
// 对象模拟： 一个人抽象为一个对象person，对象是一个容器，内部封装了属性name叫张三，他正在喝酒封装成方法interest

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、构造函数" tabindex="-1"><a class="header-anchor" href="#_2、构造函数" aria-hidden="true">#</a> 2、构造函数</h3>
<p>面向对象编程的第一步，就是要生成对象。前面说过，对象是单个实物的抽象。通常需要一个模板，表示某一类实物的共同特征，然后对象根据这个模板生成。</p>
<p>典型的面向对象编程语言（比如 C++ 和 Java），都有“类”（class）这个概念。所谓“类”就是对象的模板，对象就是“类”的实例。但是，JavaScript 语言的对象体系，不是基于“类”的，而是<strong>基于构造函数（constructor）和原型链（prototype）</strong>。</p>
<p>JavaScript 语言<strong>使用构造函数（constructor）作为对象的模板</strong>。</p>
<p><strong>所谓”构造函数”，就是专门用来生成实例对象的函数</strong>。</p>
<p>它就是对象的模板，描述实例对象的基本结构。</p>
<p>一个构造函数，可以生成多个实例对象，这些实例对象都有相同的结构。</p>
<p>构造函数就是一个普通的函数，但是有自己的特征和用法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var Vehicle = function () {
  this.price = 1000;
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>Vehicle</code>就是构造函数。为了与普通函数区别，构造函数名字的第一个字母通常大写。</p>
<p>构造函数的特点有两个。</p>
<ul>
<li>函数体内部使用了<code v-pre>this</code>关键字，代表了所要生成的对象实例。</li>
<li>生成对象的时候，必须使用<code v-pre>new</code>命令。</li>
</ul>
<p>下面先介绍<code v-pre>new</code>命令。</p>
<h3 id="_3、new命令" tabindex="-1"><a class="header-anchor" href="#_3、new命令" aria-hidden="true">#</a> 3、new命令</h3>
<h4 id="基本用法" tabindex="-1"><a class="header-anchor" href="#基本用法" aria-hidden="true">#</a> 基本用法</h4>
<p><code v-pre>new</code>命令的作用：<strong>执行构造函数，返回一个实例对象</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var Vehicle = function () {
  this.price = 1000; // this指向实例对象v
};

var v = new Vehicle();  // new 执行一个构造函数，返回一个实例对象给v
v.price // 1000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码通过<code v-pre>new</code>命令，让构造函数<code v-pre>Vehicle</code>生成一个实例对象，保存在变量<code v-pre>v</code>中。这个新生成的实例对象，从构造函数<code v-pre>Vehicle</code>得到了<code v-pre>price</code>属性。<code v-pre>new</code>命令执行时，构造函数内部的<code v-pre>this</code>，就代表了新生成的实例对象，<code v-pre>this.price</code>表示实例对象有一个<code v-pre>price</code>属性，值是1000。</p>
<p>使用<code v-pre>new</code>命令时，根据需要，<strong>构造函数也可以接受参数</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var Vehicle = function (p) {
  this.price = p;
};

var v = new Vehicle(500); // new 命令时，构造函数可以接受参数
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>new</code>命令本身就可以执行构造函数，所以后面的构造函数可以带括号，也<strong>可以不带括号</strong>。下面两行代码是等价的，但是为了表示这里是函数调用，<strong>推荐使用括号</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 推荐的写法
var v = new Vehicle();
// 不推荐的写法
var v = new Vehicle;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一个很自然的问题是，如果忘了使用<code v-pre>new</code>命令，直接调用构造函数会发生什么事？</p>
<p>这种情况下，构造函数就变成了普通函数，并不会生成实例对象。而且由于后面会说到的原因，<code v-pre>this</code>这时代表全局对象，将造成一些意想不到的结果。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var Vehicle = function (){
  this.price = 1000;
};

var v = Vehicle(); // 忘记使用new命令，构造函数变成普通函数，不会生成实例，函数内部this指向window
v // undefined   函数为普通函数且没有返回值，所有v为undefined
price // 1000  函数内部this指向window， price变成全局属性，等价于window.price
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，调用<code v-pre>Vehicle</code>构造函数时，忘了加上<code v-pre>new</code>命令。结果，变量<code v-pre>v</code>变成了<code v-pre>undefined</code>，而<code v-pre>price</code>属性变成了全局变量。因此，应该非常小心，避免不使用<code v-pre>new</code>命令、直接调用构造函数。</p>
<p>为了保证构造函数必须与<code v-pre>new</code>命令一起使用，一个解决办法是，<strong>构造函数内部使用严格模式</strong>，即第一行加上<code v-pre>use strict</code>。这样的话，一旦忘了使用<code v-pre>new</code>命令，直接调用构造函数就会报错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function Fubar(foo, bar){
  'use strict';
  this._foo = foo; // 严格模式中this不能指向window对象，不加new调用this等于undefined，给undefined添加属性会报错
  this._bar = bar;
}

Fubar()
// TypeError: Cannot set property '_foo' of undefined
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码的<code v-pre>Fubar</code>为构造函数，<code v-pre>use strict</code>命令保证了该函数在严格模式下运行。由于<strong>严格模式中，函数内部的<code v-pre>this</code>不能指向全局对象</strong>，默认等于<code v-pre>undefined</code>，导致不加<code v-pre>new</code>调用会报错（JavaScript 不允许对<code v-pre>undefined</code>添加属性）。</p>
<p><strong>另一个解决办法</strong>，构造函数内部判断是否使用<code v-pre>new</code>命令，如果发现没有使用，则直接返回一个实例对象。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function Fubar(foo, bar) {
  // instanceof运算符用于检测构造函数的prototype属性是否出现在某个实例对象的原型链（），返回布尔值。
  // 语法： &lt;实例对象&gt; instanceof &lt;构造函数&gt;
  if (!(this instanceof Fubar)) {  // 或 使用 (!new.target) 判断是否使用new命令
    return new Fubar(foo, bar);
  }

  this._foo = foo;
  this._bar = bar;
}

Fubar(1, 2)._foo // 1
(new Fubar(1, 2))._foo // 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中的构造函数，不管加不加<code v-pre>new</code>命令，都会得到同样的结果。</p>
<h4 id="new-命令的原理" tabindex="-1"><a class="header-anchor" href="#new-命令的原理" aria-hidden="true">#</a> new 命令的原理</h4>
<p>使用<code v-pre>new</code>命令时，它后面的函数依次执行下面的步骤。</p>
<ol>
<li>
<p>创建一个空对象，作为将要返回的实例对象。</p>
</li>
<li>
<p>将这个空对象的原型，指向构造函数的<code v-pre>prototype</code>属性。</p>
</li>
<li>
<p>将这个空对象赋值给函数内部的<code v-pre>this</code>关键字。</p>
</li>
<li>
<p>开始执行构造函数内部的代码。（代码中this指向空对象（实例对象））</p>
</li>
<li>
<p>返回实例对象（或自定义对象）</p>
</li>
</ol>
<p>也就是说，构造函数内部，<code v-pre>this</code>指的是一个新生成的空对象，<strong>所有针对<code v-pre>this</code>的操作，都会发生在这个空对象上</strong>。构造函数之所以叫“构造函数”，就是说这个函数的目的，就是操作一个空对象（即<code v-pre>this</code>对象），将其“构造”为需要的样子。</p>
<p>如果构造函数内部有<code v-pre>return</code>语句，而且<code v-pre>return</code>后面跟着一个对象，<code v-pre>new</code>命令会返回<code v-pre>return</code>语句指定的对象；否则，就会不管<code v-pre>return</code>语句，返回<code v-pre>this</code>对象。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var Vehicle = function () {
  this.price = 1000;
  return 1000; // 1000 非对象，被忽略，返回的是this对象；如果是return {}，则会返回{}

};

(new Vehicle()) === 1000
// false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，构造函数<code v-pre>Vehicle</code>的<code v-pre>return</code>语句返回一个数值。这时，<code v-pre>new</code>命令就会忽略这个<code v-pre>return</code>语句，返回“构造”后的<code v-pre>this</code>对象。</p>
<p>但是，如果<code v-pre>return</code>语句返回的是一个跟<code v-pre>this</code>无关的新对象，<code v-pre>new</code>命令会返回这个新对象，而不是<code v-pre>this</code>对象。这一点需要特别引起注意。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var Vehicle = function (){
  this.price = 1000;
  return { price: 2000 }; // return的是一个对象，会被返回出去。
};

(new Vehicle()).price
// 2000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，构造函数<code v-pre>Vehicle</code>的<code v-pre>return</code>语句，返回的是一个新对象。<code v-pre>new</code>命令会返回这个对象，而不是<code v-pre>this</code>对象。</p>
<p>另一方面，如果对普通函数（内部没有<code v-pre>this</code>关键字的函数）使用<code v-pre>new</code>命令，则会返回一个空对象。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function getMessage() { // 内部沒有this关键字，会返回一个空对象
  return 'this is a message';
}

var msg = new getMessage();

msg // {}
typeof msg // &quot;object&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>getMessage</code>是一个普通函数，返回一个字符串。对它使用<code v-pre>new</code>命令，会得到一个空对象。这是因为**<code v-pre>new</code>命令总是返回一个对象，要么是实例对象，要么是<code v-pre>return</code>语句指定的对象**。本例中，<code v-pre>return</code>语句返回的是字符串，所以<code v-pre>new</code>命令就忽略了该语句。</p>
<p><code v-pre>new</code>命令简化的内部流程，可以用下面的代码表示。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 构造函数
function Person(name,age){
    this.name = name
    this.age = age
}

// 自定义_new
function _new() {
  // 将 arguments 对象转为数组
  var args = [].slice.call(arguments);
  // 取出构造函数
  var constructor = args.shift();
  // 创建一个空对象，继承构造函数的 prototype 属性
  var context = Object.create(constructor.prototype);
  // 执行构造函数
  var result = constructor.apply(context, args);
  // 如果返回结果是对象，就直接返回，否则返回 context 对象
  return (typeof result === 'object' &amp;&amp; result != null) ? result : context;
}

// 自定义_new2
function _new2(/* 构造函数 */ constructor, /* 构造函数参数 */ params) {
  // 创建一个空对象，继承构造函数的 prototype 属性
  var context = Object.create(constructor.prototype);
  // 执行构造函数
  var result = constructor.apply(context, params);
  // 如果返回结果是对象，就直接返回，否则返回 context 对象
  return (typeof result === 'object' &amp;&amp; result != null) ? result : context;
  // （当用户在构造函数内部自定义返回对象的话则使用该对象，否则返回context）
}


// 通过自定义_new 返回实例
var actor = _new(Person, '张三', 28);
actor.name // 张三

// 通过自定义_new2 返回实例
var actor2 = _new2(Person, ['李四', 29]);
actor2.name // 李四

// 通过new命令 返回实例
var actor3 = new Person('王五',30)
actor3.name // 王五

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="new-target-属性" tabindex="-1"><a class="header-anchor" href="#new-target-属性" aria-hidden="true">#</a> new.target 属性</h4>
<p>构造函数内部可以使用<code v-pre>new.target</code>属性。如果当前函数是<code v-pre>new</code>命令调用，<code v-pre>new.target</code><strong>指向当前函数</strong>，否则为<code v-pre>undefined</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function f() {
  console.log(new.target === f);
}

f() // false
new f() // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用这个属性，可以<strong>判断函数调用的时候，是否使用<code v-pre>new</code>命令</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function f() {
  if (!new.target) {
    throw new Error('请使用 new 命令调用！');
  }
  // ...
}

f() // Uncaught Error: 请使用 new 命令调用！
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，构造函数<code v-pre>f</code>调用时，没有使用<code v-pre>new</code>命令，就抛出一个错误。</p>
<h3 id="_4、object-create-创建实例对象" tabindex="-1"><a class="header-anchor" href="#_4、object-create-创建实例对象" aria-hidden="true">#</a> 4、Object.create()创建实例对象</h3>
<p>构造函数作为模板，可以生成实例对象。但是，有时拿不到构造函数，只能拿到一个现有的对象。我们希望以这个现有的对象作为模板，生成新的实例对象，这时就可以使用<code v-pre>Object.create()</code>方法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 这个例子没有构造函数，只有一个对象

var person1 = { // 这个对象用来生成实例对象，它被当成一个模板
  name: '张三',
  age: 38,
  greeting: function() {
    console.log('Hi! I\'m ' + this.name + '.');
  }
};

var person2 = Object.create(person1);

person2.name // 张三
person2.greeting() // Hi! I'm 张三.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，对象<code v-pre>person1</code>是<code v-pre>person2</code>的模板，后者继承了前者的属性和方法。</p>
<p><code v-pre>Object.create()</code>的详细介绍，请看后面的相关章节。</p>
<h2 id="二、this关键字" tabindex="-1"><a class="header-anchor" href="#二、this关键字" aria-hidden="true">#</a> 二、this关键字</h2>
<h3 id="_1、涵义" tabindex="-1"><a class="header-anchor" href="#_1、涵义" aria-hidden="true">#</a> 1、涵义</h3>
<p><code v-pre>this</code>关键字是一个非常重要的语法点。毫不夸张地说，不理解它的含义，大部分开发任务都无法完成。</p>
<p>前一章已经提到，<code v-pre>this</code>可以用在构造函数之中，表示实例对象。除此之外，<code v-pre>this</code>还可以用在别的场合。但不管是什么场合，<code v-pre>this</code>都有一个共同点：<strong>它总是返回一个对象</strong>。</p>
<p>简单说，<strong><code v-pre>this</code>就是属性或方法“当前”所在的对象</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>this.property // this代表property属性当前所在的对象
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>this</code>就代表<code v-pre>property</code>属性当前所在的对象。</p>
<p>下面是一个实际的例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var person = {
  name: '张三',
  describe: function () {
    return '姓名：'+ this.name;
  }
};

person.describe()
// &quot;姓名：张三&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>this.name</code>表示<code v-pre>name</code>属性所在的那个对象。由于<code v-pre>this.name</code>是在<code v-pre>describe</code>方法中调用，而<code v-pre>describe</code>方法所在的当前对象是<code v-pre>person</code>，因此<code v-pre>this</code>指向<code v-pre>person</code>，<code v-pre>this.name</code>就是<code v-pre>person.name</code>。</p>
<p>由于对象的属性可以赋给另一个对象，所以属性所在的当前对象是可变的，即<code v-pre>this</code><strong>的指向是可变的</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var A = {
  name: '张三',
  describe: function () {
    return '姓名：'+ this.name;
  }
};

var B = {
  name: '李四'
};

B.describe = A.describe;

/* 此时B的值：
B={
	name: '李四',
    describe: function () {
        return '姓名：'+ this.name;
    }
}
*/

B.describe() // B内部的this指向B对象
// &quot;姓名：李四&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>A.describe</code>属性被赋给<code v-pre>B</code>，于是<code v-pre>B.describe</code>就表示<code v-pre>describe</code>方法所在的当前对象是<code v-pre>B</code>，所以<code v-pre>this.name</code>就指向<code v-pre>B.name</code>。</p>
<p>稍稍重构这个例子，<code v-pre>this</code>的动态指向就能看得更清楚。</p>
<div class="language-JS ext-JS line-numbers-mode"><pre v-pre class="language-JS"><code>function f() {
  return '姓名：'+ this.name;
}

var A = {
  name: '张三',
  describe: f
};

var B = {
  name: '李四',
  describe: f
};

A.describe() // &quot;姓名：张三&quot;
B.describe() // &quot;姓名：李四&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，函数<code v-pre>f</code>内部使用了<code v-pre>this</code>关键字，随着<code v-pre>f</code>所在的对象不同，<code v-pre>this</code>的指向也不同。</p>
<p>只要函数被赋给另一个变量，<code v-pre>this</code>的指向就会变。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var A = {
  name: '张三',
  describe: function () {
    return '姓名：'+ this.name;
  }
};

var name = '李四';
var f = A.describe;
f() // &quot;姓名：李四&quot; f函数中的this和name变量所在的对象都为window顶层对象
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>A.describe</code>被赋值给变量<code v-pre>f</code>，内部的<code v-pre>this</code>就会指向<code v-pre>f</code>运行时所在的对象（本例是顶层对象）。</p>
<p>再看一个网页编程的例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>&lt;input type=&quot;text&quot; name=&quot;age&quot; size=3 onChange=&quot;validate(this, 18, 99);&quot;&gt;

&lt;script&gt;
function validate(obj, lowval, hival){
  if ((obj.value &lt; lowval) || (obj.value &gt; hival))
    console.log('Invalid Value!');
}
&lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码是一个文本输入框，每当用户输入一个值，就会调用<code v-pre>onChange</code>回调函数，验证这个值是否在指定范围。浏览器会向回调函数传入当前对象，因此<code v-pre>this</code>就代表传入当前对象（即文本框），然后就可以从<code v-pre>this.value</code>上面读到用户的输入值。</p>
<p>总结一下，<strong>JavaScript 语言之中，一切皆对象，运行环境也是对象，所以函数都是在某个对象之中运行，<code v-pre>this</code>就是函数运行时所在的对象（环境）</strong>。这本来并不会让用户糊涂，但是 JavaScript 支持运行环境动态切换，也就是说，<code v-pre>this</code>的指向是动态的，没有办法事先确定到底指向哪个对象，这才是最让初学者感到困惑的地方。</p>
<h3 id="_2、实质" tabindex="-1"><a class="header-anchor" href="#_2、实质" aria-hidden="true">#</a> 2、实质</h3>
<p>JavaScript 语言之所以有 this 的设计，跟内存里面的数据结构有关系。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = { foo:  5 };
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面的代码将一个对象赋值给变量<code v-pre>obj</code>。JavaScript 引擎会先在内存里面，生成一个对象<code v-pre>{ foo: 5 }</code>，然后把这个对象的内存地址赋值给变量<code v-pre>obj</code>。也就是说，变量<code v-pre>obj</code>是一个地址（reference）。后面如果要读取<code v-pre>obj.foo</code>，引擎先从<code v-pre>obj</code>拿到内存地址，然后再从该地址读出原始的对象，返回它的<code v-pre>foo</code>属性。</p>
<p>原始的对象以字典结构保存，每一个属性名都对应一个属性描述对象。举例来说，上面例子的<code v-pre>foo</code>属性，实际上是以下面的形式保存的。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>{
  foo: {
    [[value]]: 5
    [[writable]]: true
    [[enumerable]]: true
    [[configurable]]: true
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，<code v-pre>foo</code>属性的值保存在属性描述对象的<code v-pre>value</code>属性里面。</p>
<p>这样的结构是很清晰的，问题在于属性的值可能是一个函数。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = { foo: function () {} };
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这时，<strong>引擎会将函数单独保存在内存中</strong>，然后再将函数的地址赋值给<code v-pre>foo</code>属性的<code v-pre>value</code>属性。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>{
  foo: {
    [[value]]: 函数的地址
    ...
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于函数是一个单独的值，所以它可以在不同的环境（上下文）执行。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var f = function () {};
var obj = { f: f };

// 单独执行
f()

// obj 环境执行
obj.f()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>JavaScript 允许在函数体内部，引用当前环境的其他变量。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var f = function () {
  console.log(x);
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，函数体里面使用了变量<code v-pre>x</code>。该变量由运行环境提供。</p>
<p>现在问题就来了，由于函数可以在不同的运行环境执行，所以需要有一种机制，能够在函数体内部获得当前的运行环境（context）。所以，<code v-pre>this</code>就出现了，<strong>它的设计目的就是在函数体内部，指代函数当前的运行环境</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var f = function () {
  console.log(this.x);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，函数体里面的<code v-pre>this.x</code>就是指当前运行环境的<code v-pre>x</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var f = function () {
  console.log(this.x);
}

var x = 1;
var obj = {
  f: f,
  x: 2,
};

// 单独执行
f() // 1  f方法当前运行环境为window对象

// obj 环境执行
obj.f() // 2 f方法当前运行环境为obj对象
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，函数<code v-pre>f</code>在全局环境执行，<code v-pre>this.x</code>指向全局环境的<code v-pre>x</code>；在<code v-pre>obj</code>环境执行，<code v-pre>this.x</code>指向<code v-pre>obj.x</code>。</p>
<h3 id="_3、使用场合" tabindex="-1"><a class="header-anchor" href="#_3、使用场合" aria-hidden="true">#</a> 3、使用场合</h3>
<p><code v-pre>this</code>主要有以下几个使用场合。</p>
<h4 id="_1-全局环境" tabindex="-1"><a class="header-anchor" href="#_1-全局环境" aria-hidden="true">#</a> （1）全局环境</h4>
<p>全局环境使用<code v-pre>this</code>，它指的就是顶层对象<code v-pre>window</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>this === window // true

function f() {
  console.log(this === window);
}
f() // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码说明，不管是不是在函数内部，只要是在全局环境下运行，<code v-pre>this</code>就是指顶层对象<code v-pre>window</code>。</p>
<h4 id="_2-构造函数" tabindex="-1"><a class="header-anchor" href="#_2-构造函数" aria-hidden="true">#</a> （2）构造函数</h4>
<p>构造函数中的<code v-pre>this</code>，指的是实例对象。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var Obj = function (p) {
  this.p = p; // this指向实例对象，在实例对象上定义属性p等于p值
};
var o = new Obj('Hello World!'); // 通过new构造函数来声明实例对象o
o.p // &quot;Hello World!&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码定义了一个构造函数<code v-pre>Obj</code>。由于<code v-pre>this</code>指向实例对象，所以在构造函数内部定义<code v-pre>this.p</code>，就相当于定义实例对象有一个<code v-pre>p</code>属性。</p>
<h4 id="_3-对象的方法" tabindex="-1"><a class="header-anchor" href="#_3-对象的方法" aria-hidden="true">#</a> （3）对象的方法</h4>
<p>如果对象的方法里面包含<code v-pre>this</code>，<code v-pre>this</code>的指向就是方法运行时所在的对象。该方法赋值给另一个对象，就会改变<code v-pre>this</code>的指向。</p>
<p>但是，这条规则很不容易把握。请看下面的代码。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj ={
  foo: function () {
    console.log(this);
  }
};

obj.foo() // obj
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>obj.foo</code>方法执行时，它内部的<code v-pre>this</code>指向<code v-pre>obj</code>。</p>
<p>但是，下面这几种用法，都会改变<code v-pre>this</code>的指向。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 情况一
(obj.foo = obj.foo)() // window
// 情况二
(false || obj.foo)() // window
// 情况三
(1, obj.foo)() // window

//obj.foo 是一个内存地址，它直接取出了 function () {console.log(this);} ，可以把obj.foo看做function () {console.log(this);}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>obj.foo</code>就是一个值。这个值真正调用的时候，运行环境已经不是<code v-pre>obj</code>了，而是全局环境，所以<code v-pre>this</code>不再指向<code v-pre>obj</code>。</p>
<p>可以这样理解，JavaScript 引擎内部，<strong><code v-pre>obj</code>和<code v-pre>obj.foo</code>储存在两个内存地址</strong>，称为地址一和地址二。<code v-pre>obj.foo()</code>这样调用时，是从地址一调用地址二，因此地址二的运行环境是地址一，<code v-pre>this</code>指向<code v-pre>obj</code>。但是，<strong>上面三种情况，都是直接取出地址二进行调用，这样的话，运行环境就是全局环境，因此<code v-pre>this</code>指向全局环境</strong>。上面三种情况等同于下面的代码。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>//obj.foo 是一个内存地址，它直接取出了 function () {console.log(this);} ，可以把obj.foo看做function () {console.log(this);}

// 情况一
(obj.foo = function () {
  console.log(this);
})()
// 等同于
(function () {
  console.log(this);
})()

// 情况二
(false || function () {
  console.log(this);
})()

// 情况三
(1, function () {
  console.log(this);
})()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果<code v-pre>this</code>所在的方法不在对象的第一层，这时<code v-pre>this</code>只是指向当前一层的对象，而不会继承更上面的层。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var a = {
  p: 'Hello',
  b: {
    m: function() {
      console.log(this.p);
    }
  }
};

a.b.m() // undefined
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>a.b.m</code>方法在<code v-pre>a</code>对象的第二层，该方法内部的<code v-pre>this</code>不是指向<code v-pre>a</code>，而是指向<code v-pre>a.b</code>，因为实际执行的是下面的代码。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var b = {
  m: function() {
   console.log(this.p);
  }
};

var a = {
  p: 'Hello',
  b: b
};

(a.b).m() // 等同于 b.m()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果要达到预期效果，只有写成下面这样。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var a = {
  b: {
    m: function() {
      console.log(this.p);
    },
    p: 'Hello'
  }
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果这时将嵌套对象内部的方法赋值给一个变量，<code v-pre>this</code>依然会指向全局对象。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var a = {
  b: {
    m: function() {
      console.log(this.p);
    },
    p: 'Hello'
  }
};

var hello = a.b.m; // 把方法的内存地址赋值给了hello
hello() // undefined  内部this指向window
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>m</code>是多层对象内部的一个方法。为求简便，将其赋值给<code v-pre>hello</code>变量，结果调用时，<code v-pre>this</code>指向了顶层对象。为了避免这个问题，可以只将<code v-pre>m</code>所在的对象赋值给<code v-pre>hello</code>，这样调用时，<code v-pre>this</code>的指向就不会变。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var hello = a.b;
hello.m() // Hello   this指向不变
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、使用注意点" tabindex="-1"><a class="header-anchor" href="#_4、使用注意点" aria-hidden="true">#</a> 4、使用注意点</h3>
<h4 id="_1-避免多层-this" tabindex="-1"><a class="header-anchor" href="#_1-避免多层-this" aria-hidden="true">#</a> （1）避免多层 this</h4>
<p>由于<code v-pre>this</code>的指向是不确定的，所以切勿在函数中包含多层的<code v-pre>this</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var o = {
  f1: function () {
    console.log(this); // this指向o对象
    var f2 = function () { // 方法会另起一个内存地址
      console.log(this); // this指向window对象
    }();
  }
}

o.f1()
// Object
// Window
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码包含两层<code v-pre>this</code>，结果运行后，第一层指向对象<code v-pre>o</code>，第二层指向全局对象，因为实际执行的是下面的代码。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var temp = function () {
  console.log(this);
};

var o = {
  f1: function () {
    console.log(this);
    var f2 = temp();
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一个解决方法是在第二层改用一个指向外层<code v-pre>this</code>的变量。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var o = {
  f1: function() {
    console.log(this);
    var that = this; // 使用变量保存this
    var f2 = function() {
      console.log(that);
    }();
  }
}

o.f1()
// Object
// Object
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码定义了变量<code v-pre>that</code>，固定指向外层的<code v-pre>this</code>，然后在内层使用<code v-pre>that</code>，就不会发生<code v-pre>this</code>指向的改变。</p>
<p>事实上，使用一个变量固定<code v-pre>this</code>的值，然后内层函数调用这个变量，是非常常见的做法，请务必掌握。</p>
<p>JavaScript 提供了严格模式，也可以硬性避免这种问题。严格模式下，如果函数内部的<code v-pre>this</code>指向顶层对象，就会报错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var counter = {
  count: 0
};
counter.inc = function () {
  'use strict';
  this.count++
};
var f = counter.inc; // 这里直接取出方法的内存地址赋值给f，运行环境为window
f()
// TypeError: Cannot read property 'count' of undefined
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>inc</code>方法通过<code v-pre>'use strict'</code>声明采用严格模式，这时内部的<code v-pre>this</code>一旦指向顶层对象，就会报错。</p>
<h4 id="_2-避免数组处理方法中的-this" tabindex="-1"><a class="header-anchor" href="#_2-避免数组处理方法中的-this" aria-hidden="true">#</a> （2）避免数组处理方法中的 this</h4>
<p>数组的<code v-pre>map</code>和<code v-pre>foreach</code>方法，允许提供一个函数作为参数。这个函数内部不应该使用<code v-pre>this</code> 。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var o = {
  v: 'hello',
  p: [ 'a1', 'a2' ],
  f: function f() {
    this.p.forEach(function (item) { // 这个方法的运行环境为window
      console.log(this.v + ' ' + item);
    });
  }
}

o.f()
// undefined a1
// undefined a2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>foreach</code>方法的回调函数中的<code v-pre>this</code>，其实是指向<code v-pre>window</code>对象，因此取不到<code v-pre>o.v</code>的值。原因跟上一段的多层<code v-pre>this</code>是一样的，就是内层的<code v-pre>this</code>不指向外部，而指向顶层对象。</p>
<p>解决这个问题的一种方法，就是前面提到的，使用中间变量固定<code v-pre>this</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var o = {
  v: 'hello',
  p: [ 'a1', 'a2' ],
  f: function f() {
    var that = this;
    this.p.forEach(function (item) {
      console.log(that.v+' '+item);
    });
  }
}

o.f()
// hello a1
// hello a2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另一种方法是将<code v-pre>this</code>当作<code v-pre>foreach</code>方法的第二个参数，固定它的运行环境。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var o = {
  v: 'hello',
  p: [ 'a1', 'a2' ],
  f: function f() {
    this.p.forEach(function (item) {
      console.log(this.v + ' ' + item);
    }, this);
  }
}

o.f()
// hello a1
// hello a2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ES6箭头函数</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var o = {
  v: 'hello',
  p: [ 'a1', 'a2' ],
  f: function f() {
    this.p.forEach((item) =&gt; { // 箭头函数使this指向为o对象
      console.log(this.v+' '+item);
    });
  }
}

o.f()
// hello a1
// hello a2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-避免回调函数中的-this" tabindex="-1"><a class="header-anchor" href="#_3-避免回调函数中的-this" aria-hidden="true">#</a> （3）避免回调函数中的 this</h4>
<p>回调函数中的<code v-pre>this</code>往往会改变指向，最好避免使用。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var o = new Object();
o.f = function () {
  console.log(this === o);
}

// jQuery 的写法
$('#button').on('click', o.f);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，点击按钮以后，控制台会显示<code v-pre>false</code>。原因是此时<code v-pre>this</code>不再指向<code v-pre>o</code>对象，而是指向按钮的 DOM 对象，因为<code v-pre>f</code>方法是在按钮对象的环境中被调用的。这种细微的差别，很容易在编程中忽视，导致难以察觉的错误。</p>
<p>为了解决这个问题，可以采用下面的一些方法对<code v-pre>this</code>进行绑定，也就是使得<code v-pre>this</code>固定指向某个对象，减少不确定性。</p>
<h3 id="_5、绑定-this-的方法" tabindex="-1"><a class="header-anchor" href="#_5、绑定-this-的方法" aria-hidden="true">#</a> 5、绑定 this 的方法</h3>
<p><code v-pre>this</code>的动态切换，固然为 JavaScript 创造了巨大的灵活性，但也使得编程变得困难和模糊。有时，需要把<code v-pre>this</code>固定下来，避免出现意想不到的情况。JavaScript 提供了<code v-pre>call</code>、<code v-pre>apply</code>、<code v-pre>bind</code>这三个方法，来切换/固定<code v-pre>this</code>的指向。</p>
<h4 id="function-prototype-call" tabindex="-1"><a class="header-anchor" href="#function-prototype-call" aria-hidden="true">#</a> Function.prototype.call()</h4>
<p>函数实例的<code v-pre>call</code>方法，可以<strong>指定函数内部<code v-pre>this</code>的指向（即函数执行时所在的作用域），然后在所指定的作用域中，调用该函数。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = {};

var f = function () {
  return this;
};

f() === window // true
f.call(obj) === obj // true 使函数内this指向obj，相当于把函数放入obj对象内运行。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，全局环境运行函数<code v-pre>f</code>时，<code v-pre>this</code>指向全局环境（浏览器为<code v-pre>window</code>对象）；<code v-pre>call</code>方法可以改变<code v-pre>this</code>的指向，指定<code v-pre>this</code>指向对象<code v-pre>obj</code>，然后在对象<code v-pre>obj</code>的作用域中运行函数<code v-pre>f</code>。</p>
<p><strong><code v-pre>call</code>方法的参数，应该是一个对象</strong>。如果参数为空、<code v-pre>null</code>和<code v-pre>undefined</code>，则<strong>默认传入全局对象</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var n = 123;
var obj = { n: 456 };

function a() {
  console.log(this.n);
}

// 参数为空、null、undefined时默认传入全局对象
a.call() // 123
a.call(null) // 123
a.call(undefined) // 123

a.call(window) // 123

a.call(obj) // 456
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>a</code>函数中的<code v-pre>this</code>关键字，如果指向全局对象，返回结果为<code v-pre>123</code>。如果使用<code v-pre>call</code>方法将<code v-pre>this</code>关键字指向<code v-pre>obj</code>对象，返回结果为<code v-pre>456</code>。可以看到，如果<code v-pre>call</code>方法没有参数，或者参数为<code v-pre>null</code>或<code v-pre>undefined</code>，则等同于指向全局对象。</p>
<p>如果<code v-pre>call</code>方法的参数是一个原始值，那么这个<strong>原始值会自动转成对应的包装对象</strong>，然后传入<code v-pre>call</code>方法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var f = function () {
  return this;
};

f.call(5)
// Number {[[PrimitiveValue]]: 5} // Number的实例对象
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>call</code>的参数为<code v-pre>5</code>，不是对象，会被自动转成包装对象（<code v-pre>Number</code>的实例），绑定<code v-pre>f</code>内部的<code v-pre>this</code>。</p>
<p><code v-pre>call</code>方法还可以接受多个参数。</p>
<h5 id="语法" tabindex="-1"><a class="header-anchor" href="#语法" aria-hidden="true">#</a> 语法</h5>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>func.call(thisValue, arg1, arg2, ...)
// 第一个参数thisValue为函数内this将要指向的对象
// 其余参数为传入函数的参数
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>call</code>的第一个参数就是<code v-pre>this</code>所要指向的那个对象，后面的参数则是函数调用时所需的参数。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function add(a, b) {
  return a + b;
}

add.call(this, 1, 2) // 3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>call</code>方法指定函数<code v-pre>add</code>内部的<code v-pre>this</code>绑定当前环境（对象），并且参数为<code v-pre>1</code>和<code v-pre>2</code>，因此函数<code v-pre>add</code>运行后得到<code v-pre>3</code>。</p>
<h5 id="应用-调用对象的原生方法" tabindex="-1"><a class="header-anchor" href="#应用-调用对象的原生方法" aria-hidden="true">#</a> 应用：调用对象的原生方法</h5>
<p><code v-pre>call</code>方法的一个应用是调用对象的原生方法。</p>
<div class="language-JS ext-JS line-numbers-mode"><pre v-pre class="language-JS"><code>var obj = {};
obj.hasOwnProperty('toString') // false 判断obj是否有toString属性，注意这里不是toString()方法

// 覆盖掉继承的 hasOwnProperty 方法
obj.hasOwnProperty = function () {
  return true;
};
obj.hasOwnProperty('toString') // true

Object.prototype.hasOwnProperty.call(obj, 'toString') // false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>hasOwnProperty</code>是<code v-pre>obj</code>对象继承的方法，如果这个方法一旦被覆盖，就不会得到正确结果。<code v-pre>call</code>方法可以解决这个问题，它将<code v-pre>hasOwnProperty</code>方法的原始定义放到<code v-pre>obj</code>对象上执行，这样无论<code v-pre>obj</code>上有没有同名方法，都不会影响结果。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var objArr = { // 类数组对象
    0:'a',
    1:'b',
    2:'c',
    length:3
}

var arr = Array.prototype.slice.call(objArr) // 执行数组的slice方法，并把obj指定为方法的this
// 或 arr = [].slice.call(obj)

arr // ['a','b','c']
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>objArr</code>是一个类似数组的对象，使用<code v-pre>call</code>调用数组的<code v-pre>slice</code>方法，指定<code v-pre>objArr</code>为<code v-pre>slice</code>方法内部的<code v-pre>this</code>，<code v-pre>slice</code>方法返回值赋给<code v-pre>arr</code>。</p>
<p>另外来看看数组<code v-pre>slice</code>方法的内部实现原理</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Array.prototype.slice=function(start,end){  //数组方法slice的底层内部实现
    var result = new Array(); //新数组
    var start = start || 0;
    var end = end || this.length; //this指向调用的对象，用了call之后，改变this的指向，指向传进来的对象
    for(var i=start; i&lt;end; i++){
        result.push(this[i]);
    }
    return result;	//返回的为一个新的数组
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="function-prototype-apply" tabindex="-1"><a class="header-anchor" href="#function-prototype-apply" aria-hidden="true">#</a> Function.prototype.apply()</h4>
<p><code v-pre>apply</code>方法的作用与<code v-pre>call</code>方法类似，也是改变<code v-pre>this</code>指向，然后再调用该函数。唯一的区别就是，它接收一个数组作为函数执行时的参数，使用格式如下。</p>
<h5 id="语法-1" tabindex="-1"><a class="header-anchor" href="#语法-1" aria-hidden="true">#</a> 语法</h5>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>func.apply(thisValue, [arg1, arg2, ...])
// 第一个参数thisValue为函数内this将要指向的对象
// 第二个参数为一个数组，数组每一项为传入函数的参数
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>apply</code>方法的第一个参数也是<code v-pre>this</code>所要指向的那个对象，如果设为<code v-pre>null</code>或<code v-pre>undefined</code>，则等同于指定全局对象。第二个参数则是一个数组，该数组的所有成员依次作为参数，传入原函数。原函数的参数，在<code v-pre>call</code>方法中必须一个个添加，但是在<code v-pre>apply</code>方法中，必须以数组形式添加。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function f(x, y){
  console.log(x + y);
}

f.call(null, 1, 1) // 2
f.apply(null, [1, 1]) // 2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>f</code>函数本来接受两个参数，使用<code v-pre>apply</code>方法以后，就变成可以接受一个数组作为参数。</p>
<p>利用这一点，可以做一些有趣的应用。</p>
<h5 id="应用" tabindex="-1"><a class="header-anchor" href="#应用" aria-hidden="true">#</a> 应用：</h5>
<h5 id="_1-获取数组最大-最小元素" tabindex="-1"><a class="header-anchor" href="#_1-获取数组最大-最小元素" aria-hidden="true">#</a> （1）获取数组最大/最小元素</h5>
<p>JavaScript 不提供找出数组最大元素的函数。结合使用<code v-pre>apply</code>方法和<code v-pre>Math.max/Math.min</code>方法，就可以返回数组的最大/最小元素。</p>
<p><strong>利用第二个参数为数组的特点</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 获取最大值
var a = [10, 2, 4, 15, 9];
Math.max.apply(null, a) // 15

//Math.max方法获取最大值
//Math.max(10, 2, 4, 15, 9) // 15

// 获取最小值
var a = [10, 2, 4, 15, 9];
Math.min.apply(null, a) // 15    null等于绑定全局对象
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_2-将数组的空元素变为undefined" tabindex="-1"><a class="header-anchor" href="#_2-将数组的空元素变为undefined" aria-hidden="true">#</a> （2）将数组的空元素变为<code v-pre>undefined</code></h5>
<p>通过<code v-pre>apply</code>方法，利用<code v-pre>Array</code>构造函数将数组的空元素变成<code v-pre>undefined</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Array.apply(null, ['a', ,'b'])
// [ 'a', undefined, 'b' ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>空元素与<code v-pre>undefined</code>的差别在于，数组的<code v-pre>forEach</code>方法会跳过空元素，但是不会跳过<code v-pre>undefined</code>。因此，遍历内部元素的时候，会得到不同的结果。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var a = ['a', , 'b'];

function print(i) {
  console.log(i);
}

a.forEach(print)
// a
// b

Array.apply(null, a).forEach(print)
// a
// undefined
// b
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_3-转换类似数组的对象" tabindex="-1"><a class="header-anchor" href="#_3-转换类似数组的对象" aria-hidden="true">#</a> （3）转换类似数组的对象</h5>
<p>另外，利用数组对象的<code v-pre>slice</code>方法，可以将一个类似数组的对象（比如<code v-pre>arguments</code>对象）转为真正的数组。</p>
<p>和使用<code v-pre>call</code>方法的效果一样。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Array.prototype.slice.apply({0: 1, length: 1}) // [1]
Array.prototype.slice.apply({0: 1}) // []
Array.prototype.slice.apply({0: 1, length: 2}) // [1, undefined]
Array.prototype.slice.apply({length: 1}) // [undefined]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码的<code v-pre>apply</code>方法的参数都是对象，但是返回结果都是数组，这就起到了将对象转成数组的目的。从上面代码可以看到，这个方法起作用的前提是，被处理的对象必须有<code v-pre>length</code>属性，以及相对应的数字键。</p>
<h5 id="_4-绑定回调函数的对象" tabindex="-1"><a class="header-anchor" href="#_4-绑定回调函数的对象" aria-hidden="true">#</a> （4）绑定回调函数的对象</h5>
<p>前面的按钮点击事件的例子，可以改写如下。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var o = new Object();

o.f = function () {
  console.log(this === o);// true  ，如未改变this指向，this将指向 DOM 对象
}

var f = function (){
  o.f.apply(o);
  // 或者 o.f.call(o);
};

// jQuery 的写法
$('#button').on('click', f);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，点击按钮以后，控制台将会显示<code v-pre>true</code>。由于<code v-pre>apply</code>方法（或者<code v-pre>call</code>方法）不仅绑定函数执行时所在的对象，还会立即执行函数，因此不得不把绑定语句写在一个函数体内。更简洁的写法是采用下面介绍的<code v-pre>bind</code>方法。</p>
<h4 id="function-prototype-bind" tabindex="-1"><a class="header-anchor" href="#function-prototype-bind" aria-hidden="true">#</a> Function.prototype.bind()</h4>
<p><code v-pre>bind</code>方法用于将函数体内的<code v-pre>this</code>绑定到某个对象，然后<strong>返回一个新函数，bind方法并非立即执行一个函数。</strong></p>
<h5 id="语法-2" tabindex="-1"><a class="header-anchor" href="#语法-2" aria-hidden="true">#</a> 语法</h5>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>func.bind(thisValue, arg1, arg2, ...)()
// 第一个参数thisValue为函数内this将要指向的对象
// 其余参数为传入函数的参数
// bind方法返回一个新函数，并非立即执行，如需执行要在后面加个括号
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var d = new Date();
d.getTime() // 1481869925657

var print = d.getTime;
print() // Uncaught TypeError: this is not a Date object.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，我们将<code v-pre>d.getTime</code>方法赋给变量<code v-pre>print</code>，然后调用<code v-pre>print</code>就报错了。这是因为<code v-pre>getTime</code>方法内部的<code v-pre>this</code>，绑定<code v-pre>Date</code>对象的实例，赋给变量<code v-pre>print</code>以后，内部的<code v-pre>this</code>已经不指向<code v-pre>Date</code>对象的实例了。</p>
<p><code v-pre>bind</code>方法可以解决这个问题。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var print = d.getTime.bind(d);
print() // 1481869925657
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>bind</code>方法将<code v-pre>getTime</code>方法内部的<code v-pre>this</code>绑定到<code v-pre>d</code>对象，这时就可以安全地将这个方法赋值给其他变量了。</p>
<p><code v-pre>bind</code>方法的参数就是所要绑定<code v-pre>this</code>的对象，下面是一个更清晰的例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var counter = {
  count: 0,
  inc: function () {
    this.count++;
  }
};

var func = counter.inc.bind(counter);
func();
counter.count // 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>counter.inc</code>方法被赋值给变量<code v-pre>func</code>。这时必须用<code v-pre>bind</code>方法将<code v-pre>inc</code>内部的<code v-pre>this</code>，绑定到<code v-pre>counter</code>，否则就会出错。</p>
<p><code v-pre>this</code>绑定到其他对象也是可以的。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var counter = {
  count: 0,
  inc: function () {
    this.count++;
  }
};

var obj = {
  count: 100
};
var func = counter.inc.bind(obj);
func();
obj.count // 101
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>bind</code>方法将<code v-pre>inc</code>方法内部的<code v-pre>this</code>，绑定到<code v-pre>obj</code>对象。结果调用<code v-pre>func</code>函数以后，递增的就是<code v-pre>obj</code>内部的<code v-pre>count</code>属性。</p>
<p><code v-pre>bind</code>还可以接受更多的参数，将这些参数绑定原函数的参数。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var add = function (x, y) {
  return x * this.m + y * this.n;
}

var obj = {
  m: 2,
  n: 2
};

var newAdd = add.bind(obj, 5); // 第二个参数为add内的x
newAdd(5) // 20 传入的参数为add内的y
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>bind</code>方法除了绑定<code v-pre>this</code>对象，还将<code v-pre>add</code>函数的第一个参数<code v-pre>x</code>绑定成<code v-pre>5</code>，然后返回一个新函数<code v-pre>newAdd</code>，这个函数只要再接受一个参数<code v-pre>y</code>就能运行了。</p>
<p>如果<code v-pre>bind</code>方法的第一个参数是<code v-pre>null</code>或<code v-pre>undefined</code>，等于将<code v-pre>this</code>绑定到全局对象，函数运行时<code v-pre>this</code>指向顶层对象（浏览器为<code v-pre>window</code>）。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function add(x, y) {
  return x + y;
}

var plus5 = add.bind(null, 5);
plus5(10) // 15  传入的参数为add内的y
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，函数<code v-pre>add</code>内部并没有<code v-pre>this</code>，使用<code v-pre>bind</code>方法的主要目的是绑定参数<code v-pre>x</code>，以后每次运行新函数<code v-pre>plus5</code>，就只需要提供另一个参数<code v-pre>y</code>就够了。而且因为<code v-pre>add</code>内部没有<code v-pre>this</code>，所以<code v-pre>bind</code>的第一个参数是<code v-pre>null</code>，不过这里如果是其他对象，也没有影响。</p>
<h5 id="bind要注意的点" tabindex="-1"><a class="header-anchor" href="#bind要注意的点" aria-hidden="true">#</a> bind要注意的点：</h5>
<h5 id="_1-每一次返回一个新函数" tabindex="-1"><a class="header-anchor" href="#_1-每一次返回一个新函数" aria-hidden="true">#</a> （1）每一次返回一个新函数</h5>
<p><code v-pre>bind</code>方法<strong>每运行一次，就返回一个新函数</strong>，这会产生一些问题。比如，监听事件的时候，不能写成下面这样。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>element.addEventListener('click', o.m.bind(o));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>click</code>事件绑定<code v-pre>bind</code>方法生成的一个匿名函数。这样会导致无法取消绑定，所以，下面的代码是无效的。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>element.removeEventListener('click', o.m.bind(o));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>正确的方法是写成下面这样：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var listener = o.m.bind(o);
element.addEventListener('click', listener);
//  ...
element.removeEventListener('click', listener);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_2-结合回调函数使用" tabindex="-1"><a class="header-anchor" href="#_2-结合回调函数使用" aria-hidden="true">#</a> （2）结合回调函数使用</h5>
<p>回调函数是 JavaScript 最常用的模式之一，但是一个常见的错误是，将包含<code v-pre>this</code>的方法直接当作回调函数。解决方法就是使用<code v-pre>bind</code>方法，将<code v-pre>counter.inc</code>绑定<code v-pre>counter</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var counter = {
  count: 0,
  inc: function () {
    'use strict';
    this.count++;
  }
};

function callIt(callback) {
  callback();
}

callIt(counter.inc.bind(counter));
counter.count // 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>callIt</code>方法会调用回调函数。这时如果直接把<code v-pre>counter.inc</code>传入，调用时<code v-pre>counter.inc</code>内部的<code v-pre>this</code>就会指向全局对象。使用<code v-pre>bind</code>方法将<code v-pre>counter.inc</code>绑定<code v-pre>counter</code>以后，就不会有这个问题，<code v-pre>this</code>总是指向<code v-pre>counter</code>。</p>
<p>还有一种情况比较隐蔽，就是某些数组方法可以接受一个函数当作参数。这些函数内部的<code v-pre>this</code>指向，很可能也会出错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = {
  name: '张三',
  times: [1, 2, 3],
  print: function () {
    this.times.forEach(function (n) { // 数组的forEach方法内部this指向问题
      console.log(this.name); // 这里的this指向全局对象
    });
  }
};

obj.print()
// 没有任何输出
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>obj.print</code>内部<code v-pre>this.times</code>的<code v-pre>this</code>是指向<code v-pre>obj</code>的，这个没有问题。但是，<code v-pre>forEach</code>方法的回调函数内部的<code v-pre>this.name</code>却是指向全局对象，导致没有办法取到值。稍微改动一下，就可以看得更清楚。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>obj.print = function () {
  this.times.forEach(function (n) {
    console.log(this === window);
  });
};

obj.print()
// true
// true
// true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解决这个问题，也是通过<code v-pre>bind</code>方法绑定<code v-pre>this</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>obj.print = function () {
  this.times.forEach(function (n) {
    console.log(this.name);
  }.bind(this));// 使用bind把this指向的obj对象传入方法内
};

obj.print()
// 张三
// 张三
// 张三
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_3-结合call方法使用-改写数组方法调用形式" tabindex="-1"><a class="header-anchor" href="#_3-结合call方法使用-改写数组方法调用形式" aria-hidden="true">#</a> （3）结合<code v-pre>call</code>方法使用（改写数组方法调用形式）</h5>
<p>利用<code v-pre>bind</code>方法，可以<strong>改写一些 JavaScript 原生方法的使用形式</strong>，以数组的<code v-pre>slice</code>方法为例。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>[1, 2, 3].slice(0, 1) // [1]
// 等同于
Array.prototype.slice.call([1, 2, 3], 0, 1) // [1]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码中，数组的<code v-pre>slice</code>方法从<code v-pre>[1, 2, 3]</code>里面，按照指定位置和长度切分出另一个数组。这样做的本质是在<code v-pre>[1, 2, 3]</code>上面调用<code v-pre>Array.prototype.slice</code>方法，因此可以用<code v-pre>call</code>方法表达这个过程，得到同样的结果。</p>
<p><code v-pre>call</code>方法实质上是调用<code v-pre>Function.prototype.call</code>方法，因此上面的表达式可以<strong>用<code v-pre>bind</code>方法改写</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var slice = Function.prototype.call.bind(Array.prototype.slice);
slice([1, 2, 3], 0, 1) // [1]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码的含义就是，将<code v-pre>Array.prototype.slice</code>变成<code v-pre>Function.prototype.call</code>方法所在的对象，调用时就变成了<code v-pre>Array.prototype.slice.call</code>。类似的写法还可以用于其他数组方法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var push = Function.prototype.call.bind(Array.prototype.push);
var pop = Function.prototype.call.bind(Array.prototype.pop);

var a = [1 ,2 ,3];
push(a, 4)
a // [1, 2, 3, 4]

pop(a)
a // [1, 2, 3]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果再进一步，将<code v-pre>Function.prototype.call</code>方法绑定到<code v-pre>Function.prototype.bind</code>对象，就意味着<code v-pre>bind</code>的调用形式也可以被改写。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function f() {
  console.log(this.v);
}

var o = { v: 123 };
var bind = Function.prototype.call.bind(Function.prototype.bind);
bind(f, o)() // 123
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码的含义就是，将<code v-pre>Function.prototype.bind</code>方法绑定在<code v-pre>Function.prototype.call</code>上面，所以<code v-pre>bind</code>方法就可以直接使用，不需要在函数实例上使用。</p>
<h4 id="总结-call-、apply-、bind-的区别" tabindex="-1"><a class="header-anchor" href="#总结-call-、apply-、bind-的区别" aria-hidden="true">#</a> 总结，call()、apply()、bind()的区别</h4>
<p>这三个方法都是改变函数内部this指向的。</p>
<p>它们的区别是：</p>
<p>call()第一个参数为函数内this将要指向的对象，其余参数为传入函数的参数。</p>
<p>apply()第一个参数为函数内this将要指向的对象，第二个参数为数组，数组每一项为传入函数的参数。</p>
<p>bind()传入参数和call()一样，区别是bind()返回一个新的函数，并非立即执行。</p>
<h2 id="三、对象的继承" tabindex="-1"><a class="header-anchor" href="#三、对象的继承" aria-hidden="true">#</a> 三、对象的继承</h2>
<p>面向对象编程很重要的一个方面，就是对象的继承。<strong>A 对象通过继承 B 对象，就能直接拥有 B 对象的所有属性和方法。这对于代码的复用是非常有用的</strong>。</p>
<p>大部分面向对象的编程语言，都是通过“类”（class）实现对象的继承。传统上，JavaScript 语言的继承不通过 class，而是通过“原型对象”（prototype）实现，本章介绍 JavaScript 的原型链继承。</p>
<p>ES6 引入了 class 语法，基于 class 的继承不在这个教程介绍，请参阅《ES6 标准入门》一书的相关章节。</p>
<p><strong>ES5 是通过“原型对象”（prototype）实现继承。</strong></p>
<h3 id="_1、原型对象概述" tabindex="-1"><a class="header-anchor" href="#_1、原型对象概述" aria-hidden="true">#</a> 1、原型对象概述</h3>
<h4 id="_1-构造函数的缺点" tabindex="-1"><a class="header-anchor" href="#_1-构造函数的缺点" aria-hidden="true">#</a> （1）构造函数的缺点</h4>
<p>JavaScript 通过构造函数生成新对象，因此<strong>构造函数可以视为对象的模板</strong>。实例对象的属性和方法，可以定义在构造函数内部。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function Cat (name, color) {
  this.name = name;
  this.color = color;
}

var cat1 = new Cat('大毛', '白色');

cat1.name // '大毛'
cat1.color // '白色'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>Cat</code>函数是一个构造函数，函数内部定义了<code v-pre>name</code>属性和<code v-pre>color</code>属性，所有实例对象（上例是<code v-pre>cat1</code>）都会生成这两个属性，即这两个属性会定义在实例对象上面。</p>
<p>通过构造函数为实例对象定义属性，虽然很方便，但是有一个缺点。<strong>同一个构造函数的多个实例之间，无法共享属性，从而造成对系统资源的浪费</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function Cat(name, color) {
  this.name = name;
  this.color = color;
  this.meow = function () {
    console.log('喵喵');
  };
}

// 解决方法，就是在原型对象（prototype）上创建共同的方法
Cat.prototype.meow2 = function(){
    console.log('喵喵');
}

var cat1 = new Cat('大毛', '白色');
var cat2 = new Cat('二毛', '黑色');

// cat1和cat2是同一个构造函数的两个实例对象，他们无法共享meow属性，从而造成对系统资源的浪费。
cat1.meow === cat2.meow
// false

cat1.meow2 === cat2.meow2
// true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>cat1</code>和<code v-pre>cat2</code>是同一个构造函数的两个实例，它们都具有<code v-pre>meow</code>方法。由于<code v-pre>meow</code>方法是生成在每个实例对象上面，所以两个实例就生成了两次。也就是说，每新建一个实例，就会新建一个<code v-pre>meow</code>方法。这既没有必要，又浪费系统资源，因为所有<code v-pre>meow</code>方法都是同样的行为，完全应该共享。</p>
<p><strong>这个问题的解决方法，就是 JavaScript 的原型对象（prototype）。</strong></p>
<h4 id="_2-prototype-属性的作用" tabindex="-1"><a class="header-anchor" href="#_2-prototype-属性的作用" aria-hidden="true">#</a> （2）prototype 属性的作用</h4>
<p><strong>JavaScript 继承机制的设计思想就是，原型对象的所有属性和方法，都能被实例对象共享</strong>。也就是说，如果属性和方法定义在原型上，那么所有实例对象就能共享，不仅节省了内存，还体现了实例对象之间的联系。</p>
<p>下面，先看怎么为对象指定原型。JavaScript 规定，<strong>每个函数都有一个<code v-pre>prototype</code>属性，指向一个对象</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function f() {}
typeof f.prototype // &quot;object&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，函数<code v-pre>f</code>默认具有<code v-pre>prototype</code>属性，指向一个对象。</p>
<p><strong>对于普通函数来说，该属性基本无用</strong>。但是，<strong>对于构造函数来说，生成实例的时候，该属性会自动成为实例对象的原型</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function Animal(name) {
  this.name = name;
}
// Animal.prototype属性是实例cat1和cat2的原型对象，在上面添加属性，实例就共享了该属性
Animal.prototype.color = 'white';

var cat1 = new Animal('大毛');
var cat2 = new Animal('二毛');

cat1.color // 'white'
cat2.color // 'white'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，构造函数<code v-pre>Animal</code>的<code v-pre>prototype</code>属性，就是实例对象<code v-pre>cat1</code>和<code v-pre>cat2</code>的原型对象。原型对象上添加一个<code v-pre>color</code>属性，结果，实例对象都共享了该属性。</p>
<p>原型对象的属性不是实例对象自身的属性。只要修改原型对象，变动就立刻会体现在<strong>所有</strong>实例对象上。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Animal.prototype.color = 'yellow';


// color属性并非实例对象cat1/cat2本身的属性,只是当实例本身没有该属性或方法时，它会到原型对象去寻找该属性或方法
cat1.color // &quot;yellow&quot;
cat2.color // &quot;yellow&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，原型对象的<code v-pre>color</code>属性的值变为<code v-pre>yellow</code>，两个实例对象的<code v-pre>color</code>属性立刻跟着变了。这是因为实例对象其实没有<code v-pre>color</code>属性，都是读取原型对象的<code v-pre>color</code>属性。也就是说，**当实例对象本身没有某个属性或方法的时候，它会到原型对象去寻找该属性或方法。**这就是原型对象的特殊之处。</p>
<p>如果<strong>实例对象自身就有某个属性或方法，它就不会再去原型对象寻找这个属性或方法</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>cat1.color = 'black';

cat1.color // 'black'
cat2.color // 'yellow'
Animal.prototype.color // 'yellow';
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，实例对象<code v-pre>cat1</code>的<code v-pre>color</code>属性改为<code v-pre>black</code>，就使得它不再去原型对象读取<code v-pre>color</code>属性，后者的值依然为<code v-pre>yellow</code>。</p>
<p>总结一下，原型对象的<strong>作用</strong>，<strong>就是定义所有实例对象共享的属性和方法</strong>。这也是它被称为原型对象的原因，而实例对象可以视作从原型对象衍生出来的子对象。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Animal.prototype.walk = function () {
  console.log(this.name + ' is walking');
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>Animal.prototype</code>对象上面定义了一个<code v-pre>walk</code>方法，这个方法将可以在所有<code v-pre>Animal</code>实例对象上面调用。</p>
<h4 id="_3-原型链" tabindex="-1"><a class="header-anchor" href="#_3-原型链" aria-hidden="true">#</a> （3）原型链</h4>
<p><strong>JavaScript 规定，所有对象都有自己的原型对象（prototype）。一方面，任何一个对象，都可以充当其他对象的原型；另一方面，由于原型对象也是对象，所以它也有自己的原型。因此，就会形成一个“原型链”（prototype chain）：对象到原型，再到原型的原型……</strong></p>
<p>如果一层层地上溯，所有对象的原型<strong>最终都可以上溯到<code v-pre>Object.prototype</code>，即<code v-pre>Object</code>构造函数的<code v-pre>prototype</code>属性</strong>。也就是说，所有对象都继承了<code v-pre>Object.prototype</code>的属性。这就是所有对象都有<code v-pre>valueOf</code>和<code v-pre>toString</code>方法的原因，因为这是从<code v-pre>Object.prototype</code>继承的。</p>
<p>那么，<code v-pre>Object.prototype</code>对象有没有它的原型呢？回答是<code v-pre>Object.prototype</code>的原型是<code v-pre>null</code>。<code v-pre>null</code>没有任何属性和方法，也没有自己的原型。因此，<strong>原型链的尽头就是<code v-pre>null</code></strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Object.getPrototypeOf(Object.prototype) // Object.getPrototypeOf方法返回对象的原型
// null
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码表示，<code v-pre>Object.prototype</code>对象的原型是<code v-pre>null</code>，由于<code v-pre>null</code>没有任何属性，所以原型链到此为止。<code v-pre>Object.getPrototypeOf</code>方法返回参数对象的原型，具体介绍请看后文。</p>
<p><strong>读取对象的某个属性时，JavaScript 引擎先寻找对象本身的属性，如果找不到，就到它的原型去找，如果还是找不到，就到原型的原型去找。如果直到最顶层的<code v-pre>Object.prototype</code>还是找不到，则返回<code v-pre>undefined</code></strong>。如果对象自身和它的原型，都定义了一个同名属性，那么优先读取对象自身的属性，这叫做“覆盖”（overriding）。</p>
<p>注意，一级级向上，在整个原型链上寻找某个属性，对性能是有影响的。所寻找的属性在越上层的原型对象，对性能的影响越大。如果寻找某个不存在的属性，将会遍历整个原型链。</p>
<p>举例来说，如果让构造函数的<code v-pre>prototype</code>属性指向一个数组，就意味着实例对象可以调用数组方法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var MyArray = function () {};

MyArray.prototype = new Array(); // 构造函数MyArray的原型指向 数组实例
MyArray.prototype.constructor = MyArray;

var mine = new MyArray(); // mine是构造函数MyArray的实例
mine.push(1, 2, 3);
mine.length // 3
mine instanceof Array // true 判断实例对象mine是否为构造函数Array的实例
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>mine</code>是构造函数<code v-pre>MyArray</code>的实例对象，由于<code v-pre>MyArray.prototype</code>指向一个数组实例，使得<code v-pre>mine</code>可以调用数组方法（这些方法定义在数组实例的<code v-pre>prototype</code>对象上面）。最后那行<code v-pre>instanceof</code>表达式，用来比较一个对象是否为某个构造函数的实例，结果就是证明<code v-pre>mine</code>为<code v-pre>Array</code>的实例，<code v-pre>instanceof</code>运算符的详细解释详见后文。</p>
<p>上面代码还出现了原型对象的<code v-pre>constructor</code>属性，这个属性的含义下一节就来解释。</p>
<h4 id="_4-constructor-属性" tabindex="-1"><a class="header-anchor" href="#_4-constructor-属性" aria-hidden="true">#</a> （4）constructor 属性</h4>
<p><strong><code v-pre>prototype</code>对象有一个<code v-pre>constructor</code>属性，默认指向<code v-pre>prototype</code>对象所在的构造函数。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function P() {}
P.prototype.constructor === P // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>由于<code v-pre>constructor</code>属性定义在<code v-pre>prototype</code>对象上面，意味着可以被所有实例对象继承。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function P() {}
var p = new P();

p.constructor === P // true  p自身没有constructor属性，它是读取原型上的
p.constructor === P.prototype.constructor // true
p.hasOwnProperty('constructor') // false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>p</code>是构造函数<code v-pre>P</code>的实例对象，但是<code v-pre>p</code>自身没有<code v-pre>constructor</code>属性，该属性其实是读取原型链上面的<code v-pre>P.prototype.constructor</code>属性。</p>
<h5 id="作用" tabindex="-1"><a class="header-anchor" href="#作用" aria-hidden="true">#</a> 作用</h5>
<p><code v-pre>constructor</code>属性的<strong>作用</strong>是，<strong>可以得知某个实例对象，到底是哪一个构造函数产生的</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function F() {};
var f = new F();

f.constructor === F // true
f.constructor === RegExp // false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>constructor</code>属性确定了实例对象<code v-pre>f</code>的构造函数是<code v-pre>F</code>，而不是<code v-pre>RegExp</code>。</p>
<p>另一方面，有了<code v-pre>constructor</code>属性，就可以从一个实例对象新建另一个实例。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function Constr() {}
var x = new Constr();

var y = new x.constructor();  // 等同于 new Constr()
y instanceof Constr // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>x</code>是构造函数<code v-pre>Constr</code>的实例，可以从<code v-pre>x.constructor</code>间接调用构造函数。这使得在实例方法中，调用自身的构造函数成为可能。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Constr.prototype.createCopy = function () {
  return new this.constructor();
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>createCopy</code>方法调用构造函数，新建另一个实例。</p>
<p><code v-pre>constructor</code>属性<strong>表示原型对象与构造函数之间的关联关系</strong>，如果修改了原型对象，一般会同时修改<code v-pre>constructor</code>属性，防止引用的时候出错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function Person(name) {
  this.name = name;
}

Person.prototype.constructor === Person // true

Person.prototype = { // 修改了原型对象,但没有修改原型下的constructor
  method: function () {}
};

//  由于原型对象已被修改，原型下的constructor也被修改
Person.prototype.constructor === Person // false
Person.prototype.constructor === Object // true // 普通对象的constructor指向object构造函数
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，构造函数<code v-pre>Person</code>的原型对象改掉了，但是没有修改<code v-pre>constructor</code>属性，导致这个属性不再指向<code v-pre>Person</code>。由于<code v-pre>Person</code>的新原型是一个普通对象，而普通对象的<code v-pre>constructor</code>属性指向<code v-pre>Object</code>构造函数，导致<code v-pre>Person.prototype.constructor</code>变成了<code v-pre>Object</code>。</p>
<p>所以，修改原型对象时，一般要同时修改<code v-pre>constructor</code>属性的指向。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 坏的写法
C.prototype = {
  method1: function (...) { ... },
  // ...
};

// 好的写法
C.prototype = {
  constructor: C,
  method1: function (...) { ... },
  // ...
};

// 更好的写法 （只是在原型对象上添加方法）
C.prototype.method1 = function (...) { ... };
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，要么将<code v-pre>constructor</code>属性重新指向原来的构造函数，要么只在原型对象上添加方法，这样可以保证<code v-pre>instanceof</code>运算符不会失真。</p>
<p>如果不能确定<code v-pre>constructor</code>属性是什么函数，还有一个办法：通过<code v-pre>name</code>属性，从实例得到构造函数的名称。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function Foo() {}
var f = new Foo();
f.constructor.name // &quot;Foo&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、instanceof-运算符" tabindex="-1"><a class="header-anchor" href="#_2、instanceof-运算符" aria-hidden="true">#</a> 2、instanceof 运算符</h3>
<p><code v-pre>instanceof</code>运算符，<strong>判断对象是否为某个构造函数的实例，返回一个布尔值</strong>。</p>
<h4 id="语法-3" tabindex="-1"><a class="header-anchor" href="#语法-3" aria-hidden="true">#</a> 语法</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>&lt;实例对象&gt; instanceof &lt;构造函数&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>var v = new Vehicle();
v instanceof Vehicle // true   v是构造函数Vehicel的实例
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，对象<code v-pre>v</code>是构造函数<code v-pre>Vehicle</code>的实例，所以返回<code v-pre>true</code>。</p>
<p><code v-pre>instanceof</code>运算符的左边是实例对象，右边是构造函数。它会<strong>检查右边构造函数的原型对象（prototype），是否在左边对象的原型链上</strong>。因此，下面两种写法是等价的。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>v instanceof Vehicle
// 等同于
Vehicle.prototype.isPrototypeOf(v)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>Object.prototype.isPrototypeOf</code>的详细解释见后文。</p>
<p>由于<code v-pre>instanceof</code>检查整个原型链，因此同一个实例对象，可能会对多个构造函数都返回<code v-pre>true</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var d = new Date();
d instanceof Date // true
d instanceof Object // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>d</code>同时是<code v-pre>Date</code>和<code v-pre>Object</code>的实例，因此对这两个构造函数都返回<code v-pre>true</code>。</p>
<p>由于<strong>任意对象（除了<code v-pre>null</code>）都是<code v-pre>Object</code>的实例</strong>，所以<code v-pre>instanceof</code>运算符可以判断一个值是否为非<code v-pre>null</code>的对象。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = { foo: 123 };
obj instanceof Object // true

null instanceof Object // false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，除了<code v-pre>null</code>，其他对象的<code v-pre>instanceOf Object</code>的运算结果都是<code v-pre>true</code>。</p>
<p><code v-pre>instanceof</code>的原理是检查右边构造函数的<code v-pre>prototype</code>属性，是否在左边对象的原型链上。有一种<strong>特殊情况</strong>，就是左边对象的原型链上，只有<code v-pre>null</code>对象。这时，<code v-pre>instanceof</code>判断会失真。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = Object.create(null);
typeof obj // &quot;object&quot;
Object.create(null) instanceof Object // false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>Object.create(null)</code>返回一个新对象<code v-pre>obj</code>，它的原型是<code v-pre>null</code>（<code v-pre>Object.create</code>的详细介绍见后文）。右边的构造函数<code v-pre>Object</code>的<code v-pre>prototype</code>属性，不在左边的原型链上，因此<code v-pre>instanceof</code>就认为<code v-pre>obj</code>不是<code v-pre>Object</code>的实例。但是，<strong>只要一个对象的原型不是<code v-pre>null</code>，<code v-pre>instanceof</code>运算符的判断就不会失真</strong>。</p>
<h4 id="用处" tabindex="-1"><a class="header-anchor" href="#用处" aria-hidden="true">#</a> 用处</h4>
<p><code v-pre>instanceof</code>运算符的一个用处，是<strong>判断值的类型</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var x = [1, 2, 3];
var y = {};
var z = function (){};
x instanceof Array // true
y instanceof Object // true
y instanceof Function // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>instanceof</code>运算符判断，变量<code v-pre>x</code>是数组，变量<code v-pre>y</code>是对象，变量<code v-pre>z</code>是函数。</p>
<p>注意，<code v-pre>instanceof</code>运算符<strong>只能用于对象</strong>，<strong>不适用原始类型的值</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var s = 'hello';
var z = 0;
s instanceof String // false
z instanceof Number // false
// 原始类型并没有实例化，所有都返回false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，字符串不是<code v-pre>String</code>对象的实例（因为字符串不是对象），所以返回<code v-pre>false</code>。</p>
<p>此外，对于<code v-pre>undefined</code>和<code v-pre>null</code>，<code v-pre>instanceof</code>运算符总是返回<code v-pre>false</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>undefined instanceof Object // false
null instanceof Object // false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>利用<code v-pre>instanceof</code>运算符，还可以巧妙地解决，调用构造函数时，<strong>忘了加<code v-pre>new</code>命令的问题</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function Fubar (foo, bar) {
  if (this instanceof Fubar) { // 忘加new命令时 this为 全局对象window
    this._foo = foo;
    this._bar = bar;
  } else {
    return new Fubar(foo, bar);
  }
}
Fubar(1, 2)._foo // 1
(new Fubar(1, 2))._foo // 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码使用<code v-pre>instanceof</code>运算符，在函数体内部判断<code v-pre>this</code>关键字是否为构造函数<code v-pre>Fubar</code>的实例。如果不是，就表明忘了加<code v-pre>new</code>命令。</p>
<h3 id="_3、构造函数的继承" tabindex="-1"><a class="header-anchor" href="#_3、构造函数的继承" aria-hidden="true">#</a> 3、构造函数的继承</h3>
<p><strong>让一个构造函数继承另一个构造函数</strong>，是非常常见的需求。</p>
<p>这可以分成两步实现。<strong>第一步是在子类的构造函数中，调用父类的构造函数</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function Sub(value) { // Sub是子类构造函数
  Super.call(this); // Super是父类构造函数，这的this是子类的实例
  this.prop = value;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>Sub</code>是子类的构造函数，<code v-pre>this</code>是子类的实例。在实例上调用父类的构造函数<code v-pre>Super</code>，<strong>就会让子类实例具有父类实例的属性</strong>。</p>
<p><strong>第二步，是让子类的原型指向父类的原型，这样子类就可以继承父类原型。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 子类的原型指向一个新对象，新对象原型指向父类原型，等于子类原型继承了父类原型，且对子类原型操作不会影响到父类原型
Sub.prototype = Object.create(Super.prototype);
Sub.prototype.constructor = Sub;
Sub.prototype.method = '...';
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>Sub.prototype</code>是子类的原型，要将它赋值为<code v-pre>Object.create(Super.prototype)</code>，而不是直接等于<code v-pre>Super.prototype</code>。否则后面两行对<code v-pre>Sub.prototype</code>的操作，会连父类的原型<code v-pre>Super.prototype</code>一起修改掉。</p>
<p><strong>另外一种写法</strong>是<code v-pre>Sub.prototype</code>等于一个父类实例。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Sub.prototype = new Super();// 这个写法会继承父类实例的方法，不推荐
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面这种写法也有继承的效果，但是子类会具有父类实例的方法。有时，这可能不是我们需要的，所以<strong>不推荐</strong>使用这种写法。</p>
<p>举例来说，下面是一个<code v-pre>Shape</code>构造函数。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function Shape() {
  this.x = 0;
  this.y = 0;
}

Shape.prototype.move = function (x, y) {
  this.x += x;
  this.y += y;
  console.info('Shape moved.');
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们需要让<code v-pre>Rectangle</code>构造函数继承<code v-pre>Shape</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 第一步，子类继承父类的实例
function Rectangle() {
  Shape.call(this); // 调用父类构造函数
}
// 另一种写法
function Rectangle() {
  this.base = Shape;
  this.base();
}

// 第二步，子类继承父类的原型
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>采用这样的写法以后，<code v-pre>instanceof</code>运算符会对子类和父类的构造函数，都返回<code v-pre>true</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var rect = new Rectangle();

rect instanceof Rectangle  // true
rect instanceof Shape  // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，子类是整体继承父类。有时只需要<strong>单个方法的继承</strong>，这时可以采用下面的写法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>ClassB.prototype.print = function() {// 单个方法的继承
  ClassA.prototype.print.call(this);// 继承了ClassA的print方法
  // some code
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，子类<code v-pre>B</code>的<code v-pre>print</code>方法先调用父类<code v-pre>A</code>的<code v-pre>print</code>方法，再部署自己的代码。这就等于继承了父类<code v-pre>A</code>的<code v-pre>print</code>方法。</p>
<h3 id="_4、多重继承" tabindex="-1"><a class="header-anchor" href="#_4、多重继承" aria-hidden="true">#</a> 4、多重继承</h3>
<p>JavaScript 不提供多重继承功能，即不允许一个对象同时继承多个对象。但是，可以通过变通方法，实现这个功能。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function M1() { // 构造函数M1
  this.hello = 'hello';
}

function M2() { // 构造函数M2
  this.world = 'world';
}

function S() { // 子类构造函数S
  M1.call(this);
  M2.call(this);
}

// 继承 M1
S.prototype = Object.create(M1.prototype);
// 继承链上加入 M2
Object.assign(S.prototype, M2.prototype);

// 指定构造函数
S.prototype.constructor = S;

var s = new S();
s.hello // 'hello'
s.world // 'world'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，子类<code v-pre>S</code>同时继承了父类<code v-pre>M1</code>和<code v-pre>M2</code>。这种模式又称为 Mixin（混入）。</p>
<h3 id="_5、模块" tabindex="-1"><a class="header-anchor" href="#_5、模块" aria-hidden="true">#</a> 5、模块</h3>
<p>随着网站逐渐变成“互联网应用程序”，嵌入网页的 JavaScript 代码越来越庞大，越来越复杂。网页越来越像桌面程序，需要一个团队分工协作、进度管理、单元测试等等……开发者必须使用软件工程的方法，管理网页的业务逻辑。</p>
<p><strong>JavaScript 模块化编程</strong>，已经成为一个迫切的需求。理想情况下，开发者只需要实现核心的业务逻辑，其他都可以加载别人已经写好的模块。</p>
<p>但是，JavaScript 不是一种模块化编程语言，ES6 才开始支持“类”和“模块”。下面介绍传统的做法，如何利用对象实现模块的效果。</p>
<h4 id="_1-基本的实现方法" tabindex="-1"><a class="header-anchor" href="#_1-基本的实现方法" aria-hidden="true">#</a> （1）基本的实现方法</h4>
<p><strong>模块是实现特定功能的一组属性和方法的封装。</strong></p>
<p>简单的做法是把模块写成一个对象，所有的模块成员都放到这个对象里面。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var module1 = new Object({
　_count : 0,
　m1 : function (){
　　//...
　},
　m2 : function (){
  　//...
　}
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的函数<code v-pre>m1</code>和<code v-pre>m2</code>，都封装在<code v-pre>module1</code>对象里。使用的时候，就是调用这个对象的属性。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 使用
module1.m1();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>但是，这样的写法会暴露所有模块成员，内部状态可以被外部改写。比如，外部代码可以直接改变内部计数器的值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module1._count = 5;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_2-封装私有变量" tabindex="-1"><a class="header-anchor" href="#_2-封装私有变量" aria-hidden="true">#</a> （2）封装私有变量：</h4>
<h5 id="_2-1-构造函数的写法" tabindex="-1"><a class="header-anchor" href="#_2-1-构造函数的写法" aria-hidden="true">#</a> （2-1）构造函数的写法</h5>
<p>我们可以利用构造函数，封装私有变量。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function StringBuilder() {
  var buffer = []; // 模块的私有变量

  this.add = function (str) {
     buffer.push(str);
  };

  this.toString = function () {
    return buffer.join('');
  };

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>buffer</code>是模块的私有变量。一旦生成实例对象，外部是无法直接访问<code v-pre>buffer</code>的。但是，这种方法将私有变量封装在构造函数中，导致构造函数与实例对象是一体的，总是存在于内存之中，无法在使用完成后清除。这意味着，构造函数有双重作用，既用来塑造实例对象，又用来保存实例对象的数据，违背了构造函数与实例对象在数据上相分离的原则（即实例对象的数据，不应该保存在实例对象以外）。同时，非常耗费内存。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function StringBuilder() {
  this._buffer = [];
}

StringBuilder.prototype = {
  constructor: StringBuilder,
  add: function (str) {
    this._buffer.push(str);
  },
  toString: function () {
    return this._buffer.join('');
  }
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方法将私有变量放入实例对象中，好处是看上去更自然，但是它的私有变量可以从外部读写，不是很安全。</p>
<h5 id="_2-2-立即执行函数的写法" tabindex="-1"><a class="header-anchor" href="#_2-2-立即执行函数的写法" aria-hidden="true">#</a> （2-2）立即执行函数的写法</h5>
<p>另一种做法是使用“立即执行函数”（Immediately-Invoked Function Expression，IIFE），将相关的属性和方法封装在一个函数作用域里面，可以达到不暴露私有成员的目的。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var module1 = (function () {
　var _count = 0;
　var m1 = function () {
　  //...
　};
　var m2 = function () {
　　//...
　};
　return {
　　m1 : m1,
　　m2 : m2
　};
})();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用上面的写法，外部代码无法读取内部的<code v-pre>_count</code>变量。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console.info(module1._count); //undefined
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面的<code v-pre>module1</code>就是 JavaScript 模块的基本写法。下面，再对这种写法进行加工。</p>
<h4 id="_3-模块的放大模式-向模块添加新方法" tabindex="-1"><a class="header-anchor" href="#_3-模块的放大模式-向模块添加新方法" aria-hidden="true">#</a> （3）模块的放大模式（向模块添加新方法）</h4>
<p>如果一个模块很大，必须分成几个部分，或者一个模块需要继承另一个模块，这时就有必要采用“放大模式”（augmentation）。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var module1 = (function (mod){
　mod.m3 = function () {
　　//...
　};
　return mod;
})(module1);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码为<code v-pre>module1</code>模块添加了一个新方法<code v-pre>m3()</code>，然后返回新的<code v-pre>module1</code>模块。</p>
<p>在浏览器环境中，模块的各个部分通常都是从网上获取的，有时无法知道哪个部分会先加载。如果采用上面的写法，第一个执行的部分有可能加载一个不存在空对象，这时就要采用&quot;宽放大模式&quot;（Loose augmentation）。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var module1 = (function (mod) {
　//...
　return mod;
})(window.module1 || {});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与&quot;放大模式&quot;相比，“宽放大模式”就是“立即执行函数”的参数可以是空对象。</p>
<h4 id="_4-输入全局变量-保证独立性" tabindex="-1"><a class="header-anchor" href="#_4-输入全局变量-保证独立性" aria-hidden="true">#</a> （4）输入全局变量（保证独立性）</h4>
<p>独立性是模块的重要特点，模块内部最好不与程序的其他部分直接交互。</p>
<p>为了在模块内部调用全局变量，必须显式地将其他变量输入模块。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var module1 = (function ($, YAHOO) {
　//...
})(jQuery, YAHOO); // 向模块内部传入全局变量
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的<code v-pre>module1</code>模块需要使用 jQuery 库和 YUI 库，就把这两个库（其实是两个模块）当作参数输入<code v-pre>module1</code>。这样做除了保证模块的独立性，还使得模块之间的依赖关系变得明显。</p>
<p><strong>立即执行函数还可以起到命名空间的作用</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>(function($, window, document) {

  function go(num) {
  }

  function handleEvents() {
  }

  function initialize() {
  }

  function dieCarouselDie() {
  }

  //attach to the global scope
  window.finalCarousel = { // 对外暴露接口
    init : initialize,
    destroy : dieCarouselDie
  }

})( jQuery, window, document );
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>finalCarousel</code>对象输出到全局，对外暴露<code v-pre>init</code>和<code v-pre>destroy</code>接口，<strong>内部方法<code v-pre>go</code>、<code v-pre>handleEvents</code>、<code v-pre>initialize</code>、<code v-pre>dieCarouselDie</code>都是外部无法调用的</strong>。</p>
<h2 id="四、object-对象的相关方法" tabindex="-1"><a class="header-anchor" href="#四、object-对象的相关方法" aria-hidden="true">#</a> 四、Object 对象的相关方法</h2>
<p>JavaScript 在<code v-pre>Object</code>对象上面，提供了很多相关方法，处理面向对象编程的相关操作。本章介绍这些方法。</p>
<h3 id="_1、object-getprototypeof-获取原型对象" tabindex="-1"><a class="header-anchor" href="#_1、object-getprototypeof-获取原型对象" aria-hidden="true">#</a> 1、Object.getPrototypeOf() 获取原型对象</h3>
<p><code v-pre>Object.getPrototypeOf</code>方法<strong>返回参数对象的原型</strong>。这是获取原型对象的标准方法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var F = function () {};
var f = new F();
Object.getPrototypeOf(f) === F.prototype // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，实例对象<code v-pre>f</code>的原型是<code v-pre>F.prototype</code>。</p>
<p>下面是几种特殊对象的原型。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 空对象的原型是 Object.prototype
Object.getPrototypeOf({}) === Object.prototype // true

// Object.prototype 的原型是 null
Object.getPrototypeOf(Object.prototype) === null // true

// 函数的原型是 Function.prototype
function f() {}
Object.getPrototypeOf(f) === Function.prototype // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、object-setprototypeof-设置原型对象" tabindex="-1"><a class="header-anchor" href="#_2、object-setprototypeof-设置原型对象" aria-hidden="true">#</a> 2、Object.setPrototypeOf() 设置原型对象</h3>
<p><code v-pre>Object.setPrototypeOf</code>方法为参数对象<strong>设置原型</strong>，<strong>返回该参数对象</strong>。它接受两个参数，第一个是现有对象，第二个是原型对象。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var a = {};
var b = {x: 1};
Object.setPrototypeOf(a, b);

Object.getPrototypeOf(a) === b // true
a.x // 1  a对象共享b对象的属性
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>Object.setPrototypeOf</code>方法将对象<code v-pre>a</code>的原型，设置为对象<code v-pre>b</code>，因此<code v-pre>a</code>可以共享<code v-pre>b</code>的属性。</p>
<h5 id="使用object-setprototypeof方法模拟new命令" tabindex="-1"><a class="header-anchor" href="#使用object-setprototypeof方法模拟new命令" aria-hidden="true">#</a> <strong>使用<code v-pre>Object.setPrototypeOf</code>方法模拟<code v-pre>new</code>命令</strong></h5>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var F = function () {
  this.foo = 'bar';
};

var f = new F();
// 等同于
var f = Object.setPrototypeOf({}, F.prototype); // 模拟new命令
F.call(f);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>new</code>命令新建实例对象，其实可以分成两步。第一步，将一个空对象的原型设为构造函数的<code v-pre>prototype</code>属性（上例是<code v-pre>F.prototype</code>）；第二步，将构造函数内部的<code v-pre>this</code>绑定这个空对象，然后执行构造函数，使得定义在<code v-pre>this</code>上面的方法和属性（上例是<code v-pre>this.foo</code>），都转移到这个空对象上。</p>
<h3 id="_3、-object-create-创建实例对象-指向目标对象的原型" tabindex="-1"><a class="header-anchor" href="#_3、-object-create-创建实例对象-指向目标对象的原型" aria-hidden="true">#</a> 3、 Object.create() 创建实例对象，指向目标对象的原型</h3>
<p>生成实例对象的常用方法是，使用<code v-pre>new</code>命令让构造函数返回一个实例。但是很多时候，只能拿到一个实例对象，它可能根本不是由构建函数生成的，那么能不能从一个实例对象，生成另一个实例对象呢？</p>
<p>JavaScript 提供了<code v-pre>Object.create</code>方法，用来满足这种需求。**该方法接受一个对象作为参数，然后以它为原型，返回一个实例对象。**该实例完全继承原型对象的属性。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 原型对象
var A = {
  print: function () {
    console.log('hello');
  }
};

// 实例对象
var B = Object.create(A); // 以A为原型，创建了B实例对象，使B继承了A的属性

Object.getPrototypeOf(B) === A // true
B.print() // hello
B.print === A.print // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>Object.create</code>方法以<code v-pre>A</code>对象为原型，生成了<code v-pre>B</code>对象。<code v-pre>B</code>继承了<code v-pre>A</code>的所有属性和方法。</p>
<p>实际上，<code v-pre>Object.create</code>方法可以用下面的代码代替。</p>
<h5 id="内部实现原理" tabindex="-1"><a class="header-anchor" href="#内部实现原理" aria-hidden="true">#</a> 内部实现原理</h5>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>if (typeof Object.create !== 'function') {
  Object.create = function (obj) { // 模拟Object.create方法
    function F() {} // 创建一个空构造函数F
    F.prototype = obj; // 让F的原型 指向参数obj（obj为传入的原型对象）
    return new F(); // 返回一个F的实例
  };
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码表明，<code v-pre>Object.create</code>方法的实质是新建一个空的构造函数<code v-pre>F</code>，然后让<code v-pre>F.prototype</code>属性指向参数对象<code v-pre>obj</code>，最后返回一个<code v-pre>F</code>的实例，从而实现让该实例继承<code v-pre>obj</code>的属性。</p>
<p>下面三种方式生成的新对象是等价的。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj1 = Object.create({});
var obj2 = Object.create(Object.prototype);
var obj3 = new Object();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果想要生成一个不继承任何属性（比如没有<code v-pre>toString</code>和<code v-pre>valueOf</code>方法）的对象，可以将<code v-pre>Object.create</code>的参数设为<code v-pre>null</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = Object.create(null); // 不继承Object的toString和valueOf方法的一个对象

obj.valueOf()
// TypeError: Object [object Object] has no method 'valueOf'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，对象<code v-pre>obj</code>的原型是<code v-pre>null</code>，它就不具备一些定义在<code v-pre>Object.prototype</code>对象上面的属性，比如<code v-pre>valueOf</code>方法。</p>
<p>使用<code v-pre>Object.create</code>方法的时候，必须提供对象原型，即<strong>参数不能为空，或者不是对象，否则会报错</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Object.create()
// TypeError: Object prototype may only be an Object or null
Object.create(123)
// TypeError: Object prototype may only be an Object or null
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>Object.create</code>方法生成的新对象，动态继承了原型。在原型上添加或修改任何方法，会立刻反映在新对象之上。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj1 = { p: 1 };
var obj2 = Object.create(obj1);

obj1.p = 2;
obj2.p // 2  obj2的原型指向obj1，当访问obj2上的p属性时，js引擎会先在obj2本身上找，没找到会去原型上找
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，修改对象原型<code v-pre>obj1</code>会影响到实例对象<code v-pre>obj2</code>。</p>
<p>除了对象的原型，<code v-pre>Object.create</code>方法还可以接受<strong>第二个参数。该参数是一个属性描述对象，它所描述的对象属性，会添加到实例对象，作为该对象自身的属性</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = Object.create({}, {
  p1: { // p1为添加到obj实例对象自身的属性
    value: 123,
    enumerable: true,
    configurable: true,
    writable: true,
  },
  p2: {
    value: 'abc',
    enumerable: true,
    configurable: true,
    writable: true,
  }
});

// 等同于
var obj = Object.create({});
obj.p1 = 123;
obj.p2 = 'abc';
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>Object.create</code>方法生成的对象，<strong>继承了它的原型对象的构造函数</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function A() {}
var a = new A();
var b = Object.create(a);

b.constructor === A // true
b instanceof A // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>b</code>对象的原型是<code v-pre>a</code>对象，因此继承了<code v-pre>a</code>对象的构造函数<code v-pre>A</code>。</p>
<h3 id="_4、object-prototype-isprototypeof-判断某个对象是否为参数对象的原型" tabindex="-1"><a class="header-anchor" href="#_4、object-prototype-isprototypeof-判断某个对象是否为参数对象的原型" aria-hidden="true">#</a> 4、Object.prototype.isPrototypeOf()判断某个对象是否为参数对象的原型</h3>
<p>实例对象的<code v-pre>isPrototypeOf</code>方法，用来<strong>判断该对象是否为参数对象的原型</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var o1 = {};
var o2 = Object.create(o1);
var o3 = Object.create(o2);

o2.isPrototypeOf(o3) // true  判断o2是否为o3的原型
o1.isPrototypeOf(o3) // true  判断o1是否为o3的原型
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>o1</code>和<code v-pre>o2</code>都是<code v-pre>o3</code>的原型。这表明只要实例对象处在参数对象的原型链上，<code v-pre>isPrototypeOf</code>方法都返回<code v-pre>true</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Object.prototype.isPrototypeOf({}) // true
Object.prototype.isPrototypeOf([]) // true
Object.prototype.isPrototypeOf(/xyz/) // true
Object.prototype.isPrototypeOf(Object.create(null)) // false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，由于<code v-pre>Object.prototype</code>处于原型链的最顶端，所以对各种实例都返回<code v-pre>true</code>，只有直接继承自<code v-pre>null</code>的对象除外。</p>
<h3 id="_5、object-prototype-proto-返回该对象的原型-可读写" tabindex="-1"><a class="header-anchor" href="#_5、object-prototype-proto-返回该对象的原型-可读写" aria-hidden="true">#</a> 5、Object.prototype.__proto__ 返回该对象的原型，可读写</h3>
<p>实例对象的<code v-pre>__proto__</code><strong>属性</strong>（前后各两个下划线），<strong>返回该对象的原型。该属性可读写</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = Object.create({x:1}) // 创建实例对象obj，其原型指定为{x:1}
obj.__proto__ // {x: 1}  实例对象obj的__proto__属性，返回obj的原型
Object.getPrototypeOf(obj) // {x: 1}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码通过<code v-pre>Object.create</code>创建实例对象obj，指定其原型为<code v-pre>{x:1}</code>，访问obj对象的<code v-pre>__proto__</code>属性，返回其原型。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = {};
var p = {};

obj.__proto__ = p; // 原型属性可读写
Object.getPrototypeOf(obj) === p // true
obj.__proto__ === Object.getPrototypeOf(obj) //true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码通过<code v-pre>__proto__</code>属性，将<code v-pre>p</code>对象设为<code v-pre>obj</code>对象的原型。</p>
<p>根据语言标准，<code v-pre>__proto__</code>属性只有浏览器才需要部署，其他环境可以没有这个属性。它前后的两根下划线，表明它本质是一个内部属性，不应该对使用者暴露。<strong>因此，应该尽量少用这个属性，而是用<code v-pre>Object.getPrototypeOf()</code>和<code v-pre>Object.setPrototypeOf()</code>，进行原型对象的读写操作</strong>。</p>
<p>原型链可以用<code v-pre>__proto__</code>很直观地表示。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var A = {
  name: '张三'
};
var B = {
  name: '李四'
};

var proto = {
  print: function () {
    console.log(this.name);
  }
};

A.__proto__ = proto; // 将A的原型指向proto对象
B.__proto__ = proto; // 将B的原型指向proto对象

// 共享print方法，都是在调用proto对象内的print方法
A.print() // 张三
B.print() // 李四

A.print === B.print // true
A.print === proto.print // true
B.print === proto.print // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>A</code>对象和<code v-pre>B</code>对象的原型都是<code v-pre>proto</code>对象，它们都共享<code v-pre>proto</code>对象的<code v-pre>print</code>方法。也就是说，<code v-pre>A</code>和<code v-pre>B</code>的<code v-pre>print</code>方法，都是在调用<code v-pre>proto</code>对象的<code v-pre>print</code>方法。</p>
<h3 id="_6、获取原型对象方法的比较" tabindex="-1"><a class="header-anchor" href="#_6、获取原型对象方法的比较" aria-hidden="true">#</a> 6、获取原型对象方法的比较</h3>
<p>如前所述，<code v-pre>__proto__</code>属性指向当前对象的原型对象，即构造函数的<code v-pre>prototype</code>属性。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var obj = new Object();

obj.__proto__ === Object.prototype
// true
obj.__proto__ === obj.constructor.prototype
// true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码首先新建了一个对象<code v-pre>obj</code>，它的<code v-pre>__proto__</code>属性，指向构造函数（<code v-pre>Object</code>或<code v-pre>obj.constructor</code>）的<code v-pre>prototype</code>属性。</p>
<p>因此，获取实例对象<code v-pre>obj</code>的原型对象，有三种方法。</p>
<ul>
<li><code v-pre>obj.__proto__</code></li>
<li><code v-pre>obj.constructor.prototype</code></li>
<li><code v-pre>Object.getPrototypeOf(obj)</code></li>
</ul>
<p>上面三种方法之中，前两种都不是很可靠。<code v-pre>__proto__</code>属性只有浏览器才需要部署，其他环境可以不部署。而<code v-pre>obj.constructor.prototype</code>在手动改变原型对象时，可能会失效。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var P = function () {};
var p = new P();

var C = function () {};
C.prototype = p;
var c = new C();

c.constructor.prototype === p // false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，构造函数<code v-pre>C</code>的原型对象被改成了<code v-pre>p</code>，但是实例对象的<code v-pre>c.constructor.prototype</code>却没有指向<code v-pre>p</code>。所以，在改变原型对象时，一般要同时设置<code v-pre>constructor</code>属性。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>C.prototype = p;
C.prototype.constructor = C; // 如在构造函数的继承中就使用到这个操作

var c = new C();
c.constructor.prototype === p // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，<strong>推荐使用第三种<code v-pre>Object.getPrototypeOf</code>方法，获取原型对象</strong>。</p>
<h3 id="_7、object-getownpropertynames" tabindex="-1"><a class="header-anchor" href="#_7、object-getownpropertynames" aria-hidden="true">#</a> 7、Object.getOwnPropertyNames()</h3>
<p><code v-pre>Object.getOwnPropertyNames</code>方法<strong>返回一个数组，成员是参数对象本身的所有属性的键名，不包含继承的属性键名</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Object.getOwnPropertyNames(Date)
// [&quot;parse&quot;, &quot;arguments&quot;, &quot;UTC&quot;, &quot;caller&quot;, &quot;name&quot;, &quot;prototype&quot;, &quot;now&quot;, &quot;length&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>Object.getOwnPropertyNames</code>方法返回<code v-pre>Date</code>所有自身的属性名。</p>
<p>对象本身的属性之中，有的是可以遍历的（enumerable），有的是不可以遍历的。<code v-pre>Object.getOwnPropertyNames</code>方法返回所有键名，不管是否可以遍历。只获取那些可以遍历的属性，使用<code v-pre>Object.keys</code>方法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Object.keys(Date) // []
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码表明，<code v-pre>Date</code>对象所有自身的属性，都是不可以遍历的。</p>
<h3 id="_8、object-prototype-hasownproperty" tabindex="-1"><a class="header-anchor" href="#_8、object-prototype-hasownproperty" aria-hidden="true">#</a> 8、Object.prototype.hasOwnProperty()</h3>
<p>对象实例的<code v-pre>hasOwnProperty</code>方法返回一个布尔值，用于<strong>判断某个属性定义在对象自身，还是定义在原型链上</strong>。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Date.hasOwnProperty('length') // true
Date.hasOwnProperty('toString') // false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码表明，<code v-pre>Date.length</code>（构造函数<code v-pre>Date</code>可以接受多少个参数）是<code v-pre>Date</code>自身的属性，<code v-pre>Date.toString</code>是继承的属性。</p>
<p>另外，<code v-pre>hasOwnProperty</code>方法是 JavaScript 之中唯一一个处理对象属性时，不会遍历原型链的方法。</p>
<h3 id="_9、in-运算符和-for-in-循环" tabindex="-1"><a class="header-anchor" href="#_9、in-运算符和-for-in-循环" aria-hidden="true">#</a> 9、in 运算符和 for...in 循环</h3>
<p><code v-pre>in</code>运算符<strong>返回一个布尔值，表示一个对象是否具有某个属性</strong>。它不区分该属性是对象自身的属性，还是继承的属性。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'length' in Date // true
'toString' in Date // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>in</code>运算符常用于检查一个属性是否存在。</p>
<p>获得对象的所有可遍历属性（不管是自身的还是继承的），可以使用<code v-pre>for...in</code>循环。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var o1 = { p1: 123 };

var o2 = Object.create(o1, { // o2的原型指向o1，并且在o2上定义一个属性p2
  p2: { value: &quot;abc&quot;, enumerable: true }
});

for (p in o2) {
  console.info(p);
}
// p2
// p1    继承的属性
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，对象<code v-pre>o2</code>的<code v-pre>p2</code>属性是自身的，<code v-pre>p1</code>属性是继承的。这两个属性都会被<code v-pre>for...in</code>循环遍历。</p>
<p>为了在<code v-pre>for...in</code>循环中获得对象自身的属性，可以采用<code v-pre>hasOwnProperty</code>方法判断一下。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>for ( var name in object ) {
  if ( object.hasOwnProperty(name) ) { // 过滤掉非自身的属性
    /* loop code */
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>获得对象的所有属性（不管是自身的还是继承的，也不管是否可枚举）</strong>，可以使用下面的函数。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function inheritedPropertyNames(obj) {
  var props = {};
  while(obj) {
     // 获取obj对象的所有属性，包括不可枚举的，
    Object.getOwnPropertyNames(obj).forEach(function(p) {
      props[p] = true;
    });
    obj = Object.getPrototypeOf(obj); // 获取对象的原型
  }
    console.log(props)
  return Object.getOwnPropertyNames(props);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码依次获取<code v-pre>obj</code>对象的每一级原型对象“自身”的属性，从而获取<code v-pre>obj</code>对象的“所有”属性，不管是否可遍历。</p>
<p>下面是一个例子，列出<code v-pre>Date</code>对象的所有属性。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>inheritedPropertyNames(Date)
// [
//  &quot;caller&quot;,
//  &quot;constructor&quot;,
//  &quot;toString&quot;,
//  &quot;UTC&quot;,
//  ...
// ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_10、对象的拷贝" tabindex="-1"><a class="header-anchor" href="#_10、对象的拷贝" aria-hidden="true">#</a> 10、对象的拷贝</h3>
<p>如果要拷贝一个对象，需要做到下面两件事情。</p>
<ul>
<li>确保拷贝后的对象，与原对象具有同样的原型。</li>
<li>确保拷贝后的对象，与原对象具有同样的实例属性。</li>
</ul>
<p>下面就是根据上面两点，实现的对象拷贝函数。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function copyObject(orig) { // 拷贝对象函数
    // 创建一个新对象，新对象的原型指向旧对象的原型
  var copy = Object.create(Object.getPrototypeOf(orig));
  copyOwnPropertiesFrom(copy, orig);
  return copy;
}

function copyOwnPropertiesFrom(target, source) { // 拷贝旧对象的实例属性
  Object
    .getOwnPropertyNames(source)
    .forEach(function (propKey) {
      // 获取每个属性的 属性描述对象
      var desc = Object.getOwnPropertyDescriptor(source, propKey);
      // 定义属性，给target对象定义propKey属性，其属性描述对象是desc
      Object.defineProperty(target, propKey, desc);
    });
  return target;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另一种更简单的写法，是利用 ES2017 才引入标准的<code v-pre>Object.getOwnPropertyDescriptors</code>方法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function copyObject(orig) {
  return Object.create(
    Object.getPrototypeOf(orig),
    Object.getOwnPropertyDescriptors(orig)
  );
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="五、严格模式" tabindex="-1"><a class="header-anchor" href="#五、严格模式" aria-hidden="true">#</a> 五、严格模式</h2>
<p>除了正常的运行模式，JavaScript 还有第二种运行模式：严格模式（strict mode）。顾名思义，这种模式采用更加严格的 JavaScript 语法。</p>
<p>同样的代码，在正常模式和严格模式中，可能会有不一样的运行结果。一些在正常模式下可以运行的语句，在严格模式下将不能运行。</p>
<h3 id="_1、设计目的" tabindex="-1"><a class="header-anchor" href="#_1、设计目的" aria-hidden="true">#</a> 1、设计目的</h3>
<p>早期的 JavaScript 语言有很多设计不合理的地方，但是为了兼容以前的代码，又不能改变老的语法，只能不断添加新的语法，引导程序员使用新语法。</p>
<p>严格模式是从 ES5 进入标准的，主要目的有以下几个。</p>
<ul>
<li>明确禁止一些不合理、不严谨的语法，减少 JavaScript 语言的一些怪异行为。</li>
<li>增加更多报错的场合，消除代码运行的一些不安全之处，保证代码运行的安全。</li>
<li>提高编译器效率，增加运行速度。</li>
<li>为未来新版本的 JavaScript 语法做好铺垫。</li>
</ul>
<p>总之，严格模式体现了 JavaScript 更合理、更安全、更严谨的发展方向。</p>
<h3 id="_2、启用方法" tabindex="-1"><a class="header-anchor" href="#_2、启用方法" aria-hidden="true">#</a> 2、启用方法</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'use strict';
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>更多关于严格模式内容：<a href="https://wangdoc.com/javascript/oop/strict.html" target="_blank" rel="noopener noreferrer">https://wangdoc.com/javascript/oop/strict.html</a></p>
</blockquote>
<h2 id="文档" tabindex="-1"><a class="header-anchor" href="#文档" aria-hidden="true">#</a> 文档</h2>
<p>学习文档：<a href="https://wangdoc.com/javascript/" target="_blank" rel="noopener noreferrer">https://wangdoc.com/javascript/</a></p>
</div></template>
