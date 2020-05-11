import { Playable } from './player.types';
import { GameboardCoordinates } from '../Gameboard/gameboard.types';
import Gameboard from '../Gameboard';

class Player implements Playable {
  public turnCount: number = 0;

  public previousTurns: GameboardCoordinates[]

  public matrixLetters: string[]

  public matrixNumbers: number[];

  constructor(public gameBoard: Gameboard) {
    this.gameBoard = gameBoard;
    this.previousTurns = [];
    this.matrixLetters = [...this.gameBoard.MATRIX_LETTERS];
    this.matrixNumbers = [...this.gameBoard.MATRIX_NUMBERS];
  }

  // eslint-disable-next-line class-methods-use-this
  takeTurn(cords: GameboardCoordinates): true | GameboardCoordinates {
    this.turnCount += 1;

    if (this.doesCurrentMoveExist(this.previousTurns, cords)) {
      return {
        ...cords,
        doesExist: true,
      };
    }
    const attack = this.gameBoard.recieveAttack(cords);
    if (attack === true) {
      this.setPreviousTurn({ ...cords, hit: true });
      return true;
    }

    this.setPreviousTurn(attack);
    return attack;
  }

  // eslint-disable-next-line class-methods-use-this
  doesCurrentMoveExist(previousTurns: GameboardCoordinates[], cords: GameboardCoordinates): boolean {
    return previousTurns.length > 0 && previousTurns.some((turn) => turn.letter === cords.letter && turn.number === cords.number);
  }

  setPreviousTurn(cords: GameboardCoordinates): boolean {
    this.previousTurns.push(cords);
    this.previousTurns = this.previousTurns.sort((a, b) => a.letter.localeCompare(b.letter));
    return true;
  }
}

export default Player;
