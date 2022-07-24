<template><div><h1 id="js获取和修改url参数" tabindex="-1"><a class="header-anchor" href="#js获取和修改url参数" aria-hidden="true">#</a> JS获取和修改url参数</h1>
<h2 id="获取url参数" tabindex="-1"><a class="header-anchor" href="#获取url参数" aria-hidden="true">#</a> 获取url参数</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>/**
 * 获取url里的参数
 * @param arg 参数名
 * @returns
 */
function getURLString(arg) {
    var reg = new RegExp(&quot;(^|&amp;)&quot; + arg + &quot;=([^&amp;]*)(&amp;|$)&quot;, &quot;i&quot;);
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="修改url参数" tabindex="-1"><a class="header-anchor" href="#修改url参数" aria-hidden="true">#</a> 修改url参数</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>/**
 * url地址修改
 * @param url 待修改url
 * @param arg 修改的参数名
 * @param arg_val 修改的具体值
 * @returns {String}
 */
function changeURLArg(url, arg, arg_val) {
    var pattern = arg + '=([^&amp;]*)';
    var replaceText = arg + '=' + arg_val;
    if (url.match(pattern)) {
        var tmp = '/(' + arg + '=)([^&amp;]*)/gi';
        tmp = url.replace(eval(tmp), replaceText);
        return tmp;
    } else {
        if (url.match('[\?]')) {
            return url + '&amp;' + replaceText;
        } else {
            return url + '?' + replaceText;
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="不刷新页面修改url参数" tabindex="-1"><a class="header-anchor" href="#不刷新页面修改url参数" aria-hidden="true">#</a> 不刷新页面修改url参数</h2>
<p><a href="https://www.cnblogs.com/wuting/p/8946927.html" target="_blank" rel="noopener noreferrer">https://www.cnblogs.com/wuting/p/8946927.html</a></p>
<h2 id="url-的编码和解码" tabindex="-1"><a class="header-anchor" href="#url-的编码和解码" aria-hidden="true">#</a> URL 的编码和解码</h2>
<p>比如，UTF-8 的操作系统上，<code v-pre>http://www.example.com/q=春节</code>这个 URL 之中，汉字“春节”不是 URL 的合法字符，所以被浏览器自动转成<code v-pre>http://www.example.com/q=%E6%98%A5%E8%8A%82</code>。其中，“春”转成了<code v-pre>%E6%98%A5</code>，“节”转成了<code v-pre>%E8%8A%82</code>。这是因为“春”和“节”的 UTF-8 编码分别是<code v-pre>E6 98 A5</code>和<code v-pre>E8 8A 82</code>，将每个字节前面加上百分号，就构成了 URL 编码。</p>
<p>JavaScript 提供四个 URL 的编码/解码方法。</p>
<ul>
<li><code v-pre>encodeURI()</code></li>
<li><code v-pre>encodeURIComponent()</code></li>
<li><code v-pre>decodeURI()</code></li>
<li><code v-pre>decodeURIComponent()</code></li>
</ul>
<p><a href="https://xugaoyi.com/pages/bab4930124ad2c10/#_2%E3%80%81url-%E7%9A%84%E7%BC%96%E7%A0%81%E5%92%8C%E8%A7%A3%E7%A0%81" target="_blank" rel="noopener noreferrer">查看文档</a></p>
</div></template>
