import Player from '.';
import Computer from './Computer';
import Gameboard from '../Gameboard';

describe('Player', () => {
  it('should be defined', () => {
    const player = new Player();
    expect(player).toBeDefined();
  });

  it('should be able to play a game', () => {
    const playerBoard = new Gameboard();
    const computerBoard = new Gameboard();
    const player = new Player();
    const computer = new Computer();

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

    player.takeTurn(computerBoard, {
      letter: 'C',
      number: 4,
    });

    computer.takeTurn(playerBoard, {
      letter: 'A',
      number: 2,
    });
    expect(playerBoard.getBoardRow('A')).toContain('hit');
    expect(computerBoard.getBoardRow('C')).toContain('missed');
  });
});
