<template><div><h1 id="golang-helloword的开始" tabindex="-1"><a class="header-anchor" href="#golang-helloword的开始" aria-hidden="true">#</a> golang-HelloWord的开始</h1>
<p>教程目录<a href="http://books.studygolang.com/gobyexample" target="_blank" rel="noopener noreferrer">点击前往</a></p>
<p>第一个程序<code v-pre>hello-word.go</code></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>package main
import &quot;fmt&quot;
func main() {
    fmt.Println(&quot;hello world&quot;)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行与编译</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>go run hello-word.go # hello world
go build hello-word.go # 输出一个二进制文件
#执行编译好的文件
./hello-word
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>
