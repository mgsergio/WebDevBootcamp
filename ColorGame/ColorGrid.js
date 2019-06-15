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

    paintAll(color) {
        let tiles = document.querySelectorAll(".ColorGrid-Tile");
        for (let i = 0; i < tiles.length; ++i) {
            if (tiles[i].classList.contains("ColorGrid-Tile_hidden")) {
                continue
            }
            tiles[i].style.backgroundColor = color;
        }
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
