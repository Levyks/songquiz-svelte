<script>
  export let roomState;
  export let roomCode;
  export let playersData;
</script>

<h3>Room {roomCode}</h3>
<hr>
<div class="d-flex flex-row align-items-center mb-2">
  <h5>Players</h5>
  <h6 class="ml-auto">{playersData.length} online</h6>
</div>
<div class="players-wrapper">
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

<style>
  .player-card {
    background-color: #eaeaea;
    padding: 10px;
    border-radius: 10px;
  }

  .players-wrapper {
    overflow-y: auto;
    max-height: 430px;
  }

  .connected {
    color: green;
  }

  .disconnected {
    color: red;
  }
</style>