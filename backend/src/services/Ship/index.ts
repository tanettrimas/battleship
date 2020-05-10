import crypto from 'crypto';
import { Shipper, direction, ShipCoordinates } from './ship.types';

class Ship implements Shipper {
  private _shipDirection: direction

  private _coordinates!: ShipCoordinates[]

  private _id: string;

  private static shipStorage: Ship[] = [];

  constructor(shipDirection: direction, coordinates: number[]) {
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

  private setCoordinates(coordinates: number[]) {
    if (coordinates.length > 5) {
      throw new Error('Length cannot be greater than 5');
    }

    const coords = [...new Set(coordinates)].map((coord) => ({
      number: coord,
      hit: false,
    }));

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
    const index = this._coordinates.findIndex((coord) => coord.number === position);
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
