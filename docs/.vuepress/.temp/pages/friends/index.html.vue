<template><div><!--
普通卡片列表容器，可用于友情链接、项目推荐、古诗词展示等。
cardList 后面可跟随一个数字表示每行最多显示多少个，选值范围1~4，默认3。在小屏时会根据屏幕宽度减少每行显示数量。
 - name: 麋鹿鲁哟
  desc: 大道至简，知易行难
  avatar: https://cdn.jsdelivr.net/gh/xugaoyi/image_store/blog/20200122153807.jpg # 可选
  link: https://www.cnblogs.com/miluluyo/ # 可选
  bgColor: '#CBEAFA' # 可选，默认var(--bodyBg)。颜色值有#号时请添加单引号
  textColor: '#6854A1' # 可选，默认var(--textColor)
-->
<p>::: cardList</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>- name: Mortal红尘
  desc: 积跬步以至千里，喜欢学习喜欢你。
  avatar: https://figure.imortals.cn/img/20210715003844.png
  link: https://imortals.cn/
  bgColor: '#CBEAFA'
  textColor: '#6854A1'
- name: 万川集海
  desc: 你的灵魂渴望着你的初心
  avatar: https://cdn.archonk.top/default_cover.jpg
  link: https://archonk.top/
  bgColor: '#CBEAFA'
  textColor: '#6854A1'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>:::</p>
<h3 id="友链申请" tabindex="-1"><a class="header-anchor" href="#友链申请" aria-hidden="true">#</a> 友链申请</h3>
<p>与我<RouterLink to="/about/#%E8%81%94%E7%B3%BB"> 联系 </RouterLink>，发送到我的邮箱 <code v-pre>wuchen.cg@gmail.com</code> ，格式如下</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>- name: Mortal红尘 # 昵称
  desc: 积跬步以至千里，喜欢学习喜欢你。 # 介绍
  avatar: https://figure.imortals.cn/img/20210715003844.png # 头像
  link: https://github.com/not-trace # 链接
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>申请前记得先添加本站哦~</p>
</div></template>
