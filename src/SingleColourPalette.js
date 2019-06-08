import React, {Component} from 'react';
import ColourBox from './ColourBox';
import Navbar from "./Navbar";
import PaletteFooter from './PaletteFooter';

class SingleColourPalette extends Component {
  constructor(props) {
    super(props);
    this._shades = this.getShades(this.props.palette, this.props.colourId);
    this.state = {format: "hex"};
    this.changeColourFormat = this.changeColourFormat.bind(this);
  }

  //Method to gather all the shades of a colour
  getShades(palette, colourId) {
    //Empty array that will contain all the shades of the colour
    let shades = [];

    //Array that contains all the colours of the palette
    let allColours = palette.colours;

    //Iterate over allColours to add the shades of the desired colour in shades
    for (let key in allColours) {
      //Creates a new array from allColours with all the shades of the desired colour and merges it with the shades array
      shades = shades.concat(
        allColours[key].filter(colour => colour.id === colourId)
      )
    }
    //Return shades after removing the shade level 50 from the array
    return shades.slice(1);
  }

  changeColourFormat(val) {
    this.setState({format: val});
  }

  render() {
    //Object destructuring of state and props
    const {format} = this.state;
    const {paletteName, emoji} = this.props.palette;

    //Method to generate colour boxes
    const colourBoxes = this._shades.map(colour => (
      <ColourBox
        key={colour.id}
        name={colour.name}
        background={colour[format]}
        showLink={false}
      />
    ));

    return (
      <div className="Palette">
        <Navbar
          handleChange={this.changeColourFormat}
          showingAllColours={false}
        />
        <div className="Palette-colours">{colourBoxes}</div>
        <PaletteFooter paletteName={paletteName} emoji={emoji}/>
      </div>
    )
  }
}

export default SingleColourPalette;