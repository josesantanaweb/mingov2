import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import Number from './Number';

describe('<Number />', () => {
  const mockOnClick = jest.fn();

  it('renders the number when the number is not -1', () => {
    render(<Number number={5} onClick={mockOnClick} />);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('5');
    expect(button).toHaveClass('bg-base-500');
  });

  it('renders the star icon when the number is -1', () => {
    render(<Number number={-1} onClick={mockOnClick} />);

    const button = screen.getByRole('button');
    expect(screen.getByTestId('icon-star')).toBeInTheDocument();
    expect(button).toHaveClass('bg-transparent');
  });

  it('calls the onClick function when clicked', () => {
    render(<Number number={1} onClick={mockOnClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalled();
  });
});
