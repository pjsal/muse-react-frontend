import React, { Component } from 'react';
import axios from 'axios';
import SongList from './SongList';
import CreateSongForm from './CreateSongForm';
import { Grid } from 'semantic-ui-react';
import EditSongModal from './EditSongModal';

class SongContainer extends Component {
  constructor(props){
    super(props);

    this.state = {
      songs: [],
      songToEdit: {
        title: '',
        artist: '',
        album: '',
        id: ''
      },
      showEditModal: false
    }
  }
  componentDidMount(){
    this.getSongs();
  }
  getSongs = async () => {
    try {
      const parsedSongs = await axios(
        process.env.REACT_APP_FLASK_API_URL + '/api/songs/'
      );
      console.log(parsedSongs.data.data);
      await this.setState({
        songs: parsedSongs.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  addSong = async (e, song) => {
    e.preventDefault();
    console.log(song);

    try {
      // The createdSongResponse variable will store the response from the Flask API
      // This was the original code which was replaced by the code below.  The intent is to add headers which os what we should be doing.  
      // const createdSongResponse = await axios.post(
        // process.env.REACT_APP_FLASK_API_URL + '/api/songs/',
        // song
        // );

        // Alternative code which should be used for more robust apps (needed for authentication???)
        // We also want to specify that type of information we are sending to the server in our headers, so our flask app knows how to correctly process our post request
            // headers: {
            //   'Content-Type': 'application/json'
            // }
        // This sends request as string.  Then the backend api will convert to json.
        const createdSongResponse = await axios({
          method: 'POST',
          url: process.env.REACT_APP_FLASK_API_URL + '/api/songs/',
          data: song,
          headers: {
            'Content-Type': 'application/json',
          },
        });


      // we are emptying all the songs that are living in state into a new array,
      // and then adding the song we just created to the end of it
      // the new song which is called parsedResponse.data

      console.log(createdSongResponse.data.data, ' this is response');
      this.setState({
        // Create a new array from existing song object and the new song we just created
        songs: [...this.state.songs, createdSongResponse.data.data],
      });
    } catch (err) {
      console.log('error', err);
    }
  };

  deleteSong = async (id) => {
    console.log(id);
    const deleteSongResponse = await axios.delete(
      `${process.env.REACT_APP_FLASK_API_URL}/api/songs/${id}`
    );
    console.log(deleteSongResponse);
    // Now that the db has deleted our item, we need to remove it from state
    // Then make the delete request, then remove the song from the state array using filter.
    // This is used instead of calling the api again get the newest list.  It saves a trip to the server.
    this.setState({ songs: this.state.songs.filter((song) => song.id !== id) });

    console.log(deleteSongResponse, ' response from Flask server');
  };

  openAndEdit = (songFromTheList) => {
    console.log(songFromTheList, ' songToEdit  ');
  
    this.setState({
      showEditModal: true,
      songToEdit: {
        ...songFromTheList,
      },
    });
  };

  handleEditChange = (e) => {
    this.setState({
      songToEdit: {
        ...this.state.songToEdit,
        [e.currentTarget.name]: e.currentTarget.value,
      },
    });
  };

  closeAndEdit = async (e) => {
    e.preventDefault();
    try {
      const editResponse = await axios.put(
        process.env.REACT_APP_FLASK_API_URL +
          '/api/songs/' +
          this.state.songToEdit.id,
        this.state.songToEdit
      );
  
      console.log(editResponse, ' parsed edit');
  
      // Create copy of state array and update that, not the original (good practice for React)
      const newSongArrayWithEdit = this.state.songs.map((song) => {
        if (song.id === editResponse.data.data.id) {
          song = editResponse.data.data;
        }
  
        return song;
      });
  
      this.setState({
        showEditModal: false,
        // Here's where we update state with the array copy
        songs: newSongArrayWithEdit,
      });
    } catch (err) {
      console.log(err);
    }
  };


  render(){
    return (
      <Grid columns={2} divided textAlign='center' style={{ height: '100%' }} verticalAlign='top' stackable>
        <Grid.Row>
          <Grid.Column>
            <SongList songs={this.state.songs} deleteSong={this.deleteSong} openAndEdit={this.openAndEdit}/>
          </Grid.Column>
          <Grid.Column>
           <CreateSongForm addSong={this.addSong}/>
          </Grid.Column>
          <EditSongModal handleEditChange={this.handleEditChange} open={this.state.showEditModal} songToEdit={this.state.songToEdit} closeAndEdit={this.closeAndEdit}/>
        </Grid.Row>
      </Grid>
      )
  }
}

export default SongContainer