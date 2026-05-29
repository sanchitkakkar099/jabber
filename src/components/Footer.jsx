import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand-col">
          <Link to="/" className="logo footer-logo">
            <img src="/logo.png" alt="Zabber" className="footer-logo-img" />
          </Link>
          <p className="footer-tagline">Real-time multilingual translation<br />for global live events.</p>
        </div>
        <div className="footer-link-col">
          <h4>Product</h4>
          <Link to="/features">Features</Link>
          <Link to="/how-it-works">How It Works</Link>
          <Link to="/use-cases">Use Cases</Link>
          <Link to="/pricing">Pricing</Link>
        </div>
        <div className="footer-link-col">
          <h4>Company</h4>
          <Link to="/about">About</Link>
          <Link to="/blog">Blog</Link>
          <a href="#">Careers</a>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="footer-link-col">
          <h4>Legal</h4>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Security</a>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>&copy; 2026 Zabber. All rights reserved.</span>
          <div className="social-links">
            <a href="#">Twitter</a>
            <a href="#">LinkedIn</a>
            <a href="#">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
