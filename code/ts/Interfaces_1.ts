interface ClockInterface {
  tick()
}
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("beep beep")
  }
}
class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("tick tock")
  }
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
  return new ctor(hour, minute)
}

const digital = createClock(DigitalClock, 12, 17)
const analog = createClock(AnalogClock, 7, 32)

digital.tick()
analog.tick()

interface Shape {
  color: string
}
interface Square extends Shape {
  sideLength: number
}

// 接口在这里，代表如果有属性，必须实现接口提供的属性，否则无这个属性。
let square = <Square>{ sideLength: 10 }
// console.log(square.color)

interface Counter {
  (start: number): string
  interval: number
  reset(): void
}

function getCounter(): Counter {
  let counter = <Counter>function (start: number) {}
  counter.interval = 23
  counter.reset = function () {}
  return counter
}

let c = getCounter()
c(10)
c.reset()
c.interval = 5

console.log(c)
