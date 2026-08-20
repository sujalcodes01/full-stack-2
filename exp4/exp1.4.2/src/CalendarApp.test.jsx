import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { CalendarApp } from './CalendarApp';

describe('CalendarApp', () => {
  it('renders all 42 calendar cells for a consistent month layout', () => {
    render(<CalendarApp />);
    expect(screen.getAllByRole('button', { name: /select august|outside current month/i })).toHaveLength(42);
  });

  it('updates the selected day and lets a user add an event', async () => {
    const user = userEvent.setup();
    render(<CalendarApp />);
    await user.click(screen.getByRole('button', { name: 'Select August 12' }));
    expect(screen.getByRole('heading', { name: 'August 12, 2026' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /add focus block/i }));
    expect(screen.getAllByText('Focus block')).toHaveLength(2);
  });

  it('moves the calendar to the next month', async () => {
    const user = userEvent.setup();
    render(<CalendarApp />);
    await user.click(screen.getByRole('button', { name: 'Next month' }));
    expect(screen.getByRole('heading', { name: 'September 2026' })).toBeInTheDocument();
  });
});
