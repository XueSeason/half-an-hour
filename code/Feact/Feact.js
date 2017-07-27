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
  /**
   * transform virtual DOM to native DOM and mount it to container
   * @param {object} container native DOM element for mount
   */
  mountComponent (container) {
    // the process of render virtual DOM
    const Component = this._currentElement.type
    const componentInstance = new Component(this._currentElement.props)
    let element = componentInstance.render()

    // element maybe is function
    while (typeof element.type === 'function') {
      const Component = element.type
      element = (new Component(element.props)).render()
    }

    // virtual DOM to native DOM
    // and mount it to container
    const domComponentInstance = new FeactDOMComponent(element)
    return domComponentInstance.mountComponent(container)
  }
}

const TopLevelWrapper = function (props) {
  this.props = props
}

TopLevelWrapper.prototype.render = function () {
  return this.props
}

const Feact = {
  /**
   * creae Component Class
   * @param {object} spec declaration object
   */
  createClass (spec) {
    function Constructor (props) {
      this.props = props
    }
    Constructor.prototype.render = spec.render

    return Constructor
  },
  /**
   * create virtual DOM Element
   * @param {function} type Component Class constructor
   * @param {object} props Component properties
   * @param {object} children Component children object
   */
  createElement (type, props, children) {
    const el = { type, props: props || {} }

    if (children) {
      el.props.children = children
    }

    return el
  },
  /**
   * render virtual DOM to native DOM
   * @param {object} el virtual DOM element
   * @param {object} container native DOM element for mount
   */
  render (el, container) {
    const wrapperElement = this.createElement(TopLevelWrapper, el)
    const componentInstance = new FeactCompositeComponentWrapper(wrapperElement)
    return componentInstance.mountComponent(container)
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
