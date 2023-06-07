/** @format */

import React from "react";
import { useSelector } from "react-redux";
import SearchArea from "./Search/SearchArea";
import Itineraries from "./Itinerary/Itineraries";
import Loading from "../shared/Loading";
import Mapbox from './Map'



const Container = () => {
  const loading = useSelector((state) => state.itinerary.loading);

  return (
    <div className='main__layout'>
      <div className="main__layout-left">
        <h1> Itineraries Planning</h1>
        <div className='main__content'>
          <SearchArea />

          {loading ? <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Loading />
          </div> : <Itineraries />}
        </div>
      </div>
      <div className="main__layout-right">
        <Mapbox />
      </div>
    </div>
  );
};

export default Container;
