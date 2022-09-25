import { FireIcon } from "@heroicons/react/solid";
import { useEffect } from "react";
import { useContext } from "react";
import { SearchContext } from "../../context/search";
import Loader from "../Loader";
import GifCard from "./GifCard";

const SearchFeed = () => {
  const {
    loading,
    clear,
    searchedGifs,
    fetchSearchedGifs,
    fetchStop,
    fetchStart,
  } = useContext(SearchContext);

  useEffect(() => {

        // start loader
        fetchStart()

        // fetch and save searched gifs in state in order to display them on user feed
        fetchSearchedGifs();

        // stop loader
        fetchStop();

    // clear the input field
    clear();

  }, []);

  return (
    <main className="main-container">
      <div className="flex items-center space-x-2">
        <h1 className="text-white text-xl font-bold">We found your gifs</h1>
        <FireIcon className="h-6 text-orange-500" />
      </div>
      {/* Gifs */}
      <ul className="gifs-container">
        {searchedGifs?.data?.map((gif) => (
          <GifCard
            key={gif?.id}
            image={gif?.images?.downsized?.url}
            title={gif?.title}
          />
        ))}
        {/* Loader */}
        {loading && <Loader />}
      </ul>
    </main>
  );
};

export default SearchFeed;
