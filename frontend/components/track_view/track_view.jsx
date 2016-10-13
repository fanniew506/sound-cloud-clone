import React from 'react';
import TrackPlayerControls from'./track_player_controls';
import { hashHistory } from 'react-router';

class TrackView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comment: "" }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateComment = this.updateComment.bind(this)
  }

  handleSubmit(e){
    e.preventDefault()
    const data = { id: this.props.currentTrackView.id, comment: this.state.comment }
    this.props.createComment(data)
    this.props.fetchCurrentTrackView(this.props.currentTrackView.id)
    this.setState({comment: ""})
  }

  updateComment(e){
    this.setState({
      comment: e.currentTarget.value
    });
  }

  render() {
    if (this.props.currentTrackView) {
      const comments = this.props.comments
      const currentTrack = this.props.currentTrackView;
      const commentList = comments.map((comment) => {
        return (
          <li key={ comment.id }>
            <div className="thumb">
              <img src={ comment.author_image_url }></img>
            </div>
            <h3 className="comment-author-name">{ comment.author_name }</h3>
            <p className="comment-body">{ comment.body }</p>
            <br></br>
          </li>
        );
      })
      return(
        <div className='track-view'>
          <header>
            <div className="track-header-background">
            </div>
            <div>
              <img src={ currentTrack.album_image_url } className="track-profile-picture"></img>
            </div>
            <div className="track-info">
              <div className="track-play-toggle">
                <TrackPlayerControls
                  playStatus={this.props.playStatus}
                  onPlay={this.props.onPlay}
                  onPause={this.props.onPause}
                  onResume={this.props.onResume}
                  selectSong={this.props.selectSong.bind(this, this.props.currentTrackView)}
                  currentTrackView={this.props.currentTrackView}
                  currentSong={this.props.currentSong}
                  />
              </div>
              <h3>{ currentTrack.author_name }</h3>
              <br/>
              <h2>{ currentTrack.title }</h2>
            </div>
          </header>
          <div className="track-content">
            <form onSubmit={ this.handleSubmit } className="new-comment-form">
              <img src={this.props.currentUser.image_url}></img>
                <input className="comment-input"
                  type="text"
                  placeholder="Write A Comment"
                  value={ this.state.comment }
                  onChange={ this.updateComment }
                  />
                <input className="submit-button" type="submit" value=""/>
            </form>
            <div className="author-info group">
              <div className="author-display">
                <img src={currentTrack.author_image_url}></img>
                <h3 className="author-display-name">{currentTrack.author_name}</h3>
              </div>
              <div className="track-description">
                <p>
                  {currentTrack.description}
                </p>
              </div>
            </div>
            <content className="comments-container">
              <h2 className="comments-header">
                <i className="fa fa-comments" aria-hidden="false"></i>
                <div className="comment-list-title">comments</div>
              </h2>
                <ul className="comments-list group">
                  { commentList }
                </ul>
            </content>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default TrackView;
