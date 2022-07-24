<template><div><h1 id="多种数组去重性能对比" tabindex="-1"><a class="header-anchor" href="#多种数组去重性能对比" aria-hidden="true">#</a> 多种数组去重性能对比</h1>
<h2 id="测试模板" tabindex="-1"><a class="header-anchor" href="#测试模板" aria-hidden="true">#</a> 测试模板</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 创建一个 1 ~ 10w 的数组，Array.from为ES6语法
let arr1 = Array.from(new Array(1000000), (x, index) =&gt; { 
  return index
})

let arr2 = Array.from(new Array(500000), (x, index) =&gt; {
  return index + index
})

let start = new Date().getTime()
console.log('开始数组去重')

// 数组去重
function distinct(a, b) {
  let arr = a.concat(b);
  // 去重方法
}



console.log('去重后的长度', distinct(arr1, arr2).length)
let end = new Date().getTime()
console.log('耗时', end - start + 'ms')
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="测试代码" tabindex="-1"><a class="header-anchor" href="#测试代码" aria-hidden="true">#</a> 测试代码</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 创建一个 1 ~ 10w 的数组，Array.from为ES6语法
let arr1 = Array.from(new Array(1000000), (x, index) =&gt; { 
  return index
})

let arr2 = Array.from(new Array(500000), (x, index) =&gt; {
  return index + index
})

let start = new Date().getTime()
console.log('开始数组去重')

// 数组去重
function distinct(a, b) {
  let arr = a.concat(b);
  
  // 方法1，耗时约11675ms，约11s
  // return arr.filter((item, index) =&gt; {
  //   return arr.indexOf(item) === index
  // })

  // 方法2，耗时约22851ms，约22s，性能最差
  // for (let i = 0, len = arr.length; i &lt; len; i++) {
  //   for (let j = i + 1; j &lt; len; j++) {
  //     if (arr[i] == arr[j]) {
  //       arr.splice(j, 1);
  //       // splice 会改变数组长度，所以要将数组长度 len 和下标 j 减一
  //       len--;
  //       j--;
  //     }
  //   }
  // }
  // return arr

  //方法3，耗时约12789ms，约12s，和方法1相当
  // let result = []
  // for (let i of arr) {
  //   !result.includes(i) &amp;&amp; result.push(i)
  // }
  // return result

  //方法4，耗时约23ms，ES5标准中性能最高
  // arr = arr.sort()
  // let result = [arr[0]]
  // for (let i = 1, len = arr.length; i &lt; len; i++) {
  //   arr[i] !== arr[i - 1] &amp;&amp; result.push(arr[i])
  // }
  // return result

  // 方法5，ES6的Set数据结构，耗时约20ms，性能高，代码简洁
  // return Array.from(new Set([...a, ...b]))

  // 方法6，耗时约16ms，所有方法中 性能最高！ (千万级数据量下效率比方法5高4倍，for...of 为ES6语法)
  let result = []
  let obj = {}
  for (let i of arr) {
    if (!obj[i]) {
      result.push(i)
      obj[i] = 1
    }
  }
  return result

}



console.log('去重后的长度', distinct(arr1, arr2).length)
let end = new Date().getTime()
console.log('耗时', end - start + 'ms')
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论" aria-hidden="true">#</a> 结论</h2>
<p>ES5标准中性能最高的数组去重方法为:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 耗时约23ms
arr = arr.sort()
let result = [arr[0]]
for (let i = 1, len = arr.length; i &lt; len; i++) {
    arr[i] !== arr[i - 1] &amp;&amp; result.push(arr[i])
}
return result
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ES6标准中性能最高的数组去重方法为:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 耗时约16ms (千万级数据量下效率比使用Set数据结构方法高4倍，for...of 为ES6语法)
let result = []
let obj = {}
for (let i of arr) {
    if (!obj[i]) {
        result.push(i)
        obj[i] = 1
    }
}
return result
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码既简洁性能又相对高的去重方法为：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 耗时约20ms，性能高，代码简洁
return Array.from(new Set([...a, ...b]))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></div></template>
