import { fireEvent, render, screen } from '@testing-library/react';

import NumberSelector from './NumberSelector';

describe('<NumberSelector />', () => {
  test('calls handleNumber with the correct number', () => {
    const handleNumber = jest.fn();
    render(<NumberSelector handleNumber={handleNumber} />);

    const numberButton = screen.getByText('5');
    fireEvent.click(numberButton);

    expect(handleNumber).toHaveBeenCalledWith(5);
  });
});
