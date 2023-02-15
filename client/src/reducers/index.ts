import { combineReducers } from "redux";
import searchResultSlice from "./itineraries";
import notificationReducer from "./notification";
import seachResultReducer from "./searchResult";

export const rootReducer = combineReducers({
  itinerary: searchResultSlice,
  notification: notificationReducer,
  searchResult: seachResultReducer,
});

export type RootState = ReturnType<typeof rootReducer>
