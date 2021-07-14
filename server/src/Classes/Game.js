const Spotify = require('./Spotify');
const Round = require('./Round');

class Game {
  constructor(room) {
    this.room = room;
    this.started = false;
    this.rounds = [];
    this.currentRound;
  }

  startGame() {
    this.timePerRound = 15;

    this.playlistUrl = this.room.playlistUrl;
    this.playlistInfo = this.room.playlistInfo;

    if(!this.playlistInfo) return;

    this.room.ioChannel.emit("startingGame");

    Spotify.getPlaylistTracks(this.playlistUrl).then(tracks => {
      this.playlistTracks = tracks;

      this.startRound(0);
    })
  }

  startRound(roundNumber) {
    const round = new Round(roundNumber, this);
    this.rounds.push(round);
    this.currentRound = round;
    round.startRound();
  }

  getGameState(){
    let gameState = {
      currentRound: this.currentRound.getRoundState()
    }
    return gameState;
  }


}

module.exports = Game;