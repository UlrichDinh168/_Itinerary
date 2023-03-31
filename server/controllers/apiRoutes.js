const { normalizeData, createQuery } = require("../utils/index.js");
const axios = require('axios')
const { request, gql } = require("graphql-request");

const instance = axios.create({
  baseURL: 'http://api.digitransit.fi',
});


exports.getAddressSearch = async (req, res) => {
  const text = req.body
  try {
    if (text.data?.length > 2) {
      const value = text.data?.length < 5 ? text.data : text.data.slice(0, 3)
      const defaultData = await instance.get(
        `/geocoding/v1/search?text=${value}&lang=en&sources=oa%2Cosm%2Cnlsfi`,
      );
      const transportData = await instance.get(
        `/geocoding/v1/search?text=${value}&lang=en&sources=gtfsHSL%2CgtfsHSLlautta`,
      );

      const combinedData = [
        ...transportData?.data?.features,
        ...defaultData?.data?.features,
      ];

      if (combinedData.length === 0)
        return res.status(404).json({ message: "No results found!" });

      return res.status(200).json({
        message: "Data fetched succesfully",
        routes: normalizeData(combinedData),
      });
    }
  } catch (error) {
    console.log("err", error);
    return res.status(400).json({ message: "Failed to fetch data" });
  }
};

exports.getAddressLookup = async (req, res) => {
  const data = req.body
  console.log(data, 'data');
  try {
    const addressLookupData = await instance.get(
      `/geocoding/v1/reverse?point.lat=${data.data.latitude}&point.lon=${data.data.longitude}&lang=en&size=1&layers=address`,
    );

    if (addressLookupData?.data?.features?.length === 0)
      return res.status(404).json({ message: "No results found." });

    return res.status(200).json({
      message: "Location fetched succesfully",
      route: normalizeData(addressLookupData?.data?.features),
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
      ${createQuery(data.data)}
    `;

    const itineraryPlan = await request("https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql", query)
    res.status(200).json({
      message: "Location fetched succesfully",
      journeys: itineraryPlan?.plan?.itineraries,
    });

  } catch (error) {
    console.log("err", error);
    return res.status(400).json({ message: "Failed to fetch location" });
  }
};
