export function exportAsJasmine(neko) {
    const x = neko.length
    const y = neko[0].length
    for (let i = 0; i < neko.length; i++) {
        neko[i] = neko[i].join("\n  data ")
    }
    neko = neko.join("\n  data ")

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

  data ${neko}
end procedure
call printPic ${x-1},${y-1}
end`

}