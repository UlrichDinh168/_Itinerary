"use strict";
exports.__esModule = true;
exports.MODE = exports.NOTIFICATION_TYPE = exports.PRODUCTION = exports.NOTIFICATION_DURATION = exports.PERSIST_KEY = exports.BACKEND_BASE_URL = void 0;
exports.BACKEND_BASE_URL = "http://ec2-52-59-206-225.eu-central-1.compute.amazonaws.com:8000";
exports.PERSIST_KEY = "root";
exports.NOTIFICATION_DURATION = 3000;
exports.PRODUCTION = "PRODUCTION";
exports.NOTIFICATION_TYPE = {
    success: "success",
    error: "error",
    warning: "warning",
    info: "info"
};
exports.MODE = {
    WALK: "WALK",
    RAIL: "RAIL",
    BUS: "BUS",
    TRAM: "TRAM",
    SUBWAY: "SUBWAY"
};
