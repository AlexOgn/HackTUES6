class TrafficLight{
    constructor(){
        this.type = "TrafficLight";
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
        let left = document.getElementsByName("left")[0].value;
        let right = document.getElementsByName("right")[0].value;

        this.sequence[0] = top;
        this.sequence[1] = bottom;
        this.sequence[2] = right;
        this.sequence[3] = left;
    }
}

class House{
    constructor(){
        this.inhabitants = 0;
        this.level = 1;
        this.x = this.y = 0;
        this.path_to_work = [];
        this.type = "House";
    }

}

class Workplace{
    constructor(){
        this.workers = 0;
        this.level = 1;
        this.x = this.y = 0;
        this.type = "Factory";
    }
}

class Street{
    constructor(){
        this.x = this.y = 0;
        this.type = "Street";
    }
}

let test = [
    [new House(), new Street(), new House()],
    [undefined, new Street(), undefined],
    [undefined, new Street(), new Workplace]
]
