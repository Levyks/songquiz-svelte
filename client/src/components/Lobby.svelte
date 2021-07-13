<script>
  export let socket
  export let playerData;

  let isLoadingPlaylist = false;
  let errorFetchingPlaylist = false;

  let playlistUrl;
  let lastPlaylistUrlFetched;
  let playlistInfo = {};
  let playlistLabel = "";

  let inviteFriendsUrlInput;

  socket.on('playlistUpdated', data => {
    if(data.status === 200){
      playlistInfo = data.playlistInfo;

      playlistLabel = `${playlistInfo.name} | ${playlistInfo.valid_songs} valid songs`;

      errorFetchingPlaylist = false;
      isLoadingPlaylist = false;
    } else {

      playlistLabel = `Error: ${data.message}`;

      errorFetchingPlaylist = true;
      isLoadingPlaylist = false;
    }
  });

  function handlePlaylistUrlBlur(){
    if(!playlistUrl || playlistUrl === lastPlaylistUrlFetched) return;

    isLoadingPlaylist = true;
    lastPlaylistUrlFetched = playlistUrl;

    socket.emit('setPlaylist', {playlistUrl});
      
  }

  function handleCopyUrlClick(){
    inviteFriendsUrlInput.select();
    document.execCommand("copy");
  }

  function startGame(){
    socket.emit('startGame');
  }


</script>

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

<div class="form-group">
  <label for="invite-friends-input">Invite friends</label>
  <div class="input-group mb-1">

    <input class="form-control" value={location.href} bind:this={inviteFriendsUrlInput} id="invite-friends-input" readonly>
    
    <div class="input-group-append">
      <button class="btn btn-outline-secondary" on:click={handleCopyUrlClick}>
        <i class="fas fa-copy"></i>
      </button> 
    </div>
  </div>
</div>

<div class=text-center>
{#if playerData.isLeader}
  <button class="btn btn-primary" on:click={startGame}>Start the game</button>
{:else}
  <button class="btn btn-primary" disabled>Waiting for the leader to start</button>
{/if}
</div>

<style>  
.spinner-border {
  width: 22px;
  height: 22px;
}
</style>