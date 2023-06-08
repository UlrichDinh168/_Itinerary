/** @format */

import React from 'react';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';

const SearchResults = ({
  isOrigin,
  searchValue,
  inputId,
  searchResults,
  selectResult,
  getGeolocation,
}) => {
  const renderResults = () => {
    if (searchResults?.length === 0) return;
    if (searchValue.length > 2)
      return searchResults?.map((result) => {
        const [main, ...secondary] = result.labelNameArray;
        return (
          <li
            className="address"
            onMouseDown={() => selectResult(result)}
            key={result.id}
          >
            <span className="address__main">{main}</span>
            <span className="address__secondary">
              {secondary[0]} {secondary[1]}
            </span>
          </li>
        );
      });
  };

  const key = isOrigin ? 'origin' : 'destination';

  return (
    <ul className="result__list" id={inputId}>
      <li className="location" onMouseDown={getGeolocation} key={key}>
        <GpsFixedIcon />
        <span> Use Your Current Location</span>
      </li>
      {renderResults()}
    </ul>
  );
};

export default SearchResults;
