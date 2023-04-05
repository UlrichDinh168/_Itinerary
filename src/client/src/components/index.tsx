/** @format */

import React from "react";
import { useSelector } from "react-redux";
import SearchArea from "./Search/SearchArea";
import Itineraries from "./Itinerary/Itineraries";
import { Loading } from "../shared/Loading";

export const Container = (): JSX.Element => {
  const loading = useSelector((state: any) => state.searchResult.isLoading);
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

