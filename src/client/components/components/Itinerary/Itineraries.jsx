/** @format */

import React from "react";
import Itinerary from "./Itinerary";
import { useSelector } from "react-redux";

const Itineraries = () => {
  const itineraries = useSelector(
    (state) => state.searchResult.journeyPlanning,
  );
  const { origin, destination } = useSelector((state) => state?.itinerary);


  const [updatedItineraries, setUpdatedItineraries] =
    React.useState(itineraries);

  React.useEffect(() => {
    setUpdatedItineraries(itineraries);
  }, [itineraries, origin, destination]);

  return (
    <div className='itineraries'>
      {updatedItineraries?.map((itinerary, i) => {
        return <Itinerary key={i} itinerary={itinerary} />;
      })}
      {updatedItineraries.length === 0 ? (
        <p style={{ textAlign: "center" }}>No results</p>
      ) : null}
    </div>
  );
};

export default Itineraries;
