<template><div><h1 id="类" tabindex="-1"><a class="header-anchor" href="#类" aria-hidden="true">#</a> 类</h1>
<p>对于传统的 JavaScript 程序我们会使用函数和基于原型的继承来创建可重用的组件，但对于熟悉使用面向对象方式的程序员使用这些语法就有些棘手，因为他们用的是基于类的继承并且对象是由类构建出来的。 从 ECMAScript 2015，也就是 ES6 开始， JavaScript 程序员将能够使用基于类的面向对象的方式。 使用 TypeScript，我们允许开发者现在就使用这些特性，并且编译后的 JavaScript 可以在所有主流浏览器和平台上运行，而不需要等到下个 JavaScript 版本。</p>
<h2 id="基本示例" tabindex="-1"><a class="header-anchor" href="#基本示例" aria-hidden="true">#</a> 基本示例</h2>
<p>下面看一个使用类的例子：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>class Greeter {
  greeting: string
  constructor(message: string) {
    this.greeting = message
  }
  greet() {
    return 'Hello, ' + this.greeting
  }
}

let greeter = new Greeter('world')
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你使用过 C# 或 Java，你会对这种语法非常熟悉。 我们声明一个 <code v-pre>Greeter</code> 类。这个类有 3 个成员：一个叫做 <code v-pre>greeting</code> 的属性，一个构造函数和一个 <code v-pre>greet</code> 方法。</p>
<p>你会注意到，我们在引用任何一个类成员的时候都用了 <code v-pre>this</code>。 它表示我们访问的是类的成员。</p>
<p>最后一行，我们使用 <code v-pre>new</code> 构造了 <code v-pre>Greeter</code> 类的一个实例。它会调用之前定义的构造函数，创建一个 <code v-pre>Greeter</code> 类型的新对象，并执行构造函数初始化它。</p>
<h2 id="继承" tabindex="-1"><a class="header-anchor" href="#继承" aria-hidden="true">#</a> 继承</h2>
<p>在 TypeScript 里，我们可以使用常用的面向对象模式。 基于类的程序设计中一种最基本的模式是允许使用继承来扩展现有的类。</p>
<p>看下面的例子：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>class Animal {
  move(distance: number = 0) {
    console.log(`Animal moved ${distance}m.`)
  }
}

class Dog extends Animal {
  bark() {
    console.log('Woof! Woof!')
  }
}

const dog = new Dog()
dog.bark()
dog.move(10)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个例子展示了最基本的继承：类从基类中继承了属性和方法。 这里，<code v-pre>Dog</code> 是一个 派生类，它派生自 <code v-pre>Animal</code> 基类，通过 <code v-pre>extends</code> 关键字。 派生类通常被称作<em>子类</em>，基类通常被称作<em>超类</em>。</p>
<p>因为 <code v-pre>Dog</code> 继承了 <code v-pre>Animal</code> 的功能，因此我们可以创建一个 <code v-pre>Dog</code> 的实例，它能够 <code v-pre>bark()</code> 和 <code v-pre>move()</code>。</p>
<p>下面我们来看个更加复杂的例子。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>class Animal {
  name: string
  constructor(name: string) {
    this.name = name
  }
  move(distance: number = 0) {
    console.log(`${this.name} moved ${distance}m.`)
  }
}

class Snake extends Animal {
  constructor(name: string) {
    super(name)
  }
  move(distance: number = 5) {
    console.log('Slithering...')
    super.move(distance)
  }
}

class Horse extends Animal {
  constructor(name: string) {
    super(name)
  }
  move(distance: number = 45) {
    console.log('Galloping...')
    super.move(distance)
  }
}

let sam = new Snake('Sammy')
let tom: Animal = new Horse('Tommy')

sam.move()
tom.move(34)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个例子展示了一些上面没有提到的特性。 这一次，我们使用 <code v-pre>extends</code> 关键字创建了 Animal的两个子类：<code v-pre>Horse</code> 和 <code v-pre>Snake</code>。</p>
<p>与前一个例子的不同点是，派生类包含了一个构造函数，它 必须调用 <code v-pre>super()</code>，它会执行基类的构造函数。 而且，在构造函数里访问 <code v-pre>this</code> 的属性之前，我们 一定要调用 <code v-pre>super()</code>。 这个是 TypeScript 强制执行的一条重要规则。</p>
<p>这个例子演示了如何在子类里可以重写父类的方法。<code v-pre>Snake</code>类和 <code v-pre>Horse</code> 类都创建了 <code v-pre>move</code> 方法，它们重写了从 <code v-pre>Animal</code> 继承来的 <code v-pre>move</code> 方法，使得 <code v-pre>move</code> 方法根据不同的类而具有不同的功能。注意，即使 <code v-pre>tom</code> 被声明为 <code v-pre>Animal</code> 类型，但因为它的值是 <code v-pre>Horse</code>，调用 <code v-pre>tom.move(34)</code> 时，它会调用 <code v-pre>Horse</code> 里重写的方法。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Slithering...
Sammy moved 5m.
Galloping...
Tommy moved 34m.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="公共-私有与受保护的修饰符" tabindex="-1"><a class="header-anchor" href="#公共-私有与受保护的修饰符" aria-hidden="true">#</a> 公共，私有与受保护的修饰符</h2>
<h3 id="默认为-public" tabindex="-1"><a class="header-anchor" href="#默认为-public" aria-hidden="true">#</a> 默认为 public</h3>
<p>在上面的例子里，我们可以自由的访问程序里定义的成员。 如果你对其它语言中的类比较了解，就会注意到我们在之前的代码里并没有使用 <code v-pre>public</code> 来做修饰；例如，C# 要求必须明确地使用 <code v-pre>public</code> 指定成员是可见的。 在 TypeScript 里，成员都默认为 <code v-pre>public</code>。</p>
<p>你也可以明确的将一个成员标记成 <code v-pre>public</code>。 我们可以用下面的方式来重写上面的 <code v-pre>Animal</code> 类：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>class Animal {
  public name: string
  public constructor(name: string) {
    this.name = name
  }
  public move(distance: number) {
    console.log(`${this.name} moved ${distance}m.`)
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="理解-private" tabindex="-1"><a class="header-anchor" href="#理解-private" aria-hidden="true">#</a> 理解 private</h3>
<p>当成员被标记成 <code v-pre>private</code> 时，它就不能在声明它的类的外部访问。比如：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>class Animal {
  private name: string
  constructor(name: string) {
    this.name = name
  }
}

new Animal('Cat').name // 错误: 'name' 是私有的.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>TypeScript 使用的是结构性类型系统。 当我们比较两种不同的类型时，并不在乎它们从何处而来，如果所有成员的类型都是兼容的，我们就认为它们的类型是兼容的。</p>
<p>然而，当我们比较带有 <code v-pre>private</code> 或 <code v-pre>protected</code> 成员的类型的时候，情况就不同了。 如果其中一个类型里包含一个 <code v-pre>private</code> 成员，那么只有当另外一个类型中也存在这样一个 <code v-pre>private</code> 成员，并且它们都是来自同一处声明时，我们才认为这两个类型是兼容的。 对于 <code v-pre>protected</code> 成员也使用这个规则。</p>
<p>下面来看一个例子，更好地说明了这一点：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>class Animal {
  private name: string
  constructor(name: string) {
    this.name = name
  }
}

class Rhino extends Animal {
  constructor() {
    super('Rhino')
  }
}

class Employee {
  private name: string
  constructor(name: string) {
    this.name = name
  }
}

let animal = new Animal('Goat')
let rhino = new Rhino()
let employee = new Employee('Bob')

animal = rhino
animal = employee // 错误: Animal 与 Employee 不兼容.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个例子中有 <code v-pre>Animal</code> 和 <code v-pre>Rhino</code> 两个类， <code v-pre>Rhino</code> 是 <code v-pre>Animal</code> 类的子类。 还有一个 <code v-pre>Employee</code> 类，其类型看上去与 <code v-pre>Animal</code> 是相同的。 我们创建了几个这些类的实例，并相互赋值来看看会发生什么。 因为 <code v-pre>Animal</code> 和 <code v-pre>Rhino</code> 共享了来自 <code v-pre>Animal</code> 里的私有成员定义 <code v-pre>private name: string</code>，因此它们是兼容的。然而 <code v-pre>Employee</code> 却不是这样。当把 <code v-pre>Employee</code> 赋值给 <code v-pre>Animal</code> 的时候，得到一个错误，说它们的类型不兼容。尽管 <code v-pre>Employee</code> 里也有一个私有成员 <code v-pre>name</code>，但它明显不是 <code v-pre>Animal</code> 里面定义的那个。</p>
<h3 id="理解-protected" tabindex="-1"><a class="header-anchor" href="#理解-protected" aria-hidden="true">#</a> 理解 protected</h3>
<p><code v-pre>protected</code> 修饰符与 <code v-pre>private</code> 修饰符的行为很相似，但有一点不同，<code v-pre>protected</code>成员在派生类中仍然可以访问。例如：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>class Person {
  protected name: string
  constructor(name: string) {
    this.name = name
  }
}

class Employee extends Person {
  private department: string

  constructor(name: string, department: string) {
    super(name)
    this.department = department
  }

  getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`
  }
}

let howard = new Employee('Howard', 'Sales')
console.log(howard.getElevatorPitch())
console.log(howard.name) // error
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，我们不能在 <code v-pre>Person</code> 类外使用 <code v-pre>name</code>，但是我们仍然可以通过 <code v-pre>Employee</code> 类的实例方法访问，因为 <code v-pre>Employee</code> 是由 <code v-pre>Person</code>  派生而来的。</p>
<p>构造函数也可以被标记成 <code v-pre>protected</code>。 这意味着这个类不能在包含它的类外被实例化，但是能被继承。比如：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>class Person {
  protected name: string
  protected constructor(name: string) {
    this.name = name
  }
}

// Employee 能够继承 Person
class Employee extends Person {
  private department: string

  constructor(name: string, department: string) {
    super(name)
    this.department = department
  }

  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`
  }
}

let howard = new Employee('Howard', 'Sales')
let john = new Person('John') // 错误: 'Person' 的构造函数是被保护的.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="readonly-修饰符" tabindex="-1"><a class="header-anchor" href="#readonly-修饰符" aria-hidden="true">#</a> readonly 修饰符</h2>
<p>你可以使用 <code v-pre>readonly</code> 关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>class Person {
  readonly name: string
  constructor(name: string) {
    this.name = name
  }
}

let john = new Person('John')
john.name = 'peter'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="参数属性" tabindex="-1"><a class="header-anchor" href="#参数属性" aria-hidden="true">#</a> 参数属性</h3>
<p>在上面的例子中，我们必须在 <code v-pre>Person</code> 类里定义一个只读成员 <code v-pre>name</code> 和一个参数为 <code v-pre>name</code> 的构造函数，并且立刻将 <code v-pre>name</code> 的值赋给 <code v-pre>this.name</code>，这种情况经常会遇到。 参数属性可以方便地让我们在一个地方定义并初始化一个成员。 下面的例子是对之前 <code v-pre>Person</code> 类的修改版，使用了参数属性：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>class Person {
  constructor(readonly name: string) {
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意看我们是如何舍弃参数 <code v-pre>name</code>，仅在构造函数里使用 <code v-pre>readonly name: string</code> 参数来创建和初始化 <code v-pre>name</code> 成员。 我们把声明和赋值合并至一处。</p>
<p>参数属性通过给构造函数参数前面添加一个访问限定符来声明。使用 <code v-pre>private</code> 限定一个参数属性会声明并初始化一个私有成员；对于 <code v-pre>public</code> 和 <code v-pre>protected</code> 来说也是一样。</p>
<h2 id="存取器" tabindex="-1"><a class="header-anchor" href="#存取器" aria-hidden="true">#</a> 存取器</h2>
<p><code v-pre>TypeScript</code> 支持通过 <code v-pre>getters/setters</code> 来截取对对象成员的访问。 它能帮助你有效的控制对对象成员的访问。</p>
<p>下面来看如何把一个简单的类改写成使用 <code v-pre>get</code> 和 <code v-pre>set</code>。 首先，我们从一个没有使用存取器的例子开始。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>class Employee {
  fullName: string
}

let employee = new Employee()
employee.fullName = 'Bob Smith'
if (employee.fullName) {
  console.log(employee.fullName)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以设置 <code v-pre>fullName</code>，因为它是 <code v-pre>public</code> 的，有时候当我们去修改它的时候触发一些额外逻辑，存取器就派上用场了。</p>
<p>下面这个版本里，我们先检查用户密码是否正确，然后再允许其修改员工信息。我们把对 <code v-pre>fullName</code> 的直接访问改成了可以检查密码的 <code v-pre>set</code> 方法。 我们也加了一个 <code v-pre>get</code> 方法，让上面的例子仍然可以工作。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>let passcode = 'secret passcode'

class Employee {
  private _fullName: string

  get fullName(): string {
    return this._fullName
  }

  set fullName(newName: string) {
    if (passcode &amp;&amp; passcode == 'secret passcode') {
      this._fullName = newName
    }
    else {
      console.log('Error: Unauthorized update of employee!')
    }
  }
}

let employee = new Employee()
employee.fullName = 'Bob Smith'
if (employee.fullName) {
  console.log(employee.fullName)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以修改一下密码，来验证一下存取器是否是工作的。当密码不对时，会提示我们没有权限去修改员工。</p>
<p>对于存取器有下面几点需要注意的：</p>
<p>首先，存取器要求你将编译器设置为输出 ECMAScript 5 或更高。 不支持降级到 ECMAScript 3。其次，只带有 <code v-pre>get</code> 不带有 <code v-pre>set</code> 的存取器自动被推断为 <code v-pre>readonly</code>。这在从代码生成 <code v-pre>.d.ts</code> 文件时是有帮助的，因为利用这个属性的用户会看到不允许够改变它的值。</p>
<h2 id="静态属性" tabindex="-1"><a class="header-anchor" href="#静态属性" aria-hidden="true">#</a> 静态属性</h2>
<p>到目前为止，我们只讨论了类的实例成员，那些仅当类被实例化的时候才会被初始化的属性。 我们也可以创建类的静态成员，这些属性存在于类本身上面而不是类的实例上。 在这个例子里，我们使用 <code v-pre>static</code> 定义 <code v-pre>origin</code>，因为它是所有网格都会用到的属性。 每个实例想要访问这个属性的时候，都要在 <code v-pre>origin</code> 前面加上类名。 如同在实例属性上使用 <code v-pre>this.xxx</code> 来访问属性一样，这里我们使用 <code v-pre>Grid.xxx</code> 来访问静态属性。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>class Grid {
  static origin = {x: 0, y: 0}

  scale: number

  constructor (scale: number) {
    this.scale = scale
  }

  calculateDistanceFromOrigin(point: {x: number; y: number}) {
    let xDist = point.x - Grid.origin.x
    let yDist = point.y - Grid.origin.y
    return Math.sqrt(xDist * xDist + yDist * yDist) * this.scale
  }
}

let grid1 = new Grid(1.0)  // 1x scale
let grid2 = new Grid(5.0)  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({x: 3, y: 4}))
console.log(grid2.calculateDistanceFromOrigin({x: 3, y: 4}))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="抽象类" tabindex="-1"><a class="header-anchor" href="#抽象类" aria-hidden="true">#</a> 抽象类</h2>
<p>抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。不同于接口，抽象类可以包含成员的实现细节。 <code v-pre>abstract</code> 关键字是用于定义抽象类和在抽象类内部定义抽象方法。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>abstract class Animal {
  abstract makeSound(): void
  move(): void {
    console.log('roaming the earth...')
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。 抽象方法的语法与接口方法相似。两者都是定义方法签名但不包含方法体。 然而，抽象方法必须包含 <code v-pre>abstract</code> 关键字并且可以包含访问修饰符。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>abstract class Department {
  name: string

  constructor(name: string) {
     this.name = name
  }

  printName(): void {
    console.log('Department name: ' + this.name)
  }

  abstract printMeeting(): void // 必须在派生类中实现
}

class AccountingDepartment extends Department {
  constructor() {
    super('Accounting and Auditing') // 在派生类的构造函数中必须调用 super()
  }

  printMeeting(): void {
    console.log('The Accounting Department meets each Monday at 10am.')
  }

  generateReports(): void {
    console.log('Generating accounting reports...')
  }
}

let department: Department // 允许创建一个对抽象类型的引用
department = new Department() // 错误: 不能创建一个抽象类的实例
department = new AccountingDepartment() // 允许对一个抽象子类进行实例化和赋值
department.printName()
department.printMeeting()
department.generateReports() // 错误: 方法在声明的抽象类中不存在
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="高级技巧" tabindex="-1"><a class="header-anchor" href="#高级技巧" aria-hidden="true">#</a> 高级技巧</h2>
<h3 id="构造函数" tabindex="-1"><a class="header-anchor" href="#构造函数" aria-hidden="true">#</a> 构造函数</h3>
<p>当你在 TypeScript 里声明了一个类的时候，实际上同时声明了很多东西。首先就是类的<em>实例</em>的类型。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>class Greeter {
  static standardGreeting = 'Hello, there'
  greeting: string
  constructor(message: string) {
    this.greeting = message
  }
  greet() {
    return 'Hello, ' + this.greeting
  }
}

let greeter: Greeter
greeter = new Greeter('world')
console.log(greeter.greet())
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，我们写了 <code v-pre>let greeter: Greeter</code>，意思是 <code v-pre>Greeter</code> 类的实例的类型是 <code v-pre>Greeter</code>。 这对于用过其它面向对象语言的程序员来讲已经是老习惯了。</p>
<p>我们也创建了一个叫做<em>构造函数的值</em>。 这个函数会在我们使用 <code v-pre>new</code> 创建类实例的时候被调用。 下面我们来看看，上面的代码被编译成JavaScript后是什么样子的：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>var Greeter = /** @class */ (function () {
  function Greeter(message) {
    this.greeting = message;
  }
  Greeter.prototype.greet = function () {
    return 'Hello, ' + this.greeting;
  };
  Greeter.standardGreeting = 'Hello, there';
  return Greeter;
}());
var greeter;
greeter = new Greeter('world');
console.log(greeter.greet());
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码里，<code v-pre>var Greeter</code> 将被构造函数赋值。 当我们调用 <code v-pre>new</code> 并执行了这个函数后，便会得到一个类的实例。这个构造函数也包含了类的所有静态属性。 换个角度说，我们可以认为类具有<em>实例部分</em>与<em>静态部分</em>这两个部分。</p>
<p>让我们稍微改写一下这个例子，看看它们之间的区别：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>class Greeter {
  static standardGreeting = 'Hello, there'

  greeting: string

  constructor(message?: string) {
    this.greeting = message
  }

  greet() {
    if (this.greeting) {
      return 'Hello, ' + this.greeting
    } else {
      return Greeter.standardGreeting
    }
  }
}

let greeter: Greeter
greeter = new Greeter()
console.log(greeter.greet())

let greeterMaker: typeof Greeter = Greeter
greeterMaker.standardGreeting = 'Hey there'

let greeter2: Greeter = new greeterMaker()
console.log(greeter2.greet())
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个例子里， <code v-pre>greeter1</code> 与之前看到的一样。 我们实例化 Greeter类，并使用这个对象。 与我们之前看到的一样。</p>
<p>再之后，我们直接使用类。 我们创建了一个叫做 <code v-pre>greeterMaker</code> 的变量。这个变量保存了这个类或者说保存了类构造函数。 然后我们使用 <code v-pre>typeof Greeter</code>，意思是取 <code v-pre>Greeter</code> 类的类型，而不是实例的类型。或者更确切的说，&quot;告诉我 <code v-pre>Greeter</code> 标识符的类型&quot;，也就是构造函数的类型。 这个类型包含了类的所有静态成员和构造函数。 之后，就和前面一样，我们在 <code v-pre>greeterMaker</code> 上使用 <code v-pre>new</code>，创建 <code v-pre>Greeter</code> 的实例。</p>
<h3 id="把类当做接口使用" tabindex="-1"><a class="header-anchor" href="#把类当做接口使用" aria-hidden="true">#</a> 把类当做接口使用</h3>
<p>如上一节里所讲的，类定义会创建两个东西：类的实例类型和一个构造函数。 因为类可以创建出类型，所以你能够在允许使用接口的地方使用类。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>class Point {
  x: number
  y: number
}

interface Point3d extends Point {
  z: number
}

let point3d: Point3d = {x: 1, y: 2, z: 3}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>
