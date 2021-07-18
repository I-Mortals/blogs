<template>
	<div id="landlord">
		<robot class="robot" @getResult='reciveResult($event)' />
		    <audio id="mp3" controls="controls" controlsList="nodownload" hidden>
		        <source type="audio/mp3"></audio>
		<canvas id="live2d" width="280" height="250" class="live2d"></canvas>
	</div>
</template>

<script>
import robot from "../components/ting-robot.vue";

/**
 * 离线语音
 * @param {String} text
 */
function textToVoice(text){
	// 参考文档：http://jsrun.net/uBVKp
    var u= new SpeechSynthesisUtterance()
    u.text = text
    u.lang = 'zh'
    u.rate = 0.7
    u.pitch = 2
    speechSynthesis.speak(u)
}
/**
	lan=zh：语言是中文，如果改为lan=en，则语言是英文。
	spd=2：语速，可以是1-9的数字，数字越大，语速越快。
	tex=**：这个就是你要转换的文字。
	https://ss0.baidu.com/6KAZsjip0QIZ8tyhnq/text2audio?tex=1你好&cuid=dict&lan=zh&ctp=1&pdt=30&vol=100&spd=6
 */
export default {
    components: {
        robot
    },
    data() {
        return {
            url: null,
        }
    },
    methods: {
        reciveResult(item) {
            var audio = document.getElementById('mp3');
            audio.setAttribute("src", `https://ss0.baidu.com/6KAZsjip0QIZ8tyhnq/text2audio?tex=${item.bot}&cuid=dict&lan=zh&ctp=1&pdt=30&vol=100&spd=6`);
            audio.play();
        },
        loadJs(url, callback) {
            var script = document.createElement('script');
            script.type = "text/javascript";
            if (typeof (callback) != "undefined") {
                if (script.readyState) {
                    script.onreadystatechange = function () {
                        if (script.readyState == "loaded" || script.readyState == "complete") {
                            script.onreadystatechange = null;
                            callback();
                        }
                    }
                } else {
                    script.onload = function () {
                        callback();
                    }
                }
            }
            script.src = url;
            document.body.appendChild(script);
        },
        show() {
            this.ifShow = !this.ifShow;
            console.log(this.ifShow)
        }
    },
	created() {
		this.$nextTick(()=>{
			this.url = '/blogs'+this.$site.themeConfig.live2dModel
			if (this.url != undefined) {
			    this.loadJs("https://cdn.jsdelivr.net/gh/stevenjoezhang/live2d-widget/autoload.js")
			    window.onload = () => {
			        loadlive2d("live2d", this.url);
			    }
			}
		})
	},
    mounted() {

    }

};
</script>

<style lang="stylus" scoped>
@import url("../public/css/live2d.css");

.live-2d-box {
    position: fixed;
    z-index: 9999;
}



.robot {
    z-index: 99;
    margin: 0 auto;
}
</style>
