import React, {Component} from 'react';
import ColourBox from './ColourBox';
import './Palette.css';

class Palette extends Component {
    render() {
        const colourBoxes = this.props.colours.map(colour => (
            <ColourBox background={colour.colour} name={colour.name} />
        ));
        return (
            <div className="Palette">
                {/*Navbar goes here*/}
                <div className="Palette-colours">
                    {/*Colour boxes*/}
                    {colourBoxes}
                </div>
                {/*Footer*/}
            </div>
        )
    }
}

export default Palette;