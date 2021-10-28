# vscode 自动编译 ts

```
1. 生成配置文件 tsconfig.json
tsc --init

2. 修改tsconfig.json配置
"outDir": "./js"
"strict": false

3.启动监视任务
终端 -> 运行任务 -> 监视 */tsconfig.json
```