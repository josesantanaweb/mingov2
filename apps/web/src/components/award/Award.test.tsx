import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Award from './Award';

describe('<Award />', () => {
  it('renders the title "Premio"', () => {
    render(<Award award={100} />);
    expect(screen.getByText('Premio')).toBeInTheDocument();
  });

  it('renders the award passed as a prop with "MGO"', () => {
    const award = 100;
    render(<Award award={award} />);
    expect(screen.getByText(`${award} MGO`)).toBeInTheDocument();
  });
});
