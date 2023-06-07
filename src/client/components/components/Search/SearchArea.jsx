/** @format */

import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import MaterialUIPickers from "../../shared/DateTimePicker";
import {
  itineraryActions,
  searchResultActions,
} from "../../actions";
import Searchbar from "./Searchbar";
import { hasInvalidValue } from "../../utils";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export const SearchArea = () => {

  const dispatch = useDispatch();
  const itineraries = useSelector((state) => state.itinerary);
  const defaultDateTime = moment().format('YYYY-MM-DD HH:mm:ss');

  const currentDate = moment().format("YYYY-MM-DD");
  const currentTime = moment().format("HH:mm:ss");

  const { dateTime, destination, origin } = itineraries;

  const handleSearch = useCallback(async (origin, destination, dateTime) => {

    const date = moment(dateTime).format("YYYY-MM-DD");
    const time = moment(dateTime).format("HH:mm:ss");
    const returnData = {
      origin: {
        lat: origin?.lat,
        lon: origin?.lon,
      },
      destination: {
        lat: destination?.lat,
        lon: destination?.lon,
      },
      date: isEmpty(dateTime) ? currentDate : date,
      time: isEmpty(dateTime) ? currentTime : time,
    };
    try {
      await dispatch(itineraryActions.setLoading(true));
      if (!hasInvalidValue(origin) && !hasInvalidValue(destination)) {
        await dispatch(searchResultActions.getJourneyPlanning(returnData));
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(itineraryActions.setLoading(false));
    }
  }, [currentDate, currentTime, dispatch]);


  React.useEffect(() => {
    handleSearch(origin, destination, dateTime);
  }, [dateTime, destination, origin,]);

  const isEmpty = (value) => {
    return !value;
  };

  const handleSetDateTime = (value) => {
    dispatch(itineraryActions.setDateTime(value.$d));
  };

  const setCurrentTime = () => {
    dispatch(itineraryActions.setDateTime(defaultDateTime));
  };

  return (
    <div className='searchArea'>
      <div className='searchArea__form'>
        <div className='searchArea__form--container'>
          <Searchbar isOrigin={true} />
          <Searchbar isOrigin={false} />
        </div>
        <div className='searchArea__dateTime'>
          <MaterialUIPickers
            value={dateTime !== "" ? dateTime : defaultDateTime}
            onChange={handleSetDateTime}
          />
          <div className='setCurrentTime' onClick={setCurrentTime}>
            <AccessTimeIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchArea;
