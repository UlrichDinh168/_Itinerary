
import { seachResultTypes as types } from "../actions/types";

interface initialState {
  addressSearch: string,
  journeyPlanning: string[],
};

export const seachResultReducer = (state: initialState, action: any) => {
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
