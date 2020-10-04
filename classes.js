// Note that Street is the traffic light if the street has enough connections
// is_intersection(build_map, y, x) can be used to tell if this is applicabble
class Street{
    constructor(){
        this.type = "Street";
        this.sequence = [1, 1, 1, 1]; 
        //the number of people we let to cross the road in the directions: "^", "V", ">", "<"
    }

    config(){
        let top = document.getElementsByName("up")[0].value;
        let bottom = document.getElementsByName("down")[0].value;
        let right = document.getElementsByName("right")[0].value;
        let left = document.getElementsByName("left")[0].value;

        this.sequence[0] = top;
        this.sequence[1] = bottom;
        this.sequence[2] = right;
        this.sequence[3] = left;
    }
}

class House{
    constructor(){
        this.path_to_work = [];
        this.type = "House";
    }

}

class Workplace{
    constructor(){
        this.path_to_homes = [];
        this.type = "Factory";
    }
}

class Car{
    constructor() {
        this.path_to_work = [];
    }
}

let build_map = [
    [new House(), new Street(), new House()],
    [undefined, new Street(), undefined],
    [undefined, new Street(), new Workplace()]
]

let car_map = [[], [], [], [], [], [], []];
