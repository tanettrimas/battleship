/* eslint-disable max-len */
import { GameboardCoordinates, Gameboardes } from './gameboard.types';
import Ship from '../Ship';

class Gameboard implements Gameboardes {
  private matrix: Map<string, (number | string)[]> = new Map()

  public MATRIX_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];

  public MATRIX_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor() {
    this.createMatrix(this.matrix);
  }

  private createMatrix(matrix: Map<string, (number | string)[]>) {
    this.MATRIX_LETTERS.forEach((letter) => {
      matrix.set(letter, this.MATRIX_NUMBERS);
    });
    this.matrix = matrix;
  }

  clearGameboard() {
    Ship.clearStorage();
    this.matrix.clear();
  }

  getBoardRow(letter: string): (string | number)[] {
    if (!this.MATRIX_LETTERS.includes(letter)) {
      throw new Error(`Outside of valid range [${this.MATRIX_LETTERS[0]}-${this.MATRIX_LETTERS[this.MATRIX_LETTERS.length - 1]}]`);
    }
    return this.matrix.get(letter)!;
  }

  placeShip(cords: GameboardCoordinates[]): boolean {
    // TODO: Fix this hack..
    const shipDirection = cords.every((cord) => cord.letter === cords[0].letter) ? 'vertical' : 'horizontal';
    const ship = new Ship(shipDirection, cords);
    const shipStorage = Ship.getStorage();
    this.checkIfShipExists({ shipStorage, cordsData: cords });
    Ship.setShipStorage(ship);
    cords.forEach((cord) => {
      const position = this.matrix.get(cord.letter)!;
      const newPosition = position.map((pos) => {
        // This makes sure the matrix updates with the ships id in the place where it has been put
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

  private updateBoardState(letter: string, boardRow: (string | number)[], index: number, didHit: boolean): void {
    const newBoard = [...boardRow];
    newBoard[index] = didHit ? 'hit' : 'missed';
    this.matrix.set(letter, newBoard);
  }

  // eslint-disable-next-line class-methods-use-this
  private checkIfShipExists({ shipStorage, cordsData }: { shipStorage: Ship[]; cordsData: GameboardCoordinates[]; }) {
    let shipExists = false;
    if (shipStorage.length) {
      const coordinatesFromShipStorage = shipStorage
        .map((shipStorageItem) => shipStorageItem.coordinates)
        .map((coordinates) => coordinates.map(({ coords }) => coords));
      // eslint-disable-next-line no-restricted-syntax
      for (const cord of coordinatesFromShipStorage) {
        shipExists = cord
          .some((cData) => cordsData.find((c) => cData.number === c.number && c.letter === cData.letter));
      }
      if (shipExists) {
        throw new Error('Cannot place battleship in position of existing battleship!');
      }
    }
  }


  // eslint-disable-next-line class-methods-use-this
  isAllShipsSunk(): boolean {
    return Ship.getStorage().every((ship) => ship.isSunk());
  }
}


export default Gameboard;
