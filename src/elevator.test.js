import { expect } from 'chai';
import Elevator from './Elevator';
import sortedSelectedFloors from './__fixtures__/sortedSelectedFloors'

const motionState = false;
const initialFloor = 5;
const maxFloor = 100;
const minFloor = 1;
const motionTime = 100;
const doorState = false;
const doorOpenStateTime = 500;
const doorMotionTime = 100;

const circleTimeDoor = doorMotionTime * 2 + doorOpenStateTime;
const nFloor = 3;

let elevator;
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
  });
});

describe('Elevator', () => {
  // this.timeout(motionTime * nFloor + 100);

  describe('Инициализация лифта', () => {
    it.skip('Лифт должен создаваться с помощью конструктора', () => {

    });
    it.skip('Лифт должен создаваться с помощью конструктора с любым кол-вом этажей', () => {

    });
    it.skip('Лифт должен создаваться с помощью конструктора со списком доступных этажей', () => {

    });
  });

  describe('Состояние лифта', () => {
    test('Должен вернуть начальное состояние лифта - не двигается', () => {
      const state = elevator.getMotionState();

      expect(state).to.deep.equal(motionState);
    });

    test.skip('Должен вернуть состояние лифта после выбора пользователя и закрытия дверей - двигается', (done) => {
      const floor = elevator.getFloor();
      elevator.acceptUserSelect(floor + 1);

      setTimeout(() => {
        const newMotionState = elevator.getMotionState();

        expect(newMotionState).to.deep.equal(!motionState);
        done();
      }, circleTimeDoor);
    });

    test.skip('исключения обрабатывать (например, лифт сломан)', () => {

    });

    test.skip('исключения обрабатывать (например, лифт сломался во время движения, необходимо включить стоппоры)', () => {

    });
  });

  describe('Движение лифта', () => {
    test(`Должен вернуть начальное положение лифта - ${initialFloor} этаж`, () => {
      const floor = elevator.getFloor();

      expect(floor).to.deep.equal(initialFloor);
    });

    test('Должен вернуть направление движение лифта после выбора пользователя и закрытия дверей - вниз', (done) => {
      const floor = elevator.getFloor();
      elevator.acceptUserSelect(floor - 1);

      setTimeout(() => {
        const motionDirection = elevator.getMotionDirection();

        expect(motionDirection).to.deep.equal('down');
        done();
      }, circleTimeDoor);
    });

    test('Должен вернуть направление движение лифта после выбора пользователя и закрытия дверей - вверх', (done) => {
      // this.timeout(circleTimeDoor + 100);
      const floor = elevator.getFloor();
      elevator.acceptUserSelect(floor + 1);

      setTimeout(() => {
        const motionDirection = elevator.getMotionDirection();

        expect(motionDirection).to.deep.equal('up');
        done();
      }, circleTimeDoor);
    });

    test.skip('Должен переместить лифт на n этажей, '
        + 'за время большее или равное времени перемещения на n этажей', (done) => {
      // тест должен упасть..
      const floor = elevator.getFloor();
      elevator.acceptUserSelect(floor + nFloor);
      const floorBeforeEndMotion = elevator.getFloor();
      let countFloor = 1;

      setInterval(() => {
        const newFloor = elevator.getFloor();
        // надо проверять не этаж а время..
        expect(floorBeforeEndMotion + countFloor).to.deep.equal(newFloor);
        countFloor++;
        done();
      }, motionTime);
    });

    test.skip('в зависимости от того на каком этаже находится лифт, время передвижения до следующего этажа будет разным', () => {

    });
    test.skip('лифт с этажа на этаж перемещается за некоторое время (учитывать это)', () => {

    });
    test.skip('учитывать остановки лифта в правильной последовательности. происходят такие случаи: Вы с незнакомцем заходите в лифт на 1 этаже. Он нажимает на 9 этаж, а вы на 3. естественно он едет на 9, поскольку нажат был первым', () => {

    });
    test.skip('В 10 этажном доме можно поехать с 1го этажа на 10', () => {

    });
    test.skip('В 10 этажном доме можно вызвать лифт на 10 этаже, когда он на первом', () => {

    });
    test.skip('В 10 этажном доме можно вызвать лифт на 10 этаже, когда он на первом, и поехать на первый', () => {

    });
    test.skip('В 10 этажном доме можно вызвать лифт на 1 этаже и посетить все этажи', () => {

    });
  });

  describe('Список этажей', () => {
    test('Возвращает список всех доступных этажей для лифта', () => {
      const checkListOfAvailableFloors = [];
      for (let i = minFloor; i <= maxFloor; i++) {
        checkListOfAvailableFloors.push(i);
      }
      const listOfAvailableFloors = elevator.getListOfAvailableFloors();

      expect(listOfAvailableFloors).to.deep.equal(checkListOfAvailableFloors);
    });

    test('Должен добавить выбранный этаж в список выбранных этажей', () => {
      const selectedFloor = 5;
      elevator.acceptUserSelect(selectedFloor);
      const listOfSelectedFloors = elevator.getListOfSelectedFloors();

      expect(listOfSelectedFloors.includes(selectedFloor)).to.deep.equal(true);
    });

    test('Добавленный этаж в списке выбранных этажей должен быть уникальным', () => {
      const selectedFloor = 5;

      for (let i = 0; i < 3; i++) {
        elevator.acceptUserSelect(selectedFloor);
      }
      const listOfSelectedFloors = elevator.getListOfSelectedFloors();
      const uniqueSelectedFloors = listOfSelectedFloors.filter(item => item === selectedFloor);

      expect(uniqueSelectedFloors.length).to.deep.equal(1);
    });

    describe('Возвращает отсортированный список этажей в порядке возрастания', () => {
      sortedSelectedFloors.forEach(({name, selectedFloors, expected}) => {
        test(name, () => {
          selectedFloors.forEach(item => elevator.acceptUserSelect(item));

          const listOfSelectedFloors = elevator.getListOfSelectedFloors();

          expect(listOfSelectedFloors).to.deep.equal(expected);
        });
      })
    });

    test('Нельзя выбрать этаж меньше МИНИМАЛЬНО допустимого этажа', () => {
      const newMinFloor = minFloor - 1;
      elevator.acceptUserSelect(newMinFloor);
      const listOfSelectedFloors = elevator.getListOfSelectedFloors();

      expect(listOfSelectedFloors.includes(newMinFloor)).to.deep.equal(false);
    });

    test('Нельзя выбрать этаж больше МАКСИМАЛЬНО допустимого этажа', () => {
      const newMaxFloor = maxFloor + 1;
      elevator.acceptUserSelect(newMaxFloor);
      const listOfSelectedFloors = elevator.getListOfSelectedFloors();

      expect(listOfSelectedFloors.includes(newMaxFloor)).to.deep.equal(false);
    });
  });

  describe('Двери лифта', () => {
    test('Возвращает начальное состояние дверей лифта - закрыты', () => {
      const newDoorState = elevator.getDoorState();

      expect(newDoorState).to.deep.equal(doorState);
    });

    test.skip('Пользователь нажал открыть дверь - состояние открывается', () => {

    });
    test.skip('Пользователь нажал закрыть дверь - состояние закрывается', () => {

    });
    test.skip('Пользователь несколько раз нажал открыть дверь - состояние открывается', () => {

    });
    test.skip('Пользователь несколько раз нажал закрыть дверь - состояние закрывается', () => {

    });
    test.skip('Двери лифта открылись - состояние открыты', () => {

    });
    test.skip('Двери лифта закрылись - состояние закрыты', () => {

    });
    test.skip('Пользователь нажал открыть дверь когда двери были открыты - состояние открыты', () => {

    });
    test.skip('Пользователь нажал закрыть дверь когда двери были закрыты - состояние закрыты', () => {

    });
    test.skip('Должен начать закрывать дверь, если нажал кнопку закрыть, когда двери отрывались', () => {

    });
    test.skip('Должен начать открывать дверь, если нажал кнопку открыть, когда двери закрывались', () => {

    });
  });

  describe('Здание', () => {
    test.skip('учитывать, что лифт может останавливаться на промежуточных этажах, если там он был вызван, при этом, должны останавливаться только те лифты, направление которых соответствует требуемому направлению пользователя. (тут уже создать отдельный класс здания)', () => {

    });
  })
});
