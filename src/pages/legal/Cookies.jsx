import LegalLayout from './LegalLayout'

export default function Cookies() {
  return (
    <LegalLayout
      title="Cookie Policy"
      updated="15 July 2026"
      canonical="/cookies"
      description="How Yadia uses cookies and similar technologies, and how you can control them."
    >
      <p>
        This Cookie Policy explains how Yadia uses cookies and similar technologies when you visit
        our website and use our platform. It should be read alongside our{' '}
        <a href="/privacy">Privacy Policy</a>.
      </p>

      <h2>What are cookies?</h2>
      <p>Cookies are small text files stored on your device when you visit a website. They help the site work, remember your preferences, and understand how it is used. Similar technologies such as local storage serve comparable purposes.</p>

      <h2>How we use cookies</h2>
      <ul>
        <li><strong>Essential</strong> — required for the site and app to function, such as authentication, security, and remembering your session. These cannot be switched off.</li>
        <li><strong>Preferences</strong> — remember choices like your selected language or region so we can personalise your experience.</li>
        <li><strong>Analytics</strong> — help us understand how the site and product are used so we can improve them. These are aggregated and used to measure engagement and performance.</li>
      </ul>

      <h2>Third-party cookies</h2>
      <p>Some cookies are set by trusted third parties we use to run the service, such as analytics providers. These providers process data on our behalf under contractual data-protection obligations.</p>

      <h2>Managing cookies</h2>
      <p>You can control and delete cookies through your browser settings, and block or clear stored data at any time. Note that disabling essential cookies may prevent parts of the platform from working correctly.</p>

      <h2>Changes to this policy</h2>
      <p>We may update this Cookie Policy as our use of cookies evolves. Changes will be posted here with a revised “Last updated” date.</p>

      <h2>Contact</h2>
      <p>Questions about our use of cookies? Email <a href="mailto:privacy@yadia.ai">privacy@yadia.ai</a>.</p>
    </LegalLayout>
  )
}
