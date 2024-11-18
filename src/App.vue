<script setup>
import { onMounted, ref, watch} from 'vue'
import { colorPalette, extendPalette } from './libs/colorPalette';
import { splitImageSquare } from './libs/splitImageSquare';
import { exportAsJasmine } from './libs/exportasjasmine';
import { palette, WIDTH, HEIGHT } from './libs/defineConstants';

const imgSize = {width: 0, height: 0 }

const uploadImgSrc = ref()

const isImageLoaded = ref(false);

const startX = ref(0);
const startY = ref(0);

const useInputWH = ref(false);
const inputW = ref(640);
const inputH = ref(400);

const startPicNum = ref(100);

const outputJasmine = ref();

const extendedPalette = extendPalette(palette)

let colorIndexMap = []

let canvas;
let ctx;
let outputArea;

let procedure;

onMounted(()=>{
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d",{ willReadFrequently: true });
  outputArea = document.getElementById("outputArea")
})

function loadLocalImage(e) {
  isImageLoaded.value = false;

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
    uploadImgSrc.value = reader.result;
    console.log(uploadImgSrc.value);
    isImageLoaded.value = true;
  }
  // ファイル読み込みを実行
  reader.readAsDataURL(fileData);
}
function drawImage(){
  procedure = undefined;//出力を初期化
  outputArea.value = "";
  colorIndexMap = [];

  if(startX.value == '') startX.value = 0; //inputの例外対策
  if(startY.value == '') startY.value = 0;
  if(inputW.value == '') inputW.value = WIDTH;
  if(inputH.value == '') inputH.value = HEIGHT;

  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  // Canvas上に画像を表示
  var img = new Image()
  img.src = uploadImgSrc.value
  img.onload = () => {
    imgSize.width = img.naturalWidth
    imgSize.height = img.naturalHeight
    if(useInputWH.value){//ユーザーがwidthとheightを指定してた場合
      ctx.drawImage(img, startX.value, startY.value, inputW.value, inputH.value);//ユーザー様の仰せのままに
      imgSize.width = inputW.value;
      imgSize.height = inputH.value;

    } else {
      //特にユーザーの指定がなければこっちでごちゃごちゃする
      if(imgSize.width == 0||imgSize.height == 0){ //画像サイズが0*0なら
        //なにもしない
        alert("画像サイズが0x0です")
      }else if(imgSize.width<=WIDTH && imgSize.height<=HEIGHT){//入ってきた画像がcanvasSize以下の大きさなら
        //そのまま描画する
        ctx.drawImage(img, startX.value, startY.value, img.naturalWidth, img.naturalHeight)

      } else if (Math.round(WIDTH / imgSize.width * imgSize.height) <= HEIGHT) {//縦幅がcanvasの範囲に収まったら
      //横幅をcanvasSizeにする
      let fixedHeight = Math.round(WIDTH / imgSize.width * imgSize.height)
      ctx.drawImage(img, startX.value, startY.value, WIDTH, fixedHeight)
      imgSize.width = WIDTH; 
      imgSize.height = fixedHeight; //imgSizeをcanvasSizeに合わせて変更する

      } else {//どれでもなければ縦幅をcanvasSizeにする
        let fixedWidth = Math.round(HEIGHT / imgSize.height * imgSize.width)
        ctx.drawImage(img, startX.value, startY.value, fixedWidth, HEIGHT)
        imgSize.width = fixedWidth;
        imgSize.height = HEIGHT; //imgSizeをcanvasSizeに合わせて変更する
      }
    }
    if(startX.value>0 || startY.value>0){ //配置座標が変更されていたら
      imgSize.width = Math.min(imgSize.width + startX.value, WIDTH);//colorReduction()に渡すwidthとheightを大きくする、キャンバスサイズをはみ出るならそこまでにする
      imgSize.height = Math.min(imgSize.height + startY.value, HEIGHT);
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
call printBackground ${startPicNum.value},1
background 1
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
  </label><br/><br/>
  <label>
    画面の縦横幅を指定
    <input type="checkbox" v-model="useInputWH">
  </label>
  <div v-if="useInputWH">
    <label>
      画像の横幅
      <input type="number" v-model="inputW"/>
    </label>
    <label>
      画像の縦幅
      <input type="number" v-model="inputH"/>
    </label>
  </div>
  <br/>
  <label>
    PIC パターン番号の開始位置
    <input type="number" v-model="startPicNum">
  </label>
  <br/><br/>
  <input @change="loadLocalImage" accept="image/*" type="file" name="file" id="file"><br/><br/>
  <button @click="drawImage" v-if="isImageLoaded">実行！</button><br/>
  <canvas id="canvas" :width="WIDTH" :height="HEIGHT"></canvas><br/>
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
