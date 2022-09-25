import { SearchIcon } from "@heroicons/react/solid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import { SearchContext } from "../../context/search";

const Searchbar = () => {
  const [showLogo, setShowLogo] = useState(false);
  const {
    searchTerm,
    searchGifs,
    clear,
    fetchSuggestions,
    suggestions,
    fetchTrendingSuggestions,
    trendingSuggestions,
  } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const lastSearchedTerm = JSON.parse(localStorage.getItem("lastSearch"));
  const navigate = useNavigate();

  // show logo near searchbar when scrolling down past a certain point
  const handleScroll = () => {
    window.scrollY > 180 ? setShowLogo(true) : setShowLogo(false);
  };

  // on submit user will navigate to the page with the searched term, and every search term will be stored in db and localstorage
  const handleSubmit = async (e) => {
    // prevent page refresh
    e.preventDefault();

    // navigate to search/:id page
    navigate(`/search/${searchTerm}`);

    // update local storage with USER last search
    localStorage.setItem("lastSearch", JSON.stringify(searchTerm));

    // save the search term in DB
    await axios.post("http://localhost:5000/search", {
      searchTerm,
      userId: user.id,
    });
    
  };

  // add event listener to window in order to show logo near searchbar
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // show suggestions under searchbar based on what user is typing
  const handleSearchGifs = (e) => {
    // save suggestions in state to show under searchbar
    searchGifs(e.target.value);

    // fetch and save suggestions in state in order to display them on UI under searchbar as user is typing
    fetchSuggestions(); 
  };

  // when user has clicked on a suggestion navigate to search/:id page and save suggestions in state so they are displayed on UI
  const handleSearchSuggestion = (suggestion) => {
    // navigate to search/:id
    navigate(`/search/${suggestion}`);

    // save suggestions in state
    searchGifs(suggestion);
  };

  // show the most trending searches from GIPHY under tags above searchbar
  useEffect(() => {

        // fetch and save trending searches in state to display them later on UI
        fetchTrendingSuggestions();
    
  }, []);

  return (
    <>
      <ul className="flex flex-row  space-y-0 mb-3 space-x-3 main-container">
        {/* Trending Searches Tags */}
        {trendingSuggestions
          .map((suggestion, i) => {
            return (
              <li
                key={suggestion}
                onClick={() => handleSearchSuggestion(suggestion)}
                className="text-white cursor-pointer first:bg-green-500 hover:bg-green-500 text-xs bg-secondary py-2 px-3 lg:px-6 rounded-full"
              >
                #{suggestion}
              </li>
            );
          })
          .splice(0, 3)}
      </ul>
      <div className="flex flex-col px-10 sm:px-28 lg:px-44 sticky top-0 z-30">
        {/* Searchbar */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center bg-body shadow-lg"
        >
          <span
            className={`translate text-white text-base font-bold ${
              showLogo ? "inline-block pr-2" : "hidden"
            }`}
          >
            giphyfind
          </span>
          <input
            type="text"
            placeholder="Find your favorite gifs.."
            value={searchTerm}
            onChange={handleSearchGifs}
            className="grow rounded-l-sm text-white font-medium text-xs placeholder:text-xs placeholder:text-white pl-4 pr-2 py-4 outline-none bg-secondary"
          />
          <button className="bg-green-500 flex border-2 py-3 items-center justify-between rounded-r-sm border-green-500">
            <SearchIcon className="h-5 text-white px-3 " />
          </button>
        </form>
        {/* Dynamic Suggestions */}
        {searchTerm.length > 1 && (
          <ul className="bg-secondary pb-4 px-4 font-light space-y-2 text-xs text-white">
            {suggestions?.map((term) => {
              return (
                <li
                  key={term.name}
                  onClick={() => handleSearchSuggestion(term.name)}
                  className="text-white hover:text-green-500 cursor-pointer text-xs font-light"
                >
                  {term.name}
                </li>
              );
            })}
          </ul>
        )}
        {/* Last Searched Term */}
        {lastSearchedTerm && (
          <p className="text-white relative pt-2 z-10 self-start text-xs">
            {!showLogo &&
              `Last time you also searched for ${lastSearchedTerm}...`}
          </p>
        )}
      </div>
    </>
  );
};

export default Searchbar;
