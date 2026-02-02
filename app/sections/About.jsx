'use client'
import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { fadeInUp } from '../utils/animations';

// Dynamically import the Globe component with SSR disabled
const Globe = dynamic(() => import('react-globe.gl'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-[326px] flex items-center justify-center bg-gradient-to-b from-gray-900 to-black-300 rounded-3xl">
      <div className="text-center">
        <p className="text-gray-400 text-sm mb-2">🌍 Loading globe...</p>
        <div className="animate-spin w-6 h-6 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full mx-auto"></div>
      </div>
    </div>
  ),
  ssr: false
});

// Fallback component if Globe fails to load
const GlobeFallback = () => (
  <div className="w-full h-[326px] flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black-300 rounded-3xl backdrop-blur-sm border border-cyan-400/20">
    <div className="text-3xl mb-2">🌍</div>
    <p className="text-gray-400 text-xs">Interactive Globe</p>
  </div>
);
import Button from '../components/Button.jsx';

const About = () => {
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    // Animate grid containers on scroll
    fadeInUp('.grid-container', {
      duration: 0.8,
      stagger: 0.15,
      delay: 0,
    });
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText('ankittiwari3690@gmail.com');
    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  return (
    <section className="c-space my-20" id="about">
      <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <img src="assets/avatar.png" alt="profile" className="w-full sm:h-[276px] h-fit object-contain" />

            <div>
              <div className="flex items-center gap-2 mb-2">
                <p className="grid-headtext">👨‍💻 Solution Builder</p>
              </div>
              <p className="grid-subtext">
                I transform complex requirements into elegant, scalable solutions. My approach: understand the problem deeply, build what's actually needed, and deliver clean, maintainable code. 2+ years of shipping production systems that work.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <img src="assets/grid2.5.png" alt="tech" className="w-full sm:h-[276px] h-fit object-contain" />

            <div>
              <div className="flex items-center gap-2 mb-2">
                <p className="grid-headtext">⚙️ Tech Stack</p>
              </div>
              <div className="space-y-3">
                <p className="grid-subtext text-sm">
                  <span className="accent-blue font-semibold">Frontend:</span> React, Next.js, Tailwind, Three.js
                </p>
                <p className="grid-subtext text-sm">
                  <span className="accent-purple font-semibold">Backend:</span> Node.js, Express, MongoDB, SQL
                </p>
                <p className="grid-subtext text-sm">
                  <span className="accent-cyan font-semibold">Tools:</span> Git, Docker, REST APIs, WebSockets
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-4">
          <div className="grid-container">
            <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center">
              <Globe
                height={326}
                width={326}
                backgroundColor="rgba(0, 0, 0, 0)"
                backgroundImageOpacity={0.5}
                showAtmosphere
                showGraticules
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                labelsData={[{ lat: 40, lng: -100, text: 'Rjieka, Croatia', color: 'white', size: 15 }]}
                
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <p className="grid-headtext">🌍 Always Available</p>
              </div>
              <p className="grid-subtext mb-4">
                Located in Dehradun, India. Open to remote opportunities worldwide and on-site work across India.
              </p>
              <div className="flex gap-2 flex-wrap mb-4">
                <span className="badge-blue">Remote-First</span>
                <span className="badge-purple">Flexible Hours</span>
                <span className="badge-cyan">Fast Response</span>
              </div>
              <Button name="Let's Connect" isBeam containerClass="w-full" />
            </div>
          </div>
        </div>

        <div className="xl:col-span-2 xl:row-span-3">
          <div className="grid-container">
            <img src="assets/grid3.png" alt="approach" className="w-full sm:h-[266px] h-fit object-contain" />

            <div>
              <div className="flex items-center gap-2 mb-2">
                <p className="grid-headtext">🎯 Problem-Solver Mindset</p>
              </div>
              <div className="space-y-2">
                <p className="grid-subtext text-sm">
                  <span className="accent-blue">✓</span> Listen first, code second
                </p>
                <p className="grid-subtext text-sm">
                  <span className="accent-purple">✓</span> Build with scalability in mind
                </p>
                <p className="grid-subtext text-sm">
                  <span className="accent-cyan">✓</span> Performance & user experience matter
                </p>
                <p className="grid-subtext text-sm">
                  <span className="accent-blue">✓</span> Ship fast, iterate smarter
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="xl:col-span-1 xl:row-span-2">
          <div className="grid-container">
            <img
              src="assets/grid4.png"
              alt="grid-4"
              className="w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top"
            />

            <div className="space-y-3">
              <p className="grid-headtext text-center">📧 Drop Me a Line</p>
              <div className="copy-container" onClick={handleCopy}>
                <img src={hasCopied ? 'assets/tick.svg' : 'assets/copy.svg'} alt="copy" />
                <p className="lg:text-lg md:text-sm font-medium text-white hover:accent-blue transition-colors">
                  ankittiwari3690@gmail.com
                </p>
              </div>
              <p className="text-xs text-gray-500 text-center">Click to copy</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;