import { Gameboardes, GameboardCoordinates } from './gameboard.types';
import Ship from '../Ship';

class Gameboard implements Gameboardes {
  private matrix: Map<string, (number | string)[]> = new Map()

  private MATRIX_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];

  private MATRIX_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor() {
    this.createMatrix(this.matrix);
  }

  private createMatrix(matrix: Map<string, (number | string)[]>) {
    this.MATRIX_LETTERS.forEach((letter) => {
      matrix.set(letter, this.MATRIX_NUMBERS);
    });
    this.matrix = matrix;
  }

  getBoardRow(letter: string): (string | number)[] {
    if (!this.MATRIX_LETTERS.includes(letter)) {
      throw new Error(`Outside of valid range [${this.MATRIX_LETTERS[0]}-${this.MATRIX_LETTERS[this.MATRIX_LETTERS.length - 1]}]`);
    }
    return this.matrix.get(letter)!;
  }

  placeShip(cords: GameboardCoordinates[]): boolean {
    const numberCoordinates = cords.map((cord) => cord.number);
    // TODO: Fix this hack..
    const shipDirection = cords.every((cord) => cord.letter === cords[0].letter) ? 'vertical' : 'horizontal';
    const ship = new Ship(shipDirection, numberCoordinates);
    Ship.setShipStorage(ship);
    cords.forEach((cord) => {
      const position = this.matrix.get(cord.letter)!;
      const newPosition = position.map((pos) => {
        if (pos === cord.number) {
          return ship.id;
        }
        return pos;
      });
      this.matrix.set(cord.letter, newPosition);
    });
    return true;
  }

  recieveAttack(cords: GameboardCoordinates): GameboardCoordinates | true {
    // 1. Get coordinates
    // 2. Find the occurence of the ship based on coordinate
    // 3. If found, place a hit on the ship

    const boardRow = this.getBoardRow(cords.letter);
    const index = cords.number - 1;
    const ship = Ship.getShip(boardRow[index] as string);
    if (!ship) {
      this.updateBoardState(cords.letter, boardRow, index, false);
      return cords;
    }
    const didHit = ship.hit(cords.number);
    this.updateBoardState(cords.letter, boardRow, index, didHit);
    return true;
  }

  // eslint-disable-next-line max-len
  updateBoardState(letter: string, boardRow: (string | number)[], index: number, didHit: boolean): void {
    const newBoard = [...boardRow];
    newBoard[index] = didHit ? 'hit' : 'missed';
    this.matrix.set(letter, newBoard);
  }


  isAllShipsSunk(): boolean {
    throw new Error('Method not implemented.');
  }
}


export default Gameboard;
