# Basic Types

## 介绍

要使程序有用，我们需要能够使用一些最简单的数据单元：数字，字符串，结构，布尔值等。在TypeScript中，我们支持与JavaScript中所期望的类型相同的类型，并引入方便的枚举类型来帮助解决问题。

## 布尔

最基本的数据类型是简单的true/false值，JavaScript和TypeScript调用一个boolean值。

```ts
let isDone: boolean = false;
```

## 数

和JavaScript一样，TypeScript中的所有数字都是浮点数。这些浮点数字获得类型number。除了十六进制和十进制文字外，TypeScript还支持ECMAScript 2015中引入的二进制和八进制文字。

```ts
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```

## 串

用JavaScript创建网页和服务器程序的另一个基本部分是使用文本数据。与其他语言一样，我们使用该类型 string 来引用这些文本数据。就像 JavaScript 一样，TypeScript 也使用双引号（"）或单引号（'）来包围字符串数据。

```ts
let color: string = "blue";
color = "red";
```

你还可以使用 模板字符串，它可以跨越多行并具有嵌入的表达式。这些字符串被反引号（`）字符包围，并且嵌入式表达是这种形式 ${ expr }。

```TS
let fullName: string = `Bob Bobbingto`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ fullname }.

I'll be ${ age + 1} years old next month.`;
```

这相当于声明 sentence 如下：

```ts
let sentence: string = "Hello, my name is " + fullName + ".\n\n" + "I'll be " + (age + 1) + " years old next month.";
```

## 排列

TypeScript 与 JavaScript 一样，允许您处理值的数组。数组类型可以用两种方式之一来编写。在第一个中，您使用后面的[]元素类型来表示该元素类型的数组：

```ts
let list: number[] = [1,2,3];
```

第二种方式使用通用数组类型 Array<elemType>:

```TS
let list: Array<number> = [1,2,3];
```

## 元组

元组类型允许表达一个数组，其中固定数量的元素的类型是已知的，但不一定是相同的。例如，您可能想要将值表示为一对a tirng 和 a number:

```TS
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ["Hello", 10]; // ok
// Initialize it incorrectly
x = [10, "hello"]; // Error
```

访问具有已知索引的元素时，将检索正确的类型：

```ts
console.log(x[0].substr(1)); // ok
console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'
```

当访问已知索引集外部的元素时，将使用联合类型：

```TS
x[3] = "world"; // OK, 'string' can be assigned to 'string | number'

console.log(x[5].toString()); // OK, 'string' and 'number' both have 'toString'

x[6] = true; // Error, 'boolean' isn't 'string | number'
```

联盟类型是一个高级话题，我们将在后面的章节中介绍。

## 枚举

对 JavaScript 中标准数据类型集的有益补充是 enum。就像在 C# 中，枚举是一种给数组值赋予更多友好名称的方法。

```ts
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
```

默认情况下，枚举开始为其成员开始编号 0。你可以通过手动设置其中一个成员的值来改变它。例如，我们可以开始前面的例子，1 而不是 0：

```TS
enum Color {Red = 1, Green, Blue}
let c: Color = Color.Green;
```

或者，即使手动设置枚举中的所有值：

```ts
enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green;
```

枚举的一个方便功能是，您也可以从数值转到枚举中该值的名称。例如，如果我们有值 2 但不确定 Color 上面枚举中映射到的是什么，我们可以查找相应的名称：

```ts
enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];

alert(colorName);
```

## Any

我们可能需要描述我们在编写应用程序时不知道的变量类型。这些值可能来自动态内容，例如来自用户或第三方库。在这些情况下，我们希望退出类型检查并让值通过编译时检查。为此，我们将这些标签标注为 any:

```ts
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
```

该 any 类型是与现有 JavaScript 一起使用的强大方式，允许您在编译期间逐渐选择加入并选择退出类型检查。您可能会期望 Object 扮演类似的角色，就像其他语言一样。但是类型变量 Object 只允许给它们分配任何值，你不能调用它们的任意方法，即使是那些实际存在的方法：

```ts
let notSure: any = 4;
notSure.ifItExists(); // okay, ifItExists might exist at runtime
notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)

let prettySure: Object = 4;
prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.
```

any, 如果你知道类型的某些部分，但也许不是所有的类型也很方便。例如，你可能有一个数组，但数组有不同的类型：

```ts
let list: any[] = [1, true, "free"];

list[1] = 100;
```

## Void

void 有点像是相反的 any: 没有任何类型。您通常可以将此视为不返回值的函数的返回类型：

```ts
function warnUser(): void {
    alert("This is my warning message");
}
```

声明类型的变量void是没有用的，因为你只能分配undefined或null对他们说：

```ts
let unusable: void = undefined;
```

## 空和未定义

在TypeScript，都undefined和null实际有自己类型的命名undefined和null分别。很像void，他们对自己并不是非常有用：

```ts
// Not much else we can assign to these variables!
let u: undefined = undefined;
let n: null = null;
```

默认情况下，null并undefined在所有其它类型的亚型。这意味着你可以分配null和undefined类似的东西number。

然而，在使用时--strictNullChecks标志，null并undefined仅分配给void他们各自的类型。这有助于避免许多常见错误。如果您想要传入string或null或者undefined，您可以使用联合类型string | null | undefined。再一次，更多的关于工会类型。

请注意：我们鼓励--strictNullChecks在可能的情况下使用，但为了本手册的目的，我们将假定它已关闭。

## 决不

never 类型表示永远不会发生的值的类型。例如，never 函数表达式或箭头函数表达式的返回类型总是抛出一个异常或永远不会返回的异常；变量也 never 通过任何类型的守卫缩小类型，永远不会是真实的。

该 never 类型是每种类型的一种子类型，并可分配给它；然后，没有类型是它的子类型或可赋值的类型 never(除了 never 本身)。即使 any 也不能分配给 never。

返回函数的一些示例 never:

```ts
// Function returning never must have unreachable end point
function error(message: string): never {
    throw new Error(message);
}

// Inferred return type is never
function fail() {
    return error("Something failed");
}

// Function returning never must have unreachable end point
function infiniteLoop(): never {
    while (true) {

    }
}
```

## 输入断言

有时你最终会发现你会比TypeScript更了解一个值。通常这会发生在你知道某个实体的类型可能比其当前类型更具体时。

类型断言是一种告诉编译器“相信我，我知道我在做什么”的方式。类型断言就像其他语言中的类型转换，但不执行特殊的检查或重构数据。它没有运行时影响，纯粹由编译器使用。TypeScript假定您，程序员已经执行了您需要的任何特殊检查。

类型断言有两种形式。一个是“角括号”语法：

```TS
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;
```

另一个是 - as 语法：

```ts
let someValue: any = "this is a string";

let strLength: number = (someValue as string).length;
```

这两个样本是相同的。使用其中之一大多是一种偏好选择; 但是，当通过JSX使用TypeScript时，只as允许使用样式断言。

