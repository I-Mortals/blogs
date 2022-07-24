<template><div><h1 id="将一维数组按指定长度转为二维数组" tabindex="-1"><a class="header-anchor" href="#将一维数组按指定长度转为二维数组" aria-hidden="true">#</a> 将一维数组按指定长度转为二维数组</h1>
<p>将一维数组按指定长度转为二维数组</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>function pages(arr, len) {
    const pages = []
    arr.forEach((item, index) =&gt; {
        const page = Math.floor(index / len)
        if (!pages[page]) {
            pages[page] = []
        }
        pages[page].push(item)
    })
    return pages
}

// 使用
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(pages(arr, 3)) // [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
console.log(pages(arr, 8)) // [[1, 2, 3, 4, 5, 6, 7, 8], [9]]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="应用场景示例" tabindex="-1"><a class="header-anchor" href="#应用场景示例" aria-hidden="true">#</a> 应用场景示例</h2>
<p>如图，按需求，图标模块中的图标个数是不确定的，每页最多显示8个，超出8个的显示到第二页，实现向左滑动翻页。提供的数据是一个一维数组，这时就可以使用上面的代码按长度为8转为二维数组，再分页渲染到页面。</p>
<p><img src="https://cdn.jsdelivr.net/gh/xugaoyi/image_store/blog/20200223142410.jpg" alt=""></p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;template&gt;
    &lt;swiper&gt;
        &lt;swiper-slide v-for=&quot;(page, index) of pages&quot; :key=&quot;index&quot;&gt;
            &lt;div class=&quot;icon&quot; v-for=&quot;item of page&quot; :key=&quot;item.id&quot;&gt;
                &lt;div class=&quot;icon-img&quot;&gt;
                    &lt;img :src=&quot;item.imgUrl&quot;&gt;
                &lt;/div&gt;
                &lt;p&gt;{{item.desc}}&lt;/p&gt;
            &lt;/div&gt;
        &lt;/swiper-slide&gt;
    &lt;/swiper&gt;
&lt;template&gt;
&lt;script&gt;
  ...
  data () {
    return {
      iconList: [] // 图标数据
    }
  },
  computed: {
    pages () {
      const pages = []
      this.iconList.forEach((item, index) =&gt; {
        const page = Math.floor(index / 8)
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(item)
      })
      return pages
    }
  }
&lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>
