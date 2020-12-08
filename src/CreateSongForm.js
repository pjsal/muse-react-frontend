import React, { Component } from 'react';
import { Form, Button, Label, Segment } from 'semantic-ui-react';

class CreateSongForm extends Component {
  // Just some minor items we can simplify.  See State code below this.
  // constructor(){
  //   super();
    // this.state = {
    //   title: '',
    //   artist: '',
    //   album: ''
    // }
  // }

    state = {
        title: '',
        artist: '',
        album: ''
    };


  handleChange = (e) => {
    this.setState({[e.currentTarget.name]: e.currentTarget.value})
  }
  render(){
    return (
      <Segment>
        <h4>Add New Song</h4>
        {/* <Form onSubmit={(e) => this.props.addSong(e, this.state)}> */}
        {/* Alternative to line above.  It's a crude way of deleting the content of the fields after submission. */}
        <Form
          onSubmit={(e) => {
            // We are sending all state properites because there are only a few.
            this.props.addSong(e, this.state);
            // This is a crude way of reseting the input fields after form submission.  Need to use null as empty string will be allowed if the 'required' property is set on the form input
            this.setState({ title: null, artist: null, album: null });
          }}
        >
          <Label>Title:</Label>
          <Form.Input type='text' name='title' value={this.state.title} onChange={this.handleChange}/>
          <Label>Artist:</Label>
          <Form.Input type='text' name='artist' value={this.state.artist} onChange={this.handleChange}/>
          <Label>Album:</Label>
          <Form.Input type='text' name='album' value={this.state.album} onChange={this.handleChange}/>
          <Button type='Submit'>Add Song</Button>
        </Form>
      </Segment>
      )
  }
}

export default CreateSongForm;