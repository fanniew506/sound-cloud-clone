import {
  CREATE_TRACK,
  UPDATE_TRACK,
  DELETE_TRACK,
  FETCH_LATEST_TRACKS,
  receiveAllTracks,
  receiveLatestTracks,
  receiveNewTrack
  } from '../actions/track_actions';

import { receiveErrors } from '../actions/error_actions';

import * as API from '../util/track_api_util';

export default ({ dispatch }) => next => action => {
  const errorCallback = xhr => dispatch(receiveErrors(xhr.responseJSON));
  const fetchSuccess = tracks => dispatch(receiveAllTracks(tracks));
  const latestSuccess = tracks => dispatch(receiveLatestTracks(tracks));
  const newTrackSuccess = () => dispatch(receiveErrors(["success"]));

  switch(action.type) {
    case CREATE_TRACK:
      API.createTrack(action.track, newTrackSuccess, errorCallback);
      return next(action);
    case UPDATE_TRACK:
      API.updateTrack(action.track, track => dispatch(receiveNewTrack(track)), errorCallback);
      return next(action);
    case DELETE_TRACK:
      API.deleteTrack(() => dispatch(fetchAllTracksForUser()), errorCallback);
      return next(action);
    case FETCH_LATEST_TRACKS:
      API.fetchLatestTracks(latestSuccess, errorCallback);
      return next(action);
    default:
      return(next(action));
  }
};
