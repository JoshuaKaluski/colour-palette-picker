import React, {Component} from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {ChromePicker} from 'react-color';

import DraggableColourBox from './DraggableColourBox';

const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});


class NewPaletteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      currentColour: "steelblue",
      newName: "",
      colours: [
        {colour: "#6D213C", name: "Wine"},
        {colour: "#946846", name: "Raw Umber"},
        {colour: "#BAAB68", name: "Dark Khaki"},
        {colour: "#E3C16F", name: "Straw"},
        {colour: "#FAFF70", name: "Unmellow Yellow"}
        ]
    };
    this.updateCurrentColour = this.updateCurrentColour.bind(this);
    this.addNewColour = this.addNewColour.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    //Add validation to ensure the name for the new colour is unique in the palette
    ValidatorForm.addValidationRule('isColourNameUnique', value =>
      this.state.colours.every(
        ({name}) => name.toLowerCase() !== value.toLowerCase()
      )
    );

    //Add validation to ensure the new colour is unique in the palette
    ValidatorForm.addValidationRule('isColourUnique', value =>
      this.state.colours.every(
        ({colour}) => colour.toLowerCase() !== this.state.currentColour.toLowerCase()
      )
    );
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  updateCurrentColour(newColour) {
    this.setState({currentColour: newColour.hex})
  }

  addNewColour() {
    let newColour = {
      colour: this.state.currentColour,
      name: this.state.newName
    };
    this.setState({colours: [...this.state.colours, newColour], newName: ""})
  }

  handleChange(e) {
    this.setState({newName: e.target.value});
  }

  render() {
    //Object destructuring of props and state
    const { classes } = this.props;
    const { open, currentColour, colours, newName } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Palette Designer
            </Typography>
          </Toolbar>
        </AppBar>
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
          <Typography variant="h4">Design Your Palette</Typography>
          <Divider />
          <div>
            <Button variant="contained" color="secondary">Clear Palette</Button>
            <Button variant="contained" color="primary">Random Colour</Button>
          </div>
          <ChromePicker
            color={currentColour}
            onChangeComplete={this.updateCurrentColour}
          />
          <ValidatorForm onSubmit={this.addNewColour}>
            <TextValidator
              label="Colour Name"
              name="newName"
              value={newName}
              onChange={this.handleChange}
              validators={["required", "isColourNameUnique", "isColourUnique"]}
              errorMessages={[
                "Please input a name to add a colour to the palette",
                "This name already exists for another colour in the palette",
                "This colour already exists in the palette"
              ]}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{backgroundColor: currentColour}}
            >
              Add Colour
            </Button>
          </ValidatorForm>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          {colours.map(colour => (
            <DraggableColourBox colour={colour.colour} name={colour.name} />
          ))}
        </main>
      </div>
    );
  }
}

export default withStyles(styles, {withTheme: true})(NewPaletteForm);