export function exportAsJasmine(splittedImg) {
    const x = splittedImg.length
    const y = splittedImg[0].length
    for (let i = 0; i < splittedImg.length; i++) {
        splittedImg[i] = splittedImg[i].join("\n  data ")
    }
    splittedImg = splittedImg.join("\n  data ")

return `procedure printPic startX, startY, w, h
  let picNum = 100
  let p@=[]
  for x=0 to w
    for y=0 to h
      for i=0 to 255
        read p@[i]
      next
      def pic picNum,p@
      put (16*x + startX,16*y + startY),picNum
    next
  next

  data ${splittedImg}
end procedure`

}