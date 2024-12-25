export function exportAsJasmine(splittedImg) {
    const w = splittedImg[0].length
    const h = splittedImg.length
    const result = []
    let i = 0
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        // アルファベットに変換
        const joined = String.fromCharCode(
          ...
          splittedImg[y][x].map(
            // "A"からはじまるようにオフセット
            v=>v+66
          )
        )
        // 画像圧縮
        const refIndex = result.indexOf(joined)
        if (refIndex === -1) 
          result.push(joined)
        else
          result.push(`p,${refIndex}`)
      }
      i++
    }
    splittedImg = result.join("\n  data ")

return `// Pic番号をstartPicNum+1000番まで上書きします。
procedure printBackground startPicNum,backgroundNum
  let w = ${w}
  let h = ${h}
  let blank@ = []
  let picNumLs@ = []
  // blankのpicパターンを定義
  for i=0 to 255
    blank@[i] = -1
  next
  def pic startPicNum+1000,blank@

  let picNum = startPicNum
  for y=0 to 24
    for x=0 to 39
      let pic@=[]
      if x<w AND y<h then
        // readData
        read picPattern$
        if picPattern$ = "p" then
          read reffingIndex
          picNumLs@[x+y*40] = reffingIndex + startPicNum
        else
          for i=0 to 255
            pic@[i] = asc(mid$(picPattern$,i,1)) - 66
          next
          def pic picNum,pic@
          picNumLs@[x+y*40] = picNum
        end if
          picNum = picNum + 1
      else
        // blank
        picNumLs@[x+y*40] = startPicNum + 1000
      end if
    next
  next
  def background backgroundNum,picNumLs@,-1
  data ${splittedImg}
end procedure`
}
