# 你不知道的 React

## Element 和 Component

React 三个核心实体：native DOM elements、virtual elements 和 components。

### native DOM elements

通过浏览器的 DOM API 创建的真实 DOM 元素，例如 `document.createElement()` 进行创建元素，`element.insertBefore(), element.nodeValue` 等方式修改元素。

### vitrual React elements

虚拟 React 元素，存在于内存中，通过特定渲染方式将其映射成真实的 DOM 元素。这些元素的展现形式可以是 `h1`、`div` 之类的 DOM 元素，也可以是接下来讲到的用户定义的复合组件。

### Components

组件，在 React 中是一个常见的关键词。不同的组件完成不同的工作。例如 ReactDOM 中的 `ReactDOMComponent` 用来映射 React 元素到原生 DOM 元素。

### User Defined Composite Components

我们通常所熟悉的组件就是用户定义的复合组件。通过 `React.createClass()` 或者 ES6 class 特性继承 `React.Component`，创建一个复合组件类。像组件暴露的 `componentWillMount`、`shouldComponentUpdate` 这些生命周期方法，仅仅只是一小部分。React 组件还拥有如 `mountComponent`、`receiveComponent` 之类的生命周期方法，但仅仅只在 React 内部使用。

> 我们所创建的组件不是一个完整的过程。React 会接管我们的组件类，通过 `ReactCompositeComponentWrapper` 封装后，添加一堆生命周期方法。
> 上述只有 `User Defined Composite Components` 是对开发者感知的，其他都是对开发者无感知的。

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

## React 构建过程

我们需要明白以下几个类的内部结构和实现

> React Element --> React Component --> DOM Element

### React Element

```yaml
{
  type: function | string,
  props: object
}
```

React Element 通过 `React.createElement(type, props, children)` 方法创建。React Element 只是一个简单的表示渲染意图的对象，但是是构建 React Component 的基础。通过 type 来区分创建 `DOM Component` 还是 `Composite Component`。

### React Composite Component

```yaml
{
  constructor: (props),
  ...liftCycleMethods: (),
  render: () -> React Element
}
```

通过 `React.createClass({ render, lifeCycleMethonds })` 方法创建一个类的构建方法，这个构建方法一般存储在 React Element 的 type 属性中。`React Composite Component Wrapper` 通过这个构建方法，可以创建 `React Composite Component`。

### React DOM Component

```yaml
{
  private currentElement: React Element,
  private hostNode: DOM Element,
  constructor: (element),
  mountComponent: (container) -> DOM Element
}
```

在 `instantiateReactComponent` 方法中，当 React Element 的 type 为 string，即 DOM 节点名时来创建的 `React DOM Component`。通过 `React Dom Component` 可以将 `React Element` 转换为真实的 DOM 元素。

### React Composite Component Wrapper

```yaml
{
  private currentElement: React Element,
  private instance: React Component,
  private renderedComponent: React DOM Component | React Composite Component Wrapper,
  mountComponent: (container) -> Component
}
```

`Composite Component Wrapper` 用于将 `Composite Component` 最终转换为 `DOM Componet` 并挂载到 `container` 上。
