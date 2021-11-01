/** @format */

export const setupQuery = (value) => {
  return `
    {
      plan(
        from: {lat: ${value.origin["lat"]}, lon: ${value.origin["lon"]}},
        to: {lat: ${value.destination["lat"]}, lon: ${value.destination["lon"]}},
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
};
