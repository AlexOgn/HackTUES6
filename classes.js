class TrafficLight{
    constructor(){
        this.type = "TrafficLight";
    }

    config(){

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

let test = [
    [new House(), new Street(), new House()],
    [undefined, new Street(), undefined],
    [undefined, new Street(), new Workplace()]
]
