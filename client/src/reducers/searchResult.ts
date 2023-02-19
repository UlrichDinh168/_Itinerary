import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";
import { AppThunk, AppDispatch } from "../store";
const instance = axios.create({
  baseURL: "http://ec2-18-194-249-0.eu-central-1.compute.amazonaws.com:8000",
});

interface Itinerary {
  originSearch: {},
  destinationSearch: {}
  journeyPlanning: string[],
  isLoading?: boolean
};
const initialState = {
  originSearch: {},
  destinationSearch: {},
  journeyPlanning: [],
  isLoading: false
} as Itinerary

export const seachResultReducer = createSlice({
  name: 'searchResult',
  initialState,
  reducers: {
    setOriginAddressSearch: (state, action) => {
      return { ...state, originSearch: action.payload };
    },
    setDestinationAddressSearch: (state, action) => {
      return { ...state, destinationSearch: action.payload };
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
export const { setOriginAddressSearch, setDestinationAddressSearch, setJourneyPlanning, setIsloading } = seachResultReducer.actions

export const fetchAddressSearch = (value: any): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const data = await instance.post(`/api/get-address-search`, { data: value })
    return data
  } catch (error: any) {
    console.log(error, 'error')
  }
};

export const fetchAddressLookup = (lat: any, lon: any): AppThunk => async (dispatch: Function) => {
  try {
    const data = await instance.post(`/api/get-address-lookup`, { data: { lat, lon } })
    return data
  } catch (error: any) {
    console.log(error, 'error');
  }
}

export const fetchJourneyPlanning = (value: Record<string, any>): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsloading(true))
    const data: any = await instance.post(`/api/get-itinerary-plan`, { data: value })
    if (data.length !== 0) dispatch(setJourneyPlanning(data?.data?.data))
  } catch (error: any) {
    console.log(error, 'error');
  } finally {
    dispatch(setIsloading(false))
  }
};


export default seachResultReducer.reducer


