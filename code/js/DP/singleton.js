const Singleton = (function () {
  let instantiated

  function init () {
    return {
      publicMethod: function () {
        console.log('Hello World')
      },
      publicProperty: 'greeting...'
    }
  }

  return {
    getInstance: function () {
      if (!instantiated) {
        instantiated = init()
      }
      return instantiated
    }
  }
})()

const single = Singleton.getInstance()
single.publicMethod()
