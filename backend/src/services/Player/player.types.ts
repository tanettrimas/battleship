import { GameboardCoordinates } from '../Gameboard/gameboard.types';

export interface Playable {
  takeTurn(cords: GameboardCoordinates): true | GameboardCoordinates;
  doesCurrentMoveExist(previousTurns: GameboardCoordinates[], cords: GameboardCoordinates): boolean;
  setPreviousTurn(cords: GameboardCoordinates): boolean;
}
