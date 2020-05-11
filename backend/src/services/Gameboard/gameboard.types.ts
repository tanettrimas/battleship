export interface GameboardCoordinates {
  letter: string;
  number: number;
  hit?: boolean;
  doesExist?: boolean;
  stringCoordinate?: string;
}

export interface Gameboardes {
  MATRIX_LETTERS: string[];
  MATRIX_NUMBERS: number[];
  placeShip(coordinates: GameboardCoordinates[]): boolean
  recieveAttack(coordinates: GameboardCoordinates): GameboardCoordinates | true
  getBoardRow(letter: string): (string | number)[]
  clearGameboard(): void
}
