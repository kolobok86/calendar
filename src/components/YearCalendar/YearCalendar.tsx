import * as React from 'react';
import MonthCalendar from './MonthCalendar';
import './yearCalendar.css';

import { MonthHighlightedDates } from './MonthCalendar';


export interface YearCalendarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  year: number,
  locale?: string,
  children?: React.ReactNode,
  yearHighlightedDates?: YearHighlightedDates,
}

export type YearHighlightedDates = { [month: number]: MonthHighlightedDates };


export default function YearCalendar({
    year,
    locale = 'en',
    children = null,
    yearHighlightedDates,
    ...other
  }: YearCalendarProps) {

  const months: Array<React.ReactNode> = [];
  for (let i = 1; i <= 12; i++) {
    months.push(
      <MonthCalendar
        year={year}
        locale={locale}
        month={i}
        key={`year_${year}_month_${i}`}
        monthHighlightedDates={yearHighlightedDates?.[i]}
      />
    );
  }

  // ToDo put locale to React Context
  return (
    <div
      className={'year ' + (other.className || '')}
      {...other}
    >
      <h4>{year.toString()}</h4>
      <div className={'year__months__container'}>
        <div className={'year__months'}>
          {months}
        </div>
      </div>
    </div>
  )
}
