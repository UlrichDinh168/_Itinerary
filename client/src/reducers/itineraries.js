"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.itineraryReducer = void 0;
var types_1 = require("../actions/types");
;
var itineraryReducer = function (state, action) {
    switch (action.type) {
        case types_1.itineraryTypes.setOrigin:
            return __assign(__assign({}, state), { origin: action.payload });
        case types_1.itineraryTypes.setDestination:
            return __assign(__assign({}, state), { destination: action.payload });
        case types_1.itineraryTypes.setOriginName:
            return __assign(__assign({}, state), { origin: __assign(__assign({}, state.origin), { name: action.payload }) });
        case types_1.itineraryTypes.setDestinationName:
            return __assign(__assign({}, state), { destination: __assign(__assign({}, state.destination), { name: action.payload }) });
        case types_1.itineraryTypes.setDateTime:
            return __assign(__assign({}, state), { dateTime: action.payload });
        case types_1.itineraryTypes.setLoading:
            return __assign(__assign({}, state), { loading: action.payload });
        default:
            return state;
    }
};
exports.itineraryReducer = itineraryReducer;
