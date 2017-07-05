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
