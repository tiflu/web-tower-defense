class EnemySpawn {
    constructor(enemies, timeToWait) {
        this.enemies = enemies;
        this.timeToWait = timeToWait;
    }

    async spawnAll() {
        for (const enemy of this.enemies) {
            enemy.spawn();
        }
        await wait(this.timeToWait);
    }
}