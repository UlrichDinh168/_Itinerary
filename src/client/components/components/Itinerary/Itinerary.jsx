/** @format */

import React, { useCallback } from "react";
import ItineraryOverview from "./ItineraryOverview";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import ItineraryDetails from "./ItineraryDetails";
import { useDispatch, useSelector } from "react-redux";
import { itineraryActions } from "../../actions";

const Itinerary = ({ itinerary }) => {
  const [isExpand, setIsExpand] = React.useState(false);
  const wrapperRef = React.useRef(null);
  const dispatch = useDispatch();

  useOnClickOutside(wrapperRef, () => {
    if (isExpand) {
      setIsExpand(false);
    }
  });

  const showRouteDetail = useCallback(
    (itinerary) => {
      console.log(itinerary, 'itinerary');
      setIsExpand(true);
      dispatch(itineraryActions.setSelectedItinerary(itinerary))
    },
    [],
  )


  return (
    <div className='itinerary' ref={wrapperRef} onClick={() => showRouteDetail(itinerary)}>
      <ItineraryOverview itinerary={itinerary} />
      <div className='itineraryDetails__container'>
        {isExpand &&
          itinerary?.legs.map((leg, index) => {
            const nextLeg = itinerary?.legs[index + 1];
            const isDestination = itinerary?.legs.length - 1;
            return (
              <ItineraryDetails
                key={index}
                leg={leg}
                nextLeg={nextLeg}
                isOrigin={index === 0}
                isDestination={index === isDestination}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Itinerary;
