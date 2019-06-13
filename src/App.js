//React Component imports
import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColourPalette from './SingleColourPalette';
import NewPaletteForm from './NewPaletteForm';

//Vanilla js imports
import {generatePalette} from "./colourHelpers";
import seedPalettes from './seedPalettes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {palettes: seedPalettes};
    this.findPalette = this.findPalette.bind(this);
    this.savePalette = this.savePalette.bind(this);
  }

  //Method to return a palette based on its id
  findPalette(id) {
      return this.state.palettes.find(palette => {
          return palette.id === id;
      })
  }

  //Method to save a new palette
  savePalette(newPalette) {
    this.setState({palettes: [...this.state.palettes, newPalette]});
  }

  render() {
    //Object destructuring of state
    const {palettes} = this.state;

    return (
        <Switch>
          <Route
            exact path="/palette/new"
            render={(routeProps) => <NewPaletteForm savePalette={this.savePalette} {...routeProps} />}
          />
          <Route
                exact path="/"
                render={(routeProps) => <PaletteList palettes={palettes} {...routeProps} />}
            />
            <Route
                exact path="/palette/:id"
                render={routeProps => (
                  <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))}/>
                )}
            />
            <Route
              exact path='/palette/:id/:colourId'
              render={routeProps => (
                <SingleColourPalette
                  palette={generatePalette(this.findPalette(routeProps.match.params.id))}
                  colourId={routeProps.match.params.colourId}
                />
              )}
            />
        </Switch>
    );
  }
}

export default App;
