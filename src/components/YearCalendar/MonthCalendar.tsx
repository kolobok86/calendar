import * as React from 'react';
import staticData from './staticData.json'
import './yearCalendar.css';


function getMonthTitle(month: number, locale: string): string {
  // ToDo get locale from React Context

  // ToDo define proper type
  const _staticData: any = staticData;

  // Months are stored in arrays, thus starting enumeratin from '0',
  // and month numbers usually are enumerated starting from 1
  return _staticData[locale].months[month - 1];
}

interface Props {
  year: number,
  month: number,    // 0 ... 11, as of JavaScript
  locale: string,
  className?: string,
}


const WEEK_STARTS_ON_DAY = 1;   // 0 - Sunday, 1 - Monday, as of JavaScript getDay()

const DAYS_IN_WEEK = 7;     //


function MonthCalendar(props: Props) {
  const propsClassName: string = (!!props.className) ? ' ' + props.className : '';

  const monthTitle = getMonthTitle(props.month, props.locale);

  const zeroBasedMonth = props.month - 1;   // we pass months 1 .. 12, and JS needs 0 ... 11

  const firstDayDate = new Date(props.year, zeroBasedMonth, 1);

  const firstMonthDayOfWeek = firstDayDate.getDay();

  const firstWeekDaysOffset = (DAYS_IN_WEEK + (firstMonthDayOfWeek - WEEK_STARTS_ON_DAY)) % DAYS_IN_WEEK;

  // (c) https://www.w3resource.com/javascript-exercises/javascript-date-exercise-3.php
  const daysInMonth = new Date(props.year, zeroBasedMonth, 0).getDate();
  const monthWeeks: Array<React.ReactNode> = [];
  // let w = 0;
  let weekDays: Array<React.ReactNode> = [];
  for (let i = -firstWeekDaysOffset + 1; i <= daysInMonth; i++) {
    // if (w === 0) {
    // }
    weekDays.push(
      <div className={'week__day'}>
        { (i <= 0) ? '' : i.toString() }
      </div>
    );
    // w++;

    if (weekDays.length === DAYS_IN_WEEK || i === daysInMonth) {
      monthWeeks.push(
        <div className={'month__week'}>
          {weekDays}
        </div>
      );

      weekDays = [];    // new clean array
    };
  }

  return (
    <div className={'month' + propsClassName}>
      <h4>{monthTitle}</h4>
      <div className={'month__header'}>
        <div className={'month__header__day-name'}></div>
      </div>
      <div className={'month__weeks'}>
        {monthWeeks}
      </div>
    </div>
  )
}

export default MonthCalendar;
