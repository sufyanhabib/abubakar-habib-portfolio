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
    resumeUrl: "#", // Placeholder
    avatarUrl: "input_file_0.png",
    valueProp: "Engineering robust systems and crafting refined interfaces with a foundation in networking and a trajectory into AI."
  },
  about: {
    story: "With a Master of Computer Applications (MCA) and a solid foundation in network engineering, I bring a unique systems-thinking approach to frontend development. I don't just build UI; I understand the infrastructure that powers it. My journey began with routing and switching, which instilled a discipline for troubleshooting and architectural clarity that I now apply to building modern, performant web applications. I am currently focused on mastering advanced React patterns while exploring the intersection of software engineering and intelligent systems."
  },
  skills: [
    {
      category: "Frontend Engineering",
      icon: Code2,
      items: ["React", "JavaScript (ES6+)", "TypeScript", "Tailwind CSS", "Framer Motion", "Responsive Design", "HTML5/CSS3"]
    },
    {
      category: "Network Infrastructure",
      icon: Network,
      items: ["IP Addressing & Subnetting", "VLAN Segmentation", "Switching & Routing", "OSPF & Static Routing", "Cisco CLI", "Troubleshooting (Ping/Traceroute)"]
    },
    {
      category: "Systems & Tools",
      icon: Terminal,
      items: ["Git & GitHub", "Windows Server 2022", "Cisco Packet Tracer", "VS Code", "DNS & DHCP Basics", "Network Security Fundamentals"]
    },
    {
      category: "Future Direction",
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
      period: "2021 - 2023",
      description: "Starting point of the technical journey, mastering core computer science fundamentals.",
      achievements: [
        "Focused on systems, networking, and software engineering.",
        "Built foundational projects in C, Java, and Web Technologies."
      ]
    }
  ],
  projects: [
    {
      title: "Wall of Wonder",
      description: "A premium photography collection platform designed with a focus on visual hierarchy and seamless user experience.",
      problem: "Creating a high-performance image gallery that maintains aesthetic polish across all device sizes.",
      solution: "Implemented a responsive grid system with optimized asset loading and refined typography to showcase high-quality photography.",
      tags: ["React", "Tailwind CSS", "UI Design"],
      github: "#",
      demo: "#"
    },
    {
      title: "Feed-A-Star-Mole",
      description: "An interactive, browser-based game that demonstrates complex state management and CSS animation techniques.",
      problem: "Synchronizing game logic with fluid animations to create an engaging user experience.",
      solution: "Leveraged JavaScript state management and CSS keyframes to build a responsive, high-frame-rate interactive experience.",
      tags: ["JavaScript", "CSS Animations", "Game Logic"],
      github: "#",
      demo: "#"
    },
    {
      title: "Systems Portfolio",
      description: "A production-ready portfolio architecture (this site) built to showcase the intersection of networking and frontend engineering.",
      problem: "Communicating a multi-disciplinary background in a coherent, recruiter-friendly narrative.",
      solution: "Designed a modular React system with Framer Motion for premium storytelling and shadcn/ui for professional polish.",
      tags: ["React", "Framer Motion", "shadcn/ui"],
      github: "#",
      demo: "#"
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
    { name: "CCNA (Routing & Switching)", status: "Ongoing Hands-on Practice" },
    { name: "Framework Valley: React Course", status: "Certificate" },
    { name: "The Legend of Python", status: "Certificate" },
    { name: "Hacktoberfest 2023", status: "Digital Badge" }
  ]
};
