export function splitImageSquare(colorMap, width, height, size) {
    console.log(width,height)
    if (
        size == 0 ||
        width == 0 ||
        height == 0 ||
        !colorMap
    ) console.error(`Invalid arguments passed to function splitImageSquare()`);
    
    const horizontalTiles = Math.ceil(width / size);
    const verticalTiles = Math.ceil(height / size);

    const horizontalRemainder = width % size;
    const verticalRemainder = height % size;

    const result = JSON.parse(JSON.stringify( // ディープコピー
        new Array(horizontalTiles).fill(new Array(verticalTiles).fill([]))
    ));
    for (let i = 0; i < width*height; i++) {//縦軸のあまりを考慮
        const rawX = i % width
        const rawY = Math.floor(i/width)
        const blockX = Math.floor(rawX/size)
        const blockY = Math.floor(rawY/size)
        
        result[blockX][blockY].push(colorMap[i]);
    }
    if(!horizontalRemainder == 0){ //横方向のあまりが一つ以上ある場合、空白を-1で埋める
        for (let i=0; i<verticalTiles; i++){
            for (let j=size; j>size; j--){
                for (let k=0; k<(size-horizontalRemainder); k++){
                    result[horizontalTiles-1][i].splice(horizontalRemainder*j,0,-1)
                }
            }
        }
    }
    if(!verticalRemainder == 0){ //縦方向のあまりが一つ以上ある場合、空白を-1で埋める
        for (let i=0; i<horizontalTiles; i++){
            for (let k=0; k<(size-verticalRemainder); k++){
                result[i][verticalTiles-1].push(-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1)
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
