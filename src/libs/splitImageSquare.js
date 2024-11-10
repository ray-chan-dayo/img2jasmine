export function splitImageSquare(colorMap, width, height, size) {

    if (
        size == 0 ||
        width == 0 ||
        height == 0 ||
        !colorMap
    ) console.error(`Invalid arguments passed to function splitImageSquare()`);
    
    const horizontalTiles = Math.ceil(width / size);
    const verticalTiles = Math.ceil(height / size);

    const result = JSON.parse(JSON.stringify( // ディープコピー
        new Array(horizontalTiles).fill(new Array(verticalTiles).fill([]))
    ));
    for (let i = 0; i < width*verticalTiles*size; i++) {//縦軸のあまりを考慮
        const rawX = i % width
        const rawY = Math.floor(i/width)
        const blockX = Math.floor(rawX/size)
        const blockY = Math.floor(rawY/size)
        if(rawY >= height){
            // 下空白
            result[blockX][blockY].push(-1);
        }else{
            result[blockX][blockY].push(colorMap[i]);
        }
        if ( rawX == width - 1 ) {
            // 空白を追加する。
            for(let j = (rawX % size); j < size; j++) {
                result[blockX][blockY].push(-1);
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
