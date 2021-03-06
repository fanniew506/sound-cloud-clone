import { createStore } from 'redux';
import RootReducer from '../reducers/root_reducer';
import RootMiddleWare from '../middleware/root_middleware'

const configureStore = (preloadedState = {}) => {
  return createStore(
    RootReducer,
    preloadedState,
    RootMiddleWare
  )
}

export default configureStore;
