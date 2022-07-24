<template><div><h1 id="剩余模块单元测试" tabindex="-1"><a class="header-anchor" href="#剩余模块单元测试" aria-hidden="true">#</a> 剩余模块单元测试</h1>
<h2 id="defaults-模块单元测试" tabindex="-1"><a class="header-anchor" href="#defaults-模块单元测试" aria-hidden="true">#</a> defaults 模块单元测试</h2>
<p><code v-pre>defaults</code> 模块为请求配置提供了一些默认的属性和方法，我们需要为其编写单元测试。</p>
<p><code v-pre>test/defaults.spec.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>import axios, { AxiosTransformer } from '../src/index'
import { getAjaxRequest } from './helper'
import { deepMerge } from '../src/helpers/util'

describe('defaults', () =&gt; {
  beforeEach(() =&gt; {
    jasmine.Ajax.install()
  })

  afterEach(() =&gt; {
    jasmine.Ajax.uninstall()
  })

  test('should transform request json', () =&gt; {
    expect((axios.defaults.transformRequest as AxiosTransformer[])[0]({ foo: 'bar' })).toBe('{&quot;foo&quot;:&quot;bar&quot;}')
  })

  test('should do nothing to request string', () =&gt; {
    expect((axios.defaults.transformRequest as AxiosTransformer[])[0]('foo=bar')).toBe('foo=bar')
  })

  test('should transform response json', () =&gt; {
    const data = (axios.defaults.transformResponse as AxiosTransformer[])[0]('{&quot;foo&quot;:&quot;bar&quot;}')

    expect(typeof data).toBe('object')
    expect(data.foo).toBe('bar')
  })

  test('should do nothing to response string', () =&gt; {
    expect((axios.defaults.transformResponse as AxiosTransformer[])[0]('foo=bar')).toBe('foo=bar')
  })

  test('should use global defaults config', () =&gt; {
    axios('/foo')

    return getAjaxRequest().then(request =&gt; {
      expect(request.url).toBe('/foo')
    })
  })

  test('should use modified defaults config', () =&gt; {
    axios.defaults.baseURL = 'http://example.com/'

    axios('/foo')

    return getAjaxRequest().then(request =&gt; {
      expect(request.url).toBe('http://example.com/foo')
      delete axios.defaults.baseURL
    })
  })

  test('should use request config', () =&gt; {
    axios('/foo', {
      baseURL: 'http://www.example.com'
    })

    return getAjaxRequest().then(request =&gt; {
      expect(request.url).toBe('http://www.example.com/foo')
    })
  })

  test('should use default config for custom instance', () =&gt; {
    const instance = axios.create({
      xsrfCookieName: 'CUSTOM-XSRF-TOKEN',
      xsrfHeaderName: 'X-CUSTOM-XSRF-TOKEN'
    })
    document.cookie = instance.defaults.xsrfCookieName + '=foobarbaz'

    instance.get('/foo')

    return getAjaxRequest().then(request =&gt; {
      expect(request.requestHeaders[instance.defaults.xsrfHeaderName!]).toBe('foobarbaz')
      document.cookie =
        instance.defaults.xsrfCookieName +
        '=;expires=' +
        new Date(Date.now() - 86400000).toUTCString()
    })
  })

  test('should use GET headers', () =&gt; {
    axios.defaults.headers.get['X-CUSTOM-HEADER'] = 'foo'
    axios.get('/foo')

    return getAjaxRequest().then(request =&gt; {
      expect(request.requestHeaders['X-CUSTOM-HEADER']).toBe('foo')
      delete axios.defaults.headers.get['X-CUSTOM-HEADER']
    })
  })

  test('should use POST headers', () =&gt; {
    axios.defaults.headers.post['X-CUSTOM-HEADER'] = 'foo'
    axios.post('/foo', {})

    return getAjaxRequest().then(request =&gt; {
      expect(request.requestHeaders['X-CUSTOM-HEADER']).toBe('foo')
      delete axios.defaults.headers.post['X-CUSTOM-HEADER']
    })
  })

  test('should use header config', () =&gt; {
    const instance = axios.create({
      headers: {
        common: {
          'X-COMMON-HEADER': 'commonHeaderValue'
        },
        get: {
          'X-GET-HEADER': 'getHeaderValue'
        },
        post: {
          'X-POST-HEADER': 'postHeaderValue'
        }
      }
    })

    instance.get('/foo', {
      headers: {
        'X-FOO-HEADER': 'fooHeaderValue',
        'X-BAR-HEADER': 'barHeaderValue'
      }
    })

    return getAjaxRequest().then(request =&gt; {
      expect(request.requestHeaders).toEqual(
        deepMerge(axios.defaults.headers.common, axios.defaults.headers.get, {
          'X-COMMON-HEADER': 'commonHeaderValue',
          'X-GET-HEADER': 'getHeaderValue',
          'X-FOO-HEADER': 'fooHeaderValue',
          'X-BAR-HEADER': 'barHeaderValue'
        })
      )
    })
  })

  test('should be used by custom instance if set before instance created', () =&gt; {
    axios.defaults.baseURL = 'http://example.org/'
    const instance = axios.create()

    instance.get('/foo')

    return getAjaxRequest().then(request =&gt; {
      expect(request.url).toBe('http://example.org/foo')
      delete axios.defaults.baseURL
    })
  })

  test('should not be used by custom instance if set after instance created', () =&gt; {
    const instance = axios.create()
    axios.defaults.baseURL = 'http://example.org/'

    instance.get('/foo')

    return getAjaxRequest().then(request =&gt; {
      expect(request.url).toBe('/foo')
    })
  })
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="transform-模块单元测试" tabindex="-1"><a class="header-anchor" href="#transform-模块单元测试" aria-hidden="true">#</a> transform 模块单元测试</h2>
<p><code v-pre>transform</code> 模块用来定义请求和响应的转换方法，我们需要为其编写单元测试。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>import axios, { AxiosResponse, AxiosTransformer } from '../src/index'
import { getAjaxRequest } from './helper'

describe('transform', () =&gt; {
  beforeEach(() =&gt; {
    jasmine.Ajax.install()
  })

  afterEach(() =&gt; {
    jasmine.Ajax.uninstall()
  })

  test('should transform JSON to string', () =&gt; {
    const data = {
      foo: 'bar'
    }

    axios.post('/foo', data)

    return getAjaxRequest().then(request =&gt; {
      expect(request.params).toBe('{&quot;foo&quot;:&quot;bar&quot;}')
    })
  })

  test('should transform string to JSON', done =&gt; {
    let response: AxiosResponse

    axios('/foo').then(res =&gt; {
      response = res
    })

    getAjaxRequest().then(request =&gt; {
      request.respondWith({
        status: 200,
        responseText: '{&quot;foo&quot;: &quot;bar&quot;}'
      })

      setTimeout(() =&gt; {
        expect(typeof response.data).toBe('object')
        expect(response.data.foo).toBe('bar')
        done()
      }, 100)
    })
  })

  test('should override default transform', () =&gt; {
    const data = {
      foo: 'bar'
    }

    axios.post('/foo', data, {
      transformRequest(data) {
        return data
      }
    })

    return getAjaxRequest().then(request =&gt; {
      expect(request.params).toEqual({ foo: 'bar' })
    })
  })

  test('should allow an Array of transformers', () =&gt; {
    const data = {
      foo: 'bar'
    }

    axios.post('/foo', data, {
      transformRequest: (axios.defaults.transformRequest as AxiosTransformer[]).concat(function(
        data
      ) {
        return data.replace('bar', 'baz')
      })
    })

    return getAjaxRequest().then(request =&gt; {
      expect(request.params).toBe('{&quot;foo&quot;:&quot;baz&quot;}')
    })
  })

  test('should allowing mutating headers', () =&gt; {
    const token = Math.floor(Math.random() * Math.pow(2, 64)).toString(36)

    axios('/foo', {
      transformRequest: (data, headers) =&gt; {
        headers['X-Authorization'] = token
        return data
      }
    })

    return getAjaxRequest().then(request =&gt; {
      expect(request.requestHeaders['X-Authorization']).toEqual(token)
    })
  })
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="xsrf-模块单元测试" tabindex="-1"><a class="header-anchor" href="#xsrf-模块单元测试" aria-hidden="true">#</a> xsrf 模块单元测试</h2>
<p><code v-pre>xsrf</code> 模块提供了一套防御 <code v-pre>xsrf</code> 攻击的解决方案，我们需要为其编写单元测试。</p>
<p><code v-pre>test/xsrf.spec.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>import axios from '../src/index'
import { getAjaxRequest } from './helper'

describe('xsrf', () =&gt; {
  beforeEach(() =&gt; {
    jasmine.Ajax.install()
  })

  afterEach(() =&gt; {
    jasmine.Ajax.uninstall()
    document.cookie =
      axios.defaults.xsrfCookieName + '=;expires=' + new Date(Date.now() - 86400000).toUTCString()
  })

  test('should not set xsrf header if cookie is null', () =&gt; {
    axios('/foo')

    return getAjaxRequest().then(request =&gt; {
      expect(request.requestHeaders[axios.defaults.xsrfHeaderName!]).toBeUndefined()
    })
  })

  test('should set xsrf header if cookie is set', () =&gt; {
    document.cookie = axios.defaults.xsrfCookieName + '=12345'

    axios('/foo')

    return getAjaxRequest().then(request =&gt; {
      expect(request.requestHeaders[axios.defaults.xsrfHeaderName!]).toBe('12345')
    })
  })

  test('should not set xsrf header for cross origin', () =&gt; {
    document.cookie = axios.defaults.xsrfCookieName + '=12345'

    axios('http://example.com/')

    return getAjaxRequest().then(request =&gt; {
      expect(request.requestHeaders[axios.defaults.xsrfHeaderName!]).toBeUndefined()
    })
  })

  test('should set xsrf header for cross origin when using withCredentials', () =&gt; {
    document.cookie = axios.defaults.xsrfCookieName + '=12345'

    axios('http://example.com/', {
      withCredentials: true
    })

    return getAjaxRequest().then(request =&gt; {
      expect(request.requestHeaders[axios.defaults.xsrfHeaderName!]).toBe('12345')
    })
  })
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意在 <code v-pre>afterEach</code> 函数中我们清空了 <code v-pre>xsrf</code> 相关的 cookie。</p>
<h2 id="上传下载模块单元测试" tabindex="-1"><a class="header-anchor" href="#上传下载模块单元测试" aria-hidden="true">#</a> 上传下载模块单元测试</h2>
<p>上传下载模块允许我们监听上传和下载的进度，我们需要为其编写单元测试。</p>
<p><code v-pre>test/progress.spec.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>import axios from '../src/index'
import { getAjaxRequest } from './helper'

describe('progress', () =&gt; {
  beforeEach(() =&gt; {
    jasmine.Ajax.install()
  })

  afterEach(() =&gt; {
    jasmine.Ajax.uninstall()
  })

  test('should add a download progress handler', () =&gt; {
    const progressSpy = jest.fn()

    axios('/foo', { onDownloadProgress: progressSpy })

    return getAjaxRequest().then(request =&gt; {
      request.respondWith({
        status: 200,
        responseText: '{&quot;foo&quot;: &quot;bar&quot;}'
      })
      expect(progressSpy).toHaveBeenCalled()
    })
  })

  test('should add a upload progress handler', () =&gt; {
    const progressSpy = jest.fn()

    axios('/foo', { onUploadProgress: progressSpy })

    return getAjaxRequest().then(request =&gt; {
      // Jasmine AJAX doesn't trigger upload events.Waiting for jest-ajax fix
      // expect(progressSpy).toHaveBeenCalled()
    })
  })
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，由于 <code v-pre>jasmine-ajax</code> 插件不会派发 <code v-pre>upload</code> 事件，这个未来可以通过我们自己编写的 <code v-pre>jest-ajax</code> 插件来解决，目前不写断言的情况它会直接通过。</p>
<h2 id="http-授权模块单元测试" tabindex="-1"><a class="header-anchor" href="#http-授权模块单元测试" aria-hidden="true">#</a> HTTP 授权模块单元测试</h2>
<p>HTTP 授权模块为我们在请求头中添加 <code v-pre>Authorization</code> 字段，我们需要为其编写单元测试。</p>
<p><code v-pre>test/auth.spec.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>import axios from '../src/index'
import { getAjaxRequest } from './helper'

describe('auth', () =&gt; {
  beforeEach(() =&gt; {
    jasmine.Ajax.install()
  })

  afterEach(() =&gt; {
    jasmine.Ajax.uninstall()
  })

  test('should accept HTTP Basic auth with username/password', () =&gt; {
    axios('/foo', {
      auth: {
        username: 'Aladdin',
        password: 'open sesame'
      }
    })

    return getAjaxRequest().then(request =&gt; {
      expect(request.requestHeaders['Authorization']).toBe('Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==')
    })
  })

  test('should fail to encode HTTP Basic auth credentials with non-Latin1 characters', () =&gt; {
    return axios('/foo', {
      auth: {
        username: 'Aladßç£☃din',
        password: 'open sesame'
      }
    })
      .then(() =&gt; {
        throw new Error(
          'Should not succeed to make a HTTP Basic auth request with non-latin1 chars in credentials.'
        )
      })
      .catch(error =&gt; {
        expect(/character/i.test(error.message)).toBeTruthy()
      })
  })
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="静态方法模块单元测试" tabindex="-1"><a class="header-anchor" href="#静态方法模块单元测试" aria-hidden="true">#</a> 静态方法模块单元测试</h2>
<p>静态方法模块为 <code v-pre>axios</code> 对象添加了 2 个静态方法，我们需要为其编写单元测试。</p>
<p><code v-pre>test/static.spec.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>import axios from '../src/index'

describe('promise', () =&gt; {
  test('should support all', done =&gt; {
    let fulfilled = false

    axios.all([true, false]).then(arg =&gt; {
      fulfilled = arg[0]
    })

    setTimeout(() =&gt; {
      expect(fulfilled).toBeTruthy()
      done()
    }, 100)
  })

  test('should support spread', done =&gt; {
    let sum = 0
    let fulfilled = false
    let result: any

    axios
      .all([123, 456])
      .then(
        axios.spread((a, b) =&gt; {
          sum = a + b
          fulfilled = true
          return 'hello world'
        })
      )
      .then(res =&gt; {
        result = res
      })

    setTimeout(() =&gt; {
      expect(fulfilled).toBeTruthy()
      expect(sum).toBe(123 + 456)
      expect(result).toBe('hello world')
      done()
    }, 100)
  })
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="补充未覆盖的代码测试" tabindex="-1"><a class="header-anchor" href="#补充未覆盖的代码测试" aria-hidden="true">#</a> 补充未覆盖的代码测试</h2>
<p>我们发现，跑完测试后，仍有一些代码没有覆盖到测试，其中 <code v-pre>core/xhr.ts</code> 文件的第 43 行：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>if (responseType) {
  request.responseType = responseType
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们并未在测试中设置过 <code v-pre>responseType</code>，因此我们在 <code v-pre>test/requests.spect.ts</code> 文件中补充相关测试：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>test('should support array buffer response', done =&gt; {
  let response: AxiosResponse

  function str2ab(str: string) {
    const buff = new ArrayBuffer(str.length * 2)
    const view = new Uint16Array(buff)
    for (let i = 0; i &lt; str.length; i++) {
      view[i] = str.charCodeAt(i)
    }
    return buff
  }

  axios('/foo', {
    responseType: 'arraybuffer'
  }).then(data =&gt; {
    response = data
  })

  getAjaxRequest().then(request =&gt; {
    request.respondWith({
      status: 200,
      // @ts-ignore
      response: str2ab('Hello world')
    })

    setTimeout(() =&gt; {
      expect(response.data.byteLength).toBe(22)
      done()
    }, 100)
  })
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外我们发现 <code v-pre>core/xhr.ts</code> 文件的第 13 行：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>method = 'get'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>分支没有测试完全。因为实际上代码执行到这的时候 <code v-pre>method</code> 是一定会有的，所以我们不必为其指定默认值，另外还需要在 <code v-pre>method!.toUpperCase()</code> 的时候使用非空断言。</p>
<p>同时<code v-pre>core/xhr.ts</code> 文件的第 66 行：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>const responseData = responseType !== 'text' ? request.response : request.responseText
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>分支也没有测试完全。这里我们应该先判断存在 <code v-pre>responseType</code> 存在的情况下再去和 <code v-pre>text</code> 做对比，需要修改逻辑：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>const responseData = responseType &amp;&amp; responseType !== 'text' ? request.response : request.responseText
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这样再次跑测试，就覆盖了所有的分支。</p>
<p>到此为止，除了我们之前说的 <code v-pre>helpers/error.ts</code> 模块中对于 <code v-pre>super</code> 的测试的分支覆盖率没达到 100%，其它模块均达到 100% 的测试覆盖率。</p>
<p>有些有强迫症的同学可能会觉得，能不能通过某种手段让它的覆盖率达到 100% 呢，这里其实有一个奇技淫巧，在 <code v-pre>helpers/error.ts</code> 文件的 <code v-pre>constructor</code> 函数上方加一个 <code v-pre>/* istanbul ignore next */</code> 注释，这样其实相当于忽略了整个构造函数的测试，这样我们就可以达到 100% 的覆盖率了。</p>
<p><code v-pre>/* istanbul ignore next */</code> 在我们去阅读一些开源代码的时候经常会遇到，主要用途就是用来忽略测试用的，这个技巧不可滥用，除非你明确的知道这段代码不需要测试，否则你不应该使用它。滥用就失去了单元测试的意义了。</p>
<p>至此，我们就完成了整个 <code v-pre>ts-axios</code> 库的测试了，我们也成功地让测试覆盖率达到目标 99% 以上。下一章我会教大家如果打包构建和发布我们的 <code v-pre>ts-axios</code> 库。</p>
</div></template>
