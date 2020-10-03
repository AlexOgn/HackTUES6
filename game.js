var game_canvas = document.getElementById("game-canvas");
game_canvas.width = window.innerWidth;
game_canvas.height = window.innerHeight;
var game_ctx = game_canvas.getContext("2d");

const draw_street = (ctx, map, size, y, x) => {
    ctx.fillStyle = "Gray";
    let half = size / 2;
    let quart = half / 2;
    const can_connect = (diry, dirx) => (undefined_member(map, y + diry, x + dirx) !== undefined);
    const draw_arm = (y, x) => {
        ctx.save();
        ctx.fillRect(quart, quart, half, half);
        ctx.translate(Math.abs(y) * quart, Math.abs(x) * quart);
        y = (y + 1) * y;
        x = (x + 1) * x;
        ctx.fillRect(x * quart , y * quart, half, half);
        ctx.restore();
    };
    if (can_connect( 0,  1)) draw_arm( 0,  1);
    if (can_connect( 0, -1)) draw_arm( 0, -1);
    if (can_connect( 1,  0)) draw_arm( 1,  0);
    if (can_connect(-1,  0)) draw_arm(-1,  0);
    
}

const draw_map = (ctx, map, size) => {
    for (let y = 0; y < map.length; y++) {
        for(let x = 0; x < map[y].length; x++) {
            ctx.save();
            ctx.translate(x*size, y*size);
            ctx.fillStyle = "Green";
            ctx.fillRect(0, 0, size, size);
            if (undefined_member(map, y, x) === undefined) {ctx.restore(); continue;}
            draw_street(ctx, map, size, y, x);
            if (map[y][x].type == "Factory")
                ctx.drawImage(assets.factory_img, 0, 0, size, size);
            else if (map[y][x].type == "House")
                ctx.drawImage(assets.house_img, 0, 0, size, size);

            ctx.restore();              
        }
    }
}

const redraw = () => {
    game_ctx.save();
    game_ctx.setTransform(1, 0, 0, 1, 0, 0);
    //game_ctx.clearRect(0, 0, game_canvas.width, game_canvas.height);
    game_ctx.restore();
    draw_map(game_ctx, test, 100);
    window.requestAnimationFrame(redraw);
}
redraw();
