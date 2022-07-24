<template><div><h1 id="自定义参数序列化" tabindex="-1"><a class="header-anchor" href="#自定义参数序列化" aria-hidden="true">#</a> 自定义参数序列化</h1>
<h2 id="需求分析" tabindex="-1"><a class="header-anchor" href="#需求分析" aria-hidden="true">#</a> 需求分析</h2>
<p>在之前的章节，我们对请求的 url 参数做了处理，我们会解析传入的 params 对象，根据一定的规则把它解析成字符串，然后添加在 url 后面。在解析的过程中，我们会对字符串 encode，但是对于一些特殊字符比如 <code v-pre>@</code>、<code v-pre>+</code> 等却不转义，这是 axios 库的默认解析规则。当然，我们也希望自己定义解析规则，于是我们希望 <code v-pre>ts-axios</code> 能在请求配置中允许我们配置一个 <code v-pre>paramsSerializer</code> 函数来自定义参数的解析规则，该函数接受 <code v-pre>params</code> 参数，返回值作为解析后的结果，如下：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>axios.get('/more/get', {
  params: {
    a: 1,
    b: 2,
    c: ['a', 'b', 'c']
  },
  paramsSerializer(params) {
    return qs.stringify(params, { arrayFormat: 'brackets' })
  }
}).then(res =&gt; {
  console.log(res)
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="代码实现" tabindex="-1"><a class="header-anchor" href="#代码实现" aria-hidden="true">#</a> 代码实现</h2>
<p>首先修改一下类型定义。</p>
<p><code v-pre>types/index.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>export interface AxiosRequestConfig {
  // ...
  paramsSerializer?: (params: any) =&gt; string
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后修改 <code v-pre>buildURL</code> 函数的实现。</p>
<p><code v-pre>helpers/url.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>export function buildURL(
  url: string,
  params?: any,
  paramsSerializer?: (params: any) =&gt; string
): string {
  if (!params) {
    return url
  }

  let serializedParams

  if (paramsSerializer) {
    serializedParams = paramsSerializer(params)
  } else if (isURLSearchParams(params)) {
    serializedParams = params.toString()
  } else {
    const parts: string[] = []

    Object.keys(params).forEach(key =&gt; {
      const val = params[key]
      if (val === null || typeof val === 'undefined') {
        return
      }
      let values = []
      if (Array.isArray(val)) {
        values = val
        key += '[]'
      } else {
        values = [val]
      }
      values.forEach(val =&gt; {
        if (isDate(val)) {
          val = val.toISOString()
        } else if (isPlainObject(val)) {
          val = JSON.stringify(val)
        }
        parts.push(`${encode(key)}=${encode(val)}`)
      })
    })

    serializedParams = parts.join('&amp;')
  }

  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }

    url += (url.indexOf('?') === -1 ? '?' : '&amp;') + serializedParams
  }

  return url
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里我们给 <code v-pre>buildURL</code> 函数新增了 <code v-pre>paramsSerializer</code> 可选参数，另外我们还新增了对 <code v-pre>params</code> 类型判断，如果它是一个 <code v-pre>URLSearchParams</code> 对象实例的话，我们直接返回它 <code v-pre>toString</code> 后的结果。</p>
<p><code v-pre>helpers/util.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>export function isURLSearchParams(val: any): val is URLSearchParams {
  return typeof val !== 'undefined' &amp;&amp; val instanceof URLSearchParams
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后我们要修改 <code v-pre>buildURL</code> 调用的逻辑。</p>
<p><code v-pre>core/dispatchRequest.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>function transformURL(config: AxiosRequestConfig): string {
  const { url, params, paramsSerializer } = config
  return buildURL(url!, params, paramsSerializer)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="demo-编写" tabindex="-1"><a class="header-anchor" href="#demo-编写" aria-hidden="true">#</a> demo 编写</h2>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>axios.get('/more/get', {
  params: new URLSearchParams('a=b&amp;c=d')
}).then(res =&gt; {
  console.log(res)
})

axios.get('/more/get', {
  params: {
    a: 1,
    b: 2,
    c: ['a', 'b', 'c']
  }
}).then(res =&gt; {
  console.log(res)
})

const instance = axios.create({
  paramsSerializer(params) {
    return qs.stringify(params, { arrayFormat: 'brackets' })
  }
})

instance.get('/more/get', {
  params: {
    a: 1,
    b: 2,
    c: ['a', 'b', 'c']
  }
}).then(res =&gt; {
  console.log(res)
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们编写了 3 种情况的请求，第一种满足请求的 params 参数是 <code v-pre>URLSearchParams</code> 对象类型的。后两种请求的结果主要区别在于前者并没有对 <code v-pre>[]</code> 转义，而后者会转义。</p>
<p>至此，<code v-pre>ts-axios</code> 实现了自定义参数序列化功能，用户可以配置 <code v-pre>paramsSerializer</code> 自定义参数序列化规则。下一节课我们来实现 <code v-pre>ts-axios</code> 对 <code v-pre>baseURL</code> 的支持。</p>
</div></template>
