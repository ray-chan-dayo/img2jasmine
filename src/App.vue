<script setup>
import { onMounted, ref, watch} from 'vue'
import { colorPalette, extendPalette } from './libs/colorPalette';
import { splitImageSquare } from './libs/splitImageSquare';
import { exportAsJasmine } from './libs/exportasjasmine';
const canvasSize = { width: 640, height: 400 }
const imgSize = {width: 0, height: 0 }

const uploadImgSrc = ref()

const size = 16;

let colorIndexMap = []

let canvas;
let ctx;
let outputArea;

let procedure;

const startX = ref(0);
const startY = ref(0);

const outputJasmine = ref();

const palette = [
  [0, 0, 0, 255],
  [0, 0, 255, 255],
  [255, 0, 0, 255],
  [255, 0, 255, 255],
  [0, 255, 0, 255],
  [0, 255, 255, 255],
  [255, 255, 0, 255],
  [255, 255, 255, 255],
  [119, 119, 119, 255],
  [0, 0, 163, 255],
  [109, 18, 10, 255],
  [156, 31, 164, 255],
  [76, 167, 48, 255],
  [76, 167, 169, 255],
  [170, 170, 53, 255],
  [170, 170, 170, 255],
  [89, 128, 162, 255],
  [75, 61, 60, 255],
  [88, 98, 201, 255],
  [106, 162, 247, 255],
  [113, 164, 86, 255],
  [145, 208, 206, 255],
  [156, 216, 251, 255],
  [138, 131, 129, 255],
  [133, 80, 81, 255],
  [148, 129, 241, 255],
  [154, 114, 140, 255],
  [168, 149, 127, 255],
  [197, 192, 192, 255],
  [207, 217, 89, 255],
  [207, 192, 164, 255],
  [225, 150, 68, 255],
  [224, 119, 179, 255],
  [227, 96, 74, 255],
  [235, 161, 158, 255],
  [246, 233, 218, 255],
  [243, 207, 102, 255],
  [248, 233, 87, 255],
  [0, 0, 0, 0]
]
const extendedPalette = extendPalette(palette)

onMounted(()=>{
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d",{ willReadFrequently: true });
  outputArea = document.getElementById("outputArea")

  watch(startX, () =>{if(procedure)makeOutputJasmine()});
  watch(startY, () =>{if(procedure)makeOutputJasmine()});
})

function loadLocalImage(e) {
  console.log("loadLocalImage")
  //色コード配列を初期化
  colorIndexMap = []
  // ファイル情報を取得
  const fileData = e.target.files[0];

  // 画像ファイル以外は処理を止める
  if(!fileData.type.match('image.*')) {
    alert('画像を選択してください');
    return;
  }

  // FileReaderオブジェクトを使ってファイル読み込み
  const reader = new FileReader();
  // ファイル読み込みに成功したときの処理
  reader.onload = function() {
    // uploadImgSrcはwatchで監視されているので、canvasにdrawされる
    uploadImgSrc.value = reader.result;
    drawImage()
    console.log(uploadImgSrc)
  }
  // ファイル読み込みを実行
  reader.readAsDataURL(fileData);
}
function drawImage(){
  ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);

  // Canvas上に画像を表示
  var img = new Image()
  img.src = uploadImgSrc.value
  img.onload = () => {
    imgSize.width = img.naturalWidth
    imgSize.height = img.naturalHeight
    if(imgSize.width == 0||imgSize.height == 0){
      //なにもしない

    }else if(imgSize.width<=canvasSize.width && imgSize.height<=canvasSize.height){//入ってきた画像がcanvasSize以下の大きさなら
      //そのまま描画する
      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)

    } else if (Math.round(canvasSize.width / imgSize.width * imgSize.height) <= canvasSize.height) {//縦幅がcanvasの範囲に収まったら
    //横幅を固定して縦幅を調節する
    let fixedHeight = Math.round(canvasSize.width / imgSize.width * imgSize.height)
    ctx.drawImage(img, 0, 0, canvasSize.width, fixedHeight)
    imgSize.width = canvasSize.width; 
    imgSize.height = fixedHeight; //imgSizeをcanvasSizeに合わせて変更する

    } else {//どれでもなければ縦幅を縮めなきゃなのでそうする
      let fixedWidth = Math.round(canvasSize.height / imgSize.height * imgSize.width)
      ctx.drawImage(img, 0, 0, fixedWidth, canvasSize.height)
      imgSize.width = fixedWidth;
      imgSize.height = canvasSize.height; //imgSizeをcanvasSizeに合わせて変更する
    }
    colorReduction();
  }
}
function colorReduction(){//減色処理
  for(let y=0; y<imgSize.height; y++){
    for(let x=0; x<imgSize.width; x++){
      let reducedColorIndex = colorPalette(ctx.getImageData(x,y,1,1).data, extendedPalette, x, y);
      colorIndexMap.push(reducedColorIndex)
      if (reducedColorIndex == -1) reducedColorIndex = 38;
      ctx.fillStyle = `rgba(${palette[reducedColorIndex][0]}, ${palette[reducedColorIndex][1]}, ${palette[reducedColorIndex][2]}, ${palette[reducedColorIndex][3]})`;
      ctx.fillRect(x,y,1,1);
    }
  }
  procedure = exportAsJasmine(
    splitImageSquare(colorIndexMap, imgSize.width, imgSize.height, size)
  )
  makeOutputJasmine()
}
function makeOutputJasmine(){
  outputJasmine.value = procedure + `
call printPic ${startX.value},${startY.value},${Math.ceil(imgSize.width / size)-1},${Math.ceil(imgSize.height / size)-1}
end`;
  outputArea.value = outputJasmine.value;
  navigator.clipboard.writeText(outputJasmine.value)
}

function textareaOnClick(){
  outputArea.select();
  navigator.clipboard.writeText(outputJasmine.value)
}
</script>

<template>
  <label>
    配置するx座標
    <input type="number" v-model="startX"/>
  </label>
  <label>
    配置するy座標
    <input type="number" v-model="startY"/>
  </label>
  <br/><br/>
  <input @change="loadLocalImage" accept="image/*" type="file" name="file" id="file"><br/>
  <canvas id="canvas" :width="canvasSize.width" :height="canvasSize.height"></canvas><br/>
  <textarea id="outputArea" rows="25" cols="64" v-show="outputJasmine" readonly @click="textareaOnClick"></textarea><br/>
</template>

<style scoped>
  #textarea {
    resize: none;
    line-height: 1.5;
    width: 100%;
    padding: 10;
  }
</style>
