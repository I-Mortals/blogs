<template><div><h1 id="vuex操作相关" tabindex="-1"><a class="header-anchor" href="#vuex操作相关" aria-hidden="true">#</a> vuex操作相关</h1>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>import { mapActions, mapMutations, mapGetters } from 'vuex'

computed: {
    ...mapGetters([ // 获取数据，内部为数组
        'searchHistory' // 相当于在data插入searchHistory和获取到的数据
    ])
},

methods: {
	某方法(){
	  this.saveSearchHistory(传入值)
	},
	...mapActions([ // 提交actions修改数据，内部为数组 因为actions文件已对方法进行了封装所有是数组类型
      'saveSearchHistory' // 相当于在methods绑定了事件saveSearchHistory
    ]),

	某方法() {
		this.setFullScreen(传入值)
	},
	 ...mapMutations({ // 提交mutations，内部为对象
      setFullScreen: 'SET_FULL_SCREEN' // 相当于在methods绑定了事件setFullScreen
    })
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>
