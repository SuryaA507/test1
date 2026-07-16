export interface Student {
  id: string;
  name: string;
  avatar: string;
  gpa: number;
  major: string;
  year: string;
  communityHours: number;
  communityLeadership: string;
  communityImpact: 'High' | 'Medium' | 'Low';
  academicAchievements: string[];
  skills: string[];
  projects: string[];
  background: string;
  category: string;
}

export const students: Student[] = [
  {
    id: "STU001",
    name: "Aria Sterling",
    avatar: "AS",
    gpa: 3.92,
    major: "Computer Science",
    year: "Senior",
    communityHours: 120,
    communityLeadership: "Founder of 'Code For Kids' Initiative",
    communityImpact: "High",
    academicAchievements: [
      "Dean's Honor List (All Semesters)",
      "First Place at State Hackathon 2025",
      "Undergraduate Research Fellowship in AI Ethics"
    ],
    skills: ["React", "TypeScript", "Python", "PyTorch", "UI/UX Design"],
    projects: [
      "EcoRoute - AI-driven route optimization for reducing carbon emissions",
      "EduAccess - Accessible screen-reader website template for blind students"
    ],
    background: "Aria is a high-achieving Computer Science major who bridges technology and social impact. Coming from an underrepresented community, she dedicated her weekends to teaching programming to kids in public libraries. She aims to apply AI to solve environmental and educational inequalities.",
    category: "Academic & Community Leader"
  },
  {
    id: "STU002",
    name: "Marcus Vance",
    avatar: "MV",
    gpa: 3.45,
    major: "Environmental Science",
    year: "Junior",
    communityHours: 210,
    communityLeadership: "President of the Campus Sustainability Club",
    communityImpact: "High",
    academicAchievements: [
      "National Wildlife Federation Student Fellow",
      "Best Poster Award at Campus Science Symposium"
    ],
    skills: ["GIS Mapping", "Data Analysis (R)", "Field Sampling", "Public Speaking"],
    projects: [
      "Urban Canopy Project - Mapping campus heat islands and planting 500+ trees",
      "AquaSafe - Community-run water testing kits for local watersheds"
    ],
    background: "Marcus is passionate about local conservation. While his GPA is moderate due to heavy field-work commitments, his community impact is outstanding. He led the campaign to make the university campus single-use plastic-free, demonstrating superb leadership and organizational capability.",
    category: "Community Advocate"
  },
  {
    id: "STU003",
    name: "Elena Rostova",
    avatar: "ER",
    gpa: 4.00,
    major: "Bioinformatics",
    year: "Senior",
    communityHours: 45,
    communityLeadership: "Lab Mentor for Underclassmen",
    communityImpact: "Medium",
    academicAchievements: [
      "Valedictorian Candidate",
      "Co-author on a peer-reviewed genomics publication",
      "Recipient of the Presidential Gold Scholarship"
    ],
    skills: ["Genomics Pipeline", "Python", "SQL", "LaTeX", "Molecular Biology"],
    projects: [
      "GenomeAlign - Multi-threaded sequence alignment algorithm optimization",
      "CancerGeneDB - Public database mapping genetic variants to drug responses"
    ],
    background: "Elena is a brilliant academic researcher with a perfect 4.0 GPA. She spends most of her time in high-performance computing labs, optimizing genomics pipelines. Her community work focuses on academic mentoring and tutoring younger students in quantitative genetics.",
    category: "Elite Academic Scholar"
  },
  {
    id: "STU004",
    name: "Devin Patel",
    avatar: "DP",
    gpa: 3.68,
    major: "Mechanical Engineering",
    year: "Junior",
    communityHours: 95,
    communityLeadership: "Project Lead for Formula SAE Community Outreach",
    communityImpact: "Medium",
    academicAchievements: [
      "Engineering Design Excellence Award 2025",
      "Tau Beta Pi Honor Society Member"
    ],
    skills: ["CAD/SolidWorks", "MATLAB", "3D Printing", "Aerodynamics"],
    projects: [
      "SolarCar V2 - Designing high-efficiency solar cells for race cars",
      "ProstheticFit - Designing low-cost 3D printed hand prosthetics for local clinics"
    ],
    background: "Devin combines engineering prowess with practical problem-solving. Through Formula SAE outreach, he organizes workshops for middle-school children to encourage STEM enrollment. He is currently working on translating advanced engineering methodologies into low-cost prosthetic devices.",
    category: "Applied Engineering Specialist"
  },
  {
    id: "STU005",
    name: "Sania Al-Jamil",
    avatar: "SA",
    gpa: 3.85,
    major: "Public Policy",
    year: "Senior",
    communityHours: 180,
    communityLeadership: "Student Body Vice President & City Council Youth Liaison",
    communityImpact: "High",
    academicAchievements: [
      "Truman Scholarship Nominee",
      "Outstanding Service & Leadership Award 2025"
    ],
    skills: ["Policy Writing", "Statistical Analysis (STATA)", "Mediation", "Spanish"],
    projects: [
      "FairHousing Campus - Research on off-campus housing affordability for low-income students",
      "VoteMobilize - Campus-wide registration campaign resulting in 90% voter turnout"
    ],
    background: "Sania focuses on systemic policy changes and civic engagement. She has worked directly with the city council to address student housing challenges. Her balanced profile combines high-tier academic writing with real-world activism and leadership.",
    category: "Civic Policy Leader"
  },
  {
    id: "STU006",
    name: "Julian Kincaid",
    avatar: "JK",
    gpa: 3.20,
    major: "Business Administration",
    year: "Sophomore",
    communityHours: 15,
    communityLeadership: "Finance Club Event Organizer",
    communityImpact: "Low",
    academicAchievements: [
      "Dean's List (Spring 2025)",
      "Winner of Local Venture Pitch Competition"
    ],
    skills: ["Financial Modeling", "Excel", "Market Research", "Negotiation"],
    projects: [
      "MicroInvest - Prototype app for micro-loans to student entrepreneurs",
      "RetailFlow - Consulting project optimizing inventory for a local bookstore"
    ],
    background: "Julian is a highly driven entrepreneur who launched a micro-loans startup during his freshman year. While his community service hours are low, his business ventures aim to empower local student projects. He is focusing on scaling his academic credentials.",
    category: "Emerging Entrepreneur"
  },
  {
    id: "STU007",
    name: "Maya Lin",
    avatar: "ML",
    gpa: 3.78,
    major: "Cognitive Science",
    year: "Junior",
    communityHours: 140,
    communityLeadership: "Co-director of Student Mental Health Peer Support Network",
    communityImpact: "High",
    academicAchievements: [
      "Psi Chi Honor Society Member",
      "Undergraduate Research Grant in Human-Computer Interaction"
    ],
    skills: ["Statistical Modeling", "User Research", "Python", "Figma", "Behavioral Analysis"],
    projects: [
      "MindSpace - A clean, glassmorphic meditation app designed for student anxiety",
      "CognitiveFlow - UX study on screen fatigue and reading retention"
    ],
    background: "Maya focuses on mental well-being and UX design. Recognizing a rise in student stress, she co-founded a peer support group that has helped over 300 students. Her research integrates cognitive science with UI design to create therapeutic interfaces.",
    category: "UX Researcher & Advocate"
  }
];

export interface RagResponse {
  answer: string;
  referencedStudentIds: string[];
}

export function queryRagSystem(queryText: string): RagResponse {
  const query = queryText.toLowerCase();

  // Query 1: High academic and high community service
  if (query.includes("high academic") && (query.includes("community service") || query.includes("hours"))) {
    return {
      answer: "Based on my retrieval of the student database, the RAG system identifies **Aria Sterling (STU001)** and **Sania Al-Jamil (STU005)** as the top matches. \n\n* **Aria Sterling** holds a **3.92 GPA** in Computer Science and has logged **120 community hours**, leading the 'Code For Kids' initiative.\n* **Sania Al-Jamil** has a **3.85 GPA** in Public Policy, **180 community hours**, and serves as Student Body VP.\n\nFor extreme academic focus paired with mentoring, **Elena Rostova (STU003)** (4.00 GPA, 45 hours) is also relevant.",
      referencedStudentIds: ["STU001", "STU005", "STU003"]
    };
  }

  // Query 2: Compare specific students
  if (query.includes("compare") && query.includes("aria") && query.includes("elena")) {
    return {
      answer: "### Student Comparison: Aria Sterling vs. Elena Rostova\n\nRetrieval shows contrasting profiles designed for different pathways:\n\n1. **Academic Performance:**\n   * **Elena Rostova** has a perfect **4.00 GPA** in Bioinformatics and is a published co-author. Extremely lab/research-oriented.\n   * **Aria Sterling** has a **3.92 GPA** in Computer Science with highly practical coding achievements.\n\n2. **Community Impact:**\n   * **Aria Sterling** has **120 hours** and founder leadership status ('Code For Kids'), classifying her as **High Impact**.\n   * **Elena Rostova** has **45 hours** focusing on tutoring/mentoring, classifying her as **Medium Impact**.\n\n3. **Application Recommendation:** Aria is better suited for leadership-driven technology scholarships, while Elena is ideal for advanced genomics/AI doctoral positions.",
      referencedStudentIds: ["STU001", "STU003"]
    };
  }

  if (query.includes("compare") && query.includes("marcus") && query.includes("elena")) {
    return {
      answer: "### Student Comparison: Marcus Vance vs. Elena Rostova\n\nComparing their academic and service credentials, they occupy opposite ends of the spectrum:\n\n1. **Aesthetics & Focus:**\n   * **Elena Rostova** (Bioinformatics) possesses a perfect **4.00 GPA** but lower service hours (**45 hours**). She represents deep theoretical research.\n   * **Marcus Vance** (Environmental Science) has a **3.45 GPA** but leads the campus with **210 community hours**. He is a hands-on organizer.\n\n2. **Leadership & Projects:**\n   * Marcus leads the Campus Sustainability Club and has planted 500+ trees.\n   * Elena leads genomics pipelines and mentors lab assistants.\n\n**RAG Recommendation:** Marcus is a premier candidate for active community outreach, and Elena is a premier candidate for technical excellence and computational biology.",
      referencedStudentIds: ["STU002", "STU003"]
    };
  }

  // Query 3: Technology and outreach / coding and community
  if ((query.includes("technology") || query.includes("coding") || query.includes("python") || query.includes("computer science")) && (query.includes("community") || query.includes("outreach"))) {
    return {
      answer: "Retrieving profiles with a blend of coding/technology skills and community impact:\n\n* **Aria Sterling (STU001):** Core CS student, knows React, TypeScript, Python, PyTorch. Founded 'Code For Kids' (**120 hours**). Outstanding hybrid profile.\n* **Devin Patel (STU004):** Mechanical Engineer with strong coding capabilities (MATLAB, CAD). Leads Formula SAE outreach and built *ProstheticFit* (**95 hours**).\n* **Elena Rostova (STU003):** Bioinformatics major with Python/SQL skills. Tutored underclassmen in quantitative genomics (**45 hours**). High technical depth, moderate outreach.",
      referencedStudentIds: ["STU001", "STU004", "STU003"]
    };
  }

  // Query 4: Sustainability, environmental, green
  if (query.includes("sustainability") || query.includes("environmental") || query.includes("green") || query.includes("conservation")) {
    return {
      answer: "Retrieval matches show **Marcus Vance (STU002)** as the primary candidate. He is an Environmental Science major with **210 community hours** and is the President of the Sustainability Club. Projects include *Urban Canopy Project* (500+ trees) and *AquaSafe* water kits. \n\nAnother secondary match is **Aria Sterling (STU001)** who engineered *EcoRoute*, an AI route optimization tool for carbon reduction.",
      referencedStudentIds: ["STU002", "STU001"]
    };
  }

  // Query 5: Leadership / Civic policy / mental health
  if (query.includes("leadership") || query.includes("policy") || query.includes("mental health") || query.includes("support")) {
    return {
      answer: "Retrieving students with active leadership and high community impact indices:\n\n1. **Sania Al-Jamil (STU005):** Student Body Vice President. Logged **180 hours** doing civic housing campaigns and voter registration.\n2. **Maya Lin (STU007):** Co-director of Mental Health Support Network. Logged **140 hours** assisting 300+ students and building the *MindSpace* mental wellness application.\n3. **Marcus Vance (STU002):** President of Sustainability Club (**210 hours**).",
      referencedStudentIds: ["STU005", "STU007", "STU002"]
    };
  }

  // General Fallback Search (Keyword Matching)
  const matches = students.filter(s => 
    s.name.toLowerCase().includes(query) ||
    s.major.toLowerCase().includes(query) ||
    s.background.toLowerCase().includes(query) ||
    s.skills.some(sk => sk.toLowerCase().includes(query)) ||
    s.projects.some(p => p.toLowerCase().includes(query))
  );

  if (matches.length > 0) {
    const listString = matches.map(s => `* **${s.name}** (${s.id}) - ${s.major}, GPA: ${s.gpa}, Community Hours: ${s.communityHours}`).join("\n");
    return {
      answer: `### RAG Direct Search Retrieval Results\n\nI successfully found **${matches.length}** matching student profile(s) related to your search:\n\n${listString}\n\n*Select a student's card in the Directory tab to read their full profile, academic accomplishments, and projects.*`,
      referencedStudentIds: matches.map(m => m.id)
    };
  }

  return {
    answer: "No direct query matches found in the RAG retrieval database. Try asking about:\n* 'high academic with community service'\n* 'compare Aria and Elena'\n* 'technology and community outreach'\n* 'sustainability and conservation'\n* 'student leadership and policy'\n\nOr search for a specific name, skill, or project (e.g., 'Python', 'Aria', 'EcoRoute', 'GIS').",
    referencedStudentIds: []
  };
}
