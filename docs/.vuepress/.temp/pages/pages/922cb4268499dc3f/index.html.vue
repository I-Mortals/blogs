<template><div><h1 id="处理响应-data" tabindex="-1"><a class="header-anchor" href="#处理响应-data" aria-hidden="true">#</a> 处理响应 data</h1>
<h2 id="需求分析" tabindex="-1"><a class="header-anchor" href="#需求分析" aria-hidden="true">#</a> 需求分析</h2>
<p>在我们不去设置 <code v-pre>responseType</code> 的情况下，当服务端返回给我们的数据是字符串类型，我们可以尝试去把它转换成一个 JSON 对象。例如：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>data: &quot;{&quot;a&quot;:1,&quot;b&quot;:2}&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们把它转换成：</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code>data: {
  a: 1,
  b: 2
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="transformresponse-函数实现及应用" tabindex="-1"><a class="header-anchor" href="#transformresponse-函数实现及应用" aria-hidden="true">#</a> transformResponse 函数实现及应用</h2>
<p>根据需求分析，我们要实现一个 <code v-pre>transformResponse</code> 工具函数。</p>
<p><code v-pre>helpers/data.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // do nothing
    }
  }
  return data
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>index.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then((res) =&gt; {
    return transformResponseData(res)
  })
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着我们再去看刚才的 demo，发现我们已经把响应的 <code v-pre>data</code> 字段从字符串解析成 JSON 对象结构了。</p>
<p>那么至此，我们的 <code v-pre>ts-axios</code> 的基础功能已经实现完毕。不过到目前为止，我们都仅仅实现的是正常情况的逻辑，下面一章我们要处理各种异常情况的逻辑。</p>
</div></template>
