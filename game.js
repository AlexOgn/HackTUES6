var game_mouse_x;
var game_mouse_y;
var money = 0;

window.addEventListener("mousemove", (e) => {
    let canvas_pos = document.getElementById("game_canvas").getBoundingClientRect();
    game_mouse_x = e.clientX - canvas_pos.x;
    game_mouse_y = e.clientY - canvas_pos.y;
}); 

const is_intersection = (map, y, x) => {
    if(get_member(map, y, x, "type") !== "Street") return false;
    const can_connect = (diry, dirx) => (get_member(map, y + diry, x + dirx) !== undefined);
    let connections = 0;
    if (can_connect( 0,  1)) connections++;
    if (can_connect( 0, -1)) connections++;
    if (can_connect( 1,  0)) connections++;
    if (can_connect(-1,  0)) connections++;
    return connections >= 3;
}

function get_map_element(ctx, size){
    var matrix = ctx.getTransform();
    var imatrix = matrix.invertSelf();

    var x = game_mouse_x * imatrix.a + game_mouse_y * imatrix.c + imatrix.e;
    var y = game_mouse_x * imatrix.b + game_mouse_y * imatrix.d + imatrix.f;
    
    var mapx = Math.floor(x / size);
    var mapy = Math.floor(y / size);
    return {x:mapx, y:mapy};
}

function traffic_config(map, position){
    if (get_member(map, position.y, position.x) === undefined) {
        map[position.y] = map[position.y] || [];
        for(let i = 0; i < map.length; i++) map[i] = map[i] || [];
        map[position.y][position.x] = new Street();
        money--;
        return;
    }
    if(!is_intersection(map, position.y, position.x)) return;

    // currying is VERY important
    document.getElementById("submit").onclick = () => {
        map[position.y][position.x].config();
        document.getElementById("traffic_editor_div").style="display: none";
        delay = 2;
    }

    delay = Infinity;
    document.getElementById("traffic_editor_div").style="display:block";
    document.getElementById("up").value = map[position.y][position.x].sequence_length[0].size;
    document.getElementById("down").value = map[position.y][position.x].sequence_length[1].size;
    document.getElementById("right").value = map[position.y][position.x].sequence_length[2].size;
    document.getElementById("left").value = map[position.y][position.x].sequence_length[3].size;
}

game_canvas.addEventListener('click', () => traffic_config(build_map, get_map_element(game_ctx, cell_size)));

const add_house = (map) => {
    let next_map = clone(map);
    let candidates = [];
    let factories = [];
    const push_cand = (y, x) => {
        if(get_member(map, y, x) !== undefined) return;
        candidates.push({y:y, x:x});
    }
    for(let i = 0; i < map.length; i++) {
        for(let j = 0; j < map[i].length; j++) {
            if (get_member(map, i, j, "type") == "Factory") {
                factories.push({x:j, y:i});
                continue;
            }
            if (get_member(map, i, j, "type") != "Street") continue;
            push_cand(i - 4, j);
            push_cand(i + 4, j);
            push_cand(i, j + 4);
            push_cand(i, i - 4);
        }
    }
    candidates.sort(() => Math.random() - 0.5);
    factories.sort(() => Math.random() - 0.5);
    next_map[candidates[0].y][candidates[0].x] = new Building("House", [factories[0]]);
    return next_map;
}

const add_factory = (map) => {
    let next_map = clone(map);
    let candidates = [];
    const push_cand = (y, x) => {
        if(get_member(map, y, x) !== undefined) return;
        candidates.push({y:y, x:x});
    }
    for(let i = 0; i < map.length; i++) {
        for(let j = 0; j < map[i].length; j++) {
            if (get_member(map, i, j, "type") != "Street") continue;
            push_cand(i - 8, j);
            push_cand(i + 8, j);
            push_cand(i, j + 8);
            push_cand(i, i - 8);
        }
    }
    candidates.sort(() => Math.random() - 0.5);
    next_map[candidates[0].y][candidates[0].x] = new Building("Factory", []);
    return next_map;
}
