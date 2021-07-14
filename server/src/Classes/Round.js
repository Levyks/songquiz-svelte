const TIME_TO_CLOSE_OFFSET = 1;
const TIME_BETWEEN_ROUNDS = 4;

class Round {
  constructor(roundNumber, game) {
    this.roundNumber = roundNumber;

    this.game = game;
    this.room = this.game.room;
    this.players = this.room.players;
    this.playersAnswers = {};
  
    this.generateRoundType();
    this.generateChoices(4);
  }

  generateRoundType() {
    this.roundType = Math.random() < 0.5 ? "artist" : "song";
    this.roundType = "song";
    return this.roundType; 
  }

  generateChoices(numberOfChoices) {
    const indexes = [];
    const numberOfValidSongs = this.game.playlistInfo.playlistInfo.valid_songs;
    
    while(indexes.length < numberOfChoices) {
      const randomIndex = Math.floor(Math.random()*numberOfValidSongs);
      if(!indexes.includes(randomIndex)) indexes.push(randomIndex);
    }

    this.correctChoice = Math.floor(Math.random()*numberOfChoices);

    console.log(`correct choice = ${this.correctChoice}`);

    this.choices = []

    indexes.forEach(index => {
      this.choices.push(this.game.playlistTracks[index]);
    })
  }

  startRound() {
    console.log(`Round ${this.roundNumber} in room ${this.game.room.code} starting`);

    this.openToAnswers = true;
    this.startedAt = Date.now();
    
    this.room.ioChannel.emit("startingRound", this.getRoundState(true));

    setTimeout(() => {this.endRound()}, (this.game.timePerRound + TIME_TO_CLOSE_OFFSET) * 1000);
  }

  endRound() {
    this.openToAnswers = false;

    const playersThatGotItRight = [];

    Object.keys(this.playersAnswers).forEach(username => {
      if(this.playersAnswers[username].gotItRight) {
        playersThatGotItRight.push({
          username,
          score: this.playersAnswers[username].score
        });
        this.players[username].score += this.playersAnswers[username].score;
      }
    });
    playersThatGotItRight.sort((a, b) => a.score < b.score ? 1 : -1);

    Object.keys(this.players).forEach(username => {
      let answerData = this.playersAnswers[username] || {
        gotItRight: false,
        score: 0,
      }  

      answerData.correctChoice = this.correctChoice;
      answerData.playersThatGotItRight = playersThatGotItRight;
      answerData.nextRoundStartingIn = TIME_BETWEEN_ROUNDS;

      this.players[username].socket.emit("roundResult", answerData);
    });

    this.room.syncPlayersData();
    setTimeout(() => {
      this.game.startRound(this.roundNumber+1);
    }, TIME_BETWEEN_ROUNDS * 1000);
  }

  getTimeRemaining(justStarted = false, round = true) {
    if(justStarted) return this.game.timePerRound;
    let timeRemaining = this.game.timePerRound - (Date.now() - this.startedAt)/1000;
    if(round) timeRemaining = Math.ceil(timeRemaining);

    return timeRemaining;
  }

  getRoundState(justStarted = false) {
    return {
      type: this.roundType,
      choices: this.choices,
      trackToPlay: this.choices[this.correctChoice].preview_url,
      number: this.roundNumber,
      remainingTime: this.getTimeRemaining(justStarted)
    }
  }

  handleChoice(player, choice) {
    if(this.playersAnswers[player.username]) return;

    this.playersAnswers[player.username] = {
      gotItRight: choice == this.correctChoice,
      score: choice == this.correctChoice ? Math.ceil((this.getTimeRemaining(false, false)/this.game.timePerRound) * 200 ) + 100 : 0
    }
  }
}

module.exports = Round;