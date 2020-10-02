// city е двуизмерен масив
// индексите може да са отрицателни
// src и dest са обекти
// трябва да си имат х и y
const clone = (x) => JSON.parse(JSON.stringify(x));
const compare = (a, b) => JSON.stringify(a) == JSON.stringify(b);

const pathfind = (city, src, dest) => {
    const add_pos = (a, b) => ({x: a.x + b.x, y: a.y + b.y});
    let bfsq = [];
    bfsq.push({pos:src, path:[]});
    while(bfsq.length > 0) {
        let front = bfsq.shift();
        let pos = front.pos;
        let path = [...front.path, pos];
        if(path.length == 6) continue;
        if (city[pos.y] === undefined) continue;
        if (city[pos.y][pos.x] === undefined) continue;

        if (compare(pos, dest)) return path;
        if (!compare(pos,  src) && city[pos.y][pos.x].type == "Street");
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
