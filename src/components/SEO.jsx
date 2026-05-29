import { Helmet } from 'react-helmet-async'

const BASE_URL = 'https://jabber.live'
const DEFAULT_DESC = 'Jabber delivers real-time AI transcription, translation, and voice synthesis to thousands of live event viewers — each in the language they choose. Serverless. Under 2-second latency. Free to start.'
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`

export default function SEO({ title, description, canonical = '/', schema, noindex = false, ogImage }) {
  const fullTitle = title
    ? `${title} | Jabber`
    : 'Jabber — Real-Time Live Translation for Global Events'
  const desc = description || DEFAULT_DESC
  const url = `${BASE_URL}${canonical}`
  const image = ogImage || DEFAULT_IMAGE

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Jabber" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@jabberlive" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD */}
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  )
}
