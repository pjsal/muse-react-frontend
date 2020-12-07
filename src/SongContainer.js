import React, { Component } from 'react';
import axios from 'axios';

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
  
  render(){
    return (
      "I'm the songContainer"
      )
  }
}

export default SongContainer