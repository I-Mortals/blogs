<template><div><h1 id="判断是否为移动端浏览器" tabindex="-1"><a class="header-anchor" href="#判断是否为移动端浏览器" aria-hidden="true">#</a> 判断是否为移动端浏览器</h1>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
if(flag){
    // 移动端
} else {
    // PC端
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>
