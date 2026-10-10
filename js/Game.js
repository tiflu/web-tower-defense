class Game {
    constructor(grid, player) {
        this.grid = grid;
        this.player = player;
    }

    setRounds(rounds) {
        this.rounds = rounds;
    }

    async start() {
        for (const round of this.rounds) {
            await round.start();
            await wait(10000);
        }
    }
}