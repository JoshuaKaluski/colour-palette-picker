//Third-party imports
import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {TransitionGroup, CSSTransition} from "react-transition-group";

//React Components imports
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColourPalette from './SingleColourPalette';
import NewPaletteForm from './NewPaletteForm';
import Page from './Page';

//Helper imports
import {generatePalette} from "./colourHelpers";
import seedPalettes from './seedPalettes';

class App extends Component {
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    this.state = {palettes: savedPalettes || seedPalettes};
    this.findPalette = this.findPalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
    this.savePalette = this.savePalette.bind(this);
  }

  //Method to return a palette based on its id
  findPalette(id) {
      return this.state.palettes.find(palette => {
          return palette.id === id;
      })
  }

  deletePalette(id) {
    this.setState(
      state => ({palettes: state.palettes.filter(palette => palette.id !== id)}),
      this.syncLocalStorage
    )
  }

  //Method to save a new palette
  savePalette(newPalette) {
    this.setState({palettes: [...this.state.palettes, newPalette]}, this.syncLocalStorage);


  }

  syncLocalStorage() {
    //Save palettes to local storage
    window.localStorage.setItem("palettes", JSON.stringify(this.state.palettes));
  }

  render() {
    //Object destructuring of state
    const {palettes} = this.state;

    //Method to generate all the routes inside a TransitionGroup
    const routes = (location) => {
      return (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames='page' timeout={400}>
            <Switch location={location}>
              <Route
                exact path="/palette/new"
                render={(routeProps) =>
                  <Page>
                    <NewPaletteForm savePalette={this.savePalette} palettes={palettes} {...routeProps} />
                  </Page>
                }
              />
              <Route
                exact path="/"
                render={(routeProps) =>
                  <Page>
                    <PaletteList palettes={palettes} deletePalette={this.deletePalette} {...routeProps} />
                  </Page>
                }
              />
              <Route
                exact path="/palette/:id"
                render={routeProps => (
                  <div className="page">
                    <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))}/>
                  </div>
                )}
              />
              <Route
                exact path='/palette/:id/:colourId'
                render={routeProps => (
                  <Page>
                    <SingleColourPalette
                      palette={generatePalette(this.findPalette(routeProps.match.params.id))}
                      colourId={routeProps.match.params.colourId}
                    />
                  </Page>
                )}
              />
              <Route render={(routeProps) =>
                <Page>
                  <PaletteList palettes={palettes} deletePalette={this.deletePalette} {...routeProps} />
                </Page>
              }
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )
    };

    return (
      <Route render={({location}) => routes(location)} />
    );
  }
}

export default App;
