// city е двуизмерен масив
// индексите може да са отрицателни
// src и dest са обекти
// трябва да си имат х и y
const pathfind = (city, src, dest) => {
    used = [];
    const last = (arr) => arr[arr.length - 1];
    const tolast = (arr) => arr[arr.length - 2];
    let bfsq = [];
    bfsq.push({pos:src, path:[]});
    while(bfsq.length > 0) {
        let front = bfsq.shift();
        let pos = front.pos;
        used[pos.y] = used[pos.y] || [];
        if(used[pos.y][pos.x] === true) continue;
        used[pos.y][pos.x] = true;
        let path = [...front.path, pos];
        if (get_member(city, pos.y, pos.x) === undefined) continue;

        if (deepqual(pos, dest)) return [...path, last(path)];
        if (!deepqual(pos, src) && city[pos.y][pos.x].type != "Street") continue;
        bfsq.push({
            pos:vec_add(pos, {x: 1, y:0}),
            path:path
        });
        bfsq.push({
            pos:vec_add(pos, {x: -1, y:0}),
            path:path
        });
        bfsq.push({
            pos:vec_add(pos, {x: 0, y:1}),
            path:path
        });
        bfsq.push({
            pos:vec_add(pos, {x: 0, y:-1}),
            path:path
        });
    }
}
