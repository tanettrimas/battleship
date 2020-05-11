import crypto from 'crypto';
import { Shipper, direction, ShipCoordinates } from './ship.types';
import { GameboardCoordinates } from '../Gameboard/gameboard.types';

class Ship implements Shipper {
  private _shipDirection: direction

  private _coordinates!: ShipCoordinates[]

  private _id: string;

  private static shipStorage: Ship[] = [];

  constructor(shipDirection: direction, coordinates: GameboardCoordinates[]) {
    this._id = crypto.randomBytes(20).toString('hex');
    this._shipDirection = shipDirection;
    this.setCoordinates(coordinates);
  }

  static clearStorage(): void {
    this.shipStorage = [];
  }

  static getShip(id: string) {
    return this.shipStorage.find((ship) => ship.id === id);
  }

  static getStorage() {
    return this.shipStorage;
  }

  static setShipStorage(ship: Ship) {
    this.shipStorage.push(ship);
  }

  private setCoordinates(coordinates: GameboardCoordinates[]) {
    if (coordinates.length > 5 || coordinates.length < 2) {
      throw new Error('Length cannot be greater than 5 or smaller than 2');
    }

    const stringCoordinates = coordinates.map((cord) => `${cord.letter}${cord.number}`);

    const coords = [...new Set(stringCoordinates)].map((cord) => {
      const [letter, ...number] = cord.split('');
      return {
        coords: {
          number: parseInt(number.join(''), 10),
          letter,
          stringCoordinate: cord,
        },
        hit: false,
      };
    });

    this._coordinates = coords;
  }

  get id() {
    return this._id;
  }

  get length() {
    return this._coordinates.length;
  }

  get direction() {
    return this._shipDirection;
  }

  get coordinates() {
    return this._coordinates;
  }

  hit(position: number): boolean {
    const index = this._coordinates.findIndex(({ coords: { number } }) => number === position);
    if (index === -1) {
      return false;
    }
    this._coordinates[index].hit = true;
    return true;
  }

  isSunk(): boolean {
    return this.coordinates.every((coord) => coord.hit === true);
  }
}

export default Ship;
