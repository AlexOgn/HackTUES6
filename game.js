var game_canvas = document.getElementById("game-canvas");
var game_ctx = game_canvas.getContext("2d");

const draw_street = (ctx, map, size, y, x) => {
    //TODO
}

const draw_map = (ctx, map, size) => {
    for (let y = 0; y < map.length; y++) {
        for(let x = 0; x < map[y].length; x++) {
            if (undefined_member(map, y, x) === undefined) continue;
            if (map[y][x].type == "Factory")
                ctx.drawImage(assets.factory_img, x * size, y * size, size, size);
            else if (map[y][x].type == "House")
                ctx.drawImage(assets.house_img, x * size, y * size, size, size);
            draw_street(ctx, map, size, y, x);
        }
    }
}

const redraw = () => {
    //game_ctx.save();
    game_ctx.setTransform(1, 0, 0, 1, 0, 0);
    game_ctx.clearRect(0, 0, game_canvas.width, game_canvas.height);
    //game_ctx.restore();
    draw_map(game_ctx, test, 50);
    window.requestAnimationFrame(redraw);
}

redraw();
