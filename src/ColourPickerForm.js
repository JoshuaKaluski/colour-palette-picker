import React, {Component} from 'react';
import {ChromePicker} from "react-color";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/ColourPickerFormStyles';

class ColourPickerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentColour: "steelblue",
      newColourName: "",
    };
    this.updateCurrentColour = this.updateCurrentColour.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    //Add validation to ensure the name for the new colour is unique in the palette
    ValidatorForm.addValidationRule('isColourNameUnique', value =>
      this.props.colours.every(
        ({name}) => name.toLowerCase() !== value.toLowerCase()
      )
    );

    //Add validation to ensure the new colour is unique in the palette
    ValidatorForm.addValidationRule('isColourUnique', value =>
      this.props.colours.every(
        ({colour}) => colour.toLowerCase() !== this.state.currentColour.toLowerCase()
      )
    );
  }

  updateCurrentColour(newColour) {
    this.setState({currentColour: newColour.hex})
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit() {
    const newColour = {
      colour: this.state.currentColour,
      name: this.state.newColourName
    };
    this.props.addNewColour(newColour);
    this.setState({newColourName: ""});
  }

  render() {
    //Object destructuring of props and state
    const {paletteFull, classes} = this.props;
    const {currentColour, newColourName} = this.state;

    return (
      <div>
        <ChromePicker
          color={currentColour}
          onChangeComplete={this.updateCurrentColour}
          className={classes.picker}
        />
        <ValidatorForm onSubmit={this.handleSubmit} ref="form" instantValidate={false}>
          <TextValidator
            className={classes.colourInput}
            variant="filled"
            margin="normal"
            label="Colour Name"
            name="newColourName"
            value={newColourName}
            onChange={this.handleChange}
            validators={["required", "isColourNameUnique", "isColourUnique"]}
            errorMessages={[
              "Please input a name to add a colour to the palette",
              "This name already exists for another colour in the palette",
              "This colour already exists in the palette"
            ]}
          />
          <Button
            className={classes.addColour}
            variant="contained"
            color="primary"
            type="submit"
            disabled={paletteFull}
            style={{backgroundColor: paletteFull ? "grey" : currentColour}}
          >
            {paletteFull ? "Palette Full" : "Add Colour"}
          </Button>
        </ValidatorForm>
      </div>
    )
  }
}

export default withStyles(styles)(ColourPickerForm);