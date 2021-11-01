/** @format */

export const itineraryTypes = {
  setOrigin: "ORIGIN_SET",
  setOriginName: "ORIGIN_NAME_SET",
  setDestinationName: "DESTINATION_NAME_SET",
  setDestination: "DESTINATION_SET",
  setDateTime: "DATETIME_SET",
  setItineraries: "ITINERARRIES_SET",
  setLoading: "LOADING_SET",
};

export const seachResultTypes = {
  setAddressSearch: "ADDRESS_SEARCH_SET",
  getAddressSearch: "ADDRESS_SEARCH_GET",
  getAddressSearchSuccess: "ADDRESS_SEARCH_GET_SUCCESS",
  getAddressSearchFail: "ADDRESS_SEARCH_GET_FAIL",

  getAddressLookupResult: "ADDRESS_LOOKUP_RESULT_GET",
  getAddressLookupResultSuccess: "ADDRESS_LOOKUP_RESULT_GET_SUCCESS",
  getAddressLookupResultFail: "ADDRESS_LOOKUP_RESULT_GET_FAIL",

  getJourneyPlanning: "JOURNEY_PLANNING_GET",
  getJourneyPlanningSuccess: "JOURNEY_PLANNING_GET_SUCCESS",
  getJourneyPlanningFail: "JOURNEY_PLANNING_GET_FAIL",

  setJourneyPlanning: "JOURNEY_PLANNING_SET",
};

// notification
export const notificationTypes = {
  showNotification: "NOTIFICATION_SHOW_NOTIFICATION",
  resetNotification: "NOTIFICATION_RESET_NOTIFICATION",
};
