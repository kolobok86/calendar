import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { queries } from '@testing-library/react'
import MonthCalendar from './MonthCalendar';

describe.only('Month Calendar', () => {
  it('renders the component (somehow...)', () => {
    render(<MonthCalendar year={2020} month={1} locale="en"></MonthCalendar>);
    expect(screen.getByText('January')).toBeDefined();
  });

  it('renders days of week', () => {
    render(<MonthCalendar year={2020} month={1} locale="en"></MonthCalendar>)
    expect(screen.getByText('Mon.')).toBeDefined();
    expect(screen.getByText('Tue.')).toBeDefined();
    expect(screen.getByText('Wed.')).toBeDefined();
    expect(screen.getByText('Thu.')).toBeDefined();
    expect(screen.getByText('Fri.')).toBeDefined();
    expect(screen.getByText('Sat.')).toBeDefined();
    expect(screen.getByText('Sun.')).toBeDefined();
  });

  it('renders days of week starting with Monday by default', () => {
    const { container } = render(<MonthCalendar year={2020} month={1} locale="en"></MonthCalendar>);
    const weekDaysHeader = container.querySelector('.daysOfWeek-names');
    expect(weekDaysHeader.firstChild.textContent).toBe('Mon.');
  });
});
