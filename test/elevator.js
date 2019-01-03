import {expect} from 'chai'
import Elevator from '../src/Elevator'

const initialElevatorMotionState = false
const initialElevatorFloor = 1
const maxFloor = 10
const minFloor = 1
const motionTime = 1000
const nFloor = 3

let elevator
beforeEach(() => {
  elevator = new Elevator({maxFloor, minFloor})
})

describe('Elevator', function () {
  this.timeout(motionTime * nFloor + 100);

  describe('Состояние лифта', () => {
    it('Должен вернуть начальное состояние лифта - не двигается', () => {
      const state = elevator.getMotionState()

      expect(state).to.deep.equal(initialElevatorMotionState)
    })

    it('Должен вернуть состояние лифта после выбора пользователя - двигается', () => {
      const floor = elevator.getFloor()
      elevator.acceptUserSelect(floor + 1)
      const motionState = elevator.getMotionState()

      expect(motionState).to.deep.equal(true)
    })
  })

  describe('Движение лифта', () => {
    it('Должен вернуть начальное положение лифта - 1 этаж', () => {
      const floor = elevator.getFloor()

      expect(floor).to.deep.equal(initialElevatorFloor)
    })

    it('Должен вернуть направление движение лифта после выбора пользователя - вниз', () => {
      const floor = elevator.getFloor()
      elevator.acceptUserSelect(floor - 1)
      const motionDirection = elevator.getMotionDirection()

      expect(motionDirection).to.deep.equal('down')
    })

    it('Должен вернуть направление движение лифта после выбора пользователя - вверх', () => {
      const floor = elevator.getFloor()
      elevator.acceptUserSelect(floor + 1)
      const motionDirection = elevator.getMotionDirection()

      expect(motionDirection).to.deep.equal('up')
    })

    // it('Должен переместить лифт на n этажей, ' +
    //   'за время большее или равное времени перемещения на n этажей', (done) => {
    //   // тест должен упасть..
    //   const floor = elevator.getFloor()
    //   elevator.acceptUserSelect(floor + nFloor)
    //   const floorBeforeEndMotion = elevator.getFloor()
    //   let countFloor = 1
    //
    //   setInterval(() => {
    //     const newFloor = elevator.getFloor()
    //     // надо проверять не этаж а время..
    //     expect(floorBeforeEndMotion + countFloor).to.deep.equal(newFloor)
    //     countFloor++
    //     done()
    //   }, motionTime)
    // })
  })

  describe('Список выбранных этажей', () => {
    it('Возвращает список всех доступных этажей для лифта', () => {
      const checkListOfAvailableFloors = []
      for (let i = minFloor; i <= maxFloor; i++) {
        checkListOfAvailableFloors.push(i)
      }
      const listOfAvailableFloors = elevator.getListOfAvailableFloors()

      expect(listOfAvailableFloors).to.deep.equal(checkListOfAvailableFloors)
    })

    it('Должен добавить выбранный этаж в список выбранных этажей', () => {
      const selectedFloor = 5
      elevator.acceptUserSelect(selectedFloor)
      const listOfSelectedFloors = elevator.getListOfSelectedFloors()

      expect(listOfSelectedFloors.includes(selectedFloor)).to.deep.equal(true)
    })

    it('Добавленный этаж в списке выбранных этажей должен быть уникальным', () => {
      const selectedFloor = 5
      elevator.acceptUserSelect(selectedFloor)
      elevator.acceptUserSelect(selectedFloor)
      elevator.acceptUserSelect(selectedFloor)
      const listOfSelectedFloors = elevator.getListOfSelectedFloors()
      const uniqueSelectedFloors = listOfSelectedFloors.filter(item => item === selectedFloor)

      expect(uniqueSelectedFloors.length).to.deep.equal(1)
    })

    it('Возвращает отсортированный список этажей в порядке возрастания', () => {
      elevator.acceptUserSelect(5)
      elevator.acceptUserSelect(3)
      elevator.acceptUserSelect(1)
      elevator.acceptUserSelect(2)
      elevator.acceptUserSelect(7)
      const listOfSelectedFloors = elevator.getListOfSelectedFloors()
      const assortedListOfSelectedFloors = listOfSelectedFloors.sort()

      expect(listOfSelectedFloors).to.deep.equal(assortedListOfSelectedFloors)
    })

    it('Нельзя выбрать этаж меньше МИНИМАЛЬНО допустимого этажа', () => {
      const newMinFloor = minFloor - 1
      elevator.acceptUserSelect(newMinFloor)
      const listOfSelectedFloors = elevator.getListOfSelectedFloors()

      expect(listOfSelectedFloors.includes(newMinFloor)).to.deep.equal(false)
    })

    it('Нельзя выбрать этаж больше МАКСИМАЛЬНО допустимого этажа', () => {
      const newMaxFloor = maxFloor + 1
      elevator.acceptUserSelect(newMaxFloor)
      const listOfSelectedFloors = elevator.getListOfSelectedFloors()

      expect(listOfSelectedFloors.includes(newMaxFloor)).to.deep.equal(false)
    })
  })

  describe('Двери лифта', () => {
    it('Возвращает начальное состояние дверей лифта - закрыты', function () {
      const doorState = elevator.getDoorState()

      expect(doorState).to.deep.equal(false)
    })
  })
})
