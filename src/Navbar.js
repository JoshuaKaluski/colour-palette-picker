//React imports
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

//Material UI imports
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {withStyles} from "@material-ui/styles";

//Slider imports
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';

//Component CSS import
import styles from './styles/NavbarStyles';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {format: "hex", open: false};

    //Method binds
    this.changeColourFormat = this.changeColourFormat.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }

  //Handle change of the colour format
  changeColourFormat(e) {
    //Set format to be the format selected
    this.setState({format: e.target.value, open: true}, () => {
      //Pass format value up to parent as a callback
      this.props.handleChange(this.state.format);
    });
  }

  //Method for closing the Snackbar
  closeSnackbar() {
    this.setState({open: false});
  }
  render() {
    //Object destructuring of props and state
    const {level, changeLevel, showingAllColours, classes} = this.props;
    const {format} = this.state;

    return (
      <header className={classes.Navbar}>
        <div className={classes.logo}>
          <Link to='/'>Colour Palette Picker</Link>
        </div>

        {showingAllColours && (
          <div>
            <span>Level: {level}</span>
            <div className={classes.slider}>
              <Slider
                defaultValue={level}
                min={100}
                max={900}
                step={100}
                onAfterChange={changeLevel}
              />
            </div>
          </div>
        )}
        <div className={classes.selectContainer}>
          <Select value={format} onChange={this.changeColourFormat}>
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
          </Select>
        </div>
        <Snackbar
          anchorOrigin={{vertical: "bottom", horizontal: "left"}}
          open={this.state.open}
          autoHideDuration={3000}
          message={<span id="message-id">Colour format changed to {format.toUpperCase()}.</span>}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          onClose={this.closeSnackbar}
          action={[
            <IconButton
              onClick={this.closeSnackbar}
              color="inherit"
              key="close"
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </header>
    )
  }
}

export default withStyles(styles)(Navbar);