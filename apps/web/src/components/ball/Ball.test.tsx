import { render, screen } from '@testing-library/react';

import Ball from './Ball';

const ballData = {
  number: 10,
  id: 1,
  letter: 'B',
};

describe('Ball', () => {
  it('renders the ball with correct number and letter', () => {
    render(<Ball ball={ballData} />);

    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('applies correct styles when the ball is the last one', () => {
    render(<Ball ball={ballData} isLast />);

    const ball = screen.getByText('10').parentElement;
    expect(ball).toHaveClass('bg-violet-500');
    expect(ball).toHaveClass('border-white');
  });

  it('applies default styles when the ball is not the last one', () => {
    render(<Ball ball={ballData} isLast={false} />);

    const ball = screen.getByText('10').parentElement;
    expect(ball).toHaveClass('bg-base-500');
    expect(ball).toHaveClass('border-base-300');
  });
});
