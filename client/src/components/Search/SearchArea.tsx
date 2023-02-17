
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import CustomizedDateTimePicker from "../../shared/DateTimePicker";

import Searchbar from "./Searchbar";
import { hasInvalidValue, isEmpty } from "../../utils";
import { NOTIFICATION_TYPE } from "../../constants";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { setDateTime } from "../../reducers/itineraries";
import { fetchJourneyPlanning } from "../../reducers/searchResult";
import { showNotification } from "../../reducers/notification";
import { setIsloading } from '../../reducers/searchResult'

export const SearchArea = () => {

  const dispatch = useDispatch();
  const defaultDateTime: string = moment().toLocaleString();
  const currentDate: string = moment().format("YYYYMMDD");
  const currentTime: string = moment().format("HH:mm:ss");

  const { dateTime, destination, origin } = useSelector((state: any) => state.itinerary);

  React.useEffect(() => {
    handleSearch(origin, destination, dateTime);
  }, [dateTime, destination, origin]);

  const handleSetDateTime = (value: string): void => {
    dispatch(setDateTime(value));
  };

  const setCurrentTime = (): void => {
    dispatch(setDateTime(defaultDateTime));
  };

  const handleSearch = async (origin: Record<string, any>, destination: Record<string, any>, dateTime: string) => {
    const date = moment(dateTime).format("YYYYMMDD");
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
      if (!hasInvalidValue(origin?.name) && !hasInvalidValue(destination?.name)) {
        dispatch(setIsloading(true));
        await dispatch(fetchJourneyPlanning(returnData)).then(() => {
          dispatch(setIsloading(false));

        });
      }
      return
    } catch (err) {
      dispatch(
        showNotification({
          type: NOTIFICATION_TYPE.warning,
          message: err,
        }),
      );
    }
  };

  return (
    <div className='searchArea'>
      <div className='searchArea__form'>
        <div className='searchArea__form--container'>
          <Searchbar isOrigin={true} />
          <Searchbar isOrigin={false} />
        </div>
        <div className='searchArea__dateTime'>
          <CustomizedDateTimePicker
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
