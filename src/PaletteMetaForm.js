import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {Picker} from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

class PaletteMetaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: "name",
      newPaletteName: ""
    };
  }

  componentDidMount() {
    //Add validation to ensure palette name is unique
    ValidatorForm.addValidationRule('isPaletteNameUnique', value =>
      this.props.palettes.every(
        ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  showEmojiPicker = () => {
    this.setState({stage: "emoji"});
  };

  savePalette = emoji => {
    this.props.handleSubmit({
      paletteName: this.state.newPaletteName,
      emoji: emoji.native
    })
  };

  render() {
    //Object destructuring of props and state
    const {hideForm} = this.props;
    const {stage, newPaletteName} = this.state;

    return (
      <div>
        <Dialog open={stage === "emoji"}>
          <DialogTitle id="form-dialog-title">
            Pick an Emoji for your Palette
          </DialogTitle>
          <Picker title="Pick a Palette Emoji" onSelect={this.savePalette}/>
        </Dialog>
        <Dialog open={stage === "name"} onClose={hideForm} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
          <ValidatorForm onSubmit={this.showEmojiPicker}>
            <DialogContent>
              <DialogContentText>
                Please enter a name for your new palette. Make sure it's unique!
              </DialogContentText>
              <TextValidator
                margin="normal"
                label="Palette Name"
                name="newPaletteName"
                value={newPaletteName}
                onChange={this.handleChange}
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={["Please enter a name for your new palette", "Palette name already exists"]}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={hideForm} color="primary">
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                Save Palette
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </div>
    )
  }
}

export default PaletteMetaForm;