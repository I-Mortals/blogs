<template><div><h1 id="请求取消模块单元测试" tabindex="-1"><a class="header-anchor" href="#请求取消模块单元测试" aria-hidden="true">#</a> 请求取消模块单元测试</h1>
<p>请求取消模块是 <code v-pre>ts-axios</code> 库核心流程其中一个分支，也是非常重要的模块，我们将从基础库和业务流程模块 2 个方面去编写单元测试。</p>
<h2 id="cancel-类单元测试" tabindex="-1"><a class="header-anchor" href="#cancel-类单元测试" aria-hidden="true">#</a> Cancel 类单元测试</h2>
<p><code v-pre>cancel/Cancel.spec.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>import Cancel, { isCancel } from '../../src/cancel/Cancel'

describe('cancel:Cancel', () =&gt; {
  test('should returns correct result when message is specified', () =&gt; {
    const cancel = new Cancel('Operation has been canceled.')
    expect(cancel.message).toBe('Operation has been canceled.')
  })

  test('should returns true if value is a Cancel', () =&gt; {
    expect(isCancel(new Cancel())).toBeTruthy()
  })

  test('should returns false if value is not a Cancel', () =&gt; {
    expect(isCancel({ foo: 'bar' })).toBeFalsy()
  })
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="canceltoken-类单元测试" tabindex="-1"><a class="header-anchor" href="#canceltoken-类单元测试" aria-hidden="true">#</a> CancelToken 类单元测试</h2>
<p><code v-pre>cancel/CancelToken.spec.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>import CancelToken from '../../src/cancel/CancelToken'
import Cancel from '../../src/cancel/Cancel'
import { Canceler } from '../../src/types'

describe('CancelToken', () =&gt; {
  describe('reason', () =&gt; {
    test('should returns a Cancel if cancellation has been requested', () =&gt; {
      let cancel: Canceler
      let token = new CancelToken(c =&gt; {
        cancel = c
      })
      cancel!('Operation has been canceled.')
      expect(token.reason).toEqual(expect.any(Cancel))
      expect(token.reason!.message).toBe('Operation has been canceled.')
    })

    test('should has no side effect if call cancellation for multi times', () =&gt; {
      let cancel: Canceler
      let token = new CancelToken(c =&gt; {
        cancel = c
      })
      cancel!('Operation has been canceled.')
      cancel!('Operation has been canceled.')
      expect(token.reason).toEqual(expect.any(Cancel))
      expect(token.reason!.message).toBe('Operation has been canceled.')
    })

    test('should returns undefined if cancellation has not been requested', () =&gt; {
      const token = new CancelToken(() =&gt; {
        // do nothing
      })
      expect(token.reason).toBeUndefined()
    })
  })

  describe('promise', () =&gt; {
    test('should returns a Promise that resolves when cancellation is requested', done =&gt; {
      let cancel: Canceler
      const token = new CancelToken(c =&gt; {
        cancel = c
      })
      token.promise.then(value =&gt; {
        expect(value).toEqual(expect.any(Cancel))
        expect(value.message).toBe('Operation has been canceled.')
        done()
      })
      cancel!('Operation has been canceled.')
    })
  })

  describe('throwIfRequested', () =&gt; {
    test('should throws if cancellation has been requested', () =&gt; {
      let cancel: Canceler
      const token = new CancelToken(c =&gt; {
        cancel = c
      })
      cancel!('Operation has been canceled.')
      try {
        token.throwIfRequested()
        fail('Expected throwIfRequested to throw.')
      } catch (thrown) {
        if (!(thrown instanceof Cancel)) {
          fail('Expected throwIfRequested to throw a Cancel, but test threw ' + thrown + '.')
        }
        expect(thrown.message).toBe('Operation has been canceled.')
      }
    })

    test('should does not throw if cancellation has not been requested', () =&gt; {
      const token = new CancelToken(() =&gt; {
        // do nothing
      })
      token.throwIfRequested()
    })
  })

  describe('source', () =&gt; {
    test('should returns an object containing token and cancel function', () =&gt; {
      const source = CancelToken.source()
      expect(source.token).toEqual(expect.any(CancelToken))
      expect(source.cancel).toEqual(expect.any(Function))
      expect(source.token.reason).toBeUndefined()
      source.cancel('Operation has been canceled.')
      expect(source.token.reason).toEqual(expect.any(Cancel))
      expect(source.token.reason!.message).toBe('Operation has been canceled.')
    })
  })
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，这里我们使用了 <code v-pre>fail</code> 函数表示一个测试的失败，这个并未在 Jest 文档中体现，但它是一个可以用的 API。</p>
<h2 id="cancel-业务逻辑单元测试" tabindex="-1"><a class="header-anchor" href="#cancel-业务逻辑单元测试" aria-hidden="true">#</a> Cancel 业务逻辑单元测试</h2>
<p><code v-pre>cancel.spec.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>import axios from '../src/index'
import { getAjaxRequest } from './helper'

describe('cancel', () =&gt; {
  const CancelToken = axios.CancelToken
  const Cancel = axios.Cancel

  beforeEach(() =&gt; {
    jasmine.Ajax.install()
  })

  afterEach(() =&gt; {
    jasmine.Ajax.uninstall()
  })

  describe('when called before sending request', () =&gt; {
    test('should rejects Promise with a Cancel object', () =&gt; {
      const source = CancelToken.source()
      source.cancel('Operation has been canceled.')

      return axios
        .get('/foo', {
          cancelToken: source.token
        })
        .catch(reason =&gt; {
          expect(reason).toEqual(expect.any(Cancel))
          expect(reason.message).toBe('Operation has been canceled.')
        })
    })
  })

  describe('when called after request has been sent', () =&gt; {
    test('should rejects Promise with a Cancel object', done =&gt; {
      const source = CancelToken.source()
      axios
        .get('/foo/bar', {
          cancelToken: source.token
        })
        .catch(reason =&gt; {
          expect(reason).toEqual(expect.any(Cancel))
          expect(reason.message).toBe('Operation has been canceled.')
          done()
        })

      getAjaxRequest().then(request =&gt; {
        source.cancel('Operation has been canceled.')
        setTimeout(() =&gt; {
          request.respondWith({
            status: 200,
            responseText: 'OK'
          })
        }, 100)
      })
    })

    test('calls abort on request object', done =&gt; {
      const source = CancelToken.source()
      let request: any
      axios
        .get('/foo/bar', {
          cancelToken: source.token
        })
        .catch(() =&gt; {
          expect(request.statusText).toBe('abort')
          done()
        })

      getAjaxRequest().then(req =&gt; {
        source.cancel()
        request = req
      })
    })
  })

  describe('when called after response has been received', () =&gt; {
    test('should not cause unhandled rejection', done =&gt; {
      const source = CancelToken.source()
      axios
        .get('/foo', {
          cancelToken: source.token
        })
        .then(() =&gt; {
          window.addEventListener('unhandledrejection', () =&gt; {
            done.fail('Unhandled rejection.')
          })
          source.cancel()
          setTimeout(done, 100)
        })

      getAjaxRequest().then(request =&gt; {
        request.respondWith({
          status: 200,
          responseText: 'OK'
        })
      })
    })
  })
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意这里我们使用了 <code v-pre>done.fail</code> 表示了一个异常的结束，这个并未在 Jest 文档中体现，但它是一个可以用的 API。</p>
<p>至此，我们完成了取消模块相关业务逻辑的单元测试，我们测试覆盖率达到了阈值，测试已经通过了。但是扔未达到我们的目标，还有很多 feature 是没有覆盖到的。接下来我们就完成剩余 feature 的编写单元测试。</p>
</div></template>
