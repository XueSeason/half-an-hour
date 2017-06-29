# TS 之旅

## 工欲善其事，必先利其器

首先要打造 TS 的开发环境，我使用的是 VS Code 编辑器，官方文档对于配置 TypeScript 的过程讲的很详细。

VSCode 下的 TS 开发支持两种模式：`File Scope` 和 `Explicit Project`。

File Scope 模式下，VS Code 会视每一个 TS 文件为一个独立的单元，没有公共上下文。

Explicit Project 模式，需要定义一个 `tsconfig.json` 文件，该文件存在的目录代表整个 TS 项目的根目录。而这个配置文件主要涉及到一些编译选项。

一个官方的配置代码，适用于 ES5 + CommonJS 模块化规则 + source map:

```json
{
    "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "sourceMap": true
    }
}
```

当你创建这个文件后，随后新建的 ts 文件会体验到丰富的开发体验。

唤起 VS Code 通用面板，配置 `Task Runner`，选择带 `tsconfig.json` 的选项，就会在工作目录下创建一个 `.vscode` 文件夹，具体的 task 配置内容如下：

```json
{
  // See https://go.microsoft.com/fwlink/?LinkId=733558
  // for the documentation about the tasks.json format
  "version": "0.1.0",
  "command": "tsc",
  "isShellCommand": true,
  "args": ["-p", "."],
  "showOutput": "silent",
  "problemMatcher": "$tsc"
}
```

通过 `Run Build Task` 就可以对整个项目进行编译。

TS 在 VS Code 里几个比较好的体验：

- JSDoc 的支持
- Source Map 的支持

具体 Debug 的操作，会专门用一个篇幅来讲。