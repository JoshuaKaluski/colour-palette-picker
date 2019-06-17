import React, {Component} from 'react';
import {Link} from "react-router-dom";
import MiniPalette from './MiniPalette';
import {withStyles} from "@material-ui/styles";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import styles from './styles/PaletteListStyles';


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
                  handleDelete={deletePalette}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(PaletteList);