import React, { useEffect, useRef, useState } from 'react'

class Circle {
  x: number
  y: number
  radius: number
  dx: number
  dy: number
  color: string

  constructor(
    x: number,
    y: number,
    radius: number,
    dx: number,
    dy: number,
    color: string
  ) {
    this.x = x
    this.y = y
    this.radius = radius
    this.dx = dx
    this.dy = dy
    this.color = color
  }

  draw(context: CanvasRenderingContext2D) {
    context.beginPath() // Starts the path
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2) // Creates the circle
    context.fillStyle = this.color // Sets the color
    context.fill() // Draws the circle
    context.closePath() // Closes the path
  }

  update(canvasWidth: number, canvasHeight: number, addGravity: boolean) {
    if (addGravity) {
      // Add gravity effect
      this.dy += 0.01 // Adjust the value to control the strength of gravity
    }

    this.x += this.dx
    this.y += this.dy

    // Respawn at the top when snowflake reaches the bottom
    if (this.y > canvasHeight + this.radius) {
      this.x = Math.random() * canvasWidth
      this.y = -this.radius
      this.dy = Math.random() * 2 + 1 // Reset the vertical velocity
    }
  }
}

const Snow = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const circleArrayRef = useRef<Circle[]>([])
  const colors = ['#272932', '#1c7293', '#5b70f3', '#a4fbe3'] // The list of colors

  const [addGravity, setAddGravity] = useState(false)

  const resizeCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = window.innerWidth // set width
    canvas.height = window.innerHeight // set height
    init()
  }

  const animate = () => {
    requestAnimationFrame(animate)
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return
    context.clearRect(0, 0, window.innerWidth, window.innerHeight) // clear
    for (let i = 0; i < circleArrayRef.current.length; i++) {
      const circle = circleArrayRef.current[i]
      circle.update(canvas.width, canvas.height, addGravity) // update
      circle.draw(context) // draw
    }
  }

  const init = () => {
    circleArrayRef.current = []
    const canvas = canvasRef.current
    if (!canvas) return
    for (let i = 0; i < 100; i++) {
      const radius = Math.random() * 2 + 1 // set radius
      const x = Math.random() * canvas.width // set position
      const y = Math.random() * canvas.height
      const dx = (Math.random() - 0.5) * 0.5 // set horizontal velocity
      const dy = Math.random() * 2 + 1 // set vertical velocity
      const color = colors[Math.floor(Math.random() * colors.length)] // set color
      const circle = new Circle(x, y, radius, dx, dy, color) // create new circle
      circleArrayRef.current.push(circle) // push new circle
    }
  }

  useEffect(() => {
    resizeCanvas()

    window.addEventListener('DOMContentLoaded', resizeCanvas)
    window.addEventListener('resize', resizeCanvas)

    return () => {
      window.removeEventListener('DOMContentLoaded', resizeCanvas)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    animate()
  }, [])

  const handleCanvasClick = () => {
    setAddGravity(true)
    setTimeout(() => {
      setAddGravity(false)
    }, 3000) // Adjust the duration of gravity effect
  }

  return (
    <canvas
      id="canvas"
      ref={canvasRef}
      className="absolute-bg"
      onClick={handleCanvasClick}
    />
  )
}

export default Snow
