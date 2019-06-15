class GameControls {
    constructor(game) {
        this.game = game
        let self = this;

        this.game.onWrongPick(this.echo.bind(this, "Try again"));
        this.game.onGameOver(function (success) {
            if (success) {
                self.echo("Congratulations!");
            } else {
                self.echo("Maybe next time...");
            }
        });

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

        this.echo("");
        this.game.newGame(level);
    }

    getLevel() {
        let selected = document.querySelector(".Controls-Item_active");
        if (selected.classList.contains("Controls-Item_hard")) {
            return Level.HARD;
        }
        return Level.EASY;
    }

    echo(m) {
        let echoArea = document.querySelector(".Controls-Message");
        echoArea.textContent = m;
    }
}
