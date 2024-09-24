import { UserContext } from '../context/StateProvider';
import { useContext } from 'react';

const Vibe = () => {

    const { user } = useContext(UserContext);

    return (
        <div>
            <h1>Hello vibe, {user.authToken}!</h1>
        </div>
    );
};

  
export default Vibe;