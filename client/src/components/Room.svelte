<script>
  import { push } from 'svelte-spa-router';

  import Lobby from './Lobby.svelte';
  import Game from './Game.svelte';

  export let params;
  export let socket;

  let roomState = {
    currentlyIn: "lobby"
  };

  let roomIsLoading = true;
  let playersData = [];
  
  const lastRoomJoined = localStorage.getItem('lastRoomJoined');
  let playerData = JSON.parse(localStorage.getItem('playerData'));;

  if(params.roomCode == lastRoomJoined && playerData){
    connectToRoom(params.roomCode, playerData);
  } else {
    push(`/play/join/${params.roomCode}`);
  }

  function connectToRoom(code, playerData){
    socket.emit('initialSetup', {action:'connectToRoom', code, playerData});
    socket.on('connectToRoomResponse', response => {
      if(response.status === 200){
        playerData = response.playerData;
        localStorage.setItem('playerData', JSON.stringify(response.playerData) );

        roomIsLoading = false;
      } else {
        if(response.status === 404) window.alert(`Room ${code} does not exist`);
        push('/play');
      } 
    });
  }

  socket.on('syncPlayersData', players => {
    playersData = players;
  });

  socket.on('syncRoomState', data => {
    roomState = data;
  });

  socket.on('startingGame', () => {
    roomState.currentlyIn = "game";
  });

</script>

<main>
  <div class="mb-2"></div>
  <div class="room-wrapper">
    {#if roomIsLoading}
      <div class="app-window w-100 text-center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    {:else}
    <div class="left-window app-window">

    </div>
    <div class="main-window app-window">
      {#if roomState.currentlyIn == "lobby" }
      <Lobby {socket} {playerData} {roomState} />
      {:else if roomState.currentlyIn == "game"}
      <Game {socket} {roomState}/>
      {/if}
    </div>
    <div class="right-window app-window text-center">
      <h3>Room {params.roomCode}</h3>
      <hr>
      <div class="d-flex flex-row align-items-center mb-2">
        <h5>Players</h5>
        <h6 class="ml-auto">{playersData.length} online</h6>
      </div>
      {#each playersData as player, i}
      <div class="player-card mb-2">
        <i class="fas fa-circle" class:connected={player.isConnected} class:disconnected={!player.isConnected}></i>
        {#if roomState.currentlyIn == "game"}<span>{i+1}.</span>{/if}
        <strong class="mr-1" >{player.username}</strong>
        {#if player.isLeader}<i class="fas fa-crown text-warning"></i>{/if}
        {#if roomState.currentlyIn == "game"}<span class="mx-1" >{player.score} points</span>{/if}
      </div>
      {/each}
    </div>
    {/if}
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

  .spinner-border {
    width: 192px;
    height: 192px;
    border-width: 0.5em;
  }

  .connected {
    color: green;
  }

  .disconnected {
    color: red;
  }


</style>