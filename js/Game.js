class Game {
    constructor(grid, player) {
        this.grid = grid;
        this.player = player;
        this.currentRound = 0;
    }

    setRounds(rounds) {
        this.rounds = rounds;
    }

    async start() {
        for (let i in this.rounds) {
            i = Number.parseInt(i);
            this.currentRound = i;
            const round = this.rounds[i];
            updateInfo();
            await round.start();
            await wait(10000);
        }
    }
}