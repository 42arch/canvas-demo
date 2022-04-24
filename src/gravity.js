import utils from './utils'

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

const gravity = 1
const friction = 0.9

addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight
  init()
})

addEventListener('click', () => {
	init()
})

// Objects
class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x
    this.y = y
		this.dx = dx
		this.dy = dy
    this.radius = radius
    this.color = color
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
		ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
  }

  update() {
		if(this.y + this.radius > canvas.height) {
			this.dy = -this.dy * friction
		} else {
			this.dy += gravity
		}
		if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0) {
			this.dx = -this.dx
		}
		this.x += this.dx
		this.y += this.dy
    this.draw()
  }
}

// Implementation
const ballList = []
function init() {
	ballList.length = 0
	for(let i=0; i<100; i++) {
		let radius = utils.randomIntFromRange(10, 20)
		let x = utils.randomIntFromRange(radius, canvas.width - radius)
		let y = utils.randomIntFromRange(0, canvas.height - radius)
		let dx = utils.randomIntFromRange(-2, 2)
		let dy = utils.randomIntFromRange(-2, 2)
		let color = utils.randomColor(colors)
		ballList.push(new Ball(x, y, dx, dy, radius, color))
	}
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
	ballList.forEach(ball => {
		ball.update()
	})
	// ball.update()
}

init()
animate()