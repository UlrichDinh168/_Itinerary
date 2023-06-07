import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import polyline from '@mapbox/polyline'
import 'mapbox-gl/dist/mapbox-gl.css';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from "uuid";
import { itineraryActions } from '../actions';

const VITE_MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN
mapboxgl.accessToken = `${VITE_MAPBOX_TOKEN}`


export default function App() {
  const journeyPlanning = useSelector((state) => state.searchResult.journeyPlanning);
  const dispatch = useDispatch();

  const { legs } = useSelector(state => state?.itinerary?.itinerary) || []
  // console.log(polylines, 'polylines');
  const { destination, origin } = useSelector(state => state.itinerary)

  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  const [zoom, setZoom] = useState(11);
  const [layerIds, setLayerIds] = useState([]);
  const [markers, setMarkers] = useState([])

  const legGeometries = legs?.map(item => {
    const coordinates = polyline.toGeoJSON(item.legGeometry.points)
    const type = item.mode
    // const originCoords = [origin?.lon, origin?.lat]
    // const destinationCoords = [destination?.lon, destination?.lat]
    return { coordinates, type }
  })

  console.log(legGeometries, 'legGeometries');

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [24.82438, 60.21079],
        zoom: zoom
      });
    } // initialize map only once

    console.log(journeyPlanning, 'journeyPlanning');
    if (journeyPlanning.length > 0) {

      dispatch(itineraryActions.setSelectedItinerary(journeyPlanning[0]))

    }

    // return () => {
    //   mapRef.current.remove();
    // };
  }, [journeyPlanning]);


  useEffect(() => {
    // Create a new marker.
    let originMarker
    let destinationMarker
    const newMarkers = [];



    if (origin && origin.name && destination && destination.name) {

      originMarker = new mapboxgl.Marker({
        color: "green",
      })
        .setLngLat([origin?.lon, origin?.lat])
        .addTo(mapRef.current);

      destinationMarker = new mapboxgl.Marker({
        color: "red",
      })
        .setLngLat([destination?.lon, destination?.lat])
        .addTo(mapRef.current);

      // if (originMarker.current && destinationMarker.current) {
      //   markers.map(item => { item.current.remove() })

      //   console.log(originMarker, 'originMarker');
      //   console.log(destinationMarker, 'destinationMarker');
      //   newMarkers.push(originMarker)
      //   newMarkers.push(destinationMarker)
      //   setMarkers(newMarkers)
      // }

      // Remove markers when no routes are selected
      if ((!origin || !origin.name) && (!destination || !destination.name)) {
        if (originMarker) {
          originMarker.remove();
        }
        if (destinationMarker) {
          destinationMarker.remove();
        }
      }

      return () => {
        if (originMarker) {
          originMarker.remove();
        }
        if (destinationMarker) {
          destinationMarker.remove();
        }
      };

      console.log(markers, 'markers');

      // return () => {
      //   originMarker.remove()
      //   destinationMarker.remove()
      // }
    }

  }, [origin, destination, legs, journeyPlanning])

  // console.log(journeyPlanning, 'journeyPlanning');

  useEffect(() => {
    if (mapRef.current) {

      if (!mapRef.current.loaded()) return;

      const newLayerIds = [];
      layerIds.map(item => { mapRef.current.removeLayer(item) })


      legGeometries.forEach((legGeometry) => {
        const { coordinates, type } = legGeometry;

        const layerId = `${type}_layer_${uuidv4()}`;
        const sourceId = `${type}_source_${uuidv4()}`;

        // Create a GeoJSON source for the leg geometry
        mapRef.current.addSource(sourceId, {
          type: 'geojson',
          data: coordinates,
        });

        // Add a layer to the map for the leg geometry
        mapRef.current.addLayer({
          id: layerId,
          type: 'line',
          source: sourceId,
          paint: {
            'line-color': type === 'WALK' ? 'gray' : type === 'BUS' ? 'rgb(0, 122, 201)' : 'rgb(140, 71, 153)',
            'line-width': 6,
          },
        });

        newLayerIds.push(layerId);

        // Update the layer IDs
        setLayerIds(newLayerIds);
      });
      console.log(layerIds, 'layerIds');
    }
  }, [legs]);

  const focusMap = () => {
    if (origin && destination) {
      const bounds = [[origin.lon, origin.lat], [destination.lon, destination.lat]];
      const center = [(origin.lon + destination.lon) / 2, (origin.lat + destination.lat) / 2];
      const padding = 50; // Adjust the padding as needed
      // const zoom = calculateZoomLevel(bounds, padding);

      console.log(bounds, 'bounds');
      console.log(zoom, 'zoom');

      mapRef.current.fitBounds(bounds, { padding });
      mapRef.current.setCenter(center);
      // mapRef.current.setZoom(zoom);

    }
  };

  useEffect(() => {
    if (origin?.name && destination?.name) {
      focusMap();
    }
  }, [legs]);

  return (
    <div ref={mapContainer} className="map-container" />
  );
}

