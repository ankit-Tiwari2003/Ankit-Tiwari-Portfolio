export const navLinks = [
    {
      id: 1,
      name: 'Home',
      href: '#home',
    },
    {
      id: 2,
      name: 'About',
      href: '#about',
    },
    {
      id: 3,
      name: 'Projects',
      href: '#Projects',
    },
    {
      id: 4,
      name: 'Experience',
      href: '#work',
    },
    {
      id: 5,
      name: 'Contact',
      href: '#contact',
    },
  ];
  
  export const clientReviews = [
    {
      id: 1,
      name: 'Emily Johnson',
      position: 'Marketing Director at GreenLeaf',
      img: 'assets/review1.png',
      review:
        'Working with Adrian was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.',
    },
    {
      id: 2,
      name: 'Mark Rogers',
      position: 'Founder of TechGear Shop',
      img: 'assets/review2.png',
      review:
        'Adrian’s expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He’s a true professional! Fantastic work.',
    },
    {
      id: 3,
      name: 'John Dohsas',
      position: 'Project Manager at UrbanTech ',
      img: 'assets/review3.png',
      review:
        'I can’t say enough good things about Adrian. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.',
    },
    {
      id: 4,
      name: 'Ether Smith',
      position: 'CEO of BrightStar Enterprises',
      img: 'assets/review4.png',
      review:
        'Adrian was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations. His skills in both frontend backend dev are top-notch.',
    },
  ];
  
  export const myProjects = [
    
    {
      title: 'Yoom - Full-Fledged Video Conferencing App Based on zoom',
      desc: 'Yoom is a comprehensive video conferencing platform that allows users to host or join meetings with features like real-time video/audio communication, screen sharing, chat integration, and user management.',
      subdesc:
        'Built with Next.js 14, React, TailwindCSS, TypeScript, and Stream API, VideoConnect demonstrates scalable architecture and responsive design. A practical implementation showcasing advanced frontend and backend integration.',
      href: 'https://video-conferencing-webapp-nyzixoh2r-ankittiwaris-projects.vercel.app', // Replace with your project demo link
      texture: '/textures/project/video-conf.mp4', // Replace with actual project texture path
      logo: '/assets/yoom-logo.svg', // Replace with your project logo path
      logoStyle: {
        backgroundColor: '#20232A',
        border: '0.2px solid #282C34',
        boxShadow: '0px 0px 60px 0px #61DAFB4D',
      },
      spotlight: '/assets/spotlight1.png', // Replace with actual project spotlight path
      tags: [
        {
          id: 1,
          name: 'React.js',
          path: '/assets/react.svg',
        },
        {
          id: 2,
          name: 'TailwindCSS',
          path: '/assets/tailwindcss.png',
        },
        {
          id: 3,
          name: 'TypeScript',
          path: '/assets/typescript.png',
        },
        {
          id: 4,
          name: 'Stream API',
          path: '/assets/stream-api.png', // Replace with the actual Stream API logo path
        },
      ],
    },
    {
      title: 'MERN Chat - Real-Time Chat Application',
      desc: 'MERN Chat is a fully functional real-time chat app that supports features like instant messaging, file sharing via Cloudinary, and secure user authentication.',
      subdesc:
        'Built with the MERN stack (MongoDB, Express, React, Node.js), the app showcases seamless frontend-backend integration. It is deployed on Render (frontend and backend separately) and uses MongoDB Atlas for database management. Although designed as a skill showcase project, it employs JWT-based authentication and encryption for security.',
      href: 'https://mern-chat-webapp-ws37.onrender.com',
      texture: '/textures/project/mern-chat.mp4', 
      logo: '/assets/mernchatlogo.png', 
      logoStyle: {
        backgroundColor: '#18181B',
        border: '0.2px solid #2D2D30',
        boxShadow: '0px 0px 60px 0px #4ADE804D',
      },
      spotlight: '/assets/spotlight2.png', 
      tags: [
        {
          id: 1,
          name: 'React.js',
          path: '/assets/react.svg',
        },
        {
          id: 2,
          name: 'Node.js',
          path: '/assets/nodejs.png',
        },
        {
          id: 3,
          name: 'MongoDB',
          path: '/assets/mongodb.png',
        },
        {
          id: 4,
          name: 'Cloudinary',
          path: '/assets/cloudinary.png',
        },
        {
          id: 5,
          name: 'Express',
          path: '/assets/Express.png', // Replace with the actual JWT logo path
        },
      ],
    }
    
    
  ];
  
  export const calculateSizes = (isSmall, isMobile, isTablet) => {
    return {
      deskScale: isSmall ? 0.08 : isMobile ? 0.05 : 0.065,
  
      // Lower the desk position only for tablet devices
      deskPosition: isTablet ? [0.25, -6.5, 0] : isMobile ? [0.5, -4.5, 0] : [0.25, -4.1, 0],
  
      // Keep other positions the same
      cubePosition: isSmall ? [4, -5, 0] : isMobile ? [5, -5, 0] : isTablet ? [5, -5, 0] : [9, -5.5, 0],
      reactLogoPosition: isSmall ? [5, 5, 0] : isMobile ? [5, 5, 0] : isTablet ? [5.5, 4.5, 0] : [12, 3, 0],
      ringPosition: isSmall ? [-5, 7, 0] : isMobile ? [-10, 10, 0] : isTablet ? [-12, 10, 0] : [-24, 10, 0],
      targetPosition: isSmall ? [-5, -10, -10] : isMobile ? [-9, -10, -10] : isTablet ? [-11, -7, -10] : [-13, -13, -10],
    };
  };
  
  
  export const workExperiences = [
    {
      id: 1,
      name: 'Open to Work',
      pos: 'Full-Stack Developer',
      duration: 'Jan 2025 - Present',
      title: "Currently seeking exciting opportunities to contribute as a Full-Stack Developer. I specialize in building high-performance web applications using Next.js and Node.js, with a focus on creating visually appealing UIs and scalable backend features.",
      icon: '/assets/work.png',
      animation: 'pulse',
    },
    {
      id: 2,
      name: 'iSpecia Technologies',
      pos: 'Web Developer Executive',
      duration: 'Sep 2024 - Jan 2025',
      title: "As a Web Developer Executive at iSpecia Technologies, I focused on creating dynamic web solutions using Next.js and Node.js. Worked on visually appealing UIs and functional backend features with scalable CMS tools.",
      icon: '/assets/ispecialogo.png',
      animation: 'bounce',
    },
    
  ];