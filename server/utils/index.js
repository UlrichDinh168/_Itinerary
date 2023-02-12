exports.normalizeData = (json) => {
  return json.map((item) => {
    const id = item?.properties?.id;
    // const labelNameArray = item?.properties?.label.split(", ");
    const labelNameArray = item?.properties?.label;
    return {
      id,
      labelNameArray,
      layer: item?.properties?.layer,
      coordinates: {
        lat: item?.geometry?.coordinates[1],
        lon: item?.geometry?.coordinates[0],
      },
    };
  });
};

exports.createQuery = (value) =>
  `
    {
      plan(
        from: {lat: ${value.origin.lat}, lon: ${value.origin.lon}},
        to: {lat: ${value.destination.lat}, lon: ${value.destination.lon}},
        numItineraries: 5,
        date: "${value.date}",
        time: "${value.time}",
      ) {
        itineraries {
          duration
          walkDistance
          startTime
          endTime
          fares {
            type
            cents
            currency
          }
          legs {
            mode
            startTime
            endTime
            duration
            distance
            trip {
              tripHeadsign
              routeShortName
            }
            from {
              lat
              lon
              name
              stop {
                code
                name
                zoneId
              }
            }
            to {
              lat
              lon
              name
              stop {
                code
                name
                zoneId
              }
            }
            legGeometry {
              length
              points
            }
          }
        }
      }
    }`;
