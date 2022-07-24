<template><div><h1 id="vue-cli3-修改webpack配置" tabindex="-1"><a class="header-anchor" href="#vue-cli3-修改webpack配置" aria-hidden="true">#</a> Vue CLi3 修改webpack配置</h1>
<h2 id="审查项目的-webpack-配置" tabindex="-1"><a class="header-anchor" href="#审查项目的-webpack-配置" aria-hidden="true">#</a> 审查项目的 webpack 配置</h2>
<p>因为 <code v-pre>@vue/cli-service</code> 对 webpack 配置进行了抽象，当你想查看webpack的配置时可以使用 <code v-pre>inspect</code>命令：</p>
<!-- more -->
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>vue inspect # 在终端打印 webpack配置信息
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>vue inspect &gt; output.js # 把webpack配置信息生成到output.js文件
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注意，<code v-pre>output.js</code> 文件不是一个有效的 webpack 配置文件，仅用于审查。</p>
<h2 id="修改webpack配置" tabindex="-1"><a class="header-anchor" href="#修改webpack配置" aria-hidden="true">#</a> 修改webpack配置</h2>
<p>以<strong>修改路径别名</strong>为例：</p>
<ol>
<li>
<p>项目根目录创建文件 <code v-pre>vue.config.js</code></p>
</li>
<li>
<p>参考如下代码修改路径别名：</p>
</li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// vue.config.js
const path = require('path')
const resolve = dir =&gt; path.resolve(__dirname, dir)

module.exports = {
  chainWebpack: config =&gt; {
    config.resolve.alias
      .set('styles', resolve('src/assets/styles'))
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<ul>
<li>
<p><a href="https://cli.vuejs.org/zh/guide/webpack.html" target="_blank" rel="noopener noreferrer">官方文档</a></p>
</li>
<li>
<p><a href="https://cli.vuejs.org/zh/config/#vue-config-js" target="_blank" rel="noopener noreferrer">官方 vue.config.js 参数说明</a></p>
</li>
<li>
<p><a href="https://github.com/ustbhuangyi/vue-music/blob/master/vue.config.js" target="_blank" rel="noopener noreferrer">vue.config.js 设置接口代理示例</a></p>
</li>
<li>
<p>配置示例：</p>
</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ProxyAgent = require('proxy-agent')
const resolve = dir =&gt; path.resolve(__dirname, dir)
module.exports = {
  outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
  runtimeCompiler: true,
  assetsDir: 'static',
  productionSourceMap: false, // 生产环境的 source map
  parallel: require('os').cpus().length &gt; 1,
  configureWebpack: config =&gt; {
    // 公共配置
    // cdn引用时配置externals 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖
    config.externals = {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'element-ui': 'ELEMENT',
      'vuex': 'Vuex',
      'axios': 'axios'
    }
    config.resolve.alias = Object.assign({}, config.resolve.alias, {
      'src': resolve('src/common'),
      'common': resolve('src/views/common'),
      'static': resolve('static')
    })
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.optimization = {
        minimizer: [
          new UglifyJsPlugin({
            uglifyOptions: {
              compress: {
                drop_console: true, // console
                drop_debugger: false,
                pure_funcs: ['console.log']// 移除console
              }
            }
          })
        ]
      }
    } else {
      // 为开发环境修改配置...
    }
  },
  css: {
    loaderOptions: {
      css: {
        importLoaders: 1 // @import 引入的文件可被一个loader处理 （2 可被两个loader处理）
      }
    }
  },
  devServer: {
    port: 80,
    disableHostCheck: true, // 可使用本地host配置的域名访问
    proxy: {
      '/api': {
        agent: new ProxyAgent('http://132.128.11.12'),
        target: 'http://132.128.11.12',
        ws: false,
        changeOrigin: true
      }
    }

  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>
