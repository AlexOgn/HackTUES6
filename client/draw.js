var game_canvas = document.getElementById("game_canvas");
game_canvas.width = window.innerWidth;
game_canvas.height = window.innerHeight;
var game_ctx = game_canvas.getContext("2d");
game_ctx.translate(cell_size * -100, cell_size * -100);

const draw_street = (ctx, map, size, y, x) => {
    ctx.fillStyle = "#bbb";
    let half = size / 2;
    let quart = half / 2;
    ctx.fillRect(quart, quart, half, half);
    const can_connect = (diry, dirx) => (get_member(map, y + diry, x + dirx) !== undefined);
    const draw_arm = (y, x) => {
        ctx.save();
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

const draw_intersection = (ctx, map, y, x, size) => {
    const can_connect = (diry, dirx) => (get_member(map, y + diry, x + dirx) !== undefined);
    let dir = map[y][x].turn();
    const light = (test_dir) => (test_dir == dir ? assets.green_img : assets.red_img);
    let quart = size/4;
    let eighth = size / 8;
    const draw_light = (type, y, x) => ctx.drawImage(type, x + eighth, y + eighth, quart, quart);
    if (can_connect(-1, 0)) draw_light(light("up"), 0 * quart, 1 * quart); // UP
    if (can_connect(0, -1)) draw_light(light("left"), 1 * quart, 0 * quart); // LEFT
    if (can_connect(1, 0)) draw_light(light("down"), 2 * quart, 1 * quart);  // DOWN
    if (can_connect(0, 1)) draw_light(light("right"), 1 * quart, 2 * quart);  // RIGHT
};

const draw_map = (ctx, build_map, car_map, size) => {
    let quart = size / 4;
    ctx.save();
    for (let y = 0; y < build_map.length; y++) {
        for(let x = 0; x < build_map[y].length; x++) {
            ctx.save();
            ctx.translate(x*size, y*size);
            ctx.fillStyle = "#8acd60";
            ctx.fillRect(0, 0, size, size);
            if (get_member(build_map, y, x) === undefined) {ctx.restore(); continue;}
            draw_street(ctx, build_map, size, y, x);
            if (build_map[y][x].type == "Factory")
                ctx.drawImage(assets.factory_img, 0, 0, size, size);
            else if (build_map[y][x].type == "House")
                ctx.drawImage(assets.house_img, 0, 0, size, size);
            ctx.restore();              
        }
    }
    for (let y = 0; y < car_map.length; y++) {
        for (let x = 0; x < car_map[y].length; x++) {
            ctx.save();
            ctx.translate(x * quart, y * quart);
            if(car_map[y][x] === undefined) {ctx.restore(); continue;}
            ctx.drawImage(assets.car_img, 0, 0, quart, quart);
            ctx.restore();
        }
    }
    for (let y = 0; y < build_map.length; y++) {
        for (let x = 0; x < build_map[y].length; x++) {
            ctx.save();
            ctx.translate(x*size, y*size);
            if (is_intersection(build_map, y, x)) {
                draw_intersection(ctx, build_map, y, x,  size);
            }
            ctx.restore();
        }
    }
    ctx.restore();
}

const redraw = () => {
    game_ctx.save();
    game_ctx.setTransform(1, 0, 0, 1, 0, 0);
    game_ctx.fillStyle = "#8acd60";
    game_ctx.fillRect(0, 0, game_canvas.width, game_canvas.height);
    game_ctx.restore();
    draw_map(game_ctx, build_map, car_map, cell_size);
    window.requestAnimationFrame(redraw);
}

redraw();
