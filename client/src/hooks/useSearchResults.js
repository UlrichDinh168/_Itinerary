/** @format */

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { simplifyResJson, debounce } from "../utils";
import { searchResultActions } from "../actions";

const useSearchResults = (searchValue, isFocus) => {
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState([]);

  const { defaultResult, transportResult } = useSelector(
    (state) => state?.searchResult,
  );

  const fetchSearchResults = async (value) => {
    try {
      dispatch(searchResultActions.getDefaultResult(value));
      dispatch(searchResultActions.getTransportResult(value));
    } catch (err) {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    if (
      defaultResult?.data?.features?.length &&
      transportResult?.data?.features?.length
    ) {
      const combinedResults = [
        ...defaultResult.data.features,
        ...transportResult.data.features,
      ];
      setSearchResults(combinedResults);
    }
  }, [defaultResult, transportResult]);

  useEffect(() => {
    if (searchValue?.length === 0) return setSearchResults([]);

    if (searchValue?.length > 2) {
      debounce(fetchSearchResults(searchValue), 1000);
    }
  }, [searchValue]);

  return simplifyResJson(searchResults);
};

export default useSearchResults;
