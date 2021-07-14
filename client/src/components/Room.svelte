<script>
  import { push } from 'svelte-spa-router';
  import { io } from 'socket.io-client';
  import Lobby from './Lobby.svelte';
  import Game from './Game.svelte';

  export let params;

  let roomState = {
    currentlyIn: "lobby"
  };

  let gameIsStarting = false;
  let playersData = [];
  let playerData = JSON.parse(sessionStorage.getItem('playerData'));;

  const roomCode = sessionStorage.getItem('roomCode');

  if(params.roomCode != roomCode){
    push(`/play/join/${params.roomCode}`);
  }

  const socket = io(`${__songQuiz.env.SERVER_URL}`);

  function connectToRoom(code, playerData){
    socket.emit('initialSetup', {action:'connectToRoom', code, playerData});
    socket.on('connectToRoomResponse', response => {
      playerData = response.playerData;
    });
  }

  connectToRoom(roomCode, playerData);

  socket.on('syncPlayersData', players => {
    playersData = players;
  });

  socket.on('syncRoomState', data => {
    roomState = data;
  });

  socket.on('startingGame', () => {
    gameIsStarting = true;
    roomState.currentlyIn = "game";
  });

</script>

<main>
  <div class="mb-2"></div>
  <div class="room-wrapper">
    <div class="left-window app-window">

    </div>
    <div class="main-window app-window">
      {#if roomState.currentlyIn == "lobby" }
      <Lobby {socket} {playerData} />
      {:else if roomState.currentlyIn == "game"}
      <Game {socket} {gameIsStarting}/>
      {/if}
    </div>
    <div class="right-window app-window text-center">
      <h3>Room {roomCode}</h3>
      <hr>
      <div class="d-flex flex-row align-items-center mb-2">
        <h5>Players</h5>
        <h6 class="ml-auto">{playersData.length} online</h6>
      </div>
      {#each playersData as player, i}
      <div class="player-card mb-2">
        <span>{i+1}.</span>
        <strong class="mr-1" >{player.username}</strong>
        <span class="mx-1" >{player.score} points</span>
      </div>
      {/each}
    </div>
  </div>
</main>

<style>
  .room-wrapper {
    display: flex;
  }

  .left-window {
    flex-grow: 1;
  }

  .main-window {
    flex-grow: 2;
  }

  .right-window {
    flex-grow: 1;
  }

  .app-window {
    border-radius: 10px;
    margin: 0 10px;
    padding: 10px;
    background-color: white;
  }

  .player-card {
    background-color: #eaeaea;
    padding: 10px;
    border-radius: 10px;
  }

</style>