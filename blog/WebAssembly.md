# 初步了解 WebAssembly

WebAssembly 可以让除 JS 之外的其它编程语言运行在浏览器环境中的一项技术。和 JS 相比最大的特点就是速度快。

JS 在诞生的初期，运行性能并不高。随着各家浏览器的竞争，出现了 JIT（Just In Time）编译器，即时编译的特性，让 JS 的性能得到迅速提升到 10 倍以上。性能的提升，让 JS 开始涉及到过去不被看好的领域（服务端的 Node.js）。

在过去的 10 几年里，JS 通过 JIT 和 Node.js 迎来爆发式的增长，下一个转折点就是 WebAssemly。

![](http://7xi9q1.com1.z0.glb.clouddn.com/01-02-perf_graph10-768x633.png)

对于 JS 的发展来说，WebAssemly 是存在利弊的。WebAssembly 使得任何能够编译成 WASM 的语言编写 Web 代码成为可能，这会极大地动摇 JS 在浏览器环境中的地位。但是 JS 也可以借此成为一种胶水语言，配合成熟的生态，在浏览器中大放光彩。而且 WebAssembly 是 Mozilla、Google、Apple 以及 M$ 共同支持的项目，可以说前途无量，一项突破性的技术，往往需要花费大量的时间成本（按照以往经验，应该会比预想中的快），所以剩下的一切就交给时间吧。