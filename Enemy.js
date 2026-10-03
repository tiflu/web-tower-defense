class Enemy {
    constructor(texture, health=10, defense=0, speed=1) {
        this.health = health;
        this.defense = defense;
        this.speed = speed;
        this.texture = texture;
        this.DOMElement = this.createDOMElement();
        this.pathIndex = 0;
        document.getElementById("enemies").append(this.DOMElement);
        this.moveHandler();
    }

    createDOMElement() {
        const element = document.createElement("div");
        const mainTexture = document.createElement("img");
        mainTexture.src = this.texture;
        element.classList.add("enemy");
        element.append(mainTexture);
        return element;
    }

    moveHandler() {
        setTimeout(() => {
            this.move()
            if (this.isValid()) {
                this.moveHandler();
            } else {
                // todo remove references to the object in others
                this.DOMElement.remove();
            }
        }, 1000/this.speed)
    }

    isValid() {
        return this.health > 0 && this.pathIndex < grid.path.length - 1
    }

    move() {
        console.log(this.health);
        const oldPath = grid.path[this.pathIndex];
        oldPath.enemies.splice(oldPath.enemies.indexOf(this), 1);
        const newPath = grid.path[++this.pathIndex]
        newPath.enemies.push(this);
        const pathBounds = newPath.DOMElement.getBoundingClientRect();
        this.DOMElement.style.top = pathBounds.top + "px";
        this.DOMElement.style.left = pathBounds.left + "px";
    }
}