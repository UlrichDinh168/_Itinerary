/** @format */

// /** @format */

// import React from "react";
// import {
//   MapContainer as LeafletMap,
//   TileLayer,
//   Marker,
//   Popup,
//   Polyline,
// } from "react-leaflet";
// import { useDispatch, useSelector } from "react-redux";
// import { renderBandColor } from "../../utils";

// const RouteMap = () => {
//   const itinerary = useSelector((state) => state.itinerary.itinerary);
//   console.log("=>>itinerary", itinerary);

//   const getStartEndPoints = () => {
//     let start = [];
//     let end = [];

//     itinerary?.legs.map((item, i) => {
//       const { from, to } = item;
//       if (i === 0) return (start = [from?.lat, from?.lon]);
//       if (i === itinerary.legs.length - 1) return (end = [to?.lat, to?.lon]);
//     });
//     return { start, end };
//   };

//   console.log(getStartEndPoints().start);
//   return (
//     <LeafletMap
//       boundsOptions={{ padding: [50, 50] }}
//       maxZoom={18}
//       // bounds={bounds}

//       scrollWheelZoom={true}
//       zoomControl={true}
//       doubleClickZoom={true}
//       dragging={true}
//       attributionControl={true}
//       animate={true}
//       easeLinearity={0.35}
//       tileSize={512}>
//       <TileLayer
//         attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a>'
//         url='https://cdn.digitransit.fi/map/v1/hsl-map/{z}/{x}/{y}.png'
//       />
//       <Marker position={[60.220032, 24.742476]}>
//         <Popup>Start location</Popup>
//       </Marker>
//       <Marker position={[60.220032, 24.742476]}>
//         <Popup>End location</Popup>
//       </Marker>
//       <Polyline
//         // dashArray={"5"}
//         // positions={decodeRoute("avpnJem_vCg@F}@FiA?c@Ge@WUUIKCJEPERk@w@")}
//         color={renderBandColor("WALK")}
//       />
//     </LeafletMap>
//   );
// };

// export default RouteMap;
