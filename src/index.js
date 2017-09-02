import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}
class Board extends React.Component {
  renderSquare(i) {
    return <Square
    value={this.props.squares[i]}
    onClick={() => this.props.onClick(i)}
     />;
  }
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}{this.renderSquare(1)}{this.renderSquare(2)}{this.renderSquare(3)}{this.renderSquare(4)}
        </div>
        <div className="board-row">
          {this.renderSquare(5)}{this.renderSquare(6)}{this.renderSquare(7)}{this.renderSquare(8)}{this.renderSquare(9)}
        </div>
        <div className="board-row">
        {this.renderSquare(10)}{this.renderSquare(11)}{this.renderSquare(12)}{this.renderSquare(13)}{this.renderSquare(14)}
        </div>
        <div className="board-row">
        {this.renderSquare(15)}{this.renderSquare(16)}{this.renderSquare(17)}{this.renderSquare(18)}{this.renderSquare(19)}
        </div>
        <div className="board-row">
        {this.renderSquare(20)}{this.renderSquare(21)}{this.renderSquare(22)}{this.renderSquare(23)}{this.renderSquare(24)}
        </div>
      </div>
    );
  }
}
class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(25).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? '×' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ?
        'Move #' + move :
        'Game start';
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
        <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20],
    [1, 7, 13, 17, 21],
    [2, 8, 14, 18, 22],
    [5, 11, 17, 13, 9],
    [15, 11, 7, 13, 19],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d, e] = lines[i];
    let wincon1 = (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) ? true: false;
    let wincon2 = (squares[c] && squares[c] === squares[d] && squares[c] === squares[e]) ? true: false;
    let wincon3 = (squares[b] && squares[b] === squares[c] && squares[b] === squares[d]) ? true: false;
    if (wincon1) {
      return squares[a];
    }
    if (wincon2) {
      return squares[c]
    }
    if (wincon3) {
      return squares[b]
    }
  }
  return null;
}
// ========================================
ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
