// nav
module.exports = [
  { text: '首页', link: '/' },
  {
    text: '学习笔记',
    link: '/notes/', //目录页链接，此处link是vdoing主题新增的配置项，有二级导航时，可以点击一级导航跳到目录页
    items: [
      // 说明：以下所有link的值只是在相应md文件定义的永久链接（不是什么特殊生成的编码）。另外，注意结尾是有斜杠的
      {
        text: '学习笔记',
        items: [
          { text: '前端', link: '/note/tsbiji01/' },
          { text: '后端', link: '/note/gobiji96/' },
        ],
      },
    ],
  },
  {
    text: '知识库',
    link: '/document/',
    items: [
      { text: '《ES6教程》', link: '/pages/f344d070a1031ef7/' },
      { text: '《Git教程》', link: '/pages/8292d8/' },
      { text: '《JavaScript教程》', link: '/pages/0796ba76b4b55368/' },
	  { text: '《JavaScript文章》', link: '/pages/8143cc480faf9a11/' },
      { text: '《TypeScript 从零实现 axios》', link: '/pages/e05dce83e5129785/' },
      { text: '《Vue教程》', link: '/pages/114158caa9e96df0/' },
	  { text: '《Vue文章》', link: '/pages/5d463fbdb172d43b/' },
	  { text: '《页面与效果》', link: '/pages/8309a5b876fc95e3/' },
    ],
  },
  {
    text: '技术',
    link: '/technology/',
    items: [
      { text: '技术文档', link: '/pages/9a7ee40fc232253e/' },
      { text: 'GitHub技巧', link: '/pages/4c778760be26d8b3/' },
      { text: 'Nodejs', link: '/pages/117708e0af7f0bd9/' },
      { text: '博客搭建', link: '/pages/41f87d890d0a02af/' },
    ],
  },
  {
    text: '更多',
    link: '/more/',
    items: [
      { text: '学习', link: '/pages/f2a556/' },
      { text: '面试', link: '/pages/aea6571b7a8bae86/' },
      { text: '心情杂货', link: '/pages/2d615df9a36a98ed/' },
      { text: '实用技巧', link: '/pages/baaa02/' },
      { text: '友情链接', link: '/friends/' },
    ],
  },
  { text: '关于', link: '/about/' },
  {
    text: '收藏',
    link: '/pages/beb6c0bd8a66cea6/',
    // items: [
    //   { text: '网站', link: '/pages/beb6c0bd8a66cea6/' },
    //   { text: '资源', link: '/pages/eee83a9211a70f9d/' },
    //   { text: 'Vue资源', link: '/pages/12df8ace52d493f6/' },
    // ],
  },
  {
    text: '索引',
    link: '/archives/',
    items: [
      { text: '分类', link: '/categories/' },
      { text: '标签', link: '/tags/' },
      { text: '归档', link: '/archives/' },
    ],
  },
]
