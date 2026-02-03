import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Suspense, useState, useEffect, lazy } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls } from '@react-three/drei';
import { myProjects } from '../constants/index.js';
import CanvasLoader from '../components/Loading.jsx';
import { addCardHoverEffect, addGlowEffect } from '../utils/hoverEffects.js';

gsap.registerPlugin(ScrollTrigger);

const DemoComputer = lazy(() => import('../components/DemoComputer.jsx'));

const projectCount = myProjects.length;

const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [show3D, setShow3D] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setShow3D(window.innerWidth > 768); // Show 3D only for large devices
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Add hover effects to project cards and links
    addCardHoverEffect('.project-content', 1.01);
    addGlowEffect('.project-link', '#64ffda');

    // Add glow effect to project cards with proper cleanup
    const projectContent = document.querySelector('.project-content');
    if (projectContent) {
      const handleMouseEnter = () => projectContent.classList.add('glow-cyan-lg');
      const handleMouseLeave = () => projectContent.classList.remove('glow-cyan-lg');

      projectContent.addEventListener('mouseenter', handleMouseEnter);
      projectContent.addEventListener('mouseleave', handleMouseLeave);

      // Cleanup
      return () => {
        projectContent.removeEventListener('mouseenter', handleMouseEnter);
        projectContent.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [selectedProjectIndex]);

  const handleNavigation = (direction) => {
    setSelectedProjectIndex((prevIndex) => {
      if (direction === 'previous') {
        return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
      } else {
        return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  useGSAP(() => {
    // Title animation
    gsap.set('.projects-title', { opacity: 0, y: 20 });
    gsap.to('.projects-title', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.projects-title',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    gsap.fromTo(
      `.animatedText`,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.inOut' }
    );

    // Scroll trigger for project content
    gsap.set('.project-content', { opacity: 0, y: 40 });
    gsap.to('.project-content', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.project-content',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  }, [selectedProjectIndex]);

  const currentProject = myProjects[selectedProjectIndex];

  return (
    <section className="c-space my-20" id='Projects'>
      <p className="head-text projects-title">Skill Showcase Projects</p>
      <div className={`grid ${show3D ? 'lg:grid-cols-2' : 'grid-cols-1'} mt-12 gap-5 w-full`}>
        {/* Left Content */}
        <div className="project-content flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200">
          <div className="absolute top-0 right-0">
            <img 
              src={currentProject.spotlight} 
              alt="spotlight" 
              className="w-full h-96 object-cover rounded-xl"
            />
          </div>
          <div 
            className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg" 
            style={currentProject.logoStyle}
          >
            <img className="w-10 h-10 shadow-sm" src={currentProject.logo} alt="logo" />
          </div>
          <div className="flex flex-col gap-5 text-white-600 my-5">
            <p className="text-white text-2xl font-semibold animatedText">
              {currentProject.title}
            </p>
            <p className="animatedText">{currentProject.desc}</p>
            <p className="animatedText">{currentProject.subdesc}</p>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-5">
            <div className="flex items-center gap-3">
              {currentProject.tags.map((tag, index) => (
                <div key={index} className="tech-logo">
                  <img src={tag.path} alt={tag.name} />
                </div>
              ))}
            </div>
            <a
              className="project-link flex items-center gap-2 cursor-pointer text-white-600 transition-all duration-300 hover:text-white"
              href={currentProject.href}
              target="_blank"
              rel="noreferrer"
            >
              <p>Check Live Site</p>
              <img src="/assets/arrow-up.png" alt="arrow" className="w-3 h-3" />
            </a>
          </div>
          <div className="flex justify-between items-center mt-7">
            <button 
              className="arrow-btn" 
              onClick={() => handleNavigation('previous')}
            >
              <img src="/assets/left-arrow.png" alt="left arrow" />
            </button>
            <button 
              className="arrow-btn" 
              onClick={() => handleNavigation('next')}
            >
              <img src="/assets/right-arrow.png" alt="right arrow" className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* 3D Content - Render only on large devices */}
        {show3D && (
          <div className="border border-black-300 bg-black-200 rounded-lg h-96 md:h-full">
            <Canvas
              dpr={[1, 1.5, 2]}
              performance={{ min: 0.5 }}
              gl={{ 
                powerPreference: "high-performance",
                antialias: false,
                alpha: false 
              }}
            >
              <ambientLight intensity={Math.PI} />
              <directionalLight position={[10, 10, 5]} />
              <Center>
                <Suspense fallback={<CanvasLoader />}>
                  <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]}>
                    <DemoComputer texture={currentProject.texture} />
                  </group>
                </Suspense>
              </Center>
              <OrbitControls 
                maxPolarAngle={Math.PI / 2} 
                enableZoom={false}
                enableDamping={true}
                dampingFactor={0.05}
              />
            </Canvas>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
