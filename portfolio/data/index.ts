import { link } from "fs";

export const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Blogs", link: "#Blog" }, 
  { name: "Credentials", link: "#credentials" }, 
  { name: "Contact", link: "#contact" },  
];


  
  export const gridItems = [
    {
      id: 1,
      title: "I thrive in dynamic team environments and am passionate about building efficient, user-friendly web solutions. ",
      description: "",
      className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
      imgClassName: "w-full h-full",
      titleClassName: "justify-end",
      img: "/b1.svg",
      spareImg: "",
    },
    {
      id: 2,
      title: "I'm very flexible with time zone communications",
      description: "",
      className: "lg:col-span-2 md:col-span-3 md:row-span-2",
      imgClassName: "",
      titleClassName: "justify-start",
      img: "",
      spareImg: "",
    },
    {
      id: 3,
      title: "My tech stack",
      description: "I constantly try to improve",
      className: "lg:col-span-2 md:col-span-3 md:row-span-2",
      imgClassName: "",
      titleClassName: "justify-center",
      img: "",
      spareImg: "",
    },
    {
      id: 4,
      title: "Tech enthusiast.",
      description: "",
      className: "lg:col-span-2 md:col-span-3 md:row-span-1",
      imgClassName: "",
      titleClassName: "justify-start",
      img: "/grid.svg",
      spareImg: "/b4.svg",
    },
    {
      id: 5,
      title: "u tube clone ",
      description: "Currently Building  a comprehensive replica of  u tube, featuring a user-friendly interface and full functionality",
      className: "md:col-span-3 md:row-span-2",
      imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
      titleClassName: "justify-center md:justify-start lg:justify-center",
      img: "/b5.svg",  // Update this image path if necessary
      spareImg: "/grid.svg",
    }
    
    
,
    {
      id: 6,
      title: "Do you want to start a project together?",
      description: "",
      className: "lg:col-span-2 md:col-span-3 md:row-span-1",
      imgClassName: "",
      titleClassName: "justify-center md:max-w-full max-w-60 text-center",
      img: "",
      spareImg: "",
    },
  ];
  
  export const projects = [
    {
      "id": 1,
      "title": "Email-Spam-Detection-",
      "des": "This project focuses on developing a machine learning model to classify emails as either spam or not spam (ham). The primary objective is to leverage natural language processing (NLP) and machine learning algorithms to accurately detect spam emails",
      "img": "/p1.svg",
      iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/three.svg", "/c.svg"],
      "link": "https://github.com/gaurayushi/Email-Spam-Detection-"
    }
,    
    {
      id: 2,
      title: "NewsStream ",
      des: "NewsStream is an automated platform that aggregates the latest news from around the world. It leverages a powerful API to fetch and filter, storing them in a database for easy access..",
      img: "/p2.svg",
      iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/stream.svg", "/c.svg"],
      link: "",
    },
    /* 
    {
      id: 3,
      title: "AI Image SaaS - Canva Application",
      des: "A REAL Software-as-a-Service app with AI features and a payments and credits system using the latest tech stack.",
      img: "/p3.svg",
      iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/three.svg", "/c.svg"],
      link: "",
    },
    {
      id: 4,
      title: "Animated Apple Iphone 3D Website",
      des: "Recreated the Apple iPhone 15 Pro website, combining GSAP animations and Three.js 3D effects..",
      img: "/p4.svg",
      iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/three.svg", "/gsap.svg"],
      link: "",
    },

    */
  ];
  

  export const Blogs = [
    {
      id: 1,
       img: "node.jpg",
       title: " Mastering Node.js File Exports: covering everything you need to know !!covering everything you need to know ",
       className: "md:col-span-4",
      link: "https://youtu.be/4whWw45c464?si=_lNxjNyJBqXTJvMQ",
    },
   
    {
      id: 2,
      img:"workgit.png",
      title: "Git & Github !!! ",
      className: "md:col-span-2",
      link:" ",
    },
  ];
  




  
export const Credentials = [
    {
      id: 1,
      title: "Frontend  Intern Program ",
      desc: "Participated in the Codsoft Intern Program, where I completed various tasks and projects assigned by the team. Gained hands-on experience with React.js and contributed to the development of a web-based platform, enhancing its interactivity and user experience.",
      className: "md:col-span-2",
      thumbnail: "/exp1.svg",
      img: " ",
      
    },
    {
      id: 2,
      title: "NSS IT Cell Member - Nss gehu",
      desc: "As an NSS IT Cell Member, contributed to the optimization of the organization's website for better search engine visibility. Implemented SEO best practices, including keyword optimization, meta tags, and improving site speed, which enhanced the overall performance and accessibility of the site.",
      className: "md:col-span-2",
      thumbnail: "/exp2.svg",
       link:'https://www.linkedin.com/feed/update/urn:li:activity:7194752399838752768/',
    },

  {
    id: 3,
    title: "Front End Development  ",
    desc: "Responsive Web Design Certification, Infosys Springboard",
    className: "md:col-span-2",
  thumbnail: "/exp3.svg",
  link: 'https://www.linkedin.com/in/ayushi-gaur-72a060299/overlay/1724253614636/single-media-viewer/?profileId=ACoAAEgWuhIBKy_RTBvrchYEBepkMk98_6_qi-4',
  },
  {
    id: 4,
    title: "C Programming Training ,IIT Bombay",
    desc: " Successfully completed with  score of 82.50%..",
    className: "md:col-span-2",
    thumbnail: "/exp4.svg",
    link:'https://www.linkedin.com/in/ayushi-gaur-72a060299/overlay/1723085622981/single-media-viewer/?profileId=ACoAAEgWuhIBKy_RTBvrchYEBepkMk98_6_qi-4',
  },
];

  export const socialMedia = [
    {
      id: 1,
      img: "/git.svg",
      link:"https://github.com/gaurayushi "
    },
    {
      id: 2,
      img: "/leet.png",
      link:"https://leetcode.com/u/gaurayushi/",
    },
    {
      id: 3,
      img: "/link.png",
      link:" https://www.linkedin.com/in/ayushi-gaur-72a060299/",
    },
  ];
