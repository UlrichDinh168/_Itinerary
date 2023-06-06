/** @format */

import { seachResultTypes as types } from "../actions/types";
const initialState = {
  addressSearch: null,
  journeyPlanning: [],
};

export const seachResultReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.getAddressSearchSuccess:
      return { ...state, addressSearch: action.payload.data.data };
    case types.setAddressSearch:
      return { ...state, addressSearch: action.payload };
    case types.getJourneyPlanningSuccess:
      return {
        ...state,
        journeyPlanning: action.payload.data.data,
      };
    case types.setJourneyPlanning:
      return {
        ...state,
        journeyPlanning: action.payload,
      };

    default:
      return state;
  }
};
