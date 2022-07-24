<template><div><h1 id="yaml语言教程" tabindex="-1"><a class="header-anchor" href="#yaml语言教程" aria-hidden="true">#</a> yaml语言教程</h1>
<h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h2>
<p>YAML 是 &quot;YAML Ain't a Markup Language&quot;（YAML 不是一种标记语言）的递归缩写。在开发的这种语言时，YAML 的意思其实是：&quot;Yet Another Markup Language&quot;（仍是一种标记语言）。</p>
<!-- more -->
<p>YAML 的语法和其他高级语言类似，并且可以简单表达清单、散列表，标量等数据形态。它使用空白符号缩进和大量依赖外观的特色，特别<strong>适合用来表达或编辑数据结构、各种配置文件、倾印调试内容、文件大纲</strong>（例如：许多电子邮件标题格式和YAML非常接近）。</p>
<p>YAML 的配置文件后缀为 <strong>.yml</strong>，如：<strong>runoob.yml</strong> 。</p>
<blockquote>
<p>yaml常用来用作配置文件，和json类似</p>
</blockquote>
<h2 id="基本语法" tabindex="-1"><a class="header-anchor" href="#基本语法" aria-hidden="true">#</a> 基本语法</h2>
<ul>
<li>
<p>大小写敏感</p>
</li>
<li>
<p>使用缩进表示层级关系</p>
</li>
<li>
<p>缩进不允许使用tab，只允许空格</p>
</li>
<li>
<p>缩进的空格数不重要，只要相同层级的元素左对齐即可</p>
</li>
<li>
<p>'#'表示注释</p>
</li>
</ul>
<h2 id="数据类型" tabindex="-1"><a class="header-anchor" href="#数据类型" aria-hidden="true">#</a> 数据类型</h2>
<p>YAML 支持以下几种数据类型：</p>
<ul>
<li><strong>对象</strong>：键值对的集合，又称为映射（mapping）/ 哈希（hashes） / 字典（dictionary）</li>
<li><strong>数组</strong>：一组按次序排列的值，又称为序列（sequence） / 列表（list）</li>
<li><strong>纯量</strong>（scalars）：单个的、不可再分的值</li>
</ul>
<h2 id="yaml-对象" tabindex="-1"><a class="header-anchor" href="#yaml-对象" aria-hidden="true">#</a> YAML 对象</h2>
<p>对象的几种表示形式：</p>
<p>1、对象键值对使用冒号结构表示 <strong>key: value</strong>，冒号后面要加一个空格。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>key: value
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>2、也可以使用 <strong>key:{key1: value1, key2: value2, ...}</strong>。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>key:{child-key1:value1,child-key2:value2}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>3、还可以使用缩进表示层级关系；</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>key: 
    child-key1: value1
    child-key2: value2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同2，只是表示形式不同。</p>
<p>4、较为复杂的对象格式，可以使用问号加一个空格代表一个复杂的 key，配合一个冒号加一个空格代表一个 value：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>?  
    - complexkey1
    - complexkey2
:
    - complexvalue1
    - complexvalue2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>意思即对象的属性是一个数组 [complexkey1,complexkey2]，对应的值也是一个数组 [complexvalue1,complexvalue2]</p>
<h2 id="yaml-数组" tabindex="-1"><a class="header-anchor" href="#yaml-数组" aria-hidden="true">#</a> YAML 数组</h2>
<p>以 <strong>-</strong> 开头的行表示构成一个数组：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>- A
- B
- C
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>YAML 支持多维数组，可以使用行内表示：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>key: [value1, value2, ...]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>数据结构的子成员是一个数组，则可以在该项下面缩进一个空格。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>-
 - A
 - B
 - C
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一个相对复杂的例子：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>companies:
    -
        id: 1
        name: company1
        price: 200W
    -
        id: 2
        name: company2
        price: 500W
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>意思是 companies 属性是一个数组，每一个数组元素又是由 id、name、price 三个属性构成。</p>
<p>数组也可以使用流式(flow)的方式表示：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>companies: [{id: 1,name: company1,price: 200W},{id: 2,name: company2,price: 500W}]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="复合结构-对象和数组组合" tabindex="-1"><a class="header-anchor" href="#复合结构-对象和数组组合" aria-hidden="true">#</a> 复合结构（对象和数组组合）</h2>
<p>数组和对象可以构成复合结构，例：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>languages:
  - Ruby
  - Perl
  - Python 
websites:
  YAML: yaml.org 
  Ruby: ruby-lang.org 
  Python: python.org 
  Perl: use.perl.org
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>转换为 js 为：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>{ 
  languages: [ 'Ruby', 'Perl', 'Python'],
  websites: {
    YAML: 'yaml.org',
    Ruby: 'ruby-lang.org',
    Python: 'python.org',
    Perl: 'use.perl.org' 
  } 
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="纯量" tabindex="-1"><a class="header-anchor" href="#纯量" aria-hidden="true">#</a> 纯量</h2>
<p>纯量是最基本的，不可再分的值，包括：</p>
<ul>
<li>字符串</li>
<li>布尔值</li>
<li>整数</li>
<li>浮点数</li>
<li>Null</li>
<li>时间</li>
<li>日期</li>
</ul>
<p>使用一个例子来快速了解纯量的基本使用：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>boolean: # 布尔值
    - TRUE  #true,True都可以
    - FALSE  #false，False都可以
float: # 浮点数
    - 3.14
    - 6.8523015e+5  #可以使用科学计数法
int: # 整数
    - 123
    - 0b1010_0111_0100_1010_1110    #二进制表示
null: # Null
    nodeName: 'node'
    parent: ~  #使用~表示null
string: # 字符串
    - 哈哈 # 字符串默认不使用引号表示
    - 'Hello world'  #可以使用双引号或者单引号包裹特殊字符
    - newline
      newline2    #字符串可以拆成多行，每一行会被转化成一个空格
date:
    - 2018-02-17    #日期必须使用ISO 8601格式，即yyyy-MM-dd
datetime: 
    -  2018-02-17T15:02:31+08:00    #时间使用ISO 8601格式，时间和日期之间使用T连接，最后使用+代表时区
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>多行字符串可以使用<code v-pre>|</code>保留换行符，也可以使用<code v-pre>&gt;</code>折叠换行。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>this: |
  Foo
  Bar
that: &gt;
  Foo
  Bar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>转为js代码如下。</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code>{ this: 'Foo\nBar\n', that: 'Foo Bar\n' }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>+</code>表示保留文字块末尾的换行，<code v-pre>-</code>表示删除字符串末尾的换行。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>s1: |
  Foo
 
s2: |+
  Foo
 
 
s3: |-
  Foo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>转为json代码如下</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code>{ s1: 'Foo\n', s2: 'Foo\n\n\n', s3: 'Foo' }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>字符串之中可以插入 HTML 标记。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>message: |
  &lt;p style=&quot;color: red&quot;&gt;
    段落
  &lt;/p&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="转换数据格式" tabindex="-1"><a class="header-anchor" href="#转换数据格式" aria-hidden="true">#</a> 转换数据格式</h2>
<p>允许使用两个感叹号，强制转换数据类型。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>e: !!str 123
f: !!str true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>转换js结果同：</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code>{ e: '123', f: 'true' }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="锚点引用" tabindex="-1"><a class="header-anchor" href="#锚点引用" aria-hidden="true">#</a> 锚点引用</h2>
<p><strong>&amp;</strong> 锚点和&lt; span class=&quot;marked&quot;&gt;* 别名，可以用来引用:</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>defaults: &amp;defaults # 添加锚点
  adapter:  postgres
  host:     localhost

development:
  database: myapp_development
  &lt;&lt;: *defaults # &lt;&lt;表示合并，*引用锚点

test:
  database: myapp_test
  &lt;&lt;: *defaults # &lt;&lt;表示合并，*引用锚点
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>相当于:</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>defaults:
  adapter:  postgres
  host:     localhost

development:
  database: myapp_development
  adapter:  postgres
  host:     localhost

test:
  database: myapp_test
  adapter:  postgres
  host:     localhost
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>&amp;</strong> 用来建立锚点（defaults），<strong>&lt;&lt;</strong> 表示合并到当前数据，***** 用来引用锚点。</p>
<p>下面是另一个例子:</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>- &amp;showell Steve 
- Clark 
- Brian 
- Oren 
- *showell 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>转为js代码如下:</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>[ 'Steve', 'Clark', 'Brian', 'Oren', 'Steve' ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>参考：</p>
<ul>
<li>yaml官网：<a href="https://yaml.org/" target="_blank" rel="noopener noreferrer">https://yaml.org/</a></li>
<li>yaml与js的转换demo：<a href="http://nodeca.github.io/js-yaml/" target="_blank" rel="noopener noreferrer">http://nodeca.github.io/js-yaml/</a></li>
<li>菜鸟教程：<a href="https://www.ruanyifeng.com/blog/2016/07/yaml.html" target="_blank" rel="noopener noreferrer">https://www.ruanyifeng.com/blog/2016/07/yaml.html</a></li>
</ul>
</blockquote>
</div></template>
