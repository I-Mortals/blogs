<template><div><h1 id="引用-ts-axios-库" tabindex="-1"><a class="header-anchor" href="#引用-ts-axios-库" aria-hidden="true">#</a> 引用 ts-axios 库</h1>
<h2 id="在-ts-项目中引用" tabindex="-1"><a class="header-anchor" href="#在-ts-项目中引用" aria-hidden="true">#</a> 在 TS 项目中引用</h2>
<p>我们借助于 <a href="https://cli.vuejs.org/" target="_blank" rel="noopener noreferrer">vue-cli</a> 脚手架创建一个 TypeScript 的 Vue 项目，然后我们把 Vue 官网上一段使用 axios 发请求的 <a href="https://cn.vuejs.org/v2/guide/computed.html#%E4%BE%A6%E5%90%AC%E5%99%A8" target="_blank" rel="noopener noreferrer">demo</a> 代码抄过来。</p>
<p>我们需要先执行 <code v-pre>npm install ts-axios-new</code> 安装 <code v-pre>ts-axios</code> 库。</p>
<p><code v-pre>HelloWorld.vue</code></p>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code>&lt;template&gt;
  &lt;div class=&quot;hello&quot;&gt;
    &lt;p&gt;
      Ask a yes/no question:
      &lt;input v-model=&quot;question&quot;&gt;
    &lt;/p&gt;
    &lt;p&gt;{{ answer }}&lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script lang=&quot;ts&quot;&gt;
  import Vue from 'vue'
  import _ from 'lodash'
  import axios from 'ts-axios-new'

  export default Vue.extend({
    name: 'HelloWorld',
    data () {
      return {
        question: '',
        answer: 'I cannot give you an answer until you ask a question!'
      }
    },
    created () {
      this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
    },
    methods: {
      debouncedGetAnswer () {
        // do nothing
      },
      getAnswer () {
        if (this.question.indexOf('?') === -1) {
          this.answer = 'Questions usually contain a question mark. -)'
          return
        }
        this.answer = 'Thinking...'
        const instance = axios.create()
        instance.interceptors.request.use((config) =&gt; {
          config.params = {
            _t: +new Date()
          }
          return config
        })

        instance.get('https://yesno.wtf/api')
          .then((response) =&gt; {
            this.answer = _.capitalize(response.data.answer)
          })
          .catch((error) =&gt; {
            this.answer = 'Error! Could not reach the API. ' + error
          })
      }
    },
    watch: {
      question: function (newQuestion: string, oldQuestion: string) {
        this.answer = 'Waiting for you to stop typing...'
        this.debouncedGetAnswer()
      }
    }
  })
&lt;/script&gt;

&lt;!-- Add &quot;scoped&quot; attribute to limit CSS to this component only --&gt;
&lt;style scoped&gt;
  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
&lt;/style&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码主要是提供了一个 <code v-pre>input</code> 输入框，绑定了 <code v-pre>question</code> 变量，当我们输入的时候，会触发 <code v-pre>question</code> 的变化，执行 <code v-pre>watch question</code> 中的逻辑，执行 <code v-pre>this.debouncedGetAnswer</code> 方法，实际上就是 <code v-pre>debounce</code> 执行了 <code v-pre>getAnswer</code> 方法，发送请求。</p>
<p>我们通过 <code v-pre>import axios from 'ts-axios-new' </code> 去加载 <code v-pre>ts-axios</code> 库，实际上就是引入了 <code v-pre>node_modules/ts-axios-new/dist/axios.es5.js</code>，因为 <code v-pre>ts-axios-new</code> 的 <code v-pre>package.json</code> 文件中配置的 <code v-pre>module</code> 字段是 <code v-pre>dist/axios.es5.js</code>，在 <code v-pre>webpack</code> 中优先 <code v-pre>import</code> 优先会找 <code v-pre>module</code> 字段，其次是 <code v-pre>main</code> 字段。</p>
<blockquote>
<p>小技巧：当我们引入某个库运行时出现问题时候，我们就可以调试 node_modules 中对应引入的代码。</p>
</blockquote>
<p>注意我们这里先使用了 <code v-pre>axios.create()</code> 方法创建了一个 <code v-pre>instance</code>，然后添加了一个请求拦截器，会在每次发送请求前，添加了一个 <code v-pre>_t</code> 参数，值为时间戳。然后执行 <code v-pre>instance.get</code> 发送一个请求。</p>
<p>我们可以看到整个 demo 是可以正常运行的，并且没有任何类型相关的问题，说明我们的库打包后的代码和类型声明文件都是没有问题的。</p>
<h2 id="在-js-项目中引用" tabindex="-1"><a class="header-anchor" href="#在-js-项目中引用" aria-hidden="true">#</a> 在 JS 项目中引用</h2>
<p>我们编写的 TS 库仍然可以被纯 JS 的项目引用，这次我们来修改<a href="https://coding.imooc.com/class/74.html" target="_blank" rel="noopener noreferrer">《Vue.js2.5+cube-ui重构饿了么App》</a>课程的代码，把之前对 <code v-pre>axios</code> 的引用改成对 <code v-pre>ts-axios-new</code> 的引用。课程源码是开源的，所以没购买课程的小伙伴也可以去 <a href="https://github.com/ustbhuangyi/vue-sell" target="_blank" rel="noopener noreferrer">GitHub</a> 下载。</p>
<p>我们需要先执行 <code v-pre>npm install ts-axios-new</code> 安装 <code v-pre>ts-axios</code> 库，然后修改代码。</p>
<p><code v-pre>api/helpers.js</code>：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>import axios from 'ts-axios-new'

const urlMap = {
  development: '/',
  production: 'http://ustbhuangyi.com/sell/'
}
const baseUrl = urlMap[process.env.NODE_ENV]
const ERR_OK = 0

export function get(url) {
  return function(params = {}) {
    return axios.get(baseUrl + url, {
      params
    }).then((res) =&gt; {
      const {errno, data} = res.data
      if (errno === ERR_OK) {
        return data
      }
    }).catch((e) =&gt; {
    })
  }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>只需要把 <code v-pre>import axios from 'axios'</code> 修改为 <code v-pre>import axios from 'ts-axios-new'</code> 即可。</p>
<p>接着运行项目，我们发现项目可以成功运行，因为我们实现了<code v-pre>axios</code> 在浏览器端的所有功能，所以可以放心的做替换。</p>
<p>至此，我们就完成了 <code v-pre>ts-axios</code> 库的开发、测试、编译、发布和引用。课程到这里也就告一段落了，下一章我们会对整个课程做总结与展望。</p>
</div></template>
