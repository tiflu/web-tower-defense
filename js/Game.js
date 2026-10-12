class Game {
    constructor(grid, player) {
        this.grid = grid;
        this.player = player;
        this.currentRound = 0;
        this.auto = false;
    }

    setRounds(rounds) {
        this.rounds = rounds;
    }

    async startRound() {
        const round = this.rounds[this.currentRound++];
        updateInfo();
        await round.start();
    }
}