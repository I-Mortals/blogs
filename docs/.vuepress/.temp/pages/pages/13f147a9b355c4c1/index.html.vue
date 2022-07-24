<template><div><h1 id="辅助模块单元测试" tabindex="-1"><a class="header-anchor" href="#辅助模块单元测试" aria-hidden="true">#</a> 辅助模块单元测试</h1>
<h2 id="准备工作" tabindex="-1"><a class="header-anchor" href="#准备工作" aria-hidden="true">#</a> 准备工作</h2>
<p>通常我们会优先为一个库的辅助方法编写测试，我们会优先为 <code v-pre>ts-axios</code> 库的 <code v-pre>helpers</code> 目录下的模块编写测试。我们在 <code v-pre>test</code> 目录下创建一个 <code v-pre>helpers</code> 目录，创建一个 <code v-pre>boot.ts</code> 空文件，这个是因为我们上节课给 Jest 配置了 <code v-pre>setupFilesAfterEnv</code> 指向了这个文件，后面的章节我们会编写这个文件。</p>
<p>然后我们可以在控制台运行 <code v-pre>npm test</code>，它实际上是执行了 <code v-pre>jest --coverage</code> 来跑单元测试，我们会发现它会报错，没有匹配的测试文件，那是因为我们还没有在 <code v-pre>test</code> 目录下编写任何一个 .spec.ts 结尾的测试文件。接下来我们就来为这些辅助模块编写相应的测试。</p>
<h2 id="util-模块测试" tabindex="-1"><a class="header-anchor" href="#util-模块测试" aria-hidden="true">#</a> util 模块测试</h2>
<p><code v-pre>test/helpers/util.spec.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>import {
  isDate,
  isPlainObject,
  isFormData,
  isURLSearchParams,
  extend,
  deepMerge
} from '../../src/helpers/util'

describe('helpers:util', () =&gt; {
  describe('isXX', () =&gt; {
    test('should validate Date', () =&gt; {
      expect(isDate(new Date())).toBeTruthy()
      expect(isDate(Date.now())).toBeFalsy()
    })

    test('should validate PlainObject', () =&gt; {
      expect(isPlainObject({})).toBeTruthy()
      expect(isPlainObject(new Date())).toBeFalsy()
    })

    test('should validate FormData', () =&gt; {
      expect(isFormData(new FormData())).toBeTruthy()
      expect(isFormData({})).toBeFalsy()
    })

    test('should validate URLSearchParams', () =&gt; {
      expect(isURLSearchParams(new URLSearchParams())).toBeTruthy()
      expect(isURLSearchParams('foo=1&amp;bar=2')).toBeFalsy()
    })
  })

  describe('extend', () =&gt; {
    test('should be mutable', () =&gt; {
      const a = Object.create(null)
      const b = { foo: 123 }

      extend(a, b)

      expect(a.foo).toBe(123)
    })

    test('should extend properties', function() {
      const a = { foo: 123, bar: 456 }
      const b = { bar: 789 }
      const c = extend(a, b)

      expect(c.foo).toBe(123)
      expect(c.bar).toBe(789)
    })
  })

  describe('deepMerge', () =&gt; {
    test('should be immutable', () =&gt; {
      const a = Object.create(null)
      const b: any = { foo: 123 }
      const c: any = { bar: 456 }

      deepMerge(a, b, c)

      expect(typeof a.foo).toBe('undefined')
      expect(typeof a.bar).toBe('undefined')
      expect(typeof b.bar).toBe('undefined')
      expect(typeof c.foo).toBe('undefined')
    })

    test('should deepMerge properties', () =&gt; {
      const a = { foo: 123 }
      const b = { bar: 456 }
      const c = { foo: 789 }
      const d = deepMerge(a, b, c)

      expect(d.foo).toBe(789)
      expect(d.bar).toBe(456)
    })

    test('should deepMerge recursively', function() {
      const a = { foo: { bar: 123 } }
      const b = { foo: { baz: 456 }, bar: { qux: 789 } }
      const c = deepMerge(a, b)

      expect(c).toEqual({
        foo: {
          bar: 123,
          baz: 456
        },
        bar: {
          qux: 789
        }
      })
    })

    test('should remove all references from nested objects', () =&gt; {
      const a = { foo: { bar: 123 } }
      const b = {}
      const c = deepMerge(a, b)

      expect(c).toEqual({
        foo: {
          bar: 123
        }
      })

      expect(c.foo).not.toBe(a.foo)
    })

    test('should handle null and undefined arguments', () =&gt; {
      expect(deepMerge(undefined, undefined)).toEqual({})
      expect(deepMerge(undefined, { foo: 123 })).toEqual({ foo: 123 })
      expect(deepMerge({ foo: 123 }, undefined)).toEqual({ foo: 123 })

      expect(deepMerge(null, null)).toEqual({})
      expect(deepMerge(null, { foo: 123 })).toEqual({ foo: 123 })
      expect(deepMerge({ foo: 123 }, null)).toEqual({ foo: 123 })
    })
  })
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中 <a href="https://jestjs.io/docs/en/api#describename-fn" target="_blank" rel="noopener noreferrer"><code v-pre>describe</code></a> 方法用来定义一组测试，它可以支持嵌套，<a href="https://jestjs.io/docs/en/api#testname-fn-timeout" target="_blank" rel="noopener noreferrer"><code v-pre>test</code></a> 函数是用来定义单个测试用例，它是测试的最小单元。<a href="https://jestjs.io/docs/en/expect#expectvalue" target="_blank" rel="noopener noreferrer"><code v-pre>expect</code></a> 是断言函数，所谓&quot;断言&quot;，就是判断代码的实际执行结果与预期结果是否一致，如果不一致就抛出一个错误。</p>
<p>测试文件编写好后，我们可以去控制台运行一次 <code v-pre>npm test</code>，看一下测试结果，我们可以看跑了几个测试文件，测试是否通过，测试覆盖率等。</p>
<h2 id="cookie-模块测试" tabindex="-1"><a class="header-anchor" href="#cookie-模块测试" aria-hidden="true">#</a> cookie 模块测试</h2>
<p><code v-pre>test/helpers/cookie.spec.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>import cookie from '../../src/helpers/cookie'

describe('helpers:cookie', () =&gt; {
  test('should read cookies', () =&gt; {
    document.cookie = 'foo=baz'
    expect(cookie.read('foo')).toBe('baz')
  })

  test('should return null if cookie name is not exist', () =&gt; {
    document.cookie = 'foo=baz'
    expect(cookie.read('bar')).toBeNull()
  })
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里我们可以通过 <code v-pre>document.cookie</code> 去设置 cookie，就像在浏览器里一样操作。</p>
<h2 id="data-模块测试" tabindex="-1"><a class="header-anchor" href="#data-模块测试" aria-hidden="true">#</a> data 模块测试</h2>
<p><code v-pre>test/helpers/data.spec.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>import { transformRequest, transformResponse } from '../../src/helpers/data'

describe('helpers:data', () =&gt; {
  describe('transformRequest', () =&gt; {
    test('should transform request data to string if data is a PlainObject', () =&gt; {
      const a = { a: 1 }
      expect(transformRequest(a)).toBe('{&quot;a&quot;:1}')
    })

    test('should do nothing if data is not a PlainObject', () =&gt; {
      const a = new URLSearchParams('a=b')
      expect(transformRequest(a)).toBe(a)
    })
  })

  describe('transformResponse', () =&gt; {
    test('should transform response data to Object if data is a JSON string', () =&gt; {
      const a = '{&quot;a&quot;: 2}'
      expect(transformResponse(a)).toEqual({ a: 2 })
    })

    test('should do nothing if data is a string but not a JSON string', () =&gt; {
      const a = '{a: 2}'
      expect(transformResponse(a)).toBe('{a: 2}')
    })

    test('should do nothing if data is not a string', () =&gt; {
      const a = { a: 2 }
      expect(transformResponse(a)).toBe(a)
    })
  })
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="error-模块测试" tabindex="-1"><a class="header-anchor" href="#error-模块测试" aria-hidden="true">#</a> error 模块测试</h2>
<p><code v-pre>test/helpers/error.spec.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>import { createError } from '../../src/helpers/error'
import { AxiosRequestConfig, AxiosResponse } from '../../src/types'

describe('helpers::error', function() {
  test('should create an Error with message, config, code, request, response and isAxiosError', () =&gt; {
    const request = new XMLHttpRequest()
    const config: AxiosRequestConfig = { method: 'post' }
    const response: AxiosResponse = {
      status: 200,
      statusText: 'OK',
      headers: null,
      request,
      config,
      data: { foo: 'bar' }
    }
    const error = createError('Boom!', config, 'SOMETHING', request, response)
    expect(error instanceof Error).toBeTruthy()
    expect(error.message).toBe('Boom!')
    expect(error.config).toBe(config)
    expect(error.code).toBe('SOMETHING')
    expect(error.request).toBe(request)
    expect(error.response).toBe(response)
    expect(error.isAxiosError).toBeTruthy()
  })
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该模块跑完我们会发现，分支覆盖率是在 <code v-pre>50%</code>，因为第十七行代码</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>super(message)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个是 <code v-pre>super</code> 继承对测试覆盖率支持的坑，目前没有好的解决方案，可以先忽略。</p>
<h2 id="headers-模块测试" tabindex="-1"><a class="header-anchor" href="#headers-模块测试" aria-hidden="true">#</a> headers 模块测试</h2>
<p><code v-pre>test/helpers/headers.spec.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>import { parseHeaders, processHeaders, flattenHeaders } from '../../src/helpers/headers'

describe('helpers:header', () =&gt; {
  describe('parseHeaders', () =&gt; {
    test('should parse headers', () =&gt; {
      const parsed = parseHeaders(
        'Content-Type: application/json\r\n' +
          'Connection: keep-alive\r\n' +
          'Transfer-Encoding: chunked\r\n' +
          'Date: Tue, 21 May 2019 09:23:44 GMT\r\n' +
          ':aa\r\n' +
          'key:'
      )

      expect(parsed['content-type']).toBe('application/json')
      expect(parsed['connection']).toBe('keep-alive')
      expect(parsed['transfer-encoding']).toBe('chunked')
      expect(parsed['date']).toBe('Tue, 21 May 2019 09:23:44 GMT')
      expect(parsed['key']).toBe('')
    })

    test('should return empty object if headers is empty string', () =&gt; {
      expect(parseHeaders('')).toEqual({})
    })
  })

  describe('processHeaders', () =&gt; {
    test('should normalize Content-Type header name', () =&gt; {
      const headers: any = {
        'conTenT-Type': 'foo/bar',
        'Content-length': 1024
      }
      processHeaders(headers, {})
      expect(headers['Content-Type']).toBe('foo/bar')
      expect(headers['conTenT-Type']).toBeUndefined()
      expect(headers['Content-length']).toBe(1024)
    })

    test('should set Content-Type if not set and data is PlainObject', () =&gt; {
      const headers: any = {}
      processHeaders(headers, { a: 1 })
      expect(headers['Content-Type']).toBe('application/json;charset=utf-8')
    })

    test('should set not Content-Type if not set and data is not PlainObject', () =&gt; {
      const headers: any = {}
      processHeaders(headers, new URLSearchParams('a=b'))
      expect(headers['Content-Type']).toBeUndefined()
    })

    test('should do nothing if headers is undefined or null', () =&gt; {
      expect(processHeaders(undefined, {})).toBeUndefined()
      expect(processHeaders(null, {})).toBeNull()
    })
  })

  describe('flattenHeaders', () =&gt; {
    test('should flatten the headers and include common headers', () =&gt; {
      const headers = {
        Accept: 'application/json',
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

      expect(flattenHeaders(headers, 'get')).toEqual({
        Accept: 'application/json',
        'X-COMMON-HEADER': 'commonHeaderValue',
        'X-GET-HEADER': 'getHeaderValue'
      })
    })

    test('should flatten the headers without common headers', () =&gt; {
      const headers = {
        Accept: 'application/json',
        get: {
          'X-GET-HEADER': 'getHeaderValue'
        }
      }

      expect(flattenHeaders(headers, 'patch')).toEqual({
        Accept: 'application/json'
      })
    })

    test('should do nothing if headers is undefined or null', () =&gt; {
      expect(flattenHeaders(undefined, 'get')).toBeUndefined()
      expect(flattenHeaders(null, 'post')).toBeNull()
    })
  })
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行后，我们会发现 <code v-pre>parseHeaders</code> 测试组的 <code v-pre>should parse headers</code> 测试没通过，<code v-pre>expect(parsed['date']).toBe('Tue, 21 May 2019 09:23:44 GMT')</code> 我们期望解析后的 <code v-pre>date</code> 字段是 <code v-pre>Tue, 21 May 2019 09:23:44 GMT</code>，而实际的值是 <code v-pre>Tue, 21 May 2019 09</code>。</p>
<p>测试没通过，我们检查一下代码，发现我们 <code v-pre>parseHeaders</code> 的代码逻辑漏洞，我们只考虑了第一个 &quot;:&quot; 号，没考虑后半部分的字符串内部也可能有 &quot;:&quot;，按我们现有的逻辑就会把字符串中 &quot;:&quot; 后面部分都截断了。</p>
<p>因此我们修改 <code v-pre>parseHeaders</code> 的实现逻辑。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach(line =&gt; {
    let [key, ...vals] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    let val = vals.join(':').trim()
    parsed[key] = val
  })

  return parsed
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样我们再重新跑测试，就会通过了。</p>
<h2 id="url-模块测试" tabindex="-1"><a class="header-anchor" href="#url-模块测试" aria-hidden="true">#</a> url 模块测试</h2>
<p><code v-pre>test/helpers/url.spec.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>import { buildURL, isAbsoluteURL, combineURL, isURLSameOrigin } from '../../src/helpers/url'

describe('helpers:url', () =&gt; {
  describe('buildURL', () =&gt; {
    test('should support null params', () =&gt; {
      expect(buildURL('/foo')).toBe('/foo')
    })

    test('should support params', () =&gt; {
      expect(
        buildURL('/foo', {
          foo: 'bar'
        })
      ).toBe('/foo?foo=bar')
    })

    test('should ignore if some param value is null', () =&gt; {
      expect(
        buildURL('/foo', {
          foo: 'bar',
          baz: null
        })
      ).toBe('/foo?foo=bar')
    })

    test('should ignore if the only param value is null', () =&gt; {
      expect(
        buildURL('/foo', {
          baz: null
        })
      ).toBe('/foo')
    })

    test('should support object params', () =&gt; {
      expect(
        buildURL('/foo', {
          foo: {
            bar: 'baz'
          }
        })
      ).toBe('/foo?foo=' + encodeURI('{&quot;bar&quot;:&quot;baz&quot;}'))
    })

    test('should support date params', () =&gt; {
      const date = new Date()

      expect(
        buildURL('/foo', {
          date: date
        })
      ).toBe('/foo?date=' + date.toISOString())
    })

    test('should support array params', () =&gt; {
      expect(
        buildURL('/foo', {
          foo: ['bar', 'baz']
        })
      ).toBe('/foo?foo[]=bar&amp;foo[]=baz')
    })

    test('should support special char params', () =&gt; {
      expect(
        buildURL('/foo', {
          foo: '@:$, '
        })
      ).toBe('/foo?foo=@:$,+')
    })

    test('should support existing params', () =&gt; {
      expect(
        buildURL('/foo?foo=bar', {
          bar: 'baz'
        })
      ).toBe('/foo?foo=bar&amp;bar=baz')
    })

    test('should correct discard url hash mark', () =&gt; {
      expect(
        buildURL('/foo?foo=bar#hash', {
          query: 'baz'
        })
      ).toBe('/foo?foo=bar&amp;query=baz')
    })

    test('should use serializer if provided', () =&gt; {
      const serializer = jest.fn(() =&gt; {
        return 'foo=bar'
      })
      const params = { foo: 'bar' }
      expect(buildURL('/foo', params, serializer)).toBe('/foo?foo=bar')
      expect(serializer).toHaveBeenCalled()
      expect(serializer).toHaveBeenCalledWith(params)
    })

    test('should support URLSearchParams', () =&gt; {
      expect(buildURL('/foo', new URLSearchParams('bar=baz'))).toBe('/foo?bar=baz')
    })
  })

  describe('isAbsoluteURL', () =&gt; {
    test('should return true if URL begins with valid scheme name', () =&gt; {
      expect(isAbsoluteURL('https://api.github.com/users')).toBeTruthy()
      expect(isAbsoluteURL('custom-scheme-v1.0://example.com/')).toBeTruthy()
      expect(isAbsoluteURL('HTTP://example.com/')).toBeTruthy()
    })

    test('should return false if URL begins with invalid scheme name', () =&gt; {
      expect(isAbsoluteURL('123://example.com/')).toBeFalsy()
      expect(isAbsoluteURL('!valid://example.com/')).toBeFalsy()
    })

    test('should return true if URL is protocol-relative', () =&gt; {
      expect(isAbsoluteURL('//example.com/')).toBeTruthy()
    })

    test('should return false if URL is relative', () =&gt; {
      expect(isAbsoluteURL('/foo')).toBeFalsy()
      expect(isAbsoluteURL('foo')).toBeFalsy()
    })
  })

  describe('combineURL', () =&gt; {
    test('should combine URL', () =&gt; {
      expect(combineURL('https://api.github.com', '/users')).toBe('https://api.github.com/users')
    })

    test('should remove duplicate slashes', () =&gt; {
      expect(combineURL('https://api.github.com/', '/users')).toBe('https://api.github.com/users')
    })

    test('should insert missing slash', () =&gt; {
      expect(combineURL('https://api.github.com', 'users')).toBe('https://api.github.com/users')
    })

    test('should not insert slash when relative url missing/empty', () =&gt; {
      expect(combineURL('https://api.github.com/users', '')).toBe('https://api.github.com/users')
    })

    test('should allow a single slash for relative url', () =&gt; {
      expect(combineURL('https://api.github.com/users', '/')).toBe('https://api.github.com/users/')
    })
  })

  describe('isURLSameOrigin', () =&gt; {
    test('should detect same origin', () =&gt; {
      expect(isURLSameOrigin(window.location.href)).toBeTruthy()
    })

    test('should detect different origin', () =&gt; {
      expect(isURLSameOrigin('https://github.com/axios/axios')).toBeFalsy()
    })
  })
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里要注意的是，我们使用了 <a href="https://jestjs.io/docs/en/jest-object#jestfnimplementation" target="_blank" rel="noopener noreferrer"><code v-pre>jest.fn</code></a> 去模拟了一个函数，这个也是在编写 Jest 测试中非常常用的一个 API。</p>
<p>至此，我们就实现了 <code v-pre>ts-axios</code> 库 <code v-pre>helpers</code> 目录下所有模块的测试，并把该目录下的测试覆盖率达到了近乎 100% 的覆盖率。下面的章节我们就开始测试 <code v-pre>ts-axios</code> 的核心流程，针对不同的 <code v-pre>feature</code> 去编写单元测试了。</p>
</div></template>
