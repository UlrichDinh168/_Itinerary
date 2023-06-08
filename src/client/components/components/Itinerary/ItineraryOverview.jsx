/** @format */

import React from 'react';
import moment from 'moment';
import { renderIcon, convertMinToHour, renderBandColor } from '../../utils';

const ItineraryOverview = ({ itinerary }) => {
  const { duration, endTime, fares, legs, startTime, walkDistance } = itinerary;

  const renderDuration = () => {
    const start = moment(startTime).format('HH:mm');
    const end = moment(endTime).format('HH:mm');
    const total = convertMinToHour(duration);

    return (
      <div className="itinerary__duration">
        <span>
          {start} - {end}
        </span>
        <span>{total}</span>
      </div>
    );
  };

  const renderTripNumber = (leg) => {
    const line = leg?.trip;
    if (line) return <span className="tripNumber">{line.routeShortName}</span>;
    return;
  };
  const zonesTo = legs?.map((leg) => leg?.to?.stop?.zoneId);
  const zonesFrom = legs?.map((leg) => leg?.from?.stop?.zoneId);
  const zones = [...zonesTo, ...zonesFrom];

  const renderRouteIds = () => {
    let zoneIds = [];

    // [...zonesTo, ...zonesFrom];
    // const zoneIds = [...new Set([...zonesTo, ...zonesFrom])];
    // return zoneIds.filter((item) => item !== undefined).sort();
    zones?.forEach((item) => {
      if (!zoneIds.includes(item) && item !== undefined)
        return zoneIds.push(item);
    });
    return (
      <span className="routes">
        {zoneIds
          ? zoneIds.sort().map((zoneId, i) => <span key={i}>{zoneId}</span>)
          : null}
      </span>
    );
  };

  const routeDetails = () => {
    const distanceWalking = Math.ceil(walkDistance);
    const fare = fares ? fares[0].cents / 100 : 0;

    return (
      <div className="tripDetails__container">
        <span className="walkDistance">
          <span className="material-icons">directions_walk</span>{' '}
          {distanceWalking} m
        </span>{' '}
        |<span> € {fare}</span> |
        {zones && <React.Fragment> {renderRouteIds()} </React.Fragment>}
      </div>
    );
  };

  const renderLegs = () => {
    return (
      <div className="legs">
        {legs.map((leg, i) => {
          const mode = leg.mode;
          return i === leg.length - 1 ? null : (
            <div
              className="band"
              key={i}
              style={{
                width: `${(leg.duration / duration) * 100}%`,
                backgroundColor: `${renderBandColor(leg.mode)}`,
              }}
            >
              <div
                className="band__item"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                {renderIcon(mode)}
                {renderTripNumber(leg)}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="routesSummary">
      {renderDuration()}
      {renderLegs()}
      {routeDetails()}
    </div>
  );
};

export default ItineraryOverview;
