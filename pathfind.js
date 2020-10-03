// city е двуизмерен масив
// индексите може да са отрицателни
// src и dest са обекти
// трябва да си имат х и y
const pathfind = (city, src, dest) => {
    const add_pos = (a, b) => ({x: a.x + b.x, y: a.y + b.y});
    let bfsq = [];
    bfsq.push({pos:src, path:[]});
    while(bfsq.length > 0) {
        let front = bfsq.shift();
        let pos = front.pos;
        let path = [...front.path, pos];
        if (get_member(city, pos.y, pos.x) === undefined) continue;

        if (deepqual(pos, dest)) return path;
        if (!deepqual(pos,  src) && city[pos.y][pos.x].type == "Street");
        bfsq.push({
            pos:add_pos(pos, {x: 1, y:0}),
            path:path
        });
        bfsq.push({
            pos:add_pos(pos, {x: -1, y:0}),
            path:path
        });
        bfsq.push({
            pos:add_pos(pos, {x: 0, y:1}),
            path:path
        });
        bfsq.push({
            pos:add_pos(pos, {x: 0, y:-1}),
            path:path
        });
    }
}
