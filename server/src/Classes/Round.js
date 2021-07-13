class Round {
  constructor(roundNumber, game) {
    this.roundNumber = roundNumber;
    this.game = game;
    this.generateRoundType();
    this.generateChoices(4);
  }

  generateRoundType() {
    this.roundType = Math.random() ? "artist" : "song";
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

    this.choices = []

    indexes.forEach(index => {
      this.choices.push(this.game.playlistTracks[index]);
    })
  }

  startRound(){
    console.log(`Round ${this.roundNumber} in room ${this.game.room.code} starting`)
    this.game.room.ioChannel.emit('roundStarting', {
      type: this.roundType,
      choices: this.choices,
      track: this.game.playlistTracks[this.correctChoice].preview_url,
      number: this.roundNumber,
      time: this.game.timePerRound,
    });
    this.openToAnswers = true;
    setTimeout(() => {this.openToAnswers = false}, this.game.timePerRound * 1000);
  }
}

module.exports = Round;