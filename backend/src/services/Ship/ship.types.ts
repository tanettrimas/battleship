import { GameboardCoordinates } from '../Gameboard/gameboard.types';

export interface Shipper {
  hit(position: number): void
  isSunk(): boolean
}

export interface ShipCoordinates {
  hit?: boolean,
  coords: GameboardCoordinates
}

export type direction = 'horizontal' | 'vertical';
