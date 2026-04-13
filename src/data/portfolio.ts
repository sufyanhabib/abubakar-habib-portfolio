import { 
  Code2, 
  Network, 
  BrainCircuit, 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Terminal, 
  Layers, 
  Cpu,
  Globe,
  Server,
  ShieldCheck,
  Search,
  Zap
} from "lucide-react";

export const portfolioData = {
  identity: {
    name: "Abubakar Habib",
    title: "Frontend Developer | Network Engineer | Aspiring AI Engineer",
    location: "Bihar, India",
    email: "sufyanhabib80@gmail.com",
    github: "https://github.com/sufyanhabib",
    linkedin: "#", // Placeholder
    codepen: "https://codepen.io/sufyanhabib",
    resumeUrl: "#", // Placeholder
    avatarUrl: "input_file_0.png",
    valueProp: "Engineering robust systems and crafting refined interfaces, backed by real-world networking experience, with a growing interest in Artificial Intelligence."
  },
  about: {
  story: `With a Master of Computer Applications (MCA) and hands-on experience in networking and IT infrastructure, I bring a practical, problem-solving mindset to frontend development.

I worked as a Junior Consultant on the BMC HIMS Project at Niveshan Technologies, where I supported IT infrastructure and network operations in a live production environment. My role involved handling ticketing systems, troubleshooting connectivity issues, monitoring system performance, and ensuring smooth day-to-day operations.

My journey started with networking, where I gained experience in IP addressing, system configuration, and troubleshooting. This has given me a deeper understanding of how systems work beyond the interface, which I apply while building modern, responsive web applications using React.

Currently, I am focused on strengthening my frontend development skills while exploring Artificial Intelligence to build more intelligent and reliable systems.`
},
  skills: [
    {
      category: "Frontend Engineering",
      description: "Crafting high-performance, accessible user interfaces with modern React architectures and fluid motion design.",
      icon: Code2,
      items: ["React", "JavaScript (ES6+)", "TypeScript", "Tailwind CSS", "Framer Motion", "Responsive Design", "HTML5/CSS3"]
    },
    {
      category: "Network Infrastructure",
      description: "Designing and troubleshooting robust network architectures with a focus on security, scalability, and performance.",
      icon: Network,
      items: ["IP Addressing & Subnetting", "VLAN Segmentation", "Switching & Routing", "OSPF & Static Routing", "Cisco CLI", "Troubleshooting (Ping/Traceroute)"]
    },
    {
      category: "Systems & Tools",
      description: "Leveraging industry-standard tools and server environments to streamline development and infrastructure management.",
      icon: Terminal,
      items: ["Git & GitHub", "Windows Server 2022", "Cisco Packet Tracer", "VS Code", "DNS & DHCP Basics", "Network Security Fundamentals"]
    },
    {
      category: "Future Direction",
      description: "Exploring the frontier of intelligent systems and advanced UI patterns to build the next generation of web products.",
      icon: BrainCircuit,
      items: ["Advanced React Patterns", "UI Engineering", "Intelligent Systems", "AI Integration"]
    }
  ],
  experience: [
    {
      role: "Junior Consultant",
      company: "Niveshan Technologies India Pvt. Ltd.",
      location: "Mumbai, India",
      period: "Jan 2025 – Jul 2025",
      description: "Provided critical IT infrastructure and network support for the BMC HMIS Project.",
      achievements: [
        "Managed daily operations including ticketing, troubleshooting, and system monitoring.",
        "Resolved complex connectivity issues and collaborated with senior teams for escalations.",
        "Ensured strict policy compliance while addressing diverse user requests."
      ]
    },
    {
      role: "Trainee Engineer",
      company: "NTPL Digital",
      location: "Noida, India",
      period: "Aug 2024 – Dec 2024",
      description: "Hands-on training in network fundamentals and server management.",
      achievements: [
        "Configured LAN/WAN setups and managed Windows Server environments.",
        "Implemented IP addressing schemes and performed OS installations.",
        "Documented technical procedures and built an internal knowledge base."
      ]
    },
    {
      role: "Summer Hackathon Participant",
      company: "Codédex",
      location: "Remote",
      period: "July 2024",
      description: "Completed Track 2: Brooklyn Stoop Sale Invitation.",
      achievements: [
        "Received a digital badge for successful completion.",
        "Developed interactive web components under hackathon constraints."
      ]
    },
    {
      role: "Open Source Contributor",
      company: "Hacktoberfest",
      location: "Global",
      period: "Oct 2023",
      description: "Engaged in global open-source event completing all required pull requests.",
      achievements: [
        "Contributed to diverse open-source projects.",
        "Demonstrated commitment to collaborative development within the community."
      ]
    },
    {
      role: "Master of Computer Applications",
      company: "Bihar University",
      location: "Bihar, India",
      period: "Dec 2019 - Dec 2022",
      description: "Starting point of the technical journey, mastering core computer science fundamentals.",
      achievements: [
        "Focused on systems, networking, and software engineering.",
        "Built foundational projects in C, Java, and Web Technologies."
      ]
    }
  ],
  projects: [
    {
      title: "FoxFoods",
      description: "A comprehensive food delivery and management platform built with modern web technologies.",
      techStack: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      type: "github",
      codeUrl: "https://github.com/Abhishek-090/FoxFoods",
      liveUrl: "https://fox-foods.vercel.app/",
      image: "https://private-user-images.githubusercontent.com/99119749/398713284-1b21c185-6a00-4531-adc9-72db9681a1de.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzYwNzM0ODQsIm5iZiI6MTc3NjA3MzE4NCwicGF0aCI6Ii85OTExOTc0OS8zOTg3MTMyODQtMWIyMWMxODUtNmEwMC00NTMxLWFkYzktNzJkYjk2ODFhMWRlLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNjA0MTMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjYwNDEzVDA5Mzk0NFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTBlMWJhNjYwNWM1YjA3ZmVlNzNmYWE3MzA2NTY2ODhlZTllZTczZWY0ZThmODY2YjYzYTdhYWFhMDQxOTYwNDQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JnJlc3BvbnNlLWNvbnRlbnQtdHlwZT1pbWFnZSUyRnBuZyJ9.VjgJgnVIIoGPuSu8zxPCFaBlks8plAUYhKFEV1aR0ag"
    },
    {
      title: "Brooklyn Stoop Sale",
      description: "An interactive invitation for a Brooklyn-themed stoop sale, developed for the Codédex hackathon.",
      techStack: ["HTML", "CSS", "JavaScript"],
      type: "github",
      codeUrl: "https://github.com/sufyanhabib/Brooklyn-Stoop_Sale",
      liveUrl: "brooklyn-stoop-sale-khaki.vercel.app",
      image: "https://private-user-images.githubusercontent.com/26720225/348476571-1de2b6b2-e0ea-4cb7-96bb-a83987ae0a88.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzYwNzM3NjUsIm5iZiI6MTc3NjA3MzQ2NSwicGF0aCI6Ii8yNjcyMDIyNS8zNDg0NzY1NzEtMWRlMmI2YjItZTBlYS00Y2I3LTk2YmItYTgzOTg3YWUwYTg4LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNjA0MTMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjYwNDEzVDA5NDQyNVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWJjZDg3ODJjMmRjMDE4OWExZGQ3M2I5OTgwNTQzODkwMjkwZmQxNzMxZTc3YjJjZTNlOTc2ZmQ3Yjc0ZDMyNTYmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JnJlc3BvbnNlLWNvbnRlbnQtdHlwZT1pbWFnZSUyRnBuZyJ9.wvBxfhodiVhK7-We1cucD8bEoeSr59-NUw36YBOKFS0"
    },
    {
      title: "Aro Pharma Website",
      description: "A professional pharmaceutical website showcasing products and corporate information.",
      techStack: ["React", "Tailwind CSS", "Framer Motion"],
      type: "github",
      codeUrl: "https://github.com/sufyanhabib/-aro-pharma-website",
      liveUrl: "https://aro-pharma.vercel.app/",
      image: "https://codepen.io/sufyanhabib/full/qEadKvx"
    },
    {
      title: "Systems Portfolio",
      description: "My personal portfolio showcasing the intersection of networking and frontend engineering.",
      techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      type: "github",
      codeUrl: "https://github.com/sufyanhabib/abubakar-habib-portfolio",
      liveUrl: "https://abubakar-habib.vercel.app/",
      image: "https://picsum.photos/seed/portfolio/800/450"
    },
    {
      title: "Interactive UI Component",
      description: "A premium interactive UI component built on CodePen showcasing advanced CSS and JS.",
      techStack: ["HTML", "CSS", "JavaScript"],
      type: "codepen",
      codeUrl: "https://codepen.io/sufyanhabib/full/qEadKvx",
      liveUrl: "https://codepen.io/sufyanhabib/full/qEadKvx",
      image: "https://codepen.io/sufyanhabib/pen/qEadKvx"
    },
    {
      title: "Modern Dashboard Concept",
      description: "A sleek, dark-themed dashboard concept with fluid animations.",
      techStack: ["CSS", "SVG", "Animation"],
      type: "codepen",
      codeUrl: "https://codepen.io/sufyanhabib/full/YPGPEdw",
      liveUrl: "https://codepen.io/sufyanhabib/full/YPGPEdw",
      image: "https://picsum.photos/seed/cp2/800/450"
    },
    {
      title: "Glassmorphism UI Kit",
      description: "Exploring the limits of glassmorphism in modern web design.",
      techStack: ["CSS", "Glassmorphism"],
      type: "codepen",
      codeUrl: "https://codepen.io/sufyanhabib/full/pvEvdxV",
      liveUrl: "https://codepen.io/sufyanhabib/full/pvEvdxV",
      image: "https://picsum.photos/seed/cp3/800/450"
    },
    {
      title: "Dynamic Data Visualization",
      description: "Interactive data visualization using pure CSS and minimal JS.",
      techStack: ["D3.js", "SVG", "JavaScript"],
      type: "codepen",
      codeUrl: "https://codepen.io/sufyanhabib/full/YPGzNqP",
      liveUrl: "https://codepen.io/sufyanhabib/full/YPGzNqP",
      image: "https://picsum.photos/seed/cp4/800/450"
    },
    {
      title: "Neumorphic Interface",
      description: "A study in neumorphic design patterns and accessibility.",
      techStack: ["CSS", "Neumorphism"],
      type: "codepen",
      codeUrl: "https://codepen.io/sufyanhabib/full/dPpyNGb",
      liveUrl: "https://codepen.io/sufyanhabib/full/dPpyNGb",
      image: "https://picsum.photos/seed/cp5/800/450"
    },
    {
      title: "Creative Coding Experiment",
      description: "Generative art and creative coding patterns.",
      techStack: ["Canvas API", "JavaScript"],
      type: "codepen",
      codeUrl: "https://codepen.io/sufyanhabib/pen/rNbboaz",
      liveUrl: "https://codepen.io/sufyanhabib/pen/rNbboaz",
      image: "https://picsum.photos/seed/cp6/800/450"
    },
    {
      title: "Advanced Layout System",
      description: "A robust CSS Grid and Flexbox layout system for complex applications.",
      techStack: ["CSS Grid", "Flexbox"],
      type: "codepen",
      codeUrl: "https://codepen.io/sufyanhabib/full/LYvzMGR",
      liveUrl: "https://codepen.io/sufyanhabib/full/LYvzMGR",
      image: "https://picsum.photos/seed/cp7/800/450"
    }
  ],
  learningJourney: [
    {
      milestone: "Foundations",
      description: "Mastered core web technologies and networking fundamentals during MCA."
    },
    {
      milestone: "Practical Implementation",
      description: "Built real-world network simulations and frontend prototypes."
    },
    {
      milestone: "Advanced Specialization",
      description: "Deepening expertise in React architecture via Frontend Masters and professional labs."
    },
    {
      milestone: "Future: AI Engineering",
      description: "Exploring the integration of LLMs and intelligent agents into modern web products."
    }
  ],
  certifications: [
    { name: "CCNA (Routing & Switching)", status: "Hands-on Practice" },
    { name: "Framework Valley: React Course", status: "Certificate" },
    { name: "The Legend of Python", status: "Certificate" },
    { name: "Hacktoberfest 2023", status: "Digital Badge" }
  ],
  articles: [
    {
      title: "The Intersection of Networking and Frontend Engineering",
      excerpt: "How understanding the OSI model and TCP/IP can make you a better web developer. Exploring latency, packet loss, and browser rendering.",
      date: "Oct 12, 2023",
      readTime: "8 min read",
      category: "Systems",
      slug: "networking-frontend-intersection",
      featured: true
    },
    {
      title: "Building Intelligent Interfaces with React and Gemini",
      excerpt: "Integrating LLMs into modern UI patterns. A guide to building responsive AI-driven components that feel natural and fast.",
      date: "Sep 28, 2023",
      readTime: "12 min read",
      category: "AI",
      slug: "react-gemini-interfaces"
    },
    {
      title: "Mastering CSS Grid for Complex Dashboard Layouts",
      excerpt: "Moving beyond flexbox for data-heavy applications. Real-world examples of robust, responsive grid systems.",
      date: "Aug 15, 2023",
      readTime: "6 min read",
      category: "Frontend",
      slug: "mastering-css-grid"
    },
    {
      title: "Troubleshooting Network Latency in Production Environments",
      excerpt: "A practical guide to using ping, traceroute, and Wireshark to diagnose performance bottlenecks in live systems.",
      date: "Jul 22, 2023",
      readTime: "10 min read",
      category: "Networking",
      slug: "troubleshooting-network-latency"
    }
  ]
};
