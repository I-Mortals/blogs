// 插件配置
module.exports = [
  // 本地插件
  [require('../plugins/love-me/index.js'), { // 鼠标点击爱心特效.
    // color: '#11a8cd', // 爱心颜色，默认随机色
    excludeClassName: 'theme-vdoing-content' // 要排除元素的class, 默认空''
  }],

  'vuepress-plugin-baidu-autopush',// 百度自动推送

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
    'vuepress-plugin-baidu-tongji', // 百度统计
    {
      hm: '708c176cec46cc0e2145faf279963edd',
    },
  ],
  [
    'vuepress-plugin-comment', // 评论
    {
      choosen: 'valine',
      options: {
		el: '#valine-vuepress-comment',
		appId: 'PKrJKhfLqw2fzuHQKtKRL0Ps-gzGzoHsz',
		appKey: 'XRsrwduoXNm83L93hm788qH4',
		visitor: true, // 阅读量统计
		// 必填
		requiredFields:['nick','mail'],
		recordIP: true,
		enableQQ: true
      },
    },
  ],
  [
    '@vuepress/last-updated', // "上次更新"时间格式
    {
      transformer: (timestamp, lang) => {
        const dayjs = require('dayjs') // https://day.js.org/
        return dayjs(timestamp).format('YYYY/MM/DD, HH:mm:ss')
      },
    },
  ],
  [
	  "music-bar",
	        {
	          //手动添加歌曲,支持 URLs 或 base64 data URIs ,默认为空
	          playList: [],
	   
	          platform: [
	            //目前仅支持网易云 TODO:多平台支持,默认为空数组
	            {
	              name: "music.163.com",
	              // songIDs:[]//支持多个歌曲 ID
	              playListIDs: ["6861154058"] //支持多个歌单 ID
	            }
	          ],
	   
	          timeOut: 2000, //加载超时,单位毫秒,默认2000
	   
	          firstClickPlay: true, //首次点击自动播放,对移动端友好
	   
	          debugMode: false // 开发模式，如果在开发环境中，输出日志到控制台，默认 true
	   
	          //background: <String> //主容器样式
	          //                       default: "linear-gradient(-20deg, #00cdac 0%, #8ddad5 100%)"
	   
	          //frameColor: <String> default: $accentColor
	        }
  ]
]
