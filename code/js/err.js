const stack = new Map()
stack.set(-1, '')
let currentUid = -1

function init (id, type, triggleId, resource) {
  const localStack = (new Error()).stack.split('\n').slice(1).join('\n')
  const extraStack = stack.get(triggleId)
  stack.set(id, localStack + '\n' + extraStack)
}
function before (uid) {
  currentUid = uid
}
function after (uid) {
  currentUid = -1
}
function destroy (uid) {
  stack.delete(uid)
}

const asyncHooks = require('async_hooks')
const hook = asyncHooks.createHook({ init, before, after, destroy })
hook.enable()

function IWantFullCallbacks () {
  setTimeout(function () {
    const localStack = new Error()
    console.log(localStack.stack)
    console.log('----')
    console.log(stack.get(currentUid))
  }, 1000)
}

IWantFullCallbacks()
