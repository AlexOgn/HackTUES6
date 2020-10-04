// Note that Street is the traffic light if the street has enough connections
// is_intersection(build_map, y, x) can be used to tell if this is applicabble
class Street{
    constructor(){
        this.type = "Street";
        this.sequence_length = [1, 1, 1, 1]; 
        this.sequence = ["^", "V", ">", "<"];
        //the number of people we let to cross the road in the directions: "^", "V", ">", "<"
    }

    config(){
        let top = document.getElementsByName("up")[0].value;
        let bottom = document.getElementsByName("down")[0].value;
        let right = document.getElementsByName("right")[0].value;
        let left = document.getElementsByName("left")[0].value;
        let total = parseInt(top) + parseInt(bottom) + parseInt(right) + parseInt(left);

        this.sequence_length[0] = top;
        this.sequence_length[1] = bottom;
        this.sequence_length[2] = right;
        this.sequence_length[3] = left;
        
        this.sequence.length = total;
        
        this.sequence.fill("^", 0, top);
        this.sequence.fill("V", top, parseInt(top)+parseInt(bottom));
        this.sequence.fill(">", parseInt(top)+parseInt(bottom), parseInt(total)-parseInt(left));
        this.sequence.fill("<", parseInt(total)-parseInt(left), total);   
    }

    turn(tick_count){
        tick_count %= this.sequence.length; 
        switch(this.sequence[tick_count]){
            case "^":
                return "up";
                break;
            case "V":
                return "down";
                break;
            case ">":
                return "right";
                break;
            case "<":
                return "left";
                break;
        }
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
