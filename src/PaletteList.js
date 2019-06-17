import React, {Component} from 'react';
import {Link} from "react-router-dom";
import MiniPalette from './MiniPalette';
import styles from './styles/PaletteListStyles';
import {withStyles} from "@material-ui/styles";



class PaletteList extends Component {
  //Method to go to the path of a selected palette
  goToPalette(id) {
    this.props.history.push(`/palette/${id}`);
  }

  render() {
    //Object destructuring of props
    const {palettes, classes, deletePalette} = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>React Colour Palette Picker</h1>
            <Link to="/palette/new">Create a New Palette</Link>
          </nav>
          <div className={classes.palettes}>
            {palettes.map(palette => (
              <MiniPalette
                key={palette.id}
                id={palette.id}
                {...palette}
                handleClick={() => this.goToPalette(palette.id)}
                handleDelete={deletePalette}
              />
            ))}
          </div>
        </div>

      </div>
    )
  }
}

export default withStyles(styles)(PaletteList);