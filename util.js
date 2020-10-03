const clone = (x) => JSON.parse(JSON.stringify(x));
const deepqual = (a, b) => JSON.stringify(a) == JSON.stringify(b);
const get_member = (obj, ...members) => {
    if(deepqual(members, [])) return obj;
    let last_member = members.pop();
    let parent = get_member(obj, ...members);
    
    if (parent === undefined) return undefined;
   return parent[last_member];
};

const vec_add = (v, u) => ({x: v.x + u.x, y: v.y + u.y});
const vec_mul = (v, n) => ({x: v.x * n, y: v.y * n});
const vec_sub = (v, u) => vec_add(v, vec_mul(u, -1));
const vec_div = (v, n) => vec_mul(v, 1/n);
const vec_floor = (v) => ({x: Math.floor(v.x), y: Math.floor(v.y)});
const find = (el, arr) => {
    for (let i = 0; i < arr.length; i++) {
        if(deepqual(el, arr[i])) return i;
    }
}
