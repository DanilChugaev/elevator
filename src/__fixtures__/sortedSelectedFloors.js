export default [
  {
    name: 'Список разных этажей в пределах minFloor и maxFloor',
    selectedFloors: [5, 3, 1, 2, 7, 8, 4, 15, 20, 11],
    expected: [1, 2, 3, 4, 5, 7, 8, 11, 15, 20],
  },
  {
    name: 'Список одинаковых этажей в пределах minFloor и maxFloor',
    selectedFloors: [5, 5, 1],
    expected: [1, 5],
  },
  {
    name: 'Список разных этажей за пределами minFloor и maxFloor',
    selectedFloors: [5, 3, 1, 2, 7, 8, 4, 150, -20, 11],
    expected: [1, 2, 3, 4, 5, 7, 8, 11],
  },
  {
    name: 'Список одинаковых этажей за пределами minFloor и maxFloor',
    selectedFloors: [-5, 5, 1],
    expected: [1, 5],
  },
];
