let delay = 2;
let delay_counter = 0;
const factory_freq = 200;
const house_freq = 50;
const garage_freq = 200;
let freq_counter = 0;

const mainloop = () => {
    delay_counter++;
    if (delay_counter % delay != 0) return;
    freq_counter++;
    [build_map, car_map] = tick(build_map, car_map);
    if(freq_counter % factory_freq == 0) build_map = add_factory(build_map);
    if(freq_counter % house_freq == 0) build_map = add_house(build_map);
    if(freq_counter % garage_freq == 0) build_map = exit_garage(build_map);
}

window.setInterval(mainloop, 100);
