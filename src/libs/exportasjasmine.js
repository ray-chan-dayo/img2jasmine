export function exportAsJasmine(splittedImg) {
    const w = splittedImg[0].length
    const h = splittedImg.length
    const result = []
    let i = 0
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const joined = splittedImg[y][x].join()
        // 画像圧縮
        const refIndex = result.indexOf(joined)
        if (refIndex === -1) 
          result.push(joined)
        else
          result.push(`-2,${refIndex}`)
      }
      i++
    }
    splittedImg = result.join("\n  data ")

return `// Pic番号をstartPicNum+1000番まで上書きします。
function loadBackground@ startPicNum,backgroundNum,w,h
  s=startPicNum
  b=s+1000
  t@=[]
  r@=[]
  //blankのpicパターンを定義
  for i=0 to 255
    t@[i] = -1
  next
  def pic b,t@
  let i = s
  for y=0 to 24
  for x=0 to 39
    if x<w AND y<h then
      t@ = loadPic@()
      if t@[0]=-2 then
        r@[x+y*40]=t@[1]+s
      else
        r@[x+y*40] = i
      end if
      i=i+1
    else
      r@[x+y*40]=b
    end if
  next
  next
end procedure`
+
`
data ${splittedImg}`
}
export function exportAsJasmine(splittedImg) {}