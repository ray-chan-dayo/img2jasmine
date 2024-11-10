export function exportAsJasmine(splittedImg) {
    const x = splittedImg.length
    const y = splittedImg[0].length
    for (let i = 0; i < splittedImg.length; i++) {
        splittedImg[i] = splittedImg[i].join("\n  data ")
    }
    splittedImg = splittedImg.join("\n  data ")

return `procedure printPic w,h
  let picNum = 100
  let p@=[]
  for x=0 to w
    for y=0 to h
      for i=0 to 255
        read p@[i]
      next
      def pic picNum,p@
      put (16*x,16*y),picNum
    next
  next

  data ${splittedImg}
end procedure
call printPic ${x-1},${y-1}
end`

}