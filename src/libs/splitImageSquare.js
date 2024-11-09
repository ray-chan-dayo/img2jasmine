export function splitImageSquare(grid, width, height, size) {

    if (
        size == 0 ||
        width == 0 ||
        height == 0 ||
        !grid
    ) console.error(`Invalid arguments passed to function splitImageSquare()`);
    
    const horizontalTiles = Math.ceil(width / size);
    const verticalTiles = Math.ceil(height / size);

    const result = JSON.parse(JSON.stringify( // ディープコピー
        new Array(horizontalTiles).fill(new Array(verticalTiles).fill([]))
    ));
    for (let i = 0; i < grid.length; i++) {
        result[
            /* i % widthがx座標
                x座標 / sizeをfloorすることによって、入るブロックのX座標を取得。*/
            Math.floor( ( i % width ) / size )
        ][
            /* ブロックが1列横並びになるごとに size * size * horizontalTiles ピクセルがある。
               floorすることによって入るブロックのy座標を取得。                             */
            Math.floor(i / (size * size * horizontalTiles))
        ].push(grid[i]);
    }
    return result
}

function contextToGrid(ctx){
    const result = []
    for (let i = 0, j = 0; i < ctx.length; i+=4) {
        result[j][0] = ctx[i];   //r
        result[j][1] = ctx[i+1]; //g
        result[j][2] = ctx[i+2]; //b
        j++;
    }
    return result
}
