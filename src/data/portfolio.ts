import { Project, Certification, SkillCategory, TimelineEvent } from "@/types";

export const personalInfo = {
  name: "Nikhilesh Aravapalli",
  role: "Cybersecurity & Cloud Systems Engineer",
  email: "nikhilesharavapalli@gmail.com",
  phone: "+91 6394000143",
  location: "Andhra Pradesh, India",
  university: "SRM University AP, Amaravati",
  degree: "B.Tech in Computer Science and Engineering",
  cgpa: "6.9 / 10",
  linkedin: "https://www.linkedin.com/in/nikhilesh-aravapalli-663176291/",
  github: "https://github.com/Nikhilesh280",
  objective: "Security-focused Computer Science and Engineering student with strong hands-on expertise in Cloud Computing (AWS Certified), Cryptography, Web Penetration Testing, and Serverless architectures. Seeking to leverage technical skills in designing secure, resilient, and optimized computing systems in a challenging internship or entry-level role."
};

export const skillsData: SkillCategory[] = [
  {
    id: "languages",
    name: "Languages",
    skills: [
      { name: "Python", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "SQL", level: 80 },
      { name: "C++", level: 75 },
      { name: "C", level: 70 }
    ]
  },
  {
    id: "cloud",
    name: "Cloud & DevSecOps",
    skills: [
      { name: "AWS (S3, Lambda, IAM, Bedrock)", level: 90 },
      { name: "Cognito & IAM Policy Control", level: 85 },
      { name: "API Gateway & DynamoDB", level: 85 },
      { name: "Docker & Docker Compose", level: 75 },
      { name: "Git / GitHub", level: 90 }
    ]
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    skills: [
      { name: "Cryptography (AES-GCM, ASCON)", level: 95 },
      { name: "Web Penetration Testing", level: 80 },
      { name: "RSA Challenge-Response Protocols", level: 85 },
      { name: "OAuth 2.0 & JWT Security", level: 85 },
      { name: "Kali Linux & Security Tools", level: 75 }
    ]
  },
  {
    id: "web",
    name: "Web Technologies",
    skills: [
      { name: "React.js / Next.js", level: 85 },
      { name: "Node.js / Express.js", level: 80 },
      { name: "REST APIs", level: 85 },
      { name: "Redis Caching", level: 75 },
      { name: "HTML5 / CSS3 / Tailwind", level: 80 }
    ]
  }
];

export const projectsData: Project[] = [
  {
    id: "aws-chatbot",
    title: "Product Manual & Knowledge Base Chatbot",
    subtitle: "AWS Cloud & Generative AI",
    category: "AWS Cloud",
    tags: ["AWS", "GenAI", "RAG", "Serverless", "Security"],
    description: "A factory-floor Retrieval-Augmented Generation (RAG) chatbot using Amazon Bedrock and OpenSearch Serverless for role-restricted precise technical troubleshooting.",
    longDescription: "Developed a comprehensive serverless RAG chatbot. The system processes scanned machine manuals using an ingestion pipeline (S3, Lambda, Textract for OCR) and syncs them to OpenSearch Serverless. It features Role-Based Access Control (RBAC) via Cognito groups to restrict high-seniority security procedures, provides multilingual translations, generates spoken instructions with Polly, and detects unanswered queries (documentation gaps) using DynamoDB and SNS notifications.",
    architecture: [
      "VPC (CIDR 10.0.0.0/16) with 6 subnets across AZs and VPC Flow Logs",
      "S3 Buckets: manuals-raw (versioned & KMS encrypted), processed, and audio output",
      "Amazon Bedrock Knowledge Bases + OpenSearch Serverless vector indexing",
      "Amazon Cognito User Pool & Groups for Junior/Senior/Supervisor RBAC filtering",
      "AWS Lambda & API Gateway backend",
      "Amazon Polly, Translate, and SNS alerts"
    ],
    features: [
      "Role-Restricted Knowledge Access: Junior workers cannot retrieve senior-only manuals",
      "Serverless OCR: Auto-extracts metadata and splits text into searchable chunks",
      "Admin Gap Detection: SNS notification triggers when a specific query fails 5+ times in 24 hours",
      "Multilingual Audio: Outputs translations and plays audio guidelines for industrial accessibility"
    ],
    securitySpecs: [
      "Least-privilege security groups protecting application compute and OpenSearch tier",
      "Strict data encryption at rest (KMS) and transit (HTTPS/SSL)",
      "Cognito JWT authorization flow for API Gateway endpoints"
    ],
    githubUrl: "https://github.com/Nikhilesh280/AWS-Project",
    liveUrl: ""
  },
  {
    id: "securefile",
    title: "SecureFile: Hybrid Cryptographic Vault",
    subtitle: "Offline Storage Lockout Protocol",
    category: "Cryptographic Vault",
    tags: ["Cryptography", "Python", "ASCON", "AES-256", "Academic Research"],
    description: "A two-layer cryptographic storage protocol combining AES-GCM and ASCON-128 to bind access control policies directly to data.",
    longDescription: "Engineered a secure local vault application to address metadata manipulation vulnerabilities in offline storage. By nesting access policies directly within metadata and encrypting them using NIST-standard ASCON-128 AEAD, the files are physically protected against offline brute-force or rollback attacks. Features a tamper-proof attempt counter and an asymmetric challenge-response recovery workflow utilizing RSA-3072.",
    architecture: [
      "Two-layer encryption layout: AES-256-GCM for files, ASCON-128 for metadata",
      "RSA-3072 Challenge-Response recovery protocol",
      "State-binding attempt-counter script written in Python"
    ],
    features: [
      "Tamper-Resistant Counter: Modifying state variables directly destroys decryption keys",
      "NIST Standard ASCON-128: Lightweight, resource-efficient AEAD suited for offline and IoT",
      "Asymmetric Recovery: Challenge-response mechanism removes the single point of failure associated with master passwords"
    ],
    securitySpecs: [
      "Formally models metadata mutability risks in offline/physical-access threat spaces",
      "AES-256-GCM providing cryptographic integrity for high-volume storage",
      "RSA-3072 authentication challenge to prevent administrative override abuse"
    ],
    githubUrl: "https://github.com/Nikhilesh280",
    confStatus: "Paper ID 1571280820 — Under Review (Conference August 21-22)"
  },
  {
    id: "campus-dining",
    title: "Campus Dining & Vendor Quality Management System",
    subtitle: "MERN Stack DevSecOps Application",
    category: "MERN Stack",
    tags: ["MERN", "OAuth", "Redis", "Security Gates", "API Security"],
    description: "A secure dining portal with Google OAuth, budget planner algorithm, and anomaly tripwires to prevent review weaponization.",
    longDescription: "Built a full-stack campus dining platform. Security features include Google OAuth domain-restricted login (@srmap.edu.in), HttpOnly JWT cookie sessions, and an anomaly tripwire that automatically freezes restaurant profiles when experiencing a flood of negative reviews (10+ low reviews in 60 minutes). The system includes a Redis rate-limiting sliding window and an anti-weaponization subnet gate that flags spam attempts originating from identical subnets.",
    architecture: [
      "React.js + Vite frontend with Tailwind styling",
      "Node.js + Express backend inside a Docker Compose deployment",
      "MongoDB database layer and Redis caching/sliding window rate-limiter",
      "RESTful API endpoints protected by JWT session cookies"
    ],
    features: [
      "Median-Price Budget Planner: Suggests meal options and returns recommendations based on headcount",
      "Review Anomaly Tripwire: Freezes ratings upon detecting coordinated review bomb attempts",
      "Anti-Weaponization Subnet Gate: Restricts review submittals to <=3 accounts per /24 subnet",
      "Google OAuth 2.0 domain lock to verify academic email accounts"
    ],
    securitySpecs: [
      "Passport.js login restricted to srmap.edu.in",
      "Redis sliding window rate limiting (maximum 2 reviews per student per hour)",
      "Strict HttpOnly JWT cookies to prevent cross-site scripting (XSS) token extraction"
    ],
    githubUrl: "https://github.com/Nikhilesh280/campus-dining-system"
  },
  {
    id: "handsmen-threads",
    title: "HandsMen Threads & Custom CRM",
    subtitle: "Salesforce Workflow Automation",
    category: "Full-Stack",
    tags: ["Salesforce", "CRM", "APEX", "Automation", "Workflows"],
    description: "Workflow automation and CRM configuration developed during Salesforce internship to streamline business operations.",
    longDescription: "Configured Apex classes, visual flows, and triggers within the Salesforce developer ecosystem to automate complex business workflows. Focused on optimizing database query times (SOQL), structuring clean REST API endpoints to exchange CRM lead data with external interfaces, and building custom Lightning Web Components (LWC) in React-based structures to provide responsive administrative layouts.",
    architecture: [
      "Salesforce Apex Code and SOQL queries",
      "Salesforce Lightning Web Components (LWC) with custom styles",
      "APEX Triggers and Process Builder integrations"
    ],
    features: [
      "Apex Automation: Replaced manual processes with automated trigger sequences",
      "SOQL Optimization: Designed lean queries to resolve system processing overhead",
      "REST Data Exchange: Created custom sync points for third-party integrations"
    ],
    githubUrl: "https://github.com/Nikhilesh280/HandsMen-Threads"
  }
];

export const certificationsData: Certification[] = [
  {
    id: "aws-ccp",
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services (AWS)",
    date: "April 12, 2026",
    expiry: "April 12, 2029",
    credentialId: "366baf53ee5b4ae0a402266eee990b45",
    verifyUrl: "https://aws.amazon.com/verification"
  },
  {
    id: "sap-genai",
    name: "SAP Certified - SAP Generative AI Developer",
    issuer: "SAP",
    date: "May 1, 2026",
    expiry: "May 2, 2027",
    verifyUrl: "https://www.credly.com/badges/a301b420-254d-4540-803a-65ddec812a63"
  },
  {
    id: "oracle-java",
    name: "Oracle Certified Professional: Java SE 17 Developer",
    issuer: "Oracle",
    date: "February 16, 2026",
    credentialId: "103338866OCPJSE17"
  },
  {
    id: "cyber-mentor",
    name: "Cyber Security Mentorship Program",
    issuer: "Launched Global & BTech Walleh",
    date: "2025"
  },
  {
    id: "salesforce-cert",
    name: "Salesforce Internship Certificate",
    issuer: "Salesforce",
    date: "2024"
  }
];

export const timelineData: TimelineEvent[] = [
  {
    id: "srm-start",
    title: "B.Tech in Computer Science & Engineering",
    organization: "SRM University AP",
    date: "August 2023",
    type: "education",
    description: [
      "Commenced studies with focus on Core Computing systems, Data Structures, and Algorithms.",
      "Engaged in academic coursework covering Database Management systems, Operating Systems, and Cryptography."
    ],
    iconName: "GraduationCap"
  },
  {
    id: "salesforce-intern",
    title: "Software Engineering Intern",
    organization: "Salesforce",
    date: "June 2024 - August 2024",
    type: "experience",
    description: [
      "Worked remotely in a fast-paced team environment to automate business workflows.",
      "Optimized query performance and integrated custom React-style components within Salesforce CRM."
    ],
    iconName: "Briefcase"
  },
  {
    id: "cyber-mentorship",
    title: "Cyber Security Mentorship",
    organization: "Launched Global & BTech Walleh",
    date: "2025",
    type: "certification",
    description: [
      "Deepened skills in web application penetration testing, system hardening, and threat analysis.",
      "Studied defensive cybersecurity patterns and network protocol analysis."
    ],
    iconName: "ShieldAlert"
  },
  {
    id: "oracle-cert",
    title: "Oracle Java SE 17 Certified Professional",
    organization: "Oracle",
    date: "February 2026",
    type: "achievement",
    description: [
      "Cleared the developer certification, validating advanced Java core concepts, multithreading, and OOP design."
    ],
    iconName: "Award"
  },
  {
    id: "aws-cert",
    title: "AWS Certified Cloud Practitioner",
    organization: "Amazon Web Services",
    date: "April 2026",
    type: "achievement",
    description: [
      "Earned AWS cloud certification validating foundational cloud security, serverless systems, and architectural best practices."
    ],
    iconName: "Cloud"
  },
  {
    id: "sap-cert",
    title: "SAP Certified Generative AI Developer",
    organization: "SAP",
    date: "May 2026",
    type: "achievement",
    description: [
      "Validated knowledge of SAP Business AI capabilities, integration of large language models, and AI Core development."
    ],
    iconName: "Cpu"
  },
  {
    id: "sec-paper",
    title: "Cryptographic Vault Research Submission",
    organization: "Academic Security Conference",
    date: "August 2026 (Upcoming)",
    type: "achievement",
    description: [
      "Authored a hybrid cryptosystem research paper presenting cryptographically enforced lockouts in offline storage systems.",
      "Scheduled presentation date: August 21-22, 2026 (Paper ID: 1571280820)."
    ],
    iconName: "FileText"
  }
];
