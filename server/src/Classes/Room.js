const Player = require("./Player");
const Game = require("./Game");
const Spotify = require('./Spotify');

class Room {
  static rooms = {}

  constructor(socket, username) {
    this.code = Room.getUniqueRoomCode(); 
    this.ioChannel = Room.io.in(this.code);

    Room.rooms[this.code] = this;

    this.game = new Game(this);

    this.currentlyIn = 'lobby';

    this.players = {};
    this.currentlyConnectedPlayers = 0;

    this.leader = new Player(username, this);
    this.leader.isLeader = true;

    this.log(`Room created by ${this.leader.username}`);

    Room.sendResponse("createRoomResponse", socket, {roomCode: this.code, playerData: this.leader.serialize(true)});
  }

  async setPlaylist(data){
    this.playlistUrl = data.playlistUrl;

    this.playlist = this.playlistUrl !== '' ? await Spotify.getPlaylistInfo(data.playlistUrl) : undefined;
    this.playlistSet = this.playlist && this.playlist.status === 200;
    this.syncRoomState();

    this.log(this.playlistSet ? 
      `Playlist set succesfuly to ${this.playlist.info.name}` : this.playlist ?
      `Playlist not set, reason: Error ${this.playlist.status}` :
      `Playlist unset`);
  }

  static sendResponse(responseName, socket, data, status = 200) {
    socket.emit(responseName, {
      status: status,
      ...data, 
    });
  }

  setLeaderListeners(socket){
    socket.on("setPlaylist", (data) => {this.setPlaylist(data)});
    socket.on("startGame", (data) => {
      this.game.startGame();
    })
  }

  connectPlayer(data, socket) {
    let player;

    //If player is the leader
    if(data.playerData.isLeader && Player.isTheSame(data.playerData, this.leader)) {
      player = this.leader;
      this.setLeaderListeners(socket);

    //If player was previously connected  
    } else if (this.players[data.playerData.username] && Player.isTheSame(data.playerData, this.players[data.playerData.username])) {
      player = this.players[data.playerData.username];

    //If it's a new player
    } else {
      player = new Player(data.playerData.username, this);
    }

    player.setSocket(socket);

    this.players[player.username] = player;

    player.socket.join(this.code);

    this.syncRoomState(socket);

    this.syncPlayersData();

    Room.sendResponse("connectToRoomResponse", socket, {roomCode: this.code, playerData: player.serialize(true)});
  }

  syncPlayersData(){
    this.ioChannel.emit('syncPlayersData', this.getPlayerList());
  }

  getPlayerList(){
    let playerList = [];
    if(!this.game.started) playerList.push(this.leader.serialize());
    Object.keys(this.players).forEach(key => {
      if(!this.game.started && this.players[key].isLeader) return;
      playerList.push(this.players[key].serialize()); 
    });
    if(this.game.started) {
      playerList.sort((a,b) => a.score < b.score ? 1 : -1);
    } 
    return playerList;
  }

  syncRoomState(socket = this.ioChannel) {
    let roomState = {
      currentlyIn: this.currentlyIn,
      playlist: this.playlist
    };
    if(this.game.started) {
      roomState.game = this.game.getGameState();
    }

    socket.emit('syncRoomState', roomState);
  }

  log(message) {
    console.log(`[${this.code}] | ${new Date().toLocaleTimeString()} -> ${message}`);
  }

  static getRandomRoomCode(){
    return Math.floor(Math.random() * 10000).toString().padStart(4, "0");
  }

  static getUniqueRoomCode(){
    let generatedCode = Room.getRandomRoomCode();
    while(Room.rooms[generatedCode]) generatedCode = this.getRandomRoomCode();
    return generatedCode;
  }

  static findRoomAndConnect(data, socket) {
    const room = Room.rooms[data.code];
    if(room){
      room.connectPlayer(data, socket);
    } else {
      Room.sendResponse("connectToRoomResponse", socket, {error: "not found"}, 404);
    }
  }


}

module.exports = Room;