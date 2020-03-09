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
  month: number,
  locale: string,
  className?: string,
}

function MonthCalendar(props: Props) {
  const propsClassName: string = (!!props.className) ? ' ' + props.className : '';

  const monthTitle = getMonthTitle(props.month, props.locale);

  return (
    <div className={'month' + propsClassName}>
      <h4>{monthTitle}</h4>
    </div>
  )
}

export default MonthCalendar;
