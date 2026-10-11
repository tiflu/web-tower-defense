class Round {
    constructor(enemySpawns) {
        this.enemySpawns = enemySpawns ? enemySpawns : this.createRandomEnemySpawns();
    }

    async start() {
        for (const enemySpawn of this.enemySpawns) {
            await enemySpawn.spawnAll();
        }
    }

    createRandomEnemySpawns() {
        const enemySpawns = [];
        for (let i = 0; i < randInt(6)+1; i++) {
            const enemies = [];
            for (let j = 0; j < randInt(5)+1; j++) {
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