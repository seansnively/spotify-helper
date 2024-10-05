import { UserContext } from '../context/StateProvider';
import { useContext, useState } from 'react';

const TopTracks = () => {
    const { user} = useContext(UserContext);
    
    const [timeRangeSelected, setTimeRange] = useState('');
    const [songLimitSelected, setSongLimit] = useState(10);
    const songLimits = generateSongLimits(20);


    const [data, setData] = useState(null);

    const [displaySongArr, setDisplaySongArr] = useState([]);


    const fetchData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_TEST_VAR}?userAuthToken=${user.authToken}&timeRange=${timeRangeSelected}&songLimit=${songLimitSelected}`);
    
            const songsWithInsightsResponseBody = await response.json();
            setData(songsWithInsightsResponseBody);

            const sortedSongs = songsWithInsightsResponseBody.songResponseList.sort((a, b) => a.position - b.position);
            
            let displayStrs = [];

            for(let i = 0; i < sortedSongs.length; i++) {
                let numStr = `${i+1}`;
                if(i + 1 < 10) {
                    numStr = `0${i+1}`;
                }
                let titleStr = removeFeatString(sortedSongs[i].name);

                displayStrs.push(`${numStr}\u00A0\u00A0\u00A0\u00A0${titleStr} - ${sortedSongs[i].artists}`);
            }

            setDisplaySongArr(displayStrs);

        } catch (error) {
            console.error('Error:', error);
        }
    };

    
    return (
        <div>
            <button onClick={fetchData}>Fetch Data</button>
            <div>
                <select value={timeRangeSelected} onChange={(e) => setTimeRange(e.target.value)}>
                    <option value="short_term">Last month</option>
                    <option value="medium_term">Last 6 months</option>
                    <option value="long_term">Last year</option>
                </select>
            </div>
            <div>
                <select value={songLimitSelected} onChange={(e) => setSongLimit(e.target.value)}>
                    {songLimits.map((limit) => (
                        <option key={limit} value={limit}>
                            {limit}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                {displaySongArr.length > 0 ? (
                        displaySongArr.map((string, index) => (
                            <p key={index}>{string}</p>
                        ))
                    ) : (
                        <p>Click fetch data</p>
                    )
                }
            </div>
            
            {/* {data && (
                <pre>{JSON.stringify(data, null, 2)}</pre>
            )} */}
        </div>
    );
};

function generateSongLimits(maxLimit) {
    const limits = [];
    for (let i = 1; i <= maxLimit; i++) {
      limits.push(i);
    }
    return limits;
}

function removeFeatString(title) {
    const featIndex = title.indexOf("(feat.");
    const capitalFeatIndex = title.indexOf("(Feat.")
    if (featIndex !== -1) {
      return removeFeatStringFromTitleUsingIndex(title, featIndex);
    }
    if(capitalFeatIndex !== -1) {
        return removeFeatStringFromTitleUsingIndex(title, capitalFeatIndex);
    }
    return title;
}

function removeFeatStringFromTitleUsingIndex(title, index) {
    const endIndex = title.indexOf(")", index);
    if (endIndex !== -1) {
        return title.substring(0, index);
    }
    return title;
}

  
export default TopTracks;