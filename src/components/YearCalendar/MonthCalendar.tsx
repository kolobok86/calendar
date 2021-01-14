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
  monthHighlightedDates?: MonthHighlightedDates,
}

export type MonthHighlightedDates = {
  [monthDay: number]: HighlightedDate,
}

interface HighlightedDate {
  className?: string,
  tooltip?: string
}

const WEEK_STARTS_ON_DAY = 1;   // 0 - Sunday, 1 - Monday, as of JavaScript getDay()

const DAYS_IN_WEEK = 7;   // yup obvious...

const WEEKEND_SAT = 6;    // Saturday and Sunday number due to JS Date.getDay() semantics
const WEEKEND_SUN = 0;


function MonthCalendar (props: Props) {
  const propsClassName: string = (props.className) ? ' ' + props.className : '';

  const monthTitle = getMonthTitle(props.month, props.locale);

  const zeroBasedMonth = props.month - 1;   // we pass months 1 .. 12, and JS needs 0 ... 11

  const firstDayDate = new Date(props.year, zeroBasedMonth, 1);

  // Which day of week is 1st day of the month
  const firstMonthDayOfWeek = firstDayDate.getDay();

  const firstDayOfWeekOffset = (DAYS_IN_WEEK + (firstMonthDayOfWeek - WEEK_STARTS_ON_DAY)) % DAYS_IN_WEEK;

  // (c) https://www.w3resource.com/javascript-exercises/javascript-date-exercise-3.php
  const daysInMonth = new Date(props.year, zeroBasedMonth + 1, 0).getDate();
  const monthWeeks: Array<React.ReactNode> = [];
  // As od English grammar, days of week - all days, while weekdays - work days only
  let daysOfWeek: Array<React.ReactNode> = [];
  let weekInd = 0;

  for (let i = -firstDayOfWeekOffset + 1; i <= daysInMonth; i++) {

    // Add special class to Saturday and Sunday
    const dayOfWeekToBeAdded = (WEEK_STARTS_ON_DAY + daysOfWeek.length) % 7;
    const isWeekendSat = dayOfWeekToBeAdded === WEEKEND_SAT;
    // "% 7" serves same purpose as "dayOfWeekToBeAdded === 7 || dayOfWeekToBeAdded === 0", but looks much greater!
    // And yes, 7 means WEEKEND_SUN
    const isWeekendSun = dayOfWeekToBeAdded % 7 === 0;

    let weekendClassName;
    switch (true) {
      case isWeekendSat:
        weekendClassName = ' week__day--sat';
        break;
      case isWeekendSun:
        weekendClassName = ' week__day--sun';
        break;
      default:
        weekendClassName = '';
    }

    const { monthHighlightedDates } = props;
    const highlightClassName = (monthHighlightedDates?.[i]?.className)
        ? ' ' + monthHighlightedDates?.[i]?.className
        : '';
    const tooltip = monthHighlightedDates?.[i]?.tooltip;

    daysOfWeek.push(
      <div
        className={'week__day' + weekendClassName + highlightClassName}
        key={`month_${props.month}_day_${i}`}
        title={ tooltip }
      >
        { (i <= 0) ? '' : i.toString() }
      </div>
    );

    if (daysOfWeek.length === DAYS_IN_WEEK || i === daysInMonth) {
      monthWeeks.push(
        <div className={'month__week'} key={`month_${props.month}_week_${weekInd}`}>
          {daysOfWeek}
        </div>
      );
      weekInd++;

      daysOfWeek = [];    // new clean array
    };
  }

  function renderDaysOfWeekNames() {
    const daysOfWeekNames: Array<React.ReactNode> = [];
    // ToDo again, type staticData properly
    const _staticData: any = staticData;

    for (let i = 0; i < DAYS_IN_WEEK; i++) {
      const dayOfWeekInd = ((WEEK_STARTS_ON_DAY + i) < DAYS_IN_WEEK)
        ? WEEK_STARTS_ON_DAY + i
        : WEEK_STARTS_ON_DAY + i - DAYS_IN_WEEK;

        daysOfWeekNames.push(
        <div className={'week__day dayOfWeek-name'} key={dayOfWeekInd}>
          <span className={'dayOfWeek-name__label'}>
            {_staticData[props.locale].daysOfWeekNames[dayOfWeekInd]}
          </span>
        </div>
      );
    }

    return (
      <div className={'daysOfWeek-names'}>
        {daysOfWeekNames}
      </div>
    );
  }

  return (
    <div className={'month' + propsClassName}>
      <h4 className={'month__name'}>{monthTitle}</h4>
      <div className={'month__header'}>
        {renderDaysOfWeekNames()}
      </div>
      <div className={'month__weeks'}>
        {monthWeeks}
      </div>
    </div>
  )
}

export default MonthCalendar;
