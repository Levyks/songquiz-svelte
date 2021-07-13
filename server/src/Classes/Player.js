const crypto = require("crypto");

class Player {

  constructor(username, room) {
    this.room = room;
    this.username = username;
    this.score = 0;
  }

  setSocket(socket) {
    this.socket = socket;
    this.socket.on('disconnect', () => {
      delete this.room.players[this.username];
      console.log(`Player ${this.username} disconnected`);
    });
  }

  generateToken() {
    this.token = crypto.randomBytes(48).toString('hex');
  }

  serialize() {
    return {
      username: this.username,
      token: this.token,
      isLeader: !!this.isLeader,
    }
  }

  static authenticate(credentials, player){
    return credentials.username === player.username && credentials.token === player.token;
  }

}

module.exports = Player;