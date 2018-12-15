class Elevator {
  constructor () {
    this._motionState = false
    this._motionTime = 1000   //ms
    this._floor = 1
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
      // this._updateMotionDirection('up')
      // this._updateMotionState(true)

      setTimeout(() => {
        this._floor++
        this._moveToFloor(floor)
      }, this._motionTime)
    } else if (this._floor > floor) {
      // this._updateMotionDirection('down')
      // this._updateMotionState(true)

      setTimeout(() => {
        this._floor--
        this._moveToFloor(floor)
      }, this._motionTime)
    } else if (this._floor === floor) {
      // this._updateMotionState(false)
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
}

export default Elevator
