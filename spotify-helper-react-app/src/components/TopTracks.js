import { UserContext } from '../context/StateProvider';
import { useContext } from 'react';

const TopTracks = () => {

    const { user, logout } = useContext(UserContext);

    return (
        <div>
            <h1>Hello, {user.authToken}!</h1>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

  
export default TopTracks;