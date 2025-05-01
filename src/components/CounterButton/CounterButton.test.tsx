import { fireEvent, render, screen } from '@testing-library/react';

import { describe, it, expect, vi } from 'vitest';
import { CounterButton } from './CounterButton';

describe('Button component', () => {
  it('renders with the correct count', () => {
    const mockOnClick = vi.fn();
    const count = 5;

    render(<CounterButton count={count} onClick={mockOnClick} />);

    expect(screen.getByText(`count is ${count}`)).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const mockOnClick = vi.fn();
    const count = 5;

    render(<CounterButton count={count} onClick={mockOnClick} />);

    fireEvent.click(screen.getByText(`count is ${count}`));

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
