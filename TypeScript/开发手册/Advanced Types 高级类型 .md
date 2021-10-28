# Advanced Types

## 目录
```
相交类型
联盟类型
类型守卫和区分类型
用户定义的类型守卫
typeof 类型的guards
instanceof 类型的guards
可空类型
可选参数和属性
输入警卫和类型断言
类型别名
接口与类型别名
字符串文字类型
数字文字类型
枚举成员类型
歧视工会
彻底检查
多态this类型
索引类型
索引类型和字符串索引签名
映射类型
从映射类型推断
```

## 相交类型

- 交集类型将多种类型合并为一个。这使您可以将现有类型添加到一起，以获得具有所需所有功能的单一类型。例如，Person & Serializable & Loggable 是 Person 和 Serializable 和 Loggable。这意味着这种类型的对象将具有所有三种类型的所有成员。
下面展示如何创建一个 mixin:

```ts
function extend<T, U>(first: T, second: U): T & U {
    let result = <T & U>{};
    for (let id in first) {
        (<any>result)[id] = (<any>first)[id];
    }
    for (let id in second) {
        if (!result.hasOwnProperty(id)) {
            (<any>result)[id] = (<any>second)[id];
        }
    }
    return result;
}

class Person {
    constructor(public name: string) {}
}
interface Loggable {
    log(): void;
}
class ConcoleLogger implements Loggable {
    log() {
        // ...
    }
}
var jim = extend(new Person("jim"), new ConsoleLogger());
var n = jim.name;
jim.log();
```

## 联盟类型

- 联合类型与交叉点类型密切相关，但它们的使用方式非常不同。偶尔，你会遇到一个库，期望一个参数是一个 number 或一个 string。例如，采取以下功能：

```ts
/**
 * Takes a string and adds "padding" to the left.
 * If 'padding' is a string, then 'padding' is appended to the left side.
 * If 'padding' is a number, then that number of spaces is added to the left side.
 */

function padLeft(value: string, padding: any) {
    if (typeof padding === "number") {
        return Array(padding + 1).join("") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, go '${padding}'.`);
}

padLeft("Hello world", 4);  // returns "  hello world"

```

- 问题padLeft在于它的padding参数被键入为any。这意味着我们可以用一个既不是a number也不是a 的参数来调用它string，但TypeScript将会与它无关。

```ts
let indentedString = padLeft("Hello world", true); // passes at compile time, fails at runtime.
```

- 在传统的面向对象的代码中，我们可以通过创建类型的层次来对这两种类型进行抽象。虽然这更明确，但也有点矫枉过正。
- 而不是any，我们可以为参数使用联合类型padding：

```ts
/**
 * Takes a string and adds "padding" to the left.
 * If 'padding' is a string, then 'padding' is appended to the left side.
 * If 'padding' is a number, then that number of spaces is added to the left side.
 */
function padLeft(value: string, padding: string | number) {
  // ...
}

let indentedString = padLeft("Hello world", true); // errors during compilation
```

- 联合类型描述的值可以是几种类型之一。我们使用竖线（|）来分隔每种类型，number | string | boolean 值也可以是 number, string 或 boolean。 
- 如果我们有一个具有联合类型的值，那么我们只能访问联合中所有类型共有的成员。

```ts
interface Bird {
    fly();
    layEggs();
}

interface Eish {
    swim();
    layEggs();
}

function getSmallPet(): Fish | Bird {
    // ...
}

let pet = getSmallPet();
pet.layEggs(); // okay  Brid 和 Fish 共有的是 layEggs
pet.swim(); // error 
```

## 类型守卫和区分类型

- 联合类型对建模情况很有用，当值可以在它们可以采取的类型中重叠时。当我们需要特别了解我们是否有一个 Fish？ 时会发生什么？在JavaScript中区分两种可能值的常见习惯是检查是否存在成员。正如我们所提到的，您只能访问保证参加工会类型所有组成部分的成员。

```TS
let pet = getSmallPet();

// Each of these property accesses will cause an error
if (pet.swim) {
  pet.swim();
}
else if (pet.fly) {
  pet.fly();
}
```

- 要获得相同的代码，我们需要使用类型断言：

```TS
let pet = getSmallPet();

if ((<Fish>pet).swim) {
    (<Fish>pet).swim();
} else {
    (<Bird>pet).fly();
}
```

## 用户定义的类型守卫

- 请注意，我们必须多次使用类型断言。如果一旦我们执行了检查，我们就可以知道 pet 每个分支内的类型。
- 恰巧TypeScript有一种叫做守卫的东西。类型守护是一种执行运行时检查的表达式，它保证某个范围内的类型。为了定义一个类型守护，我们只需要定义一个函数，它的返回类型是一个类型谓词：

```ts
function isFish(pet: Fish | Bird): pet is Fish {
    return (<Fish>pet).swim !== undefined;
}
```

- pet is Fish 在这个例子中是我们的类型谓词。谓词采用这种形式 parameterName is Type，其中 parameterName 必须是当前函数签名中参数的名称。任何时候 isFish 都被某个变量调用，如果原始类型兼容，TypeScript会将该变量缩小到该特定类型。

```ts
// Both calls to 'swim' and 'fly' are now okay.

if (isFish(pet)) {
  pet.swim();
}
else {
  pet.fly();
}
```

- 请注意，TypeScript不仅知道 pet 是 Fish 在 if 分支；它也知道在 else 分支中，你没有一个 Fish，所以你必须有一个 Bird。

## typeof 类型的 guards

- 我们回过头来为padLeft使用联合类型的版本编写代码。我们可以使用类型谓词来编写它，如下所示：

```ts
function inNumber(x: any): x is number {
    return typeof x === "number";
}

function isString(x: any): x is string {
    return typeof x === "string";
}

function padLeft(value: string, padding: string | number) {
    if (isNumber(padding)) {
        return Array(padding + 1).join(" ") + value;
    }
    if (isString(padding)) {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}

```

- 然而，不得不定义一个函数来判断一个类型是否是一个原语是一种痛苦。幸运的是，您不需要将typeof x === "number"其抽象到自己的函数中，因为TypeScript将自己识别为类型警卫。这意味着我们可以直接写这些检查。

```ts
function padLeft(value: string, padding: string | number) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}
```

- typeof类型的后卫被认为在两种不同的形式：typeof v === "typename"和typeof v !== "typename"，其中必须是"typename"，"number"，"string" ，"boolean"或"symbol"。虽然TypeScript不会阻止您与其他字符串进行比较，但该语言不会将这些表达式识别为类型警卫。

## instanceof 类型的 guards

- instanceof 类型守卫是一种使用构造函数缩小类型的方法。例如，让我们从早些时候借用我们的工业字符串填充器示例：

```ts
interface Padder {
    getPaddingString(): string
}

class SpaceRepeatingPadder implements Padder {
    constructor(private numSpaces: number) {}
    getPaddingString() {
        return Array(this.numSpaces + 1).join(" ");
    }
}

class StringPadder implements Padder {
    constructor(private value: string) {}
    getPaddingString() {
        return this.value;
    }
}

function getRandomPadder() {
    return Math.random() < 0.5 ?
        new SpaceRepeatingPadder(4):
        new StringPadder("  ");
}

// Type is 'SpaceRepeatingPadder | StringPadder'
let padder: Padder = getRandomPadder();

if (padder instanceof SpaceRepeatingPadder) {
    padder;  // type narrowed to 'SpaceRepeatingPadder'
}

if (padder instanceof StringPadder) {
    padder;  // type narrowed to 'StringPadder'
}

```

- instanceof 需要成为构造函数的右侧，TypeScript 将缩小为：

1. prototype 如果函数的类型不是，则为该函数属性的类型 any
2. 由该类型的构造签名返回的类型的联合以该顺序。

## 可空类型

- TypeScript 有两种特殊类型，null和undefined，分别null和undefined具有的值。我们在基本类型部门简要地提到了这些。默认情况下，类型检查器会考虑null并undefined分配任何东西。有效地，null并且undefined是每种类型的有效值。这意味着无法阻止他们被分配到任何类型，即使您希望阻止他们。
- --strictNullChecks标志修复了这一点：当你声明一个变量时，它不会自动包含null或undefined。您可以使用联合类型显式包含它们：

```ts
let s = "foo";
s = null;  // error, 'null' is not assignable to 'string'
let sn: string | null = "bar";
sn = null; // ok

sn = undefined; // error, 'undefined' is not assignable to 'string | null'
```

- 需要注意的是TypeScript对待null，并 undefined 以匹配JavaScript的语义不同。string | null 是不同的类型 string | undefined 和 stirng | undefined | null。

## 可选参数和属性

- 随着 --strictNullChecks，一个可选参数自动添加 | undefined:

```TS
function f(x: number, y?: number) {
    return x + (y || 0);
}
f(1, 2);
f(1);
f(1, undefined);
f(1, null);  error, 'undefined' is not assignable to 'string | null'
```

- 可选属性也是如此：

```ts
class C {
    a: number;
    b?: number;
}
let c = new C();
c.a = 12;
c.a = undefined; // error, 'undefined' is not assignable to 'number'
c.b = 13;
c.b = undefined; // ok
c.b = null; // error, 'null' is not assignable to 'number | undefined'
```

## 输入警卫和类型断言

- 由于可空类型是通过联合实现的，因此需要使用类型守护来除掉这个null。幸运的是，这与您在JavaScript中编写的代码相同：

```ts
function f(sn: string | null): string {
    if (sn == null) {
        return "default";
    } else {
        return sn;
    }
}
```

- null 消除方式浅显易懂，同时可以使用更简洁的写法。

```ts
function f(sn: string | null): string {
    return sn || "default";
}
```

- 在情况下，编译器不能消除 null 或者 undefined，你可以使用类型断言操作员手动删除它们。语法是后缀 !:identifier! 移除了 null 与 undefined 从类型 identifier:

```TS
function broken(name: string | null): string {
    function postfix(epithet: string) {
        return name.charAt(0) + '.  the ' + epithet; // error, 'name' is possibly null
    }
    name = name || "Bob";
    return postfix("great");
}

function fixed(name: string | null): stirng {
    function postfix(epithet: string) {
        return name!.charAt(0) + '.  the ' + epithet; // ok
    }
    name = name || "Bob";
    return postfix("great");
}
```

- 该示例在此使用嵌套函数，因为编译器无法消除嵌套函数内的空值（立即调用的函数表达式除外）。这是因为它不能跟踪所有对嵌套函数的调用，特别是如果从外部函数返回。在不知道函数被调用的地方的情况下，它无法知道name在执行主体时会出现什么样的类型。

## 类型别名

- 类型别名为类型创建一个新名称。类型别名有时与接口类似，但可以命名原型，联合体，元组以及任何其他类型，否则您必须手动编写他们。

```ts
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): name {
    if (typeof n === "string") {
        return n;
    } else {
        return n();
    }
}
```

- 别名实际上并不创建新的类型，它会创建一个新的名称来引用该类型。将原语混淆并不是非常有用，尽管它可以用作文档的一种形式。
- 就像接口一样，类型别名也可以是通用的，我们可以添加类型参数并在别名声明的右侧使用它们：

```ts
type Container<T> = {value: T};
```

- 我们也可以在一个属性中引用一个类型别名：

```ts
type Tree<T> = {
    value: T;
    left: Tree<T>;
    right: Tree<T>;
}
```

- 与交叉点类型一起，我们可以制作一些漂亮的思维弯曲类型：

```ts
type LinkedList<T> = T & { next: LinkedList<T> };

interface Person {
    name: string;
}

var people: LinkedList<Person>;
var s = people.name;
var s = peole.next.name;
var s = peole.next.next.name;
var s = peole.next.next.next.name;
```

- 但是，类型别名不可能出现在声明右侧的任何其他位置：

```ts
type Yikes = Array<Yikes>; // error
```

## 接口与类型别名

- 正如我们所提到的，类型别名可以起到类似于接口的作用；但是，有一些细微的差异。
- 一个区别是接口创建一个在任何地方都使用的新名称。类型别名不会创建新名称。例如，错误消息不会使用别名。在下面的代码中，interfaced 在编辑器中悬停将显示它返回一个 Interface， 但是会显示 aliased 返回对象的文字类型。

```ts
type Alias = { num: number }
interface Interface {
    num: number;
}
declare function aliased(arg: Alias): Alias;
declare function interfaced(arg: Interface): Interface;
```

- 第二个更重要的区别是类型别名不能被扩展或实现（也不能扩展/实现其他类型）。因为软件的一个理想特性是可扩展的，所以如果可能的话，应该总是通过一个类型别名使用接口。

- 另一方面，如果不能用接口表示某种形状，并且需要使用联合或元组类型，则通常需要输入别名。

## 字符串文字类型

- 字符串文字类型允许您指定字符串必须具有的确切值。在实践中，字符串文字类型与联合类型，类型警卫和类型别名很好地结合在一起。您可以一起使用这些功能来获取带有字符串的枚举类行为。

```ts
type Easing = "ease-in" | "ease-out" | "ease-in-out";
class UIElement {
    animate(dx: number, dy: number, easing: Easing) {
        if (easing === "ease-in") {
            // ...
        } else if (easing === "ease-out") {

        } else if (easing === "ease-in-out") {

        } else {
            // error! should not pass null or undefined.
        }
    }
}

let button = new UIElement();
button.animate(0, 0, "ease-in");
button.animate(0, 0, "uneasy"); // error: "uneasy" is not allowed here
```

- 您可以传递三个允许的字符串中的任何一个，但其他任何字符串都会给出错误

- 字符串文字类型可以用相同的方式区分重载：

```ts
function createElement(tagName: "img"): HTMLImageElement;
function createElement(tagName: "input"): HTMLInputElement;
// ... more overloads ...
function createElement(tagName: string): Element {
  // ... code goes here ...
}
```

## 数字文字类型

- TypeScript 也有数字文字类型。

```ts
function rollDie(): 1 | 2 | 3 | 4 | 5 | 6 {
    // ...
}
```

- 这些很少写得很明确，当缩小可以捕捉错误时它们会很有用：

```ts
function foo(x: number) {
    if (x !== 1 || x !== 2) {
        // ...
        // Operator '!==' cannot be applied to types '1' and '2'. 
    }
}
```

- 换句话说，它x必须不等于1且不等于2，当1和2时，上面的检测是无效的比较。

## 枚举成员类型

- 正如我们关于枚举的部分所提到的，枚举成员在每个成员字面初始化时都有类型。
- 很多时候，当我们谈论“单例类型”时，我们指的是enum成员类型以及数字/字符串字面类型，尽管许多用户可以互换使用“单例类型”和“字面类型”。

## 歧视工会

- 您可以结合单身人员类型，工会类型，类型警卫和类型别名来构建称为区分联合的高级模式，也称为标记联合或代数数据类型。区分的联合在函数式编程中很有用。有些语言会自动区分工会；现在，TypeScript 改为建立在JavaScript模式上。有三种成分：
1. 具有共同的单一类型属性的类型 - 判别式。
2. 使用这些类型的联合的类型别名 - 联合。
    1. 在公共属性上输入警卫。
```TS
interface Square {
    kind: "square";
    size: number;
}
interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}
interface Circle {
    kind: "circle";
    radius: number;
}
```

- 首先我们声明我们将联合的接口。每个接口都有一个 kind 具有不同字符串文字类型的属性。该 kind 属性称为判别式或标签。其他属性特定于每个接口。注意接口目前是不相关的。让我们把他们加入一个联盟：

```ts
type  Shape = Square | Rectangle | Circle;
```

- 现在让我们使用歧视联盟：

```ts
function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
    }
}
```

## 彻底检查

- 我们希望编者告诉我们什么时候我们不覆盖歧视联盟的所有变种。例如，如果我们添加 Triangle 到 Shape，我们还需要更新 area:

```TS
type Shape = Square | Rectangle | Circle | Triangle;
function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
    }
    // should error here - we didn't handle case "triangle"
}
```

- 有两种方法可以做到这一点。首先打开 --strictNullChecks 并指定返回类型：

```ts
function area(s: Shape): number { // error: returns number | undefined
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
    }
}
```
- 由于switch不再详尽，TypeScript知道该函数有时可能会返回undefined。如果你有一个显式的返回类型number，那么你会得到一个返回类型实际上是错误的number | undefined。但是，这种方法非常微妙，而且--strictNullChecks并不总是适用于旧代码。

- 第二种方法使用never编译器用来检查详尽性的类型：

```ts
function assertNever(x: never): never {
    throw new Error("Unexpected object: " + x);
}
function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2; 
        default: return assertNever(s); // error here if there are missing cases
    }
}
```

- 在这里，assertNever检查s是类型never- 在所有其他案例已被删除后留下的类型。如果你忘记了一个案例，那么s将会有一个真实的类型，你会得到一个类型错误。这个方法要求你定义一个额外的函数，但是当你忘记它的时候就更加明显了。

## 多态 this 类型

- 多态 this 类型表示一种类型，它是包含的类或接口的子类型。这被称为F-bound多态性。例如，这使得层次流畅的界面更容易表达。拿一个简单的计算器，this 在每次操作后返回：

```ts
class BasicCalculator {
    public constructor(protected value: number = 0) {}
    public currentValue(): number {
        return this.value;
    }
    public add(operand: number): this {
        this.value += operand;
        return this;
    }
    public multiply(operand: number): this {
        this.value *= operand;
        return this;
    }
    // ... other operations go here ...
}

let v = new BasicCalculator(2)
        .multiply(5)
        .add(1)
        .currentValue();
```

- 由于该类使用 this 类型，因此可以对其进行扩展，并且新类可以在不更改的情况下使用旧方法。

```ts
class ScientificCalculator extends BasicCalculator {
    public constructor(value = 0) {
        super(value);
    }
    public sin() {
        this.value = Math.sin(this.value);
        return this;
    }    
    // ... other operatinos go here ...
}

let v = new ScientificCalculator(2)
        .multiply(5)
        .sin()
        .add(1)
        .currentValue();
```

- 没有 this 类型，ScientificCalculator 就不可能扩展 BasicCalculator 并保持流畅的界面。multiply 会返回 BasicCalculator，但没有该 sin 方法。但是，this 类型，multiply 返回 this, 这是ScientificCalculator在这里。

## 索引类型

- 使用索引类型，您可以让编译器检查使用动态属性名称的代码。例如，一个常见的JavaScript模式是从一个对象中选择一个属性的子集：

```ts
function pluck(o, names) {
    return names.map(n => o[n]);
}
```

- 下面介绍如何使用索引类型查询和索引访问操作符在TypeScript中编写和使用此函数：

```ts
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
    return names.map(n => o[n]);
}

interface Person {
    name: string;
    age: number;
}
let person: Person = {
    name: "Jarid",
    age: 35
};
let strings: string[] = pluck(person, ['name']); //
```

- 编译器检查name实际上是一个属性Person。这个例子介绍了一些新的类型操作符。首先是keyof T，在指数型查询操作。对于任何类型T，keyof T是已知的公共属性名称的联合T。例如：

```ts
let personProps: keyof Person; // 'name' | 'age'
```

- keyof Person是完全可以互换的'name' | 'age'。不同的是，如果你添加另一个属性Person，比如说address: string，那么keyof Person会自动更新为'name' | 'age' | 'address'。你可以keyof在通用的上下文中使用，比如pluck你不可能提前知道属性名称。这意味着编译器将检查您是否将正确的一组属性名称传递给pluck：

```ts
pluck(person, ['age', 'unknown']); // error, 'unknown' is not in 'name' | 'age'
```

- 第二个运营商T[K]，该索引访问操作。这里，类型语法反映了表达式语法。这意味着这种person['name']类型Person['name']- 在我们的例子中就是这样string。但是，就像索引类型的查询一样，您可以T[K]在通用上下文中使用，这是其真正实力发挥的地方。你只需要确保类型变量K extends keyof T。这是另一个名为函数的例子getProperty。

```TS
function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
    return o[name]; // o[name] is of type T[K]
}
```

- 在getProperty，o: T和name: K，这意味着o[name]: T[K]。一旦您返回TK结果，编译器将实例化键的实际类型，因此返回类型getProperty将根据您请求的属性而有所不同。

```ts
let name: string = getProperty(person, 'name');
let age: number = getProperty(person, 'age');
let unknown = getProperty(person, 'unknown'); // error, 'unknown' is not in 'name' | 'age'
```

## 索引类型和字符串索引签名

- keyof并T[K]与字符串索引签名进行交互。如果你有一个字符串索引签名的类型，keyof T将会是string。这T[string]只是索引签名的类型：

```ts
interface Map<T> {
    [key: string]: T;
}
let keys: keyof Map<number>; // string
let value: Map<number>['foo']; // number
```

## 映射类型

- 一个常见的任务是采取一个现有的类型，并使其每个属性可选：

```ts
interface PersonPartial {
    name?: string;
    age?: number;
}
```

- 或者我们可能需要一个只读版本：

```ts
interface PersonReadonly {
    readonly name: string;
    readonly age: number;
}
```

- 这在Javascript中经常发生，TypeScript提供了一种基于旧类型映射类型创建新类型的方法。在映射类型中，新类型以相同方式转换旧类型中的每个属性。例如，您可以创建一个类型的所有属性readonly或可选。这里有几个例子：

```ts
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
}
type Partial<T> = {
    [P in keyof T]?: T[P];
}
```

- 并使用

```ts
type PersonPartial = Partial<Person>;
type ReadonlyPerson = Readonly<Person>;
```

- 我们来看看最简单的映射类型及其部分：

```ts
type Keys = 'option1' | 'option2';
type Flags = { [K in Keys]: boolean };
```

- 该语法类似于带有for .. in内部索引签名的语法。有三部分：

1. 类型变量K，它依次绑定到每个属性。
2. 字符串文字联合Keys，它包含要迭代的属性的名称。

3. 该属性的结果类型。

- 在这个简单的例子中，Keys是一个硬编码的属性名称列表，属性类型始终是boolean，所以这个映射类型相当于写入：

```ts
type Flags = {
  option1: boolean;
  option2: boolean;
}
```

- 然而，真正的应用程序看起来像Readonly或Partial以上。它们基于一些现有的类型，并以某种方式转换字段。这就是keyof访问类型的来源和索引：

```ts
type NullablePerson = { [P in keyof Person]: Person[P] | null }
type PartialPerson = { [P in keyof Person]?: Person[p] }
```

- 但有一个通用版本更有用。

```ts
type Nullable<T> = { [P in keyof T]: T[P] | null }
type Partial<T> = { [P in keyof T]?: T[P] }
```

- 在这些例子中，属性列表是keyof T和所得到的类型是某种变体T[P]。这是任何常用映射类型的好模板。这是因为这种变换是同态的，这意味着映射仅适用于其他属性T。编译器知道它可以在添加任何新的属性修改器之前复制所有现有的属性修改器。例如，如果Person.name是只读的，Partial<Person>.name将是只读和可选的。

- 下面是另一个示例，其中T[P]包含在一个Proxy<T>类中：

```ts
type Proxy<T> = {
    get(): T;
    set(value: T): void;
}
type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>;
}
function proxify<T>(o: T): Proxify<T> {
    // ... wrap proxies ...
}
let proxyProps = proxify(props);
```

- 需要注意的是Readonly<T>和Partial<T>是如此有用，它们被包含在沿打字稿的标准库Pick和Record：

```ts
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
}
type Record<K extends string, T> = {
  [P in K]: T;
}
```

- Readonly，Partial并且Pick是同态的，而Record不是。一个Record不同态的线索是它不需要输入类型来复制属性：

```ts
type ThreeStringProps = Record<'prop1' | 'prop2' | 'prop3', string>
```

- 非同态类型本质上是创造新的属性，所以他们不能从任何地方复制属性修饰符。

## 从映射类型推断

- 现在你已经知道如何包装一个类型的属性，接下来你要做的就是解包它们。幸运的是，这很简单：

```ts
function unproxify<T>(t: Proxify<T>): T {
    let result = {} as T;
    for (const k in t) {
        result[k] = t[k].get();
    }
    return result;
}

let originalProps = unproxify(proxyProps);
```

- 请注意，这个解包推理仅适用于同态映射类型。如果映射类型不是同态的，则必须为展开函数提供一个明确的类型参数。
