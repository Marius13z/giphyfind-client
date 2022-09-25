export const searchInitialState = {
  search: false,
  loading: false,
  searchTerm: "",
  suggestions: [],
  searchedGifs: {},
  trendingSuggestions: [],
};

export const searchReducer = (searchState, { type, payload }) => {
  switch (type) {
    case "FETCH_START":
      return {
        ...searchState,
        loading: true,
      };
    case "FETCH_STOP":
      return {
        ...searchState,
        loading: false,
      };
    case "FETCH_SUGGESTIONS":
      return {
        ...searchState,
        suggestions: payload,
      };
    case "FETCH_TRENDING_SUGGESTIONS":
      return {
        ...searchState,
        trendingSuggestions: payload,
      };
    case "SEARCH_GIFS":
      return {
        ...searchState,
        searchTerm: payload,
        search: true,
      };
    case "CLEAR_SEARCH":
      return {
        ...searchState,
        searchTerm: "",
      };
    case "FETCH_SEARCHED_GIFS":
      return {
        ...searchState,
        searchedGifs: payload,
      };
    default:
      throw new Error(`Unknown action type: ${type}`);
  }
};
