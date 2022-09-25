import React, { useEffect, useCallback, useRef } from "react";
import { useContext } from "react";
import { GifsContext } from "../../context/gifs";
import GifCard from "./GifCard";
import Loader from "../Loader";
import { useLocation } from 'react-router-dom'

const Feed = () => {
  const {
    gifs,
    fetchStart,
    fetchStop,
    fetchGifs,
    loadMore,
    gifsNumber,
    search,
    loading,
  } = useContext(GifsContext);
  const observer = useRef();

  // whenever last gif is created a function is going to be created inside of usecallback with a ref
  // to the last gif
  const lastGifRef = useCallback(
    (node) => {
      if (loading) return;
      // disconnect last element to reconnect it correctly and check if observer exists
      // on first time render is going to be null
      if (observer.current) observer.current.disconnect();

      // set the current observer to a new intersection observer
      observer.current = new IntersectionObserver((entries) => {
        // if the node that's on the page somewhere load more
        if (entries[0].isIntersecting && gifsNumber <= 40) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loadMore]
  );

  // get trending gifs on component mount and everytime the user wants to load more gifs
  useEffect(() => {

    const getTrendingGifs = async () => {

        // start loader
        fetchStart();

        // save data from fetch in gifs state to display gifs on UI
        fetchGifs();

        // stop loader
        fetchStop();

    };

    // call function
    getTrendingGifs();

  }, [gifsNumber]);

  return (
    <main className=" main-container mt-2">
      {/* Gifs */}
      <ul className="gifs-container">
        {gifs?.data?.map((gif, index) => {
          if (gifs?.data?.length === index + 1 && !search) {
            return (
              <GifCard
                key={gif.id}
                image={gif?.images?.downsized?.url}
                title={gif?.title}
                innerRef={lastGifRef}
              />
            );
          } else {
            return (
              <GifCard
                key={gif.id}
                image={gif?.images?.downsized?.url}
                title={gif?.title}
              />
            );
          }
        })}
      </ul>
      {/* Loader */}
      {loading && <Loader />}
    </main>
  );
};

export default Feed;
