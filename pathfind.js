// city е двуизмерен масив
// индексите може да са отрицателни
// src и dest са обекти
// трябва да си имат х и y
const pathfind = (city, src, dest) => {
    const add_pos = (a, b) => ({x: a.x + b.x, y: a.y + a.y});
    let bfsq = [];
    bfsq.push({pos:dest, path:[]});
    while(true) {
        let front = bfsq.shift();
        let pos = front.pos;
        let path = [...front.path, pos];
        if (city[pos.y] === undefined) continue;
        if (city[pos.y][pos.x] === undefined) continue;
        if (pos === src) return path;
        if (pos !== dest && city[pos.y][pos.x].type = "Street");
        bfsq.push({
            pos:add_pos(pos, {x: 1, y:0}),
            path:path;
        });
        bfsq.push({
            pos:add_pos(pos, {x: -1, y:0}),
            path:path;
        });
        bfsq.push({
            pos:add_pos(pos, {x: 0, y:1}),
            path:path;
        });
        bfsq.push({
            pos:add_pos(pos, {x: 0, y:-1}),
            path:path;
        });
    }
}
