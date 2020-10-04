let delay = 2;
let delay_counter = 0;
let lived = 0;

const mainloop = () => {
    delay_counter++;
    if (delay_counter % delay != 0) return;
    lived++;
    document.getElementById("lived").innerHTML = lived + "минута";
    [build_map, car_map] = tick(build_map, car_map);
    if(lived % factory_freq == 0) build_map = add_factory(build_map);
    if(lived % house_freq == 0) build_map = add_house(build_map);
    if(lived % garage_freq == 0) build_map = exit_garage(build_map);
}

window.setInterval(mainloop, 100);
