(() => {
    const sayHi = (msg: string): string => {
        return `hello, ${msg}`
    }
    console.log(sayHi('liger'))
})()

/* 
总结：
    1. ts的文件中如果直接书写js语法的代码，那么在html文件中直接引入ts文件，在谷歌浏览器中是可以直接使用的
    2. 如果ts文件中用了ts的语法代码，那么需要把这个ts文件编译成js文件，在html文件中引入js的文件来使用
    3. ts文件中的函数中的形参，如果使用了某个类型进行修饰，那么最终在编译的js文件中是没有这个类型的
    4. ts文件中的变量使用的是let进行修饰，编译的js文件中的修饰符就变成var了
    
*/