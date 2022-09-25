import { LightningBoltIcon } from "@heroicons/react/solid";
import React, { useContext } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../context/auth";
import { GifsContext } from "../../context/gifs";
import Loader from "../Loader";
import GifCard from "./GifCard";

const FavoritesFeed = () => {
  const { dbGifs, fetchById, fetchStart, fetchStop, loading } =
    useContext(GifsContext);
  const { loggedIn, user } = useContext(AuthContext);

  useEffect(() => {
    
      // start loader
        fetchStart();
  
          // save gifs in state
          fetchById(user);

        // stop loader
        fetchStop();
    
        return () => console.log("cleanup")

  }, [loggedIn])

  return (
    <main className="main-container">
      {/* Heading */}
      <div className="flex items-center space-x-2">
        <h1 className="text-xl text-white">
          {dbGifs?.data?.length === 0
            ? "There's nothing here, yet"
            : "Your favorites are here"}
        </h1>
        <LightningBoltIcon className="text-purple-500 h-4" />
      </div>
      {/* Gifs */}
      <ul className="gifs-container">
        {dbGifs?.data?.map((gif) => (
          <GifCard
            key={gif?._id}
            title={gif?.title}
            image={gif?.image}
          />
        ))}
      </ul>
      {/* Loader */}
      {loading && <Loader />}
    </main>
  );
};

export default FavoritesFeed;
