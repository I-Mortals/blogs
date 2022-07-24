<template><div><h1 id="dom" tabindex="-1"><a class="header-anchor" href="#dom" aria-hidden="true">#</a> DOM</h1>
<h2 id="一、概述" tabindex="-1"><a class="header-anchor" href="#一、概述" aria-hidden="true">#</a> 一、概述</h2>
<h3 id="_1、dom" tabindex="-1"><a class="header-anchor" href="#_1、dom" aria-hidden="true">#</a> 1、DOM</h3>
<p><strong>DOM 是 JavaScript 操作网页的接口</strong>，全称为“<strong>文档对象模型</strong>”（Document Object Model）。它的<strong>作用</strong>是<strong>将网页转为一个 JavaScript 对象，从而可以用脚本进行各种操作</strong>（比如增删内容）。</p>
<p>浏览器会根据 DOM 模型，将结构化文档（比如 HTML 和 XML）解析成一系列的节点，再由这些节点组成一个树状结构（DOM Tree）。所有的节点和最终的树状结构，都有规范的对外接口。</p>
<p>DOM 只是一个接口规范，可以用各种语言实现。所以严格地说，DOM 不是 JavaScript 语法的一部分，但是 DOM 操作是 JavaScript 最常见的任务，离开了 DOM，JavaScript 就无法控制网页。另一方面，JavaScript 也是最常用于 DOM 操作的语言。后面介绍的就是 JavaScript 对 DOM 标准的实现和用法。</p>
<h3 id="_2、节点" tabindex="-1"><a class="header-anchor" href="#_2、节点" aria-hidden="true">#</a> 2、节点</h3>
<p><strong>DOM 的最小组成单位叫做节点（node）</strong>。文档的树形结构（DOM 树），就是由各种不同类型的节点组成。每个节点可以看作是文档树的一片叶子。</p>
<p>节点的类型有七种。</p>
<ul>
<li><code v-pre>Document</code>：整个文档树的顶层节点</li>
<li><code v-pre>DocumentType</code>：<code v-pre>doctype</code>标签（比如<code v-pre>&lt;!DOCTYPE html&gt;</code>）</li>
<li><code v-pre>Element</code>：网页的各种HTML标签（比如<code v-pre>&lt;body&gt;</code>、<code v-pre> &lt;a&gt; </code>等）</li>
<li><code v-pre>Attribute</code>：网页元素的属性（比如<code v-pre>class=&quot;right&quot;</code>）</li>
<li><code v-pre>Text</code>：标签之间或标签包含的文本</li>
<li><code v-pre>Comment</code>：注释</li>
<li><code v-pre>DocumentFragment</code>：文档的片段</li>
</ul>
<p>浏览器提供一个原生的节点对象<code v-pre>Node</code>，上面这七种节点都继承了<code v-pre>Node</code>，因此具有一些共同的属性和方法。</p>
<h3 id="_3、节点树" tabindex="-1"><a class="header-anchor" href="#_3、节点树" aria-hidden="true">#</a> 3、节点树</h3>
<p>一个文档的所有节点，按照所在的层级，可以抽象成一种树状结构。这种树状结构就是 DOM 树。它有一个顶层节点，下一层都是顶层节点的子节点，然后子节点又有自己的子节点，就这样层层衍生出一个金字塔结构，倒过来就像一棵树。</p>
<p>浏览器原生提供<code v-pre>document</code>节点，代表整个文档。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document
// 整个文档树
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>文档的第一层有两个节点，第一个是文档类型节点（<code v-pre>&lt;!doctype html&gt;</code>），第二个是 HTML 网页的顶层容器标签<code v-pre>&lt;html&gt;</code>。后者构成了树结构的根节点（root node），其他 HTML 标签节点都是它的下级节点。</p>
<p>除了根节点，其他节点都有三种层级关系。</p>
<ul>
<li>父节点关系（parentNode）：直接的那个上级节点</li>
<li>子节点关系（childNodes）：直接的下级节点</li>
<li>同级节点关系（sibling）：拥有同一个父节点的节点</li>
</ul>
<p>DOM 提供操作接口，用来获取这三种关系的节点。比如，子节点接口包括<code v-pre>firstChild</code>（第一个子节点）和<code v-pre>lastChild</code>（最后一个子节点）等属性，同级节点接口包括<code v-pre>nextSibling</code>（紧邻在后的那个同级节点）和<code v-pre>previousSibling</code>（紧邻在前的那个同级节点）属性。</p>
<h2 id="二、node接口" tabindex="-1"><a class="header-anchor" href="#二、node接口" aria-hidden="true">#</a> 二、Node接口</h2>
<p><strong>所有 DOM 节点对象都继承了 Node 接口，拥有一些共同的属性和方法</strong>。这是 DOM 操作的基础。</p>
<h3 id="_1、属性" tabindex="-1"><a class="header-anchor" href="#_1、属性" aria-hidden="true">#</a> 1、属性</h3>
<h4 id="_1-1-node-prototype-nodetype节点类型" tabindex="-1"><a class="header-anchor" href="#_1-1-node-prototype-nodetype节点类型" aria-hidden="true">#</a> 1.1 Node.prototype.nodeType节点类型</h4>
<p><code v-pre>nodeType</code>属性<strong>返回一个整数值，表示节点的类型</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document.nodeType // 9
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码中，文档节点的类型值为9。</p>
<p>Node 对象定义了几个常量，对应这些类型值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document.nodeType === Node.DOCUMENT_NODE // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码中，文档节点的<code v-pre>nodeType</code>属性等于常量<code v-pre>Node.DOCUMENT_NODE</code>。</p>
<p>不同节点的<code v-pre>nodeType</code>属性值和对应的常量如下。</p>
<ul>
<li>文档节点（document）：9，对应常量<code v-pre>Node.DOCUMENT_NODE</code></li>
<li>元素节点（element）：1，对应常量<code v-pre>Node.ELEMENT_NODE</code></li>
<li>属性节点（attr）：2，对应常量<code v-pre>Node.ATTRIBUTE_NODE</code></li>
<li>文本节点（text）：3，对应常量<code v-pre>Node.TEXT_NODE</code></li>
<li>文档片断节点（DocumentFragment）：11，对应常量<code v-pre>Node.DOCUMENT_FRAGMENT_NODE</code></li>
<li>文档类型节点（DocumentType）：10，对应常量<code v-pre>Node.DOCUMENT_TYPE_NODE</code></li>
<li>注释节点（Comment）：8，对应常量<code v-pre>Node.COMMENT_NODE</code></li>
</ul>
<p>确定节点类型时，使用<code v-pre>nodeType</code>属性是常用方法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var node = document.documentElement.firstChild; // 获取到&lt;head&gt;节点
if (node.nodeType === Node.ELEMENT_NODE) {
  console.log('该节点是元素节点');
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-2-node-prototype-nodename节点名称" tabindex="-1"><a class="header-anchor" href="#_1-2-node-prototype-nodename节点名称" aria-hidden="true">#</a> 1.2 Node.prototype.nodeName节点名称</h4>
<p><code v-pre>nodeName</code>属性<strong>返回节点的名称</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML 代码如下
// &lt;div id=&quot;d1&quot;&gt;hello world&lt;/div&gt;
var div = document.getElementById('d1');
div.nodeName // &quot;DIV&quot;

document.nodeName // #document
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，元素节点<code v-pre> &lt;div&gt; </code>的<code v-pre>nodeName</code>属性就是大写的标签名<code v-pre>DIV</code>。</p>
<p>不同节点的<code v-pre>nodeName</code>属性值如下。</p>
<ul>
<li>文档节点（document）：<code v-pre>#document</code></li>
<li>元素节点（element）：大写的标签名，如DIV</li>
<li>属性节点（attr）：属性的名称</li>
<li>文本节点（text）：<code v-pre>#text</code></li>
<li>文档片断节点（DocumentFragment）：<code v-pre>#document-fragment</code></li>
<li>文档类型节点（DocumentType）：文档的类型</li>
<li>注释节点（Comment）：<code v-pre>#comment</code></li>
</ul>
<h4 id="_1-3-node-prototype-nodevalue当前节点文本" tabindex="-1"><a class="header-anchor" href="#_1-3-node-prototype-nodevalue当前节点文本" aria-hidden="true">#</a> 1.3 Node.prototype.nodeValue当前节点文本</h4>
<p><code v-pre>nodeValue</code>属性<strong>返回一个字符串，表示当前节点本身的文本值</strong>，该属性<strong>可读写</strong>。</p>
<p>只有<strong>文本节点（text）、注释节点（comment）和属性节点（attr）有文本值</strong>，因此这三类节点的<code v-pre>nodeValue</code>可以返回结果，其他类型的节点一律返回<code v-pre>null</code>。同样的，也只有这三类节点可以设置<code v-pre>nodeValue</code>属性的值，其他类型的节点设置无效。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML 代码如下
// &lt;div id=&quot;d1&quot;&gt;hello world&lt;/div&gt;
var div = document.getElementById('d1');
div.nodeValue // null
div.firstChild.nodeValue // &quot;hello world&quot;

var textNode = div.firstChild;
console.log(textNode) // 文本节点对象&quot;hello world&quot;
console.log(typeof textNode) // object
console.log(textNode.nodeType) // 3
console.log(textNode.nodeName) // #text
console.log(textNode.nodeValue) // 'hello world'

textNode.nodeValue = '123' // 修改文本
console.log(textNode.nodeValue) // '123'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>div</code>是元素节点，<code v-pre>nodeValue</code>属性返回<code v-pre>null</code>。<code v-pre>div.firstChild</code>是文本节点，所以可以返回文本值。</p>
<h4 id="_1-4-node-prototype-textcontent所有文本内容" tabindex="-1"><a class="header-anchor" href="#_1-4-node-prototype-textcontent所有文本内容" aria-hidden="true">#</a> 1.4 Node.prototype.textContent所有文本内容</h4>
<p><code v-pre>textContent</code>属性<strong>返回当前节点和它的所有后代节点的文本内容</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML 代码为
// &lt;div id=&quot;divA&quot;&gt;This is &lt;span&gt;some&lt;/span&gt; text&lt;/div&gt;

document.getElementById('divA').textContent
// This is some text
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>textContent</code>属性自动忽略当前节点内部的 HTML 标签，返回所有文本内容。</p>
<p>该属性是<strong>可读写</strong>的，设置该属性的值，会用一个新的文本节点，替换所有原来的子节点。它还有一个好处，就是自动对 HTML 标签转义。这很适合用于用户提供的内容。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document.getElementById('foo').textContent = '&lt;p&gt;GoodBye!&lt;/p&gt;'; // 写入文本
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码在插入文本时，<strong>会将<code v-pre> &lt;p&gt; </code>标签解释为文本</strong>，而不会当作标签处理。</p>
<p>对于文本节点（text）、注释节点（comment）和属性节点（attr），<code v-pre>textContent</code>属性的值与<code v-pre>nodeValue</code>属性相同。对于其他类型的节点，该属性会将每个子节点（不包括注释节点）的内容连接在一起返回。如果一个节点没有子节点，则返回空字符串。</p>
<p>文档节点（document）和文档类型节点（doctype）的<code v-pre>textContent</code>属性为<code v-pre>null</code>。如果要<strong>读取整个文档的内容</strong>，可以使用<code v-pre>document.documentElement.textContent</code>。</p>
<h4 id="_1-5-node-prototype-baseuri-获取网页路径" tabindex="-1"><a class="header-anchor" href="#_1-5-node-prototype-baseuri-获取网页路径" aria-hidden="true">#</a> 1.5 Node.prototype.baseURI 获取网页路径</h4>
<p><code v-pre>baseURI</code>属性<strong>返回一个字符串，表示当前网页的绝对路径</strong>。浏览器根据这个属性，计算网页上的相对路径的 URL。该属性为<strong>只读</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 当前网页的网址为
// http://www.example.com/index.html
document.baseURI
// &quot;http://www.example.com/index.html&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果无法读到网页的 URL，<code v-pre>baseURI</code>属性返回<code v-pre>null</code>。</p>
<p>该属性的值一般由当前网址的 URL（即<code v-pre>window.location</code>属性）决定，但是可以使用 HTML 的<code v-pre>&lt;base&gt;</code>标签，改变该属性的值。</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;head&gt;
&lt;base href=&quot;http://www.example.com/page.html&quot;&gt;
&lt;/head&gt;
&lt;script&gt;
    document.baseURI // http://www.example.com/page.html   返回base标签的href值
&lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>设置了以后，<code v-pre>baseURI</code>属性就返回<code v-pre>&lt;base&gt;</code>标签设置的值。</p>
<h4 id="_1-6-node-prototype-ownerdocument顶层文档对象" tabindex="-1"><a class="header-anchor" href="#_1-6-node-prototype-ownerdocument顶层文档对象" aria-hidden="true">#</a> 1.6 Node.prototype.ownerDocument顶层文档对象</h4>
<p><code v-pre>Node.ownerDocument</code>属性<strong>返回当前节点所在的顶层文档对象</strong>，即<code v-pre>document</code>对象。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var d = p.ownerDocument;
d === document // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>document</code>对象本身的<code v-pre>ownerDocument</code>属性，返回<code v-pre>null</code>。</p>
<h4 id="_1-7-node-prototype-nextsibling下一个同级节点" tabindex="-1"><a class="header-anchor" href="#_1-7-node-prototype-nextsibling下一个同级节点" aria-hidden="true">#</a> 1.7 Node.prototype.nextSibling下一个同级节点</h4>
<p><code v-pre>Node.nextSibling</code>属性<strong>返回紧跟在当前节点后面的第一个同级节点</strong>。如果当前节点后面没有同级节点，则返回<code v-pre>null</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML 代码如下
// &lt;div id=&quot;d1&quot;&gt;hello&lt;/div&gt;&lt;div id=&quot;d2&quot;&gt;world&lt;/div&gt;
var d1 = document.getElementById('d1');
var d2 = document.getElementById('d2');

d1.nextSibling === d2 // true  // 如果d1和d2之间有空格，会返回文本节点，内容为空格
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>d1.nextSibling</code>就是紧跟在<code v-pre>d1</code>后面的同级节点<code v-pre>d2</code>。</p>
<p><strong>注意</strong>，该属性还包括文本节点和注释节点（<code v-pre>&lt;!-- comment --&gt;</code>）。因此如果当前节点后面有空格，该属性会返回一个文本节点，内容为空格。</p>
<p><code v-pre>nextSibling</code>属性可以用来遍历所有子节点。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var el = document.getElementById('div1').firstChild;

while (el !== null) {
  console.log(el.nodeName);
  el = el.nextSibling;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码遍历<code v-pre>div1</code>节点的所有子节点。</p>
<h4 id="_1-8-node-prototype-previoussibling上一个同级节点" tabindex="-1"><a class="header-anchor" href="#_1-8-node-prototype-previoussibling上一个同级节点" aria-hidden="true">#</a> 1.8 Node.prototype.previousSibling上一个同级节点</h4>
<p><code v-pre>previousSibling</code>属性<strong>返回当前节点前面的、距离最近的一个同级节点</strong>。如果当前节点前面没有同级节点，则返回<code v-pre>null</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML 代码如下
// &lt;div id=&quot;d1&quot;&gt;hello&lt;/div&gt;&lt;div id=&quot;d2&quot;&gt;world&lt;/div&gt;
var d1 = document.getElementById('d1');
var d2 = document.getElementById('d2');

d2.previousSibling === d1 // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>d2.previousSibling</code>就是<code v-pre>d2</code>前面的同级节点<code v-pre>d1</code>。</p>
<p><strong>注意</strong>，该属性还包括文本节点和注释节点。因此如果当前节点前面有空格，该属性会返回一个文本节点，内容为空格。</p>
<h4 id="_1-9-node-prototype-parentnode父节点" tabindex="-1"><a class="header-anchor" href="#_1-9-node-prototype-parentnode父节点" aria-hidden="true">#</a> 1.9 Node.prototype.parentNode父节点</h4>
<p><code v-pre>parentNode</code>属性<strong>返回当前节点的父节点</strong>。对于一个节点来说，它的父节点只可能是三种类型：元素节点（element）、文档节点（document）和文档片段节点（documentfragment）。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>if (node.parentNode) {
  node.parentNode.removeChild(node); // node的父节点，然后删除子节点node
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，通过<code v-pre>node.parentNode</code>属性将<code v-pre>node</code>节点从文档里面移除。</p>
<p>文档节点（document）和文档片段节点（documentfragment）的父节点都是<code v-pre>null</code>。另外，对于那些生成后还没插入 DOM 树的节点，父节点也是<code v-pre>null</code>。</p>
<h4 id="_1-10-node-prototype-parentelement-父元素节点" tabindex="-1"><a class="header-anchor" href="#_1-10-node-prototype-parentelement-父元素节点" aria-hidden="true">#</a> 1.10 Node.prototype.parentElement 父元素节点</h4>
<p><code v-pre>parentElement</code>属性<strong>返回当前节点的父元素节点</strong>。如果当前节点没有父节点，或者父节点类型不是元素节点，则返回<code v-pre>null</code>。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>if (node.parentElement) {
  node.parentElement.style.color = 'red';
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，父元素节点的样式设定了红色。</p>
<p>由于父节点只可能是三种类型：元素节点、文档节点（document）和文档片段节点（documentfragment）。<code v-pre>parentElement</code>属性相当于把后两种父节点都排除了。</p>
<h4 id="_1-11-node-prototype-firstchild-第一个子节点-node-prototype-lastchild-最后一个子节点" tabindex="-1"><a class="header-anchor" href="#_1-11-node-prototype-firstchild-第一个子节点-node-prototype-lastchild-最后一个子节点" aria-hidden="true">#</a> 1.11 Node.prototype.firstChild 第一个子节点，Node.prototype.lastChild 最后一个子节点</h4>
<p><code v-pre>firstChild</code>属性<strong>返回当前节点的第一个子节点</strong>，如果当前节点没有子节点，则返回<code v-pre>null</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML 代码如下
// &lt;p id=&quot;p1&quot;&gt;&lt;span&gt;First span&lt;/span&gt;&lt;/p&gt;
var p1 = document.getElementById('p1');
p1.firstChild.nodeName // &quot;SPAN&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>p</code>元素的第一个子节点是<code v-pre>span</code>元素。</p>
<p><strong>注意</strong>，<code v-pre>firstChild</code>返回的除了元素节点，<strong>还可能是文本节点或注释节点</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML 代码如下
// &lt;p id=&quot;p1&quot;&gt;
//   &lt;span&gt;First span&lt;/span&gt;
//  &lt;/p&gt;
var p1 = document.getElementById('p1');
p1.firstChild.nodeName // &quot;#text&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>p</code>元素与<code v-pre>span</code>元素之间有空白字符，这导致<code v-pre>firstChild</code>返回的是文本节点。</p>
<p><code v-pre>lastChild</code>属性<strong>返回当前节点的最后一个子节点</strong>，如果当前节点没有子节点，则返回<code v-pre>null</code>。用法与<code v-pre>firstChild</code>属性相同。</p>
<h4 id="_1-12-node-prototype-childnodes-所有子节点-类数组对象-动态集合" tabindex="-1"><a class="header-anchor" href="#_1-12-node-prototype-childnodes-所有子节点-类数组对象-动态集合" aria-hidden="true">#</a> 1.12 Node.prototype.childNodes 所有子节点，类数组对象，动态集合</h4>
<p><code v-pre>childNodes</code>属性<strong>返回一个类似数组的对象</strong>（<code v-pre>NodeList</code>集合），<strong>成员包括当前节点的所有子节点</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var children = document.querySelector('ul').childNodes; // 包含元素节点、文本节点、注释节点
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>children</code>就是<code v-pre>ul</code>元素的所有子节点。</p>
<p>使用该属性，可以遍历某个节点的所有子节点。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var div = document.getElementById('div1');
var children = div.childNodes;

for (var i = 0; i &lt; children.length; i++) {
  // ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>文档节点（document）就有两个子节点：文档类型节点（docType）和 HTML 根元素节点。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var children = document.childNodes;
for (var i = 0; i &lt; children.length; i++) {
  console.log(children[i].nodeType);
}
// 10
// 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，文档节点的第一个子节点的类型是10（即文档类型节点），第二个子节点的类型是1（即元素节点）。</p>
<p><strong>注意</strong>，除了元素节点，<code v-pre>childNodes</code>属性的返回值<strong>还包括文本节点和注释节点</strong>。如果当前节点不包括任何子节点，则返回一个空的<code v-pre>NodeList</code>集合。由于<code v-pre>NodeList</code>对象是一个<strong>动态集合</strong>，一旦子节点发生变化，立刻会反映在返回结果之中。</p>
<h4 id="_1-13-node-prototype-isconnected-是否在文档中-布尔值" tabindex="-1"><a class="header-anchor" href="#_1-13-node-prototype-isconnected-是否在文档中-布尔值" aria-hidden="true">#</a> 1.13 Node.prototype.isConnected 是否在文档中，布尔值</h4>
<p><code v-pre>isConnected</code>属性<strong>返回一个布尔值，表示当前节点是否在文档之中</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var test = document.createElement('p');
test.isConnected // false

document.body.appendChild(test);
test.isConnected // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>test</code>节点是脚本生成的节点，没有插入文档之前，<code v-pre>isConnected</code>属性返回<code v-pre>false</code>，插入之后返回<code v-pre>true</code>。</p>
<h3 id="_2、方法" tabindex="-1"><a class="header-anchor" href="#_2、方法" aria-hidden="true">#</a> 2、方法</h3>
<h4 id="_2-1-node-prototype-appendchild-插入子节点到最后" tabindex="-1"><a class="header-anchor" href="#_2-1-node-prototype-appendchild-插入子节点到最后" aria-hidden="true">#</a> 2.1 Node.prototype.appendChild() 插入子节点到最后</h4>
<p><code v-pre>appendChild()</code>方法<strong>接受一个节点对象作为参数，将其作为最后一个子节点，插入当前节点</strong>。该方法的<strong>返回值就是插入文档的子节点</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var p = document.createElement('p');
document.body.appendChild(p); // 有返回值，为已插入的p节点
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码新建一个<code v-pre> &lt;p&gt; </code>节点，将其插入<code v-pre>document.body</code>的尾部。</p>
<p>如果参数节点是 DOM 已经存在的节点，<code v-pre>appendChild()</code>方法会将其从原来的位置，移动到新位置。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var div = document.getElementById('myDiv');// myDiv是已存在的元素
document.body.appendChild(div); // 插入已存在元素，相当于移动位置
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，插入的是一个已经存在的节点<code v-pre>myDiv</code>，结果就是该节点会从原来的位置，移动到<code v-pre>document.body</code>的尾部。</p>
<p>如果<code v-pre>appendChild()</code>方法的参数是<code v-pre>DocumentFragment</code>节点，那么插入的是<code v-pre>DocumentFragment</code>的所有子节点，而不是<code v-pre>DocumentFragment</code>节点本身。返回值是一个空的<code v-pre>DocumentFragment</code>节点。</p>
<h4 id="_2-2-node-prototype-haschildnodes-是否有子节点-布尔值" tabindex="-1"><a class="header-anchor" href="#_2-2-node-prototype-haschildnodes-是否有子节点-布尔值" aria-hidden="true">#</a> 2.2 Node.prototype.hasChildNodes() 是否有子节点，布尔值</h4>
<p><code v-pre>hasChildNodes</code>方法返回一个<strong>布尔值</strong>，<strong>表示当前节点是否有子节点</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var foo = document.getElementById('foo');

if (foo.hasChildNodes()) {
  foo.removeChild(foo.childNodes[0]);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码表示，如果<code v-pre>foo</code>节点有子节点，就移除第一个子节点。</p>
<p><strong>注意</strong>，<strong>子节点包括所有类型的节点</strong>，并不仅仅是元素节点。哪怕节点只包含一个空格，<code v-pre>hasChildNodes</code>方法也会返回<code v-pre>true</code>。</p>
<p>判断一个节点有没有子节点，有许多种方法，下面是其中的三种。</p>
<ul>
<li><code v-pre>node.hasChildNodes()</code></li>
<li><code v-pre>node.firstChild !== null</code></li>
<li><code v-pre>node.childNodes &amp;&amp; node.childNodes.length &gt; 0</code></li>
</ul>
<p><code v-pre>hasChildNodes</code>方法结合<code v-pre>firstChild</code>属性和<code v-pre>nextSibling</code>属性，可以<strong>遍历当前节点的所有后代节点</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function DOMComb(parent, callback) {
  if (parent.hasChildNodes()) {
    for (var node = parent.firstChild; node; node = node.nextSibling) {
      DOMComb(node, callback);
    }
  }
  callback(parent);
}

// 用法
DOMComb(document.body, console.log)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>DOMComb</code>函数的第一个参数是某个指定的节点，第二个参数是回调函数。这个回调函数会依次作用于指定节点，以及指定节点的所有后代节点。</p>
<h4 id="_2-3-node-prototype-clonenode-boolean-克隆节点" tabindex="-1"><a class="header-anchor" href="#_2-3-node-prototype-clonenode-boolean-克隆节点" aria-hidden="true">#</a> 2.3 Node.prototype.cloneNode(Boolean) 克隆节点</h4>
<p><code v-pre>cloneNode</code>方法用于<strong>克隆一个节点</strong>。<strong>它接受一个布尔值作为参数，表示是否同时克隆子节点</strong>。它的返回值是一个克隆出来的新节点。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var cloneUL = document.querySelector('ul').cloneNode(true);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该方法有一些使用<strong>注意点</strong>。</p>
<p>（1）克隆一个节点，会拷贝该节点的所有属性，但是会丧失<code v-pre>addEventListener</code>方法和<code v-pre>on-</code>属性（即<code v-pre>node.onclick = fn</code>），添加在这个节点上的事件回调函数。</p>
<p>（2）该方法返回的节点不在文档之中，即没有任何父节点，必须使用诸如<code v-pre>Node.appendChild</code>这样的方法添加到文档之中。</p>
<p>（3）克隆一个节点之后，DOM 有可能出现两个有相同<code v-pre>id</code>属性（即<code v-pre>id=&quot;xxx&quot;</code>）的网页元素，这时应该修改其中一个元素的<code v-pre>id</code>属性。如果原节点有<code v-pre>name</code>属性，可能也需要修改。</p>
<h4 id="_2-4-node-prototype-insertbefore-插入节点到指定位置" tabindex="-1"><a class="header-anchor" href="#_2-4-node-prototype-insertbefore-插入节点到指定位置" aria-hidden="true">#</a> 2.4 Node.prototype.insertBefore() 插入节点到指定位置</h4>
<p><code v-pre>insertBefore</code>方法用于<strong>将某个节点插入父节点内部的指定位置</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var insertedNode = parentNode.insertBefore(newNode, referenceNode);
// newNode新节点将插入到parentNode内部的referenceNode节点前面，并返回新节点
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>insertBefore</code>方法接受两个参数，第一个参数是所要插入的节点<code v-pre>newNode</code>，第二个参数是父节点<code v-pre>parentNode</code>内部的一个子节点<code v-pre>referenceNode</code>。<code v-pre>newNode</code>将插在<code v-pre>referenceNode</code>这个子节点的前面。返回值是插入的新节点<code v-pre>newNode</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var p = document.createElement('p');
document.body.insertBefore(p, document.body.firstChild);// 把p节点插入到body内部第一个元素的前面
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，新建一个<code v-pre> &lt;p&gt; </code>节点，插在<code v-pre>document.body.firstChild</code>的前面，也就是成为<code v-pre>document.body</code>的第一个子节点。</p>
<p>如果<code v-pre>insertBefore</code>方法的第二个参数为<code v-pre>null</code>，则新节点将插在当前节点内部的最后位置，即变成最后一个子节点。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var p = document.createElement('p');
document.body.insertBefore(p, null);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>p</code>将成为<code v-pre>document.body</code>的最后一个子节点。这也说明<code v-pre>insertBefore</code>的第二个参数不能省略。</p>
<p><strong>注意</strong>，如果所要插入的节点是当前 DOM 现有的节点，则该节点将从原有的位置移除，插入新的位置。</p>
<p>由于不存在<code v-pre>insertAfter</code>方法，如果新节点要插在父节点的<strong>某个子节点后面</strong>，可以用<code v-pre>insertBefore</code>方法结合<code v-pre>nextSibling</code>属性模拟。</p>
<p><strong>插入到某个子节点后面</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>parent.insertBefore(s1, s2.nextSibling);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>parent</code>是父节点，<code v-pre>s1</code>是一个全新的节点，<code v-pre>s2</code>是可以将<code v-pre>s1</code>节点，插在<code v-pre>s2</code>节点的后面。如果<code v-pre>s2</code>是当前节点的最后一个子节点，则<code v-pre>s2.nextSibling</code>返回<code v-pre>null</code>，这时<code v-pre>s1</code>节点会插在当前节点的最后，变成当前节点的最后一个子节点，等于紧跟在<code v-pre>s2</code>的后面。</p>
<p>如果要插入的节点是<code v-pre>DocumentFragment</code>类型，那么插入的将是<code v-pre>DocumentFragment</code>的所有子节点，而不是<code v-pre>DocumentFragment</code>节点本身。返回值将是一个空的<code v-pre>DocumentFragment</code>节点。</p>
<h4 id="_2-5-node-prototype-removechild-删除子节点-并返回" tabindex="-1"><a class="header-anchor" href="#_2-5-node-prototype-removechild-删除子节点-并返回" aria-hidden="true">#</a> 2.5 Node.prototype.removeChild() 删除子节点，并返回</h4>
<p><code v-pre>removeChild</code>方法<strong>接受一个子节点作为参数，用于从当前节点移除该子节点。返回值是移除的子节点</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var divA = document.getElementById('A');
divA.parentNode.removeChild(divA); // 先获取父节点再调用删除子节点方法，并指定删除的子节点为divA
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码移除了<code v-pre>divA</code>节点。<strong>注意，这个方法是在<code v-pre>divA</code>的父节点上调用的，不是在<code v-pre>divA</code>上调用的。</strong></p>
<p>下面是如何<strong>移除当前节点的所有子节点</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var element = document.getElementById('top');
while (element.firstChild) {
  element.removeChild(element.firstChild);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>被移除的节点依然存在于内存之中</strong>，但不再是 DOM 的一部分。所以，一个节点移除以后，依然可以使用它，比如插入到另一个节点下面。</p>
<p>如果参数节点不是当前节点的子节点，<code v-pre>removeChild</code>方法将报错。</p>
<h4 id="_2-6-node-prototype-replacechild-替换子节点-返回被替换的" tabindex="-1"><a class="header-anchor" href="#_2-6-node-prototype-replacechild-替换子节点-返回被替换的" aria-hidden="true">#</a> 2.6 Node.prototype.replaceChild() 替换子节点，返回被替换的</h4>
<p><code v-pre>replaceChild</code>方法<strong>用于将一个新的节点，替换当前节点的某一个子节点</strong>。<strong>返回被替换的子节点。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var replacedNode = parentNode.replaceChild(newChild, oldChild);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>replaceChild</code>方法接受两个参数，第一个参数<code v-pre>newChild</code>是用来替换的新节点，第二个参数<code v-pre>oldChild</code>是将要替换走的子节点。返回值是替换走的那个节点<code v-pre>oldChild</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var divA = document.getElementById('divA');
var newSpan = document.createElement('span');
newSpan.textContent = 'Hello World!';
divA.parentNode.replaceChild(newSpan, divA);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码是将指定节点<code v-pre>divA</code>替换为新节点<code v-pre>newSpan</code>。</p>
<h4 id="_2-7-node-prototype-contains-参数节点是否为后代节点或当前节点-返回布尔值" tabindex="-1"><a class="header-anchor" href="#_2-7-node-prototype-contains-参数节点是否为后代节点或当前节点-返回布尔值" aria-hidden="true">#</a> 2.7 Node.prototype.contains() 参数节点是否为后代节点或当前节点，返回布尔值</h4>
<p><code v-pre>contains</code>方法<strong>返回一个布尔值，表示参数节点是否满足以下三个条件之一</strong>。</p>
<ul>
<li>参数节点为当前节点。</li>
<li>参数节点为当前节点的子节点。</li>
<li>参数节点为当前节点的后代节点。</li>
</ul>
<p><strong>当前节点中是否包含参数节点</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document.body.contains(node)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码检查参数节点<code v-pre>node</code>，是否包含在当前文档之中。</p>
<p><strong>注意</strong>，当前节点传入<code v-pre>contains</code>方法，返回<code v-pre>true</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>nodeA.contains(nodeA) // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_2-8-node-prototype-comparedocumentposition-和contains方法类似-返回值可算出位置关系" tabindex="-1"><a class="header-anchor" href="#_2-8-node-prototype-comparedocumentposition-和contains方法类似-返回值可算出位置关系" aria-hidden="true">#</a> 2.8 Node.prototype.compareDocumentPosition() 和contains方法类似，返回值可算出位置关系</h4>
<p><code v-pre>compareDocumentPosition</code>方法的用法，<strong>与<code v-pre>contains</code>方法完全一致，返回一个六个比特位的二进制值，表示参数节点与当前节点的关系</strong>。</p>
<table>
<thead>
<tr>
<th style="text-align:left">二进制值</th>
<th style="text-align:left">十进制值</th>
<th style="text-align:left">含义</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">000000</td>
<td style="text-align:left">0</td>
<td style="text-align:left">两个节点相同</td>
</tr>
<tr>
<td style="text-align:left">000001</td>
<td style="text-align:left">1</td>
<td style="text-align:left">两个节点不在同一个文档（即有一个节点不在当前文档）</td>
</tr>
<tr>
<td style="text-align:left">000010</td>
<td style="text-align:left">2</td>
<td style="text-align:left">参数节点在当前节点的前面</td>
</tr>
<tr>
<td style="text-align:left">000100</td>
<td style="text-align:left">4</td>
<td style="text-align:left">参数节点在当前节点的后面</td>
</tr>
<tr>
<td style="text-align:left">001000</td>
<td style="text-align:left">8</td>
<td style="text-align:left">参数节点包含当前节点</td>
</tr>
<tr>
<td style="text-align:left">010000</td>
<td style="text-align:left">16</td>
<td style="text-align:left">当前节点包含参数节点</td>
</tr>
<tr>
<td style="text-align:left">100000</td>
<td style="text-align:left">32</td>
<td style="text-align:left">浏览器内部使用</td>
</tr>
</tbody>
</table>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML 代码如下
// &lt;div id=&quot;mydiv&quot;&gt;
//   &lt;form&gt;&lt;input id=&quot;test&quot; /&gt;&lt;/form&gt;
// &lt;/div&gt;

var div = document.getElementById('mydiv');
var input = document.getElementById('test');

div.compareDocumentPosition(input) // 20 当前节点包含参数节点（16）+ 参数节点在当前节点的后面（4）
input.compareDocumentPosition(div) // 10 参数节点包含当前节点（8）+ 参数节点在当前节点的前面（2）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，节点<code v-pre>div</code>包含节点<code v-pre>input</code>（二进制<code v-pre>010000</code>），而且节点<code v-pre>input</code>在节点<code v-pre>div</code>的后面（二进制<code v-pre>000100</code>），所以第一个<code v-pre>compareDocumentPosition</code>方法返回<code v-pre>20</code>（二进制<code v-pre>010100</code>，即<code v-pre>010000 + 000100</code>），第二个<code v-pre>compareDocumentPosition</code>方法返回<code v-pre>10</code>（二进制<code v-pre>001010</code>）。</p>
<p>由于<code v-pre>compareDocumentPosition</code>返回值的含义，定义在每一个比特位上，所以如果要检查某一种特定的含义，就需要使用比特位运算符。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var head = document.head;
var body = document.body;
if (head.compareDocumentPosition(body) &amp; 4) { // 4表示 参数节点在当前节点的后面
  console.log('文档结构正确');
} else {
  console.log('&lt;body&gt; 不能在 &lt;head&gt; 前面');
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>compareDocumentPosition</code>的返回值与<code v-pre>4</code>（又称掩码）进行与运算（<code v-pre>&amp;</code>），得到一个布尔值，表示<code v-pre>是否在</code>前面。</p>
<h4 id="_2-9-node-prototype-isequalnode-节点是否相等-node-prototype-issamenode-节点是否相同" tabindex="-1"><a class="header-anchor" href="#_2-9-node-prototype-isequalnode-节点是否相等-node-prototype-issamenode-节点是否相同" aria-hidden="true">#</a> 2.9 Node.prototype.isEqualNode() 节点是否相等 Node.prototype.isSameNode() 节点是否相同</h4>
<p><code v-pre>isEqualNode</code>方法<strong>返回一个布尔值，用于检查两个节点是否相等。所谓相等的节点，指的是两个节点的类型相同、属性相同、子节点相同。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var p1 = document.createElement('p');
var p2 = document.createElement('p');

p1.isEqualNode(p2) // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>isSameNode</code>方法<strong>返回一个布尔值，表示两个节点是否为同一个节点</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var p1 = document.createElement('p');
var p2 = document.createElement('p');

p1.isSameNode(p2) // false
p1.isSameNode(p1) // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-10-node-prototype-normalize-将当前节点和它的后代节点-规范化" tabindex="-1"><a class="header-anchor" href="#_2-10-node-prototype-normalize-将当前节点和它的后代节点-规范化" aria-hidden="true">#</a> 2.10 Node.prototype.normalize()  将当前节点和它的后代节点”规范化“</h4>
<p><code v-pre>normalize</code>方法 <strong>将当前节点和它的后代节点”规范化“</strong> 。在一个&quot;规范化&quot;后的DOM树中，不存在一个空的文本节点，或者两个相邻的文本节点。</p>
<p>注1：“空的文本节点”并不包括空白字符(空格，换行等)构成的文本节点。</p>
<p>注2：两个以上相邻文本节点的产生原因包括：</p>
<ol>
<li>通过脚本调用有关的DOM接口进行了文本节点的插入和分割等。</li>
<li>HTML中超长的文本节点会被浏览器自动分割为多个相邻文本节点。</li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var wrapper = document.createElement(&quot;div&quot;);

wrapper.appendChild(document.createTextNode(&quot;Part 1 &quot;));
wrapper.appendChild(document.createTextNode(&quot;Part 2 &quot;));

// 这时(规范化之前),wrapper.childNodes.length === 2
// wrapper.childNodes[0].textContent === &quot;Part 1 &quot;
// wrapper.childNodes[1].textContent === &quot;Part 2 &quot;

wrapper.normalize();
// 现在(规范化之后), wrapper.childNodes.length === 1
// wrapper.childNodes[0].textContent === &quot;Part 1 Part 2&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码使用<code v-pre>normalize</code>方法之前，<code v-pre>wrapper</code>节点有两个毗邻的文本子节点。使用<code v-pre>normalize</code>方法之后，两个文本子节点被合并成一个。</p>
<p>该方法是<code v-pre>Text.splitText</code>的逆方法，可以查看《Text 节点对象》一章，了解更多内容。</p>
<h4 id="_2-11-node-prototype-getrootnode-获取根节点-document" tabindex="-1"><a class="header-anchor" href="#_2-11-node-prototype-getrootnode-获取根节点-document" aria-hidden="true">#</a> 2.11 Node.prototype.getRootNode() 获取根节点（document）</h4>
<p><code v-pre>getRootNode()</code>方法<strong>返回当前节点所在文档的根节点<code v-pre>document</code>，与<code v-pre>ownerDocument</code>属性的作用相同</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document.body.firstChild.getRootNode() === document
// true
document.body.firstChild.getRootNode() === document.body.firstChild.ownerDocument
// true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该方法可用于<code v-pre>document</code>节点自身，这一点与<code v-pre>document.ownerDocument</code>不同。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document.getRootNode() // document
document.ownerDocument // null
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、nodelist-接口-与-htmlcollection-接口-节点的集合" tabindex="-1"><a class="header-anchor" href="#三、nodelist-接口-与-htmlcollection-接口-节点的集合" aria-hidden="true">#</a> 三、NodeList 接口 与 HTMLCollection 接口 （节点的集合）</h2>
<p>节点都是单个对象，有时需要一种数据结构，能够容纳多个节点。DOM 提供两种<strong>节点集合</strong>，用于容纳多个节点：<code v-pre>NodeList</code>和<code v-pre>HTMLCollection</code>。</p>
<p>这两种集合都属于接口规范。许多 DOM 属性和方法，返回的结果是<code v-pre>NodeList</code>实例或<code v-pre>HTMLCollection</code>实例。主要区别是，<strong><code v-pre>NodeList</code>可以包含各种类型的节点，<code v-pre>HTMLCollection</code>只能包含 HTML 元素节点</strong>。</p>
<h3 id="_1、nodelist-接口-各类节点的集合" tabindex="-1"><a class="header-anchor" href="#_1、nodelist-接口-各类节点的集合" aria-hidden="true">#</a> 1、NodeList 接口 （各类节点的集合）</h3>
<h4 id="_1-1-概述" tabindex="-1"><a class="header-anchor" href="#_1-1-概述" aria-hidden="true">#</a> 1.1 概述</h4>
<p><code v-pre>NodeList</code>实例是一个<strong>类似数组的对象，它的成员是节点对象</strong>。通过以下方法可以得到<code v-pre>NodeList</code>实例。</p>
<ul>
<li><strong><code v-pre>Node.childNodes</code> 属性</strong></li>
<li><strong><code v-pre>document.querySelectorAll()</code>等节点搜索方法</strong></li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document.body.childNodes instanceof NodeList // true

/*
&lt;ul&gt;
    &lt;li&gt;&lt;/li&gt;
    &lt;li&gt;&lt;/li&gt;
    &lt;li&gt;&lt;/li&gt;
&lt;/ul&gt;*/

var $li = document.querySelectorAll('li');
console.log($li) // NodeList(3) [li, li, li]
console.log($li instanceof NodeList) // true

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>NodeList</code>实例很像数组，<strong>可以使用<code v-pre>length</code>属性和<code v-pre>forEach</code>方法</strong>。但是，它不是数组，不能使用<code v-pre>pop</code>或<code v-pre>push</code>之类数组特有的方法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var children = document.body.childNodes;

Array.isArray(children) // false

children.length // 34
children.forEach(console.log)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，NodeList 实例<code v-pre>children</code>不是数组，但是具有<code v-pre>length</code>属性和<code v-pre>forEach</code>方法。</p>
<p>如果<code v-pre>NodeList</code>实例要使用数组方法，<strong>可以将其转为真正的数组</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var children = document.body.childNodes;
var nodeArr = Array.prototype.slice.call(children);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>除了使用<code v-pre>forEach</code>方法遍历 NodeList 实例，<strong>还可以使用<code v-pre>for</code>循环</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var children = document.body.childNodes;

for (var i = 0; i &lt; children.length; i++) {
  var item = children[i];
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，NodeList 实例<strong>可能是动态集合，也可能是静态集合</strong>。所谓动态集合就是一个活的集合，DOM 删除或新增一个相关节点，都会立刻反映在 NodeList 实例。<strong>目前，只有<code v-pre>Node.childNodes</code>返回的是一个动态集合，其他的 NodeList 都是静态集合。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var children = document.body.childNodes;
children.length // 18
document.body.appendChild(document.createElement('p'));
children.length // 19
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，文档增加一个子节点，NodeList 实例<code v-pre>children</code>的<code v-pre>length</code>属性就增加了1。</p>
<h4 id="_1-2-nodelist-prototype-length" tabindex="-1"><a class="header-anchor" href="#_1-2-nodelist-prototype-length" aria-hidden="true">#</a> 1.2 NodeList.prototype.length</h4>
<p><code v-pre>length</code>属性返回 NodeList 实例包含的节点数量。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document.querySelectorAll('xxx').length
// 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>document.querySelectorAll</code>返回一个 NodeList 集合。对于那些不存在的 HTML 标签，<code v-pre>length</code>属性返回<code v-pre>0</code>。</p>
<h4 id="_1-3-nodelist-prototype-foreach" tabindex="-1"><a class="header-anchor" href="#_1-3-nodelist-prototype-foreach" aria-hidden="true">#</a> 1.3 NodeList.prototype.forEach()</h4>
<p><code v-pre>forEach</code>方法用于遍历 NodeList 的所有成员。它接受一个回调函数作为参数，每一轮遍历就执行一次这个回调函数，用法与数组实例的<code v-pre>forEach</code>方法完全一致。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var children = document.body.childNodes;
children.forEach(function f(item, i, list) { // 参数：当前成员、当前索引、NodeList实例
  // ...
}, this); // forEach参数二： 绑定回调函数内部的this，可省略
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，回调函数<code v-pre>f</code>的三个参数依次是<strong>当前成员、位置和当前 NodeList 实例</strong>。<code v-pre>forEach</code>方法的第二个参数，用于绑定回调函数内部的<code v-pre>this</code>，该参数可省略。</p>
<h4 id="_1-4-nodelist-prototype-item-接受一个索引参数-返回该索引上的成员-节点" tabindex="-1"><a class="header-anchor" href="#_1-4-nodelist-prototype-item-接受一个索引参数-返回该索引上的成员-节点" aria-hidden="true">#</a> 1.4 NodeList.prototype.item() 接受一个索引参数，返回该索引上的成员（节点）</h4>
<p><code v-pre>item</code>方法<strong>接受一个整数值作为参数，表示成员的位置，返回该位置上的成员。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document.body.childNodes.item(0)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>item(0)</code>返回第一个成员。</p>
<p>如果参数值大于实际长度，或者索引不合法（比如负数），<code v-pre>item</code>方法返回<code v-pre>null</code>。如果省略参数，<code v-pre>item</code>方法会报错。</p>
<p>所有类似数组的对象，都可以使用方括号运算符取出成员。<strong>一般情况下，都是使用方括号运算符，而不使用<code v-pre>item</code>方法。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document.body.childNodes[0]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_1-5-nodelist-prototype-keys-nodelist-prototype-values-nodelist-prototype-entries-遍历器对象-结合for-of遍历每一个成员的信息" tabindex="-1"><a class="header-anchor" href="#_1-5-nodelist-prototype-keys-nodelist-prototype-values-nodelist-prototype-entries-遍历器对象-结合for-of遍历每一个成员的信息" aria-hidden="true">#</a> 1.5 NodeList.prototype.keys()，NodeList.prototype.values()，NodeList.prototype.entries()  遍历器对象，结合for...of遍历每一个成员的信息</h4>
<p>这三个方法都返回一个 ES6 的遍历器对象，可以通过<code v-pre>for...of</code>循环遍历获取每一个成员的信息。区别在于，<code v-pre>keys()</code>返回<strong>键名</strong>的遍历器，<code v-pre>values()</code>返回<strong>键值</strong>的遍历器，<code v-pre>entries()</code>返回的遍历器<strong>同时包含键名和键值的数组</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var children = document.body.childNodes;

for (var key of children.keys()) {
  console.log(key); // 返回键名
}
// 0
// 1
// 2
// ...

for (var value of children.values()) {
  console.log(value); // 返回键值 (即节点名)
}
// #text
// &lt;script&gt;
// ...

for (var entry of children.entries()) {
  console.log(entry); // 返回键名和键值的数组
}
// Array [ 0, #text ]
// Array [ 1, &lt;script&gt; ]
// ...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、htmlcollection-接口-html元素节点的集合" tabindex="-1"><a class="header-anchor" href="#_2、htmlcollection-接口-html元素节点的集合" aria-hidden="true">#</a> 2、HTMLCollection 接口 （HTML元素节点的集合）</h3>
<h4 id="_2-1-概述" tabindex="-1"><a class="header-anchor" href="#_2-1-概述" aria-hidden="true">#</a> 2.1 概述</h4>
<p><code v-pre>HTMLCollection</code>是一个<strong>节点对象的集合，只能包含元素节点</strong>（element），不能包含其他类型的节点。它的返回值是一个<strong>类似数组的对象</strong>，但是与<code v-pre>NodeList</code>接口不同，<code v-pre>HTMLCollection</code><strong>没有<code v-pre>forEach</code>方法，只能使用<code v-pre>for</code>循环遍历。</strong></p>
<p>返回<code v-pre>HTMLCollection</code>实例的，主要是一些<code v-pre>Document</code>对象的集合属性，比如<code v-pre>document.links</code>、<code v-pre>document.forms</code>、<code v-pre>document.images</code>等。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document.links instanceof HTMLCollection // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>HTMLCollection</code>实例都是<strong>动态集合</strong>，节点的变化会实时反映在集合中。</p>
<p>如果元素节点有<code v-pre>id</code>或<code v-pre>name</code>属性，那么<code v-pre>HTMLCollection</code>实例上面，可以使用<code v-pre>id</code>属性或<code v-pre>name</code>属性引用该节点元素。如果没有对应的节点，则返回<code v-pre>null</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML 代码如下
// &lt;img id=&quot;pic&quot; src=&quot;http://example.com/foo.jpg&quot;&gt;

var pic = document.getElementById('pic');
document.images.pic === pic // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>document.images</code>是一个<code v-pre>HTMLCollection</code>实例，可以通过<code v-pre> &lt;img&gt; </code>元素的<code v-pre>id</code>属性值，从<code v-pre>HTMLCollection</code>实例上取到这个元素。</p>
<h6 id="各js选择器返回的数据对比" tabindex="-1"><a class="header-anchor" href="#各js选择器返回的数据对比" aria-hidden="true">#</a> 各js选择器返回的数据对比</h6>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;ul&gt;
    &lt;li id=&quot;li1&quot;&gt;&lt;/li&gt;
    &lt;li class=&quot;li2&quot;&gt;&lt;/li&gt;
    &lt;li name='liName'&gt;&lt;/li&gt;
 &lt;/ul&gt;

&lt;script&gt;
    var li1 = document.getElementById('li1');
    var li2 = document.querySelector('#li1');

    var li3 = document.getElementsByClassName('li2');
    var li4 = document.getElementsByTagName('li');

    var li5 = document.getElementsByName('liName');
    var li6 = document.querySelectorAll('li');

    console.log(li1) // &lt;li id=&quot;li1&quot;&gt;&lt;/li&gt;
    console.log(li2) // &lt;li id=&quot;li1&quot;&gt;&lt;/li&gt;

    console.log(li3) // HTMLCollection [li.li2]
    console.log(li4) // HTMLCollection(3) [li#li1, li.li2, li, li1: li#li1, liName: li]

    console.log(li5) // NodeList [li]
    console.log(li6) // NodeList(3) [li#li1, li.li2, li]

&lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-2-htmlcollection-prototype-length" tabindex="-1"><a class="header-anchor" href="#_2-2-htmlcollection-prototype-length" aria-hidden="true">#</a> 2.2 HTMLCollection.prototype.length</h4>
<p><code v-pre>length</code>属性返回<code v-pre>HTMLCollection</code>实例包含的成员数量。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document.links.length // 18
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_2-3-htmlcollection-prototype-item-和方括号访问一样" tabindex="-1"><a class="header-anchor" href="#_2-3-htmlcollection-prototype-item-和方括号访问一样" aria-hidden="true">#</a> 2.3 HTMLCollection.prototype.item() 和方括号访问一样</h4>
<p><code v-pre>item</code>方法接受一个整数值作为参数，表示成员的位置，返回该位置上的成员。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var c = document.images;
var img0 = c.item(0);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>item(0)</code>表示返回0号位置的成员。由于方<strong>括号运算符也具有同样作用，而且使用更方便，所以一般情况下，总是使用方括号运算符</strong>。</p>
<p>如果参数值超出成员数量或者不合法（比如小于0），那么<code v-pre>item</code>方法返回<code v-pre>null</code>。</p>
<h4 id="_2-4-htmlcollection-prototype-nameditem-参数为id或name-返回元素节点" tabindex="-1"><a class="header-anchor" href="#_2-4-htmlcollection-prototype-nameditem-参数为id或name-返回元素节点" aria-hidden="true">#</a> 2.4 HTMLCollection.prototype.namedItem() 参数为id或name，返回元素节点</h4>
<p><code v-pre>namedItem</code>方法的<strong>参数是一个字符串，表示<code v-pre>id</code>属性或<code v-pre>name</code>属性的值，返回对应的元素节点</strong>。如果没有对应的节点，则返回<code v-pre>null</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML 代码如下
// &lt;img id=&quot;pic&quot; src=&quot;http://example.com/foo.jpg&quot;&gt;

var pic = document.getElementById('pic');
document.images.namedItem('pic') === pic // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四、parentnode-接口-父节点接口-childnode-接口-子节点接口" tabindex="-1"><a class="header-anchor" href="#四、parentnode-接口-父节点接口-childnode-接口-子节点接口" aria-hidden="true">#</a> 四、ParentNode 接口（父节点接口），ChildNode 接口（子节点接口）</h2>
<p>节点对象除了继承 Node 接口以外，还会继承其他接口。<code v-pre>ParentNode</code>接口<strong>表示当前节点是一个父节点，提供一些处理子节点的方法</strong>。<code v-pre>ChildNode</code>接口<strong>表示当前节点是一个子节点，提供一些相关方法。</strong></p>
<h3 id="_1、parentnode-接口" tabindex="-1"><a class="header-anchor" href="#_1、parentnode-接口" aria-hidden="true">#</a> 1、ParentNode 接口</h3>
<p><strong>如果当前节点是父节点，就会继承<code v-pre>ParentNode</code>接口</strong>。由于只有<strong>元素节点</strong>（element）、<strong>文档节点</strong>（document）和<strong>文档片段节点</strong>（documentFragment）拥有子节点，因此只有这三类节点会继承<code v-pre>ParentNode</code>接口。</p>
<h4 id="_1-1-属性" tabindex="-1"><a class="header-anchor" href="#_1-1-属性" aria-hidden="true">#</a> 1.1 属性</h4>
<h4 id="_1-parentnode-children-返回htmlcollection实例-当前节点的所有元素子节点" tabindex="-1"><a class="header-anchor" href="#_1-parentnode-children-返回htmlcollection实例-当前节点的所有元素子节点" aria-hidden="true">#</a> （1）ParentNode.children  （返回HTMLCollection实例，当前节点的所有元素子节点）</h4>
<p><code v-pre>children</code>属性<strong>返回一个<code v-pre>HTMLCollection</code>实例，成员是当前节点的所有元素子节点</strong>。该属性<strong>只读</strong>。</p>
<p>下面是遍历某个节点的所有元素子节点的示例。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>for (var i = 0; i &lt; el.children.length; i++) {
  // ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，<code v-pre>children</code>属性<strong>只包括元素子节点</strong>，不包括其他类型的子节点（比如文本子节点）。如果没有元素类型的子节点，返回值<code v-pre>HTMLCollection</code>实例的<code v-pre>length</code>属性为<code v-pre>0</code>。</p>
<p>另外，<code v-pre>HTMLCollection</code>是动态集合，会实时反映 DOM 的任何变化。</p>
<h4 id="_2-parentnode-firstelementchild-第一个元素子节点" tabindex="-1"><a class="header-anchor" href="#_2-parentnode-firstelementchild-第一个元素子节点" aria-hidden="true">#</a> （2）ParentNode.firstElementChild 第一个元素子节点</h4>
<p><code v-pre>firstElementChild</code>属性<strong>返回当前节点的第一个元素子节点</strong>。如果没有任何元素子节点，则返回<code v-pre>null</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document.firstElementChild.nodeName
// &quot;HTML&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>document</code>节点的第一个元素子节点是``。</p>
<h4 id="_3-parentnode-lastelementchild-最后一个元素子节点" tabindex="-1"><a class="header-anchor" href="#_3-parentnode-lastelementchild-最后一个元素子节点" aria-hidden="true">#</a> （3）ParentNode.lastElementChild 最后一个元素子节点</h4>
<p><code v-pre>lastElementChild</code>属性<strong>返回当前节点的最后一个元素子节点</strong>，如果不存在任何元素子节点，则返回<code v-pre>null</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document.lastElementChild.nodeName
// &quot;HTML&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>document</code>节点的最后一个元素子节点是``（因为<code v-pre>document</code>只包含这一个元素子节点）。</p>
<h4 id="_4-parentnode-childelementcount-所有元素子节点的数量" tabindex="-1"><a class="header-anchor" href="#_4-parentnode-childelementcount-所有元素子节点的数量" aria-hidden="true">#</a> （4）ParentNode.childElementCount 所有元素子节点的数量</h4>
<p><code v-pre>childElementCount</code>属性<strong>返回一个整数，表示当前节点的所有元素子节点的数目</strong>。如果不包含任何元素子节点，则返回<code v-pre>0</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document.body.childElementCount // 13
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_1-2-方法" tabindex="-1"><a class="header-anchor" href="#_1-2-方法" aria-hidden="true">#</a> 1.2 方法</h4>
<h5 id="parentnode-append-插入子节点于后-parentnode-prepend-插入子节点于前" tabindex="-1"><a class="header-anchor" href="#parentnode-append-插入子节点于后-parentnode-prepend-插入子节点于前" aria-hidden="true">#</a> ParentNode.append() 插入子节点于后，ParentNode.prepend()  插入子节点于前</h5>
<p><code v-pre>append</code>方法<strong>为当前节点追加一个或多个子节点，位置是最后一个元素子节点的后面</strong>。</p>
<p>该方法不仅可以添加元素子节点，还可以添加文本子节点。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var parent = document.body;

// 添加元素子节点
var p = document.createElement('p');
parent.append(p);

// 添加文本子节点
parent.append('Hello');

// 添加多个元素子节点
var p1 = document.createElement('p');
var p2 = document.createElement('p');
parent.append(p1, p2);

// 添加元素子节点和文本子节点
var p = document.createElement('p');
parent.append('Hello', p);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，该方法<strong>没有返回值</strong>。</p>
<p><code v-pre>prepend</code>方法为<strong>当前节点追加一个或多个子节点，位置是第一个元素子节点的前面</strong>。它的用法与<code v-pre>append</code>方法完全一致，也是<strong>没有返回值</strong>。</p>
<h3 id="_2、childnode-接口" tabindex="-1"><a class="header-anchor" href="#_2、childnode-接口" aria-hidden="true">#</a> 2、ChildNode 接口</h3>
<p><strong>如果一个节点有父节点，那么该节点就继承了<code v-pre>ChildNode</code>接口。</strong></p>
<h4 id="_2-1-childnode-remove-移除当前节点" tabindex="-1"><a class="header-anchor" href="#_2-1-childnode-remove-移除当前节点" aria-hidden="true">#</a> 2.1 ChildNode.remove() 移除当前节点</h4>
<p><code v-pre>remove</code>方法用于从父节点<strong>移除当前节点</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>el.remove()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码在 DOM 里面移除了<code v-pre>el</code>节点。</p>
<h4 id="_2-2-childnode-before-插入同级节点于前-childnode-after-插入同级节点于后" tabindex="-1"><a class="header-anchor" href="#_2-2-childnode-before-插入同级节点于前-childnode-after-插入同级节点于后" aria-hidden="true">#</a> 2.2 ChildNode.before() 插入同级节点于前，ChildNode.after() 插入同级节点于后</h4>
<p><code v-pre>before</code>方法用于<strong>在当前节点的前面，插入一个或多个同级节点</strong>。两者拥有相同的父节点。</p>
<p>注意，该方法不仅可以插入元素节点，还可以插入文本节点。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var p = document.createElement('p');
var p1 = document.createElement('p');

// 插入元素节点
el.before(p);

// 插入文本节点
el.before('Hello');

// 插入多个元素节点
el.before(p, p1);

// 插入元素节点和文本节点
el.before(p, 'Hello');
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>after</code>方法用于<strong>在当前节点的后面，插入一个或多个同级节点</strong>，两者拥有相同的父节点。用法与<code v-pre>before</code>方法完全相同。</p>
<h4 id="_2-3-childnode-replacewith-用参数节点替换当前节点" tabindex="-1"><a class="header-anchor" href="#_2-3-childnode-replacewith-用参数节点替换当前节点" aria-hidden="true">#</a> 2.3 ChildNode.replaceWith() 用参数节点替换当前节点</h4>
<p><code v-pre>replaceWith</code>方法**使用参数节点，替换当前节点。**参数可以是元素节点，也可以是文本节点。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var span = document.createElement('span');
el.replaceWith(span);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>el</code>节点将被<code v-pre>span</code>节点替换。</p>
<h2 id="五、document节点" tabindex="-1"><a class="header-anchor" href="#五、document节点" aria-hidden="true">#</a> 五、Document节点</h2>
<h3 id="_1、概述" tabindex="-1"><a class="header-anchor" href="#_1、概述" aria-hidden="true">#</a> 1、概述</h3>
<p><code v-pre>document</code>节点对象<strong>代表整个文档</strong>，每张网页都有自己的<code v-pre>document</code>对象。<code v-pre>window.document</code>属性就指向这个对象。只要浏览器开始载入 HTML 文档，该对象就存在了，可以直接使用。</p>
<p><code v-pre>document</code>对象有不同的办法可以获取。</p>
<ul>
<li>正常的网页，直接使用<code v-pre>document</code>或<code v-pre>window.document</code>。</li>
<li><code v-pre>iframe</code>框架里面的网页，使用<code v-pre>iframe</code>节点的<code v-pre>contentDocument</code>属性。</li>
<li>Ajax 操作返回的文档，使用<code v-pre>XMLHttpRequest</code>对象的<code v-pre>responseXML</code>属性。</li>
<li>内部节点的<code v-pre>ownerDocument</code>属性。</li>
</ul>
<p><code v-pre>document</code>对象<strong>继承了<code v-pre>EventTarget</code>接口、<code v-pre>Node</code>接口、<code v-pre>ParentNode</code>接口</strong>。这意味着，这些接口的方法都可以在<code v-pre>document</code>对象上调用。除此之外，<code v-pre>document</code>对象还有很多自己的属性和方法。</p>
<h3 id="_2、属性" tabindex="-1"><a class="header-anchor" href="#_2、属性" aria-hidden="true">#</a> 2、属性</h3>
<h4 id="_2-1-快捷方式属性-指向文档内部某个节点的快捷方式" tabindex="-1"><a class="header-anchor" href="#_2-1-快捷方式属性-指向文档内部某个节点的快捷方式" aria-hidden="true">#</a> 2.1 快捷方式属性 （指向文档内部某个节点的快捷方式）</h4>
<p><strong>以下属性是指向文档内部的某个节点的快捷方式。</strong></p>
<h5 id="_1-document-defaultview-返回window对象" tabindex="-1"><a class="header-anchor" href="#_1-document-defaultview-返回window对象" aria-hidden="true">#</a> （1）document.defaultView  返回window对象</h5>
<p><code v-pre>document.defaultView</code>属性<strong>返回<code v-pre>document</code>对象所属的<code v-pre>window</code>对象</strong>。如果当前文档不属于<code v-pre>window</code>对象，该属性返回<code v-pre>null</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document.defaultView === window // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="_2-document-doctype-指向-doctype-html" tabindex="-1"><a class="header-anchor" href="#_2-document-doctype-指向-doctype-html" aria-hidden="true">#</a> （2）document.doctype 指向<code v-pre>&lt;!DOCTYPE html&gt;</code></h5>
<p>对于 HTML 文档来说，<code v-pre>document</code>对象<strong>一般有两个子节点</strong>。第一个子节点是<code v-pre>document.doctype</code>，指向<code v-pre>&lt;DOCTYPE&gt;</code>节点，即文档类型（Document Type Declaration，简写DTD）节点。HTML 的文档类型节点，一般写成<code v-pre>&lt;!DOCTYPE html&gt;</code>。如果网页没有声明 DTD，该属性返回<code v-pre>null</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var doctype = document.doctype;
doctype // &quot;&lt;!DOCTYPE html&gt;&quot;
doctype.name // &quot;html&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>document.firstChild</code>通常就返回这个节点。</p>
<h5 id="_3-document-documentelement-返回当前文档的根元素节点-即-html-节点" tabindex="-1"><a class="header-anchor" href="#_3-document-documentelement-返回当前文档的根元素节点-即-html-节点" aria-hidden="true">#</a> （3）document.documentElement 返回当前文档的根元素节点，即&lt;html&gt;节点</h5>
<p><code v-pre>document.documentElement</code>属性<strong>返回当前文档的根元素节点</strong>（root）。它通常是<code v-pre>document</code>节点的第二个子节点，紧跟在<code v-pre>document.doctype</code>节点后面。HTML网页的该属性，一般是<code v-pre>&lt;html&gt;</code>节点。</p>
<h5 id="_4-document-body-指向-body-document-head-指向-head" tabindex="-1"><a class="header-anchor" href="#_4-document-body-指向-body-document-head-指向-head" aria-hidden="true">#</a> （4）document.body 指向&lt;body&gt;，document.head 指向 &lt;head&gt;</h5>
<p><code v-pre>document.body</code>属性指向<code v-pre>&lt;body&gt;</code>节点，<code v-pre>document.head</code>属性指向<code v-pre>&lt;head&gt;</code>节点。</p>
<p>这两个属性<strong>总是存在的</strong>，如果网页源码里面省略了<code v-pre>&lt;head&gt;</code>或<code v-pre>&lt;body&gt;</code>，浏览器会自动创建。另外，这两个属性是<strong>可写的</strong>，如果改写它们的值，相当于移除所有子节点。</p>
<h5 id="_5-document-scrollingelement-返回文档的滚动元素-标准模式-html-兼容模式-body" tabindex="-1"><a class="header-anchor" href="#_5-document-scrollingelement-返回文档的滚动元素-标准模式-html-兼容模式-body" aria-hidden="true">#</a> （5）document.scrollingElement 返回文档的滚动元素（标准模式&lt;html&gt;,兼容模式&lt;body&gt;）</h5>
<p><code v-pre>document.scrollingElement</code>属性<strong>返回文档的滚动元素</strong>。也就是说，当文档整体滚动时，到底是哪个元素在滚动。</p>
<p><strong>标准模式下</strong>，这个属性<strong>返回的文档的根元素<code v-pre>document.documentElement</code>（即<code v-pre>&lt;html&gt;</code>）</strong>。</p>
<p><strong>兼容（quirk）模式下</strong>，<strong>返回的是<code v-pre>&lt;body&gt;</code>元素</strong>，如果该元素不存在，返回<code v-pre>null</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 页面滚动到浏览器顶部
document.scrollingElement.scrollTop = 0;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_6-document-activeelement-返回文档中获取焦点的元素-一般为表单元素-如没有则返回-body-或null" tabindex="-1"><a class="header-anchor" href="#_6-document-activeelement-返回文档中获取焦点的元素-一般为表单元素-如没有则返回-body-或null" aria-hidden="true">#</a> （6）document.activeElement 返回文档中获取焦点的元素，一般为表单元素，如没有则返回&lt;body&gt;或null</h5>
<p><code v-pre>document.activeElement</code>属性<strong>返回获得当前焦点（focus）的 DOM 元素</strong>。通常，这个属性返回的是<code v-pre>&lt;input&gt;</code>、<code v-pre>&lt;textarea&gt;</code>、<code v-pre>&lt;select&gt;</code>等表单元素，如果当前没有焦点元素，返回<code v-pre>&lt;body&gt;</code>元素或<code v-pre>null</code>。</p>
<h5 id="_7-document-fullscreenelement-返回当前以全屏状态展示的-dom-元素" tabindex="-1"><a class="header-anchor" href="#_7-document-fullscreenelement-返回当前以全屏状态展示的-dom-元素" aria-hidden="true">#</a> （7）document.fullscreenElement 返回当前以全屏状态展示的 DOM 元素</h5>
<p><code v-pre>document.fullscreenElement</code>属性<strong>返回当前以全屏状态展示的 DOM 元素</strong>。如果不是全屏状态，该属性返回<code v-pre>null</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>if (document.fullscreenElement.nodeName == 'VIDEO') {
  console.log('全屏播放视频');
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，通过<code v-pre>document.fullscreenElement</code>可以知道<code v-pre> &lt;video&gt; </code>元素有没有处在全屏状态，从而判断用户行为。</p>
<h4 id="_2-2-节点集合属性-文档内部特定元素的集合-返htmlcollection实例" tabindex="-1"><a class="header-anchor" href="#_2-2-节点集合属性-文档内部特定元素的集合-返htmlcollection实例" aria-hidden="true">#</a> 2.2 节点集合属性 （文档内部特定元素的集合，返HTMLCollection实例）</h4>
<p>以下属性<strong>返回一个<code v-pre>HTMLCollection</code>实例</strong>，表示文档内部特定元素的集合。这些集合都是<strong>动态的</strong>，原节点有任何变化，立刻会反映在集合中。</p>
<h5 id="_1-document-links-返回所有含href属性的-a-和-area" tabindex="-1"><a class="header-anchor" href="#_1-document-links-返回所有含href属性的-a-和-area" aria-hidden="true">#</a> （1）document.links 返回所有含href属性的&lt;a&gt;和&lt;area&gt;</h5>
<p><code v-pre>document.links</code>属性<strong>返回当前文档所有设定了<code v-pre>href</code>属性的<code v-pre> &lt;a&gt; </code>及<code v-pre>&lt;area&gt;</code>节点。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 打印文档所有的链接
var links = document.links;
for(var i = 0; i &lt; links.length; i++) {
  console.log(links[i]);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_2-document-forms-返回所有-form-表单节点" tabindex="-1"><a class="header-anchor" href="#_2-document-forms-返回所有-form-表单节点" aria-hidden="true">#</a> （2）document.forms 返回所有&lt;form&gt; 表单节点</h5>
<p><code v-pre>document.forms</code>属性<strong>返回所有<code v-pre>&lt;form&gt;</code>表单节点</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var selectForm = document.forms[0];
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码获取文档第一个表单。</p>
<p>除了使用位置序号，<code v-pre>id</code>属性和<code v-pre>name</code>属性也可以用来引用表单。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>/* HTML 代码如下
  &lt;form name=&quot;foo&quot; id=&quot;bar&quot;&gt;&lt;/form&gt;
*/
document.forms[0] === document.forms.foo // true
document.forms.bar === document.forms.foo // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_3-document-images-返回页面所有-img-图片节点" tabindex="-1"><a class="header-anchor" href="#_3-document-images-返回页面所有-img-图片节点" aria-hidden="true">#</a> （3）document.images 返回页面所有<code v-pre> &lt;img&gt; </code>图片节点</h5>
<p><code v-pre>document.images</code>属性<strong>返回页面所有<code v-pre> &lt;img&gt; </code>图片节点</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var imglist = document.images;

for(var i = 0; i &lt; imglist.length; i++) {
  if (imglist[i].src === 'banner.gif') {
    // ...
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码在所有<code v-pre>img</code>标签中，寻找某张图片。</p>
<h5 id="_4-document-embeds-document-plugins-返回所有-embed-嵌入节点" tabindex="-1"><a class="header-anchor" href="#_4-document-embeds-document-plugins-返回所有-embed-嵌入节点" aria-hidden="true">#</a> （4）document.embeds，document.plugins 返回所有<code v-pre>&lt;embed&gt;</code>嵌入节点</h5>
<p><code v-pre>document.embeds</code>属性和<code v-pre>document.plugins</code>属性，都<strong>返回所有<code v-pre>&lt;embed&gt;</code>节点</strong>。</p>
<h5 id="_5-document-scripts-返回所有-script-节点" tabindex="-1"><a class="header-anchor" href="#_5-document-scripts-返回所有-script-节点" aria-hidden="true">#</a> （5）document.scripts  返回所有<code v-pre> &lt;script&gt; </code>节点</h5>
<p><code v-pre>document.scripts</code>属性<strong>返回所有<code v-pre> &lt;script&gt; </code>节点</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var scripts = document.scripts;
if (scripts.length !== 0 ) {
  console.log('当前网页有脚本');
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_6-document-stylesheets-返回文档内嵌或引入的样式表集合" tabindex="-1"><a class="header-anchor" href="#_6-document-stylesheets-返回文档内嵌或引入的样式表集合" aria-hidden="true">#</a> （6）document.styleSheets 返回文档内嵌或引入的样式表集合</h5>
<p><code v-pre>document.styleSheets</code>属性<strong>返回文档内嵌或引入的样式表集合</strong>，详细介绍请看《CSS 操作》一章。</p>
<h5 id="_7-小结-除了stylesheets属性-其他返回都是htmlcollection实例" tabindex="-1"><a class="header-anchor" href="#_7-小结-除了stylesheets属性-其他返回都是htmlcollection实例" aria-hidden="true">#</a> （7）小结（除了styleSheets属性，其他返回都是HTMLCollection实例）</h5>
<p>除了<code v-pre>document.styleSheets</code>，以上的集合属性返回的都是<code v-pre>HTMLCollection</code>实例。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document.links instanceof HTMLCollection // true
document.images instanceof HTMLCollection // true
document.forms instanceof HTMLCollection // true
document.embeds instanceof HTMLCollection // true
document.scripts instanceof HTMLCollection // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>HTMLCollection</code>实例是<strong>类似数组的对象</strong>，所以这些属性都有<code v-pre>length</code>属性，<strong>都可以使用方括号运算符引用成员</strong>。如果成员有<code v-pre>id</code>或<code v-pre>name</code>属性，还可以用这两个属性的值，在<code v-pre>HTMLCollection</code>实例上引用到这个成员。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML 代码如下
// &lt;form name=&quot;myForm&quot;&gt;
document.myForm === document.forms.myForm // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-3-文档静态信息属性" tabindex="-1"><a class="header-anchor" href="#_2-3-文档静态信息属性" aria-hidden="true">#</a> 2.3 文档静态信息属性</h4>
<p>以下属性<strong>返回文档信息</strong>。</p>
<h5 id="_1-document-documenturi-document-url-返回网址字符串" tabindex="-1"><a class="header-anchor" href="#_1-document-documenturi-document-url-返回网址字符串" aria-hidden="true">#</a> （1）document.documentURI，document.URL 返回网址字符串</h5>
<p><code v-pre>document.documentURI</code>属性和<code v-pre>document.URL</code>属性都<strong>返回一个字符串，表示当前文档的网址</strong>。不同之处是它们继承自不同的接口，<code v-pre>documentURI</code>继承自<code v-pre>Document</code>接口，可用于所有文档；<code v-pre>URL</code>继承自<code v-pre>HTMLDocument</code>接口，只能用于 HTML 文档。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document.URL
// http://www.example.com/about

document.documentURI === document.URL
// true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果<strong>文档的锚点（<code v-pre>#anchor</code>）变化，这两个属性都会跟着变化</strong>。</p>
<h5 id="_2-document-domain-返回域名" tabindex="-1"><a class="header-anchor" href="#_2-document-domain-返回域名" aria-hidden="true">#</a> （2）document.domain 返回域名</h5>
<p><code v-pre>document.domain</code>属性<strong>返回当前文档的域名，不包含协议和端口</strong>。比如，网页的网址是<code v-pre>http://www.example.com:80/hello.html</code>，那么<code v-pre>document.domain</code>属性就等于<code v-pre>www.example.com</code>。如果无法获取域名，该属性返回<code v-pre>null</code>。</p>
<p><code v-pre>document.domain</code>基本上是一个只读属性，只有一种情况除外。次级域名的网页，可以把<code v-pre>document.domain</code>设为对应的上级域名。比如，当前域名是<code v-pre>a.sub.example.com</code>，则<code v-pre>document.domain</code>属性可以设置为<code v-pre>sub.example.com</code>，也可以设为<code v-pre>example.com</code>。修改后，<code v-pre>document.domain</code>相同的两个网页，可以读取对方的资源，比如设置的 Cookie。</p>
<p>另外，设置<code v-pre>document.domain</code>会导致端口被改成<code v-pre>null</code>。因此，如果通过设置<code v-pre>document.domain</code>来进行通信，双方网页都必须设置这个值，才能保证端口相同。</p>
<h5 id="_3-document-location-提供-url-相关的信息和操作方法" tabindex="-1"><a class="header-anchor" href="#_3-document-location-提供-url-相关的信息和操作方法" aria-hidden="true">#</a> （3）document.location 提供 URL 相关的信息和操作方法</h5>
<p><code v-pre>Location</code>对象是浏览器提供的原生对象，提供 URL 相关的信息和操作方法。通过<code v-pre>window.location</code>和<code v-pre>document.location</code>属性，可以拿到这个对象。</p>
<p>关于这个对象的详细介绍，请看《浏览器模型》部分的《Location 对象》章节。</p>
<h5 id="_4-document-lastmodified-返回当前文档最后修改的时间" tabindex="-1"><a class="header-anchor" href="#_4-document-lastmodified-返回当前文档最后修改的时间" aria-hidden="true">#</a> （4）document.lastModified  返回当前文档最后修改的时间</h5>
<p><code v-pre>document.lastModified</code>属性返回一个<strong>字符串</strong>，表示<strong>当前文档最后修改的时间</strong>。不同浏览器的返回值，日期格式是不一样的。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document.lastModified
// &quot;03/07/2018 11:18:27&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，<code v-pre>document.lastModified</code>属性的值是字符串，所以不能直接用来比较。<code v-pre>Date.parse</code>方法将其转为<code v-pre>Date</code>实例，才能比较两个网页。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var lastVisitedDate = Date.parse('01/01/2018');
if (Date.parse(document.lastModified) &gt; lastVisitedDate) {
  console.log('网页已经变更');
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果页面上有 JavaScript 生成的内容，<code v-pre>document.lastModified</code>属性返回的总是当前时间。</p>
<h5 id="_5-document-title-返回当前文档的标题" tabindex="-1"><a class="header-anchor" href="#_5-document-title-返回当前文档的标题" aria-hidden="true">#</a> （5）document.title  返回当前文档的标题</h5>
<p><code v-pre>document.title</code>属性<strong>返回当前文档的标题</strong>。默认情况下，返回<code v-pre>&lt;title&gt;</code>节点的值。但是该属性是可写的，一旦被修改，就返回修改后的值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document.title = '新标题';
document.title // &quot;新标题&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_6-document-characterset-返回当前文档的编码-如utf-8等" tabindex="-1"><a class="header-anchor" href="#_6-document-characterset-返回当前文档的编码-如utf-8等" aria-hidden="true">#</a> （6）document.characterSet 返回当前文档的编码，如UTF-8等</h5>
<p><code v-pre>document.characterSet</code>属性<strong>返回当前文档的编码</strong>，比如<code v-pre>UTF-8</code>、<code v-pre>ISO-8859-1</code>等等。</p>
<h5 id="_7-document-referrer-当前文档的访问者来自哪里-如通过百度进入的" tabindex="-1"><a class="header-anchor" href="#_7-document-referrer-当前文档的访问者来自哪里-如通过百度进入的" aria-hidden="true">#</a> （7）document.referrer 当前文档的访问者来自哪里（如通过百度进入的）</h5>
<p><code v-pre>document.referrer</code>属性<strong>返回一个字符串，表示当前文档的访问者来自哪里</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document.referrer
// &quot;https://example.com/path&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果无法获取来源，或者用户直接键入网址而不是从其他网页点击进入，<code v-pre>document.referrer</code>返回一个空字符串。</p>
<p><code v-pre>document.referrer</code>的值，总是与 HTTP 头信息的<code v-pre>Referer</code>字段保持一致。但是，<code v-pre>document.referrer</code>的拼写有两个<code v-pre>r</code>，而头信息的<code v-pre>Referer</code>字段只有一个<code v-pre>r</code>。</p>
<h5 id="_8-document-dir-返回文字方向-rtl从右到左-ltr从左到右" tabindex="-1"><a class="header-anchor" href="#_8-document-dir-返回文字方向-rtl从右到左-ltr从左到右" aria-hidden="true">#</a> （8）document.dir 返回文字方向（rtl从右到左，ltr从左到右）</h5>
<p><code v-pre>document.dir</code>返回<strong>一个字符串，表示文字方向</strong>。它<strong>只有两个可能</strong>的值：<code v-pre>rtl</code>表示文字从右到左，阿拉伯文是这种方式；<code v-pre>ltr</code>表示文字从左到右，包括英语和汉语在内的大多数文字采用这种方式。</p>
<blockquote>
<p>注： 第一次调用该属性时，可能返回空字符串&quot;&quot;</p>
</blockquote>
<h5 id="_9-document-compatmode-返回浏览器处理文档的模式-向后兼容与严格模式" tabindex="-1"><a class="header-anchor" href="#_9-document-compatmode-返回浏览器处理文档的模式-向后兼容与严格模式" aria-hidden="true">#</a> （9）document.compatMode 返回浏览器处理文档的模式（向后兼容与严格模式）</h5>
<p><code v-pre>compatMode</code>属性返回浏览器处理文档的模式，可能的值为<code v-pre>BackCompat</code>（向后兼容模式）和<code v-pre>CSS1Compat</code>（严格模式）。</p>
<p>一般来说，如果网页代码的第一行设置了明确的<code v-pre>DOCTYPE</code>（比如``），<code v-pre>document.compatMode</code>的值都为<code v-pre>CSS1Compat</code>。</p>
<h4 id="_2-4-文档状态属性" tabindex="-1"><a class="header-anchor" href="#_2-4-文档状态属性" aria-hidden="true">#</a> 2.4 文档状态属性</h4>
<h5 id="_1-document-hidden-当前页面是否可见-返布尔值。" tabindex="-1"><a class="header-anchor" href="#_1-document-hidden-当前页面是否可见-返布尔值。" aria-hidden="true">#</a> （1）document.hidden 当前页面是否可见，返布尔值。</h5>
<p><code v-pre>document.hidden</code>属性<strong>返回一个布尔值，表示当前页面是否可见</strong>。如果<strong>窗口最小化、浏览器切换了 Tab，都会导致导致页面不可见，使得<code v-pre>document.hidden</code>返回<code v-pre>true</code>。</strong></p>
<p>这个属性是 Page Visibility API 引入的，一般都是配合这个 API 使用。</p>
<h5 id="_2-document-visibilitystate-返回文档可见状态-visible、hidden、prerender、unloaded" tabindex="-1"><a class="header-anchor" href="#_2-document-visibilitystate-返回文档可见状态-visible、hidden、prerender、unloaded" aria-hidden="true">#</a> （2）document.visibilityState 返回文档可见状态（visible、hidden、prerender、unloaded）</h5>
<p><code v-pre>document.visibilityState</code><strong>返回文档的可见状态</strong>。</p>
<p>它的值有<strong>四种状态</strong>。</p>
<blockquote>
<ul>
<li><code v-pre>visible</code>：页面可见。注意，页面可能是部分可见，即不是焦点窗口，前面被其他窗口部分挡住了。</li>
<li><code v-pre>hidden</code>：页面不可见，有可能窗口最小化，或者浏览器切换到了另一个 Tab。</li>
<li><code v-pre>prerender</code>：页面处于正在渲染状态，对于用户来说，该页面不可见。</li>
<li><code v-pre>unloaded</code>：页面从内存里面卸载了。</li>
</ul>
</blockquote>
<p><strong>这个属性可以用在页面加载时，防止加载某些资源；或者页面不可见时，停掉一些页面功能。</strong></p>
<h5 id="_3-document-readystate-返回当前文档的状态-loading、interactive、complete" tabindex="-1"><a class="header-anchor" href="#_3-document-readystate-返回当前文档的状态-loading、interactive、complete" aria-hidden="true">#</a> （3）document.readyState 返回当前文档的状态（loading、interactive、complete）</h5>
<p><code v-pre>document.readyState</code>属性<strong>返回当前文档的状态</strong>，共有<strong>三种可能</strong>的值。</p>
<ul>
<li><code v-pre>loading</code>：加载 HTML 代码阶段（尚未完成解析）</li>
<li><code v-pre>interactive</code>：加载外部资源阶段</li>
<li><code v-pre>complete</code>：加载完成</li>
</ul>
<p>这个属性变化的过程如下。</p>
<ol>
<li>浏览器开始解析 HTML 文档，<code v-pre>document.readyState</code>属性等于<code v-pre>loading</code>。</li>
<li>浏览器遇到 HTML 文档中的<code v-pre> &lt;script&gt; </code>元素，并且没有<code v-pre>async</code>或<code v-pre>defer</code>属性，就暂停解析，开始执行脚本，这时<code v-pre>document.readyState</code>属性还是等于<code v-pre>loading</code>。</li>
<li>HTML 文档解析完成，<code v-pre>document.readyState</code>属性变成<code v-pre>interactive</code>。</li>
<li>浏览器等待图片、样式表、字体文件等外部资源加载完成，一旦全部加载完成，<code v-pre>document.readyState</code>属性变成<code v-pre>complete</code>。</li>
</ol>
<p>下面的代码用来检查网页是否加载成功。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 基本检查
if (document.readyState === 'complete') {
  // ...
}

// 轮询检查
var interval = setInterval(function() {
  if (document.readyState === 'complete') {
    clearInterval(interval);
    // ...
  }
}, 100);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外，<strong>每次状态变化都会触发一个<code v-pre>readystatechange</code>事件。</strong></p>
<h4 id="_2-5-document-cookie-用来操作浏览器-cookie" tabindex="-1"><a class="header-anchor" href="#_2-5-document-cookie-用来操作浏览器-cookie" aria-hidden="true">#</a> 2.5 document.cookie 用来操作浏览器 Cookie</h4>
<p><code v-pre>document.cookie</code>属性用来操作浏览器 Cookie，详见《浏览器模型》部分的《Cookie》章节。</p>
<h4 id="_2-6-document-designmode-控制当前文档是否可编辑-on、off" tabindex="-1"><a class="header-anchor" href="#_2-6-document-designmode-控制当前文档是否可编辑-on、off" aria-hidden="true">#</a> 2.6 document.designMode 控制当前文档是否可编辑（on、off）</h4>
<p><code v-pre>document.designMode</code>属性<strong>控制当前文档是否可编辑。该属性只有两个值<code v-pre>on</code>和<code v-pre>off</code>，默认值为<code v-pre>off</code></strong>。一旦设为<code v-pre>on</code>，用户就可以编辑整个文档的内容。</p>
<p>下面代码打开<code v-pre>iframe</code>元素内部文档的<code v-pre>designMode</code>属性，就能将其变为一个所见即所得的编辑器。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML 代码如下
// &lt;iframe id=&quot;editor&quot; src=&quot;about:blank&quot;&gt;&lt;/iframe&gt;
var editor = document.getElementById('editor');
editor.contentDocument.designMode = 'on';
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-7-document-implementation-返回一个domimplementation对象" tabindex="-1"><a class="header-anchor" href="#_2-7-document-implementation-返回一个domimplementation对象" aria-hidden="true">#</a> 2.7 document.implementation 返回一个<code v-pre>DOMImplementation</code>对象</h4>
<p><code v-pre>document.implementation</code>属性<strong>返回一个<code v-pre>DOMImplementation</code>对象</strong>。该对象有三个方法，<strong>主要用于创建独立于当前文档的新的 Document 对象</strong>。</p>
<ul>
<li><code v-pre>DOMImplementation.createDocument()</code>：创建一个 XML 文档。</li>
<li><code v-pre>DOMImplementation.createHTMLDocument()</code>：创建一个 HTML 文档。</li>
<li><code v-pre>DOMImplementation.createDocumentType()</code>：创建一个 DocumentType 对象。</li>
</ul>
<p>下面是创建 HTML 文档的例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var doc = document.implementation.createHTMLDocument('Title');
var p = doc.createElement('p');
p.innerHTML = 'hello world';
doc.body.appendChild(p);

document.replaceChild(
  doc.documentElement,
  document.documentElement
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，第一步生成一个新的 HTML 文档<code v-pre>doc</code>，然后用它的根元素<code v-pre>document.documentElement</code>替换掉<code v-pre>document.documentElement</code>。这会使得当前文档的内容全部消失，变成<code v-pre>hello world</code>。</p>
<h3 id="_3、方法" tabindex="-1"><a class="header-anchor" href="#_3、方法" aria-hidden="true">#</a> 3、方法</h3>
<h4 id="_3-1-document-open-document-close-打开和关闭文档可写状态" tabindex="-1"><a class="header-anchor" href="#_3-1-document-open-document-close-打开和关闭文档可写状态" aria-hidden="true">#</a> 3.1 document.open()，document.close() 打开和关闭文档可写状态</h4>
<p><code v-pre>document.open</code>方法<strong>清除当前文档所有内容，使得文档处于可写状态，供<code v-pre>document.write</code>方法写入内容</strong>。</p>
<p><code v-pre>document.close</code>方法用来<strong>关闭<code v-pre>document.open()</code>打开的文档</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document.open();
document.write('hello world');
document.close();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-2-document-write-向当前文档写入内容-document-writeln-写入内容并换行" tabindex="-1"><a class="header-anchor" href="#_3-2-document-write-向当前文档写入内容-document-writeln-写入内容并换行" aria-hidden="true">#</a> 3.2 document.write() 向当前文档写入内容，document.writeln() 写入内容并换行</h4>
<p><code v-pre>document.write</code>方法<strong>用于向当前文档写入内容</strong>。</p>
<p>在网页的首次渲染阶段，只要页面没有关闭写入（即没有执行<code v-pre>document.close()</code>），<code v-pre>document.write</code>写入的内容就会追加在已有内容的后面。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 页面显示“helloworld”
document.open();
document.write('hello');
document.write('world');
document.close();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，<code v-pre>document.write</code>会当作 HTML 代码解析，不会转义。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document.write('&lt;p&gt;hello world&lt;/p&gt;');
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>document.write</code>会将<code v-pre> &lt;p&gt; </code>当作 HTML 标签解释。</p>
<p>如果页面已经解析完成（<code v-pre>DOMContentLoaded</code>事件发生之后），再调用<code v-pre>write</code>方法，它会先调用<code v-pre>open</code>方法，擦除当前文档所有内容，然后再写入。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document.addEventListener('DOMContentLoaded', function (event) {
  document.write('&lt;p&gt;Hello World!&lt;/p&gt;');
});

// 等同于
document.addEventListener('DOMContentLoaded', function (event) {
  document.open();
  document.write('&lt;p&gt;Hello World!&lt;/p&gt;');
  document.close();
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果在页面渲染过程中调用<code v-pre>write</code>方法，并不会自动调用<code v-pre>open</code>方法。（可以理解成，<code v-pre>open</code>方法已调用，但<code v-pre>close</code>方法还未调用。）</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>&lt;html&gt;
&lt;body&gt;
hello
&lt;script type=&quot;text/javascript&quot;&gt;
  document.write(&quot;world&quot;)
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在浏览器打开上面网页，将会显示<code v-pre>hello world</code>。</p>
<p><code v-pre>document.write</code>是 JavaScript 语言标准化之前就存在的方法，现在完全有更符合标准的方法向文档写入内容（比如对<code v-pre>innerHTML</code>属性赋值）。所以，<strong>除了某些特殊情况，应该尽量避免使用<code v-pre>document.write</code>这个方法。</strong></p>
<p><code v-pre>document.writeln</code>方法与<code v-pre>write</code>方法完全一致，除了会在输出内容的尾部添加换行符。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document.write(1);
document.write(2);
// 12

document.writeln(1);
document.writeln(2);
// 1
// 2
//
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，<code v-pre>writeln</code>方法添加的是 ASCII 码的换行符，渲染成 HTML 网页时不起作用，即在网页上显示不出换行。网页上的换行，必须显式写入<code v-pre> </code>。</p>
<h4 id="_3-3-document-queryselector-返回匹配该选择器的元素节点-document-queryselectorall-返回一个nodelist对象-包含所有匹配给定选择器的节点" tabindex="-1"><a class="header-anchor" href="#_3-3-document-queryselector-返回匹配该选择器的元素节点-document-queryselectorall-返回一个nodelist对象-包含所有匹配给定选择器的节点" aria-hidden="true">#</a> 3.3 document.querySelector() 返回匹配该选择器的元素节点，document.querySelectorAll() 返回一个<code v-pre>NodeList</code>对象，包含所有匹配给定选择器的节点</h4>
<p><code v-pre>document.querySelector</code>方法接受一个 CSS 选择器作为参数，<strong>返回匹配该选择器的元素节点</strong>。如果有多个节点满足匹配条件，则返回第一个匹配的节点。如果没有发现匹配的节点，则返回<code v-pre>null</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var el1 = document.querySelector('.myclass');
var el2 = document.querySelector('#myParent &gt; [ng-click]');
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>document.querySelectorAll</code>方法与<code v-pre>querySelector</code>用法类似，区别是<strong>返回一个<code v-pre>NodeList</code>对象，包含所有匹配给定选择器的节点</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>elementList = document.querySelectorAll('.myclass');
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这两个方法的参数，可以是逗号分隔的多个 CSS 选择器，返回匹配其中一个选择器的元素节点，这与 CSS 选择器的规则是一致的。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var matches = document.querySelectorAll('div.note, div.alert');
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码返回<code v-pre>class</code>属性是<code v-pre>note</code>或<code v-pre>alert</code>的<code v-pre>div</code>元素。</p>
<p>这两个方法都<strong>支持复杂的 CSS 选择器</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 选中 data-foo-bar 属性等于 someval 的元素
document.querySelectorAll('[data-foo-bar=&quot;someval&quot;]');

// 选中 myForm 表单中所有不通过验证的元素
document.querySelectorAll('#myForm :invalid');

// 选中div元素，那些 class 含 ignore 的除外
document.querySelectorAll('DIV:not(.ignore)');

// 同时选中 div，a，script 三类元素
document.querySelectorAll('DIV, A, SCRIPT');
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是，它们<strong>不支持 CSS 伪元素的选择器</strong>（比如<code v-pre>:first-line</code>和<code v-pre>:first-letter</code>）和<strong>伪类的选择器</strong>（比如<code v-pre>:link</code>和<code v-pre>:visited</code>），即无法选中伪元素和伪类。</p>
<p>如果<code v-pre>querySelectorAll</code>方法的参数是字符串<code v-pre>*</code>，则会返回文档中的所有元素节点。另外，<code v-pre>querySelectorAll</code>的返回结果不是动态集合，不会实时反映元素节点的变化。</p>
<p>最后，这两个方法除了定义在<code v-pre>document</code>对象上，还定义在元素节点上，即<strong>在元素节点上也可以调用</strong>。</p>
<h4 id="_3-4-document-getelementsbytagname-搜索-html-标签名-返回符合条件的元素" tabindex="-1"><a class="header-anchor" href="#_3-4-document-getelementsbytagname-搜索-html-标签名-返回符合条件的元素" aria-hidden="true">#</a> 3.4 document.getElementsByTagName() 搜索 HTML 标签名，返回符合条件的元素</h4>
<p><code v-pre>document.getElementsByTagName</code>方法<strong>搜索 HTML 标签名，返回符合条件的元素</strong>。它的返回值是一个类似数组对象（<strong><code v-pre>HTMLCollection</code>实例</strong>），可以实时反映 HTML 文档的变化。如果没有任何匹配的元素，就返回一个空集。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var paras = document.getElementsByTagName('p');
paras instanceof HTMLCollection // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码返回当前文档的所有<code v-pre>p</code>元素节点。</p>
<p>HTML 标签名是大小写不敏感的，因此<code v-pre>getElementsByTagName</code>方法也是大小写不敏感的。另外，返回结果中，各个成员的顺序就是它们在文档中出现的顺序。</p>
<p>如果传入<code v-pre>*</code>，就可以返回文档中所有 HTML 元素。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var allElements = document.getElementsByTagName('*');
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>注意</strong>，元素节点本身也定义了<code v-pre>getElementsByTagName</code>方法，返回该元素的后代元素中符合条件的元素。也就是说，这个方法不仅可以在<code v-pre>document</code>对象上调用，也可以在任何元素节点上调用。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var firstPara = document.getElementsByTagName('p')[0];
var spans = firstPara.getElementsByTagName('span');
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码选中第一个<code v-pre>p</code>元素内部的所有<code v-pre>span</code>元素。</p>
<h4 id="_3-5-document-getelementsbyclassname-返回class符合条件的元素" tabindex="-1"><a class="header-anchor" href="#_3-5-document-getelementsbyclassname-返回class符合条件的元素" aria-hidden="true">#</a> 3.5 document.getElementsByClassName() 返回class符合条件的元素</h4>
<p><code v-pre>document.getElementsByClassName</code>方法返回一个类似数组的对象（<strong><code v-pre>HTMLCollection</code>实例</strong>），<strong>包括了所有<code v-pre>class</code>名字符合指定条件的元素，元素的变化实时反映在返回结果中</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var elements = document.getElementsByClassName(names);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>由于<code v-pre>class</code>是保留字，所以 JavaScript 一律使用<code v-pre>className</code>表示 CSS 的<code v-pre>class</code>。</strong></p>
<p>参数可以是多个<code v-pre>class</code>，它们之间使用空格分隔。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var elements = document.getElementsByClassName('foo bar');
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码返回<strong>同时具有<code v-pre>foo</code>和<code v-pre>bar</code>两个<code v-pre>class</code>的元素</strong>，<code v-pre>foo</code>和<code v-pre>bar</code>的顺序不重要。</p>
<p>注意，正常模式下，CSS 的<code v-pre>class</code>是大小写敏感的。（<code v-pre>quirks mode</code>下，大小写不敏感。）</p>
<p>与<code v-pre>getElementsByTagName</code>方法一样，<code v-pre>getElementsByClassName</code>方法不仅可以在<code v-pre>document</code>对象上调用，也可以在任何元素节点上调用。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 非document对象上调用
var elements = rootElement.getElementsByClassName(names);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-6-document-getelementsbyname-返回拥有相应name值的元素" tabindex="-1"><a class="header-anchor" href="#_3-6-document-getelementsbyname-返回拥有相应name值的元素" aria-hidden="true">#</a> 3.6 document.getElementsByName() 返回拥有相应name值的元素</h4>
<p><code v-pre>document.getElementsByName</code>方法用于选择拥有<code v-pre>name</code>属性的 HTML 元素（比如<code v-pre>&lt;form&gt;</code>、<code v-pre>&lt;radio&gt;</code>、<code v-pre> &lt;img&gt; </code>、<code v-pre>&lt;frame&gt;</code>、<code v-pre>&lt;embed&gt;</code>和<code v-pre>&lt;object&gt;</code>等），返回一个类似数组的的对象（<strong><code v-pre>NodeList</code>实例</strong>），因为<code v-pre>name</code>属性相同的元素可能不止一个。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 表单为 &lt;form name=&quot;x&quot;&gt;&lt;/form&gt;
var forms = document.getElementsByName('x');
forms[0].tagName // &quot;FORM&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-7-document-getelementbyid-返回匹配指定id属性的元素节点" tabindex="-1"><a class="header-anchor" href="#_3-7-document-getelementbyid-返回匹配指定id属性的元素节点" aria-hidden="true">#</a> 3.7 document.getElementById() 返回匹配指定<code v-pre>id</code>属性的元素节点</h4>
<p><code v-pre>document.getElementById</code>方法<strong>返回匹配指定<code v-pre>id</code>属性的元素节点</strong>。如果没有发现匹配的节点，则返回<code v-pre>null</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var elem = document.getElementById('para1');
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注意，该方法的参数是大小写敏感的。比如，如果某个节点的<code v-pre>id</code>属性是<code v-pre>main</code>，那么<code v-pre>document.getElementById('Main')</code>将返回<code v-pre>null</code>。</p>
<p>**<code v-pre>document.getElementById</code>方法与<code v-pre>document.querySelector</code>方法都能获取元素节点，**不同之处是<code v-pre>document.querySelector</code>方法的参数使用 CSS 选择器语法，<code v-pre>document.getElementById</code>方法的参数是元素的<code v-pre>id</code>属性。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document.getElementById('myElement')
document.querySelector('#myElement')
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，两个方法都能选中<code v-pre>id</code>为<code v-pre>myElement</code>的元素，但是<code v-pre>document.getElementById()</code>比<code v-pre>document.querySelector()</code>效率高得多。</p>
<p>另外，<strong>这个方法只能在<code v-pre>document</code>对象上使用，不能在其他元素节点上使用</strong>。</p>
<h4 id="_3-8-document-elementfrompoint-x-y-返回位于页面指定坐标最上层的元素节点-document-elementsfrompoint-x-y-返回一个数组-成员是位于指定坐标的所有元素" tabindex="-1"><a class="header-anchor" href="#_3-8-document-elementfrompoint-x-y-返回位于页面指定坐标最上层的元素节点-document-elementsfrompoint-x-y-返回一个数组-成员是位于指定坐标的所有元素" aria-hidden="true">#</a> 3.8 document.elementFromPoint(x, y) 返回位于页面指定坐标最上层的元素节点，document.elementsFromPoint(x, y) 返回一个数组，成员是位于指定坐标的所有元素</h4>
<p><code v-pre>document.elementFromPoint</code>方法<strong>返回位于页面指定位置最上层的元素节点</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var element = document.elementFromPoint(50, 50);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码选中在<code v-pre>(50, 50)</code>这个坐标位置的最上层的那个 HTML 元素。</p>
<p><code v-pre>elementFromPoint</code>方法的<strong>两个参数</strong>，依次<strong>是相对于当前视口左上角的横坐标和纵坐标</strong>，单位是像素。如果位于该位置的 HTML 元素不可返回（比如文本框的滚动条），则返回它的父元素（比如文本框）。如果坐标值无意义（比如负值或超过视口大小），则返回<code v-pre>null</code>。</p>
<p><code v-pre>document.elementsFromPoint()</code><strong>返回一个数组，成员是位于指定坐标（相对于视口）的所有元素</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var elements = document.elementsFromPoint(x, y);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>注意：这两个方法的坐标都是相对于视口，就是说当滚动条滚动时，选中的元素可能会跟着变化。</strong></p>
<h4 id="_3-9-document-createelement-创建元素节点-并返回" tabindex="-1"><a class="header-anchor" href="#_3-9-document-createelement-创建元素节点-并返回" aria-hidden="true">#</a> 3.9 document.createElement() 创建元素节点，并返回</h4>
<p><code v-pre>document.createElement</code>方法<strong>用来生成元素节点，并返回该节点。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var newDiv = document.createElement('div');
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>createElement</code>方法的参数为元素的标签名，即元素节点的<code v-pre>tagName</code>属性，对于 HTML 网页大小写不敏感，即参数为<code v-pre>div</code>或<code v-pre>DIV</code>返回的是同一种节点。如果参数里面包含尖括号（即<code v-pre>&lt;</code>和<code v-pre>&gt;</code>）会报错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document.createElement('&lt;div&gt;');
// DOMException: The tag name provided ('&lt;div&gt;') is not a valid name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意</strong>，<code v-pre>document.createElement</code>的参数可以是自定义的标签名。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document.createElement('foo');
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_3-10-document-createtextnode-创建文本节点-并返回" tabindex="-1"><a class="header-anchor" href="#_3-10-document-createtextnode-创建文本节点-并返回" aria-hidden="true">#</a> 3.10 document.createTextNode() 创建文本节点，并返回</h4>
<p><code v-pre>document.createTextNode</code>方法<strong>用来生成文本节点（<code v-pre>Text</code>实例），并返回该节点</strong>。它的<strong>参数是文本节点的内容</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var newDiv = document.createElement('div');
var newContent = document.createTextNode('Hello');
newDiv.appendChild(newContent);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码新建一个<code v-pre>div</code>节点和一个文本节点，然后将文本节点插入<code v-pre>div</code>节点。</p>
<p><strong>这个方法可以确保返回的节点，被浏览器当作文本渲染，而不是当作 HTML 代码渲染。因此，可以用来展示用户的输入，避免 XSS 攻击。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var div = document.createElement('div');
div.appendChild(document.createTextNode('&lt;span&gt;Foo &amp; bar&lt;/span&gt;'));
console.log(div.innerHTML)
// &amp;lt;span&amp;gt;Foo &amp;amp; bar&amp;lt;/span&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>createTextNode</code>方法对大于号和小于号进行转义，从而保证即使用户输入的内容包含恶意代码，也能正确显示。</p>
<p>需要注意的是，该方法不对单引号和双引号转义，所以不能用来对 HTML 属性赋值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function escapeHtml(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

var userWebsite = '&quot; onmouseover=&quot;alert(\'derp\')&quot; &quot;';
var profileLink = '&lt;a href=&quot;' + escapeHtml(userWebsite) + '&quot;&gt;Bob&lt;/a&gt;';
var div = document.getElementById('target');
div.innerHTML = profileLink;
// &lt;a href=&quot;&quot; onmouseover=&quot;alert('derp')&quot; &quot;&quot;&gt;Bob&lt;/a&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，由于<code v-pre>createTextNode</code>方法不转义双引号，导致<code v-pre>onmouseover</code>方法被注入了代码。</p>
<h4 id="_3-11-document-createattribute-创建属性节点-并返回" tabindex="-1"><a class="header-anchor" href="#_3-11-document-createattribute-创建属性节点-并返回" aria-hidden="true">#</a> 3.11 document.createAttribute() 创建属性节点，并返回</h4>
<p><code v-pre>document.createAttribute</code>方法<strong>生成一个新的属性节点（<code v-pre>Attr</code>实例），并返回它</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var attribute = document.createAttribute(name);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>document.createAttribute</code>方法的参数<code v-pre>name</code>，是属性的名称。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var node = document.getElementById('div1');

var a = document.createAttribute('my_attrib');
a.value = 'newVal';

node.setAttributeNode(a);
// 或者
node.setAttribute('my_attrib', 'newVal');
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码为<code v-pre>div1</code>节点，插入一个值为<code v-pre>newVal</code>的<code v-pre>my_attrib</code>属性。</p>
<h4 id="_3-12-document-createcomment-创建注释节点-并返回" tabindex="-1"><a class="header-anchor" href="#_3-12-document-createcomment-创建注释节点-并返回" aria-hidden="true">#</a> 3.12 document.createComment() 创建注释节点，并返回</h4>
<p><code v-pre>document.createComment</code>方法<strong>生成一个新的注释节点，并返回该节点。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var CommentNode = document.createComment(data);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>document.createComment</code>方法的参数是一个字符串，会成为注释节点的内容。</p>
<h4 id="_3-13-document-createdocumentfragment-创建空文档片段对象" tabindex="-1"><a class="header-anchor" href="#_3-13-document-createdocumentfragment-创建空文档片段对象" aria-hidden="true">#</a> 3.13 document.createDocumentFragment() 创建空文档片段对象</h4>
<p><code v-pre>document.createDocumentFragment</code>方法<strong>生成一个空的文档片段对象（<code v-pre>DocumentFragment</code>实例）</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var docFragment = document.createDocumentFragment();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>DocumentFragment</code><strong>是一个存在于内存的 DOM 片段，不属于当前文档，常常用来生成一段较复杂的 DOM 结构，然后再插入当前文档</strong>。这样做的好处在于，因为<code v-pre>DocumentFragment</code>不属于当前文档，对它的任何改动，都不会引发网页的重新渲染，<strong>比直接修改当前文档的 DOM 有更好的性能表现。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var docfrag = document.createDocumentFragment();

[1, 2, 3, 4].forEach(function (e) {
  var li = document.createElement('li');
  li.textContent = e;
  docfrag.appendChild(li);
});

var element  = document.getElementById('ul');
element.appendChild(docfrag);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，文档片断<code v-pre>docfrag</code>包含四个<code v-pre>&lt;li&gt;</code>节点，这些子节点被一次性插入了当前文档。</p>
<h4 id="_3-14-document-createevent-创建事件对象-event实例" tabindex="-1"><a class="header-anchor" href="#_3-14-document-createevent-创建事件对象-event实例" aria-hidden="true">#</a> 3.14 document.createEvent() 创建事件对象（Event实例）</h4>
<p><code v-pre>document.createEvent</code>方法<strong>生成一个事件对象（<code v-pre>Event</code>实例）</strong>，该对象可以被<code v-pre>element.dispatchEvent</code>方法使用，触发指定事件。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var event = document.createEvent(type);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>document.createEvent</code>方法的<strong>参数是事件类型，比如<code v-pre>UIEvents</code>、<code v-pre>MouseEvents</code>、<code v-pre>MutationEvents</code>、<code v-pre>HTMLEvents</code>。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var event = document.createEvent('Event');
event.initEvent('build', true, true);
document.addEventListener('build', function (e) {
  console.log(e.type); // &quot;build&quot;
}, false);
document.dispatchEvent(event);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码新建了一个名为<code v-pre>build</code>的事件实例，然后触发该事件。</p>
<h4 id="_3-15-document-addeventlistener-添加事件监听-document-removeeventlistener-移除事件监听-document-dispatchevent-触发事件" tabindex="-1"><a class="header-anchor" href="#_3-15-document-addeventlistener-添加事件监听-document-removeeventlistener-移除事件监听-document-dispatchevent-触发事件" aria-hidden="true">#</a> 3.15 document.addEventListener() 添加事件监听，document.removeEventListener() 移除事件监听，document.dispatchEvent() 触发事件</h4>
<p>这三个方法用于处理<code v-pre>document</code>节点的事件。它们都继承自<code v-pre>EventTarget</code>接口，详细介绍参见《EventTarget 接口》一章。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 添加事件监听函数
document.addEventListener('click', listener, false);

// 移除事件监听函数
document.removeEventListener('click', listener, false);

// 触发事件
var event = new Event('click');
document.dispatchEvent(event);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-16-document-hasfocus-判断当前文档是否有元素被激活或获取焦点" tabindex="-1"><a class="header-anchor" href="#_3-16-document-hasfocus-判断当前文档是否有元素被激活或获取焦点" aria-hidden="true">#</a> 3.16 document.hasFocus() 判断当前文档是否有元素被激活或获取焦点</h4>
<p><code v-pre>document.hasFocus</code>方法<strong>返回一个布尔值，表示当前文档之中是否有元素被激活或获得焦点。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var focused = document.hasFocus();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>注意，有焦点的文档必定被激活（active），反之不成立，激活的文档未必有焦点。比如，用户点击按钮，从当前窗口跳出一个新窗口，该新窗口就是激活的，但是不拥有焦点。</strong></p>
<h4 id="_3-17-document-adoptnode-采用外部节点-document-importnode-输入-拷贝-外部节点" tabindex="-1"><a class="header-anchor" href="#_3-17-document-adoptnode-采用外部节点-document-importnode-输入-拷贝-外部节点" aria-hidden="true">#</a> 3.17 document.adoptNode() 采用外部节点，document.importNode() 输入（拷贝）外部节点</h4>
<p><code v-pre>document.adoptNode</code>方法<strong>将某个节点及其子节点，从原来所在的文档或<code v-pre>DocumentFragment</code>里面移除，归属当前<code v-pre>document</code>对象，返回插入后的新节点</strong>。插入的节点对象的<code v-pre>ownerDocument</code>属性，会变成当前的<code v-pre>document</code>对象，而<code v-pre>parentNode</code>属性是<code v-pre>null</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var node = document.adoptNode(externalNode); // externalNode 外部节点
document.appendChild(node);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，<code v-pre>document.adoptNode</code>方法只是<strong>改变了节点的归属</strong>，并没有将这个节点插入新的文档树。所以，还要再用<code v-pre>appendChild</code>方法或<code v-pre>insertBefore</code>方法，将新节点插入当前文档树。</p>
<p><code v-pre>document.importNode</code>方法则是<strong>从原来所在的文档或<code v-pre>DocumentFragment</code>里面，拷贝某个节点及其子节点，让它们归属当前<code v-pre>document</code>对象</strong>。拷贝的节点对象的<code v-pre>ownerDocument</code>属性，会变成当前的<code v-pre>document</code>对象，而<code v-pre>parentNode</code>属性是<code v-pre>null</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var node = document.importNode(externalNode, deep); // externalNode 外部节点 deep是否深拷贝
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>document.importNode</code>方法的<strong>第一个参数是外部节点</strong>，<strong>第二个参数是一个布尔值，表示对外部节点是深拷贝还是浅拷贝</strong>，默认是浅拷贝（false）。虽然第二个参数是可选的，但是建议总是保留这个参数，并设为<code v-pre>true</code>。</p>
<p>注意，<code v-pre>document.importNode</code>方法只是拷贝外部节点，这时该节点的父节点是<code v-pre>null</code>。下一步还必须将这个节点插入当前文档树。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var iframe = document.getElementsByTagName('iframe')[0];
var oldNode = iframe.contentWindow.document.getElementById('myNode');
var newNode = document.importNode(oldNode, true);
document.getElementById(&quot;container&quot;).appendChild(newNode);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>上面代码从<code v-pre>iframe</code>窗口，拷贝一个指定节点<code v-pre>myNode</code>，插入当前文档。</strong></p>
<h4 id="_3-18-document-createnodeiterator-返回一个子节点遍历器-nodefilter实例" tabindex="-1"><a class="header-anchor" href="#_3-18-document-createnodeiterator-返回一个子节点遍历器-nodefilter实例" aria-hidden="true">#</a> 3.18 document.createNodeIterator() 返回一个子节点遍历器（NodeFilter实例）</h4>
<p><code v-pre>document.createNodeIterator</code>方法<strong>返回一个子节点遍历器（NodeFilter实例）</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var nodeIterator = document.createNodeIterator(
  document.body, // 所要遍历的根节点
  NodeFilter.SHOW_ELEMENT // 所要遍历的节点类型
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码返回<code v-pre>&lt;body&gt;</code>元素子节点的遍历器。</p>
<p><code v-pre>document.createNodeIterator</code>方法<strong>第一个参数为所要遍历的根节点</strong>，<strong>第二个参数为所要遍历的节点类型</strong>，这里指定为元素节点（<code v-pre>NodeFilter.SHOW_ELEMENT</code>）。几种主要的节点类型写法如下。</p>
<ul>
<li><strong>所有节点：NodeFilter.SHOW_ALL</strong></li>
<li><strong>元素节点：NodeFilter.SHOW_ELEMENT</strong></li>
<li><strong>文本节点：NodeFilter.SHOW_TEXT</strong></li>
<li><strong>评论节点：NodeFilter.SHOW_COMMENT</strong></li>
</ul>
<p><code v-pre>document.createNodeIterator</code>方法返回一个“遍历器”对象（<code v-pre>NodeFilter</code>实例）。该实例的<code v-pre>nextNode()</code>方法和<code v-pre>previousNode()</code>方法，可以用来遍历所有子节点。</p>
<p><strong>每次调用NodeFilter实例的nextNode() / previousNode()方法都会把当前指针往 下一个 / 上一个节点移动。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var nodeIterator = document.createNodeIterator(document.body);
var pars = [];
var currentNode;

while (currentNode = nodeIterator.nextNode()) {
    // js中所有运算符都有返回值，为运算结果。这里面即给currentNode赋值了，还会自动调用Boolean()进行布尔运算。
    // 每次调用NodeFilter实例的nextNode()方法都会返回下一个节点

  pars.push(currentNode);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，使用遍历器的<code v-pre>nextNode</code>方法，将根节点的所有子节点，依次读入一个数组。<code v-pre>nextNode</code>方法先返回遍历器的内部指针所在的节点，然后会将指针移向下一个节点。所有成员遍历完成后，返回<code v-pre>null</code>。<code v-pre>previousNode</code>方法则是先将指针移向上一个节点，然后返回该节点。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var nodeIterator = document.createNodeIterator(
  document.body,
  NodeFilter.SHOW_ELEMENT
);

var currentNode = nodeIterator.nextNode();
var previousNode = nodeIterator.previousNode();

currentNode === previousNode // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>currentNode</code>和<code v-pre>previousNode</code>都指向同一个的节点。</p>
<p>注意，遍历器返回的<strong>第一个节点，总是根节点</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>pars[0] === document.body // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_3-19-document-createtreewalker-返回一个dom的子树遍历器-treewalker实例" tabindex="-1"><a class="header-anchor" href="#_3-19-document-createtreewalker-返回一个dom的子树遍历器-treewalker实例" aria-hidden="true">#</a> 3.19 document.createTreeWalker() 返回一个DOM的子树遍历器（TreeWalker实例）</h4>
<p><code v-pre>document.createTreeWalker</code>方法<strong>返回一个 DOM 的子树遍历器</strong>。它与<code v-pre>document.createNodeIterator</code>方法基本是类似的，区别在于它返回的是<code v-pre>TreeWalker</code>实例，后者返回的是<code v-pre>NodeIterator</code>实例。另外，它的<strong>第一个节点不是根节点</strong>。</p>
<p><code v-pre>document.createTreeWalker</code>方法的<strong>第一个参数是所要遍历的根节点</strong>，<strong>第二个参数指定所要遍历的节点类型</strong>（与<code v-pre>document.createNodeIterator</code>方法的第二个参数相同）。</p>
<p><strong>和<code v-pre>document.createNodeIterator</code>方法区别二是：<code v-pre>TreeWalker</code>实例有<code v-pre>currentNode</code>属性。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var treeWalker = document.createTreeWalker(
  document.body, // 所要遍历的根节点
  NodeFilter.SHOW_ELEMENT // 所要遍历的节点类型
);

var nodeList = [];
// 每调用一次nextNode()，currentNode属性的值将改为下一个节点
while(treeWalker.nextNode()) {
  nodeList.push(treeWalker.currentNode); // TreeWalker实例有currentNode属性
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码遍历<code v-pre>&lt;body&gt;</code>节点下属的所有元素节点，将它们插入<code v-pre>nodeList</code>数组。</p>
<h4 id="_3-20-document-execcommand-document-querycommandsupported-document-querycommandenabled" tabindex="-1"><a class="header-anchor" href="#_3-20-document-execcommand-document-querycommandsupported-document-querycommandenabled" aria-hidden="true">#</a> 3.20 document.execCommand()，document.queryCommandSupported()，document.queryCommandEnabled()</h4>
<h5 id="_1-document-execcommand-执行命令-实现复制文本等功能-富文本编辑器大量使用此方法" tabindex="-1"><a class="header-anchor" href="#_1-document-execcommand-执行命令-实现复制文本等功能-富文本编辑器大量使用此方法" aria-hidden="true">#</a> （1）document.execCommand() 执行命令（实现复制文本等功能，富文本编辑器大量使用此方法）</h5>
<p>概念一： <strong>当一个HTML文档切换到设计模式时，<code v-pre>document</code>暴露 <code v-pre>execCommand</code> 方法，该方法允许运行命令来操纵<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/contenteditable" target="_blank" rel="noopener noreferrer">可编辑内容区域</a>的元素。</strong></p>
<p>概念二： <strong>execCommand方法是执行一个对当前文档，当前选择或者给出范围的命令。处理Html数据时常用</strong></p>
<p>概念三：如果<code v-pre>document.designMode</code>属性设为<code v-pre>on</code>，那么整个文档用户可编辑；如果元素的<code v-pre>contenteditable</code>属性设为<code v-pre>true</code>，那么该元素可编辑。这两种情况下，可以使用<code v-pre>document.execCommand()</code>方法，改变内容的样式，比如<code v-pre>document.execCommand('bold')</code>会使得字体加粗。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document.execCommand(command, showDefaultUI, input)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该方法接受三个参数。</p>
<ul>
<li><code v-pre>command</code>：字符串，表示所要实施的样式。</li>
<li><code v-pre>showDefaultUI</code>：布尔值，表示是否要使用默认的用户界面，建议总是设为<code v-pre>false</code>。</li>
<li><code v-pre>input</code>：字符串，表示该样式的辅助内容，比如生成超级链接时，这个参数就是所要链接的网址。如果第二个参数设为<code v-pre>true</code>，那么浏览器会弹出提示框，要求用户在提示框输入该参数。但是，不是所有浏览器都支持这样做，为了兼容性，还是需要自己部署获取这个参数的方式。</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var url = window.prompt('请输入网址');

if (url) {
  document.execCommand('createlink', false, url);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，先提示用户输入所要链接的网址，然后手动生成超级链接。注意，第二个参数是<code v-pre>false</code>，表示此时不需要自动弹出提示框。</p>
<p><code v-pre>document.execCommand()</code>的返回值是一个布尔值。如果为<code v-pre>false</code>，表示这个方法无法生效。</p>
<p>这个方法大部分情况下，只对选中的内容生效。如果有多个内容可编辑区域，那么只对当前焦点所在的元素生效。</p>
<p><code v-pre>document.execCommand()</code>方法可以执行的样式改变有很多种，下面是其中的一些：bold、insertLineBreak、selectAll、createLink、insertOrderedList、subscript、delete、insertUnorderedList、superscript、formatBlock、insertParagraph、undo、forwardDelete、insertText、unlink、insertImage、italic、unselect、insertHTML、redo。这些值都可以用作第一个参数，它们的含义不难从字面上看出来。</p>
<h6 id="命令列表" tabindex="-1"><a class="header-anchor" href="#命令列表" aria-hidden="true">#</a> 命令列表</h6>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code>1. 2D-Position 允许通过拖曳移动绝对定位的对象。

2. AbsolutePosition 设定元素的 position 属性为“absolute”(绝对)。

3. BackColor 设置或获取当前选中区的背景颜色。

4. BlockDirLTR 目前尚未支持。

5. BlockDirRTL 目前尚未支持。

6. Bold 切换当前选中区的粗体显示与否。

7. BrowseMode 目前尚未支持。

8. Copy 将当前选中区复制到剪贴板。

9. CreateBookmark 创建一个书签锚或获取当前选中区或插入点的书签锚的名称。

10.CreateLink 在当前选中区上插入超级链接，或显示一个对话框允许用户指定要为当前选中区插入的超级链接的 URL。

11.Cut 将当前选中区复制到剪贴板并删除之。

12.Delete 删除当前选中区。

13.DirLTR 目前尚未支持。

14.DirRTL 目前尚未支持。

15.EditMode 目前尚未支持。

16.FontName 设置或获取当前选中区的字体。

17.FontSize 设置或获取当前选中区的字体大小。

18.ForeColor 设置或获取当前选中区的前景(文本)颜色。

19.FormatBlock 设置当前块格式化标签。

20.Indent 增加选中文本的缩进。

21.InlineDirLTR 目前尚未支持。

22.InlineDirRTL 目前尚未支持。

23.InsertButton 用按钮控件覆盖当前选中区。

24.InsertFieldset 用方框覆盖当前选中区。

25.InsertHorizontalRule 用水平线覆盖当前选中区。

26.InsertIFrame 用内嵌框架覆盖当前选中区。

27.InsertImage 用图像覆盖当前选中区。

28.InsertInputButton 用按钮控件覆盖当前选中区。

29.InsertInputCheckbox 用复选框控件覆盖当前选中区。

30.InsertInputFileUpload 用文件上载控件覆盖当前选中区。

31.InsertInputHidden 插入隐藏控件覆盖当前选中区。

32.InsertInputImage 用图像控件覆盖当前选中区。

33.InsertInputPassword 用密码控件覆盖当前选中区。

34.InsertInputRadio 用单选钮控件覆盖当前选中区。

35.InsertInputReset 用重置控件覆盖当前选中区。

36.InsertInputSubmit 用提交控件覆盖当前选中区。

37.InsertInputText 用文本控件覆盖当前选中区。

38.InsertMarquee 用空字幕覆盖当前选中区。

39.InsertOrderedList 切换当前选中区是编号列表还是常规格式化块。

40.InsertParagraph 用换行覆盖当前选中区。

41.InsertSelectDropdown 用下拉框控件覆盖当前选中区。

42.InsertSelectListbox 用列表框控件覆盖当前选中区。

43.InsertTextArea 用多行文本输入控件覆盖当前选中区。

44.InsertUnorderedList 切换当前选中区是项目符号列表还是常规格式化块。

45.Italic 切换当前选中区斜体显示与否。

46.JustifyCenter 将当前选中区在所在格式化块置中。

47.JustifyFull 目前尚未支持。

48.JustifyLeft 将当前选中区所在格式化块左对齐。

49.JustifyNone 目前尚未支持。

50.JustifyRight 将当前选中区所在格式化块右对齐。

51.LiveResize 迫使 MSHTML 编辑器在缩放或移动过程中持续更新元素外观，而不是只在移动或缩放完成后更新。

52.MultipleSelection 允许当用户按住 Shift 或 Ctrl 键时一次选中多于一个站点可选元素。

53.Open 打开。

54.Outdent 减少选中区所在格式化块的缩进。

55.OverWrite 切换文本状态的插入和覆盖。

56.Paste 用剪贴板内容覆盖当前选中区。

57.PlayImage 目前尚未支持。

58.Print 打开打印对话框以便用户可以打印当前页。

59.Redo 重做。

60.Refresh 刷新当前文档。

61.RemoveFormat 从当前选中区中删除格式化标签。

62.RemoveParaFormat 目前尚未支持。

63.SaveAs 将当前 Web 页面保存为文件。

64.SelectAll 选中整个文档。

65.SizeToControl 目前尚未支持。

66.SizeToControlHeight 目前尚未支持。

67.SizeToControlWidth 目前尚未支持。

68.Stop 停止。

69.StopImage 目前尚未支持。

70.StrikeThrough 目前尚未支持。

71.Subscript 目前尚未支持。

72.Superscript 目前尚未支持。

73.UnBookmark 从当前选中区中删除全部书签。

74.Underline 切换当前选中区的下划线显示与否。

75.Undo 撤消。

76.Unlink 从当前选中区中删除全部超级链接。

77.Unselect 清除当前选中区的选中状态。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_2-document-querycommandsupported-浏览器是否支持execcommand的某个命令" tabindex="-1"><a class="header-anchor" href="#_2-document-querycommandsupported-浏览器是否支持execcommand的某个命令" aria-hidden="true">#</a> （2）document.queryCommandSupported() 浏览器是否支持execCommand的某个命令</h5>
<p><code v-pre>document.queryCommandSupported()</code>方法返回一个布尔值，表示浏览器是否支持<code v-pre>document.execCommand()</code>的某个命令。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>if (document.queryCommandSupported('SelectAll')) {
  console.log('浏览器支持选中可编辑区域的所有内容');
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_3-document-querycommandenabled-当前是否可用execcommand的某个命令" tabindex="-1"><a class="header-anchor" href="#_3-document-querycommandenabled-当前是否可用execcommand的某个命令" aria-hidden="true">#</a> （3）document.queryCommandEnabled() 当前是否可用execCommand的某个命令</h5>
<p><code v-pre>document.queryCommandEnabled()</code>方法返回一个布尔值，表示当前是否可用<code v-pre>document.execCommand()</code>的某个命令。比如，<code v-pre>bold</code>（加粗）命令只有存在文本选中时才可用，如果没有选中文本，就不可用。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML 代码为
// &lt;input type=&quot;button&quot; value=&quot;Copy&quot; onclick=&quot;doCopy()&quot;&gt;

function doCopy(){
  // 浏览器是否支持 copy 命令（选中内容复制到剪贴板）
  if (document.queryCommandSupported('copy')) {
    copyText('你好');
  }else{
    console.log('浏览器不支持');
  }
}

function copyText(text) {
  var input = document.createElement('textarea');
  document.body.appendChild(input);
  input.value = text;
  input.focus();
  input.select();

  // 当前是否有选中文字
  if (document.queryCommandEnabled('copy')) {
    var success = document.execCommand('copy');
    input.remove();
    console.log('Copy Ok');
  } else {
    console.log('queryCommandEnabled is false');
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，先判断浏览器是否支持<code v-pre>copy</code>命令（允许可编辑区域的选中内容，复制到剪贴板），如果支持，就新建一个临时文本框，里面写入内容“你好”，并将其选中。然后，判断是否选中成功，如果成功，就将“你好”复制到剪贴板，再删除那个临时文本框。</p>
<h4 id="_3-21-document-getselection" tabindex="-1"><a class="header-anchor" href="#_3-21-document-getselection" aria-hidden="true">#</a> 3.21 document.getSelection()</h4>
<p>这个方法指向<code v-pre>window.getSelection()</code>，参见<code v-pre>window</code>对象一节的介绍。</p>
<h2 id="六、element节点" tabindex="-1"><a class="header-anchor" href="#六、element节点" aria-hidden="true">#</a> 六、Element节点</h2>
<p><strong><code v-pre>Element</code>节点对象对应网页的 HTML 元素。每一个 HTML 元素，在 DOM 树上都会转化成一个<code v-pre>Element</code>节点对象（以下简称元素节点）。</strong></p>
<p>元素节点的<code v-pre>nodeType</code>属性都是<code v-pre>1</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var p = document.querySelector('p');
p.nodeName // &quot;P&quot;
p.nodeType // 1  节点类型 1代表元素节点
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>Element</code>对象继承了<code v-pre>Node</code>接口，因此**<code v-pre>Node</code>的属性和方法在<code v-pre>Element</code>对象都存在**。此外，<strong>不同的 HTML 元素对应的元素节点是不一样的，浏览器使用不同的构造函数，生成不同的元素节点</strong>，比如<code v-pre> &lt;a&gt; </code>元素的节点对象由<code v-pre>HTMLAnchorElement</code>构造函数生成，<code v-pre>&lt;button&gt;</code>元素的节点对象由<code v-pre>HTMLButtonElement</code>构造函数生成。因此，元素节点不是一种对象，而是一组对象，这些对象除了继承<code v-pre>Element</code>的属性和方法，还有各自构造函数的属性和方法。</p>
<p><strong>元素节点拥有 各自构造函数 的属性和方法，继承<code v-pre>Element</code>的属性和方法，同时继承<code v-pre>Node</code>的属性和方法。</strong></p>
<h3 id="_1、实例属性" tabindex="-1"><a class="header-anchor" href="#_1、实例属性" aria-hidden="true">#</a> 1、实例属性</h3>
<h4 id="_1-1-元素特性的相关属性" tabindex="-1"><a class="header-anchor" href="#_1-1-元素特性的相关属性" aria-hidden="true">#</a> 1.1 元素特性的相关属性</h4>
<h5 id="_1-element-id-返回元素id属性-可读写" tabindex="-1"><a class="header-anchor" href="#_1-element-id-返回元素id属性-可读写" aria-hidden="true">#</a> （1）Element.id 返回元素ID属性，可读写</h5>
<p><code v-pre>Element.id</code>属性<strong>返回指定元素的<code v-pre>id</code>属性，该属性可读写。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML 代码为 &lt;p id=&quot;foo&quot;&gt;
var p = document.querySelector('p');
p.id // &quot;foo&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，<code v-pre>id</code>属性的值是<strong>大小写敏感</strong>，即浏览器能正确识别<code v-pre> &lt;p id=&quot;foo&quot;&gt; </code>和<code v-pre> &lt;p id=&quot;FOO&quot;&gt; </code>这两个元素的<code v-pre>id</code>属性，但是最好不要这样命名。</p>
<h5 id="_2-element-tagname-返回元素的大写标签" tabindex="-1"><a class="header-anchor" href="#_2-element-tagname-返回元素的大写标签" aria-hidden="true">#</a> （2）Element.tagName 返回元素的大写标签</h5>
<p><code v-pre>Element.tagName</code>属性<strong>返回指定元素的大写标签名，与<code v-pre>nodeName</code>属性的值相等。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML代码为
// &lt;span id=&quot;myspan&quot;&gt;Hello&lt;/span&gt;
var span = document.getElementById('myspan');
span.id // &quot;myspan&quot;
span.tagName // &quot;SPAN&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_3-element-dir-元素的文字方向-可读写-ltr、rtl" tabindex="-1"><a class="header-anchor" href="#_3-element-dir-元素的文字方向-可读写-ltr、rtl" aria-hidden="true">#</a> （3）Element.dir 元素的文字方向，可读写（ltr、rtl）</h5>
<p><code v-pre>Element.dir</code>属性<strong>用于读写当前元素的文字方向</strong>，可能是从左到右（<code v-pre>&quot;ltr&quot;</code>），也可能是从右到左（<code v-pre>&quot;rtl&quot;</code>）。</p>
<h5 id="_4-element-accesskey-分配给当前元素的快捷键-可读写" tabindex="-1"><a class="header-anchor" href="#_4-element-accesskey-分配给当前元素的快捷键-可读写" aria-hidden="true">#</a> （4）Element.accessKey 分配给当前元素的快捷键，可读写</h5>
<p><code v-pre>Element.accessKey</code>属性<strong>用于读写分配给当前元素的快捷键</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML 代码如下
// &lt;button accesskey=&quot;h&quot; id=&quot;btn&quot;&gt;点击&lt;/button&gt;
var btn = document.getElementById('btn');
btn.accessKey // &quot;h&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>btn</code>元素的快捷键是<code v-pre>h</code>，按下<code v-pre>Alt + h</code>就能将焦点转移到它上面。</p>
<h5 id="_5-element-draggable-当前元素是否可拖动-布尔值-可读写" tabindex="-1"><a class="header-anchor" href="#_5-element-draggable-当前元素是否可拖动-布尔值-可读写" aria-hidden="true">#</a> （5）Element.draggable 当前元素是否可拖动，布尔值，可读写</h5>
<p><code v-pre>Element.draggable</code>属性<strong>返回一个布尔值，表示当前元素是否可拖动。该属性可读写。</strong></p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;p draggable=&quot;true&quot; ondragstart=&quot;drag(this)&quot;&gt;这是一段可移动的段落。&lt;/p&gt;
&lt;script&gt;
    function drag(el) {
      console.log(el.draggable) // true
    }
&lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_6-element-lang-返回当前元素的语言设置-可读写" tabindex="-1"><a class="header-anchor" href="#_6-element-lang-返回当前元素的语言设置-可读写" aria-hidden="true">#</a> （6）Element.lang 返回当前元素的语言设置，可读写</h5>
<p><code v-pre>Element.lang</code>属性<strong>返回当前元素的语言设置。该属性可读写。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML 代码如下
// &lt;html lang=&quot;en&quot;&gt;
document.documentElement.lang // &quot;en&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_7-element-tabindex-当前元素在-tab-键遍历时的顺序-整数-可读写" tabindex="-1"><a class="header-anchor" href="#_7-element-tabindex-当前元素在-tab-键遍历时的顺序-整数-可读写" aria-hidden="true">#</a> （7）Element.tabIndex 当前元素在 Tab 键遍历时的顺序，整数，可读写</h5>
<p><code v-pre>Element.tabIndex</code>属性<strong>返回一个整数，表示当前元素在 Tab 键遍历时的顺序。该属性可读写。</strong></p>
<p><code v-pre>tabIndex</code>属性值<strong>如果是负值（通常是<code v-pre>-1</code>），则 Tab 键不会遍历到该元素</strong>。如果是正整数，则按照顺序，从小到大遍历。如果两个元素的<code v-pre>tabIndex</code>属性的正整数值相同，则按照出现的顺序遍历。遍历完所有<code v-pre>tabIndex</code>为正整数的元素以后，再遍历所有<code v-pre>tabIndex</code>等于<code v-pre>0</code>、或者属性值是非法值、或者没有<code v-pre>tabIndex</code>属性的元素，顺序为它们在网页中出现的顺序。</p>
<h5 id="_8-element-title-当前元素的-html-属性title-可读写" tabindex="-1"><a class="header-anchor" href="#_8-element-title-当前元素的-html-属性title-可读写" aria-hidden="true">#</a> （8）Element.title 当前元素的 HTML 属性<code v-pre>title</code>，可读写</h5>
<p><code v-pre>Element.title</code>属性<strong>用来读写当前元素的 HTML 属性<code v-pre>title</code>。该属性通常用来指定，鼠标悬浮时弹出的文字提示框。</strong></p>
<h4 id="_1-2-元素状态的相关属性" tabindex="-1"><a class="header-anchor" href="#_1-2-元素状态的相关属性" aria-hidden="true">#</a> 1.2 元素状态的相关属性</h4>
<h5 id="_1-element-hidden-当前元素的hidden属性-控制是否可见-布尔值-可读写" tabindex="-1"><a class="header-anchor" href="#_1-element-hidden-当前元素的hidden属性-控制是否可见-布尔值-可读写" aria-hidden="true">#</a> （1）Element.hidden 当前元素的hidden属性，控制是否可见，布尔值，可读写</h5>
<p><code v-pre>Element.hidden</code>属性<strong>返回一个布尔值，表示当前元素的<code v-pre>hidden</code>属性，用来控制当前元素是否可见。该属性可读写。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var btn = document.getElementById('btn');
var mydiv = document.getElementById('mydiv');

btn.addEventListener('click', function () {
  mydiv.hidden = !mydiv.hidden;
}, false);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意，该属性与 CSS 设置是互相独立的</strong>。CSS 对这个元素可见性的设置，<code v-pre>Element.hidden</code>并不能反映出来。也就是说，这个属性并不能用来判断当前元素的实际可见性。</p>
<p>**CSS 的设置高于<code v-pre>Element.hidden</code>。**如果 CSS 指定了该元素不可见（<code v-pre>display: none</code>）或可见（<code v-pre>display: hidden</code>），那么<code v-pre>Element.hidden</code>并不能改变该元素实际的可见性。换言之，<strong>这个属性只在 CSS 没有明确设定当前元素的可见性时才有效。</strong></p>
<h5 id="_2-element-contenteditable元素内容的可编辑性-字符串-可读写" tabindex="-1"><a class="header-anchor" href="#_2-element-contenteditable元素内容的可编辑性-字符串-可读写" aria-hidden="true">#</a> （2）Element.contentEditable元素内容的可编辑性，字符串，可读写，</h5>
<h5 id="element-iscontenteditable-元素内容是否可编辑-布尔值-只读" tabindex="-1"><a class="header-anchor" href="#element-iscontenteditable-元素内容是否可编辑-布尔值-只读" aria-hidden="true">#</a> Element.isContentEditable 元素内容是否可编辑，布尔值，只读</h5>
<p>HTML 元素可以设置<code v-pre>contentEditable</code>属性，使得元素的内容可以编辑。</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;div contenteditable&gt;123&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码中，<code v-pre> &lt;div&gt; </code>元素有<code v-pre>contenteditable</code>属性，因此用户可以在网页上编辑这个区块的内容。</p>
<p><code v-pre>Element.contentEditable</code>属性返回一个字符串，表示是否设置了<code v-pre>contenteditable</code>属性，有三种可能的值。该属性可写。</p>
<ul>
<li><code v-pre>&quot;true&quot;</code>：元素内容可编辑</li>
<li><code v-pre>&quot;false&quot;</code>：元素内容不可编辑</li>
<li><code v-pre>&quot;inherit&quot;</code>：元素是否可编辑，继承了父元素的设置</li>
</ul>
<p><code v-pre>Element.isContentEditable</code>属性返回一个布尔值，同样表示是否设置了<code v-pre>contenteditable</code>属性。该属性只读。</p>
<h4 id="_1-3-element-attributes-类数组-成员是元素的所有html属性节点" tabindex="-1"><a class="header-anchor" href="#_1-3-element-attributes-类数组-成员是元素的所有html属性节点" aria-hidden="true">#</a> 1.3 Element.attributes 类数组，成员是元素的所有HTML属性节点</h4>
<p><code v-pre>Element.attributes</code>属性<strong>返回一个类似数组的对象，成员是当前元素节点的所有属性节点</strong>，详见《属性的操作》一章。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var p = document.querySelector('p');
var attrs = p.attributes;

for (var i = attrs.length - 1; i &gt;= 0; i--) {
  console.log(attrs[i].name + '-&gt;' + attrs[i].value);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码遍历<code v-pre>p</code>元素的所有属性。</p>
<h4 id="_1-4-element-classname-元素的class-element-classlist-类数组-成员是各class-有自身方法" tabindex="-1"><a class="header-anchor" href="#_1-4-element-classname-元素的class-element-classlist-类数组-成员是各class-有自身方法" aria-hidden="true">#</a> 1.4 Element.className 元素的class，Element.classList 类数组，成员是各class，有自身方法</h4>
<p><code v-pre>className</code>属性**用来读写当前元素节点的<code v-pre>class</code>属性。**它的值是一个字符串，每个<code v-pre>class</code>之间用空格分割。</p>
<p><code v-pre>classList</code>属性<strong>返回一个类似数组的对象，当前元素节点的每个<code v-pre>class</code>就是这个对象的一个成员。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML 代码 &lt;div class=&quot;one two three&quot; id=&quot;myDiv&quot;&gt;&lt;/div&gt;
var div = document.getElementById('myDiv');

div.className
// &quot;one two three&quot;

div.classList
// {
//   0: &quot;one&quot;
//   1: &quot;two&quot;
//   2: &quot;three&quot;
//   length: 3
// }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>className</code>属性返回一个空格分隔的字符串，而<code v-pre>classList</code>属性指向一个类似数组的对象，该对象的<code v-pre>length</code>属性（只读）返回当前元素的<code v-pre>class</code>数量。</p>
<h6 id="classlist对象有下列方法。" tabindex="-1"><a class="header-anchor" href="#classlist对象有下列方法。" aria-hidden="true">#</a> <code v-pre>classList</code>对象有下列方法。</h6>
<ul>
<li><strong><code v-pre>add()</code>：增加一个 class。</strong></li>
<li><strong><code v-pre>remove()</code>：移除一个 class。</strong></li>
<li><strong><code v-pre>contains()</code>：检查当前元素是否包含某个 class。</strong></li>
<li><strong><code v-pre>toggle()</code>：将某个 class 移入或移出当前元素。</strong></li>
<li><strong><code v-pre>item()</code>：返回指定索引位置的 class。</strong></li>
<li><strong><code v-pre>toString()</code>：将 class 的列表转为字符串。</strong></li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var div = document.getElementById('myDiv');

div.classList.add('myCssClass');
div.classList.add('foo', 'bar');
div.classList.remove('myCssClass');
div.classList.toggle('myCssClass'); // 如果 myCssClass 不存在就加入，否则移除
div.classList.contains('myCssClass'); // 返回 true 或者 false
div.classList.item(0); // 返回第一个 Class
div.classList.toString();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面比较一下，<code v-pre>className</code>和<code v-pre>classList</code>在添加和删除某个 class 时的写法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var foo = document.getElementById('foo');

// 添加class
foo.className += 'bold';
foo.classList.add('bold');

// 删除class
foo.classList.remove('bold');
foo.className = foo.className.replace(/^bold$/, '');
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**<code v-pre>toggle</code>方法可以接受一个布尔值，作为第二个参数。**如果为<code v-pre>true</code>，则添加该属性；如果为<code v-pre>false</code>，则去除该属性。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>el.classList.toggle('abc', boolValue);

// 等同于
if (boolValue) {
  el.classList.add('abc');
} else {
  el.classList.remove('abc');
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-5-element-dataset-返回一个对象-读写元素的data-属性" tabindex="-1"><a class="header-anchor" href="#_1-5-element-dataset-返回一个对象-读写元素的data-属性" aria-hidden="true">#</a> 1.5 Element.dataset 返回一个对象，读写元素的data-属性</h4>
<p>网页元素可以自定义<code v-pre>data-</code>属性，用来添加数据。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>&lt;div data-timestamp=&quot;1522907809292&quot;&gt;&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码中，<code v-pre> &lt;div&gt; </code>元素有一个自定义的<code v-pre>data-timestamp</code>属性，用来为该元素添加一个时间戳。</p>
<p><code v-pre>Element.dataset</code>属性<strong>返回一个对象，可以从这个对象读写<code v-pre>data-</code>属性。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// &lt;article
//   id=&quot;foo&quot;
//   data-columns=&quot;3&quot;
//   data-index-number=&quot;12314&quot;
//   data-parent=&quot;cars&quot;&gt;
//   ...
// &lt;/article&gt;
var article = document.getElementById('foo');
article.dataset.columns // &quot;3&quot;
article.dataset.indexNumber // &quot;12314&quot;
article.dataset.parent // &quot;cars&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，<code v-pre>dataset</code>上面的各个属性返回都是字符串。</p>
<p>HTML 代码中，<code v-pre>data-</code>属性的属性名，只能包含英文字母、数字、连词线（<code v-pre>-</code>）、点（<code v-pre>.</code>）、冒号（<code v-pre>:</code>）和下划线（<code v-pre>_</code>）。它们转成 JavaScript 对应的<code v-pre>dataset</code>属性名，<strong>规则如下</strong>。</p>
<ul>
<li><strong>开头的<code v-pre>data-</code>会省略。</strong></li>
<li><strong>如果连词线后面跟了一个英文字母，那么连词线会取消，该字母变成大写。</strong></li>
<li><strong>其他字符不变。</strong></li>
</ul>
<p>因此，<code v-pre>data-abc-def</code>对应<code v-pre>dataset.abcDef</code>，<code v-pre>data-abc-1</code>对应<code v-pre>dataset[&quot;abc-1&quot;]</code>。</p>
<p>除了使用<code v-pre>dataset</code>读写<code v-pre>data-</code>属性，也<strong>可以使用<code v-pre>Element.getAttribute()</code>和<code v-pre>Element.setAttribute()</code>，通过完整的属性名读写这些属性。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var mydiv = document.getElementById('mydiv');

mydiv.dataset.foo = 'bar';
mydiv.getAttribute('data-foo') // &quot;bar&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-6-element-innerhtml-返回一个字符串-是元素包含的所有-html-代码-可读写" tabindex="-1"><a class="header-anchor" href="#_1-6-element-innerhtml-返回一个字符串-是元素包含的所有-html-代码-可读写" aria-hidden="true">#</a> 1.6 Element.innerHTML 返回一个字符串，是元素包含的所有 HTML 代码，可读写</h4>
<p><code v-pre>Element.innerHTML</code>属性<strong>返回一个字符串，等同于该元素包含的所有 HTML 代码</strong>。该属性<strong>可读写</strong>，常用来设置某个节点的内容。它能改写所有元素节点的内容，包括<code v-pre>&lt;HTML&gt;</code>和<code v-pre>&lt;body&gt;</code>元素。</p>
<p>如果将<code v-pre>innerHTML</code>属性设为空，等于删除所有它包含的所有节点。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>el.innerHTML = '';
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码等于将<code v-pre>el</code>节点变成了一个空节点，<code v-pre>el</code>原来包含的节点被全部删除。</p>
<p>注意，读取属性值的时候，如果文本节点包含<code v-pre>&amp;</code>、小于号（<code v-pre>&lt;</code>）和大于号（<code v-pre>&gt;</code>），<code v-pre>innerHTML</code>属性会将它们转为实体形式 <code v-pre>&amp; amp;</code>、<code v-pre>&amp; lt;</code>、<code v-pre>&amp; gt;</code> 。如果想得到原文，建议使用<code v-pre>element.textContent</code>属性。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML代码如下 &lt;p id=&quot;para&quot;&gt; 5 &gt; 3 &lt; 6 &amp;&lt;/p&gt;
document.getElementById('para').innerHTML
// 5 &amp;gt; 3 &amp;lt; &amp;amp;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>写入的时候，如果插入的<strong>文本包含 HTML 标签，会被解析成为节点对象插入 DOM</strong>。注意，如果文本之中含有<code v-pre> &lt;script&gt; </code>标签，虽然可以生成<code v-pre>script</code>节点，但是插入的代码不会执行。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var name = &quot;&lt;script&gt;alert('haha')&lt;/script&gt;&quot;; // 插入包含js代码字符串，插入后js不会执行
el.innerHTML = name;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码将脚本插入内容，脚本并不会执行。但是，<code v-pre>innerHTML</code>还是有安全风险的。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var name = &quot;&lt;img src=x onerror=alert(1)&gt;&quot;;
el.innerHTML = name;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>alert</code>方法是会执行的。<strong>因此为了安全考虑，如果插入的是文本，最好用<code v-pre>textContent</code>属性代替<code v-pre>innerHTML</code>。</strong></p>
<h4 id="_1-7-element-outerhtml-返回一个字符串-包含元素本身和所有子元素的html代码-可读写" tabindex="-1"><a class="header-anchor" href="#_1-7-element-outerhtml-返回一个字符串-包含元素本身和所有子元素的html代码-可读写" aria-hidden="true">#</a> 1.7 Element.outerHTML 返回一个字符串，包含元素本身和所有子元素的HTML代码，可读写</h4>
<p><code v-pre>Element.outerHTML</code>属性<strong>返回一个字符串，表示当前元素节点的所有 HTML 代码，包括该元素本身和所有子元素。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML 代码如下
// &lt;div id=&quot;d&quot;&gt;&lt;p&gt;Hello&lt;/p&gt;&lt;/div&gt;
var d = document.getElementById('d');
d.outerHTML
// '&lt;div id=&quot;d&quot;&gt;&lt;p&gt;Hello&lt;/p&gt;&lt;/div&gt;'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>outerHTML</code>属性是<strong>可读写</strong>的，<strong>对它进行赋值，等于替换掉当前元素。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML 代码如下
// &lt;div id=&quot;container&quot;&gt;&lt;div id=&quot;d&quot;&gt;Hello&lt;/div&gt;&lt;/div&gt;
var container = document.getElementById('container');
var d = document.getElementById('d');
container.firstChild.nodeName // &quot;DIV&quot;
d.nodeName // &quot;DIV&quot;

d.outerHTML = '&lt;p&gt;Hello&lt;/p&gt;'; //div替换成p标签
container.firstChild.nodeName // &quot;P&quot;
d.nodeName // &quot;DIV&quot;  但是变量b依旧指向原来的div元素，还存在于内存中
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，变量<code v-pre>d</code>代表子节点，它的<code v-pre>outerHTML</code>属性重新赋值以后，内层的<code v-pre>div</code>元素就不存在了，被<code v-pre>p</code>元素替换了。但是，<strong>变量<code v-pre>d</code>依然指向原来的<code v-pre>div</code>元素，这表示被替换的<code v-pre>DIV</code>元素还存在于内存中。</strong></p>
<p>注意，如果一个<strong>节点没有父节点，设置<code v-pre>outerHTML</code>属性会报错</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var div = document.createElement('div');
div.outerHTML = '&lt;p&gt;test&lt;/p&gt;';
// DOMException: This element has no parent node.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>div</code>元素没有父节点，设置<code v-pre>outerHTML</code>属性会报错。</p>
<h4 id="_1-8-element-clientheight-元素高度-element-clientwidth元素宽度" tabindex="-1"><a class="header-anchor" href="#_1-8-element-clientheight-元素高度-element-clientwidth元素宽度" aria-hidden="true">#</a> 1.8 Element.clientHeight 元素高度，Element.clientWidth元素宽度</h4>
<p><code v-pre>Element.clientHeight</code>属性返回一个整数值，表示<strong>元素节点的 CSS 高度</strong>（单位像素），<strong>只对块级元素生效，对于行内元素返回<code v-pre>0</code></strong>。如果块级元素没有设置 CSS 高度，则返回实际高度。</p>
<p>除了元素本身的高度，它还<strong>包括<code v-pre>padding</code>部分</strong>，但是不包括<code v-pre>border</code>、<code v-pre>margin</code>。如果有水平滚动条，还要减去水平滚动条的高度。注意，这个值始终是整数，如果是小数会被四舍五入。</p>
<p><code v-pre>Element.clientWidth</code>属性返回<strong>元素节点的 CSS 宽度，同样只对块级元素有效</strong>，也是只包括元素本身的宽度和<code v-pre>padding</code>，如果有垂直滚动条，还要减去垂直滚动条的宽度。</p>
<p><code v-pre>document.documentElement</code>的<code v-pre>clientHeight</code>属性，返回当前视口的高度（即浏览器窗口的高度），等同于<code v-pre>window.innerHeight</code>属性减去水平滚动条的高度（如果有的话）。<code v-pre>document.body</code>的高度则是网页的实际高度。一般来说，<code v-pre>document.body.clientHeight</code>大于<code v-pre>document.documentElement.clientHeight</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 视口高度  不包括不可见的部分
document.documentElement.clientHeight

// 网页总高度
document.body.clientHeight
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-9-element-clientleft-左边框宽度-element-clienttop上边框宽" tabindex="-1"><a class="header-anchor" href="#_1-9-element-clientleft-左边框宽度-element-clienttop上边框宽" aria-hidden="true">#</a> 1.9 Element.clientLeft 左边框宽度，Element.clientTop上边框宽</h4>
<p><code v-pre>Element.clientLeft</code>属性等于元素节点<strong>左边框（left border）的宽度</strong>（单位像素），不包括左侧的<code v-pre>padding</code>和<code v-pre>margin</code>。如果没有设置左边框，或者是行内元素（<code v-pre>display: inline</code>），该属性返回<code v-pre>0</code>。该属性总是返回整数值，如果是小数，会四舍五入。</p>
<p><code v-pre>Element.clientTop</code>属性等于网页元素<strong>顶部边框的宽度</strong>（单位像素），其他特点都与<code v-pre>clientLeft</code>相同。</p>
<h4 id="_1-10-element-scrollheight-元素总高度-element-scrollwidth-元素总宽度" tabindex="-1"><a class="header-anchor" href="#_1-10-element-scrollheight-元素总高度-element-scrollwidth-元素总宽度" aria-hidden="true">#</a> 1.10 Element.scrollHeight 元素总高度，Element.scrollWidth 元素总宽度</h4>
<p><code v-pre>Element.scrollHeight</code>属性返回一个整数值（小数会四舍五入），表示当前<strong>元素的总高度</strong>（单位像素），<strong>包括溢出容器、当前不可见的部分。它包括<code v-pre>padding</code></strong>，但是不包括<code v-pre>border</code>、<code v-pre>margin</code>以及水平滚动条的高度（如果有水平滚动条的话），还包括伪元素（<code v-pre>::before</code>或<code v-pre>::after</code>）的高度。</p>
<p><code v-pre>Element.scrollWidth</code>属性表示当前<strong>元素的总宽度</strong>（单位像素），其他地方都与<code v-pre>scrollHeight</code>属性类似。这两个属性只读。</p>
<p><strong>整张网页的总高度</strong>可以从<code v-pre>document.documentElement</code>或<code v-pre>document.body</code>上读取。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 返回网页的总高度
document.documentElement.scrollHeight
document.body.scrollHeight
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，如果元素节点的内容出现溢出，即使溢出的内容是隐藏的，<code v-pre>scrollHeight</code>属性仍然返回元素的总高度。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML 代码如下
// &lt;div id=&quot;myDiv&quot; style=&quot;height: 200px; overflow: hidden;&quot;&gt;...&lt;div&gt;
document.getElementById('myDiv').scrollHeight // 356
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，即使<code v-pre>myDiv</code>元素的 CSS 高度只有200像素，且溢出部分不可见，但是<code v-pre>scrollHeight</code>仍然会返回该元素的原始高度。</p>
<h4 id="_1-11-element-scrollleft-元素水平滚动条右侧滚动的像素量-element-scrolltop-元素垂直滚动条向下滚动的像素量" tabindex="-1"><a class="header-anchor" href="#_1-11-element-scrollleft-元素水平滚动条右侧滚动的像素量-element-scrolltop-元素垂直滚动条向下滚动的像素量" aria-hidden="true">#</a> 1.11 Element.scrollLeft 元素水平滚动条右侧滚动的像素量，Element.scrollTop 元素垂直滚动条向下滚动的像素量</h4>
<p><code v-pre>Element.scrollLeft</code>属性表示<strong>当前元素的水平滚动条向右侧滚动的像素数量</strong>，<code v-pre>Element.scrollTop</code>属性表示<strong>当前元素的垂直滚动条向下滚动的像素数量</strong>。对于那些没有滚动条的网页元素，这两个属性总是等于0。</p>
<p>如果要查看整张网页的水平的和垂直的滚动距离，要从<code v-pre>document.documentElement</code>元素上读取。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document.documentElement.scrollLeft
document.documentElement.scrollTop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这两个属性都<strong>可读写</strong>，设置该属性的值，会导致浏览器将当前元素自动滚动到相应的位置。</p>
<h4 id="_1-12-element-offsetparent-返回最靠近当前元素的、并且-css-的position属性不等于static的上层元素" tabindex="-1"><a class="header-anchor" href="#_1-12-element-offsetparent-返回最靠近当前元素的、并且-css-的position属性不等于static的上层元素" aria-hidden="true">#</a> 1.12 Element.offsetParent 返回最靠近当前元素的、并且 CSS 的<code v-pre>position</code>属性不等于<code v-pre>static</code>的上层元素</h4>
<p><code v-pre>Element.offsetParent</code>属性<strong>返回最靠近当前元素的、并且 CSS 的<code v-pre>position</code>属性不等于<code v-pre>static</code>的上层元素</strong>。</p>
<blockquote>
<p>position:static; 即默认没有定位的样式。</p>
</blockquote>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>&lt;div style=&quot;position: absolute;&quot;&gt;
  &lt;p&gt;
    &lt;span&gt;Hello&lt;/span&gt;
  &lt;/p&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>span</code>元素的<code v-pre>offsetParent</code>属性就是<code v-pre>div</code>元素。</p>
<p><strong>该属性主要用于确定子元素位置偏移的计算基准</strong>，<code v-pre>Element.offsetTop</code>和<code v-pre>Element.offsetLeft</code>就是<code v-pre>offsetParent</code>元素计算的。</p>
<p>如果该元素是不可见的（<code v-pre>display</code>属性为<code v-pre>none</code>），或者位置是固定的（<code v-pre>position</code>属性为<code v-pre>fixed</code>），则<code v-pre>offsetParent</code>属性返回<code v-pre>null</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>&lt;div style=&quot;position: absolute;&quot;&gt;
  &lt;p&gt;
    &lt;span style=&quot;display: none;&quot;&gt;Hello&lt;/span&gt;
  &lt;/p&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>span</code>元素的<code v-pre>offsetParent</code>属性是<code v-pre>null</code>。</p>
<p>如果某个元素的所有上层节点的<code v-pre>position</code>属性都是<code v-pre>static</code>，则<code v-pre>Element.offsetParent</code>属性指向<code v-pre>&lt;body&gt;</code>元素。</p>
<h4 id="_1-13-element-offsetheight-元素的css垂直高度-element-offsetwidth元素的css水平宽度" tabindex="-1"><a class="header-anchor" href="#_1-13-element-offsetheight-元素的css垂直高度-element-offsetwidth元素的css水平宽度" aria-hidden="true">#</a> 1.13 Element.offsetHeight 元素的CSS垂直高度，Element.offsetWidth元素的CSS水平宽度</h4>
<p><code v-pre>Element.offsetHeight</code>属性返回一个整数，表示<strong>元素的 CSS 垂直高度</strong>（单位像素），**包括元素本身的高度、padding 和 border，以及水平滚动条的高度（**如果存在滚动条）。</p>
<p><code v-pre>Element.offsetWidth</code>属性表示<strong>元素的 CSS 水平宽度</strong>（单位像素），其他都与<code v-pre>Element.offsetHeight</code>一致。</p>
<p>这两个属性都是<strong>只读属性</strong>，只比<code v-pre>Element.clientHeight</code>和<code v-pre>Element.clientWidth</code>多了边框的高度或宽度。如果元素的 CSS 设为不可见（比如<code v-pre>display: none;</code>），则返回<code v-pre>0</code>。</p>
<h4 id="_1-14-element-offsetleft-水平位移-element-offsettop-垂直位移" tabindex="-1"><a class="header-anchor" href="#_1-14-element-offsetleft-水平位移-element-offsettop-垂直位移" aria-hidden="true">#</a> 1.14 Element.offsetLeft 水平位移，Element.offsetTop 垂直位移</h4>
<p><code v-pre>Element.offsetLeft</code>返回当前<strong>元素左上角相对于<code v-pre>Element.offsetParent</code>节点的水平位移</strong>，<code v-pre>Element.offsetTop</code>返回<strong>垂直位移</strong>，单位为像素。通常，这两个值是指相对于父节点的位移。</p>
<p>下面的代码可以算出元素左上角相对于整张网页的坐标。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function getElementPosition(e) {
  var x = 0;
  var y = 0;
  while (e !== null)  {
    x += e.offsetLeft;
    y += e.offsetTop;
    e = e.offsetParent;
  }
  return {x: x, y: y};
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-15-element-style-返回cssstyledeclaration实例-用于操作css" tabindex="-1"><a class="header-anchor" href="#_1-15-element-style-返回cssstyledeclaration实例-用于操作css" aria-hidden="true">#</a> 1.15 Element.style 返回CSSStyleDeclaration实例，用于操作CSS</h4>
<p>每个元素节点都有<code v-pre>style</code>用来读写该<strong>元素的行内样式信息</strong>，具体介绍参见《CSS 操作》一章。</p>
<h4 id="_1-16-element-children-类数组-所有子元素-element-childelementcount-子元素个数" tabindex="-1"><a class="header-anchor" href="#_1-16-element-children-类数组-所有子元素-element-childelementcount-子元素个数" aria-hidden="true">#</a> 1.16 Element.children 类数组，所有子元素，Element.childElementCount 子元素个数</h4>
<p><code v-pre>Element.children</code>属性<strong>返回一个类似数组的对象（<code v-pre>HTMLCollection</code>实例），包括当前元素节点的所有子元素</strong>。如果当前元素没有子元素，则返回的对象包含零个成员。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>if (para.children.length) {
  var children = para.children;
    for (var i = 0; i &lt; children.length; i++) {
      // ...
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码遍历了<code v-pre>para</code>元素的所有子元素。</p>
<p>这个属性与<code v-pre>Node.childNodes</code>属性的区别是，它只包括元素类型的子节点，不包括其他类型的子节点。</p>
<p><code v-pre>Element.childElementCount</code>属性返回当前元素节点包含的<strong>子元素节点的个数</strong>，与<code v-pre>Element.children.length</code>的值相同。</p>
<h4 id="_1-17-element-firstelementchild-首个子元素-element-lastelementchild-最后一个子元素" tabindex="-1"><a class="header-anchor" href="#_1-17-element-firstelementchild-首个子元素-element-lastelementchild-最后一个子元素" aria-hidden="true">#</a> 1.17 Element.firstElementChild 首个子元素，Element.lastElementChild 最后一个子元素</h4>
<p><code v-pre>Element.firstElementChild</code>属性返回当前元素的第一个元素子节点，<code v-pre>Element.lastElementChild</code>返回最后一个元素子节点。</p>
<p>如果没有元素子节点，这两个属性返回<code v-pre>null</code>。</p>
<h4 id="_1-18-element-nextelementsibling后一个兄弟元素节点-element-previouselementsibling上一个兄弟元素节点" tabindex="-1"><a class="header-anchor" href="#_1-18-element-nextelementsibling后一个兄弟元素节点-element-previouselementsibling上一个兄弟元素节点" aria-hidden="true">#</a> 1.18 Element.nextElementSibling后一个兄弟元素节点，Element.previousElementSibling上一个兄弟元素节点</h4>
<p><code v-pre>Element.nextElementSibling</code>属性返回当前元素节点的<strong>后一个同级元素节点</strong>，如果没有则返回<code v-pre>null</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML 代码如下
// &lt;div id=&quot;div-01&quot;&gt;Here is div-01&lt;/div&gt;
// &lt;div id=&quot;div-02&quot;&gt;Here is div-02&lt;/div&gt;
var el = document.getElementById('div-01');
el.nextElementSibling
// &lt;div id=&quot;div-02&quot;&gt;Here is div-02&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>Element.previousElementSibling</code>属性返回当前元素节点的<strong>前一个同级元素节点</strong>，如果没有则返回<code v-pre>null</code>。</p>
<h3 id="_2、实例方法" tabindex="-1"><a class="header-anchor" href="#_2、实例方法" aria-hidden="true">#</a> 2、实例方法</h3>
<h4 id="_2-1-标签属性相关方法" tabindex="-1"><a class="header-anchor" href="#_2-1-标签属性相关方法" aria-hidden="true">#</a> 2.1 标签属性相关方法</h4>
<p>元素节点提供六个方法，用来操作属性。</p>
<h5 id="_1-getattribute-读取某个属性的值" tabindex="-1"><a class="header-anchor" href="#_1-getattribute-读取某个属性的值" aria-hidden="true">#</a> （1）<code v-pre>getAttribute()</code>：读取某个属性的值</h5>
<h5 id="_2-getattributenames-返回当前元素的所有属性名" tabindex="-1"><a class="header-anchor" href="#_2-getattributenames-返回当前元素的所有属性名" aria-hidden="true">#</a> （2）<code v-pre>getAttributeNames()</code>：返回当前元素的所有属性名</h5>
<h5 id="_3-setattribute-写入属性值" tabindex="-1"><a class="header-anchor" href="#_3-setattribute-写入属性值" aria-hidden="true">#</a> （3）<code v-pre>setAttribute()</code>：写入属性值</h5>
<h5 id="_4-hasattribute-某个属性是否存在" tabindex="-1"><a class="header-anchor" href="#_4-hasattribute-某个属性是否存在" aria-hidden="true">#</a> （4）<code v-pre>hasAttribute()</code>：某个属性是否存在</h5>
<h5 id="_5-hasattributes-当前元素是否有属性" tabindex="-1"><a class="header-anchor" href="#_5-hasattributes-当前元素是否有属性" aria-hidden="true">#</a> （5）<code v-pre>hasAttributes()</code>：当前元素是否有属性</h5>
<h5 id="_6-removeattribute-删除属性" tabindex="-1"><a class="header-anchor" href="#_6-removeattribute-删除属性" aria-hidden="true">#</a> （6）<code v-pre>removeAttribute()</code>：删除属性</h5>
<p>这些方法的介绍请看《<strong>属性的操作</strong>》一章。</p>
<h4 id="_2-2-element-queryselector-返回第一个匹配的子元素" tabindex="-1"><a class="header-anchor" href="#_2-2-element-queryselector-返回第一个匹配的子元素" aria-hidden="true">#</a> 2.2 Element.querySelector() 返回第一个匹配的子元素</h4>
<p><code v-pre>Element.querySelector</code>方法接受 <strong>CSS 选择器作为参数，返回父元素的第一个匹配的子元素</strong>。如果没有找到匹配的子元素，就返回<code v-pre>null</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var content = document.getElementById('content');
var el = content.querySelector('p');
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码返回<code v-pre>content</code>节点的第一个<code v-pre>p</code>元素。</p>
<p><code v-pre>Element.querySelector</code>方法<strong>可以接受任何复杂的 CSS 选择器</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document.body.querySelector(&quot;style[type='text/css'], style:not([type])&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注意，这个方法无法选中伪元素。</p>
<p>它可以接受多个选择器，它们之间使用逗号分隔。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>element.querySelector('div, p')
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码返回<code v-pre>element</code>的第一个<code v-pre>div</code>或<code v-pre>p</code>子元素。</p>
<p>需要<strong>注意</strong>的是，浏览器执行<code v-pre>querySelector</code>方法时，是先在全局范围内搜索给定的 CSS 选择器，然后过滤出哪些属于当前元素的子元素。因此，会有一些违反直觉的结果，下面是一段 HTML 代码。</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;div&gt;
&lt;p&gt;111&lt;/p&gt;
&lt;blockquote id=&quot;outer&quot;&gt;
  &lt;p&gt;Hello&lt;/p&gt;
  &lt;div id=&quot;inner&quot;&gt;
    &lt;p&gt;World&lt;/p&gt;
  &lt;/div&gt;
&lt;/blockquote&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么，像下面这样查询的话，实际上返回的是第一个<code v-pre>p</code>元素，而不是第二个。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var outer = document.getElementById('outer');
outer.querySelector('div p')
// &lt;p&gt;Hello&lt;/p&gt;
// 违反自觉的结果，是因为会全局范围搜索到outer外面的div，然后再选出当前元素outer的子元素第一个p

outer.querySelector('div').querySelector('p')
// &lt;p&gt;World&lt;/p&gt; 这样就能拿到里面的p元素
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-3-element-queryselectorall-返回nodelist实例-包含所有子元素" tabindex="-1"><a class="header-anchor" href="#_2-3-element-queryselectorall-返回nodelist实例-包含所有子元素" aria-hidden="true">#</a> 2.3 Element.querySelectorAll() 返回NodeList实例，包含所有子元素</h4>
<p><code v-pre>Element.querySelectorAll</code>方法接受 CSS 选择器作为参数，<strong>返回一个<code v-pre>NodeList</code>实例，包含所有匹配的子元素</strong>。</p>
<blockquote>
<p>返回的NodeList实例是<strong>类数组对象</strong></p>
</blockquote>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var el = document.querySelector('#test');
var matches = el.querySelectorAll('div.highlighted &gt; p');
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>该方法的执行机制与<code v-pre>querySelector</code>方法相同，也是<strong>先在全局范围内查找，再过滤出当前元素的子元素</strong>。因此，选择器实际上针对整个文档的。</p>
<p>它也可以接受多个 CSS 选择器，它们之间使用逗号分隔。如果选择器里面有伪元素的选择器，则总是返回一个空的<code v-pre>NodeList</code>实例。</p>
<h4 id="_2-4-element-getelementsbyclassname-通过class获取所有子元素" tabindex="-1"><a class="header-anchor" href="#_2-4-element-getelementsbyclassname-通过class获取所有子元素" aria-hidden="true">#</a> 2.4 Element.getElementsByClassName() 通过class获取所有子元素</h4>
<p><code v-pre>Element.getElementsByClassName</code>方法返<strong>回一个<code v-pre>HTMLCollection</code>实例，成员是当前元素节点的所有具有指定 class 的子元素节点</strong>。该方法与<code v-pre>document.getElementsByClassName</code>方法的用法类似，只是搜索范围不是整个文档，而是当前元素节点。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>element.getElementsByClassName('red test');
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注意，该方法的参数大小写敏感。</p>
<p>由于<code v-pre>HTMLCollection</code>实例是一个<strong>活的集合</strong>，<code v-pre>document</code>对象的任何变化会立刻反应到实例，下面的代码不会生效。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML 代码如下
// &lt;div id=&quot;example&quot;&gt;
//   &lt;p class=&quot;foo&quot;&gt;&lt;/p&gt;
//   &lt;p class=&quot;foo&quot;&gt;&lt;/p&gt;
// &lt;/div&gt;
var element = document.getElementById('example');
var matches = element.getElementsByClassName('foo');

for (var i = 0; i&lt; matches.length; i++) {
  matches[i].classList.remove('foo'); // 当删除了foo，matches的集合就会立刻改变
  matches.item(i).classList.add('bar');
}
// 执行后，HTML 代码如下
// &lt;div id=&quot;example&quot;&gt;
//   &lt;p&gt;&lt;/p&gt;
//   &lt;p class=&quot;foo bar&quot;&gt;&lt;/p&gt;
// &lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>matches</code>集合的第一个成员，<strong>一旦被拿掉 class 里面的<code v-pre>foo</code>，就会立刻从<code v-pre>matches</code>里面消失</strong>，导致出现上面的结果。</p>
<h4 id="_2-5-element-getelementsbytagname-通过标签获取索引子元素" tabindex="-1"><a class="header-anchor" href="#_2-5-element-getelementsbytagname-通过标签获取索引子元素" aria-hidden="true">#</a> 2.5 Element.getElementsByTagName() 通过标签获取索引子元素</h4>
<p><code v-pre>Element.getElementsByTagName</code>方法<strong>返回一个<code v-pre>HTMLCollection</code>实例，成员是当前节点的所有匹配指定标签名的子元素节点</strong>。该方法与<code v-pre>document.getElementsByClassName</code>方法的用法类似，只是搜索范围不是整个文档，而是当前元素节点。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var table = document.getElementById('forecast-table');
var cells = table.getElementsByTagName('td');
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，该方法的参数是大小写不敏感的。</p>
<h4 id="_2-6-element-closest-接受css选择器参数-返回最靠近的祖先节点" tabindex="-1"><a class="header-anchor" href="#_2-6-element-closest-接受css选择器参数-返回最靠近的祖先节点" aria-hidden="true">#</a> 2.6 Element.closest() 接受CSS选择器参数，返回最靠近的祖先节点</h4>
<p><code v-pre>Element.closest</code>方法<strong>接受一个 CSS 选择器作为参数，返回匹配该选择器的、最接近当前节点的一个祖先节点（包括当前节点本身）</strong>。如果没有任何节点匹配 CSS 选择器，则返回<code v-pre>null</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML 代码如下
// &lt;article&gt;
//   &lt;div id=&quot;div-01&quot;&gt;Here is div-01
//     &lt;div id=&quot;div-02&quot;&gt;Here is div-02
//       &lt;div id=&quot;div-03&quot;&gt;Here is div-03&lt;/div&gt;
//     &lt;/div&gt;
//   &lt;/div&gt;
// &lt;/article&gt;

var div03 = document.getElementById('div-03');

// div-03 最近的祖先节点
div03.closest(&quot;#div-02&quot;) // div-02

div03.closest(&quot;div&quot;) // div-03 closest包含当前节点本身
div03.closest(&quot;div div&quot;) // div-03
div03.closest(&quot;div&gt;div&quot;) // div-03

div03.closest(&quot;article &gt; div&quot;) //div-01
div03.closest(&quot;:not(div)&quot;) // article
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，由于<code v-pre>closest</code>方法将当前节点也考虑在内，所以第二个<code v-pre>closest</code>方法返回<code v-pre>div-03</code>。</p>
<h4 id="_2-7-element-matches-当前元素是否匹配给定的css选择器" tabindex="-1"><a class="header-anchor" href="#_2-7-element-matches-当前元素是否匹配给定的css选择器" aria-hidden="true">#</a> 2.7 Element.matches() 当前元素是否匹配给定的css选择器</h4>
<p><code v-pre>Element.matches</code>方法<strong>返回一个布尔值，表示当前元素是否匹配给定的 CSS 选择器。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>if (el.matches('.someClass')) {
  console.log('Match!');
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-8-事件相关方法" tabindex="-1"><a class="header-anchor" href="#_2-8-事件相关方法" aria-hidden="true">#</a> 2.8 事件相关方法</h4>
<p>以下三个方法与<code v-pre>Element</code>节点的事件相关。这些方法都继承自<code v-pre>EventTarget</code>接口，<strong>详见相关章节</strong>。</p>
<h5 id="_1-element-addeventlistener-添加事件的回调函数" tabindex="-1"><a class="header-anchor" href="#_1-element-addeventlistener-添加事件的回调函数" aria-hidden="true">#</a> （1）<code v-pre>Element.addEventListener()</code>：添加事件的回调函数</h5>
<h5 id="_2-element-removeeventlistener-移除事件监听函数" tabindex="-1"><a class="header-anchor" href="#_2-element-removeeventlistener-移除事件监听函数" aria-hidden="true">#</a> （2）<code v-pre>Element.removeEventListener()</code>：移除事件监听函数</h5>
<h5 id="_3-element-dispatchevent-触发事件" tabindex="-1"><a class="header-anchor" href="#_3-element-dispatchevent-触发事件" aria-hidden="true">#</a> （3）<code v-pre>Element.dispatchEvent()</code>：触发事件</h5>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>element.addEventListener('click', listener, false);
element.removeEventListener('click', listener, false);

var event = new Event('click');
element.dispatchEvent(event);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-9-element-scrollintoview-让元素滚动到浏览器可视区" tabindex="-1"><a class="header-anchor" href="#_2-9-element-scrollintoview-让元素滚动到浏览器可视区" aria-hidden="true">#</a> 2.9 Element.scrollIntoView()  让元素滚动到浏览器可视区</h4>
<p><code v-pre>Element.scrollIntoView</code>方法<strong>让当前的元素滚动到浏览器窗口的可视区域内</strong> ，类似于设置<code v-pre>window.location.hash</code>的效果。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>el.scrollIntoView(); // 等同于el.scrollIntoView(true)
el.scrollIntoView(false);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>该方法可以接受一个布尔值作为参数。如果为<code v-pre>true</code>，表示元素的顶部与当前区域的可见部分的顶部对齐（前提是当前区域可滚动）；如果为<code v-pre>false</code>，表示元素的底部与当前区域的可见部分的尾部对齐（前提是当前区域可滚动）。如果没有提供该参数，默认为<code v-pre>true</code>。</p>
<h4 id="_2-10-element-getboundingclientrect-返回元素大小、位置信息的对象" tabindex="-1"><a class="header-anchor" href="#_2-10-element-getboundingclientrect-返回元素大小、位置信息的对象" aria-hidden="true">#</a> 2.10 Element.getBoundingClientRect() 返回元素大小、位置信息的对象</h4>
<p><code v-pre>Element.getBoundingClientRect</code>方法<strong>返回一个对象，提供当前元素节点的大小、位置等信息，基本上就是 CSS 盒状模型的所有信息</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var rect = obj.getBoundingClientRect();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>getBoundingClientRect</code>方法返回的<code v-pre>rect</code>对象，具有以下属性（全部为<strong>只读</strong>）。</p>
<ul>
<li><code v-pre>x</code>：元素左上角相对于视口的横坐标</li>
<li><code v-pre>y</code>：元素左上角相对于视口的纵坐标</li>
<li><code v-pre>height</code>：元素高度</li>
<li><code v-pre>width</code>：元素宽度</li>
<li><code v-pre>left</code>：元素左上角相对于视口的横坐标，与<code v-pre>x</code>属性相等</li>
<li><code v-pre>right</code>：元素右边界相对于视口的横坐标（等于<code v-pre>x + width</code>）</li>
<li><code v-pre>top</code>：元素顶部相对于视口的纵坐标，与<code v-pre>y</code>属性相等</li>
<li><code v-pre>bottom</code>：元素底部相对于视口的纵坐标（等于<code v-pre>y + height</code>）</li>
</ul>
<p>由于元素<strong>相对于视口（viewport）的位置</strong>，<strong>会随着页面滚动变化</strong>，因此表示位置的四个属性值，都不是固定不变的。如果想得到绝对位置，可以将<code v-pre>left</code>属性加上<code v-pre>window.scrollX</code>，<code v-pre>top</code>属性加上<code v-pre>window.scrollY</code>。</p>
<p>注意，<code v-pre>getBoundingClientRect</code>方法的所有属性，都把边框（<code v-pre>border</code>属性）算作元素的一部分。也就是说，都是从边框外缘的各个点来计算。因此，<strong><code v-pre>width</code>和<code v-pre>height</code>包括了元素本身 + <code v-pre>padding</code> + <code v-pre>border</code>。</strong></p>
<p>另外，上面的这些属性，都是继承自原型的属性，<code v-pre>Object.keys</code>会返回一个空数组，这一点也需要注意。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var rect = document.body.getBoundingClientRect();
Object.keys(rect) // []
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>rect</code>对象没有自身属性，而<code v-pre>Object.keys</code>方法只返回对象自身的属性，所以返回了一个空数组。</p>
<h4 id="_2-11-element-getclientrects-元素在页面上形成的所有矩形-类数组" tabindex="-1"><a class="header-anchor" href="#_2-11-element-getclientrects-元素在页面上形成的所有矩形-类数组" aria-hidden="true">#</a> 2.11 Element.getClientRects() 元素在页面上形成的所有矩形，类数组</h4>
<p><code v-pre>Element.getClientRects</code>方法<strong>返回一个类似数组的对象，里面是当前元素在页面上形成的所有矩形</strong>（所以方法名中的<code v-pre>Rect</code>用的是复数）。每个矩形都有<code v-pre>bottom</code>、<code v-pre>height</code>、<code v-pre>left</code>、<code v-pre>right</code>、<code v-pre>top</code>和<code v-pre>width</code>六个属性，表示它们相对于视口的四个坐标，以及本身的高度和宽度。</p>
<p>对于盒状元素（比如<code v-pre> &lt;div&gt; </code>和<code v-pre> &lt;p&gt; </code>），该方法返回的对象中只有该元素一个成员。对于行内元素（比如<code v-pre>&lt;span&gt;</code>、<code v-pre> &lt;a&gt; </code>、<code v-pre>&lt;em&gt;</code>），该方法返回的对象有多少个成员，取决于该元素在页面上占据多少行。这是它和<code v-pre>Element.getBoundingClientRect()</code>方法的主要区别，后者对于行内元素总是返回一个矩形。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>&lt;span id=&quot;inline&quot;&gt;Hello World Hello World Hello World&lt;/span&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码是一个行内元素<code v-pre>&lt;span&gt;</code>，如果它在页面上占据三行，<code v-pre>getClientRects</code>方法返回的对象就有三个成员，如果它在页面上占据一行，<code v-pre>getClientRects</code>方法返回的对象就只有一个成员。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var el = document.getElementById('inline');
el.getClientRects().length // 3
el.getClientRects()[0].left // 8
el.getClientRects()[0].right // 113.908203125
el.getClientRects()[0].bottom // 31.200000762939453
el.getClientRects()[0].height // 23.200000762939453
el.getClientRects()[0].width // 105.908203125
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个方法主要用于判断行内元素是否换行，以及行内元素的每一行的位置偏移。</p>
<p>注意，如果行内元素包括换行符，那么该方法会把换行符考虑在内。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>&lt;span id=&quot;inline&quot;&gt;
  Hello World
  Hello World
  Hello World
&lt;/span&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>&lt;span&gt;</code>节点内部有三个换行符，即使 HTML 语言忽略换行符，将它们显示为一行，<code v-pre>getClientRects()</code>方法依然会返回三个成员。如果行宽设置得特别窄，上面的<code v-pre>&lt;span&gt;</code>元素显示为6行，那么就会返回六个成员。</p>
<h4 id="_2-12-element-insertadjacentelement-插入新节点到元素的指定位置" tabindex="-1"><a class="header-anchor" href="#_2-12-element-insertadjacentelement-插入新节点到元素的指定位置" aria-hidden="true">#</a> 2.12 Element.insertAdjacentElement()  插入新节点到元素的指定位置</h4>
<p><code v-pre>Element.insertAdjacentElement</code>方法<strong>在相对于当前元素的指定位置，插入一个新的节点</strong>。该方法返回被插入的节点，如果插入失败，返回<code v-pre>null</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>element.insertAdjacentElement(position, element);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>Element.insertAdjacentElement</code>方法一共可以接受两个参数，第一个参数是一个字符串，表示插入的位置，第二个参数是将要插入的节点。第一个参数只可以取如下的值。</p>
<ul>
<li><code v-pre>beforebegin</code>：当前元素之前</li>
<li><code v-pre>afterbegin</code>：当前元素内部的第一个子节点前面</li>
<li><code v-pre>beforeend</code>：当前元素内部的最后一个子节点后面</li>
<li><code v-pre>afterend</code>：当前元素之后</li>
</ul>
<p>注意，<code v-pre>beforebegin</code>和<code v-pre>afterend</code>这两个值，只在当前节点有父节点时才会生效。如果当前节点是由脚本创建的，没有父节点，那么插入会失败。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var p1 = document.createElement('p')
var p2 = document.createElement('p')
p1.insertAdjacentElement('afterend', p2) // null
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>p1</code>没有父节点，所以插入<code v-pre>p2</code>到它后面就失败了。</p>
<p>如果插入的节点是一个文档里现有的节点，它会从原有位置删除，放置到新的位置。</p>
<h4 id="_2-13-element-insertadjacenthtml-插入html字符串到指定位置-element-insertadjacenttext-插入text到指定位置" tabindex="-1"><a class="header-anchor" href="#_2-13-element-insertadjacenthtml-插入html字符串到指定位置-element-insertadjacenttext-插入text到指定位置" aria-hidden="true">#</a> 2.13 Element.insertAdjacentHTML() 插入html字符串到指定位置，Element.insertAdjacentText() 插入text到指定位置</h4>
<p><code v-pre>Element.insertAdjacentHTML</code>方法<strong>用于将一个 HTML 字符串，解析生成 DOM 结构，插入相对于当前节点的指定位置。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>element.insertAdjacentHTML(position, text);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该方法接受两个参数，第一个是一个表示指定位置的字符串，第二个是待解析的 HTML 字符串。第一个参数只能设置下面四个值之一。</p>
<ul>
<li><code v-pre>beforebegin</code>：当前元素之前</li>
<li><code v-pre>afterbegin</code>：当前元素内部的第一个子节点前面</li>
<li><code v-pre>beforeend</code>：当前元素内部的最后一个子节点后面</li>
<li><code v-pre>afterend</code>：当前元素之后</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML 代码：&lt;div id=&quot;one&quot;&gt;one&lt;/div&gt;
var d1 = document.getElementById('one');
d1.insertAdjacentHTML('afterend', '&lt;div id=&quot;two&quot;&gt;two&lt;/div&gt;');
// 执行后的 HTML 代码：
// &lt;div id=&quot;one&quot;&gt;one&lt;/div&gt;&lt;div id=&quot;two&quot;&gt;two&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该方法只是在现有的 DOM 结构里面插入节点，这使得它的执行速度比<code v-pre>innerHTML</code>方法快得多。</p>
<p>注意，该方法不会转义 HTML 字符串，这导致它不能用来插入用户输入的内容，否则会有安全风险。</p>
<p><code v-pre>Element.insertAdjacentText</code>方法在相对于当前节点的指定位置，插入一个文本节点，用法与<code v-pre>Element.insertAdjacentHTML</code>方法完全一致。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML 代码：&lt;div id=&quot;one&quot;&gt;one&lt;/div&gt;
var d1 = document.getElementById('one');
d1.insertAdjacentText('afterend', 'two');
// 执行后的 HTML 代码：
// &lt;div id=&quot;one&quot;&gt;one&lt;/div&gt;two
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-14-element-remove-移除元素" tabindex="-1"><a class="header-anchor" href="#_2-14-element-remove-移除元素" aria-hidden="true">#</a> 2.14 Element.remove() 移除元素</h4>
<p><code v-pre>Element.remove</code>方法<strong>继承自 ChildNode 接口，用于将当前元素节点从它的父节点移除。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var el = document.getElementById('mydiv');
el.remove();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码将<code v-pre>el</code>节点从 DOM 树里面移除。</p>
<h4 id="_2-15-element-focus-将页面焦点转移到元素-element-blur-将焦点移除" tabindex="-1"><a class="header-anchor" href="#_2-15-element-focus-将页面焦点转移到元素-element-blur-将焦点移除" aria-hidden="true">#</a> 2.15 Element.focus() 将页面焦点转移到元素，Element.blur() 将焦点移除</h4>
<p><code v-pre>Element.focus</code>方法<strong>用于将当前页面的焦点，转移到指定元素上</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document.getElementById('my-span').focus();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该方法可以接受一个对象作为参数。参数对象的<code v-pre>preventScroll</code>属性是一个布尔值，指定<strong>是否将当前元素停留在原始位置</strong>，而不是滚动到可见区域。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function getFocus() {
  document.getElementById('btn').focus({preventScroll:false});
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码会让<code v-pre>btn</code>元素获得焦点，并<strong>滚动到可见区域</strong>。</p>
<p>最后，从<code v-pre>document.activeElement</code>属性可以得到当前获得焦点的元素。</p>
<p><code v-pre>Element.blur</code>方法<strong>用于将焦点从当前元素移除</strong>。</p>
<h4 id="_2-16-element-click-模拟点击事件" tabindex="-1"><a class="header-anchor" href="#_2-16-element-click-模拟点击事件" aria-hidden="true">#</a> 2.16 Element.click() 模拟点击事件</h4>
<p><code v-pre>Element.click</code>方法用于<strong>在当前元素上模拟一次鼠标点击，相当于触发了<code v-pre>click</code>事件。</strong></p>
<h2 id="七、元素属性的操作" tabindex="-1"><a class="header-anchor" href="#七、元素属性的操作" aria-hidden="true">#</a> 七、元素属性的操作</h2>
<p>HTML 元素包括标签名和若干个键值对，这个键值对就称为“属性”（attribute）。</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;a id=&quot;test&quot; href=&quot;http://www.example.com&quot;&gt;
  链接
&lt;/a&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>a</code>元素包括两个属性：<code v-pre>id</code>属性和<code v-pre>href</code>属性。</p>
<p>属性本身是一个对象（<code v-pre>Attr</code>对象），但是实际上，这个对象极少使用。一般都是通过元素节点对象（<code v-pre>HTMlElement</code>对象）来操作属性。本章介绍如何操作这些属性。</p>
<h3 id="_1、element-attributes-属性-返回包含标签所有属性的类数组动态对象" tabindex="-1"><a class="header-anchor" href="#_1、element-attributes-属性-返回包含标签所有属性的类数组动态对象" aria-hidden="true">#</a> 1、Element.attributes 属性 （返回包含标签所有属性的类数组动态对象）</h3>
<p>元素对象有一个<code v-pre>attributes</code>属性，返回一个<strong>类似数组的动态对象，成员是该元素标签的所有属性节点对象</strong>，属性的实时变化都会反映在这个节点对象上。其他类型的节点对象，虽然也有<code v-pre>attributes</code>属性，但返回的都是<code v-pre>null</code>，因此可以把这个属性视为元素对象独有的。</p>
<p>单个属性可以通过序号引用，也可以通过属性名引用。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// &lt;a id=&quot;test&quot; href=&quot;http://www.example.com&quot;&gt;链接&lt;/a&gt;
// document.getElementsByTagName('a')[0].attributes 返回一个 NamedNodeMap 类数组对象

NamedNodeMap {0: id, 1: href, id: id, href: href, length: 2}

// 这两个访问方法都是返回一个id的属性节点对象
// NamedNodeMap[0]
// NamedNodeMap.id

{
    baseURI: &quot;file:///C:/Users/dell/Desktop/test.html&quot;
    childNodes: NodeList []
    firstChild: null
    isConnected: false
    lastChild: null
    localName: &quot;id&quot;
    name: &quot;id&quot; // 属性是‘id’
    namespaceURI: null
    nextSibling: null
    nodeName: &quot;id&quot;
    nodeType: 2
    nodeValue: &quot;test&quot;
    ownerDocument: document
    ownerElement: a#test
    parentElement: null
    parentNode: null
    prefix: null
    previousSibling: null
    specified: true
    textContent: &quot;test&quot;
    value: &quot;test&quot; // id的值
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML 代码如下
// &lt;body bgcolor=&quot;yellow&quot; onload=&quot;&quot;&gt;
document.body.attributes[0]
document.body.attributes.bgcolor
document.body.attributes['ONLOAD']
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，上面代码的三种方法，<strong>返回的都是属性节点对象，而不是属性值</strong>。</p>
<p><strong>属性节点对象有<code v-pre>name</code>和<code v-pre>value</code>属性</strong>，对应该属性的属性名和属性值，等同于<code v-pre>nodeName</code>属性和<code v-pre>nodeValue</code>属性。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML代码为
// &lt;div id=&quot;mydiv&quot;&gt;
var n = document.getElementById('mydiv');

n.attributes[0].name // &quot;id&quot;
n.attributes[0].nodeName // &quot;id&quot;

n.attributes[0].value // &quot;mydiv&quot;
n.attributes[0].nodeValue // &quot;mydiv&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面代码可以遍历一个元素节点的所有属性。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var para = document.getElementsByTagName('p')[0];
var result = document.getElementById('result');

if (para.hasAttributes()) {
  var attrs = para.attributes;
  var output = '';
  for(var i = attrs.length - 1; i &gt;= 0; i--) {
    output += attrs[i].name + '-&gt;' + attrs[i].value;
  }
  result.textContent = output;
} else {
  result.textContent = 'No attributes to show';
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、元素的标准属性" tabindex="-1"><a class="header-anchor" href="#_2、元素的标准属性" aria-hidden="true">#</a> 2、元素的标准属性</h3>
<p>HTML 元素的标准属性（即<strong>在标准中定义的属性</strong>），会<strong>自动成为元素节点对象的属性</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// &lt;a id=&quot;aId&quot; href=&quot;http://www.example.com&quot; class=&quot;aClass&quot;&gt;链接&lt;/a&gt;

var a = document.getElementById('test');

// a是节点对象，id和href自动成为a节点的属性
a.id // &quot;aId&quot;
a.href // &quot;http://www.example.com/&quot;
a.className // &quot;aClass&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>a</code>元素标签的属性<code v-pre>id</code>和<code v-pre>href</code>，自动成为节点对象的属性。</p>
<p>这些属性都是可写的。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var img = document.getElementById('myImage');
img.src = 'http://www.example.com/image.jpg';
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的写法，会立刻替换掉<code v-pre>img</code>对象的<code v-pre>src</code>属性，即会显示另外一张图片。</p>
<p>这种修改属性的方法，常常用于添加表单的属性。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var f = document.forms[0];
f.action = 'submit.php';
f.method = 'POST';
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码为表单添加提交网址和提交方法。</p>
<p>注意，<strong>这种用法虽然可以读写属性，但是无法删除属性</strong>，<code v-pre>delete</code>运算符在这里不会生效。</p>
<p>HTML 元素的属性名是大小写不敏感的，但是 JavaScript 对象的属性名是大小写敏感的。转换规则是，转为 JavaScript 属性名时，一律采用小写。<strong>如果属性名包括多个单词，则采用骆驼拼写法</strong>，即从第二个单词开始，每个单词的首字母采用大写，比如<code v-pre>onClick</code>。</p>
<p>有些 HTML 属性名是 JavaScript 的保留字，转为 JavaScript 属性时，必须改名。主要是以下两个。</p>
<ul>
<li><code v-pre>for</code>属性改为<code v-pre>htmlFor</code></li>
<li><code v-pre>class</code>属性改为<code v-pre>className</code></li>
</ul>
<p>另外，HTML 属性值一般都是字符串，但是 JavaScript 属性会自动转换类型。比如，将字符串<code v-pre>true</code>转为布尔值，将<code v-pre>onClick</code>的值转为一个函数，将<code v-pre>style</code>属性的值转为一个<code v-pre>CSSStyleDeclaration</code>对象。因此，可以对这些属性赋予各种类型的值。</p>
<h3 id="_3、属性操作的标准方法" tabindex="-1"><a class="header-anchor" href="#_3、属性操作的标准方法" aria-hidden="true">#</a> 3、属性操作的标准方法</h3>
<h4 id="_3-1-概述" tabindex="-1"><a class="header-anchor" href="#_3-1-概述" aria-hidden="true">#</a> 3.1 概述</h4>
<p><strong>元素节点提供六个方法，用来操作属性。</strong></p>
<ul>
<li><code v-pre>getAttribute()</code></li>
<li><code v-pre>getAttributeNames()</code></li>
<li><code v-pre>setAttribute()</code></li>
<li><code v-pre>hasAttribute()</code></li>
<li><code v-pre>hasAttributes()</code></li>
<li><code v-pre>removeAttribute()</code></li>
</ul>
<p>这有几点注意。</p>
<p>（1）适用性</p>
<p>这六个方法<strong>对所有属性（包括用户自定义的属性）都适用</strong>。</p>
<p>（2）返回值</p>
<p><code v-pre>getAttribute()</code>只返回字符串，不会返回其他类型的值。</p>
<p>（3）属性名</p>
<p>这些方法只接受属性的标准名称，不用改写保留字，比如<code v-pre>for</code>和<code v-pre>class</code>都可以直接使用。另外，这些方法对于属性名是大小写不敏感的。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var image = document.images[0];
image.setAttribute('class', 'myImage');
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>setAttribute</code>方法直接使用<code v-pre>class</code>作为属性名，不用写成<code v-pre>className</code>。</p>
<h4 id="_3-2-element-getattribute-返回元素的指定属性值-字符串" tabindex="-1"><a class="header-anchor" href="#_3-2-element-getattribute-返回元素的指定属性值-字符串" aria-hidden="true">#</a> 3.2 Element.getAttribute() 返回元素的指定属性值，字符串</h4>
<p><code v-pre>Element.getAttribute</code>方法<strong>返回当前元素节点的指定属性</strong>。如果指定属性不存在，则返回<code v-pre>null</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML 代码为
// &lt;div id=&quot;div1&quot; align=&quot;left&quot;&gt;
var div = document.getElementById('div1');
div.getAttribute('align') // &quot;left&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-3-element-getattributenames-返回一个数组-成员是元素的所有属性的名字" tabindex="-1"><a class="header-anchor" href="#_3-3-element-getattributenames-返回一个数组-成员是元素的所有属性的名字" aria-hidden="true">#</a> 3.3 Element.getAttributeNames() 返回一个数组，成员是元素的所有属性的名字</h4>
<p><code v-pre>Element.getAttributeNames()</code><strong>返回一个数组，成员是当前元素的所有属性的名字</strong>。如果当前元素没有任何属性，则返回一个空数组。使用<code v-pre>Element.attributes</code>属性，也可以拿到同样的结果，唯一的区别是它返回的是类似数组的对象。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var mydiv = document.getElementById('mydiv');

mydiv.getAttributeNames().forEach(function (key) {
  var value = mydiv.getAttribute(key);
  console.log(key, value);
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码用于遍历某个节点的所有属性。</p>
<h4 id="_3-4-element-setattribute-为元素设置-新增-属性" tabindex="-1"><a class="header-anchor" href="#_3-4-element-setattribute-为元素设置-新增-属性" aria-hidden="true">#</a> 3.4 Element.setAttribute() 为元素设置（新增）属性</h4>
<p><code v-pre>Element.setAttribute</code>方法用于<strong>为当前元素节点新增属性</strong>。如果同名属性已存在，则相当于编辑已存在的属性。该方法没有返回值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML 代码为
// &lt;button&gt;Hello World&lt;/button&gt;
var b = document.querySelector('button');
b.setAttribute('name', 'myButton');
b.setAttribute('disabled', true); // 属性值总是字符串，其他类型会转成字符串，这里会转成字符串'true'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>button</code>元素的<code v-pre>name</code>属性被设成<code v-pre>myButton</code>，<code v-pre>disabled</code>属性被设成<code v-pre>true</code>。</p>
<p>这里有两个地方需要注意，首先，属性值总是字符串，其他类型的值会自动转成字符串，比如布尔值<code v-pre>true</code>就会变成字符串<code v-pre>true</code>；其次，上例的<code v-pre>disable</code>属性是一个布尔属性，对于<code v-pre>&lt;button&gt;</code>元素来说，这个属性不需要属性值，只要设置了就总是会生效，因此<code v-pre>setAttribute</code>方法里面可以将<code v-pre>disabled</code>属性设成任意值。</p>
<h4 id="_3-5-element-hasattribute-是否包含指定属性" tabindex="-1"><a class="header-anchor" href="#_3-5-element-hasattribute-是否包含指定属性" aria-hidden="true">#</a> 3.5 Element.hasAttribute() 是否包含指定属性</h4>
<p><code v-pre>Element.hasAttribute</code>方法<strong>返回一个布尔值，表示当前元素节点是否包含指定属性</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var d = document.getElementById('div1');

if (d.hasAttribute('align')) {
  d.setAttribute('align', 'center');
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码检查<code v-pre>div</code>节点是否含有<code v-pre>align</code>属性。如果有，则设置为居中对齐。</p>
<h4 id="_3-6-element-hasattributes-是否有任何的属性" tabindex="-1"><a class="header-anchor" href="#_3-6-element-hasattributes-是否有任何的属性" aria-hidden="true">#</a> 3.6 Element.hasAttributes() 是否有任何的属性</h4>
<p><code v-pre>Element.hasAttributes</code>方法<strong>返回一个布尔值，表示当前元素是否有属性，如果没有任何属性，就返回<code v-pre>false</code>，否则返回<code v-pre>true</code>。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var foo = document.getElementById('foo');
foo.hasAttributes() // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-7-element-removeattribute-移除指定属性" tabindex="-1"><a class="header-anchor" href="#_3-7-element-removeattribute-移除指定属性" aria-hidden="true">#</a> 3.7 Element.removeAttribute() 移除指定属性</h4>
<p><code v-pre>Element.removeAttribute</code>方法<strong>移除指定属性</strong>。该方法<strong>没有返回值</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML 代码为
// &lt;div id=&quot;div1&quot; align=&quot;left&quot; width=&quot;200px&quot;&gt;
document.getElementById('div1').removeAttribute('align');
// 现在的HTML代码为
// &lt;div id=&quot;div1&quot; width=&quot;200px&quot;&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、dataset-属性-获取data-自定义属性" tabindex="-1"><a class="header-anchor" href="#_4、dataset-属性-获取data-自定义属性" aria-hidden="true">#</a> 4、dataset 属性   获取data-*自定义属性</h3>
<p>有时，需要在HTML元素上附加数据，供 JavaScript 脚本使用。一种解决方法是<strong>自定义属性</strong>。</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;div id=&quot;mydiv&quot; foo=&quot;bar&quot;&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码为<code v-pre>div</code>元素<strong>自定义了<code v-pre>foo</code>属性</strong>，然后可以用<code v-pre>getAttribute()</code>和<code v-pre>setAttribute()</code>读写这个属性。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var n = document.getElementById('mydiv');
n.getAttribute('foo') // bar
n.setAttribute('foo', 'baz')
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这种方法虽然可以达到目的，但是会使得 HTML 元素的属性不符合标准，导致网页代码通不过校验。</strong></p>
<p>更好的解决方法是，使用<strong>标准提供的<code v-pre>data-*</code>属性</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>&lt;div id=&quot;mydiv&quot; data-foo=&quot;bar&quot;&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后，使用元素节点对象的<code v-pre>dataset</code>属性，它指向一个对象，可以用来操作 HTML 元素标签的<code v-pre>data-*</code>属性。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var n = document.getElementById('mydiv');
n.dataset.foo // bar  省略data-，直接访问foo即可访问到 data-foo的值
n.dataset.foo = 'baz'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，通过<code v-pre>dataset.foo</code>读写<code v-pre>data-foo</code>属性。</p>
<p><strong>删除一个<code v-pre>data-*</code>属性，可以直接使用<code v-pre>delete</code>命令。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>delete document.getElementById('myDiv').dataset.foo;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>除了<code v-pre>dataset</code>属性，也可以用<code v-pre>getAttribute('data-foo')</code>、<code v-pre>removeAttribute('data-foo')</code>、<code v-pre>setAttribute('data-foo')</code>、<code v-pre>hasAttribute('data-foo')</code>等方法操作<code v-pre>data-*</code>属性。</p>
<p>注意，<code v-pre>data-</code>后面的属性名有限制，只能包含字母、数字、连词线（<code v-pre>-</code>）、点（<code v-pre>.</code>）、冒号（<code v-pre>:</code>）和下划线（<code v-pre>_</code>)。而且，属性名<strong>不应该使用<code v-pre>A</code>到<code v-pre>Z</code>的大写字母</strong>，比如不能有<code v-pre>data-helloWorld</code>这样的属性名，而要写成<code v-pre>data-hello-world</code>。</p>
<p><strong>data-后面不能使用驼峰写法，可以使用烤串写法。</strong></p>
<p>转成<code v-pre>dataset</code>的键名时，连词线后面如果跟着一个小写字母，那么连词线会被移除，该小写字母转为大写字母，其他字符不变。反过来，<code v-pre>dataset</code>的键名转成属性名时，所有大写字母都会被转成连词线+该字母的小写形式，其他字符不变。比如，<code v-pre>dataset.helloWorld</code>会转成<code v-pre>data-hello-world</code>。</p>
<p><strong>通过dataset访问的时候，如有烤串写法属性需通过驼峰写法访问</strong></p>
<h2 id="八、text-节点和-documentfragment-节点" tabindex="-1"><a class="header-anchor" href="#八、text-节点和-documentfragment-节点" aria-hidden="true">#</a> 八、Text 节点和 DocumentFragment 节点</h2>
<h3 id="_1、text-节点的概念" tabindex="-1"><a class="header-anchor" href="#_1、text-节点的概念" aria-hidden="true">#</a> 1、Text 节点的概念</h3>
<p><strong>文本节点（<code v-pre>Text</code>）代表元素节点（<code v-pre>Element</code>）和属性节点（<code v-pre>Attribute</code>）的文本内容。如果一个节点只包含一段文本，那么它就有一个文本子节点，代表该节点的文本内容。</strong></p>
<p>通常我们使用父节点的<code v-pre>firstChild</code>、<code v-pre>nextSibling</code>等属性获取文本节点，或者使用<code v-pre>Document</code>节点的<code v-pre>createTextNode</code>方法创造一个文本节点。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 获取文本节点
var textNode = document.querySelector('p').firstChild;

// 创造文本节点
var textNode = document.createTextNode('Hi');
document.querySelector('div').appendChild(textNode);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>浏览器原生提供一个**<code v-pre>Text</code>构造函数**。它返回一个文本节点实例。它的参数就是该文本节点的文本内容。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 空字符串
var text1 = new Text(); // 返回一个文本实例

// 非空字符串
var text2 = new Text('This is a text node'); // 参数为该文本节点的文本内容
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，由于空格也是一个字符，所以哪怕只有一个空格，也会形成文本节点。比如，<code v-pre> </code>包含一个空格，它的子节点就是一个文本节点。</p>
<p>文本节点除了<strong>继承<code v-pre>Node</code>接口，还继承了<code v-pre>CharacterData</code>接口</strong>。<code v-pre>Node</code>接口的属性和方法请参考《Node 接口》一章，这里不再重复介绍了，以下的属性和方法大部分来自<code v-pre>CharacterData</code>接口。</p>
<h3 id="_2、text-节点的属性" tabindex="-1"><a class="header-anchor" href="#_2、text-节点的属性" aria-hidden="true">#</a> 2、Text 节点的属性</h3>
<h4 id="_2-1-data-设置或读取文本节点内容" tabindex="-1"><a class="header-anchor" href="#_2-1-data-设置或读取文本节点内容" aria-hidden="true">#</a> 2.1 data  设置或读取文本节点内容</h4>
<p><code v-pre>data</code>属性等同于<code v-pre>nodeValue</code>属性，用来<strong>设置或读取文本节点的内容</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 读取文本内容
document.querySelector('p').firstChild.data
// 等同于
document.querySelector('p').firstChild.nodeValue

// 设置文本内容
document.querySelector('p').firstChild.data = 'Hello World';
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-2-wholetext-当前文本和毗邻文本节-作为整体返回" tabindex="-1"><a class="header-anchor" href="#_2-2-wholetext-当前文本和毗邻文本节-作为整体返回" aria-hidden="true">#</a> 2.2 wholeText 当前文本和毗邻文本节，作为整体返回</h4>
<p><code v-pre>wholeText</code>属性<strong>将当前文本节点与毗邻的文本节点，作为一个整体返回</strong>。大多数情况下，<code v-pre>wholeText</code>属性的返回值，与<code v-pre>data</code>属性和<code v-pre>textContent</code>属性相同。但是，某些特殊情况会有差异。</p>
<p>举例来说，HTML 代码如下。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>&lt;p id=&quot;para&quot;&gt;A &lt;em&gt;B&lt;/em&gt; C&lt;/p&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这时，文本节点的<code v-pre>wholeText</code>属性和<code v-pre>data</code>属性，返回值相同。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var el = document.getElementById('para');
el.firstChild.wholeText // &quot;A &quot;
el.firstChild.data // &quot;A &quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是，一旦移除<code v-pre>&lt;em&gt;</code>节点，<code v-pre>wholeText</code>属性与<code v-pre>data</code>属性就会有差异，因为这时其实<code v-pre> &lt;p&gt; </code>节点下面包含了两个毗邻的文本节点。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>el.removeChild(para.childNodes[1]);
el.firstChild.wholeText // &quot;A C&quot;
el.firstChild.data // &quot;A &quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-3-length-文本长度" tabindex="-1"><a class="header-anchor" href="#_2-3-length-文本长度" aria-hidden="true">#</a> 2.3 length 文本长度</h4>
<p><code v-pre>length</code>属性<strong>返回当前文本节点的文本长度</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>(new Text('Hello')).length // 5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_2-4-nextelementsibling-后一个兄弟元素节点-previouselementsibling-前一个兄弟元素节点" tabindex="-1"><a class="header-anchor" href="#_2-4-nextelementsibling-后一个兄弟元素节点-previouselementsibling-前一个兄弟元素节点" aria-hidden="true">#</a> 2.4 nextElementSibling 后一个兄弟元素节点，previousElementSibling 前一个兄弟元素节点</h4>
<p><code v-pre>nextElementSibling</code>属性<strong>返回紧跟在当前文本节点后面的那个同级元素节点</strong>。如果取不到元素节点，则返回<code v-pre>null</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML 为
// &lt;div&gt;Hello &lt;em&gt;World&lt;/em&gt;&lt;/div&gt;
var tn = document.querySelector('div').firstChild;
tn.nextElementSibling
// &lt;em&gt;World&lt;/em&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>previousElementSibling</code>属性<strong>返回当前文本节点前面最近的同级元素节点</strong>。如果取不到元素节点，则返回<code v-pre>null：</code>。</p>
<h3 id="_3、text-节点的方法" tabindex="-1"><a class="header-anchor" href="#_3、text-节点的方法" aria-hidden="true">#</a> 3、Text 节点的方法</h3>
<h4 id="_3-1-appenddata-deletedata-insertdata-replacedata-substringdata" tabindex="-1"><a class="header-anchor" href="#_3-1-appenddata-deletedata-insertdata-replacedata-substringdata" aria-hidden="true">#</a> 3.1 appendData()，deleteData()，insertData()，replaceData()，substringData()</h4>
<p>以下5个方法都是<strong>编辑<code v-pre>Text</code>节点文本内容的方法</strong>。</p>
<ul>
<li><code v-pre>appendData()</code>：在<code v-pre>Text</code>节点<strong>尾部追加字符串</strong>。</li>
<li><code v-pre>deleteData()</code>：<strong>删除<code v-pre>Text</code>节点内部的子字符串</strong>，第一个参数为子字符串开始位置，第二个参数为子字符串长度。</li>
<li><code v-pre>insertData()</code>：在<code v-pre>Text</code>节点<strong>插入字符串</strong>，第一个参数为插入位置，第二个参数为插入的子字符串。</li>
<li><code v-pre>replaceData()</code>：用于<strong>替换文本</strong>，第一个参数为替换开始位置，第二个参数为需要被替换掉的长度，第三个参数为新加入的字符串。</li>
<li><code v-pre>substringData()</code>：用于<strong>获取子字符串</strong>，第一个参数为子字符串在<code v-pre>Text</code>节点中的开始位置，第二个参数为子字符串长度。</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML 代码为
// &lt;p&gt;Hello World&lt;/p&gt;
var pElementText = document.querySelector('p').firstChild;

pElementText.appendData('!');
// 页面显示 Hello World!
pElementText.deleteData(7, 5);
// 页面显示 Hello W
pElementText.insertData(7, 'Hello ');
// 页面显示 Hello WHello
pElementText.replaceData(7, 5, 'World');
// 页面显示 Hello WWorld
pElementText.substringData(7, 10);
// 页面显示不变，返回&quot;World &quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-2-remove-移除text节点" tabindex="-1"><a class="header-anchor" href="#_3-2-remove-移除text节点" aria-hidden="true">#</a> 3.2 remove() 移除Text节点</h4>
<p><code v-pre>remove</code>方法用于移除当前<code v-pre>Text</code>节点。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML 代码为
// &lt;p&gt;Hello World&lt;/p&gt;
document.querySelector('p').firstChild.remove()
// 现在 HTML 代码为
// &lt;p&gt;&lt;/p&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-3-splittext-分割text节点变为两个" tabindex="-1"><a class="header-anchor" href="#_3-3-splittext-分割text节点变为两个" aria-hidden="true">#</a> 3.3 splitText() 分割Text节点变为两个</h4>
<p><code v-pre>splitText</code>方法<strong>将<code v-pre>Text</code>节点一分为二，变成两个毗邻的<code v-pre>Text</code>节点。它的参数就是分割位置（从零开始）</strong>，分割到该位置的字符前结束。如果分割位置不存在，将报错。</p>
<p>分割后，该方法<strong>返回分割位置后方的字符串</strong>，而原<code v-pre>Text</code>节点变成只包含分割位置前方的字符串。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// html 代码为 &lt;p id=&quot;p&quot;&gt;foobar&lt;/p&gt;
var p = document.getElementById('p');
var textnode = p.firstChild;

var newText = textnode.splitText(3);
newText // &quot;bar&quot;
textnode // &quot;foo&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>父元素节点的<code v-pre>normalize</code>方法可以将毗邻的两个<code v-pre>Text</code>节点合并。</strong></p>
<p>接上面的例子，文本节点的<code v-pre>splitText</code>方法将一个<code v-pre>Text</code>节点分割成两个，父元素的<code v-pre>normalize</code>方法可以实现逆操作，将它们合并。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>p.childNodes.length // 2

// 将毗邻的两个 Text 节点合并
p.normalize();
p.childNodes.length // 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、documentfragment-文档片段节点" tabindex="-1"><a class="header-anchor" href="#_4、documentfragment-文档片段节点" aria-hidden="true">#</a> 4、DocumentFragment 文档片段节点</h3>
<p><code v-pre>DocumentFragment</code>节点代表一个<strong>文档的片段，本身就是一个完整的 DOM 树形结构。它没有父节点</strong>，<code v-pre>parentNode</code>返回<code v-pre>null</code>，但是<strong>可以插入任意数量的子节点。它不属于当前文档，操作<code v-pre>DocumentFragment</code>节点，要比直接操作 DOM 树快得多。</strong></p>
<p>它一般用于构建一个 DOM 结构，然后插入当前文档。<code v-pre>document.createDocumentFragment</code>方法，以及浏览器原生的<code v-pre>DocumentFragment</code>构造函数，可以创建一个空的<code v-pre>DocumentFragment</code>节点。然后再使用其他 DOM 方法，向其添加子节点。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var docFrag = document.createDocumentFragment();
// 等同于
var docFrag = new DocumentFragment();

var li = document.createElement('li');
li.textContent = 'Hello World';
docFrag.appendChild(li);

document.querySelector('ul').appendChild(docFrag);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码创建了一个<code v-pre>DocumentFragment</code>节点，然后将一个<code v-pre>li</code>节点添加在它里面，最后将<code v-pre>DocumentFragment</code>节点移动到原文档。</p>
<p><strong>注意</strong>，<code v-pre>DocumentFragment</code><strong>节点本身不能被插入当前文档</strong>。当它作为<code v-pre>appendChild()</code>、<code v-pre>insertBefore()</code>、<code v-pre>replaceChild()</code>等方法的参数时，是它的<strong>所有子节点插入当前文档，而不是它自身</strong>。一旦<code v-pre>DocumentFragment</code>节点被添加进当前文档，它自身就变成了空节点（<code v-pre>textContent</code>属性为空字符串），可以被再次使用。如果想要保存<code v-pre>DocumentFragment</code>节点的内容，可以使用<code v-pre>cloneNode</code>方法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document
  .querySelector('ul')
  .appendChild(docFrag.cloneNode(true));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面这样添加<code v-pre>DocumentFragment</code>节点进入当前文档，不会清空<code v-pre>DocumentFragment</code>节点。</p>
<p>下面是一个例子，使用<code v-pre>DocumentFragment</code>反转一个指定节点的所有子节点的顺序。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function reverse(n) {
  var f = document.createDocumentFragment();
  while(n.lastChild) f.appendChild(n.lastChild);
  n.appendChild(f);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>DocumentFragment</code>节点对象<strong>没有自己的属性和方法，全部继承自<code v-pre>Node</code>节点和<code v-pre>ParentNode</code>接口</strong>。也就是说，<code v-pre>DocumentFragment</code>节点比<code v-pre>Node</code>节点多出以下四个属性。</p>
<ul>
<li><code v-pre>children</code>：返回一个动态的<code v-pre>HTMLCollection</code>集合对象，包括当前<code v-pre>DocumentFragment</code>对象的所有子元素节点。</li>
<li><code v-pre>firstElementChild</code>：返回当前<code v-pre>DocumentFragment</code>对象的第一个子元素节点，如果没有则返回<code v-pre>null</code>。</li>
<li><code v-pre>lastElementChild</code>：返回当前<code v-pre>DocumentFragment</code>对象的最后一个子元素节点，如果没有则返回<code v-pre>null</code>。</li>
<li><code v-pre>childElementCount</code>：返回当前<code v-pre>DocumentFragment</code>对象的所有子元素数量。</li>
</ul>
<h2 id="八、css-操作" tabindex="-1"><a class="header-anchor" href="#八、css-操作" aria-hidden="true">#</a> 八、CSS 操作</h2>
<p>CSS 与 JavaScript 是两个有着明确分工的领域，前者负责页面的视觉效果，后者负责与用户的行为互动。但是，它们毕竟同属网页开发的前端，因此不可避免有着交叉和互相配合。本章介绍如何<strong>通过 JavaScript 操作 CSS</strong>。</p>
<h3 id="_1、html-元素的-style-属性" tabindex="-1"><a class="header-anchor" href="#_1、html-元素的-style-属性" aria-hidden="true">#</a> 1、HTML 元素的 style 属性</h3>
<p>操作 CSS 样式最简单的方法，就是使用网页元素节点的<code v-pre>getAttribute()</code>方法、<code v-pre>setAttribute()</code>方法和<code v-pre>removeAttribute()</code>方法，直接读写或删除网页元素的<code v-pre>style</code>属性。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>div.setAttribute(
  'style',
  'background-color:red;' + 'border:1px solid black;'
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码相当于下面的 HTML 代码。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>&lt;div style=&quot;background-color:red; border:1px solid black;&quot; /&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong><code v-pre>style</code>不仅可以使用字符串读写，它本身还是一个对象</strong>，部署了 CSSStyleDeclaration 接口（详见下面的介绍），<strong>可以直接读写个别属性</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>e.style.fontSize = '18px';
e.style.color = 'black';
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、cssstyledeclaration-接口" tabindex="-1"><a class="header-anchor" href="#_2、cssstyledeclaration-接口" aria-hidden="true">#</a> 2、CSSStyleDeclaration 接口</h3>
<h4 id="_2-1-简介-用来操作元素的样式-可读写" tabindex="-1"><a class="header-anchor" href="#_2-1-简介-用来操作元素的样式-可读写" aria-hidden="true">#</a> 2.1 简介 - 用来操作元素的样式，可读写</h4>
<p>CSSStyleDeclaration 接口<strong>用来操作元素的样式</strong>。三个地方部署了这个接口。</p>
<ul>
<li>元素节点的<code v-pre>style</code>属性（<code v-pre>Element.style</code>）</li>
<li><code v-pre>CSSStyle</code>实例的<code v-pre>style</code>属性</li>
<li><code v-pre>window.getComputedStyle()</code>的返回值</li>
</ul>
<p>CSSStyleDeclaration 接口<strong>可以直接读写 CSS 的样式属性</strong>，不过，连词号需要变成骆驼拼写法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var divStyle = document.querySelector('div').style;

// 可读写
divStyle.backgroundColor = 'red';
divStyle.border = '1px solid black';
divStyle.width = '100px';
divStyle.height = '100px';
divStyle.fontSize = '10em';

// 注意，读的样式只是行内样式，不能读取样式表的样式
divStyle.backgroundColor // red
divStyle.border // 1px solid black
divStyle.height // 100px
divStyle.width // 100px
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>style</code>属性的值是一个 CSSStyleDeclaration 实例。<strong>这个对象所包含的属性与 CSS 规则一一对应</strong>，但是名字需要改写，比如<code v-pre>background-color</code>写成<code v-pre>backgroundColor</code>。改写的规则是将横杠从 CSS 属性名中去除，然后将横杠后的第一个字母大写。如果 CSS 属性名是 JavaScript 保留字，则规则名之前需要加上字符串<code v-pre>css</code>，比如**<code v-pre>float</code>写成<code v-pre>cssFloat</code>**。</p>
<p><strong>改写规则：烤串变驼峰，保留字前加<code v-pre>css</code></strong></p>
<p>注意，该对象的属性值都是字符串，设置时必须包括单位，但是不含规则结尾的分号。比如，<code v-pre>divStyle.width</code>不能写为<code v-pre>100</code>，而要写为<code v-pre>100px</code>。</p>
<p>另外，<strong><code v-pre>Element.style</code>返回的只是行内样式，并不是该元素的全部样式</strong>。通过样式表设置的样式，或者从父元素继承的样式，无法通过这个属性得到。<strong>元素的全部样式要通过<code v-pre>window.getComputedStyle()</code>得到。</strong></p>
<h4 id="_2-2-cssstyledeclaration-实例属性" tabindex="-1"><a class="header-anchor" href="#_2-2-cssstyledeclaration-实例属性" aria-hidden="true">#</a> 2.2 CSSStyleDeclaration 实例属性</h4>
<h5 id="_1-cssstyledeclaration-csstext-用来读写所有行内样式" tabindex="-1"><a class="header-anchor" href="#_1-cssstyledeclaration-csstext-用来读写所有行内样式" aria-hidden="true">#</a> （1）CSSStyleDeclaration.cssText 用来读写所有行内样式</h5>
<p><code v-pre>CSSStyleDeclaration.cssText</code>属性<strong>用来读写当前规则的所有样式声明文本</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var divStyle = document.querySelector('div').style;

divStyle.cssText = 'background-color: red;' // 会覆盖原有的整个行内样式
  + 'border: 1px solid black;'
  + 'height: 100px;'
  + 'width: 100px;';
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，<code v-pre>cssText</code>的属性值不用改写 CSS 属性名。</p>
<p><strong>删除一个元素的所有行内样式，最简便的方法就是设置<code v-pre>cssText</code>为空字符串。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>divStyle.cssText = '';
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="_2-cssstyledeclaration-length-行内样式的长度" tabindex="-1"><a class="header-anchor" href="#_2-cssstyledeclaration-length-行内样式的长度" aria-hidden="true">#</a> （2）CSSStyleDeclaration.length 行内样式的长度</h5>
<p><code v-pre>CSSStyleDeclaration.length</code>属性<strong>返回一个整数值，表示当前规则包含多少条样式声明。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML 代码如下
// &lt;div id=&quot;myDiv&quot;
//   style=&quot;height: 1px;width: 100%;background-color: #CA1;&quot;
// &gt;&lt;/div&gt;
var myDiv = document.getElementById('myDiv');
var divStyle = myDiv.style;
divStyle.length // 3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>myDiv</code>元素的行内样式共包含3条样式规则。</p>
<h5 id="_3-cssstyledeclaration-parentrule-返回当前规则所属的那个样式块" tabindex="-1"><a class="header-anchor" href="#_3-cssstyledeclaration-parentrule-返回当前规则所属的那个样式块" aria-hidden="true">#</a> （3）CSSStyleDeclaration.parentRule 返回当前规则所属的那个样式块</h5>
<p><code v-pre>CSSStyleDeclaration.parentRule</code>属性<strong>返回当前规则所属的那个样式块</strong>（CSSRule 实例）。如果不存在所属的样式块，该属性返回<code v-pre>null</code>。</p>
<p>该属性只读，且只在使用 CSSRule 接口时有意义。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var declaration = document.styleSheets[0].rules[0].style;
declaration.parentRule === document.styleSheets[0].rules[0]
// true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-3-cssstyledeclaration-实例方法" tabindex="-1"><a class="header-anchor" href="#_2-3-cssstyledeclaration-实例方法" aria-hidden="true">#</a> 2.3 CSSStyleDeclaration 实例方法</h4>
<h5 id="_1-cssstyledeclaration-getpropertypriority-指定样式有没有设置important优先级" tabindex="-1"><a class="header-anchor" href="#_1-cssstyledeclaration-getpropertypriority-指定样式有没有设置important优先级" aria-hidden="true">#</a> （1）CSSStyleDeclaration.getPropertyPriority() 指定样式有没有设置important优先级</h5>
<p><code v-pre>CSSStyleDeclaration.getPropertyPriority</code>方法<strong>接受 CSS 样式的属性名作为参数，返回一个字符串，表示有没有设置<code v-pre>important</code>优先级。如果有就返回<code v-pre>important</code>，否则返回空字符串。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML 代码为
// &lt;div id=&quot;myDiv&quot; style=&quot;margin: 10px!important; color: red;&quot;/&gt;
var style = document.getElementById('myDiv').style;
style.margin // &quot;10px&quot;
style.getPropertyPriority('margin') // &quot;important&quot;
style.getPropertyPriority('color') // &quot;&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>margin</code>属性有<code v-pre>important</code>优先级，<code v-pre>color</code>属性没有。</p>
<h5 id="_2-cssstyledeclaration-getpropertyvalue-返回指定样式的值" tabindex="-1"><a class="header-anchor" href="#_2-cssstyledeclaration-getpropertyvalue-返回指定样式的值" aria-hidden="true">#</a> （2）CSSStyleDeclaration.getPropertyValue() 返回指定样式的值</h5>
<p><code v-pre>CSSStyleDeclaration.getPropertyValue</code>方法<strong>接受 CSS 样式属性名作为参数，返回一个字符串，表示该属性的属性值。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML 代码为
// &lt;div id=&quot;myDiv&quot; style=&quot;margin: 10px!important; color: red;&quot;/&gt;
var style = document.getElementById('myDiv').style;
style.margin // &quot;10px&quot;
style.getPropertyValue(&quot;margin&quot;) // &quot;10px&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_3-cssstyledeclaration-item-返回指定位置的css属性名" tabindex="-1"><a class="header-anchor" href="#_3-cssstyledeclaration-item-返回指定位置的css属性名" aria-hidden="true">#</a> （3）CSSStyleDeclaration.item() 返回指定位置的CSS属性名</h5>
<p><code v-pre>CSSStyleDeclaration.item</code>方法<strong>接受一个整数值作为参数，返回该位置的 CSS 属性名</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML 代码为
// &lt;div id=&quot;myDiv&quot; style=&quot;color: red; background-color: white;&quot;/&gt;
var style = document.getElementById('myDiv').style;
style.item(0) // &quot;color&quot;
style.item(1) // &quot;background-color&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>0</code>号位置的 CSS 属性名是<code v-pre>color</code>，<code v-pre>1</code>号位置的 CSS 属性名是<code v-pre>background-color</code>。</p>
<p>如果没有提供参数，这个方法会报错。如果参数值超过实际的属性数目，这个方法返回一个空字符值。</p>
<h5 id="_4-cssstyledeclaration-removeproperty-移除指定css属性-并返回原来的值" tabindex="-1"><a class="header-anchor" href="#_4-cssstyledeclaration-removeproperty-移除指定css属性-并返回原来的值" aria-hidden="true">#</a> （4）CSSStyleDeclaration.removeProperty() 移除指定CSS属性，并返回原来的值</h5>
<p><code v-pre>CSSStyleDeclaration.removeProperty</code>方法<strong>接受一个属性名作为参数，在 CSS 规则里面移除这个属性，返回这个属性原来的值。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML 代码为
// &lt;div id=&quot;myDiv&quot; style=&quot;color: red; background-color: white;&quot;&gt;
//   111
// &lt;/div&gt;
var style = document.getElementById('myDiv').style;
style.removeProperty('color') // 'red'
// HTML 代码变为
// &lt;div id=&quot;myDiv&quot; style=&quot;background-color: white;&quot;&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，删除<code v-pre>color</code>属性以后，字体颜色从红色变成默认颜色。</p>
<h5 id="_5-cssstyledeclaration-setproperty-设置新的-css-属性" tabindex="-1"><a class="header-anchor" href="#_5-cssstyledeclaration-setproperty-设置新的-css-属性" aria-hidden="true">#</a> （5）CSSStyleDeclaration.setProperty() 设置新的 CSS 属性</h5>
<p><code v-pre>CSSStyleDeclaration.setProperty</code>方法用来<strong>设置新的 CSS 属性</strong>。该方法没有返回值。</p>
<p>该方法可以接受三个参数。</p>
<ul>
<li>第一个参数：属性名，该参数是必需的。</li>
<li>第二个参数：属性值，该参数可选。如果省略，则参数值默认为空字符串。</li>
<li>第三个参数：优先级，该参数可选。如果设置，唯一的合法值是<code v-pre>important</code>，表示 CSS 规则里面的<code v-pre>!important</code>。</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML 代码为
// &lt;div id=&quot;myDiv&quot; style=&quot;color: red; background-color: white;&quot;&gt;
//   111
// &lt;/div&gt;
var style = document.getElementById('myDiv').style;
style.setProperty('border', '1px solid blue');
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码执行后，<code v-pre>myDiv</code>元素就会出现蓝色的边框。</p>
<h3 id="_3、css-模块的侦测-判断浏览器是否支持某个样式" tabindex="-1"><a class="header-anchor" href="#_3、css-模块的侦测-判断浏览器是否支持某个样式" aria-hidden="true">#</a> 3、CSS 模块的侦测（判断浏览器是否支持某个样式）</h3>
<p>CSS 的规格发展太快，新的模块层出不穷。不同浏览器的不同版本，对 CSS 模块的支持情况都不一样。有时候，<strong>需要知道当前浏览器是否支持某个模块，这就叫做“CSS模块的侦测”。</strong></p>
<p><strong>判断浏览器是否支持某个样式</strong></p>
<p>一个比较普遍适用的方法是，判断元素的<code v-pre>style</code>对象的某个属性值是否为字符串。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>typeof element.style.animationName === 'string';
typeof element.style.transform === 'string';
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果该 CSS 属性确实存在，会返回一个字符串。即使该属性实际上并未设置，也会返回一个空字符串。如果该属性不存在，则会返回<code v-pre>undefined</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document.body.style['maxWidth'] // &quot;&quot;
document.body.style['maximumWidth'] // undefined
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码说明，这个浏览器支持<code v-pre>max-width</code>属性，但是不支持<code v-pre>maximum-width</code>属性。</p>
<p>注意，不管 CSS 属性名的写法带不带连词线，<code v-pre>style</code>属性上都能反映出该属性是否存在。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document.body.style['backgroundColor'] // &quot;&quot;
document.body.style['background-color'] // &quot;&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>另外，使用的时候，需要把不同浏览器的 CSS 前缀也考虑进去。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var content = document.getElementById('content');
typeof content.style['webkitAnimation'] === 'string'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这种侦测方法可以写成一个函数。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function isPropertySupported(property) {
  if (property in document.body.style) return true;
  var prefixes = ['Moz', 'Webkit', 'O', 'ms', 'Khtml'];
  var prefProperty = property.charAt(0).toUpperCase() + property.substr(1);

  for(var i = 0; i &lt; prefixes.length; i++){
    if((prefixes[i] + prefProperty) in document.body.style) return true;
  }

  return false;
}

isPropertySupported('background-clip')
// true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、原生css-对象" tabindex="-1"><a class="header-anchor" href="#_4、原生css-对象" aria-hidden="true">#</a> 4、原生CSS 对象</h3>
<p><strong>浏览器原生提供 CSS 对象，为 JavaScript 操作 CSS 提供一些工具方法。</strong></p>
<p>这个对象目前有两个静态方法。</p>
<h4 id="_4-1-css-escape-转义css选择器里的特殊字符" tabindex="-1"><a class="header-anchor" href="#_4-1-css-escape-转义css选择器里的特殊字符" aria-hidden="true">#</a> 4.1 CSS.escape() 转义CSS选择器里的特殊字符</h4>
<p><code v-pre>CSS.escape</code>方法<strong>用于转义 CSS 选择器里面的特殊字符。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>&lt;div id=&quot;foo#bar&quot;&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码中，该元素的<code v-pre>id</code>属性包含一个<code v-pre>#</code>号，该字符在 CSS 选择器里面有特殊含义。不能直接写成<code v-pre>document.querySelector('#foo#bar')</code>，只能写成<code v-pre>document.querySelector('#foo\\#bar')</code>。这里必须使用双斜杠的原因是，单引号字符串本身会转义一次斜杠。</p>
<p><code v-pre>CSS.escape</code>方法就用来转义那些特殊字符。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document.querySelector('#' + CSS.escape('foo#bar'))
//CSS.escape('foo#bar')转义成foo\#bar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-2-css-supports-当前环境是否支持某一句-css-规则" tabindex="-1"><a class="header-anchor" href="#_4-2-css-supports-当前环境是否支持某一句-css-规则" aria-hidden="true">#</a> 4.2 CSS.supports() 当前环境是否支持某一句 CSS 规则</h4>
<p><code v-pre>CSS.supports</code>方法<strong>返回一个布尔值，表示当前环境是否支持某一句 CSS 规则</strong>。</p>
<p>它的参数有两种写法，一种是第一个参数是属性名，第二个参数是属性值；另一种是整个参数就是一行完整的 CSS 语句。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 第一种写法
CSS.supports('transform-origin', '5px') // true

// 第二种写法
CSS.supports('display: table-cell') // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，第二种写法的参数结尾不能带有分号，否则结果不准确。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>CSS.supports('display: table-cell;') // false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_5、window-getcomputedstyle-返回元素最终样式" tabindex="-1"><a class="header-anchor" href="#_5、window-getcomputedstyle-返回元素最终样式" aria-hidden="true">#</a> 5、window.getComputedStyle() 返回元素最终样式</h3>
<p>行内样式（inline style）具有最高的优先级，改变行内样式，通常会立即反映出来。但是，网页元素最终的样式是综合各种规则计算出来的。因此，如果想得到元素实际的样式，只读取行内样式是不够的，需要得到浏览器最终计算出来的样式规则。</p>
<p><code v-pre>window.getComputedStyle</code>方法，就用来<strong>返回浏览器计算后得到的最终样式规则</strong>。它接受一个元素节点对象作为参数，返回一个 CSSStyleDeclaration 实例，包含了指定节点的最终样式信息。所谓“最终样式信息”，指的是各种 CSS 规则叠加后的结果。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var div = document.querySelector('div');
var styleObj = window.getComputedStyle(div);
styleObj.backgroundColor
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，得到的背景色就是<code v-pre>div</code>元素真正的背景色。</p>
<p>注意，CSSStyleDeclaration 实例是一个<strong>活的对象</strong>，任何对于样式的修改，会实时反映到这个实例上面。另外，这个实例是<strong>只读的</strong>。</p>
<p><code v-pre>getComputedStyle</code>方法还可以接受第二个参数，表示当前元素的伪元素（比如<code v-pre>:before</code>、<code v-pre>:after</code>、<code v-pre>:first-line</code>、<code v-pre>:first-letter</code>等）。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var result = window.getComputedStyle(div, ':before');
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>下面的例子是如何获取元素的高度。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var elem = document.getElementById('elem-container');
var styleObj = window.getComputedStyle(elem, null)
var height = styleObj.height; // 得到元素最终渲染出来的高度，最可靠
// 等同于
var height = styleObj['height'];
var height = styleObj.getPropertyValue('height');
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码得到的<code v-pre>height</code>属性，是浏览器最终渲染出来的高度，比其他方法得到的高度更可靠。由于<code v-pre>styleObj</code>是 CSSStyleDeclaration 实例，所以可以使用各种 CSSStyleDeclaration 的实例属性和方法。</p>
<p>有几点需要注意。</p>
<ul>
<li>CSSStyleDeclaration 实例返回的 CSS 值都是绝对单位。比如，<strong>长度都是像素单位</strong>（返回值包括<code v-pre>px</code>后缀），<strong>颜色是<code v-pre>rgb(#, #, #)</code>或<code v-pre>rgba(#, #, #, #)</code>格式</strong>。</li>
<li>CSS 规则的<strong>简写形式无效</strong>。比如，想读取<code v-pre>margin</code>属性的值，不能直接读，只能读<code v-pre>marginLeft</code>、<code v-pre>marginTop</code>等属性；再比如，<code v-pre>font</code>属性也是不能直接读的，只能读<code v-pre>font-size</code>等单个属性。</li>
<li>如果读取 CSS 原始的属性名，要用方括号运算符，比如<code v-pre>styleObj['z-index']</code>；如果读取骆驼拼写法的 CSS 属性名，可以直接读取<code v-pre>styleObj.zIndex</code>。</li>
<li>该方法返回的 CSSStyleDeclaration 实例的<code v-pre>cssText</code>属性无效，返回<code v-pre>undefined</code>。</li>
</ul>
<h3 id="_6、css-伪元素样式的获取" tabindex="-1"><a class="header-anchor" href="#_6、css-伪元素样式的获取" aria-hidden="true">#</a> 6、CSS 伪元素样式的获取</h3>
<p>CSS 伪元素是通过 CSS 向 DOM 添加的元素，主要是通过<code v-pre>:before</code>和<code v-pre>:after</code>选择器生成，然后用<code v-pre>content</code>属性指定伪元素的内容。</p>
<p>下面是一段 HTML 代码。</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;div id=&quot;test&quot;&gt;Test content&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>CSS 添加伪元素<code v-pre>:before</code>的写法如下。</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code>#test:before {
  content: 'Before ';
  color: #FF0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>节点元素的<code v-pre>style</code>对象无法读写伪元素的样式，这时就要用到<code v-pre>window.getComputedStyle()</code></strong>。JavaScript 获取伪元素，可以使用下面的方法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var test = document.querySelector('#test');

var result = window.getComputedStyle(test, ':before').content;
var color = window.getComputedStyle(test, ':before').color;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，<strong>也可以使用 CSSStyleDeclaration 实例的<code v-pre>getPropertyValue</code>方法</strong>，获取伪元素的属性。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var result = window.getComputedStyle(test, ':before')
  .getPropertyValue('content');
var color = window.getComputedStyle(test, ':before')
  .getPropertyValue('color');
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7、stylesheet-接口" tabindex="-1"><a class="header-anchor" href="#_7、stylesheet-接口" aria-hidden="true">#</a> 7、StyleSheet 接口</h3>
<h4 id="_7-1-概述" tabindex="-1"><a class="header-anchor" href="#_7-1-概述" aria-hidden="true">#</a> 7.1 概述</h4>
<p><code v-pre>StyleSheet</code>接口代表网页的一张样式表，包括<code v-pre>&lt;link&gt;</code>元素加载的样式表和<code v-pre> &lt;style&gt; </code>元素内嵌的样式表。</p>
<p><strong><code v-pre>document</code>对象的<code v-pre>styleSheets</code>属性</strong>，可以返回当前页面的所有<code v-pre>StyleSheet</code>实例（即<strong>所有样式表</strong>）。它是一个<strong>类似数组的对象</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var sheets = document.styleSheets;
var sheet = document.styleSheets[0];
sheet instanceof StyleSheet // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果是<code v-pre> &lt;style&gt; </code>元素嵌入的样式表，还有<strong>另一种获取<code v-pre>StyleSheet</code>实例的方法</strong>，就是这个节点元素的<code v-pre>sheet</code>属性。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML 代码为 &lt;style id=&quot;myStyle&quot;&gt;&lt;/style&gt;
var myStyleSheet = document.getElementById('myStyle').sheet;// 另一种获取styleSheet方式
myStyleSheet instanceof StyleSheet // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>严格地说，<code v-pre>StyleSheet</code>接口不仅包括网页样式表，还包括 XML 文档的样式表。所以，<strong>它有一个子类<code v-pre>CSSStyleSheet</code><strong>表示网页的 CSS 样式表。我们在网页里面拿到的样式表实例，实际上是<code v-pre>CSSStyleSheet</code>的实例。这个</strong>子接口继承了<code v-pre>StyleSheet</code>的所有属性和方法</strong>，<strong>并且定义了几个自己的属性</strong>，下面把这两个接口放在一起介绍。</p>
<h4 id="_7-2-实例属性" tabindex="-1"><a class="header-anchor" href="#_7-2-实例属性" aria-hidden="true">#</a> 7.2 实例属性</h4>
<p><code v-pre>StyleSheet</code>实例有以下属性。</p>
<h5 id="_1-stylesheet-disabled-样式表是否处于禁用状态-可读写" tabindex="-1"><a class="header-anchor" href="#_1-stylesheet-disabled-样式表是否处于禁用状态-可读写" aria-hidden="true">#</a> （1）StyleSheet.disabled 样式表是否处于禁用状态，可读写</h5>
<p><code v-pre>StyleSheet.disabled</code>返回一个布尔值，表示该样式表是否处于禁用状态。手动设置<code v-pre>disabled</code>属性为<code v-pre>true</code>，等同于在<code v-pre>&lt;link&gt;</code>元素里面，将这张样式表设为<code v-pre>alternate stylesheet</code>，即该样式表将不会生效。</p>
<p>注意，<code v-pre>disabled</code>属性只能在 JavaScript 脚本中设置，不能在 HTML 语句中设置。</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;link rel=&quot;alternate stylesheet&quot; href=&quot;style.css&quot;&gt;
&lt;!--设置了alternate stylesheet表示禁用此样式表--&gt;

&lt;style&gt;
    body{font-size: 16px;}
&lt;/style&gt;

 &lt;script&gt;
    console.log(document.styleSheets)

     /*
     StyleSheetList {}
		0: CSSStyleSheet {ownerRule: null, type: &quot;text/css&quot;, href: 		&quot;file:///C:/Users/dell/Desktop/css.css&quot;, ownerNode: link, parentStyleSheet: null, …}
		1: CSSStyleSheet {ownerRule: null, cssRules: CSSRuleList, rules: CSSRuleList, type: &quot;text/css&quot;, href: null, …}
		length: 2
     */

     console.log(document.styleSheets[0].disabled) // false 未禁用？不能判断样式表设置了alternate？
    document.styleSheets[0].disabled = true
    console.log(document.styleSheets[0].disabled) // true 已禁用
 &lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_2-stylesheet-href-返回样式表的网址" tabindex="-1"><a class="header-anchor" href="#_2-stylesheet-href-返回样式表的网址" aria-hidden="true">#</a> （2）Stylesheet.href  返回样式表的网址</h5>
<p><code v-pre>Stylesheet.href</code><strong>返回样式表的网址</strong>。对于内嵌样式表，该属性返回<code v-pre>null</code>。该属性<strong>只读</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document.styleSheets[0].href
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="_3-stylesheet-media-返回一个媒介类数组" tabindex="-1"><a class="header-anchor" href="#_3-stylesheet-media-返回一个媒介类数组" aria-hidden="true">#</a> （3）StyleSheet.media 返回一个媒介类数组</h5>
<p><code v-pre>StyleSheet.media</code>属性**返回一个类似数组的对象（<code v-pre>MediaList</code>实例），成员是表示适用媒介的字符串。**表示当前样式表是用于屏幕（screen），还是用于打印（print）或手持设备（handheld），或各种媒介都适用（all）。该属性只读，默认值是<code v-pre>screen</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document.styleSheets[0].media.mediaText
// &quot;all&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>MediaList</code>实例的<code v-pre>appendMedium</code>方法，用于增加媒介；<code v-pre>deleteMedium</code>方法用于删除媒介。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document.styleSheets[0].media.appendMedium('handheld');
document.styleSheets[0].media.deleteMedium('print');
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_4-stylesheet-title-返回样式表的title属性" tabindex="-1"><a class="header-anchor" href="#_4-stylesheet-title-返回样式表的title属性" aria-hidden="true">#</a> （4）StyleSheet.title 返回样式表的<code v-pre>title</code>属性</h5>
<p><code v-pre>StyleSheet.title</code>属性返回样式表的<code v-pre>title</code>属性。</p>
<h5 id="_5-stylesheet-type-返回样式表的type属性" tabindex="-1"><a class="header-anchor" href="#_5-stylesheet-type-返回样式表的type属性" aria-hidden="true">#</a> （5）StyleSheet.type 返回样式表的<code v-pre>type</code>属性</h5>
<p><code v-pre>StyleSheet.type</code>属性返回样式表的<code v-pre>type</code>属性，通常是<code v-pre>text/css</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document.styleSheets[0].type  // &quot;text/css&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="_6-stylesheet-parentstylesheet-返回父样式表-当前样式表是通过-import加载才有值-否则null" tabindex="-1"><a class="header-anchor" href="#_6-stylesheet-parentstylesheet-返回父样式表-当前样式表是通过-import加载才有值-否则null" aria-hidden="true">#</a> （6）StyleSheet.parentStyleSheet 返回父样式表，当前样式表是通过@import加载才有值，否则null</h5>
<p>CSS 的<code v-pre>@import</code>命令允许在样式表中加载其他样式表。<code v-pre>StyleSheet.parentStyleSheet</code>属性<strong>返回包含了当前样式表的那张样式表</strong>。如果当前样式表是顶层样式表，则该属性返回<code v-pre>null</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>if (stylesheet.parentStyleSheet) {
  sheet = stylesheet.parentStyleSheet;
} else {
  sheet = stylesheet;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_7-stylesheet-ownernode-返回样式表所在的dom节点" tabindex="-1"><a class="header-anchor" href="#_7-stylesheet-ownernode-返回样式表所在的dom节点" aria-hidden="true">#</a> （7）StyleSheet.ownerNode 返回样式表所在的DOM节点</h5>
<p><code v-pre>StyleSheet.ownerNode</code>属性<strong>返回<code v-pre>StyleSheet</code>对象所在的 DOM 节点，通常是<code v-pre>&lt;link&gt;</code>或<code v-pre> &lt;style&gt; </code></strong>。对于那些由其他样式表引用的样式表，该属性为<code v-pre>null</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML代码为
// &lt;link rel=&quot;StyleSheet&quot; href=&quot;example.css&quot; type=&quot;text/css&quot; /&gt;
document.styleSheets[0].ownerNode // [object HTMLLinkElement]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_8-cssstylesheet-cssrules-返回一个包含所有css规则的类数组" tabindex="-1"><a class="header-anchor" href="#_8-cssstylesheet-cssrules-返回一个包含所有css规则的类数组" aria-hidden="true">#</a> （8）CSSStyleSheet.cssRules 返回一个包含所有css规则的类数组</h5>
<p><code v-pre>CSSStyleSheet.cssRules</code>属性**指向一个类似数组的对象（<code v-pre>CSSRuleList</code>实例），里面每一个成员就是当前样式表的一条 CSS 规则。**使用该规则的<code v-pre>cssText</code>属性，可以得到 CSS 规则对应的字符串。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var sheet = document.querySelector('#styleElement').sheet;

sheet.cssRules[0].cssText
// &quot;body { background-color: red; margin: 20px; }&quot;

sheet.cssRules[1].cssText
// &quot;p { line-height: 1.4em; color: blue; }&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每条 CSS 规则还有一个<code v-pre>style</code>属性，指向一个对象，用来<strong>读写具体的 CSS 命令</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>cssStyleSheet.cssRules[0].style.color = 'red';
cssStyleSheet.cssRules[1].style.color = 'purple';
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_9-cssstylesheet-ownerrule-规则所有者" tabindex="-1"><a class="header-anchor" href="#_9-cssstylesheet-ownerrule-规则所有者" aria-hidden="true">#</a> （9）CSSStyleSheet.ownerRule 规则所有者</h5>
<p>有些样式表是通过<code v-pre>@import</code>规则输入的，它的<code v-pre>ownerRule</code>属性会返回一个<code v-pre>CSSRule</code>实例，代表那行<code v-pre>@import</code>规则。如果当前样式表不是通过<code v-pre>@import</code>引入的，<code v-pre>ownerRule</code>属性返回<code v-pre>null</code>。</p>
<h4 id="_7-3-实例方法" tabindex="-1"><a class="header-anchor" href="#_7-3-实例方法" aria-hidden="true">#</a> 7.3 实例方法</h4>
<h5 id="_1-cssstylesheet-insertrule-插入css规则" tabindex="-1"><a class="header-anchor" href="#_1-cssstylesheet-insertrule-插入css规则" aria-hidden="true">#</a> （1）CSSStyleSheet.insertRule() 插入css规则</h5>
<p><code v-pre>CSSStyleSheet.insertRule</code>方法用于<strong>在当前样式表的插入一个新的 CSS 规则</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var sheet = document.querySelector('#styleElement').sheet;
sheet.insertRule('#block { color: white }', 0);
sheet.insertRule('p { color: red }', 1);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该方法可以接受两个参数，第一个参数是表示 CSS 规则的字符串，这里只能有一条规则，否则会报错。第二个参数是该规则在样式表的插入位置（从0开始），该参数可选，默认为0（即默认插在样式表的头部）。注意，如果插入位置大于现有规则的数目，会报错。</p>
<p>该方法的返回值是新插入规则的位置序号。</p>
<p>注意，浏览器对脚本在样式表里面插入规则有很多<a href="https://drafts.csswg.org/cssom/#insert-a-css-rule" target="_blank" rel="noopener noreferrer">限制</a>。所以，这个方法最好放在<code v-pre>try...catch</code>里使用。</p>
<h5 id="_2-cssstylesheet-deleterule-移除css规则" tabindex="-1"><a class="header-anchor" href="#_2-cssstylesheet-deleterule-移除css规则" aria-hidden="true">#</a> （2）CSSStyleSheet.deleteRule() 移除css规则</h5>
<p><code v-pre>CSSStyleSheet.deleteRule</code>方法用来在样式表里面移除一条规则，它的参数是该条规则在<code v-pre>cssRules</code>对象中的位置。该方法没有返回值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document.styleSheets[0].deleteRule(1);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_8、实例-添加样式表" tabindex="-1"><a class="header-anchor" href="#_8、实例-添加样式表" aria-hidden="true">#</a> 8、实例：添加样式表</h3>
<p>网页添加样式表有两种方式。一种是添加一张内置样式表，即在文档中添加一个<code v-pre> &lt;style&gt; </code>节点。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 写法一
var style = document.createElement('style');
style.setAttribute('media', 'screen');
style.innerHTML = 'body{color:red}';
document.head.appendChild(style);

// 写法二
var style = (function () {
  var style = document.createElement('style');
  document.head.appendChild(style);
  return style;
})();
style.sheet.insertRule('.foo{color:red;}', 0); // 样式表插入规则
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另一种是添加外部样式表，即在文档中添加一个<code v-pre>&lt;link&gt;</code>节点，然后将<code v-pre>href</code>属性指向外部样式表的 URL。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var linkElm = document.createElement('link');
linkElm.setAttribute('rel', 'stylesheet');
linkElm.setAttribute('type', 'text/css');
linkElm.setAttribute('href', 'reset-min.css');

document.head.appendChild(linkElm);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9、cssrulelist-接口" tabindex="-1"><a class="header-anchor" href="#_9、cssrulelist-接口" aria-hidden="true">#</a> 9、CSSRuleList 接口</h3>
<p>CSSRuleList 接口是<strong>一个类似数组的对象，表示一组 CSS 规则，成员都是 CSSRule 实例</strong>。</p>
<p>获取 CSSRuleList 实例，一般是通过<code v-pre>StyleSheet.cssRules</code>属性。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML 代码如下
// &lt;style id=&quot;myStyle&quot;&gt;
//   h1 { color: red; }
//   p { color: blue; }
// &lt;/style&gt;
var myStyleSheet = document.getElementById('myStyle').sheet;
var crl = myStyleSheet.cssRules;
crl instanceof CSSRuleList // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CSSRuleList 实例里面，每一条规则（CSSRule 实例）可以通过<code v-pre>rules.item(index)</code>或者<code v-pre>rules[index]</code>拿到。CSS 规则的条数通过<code v-pre>rules.length</code>拿到。还是用上面的例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>crl[0] instanceof CSSRule // true
crl.length // 2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，添加规则和删除规则不能在 CSSRuleList 实例操作，而要在它的父元素 StyleSheet 实例上，通过<code v-pre>StyleSheet.insertRule()</code>和<code v-pre>StyleSheet.deleteRule()</code>操作。</p>
<h3 id="_10、cssrule-接口" tabindex="-1"><a class="header-anchor" href="#_10、cssrule-接口" aria-hidden="true">#</a> 10、CSSRule 接口</h3>
<h4 id="_10-1-概述" tabindex="-1"><a class="header-anchor" href="#_10-1-概述" aria-hidden="true">#</a> 10.1 概述</h4>
<p>一条 CSS 规则包括两个部分：CSS 选择器和样式声明。下面就是一条典型的 CSS 规则。</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code>.myClass {
  color: red;
  background-color: yellow;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>JavaScript <strong>通过 CSSRule 接口操作 CSS 规则</strong>。一般通过 CSSRuleList 接口（<code v-pre>StyleSheet.cssRules</code>）获取 CSSRule 实例。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML 代码如下
// &lt;style id=&quot;myStyle&quot;&gt;
//   .myClass {
//     color: red;
//     background-color: yellow;
//   }
// &lt;/style&gt;
var myStyleSheet = document.getElementById('myStyle').sheet;
var ruleList = myStyleSheet.cssRules;
var rule = ruleList[0];
rule instanceof CSSRule // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_10-2-cssrule-实例的属性" tabindex="-1"><a class="header-anchor" href="#_10-2-cssrule-实例的属性" aria-hidden="true">#</a> 10.2 CSSRule 实例的属性</h4>
<h5 id="_1-cssrule-csstext" tabindex="-1"><a class="header-anchor" href="#_1-cssrule-csstext" aria-hidden="true">#</a> （1）CSSRule.cssText</h5>
<p><code v-pre>CSSRule.cssText</code>属性<strong>返回当前规则的文本</strong>，还是使用上面的例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>rule.cssText
// &quot;.myClass { color: red; background-color: yellow; }&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果规则是加载（<code v-pre>@import</code>）其他样式表，<code v-pre>cssText</code>属性返回<code v-pre>@import 'url'</code>。</p>
<h5 id="_2-cssrule-parentstylesheet" tabindex="-1"><a class="header-anchor" href="#_2-cssrule-parentstylesheet" aria-hidden="true">#</a> （2）CSSRule.parentStyleSheet</h5>
<p><code v-pre>CSSRule.parentStyleSheet</code>属性<strong>返回当前规则所在的样式表对象（StyleSheet 实例）</strong>，还是使用上面的例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>rule.parentStyleSheet === myStyleSheet // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="_3-cssrule-parentrule" tabindex="-1"><a class="header-anchor" href="#_3-cssrule-parentrule" aria-hidden="true">#</a> （3）CSSRule.parentRule</h5>
<p><code v-pre>CSSRule.parentRule</code>属性<strong>返回包含当前规则的父规则，如果不存在父规则（即当前规则是顶层规则），则返回<code v-pre>null</code>。</strong></p>
<p>父规则最常见的情况是，当前规则包含在<code v-pre>@media</code>规则代码块之中。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML 代码如下
// &lt;style id=&quot;myStyle&quot;&gt;
//   @supports (display: flex) {
//     @media screen and (min-width: 900px) {
//       article {
//         display: flex;
//       }
//     }
//  }
// &lt;/style&gt;
var myStyleSheet = document.getElementById('myStyle').sheet;
var ruleList = myStyleSheet.cssRules;

var rule0 = ruleList[0];
rule0.cssText
// &quot;@supports (display: flex) {
//    @media screen and (min-width: 900px) {
//      article { display: flex; }
//    }
// }&quot;

// 由于这条规则内嵌其他规则，
// 所以它有 cssRules 属性，且该属性是 CSSRuleList 实例
rule0.cssRules instanceof CSSRuleList // true

var rule1 = rule0.cssRules[0];
rule1.cssText
// &quot;@media screen and (min-width: 900px) {
//   article { display: flex; }
// }&quot;

var rule2 = rule1.cssRules[0];
rule2.cssText
// &quot;article { display: flex; }&quot;

rule1.parentRule === rule0 // true
rule2.parentRule === rule1 // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_4-cssrule-type" tabindex="-1"><a class="header-anchor" href="#_4-cssrule-type" aria-hidden="true">#</a> （4）CSSRule.type</h5>
<p><code v-pre>CSSRule.type</code>属性<strong>返回一个整数值，表示当前规则的类型</strong>。</p>
<p>最常见的类型有以下几种。</p>
<ul>
<li>1：普通样式规则（CSSStyleRule 实例）</li>
<li>3：<code v-pre>@import</code>规则</li>
<li>4：<code v-pre>@media</code>规则（CSSMediaRule 实例）</li>
<li>5：<code v-pre>@font-face</code>规则</li>
</ul>
<h4 id="_10-3-cssstylerule-接口" tabindex="-1"><a class="header-anchor" href="#_10-3-cssstylerule-接口" aria-hidden="true">#</a> 10.3 CSSStyleRule 接口</h4>
<p><strong>如果一条 CSS 规则是普通的样式规则（不含特殊的 CSS 命令），那么除了 CSSRule 接口，它还部署了 CSSStyleRule 接口。</strong></p>
<p>CSSStyleRule 接口有以下两个属性。</p>
<h5 id="_1-cssstylerule-selectortext" tabindex="-1"><a class="header-anchor" href="#_1-cssstylerule-selectortext" aria-hidden="true">#</a> （1）CSSStyleRule.selectorText</h5>
<p><code v-pre>CSSStyleRule.selectorText</code>属性<strong>返回当前规则的选择器</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var stylesheet = document.styleSheets[0];
stylesheet.cssRules[0].selectorText // &quot;.myClass&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，这个属性是<strong>可写的</strong>。</p>
<h5 id="_2-cssstylerule-style" tabindex="-1"><a class="header-anchor" href="#_2-cssstylerule-style" aria-hidden="true">#</a> （2）CSSStyleRule.style</h5>
<p><code v-pre>CSSStyleRule.style</code>属性<strong>返回一个对象（CSSStyleDeclaration 实例），代表当前规则的样式声明，也就是选择器后面的大括号里面的部分。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML 代码为
// &lt;style id=&quot;myStyle&quot;&gt;
//   p { color: red; }
// &lt;/style&gt;
var styleSheet = document.getElementById('myStyle').sheet;
styleSheet.cssRules[0].style instanceof CSSStyleDeclaration
// true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CSSStyleDeclaration 实例的<code v-pre>cssText</code>属性，可以返回所有样式声明，格式为字符串。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>styleSheet.cssRules[0].style.cssText
// &quot;color: red;&quot;
styleSheet.cssRules[0].selectorText
// &quot;p&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_10-4-cssmediarule-接口" tabindex="-1"><a class="header-anchor" href="#_10-4-cssmediarule-接口" aria-hidden="true">#</a> 10.4 CSSMediaRule 接口</h4>
<p><strong>如果一条 CSS 规则是<code v-pre>@media</code>代码块，那么它除了 CSSRule 接口，还部署了 CSSMediaRule 接口。</strong></p>
<p>该接口主要提供<code v-pre>media</code>属性和<code v-pre>conditionText</code>属性。前者返回代表<code v-pre>@media</code>规则的一个对象（MediaList 实例），后者返回<code v-pre>@media</code>规则的生效条件。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// HTML 代码如下
// &lt;style id=&quot;myStyle&quot;&gt;
//   @media screen and (min-width: 900px) {
//     article { display: flex; }
//   }
// &lt;/style&gt;
var styleSheet = document.getElementById('myStyle').sheet;
styleSheet.cssRules[0] instanceof CSSMediaRule
// true

styleSheet.cssRules[0].media
//  {
//    0: &quot;screen and (min-width: 900px)&quot;,
//    appendMedium: function,
//    deleteMedium: function,
//    item: function,
//    length: 1,
//    mediaText: &quot;screen and (min-width: 900px)&quot;
// }

styleSheet.cssRules[0].conditionText
// &quot;screen and (min-width: 900px)&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_11、window-matchmedia" tabindex="-1"><a class="header-anchor" href="#_11、window-matchmedia" aria-hidden="true">#</a> 11、window.matchMedia()</h3>
<h4 id="_11-1-基本用法" tabindex="-1"><a class="header-anchor" href="#_11-1-基本用法" aria-hidden="true">#</a> 11.1 基本用法</h4>
<p><code v-pre>window.matchMedia</code>方法<strong>用来将 CSS 的<a href="https://developer.mozilla.org/en-US/docs/DOM/Using_media_queries_from_code" target="_blank" rel="noopener noreferrer"><code v-pre>MediaQuery</code></a>条件语句，转换成一个 MediaQueryList 实例</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var mdl = window.matchMedia('(min-width: 400px)');
mdl instanceof MediaQueryList // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，变量<code v-pre>mdl</code>就是 mediaQueryList 的实例。</p>
<p>注意，如果参数不是有效的<code v-pre>MediaQuery</code>条件语句，<code v-pre>window.matchMedia</code>不会报错，依然返回一个 MediaQueryList 实例。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>window.matchMedia('bad string') instanceof MediaQueryList // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_11-2-mediaquerylist-接口的实例属性" tabindex="-1"><a class="header-anchor" href="#_11-2-mediaquerylist-接口的实例属性" aria-hidden="true">#</a> 11.2 MediaQueryList 接口的实例属性</h4>
<p>MediaQueryList 实例有三个属性。</p>
<h5 id="_1-mediaquerylist-media" tabindex="-1"><a class="header-anchor" href="#_1-mediaquerylist-media" aria-hidden="true">#</a> （1）MediaQueryList.media</h5>
<p><code v-pre>MediaQueryList.media</code>属性<strong>返回一个字符串，表示对应的 MediaQuery 条件语句</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var mql = window.matchMedia('(min-width: 400px)');
mql.media // &quot;(min-width: 400px)&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_2-mediaquerylist-matches" tabindex="-1"><a class="header-anchor" href="#_2-mediaquerylist-matches" aria-hidden="true">#</a> （2）MediaQueryList.matches</h5>
<p><code v-pre>MediaQueryList.matches</code>属性<strong>返回一个布尔值，表示当前页面是否符合指定的 MediaQuery 条件语句</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>if (window.matchMedia('(min-width: 400px)').matches) {
  /* 当前视口不小于 400 像素 */
} else {
  /* 当前视口小于 400 像素 */
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面的例子根据<code v-pre>mediaQuery</code>是否匹配当前环境，加载相应的 CSS 样式表。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var result = window.matchMedia(&quot;(max-width: 700px)&quot;);

if (result.matches){
  var linkElm = document.createElement('link');
  linkElm.setAttribute('rel', 'stylesheet');
  linkElm.setAttribute('type', 'text/css');
  linkElm.setAttribute('href', 'small.css');

  document.head.appendChild(linkElm);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_3-mediaquerylist-onchange" tabindex="-1"><a class="header-anchor" href="#_3-mediaquerylist-onchange" aria-hidden="true">#</a> （3）MediaQueryList.onchange</h5>
<p><strong>如果 MediaQuery 条件语句的适配环境发生变化，会触发<code v-pre>change</code>事件</strong>。<code v-pre>MediaQueryList.onchange</code>属性用来指定<code v-pre>change</code>事件的监听函数。该函数的参数是<code v-pre>change</code>事件对象（MediaQueryListEvent 实例），该对象与 MediaQueryList 实例类似，也有<code v-pre>media</code>和<code v-pre>matches</code>属性。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var mql = window.matchMedia('(max-width: 600px)');

mql.onchange = function(e) {
  if (e.matches) {
    /* 视口不超过 600 像素 */
  } else {
    /* 视口超过 600 像素 */
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>change</code>事件发生后，存在两种可能。一种是显示宽度从700像素以上变为以下，另一种是从700像素以下变为以上，所以在监听函数内部要判断一下当前是哪一种情况。</p>
<h4 id="_11-3-mediaquerylist-接口的实例方法" tabindex="-1"><a class="header-anchor" href="#_11-3-mediaquerylist-接口的实例方法" aria-hidden="true">#</a> 11.3 MediaQueryList 接口的实例方法</h4>
<p>MediaQueryList 实例有两个方法<code v-pre>MediaQueryList.addListener()</code>和<code v-pre>MediaQueryList.removeListener()</code>，<strong>用来为<code v-pre>change</code>事件添加或撤销监听函数</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var mql = window.matchMedia('(max-width: 600px)');

// 指定监听函数
mql.addListener(mqCallback);

// 撤销监听函数
mql.removeListener(mqCallback);

function mqCallback(e) {
  if (e.matches) {
    /* 视口不超过 600 像素 */
  } else {
    /* 视口超过 600 像素 */
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，<code v-pre>MediaQueryList.removeListener()</code>方法不能撤销<code v-pre>MediaQueryList.onchange</code>属性指定的监听函数。</p>
<h3 id="_12、本章小结" tabindex="-1"><a class="header-anchor" href="#_12、本章小结" aria-hidden="true">#</a> 12、本章小结</h3>
<p>本章当中的实例（接口）有：</p>
<p><strong>CSSStyleDeclaration接口</strong>（css样式声明）： 用来操作元素的样式</p>
<p><strong>StyleSheet接口（样式表</strong>）： 代表网页的一张样式表，包括<code v-pre>&lt;link&gt;</code>元素加载的样式表和<code v-pre> &lt;style&gt; </code>元素内嵌的样式表。</p>
<p><strong>CSSRuleList接口（css规则列表）</strong>： 一个类似数组的对象，表示一组 CSS 规则，成员都是 CSSRule 实例。</p>
<p><strong>CSSRule接口（css规则）</strong>： JavaScript 通过 CSSRule 接口操作 CSS 规则。一般通过 CSSRuleList 接口（<code v-pre>StyleSheet.cssRules</code>）获取 CSSRule 实例。</p>
<p><strong>CSSStyleRule接口</strong>： 如果一条 CSS 规则是普通的样式规则（不含特殊的 CSS 命令），那么除了 CSSRule 接口，它还部署了 CSSStyleRule 接口。</p>
<p><strong>CSSMediaRule 接口</strong>： 如果一条 CSS 规则是<code v-pre>@media</code>代码块，那么它除了 CSSRule 接口，还部署了 CSSMediaRule 接口。</p>
<h2 id="九、mutation-observer-api-监视dom变动" tabindex="-1"><a class="header-anchor" href="#九、mutation-observer-api-监视dom变动" aria-hidden="true">#</a> 九、Mutation Observer API 监视DOM变动</h2>
<h3 id="_1、概述-1" tabindex="-1"><a class="header-anchor" href="#_1、概述-1" aria-hidden="true">#</a> 1、概述</h3>
<p>Mutation Observer API <strong>用来监视 DOM 变动</strong>。DOM 的任何变动，比如节点的增减、属性的变动、文本内容的变动，这个 API 都可以得到通知。</p>
<p>概念上，它很接近事件，<strong>可以理解为 DOM 发生变动就会触发 Mutation Observer 事件。但是，它与事件有一个本质不同：事件是同步触发，也就是说，DOM 的变动立刻会触发相应的事件；Mutation Observer 则是异步触发，DOM 的变动并不会马上触发，而是要等到当前所有 DOM 操作都结束才触发。</strong></p>
<p>这样设计是为了应付 DOM 变动频繁的特点。举例来说，如果文档中连续插入1000个<code v-pre> &lt;p&gt; </code>元素，就会连续触发1000个插入事件，执行每个事件的回调函数，这很可能造成浏览器的卡顿；而 Mutation Observer 完全不同，只在1000个段落都插入结束后才会触发，而且只触发一次。</p>
<p>Mutation Observer 有以下特点。</p>
<ul>
<li><strong>它等待所有脚本任务完成后，才会运行（即异步触发方式）。</strong></li>
<li><strong>它把 DOM 变动记录封装成一个数组进行处理，而不是一条条个别处理 DOM 变动。</strong></li>
<li><strong>它既可以观察 DOM 的所有类型变动，也可以指定只观察某一类变动。</strong></li>
</ul>
<h3 id="_2、mutationobserver-构造函数-使用方式" tabindex="-1"><a class="header-anchor" href="#_2、mutationobserver-构造函数-使用方式" aria-hidden="true">#</a> 2、MutationObserver 构造函数 (使用方式)</h3>
<p>使用时，<strong>首先使用<code v-pre>MutationObserver</code>构造函数，新建一个观察器实例，同时指定这个实例的回调函数。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var observer = new MutationObserver(callback);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码中的回调函数，会在每次 DOM 变动后调用。该回调函数接受两个参数，第一个是变动数组，第二个是观察器实例，下面是一个例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var observer = new MutationObserver(function (mutations, observer) {
  mutations.forEach(function(mutation) {
    console.log(mutation);
  });
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、mutationobserver-的实例方法" tabindex="-1"><a class="header-anchor" href="#_3、mutationobserver-的实例方法" aria-hidden="true">#</a> 3、MutationObserver 的实例方法</h3>
<h4 id="_3-1-observe" tabindex="-1"><a class="header-anchor" href="#_3-1-observe" aria-hidden="true">#</a> 3.1 observe()</h4>
<p><code v-pre>observe</code>方法<strong>用来启动监听，它接受两个参数。</strong></p>
<ul>
<li>第一个参数：所要观察的 DOM 节点</li>
<li>第二个参数：一个配置对象，指定所要观察的特定变动</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var article = document.querySelector('article');

var  options = { // 配置对象，用于observer参数二，配置指定观察的特定变动
  'childList': true, // 子节点变动
  'attributes':true, // 属性变动
  'characterData': true // 节点内容或节点文本的变动
} ;

observer.observe(article, options);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>observe</code>方法接受两个参数，第一个是所要观察的DOM元素是<code v-pre>article</code>，第二个是所要观察的变动类型（子节点变动和属性变动）。</p>
<p>观察器所能观察的 DOM 变动类型（即上面代码的<code v-pre>options</code>对象），有以下几种。</p>
<ul>
<li><strong>childList</strong>：子节点的变动（指新增，删除或者更改）。</li>
<li><strong>attributes</strong>：属性的变动。</li>
<li><strong>characterData</strong>：节点内容或节点文本的变动。</li>
</ul>
<p>想要观察哪一种变动类型，就在<code v-pre>option</code>对象中指定它的值为<code v-pre>true</code>。需要注意的是，必须同时指定<code v-pre>childList</code>、<code v-pre>attributes</code>和<code v-pre>characterData</code>中的一种或多种，若未均指定将报错。</p>
<p>除了变动类型，<code v-pre>options</code>对象还可以设定以下属性：</p>
<ul>
<li><code v-pre>subtree</code>：布尔值，表示是否将该观察器应用于该节点的所有后代节点。</li>
<li><code v-pre>attributeOldValue</code>：布尔值，表示观察<code v-pre>attributes</code>变动时，是否需要记录变动前的属性值。</li>
<li><code v-pre>characterDataOldValue</code>：布尔值，表示观察<code v-pre>characterData</code>变动时，是否需要记录变动前的值。</li>
<li><code v-pre>attributeFilter</code>：数组，表示需要观察的特定属性（比如<code v-pre>['class','src']</code>）。</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 开始监听文档根节点（即&lt;html&gt;标签）的变动
mutationObserver.observe(document.documentElement, {
  attributes: true, // 属性变动
  characterData: true, // 节点内容或节点文本的变动
  childList: true, // 子节点的变动
  subtree: true, // 是否将该观察器应用于该节点的所有后代节点
  attributeOldValue: true, // 观察attributes变动时，是否需要记录变动前的属性值
  characterDataOldValue: true // 观察characterData变动时，是否需要记录变动前的值。
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对一个节点添加观察器，就像使用<code v-pre>addEventListener</code>方法一样，多次添加同一个观察器是无效的，回调函数依然只会触发一次。如果指定不同的<code v-pre>options</code>对象，以后面添加的那个为准，类似覆盖。</p>
<p>下面的例子是观察新增的子节点。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var insertedNodes = [];
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    for (var i = 0; i &lt; mutation.addedNodes.length; i++) {
      insertedNodes.push(mutation.addedNodes[i]);
    }
  });
  console.log(insertedNodes);
});
observer.observe(document, { childList: true, subtree: true });
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-2-disconnect-takerecords" tabindex="-1"><a class="header-anchor" href="#_3-2-disconnect-takerecords" aria-hidden="true">#</a> 3.2 disconnect()，takeRecords（）</h4>
<p><code v-pre>disconnect</code>方法<strong>用来停止观察。调用该方法后，DOM 再发生变动，也不会触发观察器</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>observer.disconnect();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>takeRecords</code>方法<strong>用来清除变动记录，即不再处理未处理的变动。该方法返回变动记录的数组</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>observer.takeRecords();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>下面是一个例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 保存所有没有被观察器处理的变动
var changes = mutationObserver.takeRecords();

// 停止观察
mutationObserver.disconnect();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、mutationrecord-对象-变动记录" tabindex="-1"><a class="header-anchor" href="#_4、mutationrecord-对象-变动记录" aria-hidden="true">#</a> 4、MutationRecord 对象 (变动记录)</h3>
<p><strong>DOM 每次发生变化，就会生成一条变动记录（MutationRecord 实例）</strong>。该实例包含了与变动相关的所有信息。Mutation Observer 处理的就是一个个<code v-pre>MutationRecord</code>实例所组成的数组。</p>
<p><code v-pre>MutationRecord</code>对象包含了DOM的相关信息，有如下属性：</p>
<ul>
<li><code v-pre>type</code>：观察的变动类型（<code v-pre>attributes</code>、<code v-pre>characterData</code>或者<code v-pre>childList</code>）。</li>
<li><code v-pre>target</code>：发生变动的DOM节点。</li>
<li><code v-pre>addedNodes</code>：新增的DOM节点。</li>
<li><code v-pre>removedNodes</code>：删除的DOM节点。</li>
<li><code v-pre>previousSibling</code>：前一个同级节点，如果没有则返回<code v-pre>null</code>。</li>
<li><code v-pre>nextSibling</code>：下一个同级节点，如果没有则返回<code v-pre>null</code>。</li>
<li><code v-pre>attributeName</code>：发生变动的属性。如果设置了<code v-pre>attributeFilter</code>，则只返回预先指定的属性。</li>
<li><code v-pre>oldValue</code>：变动前的值。这个属性只对<code v-pre>attribute</code>和<code v-pre>characterData</code>变动有效，如果发生<code v-pre>childList</code>变动，则返回<code v-pre>null</code>。</li>
</ul>
<h3 id="_5、应用示例" tabindex="-1"><a class="header-anchor" href="#_5、应用示例" aria-hidden="true">#</a> 5、应用示例</h3>
<h4 id="_5-1-子元素的变动" tabindex="-1"><a class="header-anchor" href="#_5-1-子元素的变动" aria-hidden="true">#</a> 5.1 子元素的变动</h4>
<p>下面的例子说明如何读取变动记录。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var callback = function (records){
  console.log(records) // records参数是 MutationRecord实例
  records.map(function(record){
    console.log('Mutation type: ' + record.type);
    console.log('Mutation target: ' + record.target);
  });
};
/*
    [MutationRecord]
    0: MutationRecord
    addedNodes: NodeList [text]
    attributeName: null
    attributeNamespace: null
    nextSibling: null
    oldValue: null
    previousSibling: script
    removedNodes: NodeList []
    target: body
    type: &quot;childList&quot;
    __proto__: MutationRecord
    length: 1
    __proto__: Array(0)
    Mutation type: childList
    test.html:23 Mutation target: [object HTMLBodyElement]
*/
var mo = new MutationObserver(callback);

var option = {
  'childList': true,
  'subtree': true
};

mo.observe(document.body, option);

document.body.append(document.createElement('div').textContent = '123')
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码的观察器，观察<code v-pre>&lt;body&gt;</code>的所有下级节点（<code v-pre>childList</code>表示观察子节点，<code v-pre>subtree</code>表示观察后代节点）的变动。回调函数会在控制台显示所有变动的类型和目标节点。</p>
<h4 id="_5-2-属性的变动" tabindex="-1"><a class="header-anchor" href="#_5-2-属性的变动" aria-hidden="true">#</a> 5.2 属性的变动</h4>
<p>下面的例子说明如何追踪属性的变动。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var callback = function (records) {
  records.map(function (record) {
    console.log('Previous attribute value: ' + record.oldValue);
  });
};

var mo = new MutationObserver(callback);

var element = document.getElementById('#my_element');

var options = {
  'attributes': true,
  'attributeOldValue': true
}

mo.observe(element, options);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码先设定追踪属性变动（<code v-pre>'attributes': true</code>），然后设定记录变动前的值。实际发生变动时，会将变动前的值显示在控制台。</p>
<h4 id="_5-3-取代-domcontentloaded-事件" tabindex="-1"><a class="header-anchor" href="#_5-3-取代-domcontentloaded-事件" aria-hidden="true">#</a> 5.3 取代 DOMContentLoaded 事件</h4>
<p>网页加载的时候，DOM 节点的生成会产生变动记录，因此只要观察 DOM 的变动，就能在第一时间触发相关事件，也就没有必要使用<code v-pre>DOMContentLoaded</code>事件。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var observer = new MutationObserver(callback);
observer.observe(document.documentElement, {
  childList: true,
  subtree: true
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，监听<code v-pre>document.documentElement</code>（即网页的<code v-pre>&lt;html&gt;</code>HTML 节点）的子节点的变动，<code v-pre>subtree</code>属性指定监听还包括后代节点。因此，任意一个网页元素一旦生成，就能立刻被监听到。</p>
<h6 id="封装一个监听-dom-生成的函数" tabindex="-1"><a class="header-anchor" href="#封装一个监听-dom-生成的函数" aria-hidden="true">#</a> 封装一个监听 DOM 生成的函数</h6>
<p>下面的代码，使用<code v-pre>MutationObserver</code>对象<strong>封装一个监听 DOM 生成的函数</strong>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>(function(win){
  'use strict';

  var listeners = [];
  var doc = win.document;
  var MutationObserver = win.MutationObserver || win.WebKitMutationObserver;
  var observer;

  function ready(selector, fn){
    // 储存选择器和回调函数
    listeners.push({
      selector: selector,
      fn: fn
    });
    if(!observer){
      // 监听document变化
      observer = new MutationObserver(check);
      observer.observe(doc.documentElement, {
        childList: true,
        subtree: true
      });
    }
    // 检查该节点是否已经在DOM中
    check();
  }

  function check(){
  // 检查是否匹配已储存的节点
    for(var i = 0; i &lt; listeners.length; i++){
      var listener = listeners[i];
      // 检查指定节点是否有匹配
      var elements = doc.querySelectorAll(listener.selector);
      for(var j = 0; j &lt; elements.length; j++){
        var element = elements[j];
        // 确保回调函数只会对该元素调用一次
        if(!element.ready){
          element.ready = true;
          // 对该节点调用回调函数
          listener.fn.call(element, element);
        }
      }
    }
  }

  // 对外暴露ready
  win.ready = ready;

})(this);

// 使用方法
ready('.foo', function(element){
  // ...
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="文档" tabindex="-1"><a class="header-anchor" href="#文档" aria-hidden="true">#</a> 文档</h2>
<p>学习文档：<a href="https://wangdoc.com/javascript/" target="_blank" rel="noopener noreferrer">https://wangdoc.com/javascript/</a></p>
</div></template>
