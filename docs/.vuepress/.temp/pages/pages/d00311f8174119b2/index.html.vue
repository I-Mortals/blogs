<template><div><h1 id="vue-cli-v3-x-创建项目使用记录" tabindex="-1"><a class="header-anchor" href="#vue-cli-v3-x-创建项目使用记录" aria-hidden="true">#</a> Vue CLi v3.x 创建项目使用记录</h1>
<p><a href="https://cli.vuejs.org/zh/" target="_blank" rel="noopener noreferrer">官方文档</a></p>
<p>以下使用的CLi版本是 v3.11.0</p>
<h2 id="vue-create" tabindex="-1"><a class="header-anchor" href="#vue-create" aria-hidden="true">#</a> vue create</h2>
<ol>
<li>运行以下命令来创建一个新项目</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>vue create hello-world
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li>你会被提示选取一个 preset (预设)。你可以选默认的包含了基本的 Babel + ESLint 设置的 preset，也可以选“手动选择特性”来选取需要的特性。</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Vue CLI v3.11.0
? Please pick a preset: (Use arrow keys)
&gt; default (babel, eslint)
  Manually select features (手动选择特性)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认预设只包含Babel + ESLint，如需要使用到Router、CSS Pre-processors（CSS预处理器）等需要选手动选择特性。</p>
<ol start="3">
<li>手动选择特性</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Vue CLI v3.11.0
? Please pick a preset: Manually select features
? Check the features needed for your project: (Press &lt;space&gt; to select, &lt;a&gt; to toggle all, &lt;i&gt; to invert selection)
&gt;(*) Babel # 将现代JS转成旧版本（出于兼容性考虑）
 ( ) TypeScript # 添加对TS的支持
 ( ) Progressive Web App (PWA) Support # 渐进式Web应用程序（PWA）的支持
 ( ) Router # 路由
 ( ) Vuex # 状态管理
 ( ) CSS Pre-processors # css预处理器
 (*) Linter / Formatter # 使用ESLint检查代码质量
 ( ) Unit Testing # 单元测试
 ( ) E2E Testing  # E2E测试
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>图形化界面有对特性的介绍</p>
</blockquote>
<ol start="4">
<li>使用路由器的历史记录模式？（需要适当的服务器设置才能在生产中进行索引回退）通过使用HTML5历史记录API，URL不再需要'＃'字符。</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Vue CLI v3.11.0
? Please pick a preset: Manually select features
? Check the features needed for your project: Babel, Router, CSS Pre-processors, Linter
? Use history mode for router? (Requires proper server setup for index fallback in production) (Y/n)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5">
<li>选择css预处理器</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Vue CLI v3.11.0
? Please pick a preset: Manually select features
? Check the features needed for your project: Babel, Router, CSS Pre-processors, Linter
? Use history mode for router? (Requires proper server setup for index fallback in production) Yes
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default):
  Sass/SCSS (with dart-sass)
  Sass/SCSS (with node-sass)
  Less
&gt; Stylus
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="6">
<li>选择ESLint配置</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Vue CLI v3.11.0
? Please pick a preset: Manually select features
? Check the features needed for your project: Babel, Router, CSS Pre-processors, Linter
? Use history mode for router? (Requires proper server setup for index fallback in production) Yes
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Stylus
? Pick a linter / formatter config: (Use arrow keys)
  ESLint with error prevention only
  ESLint + Airbnb config
&gt; ESLint + Standard config (标准配置)
  ESLint + Prettier
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="7">
<li>选择附加的lint特性？</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Pick additional lint features: (Press &lt;space&gt; to select, &lt;a&gt; to toggle all, &lt;i&gt; to invert selection)
&gt;(*) Lint on save （保存时检查lint）
 ( ) Lint and fix on commit （提交时 lint 和 fix）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="8">
<li>你喜欢把配置放在什么地方？比如Babel、PostCSS、ESLint等配置</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Vue CLI v3.11.0
? Please pick a preset: Manually select features
? Check the features needed for your project: Babel, Router, CSS Pre-processors, Linter
? Use history mode for router? (Requires proper server setup for index fallback in production) Yes
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Stylus
? Pick a linter / formatter config: Standard
? Pick additional lint features: (Press &lt;space&gt; to select, &lt;a&gt; to toggle all, &lt;i&gt; to invert selection)Lint on save
? Where do you prefer placing config for Babel, PostCSS, ESLint, etc.? (Use arrow keys)
&gt; In dedicated config files (在专用的配置文件)
  In package.json (在package.json)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="9">
<li>将这次已选项保存为一个将来可复用的 preset （预设）？</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Vue CLI v3.11.0
? Please pick a preset: Manually select features
? Check the features needed for your project: Babel, Router, CSS Pre-processors, Linter
? Use history mode for router? (Requires proper server setup for index fallback in production) Yes
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Stylus
? Pick a linter / formatter config: Standard
? Pick additional lint features: (Press &lt;space&gt; to select, &lt;a&gt; to toggle all, &lt;i&gt; to invert selection)Lint on save
? Where do you prefer placing config for Babel, PostCSS, ESLint, etc.? In dedicated config files
? Save this as a preset for future projects? (y/N)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>~/.vuerc</p>
<p>被保存的 preset 将会存在用户的 home 目录下一个名为 <code v-pre>.vuerc</code> 的 JSON 文件里。如果你想要修改被保存的 preset / 选项，可以编辑这个文件。</p>
</blockquote>
<h2 id="图形化界面" tabindex="-1"><a class="header-anchor" href="#图形化界面" aria-hidden="true">#</a> 图形化界面</h2>
<p>对于Vue CLi使用还不是特别熟悉的同学，可以使用图形化界面。运行以下命令会自动打开界面</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>vue ui
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>图形化界面有中文系统，直观的功能界面，以及特性的介绍等。</p>
</blockquote>
</div></template>
