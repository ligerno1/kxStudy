# Classes

## 介绍

传统JavaScript使用函数和基于原型的继承来构建可重用组件，但是对于程序员更适合使用面向对象的方法，其中类继承功能和对象都是从这些类构建的。从ECMAScript 2015开始，也被称为 ECMAScript 6, JavaScript 程序员将能够使用这种面向对象的基于类的方法构建他们的应用程序。在TypeScript中，我们允许开发人员现在使用这些技术，并将其编译为适用于所有主流浏览器和平台的JavaScript，而无需等待下一个JavaScript 版本。

## 类

类的示例：

```ts
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");
```

如果您以前使用过C＃或Java，那么语法应该看起来很熟悉。我们声明一个新类Greeter。这个类有三个成员：一个叫做greeting的属性

，一个构造函数和一个方法greet。

你会注意到，在一个类中，当我们用this.引用我们预先设定的类中的一个成员时

，这表示是对类成员的访问。

在最后一行中，我们使用new方法构造了Greeter类的一个实例。这将调用我们之前定义的构造函数，以Greeter类为模型创建一个新对象，并运行构造函数来初始化该新对象。

## 继承

在TypeScript 中，我们可以使用通用的面向对象的模式。当然，基于类的编程中最基本的模式之一是能通过继承扩展现有的类来创建新的类。

```ts
class Animal {
    name: string;
    constructor(theName: string) { this.name = theName; }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

class Snake extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}

class Horse extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);
```

这个例子涵盖了TypeScript中与其他语言通用的许多继承特性。这里我们看到 extends 用于创建子类的关键字。你可以看到这个地方 Horse 和 Snake 子类的基类 Animal，并访问其功能。

包含构造函数的派生类必须调用 super() 它将在基类上执行构造函数。

该示例还显示了如何使用专用于子类的方法覆盖基类中的方法。在这里 Snake，Horse 创建一个 move 覆盖 move 的方法，Animal 为每个类提供特定的功能。请注意即使 tom 被声明为 Animal，因为它的值是 Horse，所以在 tom.move(34) 调用覆盖方法时 Horse:

```ts
Slithering...
Sammy the Python moved 5m.
Galloping...
Tommy the Palomino moved 34m.
```

## 公共，私人和受保护的修饰符

## 公共默认

在我们的例子中，我们可以自由访问我们在整个程序中声明的成员。如果你熟悉其他语言的类，你可能已经注意到上面的例子中，我们没有必要用这个词 public 来实现这个；例如，C# 要求将每个成员显式表示 public 为可见。在TypeScript中，每个成员都是 public 默认的。

您仍然可以 public 明确地标记成员。我们可以用 Animal 以下方式编写上一节的课程：

```TS
class Animal {
    public name: string;
    public constructor(theName: string) { this.name = theName; }
    public move(distanceInMeters: number) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}
```

## 理解 private

当成员被标记 private 时，不能从其包含的类以外访问它。例如：

```TS
class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

new Animal("Cat").name; // Error: 'name' is private;
```

TypeScript 是一个结构类型系统。当我们比较两种不同的类型时，不管它们来自哪里，如果所有成员的类型都是兼容的，那么我们说这些类型本身是兼容的。

然后，比较有类型时 private 和 protected 成员，我们区别对待这些类型。对于两种被视为兼容的类型，如果其中一个类型具有 private 成员，则另一个类型必须具有 private 始发于相同声明的成员。这同样适用于 protected 会员。

示例：

```ts
class Animal {
  private name: string;
  constructor(theName: string) { this.name = theName; }
}

class Rhino extends Animal {
  constructor() { super("Rhino"); }
}

class Employee {
  private name: string;
  constructor(theName: string) { this.name = theName; }
}

let animal = new Animal("Goat");
let rhino = new Rhino();
let employee = new Employee("Bob");

animal = rhino;
animal = employee; // Error: 'Animal' and 'Employee' are not compatible
```

在这个例子中，我们有一个Animal和一个Rhino，Rhino作为的一个子类Animal。我们也有一个Employee类似于Animal形状的新课程。我们创建这些类的一些实例，然后尝试将它们分配给对方，以查看会发生什么。由于Animal和Rhino共享private来自同一个声明它们的形状一边private name: string在Animal，他们是兼容的。但是，情况并非如此Employee。当我们尝试从一个to分配时Employee，Animal我们会得到这些类型不兼容的错误。尽管Employee也有一位private会员打来电话name，但这不是我们所宣布的Animal。

## 理解 protected

该 protected 修改的行为很像 private 与成员声明的除外修改 protected ，有可以通过派生类的实例访问。例如，

```ts
class Person {
    protected name: string;
    constructor(name: string) { this.name = name; }
}

class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
console.log(howard.name); // error
```

注意虽然我们不能name从外部使用Person，但是我们仍然可以从实例方法中使用它，Employee因为它Employee派生自Person。

构造函数也可能被标记protected。这意味着该类不能在其包含的类之外实例化，但可以扩展。例如，

```ts
class Person {
  protected name: string;
  protected constructor(theName: string) { this.name = theName; }
}

// Employee can extend Person
class Employee extends Person {
  private department: string;

  constructor(name: string, department: string) {
    super(name);
    this.department = department;
  }

  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}

let howard = new Employee("Howard", "Sales");
let john = new Person("John"); // Error: The 'Person' constructor is protected
```

## 只读修饰符

您可以使用 readonly 关键字只读属性。只读属性必须在其声明或构造函数中初始化。

```ts
class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor(theName: string) {
        this.name = theName;
    }
}
let dad = new Octopus("Man with the 8 strong legs");
dad.name = "Man with the 3-piece suit"; // error! name is readonly.
```

## 参数属性

在我们的最后一个例子中，我们不得不在类中声明只读成员 name 和构造函数参数 theName，Octopus 然后立即设置 name 为 theName。这原来是一种非常普遍的做法。通过参数属性，您可以在一个位置创建和初始化成员。以下是 Octopus 使用参数属性对前一个类进行的进一步修订：

```ts
class Octopus {
    readonly numberOfLegs: number = 8;
    constructor(readonly name: string) {

    }
}
```

注意我们theName完全放弃了，只是readonly name: string在构造函数中使用缩短的参数来创建和初始化name成员。我们已将声明和分配合并到一个位置。

参数属性是通过在构造函数参数前加上辅助功能修饰符readonly或两者来声明的。使用private参数属性声明并初始化一个私有成员; 同样，这同样适用于做public，protected和readonly。

## 访问器

TypeScript 支持 getters / setter 作为拦截访问对象成员的一种方式。这使您可以更细致地控制每个对象上的成员访问方式。

让我们转换一个简单的类类使用 get 和 set。首先，我们从没有getter和setter的例子开始。

```ts
class Employee {
    fullName: string;
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    console.log(employee.fullName);
}
```

虽然允许人们fullName直接随机设置非常方便，但如果人们可以随时更改名称，这可能会让我们陷入麻烦。

在这个版本中，我们检查以确保用户在我们允许他们修改员工之前有一个秘密密码。我们通过用fullName一个set将检查密码的直接访问来替代。我们添加一个相应的get以允许前面的示例继续无缝工作。

```TS
let passcode = "secret passcode";

class Employee {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        } else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    console.log(employee.fullName);
}
```

为了向我们证明我们的访问者现在正在检查密码，我们可以修改密码，并查看与密码不匹配时，我们会收到警告我们无法更新员工的消息。

有关访问者需要注意的几件事情：

首先，访问器要求您将编译器设置为输出ECMAScript 5或更高版本。向下转换为ECMAScript 3不受支持。其次，具有a get和no的访问器set被自动推断为是readonly。这在.d.ts从代码生成文件时很有用，因为您的属性的用户可以看到他们无法更改它。

## 静态属性

到目前为止，我们只讨论了类的实例成员，这些成员在实例化时显示在对象上。我们也可以创建一个类的静态成员，这些成员在类本身而不是实例上是可见的。在这个例子中，我们使用static原点，因为它是所有网格的一般值。每个实例通过预先添加类的名称来访问此值。与this.在实例访问前面预先设置类似，这里我们Grid.在静态访问前加上前缀。

```TS
class Grid {
    static origin = {x: 0, y: 0};
    calculateDistanceFromOrigin(point: {x: number; y:number;}) {
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
    constructor (public scale: number) {}
}

let grid1 = new Grid(1.0);  // 1x scale
let grid2 = new Grid(5.0);  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));
```

## 抽象类

抽象类是可以派生其他类的基类。它们可能不会被直接实例化。与接口不同，抽象类可能包含其成员的实现细节。该abstract关键字用于抽象类中定义抽象类以及抽象方法。

```TS
abstract class Animal {
    abstract makeSound(): void;
    move(): void {
        console.log("roaming the earth...");
    }
}
```

抽象类中标记为抽象的方法不包含实现，并且必须在派生类中实现。抽象方法与接口方法有相似的语法。两者都定义了方法的签名而不包含方法体。但是，抽象方法必须包含abstract关键字，并可以选择包含访问修饰符。

```ts
abstract class Department {

    constructor(public name: string) {}

    printName(): void {
        console.log("Department name: " + this.name);
    }

    abstract printMeeting(): void; // must be implemented in derived classes

}

class AccountingDepartment extends Department {
    constructor() {
        super("Accounting and Auditing"); // constructors in derived classes must call super()
    }

    printMeeting(): void {
        console.log("The Accounting Department meets each Monday at 10am.");
    }

    generateReports(): void {
        console.log("Generating accounting reports...");
    }
}

let department: Department; // ok to create a reference to an abstract type
department = new Department(); // error: cannot create an instance of an abstract class
department = new AccountingDepartment(); // ok to create and assign a non-abstract subclass
department.printName();
department.printMeeting();
department.generateReports(); // error: method doesn't exist on declared abstract type
```

## 先进技术

## 构造函数

当你在TypeScript中声明一个类时，你实际上是同时创建了多个声明。第一个是类的实例的类型。

```TS
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
let greeter: Greeter;
greeter = new Greeter("world");
console.log(greeter.greet());

```

在这里，当我们说let greeter: Greeter，我们正在使用Greeter类的实例类Greeter。这几乎是其他面向对象语言的程序员的第二本质。

我们还创建了另一个我们称之为构造函数的值。这是在我们new启动类的实例时调用的函数。要在实践中看到这个看起来像什么，我们来看看上面例子中创建的JavaScript：

```js
let Greeter = (function () {
  function Greeter(message) {
    this.greeting = message;
  }
  Greeter.prototype.greet = function () {
    return "Hello, " + this.greeting;
  };
  return Greeter;
})();

let greeter;
greeter = new Greeter("world");
console.log(greeter.greet());
```

这里，let Greeter将要分配构造函数。当我们调用new并运行这个函数时，我们得到了这个类的一个实例。构造函数还包含该类的所有静态成员。另一种思考每个类的方法是存在一个实例端和一个静态端。

```ts
class Greeter {
  static standardGreeting = "Hello, there";
  greeting: string;
  greet() {
    if (this.greeting) {
      return "Hello, " + this.greeting;
    }
    else {
      return Greeter.standardGreeting;
    }
  }
}

let greeter1: Greeter;
greeter1 = new Greeter();
console.log(greeter1.greet());

let greeterMaker: typeof Greeter = Greeter;
greeterMaker.standardGreeting = "Hey there!";

let greeter2: Greeter = new greeterMaker();
console.log(greeter2.greet());
```

在这个例子中，greeter1工作方式与之前相似。我们实例化这个Greeter类，并使用这个对象。这是我们以前见过的。

接下来，我们直接使用这个类。这里我们创建一个名为的新变量greeterMaker。这个变量将保存类本身，或者说它的构造函数的另一种方式。这里我们使用的typeof Greeter是“给我Greeter类的类型本身”，而不是实例类型。或者，更准确地说，“给我所谓的符号Greeter的类型”，这是构造函数的类型。此类型将包含Greeter的所有静态成员以及创建Greeter该类的实例的构造函数。我们通过使用newon来展示这一点greeterMaker，创建新的实例Greeter并像以前一样调用它们。

## 使用一个类作为接口

正如我们在上一节中所说的，类声明创建了两件事：一个表示类的实例的类型和一个构造函数。由于类创建类型，因此可以在相同的地方使用它们，以便能够使用接口。

```ts
class Point {
    x: number;
    y: number;
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = {x:1, y:2, z:3};
```
