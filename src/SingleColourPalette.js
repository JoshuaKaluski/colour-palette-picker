import React, {Component} from 'react';
import {Link} from "react-router-dom";
import ColourBox from './ColourBox';
import Navbar from "./Navbar";
import PaletteFooter from './PaletteFooter';
import {withStyles} from "@material-ui/styles";

const styles = {
  Palette: {
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  colours: {
    height: "90%"
  },
  goBack: {
    width: "20%",
    height: "50%",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    margin: "0 auto -3.5px",
    textTransform: "uppercase",
    opacity: 1,
    backgroundColor: "black",
    "& a": {
      width: "100px",
      height: "30px",
      position: "absolute",
      display: "inline-block",
      top: "50%",
      left: "50%",
      marginLeft: "-50px",
      marginTop: "-15px",
      textAlign: "center",
      outline: "none",
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      fontSize: "1rem",
      lineHeight: "30px",
      color: "white",
      border: "none",
      cursor: "pointer",
      textDecoration: "none",
    }
  }
};

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
    const {classes} = this.props;
    const {paletteName, emoji, id} = this.props.palette;

    //Method to generate colour boxes
    const colourBoxes = this._shades.map(colour => (
      <ColourBox
        key={colour.name}
        name={colour.name}
        background={colour[format]}
        showingFullPalette={false}
      />
    ));

    return (
      <div className={classes.Palette}>
        <Navbar
          handleChange={this.changeColourFormat}
          showingAllColours={false}
        />
        <div className={classes.colours}>
          {colourBoxes}
          <div className={classes.goBack}>
            <Link to={`/palette/${id}`}>Go Back</Link>
          </div>
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji}/>
      </div>
    )
  }
}

export default withStyles(styles)(SingleColourPalette);