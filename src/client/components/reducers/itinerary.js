/** @format */
import { itineraryTypes as types } from "../actions/types";
const initialState = {
  origin: {
    name: "",
    lat: "",
    lon: "",
  },
  destination: {
    name: "",
    lat: "",
    lon: "",
  },
  itinerary: null,
  dateTime: "",
  loading: false,
};

export const itineraryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.setOrigin:
      return { ...state, origin: action.payload };
    case types.setDestination:
      return { ...state, destination: action.payload };
    case types.setOriginName:
      return { ...state, origin: { ...state.origin, name: action.payload } };
    case types.setDestinationName:
      return {
        ...state,
        destination: { ...state.destination, name: action.payload },
      };
    case types.setSelectedItinerary:
      return { ...state, itinerary: action.payload };

    case types.setDateTime:
      return { ...state, dateTime: action.payload };
    case types.setLoading:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
