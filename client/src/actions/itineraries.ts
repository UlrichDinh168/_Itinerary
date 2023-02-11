import { itineraryTypes as types } from "./types";

export const setOrigin = (payload: any) => {
  return {
    type: types.setOrigin,
    payload,
  };
};

export const setDestination = (payload: any) => {
  return {
    type: types.setDestination,
    payload,
  };
};

export const setOriginName = (payload: any) => {
  return {
    type: types.setOriginName,
    payload,
  };
};

export const setDestinationName = (payload: any) => {
  return {
    type: types.setDestinationName,
    payload,
  };
};
export const setDateTime = (payload: any) => {
  return {
    type: types.setDateTime,
    payload,
  };
};

export const setItineraries = (payload: any) => {
  return {
    type: types.setItineraries,
    payload,
  };
};

export const setLoading = (payload: any) => {
  return {
    type: types.setLoading,
    payload,
  };
};
