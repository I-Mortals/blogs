<template><div><h1 id="异步遍历器" tabindex="-1"><a class="header-anchor" href="#异步遍历器" aria-hidden="true">#</a> 异步遍历器</h1>
<h2 id="同步遍历器的问题" tabindex="-1"><a class="header-anchor" href="#同步遍历器的问题" aria-hidden="true">#</a> 同步遍历器的问题</h2>
<p>《遍历器》一章说过，Iterator 接口是一种数据遍历的协议，只要调用遍历器对象的<code v-pre>next</code>方法，就会得到一个对象，表示当前遍历指针所在的那个位置的信息。<code v-pre>next</code>方法返回的对象的结构是<code v-pre>{value, done}</code>，其中<code v-pre>value</code>表示当前的数据的值，<code v-pre>done</code>是一个布尔值，表示遍历是否结束。</p>
<!-- more -->
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function idMaker() {
  let index = 0;

  return {
    next: function() {
      return { value: index++, done: false };
    }
  };
}

const it = idMaker();

it.next().value // 0
it.next().value // 1
it.next().value // 2
// ...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，变量<code v-pre>it</code>是一个遍历器（iterator）。每次调用<code v-pre>it.next()</code>方法，就返回一个对象，表示当前遍历位置的信息。</p>
<p>这里隐含着一个规定，<code v-pre>it.next()</code>方法必须是同步的，只要调用就必须立刻返回值。也就是说，一旦执行<code v-pre>it.next()</code>方法，就必须同步地得到<code v-pre>value</code>和<code v-pre>done</code>这两个属性。如果遍历指针正好指向同步操作，当然没有问题，但对于异步操作，就不太合适了。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function idMaker() {
  let index = 0;

  return {
    next: function() {
      return new Promise(function (resolve, reject) {
        setTimeout(() =&gt; {
          resolve({ value: index++, done: false });
        }, 1000);
      });
    }
  };
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>next()</code>方法返回的是一个 Promise 对象，这样就不行，不符合 Iterator 协议，只要代码里面包含异步操作都不行。也就是说，Iterator 协议里面<code v-pre>next()</code>方法只能包含同步操作。</p>
<p>目前的解决方法是，将异步操作包装成 Thunk 函数或者 Promise 对象，即<code v-pre>next()</code>方法返回值的<code v-pre>value</code>属性是一个 Thunk 函数或者 Promise 对象，等待以后返回真正的值，而<code v-pre>done</code>属性则还是同步产生的。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function idMaker() {
  let index = 0;

  return {
    next: function() {
      return {
        value: new Promise(resolve =&gt; setTimeout(() =&gt; resolve(index++), 1000)),
        done: false
      };
    }
  };
}

const it = idMaker();

it.next().value.then(o =&gt; console.log(o)) // 1
it.next().value.then(o =&gt; console.log(o)) // 2
it.next().value.then(o =&gt; console.log(o)) // 3
// ...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>value</code>属性的返回值是一个 Promise 对象，用来放置异步操作。但是这样写很麻烦，不太符合直觉，语义也比较绕。</p>
<p>ES2018 <a href="https://github.com/tc39/proposal-async-iteration" target="_blank" rel="noopener noreferrer">引入</a>了“异步遍历器”（Async Iterator），为异步操作提供原生的遍历器接口，即<code v-pre>value</code>和<code v-pre>done</code>这两个属性都是异步产生。</p>
<h2 id="异步遍历的接口" tabindex="-1"><a class="header-anchor" href="#异步遍历的接口" aria-hidden="true">#</a> 异步遍历的接口</h2>
<p>异步遍历器的最大的语法特点，就是调用遍历器的<code v-pre>next</code>方法，返回的是一个 Promise 对象。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>asyncIterator
  .next()
  .then(
    ({ value, done }) =&gt; /* ... */
  );
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>asyncIterator</code>是一个异步遍历器，调用<code v-pre>next</code>方法以后，返回一个 Promise 对象。因此，可以使用<code v-pre>then</code>方法指定，这个 Promise 对象的状态变为<code v-pre>resolve</code>以后的回调函数。回调函数的参数，则是一个具有<code v-pre>value</code>和<code v-pre>done</code>两个属性的对象，这个跟同步遍历器是一样的。</p>
<p>我们知道，一个对象的同步遍历器的接口，部署在<code v-pre>Symbol.iterator</code>属性上面。同样地，对象的异步遍历器接口，部署在<code v-pre>Symbol.asyncIterator</code>属性上面。不管是什么样的对象，只要它的<code v-pre>Symbol.asyncIterator</code>属性有值，就表示应该对它进行异步遍历。</p>
<p>下面是一个异步遍历器的例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const asyncIterable = createAsyncIterable(['a', 'b']);
const asyncIterator = asyncIterable[Symbol.asyncIterator]();

asyncIterator
.next()
.then(iterResult1 =&gt; {
  console.log(iterResult1); // { value: 'a', done: false }
  return asyncIterator.next();
})
.then(iterResult2 =&gt; {
  console.log(iterResult2); // { value: 'b', done: false }
  return asyncIterator.next();
})
.then(iterResult3 =&gt; {
  console.log(iterResult3); // { value: undefined, done: true }
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，异步遍历器其实返回了两次值。第一次调用的时候，返回一个 Promise 对象；等到 Promise 对象<code v-pre>resolve</code>了，再返回一个表示当前数据成员信息的对象。这就是说，异步遍历器与同步遍历器最终行为是一致的，只是会先返回 Promise 对象，作为中介。</p>
<p>由于异步遍历器的<code v-pre>next</code>方法，返回的是一个 Promise 对象。因此，可以把它放在<code v-pre>await</code>命令后面。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>async function f() {
  const asyncIterable = createAsyncIterable(['a', 'b']);
  const asyncIterator = asyncIterable[Symbol.asyncIterator]();
  console.log(await asyncIterator.next());
  // { value: 'a', done: false }
  console.log(await asyncIterator.next());
  // { value: 'b', done: false }
  console.log(await asyncIterator.next());
  // { value: undefined, done: true }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>next</code>方法用<code v-pre>await</code>处理以后，就不必使用<code v-pre>then</code>方法了。整个流程已经很接近同步处理了。</p>
<p>注意，异步遍历器的<code v-pre>next</code>方法是可以连续调用的，不必等到上一步产生的 Promise 对象<code v-pre>resolve</code>以后再调用。这种情况下，<code v-pre>next</code>方法会累积起来，自动按照每一步的顺序运行下去。下面是一个例子，把所有的<code v-pre>next</code>方法放在<code v-pre>Promise.all</code>方法里面。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const asyncIterable = createAsyncIterable(['a', 'b']);
const asyncIterator = asyncIterable[Symbol.asyncIterator]();
const [{value: v1}, {value: v2}] = await Promise.all([
  asyncIterator.next(), asyncIterator.next()
]);

console.log(v1, v2); // a b
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另一种用法是一次性调用所有的<code v-pre>next</code>方法，然后<code v-pre>await</code>最后一步操作。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>async function runner() {
  const writer = openFile('someFile.txt');
  writer.next('hello');
  writer.next('world');
  await writer.return();
}

runner();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="for-await-of" tabindex="-1"><a class="header-anchor" href="#for-await-of" aria-hidden="true">#</a> for await...of</h2>
<p>前面介绍过，<code v-pre>for...of</code>循环用于遍历同步的 Iterator 接口。新引入的<code v-pre>for await...of</code>循环，则是用于遍历异步的 Iterator 接口。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>async function f() {
  for await (const x of createAsyncIterable(['a', 'b'])) {
    console.log(x);
  }
}
// a
// b
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>createAsyncIterable()</code>返回一个拥有异步遍历器接口的对象，<code v-pre>for...of</code>循环自动调用这个对象的异步遍历器的<code v-pre>next</code>方法，会得到一个 Promise 对象。<code v-pre>await</code>用来处理这个 Promise 对象，一旦<code v-pre>resolve</code>，就把得到的值（<code v-pre>x</code>）传入<code v-pre>for...of</code>的循环体。</p>
<p><code v-pre>for await...of</code>循环的一个用途，是部署了 asyncIterable 操作的异步接口，可以直接放入这个循环。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let body = '';

async function f() {
  for await(const data of req) body += data;
  const parsed = JSON.parse(body);
  console.log('got', parsed);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>req</code>是一个 asyncIterable 对象，用来异步读取数据。可以看到，使用<code v-pre>for await...of</code>循环以后，代码会非常简洁。</p>
<p>如果<code v-pre>next</code>方法返回的 Promise 对象被<code v-pre>reject</code>，<code v-pre>for await...of</code>就会报错，要用<code v-pre>try...catch</code>捕捉。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>async function () {
  try {
    for await (const x of createRejectingIterable()) {
      console.log(x);
    }
  } catch (e) {
    console.error(e);
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，<code v-pre>for await...of</code>循环也可以用于同步遍历器。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>(async function () {
  for await (const x of ['a', 'b']) {
    console.log(x);
  }
})();
// a
// b
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Node v10 支持异步遍历器，Stream 就部署了这个接口。下面是读取文件的传统写法与异步遍历器写法的差异。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 传统写法
function main(inputFilePath) {
  const readStream = fs.createReadStream(
    inputFilePath,
    { encoding: 'utf8', highWaterMark: 1024 }
  );
  readStream.on('data', (chunk) =&gt; {
    console.log('&gt;&gt;&gt; '+chunk);
  });
  readStream.on('end', () =&gt; {
    console.log('### DONE ###');
  });
}

// 异步遍历器写法
async function main(inputFilePath) {
  const readStream = fs.createReadStream(
    inputFilePath,
    { encoding: 'utf8', highWaterMark: 1024 }
  );

  for await (const chunk of readStream) {
    console.log('&gt;&gt;&gt; '+chunk);
  }
  console.log('### DONE ###');
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="异步-generator-函数" tabindex="-1"><a class="header-anchor" href="#异步-generator-函数" aria-hidden="true">#</a> 异步 Generator 函数</h2>
<p>就像 Generator 函数返回一个同步遍历器对象一样，异步 Generator 函数的作用，是返回一个异步遍历器对象。</p>
<p>在语法上，异步 Generator 函数就是<code v-pre>async</code>函数与 Generator 函数的结合。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>async function* gen() {
  yield 'hello';
}
const genObj = gen();
genObj.next().then(x =&gt; console.log(x));
// { value: 'hello', done: false }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>gen</code>是一个异步 Generator 函数，执行后返回一个异步 Iterator 对象。对该对象调用<code v-pre>next</code>方法，返回一个 Promise 对象。</p>
<p>异步遍历器的设计目的之一，就是 Generator 函数处理同步操作和异步操作时，能够使用同一套接口。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 同步 Generator 函数
function* map(iterable, func) {
  const iter = iterable[Symbol.iterator]();
  while (true) {
    const {value, done} = iter.next();
    if (done) break;
    yield func(value);
  }
}

// 异步 Generator 函数
async function* map(iterable, func) {
  const iter = iterable[Symbol.asyncIterator]();
  while (true) {
    const {value, done} = await iter.next();
    if (done) break;
    yield func(value);
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>map</code>是一个 Generator 函数，第一个参数是可遍历对象<code v-pre>iterable</code>，第二个参数是一个回调函数<code v-pre>func</code>。<code v-pre>map</code>的作用是将<code v-pre>iterable</code>每一步返回的值，使用<code v-pre>func</code>进行处理。上面有两个版本的<code v-pre>map</code>，前一个处理同步遍历器，后一个处理异步遍历器，可以看到两个版本的写法基本上是一致的。</p>
<p>下面是另一个异步 Generator 函数的例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>async function* readLines(path) {
  let file = await fileOpen(path);

  try {
    while (!file.EOF) {
      yield await file.readLine();
    }
  } finally {
    await file.close();
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，异步操作前面使用<code v-pre>await</code>关键字标明，即<code v-pre>await</code>后面的操作，应该返回 Promise 对象。凡是使用<code v-pre>yield</code>关键字的地方，就是<code v-pre>next</code>方法停下来的地方，它后面的表达式的值（即<code v-pre>await file.readLine()</code>的值），会作为<code v-pre>next()</code>返回对象的<code v-pre>value</code>属性，这一点是与同步 Generator 函数一致的。</p>
<p>异步 Generator 函数内部，能够同时使用<code v-pre>await</code>和<code v-pre>yield</code>命令。可以这样理解，<code v-pre>await</code>命令用于将外部操作产生的值输入函数内部，<code v-pre>yield</code>命令用于将函数内部的值输出。</p>
<p>上面代码定义的异步 Generator 函数的用法如下。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>(async function () {
  for await (const line of readLines(filePath)) {
    console.log(line);
  }
})()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>异步 Generator 函数可以与<code v-pre>for await...of</code>循环结合起来使用。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>async function* prefixLines(asyncIterable) {
  for await (const line of asyncIterable) {
    yield '&gt; ' + line;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>异步 Generator 函数的返回值是一个异步 Iterator，即每次调用它的<code v-pre>next</code>方法，会返回一个 Promise 对象，也就是说，跟在<code v-pre>yield</code>命令后面的，应该是一个 Promise 对象。如果像上面那个例子那样，<code v-pre>yield</code>命令后面是一个字符串，会被自动包装成一个 Promise 对象。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function fetchRandom() {
  const url = 'https://www.random.org/decimal-fractions/'
    + '?num=1&amp;dec=10&amp;col=1&amp;format=plain&amp;rnd=new';
  return fetch(url);
}

async function* asyncGenerator() {
  console.log('Start');
  const result = await fetchRandom(); // (A)
  yield 'Result: ' + await result.text(); // (B)
  console.log('Done');
}

const ag = asyncGenerator();
ag.next().then(({value, done}) =&gt; {
  console.log(value);
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>ag</code>是<code v-pre>asyncGenerator</code>函数返回的异步遍历器对象。调用<code v-pre>ag.next()</code>以后，上面代码的执行顺序如下。</p>
<ol>
<li><code v-pre>ag.next()</code>立刻返回一个 Promise 对象。</li>
<li><code v-pre>asyncGenerator</code>函数开始执行，打印出<code v-pre>Start</code>。</li>
<li><code v-pre>await</code>命令返回一个 Promise 对象，<code v-pre>asyncGenerator</code>函数停在这里。</li>
<li>A 处变成 fulfilled 状态，产生的值放入<code v-pre>result</code>变量，<code v-pre>asyncGenerator</code>函数继续往下执行。</li>
<li>函数在 B 处的<code v-pre>yield</code>暂停执行，一旦<code v-pre>yield</code>命令取到值，<code v-pre>ag.next()</code>返回的那个 Promise 对象变成 fulfilled 状态。</li>
<li><code v-pre>ag.next()</code>后面的<code v-pre>then</code>方法指定的回调函数开始执行。该回调函数的参数是一个对象<code v-pre>{value, done}</code>，其中<code v-pre>value</code>的值是<code v-pre>yield</code>命令后面的那个表达式的值，<code v-pre>done</code>的值是<code v-pre>false</code>。</li>
</ol>
<p>A 和 B 两行的作用类似于下面的代码。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>return new Promise((resolve, reject) =&gt; {
  fetchRandom()
  .then(result =&gt; result.text())
  .then(result =&gt; {
     resolve({
       value: 'Result: ' + result,
       done: false,
     });
  });
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果异步 Generator 函数抛出错误，会导致 Promise 对象的状态变为<code v-pre>reject</code>，然后抛出的错误被<code v-pre>catch</code>方法捕获。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>async function* asyncGenerator() {
  throw new Error('Problem!');
}

asyncGenerator()
.next()
.catch(err =&gt; console.log(err)); // Error: Problem!
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，普通的 async 函数返回的是一个 Promise 对象，而异步 Generator 函数返回的是一个异步 Iterator 对象。可以这样理解，async 函数和异步 Generator 函数，是封装异步操作的两种方法，都用来达到同一种目的。区别在于，前者自带执行器，后者通过<code v-pre>for await...of</code>执行，或者自己编写执行器。下面就是一个异步 Generator 函数的执行器。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>async function takeAsync(asyncIterable, count = Infinity) {
  const result = [];
  const iterator = asyncIterable[Symbol.asyncIterator]();
  while (result.length &lt; count) {
    const {value, done} = await iterator.next();
    if (done) break;
    result.push(value);
  }
  return result;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，异步 Generator 函数产生的异步遍历器，会通过<code v-pre>while</code>循环自动执行，每当<code v-pre>await iterator.next()</code>完成，就会进入下一轮循环。一旦<code v-pre>done</code>属性变为<code v-pre>true</code>，就会跳出循环，异步遍历器执行结束。</p>
<p>下面是这个自动执行器的一个使用实例。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>async function f() {
  async function* gen() {
    yield 'a';
    yield 'b';
    yield 'c';
  }

  return await takeAsync(gen());
}

f().then(function (result) {
  console.log(result); // ['a', 'b', 'c']
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>异步 Generator 函数出现以后，JavaScript 就有了四种函数形式：普通函数、async 函数、Generator 函数和异步 Generator 函数。请注意区分每种函数的不同之处。基本上，如果是一系列按照顺序执行的异步操作（比如读取文件，然后写入新内容，再存入硬盘），可以使用 async 函数；如果是一系列产生相同数据结构的异步操作（比如一行一行读取文件），可以使用异步 Generator 函数。</p>
<p>异步 Generator 函数也可以通过<code v-pre>next</code>方法的参数，接收外部传入的数据。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const writer = openFile('someFile.txt');
writer.next('hello'); // 立即执行
writer.next('world'); // 立即执行
await writer.return(); // 等待写入结束
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>openFile</code>是一个异步 Generator 函数。<code v-pre>next</code>方法的参数，向该函数内部的操作传入数据。每次<code v-pre>next</code>方法都是同步执行的，最后的<code v-pre>await</code>命令用于等待整个写入操作结束。</p>
<p>最后，同步的数据结构，也可以使用异步 Generator 函数。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>async function* createAsyncIterable(syncIterable) {
  for (const elem of syncIterable) {
    yield elem;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，由于没有异步操作，所以也就没有使用<code v-pre>await</code>关键字。</p>
<h2 id="yield-语句" tabindex="-1"><a class="header-anchor" href="#yield-语句" aria-hidden="true">#</a> yield* 语句</h2>
<p><code v-pre>yield*</code>语句也可以跟一个异步遍历器。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>async function* gen1() {
  yield 'a';
  yield 'b';
  return 2;
}

async function* gen2() {
  // result 最终会等于 2
  const result = yield* gen1();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>gen2</code>函数里面的<code v-pre>result</code>变量，最后的值是<code v-pre>2</code>。</p>
<p>与同步 Generator 函数一样，<code v-pre>for await...of</code>循环会展开<code v-pre>yield*</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>(async function () {
  for await (const x of gen2()) {
    console.log(x);
  }
})();
// a
// b
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>
