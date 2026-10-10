class Player {
    constructor() {
        this.health = 100;
        this.gold = 100;
    }

    takeDamage(amount) {
        this.health -= amount;
        if (this.health < 0) {
            this.health = 0;
            updateInfo();
            this.gameOver();
        }
        updateInfo();
    }

    heal(amount) {
        this.health += amount;
        updateInfo();
    }

    canAfford(cost) {
        return this.gold >= cost;
    }

    spend(cost) {
        if (!this.canAfford(cost)) return false;
        this.gold -= cost;
        updateInfo();
        return true;
    }

    earn(amount) {
        this.gold += amount;
        updateInfo();
    }

    gameOver() {
        alert("You lose!!!!!");
        window.location.reload();
    }
}