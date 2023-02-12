/** @format */

const express = require("express");
const router = express.Router();

const {
  getAddressLookup,
  getAddressSearch,
  getItineraryPlan,
} = require("../controllers/apiRoutes.js");

router.post("/get-address-lookup", getAddressLookup);
router.post("/get-address-search", getAddressSearch);
router.post("/get-itinerary-plan", getItineraryPlan);

exports.apiRoutes = router;
