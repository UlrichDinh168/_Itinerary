import { seachResultTypes as types } from "../actions/types";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import { AppThunk, AppDispatch } from "store";
const instance = axios.create({
  baseURL: "http://localhost:8000",
});

interface SearchResult {
  addressSearch: string,
  journeyPlanning: string[],
  isLoading?: boolean
};
const initialState = {
  addressSearch: '',
  journeyPlanning: [],
  isLoading: false
} as SearchResult

export const seachResultReducer = createSlice({
  name: 'searchResult',
  initialState,
  reducers: {
    setAddressSearch: (state, action) => {
      return { ...state, addressSearch: action.payload.data.data };
    },

    setJourneyPlanning: (state, action) => {
      return {
        ...state,
        journeyPlanning: action.payload,
      };
    },
  },
});

// Actions
export const { setAddressSearch, setJourneyPlanning } = seachResultReducer.actions

// export const fetchAddressSearch = async (value: any) => {
//   try {
//     const data = await instance.post(`/api/get-address-search`,
//       { data: value })
//     console.log(data, 'datgga');
//     // dispatch(setAddressSearch(value))
//     return data
//   } catch (error: any) {
//     throw new Error(error);
//   }
// }

export const fetchAddressSearch = (value: any): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const data = await instance.post(`/api/get-address-search`, { data: value })
    dispatch(setAddressSearch(data))
  } catch (error: any) {
    throw new Error(error);
  }
};

export const fetchAddressLookup = (lat: any, lon: any) => (dispatch: Function) => {
  try {
    const data = instance.post(`/api/get-address-lookup`, { data: { lat, lon } })
    dispatch(setAddressSearch(data))
  } catch (error: any) {
    throw new Error(error);
  }
}

export const fetchJourneyPlanning = (value: any): AppThunk => async (dispatch: AppDispatch) => {
  console.log('AAÁ');

  try {
    const data = await instance.post(`/api/get-itinerary-plan`, { data: value })
    console.log(data, 'data');
    dispatch(setJourneyPlanning(data))
  } catch (error: any) {
    throw new Error(error);
  }
};


export default seachResultReducer.reducer


