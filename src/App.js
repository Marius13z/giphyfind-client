import Navbar from "./components/Navbar/Navbar";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Favorites from "./components/Feed/FavoritesFeed";
import Feed from "./components/Feed/Feed";
import Searchbar from "./components/Searchbar/Searchbar";
import SearchFeed from "./components/Feed/SearchFeed";
import { Toaster } from "react-hot-toast";
import { GifsProvider } from "./context/gifs";
import { AuthProvider } from "./context/auth";
import { SearchProvider } from "./context/search";

function App() {
  return (
    <GoogleOAuthProvider clientId="770053617032-r204sr2qej0ick2vh77dbdb3btjk5mu6.apps.googleusercontent.com">
        <AuthProvider>
      <GifsProvider>
          <SearchProvider>
            <BrowserRouter>
              <Navbar />
              <Toaster />
              <Routes>
                <Route exact path="/search/:id" element={<SearchFeed />} />
                <Route
                  exact
                  path="/"
                  element={
                    <>
                      <Searchbar />
                      <Feed />
                    </>
                  }
                />
                <Route exact path="/favorites" element={<Favorites />} />
              </Routes>
            </BrowserRouter>
          </SearchProvider>
        </GifsProvider>
        </AuthProvider>

        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
    </GoogleOAuthProvider>
  );
}

export default App;
