import { createSlice } from '@reduxjs/toolkit'

interface Itinerary {
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
};

export const itineraryReducer = createSlice({
  name: 'itinerary',
  initialState: <Itinerary>{},
  reducers: {
    setOrigin: (state, action) => {
      return { ...state, origin: action.payload }
    },
    setDestination: (state, action) => {
      return { ...state, destination: action.payload };
    },
    setOriginName: (state, action) => {
      return { ...state, origin: { ...state.origin, name: action.payload } };
    },
    setDestinationName: (state, action) => {
      return {
        ...state,
        destination: { ...state.destination, name: action.payload },
      };
    },
    setDateTime: (state, action) => {
      return { ...state, dateTime: action.payload };
    },
    setLoading: (state, action) => {
      return {
        ...state,
        loading: action.payload,
      };
    }
  },
});

export default itineraryReducer.reducer

export const { setOrigin, setDestination, setOriginName, setDestinationName, setDateTime, setLoading } = itineraryReducer.actions