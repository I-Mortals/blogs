<template><div><h1 id="headers-模块单元测试" tabindex="-1"><a class="header-anchor" href="#headers-模块单元测试" aria-hidden="true">#</a> headers 模块单元测试</h1>
<p>之前我们测试了 <code v-pre>headers</code> 的基础方法模块，接下来我们会从业务角度测试 <code v-pre>headers</code> 的相关业务逻辑。</p>
<h2 id="测试代码编写" tabindex="-1"><a class="header-anchor" href="#测试代码编写" aria-hidden="true">#</a> 测试代码编写</h2>
<p><code v-pre>test/headers.spec.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>import axios from '../src/index'
import { getAjaxRequest } from './helper'

function testHeaderValue(headers: any, key: string, val?: string): void {
  let found = false

  for (let k in headers) {
    if (k.toLowerCase() === key.toLowerCase()) {
      found = true
      expect(headers[k]).toBe(val)
      break
    }
  }

  if (!found) {
    if (typeof val === 'undefined') {
      expect(headers.hasOwnProperty(key)).toBeFalsy()
    } else {
      throw new Error(key + ' was not found in headers')
    }
  }
}

describe('headers', () =&gt; {
  beforeEach(() =&gt; {
    jasmine.Ajax.install()
  })

  afterEach(() =&gt; {
    jasmine.Ajax.uninstall()
  })

  test('should use default common headers', () =&gt; {
    const headers = axios.defaults.headers.common

    axios('/foo')

    return getAjaxRequest().then(request =&gt; {
      for (let key in headers) {
        if (headers.hasOwnProperty(key)) {
          expect(request.requestHeaders[key]).toEqual(headers[key])
        }
      }
    })
  })

  test('should add extra headers for post', () =&gt; {
    axios.post('/foo', 'fizz=buzz')

    return getAjaxRequest().then(request =&gt; {
      testHeaderValue(request.requestHeaders, 'Content-Type', 'application/x-www-form-urlencoded')
    })
  })

  test('should use application/json when posting an object', () =&gt; {
    axios.post('/foo/bar', {
      firstName: 'foo',
      lastName: 'bar'
    })

    return getAjaxRequest().then(request =&gt; {
      testHeaderValue(request.requestHeaders, 'Content-Type', 'application/json;charset=utf-8')
    })
  })

  test('should remove content-type if data is empty', () =&gt; {
    axios.post('/foo')

    return getAjaxRequest().then(request =&gt; {
      testHeaderValue(request.requestHeaders, 'Content-Type', undefined)
    })
  })

  it('should preserve content-type if data is false', () =&gt; {
    axios.post('/foo', false)

    return getAjaxRequest().then(request =&gt; {
      testHeaderValue(request.requestHeaders, 'Content-Type', 'application/x-www-form-urlencoded')
    })
  })

  test('should remove content-type if data is FormData', () =&gt; {
    const data = new FormData()
    data.append('foo', 'bar')

    axios.post('/foo', data)

    return getAjaxRequest().then(request =&gt; {
      testHeaderValue(request.requestHeaders, 'Content-Type', undefined)
    })
  })
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>内部定义了 <code v-pre>testHeaderValue</code> 辅助函数，用于测试 <code v-pre>headers</code> 是否存在某个 <code v-pre>header name</code> 下的某个值。</p>
<p>至此我们完成了 <code v-pre>ts-axios</code> 库 <code v-pre>headers</code> 模块相关业务逻辑的测试，下一节课我们会对 <code v-pre>Axios</code> 的实例做测试。</p>
</div></template>
