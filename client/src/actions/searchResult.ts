import { seachResultTypes as types } from "./types";

// export const setDefaultResult = (payload:any) => {
//   return {
//     type: types.setDefaultResult,
//     payload,
//   };
// };

// export const setTransportResult = (payload:any) => {
//   return {
//     type: types.setTransportResult,
//     payload,
//   };
// };

export const getAddressLookup = (lat: string, lon: string) => {
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

export const getAddressSearch = (value: string) => {
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

export const getJourneyPlanning = (value: any) => {
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
export const setJourneyPlanning = (payload: string) => {
  return {
    type: types.setJourneyPlanning,
    payload,
  };
};
