import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="hh-foot">
      <div className="hh-wrap hh-foot-inner">
        <div className="hh-foot-disclaimer">
          <Link to="/" className="hh-foot-logo">
            <img src="/logo.png" alt="Zabber" />
          </Link>
          <p>
            Zabber provides real-time AI transcription, translation, and voice
            synthesis for live events. Zabber is a software platform and does not
            provide interpretation, broadcast, or advisory services.
          </p>
          <p>
            Translations and captions generated through Zabber are produced
            automatically from the audio and configuration provided by the customer.
            Zabber does not guarantee the accuracy or completeness of any output. By
            using this website or the Zabber platform you agree to our Terms of Use
            and Privacy Policy.
          </p>
        </div>
        <div className="hh-foot-cols">
          <div className="hh-foot-col">
            <h4>Zabber</h4>
            <Link to="/features">Features</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact us</Link>
          </div>
          <div className="hh-foot-col">
            <h4>Legal</h4>
            <a href="#">Privacy policy</a>
            <a href="#">Cookie policy</a>
            <a href="#">Responsible disclosure</a>
          </div>
        </div>
      </div>
      <div className="hh-wrap hh-foot-bottom">
        <span>&copy; 2026 Zabber. All rights reserved.</span>
        <div className="hh-foot-social">
          <a href="#">Twitter</a>
          <a href="#">LinkedIn</a>
          <a href="#">GitHub</a>
        </div>
      </div>
    </footer>
  )
}
