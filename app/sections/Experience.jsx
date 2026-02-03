// import { Suspense, useState } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';

// import Developer from '../components/Developer';
// import CanvasLoader from '../components/Loading.jsx';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { workExperiences } from '../constants/index.js';

gsap.registerPlugin(ScrollTrigger);

const WorkExperience = () => {
  const scrollTriggerRefs = useRef([]);

  useEffect(() => {
    // Animate title
    gsap.set('.experience-title', { opacity: 0, y: 20 });
    gsap.to('.experience-title', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.experience-title',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    // Animate work items with reduced stagger for performance
    gsap.set('.work-content_container', { opacity: 0, x: -40 });
    gsap.to('.work-content_container', {
      opacity: 1,
      x: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.work-content',
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    // Add glow effects to work items on hover with optimized handlers
    const workItems = document.querySelectorAll('.work-content_container');
    const glowHandlers = [];
    const glows = ['glow-cyan', 'glow-purple', 'glow-blue', 'glow-pink'];

    workItems.forEach((item, index) => {
      const glowClass = glows[index % glows.length];

      // Use pointer events for better performance
      const handlePointerEnter = () => {
        item.classList.add(glowClass);
      };
      
      const handlePointerLeave = () => {
        item.classList.remove(glowClass);
      };

      item.addEventListener('pointerenter', handlePointerEnter, { passive: true });
      item.addEventListener('pointerleave', handlePointerLeave, { passive: true });
      glowHandlers.push({ item, handlePointerEnter, handlePointerLeave });
    });

    // Cleanup
    return () => {
      glowHandlers.forEach(({ item, handlePointerEnter, handlePointerLeave }) => {
        item.removeEventListener('pointerenter', handlePointerEnter);
        item.removeEventListener('pointerleave', handlePointerLeave);
      });
      
      // Kill ScrollTrigger instances for this section
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger?.classList?.contains('experience-title') || 
            trigger.trigger?.classList?.contains('work-content')) {
          trigger.kill();
        }
      });
      
      gsap.killTweensOf('.experience-title, .work-content_container');
    };
  }, []);

  return (
    <section className="c-space my-20" id="work">
      <div className="w-full text-white-600">
        <p className="head-text experience-title">My Work Experience</p>

        <div className="work-container">
          {/* <div className="work-canvas">
            <Canvas>
              <ambientLight intensity={7} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <directionalLight position={[10, 10, 10]} intensity={1} />
              <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} />

              <Suspense fallback={<CanvasLoader />}>
                <Developer position-y={-3} scale={3} animationName={animationName} />
              </Suspense>
            </Canvas>
          </div> */}

          <div className="work-content lg:w-[95vw]">
            <div className="sm:py-10 py-5 sm:px-5 px-2.5">
              {workExperiences.map((item, index) => (
                <div
                  key={index}
                //   onClick={() => setAnimationName(item.animation.toLowerCase())}
                //   onPointerOver={() => setAnimationName(item.animation.toLowerCase())}
                //   onPointerOut={() => setAnimationName('idle')}
                  className="work-content_container group">
                  <div className="flex flex-col h-full justify-start items-center py-2">
                    <div className="work-content_logo">
                      <img className="w-full h-full" src={item.icon} alt="" />
                    </div>

                    <div className="work-content_bar" />
                  </div>

                  <div className="sm:p-5 px-2.5 py-5">
                    <p className="font-bold text-white-800">{item.name}</p>
                    <p className="text-sm mb-5">
                      {item.pos} -- <span>{item.duration}</span>
                    </p>
                    <p className="group-hover:text-white transition-all ease-in-out duration-500">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;