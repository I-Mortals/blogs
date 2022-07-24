<template><div><h1 id="请求模块单元测试" tabindex="-1"><a class="header-anchor" href="#请求模块单元测试" aria-hidden="true">#</a> 请求模块单元测试</h1>
<p>请求模块是 axios 最基础的模块，通过一个 axios 方法发送 Ajax 请求。</p>
<h2 id="jasmine-ajax" tabindex="-1"><a class="header-anchor" href="#jasmine-ajax" aria-hidden="true">#</a> jasmine-ajax</h2>
<p><a href="https://jasmine.github.io/pages/getting_started.html" target="_blank" rel="noopener noreferrer">Jasmine</a> 是一个 BDD(行为驱动开发)的测试框架，它有很多成熟的插件，比如我们要用到的 <a href="https://github.com/jasmine/jasmine-ajax" target="_blank" rel="noopener noreferrer"><code v-pre>jasmine-ajax</code></a>，它会为我们发出的 Ajax 请求根据规范定义一组假的响应，并跟踪我们发出的Ajax请求，可以让我们方便的为结果做断言。</p>
<p>其实 Jest 也可以去写插件，但并没有现成的 Ajax 相关的 Jest 插件，但是 Jest 测试中我们仍然可以使用 Jasmine 相关的插件，只需要做一些小小的配置即可。</p>
<p>当然，未来我也会考虑去编写一个 Ajax 相关的 Jest 插件，目前我们仍然使用 <code v-pre>jasmine-ajax</code> 去配合我们编写测试。</p>
<p><code v-pre>jasmine-ajax</code> 依赖 <code v-pre>jasmine-core</code>，因此首先我们要安装几个依赖包，<code v-pre>jasmine-ajax</code>、<code v-pre>jasmine-core</code> 和 <code v-pre>@types/jasmine-ajax</code>。</p>
<p>这个时候我们需要去修改 <code v-pre>test/boot.ts</code> 文件，因为每次跑具体测试代码之前会先运行该文件，我们可以在这里去初始化 <code v-pre>jasmine-ajax</code>。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>const JasmineCore = require('jasmine-core')
// @ts-ignore
global.getJasmineRequireObj = function() {
  return JasmineCore
}
require('jasmine-ajax')
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里为了让 <code v-pre>jasmine-ajax</code> 插件运行成功，我们需要手动添加全局的 <code v-pre>getJasmineRequireObj</code> 方法，参考 <a href="https://github.com/jasmine/jasmine-ajax/issues/178" target="_blank" rel="noopener noreferrer">issue</a>。</p>
<p>接下来，我们就开始编写请求模块的单元测试。</p>
<h2 id="测试代码编写" tabindex="-1"><a class="header-anchor" href="#测试代码编写" aria-hidden="true">#</a> 测试代码编写</h2>
<p><code v-pre>test/requests.spec.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>import axios, { AxiosResponse, AxiosError } from '../src/index'
import { getAjaxRequest } from './helper'

describe('requests', () =&gt; {
  beforeEach(() =&gt; {
    jasmine.Ajax.install()
  })

  afterEach(() =&gt; {
    jasmine.Ajax.uninstall()
  })

  test('should treat single string arg as url', () =&gt; {
    axios('/foo')

    return getAjaxRequest().then(request =&gt; {
      expect(request.url).toBe('/foo')
      expect(request.method).toBe('GET')
    })
  })

  test('should treat method value as lowercase string', done =&gt; {
    axios({
      url: '/foo',
      method: 'POST'
    }).then(response =&gt; {
      expect(response.config.method).toBe('post')
      done()
    })

    getAjaxRequest().then(request =&gt; {
      request.respondWith({
        status: 200
      })
    })
  })

  test('should reject on network errors', done =&gt; {
    const resolveSpy = jest.fn((res: AxiosResponse) =&gt; {
      return res
    })

    const rejectSpy = jest.fn((e: AxiosError) =&gt; {
      return e
    })

    jasmine.Ajax.uninstall()

    axios('/foo')
      .then(resolveSpy)
      .catch(rejectSpy)
      .then(next)

    function next(reason: AxiosResponse | AxiosError) {
      expect(resolveSpy).not.toHaveBeenCalled()
      expect(rejectSpy).toHaveBeenCalled()
      expect(reason instanceof Error).toBeTruthy()
      expect((reason as AxiosError).message).toBe('Network Error')
      expect(reason.request).toEqual(expect.any(XMLHttpRequest))

      jasmine.Ajax.install()

      done()
    }
  })

  test('should reject when request timeout', done =&gt; {
    let err: AxiosError

    axios('/foo', {
      timeout: 2000,
      method: 'post'
    }).catch(error =&gt; {
      err = error
    })

    getAjaxRequest().then(request =&gt; {
      // @ts-ignore
      request.eventBus.trigger('timeout')

      setTimeout(() =&gt; {
        expect(err instanceof Error).toBeTruthy()
        expect(err.message).toBe('Timeout of 2000 ms exceeded')
        done()
      }, 100)
    })
  })

  test('should reject when validateStatus returns false', done =&gt; {
    const resolveSpy = jest.fn((res: AxiosResponse) =&gt; {
      return res
    })

    const rejectSpy = jest.fn((e: AxiosError) =&gt; {
      return e
    })

    axios('/foo', {
      validateStatus(status) {
        return status !== 500
      }
    })
      .then(resolveSpy)
      .catch(rejectSpy)
      .then(next)

    getAjaxRequest().then(request =&gt; {
      request.respondWith({
        status: 500
      })
    })

    function next(reason: AxiosError | AxiosResponse) {
      expect(resolveSpy).not.toHaveBeenCalled()
      expect(rejectSpy).toHaveBeenCalled()
      expect(reason instanceof Error).toBeTruthy()
      expect((reason as AxiosError).message).toBe('Request failed with status code 500')
      expect((reason as AxiosError).response!.status).toBe(500)

      done()
    }
  })

  test('should resolve when validateStatus returns true', done =&gt; {
    const resolveSpy = jest.fn((res: AxiosResponse) =&gt; {
      return res
    })

    const rejectSpy = jest.fn((e: AxiosError) =&gt; {
      return e
    })

    axios('/foo', {
      validateStatus(status) {
        return status === 500
      }
    })
      .then(resolveSpy)
      .catch(rejectSpy)
      .then(next)

    getAjaxRequest().then(request =&gt; {
      request.respondWith({
        status: 500
      })
    })

    function next(res: AxiosResponse | AxiosError) {
      expect(resolveSpy).toHaveBeenCalled()
      expect(rejectSpy).not.toHaveBeenCalled()
      expect(res.config.url).toBe('/foo')

      done()
    }
  })

  test('should return JSON when resolved', done =&gt; {
    let response: AxiosResponse

    axios('/api/account/signup', {
      auth: {
        username: '',
        password: ''
      },
      method: 'post',
      headers: {
        Accept: 'application/json'
      }
    }).then(res =&gt; {
      response = res
    })

    getAjaxRequest().then(request =&gt; {
      request.respondWith({
        status: 200,
        statusText: 'OK',
        responseText: '{&quot;a&quot;: 1}'
      })

      setTimeout(() =&gt; {
        expect(response.data).toEqual({ a: 1 })
        done()
      }, 100)
    })
  })

  test('should return JSON when rejecting', done =&gt; {
    let response: AxiosResponse

    axios('/api/account/signup', {
      auth: {
        username: '',
        password: ''
      },
      method: 'post',
      headers: {
        Accept: 'application/json'
      }
    }).catch(error =&gt; {
      response = error.response
    })

    getAjaxRequest().then(request =&gt; {
      request.respondWith({
        status: 400,
        statusText: 'Bad Request',
        responseText: '{&quot;error&quot;: &quot;BAD USERNAME&quot;, &quot;code&quot;: 1}'
      })

      setTimeout(() =&gt; {
        expect(typeof response.data).toBe('object')
        expect(response.data.error).toBe('BAD USERNAME')
        expect(response.data.code).toBe(1)
        done()
      }, 100)
    })
  })

  test('should supply correct response', done =&gt; {
    let response: AxiosResponse

    axios.post('/foo').then(res =&gt; {
      response = res
    })

    getAjaxRequest().then(request =&gt; {
      request.respondWith({
        status: 200,
        statusText: 'OK',
        responseText: '{&quot;foo&quot;: &quot;bar&quot;}',
        responseHeaders: {
          'Content-Type': 'application/json'
        }
      })

      setTimeout(() =&gt; {
        expect(response.data.foo).toBe('bar')
        expect(response.status).toBe(200)
        expect(response.statusText).toBe('OK')
        expect(response.headers['content-type']).toBe('application/json')
        done()
      }, 100)
    })
  })

  test('should allow overriding Content-Type header case-insensitive', () =&gt; {
    let response: AxiosResponse

    axios
      .post(
        '/foo',
        { prop: 'value' },
        {
          headers: {
            'content-type': 'application/json'
          }
        }
      )
      .then(res =&gt; {
        response = res
      })

    return getAjaxRequest().then(request =&gt; {
      expect(request.requestHeaders['Content-Type']).toBe('application/json')
    })
  })
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们要注意的一些点，在这里列出：</p>
<ul>
<li>beforeEach &amp; afterEach</li>
</ul>
<p><a href="https://jestjs.io/docs/en/api#beforeeachfn-timeout" target="_blank" rel="noopener noreferrer">beforeEach</a>表示每个测试用例运行前的钩子函数，在这里我们执行 <code v-pre>jasmine.Ajax.install()</code> 安装 <code v-pre>jasmine.Ajax</code>。</p>
<p><a href="https://jestjs.io/docs/en/api#aftereachfn-timeout" target="_blank" rel="noopener noreferrer">afterEach</a>表示每个测试用例运行后的钩子函数，在这里我们执行 <code v-pre>jasmine.Ajax.uninstall()</code> 卸载 <code v-pre>jasmine.Ajax</code>。</p>
<ul>
<li><code v-pre>getAjaxRequest</code></li>
</ul>
<p><code v-pre>getAjaxRequest</code> 是我们在 <code v-pre>test/helper.ts</code> 定义的一个辅助方法，通过 <code v-pre>jasmine.Ajax.requests.mostRecent()</code> 拿到最近一次请求的 <code v-pre>request</code> 对象，这个 <code v-pre>request</code> 对象是 <code v-pre>jasmine-ajax</code> 库伪造的 <code v-pre>xhr</code> 对象，它模拟了 <code v-pre>xhr</code> 对象上的方法，并且提供一些 <code v-pre>api</code> 让我们使用，比如 <code v-pre>request.respondWith</code> 方法返回一个响应。</p>
<ul>
<li>异步测试</li>
</ul>
<p>注意到我们这里大部分的测试用例不再是同步的代码了，几乎都是一些异步逻辑，Jest 非常好地支持<a href="https://jestjs.io/docs/en/asynchronous" target="_blank" rel="noopener noreferrer">异步测试代码</a>。通常有 2 种解决方案。</p>
<p>第一种是利用 <code v-pre>done</code> 参数，每个测试用例函数有一个 <code v-pre>done</code> 参数，一旦我们使用了该参数，只有当 <code v-pre>done</code> 函数执行的时候表示这个测试用例结束。</p>
<p>第二种是我们的测试函数返回一个 Promise 对象，一旦这个 Promise 对象 <code v-pre>resolve</code> 了，表示这个测试结束。</p>
<ul>
<li>expect.any(constructor)</li>
</ul>
<p>它表示匹配任意由 <code v-pre>constructor</code> 创建的对象实例。</p>
<ul>
<li><code v-pre>request.eventBus.trigger</code></li>
</ul>
<p>由于 <code v-pre>request.responseTimeout</code> 方法内部依赖了 <code v-pre>jasmine.clock</code> 方法会导致运行失败，这里我直接用了 <code v-pre>request.eventBus.trigger('timeout')</code> 方法触发了 <code v-pre>timeout</code> 事件。因为这个方法不在接口定义中，所以需要加 <code v-pre>// @ts-ignore</code>。</p>
<p>另外，我们在测试中发现 2 个 case 没有通过。</p>
<p>第一个是 <code v-pre>should treat method value as lowercase string</code>，这个测试用例是我们发送请求的 <code v-pre> method</code> 需要转换成小写字符串，这么做的目的也是为了之后 <code v-pre>flattenHeaders</code> 能正常处理这些 <code v-pre>method</code>，所以我们需要修改源码逻辑。</p>
<p><code v-pre>core/Axios.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }

    config = mergeConfig(this.defaults, config)
    config.method = config.method.toLowerCase()

    // ...
  }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在合并配置后，我们需要把 <code v-pre>config.method</code> 转成小写字符串。</p>
<p>另一个是 <code v-pre>should return JSON when rejecting</code>，这个测试用例是当我们发送请求失败后，也能把响应数据转换成 JSON 格式，所以也需要修改源码逻辑。</p>
<p><code v-pre>core/dispatchRequest.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config).then(
    res =&gt; {
      return transformResponseData(res)
    },
    e =&gt; {
      if (e &amp;&amp; e.response) {
        e.response = transformResponseData(e.response)
      }
      return Promise.reject(e)
    }
  )
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除了对正常情况的响应数据做转换，我们也需要对异常情况的响应数据做转换。</p>
<p>至此我们完成了 <code v-pre>ts-axios</code> 库对请求模块的测试，下一节课我们会从业务的角度来测试 <code v-pre>headers</code> 模块。</p>
</div></template>
