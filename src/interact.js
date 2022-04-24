const canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const ctx = canvas.getContext('2d')


const mouse = {
	x: undefined,
	y: undefined
}
const maxRadius = 40
const minRadius = 3
const colorList = [
	'#2c3e50', '#e74c3c', '#ecf0f1', '#349808', '#298089'
]
window.addEventListener('mousemove', (event) => {
	mouse.x = event.x
	mouse.y = event.y
})
window.addEventListener('resize', () => {
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
	init()
})

function Circle(x, y, dx, dy, radius) {
	this.x = x
	this.y = y
	this.dx = dx
	this.dy = dy
	this.radius = radius
	this.minRadius = radius
	this.color = colorList[Math.floor(Math.random() * colorList.length)]

	this.draw = function() {
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		// ctx.strokeStyle = 'blue'
		ctx.fillStyle = this.color
		ctx.fill()
		// ctx.stroke()
	}

	this.update = function() {
		if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
			this.dx = -this.dx
		}
		if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
			this.dy = -this.dy
		}
		this.x += this.dx
		this.y += this.dy

		if(mouse.x - this.x < 50 && mouse.x - this.x > -50 
			&& mouse.y - this.y < 50 && mouse.y - this.y > -50
		) {
			if(this.radius < maxRadius) {
				this.radius += 1
			}
		} else if (this.radius > this.minRadius) {
			this.radius -= 1
		}

		this.draw()
	}
}

const circleList = []
function init() {
	circleList.length = 0
	for(let i=0; i<200; i++) {
		let radius = Math.random() * 3 + 3
		let x = Math.random() * (innerWidth - radius * 2) + radius
		let y = Math.random() * (innerHeight -radius * 2) + radius
		let dx = (Math.random() - 0.5) * 2
		let dy = (Math.random() - 0.5) * 2
		circleList.push(new Circle(x, y, dx, dy, radius))
	}
}
init()

function animate() {
	requestAnimationFrame(animate)
	ctx.clearRect(0, 0, innerWidth, innerHeight)

	circleList.forEach(circle => {
		circle.update()
	})
}

animate()