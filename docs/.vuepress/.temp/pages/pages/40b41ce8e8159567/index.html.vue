<template><div><h1 id="自定义合法状态码" tabindex="-1"><a class="header-anchor" href="#自定义合法状态码" aria-hidden="true">#</a> 自定义合法状态码</h1>
<h2 id="需求分析" tabindex="-1"><a class="header-anchor" href="#需求分析" aria-hidden="true">#</a> 需求分析</h2>
<p>之前 <code v-pre>ts-axios</code> 在处理响应结果的时候，认为 HTTP <a href="https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/status" target="_blank" rel="noopener noreferrer">status</a> 在 200 和 300 之间是一个合法值，在这个区间之外则创建一个错误。有些时候我们想自定义这个规则，比如认为 304 也是一个合法的状态码，所以我们希望 <code v-pre>ts-axios</code> 能提供一个配置，允许我们自定义合法状态码规则。如下：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>axios.get('/more/304', {
  validateStatus(status) {
    return status &gt;= 200 &amp;&amp; status &lt; 400
  }
}).then(res =&gt; {
  console.log(res)
}).catch((e: AxiosError) =&gt; {
  console.log(e.message)
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过在请求配置中配置一个 <code v-pre>validateStatus</code> 函数，它可以根据参数 <code v-pre>status</code> 来自定义合法状态码的规则。</p>
<h2 id="代码实现" tabindex="-1"><a class="header-anchor" href="#代码实现" aria-hidden="true">#</a> 代码实现</h2>
<p>首先修改一下类型定义。</p>
<p><code v-pre>types/index.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>export interface AxiosRequestConfig {
  // ...
  validateStatus?: (status: number) =&gt; boolean
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们来修改默认配置规则。</p>
<p><code v-pre>defaults.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>validateStatus(status: number): boolean {
  return status &gt;= 200 &amp;&amp; status &lt; 300
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>添加默认合法状态码的校验规则。然后再请求后对响应数据的处理逻辑。</p>
<p><code v-pre>core/xhr.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>const {
  /*...*/
  validateStatus
} = config

function handleResponse(response: AxiosResponse): void {
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response)
  } else {
    reject(
      createError(
        `Request failed with status code ${response.status}`,
        config,
        null,
        request,
        response
      )
    )
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果没有配置 <code v-pre>validateStatus</code> 以及 <code v-pre>validateStatus</code> 函数返回的值为 true 的时候，都认为是合法的，正常 <code v-pre>resolve(response)</code>，否则都创建一个错误。</p>
<h2 id="demo-编写" tabindex="-1"><a class="header-anchor" href="#demo-编写" aria-hidden="true">#</a> demo 编写</h2>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>axios.get('/more/304').then(res =&gt; {
  console.log(res)
}).catch((e: AxiosError) =&gt; {
  console.log(e.message)
})

axios.get('/more/304', {
  validateStatus(status) {
    return status &gt;= 200 &amp;&amp; status &lt; 400
  }
}).then(res =&gt; {
  console.log(res)
}).catch((e: AxiosError) =&gt; {
  console.log(e.message)
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>server.js</code> 中我们编写了这个路由接口</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>
router.get('/more/304', function(req, res) {
  res.status(304)
  res.end()
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接口返回 304 状态码，对于默认的请求我们会输出一条错误信息。第二个请求中我们配置了自定义合法状态码规则，区间在 200 和 400 之间，这样就不会报错，而是可以正常输出响应对象。</p>
<p>至此 <code v-pre>ts-axios</code> 实现了自定义合法状态码功能，用户可以配置 <code v-pre>validateStatus</code> 自定义合法状态码规则。之前有同学会质疑 <code v-pre>ts-axios</code> 对于请求 <code v-pre>url</code> 参数的序列化处理规则，下一节课我们来实现自定义参数序列化规则功能。</p>
</div></template>
