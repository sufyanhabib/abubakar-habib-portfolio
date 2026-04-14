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
      id: "cmd-basics",
      title: {
        hinglish: "Command Line Basics in Hinglish: Ek Quick Guide",
        english: "Command Line Basics: A Quick Guide for Developers"
      },
      excerpt: {
        hinglish: "Command line ek text-based interface hai jo aapke computer ke operating system ke liye hota hai. Keyboard se commands chalana seekhein.",
        english: "The command line is a text-based interface for your computer's operating system. Learn how to run commands directly from your keyboard."
      },
      category: "Tutorials",
      tags: ["CLI", "Systems", "Basics"],
      readTime: "10 min read",
      publishedAt: "Oct 15, 2023",
      featured: true,
      content: {
        hinglish: [
          {
            heading: "Command Line Kya Hai?",
            text: "Command line ek text-based interface hai jo aapke computer ke operating system ke liye hota hai. Yahan aap keyboard ka use karke commands chalate ho jo aapke computer par alag-alag kaam karte hain, jaise navigation karna aur files ko move karna!",
            code: "$ pwd\n/Users/abubakar-habib"
          },
          {
            heading: "Pehli Command: echo",
            text: "Pehli command jo aap use karoge wo hai echo command. Ye command line ka 'print statement' jaisa hota hai kyunki ye jo bhi aap echo ke baad type karte hain use print karta hai."
          }
        ],
        english: [
          {
            heading: "What is the Command Line?",
            text: "The command line is a text-based interface for your computer's operating system. Here, you use the keyboard to run commands that perform various tasks on your computer, such as navigation and moving files!",
            code: "$ pwd\n/Users/abubakar-habib"
          },
          {
            heading: "Your First Command: echo",
            text: "The first command you'll use is the echo command. It's like the 'print statement' of the command line because it prints whatever you type after the echo keyword."
          }
        ]
      }
    },
    {
      id: "cmd-expansion",
      title: {
        hinglish: "Command Line Essentials: Terminal Foundations",
        english: "Command Line Essentials: Terminal Foundations"
      },
      excerpt: {
        hinglish: "Command line interface (CLI) ke basics se lekar advanced manipulation tak. Filesystem navigate karna aur files manage karna seekhein.",
        english: "From CLI basics to advanced file manipulation. Learn to navigate the filesystem and manage files like a pro."
      },
      category: "Tutorials",
      tags: ["CLI", "Terminal", "Bash", "Systems"],
      readTime: "25 min read",
      publishedAt: "Oct 20, 2023",
      content: {
        hinglish: [
           {
            
  heading: "01. In The Beginning...",
  blocks: [
    { type: "heading", value: "A Brief History" },
    { type: "paragraph", value: "Welcome to the first chapter of the Command Line course! 🖥️" },
    { type: "paragraph", value: "Command line ek text-based interface hai jo aapke computer ke operating system ke liye hota hai. Yahan aap keyboard ka use karke commands chalate ho jo aapke computer par alag-alag kaam karte hain, jaise navigation karna aur files aur folders ko move karna!" },
    { type: "paragraph", value: "1970s se, command line interface (CLI) humein apne computer systems ke sath interact karne ki suvidha deti aa rahi hai via keyboard pe type ki gayi commands ke through. Jabki graphical user interfaces (GUI) 80s aur 90s me mainstream ho gayi thi, command line developer community ke andar aaj bhi popular hai." },
    { type: "heading", value: "Aapke computer par, command line icon aisa dikhta hai:" },
    { type: "image", src: "https://user7921.na.imgto.link/public/20260414/chatgpt-image-apr-14-2026-08-29-53-pm-1.avif", alt: "Command line icons for macOS and Windows" },
    { type: "bullets", value: [
      "Mac: Command line ko Terminal ke naam se jaana jata hai.",
      "Windows: Isay Command Prompt (ya \"CMD\" short me) kaha jata hai."
    ]},
    { type: "heading", value: "Aaj bhi, command line par kaam karne ke kuch advantages hain GUI applications ke mukable:" },
    { type: "bullets", value: [
      "Common tasks ko automate karna sirf 1 ya 2 commands se ho sakta hai.",
      "Ye computer ki processing power kam use karti hai.",
      "Specific resources (jaise files aur folders) ko target karna easier hota hai."
    ]},
    { type: "paragraph", value: "Aur aap movies ke hacker jaise feel karte hain! 😎" },
    { type: "paragraph", value: "Is chapter me, hum apne machine par command line ko navigate karna seekhenge." },
    { type: "heading", value: "Instructions" },
    { type: "paragraph", value: "Chalo ek quick demo karte hain command line ka apna introduction dekar!" },
    { type: "bullets", value: [
      "Mac users: Command line ko access karne ke liye, Command + Space se Spotlight on karke \"Terminal\" search karein.",
      "Windows users: Aapko Git Bash download karna padega taaki is mein use ki gayi commands ko use kar sakein. Download here: https://git-scm.com/downloads"
    ]},
    { type: "paragraph", value: "Note: Windows par Git Bash use karte samay, hamesha forward slash / character ka use karein." },
    { type: "paragraph", value: "Pehli command jo aap use karoge wo hai echo command. Ye command line ka \"print statement\" jaisa hota hai kyunki ye jo bhi aap echo ke baad type karte hain use print karta hai." },
    { type: "code", value: "$ echo Hi! My name is ..." },
    { type: "paragraph", value: "Note: $ prompt symbol type mat karein. Ye sirf indicate karta hai ki kaunsa line type kiya gaya hai aur kaunsa output hai." },
    { type: "paragraph", value: "... ko apne naam se replace karein aur Enter press karein aur dekhein command line aapka naam print karegi!" },
    { type: "paragraph", value: "Bonus: Agar aap Mac par hain, to ek special text-to-speech say command bhi hai. Kuch aise run karke dekhein:" },
    { type: "code", value: "$ say Hi! My name is ..." },
    { type: "paragraph", value: "Aur aapka computer literally aapse baat karega speakers ke through! 🤯" },
    { type: "heading", value: "02. Filesystem" },
    { type: "paragraph", value: "Directories Aapka computer essentially ek filesystem hai jo folders aur files se bana hota hai:"},
    { type: "image", src: "https://user7921.na.imgto.link/public/20260414/cli-directory-structure-and-commands-guide.avif", alt: "cli-directory-structure-and-commands-guide" },    
     { type: "paragraph", value: "Command line ke context me, hum folders ko directories ke roop me refer karte hain."},
     { type: "paragraph", value: "Kisi bhi diye gaye directory ke andar ye ho sakta hai:"},
     { type: "bullets", value: [
      "Aur directories (jo subdirectories ke roop me bhi jaane jaate hain).",
      "Files jo content ke saath hote hain (text, image, ya video files)."
    ]},
    { type: "heading", value: "Print Working Directory: pwd" },
    { type: "paragraph", value: "Aapke computer ka filesystem pehle me intimidating ho sakta hai, aur aasani se lost ho jaana possible hai."},
    { type: "paragraph", value: " Working directory wo jagah hai jahaan aap command line pe currently hain."},
    { type: "paragraph", value: "Yahaan pwd command ka use aata hai; ye \"print working directory\" ka short hai. "},
    { type: "code", value: "$ pwd/Users/dwight-schrute..." },
    { type: "paragraph", value: "Iska matlab hai ki hum currently /Users/dwight-schrute pe working directory me hain, jo root Users folder ke andar ek dwight-schrute folder hai."},
    { type: "heading", value: "Instructions" },
    { type: "paragraph", value: "Chaliye dekhte hain ki hamare filesystem me default working directory kya hai! 📂"},
    { type: "paragraph", value: "Command line ko open karne ke baad, pwd ka use karke current working directory ko print karein."},
    { type: "paragraph", value: "Abhi command line me working directory kya hai?"}
  ]
},
{
  heading: "03. Moving Day",
  blocks: [
    { type: "heading", value: "Change Directory: cd" },
    { type: "paragraph", value: "Ab hum command line ko kaise open karna hai aur apni computer ke filesystem me hum kis directory pe hain, yeh dekhna seekh gaye hain." },
    { type: "paragraph", value: "Par hum actually filesystem me navigate kaise karte hain command line ke through? Hum yeh cd (change directory) command ke saath karte hain!" },
    { type: "code", value: "$ cd directory-name" },
    { type: "paragraph", value: "directory-name wo directory hai jisme hum change karna chahte hain (yeh naya current directory ban jata hai)." },
    { type: "paragraph", value: "Maan lo aapka username dwight-schrute hai aur aap currently us directory me hain:" },
    { type: "code", value: "$ pwd\n/Users/dwight-schrute/" },
    { type: "paragraph", value: "Aapka username bhi ek directory hai jo aur directories ko contain karti hai, including aapke computer ka desktop! Hum cd command ka use karke us Desktop directory me move kar sakte hain:" },
    { type: "code", value: "$ cd Desktop\n$ pwd\n/Users/dwight-schrute/Desktop" },

    { type: "heading", value: "List Content: ls" },
    { type: "paragraph", value: "Par rukko, aap kaise hamesha jaan sakte hain ki jo aap cd ke next type kar rahe hain wo ek valid directory name hai? Ek command hai jo hamare current directory ke neeche sabhi sub-directories ko list out karti hai!" },
    { type: "paragraph", value: "Hum ls list command ka use kar sakte hain taaki sabhi directories aur files jo hamare current working directory ke directly neeche exist karte hain, unhe dikhaya ja sake. Maan lo hum dwight-schrute directory me hain:" },
    { type: "code", value: "$ ls\nDesktop\nDocuments\nImages\nscript.js\ndundie-awards.txt" },
    { type: "paragraph", value: "ls command run karne se yeh show hota hai ki teen sub-directories hain (Desktop, Documents, aur Images) aur do files hain, script.js aur dundie-awards.txt." },

    { type: "heading", value: "Instructions" },
    { type: "paragraph", value: "Is chapter ke dauran, hum ek house directory explore karenge, jo aap yahan se download kar sakte hain: Download here" },
    { type: "paragraph", value: "Isse apne desktop par save kar lo aur folder ko unzip karo. Phir, cd command ka use karke house directory me change karo." },
    { type: "paragraph", value: "Phir sab directories aur files ko neeche view karo. Aapko yeh dekhna chahiye:" },
    { type: "bullets", value: ["bedroom", "kitchen", "bathroom", "dining-room", "living-room"] }
  ]
},
{
  heading: "04. House Tour",
  blocks: [
    { type: "heading", value: "Traversing the Filesystem" },
    { type: "paragraph", value: "Command line par, cd type karke valid directory name ke sath hum apne current directory ko filesystem me \"aage\" move karte hain, jaise neeche dikhaya gaya hai:" },
    { type: "paragraph", value: "Par yeh sab nahi jo cd command kar sakta hai! Oh no. Iska use hum \"piche\" jane ke liye bhi kar sakte hain filesystem me, using two periods." },
    { type: "code", value: "$ pwd\n/Users/dwight-schrute/schrute-farms\n$ cd ..\n$ pwd\n/Users/dwight-schrute/" },
    { type: "paragraph", value: ".. double-dot syntax ka use hume filesystem me ek level piche ya upar le jaata hai." },
    { type: "paragraph", value: "Ek directory at a time karna thoda tiring ho sakta hai. Is case me, hum forward slash / ka use karke ek command me multiple directories up ya down move kar sakte hain:" },
    { type: "code", value: "$ cd ../..\n$ pwd\n/Users/" },

    { type: "heading", value: "Viewing File Content" },
    { type: "paragraph", value: "Agar hume file ke andar ka content dekhna hai (jaise ek text-based .txt file ya Python .py file), to hum cat command ka use kar sakte hain! 😻" },
    { type: "code", value: "$ pwd\n/Users/dwight-schrute/schrute-farms/\n$ cat beets.txt\nI have 100 beets!" },
    { type: "paragraph", value: "cat command sab text-based content ko file se command line par print karega." },
    { type: "paragraph", value: "Note: echo command ka use bhi file content dekhne ke liye ho sakta hai, par cat command zyada commonly use hota hai." },

    { type: "heading", value: "Instructions" },
    { type: "paragraph", value: "Chaliye directories change karna practice karte hain aur house directory ko \"tour\" karte hain jo humne pehle download kiya tha!" },
    { type: "bullets", value: [
      "House directory se, kitchen directory me change karein.",
      "Phir, ls command ka use karke directory ke content ko view karein.",
      "cat command ka use karke pata lagayein ki peanut butter jar aur jelly kaha hain.",
      "Ab, double period .. syntax ka use karke wapas main house directory me change karein."
    ]},
    { type: "paragraph", value: "Yeh diagram dikhata hai house directory aur uske contents kaise organized hain:" }
  ]
},
{
  heading: "05. Clean Slate",
  blocks: [
    { type: "heading", value: "Clearing the Command Line" },
    { type: "paragraph", value: "Phew! Humne command line par kaafi typing kar li hai! Aur kya aapne notice kiya hai ki agar aap scroll up karte hain to aap sabhi pehle run ki gayi commands dekh sakte hain?" },
    { type: "paragraph", value: "Jabki yeh kuch logon ko bother nahi karta, aap soch rahe honge ki kya koi tarika hai \"clean the slate\" karne ka aur command line ko clear karne ka. Bilkul hai!" },
    { type: "paragraph", value: "clear command sab kuch view se hata deta hai command line par. Lekin, aap apni pehle ki commands ko scroll up karke ab bhi dekh sakte hain." },

    { type: "heading", value: "Keyboard Shortcuts" },
    { type: "paragraph", value: "Jaise aap soch sakte hain, command line zyadatar keyboard se work hoti hai. Jabki aapne kuch awesome commands seekhi aur run ki hain, kuch keyboard shortcuts bhi hain jo similar kaam karte hain." },

    { type: "heading", value: "Command History" },
    { type: "paragraph", value: "Ek bahut helpful shortcut hai aapke keyboard ke ↑ aur ↓ arrow keys ka use karke automatically wo commands lana jo aapne pehle likhi thi." },
    { type: "paragraph", value: "Yeh ek total game-changer aur time-saver hai. Ek command ko type ya retype karne ke bajaye, aap simply is shortcut se usay wapas la sakte hain!" },

    { type: "heading", value: "Tab" },
    { type: "paragraph", value: "Ek aur keyboard shortcut hai jo aapke command line par type karte samay use hota hai!" },
    { type: "paragraph", value: "Command line par type karte samay, tab key ka use existing file ya directory ke names ko auto-complete karne ke liye hota hai:" },
    { type: "bullets", value: [
      "Other command line commands.",
      "Ek existing file ya directory ka name."
    ]},
    { type: "paragraph", value: "Yeh shortcut errors ko reduce karne ke liye kaafi useful ho sakta hai." },

    { type: "heading", value: "Instructions" },
    { type: "paragraph", value: "House directory ke andar rehte hue, chaliye jo humne seekha usay try karte hain!" },
    { type: "bullets", value: [
      "Living-room directory me change karein, phir shelf directory me.",
      "Phir, books.txt file ka content dekhein.",
      "Phir, wapas house directory me change karein.",
      "Ab, clear command ka use karke command line screen ko clear karein!"
    ]}
  ]
},
{
  heading: "06. Scavenger Hunt",
  blocks: [
    { type: "heading", value: "Congrats!" },
    { type: "paragraph", value: "Hooray! Aap chapter ke end tak pahunch gaye hain aur course ka aadha hissa complete kar chuke hain! 🎊" },
    { type: "paragraph", value: "Is chapter me humne yeh seekha:" },
    { type: "bullets", value: [
      "Command line ka brief history.",
      "echo command ka use karke apna input kaise print karein.",
      "Filesystem kya hai aur directories (folders) kaise kaam karte hain.",
      "Filesystem ko ls aur cd commands ke sath kaise dekhein aur traverse karein.",
      "cat command ka use karke file ka content kaise dekhein.",
      "Command line ko kaise clear karein aur keyboard shortcuts ka use karke past commands ko revisit karein."
    ]},
    { type: "paragraph", value: "Humne command line ka use karke apne computer ko navigate kiya aur ek house folder explore kiya." },

    { type: "heading", value: "Instructions" },
    { type: "paragraph", value: "Ab scavenger hunt ka samay hai! Kahin scavenger-hunt directory ke andar ek hidden treasure hai. Kya ho sakta hai?" },
    { type: "paragraph", value: "Pehle, zipped file ko download karein: Download here" },
    { type: "paragraph", value: "Phir, scavenger-hunt directory me change karein." },
    { type: "paragraph", value: "Is directory me multiple clues hain jo hume hidden treasure tak le ja sakti hain. Chaliye command line navigation ka use karke ise dhoondhein!" },
    { type: "paragraph", value: "Refresher ke liye, yeh commands ka breakdown hai jo aapko use karna chahiye:" },
    { type: "table", value: [
      ["echo output-here", "Jo typed hai is command ke sath use print karein"],
      ["pwd", "Current working directory ko print karein"],
      ["cat file-name.extension", "Ek file ka content print karein"],
      ["ls", "Current directory ke contents ko list karein"],
      ["cd directory-name", "Ek existing directory me change karein"],
      ["cd ..", "Ek existing directory me piche change karein"],
      ["cd directory-name/sub-directory-name", "Multiple directories me aage change karein"],
      ["cd ../..", "Multiple directories me piche change karein"],
      ["clear", "Command line ko clear karein"]
    ]},
    { type: "paragraph", value: "Shuru karne ke liye pehla clue dekhein:" },
    { type: "code", value: "$ cat welcome.txt" },
    { type: "paragraph", value: "Happy scavenging!" }
  ]
}
        ],
        english: [
          {
            heading: "01. In The Beginning...",
            blocks: [
              { type: "heading", value: "A Brief History" },
              { type: "paragraph", value: "Welcome to the first chapter of the Command Line course! 🖥️" },
              { type: "paragraph", value: "The command line is a text-based interface for your computer's operating system. Here, you use the keyboard to run commands that perform various tasks on your computer, such as navigation and moving files and folders!" },
              { type: "paragraph", value: "Since the 1970s, the command line interface (CLI) has provided a way to interact with computer systems through commands typed on the keyboard. While graphical user interfaces (GUI) became mainstream in the 80s and 90s, the command line remains popular within the developer community today." },
              { type: "heading", value: "On your computer, the command line icon looks like this:" },
              { type: "image", src: "https://user7921.na.imgto.link/public/20260414/chatgpt-image-apr-14-2026-08-29-53-pm-1.avif", alt: "Command line icons for macOS and Windows" },
              { type: "bullets", value: [
                "Mac: The command line is known as Terminal.",
                "Windows: It is called Command Prompt (or \"CMD\" for short)."
              ]},
              { type: "heading", value: "Even today, working on the command line has some advantages over GUI applications:" },
              { type: "bullets", value: [
                "Automating common tasks can be done with just 1 or 2 commands.",
                "It uses less of the computer's processing power.",
                "Targeting specific resources (like files and folders) is easier."
              ]},
              { type: "paragraph", value: "And you feel like a hacker from the movies! 😎" },
              { type: "paragraph", value: "In this chapter, we will learn to navigate the command line on our machine." },
              { type: "heading", value: "Instructions" },
              { type: "paragraph", value: "Let's do a quick demo of the command line by introducing yourself!" },
              { type: "bullets", value: [
                "Mac users: To access the command line, search for \"Terminal\" using Spotlight (Command + Space).",
                "Windows users: You will need to download Git Bash to use the commands used here. Download here: https://git-scm.com/downloads"
              ]},
              { type: "paragraph", value: "Note: When using Git Bash on Windows, always use the forward slash / character." },
              { type: "paragraph", value: "The first command you will use is the echo command. This is like the \"print statement\" of the command line because it prints whatever you type after echo." },
              { type: "code", value: "$ echo Hi! My name is ..." },
              { type: "paragraph", value: "Note: Do not type the $ prompt symbol. It only indicates which line was typed and which is the output." },
              { type: "paragraph", value: "... replace with your name and press Enter and see the command line will print your name!" },
              { type: "paragraph", value: "Bonus: If you are on a Mac, there is also a special text-to-speech say command. Try running it like this:" },
              { type: "code", value: "$ say Hi! My name is ..." },
              { type: "paragraph", value: "And your computer will literally talk to you through the speakers! 🤯" },
              { type: "heading", value: "02. Filesystem" },
              { type: "paragraph", value: "Directories Your computer is essentially a filesystem made of folders and files:" },
              { type: "image", src: "https://user7921.na.imgto.link/public/20260414/cli-directory-structure-and-commands-guide.avif", alt: "cli-directory-structure-and-commands-guide" },
              { type: "paragraph", value: "In the context of the command line, we refer to folders as directories." },
              { type: "paragraph", value: "Inside any given directory, there can be:" },
              { type: "bullets", value: [
                "More directories (also known as subdirectories).",
                "Files that contain content (text, image, or video files)."
              ]},
              { type: "heading", value: "Print Working Directory: pwd" },
              { type: "paragraph", value: "Your computer's filesystem can be intimidating at first, and it's possible to get lost easily." },
              { type: "paragraph", value: "The working directory is the location where you are currently positioned in the command line." },
              { type: "paragraph", value: "This is where the pwd command comes in; it's short for \"print working directory\"." },
              { type: "code", value: "$ pwd/Users/dwight-schrute..." },
              { type: "paragraph", value: "This means we are currently in the /Users/dwight-schrute working directory, which is a dwight-schrute folder inside the root Users folder." },
              { type: "heading", value: "Instructions" },
              { type: "paragraph", value: "Let's see what the default working directory is in our filesystem! 📂" },
              { type: "paragraph", value: "After opening the command line, use pwd to print the current working directory." },
              { type: "paragraph", value: "What is the current working directory in the command line?" }
            ]
          },
          {
            heading: "03. Moving Day",
            blocks: [
              { type: "heading", value: "Change Directory: cd" },
              { type: "paragraph", value: "Now we know how to open the command line and see which directory we are in on our computer's filesystem." },
              { type: "paragraph", value: "But how do we actually navigate the filesystem through the command line? We do this with the cd (change directory) command!" },
              { type: "code", value: "$ cd directory-name" },
              { type: "paragraph", value: "directory-name is the directory we want to change into (this becomes the new current directory)." },
              { type: "paragraph", value: "Suppose your username is dwight-schrute and you are currently in that directory:" },
              { type: "code", value: "$ pwd\n/Users/dwight-schrute/" },
              { type: "paragraph", value: "Your username is also a directory that contains more directories, including your computer's desktop! We can move into that Desktop directory using the cd command:" },
              { type: "code", value: "$ cd Desktop\n$ pwd\n/Users/dwight-schrute/Desktop" },
              { type: "heading", value: "List Content: ls" },
              { type: "paragraph", value: "But wait, how can you always know that what you are typing next to cd is a valid directory name? There is a command that lists all sub-directories under our current directory!" },
              { type: "paragraph", value: "We can use the ls list command to show all directories and files that exist directly under our current working directory. Suppose we are in the dwight-schrute directory:" },
              { type: "code", value: "$ ls\nDesktop\nDocuments\nImages\nscript.js\ndundie-awards.txt" },
              { type: "paragraph", value: "Running the ls command shows that there are three sub-directories (Desktop, Documents, and Images) and two files, script.js and dundie-awards.txt." },
              { type: "heading", value: "Instructions" },
              { type: "paragraph", value: "During this chapter, we will explore a house directory, which you can download from here: Download here" },
              { type: "paragraph", value: "Save it to your desktop and unzip the folder. Then, change into the house directory using the cd command." },
              { type: "paragraph", value: "Then view all directories and files below. You should see:" },
              { type: "bullets", value: ["bedroom", "kitchen", "bathroom", "dining-room", "living-room"] }
            ]
          },
          {
            heading: "04. House Tour",
            blocks: [
              { type: "heading", value: "Traversing the Filesystem" },
              { type: "paragraph", value: "On the command line, by typing cd with a valid directory name, we move \"forward\" in the filesystem from our current directory, as shown below:" },
              { type: "paragraph", value: "But that's not all the cd command can do! Oh no. We can also use it to go \"back\" in the filesystem, using two periods." },
              { type: "code", value: "$ pwd\n/Users/dwight-schrute/schrute-farms\n$ cd ..\n$ pwd\n/Users/dwight-schrute/" },
              { type: "paragraph", value: "The .. double-dot syntax takes us one level back or up in the filesystem." },
              { type: "paragraph", value: "Doing one directory at a time can be a bit tiring. In this case, we can move multiple directories up or down in one command using the forward slash /:" },
              { type: "code", value: "$ cd ../..\n$ pwd\n/Users/" },
              { type: "heading", value: "Viewing File Content" },
              { type: "paragraph", value: "If we want to see the content inside a file (like a text-based .txt file or a Python .py file), we can use the cat command! 😻" },
              { type: "code", value: "$ pwd\n/Users/dwight-schrute/schrute-farms/\n$ cat beets.txt\nI have 100 beets!" },
              { type: "paragraph", value: "The cat command will print all text-based content from the file to the command line." },
              { type: "paragraph", value: "Note: The echo command can also be used to see file content, but the cat command is more commonly used." },
              { type: "heading", value: "Instructions" },
              { type: "paragraph", value: "Let's practice changing directories and \"tour\" the house directory we downloaded earlier!" },
              { type: "bullets", value: [
                "From the house directory, change into the kitchen directory.",
                "Then, use the ls command to view the contents of the directory.",
                "Use the cat command to find out where the peanut butter jar and jelly are.",
                "Now, change back to the main house directory using the double period .. syntax."
              ]},
              { type: "paragraph", value: "This diagram shows how the house directory and its contents are organized:" }
            ]
          },
          {
            heading: "05. Clean Slate",
            blocks: [
              { type: "heading", value: "Clearing the Command Line" },
              { type: "paragraph", value: "Phew! We've done a lot of typing on the command line! And have you noticed that if you scroll up, you can see all the previously run commands?" },
              { type: "paragraph", value: "While this doesn't bother some people, you might be wondering if there's a way to \"clean the slate\" and clear the command line. There absolutely is!" },
              { type: "paragraph", value: "The clear command removes everything from view on the command line. However, you can still see your previous commands by scrolling up." },
              { type: "heading", value: "Keyboard Shortcuts" },
              { type: "paragraph", value: "As you might imagine, the command line is mostly operated by keyboard. While you've learned and run some awesome commands, there are also some keyboard shortcuts that do similar things." },
              { type: "heading", value: "Command History" },
              { type: "paragraph", value: "A very helpful shortcut is using the ↑ and ↓ arrow keys on your keyboard to automatically bring up commands you've written before." },
              { type: "paragraph", value: "This is a total game-changer and time-saver. Instead of typing or retyping a command, you can simply bring it back with this shortcut!" },
              { type: "heading", value: "Tab" },
              { type: "paragraph", value: "There is another keyboard shortcut used while typing on your command line!" },
              { type: "paragraph", value: "While typing on the command line, the tab key is used to auto-complete the names of existing files or directories:" },
              { type: "bullets", value: [
                "Other command line commands.",
                "The name of an existing file or directory."
              ]},
              { type: "paragraph", value: "This shortcut can be quite useful for reducing errors." },
              { type: "heading", value: "Instructions" },
              { type: "paragraph", value: "While inside the house directory, let's try what we've learned!" },
              { type: "bullets", value: [
                "Change into the living-room directory, then the shelf directory.",
                "Then, look at the content of the books.txt file.",
                "Then, change back to the house directory.",
                "Now, clear the command line screen using the clear command!"
              ]}
            ]
          },
          {
            heading: "06. Scavenger Hunt",
            blocks: [
              { type: "heading", value: "Congrats!" },
              { type: "paragraph", value: "Hooray! You've reached the end of the chapter and completed half of the course! 🎊" },
              { type: "paragraph", value: "In this chapter, we learned:" },
              { type: "bullets", value: [
                "A brief history of the command line.",
                "How to print your input using the echo command.",
                "What a filesystem is and how directories (folders) work.",
                "How to view and traverse the filesystem with the ls and cd commands.",
                "How to view file content using the cat command.",
                "How to clear the command line and revisit past commands using keyboard shortcuts."
              ]},
              { type: "paragraph", value: "We used the command line to navigate our computer and explored a house folder." },
              { type: "heading", value: "Instructions" },
              { type: "paragraph", value: "Now it's time for a scavenger hunt! Somewhere inside the scavenger-hunt directory is a hidden treasure. What could it be?" },
              { type: "paragraph", value: "First, download the zipped file: Download here" },
              { type: "paragraph", value: "Then, change into the scavenger-hunt directory." },
              { type: "paragraph", value: "There are multiple clues in this directory that can lead us to the hidden treasure. Let's find it using command line navigation!" },
              { type: "paragraph", value: "For a refresher, here is a breakdown of the commands you should use:" },
              { type: "table", value: [
                ["echo output-here", "Print what is typed with this command"],
                ["pwd", "Print the current working directory"],
                ["cat file-name.extension", "Print the content of a file"],
                ["ls", "List the contents of the current directory"],
                ["cd directory-name", "Change into an existing directory"],
                ["cd ..", "Change back into an existing directory"],
                ["cd directory-name/sub-directory-name", "Change forward into multiple directories"],
                ["cd ../..", "Change back through multiple directories"],
                ["clear", "Clear the command line"]
              ]},
              { type: "paragraph", value: "Check the first clue to get started:" },
              { type: "code", value: "$ cat welcome.txt" },
              { type: "paragraph", value: "Happy scavenging!" }
            ]
          }
        ]
      }
    },
    {
      id: "dns-explained",
      title: {
        hinglish: "DNS matlab Internet ki Phonebook: Simple Explanation",
        english: "DNS: The Phonebook of the Internet Explained Simply"
      },
      excerpt: {
        hinglish: "Jab aap browser me google.com type karte ho, toh piche kya hota hai? DNS ke concepts ko Hinglish me samjhein.",
        english: "What happens behind the scenes when you type google.com? Understand DNS concepts in a simple way."
      },
      category: "Networking",
      tags: ["DNS", "Networking", "Web"],
      readTime: "8 min read",
      publishedAt: "Oct 05, 2023",
      content: {
        hinglish: [
          {
            heading: "DNS Ka Role",
            text: "DNS matlab Domain Name System. Ye internet ki phonebook ki tarah hai. Jab aap browser me google.com type karte ho, toh DNS use IP address me convert karta hai taaki aapka computer server se connect ho sake."
          }
        ],
        english: [
          {
            heading: "The Role of DNS",
            text: "DNS stands for Domain Name System. It's like the phonebook of the internet. When you type google.com in your browser, DNS converts it into an IP address so your computer can connect to the server."
          }
        ]
      }
    },
    {
      id: "react-ai-ui",
      title: {
        hinglish: "React aur Gemini se Intelligent Interfaces Banana",
        english: "Building Intelligent Interfaces with React and Gemini"
      },
      excerpt: {
        hinglish: "LLMs ko modern UI patterns me integrate karna. AI-driven components banane ki practical guide.",
        english: "Integrating LLMs into modern UI patterns. A practical guide to building AI-driven components."
      },
      category: "AI",
      tags: ["React", "AI", "Gemini"],
      readTime: "12 min read",
      publishedAt: "Sep 28, 2023",
      content: {
        hinglish: [
          {
            heading: "AI Integration",
            text: "Modern UI me AI integrate karna sirf API call nahi hai. Hume user experience aur performance ka bhi dhyan rakhna padta hai."
          }
        ],
        english: [
          {
            heading: "AI Integration",
            text: "Integrating AI into modern UI is more than just an API call. We must consider user experience and performance carefully."
          }
        ]
      }
    }
  ]
};
