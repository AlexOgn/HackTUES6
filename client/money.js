const change_money = (change) => {
    money += change;
    document.getElementById("money").innerHTML = money + "лв";
    if (money <= 0) {
        die(lived);
    }
}
