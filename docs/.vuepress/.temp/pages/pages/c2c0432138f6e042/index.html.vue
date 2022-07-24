<template><div><h1 id="css3之animation动画" tabindex="-1"><a class="header-anchor" href="#css3之animation动画" aria-hidden="true">#</a> CSS3之animation动画</h1>
<blockquote>
<p>可用<kbd>F12</kbd>开发者工具查看元素及样式，可打开codepen在线编辑代码。</p>
</blockquote>
<p>::: demo [vanilla]</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;html&gt;
  &lt;div class=&quot;animationBox&quot;&gt;
    &lt;div class=&quot;rotate&quot;&gt;旋转动画1&lt;/div&gt;
    &lt;div class=&quot;play&quot;&gt;
      &lt;div class=&quot;img&quot;&gt;旋转动画2&lt;/div&gt;
      &lt;span&gt;&lt;p class=&quot;p2&quot;&gt;&lt;/p&gt;&lt;/span&gt;
      &lt;span&gt;&lt;p&gt;&lt;/p&gt;&lt;/span&gt;
      &lt;span&gt;&lt;p&gt;&lt;/p&gt;&lt;/span&gt;
      &lt;span&gt;&lt;p class=&quot;p2&quot;&gt;&lt;/p&gt;&lt;/span&gt;
    &lt;/div&gt;
    &lt;div class=&quot;elasticity&quot;&gt;弹性动画&lt;/div&gt;
    &lt;div class=&quot;elasticity2&quot;&gt;曲线弹性&lt;/div&gt;
  &lt;/div&gt;
&lt;/html&gt;

&lt;style&gt;
  .animationBox{overflow: hidden;}
  .animationBox&gt;div{
    width: 100px;height: 100px;background: #eee;border-radius: 50%;text-align: center;line-height: 100px;margin: 30px;float:left;
  }
  .rotate{
    animation: rotate 5s linear infinite
  }
  .rotate:hover{ animation-play-state: paused}
  @keyframes rotate {
    0%{transform: rotate(0);}
  100%{transform: rotate(360deg);}
  }
  .animationBox&gt;.play {
    position: relative;
    margin: 50px 30px;
    background:none;
  }
  .play .img{
    position: absolute;
    top: 0;
    left:0;
    z-index: 1;
    width: 100px;height: 100px; background: #eee;
    border-radius: 50%;

    animation: rotate 5s linear infinite
  }
  .play span {
    position: absolute;
    top: 1px;
    left:1px;
    z-index: 0;
    display: block;
    width: 96px;
    height: 96px;
    border: 1px solid #999;
    border-radius: 50%;
  }
  .play span p{display: block;width: 4px;height: 4px;background: #000;margin: -2px 0 0 50%;border-radius: 50%;opacity: 0.5;}
  .play span .p2{margin: 50% 0 0 -2px;}
  .play span{
    animation: wave 5s linear infinite
  }
  .play&gt;span:nth-child(3){
    /* 延迟时间 */
    animation-delay:1s; 
  }
  .play&gt;span:nth-child(4){
    animation-delay:2.2s;
  }
  .play&gt;span:nth-child(5){
    animation-delay:3.8s;
  }
  
  @keyframes wave {
    0%
    {
      transform:scale(1) rotate(360deg);
      opacity: 0.8;
    }
  100%
    {
      transform:scale(1.8) rotate(0deg);
      opacity: 0;
    }
  }


  .elasticity{
    /* 参数说明
      动画名称 花费时间 贝塞尔曲线 延迟开始时间 播放次数n|infinite  是否反向播放动画
    */
    animation: elasticity 1s linear 2s infinite
  }
  
  @keyframes elasticity{
    0%{
      transform: scale(0);
    }
    60%{
      transform: scale(1.1);
    }
    90%{
      transform: scale(1);
    }
  }
  

  .elasticity2{
    /**
    贝塞尔曲线 cubic-bezier(x1,y1,x2,y2)

    通过调整贝塞尔曲线可以设置出多种动画效果，比如反弹效果等
    X轴的范围是0~1，Y轴的取值没有规定，但是也不宜过大
    直线：linear，即cubic-bezier(0,0,1,1)

    贝塞尔曲线在线工具：https://cubic-bezier.com/#.17,.67,.83,.67
      */
    animation: elasticity2 1s cubic-bezier(.39,.62,.74,1.39) 2s infinite
  }
  @keyframes elasticity2{
    0%{
      transform: scale(0);
    }
    90%{
      transform: scale(1);
    }
  }
&lt;/style&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>:::</p>
<h3 id="贝塞尔曲线-cubic-bezier-x1-y1-x2-y2" tabindex="-1"><a class="header-anchor" href="#贝塞尔曲线-cubic-bezier-x1-y1-x2-y2" aria-hidden="true">#</a> 贝塞尔曲线 cubic-bezier(x1,y1,x2,y2)</h3>
<p>通过调整贝塞尔曲线可以设置出多种动画效果，比如反弹效果等 X轴的范围是0~1，Y轴的取值没有规定，但是也不宜过大。 如：直线linear，即cubic-bezier(0,0,1,1)</p>
<p>贝塞尔曲线在线工具：<a href="https://cubic-bezier.com/#.17,.67,.83,.67" target="_blank" rel="noopener noreferrer">https://cubic-bezier.com/#.17,.67,.83,.67</a></p>
<blockquote>
<p>参考：<a href="https://www.w3school.com.cn/css3/index.asp" target="_blank" rel="noopener noreferrer">https://www.w3school.com.cn/css3/index.asp</a></p>
</blockquote>
</div></template>
