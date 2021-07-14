<script>
  export let socket;
  export let gameIsStarting;

  let roundInProgress = false;
  let showRoundResults = false;
  let roundData = {};
  let choicesButtonsData = [];
  let choosenChoice = false;
  let correctChoice = false;
  let wrongChoice = false;
  let timeRemaining = 0;

  let nextRoundStartsIn;

  let roundResults = {};

  let volume = 50;

  let audioElement;

  socket.on('startingRound', data => {
    roundData = data;

    roundInProgress = true;
    showRoundResults = false;
    gameIsStarting = false;

    choosenChoice = false;
    correctChoice = false;
    wrongChoice = false;

    audioElement.src = data.trackToPlay;
    audioElement.volume = volume/100;
    audioElement.play();

    choicesButtonsData = formatChoices(data);

    timeRemaining = roundData.remainingTime;
    const timer = setInterval(() => {
      timeRemaining-=1;
      if(timeRemaining <= 0){
        clearInterval(timer);
        timeEnded();
      } 
    }, 1000);
  });

  function timeEnded() {
    audioElement.pause();
    audioElement.currentTime = 0;
  }

  socket.on('roundResult', result => {
    roundResults = result;
    if(result.gotItRight){
      correctChoice = choosenChoice;
    } else {
      correctChoice = result.correctChoice;
      wrongChoice = choosenChoice;
    }
    choosenChoice = false;

    nextRoundStartsIn = result.nextRoundStartingIn;

    const nextRoundTimer = setInterval(() => {
      nextRoundStartsIn-=1;
      if(nextRoundStartsIn <= 0){
        clearInterval(nextRoundTimer);
      } 
    }, 1000);

    setTimeout(() => {
      showRoundResults = true;
      roundInProgress = false;
    }, 1000);
  });

  function formatChoices(data) {
    const output = [];
    data.choices.forEach(choice => {
      switch(data.type) {
        case "artist":
          const artistsString = choice.artists.map(e => e.name).join(', ');
          output.push(artistsString);
          break;
        case "song":
          output.push(choice.name);
          break;
        default:
          break;
      }
    });
    return output;
  }

  function handleVolumeInput(e){
    volume = e.target.value;
    audioElement.volume = e.target.value/100;
  }

  function handleChoiceClick(e) {
    choosenChoice = parseInt(e.target.value);
    socket.emit("roundChoice", choosenChoice);
  }

</script>

<div class="text-center">
  {#if gameIsStarting}
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  {:else if roundInProgress}

    <h2>Round {roundData.number+1}</h2>

    {#if timeRemaining}
    <h3 class="text-secondary">{timeRemaining} seconds</h3>
    {/if}

    <h2>{roundData.type == "artist" ? "Guess the artist(s)" : "Guess the song"}</h2>

    {#each choicesButtonsData as choiceButtonText, i}
      <button 
        class={`btn choice-btn ${
          i === correctChoice ? 'btn-success' : 
          i === wrongChoice ? 'btn-danger' : 
          i === choosenChoice ? 'btn-secondary' : 
          'btn-light'}`} 
          
        value={i} 
        on:click={handleChoiceClick}
        disabled={!!choosenChoice}>
          {choiceButtonText}
        </button>
    {/each}

    <input type="range" class="volume-input" value={volume} on:input={handleVolumeInput} min="0" max="100">
  {:else if showRoundResults}
    <h3>Round results:</h3>
    <ul class="list-group">
      {#each roundResults.playersThatGotItRight as player, i}
      <li class="list-group-item">{i+1}º {player.username} - {player.score} pts</li>
      {/each}
      {#if !roundResults.playersThatGotItRight.length}
      <li class="list-group-item">No one got it right :(</li>
      {/if}
    </ul>
    <h4 class="text-secondary">Next round starts in {nextRoundStartsIn}</h4>
  {/if}
</div>

<audio bind:this={audioElement}>
  <track kind="captions">
</audio>

<style>
  .choice-btn {
    width: 100%;
    border-color: rgb(0 0 0 / 50%);
  }

  .spinner-border {
    width: 192px;
    height: 192px;
    border-width: 0.5em;
  }

  .volume-input {
    width: 100%;
  }
</style>
