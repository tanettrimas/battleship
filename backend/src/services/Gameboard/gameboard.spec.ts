import Gameboard from './index';
import { GameboardCoordinates } from './gameboard.types';

describe('Gameboard', () => {
  it('should be defined', () => {
    const gameboard = new Gameboard();
    expect(gameboard).toBeDefined();
  });

  it('should throw if trying to fetch outside valid boardRow range', () => {
    const gameboard = new Gameboard();
    gameboard.getBoardRow('A');
    expect(() => {
      gameboard.recieveAttack({ letter: 'U', number: 5 });
    }).toThrow('Outside of valid range [A-K]');
  });

  it('should be able to recieve attacks at specific coordinates', () => {
    const gameboard = new Gameboard();
    const coordinates: GameboardCoordinates[] = [
      { letter: 'A', number: 5 },
      { letter: 'A', number: 6 },
      { letter: 'A', number: 4 },
    ];
    gameboard.placeShip(coordinates);
    const boardRowA = gameboard.getBoardRow('A')!;
    expect(typeof boardRowA[2]).toBe('number');
    expect(typeof boardRowA[4]).toBe('string');
    expect(boardRowA.length).toBe(9);
    expect(boardRowA[4].toString().length).toBe(40);
  });

  it('should recieve attack, update the gameboard and return true or coordinates of the missed hit', () => {
    const gameboard = new Gameboard();
    const coordinates: GameboardCoordinates[] = [
      { letter: 'A', number: 5 },
      { letter: 'A', number: 6 },
      { letter: 'A', number: 4 },
    ];
    gameboard.placeShip(coordinates);

    const actualHit = gameboard.recieveAttack({ letter: 'A', number: 5 });
    const missedHit = gameboard.recieveAttack({ letter: 'C', number: 6 });
    expect(actualHit).toBe(true);
    expect(missedHit).toEqual({ letter: 'C', number: 6 });
    const missedHitIndex = gameboard.getBoardRow('C').indexOf('missed');
    const actualHitIndex = gameboard.getBoardRow('A').indexOf('hit');
    expect(gameboard.getBoardRow('C')[missedHitIndex]).toBe('missed');
    expect(gameboard.getBoardRow('A')[actualHitIndex]).toBe('hit');
  });
});
