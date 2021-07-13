const Spotify = require('./Spotify');

class Game {
  constructor(room) {
    this.room = room;
    this.playlistUrl = room.playlistUrl;
    this.playlistInfo = room.playlistInfo;
    Spotify.getPlaylistTracks(this.playlistUrl).then(tracks => {
      console.log(tracks);
    })
  }


}

module.exports = Game;