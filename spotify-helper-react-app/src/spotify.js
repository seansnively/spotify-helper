export const authEndPoint = 'https://accounts.spotify.com/authorize';

//const redirectUri = 'http://localhost:3000/';

const scopes = [
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-read-playback-state',
  'user-top-read',
  'user-modify-playback-state',
  'user-library-read',
];

export const loginUrl = `${authEndPoint}?client_id=${import.meta.env.VITE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_REDIRECT_AFTER_LOGIN_URL}&scope=${scopes.join(
  '%20'
)}&response_type=token&show_dialog=true`;

// to get the access token from the url
export const getAccessToken = () =>
  window.location.hash
    .substring(1) //got rid of hash symbol
    .split('&') // splitting the above url at '&'
    .reduce((initial, item) => {
      let parts = item.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
