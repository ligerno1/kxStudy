# 5分钟上手 TypeScript

## 安装 TypeScript
- 通过npm （Node.js 包管理器）

```
npm i -g typescript 
```

- 安装成功，输出以下内容
```
PS C:\Users\Kexin\liger\study>  npm i -g typescript
C:\Users\Kexin\AppData\Roaming\npm\tsserver -> C:\Users\Kexin\AppData\Roaming\npm\node_modules\typescript\bin\tsserver
C:\Users\Kexin\AppData\Roaming\npm\tsc -> C:\Users\Kexin\AppData\Roaming\npm\node_modules\typescript\bin\tsc
+ typescript@4.3.5
added 1 package from 1 contributor in 4.473s
```

## 构建你的第一个 TypeScript 文件
- 编辑 greeter.ts 文件
```ts
function greeter(person) {
    return "Hello, " + person;
}

let user = "Liger User";

console.log(greeter(user));
```

## 编译代码

- 在命令行上，运行TypeScript编译器：
```
tsc greeter.ts
```
- 输出一个 greeter.js 文件

- 接下来，使用TypeScript的高级功能。添加类型注解。
```ts
function greeter(person: string) {
    return "hello, " + person;
}

let user = "Liger User";

console.log(greeter(user));
```

## 类型注解
- TypeScript 里的类型注解是一种轻量级的为函数或变量添加约束的方式。在这个例子里，我们希望 greeter 函数接收一个字符串参数。然后尝试把 greeter 的调用改成传入一个数组：

```ts
function greeter(person: string) {
    return "hello, " + person;
}

let user = [0, 1, 2];

console.log(greeter(user));
```

- 重新编译，你会看到产生了一个错误
```
PS C:\Users\Kexin\liger\study\TypeScript\入门> tsc .\greeter.ts 
greeter.ts:7:21 - error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'string'.

7 console.log(greeter(user));
                      ~~~~


Found 1 error.
```

- 类似地，尝试删除 greeter 调用的所有参数。TypeScript 会告诉你使用了非期望个数的参数调用了这个函数。在这两种情况中，TypeScript提供了静态的代码分析，它可以分析代码结构和提供的类型注解。

- 要注意的是尽管有错误，但 greeter.js 文件还是被创建了。就算你的代码有错误，你仍然可以使用 TypeScript，但这种情况下，TypeScript 会警告你代码可能不会按预期执行。

## 接口
- 让我们开发这个示例应用。这里我们使用接口来描述一个拥有 firstName 和 lastName 字段的对象。在 TypeScript 里，只有两个类型内部的结构兼容，那么这两个类型才是兼容的。这就允许我们在实现接口时候只要保证包含了接口要求的结构就可以，而不必明确地使用 implements 语句。

```ts
interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = {
    firstName: 'Lee',
    lastName: 'Jay'
};

console.log(greeter(user));
```

## 类
- 最后，让我们使用类来改写这个例子。TypeScript 支持 JavaScript 的新特性，比如支持基于类的面向对象编程。
- 让我们创建一个 Student 类，它带有一个构造函数和一些公共字段。注意类和接口可以一起共作，程序员可以自行决定抽象的级别。
- 还要注意的是，在构造函数的参数上使用 public 等同于创建了同名的成员变量。

```ts
class Student {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    fullName: string;
}

function greeter(person : Person) {
    return "Hello, " + person.fullName;
}

let user = new Student("Liger", ".FSD.", "User");
console.log(greeter(user));
```

- 重新运行 tsc greeter.ts, 会生成 greeter.js 文件。 TypeScript里的类只是JavaScript里常用的基于原型面向对象编程的简写。

- 更多的 TypeScript 应用，大家可以动手去探索！