import Gameboard from './index';
import { GameboardCoordinates } from './gameboard.types';

describe('Gameboard', () => {
  let gameBoard: Gameboard;
  beforeEach(() => {
    gameBoard = new Gameboard();
  });

  afterEach(() => {
    gameBoard.clearGameboard();
  });

  it('should be defined', () => {
    expect(gameBoard).toBeDefined();
  });

  it('should throw if trying to fetch outside valid boardRow range', () => {
    gameBoard.getBoardRow('A');
    expect(() => {
      gameBoard.recieveAttack({ letter: 'U', number: 5 });
    }).toThrow('Outside of valid range [A-K]');
  });

  it('should be able to recieve attacks at specific coordinates', () => {
    const coordinates: GameboardCoordinates[] = [
      { letter: 'A', number: 5 },
      { letter: 'A', number: 6 },
      { letter: 'A', number: 4 },
    ];
    gameBoard.placeShip(coordinates);
    const boardRowA = gameBoard.getBoardRow('A')!;
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
    gameBoard.placeShip(coordinates);
    const actualHit = gameBoard.recieveAttack({ letter: 'A', number: 5 });
    const missedHit = gameBoard.recieveAttack({ letter: 'C', number: 6 });
    expect(actualHit).toBe(true);
    expect(missedHit).toEqual({ letter: 'C', number: 6 });
    const missedHitIndex = gameBoard.getBoardRow('C').indexOf('missed');
    const actualHitIndex = gameBoard.getBoardRow('A').indexOf('hit');
    expect(gameBoard.getBoardRow('C')[missedHitIndex]).toBe('missed');
    expect(gameBoard.getBoardRow('A')[actualHitIndex]).toBe('hit');
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
    gameBoard.placeShip(coordinates1);
    gameBoard.placeShip(coordinates2);
    gameBoard.recieveAttack({ letter: 'A', number: 5 });
    expect(gameBoard.isAllShipsSunk()).toBe(false);
    gameBoard.recieveAttack({ letter: 'A', number: 6 });
    gameBoard.recieveAttack({ letter: 'A', number: 4 });
    gameBoard.recieveAttack({ letter: 'B', number: 2 });
    gameBoard.recieveAttack({ letter: 'B', number: 3 });
    expect(gameBoard.isAllShipsSunk()).toBe(false);
    gameBoard.recieveAttack({ letter: 'B', number: 1 });
    expect(gameBoard.isAllShipsSunk()).toBe(true);
  });

  it('should not place ship at existing location', () => {
    const coordinates1: GameboardCoordinates[] = [
      { letter: 'A', number: 5 },
      { letter: 'A', number: 6 },
      { letter: 'A', number: 4 },
    ];
    gameBoard.placeShip(coordinates1);
    const coordinates2: GameboardCoordinates[] = [
      { letter: 'A', number: 5 },
      { letter: 'A', number: 6 },
    ];
    expect(() => {
      gameBoard.placeShip(coordinates2);
    }).toThrowError('Cannot place battleship in position of existing battleship!');
    const coordinates3: GameboardCoordinates[] = [
      { letter: 'B', number: 4 },
      { letter: 'B', number: 5 },
      { letter: 'B', number: 6 },
    ];
    gameBoard.placeShip(coordinates3);
  });
});
