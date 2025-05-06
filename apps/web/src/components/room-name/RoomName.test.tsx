import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import RoomName from './RoomName';

describe('<RoomName />', () => {
  it('renders the room number with the correct text', () => {
    const name = 'Sala 1';
    render(<RoomName name={name} />);

    expect(screen.getByText(name)).toBeInTheDocument();
  });
});
