import React, { useContext } from "react";
import { GoogleLogin } from "@react-oauth/google";
import decode from "jwt-decode";
import { googleLogout } from "@react-oauth/google";
import { HeartIcon } from "@heroicons/react/solid";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/auth";

const Navbar = ({ onShowFavorites }) => {
  const { login, logout, loggedIn } = useContext(AuthContext);
  const { pathname } = useLocation()

  // When user logs in with google decode the credentials and save his id and data in local storage
  const handleGoogleLogin = (res) => {
    // decode credentials received from logging in with google
    const data = decode(res?.credential);
    // save user data in local storage
    login(data);
  };

  // When user logs out delete his information from local storage
  const handleGoogleLogout = () => {
    googleLogout();
    // remove user data from local storage
    localStorage.removeItem("user");
    logout();
  };

  return (
    <nav>
      {/* Logo */}
      <ul className="bg-body shadow-lg shadow-body px-10 sm:px-28 lg:px-44 flex justify-between py-4 items-center">
        <li>
          <Link
            to="/"
            className="cursor-pointer text-white text-base font-bold"
          >
            giphyfind
          </Link>
        </li>
        {/* Google Auth and Favorites */}
        <li>
          {loggedIn ? (
            <ul className="flex items-center">
              <li>
                <Link to="/favorites">
                  <button onClick={onShowFavorites}>
                    <HeartIcon className="h-6 transition-all duration-300 hover:text-orange-500 text-green-500 pr-4" />
                  </button>
                </Link>
              </li>
              <li>
                {pathname === "/" && (
                <button
                  onClick={handleGoogleLogout}
                  className="py-1.5 px-4 rounded-sm hover:bg-secondary bg-green-500 text-white hover:text-green-500 transition-all duration-300 text-xs"
                >
                  LOG OUT
                </button>

                )}
              </li>
            </ul>
          ) : (
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => {
                toast.error("Oops! Something went wrong, try again.");
              }}
            />
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
