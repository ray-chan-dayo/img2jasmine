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
            const paletteColor = exPalette[i].color;
            if (!isColor(paletteColor)) console.error(`Invalid arguments passed to function colorPalette(): palette[${i}] is not a color. (${paletteColor})`);
            const diff = 
            (( originalColor[0] - paletteColor[0] ) ** 2) +
            (( originalColor[1] - paletteColor[1] ) ** 2) +
            (( originalColor[2] - paletteColor[2] ) ** 2) ;
            if (diff < leastDiff) {
                result = (x+y) % 2 ? exPalette[i].src1 : exPalette[i].src2;
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

export function extendPalette(palette)
{
    const paletteSize = palette.length;
    const extendedPalette = new Array(paletteSize ** 2);
    let k = 0;
    for (let i = 0; i < palette.length; i++) {
        for (let j = i; j < palette.length; j++) {
            const resultColor = [
                (palette[i][0] + palette[j][0]) / 2,
                (palette[i][1] + palette[j][1]) / 2,
                (palette[i][2] + palette[j][2]) / 2
            ]
            extendedPalette[k] = {
                color: resultColor,
                src1: i,
                src2: j
            }
            k++
        }
    }
    return extendedPalette
}
