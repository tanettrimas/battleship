/* eslint-disable no-new */
import Ship from './index';

describe('Ship', () => {
  it('should defined', () => {
    expect(Ship).toBeDefined();
  });

  it('should have a length property', () => {
    const ship = new Ship('horizontal', [
      { letter: 'A', number: 1 },
      { letter: 'A', number: 2 },
    ]);
    expect(ship.length).toBe(2);
    expect(() => {
      new Ship('vertical', [
        { letter: 'B', number: 1 },
        { letter: 'B', number: 2 },
        { letter: 'B', number: 3 },
        { letter: 'B', number: 4 },
        { letter: 'B', number: 5 },
        { letter: 'B', number: 6 },
      ]);
    }).toThrowError('Length cannot be greater than 5 or smaller than 2');
    expect(() => {
      new Ship('vertical', [{ letter: 'C', number: 1 }]);
    }).toThrowError('Length cannot be greater than 5 or smaller than 2');
    const ship2 = new Ship('vertical', [
      { letter: 'D', number: 1 },
      { letter: 'D', number: 2 },
    ]);
    expect(ship2.length).toBe(2);
  });

  it('should not allow duplicate coordinates', () => {
    const ship = new Ship('vertical', [
      {
        letter: 'B',
        number: 5,
      },
      {
        letter: 'B',
        number: 5,
      },
      {
        letter: 'B',
        number: 6,
      },
    ]);

    expect(ship.length).toBe(2);
  });

  it('should be able to take a hit', () => {
    const ship = new Ship('horizontal', [
      { letter: 'A', number: 55 },
      { letter: 'A', number: 60 },
      { letter: 'A', number: 2 },
    ]);
    ship.hit(55);
    expect(ship.coordinates[0].hit).toBe(true);
    expect(ship.isSunk()).toBe(false);
  });

  it('should sunk when all coordinates are hit', () => {
    const ship = new Ship('vertical', [
      { letter: 'A', number: 1 },
      { letter: 'A', number: 2 },
      { letter: 'A', number: 3 },
    ]);
    ship.hit(1);
    ship.hit(2);
    ship.hit(3);
    expect(ship.isSunk()).toBe(true);
  });

  it('should set the shipStorage with the created ship', () => {
    const ship = new Ship('horizontal', [
      { letter: 'A', number: 1 },
      { letter: 'A', number: 2 },
      { letter: 'A', number: 3 },
    ]);
    Ship.setShipStorage(ship);
    expect(Ship.getStorage().length > 0).toBe(true);
    expect(Ship.getStorage()).toContain(ship);
    expect(Ship.getShip(ship.id)).toBeInstanceOf(Ship);
  });
});
