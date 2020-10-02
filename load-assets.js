const load_img = (src) => {
    let img = new Image();
    img.src = src;
    return img;
}

let assets = {
    car_img: load_img("assets/car.png"),
    factory_img: load_img("assets/factory.png"),
    house_img:  load_img("assets/house.png")
}
