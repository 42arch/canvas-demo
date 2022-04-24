const canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const ctx = canvas.getContext('2d')

function Circle(x, y, dx, dy, radius) {
	this.x = x
	this.y = y
	this.dx = dx
	this.dy = dy
	this.radius = radius

	this.draw = function() {
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		ctx.strokeStyle = 'blue'
		ctx.stroke()
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

		this.draw()
	}
}

const circleList = []
for(let i=0; i<100; i++) {
	let radius = 30
	let x = Math.random() * (innerWidth - radius * 2) + radius
	let y = Math.random() * (innerHeight -radius * 2) + radius
	let dx = (Math.random() - 0.5) * 2
	let dy = (Math.random() - 0.5) * 2
	circleList.push(new Circle(x, y, dx, dy, radius))
}

let radius = 30
function animate() {
	requestAnimationFrame(animate)
	ctx.clearRect(0, 0, innerWidth, innerHeight)

	circleList.forEach(circle => {
		circle.update()
	})
}

animate()