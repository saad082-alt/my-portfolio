/**
 * ==============================================================================
 * SAAD'S PORTFOLIO DATA CONFIGURATION
 * ==============================================================================
 * All personal details, links, project information, and experience are centralized here.
 * You can edit any field below and the website will immediately reflect the changes!
 */

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  longDescription: string;
  technologies: string[];
  metrics: { label: string; value: string }[];
  features: string[];
  githubUrl: string;
  liveUrl?: string;
  demoType: 'risk-classifier' | 'expense-tracker' | 'canteen-token';
  badge: string;
  gradient: string;
}

export interface SkillItem {
  name: string;
  category: 'Core' | 'Database' | 'Frontend' | 'Scripting';
  level: string; // e.g. "Proficient", "Intermediate", "Solid Foundation", etc. - NO FAKE PERCENTAGES!
  description: string;
  iconName: string;
  color: string;
  borderGlow: string;
  highlights: string[];
}

export interface InternshipExperience {
  company: string;
  role: string;
  duration: string;
  location: string;
  type: string;
  status: 'Completed' | 'Current';
  description: string;
  responsibilities: string[];
  technologies: string[];
  keyAchievement: string;
  isEditableNote?: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  field: string;
  duration: string;
  status: string;
  location: string;
  description: string;
  highlights: string[];
  badge: string;
}

export const portfolioData = {
  // --------------------------------------------------------------------------
  // 1. PERSONAL INFORMATION
  // --------------------------------------------------------------------------
  personal: {
    name: "Ghanchi Saad",
    fullName: "Ghanchi Saad",
    tagline: "Building Today, Exploring Tomorrow.",
    roles: [
      "Python Developer",
      "Future AI Engineer",
      "Full Stack Developer",
      "Technology Enthusiast"
    ],
    bioShort:
      "Computer Science Engineering student at JG University driven by technical curiosity, algorithmic problem-solving, and a deep passion for future technologies.",
    bioLong:
      "I am currently pursuing my B.Tech in Computer Science Engineering at JG University, Ahmedabad, after building a rigorous technical foundation during my Diploma at LJ Polytechnic. I focus on creating scalable software architectures with Python, developing modern full-stack applications, and engineering intelligent software solutions that bridge today's code with tomorrow's possibilities.",
    status: "Available for Internships & High-Impact Opportunities",
    location: "Ahmedabad, Gujarat, India",
    email: "ghanchisaad082@gmail.com",
    phone: "+91 88663 65762",
    phoneRaw: "8866365762",
    github: "https://github.com/saad082-alt",
    linkedin: "https://www.linkedin.com/in/saad-ghanchi-0715773ba",
    twitter: "https://x.com/saad_dev", // EDITABLE: replace with your X/Twitter or remove
    portfolioUrl: "https://saad-portfolio.dev",
    personalityTraits: [
      { label: "Curious Learner", icon: "Sparkles", desc: "Always researching bleeding-edge frameworks & AI paradigms" },
      { label: "Tech Explorer", icon: "Compass", desc: "Passionate about experimenting with new tools and stacks" },
      { label: "Problem Solver", icon: "Cpu", desc: "Transforms analytical logic into clean, robust code" },
      { label: "Gamer & Friend", icon: "Gamepad2", desc: "Thrives in collaborative teamwork, strategic thinking & gaming" },
      { label: "Innovative Builder", icon: "Layers", desc: "Driven to ship projects that solve genuine day-to-day pain points" }
    ],
    stats: [
      { label: "Current B.Tech", value: "JG University" },
      { label: "Diploma Foundation", value: "LJ Polytechnic" },
      { label: "Industry Exp", value: "Brainybeam Info-Tech" },
      { label: "Core Projects", value: "3+ Deployed" }
    ]
  },

  // --------------------------------------------------------------------------
  // 2. TECH STACK (NO FAKE PERCENTAGES - REAL FOCUS & CAPABILITIES)
  // --------------------------------------------------------------------------
  skills: [
    {
      name: "Python",
      category: "Core",
      level: "Core Strength",
      description: "Object-oriented programming, algorithmic scripting, automation, backend logic, and data analysis pipelines.",
      iconName: "Terminal",
      color: "#00f0ff",
      borderGlow: "rgba(0, 240, 255, 0.4)",
      highlights: ["OOP Principles", "Data Structures", "Automation Scripts", "Backend Logic", "Scripting"]
    },
    {
      name: "SQL",
      category: "Database",
      level: "Proficient",
      description: "Relational database schema modeling, complex joins, data indexing, aggregation queries, and integrity constraints.",
      iconName: "Database",
      color: "#a855f7",
      borderGlow: "rgba(168, 85, 247, 0.4)",
      highlights: ["Relational Schema Design", "Complex Queries & Joins", "Data Integrity", "Normalization", "CRUD Operations"]
    },
    {
      name: "HTML5",
      category: "Frontend",
      level: "Solid Foundation",
      description: "Semantic markup, accessible web standards, SEO-friendly hierarchy, and modern web application scaffolding.",
      iconName: "Code2",
      color: "#f97316",
      borderGlow: "rgba(249, 115, 22, 0.4)",
      highlights: ["Semantic Elements", "Web Accessibility (a11y)", "DOM Hierarchy", "Modern HTML5 APIs"]
    },
    {
      name: "CSS3",
      category: "Frontend",
      level: "Advanced Styling",
      description: "Responsive layouts, Flexbox, CSS Grid, Tailwind styling, glassmorphic UI, and smooth keyframe animations.",
      iconName: "Palette",
      color: "#38bdf8",
      borderGlow: "rgba(56, 189, 248, 0.4)",
      highlights: ["Tailwind CSS", "Flexbox & Grid Systems", "Glassmorphism & Gradients", "Responsive Architecture"]
    },
    {
      name: "JavaScript",
      category: "Scripting",
      level: "Active Growth",
      description: "ES6+ fundamentals, DOM manipulation, asynchronous promises, event-driven programming, and dynamic web experiences.",
      iconName: "FileCode",
      color: "#facc15",
      borderGlow: "rgba(250, 204, 21, 0.4)",
      highlights: ["ES6+ Syntax", "DOM & Event Handling", "Async / Await / Fetch", "Component Logic"]
    }
  ] as SkillItem[],

  // --------------------------------------------------------------------------
  // 3. CURRENTLY LEARNING (EXPANDING HORIZONS)
  // --------------------------------------------------------------------------
  currentlyLearning: [
    {
      title: "Advanced Python",
      focus: "Concurrency, asynchronous programming (asyncio), architectural patterns, metaprogramming, and performance optimization.",
      tag: "Advanced Systems",
      icon: "Cpu"
    },
    {
      title: "Modern JavaScript",
      focus: "Deep dive into reactive frontends, state management, modern toolchains, and TypeScript integration.",
      tag: "Web Ecosystem",
      icon: "Boxes"
    },
    {
      title: "Full Stack Development",
      focus: "End-to-end web architectures, RESTful API development, database connection pooling, and deployment pipelines.",
      tag: "Full Stack",
      icon: "Server"
    },
    {
      title: "AI and Machine Learning",
      focus: "Predictive modeling, neural networks, feature engineering, classification algorithms, and PyTorch / Scikit-learn workflows.",
      tag: "Artificial Intelligence",
      icon: "BrainCircuit"
    }
  ],

  // --------------------------------------------------------------------------
  // 4. CAREER INTERESTS
  // --------------------------------------------------------------------------
  careerInterests: [
    {
      id: "ai-engineering",
      title: "AI ENGINEERING",
      subtitle: "Intelligent Systems & Neural Architectures",
      description: "Explore artificial intelligence, machine learning and intelligent applications.",
      detailedVision:
        "Passionate about leveraging mathematical models, statistical learning, and neural network pipelines to solve real-world complexities. Aiming to build intelligent systems that autonomously learn, adapt, and drive predictive decision-making.",
      icon: "BrainCircuit",
      accentColor: "#a855f7",
      glowColor: "rgba(168, 85, 247, 0.5)",
      tags: ["Artificial Intelligence", "Machine Learning", "Neural Networks", "Data Modeling", "Predictive Systems"],
      badge: "FUTURE SPECIALIZATION"
    },
    {
      id: "python-development",
      title: "PYTHON DEVELOPMENT",
      subtitle: "Backend Engines & Scalable Automation",
      description: "Build automation tools, backend applications and Python-based solutions.",
      detailedVision:
        "Dedicated to writing clean, idiomatic Python that powers robust backend services, automated workflows, and high-throughput data processing engines. Focused on reliability, algorithm efficiency, and modular code architecture.",
      icon: "Binary",
      accentColor: "#00f0ff",
      glowColor: "rgba(0, 240, 255, 0.5)",
      tags: ["Automation Tools", "Backend Services", "API Architecture", "Scripting", "Data Wrangling"],
      badge: "CORE FOUNDATION"
    },
    {
      id: "full-stack-dev",
      title: "FULL STACK DEVELOPMENT",
      subtitle: "End-to-End Modern Web Engineering",
      description: "Create modern frontend and backend applications.",
      detailedVision:
        "Building seamless digital experiences from intuitive, fluid user interfaces down to secure database transactions and resilient server logic. Bridging design aesthetics with performance engineering.",
      icon: "Layers",
      accentColor: "#38bdf8",
      glowColor: "rgba(56, 189, 248, 0.5)",
      tags: ["Modern Frontend", "RESTful APIs", "Database Design", "Interactive UI", "System Architecture"],
      badge: "SYSTEM CRAFT"
    }
  ],

  // --------------------------------------------------------------------------
  // 5. PROJECTS (HORIZONTAL SHOWCASE + LIVE INTERACTIVE PREVIEWS)
  // --------------------------------------------------------------------------
  projects: [
    {
      id: "transaction-risk-classifier",
      title: "Transaction Risk Level Classifier",
      subtitle: "AI/ML Financial Risk Assessment Engine",
      category: "Machine Learning / Python",
      description:
        "An intelligent classification system that analyzes financial transaction features to assess risk tiers (Low, Medium, High, Critical) in real time.",
      longDescription:
        "Engineered a predictive risk evaluation engine designed to safeguard payment gateways and financial services. By inspecting multidimensional parameters like transaction velocity, unusual amount thresholds, geographical deviation, and historical frequency, the model categorizes incoming transactions into risk tiers and alerts automated review pipelines.",
      technologies: ["Python", "Machine Learning", "Data Preprocessing", "Feature Engineering", "Risk Analytics"],
      metrics: [
        { label: "Risk Tiers", value: "4 Distinct Levels" },
        { label: "Engine", value: "Python Classifier" },
        { label: "Execution Time", value: "< 25ms / eval" }
      ],
      features: [
        "Real-time heuristic & statistical risk classification",
        "Feature scaling and outlier anomaly detection",
        "Configurable threshold alert triggers for High/Critical anomalies",
        "Modular architecture ready for API integration"
      ],
      githubUrl: "https://github.com/saad082-alt/transaction-risk-classifier",
      liveUrl: "#simulate-risk",
      demoType: "risk-classifier",
      badge: "AI & ML System",
      gradient: "from-purple-600 via-indigo-600 to-cyan-500"
    },
    {
      id: "expense-tracker",
      title: "Expense Tracker",
      subtitle: "Smart Personal Financial Management Tool",
      category: "Python / Full Stack",
      description:
        "A comprehensive expense tracking application engineered to categorize expenditures, calculate budget thresholds, and generate actionable financial insights.",
      longDescription:
        "Built to bring clarity to personal finances. This application allows users to record, categorize, and query their daily expenditures, visualize spending trends across customized timeframes, and set alerts when nearing monthly allocations. Implemented with clean database queries and intuitive reporting.",
      technologies: ["Python", "SQL Database", "Data Visualization", "Budget Logic", "Full Stack"],
      metrics: [
        { label: "Tracking", value: "Multi-Category" },
        { label: "Database", value: "Structured SQL" },
        { label: "Analytics", value: "Monthly Trends" }
      ],
      features: [
        "Structured category breakdowns (Food, Utilities, Tech, Leisure)",
        "Instant balance calculation and threshold notifications",
        "SQL-powered historical transaction ledger with search filters",
        "Data export and trend analysis support"
      ],
      githubUrl: "https://github.com/saad082-alt/expense-tracker",
      liveUrl: "#simulate-expense",
      demoType: "expense-tracker",
      badge: "Financial Utility",
      gradient: "from-cyan-500 via-blue-600 to-indigo-700"
    },
    {
      id: "smart-canteen-token",
      title: "Smart Canteen Token System",
      subtitle: "Campus Digital Order & Queue Orchestrator",
      category: "Full Stack / Python & SQL",
      description:
        "A digital token generation and queue management system designed to eliminate cafeteria congestion, track order statuses, and streamline meal distribution.",
      longDescription:
        "Conceived to solve the chaotic peak-hour rush in college cafeterias. The system generates unique, verifiable digital tokens upon order confirmation, updates live kitchen queue displays, and notifies students when their token is ready for collection—drastically reducing wait times and improving kitchen inventory management.",
      technologies: ["Python", "SQL", "Queue Algorithms", "Web Architecture", "Real-Time Tracking"],
      metrics: [
        { label: "Wait Time", value: "-60% Estimated" },
        { label: "Tokens", value: "Unique Digital IDs" },
        { label: "Queue Sync", value: "Instant Status" }
      ],
      features: [
        "Unique digital token generation with timestamped tracking",
        "Kitchen admin dashboard with live order queue management",
        "Order state machine: Pending -> Preparing -> Ready -> Collected",
        "SQL relational schema linking users, menu items, and token logs"
      ],
      githubUrl: "https://github.com/saad082-alt/smart-canteen-token-system",
      liveUrl: "#simulate-canteen",
      demoType: "canteen-token",
      badge: "Campus Innovation",
      gradient: "from-violet-600 via-purple-700 to-pink-600"
    }
  ] as ProjectItem[],

  // --------------------------------------------------------------------------
  // 6. EXPERIENCE (ONE INTERNSHIP COMPLETED)
  // --------------------------------------------------------------------------
  internship: {
    company: "Brainybeam Info-Tech",
    role: "Web Design & MERN Stack Developer Intern",
    duration: "5th May 2024 – June 2024 (30 Days Intensive)",
    location: "Ahmedabad, Gujarat, India",
    type: "Internship (Completed)",
    status: "Completed",
    description:
      "Completed an intensive 30-day professional industry internship at Brainybeam Info-Tech focused on modern web design, MERN stack full-stack engineering, and developing the 'Fresh Fruit Hub' web platform.",
    responsibilities: [
      "Designed and developed 'Fresh Fruit Hub', a responsive full-stack web application using the MERN stack (MongoDB, Express.js, React.js, Node.js) and Java/Web architectures.",
      "Crafted intuitive, responsive frontend interfaces with modern HTML5, CSS3, and modern JavaScript component architecture.",
      "Engineered backend RESTful API services for product catalog management, user cart workflows, and database CRUD operations.",
      "Collaborated within an agile development team, following industry standards for version control, code hygiene, and project delivery."
    ],
    technologies: ["MERN Stack", "React.js", "Node.js", "Express.js", "MongoDB", "Java", "JavaScript", "HTML5/CSS3", "REST APIs"],
    keyAchievement: "Successfully designed, architected, and shipped the full-stack 'Fresh Fruit Hub' project during the 30-day internship.",
    isEditableNote: "Editable in 'src/data/portfolioData.ts' under 'internship'!"
  } as InternshipExperience,

  // --------------------------------------------------------------------------
  // 7. EDUCATION
  // --------------------------------------------------------------------------
  education: [
    {
      institution: "LJ Polytechnic",
      degree: "Diploma in Computer Engineering",
      field: "Computer Engineering",
      duration: "Completed",
      status: "Graduated",
      location: "Ahmedabad, Gujarat",
      description:
        "Built a strong foundational mastery of computer engineering principles, hardware-software interfacing, programming paradigms, and algorithmic thinking.",
      highlights: [
        "Core Foundations in Programming & Logic Building",
        "Database Management Systems & Computer Networks",
        "Software Engineering Principles & Project Implementations",
        "Graduated with distinction and practical technical hands-on skill"
      ],
      badge: "DIPLOMA FOUNDATION"
    },
    {
      institution: "JG University",
      degree: "B.Tech in Computer Science Engineering",
      field: "Computer Science & Engineering",
      duration: "Currently Pursuing",
      status: "In Progress",
      location: "Ahmedabad, Gujarat, India",
      description:
        "Advancing in higher-level computer science disciplines at JG University, specializing in Artificial Intelligence, Machine Learning, Advanced Data Structures, Cloud Computing, and Scalable Backend Software Architecture.",
      highlights: [
        "Advanced coursework in AI, Machine Learning & Algorithms at JG University",
        "Deep exploration of Python ecosystem, modern full-stack web architectures, and MERN",
        "Active development of innovative technical projects (Risk Classifier, Canteen Token System)",
        "Focus on practical engineering, industry-standard development, and modern tooling"
      ],
      badge: "CURRENT B.TECH CSE"
    }
  ] as EducationItem[],

  // --------------------------------------------------------------------------
  // 8. FUTURISTIC JOURNEY (DIPLOMA -> B.TECH -> FUTURE TECH VISIONARY)
  // --------------------------------------------------------------------------
  journeyMilestones: [
    {
      year: "Phase 01: Foundation",
      title: "Diploma at LJ Polytechnic",
      category: "Academic Genesis",
      description:
        "Discovered the joy of programming and computational logic. Immersed in computer architecture, fundamentals of operating systems, C, basic scripting, and relational data.",
      takeaway: "Cultivated a deep technical curiosity and disciplined problem-solving mindset."
    },
    {
      year: "Phase 02: Hands-On Industry Experience",
      title: "MERN Stack Internship at Brainybeam Info-Tech",
      category: "Industry Immersion",
      description:
        "Stepped into real-world software workflows in Ahmedabad. Mastered MERN stack development, designed responsive interfaces, and engineered the 'Fresh Fruit Hub' full-stack project.",
      takeaway: "Gained practical experience in MERN stack architectures, RESTful APIs, and commercial software delivery."
    },
    {
      year: "Phase 03: Higher Engineering",
      title: "B.Tech in CSE at JG University",
      category: "Academic Evolution",
      description:
        "Currently pursuing B.Tech in Computer Science Engineering at JG University. Deepening expertise across advanced algorithms, intelligent predictive systems, and high-performance software architecture.",
      takeaway: "Building production-grade projects like the Transaction Risk Classifier and Smart Canteen System."
    },
    {
      year: "Phase 04: The Horizon",
      title: "Future AI & Full Stack Engineer",
      category: "Vision & Next Frontier",
      description:
        "Aspiring to pioneer intelligent software systems, bridge artificial intelligence into daily human tools, and build resilient, world-class digital products.",
      takeaway: "Dedicated to continuous learning, building innovative solutions, and pushing boundaries."
    }
  ],

  // --------------------------------------------------------------------------
  // 9. QUICK CONTACT INFO
  // --------------------------------------------------------------------------
  contact: {
    heading: "Let's Build The Future Together.",
    subheading: "Whether you have an internship opportunity, an innovative project in mind, or simply want to chat about AI and technology, my inbox is always open.",
    availability: "Actively seeking opportunities and collaborations",
    responseTime: "Typically responds within 24 hours"
  }
};
