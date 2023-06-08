import { combineReducers } from 'redux';
import { notificationReducer } from './notification';
import { seachResultReducer } from './searchResult';
import { itineraryReducer } from './itinerary';

export const rootReducer = combineReducers({
  itinerary: itineraryReducer,
  notification: notificationReducer,
  searchResult: seachResultReducer,
});
