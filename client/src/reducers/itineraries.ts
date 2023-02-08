import { itineraryTypes as types } from "../actions/types";

interface initialState {
  origin: {
    name: string,
    lat: string,
    lon: string,
  },
  destination: {
    name: string,
    lat: string,
    lon: string,
  },

  dateTime: string,
  loading: boolean,
};

export const itineraryReducer = (state: initialState, action: any) => {
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
