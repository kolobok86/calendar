import React from 'react';
import MonthCalendar from './MonthCalendar';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'

describe('Month Calendar', () => {
  it('renders the component (somehow...)', () => {
    render(<MonthCalendar year={2020} month={1} locale="en"></MonthCalendar>)
    expect(screen.getByText('January')).toBeDefined();
  });
});
