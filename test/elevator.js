import {expect} from 'chai'
import Elevator from '../src/Elevator'

const initialElevatorMotionState = false
const initialElevatorFloor = 1
const selectedFloor = 2

let elevator
beforeEach(() => {elevator = new Elevator()})

describe('Elevator', () => {
  it('Должен вернуть начальное состояние лифта - не двигается', () => {
    const state = elevator.getMotionState()

    expect(state).to.deep.equal(initialElevatorMotionState)
  })

  it('Должен вернуть начальный этаж лифта - 1 этаж', () => {
    const floor = elevator.getFloor()

    expect(floor).to.deep.equal(initialElevatorFloor)
  })

  it('Должен переместить лифт на указанный пассажиром этаж', () => {
    elevator.acceptUserSelect(selectedFloor)
    const floor = elevator.getFloor()

    expect(floor).to.deep.equal(selectedFloor)
  })
})
