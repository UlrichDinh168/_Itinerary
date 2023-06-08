import React from 'react';
import { MODE } from '../constants';

export const simplifyResJson = (json) => {
  return json.map((item) => {
    const id = item?.properties?.id;
    const labelArray = item?.properties?.label.split(', ');
    return {
      id,
      labelArray,
      layer: item?.properties?.layer,
      coordinates: {
        lat: item?.geometry?.coordinates[1],
        lon: item?.geometry?.coordinates[0],
      },
    };
  });
};

export const hasInvalidValue = (value) => {
  return (
    value === null || // check for null
    value === undefined || // check for undefined
    value === '' || // check for empty string
    (Array.isArray(value) && value.length === 0) || // check for empty array
    (typeof value === 'object' &&
      Object.values(value).some(
        (item) => item === '' || item === null || item === undefined
      )) // check for empty object
  );
};

export const renderBandColor = (mode) => {
  switch (mode) {
    case MODE.BUS:
      return '#007ac9';
    case MODE.TRAM:
      return 'green';
    case MODE.RAIL:
      return '#8c4799';
    case MODE.SUBWAY:
      return 'rgb(255 72 0)';
    default:
      return '#ddd';
  }
};

export const renderIcon = (mode) => {
  let icon = '';
  switch (mode) {
    case MODE.BUS:
      icon = 'directions_bus';
      break;
    case MODE.TRAM:
      icon = 'tram';
      break;
    case MODE.RAIL:
      icon = 'train';
      break;
    case MODE.SUBWAY:
      icon = 'directions_subway';
      break;
    default:
      icon = 'directions_walk';
  }
  return <span className="material-icons">{icon}</span>;
};

export const convertMinToHour = (time) => {
  if (time < 3600) {
    return `${Math.ceil(time / 60)} min`;
  } else {
    const hour = Math.floor(time / 3600);
    const min = Math.ceil((time % 3600) / 60);
    return `${hour} h ${min} min`;
  }
};
