import React from 'react';
import { Link, hashHistory } from 'react-router';
import TrackPlayerControlsContainer from '../track_view/track_player_controls_container'

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.showUsersTracks =  this.showUsersTracks.bind(this);
    this.playCurrentTrack =  this.playCurrentTrack.bind(this);
  }

  playCurrentTrack(track){
    this.props.selectSong(track)
  }


  showUsersTracks() {
    const tracks = this.props.tracks;
    const tracksArr = [];
    for (let idx in tracks) { tracksArr.push(tracks[idx]); }
    let trackList = tracksArr.map((track) => {
      return (
        <li className="user-tracks" key={ track.id }>
          <Link to={`/track-view/${track.id}`}>
            <img className="album-cover" src={ track.album_image_url }></img>
            <h3>{ track.title }</h3>
          </Link>
          <TrackPlayerControlsContainer currentTrackView={track}/>
        </li>
      );
    });
    return trackList;
  }

  render(){
    return (
      <div className='profile-view group'>
        <header>
          <div className="header-background">
          </div>
          <div className="default-profile-picture">
            <img src={this.props.currentUser.image_url} className="user-profile-picture"></img>
          </div>
          <div className="username-profile">
            <h4>{ this.props.currentUser.username }</h4>
          </div>
        </header>
        <content className="profile-tracks-content">
          <h2 className="profile-tracks-header">Uploads</h2>
          <ul className="profile-tracks-list">
            {this.showUsersTracks()}
          </ul>
        </content>
      </div>
    );
  }
}
export default Profile;
