import LegalLayout from './LegalLayout'

export default function ResponsibleDisclosure() {
  return (
    <LegalLayout
      title="Responsible Disclosure"
      updated="15 July 2026"
      canonical="/responsible-disclosure"
      description="How to report a security vulnerability to Yadia, and what to expect when you do."
    >
      <p>
        We take the security of our platform and our customers’ events seriously. If you believe
        you have found a security vulnerability in Yadia, we want to hear from you and will work
        with you to resolve it quickly. This policy sets out how to report issues responsibly.
      </p>

      <h2>How to report</h2>
      <p>Please email <a href="mailto:security@yadia.ai">security@yadia.ai</a> with a clear description of the issue, the steps to reproduce it, its potential impact, and any supporting material such as logs or screenshots. Encrypt sensitive details where possible.</p>

      <h2>Our commitment</h2>
      <ul>
        <li>We will acknowledge your report within <strong>3 business days</strong>.</li>
        <li>We will keep you informed as we investigate and work toward a fix.</li>
        <li>We will not pursue legal action against researchers who act in good faith and follow this policy.</li>
        <li>With your permission, we are happy to credit you once the issue is resolved.</li>
      </ul>

      <h2>Guidelines</h2>
      <ul>
        <li>Give us reasonable time to investigate and fix an issue before disclosing it publicly.</li>
        <li>Only test against accounts and data you own or have explicit permission to access.</li>
        <li>Do not access, modify, or delete other users’ data, or degrade the service for others.</li>
        <li>Avoid privacy violations, data destruction, and any interruption to live events.</li>
      </ul>

      <h2>Out of scope</h2>
      <p>Reports that generally fall outside this program include volumetric denial-of-service attacks, social engineering, physical attacks, spam, and issues in third-party services we do not control. Best-practice suggestions without a demonstrable security impact may not qualify.</p>

      <h2>Safe harbour</h2>
      <p>Activity conducted in a manner consistent with this policy will be considered authorised, and we will not initiate legal action against you for it. If legal action is initiated by a third party against you for such activity, we will make this authorisation known.</p>

      <h2>Contact</h2>
      <p>Report a vulnerability at <a href="mailto:security@yadia.ai">security@yadia.ai</a>. Thank you for helping keep Yadia and our customers safe.</p>
    </LegalLayout>
  )
}
