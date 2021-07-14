const crypto = require("crypto");

class Player {

  constructor(username, room) {
    this.room = room;
    this.username = username;
    this.score = 0;
    this.token = Player.generateToken();
  }

  setSocket(socket) {
    if(this.socket) {
      this.socket.disconnect();
      delete this.socket;
    }

    this.socket = socket;

    this.room.currentlyConnectedPlayers += 1;

    this.socket.on('roundChoice', choice => {
      this.room.game.currentRound.handleChoice(this, choice);
    });

    this.socket.on('leaveRoom', () => {
      this.socket.removeAllListeners();
      this.socket.disconnect();
      delete this.socket;

      this.room.currentlyConnectedPlayers -= 1;

      delete this.room.players[this.username];

      this.room.syncPlayersData();

      this.room.log(`Player ${this.username} left the room`);
      
      this.room.constructor.deleteRoomIfEmpty(this.room.code);

    });

    this.socket.on('disconnect', () => {
      this.socket.removeAllListeners();
      delete this.socket;

      this.room.currentlyConnectedPlayers -= 1;

      this.room.syncPlayersData();

      this.room.log(`Player ${this.username} disconnected`);

      if(!this.room.currentlyConnectedPlayers) {
        this.room.constructor.scheduleDeleteRoomIfEmpty(this.room.code);    
      }
      /*
      if(!Object.keys(this.room.players).length){
        console.log(`Deleting room ${this.room.code}`);
        delete this.room.constructor.rooms[this.room.code];
      } else{
        delete this.room.players[this.username];
      }
      */
    });
  }

  serialize(includeToken = false) {
    let playerSerializedData = {
      username: this.username,
      score: this.score,
      isLeader: !!this.isLeader,
      isConnected: !!this.socket
    }
    if(includeToken) playerSerializedData.token = this.token;
    return playerSerializedData;
  }

  static generateToken() {
    return crypto.randomBytes(48).toString('hex');
  }

  static isTheSame(credentials, player){
    return credentials.username === player.username && credentials.token === player.token;
  }

}

module.exports = Player;