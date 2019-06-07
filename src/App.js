import React, {Component} from 'react';
import Palette from './Palette';
import seedPalettes from './seedPalettes';

class App extends Component {
  render() {
    return (
        <div className="App">
          <Palette {...seedPalettes[0]}/>
        </div>
    );
  }
}

export default App;
