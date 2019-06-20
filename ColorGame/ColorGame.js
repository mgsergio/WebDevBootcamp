'use strict'

const Level = {
    EASY: Symbol('EASY'),
    HARD: Symbol('HARD'),
}

class ColorGame {
    constructor() {
        this.board = new ColorGrid();
        this.display = new GameDisplay();

        this.sampleColor = null;
        this.level = null;
        this.attemptsMade = null;

        this.onWrongPickFoo = null;
        this.onGameOverFoo = null;
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
        const colors = [];
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

        if (this.attemptsMade === this.getMaxAttempts()) {
            this.gameOver(false /* success */);
            return;
        }

        this.onWrongPickFoo();
        this.board.hideTile(tile);
    }

    getColorsNumber() {
        return this.level === Level.EASY ? 3 : 6;
    }

    getMaxAttempts() {
        if (this.level === Level.EASY)
            return 2;
        return 4;
    }

    gameOver(success) {
        if (success) {
            this.board.paintAll(this.sampleColor);
            this.display.paint(this.sampleColor);
        }
        this.board.ignoreClicks();
        this.onGameOverFoo(success);
    }

    onWrongPick(foo) {
        this.onWrongPickFoo = foo;
    }

    onGameOver(foo) {
        this.onGameOverFoo = foo;
    }
}

class GameDisplay {
    echo(rgbColor) {
        let e = document.querySelector(".Display-Color");
        e.textContent = rgbColor;
    }

    paint(color) {
       document.querySelector(".Display").style.backgroundColor = color;
    }
}
