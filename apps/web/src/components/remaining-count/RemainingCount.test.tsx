import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import RemainingCount from './RemainingCount';

describe('<RemainingCount />', () => {
  it('renders the remainng count passed as a prop', () => {
    render(<RemainingCount remainingCount={5} />);
    expect(screen.getByText('+5')).toBeInTheDocument();
  });
});
