/** @format */

import { seachResultTypes as types } from "./types";

export const setDefaultResult = (payload) => {
  return {
    type: types.setDefaultResult,
    payload,
  };
};

export const setTransportResult = (payload) => {
  return {
    type: types.setTransportResult,
    payload,
  };
};

export const getAddressLookup = (lat, lon) => {
  return {
    type: types.getAddressLookupResult,
    payload: {
      request: {
        method: "POST",
        url: `/api/get-address-lookup`,
        data: { lat, lon },
      },
    },
  };
};
export const getAddressSearch = (value) => {
  return {
    type: types.getAddressSearch,
    payload: {
      request: {
        header: { "Content-Type": "application/json" },
        method: "POST",
        url: `/api/get-address-search`,
        data: { text: value },
      },
    },
  };
};

export const getJourneyPlanning = (value) => {
  return {
    type: types.getJourneyPlanning,
    payload: {
      request: {
        method: "POST",
        url: `/api/get-itinerary-plan`,
        data: value,
      },
    },
  };
};
export const setJourneyPlanning = (payload) => {
  return {
    type: types.setJourneyPlanning,
    payload,
  };
};
