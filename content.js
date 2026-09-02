/* =====================================================================
   ALL WEBSITE TEXT LIVES IN THIS FILE.
   Edit here, save, push. You never need to touch index.html.

   Three rules:
     1. Only change text BETWEEN the quotes.        'Change me'
     2. Keep every comma at the end of a line.
     3. Use straight quotes ' not curly ones ' '

   If the page ever goes blank after an edit, you broke one of the three.
   Open the browser console (F12) — it names the line number.
   ===================================================================== */

const CONTENT = {

  // ---------------------------------------------------------------
  // Browser tab + Google search result
  // ---------------------------------------------------------------
  site: {
    tabTitle:    'Optimus O1 — Flatbed Truck Camper | Optimus Outdoors',
    description: 'A composite-shell flatbed truck camper built for washboard roads and long winters. 1,300 lb dry, off-grid for a week, fits in a standard garage.',
    wordmark:    'OPTIMUS OUTDOORS',   // top-left and footer logo text
    model:       'O1',                 // used by the bottom bar, e.g. "O1 Overland"
  },

  // ---------------------------------------------------------------
  // Green announcement strip across the very top
  // ---------------------------------------------------------------
  banner: '2027 build slots now open — reserve with a refundable deposit',

  // ---------------------------------------------------------------
  // Top menu. 'href' must stay as-is — it points at a section below.
  // ---------------------------------------------------------------
  nav: [
    { label: 'Build',    href: '#build' },
    { label: 'Features', href: '#features' },
    { label: 'Specs',    href: '#specs' },
    { label: 'Interior', href: '#interior' },
    { label: 'FAQ',      href: '#faq' },
  ],
  reserveLabel: 'Reserve',   // the green button, top-right and bottom bar

  // ---------------------------------------------------------------
  // Big opening section
  // ---------------------------------------------------------------
  hero: {
    eyebrow:      'Flatbed truck camper · 4-season',
    title:        'OPTIMUS O1',
    body:         'A composite-shell camper built for washboard roads and long winters. 1,300 lb dry, off-grid for a week, and it fits in a standard garage.',
    photoNote:    'hero photo — camper at camp, 3200×1800',   // delete once a real photo is in
    primaryCta:   'Build yours',
    secondaryCta: 'See the specs',
    // The four boxes under the hero image.
    stats: [
      { value: '1,300 lb', label: 'Dry weight' },
      { value: '6\'4"',    label: 'Standing height' },
      { value: '7 days',   label: 'Off-grid' },
      { value: '4-season', label: 'Insulation' },
    ],
  },

  // ---------------------------------------------------------------
  // "Three trims. One shell." — the configurator
  // ---------------------------------------------------------------
  build: {
    eyebrow: '01 · Configure',
    heading: 'Three trims. One shell.',
    body:    'Every O1 starts with the same insulated composite shell. Pick how far off the grid you plan to get.',
  },

  // Add or remove a whole { ... } block to change how many trims there are.
  trims: [
    {
      name:     'Basecamp',
      price:    'from $6,900',
      blurb:    'Insulated shell, queen bed, 12V fan, and a clean slate for your own build-out.',
      photoNote:'basecamp trim — exterior 3/4 view',
      includes: [
        'Composite shell, 2" foam core',
        'Fixed east-west queen',
        'Two awning windows + roof hatch',
        '100Ah lithium, 200W solar',
        'Rear entry with screen door',
      ],
    },
    {
      name:     'Overland',
      price:    'from $62,400',
      blurb:    'The full galley, 400Ah of power, and water for a week of dry camping.',
      photoNote:'overland trim — exterior 3/4 view',
      includes: [
        'Galley with 2-burner + sink',
        '30 gal fresh, 12 gal grey',
        '400Ah lithium, 600W solar',
        'Diesel air heater + hot water',
        'Convertible dinette for two',
      ],
    },
    {
      name:     'Expedition',
      price:    'from $79,800',
      blurb:    'Arctic package, indoor shower, and 800Ah for working off-grid indefinitely.',
      photoNote:'expedition trim — exterior 3/4 view',
      includes: [
        'Arctic package, R-14 walls',
        'Wet bath with cassette toilet',
        '800Ah lithium, 1200W solar',
        'Starlink mount + 12V router',
        'Dual-pane heated windows',
      ],
    },
  ],
  defaultTrim: 1,   // which trim is selected on page load. 0 = first, 1 = second, 2 = third

  // Paint colours. 'hex' is the actual colour — needs the # and 6 characters.
  colorwayLabel: 'Shell colorway',
  colorways: [
    { name: 'Lichen Green', hex: '#4d6b52' },
    { name: 'Bone Beige',   hex: '#e0d9c4' },
    { name: 'Basalt',       hex: '#3a3d3a' },
    { name: 'Sagebrush',    hex: '#8f9a7d' },
  ],
  reservePrefix: 'Reserve ',   // becomes "Reserve Overland"
  depositNote:   '$1,000 deposit',

  // ---------------------------------------------------------------
  // "Details that matter at mile 400." — the four cards
  // ---------------------------------------------------------------
  features: {
    eyebrow: '02 · Built for it',
    heading: 'Details that matter at mile 400.',
    items: [
      { title: 'One-piece composite shell', body: 'Vacuum-bonded fiberglass over foam core. No wood, no seams to leak, no thermal bridges.', photoNote: 'shell detail — corner radius' },
      { title: 'Torsion-free mount',        body: 'A three-point subframe lets the flatbed twist under the camper instead of through it.',   photoNote: 'underside — subframe mount' },
      { title: 'Power that lasts',          body: 'Lithium bank, MPPT solar, and a 2000W inverter wired for a fridge, laptops, and an induction hob.', photoNote: 'electrical bay — open door' },
      { title: 'Garage-friendly',           body: 'Under 8 ft of total height on most flatbeds, so it comes home with you instead of into storage.',   photoNote: 'camper in home garage' },
    ],
  },

  // ---------------------------------------------------------------
  // Dark green interior section
  // ---------------------------------------------------------------
  interior: {
    eyebrow: '03 · Interior',
    heading: 'Stand up, cook, sleep, work.',
    body:    '6\'4" of standing headroom over the galley, a fixed east-west queen, and a dinette that seats two adults with the door closed.',
    points: [
      { title: 'Galley',  body: 'Stainless sink, 2-burner, 4.5 cu ft fridge' },
      { title: 'Sleep',   body: 'Fixed queen, 10" mattress, reading lights' },
      { title: 'Work',    body: 'Dinette converts to a 2-person desk' },
      { title: 'Storage', body: '11 cabinets, 2 exterior gear lockers' },
    ],
    // Three image slots: one wide across the top, two square below.
    photoNotes: ['interior wide — galley + dinette', 'bed detail', 'floorplan'],
  },

  // ---------------------------------------------------------------
  // Spec table. Each row is [ label, value ].
  // ---------------------------------------------------------------
  specs: {
    eyebrow: '04 · Specifications',
    heading: 'The numbers.',
    note:    'Overland trim shown · imperial',
    rows: [
      ['Exterior length',           '12\' 6"'],
      ['Exterior width',            '7\' 0"'],
      ['Interior standing height',  '6\' 4"'],
      ['Dry weight',                '1,300 lb'],
      ['Fresh / grey water',        '30 gal / 12 gal'],
      ['Battery',                   '400 Ah LiFePO4 (12V)'],
      ['Solar',                     '600 W roof array, MPPT'],
      ['Heat',                      'Diesel air heater, 2 kW'],
      ['Wall insulation',           'R-11 walls, R-14 roof'],
      ['Warranty',                  '5-year structural, 2-year systems'],
    ],
  },

  // ---------------------------------------------------------------
  // FAQ. First one is open when the page loads.
  // ---------------------------------------------------------------
  faq: {
    heading: 'Questions, answered.',
    items: [
      { q: 'What trucks does the O1 fit?', a: 'Any flatbed on a 3/4-ton or 1-ton chassis, 6.5 ft bed or longer. We ship a subframe kit matched to your make and model, and mount it at the shop or send it out with instructions.' },
      { q: 'How long is the wait?',        a: 'Roughly 7–9 months from deposit to delivery. Slots are released in quarterly batches; the deposit holds your place in the queue and is refundable up to the build start date.' },
      { q: 'Can I finance it?',            a: 'Yes. We work with two RV lenders who treat truck campers as recreational vehicles, with terms up to 15 years. Pre-qualification takes about a day.' },
      { q: 'Is it really four-season?',    a: 'The shell has no thermal bridges and every tank sits inside the heated envelope. Owners winter-camp it below 0°F on the Overland and Expedition trims.' },
    ],
  },

  // ---------------------------------------------------------------
  // Green box near the bottom
  // ---------------------------------------------------------------
  cta: {
    heading:   'Come see one in person.',
    body:      'Demo units in Bend, OR and Golden, CO. Walkthroughs run Thursday through Sunday.',
    primary:   'Book a walkthrough',
    secondary: 'Download spec sheet',
  },

  // ---------------------------------------------------------------
  // The popup that opens when someone clicks any "Reserve" button.
  //
  // !! EVERY DETAIL BELOW IS MADE UP — replace before telling anyone
  // !! about the site. The phone number is in the 555 range that films
  // !! use, so it dials nowhere.
  //
  // Add or remove a whole { ... } line to change how many rows show.
  // 'href' is what clicking it does:
  //     mailto:you@example.com   opens their email app
  //     https://...              opens a website
  //     tel:+15415550134         dials on a phone
  //     ''  (empty)              plain text, not clickable
  // ---------------------------------------------------------------
  contact: {
    heading:     'Reserve your build slot',
    blurb:       'Tell us the trim and colorway you want and we will send the deposit link and a delivery estimate. We answer within a day.',
    selectedLabel: 'Your selection',
    methods: [
      { label: 'Email',     value: 'hello@optimus-outdoors.com', href: 'mailto:hello@optimus-outdoors.com' },
      { label: 'Instagram', value: '@optimusoutdoors',          href: 'https://instagram.com/optimusoutdoors' },
      { label: 'Phone',     value: '(541) 555-0134',            href: 'tel:+15415550134' },
      { label: 'Shop',      value: 'Bend, Oregon · Thu–Sun, 9–5', href: '' },
    ],
    closeLabel: 'Close',

    // ---- Contact form ------------------------------------------------
    // OFF until you paste an endpoint below. While it is empty the popup
    // just shows the email/instagram rows above, so nothing looks broken.
    //
    // To turn it on (about 2 minutes, free for 50 messages/month):
    //   1. Sign up at https://formspree.io with the email you want
    //      enquiries delivered to.
    //   2. Create a new form. It gives you a URL that looks like
    //      https://formspree.io/f/abcdwxyz
    //   3. Paste that whole URL between the quotes below and push.
    //   4. Send yourself a test message — Formspree asks you to confirm
    //      your email address on the very first one.
    formEndpoint: '',

    form: {
      nameLabel:     'Name',
      emailLabel:    'Email',
      messageLabel:  'Message',
      messageHint:   'Questions about the build, timeline, or financing.',
      submitLabel:   'Send enquiry',
      sendingLabel:  'Sending…',
      successLabel:  'Thanks — we will reply within a day.',
      errorLabel:    'That did not send. Please email us instead.',
    },
  },

  // ---------------------------------------------------------------
  // Footer
  // ---------------------------------------------------------------
  footer: {
    blurb: 'Overland campers built in Bend, Oregon.',
    columns: [
      { title: 'Campers', links: ['O1 Basecamp', 'O1 Overland', 'O1 Expedition', 'Compare trims'] },
      { title: 'Company', links: ['About the shop', 'Build process', 'Demo locations', 'Careers'] },
      { title: 'Support', links: ['Owner manuals', 'Service requests', 'Financing', 'Contact'] },
    ],
    copyright: '© 2026 Optimus Outdoors · Mockup',
  },
};

// Lets the test file read this on the server side. Ignore it.
if (typeof module !== 'undefined') module.exports = CONTENT;
