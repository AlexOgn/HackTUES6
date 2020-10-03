class TrafficLight{
    constructor(){
        this.type = "TrafficLight";
        this.sequence = [1, 1, 1, 1]; 
        //the number of people we let to cross the road in the directions"^", "<", ">", "V"
    }

/*
    mouse up -> get x and y on the game map
    x = (mouseX - size_of_left_bar)/game_map_[X]_width
    y = (mouseY - size_of_top_bar)/game_map_[Y]_height

    game_map[y][x].config()

*/
    config(){
        let top = document.getElementsByName("top")[0].value;
        let left = document.getElementsByName("left")[0].value;
        let right = document.getElementsByName("right")[0].value;
        let bottom = document.getElementsByName("bottom")[0].value;

        this.sequence[0] = top;
        this.sequence[1] = left;
        this.sequence[2] = right;
        this.sequence[3] = bottom;
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

class Street{
    constructor(){
        this.type = "Street";
    }
}

class Car{
    constructor() {
        this.path_to_work = [];
    }
}

let test = [
    [new House(), new Street(), new House()],
    [undefined, new Street(), undefined],
    [undefined, new Street(), new Workplace()]
]
