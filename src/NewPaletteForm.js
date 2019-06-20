import React, {Component} from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import DraggableColourList from './DraggableColourList';
import PaletteFormNav from './PaletteFormNav';
import ColourPickerForm from './ColourPickerForm';
import seedPalettes from './seedPalettes';
import {arrayMove} from "react-sortable-hoc";
import styles from './styles/NewPaletteFormStyles';

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColours: 20
  };

  constructor(props) {
    super(props);
    this.state = {
      open: true,
      colours: seedPalettes[0].colours
    };
    this.addNewColour = this.addNewColour.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeColour = this.removeColour.bind(this);
    this.clearColours = this.clearColours.bind(this);
    this.randomColour = this.randomColour.bind(this);
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  addNewColour(newColour) {
    this.setState({colours: [...this.state.colours, newColour]})
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  //Method to save the palette
  handleSubmit(newPalette) {
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");
    newPalette.colours = this.state.colours;

    this.props.savePalette(newPalette);

    //Redirect to root
    this.props.history.push('/');
  }

  removeColour(colourName) {
    this.setState({
      colours: this.state.colours.filter(colour => colour.name !== colourName)
    })
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({colours}) => ({
      colours: arrayMove(colours, oldIndex, newIndex)
    }))
  };

  clearColours() {
    this.setState({colours: []});
  }

  //Pick random colour from existing palettes
  randomColour() {
    const allColours = this.props.palettes.map(palette => palette.colours).flat();

    let randomColour = allColours[Math.floor(Math.random() * allColours.length)];
    this.setState({colours: [...this.state.colours, randomColour]})
  }

  render() {
    //Object destructuring of props and state
    const { classes, maxColours, palettes } = this.props;
    const { open, colours } = this.state;

    const paletteFull = colours.length >= maxColours;

    return (
      <div className={classes.root}>
        <PaletteFormNav
          open={open}
          palettes={palettes}
          handleSubmit={this.handleSubmit}
          handleDrawerOpen={this.handleDrawerOpen}
        />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <div className={classes.container}>
            <Typography variant="h4" gutterBottom>Design Your Palette</Typography>
            <div className={classes.buttons}>
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                onClick={this.clearColours}
              >
                Clear Palette
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                disabled={paletteFull}
                onClick={this.randomColour}
              >
                Random Colour
              </Button>
            </div>
            <ColourPickerForm
              paletteFull={paletteFull}
              addNewColour={this.addNewColour}
              colours={colours}
            />
          </div>

        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <DraggableColourList
            colours={colours}
            removeColour={this.removeColour}
            axis="xy"
            onSortEnd={this.onSortEnd}
            distance={10}
          />
        </main>
      </div>
    );
  }
}

export default withStyles(styles, {withTheme: true})(NewPaletteForm);