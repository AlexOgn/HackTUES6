class TrafficLight{
    constructor(){
        this.type = "TrafficLight";
    }

    config(){

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
        this.type = "Workplace";
    }
}

class Street{
    constructor(){
        this.x = this.y = 0;
        this.type = "Street";
    }
}
