<script>
  export let socket
  export let playerData;
  export let roomState;

  let isLoadingPlaylist = false;

  let playlistUrl = roomState.playlist && roomState.playlist.info && roomState.playlist.info.href;
  let lastPlaylistUrlFetched = playlistUrl;
  let validPlaylistSet = false;

  let inviteFriendsUrlInput;

  $: trackRoomStateChange(roomState);

  function trackRoomStateChange(state) {
    isLoadingPlaylist = false;
  }

  function handlePlaylistUrlBlur(){
    if(playlistUrl === lastPlaylistUrlFetched) return;

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

    <span class="form-control" readonly>
    {#if roomState.playlist}
      {#if roomState.playlist.status == 200}
        <a href={roomState.playlist.info.href} target="_blank">{roomState.playlist.info.name} | {roomState.playlist.info.valid_songs} valid songs</a>
      {:else}
        <span class="text-danger">Error: {roomState.playlist.message}</span>
      {/if}
    {:else}
      Playlist not set yet
    {/if}
    </span>
    
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
  <button class="btn btn-primary" on:click={startGame} disabled={!(roomState.playlist && roomState.playlist.status == 200)} title={validPlaylistSet ? '' : "No playlist set"}>Start the game</button>
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