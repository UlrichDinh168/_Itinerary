import { createSlice } from '@reduxjs/toolkit'

export interface Itinerary {
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
  nameSearch: string,
  dateTime: string,
};

const initialState = {
  origin: {
    name: '',
    lat: '',
    lon: '',
  },
  destination: {
    name: '',
    lat: '',
    lon: '',
  },
  nameSearch: '',
  dateTime: '',
} as Itinerary

export const ItinerarytSlice = createSlice({
  name: 'ItinerarySlice',
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      return { ...state, origin: action.payload }
    },
    setDestination: (state, action) => {
      return { ...state, destination: action.payload };
    },
    setDateTime: (state, action) => {
      return { ...state, dateTime: action.payload };
    },
  },
});

export default ItinerarytSlice.reducer

export const { setOrigin, setDestination, setDateTime } = ItinerarytSlice.actions