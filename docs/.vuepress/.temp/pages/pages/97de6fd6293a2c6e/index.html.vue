<template><div><h1 id="拦截器模块单元测试" tabindex="-1"><a class="header-anchor" href="#拦截器模块单元测试" aria-hidden="true">#</a> 拦截器模块单元测试</h1>
<p>拦截器是 <code v-pre>ts-axios</code> 库一个非常实用的功能，接下来我们来编写它的测试代码。</p>
<h2 id="测试代码编写" tabindex="-1"><a class="header-anchor" href="#测试代码编写" aria-hidden="true">#</a> 测试代码编写</h2>
<p><code v-pre>test/interceptor.spec.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>import axios, { AxiosRequestConfig, AxiosResponse } from '../src/index'
import { getAjaxRequest } from './helper'

describe('interceptors', () =&gt; {
  beforeEach(() =&gt; {
    jasmine.Ajax.install()
  })

  afterEach(() =&gt; {
    jasmine.Ajax.uninstall()
  })

  test('should add a request interceptor', () =&gt; {
    const instance = axios.create()

    instance.interceptors.request.use((config: AxiosRequestConfig) =&gt; {
      config.headers.test = 'added by interceptor'
      return config
    })

    instance('/foo')

    return getAjaxRequest().then(request =&gt; {
      expect(request.requestHeaders.test).toBe('added by interceptor')
    })
  })

  test('should add a request interceptor that returns a new config object', () =&gt; {
    const instance = axios.create()

    instance.interceptors.request.use(() =&gt; {
      return {
        url: '/bar',
        method: 'post'
      }
    })

    instance('/foo')

    return getAjaxRequest().then(request =&gt; {
      expect(request.method).toBe('POST')
      expect(request.url).toBe('/bar')
    })
  })

  test('should add a request interceptor that returns a promise', done =&gt; {
    const instance = axios.create()

    instance.interceptors.request.use((config: AxiosRequestConfig) =&gt; {
      return new Promise(resolve =&gt; {
        setTimeout(() =&gt; {
          config.headers.async = 'promise'
          resolve(config)
        }, 10)
      })
    })

    instance('/foo')

    setTimeout(() =&gt; {
      getAjaxRequest().then(request =&gt; {
        expect(request.requestHeaders.async).toBe('promise')
        done()
      })
    }, 100)
  })

  test('should add multiple request interceptors', () =&gt; {
    const instance = axios.create()

    instance.interceptors.request.use(config =&gt; {
      config.headers.test1 = '1'
      return config
    })
    instance.interceptors.request.use(config =&gt; {
      config.headers.test2 = '2'
      return config
    })
    instance.interceptors.request.use(config =&gt; {
      config.headers.test3 = '3'
      return config
    })

    instance('/foo')

    return getAjaxRequest().then(request =&gt; {
      expect(request.requestHeaders.test1).toBe('1')
      expect(request.requestHeaders.test2).toBe('2')
      expect(request.requestHeaders.test3).toBe('3')
    })
  })

  test('should add a response interceptor', done =&gt; {
    let response: AxiosResponse
    const instance = axios.create()

    instance.interceptors.response.use(data =&gt; {
      data.data = data.data + ' - modified by interceptor'
      return data
    })

    instance('/foo').then(data =&gt; {
      response = data
    })

    getAjaxRequest().then(request =&gt; {
      request.respondWith({
        status: 200,
        responseText: 'OK'
      })

      setTimeout(() =&gt; {
        expect(response.data).toBe('OK - modified by interceptor')
        done()
      }, 100)
    })
  })

  test('should add a response interceptor that returns a new data object', done =&gt; {
    let response: AxiosResponse
    const instance = axios.create()

    instance.interceptors.response.use(() =&gt; {
      return {
        data: 'stuff',
        headers: null,
        status: 500,
        statusText: 'ERR',
        request: null,
        config: {}
      }
    })

    instance('/foo').then(res =&gt; {
      response = res
    })

    getAjaxRequest().then(request =&gt; {
      request.respondWith({
        status: 200,
        responseText: 'OK'
      })

      setTimeout(() =&gt; {
        expect(response.data).toBe('stuff')
        expect(response.headers).toBeNull()
        expect(response.status).toBe(500)
        expect(response.statusText).toBe('ERR')
        expect(response.request).toBeNull()
        expect(response.config).toEqual({})
        done()
      }, 100)
    })
  })

  test('should add a response interceptor that returns a promise', done =&gt; {
    let response: AxiosResponse
    const instance = axios.create()

    instance.interceptors.response.use(data =&gt; {
      return new Promise(resolve =&gt; {
        // do something async
        setTimeout(() =&gt; {
          data.data = 'you have been promised!'
          resolve(data)
        }, 10)
      })
    })

    instance('/foo').then(res =&gt; {
      response = res
    })

    getAjaxRequest().then(request =&gt; {
      request.respondWith({
        status: 200,
        responseText: 'OK'
      })

      setTimeout(() =&gt; {
        expect(response.data).toBe('you have been promised!')
        done()
      }, 100)
    })
  })

  test('should add multiple response interceptors', done =&gt; {
    let response: AxiosResponse
    const instance = axios.create()

    instance.interceptors.response.use(data =&gt; {
      data.data = data.data + '1'
      return data
    })
    instance.interceptors.response.use(data =&gt; {
      data.data = data.data + '2'
      return data
    })
    instance.interceptors.response.use(data =&gt; {
      data.data = data.data + '3'
      return data
    })

    instance('/foo').then(data =&gt; {
      response = data
    })

    getAjaxRequest().then(request =&gt; {
      request.respondWith({
        status: 200,
        responseText: 'OK'
      })

      setTimeout(() =&gt; {
        expect(response.data).toBe('OK123')
        done()
      }, 100)
    })
  })

  test('should allow removing interceptors', done =&gt; {
    let response: AxiosResponse
    let intercept
    const instance = axios.create()

    instance.interceptors.response.use(data =&gt; {
      data.data = data.data + '1'
      return data
    })
    intercept = instance.interceptors.response.use(data =&gt; {
      data.data = data.data + '2'
      return data
    })
    instance.interceptors.response.use(data =&gt; {
      data.data = data.data + '3'
      return data
    })

    instance.interceptors.response.eject(intercept)
    instance.interceptors.response.eject(5)

    instance('/foo').then(data =&gt; {
      response = data
    })

    getAjaxRequest().then(request =&gt; {
      request.respondWith({
        status: 200,
        responseText: 'OK'
      })

      setTimeout(() =&gt; {
        expect(response.data).toBe('OK13')
        done()
      }, 100)
    })
  })
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行测试后我们发现在测试用例 <code v-pre>should add a request interceptor that returns a new config object</code> 报错了，是代码运行的报错，而不是测试期望结果的报错，顺着报错信息，我们可以找到报错原因。</p>
<p>在 <code v-pre>core/xhr.ts</code> 中，执行到 <code v-pre>processHeaders</code> 中的 <code v-pre>Object.keys(headers).forEach</code> 代码报错，因为我们在拦截器对请求配置做了修改，导致 <code v-pre>headers</code> 为空，所以报错。</p>
<p>于是我们在解构赋值 <code v-pre>headers</code> 的时候，给它添加默认值即可。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>const {
  // ...
  headers = {}
} = config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再次运行测试，发现全部测试通过。</p>
<p>至此，我们完成了 <code v-pre>ts-axios</code> 库对拦截器模块的单元测试，下节课我们来测试 <code v-pre>mergeConfig</code> 模块的业务逻辑。</p>
</div></template>
