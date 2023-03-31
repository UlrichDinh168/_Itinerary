import React, { useCallback, useState, useRef } from "react";
import { useSelector, } from "react-redux";
import SearchResults from "./SearchResults";
import Input from "../../shared/Input";
import { useAppDispatch } from '../../store'
import { setOrigin, setDestination, Itinerary } from '../../reducers/itineraries'
import { setDestinationAddressSearch, setIsloading, setOriginAddressSearch } from "../../reducers/searchResult";
import { showNotification } from "../../reducers/notification";
import { instance } from '../../constants'

type SearchResult = {
  labelNameArray: string;
  coordinates: {
    lat: number;
    lon: number;
  };
};

interface RootState {
  itinerary: Itinerary,
  notification: Notification,
  searchResult: SearchResult
}

type SearchBarProps = {
  isOrigin: boolean;
};

const Searchbar: React.FC<SearchBarProps> = ({ isOrigin }) => {
  const dispatch = useAppDispatch();

  const { origin, destination } = useSelector((state: RootState) => (state.itinerary));

  const originRef = useRef<HTMLInputElement | null>(null)
  const destRef = useRef<HTMLInputElement | null>(null)

  const inputName = isOrigin ? "origin" : "destination";
  const inputLabel = isOrigin ? "Origin" : "Destination";
  const inputId = isOrigin ? "origin-input" : "destination-input";
  const inputPlaceholder = isOrigin ? "Majurinkatu 3C" : "Pasila Espoo";
  const inputRef = isOrigin ? originRef : destRef

  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const setAddress = useCallback(
    (payload: any): void => {
      if (isOrigin) {
        setInput(payload?.name);
        dispatch(setOrigin(payload));

      } else {
        setInput(payload?.name);
        dispatch(setDestination(payload));
      }
    },
    [isOrigin, dispatch, setInput]
  );

  const selectResult = useCallback((result: SearchResult): void => {
    const cleanupResult = {
      name: result?.labelNameArray,
      lat: result?.coordinates?.lat,
      lon: result?.coordinates?.lon,
    };
    setAddress(cleanupResult);
  }, [setAddress]);


  const handleFetch = useCallback(async (params: string): Promise<void> => {
    if (params?.length > 2) {
      try {
        const res = await instance.post(`/api/get-address-search`, { data: params });
        if (res.status === 200) {
          const routes = res?.data?.routes;
          if (isOrigin) {
            setSearchResults(routes ?? []);
            dispatch(setOriginAddressSearch(routes));
          } else {
            setSearchResults(routes ?? []);
            dispatch(setDestinationAddressSearch(routes));
          }
        }
      } catch (e) {
        dispatch(showNotification({ type: "error", message: e.message ?? "Something went wrong!" }));
      }
    }
  }, [isOrigin, dispatch, setSearchResults]);

  const handleFocus = useCallback(() => {
    setIsFocus(true);
    isOrigin ? handleFetch(origin?.name) : handleFetch(destination?.name);
  }, [isOrigin, handleFetch, origin?.name, destination?.name]);

  const handleReset = useCallback((): void => {
    const searchValue = isOrigin ? origin?.name : destination?.name;
    setIsFocus(true);
    setInput("");
    searchValue.length > 2 && handleFetch(searchValue);
    inputRef.current?.focus();
  }, [isOrigin, origin?.name, destination?.name, handleFetch, inputRef]);

  const handleBlur = useCallback((): void => {
    setIsFocus(false);
    isOrigin ? setInput(origin?.name) : setInput(destination?.name);
  }, [isOrigin, origin?.name, destination?.name]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInput(value);
    handleFetch(value);
  }, [handleFetch]);


  const onError = (error: GeolocationPositionError) => {
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
      default:
        errors = "An unknown error occurred.";
        break;
    }
    return dispatch(showNotification({ type: 'error', message: errors }));
  };

  const onSuccess = async (position: GeolocationPosition) => {
    const { latitude, longitude } = position?.coords;

    try {
      const res = await instance.post(`/api/get-address-lookup`, { data: { latitude, longitude } })
      console.log(res, 'res');

      const { labelNameArray, coordinates } = res.data?.route[0];
      handleFetch(labelNameArray)

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
