const Spotify = require('./Spotify');
const Round = require('./Round');

class Game {
  constructor(room) {
    this.room = room;
    this.playlistUrl = room.playlistUrl;
    this.playlistInfo = room.playlistInfo;

    this.timePerRound = 15;

    this.rounds = []

    Spotify.getPlaylistTracks(this.playlistUrl).then(tracks => {
      this.playlistTracks = tracks;
      room.syncRoomState();
      this.startRound(0);
    })
  }

  startRound(roundNumber) {
    const round = new Round(roundNumber, this);
    round.startRound();
    this.rounds.push(round);
  }


}

module.exports = Game;