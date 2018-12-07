class Elevator {
  constructor () {
    this._motionState = false
    this._motionTime = 5000   //ms
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
    this._floor = floor
  }

  /**
   * Обновляет состояние лифта
   *
   * @param {Number} motionState
   * */
  // _updateMotionState (motionState) {
  //   this._motionState = motionState
  // }
}

export default Elevator
