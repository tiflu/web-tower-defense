class Round {
    constructor(roundNum, enemySpawns, goldGranted) {
        this.enemySpawns = enemySpawns ? enemySpawns : this.createRandomEnemySpawns(roundNum);
        this.goldGranted = goldGranted ? goldGranted : randInt(50*roundNum) + 50
    }

    async start() {
        for (const enemySpawn of this.enemySpawns) {
            await enemySpawn.spawnAll();
        }
        game.player.earn(this.goldGranted);
    }

    createRandomEnemySpawns(roundNum) {
        const enemySpawns = [];
        const maxEnemySpawns = randInt(roundNum) + 1;
        for (let i = 0; i < maxEnemySpawns; i++) {
            const enemies = [];
            const maxEnemies = randInt(roundNum*3)+1;
            for (let j = 0; j < maxEnemies; j++) {
                const enemy = new dummyEnemies[randInt(dummyEnemies.length)].constructor();
                enemies.push(enemy);
            }

            const randTime = randInt(10000);
            const enemySpawn = new EnemySpawn(enemies, randTime);
            enemySpawns.push(enemySpawn);
        }
        return enemySpawns;
    }
}