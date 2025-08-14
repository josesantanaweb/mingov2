import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import LimboValue from './LimboValue';

describe('<LimboValue />', () => {
  it('renders the title "Premio"', () => {
    render(<LimboValue value="2.0" result={null} />);
    expect(screen.getByText('Premio')).toBeInTheDocument();
  });
});
