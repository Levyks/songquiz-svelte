const crypto = require("crypto");
const Player = require("./Player");
const Spotify = require('./Spotify');

class Room {
  static rooms = {}

  constructor(socket, username) {
    this.code = Room.getUniqueRoomCode(); 
    Room.rooms[this.code] = this;

    this.players = {};

    this.leader = new Player(username, this);

    this.leader.generateToken();

    this.leader.isLeader = true;

    this.sendResponse("createRoomResponse", socket, this.leader.serialize());
  }

  setPlaylist(data){
    this.playlistUrl = data.playlistUrl;
    Spotify.getPlaylistInfo(data.playlistUrl).then(playlistInfo => {
      this.playlistInfo = playlistInfo;
      Room.io.in(this.code).emit("playlistUpdated", playlistInfo);
    });
  }

  sendResponse(responseName, socket, playerData) {
    socket.emit(responseName, {
      status: "success",
      roomCode: this.code,
      playerData, 
    });
  }

  connectPlayer(data, socket) {
    let player;

    if(Player.authenticate(data.playerData, this.leader)) {
      player = this.leader;
      socket.on("setPlaylist", (data) => {this.setPlaylist(data)});
    }else {
      player = new Player(data.playerData.username, this);
      player.generateToken();
    }

    player.setSocket(socket);

    this.players[player.username] = player;

    player.socket.join(this.code);

    if(this.playlistInfo) player.socket.emit("playlistUpdated", this.playlistInfo);

    Room.io.in(this.code).emit('syncPlayersData', this.getPlayerList());

    this.sendResponse("connectToRoomResponse", socket, player.serialize());
  }

  getPlayerList(){
    let playerList = [];
    Object.keys(this.players).forEach(key => {
      const player = this.players[key];
      if(player.isLeader){
        const newList = [player.serialize()]
        newList.push(...playerList)
        playerList = newList;
      } else {
        playerList.push(player.serialize());
      } 
    });
    console.log(playerList);
    return playerList;
  }


  static getRandomRoomCode(){
    return Math.floor(Math.random() * 10000).toString().padStart(4, "0");
  }

  static getUniqueRoomCode(){
    let generatedCode = Room.getRandomRoomCode();
    while(Room.rooms[generatedCode]) generatedCode = this.getRandomRoomCode();
    return generatedCode;
  }



}

module.exports = Room;