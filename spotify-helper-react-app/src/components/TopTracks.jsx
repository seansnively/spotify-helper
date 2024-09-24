import { UserContext } from '../context/StateProvider';
import { useContext } from 'react';

const TopTracks = () => {
    const { user} = useContext(UserContext);

    return (
        <div>
            <h1>Hello, {user.authToken}!</h1>
        </div>
    );
};

  
export default TopTracks;