import React, { useCallback, useState, useRef, useEffect } from "react";
import { useSelector, } from "react-redux";
import { debounce, } from "../../utils";
// import useOnClickOutside from "../../hooks/useOnClickOutside";
import SearchResults from "./SearchResults";
import Input from "../../shared/Input";
import { useAppDispatch } from '../../store'
import { setOrigin, setDestination } from '../../reducers/itineraries'
import { fetchAddressLookup, fetchAddressSearch, fetchJourneyPlanning, setIsloading } from "../../reducers/searchResult";
import { showNotification } from "../../reducers/notification";

const Searchbar = ({ isOrigin }) => {
  const dispatch = useAppDispatch();

  const { origin, destination } = useSelector((state: any) => state?.itinerary);
  const { isLoading } = useSelector((state: any) => state?.searchResult?.isLoading);

  const { addressSearch } = useSelector((state: any) => state?.searchResult);

  const originRef = useRef<HTMLInputElement | null>(null)
  const destRef = useRef<HTMLInputElement | null>(null)

  const address = isOrigin ? origin : destination;
  const inputName = isOrigin ? "origin" : "destination";
  const inputLabel = isOrigin ? "Origin" : "Destination";
  const inputId = isOrigin ? "origin-input" : "destination-input";
  const inputPlaceholder = isOrigin ? "Majurinkatu 3C" : "Pasila Espoo";
  const inputRef = isOrigin ? originRef : destRef

  const [isFocus, setIsFocus] = useState(false);
  const [input, setInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e: any) => {
    const { value } = e.target;
    setInput(value);
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
      handleFetch(input)
    }
  }, [input]);

  useEffect(() => {
    if (origin?.name === "" || destination?.name === "") {
      dispatch(fetchJourneyPlanning([]));
    }
    if (origin?.name !== "" && destination?.name !== "") {
      setValue();
    }
  }, [origin, destination]);

  const handleFetch = (params: any) => {
    if (params?.length > 2) return debounce(dispatch(fetchAddressSearch(params)), 500)
  }

  const handleFocus = () => {
    setIsFocus(true);
    isOrigin ? handleFetch(origin?.name) : handleFetch(destination?.name)
  };

  const setAddress = useCallback(
    (payload: any) => {
      console.log(isOrigin, 'isOrigin');

      if (isOrigin) {
        dispatch(setOrigin(payload));
      } else {
        dispatch(setDestination(payload));
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
      name: result?.labelNameArray,
      lat: result?.coordinates?.lat,
      lon: result?.coordinates?.lon,
    };
    setAddress(cleanupResult);
    setValue()
  };

  const handleReset = () => {
    const searchValue = isOrigin ? origin?.name : destination?.name
    setIsFocus(true)
    setInput("");
    searchValue.length > 2 && handleFetch(searchValue)
    inputRef.current?.focus()
  };

  const handleBlur = () => {
    setIsFocus(false);
    isOrigin ? setInput(origin?.name) : setInput(destination?.name)
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
    return dispatch(showNotification({ type: 'error', message: errors }));
  };

  const onSuccess = async (position: any) => {
    const { latitude, longitude } = position?.coords;
    console.log(latitude, longitude, 'position');

    try {
      const res: any = await dispatch(fetchAddressLookup(latitude, longitude));
      console.log(res, 'res');

      const { labelNameArray, coordinates } = res.data?.data[0];
      setInput(labelNameArray);
      setAddress({
        name: labelNameArray,
        lat: coordinates.lat,
        lon: coordinates.lon,
      });
      handleFetch(labelNameArray)
    } catch (e) {
      dispatch(
        dispatch(showNotification({
          type: 'error',
          message: e,
        })),
      );
    }
  };

  const getGeolocation = () => {
    if (navigator?.geolocation) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {

        console.log(result, 'result');

        if (result.state === "granted") {
          navigator.geolocation.getCurrentPosition(onSuccess);
        } else if (result.state === "prompt") {
          navigator.geolocation.getCurrentPosition(onSuccess, onError);
        } else if (result.state === "denied") {
          dispatch(
            showNotification({
              type: 'warning',
              message: "Please enable location on your browser",
            }),
          );
        }
      });
    } else {
      return dispatch(
        showNotification({
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
        reference={inputRef}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoFocus={isFocus}
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
