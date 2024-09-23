/*global fetch*/
const { Lambda, InvokeCommand } = require("@aws-sdk/client-lambda");


exports.handler = async function (event) {
  console.log('request:', JSON.stringify(event, undefined, 2));

  const authHeaderValue = 'Bearer ' + event.queryStringParameters.userAuthToken;

  let songLimit = parseInt(event.queryStringParameters.songLimit);
  let timeRange = event.queryStringParameters.timeRange;

  if (songLimit == null || songLimit == undefined || songLimit > 20) {
    songLimit = 5;
  }

  if(timeRange == null || timeRange == undefined || timeRange == "") {
    timeRange = 'short_term';
  }

  try {
    let res = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=${songLimit}&offset=0`, {
      method: 'GET',
      headers: {
      'Authorization': authHeaderValue
      }
    });

    const data = await res.json();
    //console.log(data);

    let songIds = [];

    let songResponseList = [];
    let counter = 1;

    for(const item of data.items) {
      songIds.push(item.id);
      let songData = {};
      songData.name = item.name;
      songData.artists = getArtistsStringFromArtistArray(item.artists);
      songData.position = counter;
      songResponseList.push(songData);
      counter++;
    }

    let downstreamEvent = {};

    downstreamEvent.userAuthToken = event.queryStringParameters.userAuthToken;
    downstreamEvent.songIds = songIds;

      // call downstream function and capture response
    const command = new InvokeCommand({
      FunctionName: process.env.DOWNSTREAM_FUNCTION_NAME,
      Payload: JSON.stringify(downstreamEvent),
    });

    const lambda = new Lambda();
    const { Payload } = await lambda.send(command);
    const resultBody = JSON.parse(Buffer.from(Payload).toString());

    //console.log("downstream response from track insights:", JSON.stringify(resultBody, undefined, 2));

    let result = {};
    result.songResponseList = songResponseList;
    result.songAverageDataInsights = resultBody.body;

    return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: result
    }
  } catch (error) {
    console.error(error); // Log any errors
  }

  // {
  //   items: [
  //     {
  //       album: [Object],
  //       artists: [Array],
  //       available_markets: [Array],
  //       disc_number: 1,
  //       duration_ms: 172293,
  //       explicit: false,
  //       external_ids: [Object],
  //       external_urls: [Object],
  //       href: 'https://api.spotify.com/v1/tracks/6GDd1lZ0zp5pB6JleN5Xzx',
  //       id: '6GDd1lZ0zp5pB6JleN5Xzx',
  //       is_local: false,
  //       name: 'California',
  //       popularity: 69,
  //       preview_url: 'https://p.scdn.co/mp3-preview/37256a311211e85520509cb6d1bfe66e0641ca2b?cid=ad70cc369c2046f2ab10ebb43f5d11cf',
  //       track_number: 2,
  //       type: 'track',
  //       uri: 'spotify:track:6GDd1lZ0zp5pB6JleN5Xzx'
  //     },
  //     {
  //       album: [Object],
  //       artists: [Array],
  //       available_markets: [Array],
  //       disc_number: 1,
  //       duration_ms: 184600,
  //       explicit: false,
  //       external_ids: [Object],
  //       external_urls: [Object],
  //       href: 'https://api.spotify.com/v1/tracks/0lFB606QmOZ6Lbd6ODhJ0P',
  //       id: '0lFB606QmOZ6Lbd6ODhJ0P',
  //       is_local: false,
  //       name: 'One Time',
  //       popularity: 66,
  //       preview_url: 'https://p.scdn.co/mp3-preview/6883d61f3502aa0966e36f342a202f8e0566ba83?cid=ad70cc369c2046f2ab10ebb43f5d11cf',
  //       track_number: 3,
  //       type: 'track',
  //       uri: 'spotify:track:0lFB606QmOZ6Lbd6ODhJ0P'
  //     }
  //   ],
  //   total: 462,
  //   limit: 2,
  //   offset: 0,
  //   href: 'https://api.spotify.com/v1/me/top/tracks?offset=0&limit=2&time_range=short_term&locale=*',
  //   next: 'https://api.spotify.com/v1/me/top/tracks?offset=2&limit=2&time_range=short_term&locale=*',
  //   previous: null
  // }

 
}

function getArtistsStringFromArtistArray(artists) {
  let artistNames = [];
  for(const artist of artists) {
    artistNames.push(artist.name);
  }

  let artistsJoinedWithComma = artistNames.join(", ");
  return artistsJoinedWithComma;
}