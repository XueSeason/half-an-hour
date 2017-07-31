function FeactComponent () {
}

const FeactInstanceMap = {
  set (key, value) {
    key.__feactComponentInstance = value
  },
  get (key) {
    return key.__feactComponentInstance
  }
}

FeactComponent.prototype.setState = function (partialState) {
  const internalInstance = FeactInstanceMap.get(this)

  internalInstance._pendingPartialState = internalInstance._pendingPartialState || []
  internalInstance._pendingPartialState.push(partialState)

  if (!internalInstance._rendering) {
    FeactReconciler.performUpdateIfNecessary(internalInstance)
  }
}

function mixSpecIntoComponent (Constructor, spec) {
  const proto = Constructor.prototype

  for (const key in spec) {
    proto[key] = spec[key]
  }
}

class FeactDOMComponent {
  constructor (el) {
    this._currentElement = el
  }

  receiveComponent (nextElement) {
    const prevElement = this._currentElement
    this.updateComponent(prevElement, nextElement)
  }

  updateComponent (prevElement, nextElement) {
    const lastProps = prevElement.props
    const nextProps = nextElement.props

    this._updateDOMProperties(lastProps, nextProps)
    this._updateDOMChildren(lastProps, nextProps)

    this._currentElement = nextElement
  }

  _updateDOMProperties (lastProps, nextProps) {

  }

  _updateDOMChildren (lastProps, nextProps) {
    const lastContent = lastProps.children
    const nextContent = nextProps.children

    if (!nextContent) {
      this.updateTextContent('')
    } else if (lastContent !== nextContent) {
      this.updateTextContent('' + nextContent)
    }
  }

  updateTextContent (text) {
    const node = this._hostNode
    const firstChild = node.firstChild

    if (firstChild && firstChild === node.lastChild && firstChild.nodeType === 3) {
      firstChild.nodeValue = text
      return
    }

    node.textContent = text
  }

  mountComponent (container) {
    const domElement = document.createElement(this._currentElement.type)
    const text = this._currentElement.props.children
    const textNode = document.createTextNode(text)
    domElement.appendChild(textNode)

    container.appendChild(domElement)

    this._hostNode = domElement
    return domElement
  }
}

class FeactCompositeComponentWrapper {
  constructor (el) {
    this._currentElement = el
  }

  receiveComponent (nextElement) {
    const prevElement = this._currentElement
    this.updateComponent(prevElement, nextElement)
  }

  updateComponent (prevElement, nextElement) {
    this._rendering = true
    const nextProps = nextElement.props
    const inst = this._instance

    const willReceive = prevElement !== nextElement

    if (willReceive && inst.componentWillReceiveProps) {
      inst.componentWillReceiveProps(nextProps)
    }

    let shouldUpdate = true

    const nextState = this._processPendingState()
    this._pendingPartialState = null

    if (inst.shouldComponentUpdate) {
      shouldUpdate = inst.shouldComponentUpdate(nextProps)
    }

    if (shouldUpdate) {
      this._performComponentUpdate(nextElement, nextProps)
    } else {
      inst.props = nextProps
    }
    this._rendering = false
  }

  _processPendingState () {
    const inst = this._instance
    if (!hits._pendingPartialState) {
      return inst.state
    }

    let nextState = inst.state

    for (let i = 0; i < this._pendingPartialState.length; i++) {
      const partialState = this._pendingPartialState[i]
      if (typeof partialState === 'function') {
        nextState = partialState(nextState)
      } else {
        nextState = Object.assign(nextState, partialState)
      }
    }

    this._pendingPartialState = null
    return nextState
  }

  _performComponentUpdate (nextElement, nextProps) {
    this._currentElement = nextElement
    const inst = this._instance

    inst.props = nextProps

    this._updateRenderedComponent()
  }

  _updateRenderedComponent () {
    const prevComponentInstance = this._renderedComponent
    const inst = this._instance
    const nextRenderedElement = inst.render()

    FeactReconciler.receiveComponent(prevComponentInstance, nextRenderedElement)
  }

  mountComponent (container) {
    const Component = this._currentElement.type
    const componentInstance = new Component(this._currentElement.props)
    this._instance = componentInstance

    FeactInstanceMap.set(componentInstance, this)

    if (componentInstance.componentWillMount) {
      componentInstance.componentWillMount()
    }

    const markup = this.performInitialMount(container)

    if (componentInstance.componentDidMount) {
      componentInstance.componentDidMount()
    }

    return markup
  }

  performInitialMount (container) {
    const renderedElement = this._instance.render()

    const child = instantiateFeactComponent(renderedElement)
    this._renderedComponent = child

    return FeactReconciler.mountComponent(child, container)
  }
}

const FeactReconciler = {
  receiveComponent (internalInstance, nextElement) {
    internalInstance.receiveComponent(nextElement)
  },

  performUpdateIfNecessary (internalInstance) {
    this.updateComponent(this._currentElement, this._currentElement)
  },

  mountComponent (internalInstance, container) {
    return internalInstance.mountComponent(container)
  }
}

function instantiateFeactComponent (el) {
  if (typeof el.type === 'string') {
    return new FeactDOMComponent(el)
  } else if (typeof el.type === 'function') {
    return new FeactCompositeComponentWrapper(el)
  }
}

const TopLevelWrapper = function (props) {
  this.props = props
}

TopLevelWrapper.prototype.render = function () {
  return this.props
}

const Feact = {
  createClass (spec) {
    function Constructor (props) {
      this.props = props

      const initialState = this.getInitalState ?
        this.getInitalState() :
        null
      
      this.state = initialState
    }
    // Constructor.prototype = Object.assign(Constructor.prototype, spec)
    Constructor.prototype = new FeactComponent()

    mixSpecIntoComponent(Constructor, spec)

    return Constructor
  },
  createElement (type, props, children) {
    const el = { type, props: props || {} }

    if (children) {
      el.props.children = children
    }

    return el
  },
  render (el, container) {
    const prevComponent = getTopLevelComponentInContainer(container)

    if (prevComponent) {
      return updateRootComponent(prevComponent, el)
    } else {
      return renderNewRootComponent(el, container)
    }
  }
}

function renderNewRootComponent (el, container) {
  const wrapperElement = Feact.createElement(TopLevelWrapper, el)
  const componentInstance = new FeactCompositeComponentWrapper(wrapperElement)

  const makeUp = FeactReconciler.mountComponent(componentInstance, container)

  container.__feactComponentInstance = componentInstance._renderedComponent

  return makeUp
}

function getTopLevelComponentInContainer (container) {
  return container.__feactComponentInstance
}

function updateRootComponent (prevComponent, nextElement) {
  FeactReconciler.receiveComponent(prevComponent, nextElement)
}

// demo
const MyTitle = Feact.createClass({
  render () {
    return Feact.createElement('h1', null, this.props.message)
  }
})

const MyMessage = Feact.createClass({
  render () {
    if (this.props.asTitle) {
      return Feact.createElement(MyTitle, { message: this.props.message })
    } else {
      return Feact.createElement('p', null, this.props.message)
    }
  }
})

Feact.render(Feact.createElement(MyMessage, { asTitle: true, message: 'Hello Feact' }), document.getElementById('root'))
