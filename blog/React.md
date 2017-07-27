# 你不知道的 React

## Element 和 Component

React 三个核心实体：native DOM elements、virtual elements 和 components。

### native DOM elements

通过浏览器的 DOM API 创建的真实 DOM 元素，例如 `document.createElement()` 进行创建元素，`element.insertBefore(), element.nodeValue` 等方式修改元素。

### vitrual React elements

虚拟 React 元素，存在于内存中，通过特定渲染方式将其映射成真实的 DOM 元素。这些元素的展现形式可以是 `h1`、`div` 之类的 DOM 元素，也可以是接下来讲到的用户定义的复合组件。

### Components

组件，在 React 中是一个常见的关键词。不同的组件完成不同的工作。例如 ReactDOM 中的 `ReactDOMComponent` 用来桥接 React 元素和原生 DOM 元素。

### User Defined Composite Components

我们通常所熟悉的组件就是用户定义的复合组件。通过 `React.createClass()` 或者 ES6 class 特性继承 `React.Component`，创建一个复合组件类。像组件暴露的 `componentWillMount`、`shouldComponentUpdate` 这些生命周期方法，仅仅只是一小部分。React 组件还拥有如 `mountComponent`、`receiveComponent` 之类的生命周期方法，但仅仅只在 React 内部使用。

> 我们所创建的组件不是一个完整的过程。React 会接管我们的组件类，通过 `ReactCompositeComponentWrapper` 封装后，添加一堆生命周期方法。

## 声明式的 React

我们的主要工作是定义组件类，之后 React 会在需要的时候实例化这个类。

```jsx
class MyComponent extends React.Component {
  render () {
    return <div>Hello World</div>
  }
}
```

上面的 JSX 会被翻译成：

```javascript
class MyComponent extends React.Component {
  render () {
    return React.createElement('div', null, 'Hello World')
  }
}
```

通过 JSX 语法进行声明，React 会为我们创建想要的组件。
