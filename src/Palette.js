import React, {Component} from 'react';
import ColourBox from './ColourBox';
import Navbar from './Navbar'
import PaletteFooter from './PaletteFooter';
import './Palette.css';

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {level: 500, format: "hex"};
    this.changeLevel = this.changeLevel.bind(this);
    this.changeColourFormat = this.changeColourFormat.bind(this);
  }
  changeLevel(level) {
    this.setState({level: level});
  }
  changeColourFormat(val) {
    this.setState({format: val});
  }
  render() {
    //Object destructuring of props and state
    const {colours, paletteName, emoji, id} = this.props.palette;
    const {level, format} = this.state;

    //Generate colour boxes for the desired palette
    const colourBoxes = colours[level].map(colour => (
      <ColourBox
        key={colour.id}
        background={colour[format]}
        name={colour.name}
        moreURL={`/palette/${id}/${colour.id}`}
        showingFullPalette={true}
      />
    ));

    return (
      <div className="Palette">
        {/*Navbar to change colour levels and format*/}
        <Navbar
          level={level}
          changeLevel={this.changeLevel}
          handleChange={this.changeColourFormat}
          showingAllColours
        />
        <div className="Palette-colours">
          {/*Colour boxes*/}
          {colourBoxes}
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    )
  }
}

export default Palette;