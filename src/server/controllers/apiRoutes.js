const { normalizeData, createQuery } = require("../utils/index.js");
const { API_URL } = require("../constants.js")
const axios = require('axios')
const { replaceNonASCII } = require("../utils/index.js");
// const path = __dirname + '/../../../.env'
// console.log(path, '__dirname');
require('dotenv').config()


const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'digitransit-subscription-key': process.env.REACT_APP_HSL_KEY,
  },
});

// (console.log(process.env), 'console.log(process.env)');
exports.getAddressSearch = async (req, res) => {
  try {
    const text = req?.body?.value
    const removedNonASCII = replaceNonASCII(text)

    if (text.length < 2) return

    if (text.length > 2) {
      const defaultData = await instance.get(
        `/geocoding/v1/search?text=${removedNonASCII}&lang=en&sources=oa%2Cosm%2Cnlsfi`,
      );

      const transportData = await instance.get(
        `/geocoding/v1/search?text=${removedNonASCII}&lang=en&sources=gtfsHSL%2CgtfsHSLlautta`,
      );

      const combinedData = [
        ...transportData?.data?.features,
        ...defaultData?.data?.features,
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
    const data = await instance.get(
      `/geocoding/v1/reverse?point.lat=${lat}&point.lon=${lon}&lang=fi&size=1&layers=address`,
    );
    const resp = await data?.data?.features
    if (resp.length === 0)
      return res.status(404).json({ message: "No results found." });
    return res.status(201).json({
      message: "Location fetched succesfully",
      data: normalizeData(resp),
    });
  } catch (error) {
    console.log("err", error);
    return res.status(400).json({ message: "Invalid coordinates!" });
  }
};

exports.getItineraryPlan = async (req, res) => {
  try {
    const query = `
      ${createQuery(req.body)}
    `;

    const instance = await axios({
      method: 'post',
      url: `${API_URL}/routing/v1/routers/hsl/index/graphql`,
      headers: {
        'Content-Type': 'application/graphql',
        'digitransit-subscription-key': process.env.REACT_APP_HSL_KEY,
      },
      data: query
    });

    res.status(201).json({
      message: "Location fetched succesfully",
      data: instance?.data?.data?.plan?.itineraries,
    });
  } catch (error) {
    console.log("err", error);
    return res.status(400).json({ message: "Failed to fetch itinerary" });
  }
};
