class Elevator {
  constructor (
    motionState = false,
    motionTime = 1000,
    initialFloor = 1,
  ) {
    this._motionState = motionState
    this._motionTime = motionTime
    this._floor = initialFloor
    this._motionDirection = ''
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
   * Обрабатывает выбор этажа пользователем
   *
   * @param {Number} floor
   * */
  acceptUserSelect (floor) {
    this._moveToFloor(floor)
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
        this._floor++
        this._moveToFloor(floor)
      }, this._motionTime)
    } else if (this._floor > floor) {
      this._updateMotionDirection('down')
      this._updateMotionState(true)

      setTimeout(() => {
        this._floor--
        this._moveToFloor(floor)
      }, this._motionTime)
    } else if (this._floor === floor) {
      this._updateMotionDirection('')
      this._updateMotionState(false)
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
}

export default Elevator
