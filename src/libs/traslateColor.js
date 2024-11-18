import { PALETTE, WIDTH, HEIGHT } from "./defineConstants";
import { isColor, isUint } from "./isColor";

// import { translateColor } from "./libs/colorPalette.js"
export function translateColor(originalColor, x, y) {
    let result;
    // originalColor = [255,255,255]; //[r,g,b]
    // エラー処理
    if (!isColor(originalColor)) console.error(`Invalid arguments passed to function colorPalette(): originalColor is not a color. (${originalColor})`);
    if ( !isUint(x) || WIDTH < x ) console.error(`Invalid arguments passed to function colorPalette(): x (${x})`);
    if ( !isUint(y) || HEIGHT < y ) console.error(`Invalid arguments passed to function colorPalette(): y (${y})`);
    // 195076 = 255 * 255(ff-00^2) * 3(rgb) + 1;
    let leastDiff = 195076;
    // 透明の場合はcut
    if (originalColor[3] == 0) {
        result = -1;
    } else {
        //paletteから検索
        for (let i = 0; i < PALETTE.length; i++) {
            const paletteColor = PALETTE[i].color;
            const diff = 
            (( originalColor[0] - paletteColor[0] ) ** 2) +
            (( originalColor[1] - paletteColor[1] ) ** 2) +
            (( originalColor[2] - paletteColor[2] ) ** 2) +
            PALETTE[i].distance / 64;
            if (diff < leastDiff) {
                result = (x+y) % 2 ?
                    PALETTE[i].src1 :
                    y % PALETTE[i].ratio ? PALETTE[i].src1 :
                        PALETTE[i].src2;
                leastDiff = diff;
            }
        }
    }
    if (typeof result != "number") console.error(`Unexpected error at function colorPalette(): return value is not a number. (${result})`);
    return result
}
