import Gameboard from './index';
import { GameboardCoordinates } from './gameboard.types';

describe('Gameboard', () => {
  beforeEach(() => {
    Gameboard.createGameboard();
  });

  afterEach(() => {
    Gameboard.clearGameboard();
  });

  it('should be defined', () => {
    expect(Gameboard).toBeDefined();
  });

  it('should throw if trying to fetch outside valid boardRow range', () => {
    Gameboard.getBoardRow('A');
    expect(() => {
      Gameboard.recieveAttack({ letter: 'U', number: 5 });
    }).toThrow('Outside of valid range [A-K]');
  });

  it('should be able to recieve attacks at specific coordinates', () => {
    const coordinates: GameboardCoordinates[] = [
      { letter: 'A', number: 5 },
      { letter: 'A', number: 6 },
      { letter: 'A', number: 4 },
    ];
    Gameboard.placeShip(coordinates);
    const boardRowA = Gameboard.getBoardRow('A')!;
    expect(typeof boardRowA[2]).toBe('number');
    expect(typeof boardRowA[4]).toBe('string');
    expect(boardRowA.length).toBe(9);
    expect(boardRowA[4].toString().length).toBe(40);
  });

  it('should recieve attack, update the Gameboard and return true or coordinates of the missed hit', () => {
    const coordinates: GameboardCoordinates[] = [
      { letter: 'A', number: 5 },
      { letter: 'A', number: 6 },
      { letter: 'A', number: 4 },
    ];
    Gameboard.placeShip(coordinates);
    const actualHit = Gameboard.recieveAttack({ letter: 'A', number: 5 });
    const missedHit = Gameboard.recieveAttack({ letter: 'C', number: 6 });
    expect(actualHit).toBe(true);
    expect(missedHit).toEqual({ letter: 'C', number: 6 });
    const missedHitIndex = Gameboard.getBoardRow('C').indexOf('missed');
    const actualHitIndex = Gameboard.getBoardRow('A').indexOf('hit');
    expect(Gameboard.getBoardRow('C')[missedHitIndex]).toBe('missed');
    expect(Gameboard.getBoardRow('A')[actualHitIndex]).toBe('hit');
  });

  it('should be able to report whether or not all of their ships have been sunk', () => {
    const coordinates1: GameboardCoordinates[] = [
      { letter: 'A', number: 5 },
      { letter: 'A', number: 6 },
      { letter: 'A', number: 4 },
    ];

    const coordinates2: GameboardCoordinates[] = [
      { letter: 'B', number: 3 },
      { letter: 'B', number: 2 },
      { letter: 'B', number: 1 },
    ];
    Gameboard.placeShip(coordinates1);
    Gameboard.placeShip(coordinates2);
    Gameboard.recieveAttack({ letter: 'A', number: 5 });
    expect(Gameboard.isAllShipsSunk()).toBe(false);
    Gameboard.recieveAttack({ letter: 'A', number: 6 });
    Gameboard.recieveAttack({ letter: 'A', number: 4 });
    Gameboard.recieveAttack({ letter: 'B', number: 2 });
    Gameboard.recieveAttack({ letter: 'B', number: 3 });
    expect(Gameboard.isAllShipsSunk()).toBe(false);
    Gameboard.recieveAttack({ letter: 'B', number: 1 });
    expect(Gameboard.isAllShipsSunk()).toBe(true);
  });

  it('should not place ship at existing location', () => {
    const coordinates1: GameboardCoordinates[] = [
      { letter: 'A', number: 5 },
      { letter: 'A', number: 6 },
      { letter: 'A', number: 4 },
    ];
    Gameboard.placeShip(coordinates1);
    const coordinates2: GameboardCoordinates[] = [
      { letter: 'A', number: 5 },
      { letter: 'A', number: 6 },
    ];
    expect(() => {
      Gameboard.placeShip(coordinates2);
    }).toThrowError('Cannot place battleship in position of existing battleship!');
    const coordinates3: GameboardCoordinates[] = [
      { letter: 'B', number: 4 },
      { letter: 'B', number: 5 },
      { letter: 'B', number: 6 },
    ];
    Gameboard.placeShip(coordinates3);
  });
});
