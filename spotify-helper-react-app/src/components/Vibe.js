import { UserContext } from '../context/StateProvider';
import { useContext } from 'react';

const Vibe = () => {

    const { user, logout } = useContext(UserContext);

    return (
        <div>
            <h1>Hello vibe, {user.authToken}!</h1>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

  
export default Vibe;