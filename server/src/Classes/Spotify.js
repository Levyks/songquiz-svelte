require('dotenv').config()
const axios = require('axios');
const fs = require('fs');

class Spotify {
  static accessToken;

  static async getPlaylistTracks(url, secondTry = false){
    const playlistId = Spotify.getPlaylistId(url);

    if(!Spotify.accessToken) await Spotify.getAccessToken();

    const fields = "items(track(name, preview_url, external_urls, artists(external_urls,name), album(images))),next";
    const fieldEncoded = encodeURIComponent(fields);

    const tracks = [];
    let nextUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?fields=${fieldEncoded}`;

    try{
      while(nextUrl){
        await axios({
          method: "get",
          url: nextUrl,
          headers: {
            Authorization: `Bearer ${Spotify.accessToken}`
          }
        }).then(response => {
          response.data.items.forEach(item => {
            tracks.push(item.track);
          });
          nextUrl = response.data.next;
        }).catch(error => {
          nextUrl = false;
          throw error.response.status;
        });
      }
    }catch(err){
      if(err === 401 && !secondTry){
        console.log("refreshing");
        await Spotify.getAccessToken();
        return Spotify.getPlaylist(url, true);
      }
    }
    
    return tracks;

  }

  static async getPlaylistInfo(url, secondTry = false){
    const playlistId = Spotify.getPlaylistId(url);

    if(!Spotify.accessToken) await Spotify.getAccessToken();

    const fields = "name,tracks(total)";
    const fieldEncoded = encodeURIComponent(fields);

    try{
      return await axios({
        method: "get",
        url: `https://api.spotify.com/v1/playlists/${playlistId}?fields=${fieldEncoded}`,
        headers: {
          Authorization: `Bearer ${Spotify.accessToken}`
        }
      }).then(response => {
        return {
          status: response.status,
          playlistInfo: response.data
        };
      }).catch(error => {
        if(error.response.status === 401) throw 401;
        if(error.response.data && error.response.data.error){
            return error.response.data.error;
        }
        return {status: error.response}
      });
    } catch(err) {
      if(!secondTry){
        await Spotify.getAccessToken();
        return Spotify.getPlaylistInfo(url, true);
      }
    }
  }

  static getPlaylistId(url){
    url = url.split('?')[0].split('//')[1];
    const urlParts = url.split('/');
    if(urlParts[1] !== 'playlist') return false;

    return urlParts[2];
  }

  static getAccessToken() {
    console.log("Requesting new access token");
    return axios({
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      data: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}` 
      }
    }).then(response => {
      Spotify.accessToken = response.data.access_token;
      fs.writeFileSync('./token.json', JSON.stringify({access_token: Spotify.accessToken}));
      return Spotify.accessToken;
    }).catch(error => {
      console.log(error);
    });
  }
}

module.exports = Spotify

Spotify.accessToken = JSON.parse(fs.readFileSync('./token.json')).access_token;

/*
Spotify.getPlaylistInfo("https://open.spotify.com/playlist/37i9dQZF1DX0FOF1IUWK1W?si=6a366ec92bc249de").then(playlistInfo => {
  console.log(playlistInfo);
});
*/

//Spotify.getPlaylistTracks("https://open.spotify.com/playlist/37i9dQZF1DX0FOF1IUWK1W?si=6a366ec92bc249de").then(console.log);