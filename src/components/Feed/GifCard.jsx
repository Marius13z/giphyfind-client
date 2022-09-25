import React from "react";
import { HeartIcon } from "@heroicons/react/solid";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";

const GifCard = ({ image, title, innerRef }) => {
  const { user, loggedIn } = useContext(AuthContext);

  // save the gifs liked by USER
  const handleLike = async () => {
    await axios.post("http://localhost:5000", {
      image: image,
      userId: user?.id,
      title: title
    });
  };

  return (
    <li ref={innerRef} className="group relative z-20">
      {/* Gifs */}
      <img
        alt={title}
        className="rounded-sm h-full w-full object-fill"
        src={image}
      />
      {loggedIn && (
        <HeartIcon
          onClick={() => handleLike()}
          className="h-0 cursor-pointer transition-all duration-300
              bottom-[3%] left-[87%] lg:bottom-[1%] lg:left-[91%] z-10 group-hover:h-9 xl:group-hover:h-12 absolute text-green-500 hover:text-orange-500"
        />
      )}
    </li>
  );
};

export default GifCard;
