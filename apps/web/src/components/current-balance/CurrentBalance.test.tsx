import { render, screen } from '@testing-library/react';

import CurrentBalance from './CurrentBalance';

describe('<CurrentBalance/>', () => {
  test('renders the correct balance', () => {
    const balance = 1000;
    render(<CurrentBalance balance={balance} />);
    expect(screen.getByText(`${balance} MGO`)).toBeInTheDocument();
  });
});
