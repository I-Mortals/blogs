<template><div><h1 id="常用meta整理" tabindex="-1"><a class="header-anchor" href="#常用meta整理" aria-hidden="true">#</a> 常用meta整理</h1>
<h2 id="meta-元素" tabindex="-1"><a class="header-anchor" href="#meta-元素" aria-hidden="true">#</a> &lt;meta&gt; 元素</h2>
<h3 id="概要" tabindex="-1"><a class="header-anchor" href="#概要" aria-hidden="true">#</a> 概要</h3>
<p>meta标签提供关于HTML文档的元数据。元数据不会显示在页面上，但是对于机器是可读的。它可用于浏览器（如何显示内容或重新加载页面），搜索引擎（关键词），或其他 web 服务。</p>
<!-- more -->
<p><strong>必要属性</strong></p>
<table>
<thead>
<tr>
<th>属性</th>
<th>值</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>content</td>
<td>some text</td>
<td>定义与http-equiv或name属性相关的元信息</td>
</tr>
</tbody>
</table>
<p><strong>可选属性</strong></p>
<table>
<thead>
<tr>
<th>属性</th>
<th>值</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>http-equiv</td>
<td>content-type / expire / refresh / set-cookie</td>
<td>把content属性关联到HTTP头部。</td>
</tr>
<tr>
<td>name</td>
<td>author / description / keywords / generator / revised / others</td>
<td>把 content 属性关联到一个name。</td>
</tr>
<tr>
<td>content</td>
<td>some text</td>
<td>定义用于翻译 content 属性值的格式。</td>
</tr>
</tbody>
</table>
<h3 id="网页相关" tabindex="-1"><a class="header-anchor" href="#网页相关" aria-hidden="true">#</a> 网页相关</h3>
<ul>
<li><strong>申明编码</strong></li>
</ul>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;meta charset='utf-8' /&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><strong>优先使用 IE 最新版本和 Chrome</strong></li>
</ul>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;!-- 关于X-UA-Compatible --&gt;
&lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge,chrome=1&quot; /&gt; &lt;!-- 推荐 --&gt;

&lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=6&quot; &gt;&lt;!-- 使用IE6 --&gt;
&lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=7&quot; &gt;&lt;!-- 使用IE7 --&gt;
&lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=8&quot; &gt;&lt;!-- 使用IE8 --&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>浏览器内核控制</strong>：国内浏览器很多都是双内核（webkit和Trident），webkit内核高速浏览，IE内核兼容网页和旧版网站。而添加meta标签的网站可以控制浏览器选择何种内核渲染。<a href="http://se.360.cn/v6/help/meta.html" target="_blank" rel="noopener noreferrer">参考文档</a></li>
</ul>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>默认用极速核(Chrome)：&lt;meta name=&quot;renderer&quot; content=&quot;webkit&quot;&gt; 
默认用ie兼容内核（IE6/7）：&lt;meta name=&quot;renderer&quot; content=&quot;ie-comp&quot;&gt; 
默认用ie标准内核（IE9/IE10/IE11/取决于用户的IE）：&lt;meta name=&quot;renderer&quot; content=&quot;ie-stand&quot;&gt; 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>国内双核浏览器默认内核模式如下：</p>
<ol>
<li>搜狗高速浏览器、QQ浏览器：IE内核（兼容模式）</li>
<li>360极速浏览器、遨游浏览器：Webkit内核（极速模式）</li>
</ol>
<ul>
<li><strong>禁止浏览器从本地计算机的缓存中访问页面内容</strong>：这样设定，访问者将无法脱机浏览。</li>
</ul>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;meta http-equiv=&quot;Pragma&quot; content=&quot;no-cache&quot;&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><strong>Windows 8</strong></li>
</ul>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;meta name=&quot;msapplication-TileColor&quot; content=&quot;#000&quot;/&gt; &lt;!-- Windows 8 磁贴颜色 --&gt;
&lt;meta name=&quot;msapplication-TileImage&quot; content=&quot;icon.png&quot;/&gt; &lt;!-- Windows 8 磁贴图标 --&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>站点适配</strong>：主要用于PC-手机页的对应关系。</li>
</ul>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;meta name=&quot;mobile-agent&quot;content=&quot;format=[wml|xhtml|html5]; url=url&quot;&gt;
&lt;!--
[wml|xhtml|html5]根据手机页的协议语言，选择其中一种；
url=&quot;url&quot; 后者代表当前PC页所对应的手机页URL，两者必须是一一对应关系。
 --&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>转码申明</strong>：用百度打开网页可能会对其进行转码（比如贴广告），避免转码可添加如下meta。</li>
</ul>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;meta http-equiv=&quot;Cache-Control&quot; content=&quot;no-siteapp&quot; /&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="seo优化" tabindex="-1"><a class="header-anchor" href="#seo优化" aria-hidden="true">#</a> SEO优化</h3>
<p><a href="http://msdn.microsoft.com/zh-cn/library/ff724016" target="_blank" rel="noopener noreferrer">参考文档</a></p>
<ul>
<li><strong>页面关键词</strong>，每个网页应具有描述该网页内容的一组唯一的关键字。
使用人们可能会搜索，并准确描述网页上所提供信息的描述性和代表性关键字及短语。标记内容太短，则搜索引擎可能不会认为这些内容相关。另外标记不应超过 874 个字符。</li>
</ul>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;meta name=&quot;keywords&quot; content=&quot;your tags&quot; /&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><strong>页面描述</strong>，每个网页都应有一个不超过 150 个字符且能准确反映网页内容的描述标签。</li>
</ul>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;meta name=&quot;description&quot; content=&quot;150 words&quot; /&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><strong>搜索引擎索引方式</strong>，robotterms是一组使用逗号(,)分割的值，通常有如下几种取值：none，noindex，nofollow，all，index和follow。确保正确使用nofollow和noindex属性值。</li>
</ul>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;meta name=&quot;robots&quot; content=&quot;index,follow&quot; /&gt;
&lt;!--
    all：文件将被检索，且页面上的链接可以被查询；
    none：文件将不被检索，且页面上的链接不可以被查询；
    index：文件将被检索；
    follow：页面上的链接可以被查询；
    noindex：文件将不被检索；
    nofollow：页面上的链接不可以被查询。
 --&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>页面重定向和刷新</strong>：content内的数字代表时间（秒），既多少时间后刷新。如果加url,则会重定向到指定网页（搜索引擎能够自动检测，也很容易被引擎视作误导而受到惩罚）。</li>
</ul>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;meta http-equiv=&quot;refresh&quot; content=&quot;0;url=&quot; /&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><strong>其他</strong></li>
</ul>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;meta name=&quot;author&quot; content=&quot;author name&quot; /&gt; &lt;!-- 定义网页作者 --&gt;
&lt;meta name=&quot;google&quot; content=&quot;index,follow&quot; /&gt;
&lt;meta name=&quot;googlebot&quot; content=&quot;index,follow&quot; /&gt;
&lt;meta name=&quot;verify&quot; content=&quot;index,follow&quot; /&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="移动设备" tabindex="-1"><a class="header-anchor" href="#移动设备" aria-hidden="true">#</a> 移动设备</h3>
<ul>
<li><strong>viewport</strong>：能优化移动浏览器的显示。如果不是响应式网站，不要使用initial-scale或者禁用缩放。</li>
</ul>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width,initial-scale=1.0,minimun-scale=1.0,maximum-scale=1.0,user-scalable=no&quot;/&gt;
&lt;!--这是常用的移动meta设置--&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>width：宽度（数值 / device-width）（范围从200 到10,000，默认为980 像素）</li>
<li>height：高度（数值 / device-height）（范围从223 到10,000）</li>
<li>initial-scale：初始的缩放比例 （范围从&gt;0 到10）</li>
<li>minimum-scale：允许用户缩放到的最小比例</li>
<li>maximum-scale：允许用户缩放到的最大比例</li>
<li>user-scalable：用户是否可以手动缩 (no,yes)</li>
</ol>
<p><strong>注意</strong>，很多人使用initial-scale=1到非响应式网站上，这会让网站以100%宽度渲染，用户需要手动移动页面或者缩放。如果和initial-scale=1同时使用user-scalable=no或maximum-scale=1，则用户将不能放大/缩小网页来看到全部的内容。</p>
<ul>
<li><strong>WebApp全屏模式</strong>：伪装app，离线应用。</li>
</ul>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;meta name=&quot;apple-mobile-web-app-capable&quot; content=&quot;yes&quot; /&gt; &lt;!-- 启用 WebApp 全屏模式 --&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><strong>主题颜色</strong></li>
</ul>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;meta name=&quot;theme-color&quot; content=&quot;#11a8cd&quot;&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://cdn.jsdelivr.net/gh/xugaoyi/image_store/blog/20200221134927.jpg" alt=""></p>
<ul>
<li><strong>隐藏状态栏/设置状态栏颜色</strong>：只有在开启WebApp全屏模式时才生效。content的值为default | black | black-translucent 。</li>
</ul>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;meta name=&quot;apple-mobile-web-app-status-bar-style&quot; content=&quot;black-translucent&quot; /&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><strong>添加到主屏后的标题</strong></li>
</ul>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;meta name=&quot;apple-mobile-web-app-title&quot; content=&quot;标题&quot;&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><strong>忽略数字自动识别为电话号码</strong></li>
</ul>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;meta content=&quot;telephone=no&quot; name=&quot;format-detection&quot; /&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><strong>忽略识别邮箱</strong></li>
</ul>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;meta content=&quot;email=no&quot; name=&quot;format-detection&quot; /&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><strong>添加智能 App 广告条 Smart App Banner</strong>：告诉浏览器这个网站对应的app，并在页面上显示下载banner(如下图)。<a href="https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/PromotingAppswithAppBanners/PromotingAppswithAppBanners.html" target="_blank" rel="noopener noreferrer">参考文档</a></li>
</ul>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;meta name=&quot;apple-itunes-app&quot; content=&quot;app-id=myAppStoreID, affiliate-data=myAffiliateData, app-argument=myURL&quot;&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://cdn.jsdelivr.net/gh/xugaoyi/image_store/blog/20200221134638.png" alt=""></p>
<ul>
<li><strong>其他</strong> <a href="http://fex.baidu.com/blog/2014/10/html-head-tags/?qq-pf-to=pcqq.c2c" target="_blank" rel="noopener noreferrer">参考文档</a></li>
</ul>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;!-- 针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓 --&gt;
&lt;meta name=&quot;HandheldFriendly&quot; content=&quot;true&quot;&gt;
&lt;!-- 微软的老式浏览器 --&gt;
&lt;meta name=&quot;MobileOptimized&quot; content=&quot;320&quot;&gt;
&lt;!-- uc强制竖屏 --&gt;
&lt;meta name=&quot;screen-orientation&quot; content=&quot;portrait&quot;&gt;
&lt;!-- QQ强制竖屏 --&gt;
&lt;meta name=&quot;x5-orientation&quot; content=&quot;portrait&quot;&gt;
&lt;!-- UC强制全屏 --&gt;
&lt;meta name=&quot;full-screen&quot; content=&quot;yes&quot;&gt;
&lt;!-- QQ强制全屏 --&gt;
&lt;meta name=&quot;x5-fullscreen&quot; content=&quot;true&quot;&gt;
&lt;!-- UC应用模式 --&gt;
&lt;meta name=&quot;browsermode&quot; content=&quot;application&quot;&gt;
&lt;!-- QQ应用模式 --&gt;
&lt;meta name=&quot;x5-page-mode&quot; content=&quot;app&quot;&gt;
&lt;!-- windows phone 点击无高光 --&gt;
&lt;meta name=&quot;msapplication-tap-highlight&quot; content=&quot;no&quot;&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="一个常用的移动端页面meta设置" tabindex="-1"><a class="header-anchor" href="#一个常用的移动端页面meta设置" aria-hidden="true">#</a> 一个常用的移动端页面meta设置</h3>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge&quot;&gt;
&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width,initial-scale=1.0,minimun-scale=1.0,maximum-scale=1.0,user-scalable=no&quot;&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>
