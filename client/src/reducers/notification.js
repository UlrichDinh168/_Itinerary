"use strict";
/** @format */
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
exports.notificationReducer = void 0;
var types_1 = require("../actions/types");
var constants_1 = require("../constants");
;
var notificationReducer = function (state, action) {
    var _a, _b, _c;
    if (action.type.endsWith("_FAIL")) {
        return __assign(__assign({}, state), { notification: {
                type: constants_1.NOTIFICATION_TYPE.error,
                message: (_c = (_b = (_a = action === null || action === void 0 ? void 0 : action.error) === null || _a === void 0 ? void 0 : _a.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message,
                duration: constants_1.NOTIFICATION_DURATION
            } });
    }
    switch (action.type) {
        case types_1.notificationTypes.showNotification:
            return __assign(__assign({}, state), { notification: action.notification });
        case types_1.notificationTypes.resetNotification:
            return state;
        default:
            return state;
    }
};
exports.notificationReducer = notificationReducer;
