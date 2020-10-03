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

const = tick(map, carmap) => {
    const bigcoords = (pos) => vec_floor(vec_div(u, 4));
    const origin_smallcoords = (pos) => vec_mul(bigoocrds(pos), 4);
    const rel_smallcoords = (pos) => vec_sub(pos, origin_smallcoords(pos));
    const dir_to_member(v) {
        if(deepqual(v, {x:-1, y:0})) return "left";
        if(deepqual(v, {x:0, y:-1})) return "up";
        if(deepqual(v, {x:1, y:0})) return "right";
        if(deepqual(v, {x:0, y:1})) return "down";
    }
    let next_carmap = [];
    for (let i = 0; i < carmap.length; i++)
        next_carmap[i] = [];
    for (let i = 0; i < carmap.length; i++)
        for (let j = 0; j < carmap[i].length; i++) {
            if(carmap[i][j] !== undefined) {
                let bigpath_curr = find({x: j, y: i}, carmap[i][j]);
                let start = dir_to_member(vec_sub(carmap[i][j][bigpath_curr], carmap[i][j][bigpath_curr - 1]));
                let end = dir_to_member(vec_sub(carmap[i][j][bigpath_curr + 1], carmap[i][j][bigpath_curr]));
                let minipath = minipaths[start][end];
                let minipath_curr = find(rel_smallcoords({x:j, y:i}, minipath));
                ///TODO
            }
        }
    
};
