function colorPalette(originalColor, palette) {
    // originalColor = [255,255,255]; //[r,g,b]
    if (!isColor(originalColor)) console.error("Invalid arguments passed to function colorPalette(): originalColor is not a color.");
    // エラー処理
    if (typeof palette != "object") console.error("Invalid arguments passed to function colorPalette(): palette is not an object");
    let leastDiff = 255 * 255 * 3;
    for (let i = 0; i < palette.length; i++) {
        
        let result;
        const paletteColor = palette[i];
        if (!isColor(paletteColor)) console.error(`Invalid arguments passed to function colorPalette(): palette[${i}] is not a color.`);
        const diff = 
        ( originalColor[0] - paletteColor[0] ) ^ 2 +
        ( originalColor[1] - paletteColor[1] ) ^ 2 +
        ( originalColor[2] - paletteColor[2] ) ^ 2 ;
        if (diff < leastDiff) {
            result = i;
            leastDiff = diff;
        }
    }
    return i
}

function isColor(color) {
    return typeof color == "object" &&
    (typeof originalColor[0] == "number") && (0 <= typeof originalColor[0]) && (typeof originalColor[0] <= 255) &&
    (typeof originalColor[1] == "number") && (0 <= typeof originalColor[1]) && (typeof originalColor[1] <= 255) &&
    (typeof originalColor[2] == "number") && (0 <= typeof originalColor[2]) && (typeof originalColor[2] <= 255)
}
