import React, { Component } from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

// A page to join a room
export default class JoinRoomPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: "",
      error: false,
      errorMessage: "",
    };
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.roomButtomPressed = this.roomButtomPressed.bind(this);
  }

  render() {
    return (
      <Grid container spacing={1} align="center">
        <Grid item xs={12}>
          <Typography variant="h4" component="h4">
            Join A Room
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={this.state.error}
            label="Code"
            placeholder="Enter A Room"
            value={this.state.roomCode}
            helperText={this.state.errorMessage}
            variant="outlined"
            onChange={this.handleTextFieldChange}>
            </TextField>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={this.roomButtomPressed}
          >
            Enter Room
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="secondary" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    );
  }
  // Below is the logic for this component.
  // This method captures what the current room code is.
  handleTextFieldChange(e) {
    this.setState({
      roomCode: e.target.value,
    });
  }
  // Handles the event when enter room button is pressed. Sends to backend, asks does the room exist.
  roomButtomPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: this.state.roomCode,
      }),
    };
    fetch("/api/join-room", requestOptions)
      .then((response) => {
        // Get from frontend because code is valid. 2 backticks for string formatting (tilde key)
        if (response.ok) {
          this.props.history.push(`/room/${this.state.roomCode}`);
        } else {
          this.setState({ error: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
