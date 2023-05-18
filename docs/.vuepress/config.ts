/**
 * 提示：如您想使用JS版本的配置文件可参考：https://github.com/xugaoyi/vuepress-theme-vdoing/tree/a2f03e993dd2f2a3afdc57cf72adfc6f1b6b0c32/docs/.vuepress
 */
import { resolve } from 'path'
import { defineConfig4CustomTheme, UserPlugins, HeadTags } from 'vuepress/config'
import { VdoingThemeConfig } from 'vuepress-theme-vdoing/types'
import htmlModule from './config/htmlModules'
import dayjs from 'dayjs'


export default defineConfig4CustomTheme<VdoingThemeConfig>({
    theme: 'vdoing', // 使用npm主题包
    // theme: resolve(__dirname, '../../vdoing'), // 使用本地主题包
    // require.resolve('../../vdoing'), // 使用本地主题
    locales: {
        '/': {
            lang: 'zh-CN',
            title: "Mortal红尘",
            description: 'web前端技术博客,简洁至上,专注web前端学习与总结。JavaScript,js,ES6,TypeScript,vue,python,css3,html5,Node,git,github等技术文章。',
        }
    },
    // base: '/', // 默认'/'。如果你想将你的网站部署到如 https://foo.github.io/bar/，那么 base 应该被设置成 "/bar/",（否则页面将失去样式等文件）
    // 主题配置
    themeConfig: <VdoingThemeConfig>{
        //   live2dModel: '/live2d/model/poi/poi.model.json', //live2d模型路径
        nav: [
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
                    // { text: '博客搭建', link: '/pages/41f87d890d0a02af/' },
                    { text: 'Linux', link: '/pages/1lcjzu3ljzuvt8x2/' },
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
                    // { text: '友情链接', link: '/friends/' },
                ],
            },
            { text: '友情链接', link: '/friends/' },
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
        ],
        sidebarDepth: 2, // 侧边栏显示深度，默认1，最大2（显示到h3标题）
        logo: '/img/EB-logo.png', // 导航栏logo
        repo: 'https://github.com/I-Mortals/blogs', // 导航栏右侧生成Github链接
        searchMaxSuggestions: 10, // 搜索结果显示最大数
        lastUpdated: '上次更新', // 开启更新时间，并配置前缀文字   string | boolean (取值为git提交时间)
        docsDir: 'docs', // 编辑的文件夹
        editLinks: true, // 启用编辑
        editLinkText: '编辑',
        docsBranch: 'main', // 编辑的文件所在分支，默认master。 注意：如果你的分支是main则修改为main


        //*** 以下配置是Vdoing主题改动和新增的配置 ***//

        // category: false, // 是否打开分类功能，默认true。 如打开，会做的事情有：1. 自动生成的frontmatter包含分类字段 2.页面中显示与分类相关的信息和模块 3.自动生成分类页面（在@pages文件夹）。如关闭，则反之。
        // tag: false, // 是否打开标签功能，默认true。 如打开，会做的事情有：1. 自动生成的frontmatter包含标签字段 2.页面中显示与标签相关的信息和模块 3.自动生成标签页面（在@pages文件夹）。如关闭，则反之。
        // archive: false, // 是否打开归档功能，默认true。 如打开，会做的事情有：1.自动生成归档页面（在@pages文件夹）。如关闭，则反之。
        // categoryText: '随笔', // 碎片化文章（_posts文件夹的文章）预设生成的分类值，默认'随笔'

        // pageStyle: 'line', // 页面风格，可选值：'card'卡片 | 'line' 线（未设置bodyBgImg时才生效）， 默认'card'。 说明：card时背景显示灰色衬托出卡片样式，line时背景显示纯色，并且部分模块带线条边框

        bodyBgImg: [
            'https://cdn.jsdelivr.net/gh/xugaoyi/image_store/blog/20200507175828.jpeg',
            'https://cdn.jsdelivr.net/gh/xugaoyi/image_store/blog/20200507175845.jpeg',
            'https://cdn.jsdelivr.net/gh/xugaoyi/image_store/blog/20200507175846.jpeg'
        ], // body背景大图，默认无。 单张图片 String || 多张图片 Array, 多张图片时每隔15秒换一张。
        bodyBgImgOpacity: 0.5, // body背景图透明度，选值 0 ~ 1.0, 默认0.5

        // titleBadge: false, // 文章标题前的图标是否显示，默认true
        // titleBadgeIcons: [ // 文章标题前图标的地址，默认主题内置图标
        //   '图标地址1',
        //   '图标地址2'
        // ],
        // contentBgStyle: 1, // 文章内容块的背景风格，默认无. 1 => 方格 | 2 => 横线 | 3 => 竖线 | 4 => 左斜线 | 5 => 右斜线 | 6 => 点状

        // updateBar: { // 最近更新栏
        // showToArticle: true, // 显示到文章页底部，默认true
        // moreArticle: '/archives' // “更多文章”跳转的页面，默认'/archives'
        // },
        // rightMenuBar: false, // 是否显示右侧文章大纲栏，默认true (屏宽小于1300px下无论如何都不显示)
        // sidebarOpen: false, // 初始状态是否打开侧边栏，默认true
        // pageButton: false, // 是否显示快捷翻页按钮，默认true

        sidebar: {
            mode: 'structuring',
            collapsable: true,
        }, // 侧边栏  'structuring' | { mode: 'structuring', collapsable: Boolean} | 'auto' | 自定义    温馨提示：目录页数据依赖于结构化的侧边栏数据，如果你不设置为'structuring',将无法使用目录页

        author: {
            // 文章默认的作者信息，可在md文件中单独配置此信息 String | {name: String, link: String}
            name: 'Mortal红尘', // 必需
            link: 'https://github.com/I-Mortals', // 可选的
        },
        blogger: {
            // 博主信息，显示在首页侧边栏
            avatar: 'https://figure.imortals.cn/img/20210715003844.png',
            name: 'Mortal红尘',
            slogan: '热爱各种技术的一枚憨憨前端',
        },
        social: {
            // 社交图标，显示于博主信息栏和页脚栏
            // iconfontCssFile: '//at.alicdn.com/t/font_1678482_u4nrnp8xp6g.css', // 可选，阿里图标库在线css文件地址，对于主题没有的图标可自由添加
            icons: [
                {
                    iconClass: 'icon-youjian',
                    title: '发邮件',
                    link: 'mailto:wuchen.cg@gmail.com',
                },
                {
                    iconClass: 'icon-github',
                    title: 'GitHub',
                    link: 'https://github.com/I-Mortals',
                },
                {
                    iconClass: 'icon-erji',
                    title: '听音乐',
                    link: 'https://music.163.com/#/user/home?id=569160185',
                },
            ],
        },
        footer: {
            // 页脚信息
            createYear: 2021, // 博客创建年份
            copyrightInfo:
                'Mortal红尘 | <a href="https://beian.miit.gov.cn">黔ICP备2021006288号</a>', // 博客版权信息，支持a标签
        },
        // 扩展自动生成frontmatter。（当md文件的frontmatter不存在相应的字段时将自动添加。不会覆盖已有的数据。）
        extendFrontmatter: {
            author: {
                name: 'I-Mortals',
                link: 'https://github.com/I-Mortals'
            }
        },
        htmlModules: htmlModule, // 插入hmtl(广告)模块
    }
    ,
    // 注入到页面<head>中的标签，格式[tagName, { attrName: attrValue }, innerHTML?]
    head: <HeadTags>[
        // 注入到页面<head> 中的标签，格式[tagName, { attrName: attrValue }, innerHTML?]
        ['link', { rel: 'icon', href: '/img/favicon.ico' }], //favicons，资源放在public文件夹
        [
            'meta',
            {
                name: 'keywords',
                content: '前端博客,个人技术博客,前端,前端开发,前端框架,web前端,前端面试题,技术文档,学习,面试,JavaScript,js,ES6,TypeScript,vue,python,css3,html5,Node,git,github,markdown',
            },
        ],
        ['meta', { name: 'theme-color', content: '#11a8cd' }], // 移动浏览器主题颜色
        // ['meta', { 'http-equiv': 'Content-Security-Policy', content: 'upgrade-insecure-requests' }], 
        [
            'script',
            {
                async: 'async',
                src: "/_vercel/insights/script.js"
            }
        ],
        // [
        //   'script',
        //   {
        //     'data-ad-client': 'ca-pub-7828333725993554',
        //     async: 'async',
        //     src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
        //   },
        // ], // 网站关联Google AdSense 与 html格式广告支持
    ],
    // 插件配置
    plugins: <UserPlugins>[

        // 全文搜索。 ⚠️注意：此插件会在打开网站时多加载部分js文件用于搜索，导致初次访问网站变慢。如在意初次访问速度的话可以不使用此插件！（推荐：vuepress-plugin-thirdparty-search）
        // 'fulltext-search',

        // 本地插件
        // [require('./plugins/love-me/index.js'), { // 鼠标点击爱心特效.
        //     // color: '#11a8cd', // 爱心颜色，默认随机色
        //     excludeClassName: 'theme-vdoing-content' // 要排除元素的class, 默认空''
        // }],

        // 可以添加第三方搜索链接的搜索框（原官方搜索框的参数仍可用）
        [
            'thirdparty-search',
            {
                thirdparty: [
                    // 可选，默认 []
                    {
                        title: '在MDN中搜索',
                        frontUrl: 'https://developer.mozilla.org/zh-CN/search?q=', // 搜索链接的前面部分
                        behindUrl: '', // 搜索链接的后面部分，可选，默认 ''
                    },
                    {
                        title: '在Runoob中搜索',
                        frontUrl: 'https://www.runoob.com/?s=',
                    },
                    {
                        title: '在Vue API中搜索',
                        frontUrl: 'https://cn.vuejs.org/v2/api/#',
                    },
                    {
                        title: "在Google中搜索",
                        frontUrl: "https://www.google.com/search?q="
                    },
                    {
                        title: '在Bing中搜索',
                        frontUrl: 'https://cn.bing.com/search?q=',
                    },
                    {
                        title: '通过百度搜索本站的',
                        frontUrl: 'https://www.baidu.com/s?wd=site%3Axugaoyi.com%20',
                    },
                ],
            },
        ],

        [
            'one-click-copy',
            {
                // 代码块复制按钮
                copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'], // String or Array
                copyMessage: '复制成功', // default is 'Copy successfully and then paste it for use.'
                duration: 1000, // prompt message display time.
                showInMobile: false, // whether to display on the mobile side, default: false.
            },
        ],
        [
            'demo-block',
            {
                // demo演示模块 https://github.com/xiguaxigua/vuepress-plugin-demo-block
                settings: {
                    // jsLib: ['http://xxx'], // 在线示例(jsfiddle, codepen)中的js依赖
                    // cssLib: ['http://xxx'], // 在线示例中的css依赖
                    // vue: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js', // 在线示例中的vue依赖
                    jsfiddle: false, // 是否显示 jsfiddle 链接
                    codepen: true, // 是否显示 codepen 链接
                    horizontal: false, // 是否展示为横向样式
                },
            },
        ],
        [
            'vuepress-plugin-zooming', // 放大图片
            {
                selector: '.theme-vdoing-content img:not(.no-zoom)', // 排除class是no-zoom的图片
                options: {
                    bgColor: 'rgba(0,0,0,0.6)',
                },
            },
        ],
        [
            '@vuepress/last-updated', // "上次更新"时间格式
            {
                transformer: (timestamp, lang) => {
                    // const dayjs = require('dayjs') // https://day.js.org/
                    return dayjs(timestamp).format('YYYY/MM/DD, HH:mm:ss')
                },
            },
        ],
    ],
    markdown: {
        lineNumbers: true,
        extractHeaders: ['h2', 'h3', 'h4', 'h5', 'h6'], // 提取标题到侧边栏的级别，默认['h2', 'h3']
    },
    // 监听文件变化并重新构建
    extraWatchFiles: [
        '.vuepress/config.ts',
        '.vuepress/config/htmlModules.ts',
    ]
})