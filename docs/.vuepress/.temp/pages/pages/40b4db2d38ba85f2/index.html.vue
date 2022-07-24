<template><div><h1 id="js随机打乱数组" tabindex="-1"><a class="header-anchor" href="#js随机打乱数组" aria-hidden="true">#</a> JS随机打乱数组</h1>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function shuffle(arr) { // 随机打乱数组
  let _arr = arr.slice() // 调用数组副本，不改变原数组
  for (let i = 0; i &lt; _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}
function getRandomInt(min, max) { // 获取min到max的一个随机数，包含min和max本身
  return Math.floor(Math.random() * (max - min + 1) + min)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><!-- ## vue demo
::: demo

```html
<template>
  <div>
    原数组：{{arr}}
    <button @click="clickBut">click me！打乱数组</button></br></br>
    打乱结果：{{result}}
  </div>
</template>

<script>
  export default {
    data(){
      return {
        arr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        result: []
      }
    },
    methods:{
      clickBut(){
        this.result = this.shuffle(this.arr)
      },
      shuffle(arr) { // 随机打乱数组
        let _arr = arr.slice() // 调用数组副本，不改变原数组
        for (let i = 0; i < _arr.length; i++) {
          let j = this.getRandomInt(0, i)
          let t = _arr[i]
          _arr[i] = _arr[j]
          _arr[j] = t
        }
        return _arr
      },
      getRandomInt(min, max) { // 获取min到max的一个随机数，包含min和max本身
        return Math.floor(Math.random() * (max - min + 1) + min)
      }
    }
  }
</script>
```
::: -->
<p>::: demo [vanilla]</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;html&gt;
  原数组：&lt;span id=&quot;span1&quot;&gt;&lt;/span&gt;
  &lt;button id=&quot;btn&quot;&gt;click me！打乱数组&lt;/button&gt; &lt;/br&gt;&lt;/br&gt;
  打乱结果：&lt;span id=&quot;span2&quot;&gt;&lt;/span&gt;
&lt;/html&gt;
&lt;script&gt;
    function getRandomInt(min, max) { // 获取min到max的一个随机数，包含min和max本身
      return Math.floor(Math.random() * (max - min + 1) + min)
    }

    function shuffle(arr) { // 随机打乱数组
      let _arr = arr.slice() // 调用数组副本，不改变原数组
      for (let i = 0; i &lt; _arr.length; i++) {
        let j = getRandomInt(0, i)
        let t = _arr[i]
        _arr[i] = _arr[j]
        _arr[j] = t
      }
      return _arr
    }

    //使用
    function $(el){
      return document.querySelector(el)
    }
    let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const $span2 = $('#span2');

    $('#span1').textContent = arr;
    $('#btn').onclick = function () {
      $span2.textContent = shuffle(arr);
    }
  &lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>:::</p>
</div></template>
