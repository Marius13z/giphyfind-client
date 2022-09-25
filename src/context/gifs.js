import axios from "axios";
import React, { createContext, useReducer } from "react";
import { gifsReducer, initialState } from "../reducers/gifs";

export const GifsContext = createContext();

export const GifsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gifsReducer, initialState);

  const value = {
    // LOADING
    loading: state.loading,
    fetchStart: () => dispatch({ type: "FETCH_START" }),
    fetchStop: () => dispatch({ type: "FETCH_STOP" }),
    // GIFS
    gifsNumber: state.gifsNumber,
    gifs: state.gifs,
    dbGifs: state.dbGifs,
    fetchGifs: async () => {
      const { data } = await axios.get(
        `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.REACT_APP_API_KEY}&limit=${state.gifsNumber}`,
      );

      dispatch({ type: "FETCH_GIFS", payload: data })
    },
    
    loadMore: () => dispatch({ type: "LOAD_MORE" }),

    fetchById: async (user) => {
      
        // fetch saved gifs from server
        const data = await axios.get(`http://localhost:5000/${user?.id}`, {
        });

      dispatch({ type: "FETCH_GIFS_BY_ID", payload: data })
    } ,
  };

  return <GifsContext.Provider value={value}>{children}</GifsContext.Provider>;
};
