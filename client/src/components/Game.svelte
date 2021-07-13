<script>
  export let socket;

  let roundInProgress = false;
  let roundData = {};
  let choicesButtonsData = [];
  let timeRemaining = 0;

  socket.on('roundStarting', data => {
    roundInProgress = true;
    roundData = data;

    choicesButtonsData = formatChoices(data);

    timeRemaining = roundData.time;
    const timer = setInterval(() => {
      timeRemaining-=1;
      if(timeRemaining <= 0){
        //roundInProgress = false;
        clearInterval(timer);
      } 
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


</script>

<div class="text-center">
  <span>Hello World</span>
  {#if roundInProgress}
  <h1>{timeRemaining} seconds</h1>

  {#each choicesButtonsData as choiceButton, i}
    <button class="btn btn-light choice-btn">{choiceButton}</button>
  {/each}
  {/if}
</div>

<style>
  .choice-btn {
    width: 100%;
    border-color: rgb(0 0 0 / 50%);
  }
</style>
