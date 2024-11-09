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