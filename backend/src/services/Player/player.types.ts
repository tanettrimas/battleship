import Gameboard from '../Gameboard';
import { GameboardCoordinates } from '../Gameboard/gameboard.types';

export interface Playable {
  takeTurn(gameBoard: Gameboard, cords: GameboardCoordinates): true | GameboardCoordinates;
}
