<template>
	<div>
		<div class="chat-box">
			
			<div v-for="(item,index) in chatList" :key="index" >
				
				<div v-if="item.type==='text'">
					<div v-if="item.bot" style="width: 100%;display: block;">
						<div class="robot">{{item.bot}}</div>
					</div>
					<div v-if="item.me" style="width: 100%;display: block;float: right;">
						<div class="me">{{item.me}}</div>
					</div>
				</div>

				<div v-if="item.type==='music'">
					<div v-if="item.bot" style="width: 100%;display: block;">
						<div class="robot">{{item.bot}}</div>
						<div class="robot" style="width: 100%;">
							<div style="display: inline-flex;">
								<img style="width: 80px;height: 80px;background-size: 100% 100%;border-radius: 4px;" :src="item.music.pic_url" >
								<div style="padding: 0 4px;">{{item.music.song_name}}/{{item.music.singer_name}}</div>
							</div>
							<audio :id="item.el" @click="chatBgm(item.el)" style="width: 100%;height: 25px;" :src="item.music.music_url" controls="controls">您的浏览器不支持音频元素.</audio>
						</div>
					</div>
				</div>
				
				<div v-if="item.type==='news'">
					<div v-if="item.bot" style="width: 100%;display: block;">
						<div class="robot">{{item.bot}}</div>
						<div class="robot" style="width: 100%;" v-for="(newsItem,inews) in item.Data.articles" :key="inews">
							<div style="">
								<img style="width: 92%;height: 80px;background-size: 100% 100%;border-radius: 4px;" :src="newsItem.pic_url" >
								<a title="点击阅读原文" target="_blank" :href="newsItem.url"><div style="padding: 0 4px;">{{newsItem.title}}</div></a>
								<div style="padding: 0 4px;">{{newsItem.description}}</div>
							</div>
						</div>
					</div>
				</div>

			</div>
			
		</div>
		<div class="robot-box">
			<input type="text" v-if="!userIdStatus" placeholder="请输入任意字符领取宠物吧~" v-model="userId"
				@keyup.enter="chat(1)" />
			<input type="text" v-else placeholder="回车或点击发送和我聊天吧~" v-model="txt" @keyup.enter="chat" />
			<div class="btn" v-if="!userIdStatus" @click="chat(1)">发送</div>
			<div class="btn" v-else @click="chat">发送</div>
		</div>
	</div>
</template>

<script>
	import {
		getdialogue
	} from '../util/apiMethods.js'

	export default {
		components: {},
		data() {
			return {
				txt: '',
				userId: '',
				userIdStatus: false,
				chatList: [{bot:'请问需要什么帮助',type: 'text'}],
			}
		},
		created() {
			this.$nextTick(() => {
				this.verify()
			})
		},
		methods: {
			// 多BGM播放控制
			chatBgm(el){
				this.chatList.forEach((item,i)=>{
					if(item.type === 'music'){
						if(item.el !== el){
							document.getElementById(item.el).stop()
						}
					}
				})
			},
			// 验证userId
			verify() {
				var ud = window.localStorage.getItem('userId')
				if (!ud) {
					this.txt = this.userId = ''
					return this.userIdStatus = false
				}
				this.userId = ud
				return this.userIdStatus = true
			},
			// 聊天啦
			chat(e) {
				if (e === 1) {
					if (this.userId.length < 9) {
						return alert('唯一id不能小于10位！')
					}
					if (this.userId.length > 16) {
						return alert('唯一id不能超过15位！')
					}
					window.localStorage.setItem('userId', this.userId)
					this.userIdStatus = true
				} else {
					if (!this.verify()) return;
					if (this.txt == '') {
						return;
					}
					this.chatList.push({me:this.txt,type: 'text'})
					this.$nextTick(()=>{
						document.querySelector('.chat-box').scrollTo(0,document.querySelector('.chat-box').scrollHeight*2)
					})
					let word = this.txt
					this.txt = ''
					getdialogue({
						userid: this.userId,
						word: word
					}).then(res => {
						let resData = res.data.data
						switch (resData.answer_type){
							case 'text':
								this.chatList.push({
									type: 'text',
									bot:resData.msg[0].content,
								})
								break;
							case 'music':
								this.chatList.push({
									type: 'music',
									el: new Date().getTime()+'Bgm',
									bot: resData.answer,
									music: resData.msg[0]
								})
								break;
							case 'news':
								this.chatList.push({
									type: 'news',
									bot: resData.answer,
									Data: resData.msg[0]
								})
								break;
							default:
								break;
						}
						this.$nextTick(()=>{
							document.querySelector('.chat-box').scrollTo(0,document.querySelector('.chat-box').scrollHeight*2)
						})
						this.$emit('getResult', this.chatList[this.chatList.length-1]);
					})
				}
			}
		},
		mounted() {}
	}
</script>

<style type="text/css">
	audio:focus {
	    outline: -webkit-focus-ring-color auto 0px;
	}
</style>

<style lang="stylus" scoped>
	.chat-box {
		position relative;
		font-size 13px;
		// line-height 20px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
		top: -120px;
		border-radius:4px;
		overflow-y scroll;
		overflow-x hidden;
		background-color #ffffff;
		height 300px;
		.me {
			float right;
			color #ffffff;
			background #07c05f;
			padding 10px;
			border-radius 10px;
			display inline-block;
			margin 10px 0;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
		}

		.robot {
			float left;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
			display inline-block;
			margin 10px 0;
			border-radius 10px;
			padding 10px;
			background: #f0f5fd;
			color #606266;
		}
	}

	.robot-box {
		position fixed;
		display flex;
		align-content center;
		justify-content center;
		z-index: 10020 !important;
		bottom: 320px;
		width 15.5%;
		height 45px;
		input {
			border-radius 5px;
			margin-right 2px;
			padding 5px 10px;
			outline none;
			border 1px solid #c4deaa;
			font-size 13px;
			width 74%
		}

		.btn {
			font-size: 13px;
			color: #2c3e50;
			line-height: 40px;
			border: solid 1px #c4deaa;
			display: inline-block;
			text-align: center;
			padding: 0 10px;
			border-radius: 4px;
			cursor: pointer;
			border: solid 1px #ffffff;
			background: #c4deaa;
			color: #ffffff;
			box-shadow: 0px 0px 5px #c4deaa;
			width 30px;
		}
	}
</style>
