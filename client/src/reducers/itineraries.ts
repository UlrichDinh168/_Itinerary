import { createSlice } from '@reduxjs/toolkit'

interface SearchResult {
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
} as SearchResult

export const searchResultSlice = createSlice({
  name: 'searchResult',
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

export default searchResultSlice.reducer

export const { setOrigin, setDestination, setDateTime } = searchResultSlice.actions