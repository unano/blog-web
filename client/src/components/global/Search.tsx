import React, { useState } from "react";

const Search = () => {
  const [search, setSearch] = useState("");
  return (
    <>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Enter your search..."
      />
    </>
  );
};

export default Search;
