import axios from "axios";
import { createContext, useReducer } from "react";
import { searchInitialState, searchReducer } from "../reducers/search";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchState, searchDispatch] = useReducer(
    searchReducer,
    searchInitialState
  );

  const value = {
    search: searchState.search,
    searchedGifs: searchState.searchedGifs,
    searchTerm: searchState.searchTerm,
    suggestions: searchState.suggestions,
    trendingSuggestions: searchState.trendingSuggestions,
    loading: searchState.loading,
    fetchStart: () => searchDispatch({ type: "FETCH_START" }),
    fetchStop: () => searchDispatch({ type: "FETCH_STOP" }),
    fetchSearchedGifs: async () => {
      const { data } = await axios.get(
        `https://api.giphy.com/v1/gifs/search?api_key=${
          process.env.REACT_APP_API_KEY
        }&limit=10&q=${searchState.searchTerm.toLowerCase()}`
      );

      searchDispatch({ type: "FETCH_SEARCHED_GIFS", payload: data })
    },
    searchGifs: (data) =>
      searchDispatch({ type: "SEARCH_GIFS", payload: data }),
    clear: () => searchDispatch({ type: "CLEAR_SEARCH" }),
    fetchSuggestions: async () => {
      const { data } = await axios.get(
        `https://api.giphy.com/v1/gifs/search/tags?api_key=${process.env.REACT_APP_API_KEY}&limit=3&q=${searchState.searchTerm}`
      );

      searchDispatch({ type: "FETCH_SUGGESTIONS", payload: data.data })
    },
    fetchTrendingSuggestions: async () => {

      const { data } = await axios.get(
        `https://api.giphy.com/v1/trending/searches?api_key=${process.env.REACT_APP_API_KEY}`,
      )
      searchDispatch({ type: "FETCH_TRENDING_SUGGESTIONS", payload: data.data })
    }
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
