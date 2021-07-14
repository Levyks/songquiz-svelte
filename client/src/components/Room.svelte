<script>
  import { push } from 'svelte-spa-router';

  import Lobby from './Lobby.svelte';
  import Game from './Game.svelte';
  import LeftWindow from './LeftWindow.svelte';
  import RightWindow from './RightWindow.svelte';

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


  socket.on('syncRoomState', data => {
    roomState = data;
  });

  socket.on('startingGame', () => {
    roomState.currentlyIn = "game";
  });

  socket.on('syncPlayersData', players => {
    playersData = players;
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
      <LeftWindow {socket} />
    </div>
    <div class="main-window app-window text-left">
      {#if roomState.currentlyIn == "lobby" }
      <Lobby {socket} {playerData} {roomState} />
      {:else if roomState.currentlyIn == "game"}
      <Game {socket} {roomState}/>
      {/if}
    </div>
    <div class="right-window app-window">
      <RightWindow {roomState} {playersData} roomCode={params.roomCode} />
    </div>
    {/if}
  </div>
</main>

<style>
  .room-wrapper {
    text-align: center;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .left-window {
    flex-grow: 1;
    min-width: 300px;
  }

  .main-window {
    flex-grow: 4;
    min-width: 300px;
  }

  .right-window {
    flex-grow: 1;
    min-width: 300px;
  }

  .app-window {
    border-radius: 10px;
    margin: 10px 10px;
    padding: 10px;
    background-color: white;
  }

  .spinner-border {
    width: 192px;
    height: 192px;
    border-width: 0.5em;
  }

  @media only screen and (max-width: 1000px) {
  .main-window {
    order: -1;
    width: 100%;
  }
}
</style>