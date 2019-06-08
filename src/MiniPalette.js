import React from 'react';
import {withStyles} from "@material-ui/styles";

const styles = {
  root: {
    backgroundColor: 'white',
    borderRadius: '5px',
    border: '1px solid black',
    padding: '0.5rem',
    position: 'relative',
    overflow: "hidden",
    "&:hover": {
      cursor: 'pointer'
    }
  },
  colours: {
    height: '150px',
    width: '100%',
    backgroundColor: '#dae1e4',
    borderRadius: '5px',
    overflow: 'hidden'
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0',
    color: 'black',
    paddingTop: '0.5rem',
    fontSize: '1rem',
    position: 'relative'
  },
  emoji: {
    marginLeft: '0.5rem',
    fontSize: '1.5rem'
  },
  miniColour: {
    height: '25%',
    width: '20%',
    display: 'inline-block',
    margin: '0 auto',
    position: 'relative',
    marginBottom: '-3.5px'
  }
};

function MiniPalette(props) {
  //Object destructuring of props
  const {classes, paletteName, emoji, colours} = props;

  //Method to generate mini colour boxes that will form mini palettes
  const miniColourBoxes = colours.map(colour => (
    <div key={colour.name} className={classes.miniColour} style={{backgroundColor: colour.colour}}/>
  ));

  return (
    <div className={classes.root}>
      <div className={classes.colours}>
        {/*Mini colour palettes*/}
        {miniColourBoxes}
      </div>
      <h5 className={classes.title}>{paletteName} <span className={classes.emoji}>{emoji}</span></h5>
    </div>
  )
}

export default withStyles(styles)(MiniPalette);