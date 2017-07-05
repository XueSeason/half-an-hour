# 扩展性和弹性

获取 CPU 信息 `require('os').cpus()`，本人 Macbook 为例：

```javascript
[ { model: 'Intel(R) Core(TM) i5-4278U CPU @ 2.60GHz',
    speed: 2600,
    times: { user: 87039940, nice: 0, sys: 61540170, idle: 536497180, irq: 0 } },
  { model: 'Intel(R) Core(TM) i5-4278U CPU @ 2.60GHz',
    speed: 2600,
    times: { user: 36677050, nice: 0, sys: 22477220, idle: 625915500, irq: 0 } },
  { model: 'Intel(R) Core(TM) i5-4278U CPU @ 2.60GHz',
    speed: 2600,
    times: { user: 83757280, nice: 0, sys: 48244330, idle: 553068410, irq: 0 } },
  { model: 'Intel(R) Core(TM) i5-4278U CPU @ 2.60GHz',
    speed: 2600,
    times: { user: 37738790, nice: 0, sys: 22987000, idle: 624343750, irq: 0 } } ]
```

## 使用 cluster 模块

```javascript
const http = require('http')
const cluster = require('cluster')

if (cluster.isMaster) {
  const totalWorkerCount = require('os').cpus().length - 1
  console.log(`Running ${totalWorkerCount} workers`)

  for (let i = 0; i < totalWorkerCount; i++) {
    cluster.fork()
  }
} else {
  console.log('Worker PID: ', process.pid)
  http.createServer((req, res) => {
    console.log(process.pid)
    res.end('Hello.')
  }).listen(3000)
}
```

这些进程共享访问当前的文件句柄和套接字。

## 自动唤起

```javascript
const http = require('http')
const cluster = require('cluster')

if (cluster.isMaster) {
  const totalWorkerCount = require('os').cpus().length - 1
  console.log(`Running ${totalWorkerCount} workers`)

  for (let i = 0; i < totalWorkerCount; i++) {
    cluster.fork()
  }

  cluster.on('exit', worker => {
    console.log(`Worker ${worker.id} died!`)
    cluster.fork()
  })
} else {
  console.log('Worker PID: ', process.pid)
  http.createServer((req, res) => {
    console.log(`Worker ${process.pid} produce...`)
    res.end('Hello.')
  }).listen(3000)
}
```
