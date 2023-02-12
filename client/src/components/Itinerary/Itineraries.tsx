/** @format */

import React from "react";
import Itinerary from "./Itinerary";
import { useSelector } from "react-redux";

const Itineraries = () => {
  const itineraries = useSelector(
    (state: any) => state.searchResult.journeyPlanning.data.data,
  );

  const { origin, destination } = useSelector((state: any) => state?.itinerary);

  const [updatedItineraries, setUpdatedItineraries] =
    React.useState(itineraries);

  React.useEffect(() => {
    setUpdatedItineraries(itineraries);
  }, [itineraries, origin, destination]);

  const renderContent = () => {
    if (updatedItineraries?.length === 0) return <p style={{ textAlign: "center" }}>No results</p>
    return updatedItineraries?.map((itinerary: [], i: number) => <Itinerary key={i} itinerary={itinerary} />)
  }

  return (
    <div className='itineraries'>
      {renderContent()}
    </div>
  );
};

export default Itineraries;
