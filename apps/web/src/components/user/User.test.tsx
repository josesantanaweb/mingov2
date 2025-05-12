import React from 'react';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import User from '@/components/user';
import { rakingUserStyles } from '@/utils/raking';

describe('<User />', () => {
  const mockUser = {
    id: '1',
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    image: 'https://john-doe.jpg',
    raking: 85,
  };

  it('should render the user image, name, and raking', () => {
    render(<User user={mockUser} />);

    const img = screen.getByAltText('user');
    expect(img).toHaveAttribute(
      'src',
      '/_next/image?url=https%3A%2F%2Fjohn-doe.jpg&w=2048&q=100',
    );

    const name = screen.getByText(/John Doe/i);
    expect(name).toBeInTheDocument();

    const raking = screen.getByText('85');
    expect(raking).toBeInTheDocument();
  });

  it('should apply the correct styles based on the raking', () => {
    const { border, background } = rakingUserStyles(mockUser.raking);

    render(<User user={mockUser} />);

    const rakingBadge = screen.getByText('85');
    const user = screen.getByTestId('user');
    expect(user).toHaveClass(border);
    expect(rakingBadge).toHaveClass(background);
  });

  it('should render the "Bingo" badge when isWon is true', () => {
    render(<User user={mockUser} isWon />);

    const bingoBadge = screen.getByText(/Bingo/i);
    expect(bingoBadge).toBeInTheDocument();
    expect(bingoBadge).toHaveClass('bg-violet-500');
  });

  it('should not render the "Bingo" badge when isWon is false', () => {
    render(<User user={mockUser} isWon={false} />);

    const bingoBadge = screen.queryByText(/Bingo/i);
    expect(bingoBadge).not.toBeInTheDocument();
  });
});
