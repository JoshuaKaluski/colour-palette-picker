import React, {Component} from 'react';
import ColourBox from './ColourBox';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'
import './Palette.css';

class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = {level: 500};
        this.changeLevel = this.changeLevel.bind(this);
    }
    changeLevel(level) {
        this.setState({level: level});
    }
    render() {
        const {colours} = this.props.palette;
        const {level} = this.state;
        const colourBoxes = colours[level].map(colour => (
            <ColourBox background={colour.hex} name={colour.name} />
        ));
        return (
            <div className="Palette">
                <Slider
                    defaultValue={level}
                    min={100}
                    max={900}
                    step={100}
                    onAfterChange={this.changeLevel}
                />
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