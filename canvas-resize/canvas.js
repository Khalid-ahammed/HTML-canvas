let canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

//declaring the context(c)
let c = canvas.getContext('2d')
c.fillStyle = 'rgba(255,45,90,.6)'
c.fillRect(100, 100, 100, 100) //(x,y,width,height)
c.fillRect(400, 100, 100, 100)
c.fillStyle = 'rgba(255,0,0,.6)' //for specific rectangle
c.fillRect(300, 300, 100, 100)

//line
c.beginPath()
c.moveTo(50, 300) //(x,y)
c.lineTo(300, 100)
c.lineTo(400, 300)
c.strokeStyle = '#fa34a3' //coloring the stroke
c.stroke() //for displaying th lines

//arc/circle
c.beginPath()
c.arc(300, 300, 30, 0, Math.PI * 2, false)
c.strokeStyle = 'blue' //last one will override the previous if beginpath() is not called
c.stroke()

//creating multiple circle
for (let i = 0; i < 100; i++) {
  let x = Math.random() * window.innerWidth
  let y = Math.random() * window.innerHeight
  c.beginPath()
  c.arc(x, y, 30, 0, Math.PI * 2, false)
  c.strokeStyle = `rgb(${Math.random() * 255},${Math.random() * 255},${
    Math.random() * 255
  })`
  c.stroke()
}
