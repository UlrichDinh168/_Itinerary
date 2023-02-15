/** @format */

import React from "react";
import Itinerary from "./Itinerary";
import { useSelector } from "react-redux";
import { Loading } from '../../shared/Loading'
const Itineraries = () => {
  const itineraries = useSelector(
    (state: any) => state?.searchResult?.journeyPlanning,
  );

  const { origin, destination } = useSelector((state: any) => state?.itinerary);
  const { isLoading } = useSelector((state: any) => state?.searchResult)

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
      {isLoading ? <Loading /> : renderContent()}
    </div>
  );
};

export default Itineraries;