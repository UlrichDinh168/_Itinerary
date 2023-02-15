import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import { AppThunk, AppDispatch } from "store";
const instance = axios.create({
  baseURL: "http://localhost:8000",
});

interface Itinerary {
  addressSearch: string,
  journeyPlanning: string[],
  isLoading?: boolean
};
const initialState = {
  addressSearch: '',
  journeyPlanning: [],
  isLoading: true
} as Itinerary

export const seachResultReducer = createSlice({
  name: 'searchResult',
  initialState,
  reducers: {
    setAddressSearch: (state, action) => {
      return { ...state, addressSearch: action.payload };
    },

    setIsloading: (state, action) => {
      return {
        ...state,
        isLoading: action.payload,
      }
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
export const { setAddressSearch, setJourneyPlanning, setIsloading } = seachResultReducer.actions

export const fetchAddressSearch = (value: any): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const data = await instance.post(`/api/get-address-search`, { data: value })
    dispatch(setAddressSearch(data?.data?.data))
  } catch (error: any) {
    throw new Error(error);
  }
};

export const fetchAddressLookup = (lat: any, lon: any): AppThunk => async (dispatch: Function) => {

  try {
    const data = await instance.post(`/api/get-address-lookup`, { data: { lat, lon } })
    return data
    // dispatch(setAddressSearch(data?.data?.data?.[0]))
  } catch (error: any) {
    throw new Error(error);
  }
}

export const fetchJourneyPlanning = (value: any): AppThunk => async (dispatch: AppDispatch) => {
  console.log(value, 'value');

  try {
    dispatch(setIsloading(true))
    const data = await instance.post(`/api/get-itinerary-plan`, { data: value })
    console.log(data, 'data');

    dispatch(setJourneyPlanning(data?.data?.data))
  } catch (error: any) {
    throw new Error(error);
  } finally {
    dispatch(setIsloading(false))
  }
};


export default seachResultReducer.reducer


