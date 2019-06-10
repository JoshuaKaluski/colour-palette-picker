import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {CopyToClipboard} from "react-copy-to-clipboard";
import chroma from 'chroma-js';
import './ColourBox.css'

class ColourBox extends Component {
  constructor(props) {
    super(props);
    this.state = {copied: false};
    this.changeCopyState = this.changeCopyState.bind(this);
  }
  changeCopyState() {
    this.setState({copied: true}, () => {
      setTimeout(() => this.setState({copied: false}), 1500);
    });
  }
  render() {
    //Object destructuring of props and state
    const {name, background, moreURL, showLink} = this.props;
    const {copied} = this.state;

    //Booleans to determine how dark/light a colour is to change box's text to the opposite colour for legibility
    const isDarkColour = chroma(background).luminance() <= 0.09;
    const isLightColour = chroma(background).luminance() >= 0.6;

    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div style={{background}} className="ColourBox">
          <div style={{background}} className={`copy-overlay ${copied && "show"}`}/>
          <div className={`copy-message ${copied && "show"}`}>
            <h1>Copied!</h1>
            <p className={isLightColour && "dark-text"}>{background}</p>
          </div>
          <div className="copy-container">
            <div className="box-content">
              <span className={isDarkColour ? "light-text" : undefined}>{name}</span>
            </div>
            <button className={`copy-button ${isLightColour && "dark-text"}`}>Copy</button>
          </div>
          {showLink && (
            <Link to={moreURL} onClick={e => e.stopPropagation()}>
              <span className={`view-more ${isLightColour && "dark-text"}`}>More</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    )
  }
}

export default ColourBox;