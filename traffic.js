const minipaths = {
    left: {
        left: [{x: 0, y: 2}, {x: 1, y: 2}, {x: 1, y: 1}, {x: 0, y: 1}, {x: -1, y: 1}],
        up: [{x: 0, y: 2}, {x: 1, y: 2}, {x: 2, y: 2}, {x: 2, y: 1}, {x: 2, y: 0}, {x: 2, y: -1}],
        right: [{x: 0, y: 2}, {x: 1, y: 2}, {x: 2, y: 2}, {x: 3, y:2}, {x: 4, y: 2}],
        down: [{x: 0, y: 2}, {x: 1, y: 2}, {x: 1, y:3}, {x: 1, y:4}]
    },
    up: {
        up: [{x: 1, y: 0}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 2, y: 0}, {x: 2, y: -1}],
        right: [{x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 2, y: 2}, {x: 3, y: 2}, {x: 4, y: 2}],
        down: [{x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y:3}, {x: 1, y: 4}],
        left: [{x: 1, y: 0}, {x: 1, y: 1}, {x: 0, y:1}, {x: -1, y:1}]
    },
    right: {
        right: [{x: 3, y: 1}, {x: 2, y: 1}, {x: 2, y: 2}, {x: 3, y: 2}, {x: 4, y: 2}],
        down: [{x: 3, y: 1}, {x: 2, y: 1}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3}, {x: 1, y: 4}],
        left: [{x: 3, y: 1}, {x: 2, y: 1}, {x: 1, y: 1}, {x: 0, y:1}, {x: -1, y: 1}],
        up: [{x: 3, y: 1}, {x: 2, y: 1}, {x: 2, y:0}, {x: 2, y: -1}]
    },
    down: {
        down: [{x: 2, y: 3}, {x: 2, y: 2}, {x: 1, y: 2}, {x: 1, y: 3}, {x: 1, y: 4}],
        left: [{x: 2, y: 3}, {x: 2, y: 2}, {x: 2, y: 1}, {x: 1, y: 1}, {x: 0, y: 1}, {x: -1, y: 1}],
        up: [{x: 2, y: 3}, {x: 2, y: 2}, {x: 2, y: 1}, {x: 2, y:0}, {x: 2, y: -1}],
        right: [{x: 2, y: 3}, {x: 2, y: 2}, {x: 3, y:2}, {x: 4, y: 2}]
    },
}

const make_carmap = (map, carmap) => {
    const bigcoords = (pos) => vec_floor(vec_div(pos, 4));
    const origin_smallcoords = (pos) => vec_mul(bigcoords(pos), 4);
    const rel_smallcoords = (pos) => vec_sub(pos, origin_smallcoords(pos));
    const dir_to_member = (v) => {
        if(deepqual(v, {x:-1, y:0})) return "left";
        if(deepqual(v, {x:0, y:-1})) return "up";
        if(deepqual(v, {x:1, y:0})) return "right";
        if(deepqual(v, {x:0, y:1})) return "down";
    }    
    const dual = (dir) => {
        switch (dir) {
        case "left": return "right";
        case "up": return "down";
        case "right": return "light";
        case "down": return "up";
        }
    }

    
    next_map = clone(map);
    next_carmap = clone(map);
    for(let i = 0 ; i < map.length * 4; i++) {
        next_carmap[i] = carmap[i] || [];
    }
    
    for (let i = 0; i < next_map.length; i++) {
        for (let j = 0; j < next_map[i].length; j++) {
            if (get_member(next_map, i, j, "type") != "House" && get_member(map, i, j, "type") != "Factory") continue;
            let dest = next_map[i][j].dests.pop();
            if (dest === undefined) continue;
            let carpath = pathfind(next_map, {x: j, y:i}, dest);
            if (carpath === undefined) continue;
            let start = dir_to_member(vec_sub(carpath[0], carpath[1]));
            let end = dir_to_member(vec_sub(carpath[2], carpath[1]));
            let carpos = vec_add(vec_mul(carpath[1], 4), minipaths[start][end][0]);
            if (get_member(next_carmap, carpos.y, carpos.x) !== undefined) {
                next_map[i][j].dests.push(dest);
                continue;
            }
            /// SVETOFAR
            let big_carpos = bigcoords(carpos);
            if (is_intersection(map, big_carpos.y, big_carpos.x)) {
                if(map[big_carpos.y][big_carpos.x].turn() != start) {
                    next_map[i][j].dests.push(dest);
                    continue;
                }
            }
            next_carmap[carpos.y][carpos.x] = carpath;
        }
    }
    return [next_map, next_carmap];
}

const inc_lights = (map) => {
    next_map = clone(map);
    for (let i = 0; i < next_map.length; i++) {
        for (let j = 0; j < next_map[i].length; j++) {
            if(get_member(next_map, i, j, "type") == "Street")
                next_map[i][j].tick++;
        }
    }
    return next_map;
}

const tick = (map, carmap) => {
    const bigcoords = (pos) => vec_floor(vec_div(pos, 4));
    const origin_smallcoords = (pos) => vec_mul(bigcoords(pos), 4);
    const rel_smallcoords = (pos) => vec_sub(pos, origin_smallcoords(pos));
    const last = (arr) => arr[arr.length - 1];
    const dir_to_member = (v) => {
        if(deepqual(v, {x:-1, y:0})) return "left";
        if(deepqual(v, {x:0, y:-1})) return "up";
        if(deepqual(v, {x:1, y:0})) return "right";
        if(deepqual(v, {x:0, y:1})) return "down";
    }    
    const dual = (dir) => {
        switch (dir) {
        case "left": return "right";
        case "up": return "down";
        case "right": return "left";
        case "down": return "up";
        }
    }


    let next_map = clone(map);
    let next_carmap = clone(carmap);
    [next_map, next_carmap] = make_carmap(next_map, next_carmap);
    for (let i = 0; i < carmap.length; i++) {
        for (let j = 0; j < carmap[i].length; j++) {
            if(carmap[i][j] === undefined) continue;
            let big_pos = bigcoords({x: j, y:i});
            let bigpath_curr = find(bigcoords({x: j, y: i}), carmap[i][j]);
            let start = dir_to_member(vec_sub(carmap[i][j][bigpath_curr - 1], carmap[i][j][bigpath_curr]));
            let end = dir_to_member(vec_sub(carmap[i][j][bigpath_curr + 1], carmap[i][j][bigpath_curr]));
            let minipath = minipaths[start][end];
            let minipath_curr = find(rel_smallcoords({x:j, y:i}), minipath);
            let next_pos = vec_add(minipath[minipath_curr + 1], origin_smallcoords({x:j, y:i}));
            let big_next_pos = bigcoords(next_pos);

            carmap[next_pos.y] = carmap[next_pos.y] || [];
            next_carmap[next_pos.y] = next_carmap[next_pos.y] || [];

            /// SVETOFAR
            if(!deepqual(big_next_pos, big_pos)) 
                if (is_intersection(map, big_next_pos.y, big_next_pos.x)) {
                    console.log(map[big_next_pos.y][big_next_pos.x].turn(), end);
                    if (map[big_next_pos.y][big_next_pos.x].turn() != dual(end)) {
                        continue;
                    }
                }

            if ((carmap[next_pos.y][next_pos.x] || next_carmap[next_pos.y][next_pos.x]) !== undefined) continue;
            if (deepqual(bigcoords(next_pos), last(carmap[i][j]))) {
                next_map[bigcoords(next_pos).y][bigcoords(next_pos).x].garage.push(clone(carmap[i][j][0]));
            } else {
                next_carmap[next_pos.y][next_pos.x] = clone(carmap[i][j]);
            }
            next_carmap[i][j] = undefined;
        }
    }
    next_map = inc_lights(next_map);
    return [next_map, next_carmap]; 
};

const exit_garage = (map) => {
    let next_map = clone(map);
    for (let i = 0; i < next_map.length; i++) {
        for (let j = 0; j < next_map[i].length; j++) {
            if (get_member(next_map, i, j, "type") != "House" && get_member(map, i, j, "type") != "Factory") continue;
            next_map[i][j].dests.push(...clone(next_map[i][j].garage));
            next_map[i][j].garage = [];
        }
    }
    return next_map;
}
