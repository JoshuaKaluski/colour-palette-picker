import React, {Component} from 'react';
import MiniPalette from './MiniPalette';
import {withStyles} from "@material-ui/styles";

const styles = {
  root: {
    backgroundColor: 'steelblue',
    height: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  container: {
    width: '50%',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  nav: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    color: 'white'
  },
  palettes: {
    boxSizing: 'border-box',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 30%)',
    gridGap: '5%'
  }
};

class PaletteList extends Component {
  //Method to go to the path of a selected palette
  goToPalette(id) {
    this.props.history.push(`/palette/${id}`);
  }

  render() {
    //Object destructuring of props
    const {palettes, classes} = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>React Colour Palette Picker</h1>
          </nav>
          <div className={classes.palettes}>
            {palettes.map(palette => (
              <MiniPalette {...palette} handleClick={() => this.goToPalette(palette.id)} />
            ))}
          </div>
        </div>

      </div>
    )
  }
}

export default withStyles(styles)(PaletteList);