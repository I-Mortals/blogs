<template><div><h1 id="字符串的扩展" tabindex="-1"><a class="header-anchor" href="#字符串的扩展" aria-hidden="true">#</a> 字符串的扩展</h1>
<p>本章介绍 ES6 对字符串的改造和增强，下一章介绍字符串对象的新增方法。</p>
<h2 id="字符的-unicode-表示法" tabindex="-1"><a class="header-anchor" href="#字符的-unicode-表示法" aria-hidden="true">#</a> 字符的 Unicode 表示法</h2>
<p>ES6 加强了对 Unicode 的支持，允许采用<code v-pre>\uxxxx</code>形式表示一个字符，其中<code v-pre>xxxx</code>表示字符的 Unicode 码点。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>&quot;\u0061&quot;
// &quot;a&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><!-- more -->
<p>但是，这种表示法只限于码点在<code v-pre>\u0000</code>~<code v-pre>\uFFFF</code>之间的字符。超出这个范围的字符，必须用两个双字节的形式表示。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>&quot;\uD842\uDFB7&quot;
// &quot;𠮷&quot;

&quot;\u20BB7&quot;
// &quot; 7&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码表示，如果直接在<code v-pre>\u</code>后面跟上超过<code v-pre>0xFFFF</code>的数值（比如<code v-pre>\u20BB7</code>），JavaScript 会理解成<code v-pre>\u20BB+7</code>。由于<code v-pre>\u20BB</code>是一个不可打印字符，所以只会显示一个空格，后面跟着一个<code v-pre>7</code>。</p>
<p>ES6 对这一点做出了改进，只要将码点放入大括号，就能正确解读该字符。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>&quot;\u{20BB7}&quot;
// &quot;𠮷&quot;

&quot;\u{41}\u{42}\u{43}&quot;
// &quot;ABC&quot;

let hello = 123;
hell\u{6F} // 123

'\u{1F680}' === '\uD83D\uDE80'
// true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，最后一个例子表明，大括号表示法与四字节的 UTF-16 编码是等价的。</p>
<p>有了这种表示法之后，JavaScript 共有 6 种方法可以表示一个字符。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'\z' === 'z'  // true
'\172' === 'z' // true
'\x7A' === 'z' // true
'\u007A' === 'z' // true
'\u{7A}' === 'z' // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="字符串的遍历器接口" tabindex="-1"><a class="header-anchor" href="#字符串的遍历器接口" aria-hidden="true">#</a> 字符串的遍历器接口</h2>
<p>ES6 为字符串添加了遍历器接口（详见《Iterator》一章），使得<strong>字符串可以被<code v-pre>for...of</code>循环遍历</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>for (let codePoint of 'foo') {
  console.log(codePoint)
}
// &quot;f&quot;
// &quot;o&quot;
// &quot;o&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除了遍历字符串，这个遍历器最大的优点是可以识别大于<code v-pre>0xFFFF</code>的码点，传统的<code v-pre>for</code>循环无法识别这样的码点。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let text = String.fromCodePoint(0x20BB7);

for (let i = 0; i &lt; text.length; i++) {
  console.log(text[i]);
}
// &quot; &quot;
// &quot; &quot;

for (let i of text) {
  console.log(i);
}
// &quot;𠮷&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，字符串<code v-pre>text</code>只有一个字符，但是<code v-pre>for</code>循环会认为它包含两个字符（都不可打印），而<code v-pre>for...of</code>循环会正确识别出这一个字符。</p>
<h2 id="直接输入-u-2028-和-u-2029" tabindex="-1"><a class="header-anchor" href="#直接输入-u-2028-和-u-2029" aria-hidden="true">#</a> 直接输入 U+2028 和 U+2029</h2>
<p>JavaScript 字符串允许直接输入字符，以及输入字符的转义形式。举例来说，“中”的 Unicode 码点是 U+4e2d，你可以直接在字符串里面输入这个汉字，也可以输入它的转义形式<code v-pre>\u4e2d</code>，两者是等价的。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>'中' === '\u4e2d' // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>但是，JavaScript 规定有5个字符，不能在字符串里面直接使用，只能使用转义形式。</p>
<ul>
<li>U+005C：反斜杠（reverse solidus)</li>
<li>U+000D：回车（carriage return）</li>
<li>U+2028：行分隔符（line separator）</li>
<li>U+2029：段分隔符（paragraph separator）</li>
<li>U+000A：换行符（line feed）</li>
</ul>
<p>举例来说，字符串里面不能直接包含反斜杠，一定要转义写成<code v-pre>\\</code>或者<code v-pre>\u005c</code>。</p>
<p>这个规定本身没有问题，麻烦在于 JSON 格式允许字符串里面直接使用 U+2028（行分隔符）和 U+2029（段分隔符）。这样一来，服务器输出的 JSON 被<code v-pre>JSON.parse</code>解析，就有可能直接报错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const json = '&quot;\u2028&quot;';
JSON.parse(json); // 可能报错
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>JSON 格式已经冻结（RFC 7159），没法修改了。为了消除这个报错，<a href="https://github.com/tc39/proposal-json-superset" target="_blank" rel="noopener noreferrer">ES2019</a> 允许 JavaScript 字符串直接输入 U+2028（行分隔符）和 U+2029（段分隔符）。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const PS = eval(&quot;'\u2029'&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>根据这个提案，上面的代码不会报错。</p>
<p>注意，模板字符串现在就允许直接输入这两个字符。另外，正则表达式依然不允许直接输入这两个字符，这是没有问题的，因为 JSON 本来就不允许直接包含正则表达式。</p>
<h2 id="json-stringify-的改造" tabindex="-1"><a class="header-anchor" href="#json-stringify-的改造" aria-hidden="true">#</a> JSON.stringify() 的改造</h2>
<p>根据标准，JSON 数据必须是 UTF-8 编码。但是，现在的<code v-pre>JSON.stringify()</code>方法有可能返回不符合 UTF-8 标准的字符串。</p>
<p>具体来说，UTF-8 标准规定，<code v-pre>0xD800</code>到<code v-pre>0xDFFF</code>之间的码点，不能单独使用，必须配对使用。比如，<code v-pre>\uD834\uDF06</code>是两个码点，但是必须放在一起配对使用，代表字符<code v-pre>𝌆</code>。这是为了表示码点大于<code v-pre>0xFFFF</code>的字符的一种变通方法。单独使用<code v-pre>\uD834</code>和<code v-pre>\uDFO6</code>这两个码点是不合法的，或者颠倒顺序也不行，因为<code v-pre>\uDF06\uD834</code>并没有对应的字符。</p>
<p><code v-pre>JSON.stringify()</code>的问题在于，它可能返回<code v-pre>0xD800</code>到<code v-pre>0xDFFF</code>之间的单个码点。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>JSON.stringify('\u{D834}') // &quot;\u{D834}&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>为了确保返回的是合法的 UTF-8 字符，<a href="https://github.com/tc39/proposal-well-formed-stringify" target="_blank" rel="noopener noreferrer">ES2019</a> 改变了<code v-pre>JSON.stringify()</code>的行为。如果遇到<code v-pre>0xD800</code>到<code v-pre>0xDFFF</code>之间的单个码点，或者不存在的配对形式，它会返回转义字符串，留给应用自己决定下一步的处理。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>JSON.stringify('\u{D834}') // &quot;&quot;\\uD834&quot;&quot;
JSON.stringify('\uDF06\uD834') // &quot;&quot;\\udf06\\ud834&quot;&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="模板字符串" tabindex="-1"><a class="header-anchor" href="#模板字符串" aria-hidden="true">#</a> 模板字符串</h2>
<p>传统的 JavaScript 语言，输出模板通常是这样写的（下面使用了 jQuery 的方法）。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>$('#result').append(
  'There are &lt;b&gt;' + basket.count + '&lt;/b&gt; ' +
  'items in your basket, ' +
  '&lt;em&gt;' + basket.onSale +
  '&lt;/em&gt; are on sale!'
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面这种写法相当繁琐不方便，ES6 引入了模板字符串解决这个问题。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>$('#result').append(`
  There are &lt;b&gt;${basket.count}&lt;/b&gt; items
   in your basket, &lt;em&gt;${basket.onSale}&lt;/em&gt;
  are on sale!
`);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 普通字符串
`In JavaScript '\n' is a line-feed.`

// 多行字符串
`In JavaScript this is
 not legal.`

console.log(`string text line 1
string text line 2`);

// 字符串中嵌入变量
let name = &quot;Bob&quot;, time = &quot;today&quot;;
`Hello ${name}, how are you ${time}?`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中的模板字符串，都是用反引号表示。如果在模板字符串中需要使用反引号，则前面要用反斜杠转义。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let greeting = `\`Yo\` World!`;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果使用模板字符串表示多行字符串，所有的空格和缩进都会被保留在输出之中。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>$('#list').html(`
&lt;ul&gt;
  &lt;li&gt;first&lt;/li&gt;
  &lt;li&gt;second&lt;/li&gt;
&lt;/ul&gt;
`);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，所有模板字符串的空格和换行，都是被保留的，比如<code v-pre>&lt;ul&gt;</code>标签前面会有一个换行。如果你不想要这个换行，可以使用<code v-pre>trim</code>方法消除它。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>$('#list').html(`
&lt;ul&gt;
  &lt;li&gt;first&lt;/li&gt;
  &lt;li&gt;second&lt;/li&gt;
&lt;/ul&gt;
`.trim());
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>模板字符串中嵌入变量，需要将变量名写在<code v-pre>${}</code>之中。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function authorize(user, action) {
  if (!user.hasPrivilege(action)) {
    throw new Error(
      // 传统写法为
      // 'User '
      // + user.name
      // + ' is not authorized to do '
      // + action
      // + '.'
      `User ${user.name} is not authorized to do ${action}.`);
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>大括号内部可以放入任意的 JavaScript 表达式，可以进行运算，以及引用对象属性。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let x = 1;
let y = 2;

`${x} + ${y} = ${x + y}`
// &quot;1 + 2 = 3&quot;

`${x} + ${y * 2} = ${x + y * 2}`
// &quot;1 + 4 = 5&quot;

let obj = {x: 1, y: 2};
`${obj.x + obj.y}`
// &quot;3&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>模板字符串之中还能调用函数。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function fn() {
  return &quot;Hello World&quot;;
}

`foo ${fn()} bar`
// foo Hello World bar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果大括号中的值不是字符串，将按照一般的规则转为字符串。比如，大括号中是一个对象，将默认调用对象的<code v-pre>toString</code>方法。</p>
<p>如果模板字符串中的变量没有声明，将报错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 变量place没有声明
let msg = `Hello, ${place}`;
// 报错
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于模板字符串的大括号内部，就是执行 JavaScript 代码，因此如果大括号内部是一个字符串，将会原样输出。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>`Hello ${'World'}`
// &quot;Hello World&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>模板字符串甚至还能嵌套。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const tmpl = addrs =&gt; `
  &lt;table&gt;
  ${addrs.map(addr =&gt; `
    &lt;tr&gt;&lt;td&gt;${addr.first}&lt;/td&gt;&lt;/tr&gt;
    &lt;tr&gt;&lt;td&gt;${addr.last}&lt;/td&gt;&lt;/tr&gt;
  `).join('')}
  &lt;/table&gt;
`;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，模板字符串的变量之中，又嵌入了另一个模板字符串，使用方法如下。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const data = [
    { first: '&lt;Jane&gt;', last: 'Bond' },
    { first: 'Lars', last: '&lt;Croft&gt;' },
];

console.log(tmpl(data));
// &lt;table&gt;
//
//   &lt;tr&gt;&lt;td&gt;&lt;Jane&gt;&lt;/td&gt;&lt;/tr&gt;
//   &lt;tr&gt;&lt;td&gt;Bond&lt;/td&gt;&lt;/tr&gt;
//
//   &lt;tr&gt;&lt;td&gt;Lars&lt;/td&gt;&lt;/tr&gt;
//   &lt;tr&gt;&lt;td&gt;&lt;Croft&gt;&lt;/td&gt;&lt;/tr&gt;
//
// &lt;/table&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果需要引用模板字符串本身，在需要时执行，可以写成函数。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let func = (name) =&gt; `Hello ${name}!`;
func('Jack') // &quot;Hello Jack!&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，模板字符串写成了一个函数的返回值。执行这个函数，就相当于执行这个模板字符串了。</p>
<h2 id="实例-模板编译" tabindex="-1"><a class="header-anchor" href="#实例-模板编译" aria-hidden="true">#</a> 实例：模板编译</h2>
<p>下面，我们来看一个通过模板字符串，生成正式模板的实例。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let template = `
&lt;ul&gt;
  &lt;% for(let i=0; i &lt; data.supplies.length; i++) { %&gt;
    &lt;li&gt;&lt;%= data.supplies[i] %&gt;&lt;/li&gt;
  &lt;% } %&gt;
&lt;/ul&gt;
`;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码在模板字符串之中，放置了一个常规模板。该模板使用<code v-pre>&lt;%...%&gt;</code>放置 JavaScript 代码，使用<code v-pre>&lt;%= ... %&gt;</code>输出 JavaScript 表达式。</p>
<p>怎么编译这个模板字符串呢？</p>
<p>一种思路是将其转换为 JavaScript 表达式字符串。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>echo('&lt;ul&gt;');
for(let i=0; i &lt; data.supplies.length; i++) {
  echo('&lt;li&gt;');
  echo(data.supplies[i]);
  echo('&lt;/li&gt;');
};
echo('&lt;/ul&gt;');
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个转换使用正则表达式就行了。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let evalExpr = /&lt;%=(.+?)%&gt;/g;
let expr = /&lt;%([\s\S]+?)%&gt;/g;

template = template
  .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
  .replace(expr, '`); \n $1 \n  echo(`');

template = 'echo(`' + template + '`);';
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，将<code v-pre>template</code>封装在一个函数里面返回，就可以了。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let script =
`(function parse(data){
  let output = &quot;&quot;;

  function echo(html){
    output += html;
  }

  ${ template }

  return output;
})`;

return script;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将上面的内容拼装成一个模板编译函数<code v-pre>compile</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function compile(template){
  const evalExpr = /&lt;%=(.+?)%&gt;/g;
  const expr = /&lt;%([\s\S]+?)%&gt;/g;

  template = template
    .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
    .replace(expr, '`); \n $1 \n  echo(`');

  template = 'echo(`' + template + '`);';

  let script =
  `(function parse(data){
    let output = &quot;&quot;;

    function echo(html){
      output += html;
    }

    ${ template }

    return output;
  })`;

  return script;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>compile</code>函数的用法如下。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let parse = eval(compile(template));
div.innerHTML = parse({ supplies: [ &quot;broom&quot;, &quot;mop&quot;, &quot;cleaner&quot; ] });
//   &lt;ul&gt;
//     &lt;li&gt;broom&lt;/li&gt;
//     &lt;li&gt;mop&lt;/li&gt;
//     &lt;li&gt;cleaner&lt;/li&gt;
//   &lt;/ul&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="标签模板" tabindex="-1"><a class="header-anchor" href="#标签模板" aria-hidden="true">#</a> 标签模板</h2>
<p>模板字符串的功能，不仅仅是上面这些。它可以紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串。这被称为“标签模板”功能（tagged template）。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>alert`123`
// 等同于
alert(123)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>标签模板其实不是模板，而是函数调用的一种特殊形式</strong>。“标签”指的就是函数，紧跟在后面的模板字符串就是它的参数。</p>
<p>但是，如果模板字符里面有变量，就不是简单的调用了，而是会将模板字符串先处理成多个参数，再调用函数。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let a = 5;
let b = 10;

tag`Hello ${ a + b } world ${ a * b }`;
// 等同于
tag(['Hello ', ' world ', ''], 15, 50);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，模板字符串前面有一个标识名<code v-pre>tag</code>，它是一个函数。整个表达式的返回值，就是<code v-pre>tag</code>函数处理模板字符串后的返回值。</p>
<p>函数<code v-pre>tag</code>依次会接收到多个参数。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function tag(stringArr, value1, value2){
  // ...
}

// 等同于

function tag(stringArr, ...values){
  // ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>tag</code>函数的第一个参数是一个数组，该数组的成员是模板字符串中那些没有变量替换的部分，也就是说，变量替换只发生在数组的第一个成员与第二个成员之间、第二个成员与第三个成员之间，以此类推。</p>
<p><code v-pre>tag</code>函数的其他参数，都是模板字符串各个变量被替换后的值。由于本例中，模板字符串含有两个变量，因此<code v-pre>tag</code>会接受到<code v-pre>value1</code>和<code v-pre>value2</code>两个参数。</p>
<p><code v-pre>tag</code>函数所有参数的实际值如下。</p>
<ul>
<li>第一个参数：<code v-pre>['Hello ', ' world ', '']</code></li>
<li>第二个参数: 15</li>
<li>第三个参数：50</li>
</ul>
<p>也就是说，<code v-pre>tag</code>函数实际上以下面的形式调用。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>tag(['Hello ', ' world ', ''], 15, 50)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们可以按照需要编写<code v-pre>tag</code>函数的代码。下面是<code v-pre>tag</code>函数的一种写法，以及运行结果。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let a = 5;
let b = 10;

function tag(s, v1, v2) {
  console.log(s[0]);
  console.log(s[1]);
  console.log(s[2]);
  console.log(v1);
  console.log(v2);

  return &quot;OK&quot;;
}

tag`Hello ${ a + b } world ${ a * b}`;
// &quot;Hello &quot;
// &quot; world &quot;
// &quot;&quot;
// 15
// 50
// &quot;OK&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面是一个更复杂的例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let total = 30;
let msg = passthru`The total is ${total} (${total*1.05} with tax)`;

function passthru(literals) {
  let result = '';
  let i = 0;

  while (i &lt; literals.length) {
    result += literals[i++];
    if (i &lt; arguments.length) {
      result += arguments[i];
    }
  }

  return result;
}

msg // &quot;The total is 30 (31.5 with tax)&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面这个例子展示了，如何将各个参数按照原来的位置拼合回去。</p>
<p><code v-pre>passthru</code>函数采用 rest 参数的写法如下。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function passthru(literals, ...values) {
  let output = &quot;&quot;;
  let index;
  for (index = 0; index &lt; values.length; index++) {
    output += literals[index] + values[index];
  }

  output += literals[index]
  return output;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>“标签模板”的一个重要应用，就是过滤 HTML 字符串，防止用户输入恶意内容。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let message =
  SaferHTML`&lt;p&gt;${sender} has sent you a message.&lt;/p&gt;`;

function SaferHTML(templateData) {
  let s = templateData[0];
  for (let i = 1; i &lt; arguments.length; i++) {
    let arg = String(arguments[i]);

    // Escape special characters in the substitution.
    s += arg.replace(/&amp;/g, &quot;&amp;amp;&quot;)
            .replace(/&lt;/g, &quot;&amp;lt;&quot;)
            .replace(/&gt;/g, &quot;&amp;gt;&quot;);

    // Don't escape special characters in the template.
    s += templateData[i];
  }
  return s;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>sender</code>变量往往是用户提供的，经过<code v-pre>SaferHTML</code>函数处理，里面的特殊字符都会被转义。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let sender = '&lt;script&gt;alert(&quot;abc&quot;)&lt;/script&gt;'; // 恶意代码
let message = SaferHTML`&lt;p&gt;${sender} has sent you a message.&lt;/p&gt;`;

message
// &lt;p&gt;&amp;lt;script&amp;gt;alert(&quot;abc&quot;)&amp;lt;/script&amp;gt; has sent you a message.&lt;/p&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>标签模板的另一个应用，就是多语言转换（国际化处理）</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>i18n`Welcome to ${siteName}, you are visitor number ${visitorNumber}!`
// &quot;欢迎访问xxx，您是第xxxx位访问者！&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>模板字符串本身并不能取代 Mustache 之类的模板库，因为没有条件判断和循环处理功能，但是通过标签函数，你可以自己添加这些功能。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 下面的hashTemplate函数
// 是一个自定义的模板处理函数
let libraryHtml = hashTemplate`
  &lt;ul&gt;
    #for book in ${myBooks}
      &lt;li&gt;&lt;i&gt;#{book.title}&lt;/i&gt; by #{book.author}&lt;/li&gt;
    #end
  &lt;/ul&gt;
`;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除此之外，你甚至可以使用标签模板，在 JavaScript 语言之中嵌入其他语言。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>jsx`
  &lt;div&gt;
    &lt;input
      ref='input'
      onChange='${this.handleChange}'
      defaultValue='${this.state.value}' /&gt;
      ${this.state.value}
   &lt;/div&gt;
`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码通过<code v-pre>jsx</code>函数，将一个 DOM 字符串转为 React 对象。你可以在 GitHub 找到<code v-pre>jsx</code>函数的<a href="https://gist.github.com/lygaret/a68220defa69174bdec5" target="_blank" rel="noopener noreferrer">具体实现</a>。</p>
<p>下面则是一个假想的例子，通过<code v-pre>java</code>函数，在 JavaScript 代码之中运行 Java 代码。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>java`
class HelloWorldApp {
  public static void main(String[] args) {
    System.out.println(&quot;Hello World!&quot;); // Display the string.
  }
}
`
HelloWorldApp.main();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>模板处理函数的第一个参数（模板字符串数组），还有一个<code v-pre>raw</code>属性。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console.log`123`
// [&quot;123&quot;, raw: Array[1]]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>console.log</code>接受的参数，实际上是一个数组。该数组有一个<code v-pre>raw</code>属性，保存的是转义后的原字符串。</p>
<p>请看下面的例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>tag`First line\nSecond line`

function tag(strings) {
  console.log(strings.raw[0]);
  // strings.raw[0] 为 &quot;First line\\nSecond line&quot;
  // 打印输出 &quot;First line\nSecond line&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>tag</code>函数的第一个参数<code v-pre>strings</code>，有一个<code v-pre>raw</code>属性，也指向一个数组。该数组的成员与<code v-pre>strings</code>数组完全一致。比如，<code v-pre>strings</code>数组是<code v-pre>[&quot;First line\nSecond line&quot;]</code>，那么<code v-pre>strings.raw</code>数组就是<code v-pre>[&quot;First line\\nSecond line&quot;]</code>。两者唯一的区别，就是字符串里面的斜杠都被转义了。比如，strings.raw 数组会将<code v-pre>\n</code>视为<code v-pre>\\</code>和<code v-pre>n</code>两个字符，而不是换行符。这是为了方便取得转义之前的原始模板而设计的。</p>
<h2 id="模板字符串的限制" tabindex="-1"><a class="header-anchor" href="#模板字符串的限制" aria-hidden="true">#</a> 模板字符串的限制</h2>
<p>前面提到标签模板里面，可以内嵌其他语言。但是，模板字符串默认会将字符串转义，导致无法嵌入其他语言。</p>
<p>举例来说，标签模板里面可以嵌入 LaTEX 语言。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function latex(strings) {
  // ...
}

let document = latex`
\newcommand{\fun}{\textbf{Fun!}}  // 正常工作
\newcommand{\unicode}{\textbf{Unicode!}} // 报错
\newcommand{\xerxes}{\textbf{King!}} // 报错

Breve over the h goes \u{h}ere // 报错
`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，变量<code v-pre>document</code>内嵌的模板字符串，对于 LaTEX 语言来说完全是合法的，但是 JavaScript 引擎会报错。原因就在于字符串的转义。</p>
<p>模板字符串会将<code v-pre>\u00FF</code>和<code v-pre>\u{42}</code>当作 Unicode 字符进行转义，所以<code v-pre>\unicode</code>解析时报错；而<code v-pre>\x56</code>会被当作十六进制字符串转义，所以<code v-pre>\xerxes</code>会报错。也就是说，<code v-pre>\u</code>和<code v-pre>\x</code>在 LaTEX 里面有特殊含义，但是 JavaScript 将它们转义了。</p>
<p>为了解决这个问题，ES2018 <a href="https://tc39.github.io/proposal-template-literal-revision/" target="_blank" rel="noopener noreferrer">放松</a>了对标签模板里面的字符串转义的限制。如果遇到不合法的字符串转义，就返回<code v-pre>undefined</code>，而不是报错，并且从<code v-pre>raw</code>属性上面可以得到原始字符串。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function tag(strs) {
  strs[0] === undefined
  strs.raw[0] === &quot;\\unicode and \\u{55}&quot;;
}
tag`\unicode and \u{55}`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，模板字符串原本是应该报错的，但是由于放松了对字符串转义的限制，所以不报错了，JavaScript 引擎将第一个字符设置为<code v-pre>undefined</code>，但是<code v-pre>raw</code>属性依然可以得到原始字符串，因此<code v-pre>tag</code>函数还是可以对原字符串进行处理。</p>
<p>注意，这种对字符串转义的放松，只在标签模板解析字符串时生效，不是标签模板的场合，依然会报错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let bad = `bad escape sequence: \unicode`; // 报错
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>
