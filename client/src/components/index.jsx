/** @format */

import React from "react";
import { useSelector } from "react-redux";
import SearchArea from "./Search/SearchArea";
import Itineraries from "./Itinerary/Itineraries";
import Loading from "../shared/Loading";

const Container = () => {
  const loading = useSelector((state) => state.itinerary.loading);

  return (
    <div className='main__layout'>
      <h1> Itineraries Planning</h1>
      <div className='main__content'>
        <SearchArea />

        {loading ? <Loading /> : <Itineraries />}
      </div>
    </div>
  );
};

export default Container;
