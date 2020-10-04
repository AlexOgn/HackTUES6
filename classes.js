// Note that Street is the traffic light if the street has enough connections
// is_intersection(build_map, y, x) can be used to tell if this is applicabble
class Street{
    constructor(){
        this.type = "Street";
        this.sequence = [1, 1, 1, 1]; 
        //the number of people we let to cross the road in the directions: "^", "V", ">", "<"
    }

/*
    mouse up -> get x and y on the game map
    x = (mouseX - size_of_left_bar)/game_map_[X]_width
    y = (mouseY - size_of_top_bar)/game_map_[Y]_height

    game_map[y][x].config()

*/
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
    constructor(x, y){
        this.work_coords = {x: x, y: y};
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
    [new House(2, 2), new Street(), new House(2, 2)],
    [new Street(), new Street(), undefined],
    [undefined, new Street(), new Workplace()]
]

let car_map = [[], [], [], [], [], [], []];
