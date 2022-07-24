<template><div><h1 id="npm常用命令" tabindex="-1"><a class="header-anchor" href="#npm常用命令" aria-hidden="true">#</a> npm常用命令</h1>
<h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h2>
<p>npm是跟随node一起安装的包（模块）管理器。常见的使用场景有以下几种：</p>
<ul>
<li>允许用户从npm服务器下载别人编写的第三方包到本地使用。</li>
<li>允许用户从npm服务器下载并安装别人编写的命令行程序到本地使用。</li>
<li>允许用户将自己编写的包或命令行程序上传到npm服务器供别人使用。</li>
</ul>
<!-- more -->
<h2 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令" aria-hidden="true">#</a> 常用命令</h2>
<h4 id="检测是否安装及版本" tabindex="-1"><a class="header-anchor" href="#检测是否安装及版本" aria-hidden="true">#</a> 检测是否安装及版本</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>npm -v # 显示版本号说明已经安装相应的版本
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="生成package-json文件" tabindex="-1"><a class="header-anchor" href="#生成package-json文件" aria-hidden="true">#</a> 生成package.json文件</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>npm init
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>package.json用来描述项目中用到的模块和其他信息</p>
</blockquote>
<h4 id="安装模块" tabindex="-1"><a class="header-anchor" href="#安装模块" aria-hidden="true">#</a> 安装模块</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>npm install # 安装package.json定义好的模块，简写 npm i

# 安装包指定模块
npm i &lt;ModuleName&gt;

# 全局安装
npm i &lt;ModuleName&gt; -g 

# 安装包的同时，将信息写入到package.json中的 dependencies 配置中
npm i &lt;ModuleName&gt; --save

# 安装包的同时，将信息写入到package.json中的 devDependencies 配置中
npm i &lt;ModuleName&gt; --save-dev

# 安装多模块
npm i &lt;ModuleName1&gt; &lt;ModuleName2&gt;

# 安装方式参数：
-save # 简写-S，加入到生产依赖中
-save-dev # 简写-D，加入到开发依赖中
-g # 全局安装 将安装包放在 /usr/local 下或者你 node 的安装目录
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="查看" tabindex="-1"><a class="header-anchor" href="#查看" aria-hidden="true">#</a> 查看</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code># 查看所有全局安装的包
npm ls -g

# 查看本地项目中安装的包
npm ls

# 查看包的 package.json文件
npm view &lt;ModuleName&gt;

# 查看包的依赖关系
npm view &lt;ModuleName&gt; dependencies

# 查看包的源文件地址
npm view &lt;ModuleName&gt; repository.url

# 查看包所依赖的node版本
npm view &lt;ModuleName&gt; engines

# 查看帮助
npm help
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="更新模块" tabindex="-1"><a class="header-anchor" href="#更新模块" aria-hidden="true">#</a> 更新模块</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code># 更新本地模块
npm update &lt;ModuleName&gt;

# 更新全局模块
npm update -g &lt;ModuleName&gt; # 更新全局软件包。
npm update -g # 更新所有的全局软件包。
npm outdated -g --depth=0 # 找出需要更新的包。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="卸载模块" tabindex="-1"><a class="header-anchor" href="#卸载模块" aria-hidden="true">#</a> 卸载模块</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code># 卸载本地模块
npm uninstall &lt;ModuleName&gt;

# 卸载全局模块
npm uninstall -g &lt;ModuleName&gt; # 卸载全局软件包。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="清空缓存" tabindex="-1"><a class="header-anchor" href="#清空缓存" aria-hidden="true">#</a> 清空缓存</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code># 清空npm缓存
npm cache clear
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="使用淘宝镜像" tabindex="-1"><a class="header-anchor" href="#使用淘宝镜像" aria-hidden="true">#</a> 使用淘宝镜像</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code># 使用淘宝镜像
npm install -g cnpm --registry=https://registry.npm.taobao.org
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="其他" tabindex="-1"><a class="header-anchor" href="#其他" aria-hidden="true">#</a> 其他</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code># 更改包内容后进行重建
npm rebuild &lt;ModuleName&gt;

# 检查包是否已经过时，此命令会列出所有已经过时的包，可以及时进行包的更新
npm outdated

# 访问npm的json文件，此命令将会打开一个网页
npm help json

# 发布一个包的时候，需要检验某个包名是否存在
npm search &lt;ModuleName&gt;

# 撤销自己发布过的某个版本代码
npm unpublish &lt;package&gt; &lt;version&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用技巧" tabindex="-1"><a class="header-anchor" href="#使用技巧" aria-hidden="true">#</a> 使用技巧</h2>
<h4 id="多次安装不成功尝试先清除缓存" tabindex="-1"><a class="header-anchor" href="#多次安装不成功尝试先清除缓存" aria-hidden="true">#</a> 多次安装不成功尝试先清除缓存</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>npm cache clean -f
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="查看已安装的依赖包版本号" tabindex="-1"><a class="header-anchor" href="#查看已安装的依赖包版本号" aria-hidden="true">#</a> 查看已安装的依赖包版本号</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>npm ls &lt;ModuleName&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>注意：用此方法才能准确的知道项目使用的版本号，查看package.json时，有“^&quot; 符号表示大于此版本</p>
</blockquote>
<h2 id="npm发布包教程" tabindex="-1"><a class="header-anchor" href="#npm发布包教程" aria-hidden="true">#</a> npm发布包教程</h2>
<p><a href="https://segmentfault.com/a/1190000017461666" target="_blank" rel="noopener noreferrer">npm发布包教程</a></p>
<h2 id="nrm的作用与使用" tabindex="-1"><a class="header-anchor" href="#nrm的作用与使用" aria-hidden="true">#</a> nrm的作用与使用</h2>
<h4 id="nrm是什么" tabindex="-1"><a class="header-anchor" href="#nrm是什么" aria-hidden="true">#</a> nrm是什么？</h4>
<p>nrm(npm registry manager )是npm的镜像源管理工具，有时候国外资源太慢，使用这个就可以快速地在 npm 源间切换</p>
<h4 id="nrm的安装" tabindex="-1"><a class="header-anchor" href="#nrm的安装" aria-hidden="true">#</a> nrm的安装</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>npm install -g nrm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="nrm命令" tabindex="-1"><a class="header-anchor" href="#nrm命令" aria-hidden="true">#</a> nrm命令</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>nrm ls　#查看可用的源（有*号的表示当前所使用的源,以下&lt;registry&gt;表示源的名称）
nrm use &lt;registry&gt; # 将npm下载源切换成指定的源
nrm add &lt;registry&gt; &lt;url&gt; # 添加源，url为源的路径
nrm del &lt;registry&gt; # 删除源
nrm test &lt;registry&gt; # 测试源的响应时间，可以作为使用哪个源的参考

nrm help　# 查看nrm帮助
nrm home &lt;registry&gt;　# 跳转到指定源的官网
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="nrm使用" tabindex="-1"><a class="header-anchor" href="#nrm使用" aria-hidden="true">#</a> nrm使用</h4>
<p>如果在你的网络不太理想或者受到其他网络限制导致不能使用npm原本的源进行下载时，nrm就非常有用了，你只需要：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>nrm ls # 查看可用的源
nrm use &lt;registry&gt;　# 切换到指定源
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></div></template>
