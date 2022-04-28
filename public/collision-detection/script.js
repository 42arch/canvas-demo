import utils from '../utils.js'

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

class Circle {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
  }

  update() {
    this.draw()
  }
}

let circle1
let circle2
function init() {
	circle1 = new Circle(300, 300, 100, 'black')
	circle2 = new Circle(undefined, undefined, 30, 'red')
}

function animate() {
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, canvas.width, canvas.height)

	circle1.update()
	circle2.x = mouse.x
	circle2.y = mouse.y
	circle2.update()

	if(utils.distance(circle1.x, circle1.y, circle2.x, circle2.y) < circle1.radius + circle2.radius) {
		circle1.color = 'red'
	} else {
		circle1.color = 'black'
	}
}

init()
animate()