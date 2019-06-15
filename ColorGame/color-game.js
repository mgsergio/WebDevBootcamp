'use strict'

function makeBoardMarkup(colors) {
    let mkTile = x => `<div class="ColorGrid-Tile" style="background: ${x}"></div>`;
    return `
        <div class="ColorGrid">
            <div class="ColorGrid-Container">
                ${colors.map(mkTile).join('')}
            </div>
        </div>
        `
}

function randomInt(min, max) {
    return min + Math.floor(Math.random() * max);
}

function randomByte() {
    return randomInt(0, 256);
}

class Color {
    constructor() {
        if (arguments.length === 1) {
            this.r = arguments[0][0];
            this.g = arguments[0][1];
            this.b = arguments[0][2];
        } else {
            this.r = arguments[0];
            this.g = arguments[1];
            this.b = arguments[2];
        }
    }

    static random() {
        return new Color(
            randomByte(),
            randomByte(),
            randomByte()
        );
    }

    toRGBString() {
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }

    equals(o) {
        return (
            this.r === o.r &&
            this.g === o.g &&
            this.b === o.g
        )
    }
}

const Level = {
    EASY: 1,
    HARD: 2,
}

class ColorGame {
    constructor() {
        this.board = new ColorGrid();
        this.display = new GameDisplay();

        this.sampleColor = null;
        this.level = null;
        this.attemptsMade = null;
    }

    newGame(level) {
        this.level = level;
        this.attemptsMade = 0;

        const numColors = this.getColorsNumber();
        const colors = this.generateColors(numColors);

        this.sampleColor = colors[randomInt(0, numColors)].toRGBString();

        this.display.echo(this.sampleColor);

        this.board.destroy();
        this.board.setColors(colors);
        this.board.draw(document.body);
        this.board.onTileClicked(this.colorPicked.bind(this));
    }

    generateColors(n) {
        let colors = [];
        for (let i = 0; i < n; ++i) {
            colors.push(Color.random());
        }
        return colors;
    }

    colorPicked(rgbColor, tile) {
        ++this.attemptsMade;

        if (this.sampleColor === rgbColor) {
            this.gameOver(true /* success */);
            return;
        }
        console.log(`${this.attemptsMade}: ${this.getMaxAttempts()}`);
        if (this.attemptsMade === this.getMaxAttempts()) {
            this.gameOver(false /* success */);
            return;
        }

        this.board.hideTile(tile);
    }

    getColorsNumber() {
        return this.level * 3;
    }

    getMaxAttempts() {
        if (this.level === Level.EASY)
            return 2;
        return 4;
    }

    gameOver(success) {
        this.board.ignoreClicks();
        alert(success ? "Congrats!" : "Sorry, try again.");
    }
}

class GameDisplay {
    echo(rgbColor) {
        let e = document.querySelector(".Display-Color");
        e.textContent = rgbColor;
    }
}

class GameControls {
    constructor(game) {
        this.game = game
        let self = this;

        let newColors = document.querySelector(".Controls-Item_new_game");
        newColors.addEventListener('click', function () {
            self.newGame(self.getLevel());
        });

        let easy = document.querySelector(".Controls-Item_easy");
        easy.addEventListener('click', function () {
            self.newGame(Level.EASY);
        });

        let hard = document.querySelector(".Controls-Item_hard");
        hard.addEventListener('click', function () {
            self.newGame(Level.HARD);
        });
    }

    newGame(level) {
        console.log("New game with level", level);

        let easy = document.querySelector(".Controls-Item_easy");
        let hard = document.querySelector(".Controls-Item_hard");
        if (level === Level.EASY) {
            hard.classList.remove("Controls-Item_active");
            easy.classList.add("Controls-Item_active");
        } else {
            easy.classList.remove("Controls-Item_active");
            hard.classList.add("Controls-Item_active");
        }

        this.game.newGame(level);
    }

    getLevel() {
        let selected = document.querySelector(".Controls-Item_active");
        if (selected.classList.contains("Controls-Item_hard")) {
            return Level.HARD;
        }
        return Level.EASY;
    }
}

class ColorGrid {
    constructor(colors) {
        this.colors = null;
        this.htmlElem = null;
    }

    setColors(colors) {
        const n = colors.length;
        console.assert(
            n === 3 || n === 6,
            `Number of color tiles sould be 3 or 6, not ${n}`
        );

        this.colors = colors;
    }

    destroy() {
        if (this.htmlElem === null)
            return;

        this.htmlElem.remove();
        this.htmlElem = null;
    }

    draw(parent) {
        let tmpl = document.createElement("template");
        tmpl.innerHTML = makeBoardMarkup(
            this.colors.map(x => x.toRGBString())
        ).trim();

        this.htmlElem = tmpl.content.firstChild;
        parent.appendChild(this.htmlElem);
    }

    hideTile(tile) {
        tile.classList.toggle("ColorGrid-Tile_hidden");
        tile.removeAttribute("style");
    }

    onTileClicked(foo) {
        this.tileClickedFoo =  function (e) {
            foo(e.target.style.background, e.target);
        };

        let tiles = document.querySelectorAll(".ColorGrid-Tile");
        for (let i = 0; i < tiles.length; ++i) {
            tiles[i].addEventListener("click", this.tileClickedFoo);
        }
    }

    ignoreClicks() {
        let tiles = document.querySelectorAll(".ColorGrid-Tile");
        for (let i = 0; i < tiles.length; ++i) {
            tiles[i].removeEventListener("click", this.tileClickedFoo);
        }
    }
}
