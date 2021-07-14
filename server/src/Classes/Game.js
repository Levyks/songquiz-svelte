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

    this.room.log("Starting Game");
    this.room.currentlyIn = 'game';
    this.room.syncRoomState();


    this.playlistUrl = this.room.playlistUrl;
    this.playlist = this.room.playlist;

    if(!this.playlist) return;

    this.room.log("Starting to fetch tracks");

    Spotify.getPlaylistTracks(this.playlistUrl).then(tracks => {
      this.room.log("All tracks fetched");

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