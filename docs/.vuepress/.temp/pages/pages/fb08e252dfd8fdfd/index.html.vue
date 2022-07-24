<template><div><h1 id="vue中的防抖函数封装和使用" tabindex="-1"><a class="header-anchor" href="#vue中的防抖函数封装和使用" aria-hidden="true">#</a> Vue中的防抖函数封装和使用</h1>
<p>如搜索框中，每改变一个数值就请求一次搜索接口，当快速的改变数值时并不需要多次请求接口，这就需要一个防抖函数：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 防抖函数
export function debounce(func, delay) { // func 函数 delay间隔时间
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() =&gt; {
      func.apply(this, args)
    }, delay)
  }
}




//使用：
import { debounce } from '@/common/js/util'

created() {
    /**
     * 为什么不直接在watch里面写？？？
     * 因为要做防抖处理，防止在快速输入时多次请求接口
     */
    this.$watch('query', debounce((newQuery) =&gt; {
      this.$emit('query', newQuery)
    }, 200))
  }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="相关文章" tabindex="-1"><a class="header-anchor" href="#相关文章" aria-hidden="true">#</a> 相关文章</h3>
<p><a href="https://xugaoyi.com/pages/0f6a0ac99b62ede5/" target="_blank" rel="noopener noreferrer">防抖与节流函数</a></p>
</div></template>
