import LegalLayout from './LegalLayout'

export default function Privacy() {
  return (
    <LegalLayout
      title="Privacy Policy"
      updated="15 July 2026"
      canonical="/privacy"
      description="How Yadia collects, uses, retains, and protects personal data across our real-time translation platform."
    >
      <p>
        This Privacy Policy explains how Yadia (“Yadia”, “we”, “us”) collects, uses, and protects
        personal data when you visit our website, create an account, or use our real-time
        translation platform. We designed Yadia to process live event data with privacy in mind,
        and we only collect what we need to provide the service.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li><strong>Account information</strong> — your name, work email, organisation, and role when you sign up or request access.</li>
        <li><strong>Usage data</strong> — how you interact with the dashboard and platform, including event counts, viewer numbers, and feature usage, used to operate and improve the product.</li>
        <li><strong>Event content</strong> — audio, transcripts, and translations generated during your live events. This content is processed to deliver captions and translated audio to your viewers.</li>
        <li><strong>Technical data</strong> — IP address, browser type, device information, and cookies (see our <a href="/cookies">Cookie Policy</a>).</li>
      </ul>

      <h2>How we use your information</h2>
      <p>We use personal data to provide and secure the platform, deliver real-time translation, communicate with you about your account, prevent abuse, comply with legal obligations, and improve our models and features. We do not sell your personal data.</p>

      <h2>Event content &amp; retention</h2>
      <p>Event audio, transcripts, and translations are processed in real time to deliver the service. Recordings and transcripts are retained according to your plan and account settings, and can be configured or deleted from your dashboard. You control retention windows and can request deletion at any time.</p>

      <h2>Sharing &amp; sub-processors</h2>
      <p>We share personal data only with trusted sub-processors who help us run the service (for example, cloud infrastructure, speech and translation model providers, and analytics), all bound by contractual confidentiality and data-protection obligations. We may also disclose data where required by law.</p>

      <h2>Security</h2>
      <p>We protect data in transit and at rest using industry-standard encryption, apply least-privilege access controls, and monitor our systems continuously. No system is perfectly secure, but we work hard to safeguard your information and to disclose incidents responsibly.</p>

      <h2>International transfers</h2>
      <p>Yadia operates globally. Where personal data is transferred across regions, we rely on appropriate safeguards such as standard contractual clauses to ensure a comparable level of protection.</p>

      <h2>Your rights</h2>
      <p>Depending on your location, you may have the right to access, correct, export, or delete your personal data, and to object to or restrict certain processing. To exercise these rights, contact us at <a href="mailto:privacy@yadia.ai">privacy@yadia.ai</a>.</p>

      <h2>Children’s privacy</h2>
      <p>Yadia is a business platform and is not directed to children under 16. We do not knowingly collect personal data from children.</p>

      <h2>Changes to this policy</h2>
      <p>We may update this policy from time to time. Material changes will be posted here with a revised “Last updated” date, and where appropriate we will notify you directly.</p>

      <h2>Contact</h2>
      <p>Questions about this policy or your data? Email us at <a href="mailto:privacy@yadia.ai">privacy@yadia.ai</a> or via our <a href="/contact">contact page</a>.</p>
    </LegalLayout>
  )
}
