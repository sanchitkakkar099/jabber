import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <>
      <header id="navbar" className={scrolled ? 'scrolled' : ''}>
        <div className="nav-announce">
          <span>Zabber now delivers live AI translation in 50+ languages.</span>
          <Link to="/about">Read more →</Link>
        </div>
        <div className="container nav-container">
          <Link to="/" className="logo">
            <img src="/logo.png" alt="Zabber" className="nav-logo-img" />
          </Link>
          <ul className="nav-menu">
            <li><Link to="/features">Features</Link></li>
            <li><Link to="/how-it-works">How It Works</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/login">Sign in</Link></li>
            <li><Link to="/signup" className="btn btn-primary btn-sm">Get started</Link></li>
          </ul>
          <button
            className={`hamburger${menuOpen ? ' active' : ''}`}
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(o => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <Link to="/features" onClick={() => setMenuOpen(false)}>Features</Link>
        <Link to="/how-it-works" onClick={() => setMenuOpen(false)}>How It Works</Link>
        <Link to="/use-cases" onClick={() => setMenuOpen(false)}>Use Cases</Link>
        <Link to="/pricing" onClick={() => setMenuOpen(false)}>Pricing</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
        <Link to="/login" onClick={() => setMenuOpen(false)}>Sign in</Link>
        <Link to="/signup" className="btn btn-primary" onClick={() => setMenuOpen(false)}>Get started</Link>
      </div>
    </>
  )
}
