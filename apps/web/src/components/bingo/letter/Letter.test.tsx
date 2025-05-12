import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Letter from './Letter';

describe('<Letter />', () => {
  it('renders the letter passed as a prop', () => {
    render(<Letter letter="B" />);

    const spanElement = screen.getByText('B');
    expect(spanElement).toBeInTheDocument();
    expect(spanElement).toHaveClass('text-white');
    expect(spanElement).toHaveClass('text-lg');
  });
});
