import { useEffect, useRef } from 'react'

/**
 * Animated flowing gradient wave (blue + amber grainy ribbons).
 * Fills its parent — give the wrapper a height via className/CSS.
 */
export default function GradientWave({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf, t = 0, W, H
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    function resize() {
      const r = canvas.getBoundingClientRect()
      W = canvas.width = Math.max(1, r.width * dpr)
      H = canvas.height = Math.max(1, r.height * dpr)
    }

    const ribbons = [
      { amp: 0.16, freq: 1.1, speed: 0.6, y: 0.5, w: 0.22, c0: '#aac6ff', c1: '#5b8dfb' },
      { amp: 0.12, freq: 1.6, speed: -0.9, y: 0.55, w: 0.18, c0: '#f6d7ad', c1: '#e9a23b' },
      { amp: 0.20, freq: 0.8, speed: 0.45, y: 0.48, w: 0.14, c0: '#cfe0ff', c1: '#9bc0ff' },
    ]

    function draw() {
      ctx.clearRect(0, 0, W, H)
      ctx.globalCompositeOperation = 'multiply'
      ribbons.forEach((rb, i) => {
        const grad = ctx.createLinearGradient(0, 0, W, 0)
        grad.addColorStop(0, rb.c0); grad.addColorStop(0.5, rb.c1); grad.addColorStop(1, rb.c0)
        ctx.fillStyle = grad
        ctx.beginPath()
        const baseY = H * rb.y
        const band = H * rb.w
        ctx.moveTo(0, baseY)
        for (let x = 0; x <= W; x += 8) {
          const p = x / W
          const y = baseY + Math.sin(p * Math.PI * 2 * rb.freq + t * rb.speed + i) * H * rb.amp
          ctx.lineTo(x, y)
        }
        for (let x = W; x >= 0; x -= 8) {
          const p = x / W
          const y = baseY + band + Math.sin(p * Math.PI * 2 * rb.freq + t * rb.speed + i + 0.6) * H * rb.amp
          ctx.lineTo(x, y)
        }
        ctx.closePath()
        ctx.fill()
      })
      t += 0.005
      raf = requestAnimationFrame(draw)
    }

    resize(); draw()
    window.addEventListener('resize', resize, { passive: true })
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <div className={`gwave ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  )
}
