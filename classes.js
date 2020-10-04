// Note that Street is the traffic light if the street has enough connections
// is_intersection(build_map, y, x) can be used to tell if this is applicabble
class Street{
    constructor(){
        this.type = "Street";
        this.sequence_length = [{element:"^", size:1}, {element:"V", size:1}, 
        {element:">", size:1}, {element:"<", size:1}];
    //every array holds the order of the directions (being between 1-4) and the number of people passed
        this.sequence = ["^", "V", ">", "<"];
        this.tick = 0;
        //the number of people we let to cross the road in the directions: "^", "V", ">", "<"
    }

    config(){
        let top = document.getElementsByName("up")[0].value;
        let bottom = document.getElementsByName("down")[0].value;
        let right = document.getElementsByName("right")[0].value;
        let left = document.getElementsByName("left")[0].value;
        let total = parseInt(top) + parseInt(bottom) + parseInt(right) + parseInt(left);

        this.sequence_length[0].element = document.getElementById("first").value;
        this.sequence_length[1].element = document.getElementById("second").value;
        this.sequence_length[2].element = document.getElementById("third").value;
        this.sequence_length[3].element = document.getElementById("fourth").value;

        this.sequence_length[0].size = top;
        this.sequence_length[1].size = bottom;
        this.sequence_length[2].size = right;
        this.sequence_length[3].size = left;
        
        this.sequence.length = total;
        
        let temp = 0;
        for(let i = 0; i < 4; i++){
            this.sequence.fill(this.sequence_length[i].element, temp, parseInt(temp) + parseInt(this.sequence_length[i].size));
            temp += parseInt(this.sequence_length[i].size);
        }  
        console.log(this.sequence)
    }

    turn(){
        let tick_count = this.tick % this.sequence.length; 
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

class Building{
    constructor(type, dests){
        this.dests = dests;
        this.type = type;
        this.garage = [];
    }
}

class Car{
    constructor() {
        this.path_to_work = [];
    }
}

let build_map = [
    ...Array.from(Array(100), () => []), 
    [...Array(100), new Building("House", [{x:102, y:102}]), new Street(), new Building("House", [{x:102, y:102}])],
    [...Array(100), undefined, new Street(), undefined],
    [...Array(100), undefined, new Street(), new Building("Factory", [])]
]

let car_map = [[], [], [], [], [], [], []];
