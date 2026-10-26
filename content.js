/* SYNQWAVE site content.
   Everything that is still to come from the studio lives here. Fill in a value, save, republish.
   Leave a list empty ([]) or a value empty ("") and that part of the site stays hidden,
   so nothing placeholder-like ever shows. Images: put files on the media site
   (https://synqwave-media.sites.tab.bot/) or in assets/ and use their URL/path. */
window.SYNQWAVE_CONTENT = {

  /* Founder photo for the About section. Empty = the logo tile shows instead.
     Example: founderPhoto: "https://synqwave-media.sites.tab.bot/talmeez.webp" */
  founderPhoto: "assets/founder-talmeez-v3.webp",

  /* Muted looping promo video, shown right after the hero. Empty src = hidden.
     Example: { src: "https://synqwave-media.sites.tab.bot/promo.mp4",
                poster: "https://synqwave-media.sites.tab.bot/promo.webp",
                caption: "SYNQWAVE promo", vertical: true } */
  promoVideo: { src: "https://synqwave-media3.sites.tab.bot/v/promo.mp4", poster: "https://synqwave-media3.sites.tab.bot/poster.jpg", caption: "", vertical: true },

  /* Case studies (4 to 6 real projects). Empty = "Selected projects coming soon" shows.
     Each entry:
     { client: "Client name", industry: "Industry",
       images: [{ src: "https://synqwave-media.sites.tab.bot/client-1.webp", alt: "What the image shows" }],
       problem: "What the client needed or what wasn't working.",
       whatWeDid: "What SYNQWAVE designed.",
       outcome: "What was delivered.",  (or result: "a real, checkable result")
       logo: { src: "...", alt: "..." } (optional, shown in the case study) }
     Images for these projects live on https://synqwave-media.sites.tab.bot/projects/
     and https://synqwave-media2.sites.tab.bot/projects/ (each media site holds about 1.3 MB). */
  caseStudies: [
    { client: "Pretty Please", industry: "Logo system, stationery and merchandise", tag: "Brand identity",
      images: [
        { src: "assets/work/pretty-please-1.webp", w: 1400, h: 788, alt: "Pretty Please stationery and merchandise: tote bag, letterhead, business cards, tags, notebook and envelope" },
        { src: "assets/work/pretty-please-2.webp", w: 1400, h: 788, alt: "Pretty Please brand identity presentation: trendy, expressive, youthful, for Gen-Z" },
        { src: "assets/work/pretty-please-3.webp", w: 1400, h: 788, alt: "Pretty Please logo system: primary logo, secondary logo, logo mark and black and white version" },
        { src: "assets/work/pretty-please-4.webp", w: 1400, h: 788, alt: "Pretty Please logo on pink t-shirts" }
      ] },
    { client: "Liberty Perfume", industry: "Bottle and box, stationery, carry bags and posters", tag: "Packaging & print",
      images: [
        { src: "assets/work/liberty-perfume-1.webp", w: 1052, h: 600, alt: "Liberty Perfumes bottle and coral box" },
        { src: "assets/work/liberty-perfume-2.webp", w: 1052, h: 600, alt: "Liberty Perfumes stationery: business cards, letterheads and envelopes" },
        { src: "assets/work/liberty-perfume-3.webp", w: 1050, h: 600, alt: "Liberty Perfumes white and navy carry bags" },
        { src: "assets/work/liberty-perfume-4.webp", w: 1052, h: 600, alt: "Three Liberty Perfumes posters with dancers, framed on a wall" }
      ] },
    { client: "Adrak Lane Chai Co.", industry: "Café / Chai bar", tag: "Concept project",
      logo: { src: "https://synqwave-media.sites.tab.bot/projects/adrak-lane-logo.webp", alt: "Adrak Lane Chai Co. logo" },
      images: [
        { src: "https://synqwave-media.sites.tab.bot/projects/adrak-lane-storefront.webp", alt: "Adrak Lane Chai Co. shopfront at dusk with a cream hanging signboard showing the kulhad cup logo" },
        { src: "https://synqwave-media.sites.tab.bot/projects/adrak-lane-cups.webp", alt: "Adrak Lane takeaway chai cups with terracotta sleeves, clay kulhads and a menu card on a café counter" },
        { src: "https://synqwave-media.sites.tab.bot/projects/adrak-lane-social.webp", alt: "Phone showing the Adrak Lane Instagram grid in cream, terracotta and forest green" }
      ],
      problem: "A new neighbourhood chai bar needed a name-led identity that felt warm and local without looking like every other roadside tapri, and that would work across cups, signage and Instagram from day one.",
      whatWeDid: "Built the identity around the kulhad: a simple cup-and-steam mark, a friendly rounded serif wordmark and a terracotta, cream and forest-green palette. Applied it to takeaway cups and sleeves, a menu card, the shopfront signboard and a launch grid for Instagram.",
      outcome: "A complete identity system (logo, colour palette, type pairing), takeaway cup and sleeve design, a menu card, shopfront signage and a 9-post Instagram launch grid." },
    { client: "Saoji Pantry", industry: "Packaged food / Spice blends", tag: "Concept project",
      logo: { src: "https://synqwave-media.sites.tab.bot/projects/saoji-pantry-logo.webp", alt: "Saoji Pantry logo" },
      images: [
        { src: "https://synqwave-media.sites.tab.bot/projects/saoji-pantry-pouches.webp", alt: "Saoji Pantry kraft spice pouches for Saoji Masala, Kala Masala and Garam Masala on a slate counter" },
        { src: "https://synqwave-media.sites.tab.bot/projects/saoji-pantry-jars.webp", alt: "Saoji Pantry glass spice jars with round kraft labels on a wooden kitchen shelf" },
        { src: "https://synqwave-media.sites.tab.bot/projects/saoji-pantry-social.webp", alt: "Phone showing the Saoji Pantry Instagram grid in chilli red, charcoal and kraft brown" }
      ],
      problem: "A small-batch maker of Nagpur-style Saoji masalas wanted to move from plain plastic packets to retail-ready packaging that looks trustworthy on a shelf and online, while keeping a clear local character.",
      whatWeDid: "Designed a stamp-style badge logo with a dried red chilli, a tall condensed wordmark and a chilli-red, charcoal and kraft palette. Created a label system for stand-up pouches and glass jars that keeps the brand constant and colour-codes each blend.",
      outcome: "A badge logo and identity, a packaging label system for 3 SKUs (Saoji Masala, Kala Masala, Garam Masala) across pouches and jars, and a set of social post templates." },
    { client: "Narangi House", industry: "Sweet shop / Mithai", tag: "Concept project",
      logo: { src: "https://synqwave-media.sites.tab.bot/projects/narangi-house-logo.webp", alt: "Narangi House logo" },
      images: [
        { src: "https://synqwave-media.sites.tab.bot/projects/narangi-house-box.webp", alt: "Narangi House ivory and orange sweet box with gold-foil logo, opened to show orange burfi" },
        { src: "https://synqwave-media.sites.tab.bot/projects/narangi-house-bag.webp", alt: "Narangi House ivory paper carry bag with orange rope handles on a sweet-shop counter" },
        { src: "https://synqwave-media.sites.tab.bot/projects/narangi-house-stationery.webp", alt: "Narangi House business cards, menu card and orange sticker seal in a flat-lay" }
      ],
      problem: "A family sweet shop known for orange burfi wanted gift packaging and a look that felt premium enough for festivals and weddings, while still feeling like a Nagpur mithai shop.",
      whatWeDid: "Created an orange-slice sun emblem, a high-contrast serif wordmark and an ivory, orange and antique-gold palette. Designed a gift box with a gold-foil lid, a carry bag, business cards, a menu card and a round sticker seal.",
      outcome: "A complete identity system, festive gift box and carry bag designs, business cards, a menu card and a sticker seal for packing." },
    { client: "Kanghi Hair & Skin Studio", industry: "Salon / Beauty", tag: "Concept project",
      logo: { src: "https://synqwave-media2.sites.tab.bot/projects/kanghi-studio-logo.webp", alt: "Kanghi Hair & Skin Studio logo" },
      images: [
        { src: "https://synqwave-media2.sites.tab.bot/projects/kanghi-studio-reception.webp", alt: "Kanghi Hair & Skin Studio reception with the logo on a blush-pink wall above an oak desk" },
        { src: "https://synqwave-media2.sites.tab.bot/projects/kanghi-studio-cards.webp", alt: "Kanghi business cards, appointment card and serum bottle label on blush-pink linen" },
        { src: "https://synqwave-media2.sites.tab.bot/projects/kanghi-studio-social.webp", alt: "Phone showing the Kanghi Instagram grid in blush pink and deep plum" }
      ],
      problem: "A new hair and skin studio wanted a calm, premium identity that would stand apart from loud, discount-led salon branding in the area.",
      whatWeDid: "Designed a single-line comb mark with a refined lowercase serif wordmark, set in a blush-pink and deep-plum palette. Applied it to reception wall signage, business and appointment cards, a product label and an Instagram grid style.",
      outcome: "A logo and identity system, reception signage, business and appointment cards, a retail product label and a 9-post Instagram grid style." }
  ],

  /* Testimonials (real quotes only, with the client's permission). Empty = section hidden.
     Each entry: { quote: "Their words.", name: "Their name", business: "Their business" } */
  testimonials: [
    { quote: "Tile adhesive is a technical product, but SYNQWAVE made our brand look simple and trustworthy to customers. Work is always on time, and changes are handled without any fuss.", name: "Burhanuddin Ezzy", business: "Bondfast" },
    { quote: "In the perfume business, presentation is everything. SYNQWAVE gave our brand a premium feel, and Talmeez put real care into every design.", name: "Haris Ahmad", business: "Nagpur Sales" },
    { quote: "We needed clean, simple designs for our non-woven bags that print well. SYNQWAVE delivered exactly that, on time.", name: "Ubaidur Rehman Khan", business: "Rajasthan Trading" }
  ],

  /* Monthly package prices. Empty = "On request" + "Get a quote".
     Write the number only, e.g. "4,250". */
  packagePrices: { starter: "", growth: "", premium: "" }
};
