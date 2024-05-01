function randomHexColorWithOpacity() {
    const color = Math.floor(Math.random() * 16777215).toString(16);
    const hexColor = "#" + "0".repeat(6 - color.length) + color;
    const hexColorWithOpacity = hexColor.slice(0, 7) + "80";
    return {hexColor, hexColorWithOpacity};
}

export {
    randomHexColorWithOpacity
}
