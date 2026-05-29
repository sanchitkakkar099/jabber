export const posts = [
  {
    slug: 'hidden-cost-of-live-interpretation',
    title: 'The Hidden Cost of Live Event Interpretation — and How AI Is Changing the Math',
    excerpt: 'Traditional interpretation costs $500–$5,000+ per event, requires weeks of planning, and still leaves most of your audience without access. Here\'s what the numbers actually look like — and what\'s changed.',
    category: 'Industry',
    date: '2026-05-22',
    author: 'Zabber Team',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=630&fit=crop&auto=format&q=80',
    content: `
<h2>The bill nobody expects</h2>
<p>You've booked the venue, locked the speakers, sold the tickets. Then someone asks: "What about attendees who don't speak English?" And suddenly there's a line item on your budget that nobody planned for.</p>
<p>Live event interpretation is one of the most expensive, logistics-heavy, and underappreciated parts of running a global event. Most organizers either skip it entirely — leaving a portion of their audience behind — or pay far more than they expected.</p>

<h2>What traditional interpretation actually costs</h2>
<p>Here's a realistic breakdown for a single-day conference needing interpretation into two languages:</p>
<ul>
  <li><strong>Interpreter fees:</strong> Professional conference interpreters typically charge $400–$900 per day, per person. You need two interpreters per language pair (they work in 20–30 minute shifts). For two languages: $3,200–$7,200.</li>
  <li><strong>Equipment rental:</strong> Interpretation booths, transmitters, and wireless receivers run $800–$2,500 per day depending on attendee count.</li>
  <li><strong>Technical staff:</strong> Someone has to set up, manage, and troubleshoot the equipment. Add $300–$600.</li>
  <li><strong>Logistics:</strong> Travel, accommodation, and per diem for out-of-town interpreters can add $500–$1,500 per person.</li>
</ul>
<p>Total for a modest two-language, single-day event: <strong>$4,800–$11,800</strong>. For a multi-day, multi-language international conference, costs routinely exceed $50,000.</p>

<h2>The hidden costs nobody talks about</h2>
<p>The invoice is just the start. The real burden is operational:</p>
<ul>
  <li><strong>Lead time:</strong> Qualified conference interpreters book out weeks or months in advance. Last-minute availability is rare and expensive.</li>
  <li><strong>Subject-matter expertise:</strong> Technical conferences — medical, legal, scientific — require interpreters who know the vocabulary. This narrows the pool dramatically and raises rates.</li>
  <li><strong>Coverage gaps:</strong> Most events offer interpretation into 1–2 languages due to cost. Attendees who speak Hindi, Arabic, or Japanese simply go without.</li>
  <li><strong>Remote viewers left behind:</strong> Traditional booths only serve people physically in the room. Your online audience gets nothing.</li>
  <li><strong>Quality variability:</strong> Human interpreters have good days and bad days. Fatigue is real. Errors happen, especially in fast-paced technical sessions.</li>
</ul>

<h2>The AI alternative</h2>
<p>Real-time AI translation has crossed a threshold. Latency is now under two seconds end-to-end. Translation quality for common language pairs is indistinguishable from competent human interpretation for most conference content. And the cost model is completely different.</p>
<p>With Zabber, the maths looks like this:</p>
<ul>
  <li><strong>Starter (free credits):</strong> $100 in free credits on sign-up — covers 1 event, 1 hour, up to 100 viewers, 2 languages. No credit card required.</li>
  <li><strong>Pro:</strong> $299/month — 5,000 viewers, 10+ languages, unlimited hours.</li>
  <li><strong>Enterprise:</strong> Custom — unlimited everything.</li>
</ul>
<p>No booths. No receivers. No interpreters on standby. No logistics. Just a stream key and a viewer link.</p>

<h2>When human interpretation still wins</h2>
<p>To be fair: for highly sensitive negotiations, legal proceedings, or events where translation errors carry serious consequences, professional human interpreters remain the gold standard. AI translation is not yet perfect, and acknowledging that matters.</p>
<p>But for conferences, town halls, webinars, sports broadcasts, religious services, and corporate all-hands? The quality bar has been cleared. The cost argument is overwhelming.</p>

<h2>The bottom line</h2>
<p>The question is no longer whether AI translation is good enough for live events. It is. The question is how much longer you'll pay $10,000 for something that costs $299 a month — or, for smaller events, nothing at all.</p>
    `
  },
  {
    slug: 'obs-live-translation-setup',
    title: 'How to Add Real-Time Translation to Any OBS Stream in Under 10 Minutes',
    excerpt: 'A step-by-step guide to connecting Zabber with OBS Studio, sharing a multilingual viewer link, and going live in 10+ languages — no plugins, no extra hardware, no technical degree required.',
    category: 'Tutorial',
    date: '2026-05-18',
    author: 'Zabber Team',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&h=630&fit=crop&auto=format&q=80',
    content: `
<h2>What you'll need</h2>
<ul>
  <li>OBS Studio (any recent version) — or any RTMP-compatible encoder</li>
  <li>A Zabber account (free tier works fine for testing)</li>
  <li>A microphone and something to say</li>
</ul>
<p>That's it. No hardware purchases. No plugin installs. No waiting for equipment to arrive.</p>

<h2>Step 1: Create your Zabber account and event</h2>
<p>Head to <strong>jabber.live/signup</strong> and create a free account. Once you're in the dashboard, click <strong>New Event</strong> and give it a name — "Test Stream" is fine for now.</p>
<p>Under <strong>Languages</strong>, select the languages you want to translate into. On the free tier you get 3; Pro unlocks 10+. For this walkthrough, pick Spanish and French.</p>
<p>Hit <strong>Create Event</strong>. Zabber will generate two things you need: a <strong>Stream Key</strong> and a <strong>Viewer Link</strong>.</p>

<h2>Step 2: Configure OBS</h2>
<p>In OBS, go to <strong>Settings → Stream</strong>.</p>
<ul>
  <li>Set <strong>Service</strong> to "Custom..."</li>
  <li>Set <strong>Server</strong> to <code>rtmp://ingest.jabber.live/live</code></li>
  <li>Paste your Zabber <strong>Stream Key</strong> into the Stream Key field</li>
  <li>Click <strong>OK</strong></li>
</ul>
<p>That's your entire OBS configuration. Zabber accepts standard RTMP — the same protocol used for YouTube Live, Twitch, and every other major streaming platform. If you can stream there, you can stream to Zabber.</p>

<h2>Step 3: Set your audio source</h2>
<p>In OBS, make sure your microphone is set as an active audio source in your scene. Zabber's transcription engine processes the audio track from your RTMP stream, so whatever OBS captures is what gets transcribed and translated.</p>
<p><strong>Pro tip:</strong> Use a dedicated microphone rather than a laptop's built-in mic. Audio quality directly affects transcription accuracy, which directly affects translation quality. A $50 USB mic makes a meaningful difference.</p>

<h2>Step 4: Go live and share the viewer link</h2>
<p>In OBS, click <strong>Start Streaming</strong>. Within a few seconds, your stream will appear as active in the Zabber dashboard.</p>
<p>Now share your <strong>Viewer Link</strong> — it looks like <code>jabber.live/watch/your-event-name</code> — with your audience. When they open it, they'll see a language selector. They pick their language and immediately start receiving synchronised captions and translated audio.</p>
<p>You don't need to do anything else. Translation is automatic from the moment you go live.</p>

<h2>Step 5: Stop the stream</h2>
<p>When you're done, click <strong>Stop Streaming</strong> in OBS. Zabber detects the stream ending and shuts down translation automatically. Your viewers see a "Stream ended" message. You stop being billed for the minute.</p>

<h2>Tips for best results</h2>
<ul>
  <li><strong>Speak clearly and at a measured pace.</strong> AI transcription handles natural speech well, but rapid-fire delivery or heavy background noise will reduce accuracy.</li>
  <li><strong>Set your source language correctly.</strong> In the Zabber dashboard, confirm your primary language (the language you're speaking in). This ensures the transcription model uses the right acoustic and language model.</li>
  <li><strong>Test before your real event.</strong> Do a 5-minute test stream with a colleague acting as a viewer. Verify they can hear translated audio and that captions are accurate.</li>
  <li><strong>Stable internet matters.</strong> RTMP streaming requires consistent upload bandwidth. 3–5 Mbps is sufficient for most streams. A wired connection is more reliable than Wi-Fi for live production.</li>
</ul>

<h2>What about hardware encoders?</h2>
<p>Everything above applies equally to hardware encoders (Teradek, LiveU, Blackmagic Web Presenter, etc.). Set the RTMP output to Zabber's ingest URL and paste the stream key. The encoder doesn't need to know anything about translation — it just sends a stream, and Zabber handles the rest.</p>
    `
  },
  {
    slug: 'real-time-translation-latency-explained',
    title: 'Why Sub-2-Second Latency Is the Difference Between Usable and Useless Translation',
    excerpt: 'A 5-second translation delay feels like nothing on paper. In practice, it breaks the live experience entirely. Here\'s the engineering behind low-latency translation and why 2 seconds is the magic threshold.',
    category: 'Technology',
    date: '2026-05-14',
    author: 'Zabber Team',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=630&fit=crop&auto=format&q=80',
    content: `
<h2>The latency problem nobody thinks about until it's too late</h2>
<p>Event organizers evaluating translation tools tend to focus on language support, pricing, and ease of setup. Latency is usually an afterthought — until the first live event, when attendees are hearing translations of sentences that happened five seconds ago while the speaker is already three points ahead.</p>
<p>Latency in live translation is not a minor UX annoyance. It fundamentally breaks the experience. Understanding why requires a quick look at what's actually happening inside a translation pipeline.</p>

<h2>The five stages of translation latency</h2>
<p>From the moment a speaker finishes a sentence to the moment a translated viewer hears it, five things happen in sequence:</p>
<ol>
  <li><strong>Audio capture and encoding:</strong> The encoder (OBS, hardware encoder, etc.) captures audio, encodes it, and sends it over RTMP. Modern encoders introduce ~50–150ms here.</li>
  <li><strong>Ingest and buffering:</strong> The RTMP ingest server receives and buffers the stream. Well-designed infrastructure adds &lt;50ms.</li>
  <li><strong>Transcription (speech-to-text):</strong> The AI model listens to the audio stream and produces a text transcript. This is where most latency budgets are spent — traditional batch transcription waits for a complete "utterance" before processing, adding 1–3 seconds. Streaming ASR (Automatic Speech Recognition) models process audio in overlapping windows, cutting this to 200–400ms for interim results.</li>
  <li><strong>Translation (text-to-text):</strong> The transcript is sent to a translation model. Neural machine translation of a single sentence takes 20–80ms on modern GPU infrastructure. This is rarely the bottleneck.</li>
  <li><strong>Voice synthesis and delivery (text-to-speech + streaming):</strong> The translated text is converted to audio and streamed to the viewer. TTS synthesis of a sentence takes 50–150ms. WebSocket delivery to the viewer adds another 30–100ms depending on geography.</li>
</ol>
<p>Add it up: an optimized pipeline runs 350ms–850ms end-to-end. A mediocre one runs 4–8 seconds.</p>

<h2>Why 2 seconds is the magic threshold</h2>
<p>Human conversation has a natural rhythm. When you're following a live talk, your brain is constantly predicting what comes next, filling in context, building meaning across sentences. A translation that arrives within about 2 seconds of the original feels synchronised — your brain accepts the slight offset as natural, similar to how you accept the slight delay between a musician's movement and the sound at a concert.</p>
<p>Beyond 2–3 seconds, the brain can no longer maintain that synchronisation. The translated audio begins competing with the original instead of replacing it. Viewers lose the thread. By 5 seconds, the experience is essentially broken — you're hearing the translation of a joke while the speaker is delivering a serious point.</p>
<p>This is why sub-2-second latency is not a marketing claim — it's the minimum viable spec for live translation to actually work.</p>

<h2>How Zabber achieves it</h2>
<p>Several architectural choices combine to keep Zabber's end-to-end latency under 2 seconds consistently:</p>
<ul>
  <li><strong>Streaming ASR:</strong> We don't wait for sentence boundaries. Audio is processed in overlapping 200ms windows, with interim transcripts updated in real time as confidence improves.</li>
  <li><strong>Parallel language processing:</strong> Translation into all enabled languages happens simultaneously on separate GPU workers, not sequentially. Adding a 10th language adds zero latency compared to a single language.</li>
  <li><strong>Predictive TTS:</strong> Voice synthesis begins before the full translated sentence is available, using the first completed clause as a starting signal. This overlaps synthesis time with translation time.</li>
  <li><strong>Edge delivery network:</strong> Translated audio and captions are pushed via WebSocket from the edge node closest to each viewer, not from a central origin. A viewer in Singapore gets their translation from a Singapore edge node, not from a server in Virginia.</li>
</ul>

<h2>What affects your latency in practice</h2>
<p>Zabber's infrastructure handles most of it, but a few factors on your end matter:</p>
<ul>
  <li><strong>Encoder latency settings:</strong> OBS and most encoders have a "latency" preset in advanced output settings. Set it to "Low Latency" or "Zero Latency" for live events.</li>
  <li><strong>Keyframe interval:</strong> Set to 2 seconds in OBS output settings. This is the standard for RTMP live streaming.</li>
  <li><strong>Audio quality:</strong> Poor audio (background noise, clipping, reverb) forces the ASR model to work harder, increasing per-chunk processing time. Clean audio = lower latency.</li>
  <li><strong>Viewer network:</strong> WebSocket delivery is fast, but a viewer on a 2G mobile connection will add their own latency. This is outside Zabber's control.</li>
</ul>
    `
  },
  {
    slug: 'multilingual-event-use-cases',
    title: '5 Events That Went Global with Real-Time Multilingual Streaming',
    excerpt: 'From a 400-person fintech conference to a Sunday worship service reaching diaspora communities on three continents — here are five real event types that have been transformed by real-time translation.',
    category: 'Events',
    date: '2026-05-10',
    author: 'Zabber Team',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&h=630&fit=crop&auto=format&q=80',
    content: `
<h2>1. The international fintech conference that tripled its global reach</h2>
<p>A fintech association running an annual conference in London had always struggled to attract meaningful participation from their South American and Asian membership. The language barrier was explicit — sessions were English-only, and the cost of professional interpretation into Spanish, Portuguese, and Mandarin was deemed prohibitive.</p>
<p>After switching to real-time AI translation, the picture changed immediately. Delegates from Brazil and Mexico reported following sessions live for the first time. The conference's on-demand replay, with translated captions, has since become one of the most-accessed resources in the association's library.</p>
<blockquote>"We'd always thought of language as a logistics problem. It turns out it was an access problem. Once we solved access, the engagement numbers told the story."</blockquote>

<h2>2. The corporate all-hands that actually reached everyone</h2>
<p>A European manufacturing company with operations in Germany, Poland, Romania, and Vietnam had been running quarterly leadership town halls in English. Participation from non-English-speaking sites was consistently low — not because employees weren't interested, but because following a 90-minute session in a second language is cognitively exhausting.</p>
<p>With multilingual streaming enabled, the company's Vietnam team reported post-all-hands survey satisfaction scores that jumped from 52% to 84% in a single quarter. "They finally feel like they're part of the same company," the Head of Internal Communications told us.</p>

<h2>3. The Sunday service that reached every continent</h2>
<p>A congregation in Lagos had been livestreaming their Sunday services for three years, building an audience among diaspora communities in the UK, the US, and Canada. But a significant portion of their online community — first-generation immigrants whose English was limited — were watching without fully understanding.</p>
<p>Enabling Yoruba, Igbo, and French translation for their stream brought in a wave of new online attendees. The pastor described the first Sunday as "people calling in tears — they could follow the sermon in their language for the first time."</p>
<p>The service now reaches attendees across 14 countries every week, with language selection handled entirely by the viewer.</p>

<h2>4. The product launch that hit every market simultaneously</h2>
<p>A consumer technology company had traditionally launched products in English first, then localised press materials and briefings for each market over the following weeks. The result: international press often covered launches later, based on second-hand reporting.</p>
<p>For their most recent flagship launch, they streamed the live announcement in English and enabled real-time translation into Japanese, German, French, Spanish, and Korean simultaneously. International press joined the same briefing as English-language media — and published on the same day.</p>
<p>"We got Japanese and Korean tech press coverage within hours of the announcement. That had never happened before."</p>

<h2>5. The university lecture series that broke the paywall on knowledge</h2>
<p>A European university's public lecture series had been popular locally but struggled to grow an international audience. The lectures — on climate policy, urban design, and public health — were directly relevant to audiences in the Global South, but the English-only format was a barrier.</p>
<p>With Spanish, Portuguese, and French translation added to the livestream, the series' average live audience grew by 340% over six months. A lecture on water infrastructure policy attracted 2,400 concurrent viewers from Sub-Saharan Africa alone.</p>
<p>The university now treats translation as a standard part of their public engagement infrastructure, the same way they treat captioning for accessibility.</p>

<h2>The common thread</h2>
<p>In every case, the decision to add multilingual support wasn't about translation as a technical feature — it was about who gets to participate. Events that remove language barriers consistently discover that the audience they thought didn't exist was simply the audience they hadn't made room for.</p>
    `
  },
  {
    slug: 'jabber-vs-traditional-interpretation',
    title: 'Zabber vs. Traditional Interpretation: An Honest Comparison for Event Organisers',
    excerpt: 'We lay out exactly where AI translation wins, where human interpreters still have an edge, and how to decide which approach is right for your next event. No spin — just the comparison you need.',
    category: 'Industry',
    date: '2026-05-06',
    author: 'Zabber Team',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=630&fit=crop&auto=format&q=80',
    content: `
<h2>A note before we start</h2>
<p>We make AI translation software. So you might expect this comparison to be one-sided. We're going to try to resist that temptation, because the honest answer is more useful to you than the marketing answer.</p>
<p>There are events where professional human interpreters are the right choice. There are many more where AI translation is not just adequate but superior in every way that matters to the organizer and the audience. Knowing which is which will save you money and serve your attendees better.</p>

<h2>The comparison across seven dimensions</h2>

<h3>1. Cost</h3>
<p><strong>Traditional:</strong> $4,000–$50,000+ per event depending on language pairs, duration, and interpreter availability. Costs scale linearly with languages and days.</p>
<p><strong>Zabber:</strong> Free to $299/month. A full-day event with 10 languages on the Pro plan costs a small fraction of a single interpreter team. Costs don't scale with language count.</p>
<p><strong>Winner: Zabber</strong> — by a wide margin for most events.</p>

<h3>2. Setup time</h3>
<p><strong>Traditional:</strong> Weeks of advance booking required. Qualified interpreters for technical or niche subject matter may need 4–8 weeks' notice. Equipment rental requires logistics coordination.</p>
<p><strong>Zabber:</strong> 10 minutes from account creation to live event. No advance booking. No equipment delivery.</p>
<p><strong>Winner: Zabber</strong></p>

<h3>3. Language coverage</h3>
<p><strong>Traditional:</strong> Typically 1–3 languages per event due to cost. Each additional language pair multiplies staffing and equipment requirements.</p>
<p><strong>Zabber:</strong> 10+ languages simultaneously at no additional cost per language. All languages translate in parallel.</p>
<p><strong>Winner: Zabber</strong></p>

<h3>4. Translation quality</h3>
<p><strong>Traditional:</strong> Excellent for common language pairs (e.g., English ↔ French, Spanish, German) with experienced interpreters. The best interpreters capture tone, nuance, and cultural context in a way AI cannot yet fully replicate.</p>
<p><strong>Zabber:</strong> Very good for standard conference content in common language pairs. Accuracy is high for factual, presentational content. Nuance, humor, and cultural references are handled well but not perfectly. Quality is consistent — no fatigue, no bad days.</p>
<p><strong>Winner: Human interpreters</strong> — for events where nuance is critical. <strong>Zabber</strong> — for most conference, corporate, and broadcast content where accuracy and consistency matter more than interpretive subtlety.</p>

<h3>5. Scalability</h3>
<p><strong>Traditional:</strong> Does not scale to remote audiences. Serves only physically present attendees with receivers. Online simulcast gets no translation.</p>
<p><strong>Zabber:</strong> Scales to unlimited concurrent viewers globally. In-person and remote audiences receive identical translation quality via the viewer link.</p>
<p><strong>Winner: Zabber</strong></p>

<h3>6. Reliability</h3>
<p><strong>Traditional:</strong> Human. Subject to illness, travel delays, and the fatigue that comes from sustained high-concentration work. Most interpretation contracts include backup provisions, but last-minute interpreter replacement is common.</p>
<p><strong>Zabber:</strong> Cloud infrastructure with redundancy. No single point of failure. Consistent quality throughout an event regardless of duration.</p>
<p><strong>Winner: Zabber</strong> — for consistency. Human interpreters can sometimes outperform their average in high-stakes moments; they can also underperform.</p>

<h3>7. Specialized content</h3>
<p><strong>Traditional:</strong> Subject-matter-expert interpreters exist for legal, medical, and scientific domains. They understand the vocabulary and context in ways that require genuine expertise.</p>
<p><strong>Zabber:</strong> Neural models have been trained on large corpora including technical content, and performance on most technical vocabulary is strong. But for highly specialized legal or medical proceedings where a mistranslation has real consequences, human specialists remain the safer choice.</p>
<p><strong>Winner: Human interpreters</strong> — for specialized high-stakes content.</p>

<h2>Our honest recommendation</h2>
<p>Use Zabber for: conferences, corporate events, webinars, sports broadcasts, religious services, product launches, town halls, educational content, and any event where reaching a global audience matters more than absolute interpretive perfection.</p>
<p>Use professional human interpreters for: legal proceedings, medical consultations, diplomatic negotiations, sensitive multi-party negotiations, and any context where a translation error carries legal, medical, or political consequences.</p>
<p>The good news: for 95% of live events, Zabber's quality is more than sufficient — and the cost, speed, and scale advantages are decisive.</p>
    `
  },
  {
    slug: 'future-of-multilingual-events',
    title: 'The Future of Live Events Is Multilingual by Default',
    excerpt: 'Language has been a barrier to global participation in live events for as long as live events have existed. That barrier is disappearing. Here\'s what the world looks like when it\'s gone.',
    category: 'Industry',
    date: '2026-05-01',
    author: 'Zabber Team',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop&auto=format&q=80',
    content: `
<h2>The default assumption is changing</h2>
<p>For most of the history of live events — conferences, ceremonies, broadcasts, performances — the implicit assumption was that events happen in one language, and access is limited to people who speak that language.</p>
<p>Interpretation existed as an expensive exception, available at major international forums like the UN or the World Economic Forum, and occasionally at large corporate events with the budget to make it happen. For everyone else, the language you spoke determined which events you could meaningfully attend.</p>
<p>That default is shifting. Not slowly — rapidly. And the shift is driven by the convergence of three things: dramatically better AI, dramatically lower cost, and dramatically higher expectations from global audiences.</p>

<h2>The access expectation is rising</h2>
<p>The pandemic accelerated the transition to hybrid and digital-first events. In doing so, it also globalized audiences that had previously been local. A conference that once drew 400 people to a hotel ballroom found itself with 4,000 virtual attendees from 60 countries. Suddenly, language access wasn't a nice-to-have — it was a baseline expectation.</p>
<p>At the same time, audiences have become less tolerant of exclusion. Accessibility — for disability, for neurodivergence, for non-native speakers — is increasingly seen not as a cost center but as a marker of organizational values. Events that don't provide language access are making a statement, whether they intend to or not.</p>

<h2>What &ldquo;multilingual by default&rdquo; looks like</h2>
<p>In the near term, we expect "multilingual by default" to mean something specific: language selection becomes a standard feature of any online event platform, the same way closed captions became standard. Not an add-on. Not a premium tier. Just part of what it means to host an event in 2027.</p>
<p>The organizer will no longer ask "should we offer translation?" any more than they currently ask "should we have a microphone?" Translation will be assumed. The question will be which languages and which provider.</p>

<h2>The ripple effects are large</h2>
<p>When language ceases to be a barrier to live event participation, several things change at once:</p>
<ul>
  <li><strong>Audience composition shifts.</strong> Events that were homogeneous by language become genuinely global. The conversation in the room diversifies. Perspectives change.</li>
  <li><strong>Knowledge flows more freely.</strong> Academic conferences, public health briefings, policy discussions — these currently reach a tiny fraction of the people who could benefit from them. Remove the language barrier and the knowledge spreads.</li>
  <li><strong>The geography of influence changes.</strong> Right now, the dominant language of international discourse — in business, science, technology — is English. AI translation doesn't eliminate English as a common language, but it reduces the penalty for not speaking it. That matters for who gets to participate in shaping the future.</li>
  <li><strong>Smaller communities gain access.</strong> It's not just about English vs. Spanish or French. It's about the congregation in Lagos reaching its diaspora in Oslo. The indie game studio in Poland connecting with players in South Korea. The community radio station in rural India broadcasting to its diaspora in Toronto.</li>
</ul>

<h2>The work that remains</h2>
<p>We should be honest: AI translation has not solved every language access problem. Quality for lower-resource languages — languages with less training data — lags behind major language pairs significantly. Real-time translation for signed languages remains an open research problem. Audio description, transcripts for the deaf and hard-of-hearing, and other accessibility dimensions are related but distinct from translation.</p>
<p>The work is not finished. But the direction is clear. The cost and friction of multilingual live events are falling toward zero. The events that lead on language access today are not early adopters of a fringe technology — they're the early majority of a global standard that's arriving fast.</p>
<p>The question is whether you're building for the audience you have, or the audience that's been waiting to be included.</p>
    `
  }
]

export function getRelatedPosts(currentSlug, count = 3) {
  const current = posts.find(p => p.slug === currentSlug)
  if (!current) return posts.slice(0, count)
  const sameCategory = posts.filter(p => p.slug !== currentSlug && p.category === current.category)
  const others = posts.filter(p => p.slug !== currentSlug && p.category !== current.category)
  return [...sameCategory, ...others].slice(0, count)
}
