/** @format */

import express from "express";
const router = express.Router();

import {
  getAddressLookup,
  getAddressSearch,
  getItineraryPlan,
} from "../controllers/apiRoutes.js";

router.post("/get-address-lookup", getAddressLookup);
router.post("/get-address-search", getAddressSearch);
router.post("/get-itinerary-plan", getItineraryPlan);

export const apiRoutes = router;
