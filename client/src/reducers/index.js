"use strict";
exports.__esModule = true;
exports.rootReducer = void 0;
var redux_1 = require("redux");
var itineraries_1 = require("./itineraries");
var notification_1 = require("./notification");
var searchResult_1 = require("./searchResult");
exports.rootReducer = (0, redux_1.combineReducers)({
    itinerary: itineraries_1.itineraryReducer,
    notification: notification_1.notificationReducer,
    searchResult: searchResult_1.seachResultReducer
});
