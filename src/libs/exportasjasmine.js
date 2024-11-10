export function exportAsJasmine(splittedImg) {
    const x = splittedImg.length
    const y = splittedImg[0].length
    for (let i = 0; i < splittedImg.length; i++) {
        splittedImg[i] = splittedImg[i].join("\n  data ")
    }
    splittedImg = splittedImg.join("\n  data ")

return `procedure printPic startX, startY, startPicNum
  for x=0 to ${x-1}
    for y=0 to ${y-1}
      let p@=[]
      for i=0 to 255
        read p@[i]
      next
      def pic startPicNum,p@
      put (16*x + startX,16*y + startY),startPicNum
      startPicNum = startPicNum + 1
    next
  next

  data ${splittedImg}
end procedure`

}