export function exportAsJasmine(splittedImg) {
    const x = splittedImg[0].length
    const y = splittedImg.length
    for (let i = 0; i < splittedImg.length; i++) {
        splittedImg[i] = splittedImg[i].join("\n  data ")
    }
    splittedImg = splittedImg.join("\n  data ")

return `// Pic番号をstartPicNum+1000番まで上書きします。
procedure printBackground startPicNum,backgroundNum
  let w = ${x}
  let h = ${y}
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
        for i=0 to 255
          read pic@[i]
        next
        def pic picNum,pic@
        picNumLs@[x+y*40] = picNum
        picNum = picNum + 1
      else
        // blank
        picNumLs@[x+y*40] = startPicNum + 1000
      end if
    next
  next
  def background backgroundNum,picNumLs@,-1
  background backgroundNum
  data ${splittedImg}
end procedure`

}
