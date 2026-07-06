import React, { useState, useEffect } from "react";

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const HUMAN = "X";
const COMPUTER = "O";

function calculateWinner(cells) {
  for (const [a, b, c] of winningLines) {
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }
  return null;
}

function minimax(cells, isMaximizing) {
  const winner = calculateWinner(cells);
  if (winner === COMPUTER) return { score: 1 };
  if (winner === HUMAN) return { score: -1 };
  if (cells.every((c) => c !== null)) return { score: 0 };

  const emptyIndices = cells
    .map((c, i) => (c === null ? i : null))
    .filter((i) => i !== null);

  let bestMove = emptyIndices[0];
  let bestScore = isMaximizing ? -Infinity : Infinity;

  for (const index of emptyIndices) {
    const next = [...cells];
    next[index] = isMaximizing ? COMPUTER : HUMAN;
    const result = minimax(next, !isMaximizing).score;

    if (isMaximizing ? result > bestScore : result < bestScore) {
      bestScore = result;
      bestMove = index;
    }
  }

  return { score: bestScore, move: bestMove };
}

function getComputerMove(cells) {
  return minimax(cells, true).move;
}

export default function TicTacToe() {
  const [open, setOpen] = useState(false);
  const [cells, setCells] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);

  const winner = calculateWinner(cells);
  const isDraw = !winner && cells.every((c) => c !== null);

  // بعد ما اللاعب (X) يلعب، دور الكمبيوتر (O) يجي تلقائياً بعد تأخير بسيط
  useEffect(() => {
    if (!open || isXTurn || winner || isDraw) return;

    const timer = setTimeout(() => {
      const move = getComputerMove(cells);
      if (move === undefined) return;
      const next = [...cells];
      next[move] = COMPUTER;
      setCells(next);
      setIsXTurn(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [cells, isXTurn, open, winner, isDraw]);

  const handleCellClick = (index) => {
    if (cells[index] || winner || !isXTurn) return;
    const next = [...cells];
    next[index] = HUMAN;
    setCells(next);
    setIsXTurn(false);
  };

  const resetGame = () => {
    setCells(Array(9).fill(null));
    setIsXTurn(true);
  };

  let status;
  let statusClass = "xo-status";
  if (winner) {
    status = winner === HUMAN ? "فزت أنت 🎉" : "فزت أنا  🤖";
    statusClass += winner === HUMAN ? " xo-status--win" : " xo-status--lose";
  } else if (isDraw) {
    status = "تعادل! 🤝";
    statusClass += " xo-status--draw";
  } else {
    status = isXTurn ? "دورك" : " عم فكر...";
  }

  return (
    <div className="xo-wrapper" dir="rtl">
      {!open && (
        <button type="button" className="xo-trigger" onClick={() => setOpen(true)}>
          <span>تعا اتسلى لبين ما جهزت طلبيتك</span>
          <span className="xo-trigger__icon">🎮</span>
        </button>
      )}

      {open && (
        <div className="xo-card">
          <div className="xo-card__header">
            <h3 className="xo-title">XO  </h3>
            <button
              type="button"
              className="xo-close"
              onClick={() => setOpen(false)}
              aria-label="إغلاق"
            >
              ✕
            </button>
          </div>

          <p className={statusClass}>{status}</p>

          <div className="xo-board">
            {cells.map((cell, i) => (
              <button
                key={i}
                type="button"
                className={`xo-cell${cell ? " xo-cell--filled" : ""}${
                  cell === "X" ? " xo-cell--x" : ""
                }${cell === "O" ? " xo-cell--o" : ""}`}
                onClick={() => handleCellClick(i)}
                disabled={Boolean(cell) || Boolean(winner) || !isXTurn}
              >
                {cell === "X" ? "✕" : cell === "O" ? "○" : ""}
              </button>
            ))}
          </div>

          <div className="xo-actions">
            <button type="button" className="xo-btn xo-btn--primary" onClick={resetGame}>
              لعبة جديدة
            </button>
            <button type="button" className="xo-btn" onClick={() => setOpen(false)}>
              إغلاق
            </button>
          </div>
        </div>
      )}
    </div>
  );
}