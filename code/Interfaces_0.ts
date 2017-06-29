// optional / excess property checks
interface SquareConfig {
  color?: string
  width?: number
  // TS 的接口会进行额外的属性检查，对于多余的属性会报错，需要以下字段来接受多余属性值
  // props 为 string 则视为 属性，number 视为索引
  [props: string]: any // 限定属性名为 string，值为 any 类型
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = {color: "white", area: 100};
  if (config.color) {
    newSquare.color = config.color
  }
  if (config.width) {
    newSquare.area = config.width * config.width
  }
  return newSquare
}

const mySquare = createSquare({colour: "black"})
console.log(mySquare)

// readonly
// 变量使用 const、属性使用 readonly
interface Point {
  readonly x: number
  readonly y: number
}

let p1: Point = { x: 10, y: 20 }
console.log(p1.x)

let a: ReadonlyArray<Number> = [1, 2, 3, 4]
// a.push(5) error
let b = a as number[]
b.push(5)
console.log(a) // [ 1, 2, 3, 4, 5 ]
console.log(b) // [ 1, 2, 3, 4, 5 ]

// 接口限定函数类型
interface SearchFunc {
  (source: string, subString: string): boolean
}

let mySearch: SearchFunc = function (source, subString) {
  let result = source.search(subString)
  return result > -1
}

// 索引类型
interface StringArray {
  [index: number]: string
}

const myArray: StringArray = ['Bob', 'Fred']
console.log(myArray[0])

interface NumberDict {
  [index: string]: number
  length: number
}

let aa: NumberDict = { length: 10 }
