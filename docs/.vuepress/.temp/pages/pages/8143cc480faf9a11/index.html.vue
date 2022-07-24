<template><div><h1 id="new命令原理" tabindex="-1"><a class="header-anchor" href="#new命令原理" aria-hidden="true">#</a> new命令原理</h1>
<p>使用new命令时，它后面的函数依次执行下面的步骤：</p>
<ol>
<li>创建一个空对象，作为将要返回的实例对象。</li>
<li>将这个空对象的原型，指向构造函数的prototype属性。</li>
<li>将这个空对象赋值给函数内部的this关键字。</li>
<li>开始执行构造函数内部的代码。</li>
<li>如果构造函数内有返回值且为对象类型，则返回该对象，否则返回上面创建的实例对象。</li>
</ol>
<!-- more -->
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
  // 执行构造函数，并将context对象赋值给函数内部的this
  var result = constructor.apply(context, args);
  // 如果返回结果是对象，就直接返回，否则返回 context 对象
  return (typeof result === 'object' &amp;&amp; result != null) ? result : context;
}

// 自定义_new2
function _new2(/* 构造函数 */ constructor, /* 构造函数参数 */ params) {
  // 创建一个空对象，并继承构造函数的 prototype 属性
  var context = Object.create(constructor.prototype);
  // 执行构造函数，并将context对象赋值给函数内部的this
  var result = constructor.apply(context, params);
  // 如果返回结果是对象，就直接返回，否则返回 context 对象
  return (typeof result === 'object' &amp;&amp; result != null) ? result : context;
  // （当用户在构造函数内部自定义返回对象的话则使用该对象，否则返回context）
}


// 通过自定义_new 返回实例
var actor = _new(Person, '张三', 28);
console.log(actor.name) // 张三

// 通过自定义_new2 返回实例
var actor2 = _new2(Person, ['李四', 29]);
console.log(actor2.name) // 李四

// 通过new命令 返回实例
var actor3 = new Person('王五',30)
console.log(actor3.name) // 王五
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>
