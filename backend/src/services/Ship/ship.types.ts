export interface Shipper {
  hit(position: number): void
  isSunk(): boolean
}

export interface ShipCoordinates {
  hit?: boolean,
  number: number
}

export type direction = 'horizontal' | 'vertical';
