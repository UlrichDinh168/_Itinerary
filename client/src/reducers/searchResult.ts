import { seachResultTypes as types } from "../actions/types";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

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
    getAddressSearchSuccess: (state, action) => {
      return { ...state, addressSearch: action.payload.data.data }
    },
    getAddressSearch: (state, action) => {
      return { ...state, addressSearch: action.payload };
    },
    getJourneyPlanningSuccess: (state, action) => {
      return {
        ...state,
        journeyPlanning: action.payload.data.data,
      };
    },
    setJourneyPlanningSuccess: (state, action) => {
      return {
        ...state,
        journeyPlanning: action.payload,
      };
    },
  },
});


export const getAddressLookup = (lat: any, lon: any) => (dispatch: Function) => {
  try {
    const data = instance.post(`/api/get-address-lookup`, { data: { lat, lon } })
    console.log(data, 'data');
    // dispatch(setAddressSearch(data))
  } catch (error: any) {
    throw new Error(error);
  }
}
export const fetchAddressSearch = async (value: any) => {
  try {
    const data = await instance.post(`/api/get-address-search`,
      { data: value })
    console.log(data, 'datgga');
    // dispatch(getAddressSearch(value))
    return data
  } catch (error: any) {
    throw new Error(error);
  }
}
// export const fetchAddressSearch = (value: any) => async (dispatch: any) => {
//   console.log('fetchAddressSearch');

//   try {
//     const data = await instance.post(`/api/get-address-search`,
//       { data: value })
//     console.log(data, 'data');
//     dispatch(getAddressSearch(value))
//     return data
//   } catch (error: any) {
//     throw new Error(error);
//   }
// };

export const getJourneyPlanning = (value: any) => {
  try {
    instance.post(`/api/get-itinerary-plan`, { data: value })
  } catch (error: any) {
    throw new Error(error);
  }
};

export const setJourneyPlanning = (payload: []) => {
  return {
    type: types.setJourneyPlanning,
    payload,
  };
};

export default seachResultReducer.reducer

// Actions
export const { getAddressSearchSuccess, getAddressSearch, getJourneyPlanningSuccess, setJourneyPlanningSuccess } = seachResultReducer.actions


