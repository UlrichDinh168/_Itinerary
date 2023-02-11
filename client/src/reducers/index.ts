import { combineReducers } from "redux";
import itineraryReducer from "./itineraries";
import notificationReducer from "./notification";
import seachResultReducer from "./searchResult";

export const rootReducer = combineReducers({
  itinerary: itineraryReducer,
  notification: notificationReducer,
  searchResult: seachResultReducer,
});

export type RootState = ReturnType<typeof rootReducer>
