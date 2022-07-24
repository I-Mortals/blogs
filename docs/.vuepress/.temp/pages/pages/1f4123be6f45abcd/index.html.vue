<template><div><h1 id="es6面向对象" tabindex="-1"><a class="header-anchor" href="#es6面向对象" aria-hidden="true">#</a> ES6面向对象</h1>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>//面向对象封装
class Student{ //定义类 (尊从首字母大写的约定)
    constructor(props){  // 构造函数 （构造函数内定于属性）
        this.name = props.name || '匿名'; // 默认'匿名'
      this.grade = props.grade || 1;
    }
    hello(){ // 在构造函数的原型上定义方法
        console.log(`你好,${this.name}同学，你在${this.grade}年级`);
    }
}



//使用
function createStudent(props) { // 对于new构造函数的封装，其优点：一是不需要new来调用，二是参数灵活
    return new Student(props || {}) // 通过new创建构造函数，并传入参数/属性
}

let niming = createStudent(); 
niming.hello();

let xiaoming = createStudent({
  name:'小明',
  grade:2
});
xiaoming.hello();



//继承
class PrimaryStudent extends Student { //class 子类 extends 父类
    constructor(props) {
        super(props); // 用super调用父类的构造方法实现属性继承
        this.age = props.age || 8; //新增子类属性
    }

    getAge() { //对子类添加方法
        console.log(`${this.name}同学，你今年${this.age}岁`);
    }
}


//使用继承后的
function createPrimaryStudent(props) { // 对于new构造函数的封装，其优点：一是不需要再new来调用，二是参数灵活
    return new PrimaryStudent(props || {}) // 通过new创建构造函数，并传入参数/属性
}

let xiaohong = createPrimaryStudent({
  name:'小红',
  grade:3,
  age:10
});
xiaohong.hello();
xiaohong.getAge();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>
