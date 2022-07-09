let canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight
let c = canvas.getContext('2d')

let circleNumber = 5000
const maxRadius = 30
const lineWidth = 30
// const minRadius = 1
let mouse = {
  x: undefined,
  y: undefined,
  down: false,
}
let colorArr = ['#0B2B40', '#30A5BF', '#185359', '#F2BE22', '#A6874E']

window.addEventListener('mousemove', (e) => {
  mouse.x = e.x
  mouse.y = e.y
})
window.addEventListener('mousedown', (e) => {
  mouse.down = true
})
window.addEventListener('mouseup', (e) => {
  mouse.down = false
})

window.addEventListener('resize', (_) => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  init()
})

class Circle {
  constructor(x, y, dx, dy, radius) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.minRadius = radius
    this.color = colorArr[Math.floor(Math.random() * colorArr.length)]
    this.sketch = false
  }
  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
  }
  update() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy
    }
    if (!this.sketch) {
      this.x += this.dx
      this.y += this.dy
    }

    // interectivity
    if (
      mouse.x - this.x < lineWidth &&
      mouse.x - this.x > -lineWidth &&
      mouse.y - this.y < lineWidth &&
      mouse.y - this.y > -lineWidth
    ) {
      if (this.radius < maxRadius) this.radius += 1
      if (mouse.down) {
        this.sketch = true
      }
    } else if (this.radius > this.minRadius && !this.sketch) {
      this.radius -= 1
    }

    this.draw()
  }
}
let circleArr = []
function init() {
  circleArr = []
  for (let i = 0; i < circleNumber; i++) {
    let radius = Math.random() * 3 + 1
    let x = Math.random() * (innerWidth - radius * 2) + radius
    let y = Math.random() * (innerHeight - radius * 2) + radius
    let dx = (Math.random() - 0.5) * 2
    let dy = (Math.random() - 0.5) * 2

    circleArr.push(new Circle(x, y, dx, dy, radius))
  }
}

function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, innerWidth, innerHeight)
  for (let i = 0; i < circleArr.length; i++) {
    circleArr[i].update()
  }
}

init()
animate()
