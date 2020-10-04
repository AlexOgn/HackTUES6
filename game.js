var game_mouse_x;
var game_mouse_y;
var is_day = false;

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
    if(!is_intersection(map, position.y, position.x)) return;

    // currying is VERY important
    document.getElementById("submit").onclick = () => {
        map[position.y][position.x].config();
        document.getElementById("traffic_editor_div").style="display: none";
    }
    
    document.getElementById("traffic_editor_div").style="display:block";
    document.getElementById("up").value = map[position.y][position.x].sequence_length[0].size;
    document.getElementById("down").value = map[position.y][position.x].sequence_length[1].size;
    document.getElementById("right").value = map[position.y][position.x].sequence_length[2].size;
    document.getElementById("left").value = map[position.y][position.x].sequence_length[3].size;
}

if(is_day == false){
    game_canvas.addEventListener('click', () => traffic_config(build_map, get_map_element(game_ctx, 100)));
}
