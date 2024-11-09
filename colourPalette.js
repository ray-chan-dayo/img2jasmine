function colourPalette(originalColor, palette) {
    // originalColor = [255,255,255]; //[r,g,b]
    let leastDiff = 255 * 255 * 3;
    for (let i = 0; i < palette.length; i++) {
        let result;
        const paletteColor = palette[i];
        const diff = 
        ( originalColor[0] - paletteColor[0] ) ^ 2 +
        ( originalColor[1] - paletteColor[1] ) ^ 2 +
        ( originalColor[2] - paletteColor[2] ) ^ 2 ;
        if (diff < leastDiff) {
            result = paletteColor;
            leastDiff = diff
        }
    }
    return result
}