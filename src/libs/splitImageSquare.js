import { SIZE, WIDTH, HEIGHT } from "./defineConstants";
import { isUint } from "./isColor";

export function splitImageSquare(colorMap, width, height) {
    if (!isUint(width) || WIDTH < width ) console.error(`Invalid arguments passed to function splitImageSquare(): width (${width})`);
    if (!isUint(height) || HEIGHT < height ) console.error(`Invalid arguments passed to function splitImageSquare(): height (${height})`);
    if (!colorMap) console.error(`Invalid arguments passed to function splitImageSquare(): colorMap (${colorMap})`);
    
    const horizontalTiles = Math.ceil(width / SIZE);
    const verticalTiles = Math.ceil(height / SIZE);

    const horizontalRemainder = width % SIZE;
    const verticalRemainder = height % SIZE;

    const result = JSON.parse(JSON.stringify( // ディープコピー
        new Array(verticalTiles).fill(new Array(horizontalTiles).fill([]))
    ));
    for (let i = 0; i < width*height; i++) { //縦軸のあまりを考慮
        const rawX = i % width
        const rawY = Math.floor(i/width)
        const blockX = Math.floor(rawX/SIZE)
        const blockY = Math.floor(rawY/SIZE)
        
        result[blockY][blockX].push(colorMap[i]);
    }
    if(!horizontalRemainder == 0){ //横方向のあまりが一つ以上ある場合、空白を-1で埋める
        for (let i=0; i<verticalTiles; i++){
            for (let j=SIZE; j>0; j--){
                for (let k=0; k<(SIZE-horizontalRemainder); k++){
                    result[i][horizontalTiles-1].splice(horizontalRemainder*j,0,-1)
                }
            }
        }
    }
    if(!verticalRemainder == 0){ //縦方向のあまりが一つ以上ある場合、空白を-1で埋める
        for (let i=0; i<horizontalTiles; i++){
            for (let k=0; k<(SIZE-verticalRemainder); k++){
                result[verticalTiles-1][i].push(-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1)
            }
        }
    }
    return result
}
