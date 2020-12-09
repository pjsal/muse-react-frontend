import React from 'react';
import { Modal, Form, Button, Label, Header } from 'semantic-ui-react';

const EditSongModal = (props) => {
  console.log(props);
  return (
    <Modal open={props.open}>
      <Header>Edit Song</Header>
      <Modal.Content>
        <Form onSubmit={props.closeAndEdit}>
          <Label>Title:</Label>
          <Form.Input
            type="text"
            name="title"
            value={props.songToEdit.title}
            // We also have to pass down a handleEditChange function in order to update the state when a user is typing, remember forms are controlled components and the state should live in one place, (the SongContainer), because we want the form to be prefilled out, we can't keep the state in the editForm, because we want to prefill out the form and we can only get that information via props, so if we add that to the constructor, since the constructor is only called once, we will only get the the first version of props availiable in our edit if we did that!
            onChange={props.handleEditChange}
          />
          <Label>Artist:</Label>
          <Form.Input
            type="text"
            name="artist"
            value={props.songToEdit.artist}
            onChange={props.handleEditChange}
          />
          <Label>Album:</Label>
          <Form.Input
            type="text"
            name="album"
            value={props.songToEdit.album}
            onChange={props.handleEditChange}
          />
          <Modal.Actions>
            <Button color="green" type="submit">
              Edit Song
            </Button>
          </Modal.Actions>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default EditSongModal;
