// https://www.youtube.com/watch?v=cF3pIMJUZxM


import React from 'react';
import './App.css';
import { MenuItem, FormControl, Select } from "@material-ui/core";

function App() {
  return (
    <div className="app">
    <div className="app__header">
      <h1>Covid 19 Global Tracker</h1>
        <FormControl className="dropdown">
          <Select variant="outlined" value="abc">
            <MenuItem value="worldwide">Worldwide</MenuItem>
            <MenuItem value="worldwide">India</MenuItem>
            <MenuItem value="worldwide">USA</MenuItem>
            <MenuItem value="worldwide">Australia</MenuItem>
          </Select>
        </FormControl>
    </div>

      {/* Header */}
      {/* Title + Dropdown*/}

      {/* Confirmed Cases*/}
      {/* Active Cases*/}
      {/* Recovered Cases*/}

      {/* *Countries List/}
      {/*  Graph*/}

      {/* Map*/}
    </div>
  );
}

export default App;
