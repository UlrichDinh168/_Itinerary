/** @format */

import { itineraryTypes as types } from "../actions/types";

export const setOrigin = (payload) => {
  return {
    type: types.setOrigin,
    payload,
  };
};
export const setDestination = (payload) => {
  return {
    type: types.setDestination,
    payload,
  };
};
export const setOriginName = (payload) => {
  return {
    type: types.setOriginName,
    payload,
  };
};
export const setDestinationName = (payload) => {
  return {
    type: types.setDestinationName,
    payload,
  };
};
export const setDateTime = (payload) => {
  return {
    type: types.setDateTime,
    payload,
  };
};

export const setItineraries = (payload) => {
  return {
    type: types.setItineraries,
    payload,
  };
};
export const setItinerary = (payload) => {
  return {
    type: types.setItinerary,
    payload,
  };
};
export const setLoading = (payload) => {
  return {
    type: types.setLoading,
    payload,
  };
};
