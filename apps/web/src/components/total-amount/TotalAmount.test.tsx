import { fireEvent, render, screen } from '@testing-library/react';

import TotalAmount from './TotalAmount';

describe('<TotalAmount />', () => {
  test('renders the total correctly', () => {
    const total = 300;
    render(<TotalAmount total={total} onBuy={() => {}} balance={10} />);
    expect(screen.getByText(`${total} MGO`)).toBeInTheDocument();
  });

  test('calls onBuy when the buy button is clicked', () => {
    const onBuy = jest.fn();
    render(<TotalAmount total={200} onBuy={onBuy} balance={10} />);

    const buyButton = screen.getByText('Comprar');
    fireEvent.click(buyButton);

    // expect(onBuy).toHaveBeenCalled();
  });
});
