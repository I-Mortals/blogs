<template><div><h1 id="路由懒加载" tabindex="-1"><a class="header-anchor" href="#路由懒加载" aria-hidden="true">#</a> 路由懒加载</h1>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>// 路由同步加载
// import Recommend from '@/components/recommend/recommend'
// import Singer from '@/components/singer/singer'
// import Rank from '@/components/rank/rank'
// import Search from '@/components/search/search'
// import SingerDetail from '@/components/singer-detail/singer-detail'
// import Disc from '@/components/disc/disc'
// import TopList from '@/components/top-list/top-list'
// import UserCenter from '@/components/user-center/user-center'

Vue.use(Router)

// 路由懒加载
const Recommend = () =&gt; import('@/components/recommend/recommend')
const Singer = () =&gt; import('@/components/singer/singer')
const Rank = () =&gt; import('@/components/rank/rank')
const Search = () =&gt; import('@/components/search/search')
const SingerDetail = () =&gt; import('@/components/singer-detail/singer-detail')
const Disc = () =&gt; import('@/components/disc/disc')
const TopList = () =&gt; import('@/components/top-list/top-list')
const UserCenter = () =&gt; import('@/components/user-center/user-center')

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用路由懒加载可使app.js文件变小，进入不同路由在分别加载该路由的js。</p>
</div></template>
