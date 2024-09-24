import './App.css';
import Login from './components/Login';
import { getAccessToken } from './spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import { UserContext } from './context/StateProvider';
import { useContext } from 'react';
import HomeRouting from './components/HomeRouting';

const spotifyWebApi = new SpotifyWebApi();


function App() {
  const { user, login } = useContext(UserContext);

  const tokenObject = getAccessToken();
  const accessToken = tokenObject?.access_token;  

  if (accessToken) {
    spotifyWebApi.setAccessToken(accessToken);

    login(accessToken);
  }

  return <div className="app">
    {!user.auth ? <Login/> : <HomeRouting/>
    
    }
  </div>;
}

export default App;