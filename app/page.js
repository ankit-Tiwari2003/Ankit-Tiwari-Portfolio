'use client'
import React from 'react'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import WorkExperience from './sections/Experience'
import ErrorBoundary from './components/ErrorBoundary'
import SectionErrorBoundary from './components/SectionErrorBoundary'
import CustomCursor from './components/CustomCursor'

const Home = () => {
  return (
    <ErrorBoundary>
      <CustomCursor />
      <main className='max-width-7xl mx-auto'>
        <SectionErrorBoundary name="Navbar">
          <Navbar/>
        </SectionErrorBoundary>
        
        <SectionErrorBoundary name="Hero">
          <Hero/>
        </SectionErrorBoundary>
        
        <SectionErrorBoundary name="About">
          <About/>
        </SectionErrorBoundary>
        
        <SectionErrorBoundary name="Projects">
          <Projects/>
        </SectionErrorBoundary>
        
        <SectionErrorBoundary name="Experience">
          <WorkExperience/>
        </SectionErrorBoundary>
        
        <SectionErrorBoundary name="Contact">
          <Contact/>
        </SectionErrorBoundary>
        
        <SectionErrorBoundary name="Footer">
          <Footer/>
        </SectionErrorBoundary>
      </main>
    </ErrorBoundary>
  )
}

export default Home