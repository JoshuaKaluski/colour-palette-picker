import React, {Component} from 'react';
import './ColourBox.css'

class ColourBox extends Component {
    render() {
        return (
            <div style={{background: this.props.background}} className="ColourBox">
                <span>{this.props.name}</span>
                <span>More</span>
            </div>
        )
    }
}

export default ColourBox;