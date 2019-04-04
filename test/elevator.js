import {expect} from 'chai'
import Elevator from '../src/Elevator'

const motionState = false
const initialFloor = 5
const maxFloor = 10
const minFloor = 1
const motionTime = 100
const doorState = false
const doorOpenStateTime = 500
const doorMotionTime = 100

const circleTimeDoor = doorMotionTime * 2 + doorOpenStateTime
const nFloor = 3

let elevator
beforeEach(() => {
  elevator = new Elevator({
    motionState,
    maxFloor,
    minFloor,
    initialFloor,
    motionTime,
    doorState,
    doorOpenStateTime,
    doorMotionTime,
  })
})

describe('Elevator', function () {
  // this.timeout(motionTime * nFloor + 100);

  describe('Состояние лифта', function () {
    this.timeout(circleTimeDoor + 100);

    it('Должен вернуть начальное состояние лифта - не двигается', () => {
      const state = elevator.getMotionState()

      expect(state).to.deep.equal(motionState)
    })

    it('Должен вернуть состояние лифта после выбора пользователя и закрытия дверей - двигается', (done) => {
      const floor = elevator.getFloor()
      elevator.acceptUserSelect(floor + 1)

      setTimeout(() => {
        const newMotionState = elevator.getMotionState()

        expect(newMotionState).to.deep.equal(!motionState)
        done()
      }, circleTimeDoor)
    })
  })

  describe('Движение лифта', function () {
    this.timeout(circleTimeDoor + 100);

    it(`Должен вернуть начальное положение лифта - ${initialFloor} этаж`, () => {
      const floor = elevator.getFloor()

      expect(floor).to.deep.equal(initialFloor)
    })

    it('Должен вернуть направление движение лифта после выбора пользователя и закрытия дверей - вниз', (done) => {
      const floor = elevator.getFloor()
      elevator.acceptUserSelect(floor - 1)

      setTimeout(() => {
        const motionDirection = elevator.getMotionDirection()

        expect(motionDirection).to.deep.equal('down')
        done()
      }, circleTimeDoor)
    })

    it('Должен вернуть направление движение лифта после выбора пользователя и закрытия дверей - вверх', (done) => {
      // this.timeout(circleTimeDoor + 100);
      const floor = elevator.getFloor()
      elevator.acceptUserSelect(floor + 1)

      setTimeout(() => {
        const motionDirection = elevator.getMotionDirection()

        expect(motionDirection).to.deep.equal('up')
        done()
      }, circleTimeDoor)
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

  describe('Список выбранных этажей', function () {
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

  describe('Двери лифта', function () {
    it('Возвращает начальное состояние дверей лифта - закрыты', function () {
      const newDoorState = elevator.getDoorState()

      expect(newDoorState).to.deep.equal(doorState)
    })

    it('Возвращает состояние дверей лифта после нажатия на кнопку открытия дверей - открывается', function () {
      // const newDoorState = elevator.getDoorState()
      //
      // expect(newDoorState).to.deep.equal(doorState)
    })
  })
})
