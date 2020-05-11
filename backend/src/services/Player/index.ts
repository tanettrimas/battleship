import { Playable } from './player.types';
import Gameboard from '../Gameboard';
import { GameboardCoordinates } from '../Gameboard/gameboard.types';

class Player implements Playable {
  // eslint-disable-next-line class-methods-use-this
  takeTurn(gameBoard: Gameboard, cords: GameboardCoordinates): true | GameboardCoordinates {
    return gameBoard.recieveAttack(cords);
  }
}

export default Player;
