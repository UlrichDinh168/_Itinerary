/** @format */
exports.replaceNonASCII = (str) => {
  if (typeof str !== 'string') return;
  // Replace non-ASCII characters with their ASCII equivalents
  return str.replace('/[^\x00-\x7F]/g', function (char) {
    switch (char.charCodeAt(0)) {
      case 8211:
        return '-';
      case 8212:
        return '--';
      case 8216:
      case 8217:
      case 8218:
        return "'";
      case 8220:
      case 8221:
      case 8222:
        return '"';
      case 8230:
        return '...';
      default:
        // Replace with the ASCII equivalent if available
        return char.normalize('NFKD').replace(/[\u0300-\u036F]/g, '');
    }
  });
};

exports.normalizeData = (json) => {
  return json.map((item) => {
    const id = item?.properties?.id;
    const labelNameArray = item?.properties?.label.split(', ');
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
