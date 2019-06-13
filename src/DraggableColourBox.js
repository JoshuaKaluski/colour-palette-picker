import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    width: "20%",
    height: "25%",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    margin: "0 auto -3.5px",
  }
};

function draggableColourBox(props) {
  return (
    <div className={props.classes.root} style={{backgroundColor: props.colour}}>
      {props.name}
    </div>
  )
}

export default withStyles(styles)(draggableColourBox);