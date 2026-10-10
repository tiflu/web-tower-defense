class Enemy {
    constructor(texture, health=10, defense=0, speed=1, value=10) {
        this.health = health;
        this.defense = defense;
        this.value = value;
        this.speed = speed;
        this.texture = texture;
        this.DOMElement = this.createDOMElement();
        this.pathIndex = 0;
        document.getElementById("enemies").append(this.DOMElement);
        this.moveHandler();
    }

    createDOMElement() {
        const FILE_PATH = "./texture/enemy/"
        const element = document.createElement("div");
        const mainTexture = document.createElement("img");
        mainTexture.src = FILE_PATH + this.texture;
        element.classList.add("enemy");
        element.style.height = 100 / grid.size + "%";
        element.style.width = 100 / grid.size + "%";
        element.append(mainTexture);
        return element;
    }

    moveHandler() {
        setTimeout(() => {
            this.move()
            if (this.isValid()) {
                this.moveHandler();
            } else {
                this.die();
            }
        }, 1000/this.speed)
    }

    isValid() {
        return this.health > 0 && this.pathIndex < grid.path.length - 1
    }

    move() {
        const oldPath = grid.path[this.pathIndex];
        oldPath.enemies.splice(oldPath.enemies.indexOf(this), 1);
        const newPath = grid.path[++this.pathIndex]
        newPath.enemies.push(this);
        const pathBounds = newPath.DOMElement.getBoundingClientRect();
        this.DOMElement.style.top = pathBounds.top + "px";
        this.DOMElement.style.left = pathBounds.left + "px";
    }

    takeDamage(amount) {
        this.health -= amount;
        return this.health < 0;
    }

    die() {
        player.earn(this.value);
        // I feel like this could be implemented more performantly
        // Maybe add an alive field and have a global listener "clean" every once in a while?
        this.DOMElement.remove();
        for (const path of grid.path) {
            for (const enemy of path.enemies) {
                if (enemy === this) {
                    path.enemies.splice(path.enemies.indexOf(this), 1);
                    return;
                }
            }
        }
        throw new Error("Enemy not found!");
    }
}