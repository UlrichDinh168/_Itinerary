import React, { useCallback, useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hasInvalidValue } from "../../utils";
// import useOnClickOutside from "../../hooks/useOnClickOutside";
import SearchResults from "./SearchResults";
import Input from "../../shared/Input";
import {
  itineraryActions,
  notificationActions,
  searchResultActions,
} from "../../actions";
import { setOrigin, setDestination, setLoading } from '../../reducers/itineraries'
import { NOTIFICATION_TYPE } from "../../constants";
import { fetchAddressSearch, getAddressSearch, setJourneyPlanning } from "../../reducers/searchResult";

const Searchbar = ({ isOrigin }) => {
  const dispatch = useDispatch();

  const { origin, destination } = useSelector((state: any) => state?.itinerary);

  const { addressSearch } = useSelector((state: any) => state?.searchResult);
  const wrapperRef = useRef(null);

  const address = isOrigin ? origin : destination;
  const inputName = isOrigin ? "origin" : "destination";
  const inputLabel = isOrigin ? "Origin" : "Destination";
  const inputId = isOrigin ? "origin-input" : "destination-input";
  const inputPlaceholder = isOrigin ? "Majurinkatu 3C" : "Pasila Espoo";

  const [isFocus, setFocus] = useState(false);
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  console.log(input, 'input');
  console.log(searchResults, 'searchResults');

  const handleChange = (e: any) => {
    const { value } = e.target;
    setInput(value);
    // dispatch(getAddressSearch(value))
  };

  useEffect(() => {
    if (addressSearch?.length === 0) {
      setSearchResults([]);
    } else {
      setSearchResults(addressSearch);
    }
  }, [addressSearch]);

  useEffect(() => {
    if (input?.length === 0) return setSearchResults([]);

    if (input?.length > 2) {
      console.log('useEffect');
      fetchAddressSearch(input);

      // setTimeout(() => {
      //   fetchAddressSearch(input);
      // }, 500);
    }
  }, [input]);

  useEffect(() => {
    if (origin?.name === "" && destination?.name === "") {
      setJourneyPlanning([]);
    }
    if (origin?.name !== "" && destination?.name !== "") {
      setValue();
    }
  }, [origin, destination]);

  // const fetchSearchResults = async (value: any) => {
  //   try {
  //     console.log('here');
  //     // await dispatch(setLoading(true));
  //     await getAddressSearch(value);
  //   } catch (err) {
  //     console.log('2');

  //     setSearchResults([]);
  //     dispatch(
  //       notificationActions.showNotification({
  //         type: NOTIFICATION_TYPE.warning,
  //         message: err?.response?.data?.errors[0]?.message,
  //       }),
  //     );
  //   } finally {
  //     dispatch(setLoading(false));
  //   }
  // };

  const handleFocus = () => {
    setFocus(true);
    input !== "" ?? fetchAddressSearch(input);
  };

  const setAddress = useCallback(
    (payload: any) => {
      console.log(payload, 'payload');

      if (isOrigin) {
        setOrigin(payload);
      } else {
        setDestination(payload);
      }
    },
    [isOrigin],
  );

  const setValue = () => {
    if (isOrigin) {
      setInput(origin?.name);
    } else {
      setInput(destination?.name);
    }
  };

  const selectResult = (result: any) => {
    const cleanupResult = {
      name: result?.labelNameArray[0],
      lat: result?.coordinates?.lat,
      lon: result?.coordinates?.lon,
    };
    setAddress(cleanupResult);
    setInput(cleanupResult?.name);
    setFocus(false);
  };

  const handleReset = () => {
    setInput("");
    setAddress({ name: "", lat: 0.0, lon: 0.0 });
  };

  const handleBlur = () => {
    setFocus(false);
    if (!hasInvalidValue(address)) {
      setInput(address?.name);
    } else {
      setInput("");
      setAddress({
        name: "",
        lat: 0.0,
        lon: 0.0,
      });
    }
    // dispatch(getAddressSearch([]));
  };

  const onError = (error: any) => {
    let errors = "";
    switch (error.code) {
      case error.PERMISSION_DENIED:
        errors = "User denied the request for Geolocation.";
        break;
      case error.POSITION_UNAVAILABLE:
        errors = "Location information is unavailable.";
        break;
      case error.TIMEOUT:
        errors = "The request to get user location timed out.";
        break;
      case error.UNKNOWN_ERROR:
        errors = "An unknown error occurred.";
        break;
    }
    return dispatch(notificationActions.showNotification({ type: 'Error', message: errors }));
  };

  const onSuccess = async (pos: any) => {
    const { latitude, longitude } = pos?.coords;
    try {
      dispatch(setLoading(true));

      const res: any = await dispatch(
        searchResultActions.getAddressLookup(latitude, longitude),
      );
      const { labelNameArray, coordinates } = res.payload?.data?.data[0];
      setInput(labelNameArray[0]);
      setAddress({
        name: labelNameArray[0],
        lat: coordinates.lat,
        lon: coordinates.lon,
      });
    } catch (e) {
      dispatch(
        notificationActions.showNotification({
          type: 'Success',
          message: "Error occured",
        }),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const getGeolocation = () => {
    if (navigator?.geolocation) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "granted") {
          navigator.geolocation.getCurrentPosition(onSuccess);
        } else if (result.state === "prompt") {
          navigator.geolocation.getCurrentPosition(onSuccess, onError);
        } else if (result.state === "denied") {
          dispatch(
            notificationActions.showNotification({
              type: 'warning',
              message: "Please enable location on your browser",
            }),
          );
        }
      });
    } else {
      return dispatch(
        notificationActions.showNotification({
          type: 'error',
          message: "Cannot get location",
        }),
      );
    }
  };

  return (
    <div className='searchBar__container'>
      <Input
        id={inputId}
        label={inputLabel}
        placeholder={inputPlaceholder}
        reference={[wrapperRef]}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        name={inputName}
        value={input}
        focus={isFocus}
        handleClickInputIcon={handleReset}
      />

      {isFocus ? (
        <SearchResults
          inputId={inputId}
          isOrigin={isOrigin}
          searchValue={input}
          searchResults={searchResults}
          selectResult={selectResult}
          getGeolocation={getGeolocation}
        />
      ) : null}
    </div>
  );
};

export default Searchbar;
