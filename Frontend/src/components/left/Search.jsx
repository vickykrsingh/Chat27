import React from "react";
import { IoMdSearch } from "react-icons/io";


function Search() {
  return (
    <label className="h-[6vh] input flex items-center gap-2 outline-none border-none focus:outline-none focus:border-none rounded-none ring-0 shadow-none">
      <input type="text" className="grow" placeholder="Search" />
      <button>
      <IoMdSearch size={'25'} />
      </button>
    </label>
  );
}

export default Search;
