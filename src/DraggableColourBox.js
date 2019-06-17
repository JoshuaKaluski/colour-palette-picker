import React from 'react';
import {SortableElement} from "react-sortable-hoc";
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './styles/DraggableColourBoxStyles';

const draggableColourBox = SortableElement((props) => {
  const {classes, colour, name, handleClick} = props;
  return (
    <div className={classes.root} style={{backgroundColor: colour}}>
      <div className={classes.boxContent}>
        <span>{name}</span>
        <DeleteIcon className={classes.deleteIcon} onClick={handleClick} />
      </div>

    </div>
  );
});

export default withStyles(styles)(draggableColourBox);