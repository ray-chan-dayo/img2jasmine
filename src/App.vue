<script setup>
import { onMounted, ref, watch} from 'vue'
import { colorPalette } from './libs/colorPalette';
const canvasSize = { width: 640, height: 400 }
const imgSize = {width: 0, height: 0 }

const uploadImgSrc = ref()

let canvas;
let ctx;
const palette = [
  [0, 0, 0],
  [0, 0, 245],
  [234, 51, 35],
  [234, 51, 247],
  [117, 251, 76],
  [117, 251, 253],
  [255, 255, 84],
  [255, 255, 255],
  [119, 119, 119],
  [0, 0, 163],
  [156, 31, 20],
  [156, 31, 164],
  [76, 167, 48],
  [76, 167, 169],
  [170, 170, 53],
  [170, 170, 170],
  [89, 128, 163],
  [75, 61, 60],
  [88, 98, 201],
  [106, 162, 247],
  [113, 164, 86],
  [144, 208, 206],
  [138, 131, 129],
  [133, 79, 81],
  [148, 129, 241],
  [154, 114, 140],
  [168, 149, 127],
  [197, 192, 192],
  [207, 217, 89],
  [207, 192, 164],
  [225, 150, 68],
  [224, 119, 179],
  [227, 96, 74],
  [235, 161, 158],
  [246, 233, 218],
  [243, 207, 102],
  [248, 233, 87]
]

onMounted(()=>{
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
})

function loadLocalImage(e) {
  console.log("loadLocalImage")
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

    } else if (canvasSize.width / imgSize.width * imgSize.height <= canvasSize.height) {//縦幅がcanvasの範囲に収まったら
    //横幅を固定して縦幅を調節する
    let fixedHeight = canvasSize.width / imgSize.width * imgSize.height
    ctx.drawImage(img, 0, 0, canvasSize.width, fixedHeight)
    
    } else {//どれでもなければ縦幅を縮めなきゃなのでそうする
      let fixedWidth = canvasSize.height / imgSize.height * imgSize.width
      ctx.drawImage(img, 0, 0, fixedWidth, canvasSize.height)
    }
    colorReduction();
  }
}
function colorReduction(){//減色処理
  for(let y=0; y<imgSize.height; y++){
    for(let x=0; x<imgSize.width; x++){
      const reducedColorIndex = colorPalette(ctx.getImageData(x,y,1,1), palette);
      ctx.fillStyle = `rgb(${palette[reducedColorIndex][0]} ${palette[reducedColorIndex][1]} ${palette[reducedColorIndex][2]})`;
      ctx.fillRect(x,y,1,1);
    }
  }
}

</script>

<template>
  <input @change="loadLocalImage" accept="image/*" type="file" name="file" id="file">
  <canvas id="canvas" :width="canvasSize.width" :height="canvasSize.height"></canvas>

</template>

<style scoped>

</style>
