process.on('beforeExit', () => {
  // 发生未捕获异常时，不会触发事件
  // 直接调用 process.exit 也不会触发该事件
  console.log('beforeExit')
})

process.on('exit', code => {
  // 内部必须是同步操作
  console.log('exit', code)
})

process.on('warning', warning => {
  console.log('warning info:')
  console.warn(warning)
})
// process.emitWarning(new Error('custom warning'))

process.on('uncaughtException', err => {
  // uncaughtException 事件是粗暴的方式操作异常
  // 未捕获的异常意味着程序进入未知状态，程序继续运行将会发生未知的错误
  console.log('uncaughtException')
  console.error(err)
  process.exit(1)
})

process.on('disconnect', () => {
  console.log('disconnect')
})
process.on('message', (message, sendHandle) => {
  console.log('message')
  console.log(message)
  console.log(sendHandle)
})

// setInterval(() => {
//   console.log('...')
// }, 1000)

// Promise reject 未 catch 的时候触发
const unhandledRejections = new Map()
process.on('unhandledRejection', (reason, p) => {
  console.log('unhandledRejection')
  unhandledRejections.set(p, reason)
  p.catch(err => console.log(err))
})
process.on('rejectionHandled', (p) => {
  console.log('rejectionHandled')
  unhandledRejections.delete(p)
})
// Promise.reject(new Error('an error happened'))

// 信号
process.on('SIGINT', () => {
  console.log('Received SIGINT.')
  // process.exit(1)
  process.abort()
})

// setInterval(() => {
//   console.log('...')
// }, 1000)

// console.log(process.versions)
console.log(process.cwd())
process.chdir('/tmp')
console.log(process.cwd())
// console.log(process.config)
// 进程运行时间
console.log(process.uptime())
console.log(process.mainModule)
console.log(process.release)
console.log(process.stdout.isTTY)
// 当前进程的 title，ps 查看 默认为 node
process.title = 'season_process'
console.log(process.title)
// 进程文件模式的掩码
const newmask = 0o022
const oldmask = process.umask(newmask)
console.log(
  `Changed umask from ${oldmask.toString(8)} to ${newmask.toString(8)}`
)
