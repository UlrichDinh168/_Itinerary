// let map = L.map('map', {
//   layers: MQ.mapLayer(),
//   center: [35.791188, -78.636755],
//   zoom: 12
// });


// function runDirection(start, end) {

//   // recreating new map layer after removal
//   map = L.map('map', {
//     layers: MQ.mapLayer(),
//     center: [35.791188, -78.636755],
//     zoom: 12
//   });

//   var dir = MQ.routing.directions();

//   dir.route({
//     locations: [
//       start,
//       end
//     ]
//   });


//   CustomRouteLayer = MQ.Routing.RouteLayer.extend({
//     createStartMarker: (location) => {
//       var custom_icon;
//       var marker;

//       custom_icon = L.icon({
//         iconUrl: 'img/red.png',
//         iconSize: [20, 29],
//         iconAnchor: [10, 29],
//         popupAnchor: [0, -29]
//       });

//       marker = L.marker(location.latLng, { icon: custom_icon }).addTo(map);

//       return marker;
//     },

//     createEndMarker: (location) => {
//       var custom_icon;
//       var marker;

//       custom_icon = L.icon({
//         iconUrl: 'img/blue.png',
//         iconSize: [20, 29],
//         iconAnchor: [10, 29],
//         popupAnchor: [0, -29]
//       });

//       marker = L.marker(location.latLng, { icon: custom_icon }).addTo(map);

//       return marker;
//     }
//   });

//   map.addLayer(new CustomRouteLayer({
//     directions: dir,
//     fitBounds: true
//   }));
// }





// export { }