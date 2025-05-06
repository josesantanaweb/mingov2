import React from 'react';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { useCountdown } from '@/hooks';

import Room from './Room';

jest.mock('../../hooks', () => ({
  useCountdown: jest.fn(),
}));

describe('<Room />', () => {
  const roomData = {
    id: '1',
    name: 'sala 1',
    award: 1000,
    price: 50,
    time: new Date(Date.now() + 60000),
    status: true,
  };

  beforeEach(() => {
    (useCountdown as jest.Mock).mockReturnValue('00h : 01m : 00s');
  });

  it('should render the component correctly with the provided data', () => {
    render(<Room room={roomData} />);

    expect(screen.getByText(/sala 1/i)).toBeInTheDocument();

    expect(screen.getByText('1000 MGO')).toBeInTheDocument();

    expect(screen.getByText('50 MGO')).toBeInTheDocument();

    expect(screen.getByText('00h : 01m : 00s')).toBeInTheDocument();
  });

  it('should apply the correct classes based on the room name', () => {
    render(<Room room={roomData} />);

    const timeLeft = screen.getByTestId('time-left');

    expect(timeLeft).toHaveClass('bg-yellow-500');
  });

  it('should display "In Play!" if the time has ended', () => {
    (useCountdown as jest.Mock).mockReturnValue('In Play!');

    render(<Room room={roomData} />);

    expect(screen.getByText('In Play!')).toBeInTheDocument();
  });
});
