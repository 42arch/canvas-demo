import utils from '../utils'

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
	x: undefined,
	y: undefined
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

addEventListener('mousemove', (event) => {
	mouse.x = event.clientX
	mouse.y = event.clientY
})

addEventListener('resize', () => {
	canvas.width = innerWidth
	canvas.height = innerHeight

	init()
})

function rotate(velocity, angle) {
	const rotateVelocities = {
		x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
		y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
	}
	return rotateVelocities
}

function resolveCollision(particle, otherParticle) {
	const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x
	const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y
	const xDist = otherParticle.x - particle.x
	const yDist = otherParticle.y - particle.y

	if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
		const angle = -Math.atan(otherParticle.y - particle.y, otherParticle.x - particle.x)
		const m1 = particle.mass
		const m2 = otherParticle.mass
		const u1 = rotate(particle.velocity, angle)
		const u2 = rotate(otherParticle.velocity, angle)

		const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y }
		const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y }
		const vFinal1 = rotate(v1, -angle)
		const vFinal2 = rotate(v2, -angle)

		particle.velocity.x = vFinal1.x
		particle.velocity.y = vFinal2.y
		otherParticle.velocity.x = vFinal2.x
		otherParticle.velocity.y = vFinal2.y
	}
}

class Particle {
	constructor(x, y, radius, color) {
		this.x = x
		this.y = y
		this.velocity = {
			x: (Math.random() - 0.5) * 1,
			y: (Math.random() - 0.5) * 1
		}
		this.radius = radius
		this.color = color
		this.mass = 1
		this.opacity = 0
	}

	draw() {
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		ctx.save()
		ctx.globalAlpha = this.opacity
		ctx.fillStyle = this.color
		ctx.fill()
		ctx.restore()
		ctx.strokeStyle = this.color
		ctx.stroke()
		ctx.closePath()
	}

	update() {
		this.draw()
		for(let i = 0; i < particles.length; i++) {
			if(this === particles[i]) continue
			if(utils.distance(this.x, this.y, particles[i].x, particles[i].y) - this.radius * 2 < 0) {
				utils.resolveCollision(this, particles[i])
			}
		}
		if (this.x - this.radius <= 0 || this.x + this.radius >= innerWidth) {
			this.velocity.x = -this.velocity.x
		}
		if (this.y - this.radius <= 0 || this.y + this.radius >= innerHeight) {
			this.velocity.y = -this.velocity.y
		}
		if (utils.distance(mouse.x, mouse.y, this.x, this.y) < 120 && this.opacity < 0.2) {
			this.opacity += 0.02
		} else if (this.opacity > 0) {
			this.opacity -= 0.02
			this.opacity = Math.max(0, this.opacity)
		}
		this.x += this.velocity.x
		this.y += this.velocity.y
	}
}

let particles = []
function init() {
	for(let i = 0; i < 150; i++) {
		const radius = 15
		let x = utils.randomIntFromRange(radius, canvas.width - radius)
		let y = utils.randomIntFromRange(radius, canvas.height - radius)
		const color = utils.randomColor(colors)

		if(i !== 0 ) {
			for(let j = 0; j < particles.length; j++) {
				if(utils.distance(x, y, particles[j].x, particles[j].y) - radius * 2 < 0) {
					x = utils.randomIntFromRange(radius, canvas.width - radius)
					y = utils.randomIntFromRange(radius, canvas.height - radius)
					j = -1
				}
			}
		}
		particles.push(new Particle(x, y, radius, color))
	}
}

function animate() {
	requestAnimationFrame(animate)
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	particles.forEach(particle => {
		particle.update()
	})
}

init()
animate()