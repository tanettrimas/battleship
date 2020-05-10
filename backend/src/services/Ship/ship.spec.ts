/* eslint-disable no-new */
import Ship from './index';

describe('Ship', () => {
  it('should defined', () => {
    expect(Ship).toBeDefined();
  });

  it('should have a length property', () => {
    const ship = new Ship('horizontal', [1, 2, 3]);
    expect(ship.length).toBe(3);
    expect(() => {
      new Ship('vertical', [1, 2, 3, 5, 6, 5]);
    }).toThrowError('Length cannot be greater than 5');
    const ship2 = new Ship('vertical', [1, 1, 1]);
    expect(ship2.length).toBe(1);
  });


  it('should be able to take a hit', () => {
    const ship = new Ship('horizontal', [55, 60, 2]);
    ship.hit(55);
    expect(ship.coordinates[0].hit).toBe(true);
    expect(ship.isSunk()).toBe(false);
  });

  it('should sunk when all coordinates are hit', () => {
    const ship = new Ship('vertical', [1, 2, 3]);
    ship.hit(1);
    ship.hit(2);
    ship.hit(3);
    expect(ship.isSunk()).toBe(true);
  });

  it('should set the shipStorage with the created ship', () => {
    const ship = new Ship('horizontal', [1, 2, 3]);
    Ship.setShipStorage(ship);
    expect(Ship.getStorage().length > 0).toBe(true);
    expect(Ship.getStorage()).toContain(ship);
    expect(Ship.getShip(ship.id)).toBeInstanceOf(Ship);
  });
});
