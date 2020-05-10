export interface GameboardCoordinates {
  letter: string,
  number: number
}

export interface Gameboardes {
  placeShip(coordinates: GameboardCoordinates[]): boolean
  recieveAttack(coordinates: GameboardCoordinates): GameboardCoordinates | true
  isAllShipsSunk(): boolean
  getBoardRow(letter: string): (string | number)[]
}
