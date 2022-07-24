<template><div><h1 id="自定义事件" tabindex="-1"><a class="header-anchor" href="#自定义事件" aria-hidden="true">#</a> 自定义事件</h1>
<p><a href="https://cn.vuejs.org/v2/guide/components-custom-events.html" target="_blank" rel="noopener noreferrer">API</a></p>
<h3 id="在组件标签v-on绑定的事件是自定义事件" tabindex="-1"><a class="header-anchor" href="#在组件标签v-on绑定的事件是自定义事件" aria-hidden="true">#</a> 在组件标签v-on绑定的事件是自定义事件</h3>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;div id=&quot;root&quot;&gt;
    &lt;child @click=&quot;handleClick&quot;&gt;&lt;/child&gt; &lt;!--这里click是自定义事件--&gt;
&lt;/div&gt;

&lt;script type=&quot;text/javascript&quot;&gt;
    Vue.component('child', {
        template: '&lt;button&gt;Child&lt;/button&gt;',
    })

    var vm = new Vue({
        el: '#root'
        methods: {
            handleClick() {
                alert('click')
            }
        }
    })
&lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面这种情况，当点击子组件时并不会触发<code v-pre>handleClick()</code>事件，因为此时的<code v-pre>click</code>并非原生的点击事件，而是一个自定义事件。</p>
<p>要想触发组件标签中的<code v-pre>click</code>事件需要通过子组件<code v-pre>$emit</code>来派发</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;div id=&quot;root&quot;&gt;
    &lt;child @click=&quot;handleClick&quot;&gt;&lt;/child&gt;
&lt;/div&gt;

&lt;script type=&quot;text/javascript&quot;&gt;
    Vue.component('child', {
        template: '&lt;button @click=&quot;handleChildClick&quot;&gt;Child&lt;/button&gt;', // 这里的click是原生事件
        methods: {
            handleChildClick() {
                this.$emit('click')
            }
        }
    })

    var vm = new Vue({
        el: '#root'
        methods: {
            handleClick() {
                alert('click')
            }
        }
    })
&lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，子组件内的<code v-pre>click</code>是原生点击事件，通过<code v-pre>$emit</code>派发<code v-pre>click</code>自定义事件触发父组件的<code v-pre>handleClick()</code></p>
<h3 id="使自定义事件变为原生事件" tabindex="-1"><a class="header-anchor" href="#使自定义事件变为原生事件" aria-hidden="true">#</a> 使自定义事件变为原生事件</h3>
<p>使用<code v-pre>.native</code>修饰符把自定义事件变为原生事件</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;div id=&quot;root&quot;&gt;
    &lt;child @click.native=&quot;handleClick&quot;&gt;&lt;/child&gt; &lt;!--自定义事件添加了native修饰符变原生事件--&gt;
&lt;/div&gt;

&lt;script type=&quot;text/javascript&quot;&gt;
    Vue.component('child', {
        template: '&lt;button&gt;Child&lt;/button&gt;',
    })

    var vm = new Vue({
        el: '#root'
        methods: {
            handleClick() {
                alert('click')
            }
        }
    })
&lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，自定义事件<code v-pre>click</code>添加了<code v-pre>.native</code>修饰符，使其变为原生事件，从而触发<code v-pre>handleClick()</code>。</p>
<h3 id="自定义事件名会自动变小写" tabindex="-1"><a class="header-anchor" href="#自定义事件名会自动变小写" aria-hidden="true">#</a> 自定义事件名会自动变小写</h3>
<p>当使用camelCase（驼峰）命名的自定义函数</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>this.$emit('myEvent')
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>则监听这个名字的 kebab-case（烤串） 版本是不会有任何效果的：</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;!-- 没有效果 --&gt;
&lt;my-component v-on:my-event=&quot;doSomething&quot;&gt;&lt;/my-component&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>v-on</code> 事件监听器在 DOM 模板中会被自动转换为全小写 (因为 HTML 是大小写不敏感的)，所以 <code v-pre>v-on:myEvent</code> 将会变成 <code v-pre>v-on:myevent</code>——导致 <code v-pre>myEvent</code> 不可能被监听到。</p>
<p>因此，我们推荐你<strong>始终使用 kebab-case（烤串） 的事件名</strong>。</p>
</div></template>
