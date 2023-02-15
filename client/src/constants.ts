import axios from "axios";

export const BACKEND_BASE_URL = "http://ec2-52-59-206-225.eu-central-1.compute.amazonaws.com:8000";
export const PERSIST_KEY = "root";

export const instance = axios.create({
  baseURL: "http://localhost:8000",
});


export const NOTIFICATION_DURATION = 3000;
export const PRODUCTION = "PRODUCTION";
export const NOTIFICATION_TYPE = {
  success: "success",
  error: "error",
  warning: "warning",
  info: "info",
};

export const MODE = {
  WALK: "WALK",
  RAIL: "RAIL",
  BUS: "BUS",
  TRAM: "TRAM",
  SUBWAY: "SUBWAY",
};
