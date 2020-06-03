import React, { Component } from 'react';
import Palette from './Palette'
import seedColors from './seedColors'
import { generatePallete } from './colorHelpers';

class App extends Component {
  render() {
    console.log();
    return (
      <div>
        <Palette palette={generatePallete(seedColors[4])} />
      </div>
    );
  }
}

export default App;
