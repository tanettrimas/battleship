import Player from '.';
import Computer from './Computer';
import Gameboard from '../Gameboard';

describe('Player', () => {
  let player: Player;
  let computer: Computer;
  let computerBoard: Gameboard;
  let playerBoard: Gameboard;

  beforeEach(() => {
    playerBoard = new Gameboard();
    computerBoard = new Gameboard();
    player = new Player(computerBoard);
    computer = new Computer(playerBoard);

    playerBoard.placeShip([
      {
        letter: 'A',
        number: 2,
      },
      {
        letter: 'A',
        number: 3,
      },
    ]);

    computerBoard.placeShip([
      {
        letter: 'C',
        number: 2,
      },
      {
        letter: 'C',
        number: 3,
      },
    ]);
  });

  afterEach(() => {
    playerBoard.clearGameboard();
    computerBoard.clearGameboard();
  });

  it('should be defined', () => {
    expect(player).toBeDefined();
  });

  it('should make player take a turn based on given coordinates', () => {
    player.takeTurn({
      letter: 'C',
      number: 3,
    });

    expect(computerBoard.getBoardRow('C')).toContain('hit');
  });

  it('should make computer take a random turn', () => {
    computer.takeTurn();
    computer.takeTurn();
    expect(computer.turnCount).toBe(2);
  });

  it('should not make the same turn twice', () => {
    for (let i = 0; i < 99; i += 1) {
      computer.takeTurn();
    }
    expect(computer.previousTurns.length).not.toBe(computer.turnCount);
    const [, first, second] = playerBoard.getBoardRow('A');
    // You cannot miss a boat if it exists on the board
    expect(first).not.toBe('missed');
    expect(second).not.toBe('missed');
  });
});
