import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { captureUTM } from './utils/utm'
import { trackPageview } from './utils/posthog'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Features from './pages/Features'
import HowItWorks from './pages/HowItWorks'
import Pricing from './pages/Pricing'
import UseCases from './pages/UseCases'
import About from './pages/About'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Admin from './pages/Admin'
import Dashboard from './pages/Dashboard'
import DashEvents from './pages/dashboard/Events'
import DashLanguages from './pages/dashboard/Languages'
import DashAnalytics from './pages/dashboard/Analytics'
import DashRecordings from './pages/dashboard/Recordings'
import DashTranscripts from './pages/dashboard/Transcripts'
import DashTeam from './pages/dashboard/Team'
import DashBilling from './pages/dashboard/Billing'
import DashSettings from './pages/dashboard/Settings'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    captureUTM()
    trackPageview(pathname)
  }, [pathname])
  return null
}

function MainLayout() {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  )
}

function AuthLayout() {
  return <Outlet />
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/use-cases" element={<UseCases />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/events" element={<DashEvents />} />
        <Route path="/dashboard/languages" element={<DashLanguages />} />
        <Route path="/dashboard/analytics" element={<DashAnalytics />} />
        <Route path="/dashboard/recordings" element={<DashRecordings />} />
        <Route path="/dashboard/transcripts" element={<DashTranscripts />} />
        <Route path="/dashboard/team" element={<DashTeam />} />
        <Route path="/dashboard/billing" element={<DashBilling />} />
        <Route path="/dashboard/settings" element={<DashSettings />} />
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
