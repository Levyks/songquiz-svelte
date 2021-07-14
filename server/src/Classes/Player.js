const crypto = require("crypto");
const Room = require("./Room");

class Player {

  constructor(username, room) {
    this.room = room;
    this.username = username;
    this.score = 0;
  }

  setSocket(socket) {
    this.socket = socket;

    this.socket.on('roundChoice', choice => {
      this.room.game.currentRound.handleChoice(this, choice);
    });

    this.socket.on('disconnect', () => {
      if(!this.room.players.length){
        console.log(`Deleting room ${this.room.code}`);
        delete this.room;
      } else{
        delete this.room.players[this.username];
      }
      console.log(`Player ${this.username} disconnected`);
    });
  }

  generateToken() {
    this.token = crypto.randomBytes(48).toString('hex');
  }

  serialize() {
    return {
      username: this.username,
      score: this.score,
      token: this.token,
      isLeader: !!this.isLeader,
    }
  }

  static authenticate(credentials, player){
    return credentials.username === player.username && credentials.token === player.token;
  }

}

module.exports = Player;