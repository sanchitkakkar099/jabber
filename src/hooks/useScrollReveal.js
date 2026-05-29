import { useEffect } from 'react'

export default function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        const el = entry.target
        const siblings = Array.from(el.parentElement.querySelectorAll('.reveal'))
        const idx = siblings.indexOf(el)
        const delay = el.dataset.delay ? parseInt(el.dataset.delay) : (idx > 0 ? idx * 80 : 0)
        setTimeout(() => el.classList.add('revealed'), delay)
        observer.unobserve(el)
      })
    }, { threshold: 0.12 })

    const els = document.querySelectorAll('.reveal:not(.revealed)')
    els.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  })
}
