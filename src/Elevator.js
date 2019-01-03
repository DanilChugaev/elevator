class Elevator {
  constructor ({
                 motionState = false,
                 motionTime = 1000,
                 initialFloor = 1,
                 maxFloor = 5,
                 minFloor = 1,
                 doorState = false,
               } = {}) {
    this._motionState = motionState
    this._motionTime = motionTime
    this._motionDirection = ''
    this._floor = initialFloor
    this._maxFloor = maxFloor
    this._minFloor = minFloor
    this._listOfSelectedFloors = []
    this._listOfAvailableFloors = []
    this._doorState = doorState

    this._setAvailableFloors()
  }

  /**
   * Возвращает номер этажа лифта
   *
   * @return {Number} floor
   * */
  getFloor () {
    return this._floor
  }

  /**
   * Возвращает состояние лифта
   *
   * @return {Boolean} state
   * */
  getMotionState () {
    return this._motionState
  }

  /**
   * Возвращает направление движения лифта
   *
   * @return {String} direction
   * */
  getMotionDirection () {
    return this._motionDirection
  }

  /**
   * Возвращает список выбранных этажей
   *
   * @return {Array} listOfSelectedFloors
   * */
  getListOfSelectedFloors () {
    return this._listOfSelectedFloors
  }

  /**
   * Возвращает список всех доступных этажей для лифта
   *
   * @return {Array} listOfAvailableFloors
   * */
  getListOfAvailableFloors () {
    return this._listOfAvailableFloors
  }

  /**
   * Возвращает состояние дверей лифта
   *
   * @return {Boolean} doorState
   * */
  getDoorState () {
    return this._doorState
  }

  /**
   * Обрабатывает выбор этажа пользователем
   *
   * @param {Number} floor
   * */
  acceptUserSelect (floor) {
    this._addFloorToListOfSelectedFloors(floor)

    // перемещении лифта может происходить
    // параллельно добавлению этажей

    // перемещение лифта должно происходить
    // последовательно по списку выбранных этажей
    // в одном направлении за текущий момент

    // перемещение лифта должно начинаться после того,
    // как двери лифта закроются
    this._moveToFloor(floor)
  }

  /**
   * Устанавливает все доступные для перемещения этажи
   * */
  _setAvailableFloors () {
    // в дальнейшем можно добавить, чтобы устанавливались
    // этажи, кроме переданных в этот метод
    for (let i = this._minFloor; i <= this._maxFloor; i++) {
      this._listOfAvailableFloors.push(i)
    }
  }

  /**
   * Перемещает лифт на указанный этаж
   *
   * @param {Number} floor
   * */
  _moveToFloor (floor) {
    if (this._floor < floor) {
      this._updateMotionDirection('up')
      this._updateMotionState(true)

      setTimeout(() => {
        // тут выбранный этаж удалять из списка
        // this._removeFloorFromListOfSelectedFloors(floor)
        this._floor++

        // необходимо перемещать лифт на следующий этаж по списку
        this._moveToFloor(floor)
      }, this._motionTime)
    } else if (this._floor > floor) {
      this._updateMotionDirection('down')
      this._updateMotionState(true)

      setTimeout(() => {
        // тут выбранный этаж удалять из списка
        // this._removeFloorFromListOfSelectedFloors(floor)
        this._floor--
        this._moveToFloor(floor)
      }, this._motionTime)
    } else if (this._floor === floor) {
      // направление лифта необходимо обнулять
      // только после достижения последнего лифта в списке
      // выбранных этажей по данному направлению
      this._updateMotionDirection('')
      this._updateMotionState(false)
      // тут выбранный этаж удалять из списка
      // оповещать что пользователь на нужном этаже
    }
  }

  /**
   * Обновляет состояние лифта
   *
   * @param {Boolean} motionState
   * */
  _updateMotionState (motionState) {
    this._motionState = motionState
  }

  /**
   * Обновляет направление движения лифта
   *
   * @param {String} motionDirection
   * */
  _updateMotionDirection (motionDirection) {
    this._motionDirection = motionDirection
  }

  /**
   * Добавляет выбранный этаж в список выбранных этажей
   *
   * @param {Number} floor
   * */
  _addFloorToListOfSelectedFloors (floor) {
    if (this._checkFloorBeforeAddToList(floor)) {
      this._listOfSelectedFloors.push(floor)
    }
  }

  /**
   * Удаляет этаж из списка выбранных этажей для перемещения
   *
   * @param {Number} floor
   * */
  _removeFloorFromListOfSelectedFloors (floor) {
    const index = this._listOfSelectedFloors.indexOf(floor);

    if (index > -1) {
      this._listOfSelectedFloors.splice(index, 1);
    }
  }

  /**
   * Проверяет выбранный этаж перед добавлением
   * в список выбранных этажей
   *
   * @param {Number} floor
   *
   * @return {Boolean} result
   * */
  _checkFloorBeforeAddToList (floor) {
    const contained = this._listOfSelectedFloors.includes(floor)
    const lessOrEqualMaxFloor = floor <= this._maxFloor
    const greaterOrEqualMinFloor = floor >= this._minFloor

    return !contained
      && lessOrEqualMaxFloor
      && greaterOrEqualMinFloor
  }
}

export default Elevator
