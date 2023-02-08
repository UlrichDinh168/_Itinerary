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
exports.seachResultReducer = void 0;
var types_1 = require("../actions/types");
;
var seachResultReducer = function (state, action) {
    switch (action.type) {
        case types_1.seachResultTypes.getAddressSearchSuccess:
            return __assign(__assign({}, state), { addressSearch: action.payload.data.data });
        case types_1.seachResultTypes.setAddressSearch:
            return __assign(__assign({}, state), { addressSearch: action.payload });
        case types_1.seachResultTypes.getJourneyPlanningSuccess:
            return __assign(__assign({}, state), { journeyPlanning: action.payload.data.data });
        case types_1.seachResultTypes.setJourneyPlanning:
            return __assign(__assign({}, state), { journeyPlanning: action.payload });
        default:
            return state;
    }
};
exports.seachResultReducer = seachResultReducer;
