import React, { Component } from 'react';
import Palette from './Palette'
import seedColors from './seedColors'
import { generatePallete } from './colorHelpers';

class App extends Component {
  render() {
    console.log(generatePallete(seedColors[4]));
    return (
      <div>
        <Palette {...seedColors[0]} />
      </div>
    );
  }
}

export default App;
