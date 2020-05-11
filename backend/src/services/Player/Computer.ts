import Player from './index';
import { GameboardCoordinates, Gameboardes } from '../Gameboard/gameboard.types';
import randomInteger from '../../util/randomInteger';

class Computer extends Player {
  private cords: GameboardCoordinates;

  constructor(gameBoard: Gameboardes) {
    super(gameBoard);
    this.cords = this.createRandomTurn();
  }

  private createRandomTurn(): GameboardCoordinates {
    const letterIndex = randomInteger(this.matrixLetters.length);
    const numberIndex = randomInteger(this.matrixNumbers.length);

    const randomLetter = this.gameBoard.MATRIX_LETTERS[letterIndex];
    const randomNumber = this.gameBoard.MATRIX_NUMBERS[numberIndex];

    return {
      letter: randomLetter,
      number: randomNumber,
    };
  }

  private setCurrentCord(): void {
    this.cords = this.createRandomTurn();
  }

  takeTurn(): true | GameboardCoordinates {
    this.turnCount += 1;
    this.setCurrentCord();

    if (this.doesCurrentMoveExist(this.previousTurns, this.cords)) {
      return {
        ...this.cords,
        doesExist: true,
      };
    }

    const attack = this.gameBoard.recieveAttack(this.cords);
    if (attack === true) {
      this.setPreviousTurn({ ...this.cords, hit: true });
      return true;
    }

    this.setPreviousTurn(attack);
    return attack;
  }
}

export default Computer;
