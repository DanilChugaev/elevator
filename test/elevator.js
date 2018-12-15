import {expect} from 'chai'
import Elevator from '../src/Elevator'

const initialElevatorMotionState = false
const initialElevatorFloor = 1
const motionTime = 1000
const nFloor = 3

let elevator
beforeEach(() => {elevator = new Elevator()})

describe('Elevator', function () {
  this.timeout(motionTime * nFloor + 100);

  it('Должен вернуть начальное состояние лифта - не двигается', () => {
    const state = elevator.getMotionState()

    expect(state).to.deep.equal(initialElevatorMotionState)
  })

  it('Должен вернуть начальное положение лифта - 1 этаж', () => {
    const floor = elevator.getFloor()

    expect(floor).to.deep.equal(initialElevatorFloor)
  })

  it('Должен переместить лифт на n этажей, ' +
    'за время большее или равное времени перемещения на n этажей', (done) => {
    // тест должен упасть..
    const floor = elevator.getFloor()
    elevator.acceptUserSelect(floor + nFloor)
    const floorBeforeEndMotion = elevator.getFloor()
    let countFloor = 1

    setInterval(() => {
      const newFloor = elevator.getFloor()
      // надо проверять не этаж а время..
      expect(floorBeforeEndMotion + countFloor).to.deep.equal(newFloor)
      countFloor++
      //done()
    }, motionTime)
  })
})
