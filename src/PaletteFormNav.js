import React, {Component} from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import classNames from "classnames";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Typography from "@material-ui/core/Typography";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

class PaletteFormNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPaletteName: "",

    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    //Add validation to ensure palette name is unique
    ValidatorForm.addValidationRule('isPaletteNameUnique', value =>
      this.props.palettes.every(
        ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }


  render() {
    //Object destructuring of props and state
    const {classes, open, handleSubmit, handleDrawerOpen} = this.props;
    const {newPaletteName} = this.state;

    return (
      <div>
        <CssBaseline />
        <AppBar
          position="fixed"
          color="default"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Palette Designer
            </Typography>
            <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
              <TextValidator
                label="Palette Name"
                name="newPaletteName"
                value={newPaletteName}
                onChange={this.handleChange}
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={["Please enter a name for your new palette", "Palette name already exists"]}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                Save Palette
              </Button>
              <Link to='/'>
                <Button variant="contained" color="secondary" >Go Back</Button>
              </Link>
            </ValidatorForm>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default PaletteFormNav