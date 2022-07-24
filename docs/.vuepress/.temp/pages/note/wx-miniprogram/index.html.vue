<template><div><h1 id="小程序笔记" tabindex="-1"><a class="header-anchor" href="#小程序笔记" aria-hidden="true">#</a> 小程序笔记</h1>
<h2 id="基础课程部分" tabindex="-1"><a class="header-anchor" href="#基础课程部分" aria-hidden="true">#</a> 基础课程部分</h2>
<h4 id="微信公众平台" tabindex="-1"><a class="header-anchor" href="#微信公众平台" aria-hidden="true">#</a> 微信公众平台</h4>
<p><a href="https://mp.weixin.qq.com/" target="_blank" rel="noopener noreferrer">https://mp.weixin.qq.com/</a></p>
<p>注册时可选择类型：订阅号、服务号、小程序、企业微信</p>
<p><strong>每个邮箱仅能注册一个小程序。</strong></p>
<p>个人类型小程序：无法使用微信支付、无法使用卡包功能</p>
<h5 id="小程序文档api" tabindex="-1"><a class="header-anchor" href="#小程序文档api" aria-hidden="true">#</a> 小程序文档API</h5>
<p><a href="https://developers.weixin.qq.com/miniprogram/dev/framework/quickstart/" target="_blank" rel="noopener noreferrer">小程序开发文档</a></p>
<h5 id="微信开放社区" tabindex="-1"><a class="header-anchor" href="#微信开放社区" aria-hidden="true">#</a> 微信开放社区</h5>
<p><a href="https://developers.weixin.qq.com/community/develop/question" target="_blank" rel="noopener noreferrer">微信开发社区</a></p>
<h4 id="目录说明" tabindex="-1"><a class="header-anchor" href="#目录说明" aria-hidden="true">#</a> 目录说明</h4>
<p><strong>默认目录</strong></p>
<p>pages-----------------------页面相关</p>
<p>​	index  ----------------- 首页文件夹</p>
<p>​		index.js ------------首页js</p>
<p>​		index.json---------首页配置</p>
<p>​		index.wxml-------首页html</p>
<p>​		index.wxss--------首页css</p>
<p>utils------------------------工具相关</p>
<p>app.js ----------------------项目总js</p>
<p>app.json-------------------全局配置( 页面路由以及头部、底部导航的配置等)</p>
<p>app.wxss -----------------项目总样式css</p>
<p>project.config.json ----项目配置</p>
<p><strong>代码构成</strong></p>
<p>.json ：配置文件，以json格式存储配置</p>
<p>​			 项目中有三种配置：项目配置（project.config.json）、全局配置（app.json）、页面配置（index.json）</p>
<p>.wxml: 相当于html文件</p>
<p>.wxss: 相当于css</p>
<p>.js : 就是js</p>
<h4 id="文件说明" tabindex="-1"><a class="header-anchor" href="#文件说明" aria-hidden="true">#</a> 文件说明</h4>
<p><strong>project.config.json项目配置 部分代码说明</strong></p>
<p>setting：{</p>
<p>urlCheck 是否检测安全的域名</p>
<p>es6  是否把es6转es5</p>
<p>postcss 是否把css样式自动补全</p>
<p>minified 是否压缩</p>
<p>}</p>
<p><strong>app.json 全局配置</strong></p>
<p><a href="https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html" target="_blank" rel="noopener noreferrer">全局配置API</a></p>
<p><strong>wxml 相关介绍</strong></p>
<p><a href="https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/" target="_blank" rel="noopener noreferrer">wxmlAPI</a></p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;view&gt;{{motto}}&lt;/view&gt;

循环渲染
&lt;view wx:for=&quot;{{list}}&quot; wx:key=&quot;{{index}}&quot;&gt;
      {{index}} {{item}}
&lt;/view&gt;

改变for循环item和index的名称
&lt;block wx:for=&quot;{{list}}&quot; wx:for-item=&quot;data&quot; wx:for-index=&quot;inx&quot;&gt;
	{{inx}} {{data}}
&lt;/block&gt;

条件渲染 (类似vue的v-if、v-else)
&lt;view wx:if=&quot;{{isLogin}}&quot;&gt;已登录&lt;/view&gt;
&lt;view wx:else&gt;请登录&lt;/view&gt;

条件显示（类似vue的v-show）
&lt;view hidden=&quot;{{isLogin}}&quot;&gt;显示内容&lt;/view&gt;

绑定点击事件
&lt;button bindtap=“tapName”&gt;按钮&lt;/button&gt;

Page({
  tapName: function(event) {
    console.log(event)
  }
})
...

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>wxss 相关介绍</strong></p>
<p><a href="https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html" target="_blank" rel="noopener noreferrer">wxssAPI</a></p>
<p>尺寸单位：rpx，根据屏幕宽度自适应。</p>
<p>引入外部wxss：@import ’...‘</p>
<p><strong>js相关介绍</strong></p>
<p>WXS（WeiXin Script）是小程序的一套脚本语言</p>
<p><a href="https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxs/" target="_blank" rel="noopener noreferrer">wxsAPI</a></p>
<p>绑定点击事件</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;button bindtap=“onTapHandler”&gt;点我+1&lt;/button&gt;
&lt;view&gt;{{count}}&lt;/view&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Page({
  data: {
    count: 0
  },
  onTapHandler: function() {
  	this.setData({
  		count: this.data.count++
  	})
  }
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="阻止事件冒泡" tabindex="-1"><a class="header-anchor" href="#阻止事件冒泡" aria-hidden="true">#</a> 阻止事件冒泡</h5>
<p>把绑定方式 bindtap 换成 catchtap 即可。</p>
<h4 id="第三方库" tabindex="-1"><a class="header-anchor" href="#第三方库" aria-hidden="true">#</a> 第三方库</h4>
<p><strong>WeUI</strong></p>
<p>weUI是一套同微信原生视觉体验一致的基础样式库</p>
<p><strong>iView Weapp</strong></p>
<p>一套高质量的微信小程序UI组件库</p>
<p><strong>Vant Weapp</strong></p>
<p>轻量、可靠的小程序UI组件库</p>
<h4 id="云开发" tabindex="-1"><a class="header-anchor" href="#云开发" aria-hidden="true">#</a> 云开发</h4>
<p><strong>小程序传统开发模式</strong></p>
<p>客户端  -----&gt; 服务端（后端代码、数据库）------&gt; 运维（DB维护、文件存储、内容加速、网络防护、容器服务、负载均衡、安全加固等...）</p>
<p><strong>小程序云开发模式</strong></p>
<p>客户端 -----&gt; 云开发（云函数、云数据库、云存储）</p>
<p><strong>传统开发 VS 云开发</strong></p>
<p>开发效率低         Serverless（无服务）</p>
<p>运维成本高         开发者更关注业务逻辑</p>
<p><strong>无服务（Serverless）开发是未来的发展趋势</strong></p>
<h5 id="云开发三大基础能力" tabindex="-1"><a class="header-anchor" href="#云开发三大基础能力" aria-hidden="true">#</a> <strong>云开发三大基础能力</strong></h5>
<h5 id="云函数" tabindex="-1"><a class="header-anchor" href="#云函数" aria-hidden="true">#</a> 云函数</h5>
<p>（相当于传统开发中的后台接口）</p>
<p>获取appid、获取openid、生成分享图、调用腾讯云SDK ...</p>
<h5 id="云数据库" tabindex="-1"><a class="header-anchor" href="#云数据库" aria-hidden="true">#</a> 云数据库</h5>
<p>数据的增、删、改、查 ...</p>
<h5 id="云存储" tabindex="-1"><a class="header-anchor" href="#云存储" aria-hidden="true">#</a> 云存储</h5>
<p>管理文件、上传文件、下载文件、分享文件 ...</p>
<p><strong>每个小程序账号可免费创建两个环境，建议：开发环境、生成环境</strong></p>
<h4 id="云数据库能力" tabindex="-1"><a class="header-anchor" href="#云数据库能力" aria-hidden="true">#</a> 云数据库能力</h4>
<p>云开发提供了一个json数据库，提供2GB免费存储空间。</p>
<h4 id="数据类型" tabindex="-1"><a class="header-anchor" href="#数据类型" aria-hidden="true">#</a> 数据类型</h4>
<p>String 字符串</p>
<p>Number 数字</p>
<p>Object 对象</p>
<p>Array 数组</p>
<p>Boolean 布尔值</p>
<p>GeoPoint 地理位置点</p>
<p>Date 时间 （精确到毫秒ms，客户端时间）</p>
<p>Null 空</p>
<h4 id="操作云数据库" tabindex="-1"><a class="header-anchor" href="#操作云数据库" aria-hidden="true">#</a> 操作云数据库</h4>
<p>小程序控制（读写数据库受权限限制）</p>
<p>云函数控制（拥有所有读写数据库的权限）</p>
<p>控制台控制（拥有所有读写数据库的权限）</p>
<h4 id="云数据库权限管理" tabindex="-1"><a class="header-anchor" href="#云数据库权限管理" aria-hidden="true">#</a> 云数据库权限管理</h4>
<p>仅创建者可写，所有人可读 （适合于文章）</p>
<p>仅创建者可读写 (适用于私密内容)</p>
<p>仅管理端可写，所有人可读（适用于商品信息）</p>
<p>仅管理端可读写（适用于后台敏感数据）</p>
<h4 id="操作云数据库-1" tabindex="-1"><a class="header-anchor" href="#操作云数据库-1" aria-hidden="true">#</a> 操作云数据库</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>//初始化数据库
const db = wx.cloud.database() // 小程序端初始化数据库，如果在云函数端不需要加wx

//切换环境(开发环境/生产环境)
const testDB = wx.cloud.database({
	env: 'test'
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="实战课程部分" tabindex="-1"><a class="header-anchor" href="#实战课程部分" aria-hidden="true">#</a> 实战课程部分</h2>
<h4 id="serverless-无服务" tabindex="-1"><a class="header-anchor" href="#serverless-无服务" aria-hidden="true">#</a> serverless（无服务）</h4>
<p>概念：函数即服务，当需要后端服务的时候，不需要关心后端的IP地址、域名，只需要像调用普通函数一样既可以实现调用。</p>
<h4 id="云开发优势" tabindex="-1"><a class="header-anchor" href="#云开发优势" aria-hidden="true">#</a> 云开发优势</h4>
<p>快速上线、专注核心业务、独立开发一个完整的微信小程序、不需要学习新的语言，只需要会javascript、无需运维， 节约成本、数据安全、</p>
<h4 id="云开发提供能力" tabindex="-1"><a class="header-anchor" href="#云开发提供能力" aria-hidden="true">#</a> 云开发提供能力</h4>
<p>云函数：在云端运行的代码，微信私有协议天然鉴权 （理解：相当于后端部分）</p>
<p>云数据库：一个既可以在小程序端操作又可以在云函数中操作的JSON数据库</p>
<p>云存储：在云端存储文件，可以在云端控制台可视化管理</p>
<p>云调用：基于云函数免鉴权使用小程序开放接口的能力（比如说给用户推送消息等）</p>
<p>HTTP API：使用HTTP API开发者可在已有服务器上访问云资源，实现与云开发的互通（作用：对原有传统模式下开发的小程序，可以与云开发进行互通）</p>
<h4 id="appid" tabindex="-1"><a class="header-anchor" href="#appid" aria-hidden="true">#</a> appID</h4>
<p>每个小程序唯一的id</p>
<h4 id="云开发项目默认目录结构" tabindex="-1"><a class="header-anchor" href="#云开发项目默认目录结构" aria-hidden="true">#</a> 云开发项目默认目录结构</h4>
<p>cloudfunctions ----------------------------云函数</p>
<p>​	callback ---------------------------------- 回调函数</p>
<p>​		config.json ---------------------------</p>
<p>​		index.js --------------------------------</p>
<p>​		package.json ------------------------</p>
<p>​	echo ----------------------------------------</p>
<p>​	login ----------------------------------------</p>
<p>​	openapi -----------------------------------</p>
<p>miniprogram ------------------------------- 小程序</p>
<p>​	images ------------------------------------- 图片</p>
<p>​	pages --------------------------------------- 页面</p>
<p>​	style ----------------------------------------- 样式</p>
<p>​	app.js --------------------------------------- 项目js</p>
<p>​	app.json ----------------------------------- 全局配置</p>
<p>​	app.wxss ---------------------------------- 项目样式</p>
<p>​	sitemap.json -----------------------------  （小程序SEO相关）</p>
<p>project.config.json ----------------------- 项目配置</p>
<h4 id="云开发环境" tabindex="-1"><a class="header-anchor" href="#云开发环境" aria-hidden="true">#</a> 云开发环境</h4>
<p>云开发可创建两个环境，建议一个为开发环境，一个为生产环境</p>
<h4 id="开发前的准备" tabindex="-1"><a class="header-anchor" href="#开发前的准备" aria-hidden="true">#</a> 开发前的准备</h4>
<p>开发工具 &gt; 右上角详情 &gt; 本地设置 &gt; 调试基础库  设置为最新版本</p>
<p>app.js &gt; wx.cloud.init &gt; env 设置环境ID</p>
<h4 id="project-config-json-文件说明" tabindex="-1"><a class="header-anchor" href="#project-config-json-文件说明" aria-hidden="true">#</a> project.config.json 文件说明</h4>
<p>miniprogramRoot 小程序前端代码目录</p>
<p>cloudfunctionRoot 云函数代码目录</p>
<h4 id="app-json" tabindex="-1"><a class="header-anchor" href="#app-json" aria-hidden="true">#</a> app.json</h4>
<p>pages  设置页面 ，设置后会自动在pages目录下生成相应的目录和文件</p>
<p>设置底部导航按钮：</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code>&quot;tabBar&quot;: {
    &quot;color&quot;: &quot;#474747&quot;, // 文字颜色
    &quot;selectedColor&quot;: &quot;#d43c43&quot;, // 文字选中颜色
    &quot;list&quot;: [{ // 按钮列表，2-5项
      &quot;pagePath&quot;: &quot;pages/playlist/playlist&quot;, // 按钮对应页面
      &quot;text&quot;: &quot;音乐&quot;, // 文字
      &quot;iconPath&quot;: &quot;images/music.png&quot;, // 图标路径
      &quot;selectedIconPath&quot;: &quot;images/music-actived.png&quot; // 选中图标的路径
    },
    {
      &quot;pagePath&quot;: &quot;pages/blog/blog&quot;,
      &quot;text&quot;: &quot;发现&quot;,
      &quot;iconPath&quot;: &quot;images/blog.png&quot;,
      &quot;selectedIconPath&quot;: &quot;images/blog-actived.png&quot;
    },
    {
      &quot;pagePath&quot;: &quot;pages/profile/profile&quot;,
      &quot;text&quot;: &quot;我的&quot;,
      &quot;iconPath&quot;: &quot;images/profile.png&quot;,
      &quot;selectedIconPath&quot;: &quot;images/profile-actived.png&quot;
    }]
  }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>图标来自于 <a href="https://www.iconfont.cn" target="_blank" rel="noopener noreferrer">https://www.iconfont.cn</a></p>
<p>阿里巴巴图标库，包含矢量图标、字体图标、字体等</p>
</blockquote>
<h4 id="代码规范" tabindex="-1"><a class="header-anchor" href="#代码规范" aria-hidden="true">#</a> 代码规范</h4>
<p>很多公司借鉴的代码规范：<a href="https://github.com/airbnb/javascript" target="_blank" rel="noopener noreferrer">https://github.com/airbnb/javascript</a></p>
<h4 id="《音乐》页面开发" tabindex="-1"><a class="header-anchor" href="#《音乐》页面开发" aria-hidden="true">#</a> 《音乐》页面开发</h4>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code> &lt;!-- 轮播图组件 参数：indicator-dots 小圆点，autoplay 自动播放, interval 间隔时间，duration 动画时长 --&gt;
&lt;swiper indicator-dots=&quot;true&quot; circular=&quot;true&quot; interval=&quot;3000&quot; duration=&quot;500&quot;&gt;
  &lt;block wx:for=&quot;{{swiperImgUrls}}&quot; wx:key=&quot;{{index}}&quot;&gt; &lt;!-- 空节点 --&gt;
    &lt;swiper-item&gt;
      &lt;image src=&quot;{{item.url}}&quot; mode=&quot;widthFix&quot; class=&quot;img&quot;&gt;&lt;/image&gt;
    &lt;/swiper-item&gt;
  &lt;/block&gt;
&lt;/swiper&gt;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="自定义组件" tabindex="-1"><a class="header-anchor" href="#自定义组件" aria-hidden="true">#</a> 自定义组件</h4>
<p><strong>创建组件</strong></p>
<p>创建目录 components &gt; 组件目录名称 &gt; 右键 <code v-pre>新建Component</code></p>
<h5 id="引入组件" tabindex="-1"><a class="header-anchor" href="#引入组件" aria-hidden="true">#</a> <strong>引入组件</strong></h5>
<p>在page的json文件中：</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code>{
  &quot;usingComponents&quot;: {
    &quot;x-playlist&quot;:&quot;/components/playlist/playlist&quot;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在page的wxml中：</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;x-playlist&gt; &lt;/x-playlist&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>页面引入组件以及组件内部在引用子组件的方法是一样的，同样需要设置json文件。</strong></p>
<h5 id="组件传值" tabindex="-1"><a class="header-anchor" href="#组件传值" aria-hidden="true">#</a> <strong>组件传值</strong></h5>
<p>父组件中：在引入组件的时候自定义属性名称，并把数据传入子组件</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;!-- 参数：playlist 自定义名称，传入组件的数据 --&gt;
&lt;x-playlist playlist=&quot;{{传入的数据}}&quot;&gt;&lt;/x-playlist&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>子组件中：
子组件的js文件：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>  /**
   * 组件的属性列表
   */
  properties: {
    playlist:{ // 接收父组件传输的数据
      type: Object // 数据类型
    }
   },

 //子组件的wxml文件可直接引入数据{{playlist}}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="wx-key-的使用" tabindex="-1"><a class="header-anchor" href="#wx-key-的使用" aria-hidden="true">#</a> wx:key 的使用</h4>
<p>key的值不建议使用index，因为当数据发生变化会dom结构产生变化时，使用index的地方不会随之变化。</p>
<p>可以使用数据内部每项不一样的一个数值，如id</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;block wx:for=&quot;{{swiperImgUrls}}&quot; wx:key=&quot;url&quot;&gt; 这里url不需要双大括号，如使用index则需要{{}}
    &lt;view&gt;
      &lt;image src=&quot;{{item.url}}&quot; mode=&quot;widthFix&quot; class=&quot;img&quot;&gt;&lt;/image&gt;
    &lt;/view&gt;
&lt;/block&gt;

&lt;view class=&quot;playlist-container&quot;&gt;
  &lt;block wx:for=&quot;{{playlist}}&quot; wx:key=&quot;_id&quot;&gt;
    &lt;!-- 参数：playlist 自定义名称，传入组件的数据 --&gt;
    &lt;x-playlist playlist=&quot;{{item}}&quot;&gt;&lt;/x-playlist&gt;
  &lt;/block&gt;
&lt;/view&gt;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="async-await-语法" tabindex="-1"><a class="header-anchor" href="#async-await-语法" aria-hidden="true">#</a> async/await 语法</h4>
<p>目前，在云函数里，由于 Node 版本最低是 8.9，因此是天然支持 async/await 语法的。而在小程序端则不然。在微信开发者工具里，以及 Android 端手机（浏览器内核是 QQ浏览器的 X5），async/await是天然支持的，但 iOS 端手机在较低版本则不支持，因此需要引入额外的 文件。</p>
<p>可把这个 <a href="https://github.com/xiecheng328/miniprogram/blob/master/regenerator/runtime.js" target="_blank" rel="noopener noreferrer">runtime.js</a> 文件引用到有使用 async/await 的文件当中。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 注意，必须命名为 regeneratorRuntime
import regeneratorRuntime from '../../utils/runtime.js'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="云函数的使用" tabindex="-1"><a class="header-anchor" href="#云函数的使用" aria-hidden="true">#</a> 云函数的使用</h4>
<p>cloudfunctions目录 右键 <code v-pre>新建 Node.js 云函数</code>  &gt; 输入目录名 <code v-pre>getPlaylist</code></p>
<p>在云函数中向第三方服务器发送请求要依赖第三方库</p>
<p><strong>安装依赖包</strong></p>
<p>云函数目录  <code v-pre>getPlaylist</code> 右键 <code v-pre>在终端打开</code> 打开命令行  输入命令：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>npm install --save request
npm install --save request-promise
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>github request-promise：<a href="https://github.com/request/request-promise" target="_blank" rel="noopener noreferrer">https://github.com/request/request-promise</a></p>
<p>然后写相应代码</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const rp = require('request-promise') // 需安装依赖包

const URL = 'http://musicapi.xiecheng.live/personalized'

// 云函数入口函数
exports.main = async (event, context) =&gt; {
  const playlist = await rp(URL).then((res) =&gt; {
    return JSON.parse(res).result
  })
  console.log(playlist)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>写完代码，云函数目录  <code v-pre>getPlaylist</code> 右键 <code v-pre>上传并部署：云端安装依赖（不上传node_modules）</code> 进行上传部署代码到云端，等待上传成功，打开云开发控制台即可看到已经上传的云函数，并可对云函数进行测试。</p>
<h5 id="数据库操作" tabindex="-1"><a class="header-anchor" href="#数据库操作" aria-hidden="true">#</a> 数据库操作</h5>
<p>数据库&gt; 创建集合 &gt; playlist</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database() // 初始化数据库,如果在小程序端初始化数据库需要在前面加wx.

const rp = require('request-promise') // 需安装依赖包

const URL = 'http://musicapi.xiecheng.live/personalized' // 第三方服务器地址（老师从网易云获取的数据部署在其服务器，每天的数据会更新）

const playlistCollection = db.collection('playlist') // 获取到数据库playlist集合

const MAX_LIMIT = 10 // 定义常量，获取数据库条数最大的限制

// 云函数入口函数
exports.main = async (event, context) =&gt; {
  /**
   * 注：
   * - 关于数据库的操作都是异步操作，都需添加await关键字
   * - console.log 打印在云开发控制台 云函数测试内查看
   * - 单次获取数据库数据有条数限制，云函数端最多获取100条，小程序端最多获取20条
   */

  // const list = await playlistCollection.get() // 获取数据库集合的数据 （因为有条数限制，不直接用此方法）

  // 突破条数限制 （为了读取到全部数据然后与第三方服务器获取的数据进行对比去重）
  const countResult = await playlistCollection.count() // 获取数据总条数 返回为对象
  const total = countResult.total // 取得总条数
  const batchTimes = Math.ceil(total / MAX_LIMIT)
  const tasks = []
  for(let i = 0; i &lt; batchTimes; i++) {
    let promise = playlistCollection.skip(i * MAX_LIMIT).limit(MAX_LIMIT).get() // 从第 skip 条开始取，最多取 limit 条数据
    tasks.push(promise)
  }
  let list = {
    data: []
  }
  if (tasks.length &gt; 0) {
    list = (await Promise.all(tasks)).reduce((acc, cur) =&gt; { // reduce数组方法 累积拼接
      return {
        data: acc.data.concat(cur.data)
      }
    })
  }

  // 获取第三方服务器端数据
  const playlist = await rp(URL).then((res) =&gt; {
    return JSON.parse(res).result
  })

  // 数据库与服务器数据对比去重（数据已存在数据库的无需再重复添加）
  const newData = []
  for(let i = 0, len1 = playlist.length; i &lt; len1; i++) {
    let flag = true
    for(let j = 0, len2 = list.data.length; j &lt; len2; j++) {
      if(playlist[i].id === list.data[j].id){
        flag = false
        break
      }
    }
    if(flag){
      newData.push(playlist[i])
    }
  }

  // 把数据插入数据库，需要单条插入
  for (let i = 0, len = newData.length; i &lt; len; i++) {
    await playlistCollection.add({ // 给数据库集合添加数据
      data: {
        ...newData[i],
        createTime: db.serverDate(), // db.serverDate() 获取服务器时间
      }
    }).then((res) =&gt; { // 数据添加成功
      console.log('数据添加成功')
    }).catch((err) =&gt; { // 失败
      console.error(err)
    })
  }
  return newData.length // 插入多少条数据
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="查询数据库" tabindex="-1"><a class="header-anchor" href="#查询数据库" aria-hidden="true">#</a> 查询数据库</h5>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>//云函数中查询数据库的例子：

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const TcbRouter = require('tcb-router')
const db = cloud.database() // 初始化数据库
const blogCollection = db.collection('blog') // 博客的数据库集合

// 云函数入口函数
exports.main = async (event, context) =&gt; {
  const app = new TcbRouter({ event }) // 初始化TcbRouter

  app.router('list', async (ctx, next) =&gt; {
    // skip 从第几条开始查，limit 查几条数据，orderBy(排序字段，排序方式) 排序，排序方式desc降序/asc升序
    ctx.body =  await blogCollection.skip(event.start).limit(event.count)
    .orderBy('createTime', 'desc').get().then((res) =&gt; {
      return res.data
    })

  })


  return app.serve() // 必需返回
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="云函数调试" tabindex="-1"><a class="header-anchor" href="#云函数调试" aria-hidden="true">#</a> 云函数调试</h5>
<p>云控制台中可会云函数进行云端测试</p>
<p>在小程序调用云函数后，可查看云函数<strong>日志</strong></p>
<h4 id="定时触发云函数" tabindex="-1"><a class="header-anchor" href="#定时触发云函数" aria-hidden="true">#</a> 定时触发云函数</h4>
<p>如果云函数需要定时 / 定期执行，也就是定时触发，我们可以使用云函数定时触发器。配置了定时触发器的云函数，会在相应时间点被自动触发，函数的返回结果不会返回给调用方</p>
<p>云函数目录下新建 config.json</p>
<p><a href="https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/functions/triggers.html" target="_blank" rel="noopener noreferrer">API</a></p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code>{
  &quot;triggers&quot;: [
    {
      &quot;name&quot;: &quot;myTriggers&quot;,
      &quot;type&quot;: &quot;timer&quot;,
      &quot;config&quot;:&quot;0 0 10,14,16,20 * * * *&quot; //表示每天的10点、14点、16点、20点触发一次
    }
  ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编辑好触发器之后，要在云函数目录 &gt; 右键 &gt; <code v-pre>上传触发器</code></p>
<h4 id="配置云函数超时时间" tabindex="-1"><a class="header-anchor" href="#配置云函数超时时间" aria-hidden="true">#</a> 配置云函数超时时间</h4>
<p>当云函数比较复杂的时候，默认的超时时间3秒可能不能够满足需求，可以适当的设置更为合理的时间</p>
<p>云开发控制台 &gt; 云函数 &gt; 配置 &gt; 超时时间</p>
<h4 id="上拉加载与下拉刷新" tabindex="-1"><a class="header-anchor" href="#上拉加载与下拉刷新" aria-hidden="true">#</a> 上拉加载与下拉刷新</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>page页面json中：
&quot;enablePullDownRefresh&quot;: true


page页面js中有这两个函数：

 /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
	 this.setData({
      playlist: []
    })
    this._getPlaylist()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this._getPlaylist()
  },



 下拉刷新请求完数据后
 wx.stopPullDownRefresh() // 停止下拉刷新动画
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="云函数路由优化tcb-router" tabindex="-1"><a class="header-anchor" href="#云函数路由优化tcb-router" aria-hidden="true">#</a> 云函数路由优化tcb-router</h4>
<p>一个用户在一个云环境只能创建50个云函数</p>
<p>假如小程序非常复杂，50个云函数不能够满足业务需求怎么办？</p>
<p>相似的请求归类到同一个云函数处理</p>
<p>tcb-router是一个koa风格的云函数路由库</p>
<p>通俗理解就是可以把很多个接口归类到同一个云函数内。</p>
<p>github-tcb-router:  <a href="https://github.com/TencentCloudBase/tcb-router" target="_blank" rel="noopener noreferrer">https://github.com/TencentCloudBase/tcb-router</a></p>
<p>koa洋葱模型...</p>
<p>安装：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>在使用到tcb-router的云函数目录下打开命令行，输入命令进行安装
npm install --save tcb-router
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 云函数的 index.js
const TcbRouter = require('router'); // 必需

exports.main = (event, context) =&gt; {
    const app = new TcbRouter({ event });// 必需

    // app.use 表示该中间件会适用于所有的路由(全局中间件) 非必需
    app.use(async (ctx, next) =&gt; { // 这个中间件表示所有路由都会调用到，而路由中间件为单独调用
        ctx.data = {}; // 获取要传给小程序端的数据
        ctx.data.openId = event.userInfo.openId // 这里获取到的openId将分布到所有路由
        await next(); // 执行下一中间件
    });

    // 路由为数组表示，该中间件适用于 user 和 timer 两个路由
    app.router(['user', 'timer'], async (ctx, next) =&gt; {
        ctx.data.company = 'Tencent'; // 这里获取到的数据将分布到 user 和 timer 两个路由
        await next(); // 执行下一中间件
    });

    // 路由为字符串，该中间件只适用于 user 路由
    app.router('user', async (ctx, next) =&gt; {
        ctx.data.name = 'heyli';  // 获取要传给小程序端的数据
        await next(); // 执行下一中间件
    }, async (ctx, next) =&gt; {
        ctx.data.sex = 'male'; // 获取要传给小程序端的数据
        await next(); // 执行下一中间件
    }, async (ctx) =&gt; {
        ctx.data.city = 'Foshan'; // 获取要传给小程序端的数据
        // ctx.body 返回数据到小程序端
        ctx.body = { code: 0, data: ctx.data};  // 要传给小程序端的数据
    });

    // 路由为字符串，该中间件只适用于 timer 路由
    app.router('timer', async (ctx, next) =&gt; {
        ctx.data.name = 'flytam';
        await next(); // 执行下一中间件
    }, async (ctx, next) =&gt; {
        ctx.data.sex = await new Promise(resolve =&gt; {
        // 等待500ms，再执行下一中间件
        setTimeout(() =&gt; {
            resolve('male');
        }, 500);
        });
        await next(); // 执行下一中间件
    }, async (ctx)=&gt;  {
        ctx.data.city = 'Taishan';

        // ctx.body 返回数据到小程序端
        ctx.body = { code: 0, data: ctx.data };
    });

    return app.serve(); // 必需

}


小程序端：

// 调用名为 router 的云函数，路由名为 user
wx.cloud.callFunction({
    // 要调用的云函数名称
    name: &quot;router&quot;,
    // 传递给云函数的参数
    data: {
        $url: &quot;user&quot;, // 要调用的路由的路径，传入准确路径或者通配符*
        other: &quot;xxx&quot;
    }
}).then((res) =&gt; {
	console.log(res)
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面tcb-router代码会按照洋葱模型执行，即先从上往下逐个进入中间件，再从下往上逐个退出中间件。</p>
<h4 id="本地存储-缓存" tabindex="-1"><a class="header-anchor" href="#本地存储-缓存" aria-hidden="true">#</a> 本地存储（缓存）</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 存储：
wx.setStorageSync(key, data) // 同步存储（存储成功再继续下一步操作）
wx.setStorage(key, data) // 异步存储（即使存储没成功也会执行下一步代码）、

// 读取：
wx.getStorageSync(key) // 同步 （读取到数据在进行下一步操作）
wx.setStorage(key) // 异步

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="api设置title" tabindex="-1"><a class="header-anchor" href="#api设置title" aria-hidden="true">#</a> api设置title</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>wx.setNavigationBarTitle({
      title: '',
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="背景播放音" tabindex="-1"><a class="header-anchor" href="#背景播放音" aria-hidden="true">#</a> 背景播放音</h4>
<p><a href="https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/BackgroundAudioManager.html" target="_blank" rel="noopener noreferrer">BackgroundAudioManager</a> 全局唯一的背景音频管理器</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code>// 需要在app.json配置，才能使用后台音乐播放的能力

&quot;requiredBackgroundModes&quot;: [&quot;audio&quot;, &quot;location&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 获取全局唯一的背景音频管理器
const backgroundAudioManager = wx.getBackgroundAudioManager()


backgroundAudioManager.src = 音频链接
backgroundAudioManager.title = 音频标题

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="createselectorquery查询节点信息" tabindex="-1"><a class="header-anchor" href="#createselectorquery查询节点信息" aria-hidden="true">#</a> createSelectorQuery查询节点信息</h4>
<p><a href="https://developers.weixin.qq.com/miniprogram/dev/api/wxml/wx.createSelectorQuery.html" target="_blank" rel="noopener noreferrer">createSelectorQuery</a> 小程序的方法，用于查询节点等操作</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const query = wx.createSelectorQuery()
query.select('#the-id').boundingClientRect() // 节点的布局信息
query.selectViewport().scrollOffset()
query.exec(function(res){
  res[0].top       // #the-id节点的上边界坐标
  res[1].scrollTop // 显示区域的竖直滚动位置
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="组件内的方法" tabindex="-1"><a class="header-anchor" href="#组件内的方法" aria-hidden="true">#</a> 组件内的方法</h4>
<p><a href="https://developers.weixin.qq.com/miniprogram/dev/reference/api/Component.html" target="_blank" rel="noopener noreferrer">Component(Object object)</a></p>
<h4 id="组件生命周期" tabindex="-1"><a class="header-anchor" href="#组件生命周期" aria-hidden="true">#</a> 组件生命周期</h4>
<p><a href="https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/lifetimes.html" target="_blank" rel="noopener noreferrer">lifetimes</a></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 生命周期
lifetimes: {
    ready() { // 在组件在视图层布局完成后执行
   	 ...
    }
},
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="组件所在页面的生命周期" tabindex="-1"><a class="header-anchor" href="#组件所在页面的生命周期" aria-hidden="true">#</a> 组件所在页面的生命周期</h5>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Component({
  pageLifetimes: {
    show: function() {
      // 页面被展示
    },
    hide: function() {
      // 页面被隐藏
    },
    resize: function(size) {
      // 页面尺寸变化
    }
  }
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="组件对数据的监听" tabindex="-1"><a class="header-anchor" href="#组件对数据的监听" aria-hidden="true">#</a> 组件对数据的监听</h4>
<p><a href="https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/observer.html" target="_blank" rel="noopener noreferrer">observers</a></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>observers: { // 对数据的监听(数据初次加载完成也会执行)
    监听的数据对象(newData){
      console.log(newData)
    }
},
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="子组件自定义事件传递给父组件" tabindex="-1"><a class="header-anchor" href="#子组件自定义事件传递给父组件" aria-hidden="true">#</a> 子组件自定义事件传递给父组件</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>子组件js：
// 触发自定义事件 向父组件传值， 参数x（可选，传递给父组件的参数，可以是对象或其他）
this.triggerEvent('自定义事件名', 参数x)


父组件wxml：
&lt;子组件标签 bind:自定义事件名=&quot;执行的事件&quot; /&gt;

父组件js：
执行的事件(event) {
	console.log(event.detil.参数)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="父组件自定义事件传递给子组件" tabindex="-1"><a class="header-anchor" href="#父组件自定义事件传递给子组件" aria-hidden="true">#</a> 父组件自定义事件传递给子组件</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>父组件wxml：
&lt;子组件标签 class=&quot;子组件类名&quot;&gt;

父组件JS：
// 选择组件，并传入事件和参数
this.selectComponent('.子组件类名').自定义事件名(传入参数)

子组件js：
methods: {
	自定义事件名(参数x){
		console.log(参数x)
	}
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="兄弟组件间传递事件和传值" tabindex="-1"><a class="header-anchor" href="#兄弟组件间传递事件和传值" aria-hidden="true">#</a> 兄弟组件间传递事件和传值</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>例子：子组件1向子组件2传递参数

父组件wxml中：
&lt;子组件标签1 bind:自定义事件名1=&quot;执行的事件&quot;&gt;
&lt;子组件标签2 class=&quot;子组件2类名&quot;&gt;

父组件js：
执行的事件(event) {
	this.selectComponent('.子组件2类名').自定义事件名2(event.detil.参数x) // 向子组件2传值
}

子组件1js：
// 触发自定义事件 向父组件传值， 参数x（可选，传递给父组件的参数，可以是对象或其他）
this.triggerEvent('自定义事件名1', 参数x)



子组件2js：
methods: {
	自定义事件名2(参数x){
		console.log(参数x)  // 接收父组件传入的值
	}
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="获取手机信息" tabindex="-1"><a class="header-anchor" href="#获取手机信息" aria-hidden="true">#</a> 获取手机信息</h4>
<p><a href="https://developers.weixin.qq.com/miniprogram/dev/api/base/system/system-info/wx.getSystemInfo.html" target="_blank" rel="noopener noreferrer">wx.getSystemInfo(Object object)</a></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>wx.getSystemInfo({
	success(res){
		console.log(res) //手机信息
	}
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="滚动组件" tabindex="-1"><a class="header-anchor" href="#滚动组件" aria-hidden="true">#</a> 滚动组件</h4>
<p><a href="https://developers.weixin.qq.com/miniprogram/dev/component/scroll-view.html" target="_blank" rel="noopener noreferrer">scroll-view</a></p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;scroll-view scroll-y scroll-top=&quot;{{scrollTop}}&quot; scroll-with-animation=&quot;true&quot;&gt;
&lt;/scroll-view&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="全局属性、方法-类似vuex" tabindex="-1"><a class="header-anchor" href="#全局属性、方法-类似vuex" aria-hidden="true">#</a> 全局属性、方法（类似vuex）</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>在app.js中：

onLaunch: function () {
	this.globalData = {// 设置全局属性、方法
		test: 0
	}
},
setGlobalData(dataItem, val) { // 设置全局属性
	this.globalData[dataItem] = val
},
getGlobalData(dataItem) { // 获取全局属性
	return this.globalData[dataItem]
}


在需要调用的页面js中：
const app = getApp() // 在最顶部先调用app方法

// 设置全局属性
app.setGlobalData('test', 1)

// 获取全局属性
app.getGlobalData('test')
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="消息提示框" tabindex="-1"><a class="header-anchor" href="#消息提示框" aria-hidden="true">#</a> 消息提示框</h4>
<p><a href="https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showToast.html" target="_blank" rel="noopener noreferrer">showToast</a></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>wx.showToast({
  title: '成功',
  icon: 'success', //图标： success 成功、loading 加载中、none 无
  duration: 2000
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="《发现》页面" tabindex="-1"><a class="header-anchor" href="#《发现》页面" aria-hidden="true">#</a> 《发现》页面</h2>
<h4 id="调用组件外部的样式" tabindex="-1"><a class="header-anchor" href="#调用组件外部的样式" aria-hidden="true">#</a> 调用组件外部的样式</h4>
<p>components内部的组件无法直接调用外部的样式。可通过以下方式调用组件外部样式：</p>
<p><strong>方法一：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>父组件wxml：
&lt;!-- iconfont 和 icon-sousuo 是传入组件内部的样式名称，iconfont（自定义名称）=&quot;iconfont（外部样式文件中定义的样式名）&quot;  --&gt;
&lt;x-search iconfont=&quot;iconfont&quot; icon-sousuo=&quot;icon-sousuo&quot;/&gt;


子组件js:
// 组件外部样式
  externalClasses: [
    'iconfont', // 对应的是上面等号前面的名称
    'icon-sousuo'
  ],

 子组件wxml： 即可实现调用组件外的样式
 &lt;i class=&quot;iconfont icon-sousuo&quot; /&gt;


  注意：如果想在组件内部再次修改样式，不能够引用外部传进来的class名称进行修改，可以另起一个class名称进行修改。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>方法二：</strong></p>
<p><a href="https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html#%E7%BB%84%E4%BB%B6%E6%A0%B7%E5%BC%8F%E9%9A%94%E7%A6%BB" target="_blank" rel="noopener noreferrer">消除样式隔离</a></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>组件内:
Component({
  options: {
    styleIsolation: 'apply-shared'
  }
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="组件插槽slot" tabindex="-1"><a class="header-anchor" href="#组件插槽slot" aria-hidden="true">#</a> 组件插槽slot</h4>
<p><strong>单个插槽</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>父组件调用传入插槽内容:
&lt;组件标签&gt;
    &lt;view&gt;
      &lt;view&gt;插槽内容&lt;/view&gt;
      &lt;view&gt;插槽内容&lt;/view&gt;
    &lt;/view&gt;
&lt;/组件标签&gt;

 组件内部定义slot标签:
 &lt;view&gt;
    &lt;!-- slot插槽 --&gt;
    &lt;slot&gt;&lt;/slot&gt;
&lt;/view&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>如果需要实现多个插槽</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>
父组件调用传入插槽内容:
&lt;组件标签&gt;
    &lt;view slot=&quot;slot2&quot;&gt;
      &lt;view&gt;插槽1内容&lt;/view&gt;
      &lt;view&gt;插槽1内容&lt;/view&gt;
    &lt;/view&gt;

     &lt;view slot=&quot;slot1&quot;&gt;
      &lt;view&gt;插槽2内容&lt;/view&gt;
      &lt;view&gt;插槽2内容&lt;/view&gt;
    &lt;/view&gt;
&lt;/组件标签&gt;

组件js :
options: {// 设置
    multipleSlots: true // 打开多个插槽功能
},


组件内部定义slot标签:
&lt;view&gt;
    &lt;!-- slot插槽 具名插槽--&gt;
    &lt;slot name=&quot;slot1&quot;&gt;&lt;/slot&gt;
    &lt;slot name=&quot;slot2&quot;&gt;&lt;/slot&gt;
&lt;/view&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="判断用户授权" tabindex="-1"><a class="header-anchor" href="#判断用户授权" aria-hidden="true">#</a> 判断用户授权</h4>
<p><a href="https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html" target="_blank" rel="noopener noreferrer">授权</a></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 判断用户是否授权
    wx.getSetting({
      success: (res) =&gt; { // 这里使用箭头函数可改变内部this指向为外部的this
        console.log(res)
        if (res.authSetting['scope.userInfo']) { // 已授权
         wx.getUserInfo({ // 获取用户信息
           success(res) {
             console.log(res)
           }
         })
        } else { // 未授权

        }
      }
    })
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="button的开发能力-获取用户信息-1" tabindex="-1"><a class="header-anchor" href="#button的开发能力-获取用户信息-1" aria-hidden="true">#</a> button的开发能力（获取用户信息）1</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>&lt;button class=&quot;login&quot;
    open-type=&quot;getUserInfo&quot;
    bindgetuserinfo=&quot;onGetUserInfo&quot;     // bindgetuserinfo 为固定的
&gt;
	获取微信授权信息
&lt;/button&gt;


bindgetuserinfo 事件会询问用户是否同意授权


js中：
    onGetUserInfo(event) { // 获取用户信息
      const userInfo = event.detail.userInfo
      if (userInfo) { // 用户允许授权
        this.setData({
          modalShow: false
        })
        this.triggerEvent('loginSuccess', userInfo) // 给父组件传用户数据
      } else { // 用户拒绝授权
        this.triggerEvent('loginFail')
      }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="原生组件" tabindex="-1"><a class="header-anchor" href="#原生组件" aria-hidden="true">#</a> 原生组件</h4>
<p><a href="https://developers.weixin.qq.com/miniprogram/dev/component/native-component.html" target="_blank" rel="noopener noreferrer">原生组件</a></p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>
auto-focus 自动获取焦点

&lt;textarea
    class=&quot;content&quot;
    placeholder=&quot;分享新鲜事...&quot;
    maxlength=&quot;140&quot;
    auto-focus
    bindinput=&quot;onInput&quot;
    bindfocus=&quot;onFocus&quot;
    bindblur=&quot;onBlur&quot;
  &gt;&lt;/textarea&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="选择上传图片" tabindex="-1"><a class="header-anchor" href="#选择上传图片" aria-hidden="true">#</a> 选择上传图片</h4>
<p><a href="https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.chooseImage.html" target="_blank" rel="noopener noreferrer">上传图片</a></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>let max = 9 - this.data.images.length // 还能再选几张图片
wx.chooseImage({
      count: max, // 还能再选几张图片
      sizeType: ['original', 'compressed'], // 初始值 and 压缩过的
      sourceType: ['album', 'camera'], // 手机相册选择 and 拍照选择
      success: (res) =&gt; { // 箭头函数改变this指向
        console.log(res)
      },
    })
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="图片裁剪" tabindex="-1"><a class="header-anchor" href="#图片裁剪" aria-hidden="true">#</a> 图片裁剪</h4>
<p><a href="https://developers.weixin.qq.com/miniprogram/dev/component/image.html" target="_blank" rel="noopener noreferrer">图片裁剪</a></p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;!-- mode 图片裁剪 aspectFill 保证短边完整显示 --&gt;
&lt;image class=&quot;image&quot; src=&quot;{{item}}&quot; mode=&quot;aspectFill&quot;&gt;&lt;/image&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="获取标签自定义属性data-删除图片的实现" tabindex="-1"><a class="header-anchor" href="#获取标签自定义属性data-删除图片的实现" aria-hidden="true">#</a> 获取标签自定义属性data-* （删除图片的实现）</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>&lt;!-- 显示图片 --&gt;
    &lt;block wx:for=&quot;{{images}}&quot; wx:key=&quot;*this&quot;&gt;
      &lt;view class=&quot;image-wrap&quot;&gt;
        &lt;!-- mode 图片裁剪 aspectFill 保证短边完整显示 --&gt;
        &lt;image class=&quot;image&quot; src=&quot;{{item}}&quot; mode=&quot;aspectFill&quot;&gt;&lt;/image&gt;
        &lt;icon class=&quot;iconfont icon-shanchu&quot; bindtap=&quot;onDelImage&quot; data-index=&quot;{{index}}&quot;&gt;&lt;/icon&gt;
      &lt;/view&gt;
    &lt;/block&gt;


    // 删除图片
  onDelImage(event) {
  	// event.target.dataset.index 获取标签属性data-index的值
    this.data.images.splice(event.target.dataset.index, 1) // splice会改变原有数组
    this.setData({
      images: this.data.images
    })
  },

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="全屏预览图片-点击图片放大预览" tabindex="-1"><a class="header-anchor" href="#全屏预览图片-点击图片放大预览" aria-hidden="true">#</a> 全屏预览图片(点击图片放大预览)</h4>
<p><a href="https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.previewImage.html" target="_blank" rel="noopener noreferrer">全屏预览图片</a></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 全屏预览图片
  onPreviewImage(event) {
    wx.previewImage({
      urls: this.data.images, // 图片地址列表
      current: event.target.dataset.imgsrc // 当前预览图片地址
    })
  },
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="文件上传云存储-发布博客例子" tabindex="-1"><a class="header-anchor" href="#文件上传云存储-发布博客例子" aria-hidden="true">#</a> 文件上传云存储（发布博客例子）</h4>
<p><a href="https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-client-api/storage/uploadFile.html" target="_blank" rel="noopener noreferrer">文件上传云存储</a></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code> //  结合'发布'的例子：
  send() {
    // 验证是否输入内容
    if (content.trim() === '') { // trim() 去掉字符串空格
      wx.showToast({
        title: '请输入内容',
        icon: 'none'
      })
      return
    }
    wx.showLoading({
      title: '发布中',
    })
    /**
     * 实现思路及步骤：
     * 1、图片 -&gt; 上传 云存储  -&gt; 生成 图片fineID（云文件ID）
     * 2、数据 -&gt; 录入 云数据库
     *    数据包括：文字内容、图片fineID、昵称、头像、发布时间、openId(用户唯一标识，在插入数据库是系统会自动添加_openId字段，不需要另外插入)
     */
    let promiseArr = []
    let fileIds = []
    // 图片上传云存储
    this.data.images.forEach((item) =&gt; {
      let p = new Promise((resolve, reject) =&gt; {
        let suffix = /\.\w+$/.exec(item)[0] // 文件扩展名(文件后缀)
        wx.cloud.uploadFile({ // 每次只能上传一个文件
          /**
           * cloudPath 云路径。如果路径相同，后上传的文件会覆盖原文件
           * 路径：blog/云存储中的文件夹 + Date.now()时间戳 + Math.random()*1000000随机数 + 文件后缀
           */
          cloudPath: 'blog/' + Date.now() + '-' + Math.random() * 1000000 + suffix,
          filePath: item, // 文件本地临时路径
          success: (res) =&gt; {
            fileIds.push(res.fileID)
            resolve()
          },
          fail: (err) =&gt; {
            console.error(err)
            reject()
          }
        })
      })
      promiseArr.push(p)
    })

    // 存入云数据库
    Promise.all(promiseArr).then((res) =&gt; {
      db.collection('blog').add({
        data: {
          ...userInfo, // 昵称、头像
          content, // 内容
          img: fileIds, // 图片fileID列表
          createTime: db.serverDate() // 创建时间，取服务端时间
        }
      }).then((res) =&gt; {
        wx.hideLoading()
        wx.showToast({
          title: '发布成功',
        })
        // 返回博客页面，并刷新
        wx.navigateBack()

      })
    }).catch((err) =&gt; {
      wx.hideLoading()
      wx.showToast({
        title: '抱歉，发布失败',
        icon: 'none'
      })
    })
  },
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="js模块化-时间格式化" tabindex="-1"><a class="header-anchor" href="#js模块化-时间格式化" aria-hidden="true">#</a> js模块化 （时间格式化）</h4>
<p>在目录utils 中新建formatTime.js文件</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 时间格式化 模块封装
module.exports = (date) =&gt; { // date 数据格式为 date
  let fmt = 'yyyy-MM-dd hh:mm:ss' // 预定格式
  const o = {
    // + 正则中的1个或多个
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }

  if (/(y+)/.test(fmt)) {
    // $1 表示正则中的第一个，即(y+)
    fmt = fmt.replace(RegExp.$1, date.getFullYear()) // replace 替换
  }

  for (let k in o) {
    if (new RegExp('('+ k +')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, o[k].toString().length === 1 ? '0' + o[k] : o[k])
    }
  }

  return fmt
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在组件引入js模块</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>import formatTime from '../../utils/formatTime.js'

使用：
formatTime(new Date('Wed Aug 28 2019 16:23:06 GMT+0800 (中国标准时间)'))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="阻止事件冒泡-1" tabindex="-1"><a class="header-anchor" href="#阻止事件冒泡-1" aria-hidden="true">#</a> 阻止事件冒泡</h4>
<p><code v-pre>bind</code> 和 <code v-pre>catch</code> 都可以绑定事件，它们的区别是 <code v-pre>bind</code> 有事件冒泡，而 <code v-pre>catch</code> 没有</p>
<h4 id="返回上一个页面并执行方法" tabindex="-1"><a class="header-anchor" href="#返回上一个页面并执行方法" aria-hidden="true">#</a> 返回上一个页面并执行方法</h4>
<p><a href="https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateBack.html" target="_blank" rel="noopener noreferrer">API</a></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code> // 返回博客页面，并刷新
 wx.navigateBack()
 const pages = getCurrentPages() // 获取当前页面栈
 const prevPage = pages[pages.length - 2]  // 取到上一个页面
 prevPage.onPullDownRefresh() // 执行上一个页面的方法 onPullDownRefresh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="图片懒加载" tabindex="-1"><a class="header-anchor" href="#图片懒加载" aria-hidden="true">#</a> 图片懒加载</h4>
<p><a href="https://developers.weixin.qq.com/miniprogram/dev/component/image.html" target="_blank" rel="noopener noreferrer">API</a></p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>给image标签设置 lazy-load 为 true
&lt;image class=&quot;img&quot; src=&quot;{{item}}&quot; lazy-load=&quot;true&quot;&gt;&lt;/image&gt;

.img {
  background: #eee;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>懒加载占位图可以给image设置背景图或背景色</strong></p>
<h4 id="模糊查询" tabindex="-1"><a class="header-anchor" href="#模糊查询" aria-hidden="true">#</a> 模糊查询</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 获取博客列表
  app.router('blogList', async (ctx, next) =&gt; {
    const keyword = event.keyword // 搜索关键字 调用接口时传递来的数据
    let w = {}
    if (keyword.trim() != '') {
      w = {
        content: db.RegExp({ // 正则
          regexp: keyword,
          options: 'i' // i表示忽略大小写
        })
      }
    }

    // where查询条件 skip 从第几条开始查，limit 查几条数据，orderBy(排序字段，排序方式) 排序，排序方式desc降序/asc升序
    ctx.body =  await blogCollection.where(w).skip(event.start).limit(event.count)
    .orderBy('createTime', 'desc').get().then((res) =&gt; {
      return res.data
    })

  })
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="提升模糊查询的效率-添加索引-对数据量大的查询效果明显" tabindex="-1"><a class="header-anchor" href="#提升模糊查询的效率-添加索引-对数据量大的查询效果明显" aria-hidden="true">#</a> 提升模糊查询的效率 （添加索引，对数据量大的查询效果明显）</h4>
<p>云开发控制台  &gt; 数据库相应的集合 &gt; 索引管理 &gt; 添加索引 &gt; 输入自定义索引名称、该字段的值是否唯一、被查询的字段名、升序/降序 &gt; ok</p>
<h4 id="小程序端调用云数据库" tabindex="-1"><a class="header-anchor" href="#小程序端调用云数据库" aria-hidden="true">#</a> 小程序端调用云数据库</h4>
<p>一般调用云数据库的操作都写在云函数内，其实小程序端也可以对数据库进行操作。</p>
<p>小程序端一次最多只能查询20条数据，云函数端最多可查询100条数据，可使用多次查询拼接的方式突破限制。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 小程序端调用云数据库示例
    const db = wx.cloud.database() // 初始化数据库
    db.collection('blog').orderBy('createTime','deac').get().then((res) =&gt; {
      console.log(res)
    })
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="云数据库权限管理-1" tabindex="-1"><a class="header-anchor" href="#云数据库权限管理-1" aria-hidden="true">#</a> 云数据库权限管理</h4>
<p><strong>注意：云控制台和服务端（云函数）始终有所有数据读写权限，</strong></p>
<p><strong>但权限的管理仅对小程序端发起的请求有效。</strong></p>
<ul>
<li>
<p>仅创建者可写，所有人可读 （适合于文章）</p>
</li>
<li>
<p>仅创建者可读写 (适用于私密内容)</p>
</li>
<li>
<p>仅管理端可写，所有人可读（适用于商品信息）</p>
</li>
<li>
<p>仅管理端可读写（适用于后台敏感数据）</p>
</li>
</ul>
<h4 id="数据库中1对n关系的三种设计方式" tabindex="-1"><a class="header-anchor" href="#数据库中1对n关系的三种设计方式" aria-hidden="true">#</a> 数据库中1对N关系的三种设计方式</h4>
<h5 id="第一种-n的数量较少-几十个以内" tabindex="-1"><a class="header-anchor" href="#第一种-n的数量较少-几十个以内" aria-hidden="true">#</a> 第一种：N的数量较少 几十个以内</h5>
<p><strong>1 条记录存储 N 个子数据</strong></p>
<p>​	如一条博客中，最多有9张图片，这9张图片可和其他数据放在一个记录中。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>[
	{
		id:...
		img:[
		'...', '...', '...', '...', '...', '...', '...', '...', '...'
		]
	}
]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="第二种-n的数量较多-几十到几百个" tabindex="-1"><a class="header-anchor" href="#第二种-n的数量较多-几十到几百个" aria-hidden="true">#</a> 第二种：N的数量较多  几十到几百个</h5>
<p><strong>1 存储 每个N的 id</strong></p>
<p>可分两个数据库集合，</p>
<p>一个为 '目录' 集合，存放 '详情' 集合下的每条数据的 id 目录</p>
<p>一个为 '详情' 集合，每条数据对应一个单独的 id 和 详细数据</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>目录集合：
[
	{
		'id':&quot;11&quot;,
		'name': '产品1',
		'xqs': ['111','222','333', ... ]  // 存放 详情集合 中的每条数据 id
	}
]



详情集合：
[
{'id':&quot;111&quot;,name:'零件1',title:'...' ...},
{'id':&quot;222&quot;,name:'零件2',title:'...' ...},
{'id':&quot;333&quot;,name:'零件3',title:'...' ...},
...
]


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如歌单列表，与歌曲详情的数据组合设计。</p>
<h5 id="第三种-n的数量巨大-几百成千上万个" tabindex="-1"><a class="header-anchor" href="#第三种-n的数量巨大-几百成千上万个" aria-hidden="true">#</a> 第三种：N的数量巨大  几百成千上万个</h5>
<p><strong>每个 N 都存储 1 的 id</strong></p>
<p>如新浪博客中的一条博客下面有几千条评论</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>一条新浪博客：
[{
	'id':'11',
	'content':'博客内容'
	...
}]


上千条评价：
[
{
	'id':'111111'
	'blogId':'11', // 这个id对应的是那一条博客的id
	'content': '评价内容1'
},
{
	'id':'222222'
	'blogId':'11', // 这个id对应的是那一条博客的id
	'content': '评价内容2'
},
{
	'id':'33333'
	'blogId':'11', // 这个id对应的是那一条博客的id
	'content': '评价内容3'
},
...
]

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="云调用" tabindex="-1"><a class="header-anchor" href="#云调用" aria-hidden="true">#</a> 云调用</h4>
<p>通过云函数调用服务端的开发接口</p>
<p>这些接口如：模板消息推送、生成小程序码...</p>
<h4 id="模板消息推送" tabindex="-1"><a class="header-anchor" href="#模板消息推送" aria-hidden="true">#</a> 模板消息推送</h4>
<p><strong>1、使用from表单才能触发消息推送，并设置report-submit=&quot;true&quot;</strong></p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>
&lt;form slot=&quot;modal-content&quot; report-submit=&quot;true&quot; bind:submit=&quot;onSend&quot;&gt;
    &lt;textarea name=&quot;content&quot; class=&quot;comment-content&quot; placeholder=&quot;写评论&quot; value=&quot;{{content}}&quot; fixed=&quot;true&quot;&gt;&lt;/textarea&gt;
    &lt;button class=&quot;send&quot; form-type=&quot;submit&quot;&gt;发送&lt;/button&gt;
  &lt;/form&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2、需要到微信公众平台做相应的设置：</strong></p>
<p>微信公众平台 &gt;  功能 &gt; 模板消息 &gt; 添加模板 &gt; 选择相应的模板&gt; 添加成功后会有一个模板ID</p>
<p><strong>3、新建一个云函数，用于云调用。在该云函数下新建配置文件：config.json ，用于配置权限</strong></p>
<p>config.json ：</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code>{
  &quot;permissions&quot;: {
    &quot;openapi&quot;: [
      &quot;templateMessage.send&quot;
    ]
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>云函数设置消息推送：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 云函数入口函数
exports.main = async (event, context) =&gt; {
  // 获取openid
  const { OPENID } = cloud.getWXContext()

  // 模板推送消息
  const result = await cloud.openapi.templateMessage.send({
    touser: OPENID,
    page: `/pages/blog-comment/blog-comment?blogId=${event.blogId}`, // 用户点击推送消息打开的页面
    data: { // 模板的内容，keyword为在公众平台设置模板时对应的字段
      keyword1: { // 评价内容
        value: event.context
      },
      keyword2: { // 评价时间
        value: event.time
      }
    },
    templateId: 'LNwKMcYwlz-0HabgBhmZi6CWZrlNSBiNJ2h0SMorcxQ', // 模板id，到公众平台模板消息上获取
    formId: event.formId // 触发消息推送的form表单的id
  })

  return result
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>4、在提交表单事件完成后调用消息推送云函数</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code> wx.cloud.callFunction({
          name: 'sendMessage',
          data: {
            content,
            formId,
            blogId: this.properties.blogId
          }
        }).then((res) =&gt; {
          console.log(res)
        })
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="云函数多集合查询数据库" tabindex="-1"><a class="header-anchor" href="#云函数多集合查询数据库" aria-hidden="true">#</a> 云函数多集合查询数据库</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 博客详情(博客内容、评论)
  app.router('blogDetail', async(ctx, next) =&gt; {
    let blogId = event.blogId

    // 博客内容
    let detail = await blogCollection.where({
      _id: blogId
    }).get().then((res) =&gt; {
      return res.data
    })

    // 评论查询
    const countResult = await blogCollection.count()
    const total = countResult.total
    let commentList = {
      data: []
    }
    if (total &gt; 0) {
      // 突破100条限制
      const batchTimes = Math.ceil(total / MAX_LIMIT)
      const tasks = []
      for (let i = 0; i &lt; batchTimes; i++) {
        let promise = db.collection('blog-comment').skip(i * MAX_LIMIT)
          .limit(MAX_LIMIT).where({
            blogId
          }).orderBy('createTime', 'desc').get()
        tasks.push(promise)
      }
      if (tasks.length &gt; 0) {
        commentList = (await Promise.all(tasks)).reduce((acc, cur) =&gt; {
          return {
            data: acc.data.concat(cur.data)
          }
        })
      }

    }
    ctx.body = {
      detail,
      commentList
    }
  })
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="分享功能" tabindex="-1"><a class="header-anchor" href="#分享功能" aria-hidden="true">#</a> 分享功能</h4>
<p>分享功能需要button标签，设置open-type=&quot;share&quot;</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>
&lt;button open-type=&quot;share&quot; data-blogid=&quot;{{blogId}}&quot; data-blog=&quot;{{blog}}&quot; class=&quot;share-btn&quot; hover-class=&quot;share-hover&quot;&gt;
      &lt;i class=&quot;iconfont icon-fenxiang icon&quot;&gt;&lt;/i&gt;
      &lt;text&gt;分享&lt;/text&gt;
    &lt;/button&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在js中有onShareAppMessage方法，点击button会自动执行此方法</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>onShareAppMessage: function (event) {
    console.log(event)

    // 对分享卡片的设置
    let blogObj = event.target.dataset.blog
    return {
      title: blogObj.content,
      path: `/pages/blog-comment/blog-comment?blogId=${blogObj._id}`,
      // imageUrl: '' // 自定义图片，不支持云存储的图片
    }
  }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="不同场景获取用户信息的方式" tabindex="-1"><a class="header-anchor" href="#不同场景获取用户信息的方式" aria-hidden="true">#</a> 不同场景获取用户信息的方式</h4>
<h5 id="场景一-只想在界面上显示自己的昵称和头像" tabindex="-1"><a class="header-anchor" href="#场景一-只想在界面上显示自己的昵称和头像" aria-hidden="true">#</a> 场景一：只想在界面上显示自己的昵称和头像</h5>
<p>以组件的方式：根据type类型获取不同用户数据</p>
<p><strong>该方式不需要授权，只能用于在wxml显示自己的信息</strong></p>
<p><a href="https://developers.weixin.qq.com/miniprogram/dev/component/open-data.html" target="_blank" rel="noopener noreferrer">open-data</a></p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;open-data type=&quot;userAvatarUrl&quot;&gt;&lt;/open-data&gt;
&lt;open-data type=&quot;userNickName&quot;&gt;&lt;/open-data&gt;
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="场景二-在js中获取用户信息" tabindex="-1"><a class="header-anchor" href="#场景二-在js中获取用户信息" aria-hidden="true">#</a> 场景二：在JS中获取用户信息</h5>
<p>该方式要在用户授权以后才能获取用户信息</p>
<p><a href="https://developers.weixin.qq.com/miniprogram/dev/api/open-api/user-info/wx.getUserInfo.html" target="_blank" rel="noopener noreferrer">wx.getUserInfo</a></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>wx.getUserInfo({
      success: (res) =&gt; {
        console.log(res)
      }
    })
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在未授权的情况下需要用户先授权：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 判断用户是否授权
      wx.getSetting({
        success: (res) =&gt; { // 这里使用箭头函数可改变内部this指向为外部的this
          if (res.authSetting['scope.userInfo']) { // 已授权
            wx.getUserInfo({ // 获取用户信息
              success: (res) =&gt; { // 这里使用箭头函数可改变内部this指向为外部的this

                app.setGlobalData('userInfo', res.userInfo) // 设置app全局属性

                this.onLoginSuccess({
                  detail: res.userInfo
                })
              }
            })
          } else { // 未授权
            this.setData({ // 打开弹出层，显示获取用户信息按钮
              modalShow: true
            })
          }
        }
      })


  授权按钮
 &lt;button class=&quot;login&quot; open-type=&quot;getUserInfo&quot; bindgetuserinfo=&quot;onGetUserInfo&quot;&gt;获取微信授权信息&lt;/button&gt;


    onGetUserInfo(event) { // 获取用户信息
      const userInfo = event.detail.userInfo
      if (userInfo) { // 用户允许授权
        this.setData({
          modalShow: false
        })
        this.triggerEvent('loginSuccess', userInfo) // 给父组件传用户数据
      } else { // 用户拒绝授权
        this.triggerEvent('loginFail')
      }
    }

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>注意：上面这种方式没有获取到openId</p>
</blockquote>
<h5 id="场景三-获取openid" tabindex="-1"><a class="header-anchor" href="#场景三-获取openid" aria-hidden="true">#</a> 场景三：获取openId</h5>
<p><strong>获取openId不需要用户授权</strong></p>
<p>1、传统开发方式获取openId，后台服务器由自己开发，没使用云开发</p>
<p>小程序端                 微信服务器            后端服务器</p>
<p>步骤：</p>
<p>小程序端 调用 wx.login 向微信服务器 获取code</p>
<p>小程序端 调用 wx.request 将 code 传递给 后端服务器</p>
<p>后端服务器 使用code 向微信服务器 换取openid和session_key</p>
<p>后端服务器 将openid 发送给 小程序端</p>
<p>2、云开发方式获取openId</p>
<p>云函数login中</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）
  const wxContext = cloud.getWXContext()

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>普通按钮
&lt;button bindtap=&quot;getOpenid&quot;&gt;获取openid&lt;/button&gt;

getOpenid() {
	wx.cloud.callFunction({
		name: 'login'
	}).then((res) =&gt; {
		console.log(res)
	})
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>openid 在小程序和公众号下是不一样的</p>
<p>unionid 在小程序和公众号下都是一样的</p>
</blockquote>
<h2 id="《我的》页面" tabindex="-1"><a class="header-anchor" href="#《我的》页面" aria-hidden="true">#</a> 《我的》页面</h2>
<p>json文件</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>&quot;navigationBarTitleText&quot;: &quot;我的&quot;,
  &quot;disableScroll&quot;: true  // 使页面无法滚动
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="导航页面链接跳转" tabindex="-1"><a class="header-anchor" href="#导航页面链接跳转" aria-hidden="true">#</a> 导航页面链接跳转</h4>
<p><a href="https://developers.weixin.qq.com/miniprogram/dev/component/navigator.html" target="_blank" rel="noopener noreferrer">navigator</a></p>
<h4 id="背景图片" tabindex="-1"><a class="header-anchor" href="#背景图片" aria-hidden="true">#</a> 背景图片</h4>
<p>wxss背景图片不支持本地相对路径的图片，只支持网络图片和base64图片</p>
<p>建议使用base64图片，图片文件最好不要太大。</p>
<h4 id="每个页面都有的page标签" tabindex="-1"><a class="header-anchor" href="#每个页面都有的page标签" aria-hidden="true">#</a> 每个页面都有的page标签</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>page {
  background-color: #f1f1f1;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="播放历史与本地存储" tabindex="-1"><a class="header-anchor" href="#播放历史与本地存储" aria-hidden="true">#</a> 播放历史与本地存储</h4>
<p>方案一：播放历史存储在数据库当中，这样在不同设备访问都可查看播放历史。读取速度相对较慢</p>
<p>方案二：播放历史存储在本地，仅当前设备可查看播放历史。读取速度较快</p>
<p>本项目采用本地存储：</p>
<p>使用openid作为本地存储的key，播放历史存入value</p>
<p>在app.js中获取openid，即打开小程序就获取openid。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// app.js
onLaunch: function () {
	this.getOpenid() // 获取openid并存储
},
getOpenid() { // 获取openid并存储
    wx.cloud.callFunction({
      name: 'login'
    }).then((res) =&gt; {
      const openid = res.result.openid
      this.globalData.openid = openid // 保存到全局变量
      if (wx.getStorageSync(openid) == '') { // 该用户从未打开过小程序，未存储过openid在本地
        wx.setStorageSync(openid, []) // 存储openid到本地
      }
    })
  }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>歌曲播放时</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 保存播放历史到本地存储
  savePlayHistory() {
    const currentSong = musiclist[nowPlayingIndex] // 当前播放歌曲
    const openid = app.globalData.openid // 从全局属性获取openid
    const playHistory = wx.getStorageSync(openid) // 从本地存储获取播放历史数组

    for (let i = 0, len = playHistory.length; i &lt; len; i++) {
      if (playHistory[i].id === currentSong.id) { // 当前播放歌曲已存在播放历史中
        playHistory.splice(i, 1) // 删除原纪录
        break
      }
    }

    playHistory.unshift(currentSong) // 在数组开头插入
    wx.setStorage({ // 存入本地
      key: openid,
      data: playHistory
    })

  },
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>播放历史页面获取</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>onLoad: function (options) {

    const openid = app.globalData.openid //从全局属性获取openid
    const playHistory = wx.getStorageSync(openid) // 读取本地播放历史数据

    if (playHistory.length !== 0) { // 有播放历史
      this.setData({
        playHistory
      })
      wx.setStorage({ // storage里把musiclist（播放列表）的内容换成播放历史的列表
        key: 'musiclist',
        data: playHistory,
      })
    }

  },
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="我的发现" tabindex="-1"><a class="header-anchor" href="#我的发现" aria-hidden="true">#</a> 我的发现</h4>
<p>代码分别演示了从云函数和小程序端获取数据，从小程序端获取数据享有<strong>权限管理</strong>的能力，不需要传openid。</p>
<h4 id="小程序码" tabindex="-1"><a class="header-anchor" href="#小程序码" aria-hidden="true">#</a> 小程序码</h4>
<p><a href="https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/qr-code.html" target="_blank" rel="noopener noreferrer">获取小程序码</a></p>
<p>本项目演示使用<a href="https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/qr-code/wxacode.getUnlimited.html" target="_blank" rel="noopener noreferrer">接口 B：适用于需要的码数量极多的业务场景</a> <code v-pre>云调用</code> 的方式。</p>
<p>步骤：</p>
<ul>
<li>
<p>创建云函数 gteQRCode</p>
</li>
<li>
<p>gteQRCode云函数下创建config.json配置权限，代码如下：</p>
</li>
</ul>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code>{
  &quot;permissions&quot;:{
    &quot;openapi&quot;:[
      &quot;wxacode.getUnlimited&quot;
    ]
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 云函数入口函数
exports.main = async (event, context) =&gt; {
  const wxContext = cloud.getWXContext()

  const result = await cloud.openapi.wxacode.getUnlimited({
    scene: wxContext.OPENID, // 链接参数 不一定传openid，可传其他任意数据，然后通过此数据，在别人扫码进入时就可用于判断
    // page: &quot;pages/blog/blog&quot; // 默认进入主页
    // lineColor: { // 线条颜色
    //   'r': 211,
    //   'g': 60,
    //   'b': 57
    // },
    // isHyaline: true // 是否透明
  })

  // result为二进制数据, 先上传到云存储

  // 上传云存储
  const upload = await cloud.uploadFile({
    cloudPath: 'qrcode/qrcode' + Date.now() + Math.random() + '.png',
    fileContent: result.buffer
  })

  return upload.fileID
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="判断是从扫码小程序码进入-以及参数获取" tabindex="-1"><a class="header-anchor" href="#判断是从扫码小程序码进入-以及参数获取" aria-hidden="true">#</a> 判断是从扫码小程序码进入，以及参数获取</h5>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 在从小程序码进入的页面js，onLoad方法中，

onLoad: function (options) {
	console.log(options.scene) // 获取到小程序码进入的参数
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="版本更新检测" tabindex="-1"><a class="header-anchor" href="#版本更新检测" aria-hidden="true">#</a> 版本更新检测</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// app.js
onLaunch: function(options) {
    this.checkUpate()
},
checkUpate(){
    const updateManager = wx.getUpdateManager()
    // 检测版本更新
    updateManager.onCheckForUpdate((res)=&gt;{
      if (res.hasUpdate){
        updateManager.onUpdateReady(()=&gt;{
          wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用',
            success(res){
              if(res.confirm){
                updateManager.applyUpdate()
              }
            }
          })
        })
      }
    })
  },
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="性能优化" tabindex="-1"><a class="header-anchor" href="#性能优化" aria-hidden="true">#</a> 性能优化</h3>
<p><a href="https://developers.weixin.qq.com/miniprogram/dev/framework/performance/tips.html" target="_blank" rel="noopener noreferrer">官网文档优化建议</a></p>
<p>使用开发者工具的调试器，Audits进行评分，然后根据提示针对项目进行优化。</p>
<h3 id="场景值scene的作用与应用场景" tabindex="-1"><a class="header-anchor" href="#场景值scene的作用与应用场景" aria-hidden="true">#</a> 场景值scene的作用与应用场景</h3>
<p><a href="https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/scene.html" target="_blank" rel="noopener noreferrer">场景值</a></p>
<p>场景值用来描述用户进入小程序的路径。完整场景值的含义请查看<a href="https://developers.weixin.qq.com/miniprogram/dev/reference/scene-list.html" target="_blank" rel="noopener noreferrer">场景值列表</a>。</p>
<p>可根据不同场景进入实现不同业务处理，比如一个点餐小程序，店家内贴了小程序码，用户通过扫码进入，可立即进入点餐页面，等等</p>
<p>在app.js中的onLaunch(options) 、onShow(options)，options包含scene场景值</p>
<p><strong>开发者工具中，切后台，可模拟进入场景。</strong></p>
<h3 id="小程序的-seo-页面收录sitemap" tabindex="-1"><a class="header-anchor" href="#小程序的-seo-页面收录sitemap" aria-hidden="true">#</a> 小程序的&quot;SEO&quot;---页面收录sitemap</h3>
<p>在app.js的同级目录下有sitemap.json文件，用于配置收录规则</p>
<p><a href="https://developers.weixin.qq.com/miniprogram/dev/framework/sitemap.html" target="_blank" rel="noopener noreferrer">stiemap配置</a></p>
<p>作用：</p>
<p>使小程序搜索可根据小程序的内容进行搜索到</p>
<p>使用方法：</p>
<p>1、在微信公众平台，小程序信息 &gt; 页面收录设置 &gt; 打开 (默认是已开启)</p>
<p>2、打开sitemap.json文件，配置收录规则</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code>{
  &quot;desc&quot;: &quot;关于本文件的更多信息，请参考文档 https://developers.weixin.qq.com/miniprogram/dev/framework/sitemap.html&quot;,
  &quot;rules&quot;: [{ // 收录规则
  &quot;action&quot;: &quot;allow&quot;,// 是否被收录，allow允许被收录，disallow不允许
  &quot;page&quot;: &quot;*&quot; // *星号表示所有页面都被收录
  }]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code>{
  &quot;desc&quot;: &quot;关于本文件的更多信息，请参考文档 https://developers.weixin.qq.com/miniprogram/dev/framework/sitemap.html&quot;,
  &quot;rules&quot;: [{ // 收录规则，可添加多条
  &quot;action&quot;: &quot;allow&quot;, // 是否被收录
  &quot;page&quot;:&quot;pages/player/player&quot;,  // 页面
  &quot;params&quot;: [&quot;musicId&quot;,&quot;index&quot;], // 链接的动态参数
   &quot;matching&quot;:'exact' // 表示params的参数是否要准确的匹配
  }，{
  &quot;action&quot;: &quot;disallow&quot;, // 是否被收录
  &quot;page&quot;:&quot;*&quot;,  /
  }]
}

// 上面配置规则表示除了player页面被收录外，其他页面不被收录
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="小程序上线审核流程" tabindex="-1"><a class="header-anchor" href="#小程序上线审核流程" aria-hidden="true">#</a> 小程序上线审核流程</h3>
<p>微信公众平台，版本管理&gt;把小程序上传为体验版》提交审核》上线</p>
<h2 id="后台管理系统" tabindex="-1"><a class="header-anchor" href="#后台管理系统" aria-hidden="true">#</a> 后台管理系统</h2>
<h4 id="架构示意图" tabindex="-1"><a class="header-anchor" href="#架构示意图" aria-hidden="true">#</a> 架构示意图</h4>
<p>​				前端                                                           后台                                                         小程序云开发</p>
<p>vue-admin-template  &lt;---通过ajax--&gt; 基于Koa2；HTTP API 或 tcb-admin-node    ----&gt;云函数、云数据库、云存储</p>
<p>​</p>
<h4 id="vue-admin-template构建管理系统前端" tabindex="-1"><a class="header-anchor" href="#vue-admin-template构建管理系统前端" aria-hidden="true">#</a> vue-admin-template构建管理系统前端</h4>
<p><a href="https://github.com/PanJiaChen/vue-element-admin" target="_blank" rel="noopener noreferrer">vue-element-admin</a> 基于element的后台管理系统模板</p>
<p><a href="https://github.com/PanJiaChen/vue-admin-template" target="_blank" rel="noopener noreferrer">vue-admin-template</a> 是 <a href="https://github.com/PanJiaChen/vue-element-admin" target="_blank" rel="noopener noreferrer">vue-element-admin</a>的简化版</p>
<p>使用方法查看官方文档。</p>
<h4 id="koa2构建管理系统后端" tabindex="-1"><a class="header-anchor" href="#koa2构建管理系统后端" aria-hidden="true">#</a> Koa2构建管理系统后端</h4>
<p>官网： <a href="https://koa.bootcss.com/" target="_blank" rel="noopener noreferrer">https://koa.bootcss.com/</a></p>
<p>新建空文件夹wx-music-admin-backend，打开终端：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code># 生成package.json文件，-y 表示默认的配置
npm init -y

# 安装koa
npm install koa

# 新建app.js文件 (win10系统命令)，作为项目入口文件
type nul &gt; app.js

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>app.js:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const Koa = require('koa')
const chalk = require('chalk') // 使console.log打印文字有颜色的插件，需: npm i chalk
const app = new Koa()

app.use(async (ctx) =&gt; {
  ctx.body = 'Hello Wolrd'
})
const port = 3000
app.listen(port, () =&gt; { // 端口号，开启服务后的回调函数
  console.log(chalk.green(`&gt; 服务已开启，访问：http://localhost:${port}`))
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>终端：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code># node启动项目
node app.js

# 访问：http://localhost:3000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="接口调用凭证-access-token-的缓存与更新" tabindex="-1"><a class="header-anchor" href="#接口调用凭证-access-token-的缓存与更新" aria-hidden="true">#</a> 接口调用凭证 access_token 的缓存与更新</h4>
<p>access_token，微信的接口调用凭证，详情：<a href="https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/access-token/auth.getAccessToken.html" target="_blank" rel="noopener noreferrer">https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/access-token/auth.getAccessToken.html</a></p>
<p>回到项目wx-music-admin-backend，打开终端：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code># HTTP 请求 插件
npm i request
npm i request-promise
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>/**
 * 获取微信接口调用凭证
 * 详情：https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/access-token/auth.getAccessToken.html
 */


const rp = require('request-promise') // node发送http请求的插件
const fs = require('fs') // node文件模块
const path = require('path') // node 路径模块

//fileName = __dirname 当前文件所在目录的绝对路径, 加上 './access_token.json'
const fileName = path.resolve(__dirname, './access_token.json')

// 这两个参数的获取：微信公众平台&gt;开发&gt;开发设置
const APPID = 'wxc4e0b2d98063b103'
const APPSECRET = 'xxx' //小程序密钥，注意保密!

// 微信 access_token 请求地址
const URL = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&amp;appid=${APPID}&amp;secret=${APPSECRET}`

// 发送请求获取AccessToken
const updateAccessToken = async () =&gt; {
  const resStr = await rp(URL)
  const res = JSON.parse(resStr)

  if (res.access_token) {
    // node写文件,参数：1 文件路径，2 文件内容, 首次写文件为新建，往后为覆盖
    fs.writeFileSync(fileName, JSON.stringify({
      access_token: res.access_token,
      createTime: new Date()
    }))
  } else { // 如获取不到，再次获取
    await updateAccessToken()
  }
}

// 读取access_token
const getAccessToken = async () =&gt; {
  try {
     // node读取文件,参数：1 读取的文件，2 字符集
    const readRes = fs.readFileSync(fileName, 'utf8')
    const readObj = JSON.parse(readRes)

    // 如果服务器宕机导致setInterval无法定时更新，这里需要再次判断access_token的有效性
    const createTime = new Date(readObj.createTime).getTime()
    const nowTime = new Date().getTime()
    if((nowTime - createTime) / 1000 / 60 / 60 &gt;= 2) {
      await updateAccessToken()
      await getAccessToken()
      return
    }
    return readObj.access_token

  } catch (error) { //捕获异常，在未创建文件时，先创建文件
    await updateAccessToken()
    await getAccessToken()
  }
}

// access_token有效期为2个小时，定时更新
setInterval(async () =&gt; {
  await updateAccessToken()
}, (7200 - 300) * 1000)

module.exports = getAccessToken
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="后端代码通过http-api-触发云函数获取数据" tabindex="-1"><a class="header-anchor" href="#后端代码通过http-api-触发云函数获取数据" aria-hidden="true">#</a> 后端代码通过HTTP API 触发云函数获取数据</h4>
<p><a href="https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-http-api/functions/invokeCloudFunction.html" target="_blank" rel="noopener noreferrer">HTTP API 触发云函数</a></p>
<h4 id="产生跨域和后端解决跨域问题" tabindex="-1"><a class="header-anchor" href="#产生跨域和后端解决跨域问题" aria-hidden="true">#</a> 产生跨域和后端解决跨域问题</h4>
<p>管理系统前端向管理系统后端请求数据，产生了跨域问题</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>  // 产生跨域的几种情况
  // http://www.a.com  https://www.a.com 协议不同
  // http://www.a.com  http://www.b.com 域名不同
  // http://www.a.com  http://news.a.com 主域与子域不同
  // http://www.a.com:8080  http://www.a.com:3000 端口不同

// 解决跨域的几种方法
// jsonp
// iframe
// postMessage跨域
// 跨域资源共享（CORS）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>管理系统后端，安装</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>// 解决跨域问题的koa包
npm i koa2-cors
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>app.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>//处理跨域
app.use(cors({
  origin: ['http://localhost:9528'], // 允许访问本服务的域
  credentials: true
}))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="云数据库的增删改查接口" tabindex="-1"><a class="header-anchor" href="#云数据库的增删改查接口" aria-hidden="true">#</a> 云数据库的增删改查接口</h4>
<p><a href="https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-http-api/database/databaseQuery.html" target="_blank" rel="noopener noreferrer">数据库查询记录</a></p>
<h4 id="后端获取前端post请求传来的数据" tabindex="-1"><a class="header-anchor" href="#后端获取前端post请求传来的数据" aria-hidden="true">#</a> 后端获取前端post请求传来的数据</h4>
<p>get请求可以直接通过ctx.request.query获取，但是post请求需要安装koa-body</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>npm i koa-body
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>app.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const koaBody = require('koa-body') // 对post请求前端传来的数据的获取，需要此依赖

// 接收post参数解析
app.use(koaBody({
  multipart: true
}))

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接口.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>router.post('/updatePlaylist', async (ctx, next) =&gt; {

  const params = ctx.request.body // post请求获取前端传来的数据，需安装和配置koa-body

})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="后端获取云存储图片" tabindex="-1"><a class="header-anchor" href="#后端获取云存储图片" aria-hidden="true">#</a> 后端获取云存储图片</h4>
<p>云存储中上传图片，云数据库中新建图片的集合，并添加数据字段，字段包含云文件的fileid。</p>
<p>后端项目通过调用云数据库的方式获取数据</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>router.get('/list', async (ctx, next) =&gt; {
  // 接口中读取数据库默认最多10条数据
  const query = `db.collection('swiper').get()`
  const res = await callCloudDB(ctx, 'databasequery', query)
  console.log(res)

})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但获取到的数据为fileid，并不能用于显示图片，需要通过微信HTTP API获取云存储的接口来获取图片地址</p>
<p><a href="https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-http-api/storage/batchDownloadFile.html" target="_blank" rel="noopener noreferrer">获取云存储</a></p>
<h4 id="后端上传图片到云存储" tabindex="-1"><a class="header-anchor" href="#后端上传图片到云存储" aria-hidden="true">#</a> 后端上传图片到云存储</h4>
<p><a href="https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-http-api/storage/uploadFile.html" target="_blank" rel="noopener noreferrer">文件上传</a></p>
</div></template>
