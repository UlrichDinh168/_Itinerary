const { normalizeData, createQuery } = require("../utils/index.js");
// const fetch = require("node-fetch");
const axios = require('axios')
const { request, gql } = require("graphql-request");
const { BACKEND_BASE_URL } = require("../../client/src/constants.js");

const instance = axios.create({
  baseURL: BACKEND_BASE_URL,
});


exports.getAddressSearch = async (req, res) => {
  const text = req?.body
  try {
    if (text.length > 2) {
      const defaultData = await instance.get(
        `/geocoding/v1/search?text=${text}&lang=en&sources=oa%2Cosm%2Cnlsfi`,
      );
      const defaultDataJson = await defaultData.json();

      const transportData = await instance.get(
        `/geocoding/v1/search?text=${text}&lang=en&sources=gtfsHSL%2CgtfsHSLlautta`,
      );
      const transportDataJson = await transportData.json();

      const combinedData = [
        ...transportDataJson?.features,
        ...defaultDataJson?.features,
      ];
      if (combinedData.length === 0)
        return res.status(404).json({ message: "No results found!" });
      return res.status(201).json({
        message: "Data fetched succesfully",
        data: normalizeData(combinedData),
      });
    }
  } catch (error) {
    console.log("err", error);
    return res.status(400).json({ message: "Failed to fetch data" });
  }
};

exports.getAddressLookup = async (req, res) => {
  const { lat, lon } = req?.body
  try {
    const data = await await instance.get(
      `/geocoding/v1/reverse?point.lat=${lat}&point.lon=${lon}&lang=en&size=1&layers=address`,
    );
    const json = await data.json();
    if (json?.features?.length === 0)
      return res.status(404).json({ message: "No results found." });
    return res.status(201).json({
      message: "Location fetched succesfully",
      data: normalizeData(json?.features),
    });
  } catch (error) {
    console.log("err", error);
    return res.status(400).json({ message: "Invalid coordinates!" });
  }
};

exports.getItineraryPlan = async (req, res) => {
  try {
    const query = gql`
      ${createQuery(req.body)}
    `;

    const responseData = await request(
      "/routing/v1/routers/hsl/index/graphql",
      query,
    );

    res.status(201).json({
      message: "Location fetched succesfully",
      data: responseData?.plan?.itineraries,
    });
  } catch (error) {
    console.log("err", error);
    return res.status(400).json({ message: "Failed to fetch location" });
  }
};
