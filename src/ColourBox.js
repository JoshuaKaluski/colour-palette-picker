import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {CopyToClipboard} from "react-copy-to-clipboard";
import classNames from 'classnames';
import {withStyles} from "@material-ui/styles";
import styles from './styles/ColourBoxStyles';


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
    const {name, background, moreURL, showingFullPalette, classes} = this.props;
    const {copied} = this.state;

    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div style={{background}} className={classes.ColourBox}>
          <div
            style={{background}}
            className={classNames(classes.copyOverlay, {
              [classes.showOverlay]: copied
            })}
          />

          <div className={classNames(classes.copyMessage, {
            [classes.showCopyMessage]: copied
          })}>
            <h1>Copied!</h1>
            <p className={classes.copyText}>{background}</p>
          </div>
          <div>
            <div className={classes.boxContent}>
              <span className={classes.colourName}>{name}</span>
            </div>
            <button className={classes.copyButton}>Copy</button>
          </div>
          {showingFullPalette && (
            <Link to={moreURL} onClick={e => e.stopPropagation()}>
              <span className={classes.viewMore}>More</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    )
  }
}

export default withStyles(styles)(ColourBox);