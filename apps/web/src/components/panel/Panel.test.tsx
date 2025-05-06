import { fireEvent, render, screen } from '@testing-library/react';

import usePanel from '../../../../../hooks/usePanel';

import Panel from './Panel';

jest.mock('../../../../../hooks/usePanel');

describe('<Panel />', () => {
  beforeEach(() => {
    (usePanel as jest.Mock).mockReturnValue({
      total: 100,
      balance: 1000,
      setBalance: jest.fn(),
      setBoards: jest.fn(),
    });
  });

  it('renders all child components', () => {
    render(<Panel />);
    expect(screen.getByText('Saldo Actual')).toBeInTheDocument();
    expect(screen.getByText('Automarcar')).toBeInTheDocument();
  });

  it('reduces balance when buy is clicked', () => {
    const setBalance = jest.fn();
    (usePanel as jest.Mock).mockReturnValue({
      total: 100,
      balance: 1000,
      setBalance,
      setBoards: jest.fn(),
    });

    render(<Panel />);
    const buyButton = screen.getByText('Comprar');
    fireEvent.click(buyButton);
    expect(setBalance).toHaveBeenCalledWith(expect.any(Function));
  });
});
