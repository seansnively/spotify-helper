/*global fetch*/

exports.handler = async function (event) {
    console.log('request:', JSON.stringify(event, undefined, 2));

    const authHeaderValue = 'Bearer ' + event.userAuthToken;

    console.log(authHeaderValue);

    let numberOfSongs = 0;
    let totalDanceability = 0;
    let totalPositivity = 0;
    let totalEnergy = 0;

    //does this work?
    for (const songId of event.songIds) {
        let res = await fetch(`https://api.spotify.com/v1/audio-features/${songId}`, {
            method: 'GET',
            headers: {
                'Authorization': authHeaderValue
            }
        });
      
        const data = await res.json();
        console.log(data);

        numberOfSongs++;
        totalDanceability += data.danceability;
        totalPositivity += data.valence;
        totalEnergy += data.energy;
    }

    let averageDanceability = totalDanceability / numberOfSongs;
    let averagePositivity = totalPositivity / numberOfSongs;
    let averageEnergy = totalEnergy / numberOfSongs;

    let result = {}
    result.averageDanceability = averageDanceability;
    result.averagePositivity = averagePositivity;
    result.averageEnergy = averageEnergy;
    result.numberOfSongs = numberOfSongs;

    return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: result
        
    }

//     curl --request GET \
//   --url https://api.spotify.com/v1/audio-features/11dFghVXANMlKmJXsNCbNl \
//   --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'

}