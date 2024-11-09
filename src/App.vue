<script setup>
import { onMounted, ref } from 'vue'
const canvasSize = { width: 640, height: 400 }

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

  ctx.fillStyle = "rgb(11,45,14)";
  ctx.fillRect(0,0,canvasSize.width,canvasSize.height)
})

</script>

<template>
  <canvas id="canvas" :width="canvasSize.width" :height="canvasSize.height"></canvas>

</template>

<style scoped>

</style>
