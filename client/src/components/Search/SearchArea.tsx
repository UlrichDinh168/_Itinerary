
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import CustomizedDateTimePicker from "../../shared/DateTimePicker";
import {
  itineraryActions,
  notificationActions,
  searchResultActions,
} from "../../actions";
import Searchbar from "./Searchbar";
import { hasInvalidValue, isEmpty } from "../../utils";
import { NOTIFICATION_TYPE } from "../../constants";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { setLoading, setDateTime, setDestination, setOrigin } from "../../reducers/itineraries";
import { fetchJourneyPlanning } from "../../reducers/searchResult";
import { showNotification } from "../../reducers/notification";

export const SearchArea = () => {

  const dispatch = useDispatch();
  const itinerary = useSelector((state: any) => state.itinerary);
  // console.log(itinerary, 'itinerary');

  const defaultDateTime = moment().toLocaleString();

  const currentDate = moment().format("YYYYMMDD");
  const currentTime = moment().format("HH:mm:ss");

  const { dateTime, destination, origin } = itinerary;

  React.useEffect(() => {
    handleSearch(origin, destination, dateTime);
  }, [dateTime, destination, origin]);

  const handleSetDateTime = (value: string) => {
    dispatch(setDateTime(value));
  };

  const setCurrentTime = () => {
    dispatch(setDateTime(defaultDateTime));
  };

  const handleSearch = async (origin: any, destination: any, dateTime: any) => {
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
      setLoading(true);
      if (!hasInvalidValue(origin) && !hasInvalidValue(destination)) {
        await dispatch(fetchJourneyPlanning(returnData));
      }
    } catch (err) {
      // dispatch(
      //   showNotification({
      //     type: NOTIFICATION_TYPE.warning,
      //     message: err?.response?.data?.errors[0]?.message,
      //   }),
      // );
    } finally {
      // setLoading(false);
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
