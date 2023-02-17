import React, { useCallback, useState, useRef, useEffect } from "react";
import { useSelector, } from "react-redux";
import { debounce, } from "../../utils";
// import useOnClickOutside from "../../hooks/useOnClickOutside";
import SearchResults from "./SearchResults";
import Input from "../../shared/Input";
import { useAppDispatch } from '../../store'
import { setOrigin, setDestination } from '../../reducers/itineraries'
import { fetchAddressLookup, fetchAddressSearch, setDestinationAddressSearch, setIsloading, setOriginAddressSearch } from "../../reducers/searchResult";
import { showNotification } from "../../reducers/notification";

const Searchbar = ({ isOrigin }) => {
  const dispatch = useAppDispatch();

  const { origin, destination } = useSelector((state: any) => state?.itinerary);

  const originRef = useRef<HTMLInputElement | null>(null)
  const destRef = useRef<HTMLInputElement | null>(null)

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



  const setAddress = useCallback(
    (payload: any) => {
      if (isOrigin) {
        setInput(payload?.name);
        dispatch(setOrigin(payload));

      } else {
        setInput(payload?.name);
        dispatch(setDestination(payload));
      }
    },
    [isOrigin],
  );

  const selectResult = (result: any) => {
    const cleanupResult = {
      name: result?.labelNameArray,
      lat: result?.coordinates?.lat,
      lon: result?.coordinates?.lon,
    };
    setAddress(cleanupResult);
  };


  useEffect(() => {
    (handleFetch(input))
  }, [input]);


  // useEffect(() => {
  //   if (origin?.name !== "" && destination?.name !== "") {
  //     setValue();
  //   }
  // }, [origin, destination]);


  const handleFetch = async (params: any): Promise<void> => {
    if (params?.length > 2) {
      const res = await (dispatch(fetchAddressSearch(params)))
      if (res) {
        if (isOrigin) {
          setSearchResults(res?.data?.data)
          dispatch(setOriginAddressSearch(res?.data?.data))
        } else {
          setSearchResults(res?.data?.data)
          dispatch(setDestinationAddressSearch(res?.data?.data))
        }
      }
    }
  }

  const handleFocus = () => {
    setIsFocus(true);
    isOrigin ? handleFetch(origin?.name) : handleFetch(destination?.name)
  };

  const handleReset = (): void => {
    const searchValue = isOrigin ? origin?.name : destination?.name
    setIsFocus(true)
    setInput("");
    searchValue.length > 2 && handleFetch(searchValue)
    inputRef.current?.focus()
  };

  const handleBlur = (): void => {
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
    try {
      const res: any = await dispatch(fetchAddressLookup(latitude, longitude));
      const { labelNameArray, coordinates } = res.data?.data[0];
      setInput(labelNameArray);
      setAddress({
        name: labelNameArray,
        lat: coordinates.lat,
        lon: coordinates.lon,
      });
    } catch (e) {
      dispatch(
        dispatch(showNotification({
          type: 'error',
          message: e,
        })),
      );
    } finally {
      dispatch(setIsloading(false))
    }
  };

  const getGeolocation = () => {
    dispatch(setIsloading(true))

    if (navigator?.geolocation) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
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
