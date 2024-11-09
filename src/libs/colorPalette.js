// import { colorPalette } from "./libs/colorPalette.js"
export function colorPalette(originalColor, palette) {
    let result;
    // originalColor = [255,255,255]; //[r,g,b]
    // if (!isColor(originalColor)) console.error(`Invalid arguments passed to function colorPalette(): originalColor is not a color. (${originalColor})`);
    // エラー処理
    // if (typeof palette != "object") console.error(`Invalid arguments passed to function colorPalette(): palette is not an object. (${palette})`);
    let leastDiff = 255 * 255 * 3;
    for (let i = 0; i < palette.length; i++) {
        
        const paletteColor = palette[i];
        // if (!isColor(paletteColor)) console.error(`Invalid arguments passed to function colorPalette(): palette[${i}] is not a color. (${paletteColor})`);
        const diff = 
        ( originalColor[0] - paletteColor[0] ) ^ 2 +
        ( originalColor[1] - paletteColor[1] ) ^ 2 +
        ( originalColor[2] - paletteColor[2] ) ^ 2 ;
        if (diff < leastDiff) {
            result = i;
            leastDiff = diff;
        }
    }
    if (typeof palette != "number") console.error(`Unexpected error at function colorPalette(): return value is not a number. (${i})`);
    return result
}

// function isColor(color) {
//     return typeof color == "object" &&
//     (typeof color[0] == "number") && (0 <= typeof color[0]) && (typeof color[0] <= 255) &&
//     (typeof color[1] == "number") && (0 <= typeof color[1]) && (typeof color[1] <= 255) &&
//     (typeof color[2] == "number") && (0 <= typeof color[2]) && (typeof color[2] <= 255)
// }
