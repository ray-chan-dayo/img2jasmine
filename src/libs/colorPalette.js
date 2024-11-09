// import { colorPalette } from "./libs/colorPalette.js"
export function colorPalette(originalColor, exPalette, x, y) {
    let result;
    // originalColor = [255,255,255]; //[r,g,b]
    // エラー処理
    if (!isColor(originalColor)) console.error(`Invalid arguments passed to function colorPalette(): originalColor is not a color. (${originalColor})`);
    if (typeof exPalette != "object") console.error(`Invalid arguments passed to function colorPalette(): palette is not an object. (${exPalette})`);
    let leastDiff = 255 * 255 * 3;
    // 透明の場合はcut
    if (originalColor[3] == 0) {
        result = -1;
    } else {
        //paletteから検索
        for (let i = 0; i < exPalette.length; i++) {
            const paletteColor = exPalette[i][0];
            if (!isColor(paletteColor)) console.error(`Invalid arguments passed to function colorPalette(): palette[${i}] is not a color. (${paletteColor})`);
            const diff = 
            (( originalColor[0] - paletteColor[0] ) ** 2) +
            (( originalColor[1] - paletteColor[1] ) ** 2) +
            (( originalColor[2] - paletteColor[2] ) ** 2) ;
            if (diff < leastDiff) {
                result = (x+y) % 2 ? i : j;
                leastDiff = diff;
            }
        }
    }
    if (typeof result != "number") console.error(`Unexpected error at function colorPalette(): return value is not a number. (${result})`);
    return result
}

function isColor(color) {
    return typeof color == "object" &&
    (typeof color[0] == "number") && (0 <= color[0]) && (color[0] <= 255) &&
    (typeof color[1] == "number") && (0 <= color[1]) && (color[1] <= 255) &&
    (typeof color[2] == "number") && (0 <= color[2]) && (color[2] <= 255)
}

