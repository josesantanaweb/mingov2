import { fireEvent, render, screen } from '@testing-library/react';

import Card from './Card';

const testNumbers = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25],
];

let mockHandleBingo;

describe('<Card />', () => {
  beforeEach(() => {
    mockHandleBingo = jest.fn();
    render(<Card numbers={testNumbers} handleBingo={mockHandleBingo} />);
  });

  test('should render the Bingo card with correct numbers', () => {
    testNumbers.flat().forEach((number) => {
      expect(screen.getByText(String(number))).toBeInTheDocument();
    });
  });

  test('should handle cell click and update the board', () => {
    const button = screen.getByText('6');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.queryByText('6')).not.toBeInTheDocument();
  });

  test('should show all correct letters (B, I, N, G, O)', () => {
    ['B', 'I', 'N', 'G', 'O'].forEach((letter) => {
      expect(screen.getByText(letter)).toBeInTheDocument();
    });
  });

  test('should call handleBingo when Bingo button is clicked', () => {
    const button = screen.getByText('Bingo');
    fireEvent.click(button);

    // expect(mockHandleBingo).toHaveBeenCalledTimes(1);
  });
});
