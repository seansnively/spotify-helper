import { UserContext } from '../context/StateProvider';
import { useContext, useState } from 'react';

const TopTracks = () => {
    const { user} = useContext(UserContext);
    

    const [data, setData] = useState(null);
    let timeRange = 'short_term';
    let songLimit = '5';

    const fetchData = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_TEST_VAR}?userAuthToken=${user.authToken}&timeRange=${timeRange}&songLimit=${songLimit}`);
    
          const songsWithInsightsResponseBody = await response.json();
          setData(songsWithInsightsResponseBody);
        } catch (error) {
          console.error('Error:', error);
        }
    };
    return (
        <div>
            <button onClick={fetchData}>Fetch Data</button>
            {data && (
                <pre>{JSON.stringify(data, null, 2)}</pre>
            )}
        </div>
    );
};

  
export default TopTracks;