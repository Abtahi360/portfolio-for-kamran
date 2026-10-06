window.PORTFOLIO_DATA = {

  profile: {
    name:       "Kamran Tusher",
    initials:   "KT",                       
    navRole:    "News Presenter",                
    jobTitle:   "News Presenter & Broadcast Journalist", 

    
    resume: {
      file:         "assets/documents/resume.pdf",
      downloadName: "KamranTusher-Resume.pdf",       
    },
  },

  hero: {
    slug:            [
      "On Air",
      "Breaking News",
      "Live Coverage",
    ],   
    nameLines:       ["Kamran","Tusher"],        
    chyronSecondary: [
      "Television",
      "Digital Media",
      "Live Coverage",
    ],   
    statement:       "Every story deserves a voice that commands trust. With over a decade of live broadcasting, breaking news anchoring, and high-stakes interview moderation, I bring accuracy, composure, and editorial intelligence to every on-camera moment.",
  },

  ticker: [
    "National Election Coverage 2024",
    "UN General Assembly Live Desk",
    "Breaking News Anchor",
    "Prime Minister Press Conference",
    "ICC World Cup Live Studio",
    "COP28 International Coverage",
    "National Budget Special Broadcast",
    "Corporate Summit Host",
    "National Film Awards Live Coverage",
    "Field Reporting – Rohingya Crisis",
  ],

  /* ======================================================================
     ৩) About Me
     ====================================================================== */
  about: {
    role:  "Senior News Presenter",        
    since: "Broadcasting since 2013",

    stats: [                                      
      { number: "10+", label: "Years on Air" },
      { number: "500+", label: "Programs Hosted" },
      { number: "12", label: "Awards & Honours" },
      { number: "4", label: "National Networks" },
    ],

    lead: "I am a news presenter and broadcast journalist with over a decade of live television experience. My career has been built on the belief that responsible journalism, delivered with clarity and composure, is one of the most powerful forces in public life.",

    paragraphs: [
      "From anchoring breaking national news to moderating high-stakes political interviews and coordinating live coverage of international events, I have cultivated a reputation for calm authority under pressure. My editorial instincts are sharp, my delivery is precise, and my commitment to accuracy is unwavering.",
      "My on-camera presence is defined by strong voice modulation, natural teleprompter fluency, and the ability to adapt in real time when stories evolve live. Whether covering a breaking event in the field, anchoring from the studio, or moderating a panel discussion, I bring the same level of preparation, professionalism, and audience awareness to every broadcast.",
    ],

    quote: "Journalism is not just about reporting events. It is about shaping how a nation understands itself at its most defining moments.",   // কোটেশন চিহ্ন " " নিজে নিজে বসবে

    points: [
      "Live breaking news anchoring and crisis coverage",
      "High-profile political and social interview moderation",
      "Bilingual presentation in English and Bengali",
      "Special event anchoring and live ceremony hosting",
    ],
  },

  programCategories: [
    { id: "national", label: "National" },
    { id: "international", label: "International" },
    { id: "sports", label: "Sports" },
    { id: "entertainment", label: "Entertainment" },
    { id: "others", label: "Others", panelLabel: "Other programs" },
  ],

  /* ----------------------------------------------------------------------
     নতুন ভিডিও যোগ করার টেমপ্লেট (নিচের লাইনটা কপি করে ঠিক জায়গায় পেস্ট করুন):

     {
       category: "national",     // national | international | sports | entertainment | others
       link:     "https://www.youtube.com/watch?v=XXXXXXXXXXX",   // ইউটিউব বা ফেসবুক ভিডিও লিংক
       title:    "ভিডিওর শিরোনাম",
       desc:     "ভিডিওর সংক্ষিপ্ত বিবরণ",
       date:     "Oct 6, 2026",  // যেভাবে লিখবেন, পেজে ঠিক সেভাবেই দেখাবে
     },
     ---------------------------------------------------------------------- */
  programs: [

    // ───────── NATIONAL ─────────
    {
      category: "national",
      link:     "https://www.youtube.com/embed/TLI_AyObZB0",
      title:    "Pakistan Denies Airspace: Rooppur Uranium Shipment Delayed",
      desc:     "This video reports on Pakistan denying airspace access to a cargo plane carrying uranium for Bangladesh’s Rooppur Nuclear Power Plant, delaying the critical shipment's arrival until October.",
      date:     "Sep 28, 2026",
    },
    {
      category: "national",
      link:     "https://www.youtube.com/embed/R9mw92a-cSk",
      title:    "Cumilla Police Detain 624 Suspects in Massive Teen Gang Crackdown",
      desc:     "This video reports on an overnight drive across 18 police stations in Cumilla, detaining 624 suspect teen gang members to curb mugging, eve-teasing, and rising youth crime.",
      date:     "Sep 24, 2026",
    },
    {
      category: "national",
      link:     "https://www.youtube.com/embed/hoX7ztz6CKs",
      title:    "Bus Fare Hike in Bangladesh: Cost Rises 571 Taka Per 100 KM",
      desc:     "This video highlights the impact of rising fuel prices in Bangladesh, detailing how bus fares increased by 571 Taka per 100 kilometers, creating financial pressure on commuters.",
      date:     "Sep 21, 2026",
    },
    {
      category: "national",
      link:     "https://www.youtube.com/embed/g2vZFbR_YAg",
      title:    "Dhaka Metrorail: Costs Reduced for MRT Lines 1 and 5",
      desc:     "This video details the cost reduction for Dhaka’s MRT Line 1 and Line 5 projects, highlighting updated budget estimates, extended completion timelines, and their impact on urban traffic.",
      date:     "Sep 15, 2026",
    },
    {
      category: "national",
      link:     "https://www.youtube.com/embed/Gd5u2h7AxTQ",
      title:    "25-KG Case Dossier Submitted Against Obaidul Quader and AL Leaders",
      desc:     "This video reports on a 25-kilogram case file submitted to the tribunal involving former Awami League general secretary Obaidul Quader and seven top leaders regarding July violence.",
      date:     "Sep 15, 2026",
    },
    {
      category: "national",
      link:     "https://www.youtube.com/embed/g2vZFbR_YAg",
      title:    "Dhaka Metrorail: Costs Reduced for MRT Lines 1 and 5",
      desc:     "This video details the cost reduction for Dhaka’s MRT Line 1 and Line 5 metrorail projects, highlighting route updates, extended completion timelines, and their impact on urban traffic.",
      date:     "Sep 15, 2026",
    },
    {
      category: "national",
      link:     "https://www.youtube.com/embed/AFG0qqomgfY",
      title:    "Alarming Surge in Dhaka Mugging and City Security Crisis",
      desc:     "This video exposes alarming mugging incidents in Dhaka during August, detailing violent robberies and tragic deaths while questioning city security and the emboldened tactics of armed criminals.",
      date:     "Sep 6, 2026",
    },
    {
      category: "national",
      link:     "https://www.youtube.com/embed/i6Z5_yl915Y",
      title:    "Rare Box Crab Caught in the Bay of Bengal",
      desc:     "This video documents a rare Box Crab caught in the Bay of Bengal, highlighting its unique physical features, natural habitat, and the scientific importance of recording biodiversity.",
      date:     "13th August, 2026",
    },
    {
      category: "national",
      link:     "https://www.youtube.com/embed/mBKeYGwuN6A",
      title:    "Bangladesh’s Gas Crisis: Power Plants Receive Only 29% Supply",
      desc:     "This video explores Bangladesh's gas crisis, where power plants receive only 29% of required supply. It highlights the resulting massive load shedding, fertilizer shortages, and public dissatisfaction.",
      date:     "13th August, 2026",
    },
    {
      category: "national",
      link:     "https://www.youtube.com/embed/_8Eym0mSClU",
      title:    "Waste to Energy: Bangladesh’s Path to Sustainable Power",
      desc:     "The video highlights Bangladesh's project to convert 3,000 tons of daily waste into 42.5 MW of electricity by 2028, fostering sustainable power and a cleaner environment in Dhaka.",
      date:     "15th July, 2026",
    },
    {
      category: "national",
      link:     "https://www.youtube.com/embed/ib5F7X58KCY",
      title:    "Bangladesh Bank Simplifies Freelancer Payments",
      desc:     "This video highlights Bangladesh Bank’s new regulations simplifying foreign earnings for freelancers through digital proof, dual-currency cards, and higher retention limits to bolster the nation's digital economy.",
      date:     "23th July, 2026",
    },
    {
      category: "national",
      link:     "https://www.youtube.com/embed/eiow0Jq7_eE",
      title:    "Toxic Microplastics Found in 76% of Bangladeshi Toothpastes",
      desc:     "This video details an ESDO study finding microplastics in 76.5% of Bangladeshi toothpastes, highlighting the urgent need for national safety standards and clear labeling to protect public health.",
      date:     "23th July, 2026",
    },

    // ───────── INTERNATIONAL ─────────
    {
      category: "international",
      link:     "https://www.youtube.com/embed/Vr4d58w80xY",
      title:    "India Blocks Pakistan’s Entry into BRICS",
      desc:     "This video highlights Pakistan’s struggle to join BRICS despite support from China and Russia, detailing how India’s opposition blocks its entry amid Islamabad’s economic crisis.",
      date:     "Sep 12, 2026",
    },
    {
      category: "international",
      link:     "https://www.youtube.com/embed/PwIX5Zk4KMo",
      title:    "Surge in Bangladeshi Asylum Applications to Europe",
      desc:     "This video highlights the 13% rise in Bangladeshi asylum applications to Europe despite strict EU migration policies, low approval rates below 5%, and high rejection risks.",
      date:     "Sep 10, 2026",
    },
    {
      category: "international",
      link:     "https://www.youtube.com/embed/RyeKGwQAic4",
      title:    "Facebook’s New AI-Powered App: Revolutionizing Content Creation",
      desc:     "This video explores Facebook’s new AI-driven Creator Studio app, detailing how its smart assistant helps creators analyze performance, manage comments, and optimize strategies to compete with other major platforms.",
      date:     "Aug 14, 2026",
    },
    {
      category: "international",
      link:     "https://www.youtube.com/embed/oZiSq9od0yk",
      title:    "US-Iran War: Record Military Spending Sparks Senate Backlash",
      desc:     "This video examines the $37.5 billion US cost in the Iran war, detailing record budget requests and the Senate's debate over prioritizing military spending amidst domestic economic struggles.",
      date:     "23th July, 2026",
    },
    {
      category: "international",
      link:     "https://www.youtube.com/embed/6ts4QlVbwZ4",
      title:    "UAE Visa Reform: Major Changes to Six Visa Categories",
      desc:     "This video highlights significant updates to the UAE’s six visa types, detailing new regulations for various nationalities and the implementation of smart services for more efficient travel.",
      date:     "23th July, 2026",
    },
    {
      category: "international",
      link:     "https://www.youtube.com/embed/XTqT95M9kBU",
      title:    "Iran Warns UK and France Over Strait of Hormuz",
      desc:     "This video highlights Iran’s warning to the UK and France against military intervention in the Strait of Hormuz, asserting that regional coastal nations alone are responsible for waterway security.",
      date:     "04th July, 2026",
    },
    {
      category: "international",
      link:     "https://www.youtube.com/embed/E0e52EgFmcI",
      title:    "AI Smart Glasses: A New Era of Exam Cheating",
      desc:     "This video explores how AI smart glasses enable exam cheating globally, detailing incidents in South Korea and Taiwan while highlighting the technological challenges this poses for future education systems.",
      date:     "28th June, 2026",
    },
    {
      category: "international",
      link:     "https://www.youtube.com/embed/fJEWzj0UK7M",
      title:    "Plane Crashes Into China’s Tallest Building in Beijing",
      desc:     "This video documents a small plane crashing into Beijing’s 528-meter high CITIC Tower, causing widespread panic and emergency evacuations as authorities investigate the cause of the mysterious accident.",
      date:     "27th June, 2026",
    },
    {
      category: "international",
      link:     "https://www.youtube.com/embed/P0i65XFI8Ok",
      title:    "Happy Birthday Messi: Celebrating the 39th Year of a Legend",
      desc:     "This video celebrates Lionel Messi’s 39th birthday, highlighting his journey from Rosario to World Cup glory and his enduring legacy as a generational inspiration and football magician.",
      date:     "27th June, 2026",
    },
    {
      category: "international",
      platform: "facebook",   // ফেসবুক ভিডিওর জন্য; link ফাঁকা থাকলে প্লেসহোল্ডার দেখায়
      link:     "",
      title:    "Rohingya Crisis: Field Report from Cox's Bazar",
      desc:     "On-ground field coverage of the Rohingya humanitarian situation at Cox's Bazar refugee camps, with UNHCR coordination.",
      date:     "November 2022",
    },

    // ───────── SPORTS ─────────
    {
      category: "sports",
      link:     "https://www.youtube.com/embed/vemEP4LspJ4",
      title:    "Lionel Messi Recalled to Argentina Squad for Farewell Match",
      desc:     "This video highlights Argentina recalling Lionel Messi to the national squad for an official farewell friendly match against Benin, honoring his legendary international career alongside his World Cup-winning teammates.",
      date:     "Sep 16, 2026",
    },
    {
      category: "sports",
      link:     "https://www.youtube.com/embed/vemEP4LspJ4",
      title:    "Lionel Messi Recalled to Argentina Squad for Official Farewell Match",
      desc:     "This video highlights Argentina recalling Lionel Messi to the national squad for an official farewell friendly match against Benin, honoring his legendary international career alongside his World Cup-winning teammates.",
      date:     "Sep 16, 2026",
    },
    {
      category: "sports",
      link:     "https://www.youtube.com/embed/R1k7tXrpmTg",
      title:    "Messi Returns to the Field for Inter Miami",
      desc:     "This video highlights Lionel Messi's return to action for Inter Miami after a break, detailing his performance and key match moments against Atlanta United.",
      date:     "Sep 6, 2026",
    },
    {
      category: "sports",
      link:     "https://www.youtube.com/embed/VYaVR8iykyQ",
      title:    "Nick Kyrgios Banned in Cocaine Scandal",
      desc:     "This video details the temporary ban of Australian tennis star Nick Kyrgios due to cocaine use, highlighting his apology and 28-day break from public life.",
      date:     "Aug 19, 2026",
    },
    {
      category: "sports",
      link:     "https://www.youtube.com/embed/wZOnCi9uWJE",
      title:    "Darwin Disaster: Bangladesh’s Historic Test Win Over Australia",
      desc:     "This video details Bangladesh's historic nine-wicket Test victory over Australia in Darwin, showcasing global media reactions and the brilliant team performance securing their first win on Australian soil.",
      date:     "Aug 17, 2026",
    },
    {
      category: "sports",
      link:     "https://www.youtube.com/embed/ZlCiB-WlNSk",
      title:    "Tanzid Hasan Tamim: Bangladesh's Historic Century Hero in Australia",
      desc:     "This video celebrates Tanzid Hasan Tamim’s historic maiden Test century on Australian soil, highlighting rich praise from prominent coaches and his rapid adaptation to red-ball cricket.",
      date:     "Aug 15, 2026",
    },
    {
      category: "sports",
      link:     "https://www.youtube.com/embed/I9PCU7P2yog",
      title:    "Mustafiz’s Former Teammate Named Portugal Cricket Captain",
      desc:     "This video highlights Mustafizur Rahman's former teammate becoming the captain of Portugal's cricket team, showcasing the global journey of cricketers and the expansion of the sport into new regions.",
      date:     "Aug 13, 2026",
    },
    {
      category: "sports",
      link:     "https://www.youtube.com/embed/kXdQp46GMVQ",
      title:    "2026 World Cup: FIFA Achieves Record $15.2 Billion Revenue",
      desc:     "This video explores FIFA’s record-breaking $15.2 billion revenue from the 2026 World Cup, highlighting how expanded matches and commercial success doubled earnings to fund global football development.",
      date:     "23rd July, 2026",
    },
    {
      category: "sports",
      link:     "https://www.youtube.com/embed/RBX6Scohg2E",
      title:    "2026 FIFA World Cup: Record-Breaking Prize Money Breakdown",
      desc:     "This video details the unprecedented $871 million prize money for the 2026 World Cup, highlighting the $50 million champion's reward and how funds are distributed among all 48 participating nations.",
      date:     "20th July, 2026",
    },
    {
      category: "sports",
      link:     "https://www.youtube.com/embed/cE5gVhJt8Pg",
      title:    "VAR Statistics: Top Beneficiaries in the World Cup",
      desc:     "This video analyzes VAR statistics from the World Cup, ranking Mexico and Argentina as top beneficiaries, while addressing the global debate over refereeing decisions and alleged favoritism toward Argentina.",
      date:     "14th July, 2026",
    },
    {
      category: "sports",
      link:     "https://www.youtube.com/embed/vS4WKOJXGeY",
      title:    "Argentina vs. England: Football Meets History and Emotion",
      desc:     "This video examines the intense Argentina-England rivalry, exploring how the Falklands War legacy and Maradona's historic goals turn their football matches into emotional, high-stakes battles for national pride.",
      date:     "14th July, 2026",
    },
    {
      category: "sports",
      link:     "https://www.youtube.com/embed/z8ZH1e7RFg4",
      title:    "US-Iran War: Record Military Spending Sparks Senate Backlash",
      desc:     "This video examines the $37.5 billion US cost in the Iran war, detailing record budget requests and the Senate's debate over prioritizing military spending amidst domestic economic struggles.",
      date:     "09th July, 2026",
    },
    {
      category: "sports",
      link:     "https://www.youtube.com/embed/NxrCHJApX4A",
      title:    "Belgium vs. USA: Belgium Secures Quarterfinal Spot in 2026 World Cup",
      desc:     "This video highlights Belgium’s victory over the USA in the 2026 World Cup, documenting the match moments and Belgium’s advancement to the quarterfinals despite the surrounding controversies.",
      date:     "07th July, 2026",
    },
    {
      category: "sports",
      link:     "https://www.youtube.com/embed/ZGh4mOFwffs",
      title:    "Norway Coach Slams FIFA Over Overturned Red Card",
      desc:     "This video highlights Norway coach Solbakken’s criticism of FIFA for overturning Folarin Balogun’s red card, calling it a poor decision that sets a bad precedent for the 2026 World Cup.",
      date:     "06th July, 2026",
    },

    // ───────── ENTERTAINMENT ─────────
    {
      category: "entertainment",
      link:     "https://www.youtube.com/embed/HbMnEW0fd94",
      title:    "Mukh O Mukhosh: The Birth of Dhallywood",
      desc:     "This video explores the history of Mukh O Mukhosh, Bangladesh’s first full-length sound film, highlighting Abdul Jabbar Khan’s determination to establish the Dhallywood film industry seventy years ago.",
      date:     "August 2026",
    },

    // ───────── OTHERS ─────────
    // (এই ক্যাটাগরিতে এখন কোনো ভিডিও নেই)
  ],

  /* ======================================================================
     ৫) Work Experience  (নতুন চাকরি যোগ করলে একটি { ... }, ব্লক কপি করুন; সবচেয়ে নতুনটা উপরে)
     ====================================================================== */
  experience: [
    {
      role:   "News Presenter",
      org:    "Dhaka Post",
      period: "2026 – Present",
      desc:   "Lead news presenter for primetime bulletins, responsible for anchoring live national and international coverage. Regularly moderates special-event broadcasts including state functions, elections, and breaking crisis situations.",
      responsibilities: [
        "Anchoring daily primetime news bulletins — national, international and sports",
        "Live coverage of national elections, state events, and crisis breaking news",
        "Interviewing political leaders, influencers, economists, and policy experts",
        "Coordinating with editorial team on real-time script revision during live events",
        "Moderating the weekly flagship current affairs debate programme",
      ],
      tags: [
        "Recorded News",
        "Breaking News",
        "Debate Moderation",
        "Primetime",
      ],
    },
  ],

  /* ======================================================================
     ৬) Skills & Expertise
     icon: target | pen | chat | speaker | pulse | monitor  (আইকনের ধরন)
     ====================================================================== */
  skills: [
    {
      icon:  "target",
      title: "On-Camera Presentation",
      tags:  [
        "Live News Anchoring",
        "Teleprompter Proficiency",
        "Studio Composure",
        "Camera Presence",
        "Audience Engagement",
        "Facial Expression Control",
      ],
    },
    {
      icon:  "pen",
      title: "Newsroom & Editorial",
      tags:  [
        "Editorial Judgment",
        "Script Reading & Adaptation",
        "News Verification",
        "Rundown Management",
        "Bulletin Production",
        "Media Ethics",
      ],
    },
    {
      icon:  "chat",
      title: "Interview & Moderation",
      tags:  [
        "Political Interviews",
        "Panel Moderation",
        "Debate Facilitation",
        "Guest Management",
        "Tough Question Handling",
        "Active Listening",
      ],
    },
    {
      icon:  "speaker",
      title: "Voice & Delivery",
      tags:  [
        "Voice Modulation",
        "Diction & Pronunciation",
        "Pace Control",
        "Bilingual (EN / BN)",
        "Tonal Authority",
        "Emotional Register",
      ],
    },
    {
      icon:  "pulse",
      title: "Live Broadcast Handling",
      tags:  [
        "Breaking News Coverage",
        "Real-Time Script Changes",
        "IFB & Floor Communication",
        "Crisis Composure",
        "Ad-Lib Confidence",
        "Multi-Feed Coordination",
      ],
    },
    {
      icon:  "monitor",
      title: "Digital Media Adaptability",
      tags:  [
        "Social Media Newsroom",
        "Digital-First Content",
        "YouTube & Facebook Live",
        "Live Streaming Platforms",
        "Audience Analytics Awareness",
      ],
    },
  ],

  /* ======================================================================
     ৭) Achievements & Awards
     image: ছবির ফাইলের নাম। ছবিটা assets/images/achievements/ ফোল্ডারে রাখুন।
     ====================================================================== */
  achievements: [
    {
      year:     "2024",
      category: "National Media Award",
      title:    "Best Emerging News Presenter",
      org:      "Bangladesh Journalists Association",
      desc:     "Recognised for outstanding contribution to national broadcast journalism and on-screen excellence during primetime coverage.",
      image:    "achievement-award-01.jpg",
      imageAlt: "Best Emerging News Presenter Award",
    },
    {
      year:     "2023",
      category: "Industry Recognition",
      title:    "Excellence in Live Broadcast",
      org:      "Television Broadcasters Forum",
      desc:     "Awarded for exceptional performance during the live national election coverage broadcast, commended for composure and editorial clarity.",
      image:    "achievement-award-02.jpg",
      imageAlt: "Excellence in Live Broadcast Award",
    },
    {
      year:     "2022",
      category: "Special Recognition",
      title:    "Special Coverage Appreciation",
      org:      "Ministry of Information",
      desc:     "Special recognition for responsible and accurate field coverage during the 2022 national crisis situation, delivered under extreme pressure.",
      image:    "achievement-award-03.jpg",
      imageAlt: "Special Coverage Appreciation Award",
    },
    {
      year:     "2021",
      category: "Professional Certificate",
      title:    "Media Communication Excellence",
      org:      "Commonwealth Broadcasting Association",
      desc:     "Awarded the Media Communication Excellence Certificate for demonstrated leadership in public communication and broadcast journalism.",
      image:    "achievement-award-04.jpg",
      imageAlt: "Media Communication Excellence Certificate",
    },
    {
      year:     "2020",
      category: "Programme Excellence",
      title:    "Outstanding Programme Host",
      org:      "National Broadcasters Council",
      desc:     "Recognised as Outstanding Programme Host for the flagship weekly current affairs interview programme, commended for depth and guest engagement.",
      image:    "achievement-award-01.jpg",
      imageAlt: "Outstanding Programme Host Recognition",
    },
    {
      year:     "2019",
      category: "Public Service Honour",
      title:    "Public Communication Leadership",
      org:      "Press Institute of Bangladesh",
      desc:     "Honoured by the Press Institute for demonstrated leadership in public communication and for promoting responsible broadcast journalism practices.",
      image:    "achievement-award-02.jpg",
      imageAlt: "Public Communication Leadership Honor",
    },
  ],

  /* ======================================================================
     ৮) Training & Certification
     image: সার্টিফিকেটের ছবির ফাইলের নাম। ছবিটা assets/images/certificates/ ফোল্ডারে রাখুন।
     ====================================================================== */
  training: [
    {
      date:        "2023",
      title:       "Advanced Broadcast Journalism Training",
      institution: "Reuters Institute for the Study of Journalism, University of Oxford",
      desc:        "Intensive programme covering digital newsroom leadership, editorial standards in live broadcasting, and audience-first journalism methodology.",
      points:      [
        "Digital-first editorial decision-making in live environments",
        "Live broadcast crisis management and communication protocols",
        "Audience engagement and public trust strategies",
      ],
      image:       "certificate-01.jpg",
      imageAlt:    "Broadcast Journalism Training Certificate",
    },
    {
      date:        "2022",
      title:       "News Presentation & Voice Delivery Workshop",
      institution: "BBC Media Action, London",
      desc:        "Professional workshop focused on voice technique, delivery rhythm, and on-camera presentation skills specifically for broadcast journalism professionals.",
      points:      [
        "Voice projection, modulation, and control techniques",
        "Teleprompter speed, fluency, and eye contact training",
        "On-camera authority and body language coaching",
      ],
      image:       "certificate-02.jpg",
      imageAlt:    "Voice Delivery Workshop Certificate",
    },
    {
      date:        "2021",
      title:       "Media Ethics & Editorial Standards",
      institution: "Press Institute of Bangladesh (PIB)",
      desc:        "Comprehensive training on responsible journalism ethics, editorial independence, fact-checking standards, and legal frameworks in broadcast media.",
      points:      [
        "Broadcast-specific legal and ethical frameworks",
        "Fact-checking and source verification methodologies",
        "Editorial independence and newsroom judgment",
      ],
      image:       "certificate-03.jpg",
      imageAlt:    "Media Ethics Training Certificate",
    },
    {
      date:        "2020",
      title:       "Live Reporting & Crisis Communication",
      institution: "DW Akademie, Germany",
      desc:        "Intensive crisis communication and live reporting workshop by Deutsche Welle journalists covering conflict, disaster, and emergency news environments.",
      points:      [
        "Crisis scenario simulation and live anchoring exercises",
        "Field safety and on-location communication protocols",
        "Sensitivity and accuracy standards in crisis reporting",
      ],
      image:       "certificate-04.jpg",
      imageAlt:    "Crisis Communication Workshop Certificate",
    },
    {
      date:        "2019",
      title:       "Interview Techniques & Public Communication",
      institution: "CILT International, United Kingdom",
      desc:        "Professional certification in advanced interview structuring, public communication strategy, and broadcast engagement techniques for senior journalists.",
      points:      [
        "Power interview structuring and follow-up techniques",
        "Managing difficult or evasive interview subjects",
        "Public communication psychology and persuasion",
      ],
      image:       "certificate-01.jpg",
      imageAlt:    "Interview Techniques Certificate",
    },
    {
      date:        "2018",
      title:       "Digital Journalism & Social Media Newsroom",
      institution: "WAN-IFRA, World Association of News Publishers",
      desc:        "Training on integrating digital and social media practices into broadcast newsroom workflows, covering platform-native storytelling and audience engagement.",
      points:      [
        "Social media live journalism best practices",
        "Platform-specific audience behaviour and content strategy",
        "Digital verification and misinformation prevention",
      ],
      image:       "certificate-02.jpg",
      imageAlt:    "Digital Journalism Certificate",
    },
  ],

  /* ======================================================================
     ৯) Media Gallery
     ======================================================================
     ফিল্টার বাটনের তালিকা: filter = বাটনের লেখা, tag = ছবির উপর ছোট লেখা।
  */
  galleryCategories: [
    { id: "studio", filter: "Studio", tag: "Studio" },
    { id: "field", filter: "Field Coverage", tag: "Field" },
    { id: "interview", filter: "Interviews", tag: "Interview" },
    { id: "event", filter: "Events", tag: "Event" },
    { id: "video", filter: "Videos", tag: "Video" },
  ],

  /* image: ছবির ফাইলের নাম (assets/images/gallery/ ফোল্ডারে রাখুন)।
     ভিডিও আইটেমে link দিলে ছবিতে ক্লিক করলে ভিডিও পপআপে চলবে (image তখন থাম্বনেইল)। */
  gallery: [
    { category: "studio", image: "gallery-01.jpg", alt: "Studio broadcast anchoring" },
    { category: "studio", image: "gallery-02.jpg", alt: "News desk anchoring" },
    { category: "field", image: "gallery-03.jpg", alt: "Field reporting coverage" },
    { category: "interview", image: "gallery-04.jpg", alt: "Interview session with senior official", ariaLabel: "View interview session photo" },
    { category: "event", image: "gallery-05.jpg", alt: "Event anchoring ceremony", ariaLabel: "View event anchoring photo" },
    { category: "field", image: "gallery-06.jpg", alt: "Behind the scenes field coverage" },
    { category: "interview", image: "gallery-07.jpg", alt: "Panel discussion hosting" },
    { category: "video", image: "gallery-08.jpg", alt: "Video reel thumbnail", link: "https://www.youtube.com/embed/ysz5S6PUM-U", ariaLabel: "Play video reel" },
  ],

  /* ======================================================================
     ১০) Contact  (social-এর লিংক ফাঁকা "" রাখলে ওই বাটন পেজ থেকে লুকিয়ে যাবে;
                    "#" রাখলে বাটন দেখাবে কিন্তু কোথাও যাবে না)
     ====================================================================== */
  contact: {
    email:    "kamranhossainchowdhury@gmail.com",
    phone:    "+880 1738 824 389",
    location: "Kuratoli, Kuril, Dhaka",
    social: {
      linkedin: "https://www.linkedin.com/in/kamran-h-chowdhury/",
      facebook: "https://www.facebook.com/profile.php?id=61581502266054",
      youtube:  "#",
      x:        "#",
    },
  },

  /* ======================================================================
     ১১) Footer
     ====================================================================== */
  footer: {
    tagline: "Delivering truth with clarity and composure.",
  },
};
