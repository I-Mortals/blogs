<template><div><h1 id="上传和下载的进度监控" tabindex="-1"><a class="header-anchor" href="#上传和下载的进度监控" aria-hidden="true">#</a> 上传和下载的进度监控</h1>
<h2 id="需求分析" tabindex="-1"><a class="header-anchor" href="#需求分析" aria-hidden="true">#</a> 需求分析</h2>
<p>有些时候，当我们上传文件或者是请求一个大体积数据的时候，希望知道实时的进度，甚至可以基于此做一个进度条的展示。</p>
<p>我们希望给 <code v-pre>axios</code> 的请求配置提供 <code v-pre>onDownloadProgress</code> 和 <code v-pre>onUploadProgress</code> 2 个函数属性，用户可以通过这俩函数实现对下载进度和上传进度的监控。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>axios.get('/more/get',{
  onDownloadProgress(progressEvent) {
    // 监听下载进度
  }
})

axios.post('/more/post',{
  onUploadProgress(progressEvent) {
    // 监听上传进度
  }
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>xhr</code> 对象提供了一个 <a href="https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/progress_event" target="_blank" rel="noopener noreferrer"><code v-pre>progress</code></a> 事件，我们可以监听此事件对数据的下载进度做监控；另外，<a href="https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/upload" target="_blank" rel="noopener noreferrer"><code v-pre>xhr.uplaod</code></a> 对象也提供了 <a href="https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/progress_event" target="_blank" rel="noopener noreferrer"><code v-pre>progress</code></a> 事件，我们可以基于此对上传进度做监控。</p>
<h2 id="代码实现" tabindex="-1"><a class="header-anchor" href="#代码实现" aria-hidden="true">#</a> 代码实现</h2>
<p>首先修改一下类型定义。</p>
<p><code v-pre>types/index.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>export interface AxiosRequestConfig {
  // ...
  onDownloadProgress?: (e: ProgressEvent) =&gt; void
  onUploadProgress?: (e: ProgressEvent) =&gt; void
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着在发送请求前，给 <code v-pre>xhr</code> 对象添加属性。</p>
<p><code v-pre>core/xhr.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>const {
  /*...*/
  onDownloadProgress,
  onUploadProgress
} = config

if (onDownloadProgress) {
  request.onprogress = onDownloadProgress
}

if (onUploadProgress) {
  request.upload.onprogress = onUploadProgress
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外，如果请求的数据是 <code v-pre>FormData</code> 类型，我们应该主动删除请求 <code v-pre>headers</code> 中的 <code v-pre>Content-Type</code> 字段，让浏览器自动根据请求数据设置 <code v-pre>Content-Type</code>。比如当我们通过 <code v-pre>FormData</code> 上传文件的时候，浏览器会把请求 <code v-pre>headers</code> 中的 <code v-pre>Content-Type</code> 设置为 <code v-pre>multipart/form-data</code>。</p>
<p>我们先添加一个判断 <code v-pre>FormData</code> 的方法。</p>
<p><code v-pre>helpers/util.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>export function isFormData(val: any): boolean {
  return typeof val !== 'undefined' &amp;&amp; val instanceof FormData
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后再添加相关逻辑。</p>
<p><code v-pre>core/xhr.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>if (isFormData(data)) {
  delete headers['Content-Type']
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们发现，<code v-pre>xhr</code> 函数内部随着需求越来越多，代码也越来越臃肿，我们可以把逻辑梳理一下，把内部代码做一层封装优化。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) =&gt; {
    const {
      data = null,
      url,
      method = 'get',
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress
    } = config

    const request = new XMLHttpRequest()

    request.open(method.toUpperCase(), url!, true)

    configureRequest()

    addEvents()

    processHeaders()

    processCancel()

    request.send(data)

    function configureRequest(): void {
      if (responseType) {
        request.responseType = responseType
      }

      if (timeout) {
        request.timeout = timeout
      }

      if (withCredentials) {
        request.withCredentials = withCredentials
      }
    }

    function addEvents(): void {
      request.onreadystatechange = function handleLoad() {
        if (request.readyState !== 4) {
          return
        }

        if (request.status === 0) {
          return
        }

        const responseHeaders = parseHeaders(request.getAllResponseHeaders())
        const responseData =
          responseType &amp;&amp; responseType !== 'text' ? request.response : request.responseText
        const response: AxiosResponse = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request
        }
        handleResponse(response)
      }

      request.onerror = function handleError() {
        reject(createError('Network Error', config, null, request))
      }

      request.ontimeout = function handleTimeout() {
        reject(
          createError(`Timeout of ${config.timeout} ms exceeded`, config, 'ECONNABORTED', request)
        )
      }

      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }

      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }
    }

    function processHeaders(): void {
      if (isFormData(data)) {
        delete headers['Content-Type']
      }

      if ((withCredentials || isURLSameOrigin(url!)) &amp;&amp; xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName)
        if (xsrfValue) {
          headers[xsrfHeaderName!] = xsrfValue
        }
      }

      Object.keys(headers).forEach(name =&gt; {
        if (data === null &amp;&amp; name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }

    function processCancel(): void {
      if (cancelToken) {
        cancelToken.promise.then(reason =&gt; {
          request.abort()
          reject(reason)
        })
      }
    }

    function handleResponse(response: AxiosResponse): void {
      if (response.status &gt;= 200 &amp;&amp; response.status &lt; 300) {
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
  })
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们把整个流程分为 7 步：</p>
<ul>
<li>创建一个 <code v-pre>request</code> 实例。</li>
<li>执行 <code v-pre>request.open</code> 方法初始化。</li>
<li>执行 <code v-pre>configureRequest</code> 配置 <code v-pre>request</code> 对象。</li>
<li>执行 <code v-pre>addEvents</code> 给 <code v-pre>request</code> 添加事件处理函数。</li>
<li>执行 <code v-pre>processHeaders</code> 处理请求 <code v-pre>headers</code>。</li>
<li>执行 <code v-pre>processCancel</code> 处理请求取消逻辑。</li>
<li>执行 <code v-pre>request.send</code> 方法发送请求。</li>
</ul>
<p>这样拆分后整个流程就会显得非常清晰，未来我们再去新增需求的时候代码也不会显得越来越臃肿。</p>
<h2 id="demo-编写" tabindex="-1"><a class="header-anchor" href="#demo-编写" aria-hidden="true">#</a> demo 编写</h2>
<p>这节课的 demo 非常有意思，我们第一次给界面上增加了一些交互的按钮。</p>
<p><code v-pre>examples/more/index.html</code></p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
  &lt;meta charset=&quot;utf-8&quot;&gt;
  &lt;title&gt;More example&lt;/title&gt;
  &lt;link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css&quot;/&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;h1&gt;file download&lt;/h1&gt;
&lt;div&gt;
  &lt;button id=&quot;download&quot; class=&quot;btn btn-primary&quot;&gt;Download&lt;/button&gt;
&lt;/div&gt;
&lt;h1&gt;file upload&lt;/h1&gt;
&lt;form role=&quot;form&quot; class=&quot;form&quot; onsubmit=&quot;return false;&quot;&gt;
  &lt;input id=&quot;file&quot; type=&quot;file&quot; class=&quot;form-control&quot;/&gt;
  &lt;button id=&quot;upload&quot; type=&quot;button&quot; class=&quot;btn btn-primary&quot;&gt;Upload&lt;/button&gt;
&lt;/form&gt;

&lt;script src=&quot;/__build__/more.js&quot;&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外，我们为了友好地展示上传和下载进度，我们引入了一个开源库 <a href="https://github.com/rstacruz/nprogress" target="_blank" rel="noopener noreferrer">nprogress</a>，它可以在页面的顶部展示进度条。</p>
<p><code v-pre>examples/more/app.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>const instance = axios.create()

function calculatePercentage(loaded: number, total: number) {
  return Math.floor(loaded * 1.0) / total
}

function loadProgressBar() {
  const setupStartProgress = () =&gt; {
    instance.interceptors.request.use(config =&gt; {
      NProgress.start()
      return config
    })
  }

  const setupUpdateProgress = () =&gt; {
    const update = (e: ProgressEvent) =&gt; {
      console.log(e)
      NProgress.set(calculatePercentage(e.loaded, e.total))
    }
    instance.defaults.onDownloadProgress = update
    instance.defaults.onUploadProgress = update
  }

  const setupStopProgress = () =&gt; {
    instance.interceptors.response.use(response =&gt; {
      NProgress.done()
      return response
    }, error =&gt; {
      NProgress.done()
      return Promise.reject(error)
    })
  }

  setupStartProgress()
  setupUpdateProgress()
  setupStopProgress()
}

loadProgressBar()

const downloadEl = document.getElementById('download')

downloadEl!.addEventListener('click', e =&gt; {
  instance.get('https://img.mukewang.com/5cc01a7b0001a33718720632.jpg')
})

const uploadEl = document.getElementById('upload')

uploadEl!.addEventListener('click', e =&gt; {
  const data = new FormData()
  const fileEl = document.getElementById('file') as HTMLInputElement
  if (fileEl.files) {
    data.append('file', fileEl.files[0])

    instance.post('/more/upload', data)
  }
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于 <code v-pre>progress</code> 事件参数 <code v-pre>e</code>，会有 <code v-pre>e.total</code> 和 <code v-pre>e.loaded</code> 属性，表示进程总体的工作量和已经执行的工作量，我们可以根据这 2 个值算出当前进度，然后通过 <code v-pre>Nprogess.set</code> 设置。另外，我们通过配置请求拦截器和响应拦截器执行 <code v-pre>NProgress.start()</code> 和 <code v-pre>NProgress.done()</code>。</p>
<p>我们给下载按钮绑定了一个 <code v-pre>click</code> 事件，请求一张图片，我们可以看到实时的进度；另外我们也给上传按钮绑定了一个 <code v-pre>click</code> 事件，上传我们选择的文件，同样也能看到实时进度。</p>
<p>在服务端，我们为了处理上传请求，需要下载安装一个 <code v-pre>express</code> 的中间件 <code v-pre>connect-multiparty</code>，然后使用它。</p>
<p><code v-pre>example/server.js</code>：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const multipart = require('connect-multiparty')
app.use(multipart({
  uploadDir: path.resolve(__dirname, 'upload-file')
}))

router.post('/more/upload', function(req, res) {
  console.log(req.body, req.files)
  res.end('upload success!')
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里我们需要在 <code v-pre>examples</code> 目录下创建一个 <code v-pre>upload-file</code> 的空目录，用于存放上传的文件。</p>
<p>通过这个中间件，我们就可以处理上传请求并且可以把上传的文件存储在 <code v-pre>upload-file</code> 目录下。</p>
<p>为了保证代码正常运行，我们还需要在 <code v-pre>examples/webpack.config.js</code> 中添加 <code v-pre>css-loader</code> 和 <code v-pre>css-loader</code>，不要忘记先安装它们。</p>
<p>至此，<code v-pre>ts-axios</code> 支持了上传下载进度事件的回调函数的配置，用户可以通过配置这俩函数实现对下载进度和上传进度的监控。下一节课我们来实现 http 的认证授权功能。</p>
</div></template>
