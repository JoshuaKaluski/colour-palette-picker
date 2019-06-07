import React, {Component} from 'react';
import Palette from './Palette';
import {generatePalette} from "./colourHelpers";
import seedPalettes from './seedPalettes';

class App extends Component {
  render() {
    return (
        <div className="App">
          <Palette palette={generatePalette(seedPalettes[0])}/>
        </div>
    );
  }
}

export default App;
