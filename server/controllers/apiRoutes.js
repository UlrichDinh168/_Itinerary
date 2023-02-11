const { normalizeData, createQuery } = require("../utils/index.js");
const axios = require('axios')
const { request, gql } = require("graphql-request");

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "https://api.digitransit.fi/",
});

const name = async () => {
  const defaultData = await instance.get(
    `/geocoding/v1/search?text=${'majurinkatu'}&lang=en`,
  );

  console.log((defaultData), 'defaultData');
}

name()

exports.getAddressSearch = async (req, res) => {
  const data = req.body
  try {
    if (data.text?.length > 2) {
      const defaultData = await instance.get(
        `/geocoding/v1/search?text=${data.text}&lang=en&sources=oa%2Cosm%2Cnlsfi`,
      );

      const transportData = await instance.get(
        `/geocoding/v1/search?text=${data.text}&lang=en&sources=gtfsHSL%2CgtfsHSLlautta`,
      );

      const combinedData = [
        ...transportData?.features,
        ...defaultData?.features,
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
  const data = req.body
  try {
    const addressLookupData = await instance.get(
      `/geocoding/v1/reverse?point.lat=${data.lat}&point.lon=${data.lon}&lang=en&size=1&layers=address`,
    );
    if (addressLookupData?.features?.length === 0)
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
  const data = req.body
  try {
    const query = gql`
      ${createQuery(data)}
    `;

    const itineraryPlan = await instance.get(
      "/routing/v1/routers/hsl/index/graphql",
      query,
    );

    res.status(201).json({
      message: "Location fetched succesfully",
      data: itineraryPlan?.plan?.itineraries,
    });

  } catch (error) {
    console.log("err", error);
    return res.status(400).json({ message: "Failed to fetch location" });
  }
};
