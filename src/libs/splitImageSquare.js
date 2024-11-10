export function splitImageSquare(colorMap, width, height, size) {
    if (
        typeof size != "number" ||
        size <= 0 ||
        Math.floor(size) != size
    ) console.error(`Invalid arguments passed to function splitImageSquare(): size is invalid (${size})`);
    if (
        typeof width != "number" ||
        width <= 0 ||
        Math.floor(width) != width
    ) console.error(`Invalid arguments passed to function splitImageSquare(): width is invalid (${width})`);
    if (
        typeof height != "number" ||
        height <= 0 ||
        Math.floor(height) != height
    ) console.error(`Invalid arguments passed to function splitImageSquare(): height is invalid (${height})`);
    if (
        !colorMap
    ) console.error(`Invalid arguments passed to function splitImageSquare(): colorMap is invalid (${colorMap})`);
    
    const horizontalTiles = Math.ceil(width / size);
    const verticalTiles = Math.ceil(height / size);

    const horizontalRemainder = width % size;
    const verticalRemainder = height % size;

    const result = JSON.parse(JSON.stringify( // ディープコピー
        new Array(verticalTiles).fill(new Array(horizontalTiles).fill([]))
    ));
    for (let i = 0; i < width*height; i++) {//縦軸のあまりを考慮
        const rawX = i % width
        const rawY = Math.floor(i/width)
        const blockX = Math.floor(rawX/size)
        const blockY = Math.floor(rawY/size)
        
        result[blockY][blockX].push(colorMap[i]);
    }
    if(!horizontalRemainder == 0){ //横方向のあまりが一つ以上ある場合、空白を-1で埋める
        for (let i=0; i<verticalTiles; i++){
            for (let j=size; j>0; j--){
                for (let k=0; k<(size-horizontalRemainder); k++){
                    result[i][horizontalTiles-1].splice(horizontalRemainder*j,0,-1)
                }
            }
        }
    }
    if(!verticalRemainder == 0){ //縦方向のあまりが一つ以上ある場合、空白を-1で埋める
        for (let i=0; i<horizontalTiles; i++){
            for (let k=0; k<(size-verticalRemainder); k++){
                result[verticalTiles-1][i].push(-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1)
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
