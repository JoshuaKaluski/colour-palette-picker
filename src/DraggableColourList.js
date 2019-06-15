import React from 'react';
import {SortableContainer} from "react-sortable-hoc";
import DraggableColourBox from "./DraggableColourBox";

const DraggableColourList = SortableContainer(({colours, removeColour}) => {
  return (
    <div style={{height: "100%"}}>
      {colours.map((colour, i) => (
        <DraggableColourBox
          index={i}
          key={colour.name}
          colour={colour.colour}
          name={colour.name}
          handleClick={() => removeColour(colour.name)}
        />
      ))}
    </div>
  )
});


export default DraggableColourList;