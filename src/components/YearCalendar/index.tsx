import * as React from 'react';
import MonthCalendar from './MonthCalendar';
import './yearCalendar.css';


export interface YearCalendarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  year: number,
  locale?: string,
  children?: React.ReactNode,
}

export default function YearCalendar({year, locale = 'en', children = null, ...other}: YearCalendarProps) {

  const months: Array<React.ReactNode> = [];
  for (let i = 1; i <= 12; i++) {
    months.push(
      <MonthCalendar year={year} locale={locale} month={i} />
    );
  }

  // ToDo put locale to React Context
  return (
    <div className={'year ' + other.className} {...other} >
      <h4>{year.toString()}</h4>
      <div className={'year__months'}>
        {months}
      </div>
    </div>
  )
}
