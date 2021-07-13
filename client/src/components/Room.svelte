<script>
  import { push } from 'svelte-spa-router';
  import { io } from 'socket.io-client';
  import axios from 'axios';

  export let params;

  const roomCode = JSON.parse(sessionStorage.getItem('roomCode'));
  const playerData = JSON.parse(sessionStorage.getItem('playerData'));

  let playersData = [];

  let isLoadingPlaylist = false;
  let errorFetchingPlaylist = false;

  let playlistUrl;
  let lastPlaylistUrlFetched;
  let playlistInfo = {};
  let playlistLabel = "";

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
  
  socket.on('syncPlayersData', players => {
    playersData = players;
  });

  socket.on('playlistUpdated', data => {
    if(data.status === 200){
      playlistInfo = data.playlistInfo;

      playlistLabel = `${playlistInfo.name} | ${playlistInfo.tracks.total} songs`;

      errorFetchingPlaylist = false;
      isLoadingPlaylist = false;
    } else {

      playlistLabel = `Error: ${data.message}`;

      errorFetchingPlaylist = true;
      isLoadingPlaylist = false;
    }
  });

  connectToRoom(roomCode, playerData);

  function handlePlaylistUrlBlur(){
    if(!playlistUrl || playlistUrl === lastPlaylistUrlFetched) return;

    isLoadingPlaylist = true;
    lastPlaylistUrlFetched = playlistUrl;

    socket.emit('setPlaylist', {playlistUrl});
      
  }


</script>

<main>
  <div class="mb-2"></div>
  <div class="room-wrapper">
    <div class="left-window app-window">

    </div>
    <div class="main-window app-window">

      <div class="form-group">
        <label for="username-input">Username</label>
        <input class="form-control" value={playerData.username} id="username-input" readonly>
      </div>
      
      <div class="form-group">
        <label for="playlist-input">Playlist</label>
        <div class="input-group mb-1">
          <input class="form-control" class:text-danger={errorFetchingPlaylist} placeholder="Playlist not set yet" id="playlist-input" value={playlistLabel} readonly>
          {#if isLoadingPlaylist}
          <div class="input-group-append">
            <span class="input-group-text">
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </span>
          </div>
          {/if}
        </div>
        {#if playerData.isLeader}
        <input class="form-control" on:blur={handlePlaylistUrlBlur} bind:value={playlistUrl} placeholder="An spotify playlist URL" id="playlist-url-input">
        {/if}
      </div>  

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

  .spinner-border {
    width: 22px;
    height: 22px;
  }

</style>