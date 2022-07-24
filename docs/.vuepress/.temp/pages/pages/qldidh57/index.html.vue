<template><div><h1 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> .</h1>
<h1 id="typescript-快速上手" tabindex="-1"><a class="header-anchor" href="#typescript-快速上手" aria-hidden="true">#</a> TypeScript 快速上手</h1>
<h3 id="安装typescript以及运行环境" tabindex="-1"><a class="header-anchor" href="#安装typescript以及运行环境" aria-hidden="true">#</a> 安装TypeScript以及运行环境</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>npm i -D typescript
or
npm install -g typescript
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>ts-node</code> 是 Node.js 的 TypeScript 执行引擎和 REPL。</p>
<p>它 JIT 将 TypeScript 转换为 JavaScript，使您无需预编译即可直接在 Node.js 上执行 TypeScript。这是通过挂钩 node 的模块加载 API 来实现的，使其能够与其他 Node.js 工具和库一起无缝使用。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>npm install -D ts-node
or
npm install -g ts-node
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="运行typescript" tabindex="-1"><a class="header-anchor" href="#运行typescript" aria-hidden="true">#</a> 运行TypeScript</h3>
<p>demo-01.ts</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>function hello(name:string):void{
    console.log(`hello ${name}`)
}
hello('Mortal红尘.')
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ts-node demo-01.ts
# ts-node 配合webStorm or VSCode 编码跟顺畅 肥肠方便
or
# typescript
tsc demo-01.ts # 不会直接运行，会编译出一个js文件,默认es2015，
# tsc是typescript自动的命令，编译整个项目or单个文件
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>初始化tsc编译配置文件，配置整个项目编译规则
详情点击<a href="https://www.typescriptlang.org/docs/handbook/tsconfig-json.html" target="_blank" rel="noopener noreferrer">TypeScript的tsconfig.json配置</a></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>tsc --init
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="typescript-常用类型" tabindex="-1"><a class="header-anchor" href="#typescript-常用类型" aria-hidden="true">#</a> TypeScript 常用类型</h3>
<div class="language-TypeScript ext-TypeScript line-numbers-mode"><pre v-pre class="language-TypeScript"><code>// 任意
let an: any = 1
// 字符
let str: String = '1'
// 数字
let num: Number = 1 // NaN Infiity
// 布尔
let bool: Boolean = true
// 数组
let arrNum: Number[] = [123]
// 只存放字符串值
let arr2: Array&lt;String&gt; = ['java']
// 元组,值的顺序必须与定义类型的顺序一致，不能多不能少
let arr: [String, Number] = ['1231', 4444]

let nu: null = null

let vo: void = undefined

let sym: symbol = null

// 枚举 enum , 如果不指定值那么，值将会是索引值(从0开始)
enum networkStatus {
    success,
    error
}
let net: networkStatus = networkStatus.success

// 前者类型不赋值就使用，得到的将是后者的 undefined。后者不是 undefined，前者也没有赋值将报错。
let numt: Number | undefined;
let numt1: Number | null | undefined; // undefined

function run(): void { // 无返回值

}

function run1(): Number { // 可多类型：Number|String

    return 0; // 只能返回 Number 类型
}

/*
never类型是其他类型，包括 null 、 undefined 的子类型,
这意味着声明never类型的变量只能被never类型所赋值。
let a:undefined =;
a=undefined;
a=1;报错

let e:never;
e = (()=&gt; {throw new Error('err')})();
 */

/**
 * 可选参数与默认值，可选参数不能有默认值
 * @param name
 * @param age
 */
function reg(name?: String, age: Number = 0): String {
    return `${name},${age}`
}

/**
 * 传入的参数类型是number,如果写成ret: Number[]如果不用Number()转成number将不能运行
 * 基本包装类型：Number,jisuan() 传入的值是Number,Number与 Number不能进行运算
 * 所以需要转换成number
 * https://blog.csdn.net/baidu_25343343/article/details/54849475
 * @param ret
 */
function count(ret: Number[]): Number {
    var jg: number = 0
    ret.forEach((item, i) =&gt; {
        jg += Number(item)
    })
    return jg
}

console.log(count([1, 12, 312, 31, 23, 1, 31, 231]))

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>
