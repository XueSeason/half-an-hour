# Redux

## createStore

私有变量

- currentReducer 当前的 reducer，用于生成状态树
- currentState 当前状态树
- currentListeners 当前的监听器方法数组
- nextListeners 下一个待执行的监听器方法数组
- isDispatching 在 dispatch 方法中，currentReducer 执行前后的状态。

私有方法

`ensureCanMutateNextListeners` 如果在监听器中调用了 dispatch，因为 dispatch 方法也会注意触发之前传入的监听器，为了在新的监听器被加入之前确保当前的监听器数组能够正常被调用，需要拷贝一份监听器。

共有方法

- getState 获取当前状态树。
- subscribe 通过订阅来监听状态的变化，返回一个 unsubscribe 方法来取消监听。这里添加监听器之前会调用 ensureCanMutateNextListeners 方法。unsubscribe 在移除监听器前也会有同样的拷贝操作。
- dispatch 发送 Action，来改变状态树，然后逐一调用 subscribe 传入的监听器方法。
- replaceReducer 通过替换 reducer 从而生成新的状态树。通常在代码分隔和热加载机制中使用。
- observable 为 observable/reactive 考虑的方法，这里不继续深入。

## combineReducers

合并多个 reducer 返回一个 state 树。

核心代码：

```js
let hasChanged = false
const nextState = {}
for (let i = 0; i < finalReducerKeys.length; i++) {
  const key = finalReducerKeys[i]
  const reducer = finalReducers[key]
  const previousStateForKey = state[key]
  const nextStateForKey = reducer(previousStateForKey, action)
  // ...
  nextState[key] = nextStateForKey
  hasChanged = hasChanged || nextStateForKey !== previousStateForKey
}
return hasChanged ? nextState : state
```

## bindActionCreator

一个便捷方法，返回 Action Creator 方法封装 dispatch 后的对象，后续便可直接调用对象里的方法。一般使用场景，把 Action Creator 下传到子组件上，使子组件无法感知 Redux 的存在。

## compose

联合函数，将多个函数组装成管道传输值。compose(f, g, h) 将会转化为 (...args) => f(g(h(...args)))。

## applyMiddleware

代码：

```js
export default function applyMiddleware(...middlewares) {
  return (createStore) => (...args) => {
    const store = createStore(...args)
    let dispatch = store.dispatch
    let chain = []

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    chain = middlewares.map(middleware => middleware(middlewareAPI))
    dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch
    }
  }
}
```

`dispatch: (...args) => dispatch(...args)` 这段代码对 dispatch 用匿名函数包裹，因为后续 dispatch 会发生更新，使用闭包的好处在于匿名函数内部的 dispatch 会随之更新。

`dispatch = compose(...chain)(store.dispatch)` 这段代码是最核心。假设 chain 数组为 [f, g, h]，最终会转化为 f(g(h(store.dispatch)))，从右到左执行返回一个新的 dispatch，形成从左向右顺序的调用链。

中间件格式：

```js
function [middleware name] ({ dispatch, getState }) {
  return next => action => {
    // before
    next(action)
    // after
  }
}
```

接收一个函数，返回一个同样形式的函数，返回的函数内部调用接收的函数。将此函数作为中间件，compose 后形成调用链。
