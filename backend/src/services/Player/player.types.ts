import { GameboardCoordinates, Gameboardes } from '../Gameboard/gameboard.types';

export interface Playable {
  gameBoard: Gameboardes;
  takeTurn(cords: GameboardCoordinates): true | GameboardCoordinates;
}
