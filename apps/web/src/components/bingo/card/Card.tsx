'use client';
import React, { memo, useState } from 'react';

import { Button } from '@mingo/ui';
import Number from '@/components/bingo/number';
import Letter from '@/components/bingo/letter';
import { isBoardFull, transposeMatrix } from '@/utils/board';

interface CardProps {
  numbers: number[][];
  handleBingo: () => void;
}

const Card = memo(({ numbers, handleBingo }: CardProps): React.ReactElement => {
  const [boardNumbers, setBoardNumbers] = useState<number[][]>(
    transposeMatrix(numbers),
  );

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    setBoardNumbers(prevBoard => {
      const newBoard = prevBoard.map(row => [...row]);

      const currentValue = newBoard[rowIndex][colIndex];
      newBoard[rowIndex][colIndex] =
        currentValue === -1 ? numbers[rowIndex][colIndex] : -1;
      return newBoard;
    });
  };

  return (
    <div className="relative flex flex-col items-center bg-base-600 p-3 rounded-2xl max-w-[284px]">
      <div className="flex items-center justify-center w-full py-1 mb-2 rounded-lg bg-base-500">
        {['B', 'I', 'N', 'G', 'O'].map(letter => (
          <Letter key={letter} letter={letter} />
        ))}
      </div>
      <div className="relative z-40 grid justify-between w-full grid-cols-5 gap-2 mb-3 rounded-2xl">
        {boardNumbers.map((row, rowIndex) =>
          row.map((number, colIndex) => (
            <Number
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              number={number}
            />
          )),
        )}
      </div>
      <Button
        onClick={handleBingo}
        className="uppercase"
        disabled={!isBoardFull(boardNumbers)}
      >
        Bingo
      </Button>
    </div>
  );
});

Card.displayName = 'Card';

export default Card;
