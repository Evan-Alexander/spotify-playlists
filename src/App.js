import React, { Component } from 'react';
import './App.css';

let defaultStyle = {
  color: '#fff'
}
let fakeServerData = {
  user: {
    name: 'Jason',
    playlists: [
      {
        name: 'September 2016',
        songs: [
          { name: 'Psuedio', duration: 1234},
          { name: 'Hold On', duration: 7000},
          { name: 'Something Else', duration: 2342}
        ]
      },
      {
        name: 'November 2015',
        songs: [
          { name: 'Corporal Clegg', duration: 1234},
          { name: 'Lovin', duration: 7000},
          { name: 'HeartBreaker', duration: 2342}
        ]
      },
      {
        name: 'Tom Petty',
        songs: [
          { name: 'Blues Song', duration: 1234},
          { name: 'November Rain', duration: 7000},
          { name: 'Jump', duration: 2342}
        ]
      },
      {
        name: 'Zara',
        songs: [
          { name: 'NightTrain', duration: 1234},
          { name: 'Groovin', duration: 7000},
          { name: 'Hey 19', duration: 2342}
        ]
      }
    ]
  }
}

class PlaylistCounter extends Component {
  render() {
    return (
      <div style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
        <h2>{this.props.playlists && this.props.playlists.length} Playlists</h2>
      </div>
    );
  }
}


class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    }, [])
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration
    }, 0)
    return (
      <div style={{...defaultStyle, width: "40%", display: 'inline-block'}}>
        <h2>{Math.round(totalDuration/60)} hours</h2>
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    return (
      <div style={defaultStyle}>
        <img />
        <input type='text'
          onKeyUp={e => this.props.onTextChange(e.target.value)}/>
        Filter
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist;
    return (
      <div style={{...defaultStyle, display: 'inline-block', width: '25%'}}>
        <img />
        <h3>{playlist.name}</h3>
        <ul>
          {playlist.songs.map(song =>
            <li>{song.name}</li>
          )}
        </ul>
      </div>
    );
  }
}
class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
      filterString: ''
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ serverData: fakeServerData })
    }, 1000);
  }
  render() {
    let playlistToRender =  this.state.serverData.user ? this.state.serverData.user.playlists
      .filter(playlist =>
        playlist.name.toLowerCase().includes(
          this.state.filterString.toLowerCase())
    ) : []
    return (
      <div className="App">
        {this.state.serverData.user ?
        <div>
          <h1>
            {this.state.serverData.user.name}'s Playlist
          </h1>
          <PlaylistCounter playlists={playlistToRender}/>
          <HoursCounter playlists={playlistToRender}/>
          <Filter onTextChange={text => this.setState({filterString: text})}/>
          {playlistToRender.map(playlist =>
              <Playlist playlist={playlist}/>
          )}
        </div> : <h1>Loading ...</h1>
        }
      </div>
    );
  }
}

export default App;
