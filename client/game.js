var game_mouse_x;
var game_mouse_y;
var placing_road = false;

window.addEventListener("mousemove", (e) => {
    let canvas_pos = document.getElementById("game_canvas").getBoundingClientRect();
    game_mouse_x = e.clientX - canvas_pos.x;
    game_mouse_y = e.clientY - canvas_pos.y;
}); 

function get_map_element(ctx, size){
    var matrix = ctx.getTransform();
    var imatrix = matrix.invertSelf();

    var x = game_mouse_x * imatrix.a + game_mouse_y * imatrix.c + imatrix.e;
    var y = game_mouse_x * imatrix.b + game_mouse_y * imatrix.d + imatrix.f;
    
    var mapx = Math.floor(x / size);
    var mapy = Math.floor(y / size);
    return {x:mapx, y:mapy};
}

function symbol_to_val(symbol){
    switch(symbol){
        case "^":
            return 0;
            break;
        case "V":
            return 1; 
            break;
        case "<":
            return 2;
            break;
        case ">":
            return 3;
            break;
    }
}


function traffic_config(map, position){
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

    document.getElementById("first").selectedIndex = symbol_to_val(map[position.y][position.x].sequence_length[0].element);
    document.getElementById("second").selectedIndex = symbol_to_val(map[position.y][position.x].sequence_length[1].element);
    document.getElementById("third").selectedIndex = symbol_to_val(map[position.y][position.x].sequence_length[2].element);
    document.getElementById("fourth").selectedIndex = symbol_to_val(map[position.y][position.x].sequence_length[3].element);
}

const build_road = (map, pos) => {
    if (get_member(map, pos.y, pos.x) === undefined && placing_road) {
        map[pos.y] = map[pos.y] || [];
        for(let i = 0; i < map.length; i++) map[i] = map[i] || [];
        map[pos.y][pos.x] = new Street();
        change_money(road_cost);
     }
}

game_canvas.addEventListener('mouseup', () => {
    traffic_config(build_map, get_map_element(game_ctx, cell_size))
    placing_road = false;
});

window.addEventListener("mousemove", () => {
    build_road(build_map, get_map_element(game_ctx, cell_size));
}); 
game_canvas.addEventListener('mousedown', () => {
    placing_road = true;
    build_road(build_map, get_map_element(game_ctx, cell_size));
});


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
