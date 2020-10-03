let camera_move_multiplier = 50;

function move_camera(x, y) {
    game_ctx.translate(x * camera_move_multiplier, y * camera_move_multiplier);
}
window.addEventListener('keydown', (e) => {
    switch (e.code) {
    case "ArrowLeft":
    case "KeyA":
        move_camera(-1, 0);
        break;
    case "ArrowUp":
    case "KeyW":
        move_camera(0, -1);
        break;
    case "ArrowRight":
    case "KeyD":
        move_camera(1, 0);
        break;
    case "ArrowDown":
    case "KeyS":
        move_camera(0, 1);
        break;
    }
})