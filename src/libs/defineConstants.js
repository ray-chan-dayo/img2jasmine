export const originalPalette = [
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

export const WIDTH = 640,
             HEIGHT = 400,
             SIZE = 16

export const PALETTE = (()=>{
  const paletteSize = originalPalette.length;
  const extendedPalette = new Array((paletteSize + paletteSize ** 2)/2);
  let k = 0;
  for (let i = 0; i < originalPalette.length; i++) {
    for (let j = i; j < originalPalette.length; j++) {
      const resultColor = [
        (originalPalette[i][0] + originalPalette[j][0]) / 2,
        (originalPalette[i][1] + originalPalette[j][1]) / 2,
        (originalPalette[i][2] + originalPalette[j][2]) / 2
      ]
      const distance = 
      (originalPalette[i][0] - originalPalette[j][0]) ** 2 +
      (originalPalette[i][1] - originalPalette[j][1]) ** 2 +
      (originalPalette[i][2] - originalPalette[j][2]) ** 2
      extendedPalette[k] = {
        color: resultColor,
        src1: i,
        src2: j,
        ratio: 1,
        distance: distance
      }
      k++
    }
  }
  for (let i = 0; i < originalPalette.length; i++) {
    for (let j = 0; j < originalPalette.length; j++) {
      const resultColor = [
        (originalPalette[i][0] * 3 + originalPalette[j][0]) / 4,
        (originalPalette[i][1] * 3 + originalPalette[j][1]) / 4,
        (originalPalette[i][2] * 3 + originalPalette[j][2]) / 4
      ]
      const distance = 
      (originalPalette[i][0] - originalPalette[j][0]) ** 2 +
      (originalPalette[i][1] - originalPalette[j][1]) ** 2 +
      (originalPalette[i][2] - originalPalette[j][2]) ** 2
      extendedPalette[k] = {
        color: resultColor,
        src1: i,
        src2: j,
        ratio: 2,
        distance: distance
      }
      k++
    }
  }
  return extendedPalette
})()
