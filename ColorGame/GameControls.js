class GameControls {
    constructor(game) {
        this.game = game

        this.game.onWrongPick(() => this.echo("Try again"));
        this.game.onGameOver(success => {
            if (success) {
                this.echo("Congratulations!");
            } else {
                this.echo("Maybe next time...");
            }
        });

        const newColors = document.querySelector(".Controls-Item_new_game");
        newColors.addEventListener('click', ()  => this.newGame(this.getLevel()));

        const easy = document.querySelector(".Controls-Item_easy");
        easy.addEventListener('click', () => this.newGame(Level.EASY));

        const hard = document.querySelector(".Controls-Item_hard");
        hard.addEventListener('click', () => this.newGame(Level.HARD));
    }

    newGame(level) {
        console.log("New game with level", level);

        const easy = document.querySelector(".Controls-Item_easy");
        const hard = document.querySelector(".Controls-Item_hard");
        if (level === Level.EASY) {
            hard.classList.remove("Controls-Item_active");
            easy.classList.add("Controls-Item_active");
        } else {
            easy.classList.remove("Controls-Item_active");
            hard.classList.add("Controls-Item_active");
        }

        this.echo("");
        this.game.newGame(level);
    }

    getLevel() {
        const selected = document.querySelector(".Controls-Item_active");
        if (selected.classList.contains("Controls-Item_hard")) {
            return Level.HARD;
        }
        return Level.EASY;
    }

    echo(m) {
        const echoArea = document.querySelector(".Controls-Message");
        echoArea.textContent = m;
    }
}
