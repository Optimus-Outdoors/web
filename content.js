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
    body:         'The world\'s first collapsible hardshell camper. Light enough for any truck, 100% insulated, more secure than aluminum, and it collapses down to the size of a pick-up camper shell.',
    photoNote:    'hero photo — camper at camp, 3200×1800',   // delete once a real photo is in
    primaryCta:   'Build yours',
    secondaryCta: 'See the specs',
    // The four boxes under the hero image.
    stats: [
      { value: 'Sub-500 lb', label: 'Dry weight' },
      { value: '6\'4"',    label: 'Standing height' },
      { value: '24/7',   label: 'Off-grid' },
      { value: '4-season', label: 'Insulation' },
    ],
  },

  // ---------------------------------------------------------------
  // "Three trims. One shell." — the configurator
  // ---------------------------------------------------------------
  build: {
    eyebrow: '01 · Configure',
    heading: 'Three trims. One shell.',
    body:    'Every Optimus camper starts with the same insulated composite shell. Modular for quick changes: set up quickly, whether you\'re bringing the electric bike or the kids.',
  },

  // Add or remove a whole { ... } block to change how many trims there are.
  trims: [
    {
      name:     'B',
      price:    'from $16,900',
      blurb:    'Insulated shell, twin bed, clean slate for your own build-out.',
      photoNote:'B trim — exterior 3/4 view',
      includes: [
        'Composite shell, 1.5" foam core',
        'Twin bed',
        'Moonroof',
        'Ultra light weight',
        'Simple design',
        'Two awning windows + roof hatch',
        'Available solar / LiFePO4 battery',
        'Rear entry with screen door',
      ],
    },
    {
      name:     'One',
      price:    'from $32,400',
      blurb:    'Full galley, shower, 400Ah of power, and water for a week.',
      photoNote:'One trim — exterior 3/4 view',
      includes: [
        'Full galley',
        'Shower',
        '400Ah of power',
        'Water for a week',
      ],
    },
    {
      name:     'Carbide',
      price:    'from $59,800',
      blurb:    'Arctic package: hydronic heating, 800Ah, 600W solar, indoor shower/toilet, water filtration, and a Starlink terminal, for working off-grid indefinitely.',
      photoNote:'Carbide trim — exterior 3/4 view',
      includes: [
        'Arctic package, R-10 walls',
        'Wet bath with cassette toilet',
        '800Ah lithium, 600W solar',
        'Starlink mount + 12V router',
        'Dual-pane heated acrylic windows',
      ],
    },
  ],
  defaultTrim: 1,   // which trim is selected on page load. 0 = first, 1 = second, 2 = third

  // Paint colours. 'hex' is the actual colour — needs the # and 6 characters.
  colorwayLabel: 'Shell colorway',
  colorways: [
    { name: 'Lichen Green Wrap', hex: '#4d6b52' },
    { name: 'Bone Beige',   hex: '#e0d9c4' },
    { name: 'Basalt',       hex: '#3a3d3a' },
    { name: 'Sagebrush Wrap',    hex: '#8f9a7d' },
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
      { title: 'Composite shell',    body: 'Vacuum-bonded fiberglass over foam core. No wood, no seams to leak, no thermal bridges. True four-season use.', photoNote: 'shell detail — corner radius' },
      { title: 'Dual-axis actuation', body: 'Collapses from a full over-cab camper to a discreet pick-up shell.', photoNote: 'collapsed vs raised — side by side' },
      { title: 'Power that lasts',          body: 'Lithium bank, MPPT solar, and a 2000W inverter wired for a fridge, laptops, and an induction hob.', photoNote: 'electrical bay — open door' },
      { title: 'Security',            body: 'Double-skin 1/8" fiberglass composite shell. Stronger than aluminum, scratch resistant, UV protected.', photoNote: 'shell edge — laminate cross-section' },
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
      { title: 'Sleep',   body: 'Sizes range from twin to queen, with available moonroof for stargazing' },
      { title: 'Work',    body: 'Dinette converts to a 2-person desk' },
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
    note:    'One trim shown · imperial',
    rows: [
      ['Exterior length',           '12\' 6"'],
      ['Exterior width',            '4\' 0"'],
      ['Interior standing height',  '6\' 4"'],
      ['Dry weight',                'Sub-500 lb'],
      ['Fresh / grey water',        '30 gal / 12 gal'],
      ['Battery',                   '400 Ah LiFePO4 (12V)'],
      ['Solar',                     '600 W roof array, MPPT'],
      ['Heat',                      'Hydronic, 2 kW'],
      ['Wall insulation',           'R-10, 1.5\" PIR foam core'],
      ['Warranty',                  '3-year structural, 1-year systems'],
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
      { q: 'Is it really four-season?',    a: 'The shell has no thermal bridges and every tank sits inside the heated envelope. Owners winter-camp it below 0°F on the One and Carbide trims.' },
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
      { title: 'Campers', links: ['Optimus B', 'Optimus One', 'Optimus Carbide', 'Compare trims'] },
      { title: 'Company', links: ['About the shop', 'Build process', 'Demo locations', 'Careers'] },
      { title: 'Support', links: ['Owner manuals', 'Service requests', 'Financing', 'Contact'] },
    ],
    copyright: '© 2026 Optimus Outdoors · Mockup',
  },
};

// Lets the test file read this on the server side. Ignore it.
if (typeof module !== 'undefined') module.exports = CONTENT;
