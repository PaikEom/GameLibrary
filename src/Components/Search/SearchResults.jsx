import React from "react";

function SearchResults(props) {
  return (
    <div className="search-results-container">
      {searchResults.map((res, index) => (
        <div className="search-result-main-div" key={index}>
          <img src={res.item.thumbnail} alt="noImage" />
          <div className="search-result-info">
            <h6>{res.item.title}</h6>
            <p>{res.item.genre}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
