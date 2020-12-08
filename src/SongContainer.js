import React, { Component } from 'react';
import axios from 'axios';
import SongList from './SongList';
import CreateSongForm from './CreateSongForm';

class SongContainer extends Component {
  constructor(props){
    super(props);

    this.state = {
      songs: []
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


  render(){
    return (
      <>
        <SongList songs={this.state.songs}
                  deleteSong={this.deleteSong}/>
        <CreateSongForm addSong={this.addSong}/>
      </>
      )
  }
}

export default SongContainer