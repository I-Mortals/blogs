<template><div><h1 id="axios-实例模块单元测试" tabindex="-1"><a class="header-anchor" href="#axios-实例模块单元测试" aria-hidden="true">#</a> Axios 实例模块单元测试</h1>
<p><code v-pre>ts-axios</code> 提供了 <code v-pre>axios.create</code> 静态方法，返回一个 <code v-pre>instance</code> 实例，我们需要对这个模块做测试。</p>
<h2 id="测试代码编写" tabindex="-1"><a class="header-anchor" href="#测试代码编写" aria-hidden="true">#</a> 测试代码编写</h2>
<p><code v-pre>test/instance.spec.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>import axios, { AxiosRequestConfig, AxiosResponse } from '../src/index'
import { getAjaxRequest } from './helper'

describe('instance', () =&gt; {
  beforeEach(() =&gt; {
    jasmine.Ajax.install()
  })

  afterEach(() =&gt; {
    jasmine.Ajax.uninstall()
  })

  test('should make a http request without verb helper', () =&gt; {
    const instance = axios.create()

    instance('/foo')

    return getAjaxRequest().then(request =&gt; {
      expect(request.url).toBe('/foo')
    })
  })

  test('should make a http request', () =&gt; {
    const instance = axios.create()

    instance.get('/foo')

    return getAjaxRequest().then(request =&gt; {
      expect(request.url).toBe('/foo')
      expect(request.method).toBe('GET')
    })
  })

  test('should make a post request', () =&gt; {
    const instance = axios.create()

    instance.post('/foo')

    return getAjaxRequest().then(request =&gt; {
      expect(request.method).toBe('POST')
    })
  })

  test('should make a put request', () =&gt; {
    const instance = axios.create()

    instance.put('/foo')

    return getAjaxRequest().then(request =&gt; {
      expect(request.method).toBe('PUT')
    })
  })

  test('should make a patch request', () =&gt; {
    const instance = axios.create()

    instance.patch('/foo')

    return getAjaxRequest().then(request =&gt; {
      expect(request.method).toBe('PATCH')
    })
  })

  test('should make a options request', () =&gt; {
    const instance = axios.create()

    instance.options('/foo')

    return getAjaxRequest().then(request =&gt; {
      expect(request.method).toBe('OPTIONS')
    })
  })

  test('should make a delete request', () =&gt; {
    const instance = axios.create()

    instance.delete('/foo')

    return getAjaxRequest().then(request =&gt; {
      expect(request.method).toBe('DELETE')
    })
  })

  test('should make a head request', () =&gt; {
    const instance = axios.create()

    instance.head('/foo')

    return getAjaxRequest().then(request =&gt; {
      expect(request.method).toBe('HEAD')
    })
  })

  test('should use instance options', () =&gt; {
    const instance = axios.create({ timeout: 1000 })

    instance.get('/foo')

    return getAjaxRequest().then(request =&gt; {
      expect(request.timeout).toBe(1000)
    })
  })

  test('should have defaults.headers', () =&gt; {
    const instance = axios.create({ baseURL: 'https://api.example.com' })

    expect(typeof instance.defaults.headers).toBe('object')
    expect(typeof instance.defaults.headers.common).toBe('object')
  })

  test('should have interceptors on the instance', done =&gt; {
    axios.interceptors.request.use(config =&gt; {
      config.timeout = 2000
      return config
    })

    const instance = axios.create()

    instance.interceptors.request.use(config =&gt; {
      config.withCredentials = true
      return config
    })

    let response: AxiosResponse
    instance.get('/foo').then(res =&gt; {
      response = res
    })

    getAjaxRequest().then(request =&gt; {
      request.respondWith({
        status: 200
      })

      setTimeout(() =&gt; {
        expect(response.config.timeout).toEqual(0)
        expect(response.config.withCredentials).toEqual(true)
        done()
      }, 100)
    })
  })

  test('should get the computed uri', () =&gt; {
    const fakeConfig: AxiosRequestConfig = {
      baseURL: 'https://www.baidu.com/',
      url: '/user/12345',
      params: {
        idClient: 1,
        idTest: 2,
        testString: 'thisIsATest'
      }
    }
    expect(axios.getUri(fakeConfig)).toBe(
      'https://www.baidu.com/user/12345?idClient=1&amp;idTest=2&amp;testString=thisIsATest'
    )
  })
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>至此我们完成了 <code v-pre>ts-axios</code> 库 <code v-pre>Axios</code> 实例模块相关业务逻辑的测试，下一节课我们会对拦截器模块做测试。</p>
</div></template>
