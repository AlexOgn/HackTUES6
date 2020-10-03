const clone = (x) => JSON.parse(JSON.stringify(x));
const deepqual = (a, b) => JSON.stringify(a) == JSON.stringify(b);
const get_member = (obj, ...members) => {
    if(deepqual(members, [])) return obj;
    let last_member = members.pop();
    let parent = get_member(obj, ...members);
    
    if (parent === undefined) return undefined;
   return parent[last_member];
};

const set_member = (obj, val, ...members) => {
    
};
