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
    for (let i = 0; i < width*verticalTiles*size; i++) {//縦軸のあまりを考慮
        if(Math.floor(i / width)>=height){
            result[
                /* i % widthがx座標
                    x座標 / sizeをfloorすることによって、入るブロックのX座標を取得。*/
                Math.floor( ( i % width ) / size )
            ][
                /* ブロックが1列横並びになるごとに size * size * horizontalTiles ピクセルがある。
                   floorすることによって入るブロックのy座標を取得。                             */
                Math.floor(i / (size * size * horizontalTiles))
            ].push(-1);
        }else{
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
        if ( i % width == width - 1 ) {
            // 空白を追加する。
            for(let j=0; j < (size - ((( i % width ) % size)+1) ); j++) {
                result[
                    Math.floor( ( i % width ) / size )
                ][
                    Math.floor(i / (size * size * horizontalTiles))
                ].push(-1);
            }
        }
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
