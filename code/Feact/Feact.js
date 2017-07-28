class FeactDOMComponent {
  constructor (el) {
    this._currentElement = el
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
  mountComponent (container) {
    const Component = this._currentElement.type
    const componentInstance = new Component(this._currentElement.props)
    this._instance = componentInstance

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
    }
    Constructor.prototype = Object.assign(Constructor.prototype, spec)

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
    const wrapperElement = this.createElement(TopLevelWrapper, el)
    const componentInstance = new FeactCompositeComponentWrapper(wrapperElement)
    return FeactReconciler.mountComponent(componentInstance, container)
  }
}

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
