import React from 'react';
// import logo from './logo.svg';
import './App.css';
import YearCalendar from './components/YearCalendar';
import specialDates from './dummySpecialDates.json';

import { YearHighlightedDates } from './components/YearCalendar';


function App() {

  const yearHighlightedDates: YearHighlightedDates = specialDates;
  // {
  //   // January
  //   1: {
  //     1: {
  //       className: 'week__day--holiday',
  //       tooltip: 'Some holiday!',
  //     }
  //   },
  //   // March
  //   3: {
  //     9: {
  //       className: 'week__day--holiday',
  //       tooltip: 'Shift holiday for March, 8',
  //     }
  //   }
  // }

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

      <YearCalendar
        year={2020}
        yearHighlightedDates={yearHighlightedDates}
      />
    </div>
  );
}

export default App;
