class Shockwave extends Tower {
    constructor(x, y) {
        super(x, y, 1, 1, "Shockwave", "A tower that does bulk damage in a small radius", "shockwave.png", 100, 200);
    }

    attackHandler() {
        for (const path of this.pathTargets) {
            for (const enemy of path.enemies) {
                enemy.takeDamage(this.damage);
            }
        }
    }

    upgrade() {
        super.upgrade();
        this.attackRate /= 2;
    }
}