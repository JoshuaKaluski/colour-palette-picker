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
  //Method to return a palette based on its id
  findPalette(id) {
      return seedPalettes.find(palette => {
          return palette.id === id;
      })
  }

  render() {
    return (
        <Switch>
          <Route
            exact path="/palette/new"
            render={() => <NewPaletteForm/>}
          />
          <Route
                exact path="/"
                render={(routeProps) => <PaletteList palettes={seedPalettes} {...routeProps} />}
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
