import React, {Component} from 'react';
import {Link} from "react-router-dom";
import MiniPalette from './MiniPalette';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';

import {withStyles} from "@material-ui/styles";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import styles from './styles/PaletteListStyles';


class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDeleteDialog: false,
      deleteId: ""
    };
    this.toggleDialog = this.toggleDialog.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  toggleDialog(id) {
    this.setState({openDeleteDialog: !this.state.openDeleteDialog, deleteId: (id) ? id : ""})
  }

  //Method to go to the path of a selected palette
  goToPalette(id) {
    this.props.history.push(`/palette/${id}`);
  }

  handleDelete() {
    this.props.deletePalette(this.state.deleteId);
    this.toggleDialog();
  }

  render() {
    //Object destructuring of props and state
    const {palettes, classes, deletePalette} = this.props;
    const {openDeleteDialog, deleteId} = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1 className={classes.title}>React Colour Palette Picker</h1>
            <Link to="/palette/new">Create a New Palette</Link>
          </nav>
          <TransitionGroup className={classes.palettes}>
            {palettes.map(palette => (
              <CSSTransition
                classNames="fade"
                key={palette.id}
                timeout={500}
              >
                <MiniPalette
                  key={palette.id}
                  id={palette.id}
                  {...palette}
                  handleClick={() => this.goToPalette(palette.id)}
                  //handleDelete={deletePalette}
                  toggleDialog={this.toggleDialog}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
        <Dialog open={openDeleteDialog} aria-labelledby="delete-dialog-title" onClose={this.toggleDialog}>
          <DialogTitle id="delete-dialog-title">Are you sure you want to delete this palette?</DialogTitle>
          <List>
            <ListItem button onClick={this.handleDelete}>
              <ListItemAvatar>
                <Avatar style={{backgroundColor: blue[100], color: blue[700]}}>
                  <CheckIcon/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText>Delete</ListItemText>
            </ListItem>
            <ListItem button onClick={this.toggleDialog}>
              <ListItemAvatar>
                <Avatar style={{backgroundColor: red[100], color: red[700]}}>
                  <CloseIcon/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText>Cancel</ListItemText>
            </ListItem>
          </List>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(PaletteList);