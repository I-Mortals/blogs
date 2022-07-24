<template><div><h1 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> .</h1>
<h3 id="flow概述" tabindex="-1"><a class="header-anchor" href="#flow概述" aria-hidden="true">#</a> Flow概述</h3>
<pre><code>Flow JavaScript的类型检查器
</code></pre>
<blockquote>
<p>Flow是JavaScript代码的静态类型检查器。它可以帮助您提高工作效率。让您的代码更快，更智能，更自信，更大规模。</p>
</blockquote>
<h3 id="开始-命令行工具的使用" tabindex="-1"><a class="header-anchor" href="#开始-命令行工具的使用" aria-hidden="true">#</a> 开始-命令行工具的使用</h3>
<p>安装flow</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>npm i flow-bin -D
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>安装Bable</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>npm i -S babel-cli
npm i -S babel-preset-flow
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>配置package.json：</p>
<p>package.json中的scripts执行flow命令, 转换src/目录下的js代码, 并且输出到lib/目录下</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>···
  &quot;scripts&quot;: {
    &quot;flow&quot;: &quot;flow&quot;,
    &quot;init&quot;: &quot;flow init&quot;,
    &quot;build&quot;: &quot;babel src/ -d lib/&quot;
  }
···
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>新建 <code v-pre>.babelrc</code> 文件，babel的配置文件</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>{
    &quot;presets&quot;: [
        &quot;flow&quot;
    ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行初始化命令,执行完会产生一个  <code v-pre>.flowconfig</code> 文件，配置那需要转换的</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>npm run init
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用npm执行flow命令</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>npm run flow
or
npm run flow --help
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="flow使用" tabindex="-1"><a class="header-anchor" href="#flow使用" aria-hidden="true">#</a> flow使用</h3>
<p>给你的<code v-pre>js</code>文件第一行添加 <code v-pre>// @flow</code> 标记,flow进程才会对该文件进行类型检查
懒人命令，所有文件检测：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>npm run flow check --all
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// @flow

function sum(a: number, b: number):number {// function sum():number{} 返回number类型的值
    return a + b;
}

let val = sum(100, '100')

console.log(val);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行flow后</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>npm run flow        

&gt; flow@1.0.0 flow
&gt; flow

Error ---------------------------------------------------------------------------------------------- src/01-demo.js:7:20

Cannot call `sum` with `'100'` bound to `b` because string [1] is incompatible with number [2]. [incompatible-call]

   src/01-demo.js:7:20
   7| let val = sum(100, '100')
                         ^^^^^ [1]

References:
   src/01-demo.js:3:28
   3| function sum(a: number, b: number):number {
                                 ^^^^^^ [2]

Found 1 error
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="vscode-flow插件-or-ide插件-推荐" tabindex="-1"><a class="header-anchor" href="#vscode-flow插件-or-ide插件-推荐" aria-hidden="true">#</a> VSCode Flow插件 or IDE插件  (推荐)</h3>
<p>名称：<code v-pre>Flow Language Support</code></p>
<h3 id="flow中的类型" tabindex="-1"><a class="header-anchor" href="#flow中的类型" aria-hidden="true">#</a> flow中的类型</h3>
<table>
<thead>
<tr>
<th>类型</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>number</td>
<td>数字、NaN、Infinity都是number类型的数据</td>
</tr>
<tr>
<td>string</td>
<td>字符串</td>
</tr>
<tr>
<td>string</td>
<td>字符串</td>
</tr>
<tr>
<td>null</td>
<td>只有null是null类型的</td>
</tr>
<tr>
<td>void</td>
<td>undefined在flow中的类型就是void</td>
</tr>
<tr>
<td>Array</td>
<td>数组类型，定义的时候需要使用Array这种形式, T为指定的类型，说的是特定类型的数据组成的数组</td>
</tr>
<tr>
<td>Object</td>
<td>对象类型，由于对象比较自由，所以规定对象类型的时候有多种写法</td>
</tr>
<tr>
<td>any</td>
<td>表示任意类型，这个类型尽量少用，但有时又很有用！</td>
</tr>
<tr>
<td>Functions</td>
<td>函数类型</td>
</tr>
<tr>
<td>Maybe</td>
<td>Maybe类型允许我们声明一个包含null和undefined两个潜在类型的值。</td>
</tr>
<tr>
<td>或操作</td>
<td>或操作可以设置一个变量为多种可能的类型 类型1</td>
</tr>
<tr>
<td>类型推断</td>
<td>flow会尝试自行推断某个数据的类型</td>
</tr>
</tbody>
</table>
<h3 id="flow具体详情使用教程点击我" tabindex="-1"><a class="header-anchor" href="#flow具体详情使用教程点击我" aria-hidden="true">#</a> <a href="https://www.bilibili.com/video/BV1784y1c7V9?p=7" target="_blank" rel="noopener noreferrer">Flow具体详情使用教程点击我</a></h3>
</div></template>
