/** @format */

import React from "react";
import { MODE } from "../../constants";
import moment from "moment";
import { convertMinToHour, renderIcon } from "../../utils";
import FiberManualRecordOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined";

const ItineraryDetails = ({ leg, isOrigin, isDestination }) => {
  const { endTime, mode, startTime, duration, ...rest } = leg;
  const renderTime = (startTime, endTime, duration) => {
    return (
      <div className='timeBox__container'>
        {moment(startTime).format("HH:mm")} -{moment(endTime).format("HH:mm")}{" "}
        <span>({convertMinToHour(duration)})</span>
      </div>
    );
  };

  const renderMode = (mode) => {
    const renderLineByMode = (mode) => {
      let lineType = "";
      switch (mode) {
        case MODE.BUS:
          lineType = "bus";
          break;
        case MODE.TRAM:
          lineType = "tram";
          break;
        case MODE.RAIL:
          lineType = "train";
          break;
        case MODE.SUBWAY:
          lineType = "subway";
          break;
        default:
          lineType = "walk";
      }
      return <div className={`leg-before-line ${lineType}`}></div>;
    };

    return (
      <div className='modeBox__container'>
        {isOrigin ? (
          <span className={"material-icons top"} style={{ color: "#10de2b" }}>
            room_icon
          </span>
        ) : (
          <FiberManualRecordOutlinedIcon className={"material-icons middle"} />
        )}
        {renderLineByMode(mode)}
        {isDestination ? (
          <span
            className={"material-icons bottom"}
            style={{ color: "rgb(255 72 0" }}>
            room_icon
          </span>
        ) : null}
      </div>
    );
  };

  const renderModeDetail = (mode, props) => {
    const name = props?.from.name;
    const code = props?.from.stop?.code;
    const distance = props?.distance;
    const zoneId = props?.from.stop?.zoneId;
    const trip = props?.trip;
    const routeShortName = trip?.routeShortName;
    const tripHeadsign = trip?.tripHeadsign;

    return (
      <div className='modeDetails__container'>
        <h3 style={{ top: "-35px", left: "27px" }}>
          {name}

          {code && <span className='label'>{code}</span>}
          {zoneId && <span className='label'>{zoneId}</span>}
        </h3>

        <div className='modeDetails'>
          {renderTime(startTime, endTime, duration)}
          {!trip ? (
            <span className='modeDetails__container--details'>
              <span className='label'>
                {" "}
                {renderIcon(mode)} Walk {Math.ceil(distance)} m
              </span>
            </span>
          ) : (
            <span className='modeDetails__container--details'>
              <span>{renderIcon(mode)}</span>
              <span className='label'> {routeShortName}</span>
              <span className='label'> {tripHeadsign}</span>
            </span>
          )}
        </div>
        {isDestination && <h3 className='destinationLabel'>Destination</h3>}
      </div>
    );
  };

  const renderLeg = () => {
    return (
      <div className='itineraryDetails'>
        {renderMode(mode, startTime)}
        {renderModeDetail(mode, rest)}
      </div>
    );
  };
  return <React.Fragment>{renderLeg()}</React.Fragment>;
};

export default ItineraryDetails;
