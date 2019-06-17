import React from 'react';
import styles from './styles/MiniPaletteStyles';
import {withStyles} from "@material-ui/styles";
import DeleteIcon from '@material-ui/icons/Delete';

function MiniPalette(props) {
  //Object destructuring of props
  const {classes, paletteName, emoji, colours, handleClick} = props;

  //Method to generate mini colour boxes that will form mini palettes
  const miniColourBoxes = colours.map(colour => (
    <div key={colour.name} className={classes.miniColour} style={{backgroundColor: colour.colour}}/>
  ));

  return (
    <div className={classes.root} onClick={handleClick}>
      <div className={classes.delete}>
        <DeleteIcon className={classes.deleteIcon} style={{transition: "all 0.2s ease-in-out"}}/>
      </div>
      <div className={classes.colours}>
        {/*Mini colour palettes*/}
        {miniColourBoxes}
      </div>
      <h5 className={classes.title}>{paletteName} <span className={classes.emoji}>{emoji}</span></h5>
    </div>
  )
}

export default withStyles(styles)(MiniPalette);