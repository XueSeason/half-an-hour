// protected
class Person {
  protected name: string
  constructor(name: string) { this.name = name }
}

class Employee extends Person {
  private department: string
  constructor(name: string, department: string) {
    super(name)
    this.department = department
  }
  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}`
  }
}

const howard = new Employee('Howard', 'Sales')
console.log(howard.getElevatorPitch())

// Parameter properties

class Animal {
  constructor(private name: string) {}
  move(distanceInMeters: number) {
    console.log(`${this.name} moved ${distanceInMeters}m.`)
  }
}

const puppy = new Animal('Puppy')
puppy.move(10)

// Accessors
let passcode = 'secret passcode'

class EmployeeA {
  private _fullName: string

  get fullName(): string {
    return this._fullName
  }

  set fullName(newName: string) {
    if (passcode && passcode === 'secret passcode') {
      this._fullName = newName
    } else {
      console.log('Error: Unauthorized update of employee!')
    }
  }
}

const employee = new EmployeeA()
employee.fullName = 'Bob'
console.log(employee.fullName)

// Static Properties

class Grid {
  static origin = { x: 0, y: 0 }
  constructor(public scale: number) {}
  calculateDistanceFromOrigin(point: { x: number; y: number }) {
    const xDist = (point.x - Grid.origin.x)
    const yDist = (point.y - Grid.origin.y)
    return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale
  }
}

const grid1 = new Grid(1.0)
console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }))

// Abstract Classes
// 不同于接口，抽象类包含实现细节

abstract class Department {
  constructor(public name: string) {}
  printName() {
    console.log('Department name: ' + this.name)
  }
  abstract printMeeting()
}

class AccountingDepartment extends Department {
  constructor() {
    super('Accounting and Auditing')
  }
  printMeeting() {
    console.log('The Accounting Department meets each Monday at 10am.')
  }
  generateReports() {
    console.log('Generating accounting reports...')
  }
}

let department: Department
// department = new Department()
department = new AccountingDepartment()
department.printName()
department.printMeeting()
// department.generateReports()

// Advanced

class Greeter {
  static standardGreeting = 'Hello, there'
  greeting: string
  greet() {
    if (this.greeting) {
      return 'Hello, ' + this.greeting
    } else {
      return Greeter.standardGreeting
    }
  }
}

let greeter1 = new Greeter()
console.log(greeter1.greet()) // Hello there

let greeterMaker: typeof Greeter = Greeter
greeterMaker.standardGreeting = 'Hey there!'

const greeter2 = new greeterMaker()
console.log(greeter2.greet())
console.log(typeof Greeter) // function
console.log(greeter1.greet()) // Hey there!

// Using a class as an interface

class Point {
  x: number
  y: number
}

interface Point3d extends Point {
  z: number
}

const point3d: Point3d = { x: 1, y: 2, z: 3 }
