'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  // Add any props if needed
}

export function HeroSection({}: HeroSectionProps) {
  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section id="hero" className="relative w-full h-screen">
      <div className="relative w-full min-h-[calc(100vh-var(--height-header))] flex items-center justify-center overflow-hidden flex-col">
        {/* Background Image Marquee */}
        <div className="absolute top-0 w-full h-full max-h-[60vh]">
          <div className="group p-4 [--gap:15px] [gap:var(--gap)] [--duration:60s] absolute inset-0 flex flex-row items-center justify-center overflow-hidden">
            {/* First Marquee Row */}
            <div className="flex shrink-0 justify-around [gap:var(--gap)] h-full animate-marquee flex-row">
              <motion.div variants={fadeIn} className="relative top-4">
                <div className="overflow-hidden rounded-lg shadow-sm h-full">
                  <Image 
                    src="/assets/images/hero/hero-1.svg" 
                    alt="Abstract shapes pattern" 
                    width={270} 
                    height={360}
                    className="w-full h-full object-cover rounded-lg max-w-[270px]"
                  />
                </div>
              </motion.div>
              
              <motion.div variants={fadeIn} className="relative top-[-20px]">
                <div className="overflow-hidden rounded-lg shadow-sm h-full">
                  <Image 
                    src="/assets/images/hero/hero-2.svg" 
                    alt="Grid pattern" 
                    width={270}
                    height={360}
                    className="w-full h-full object-cover rounded-lg max-w-[270px]"
                  />
                </div>
              </motion.div>
              
              <motion.div variants={fadeIn} className="relative top-2">
                <div className="overflow-hidden rounded-lg shadow-sm h-full">
                  <Image 
                    src="/assets/images/hero/hero-3.svg" 
                    alt="Wave pattern" 
                    width={270}
                    height={360}
                    className="w-full h-full object-cover rounded-lg max-w-[270px]"
                  />
                </div>
              </motion.div>
              
              <motion.div variants={fadeIn} className="relative top-[-40px]">
                <div className="overflow-hidden rounded-lg shadow-sm h-full">
                  <Image 
                    src="/assets/images/hero/hero-4.svg" 
                    alt="Concentric circles pattern" 
                    width={270}
                    height={360}
                    className="w-full h-full object-cover rounded-lg max-w-[270px]"
                  />
                </div>
              </motion.div>
              
              <motion.div variants={fadeIn} className="relative top-6">
                <div className="overflow-hidden rounded-lg shadow-sm h-full">
                  <Image 
                    src="/assets/images/hero/hero-5.svg" 
                    alt="Dotted pattern" 
                    width={270}
                    height={360}
                    className="w-full h-full object-cover rounded-lg max-w-[270px]"
                  />
                </div>
              </motion.div>
            </div>
            
            {/* Second Marquee Row (Duplicate for seamless loop) */}
            <div className="flex shrink-0 justify-around [gap:var(--gap)] h-full animate-marquee flex-row">
              <motion.div variants={fadeIn} className="relative top-4">
                <div className="overflow-hidden rounded-lg shadow-sm h-full">
                  <Image 
                    src="/assets/images/hero/hero-1.svg" 
                    alt="Abstract shapes pattern" 
                    width={270} 
                    height={360}
                    className="w-full h-full object-cover rounded-lg max-w-[270px]"
                  />
                </div>
              </motion.div>
              
              <motion.div variants={fadeIn} className="relative top-[-20px]">
                <div className="overflow-hidden rounded-lg shadow-sm h-full">
                  <Image 
                    src="/assets/images/hero/hero-2.svg" 
                    alt="Grid pattern" 
                    width={270}
                    height={360}
                    className="w-full h-full object-cover rounded-lg max-w-[270px]"
                  />
                </div>
              </motion.div>
              
              <motion.div variants={fadeIn} className="relative top-2">
                <div className="overflow-hidden rounded-lg shadow-sm h-full">
                  <Image 
                    src="/assets/images/hero/hero-3.svg" 
                    alt="Wave pattern" 
                    width={270}
                    height={360}
                    className="w-full h-full object-cover rounded-lg max-w-[270px]"
                  />
                </div>
              </motion.div>
              
              <motion.div variants={fadeIn} className="relative top-[-40px]">
                <div className="overflow-hidden rounded-lg shadow-sm h-full">
                  <Image 
                    src="/assets/images/hero/hero-4.svg" 
                    alt="Concentric circles pattern" 
                    width={270}
                    height={360}
                    className="w-full h-full object-cover rounded-lg max-w-[270px]"
                  />
                </div>
              </motion.div>
              
              <motion.div variants={fadeIn} className="relative top-6">
                <div className="overflow-hidden rounded-lg shadow-sm h-full">
                  <Image 
                    src="/assets/images/hero/hero-5.svg" 
                    alt="Dotted pattern" 
                    width={270}
                    height={360}
                    className="w-full h-full object-cover rounded-lg max-w-[270px]"
                  />
                </div>
              </motion.div>
            </div>
            
            {/* Third Marquee Row (For additional content like Hedra site) */}
            <div className="flex shrink-0 justify-around [gap:var(--gap)] h-full animate-marquee flex-row">
              <motion.div variants={fadeIn} className="relative top-4">
                <div className="overflow-hidden rounded-lg shadow-sm h-full">
                  <Image 
                    src="/assets/images/hero/hero-1.svg" 
                    alt="Abstract shapes pattern" 
                    width={270} 
                    height={360}
                    className="w-full h-full object-cover rounded-lg max-w-[270px]"
                  />
                </div>
              </motion.div>
              
              <motion.div variants={fadeIn} className="relative top-[-20px]">
                <div className="overflow-hidden rounded-lg shadow-sm h-full">
                  <Image 
                    src="/assets/images/hero/hero-2.svg" 
                    alt="Grid pattern" 
                    width={270}
                    height={360}
                    className="w-full h-full object-cover rounded-lg max-w-[270px]"
                  />
                </div>
              </motion.div>
              
              <motion.div variants={fadeIn} className="relative top-2">
                <div className="overflow-hidden rounded-lg shadow-sm h-full">
                  <Image 
                    src="/assets/images/hero/hero-3.svg" 
                    alt="Wave pattern" 
                    width={270}
                    height={360}
                    className="w-full h-full object-cover rounded-lg max-w-[270px]"
                  />
                </div>
              </motion.div>
              
              <motion.div variants={fadeIn} className="relative top-[-40px]">
                <div className="overflow-hidden rounded-lg shadow-sm h-full">
                  <Image 
                    src="/assets/images/hero/hero-4.svg" 
                    alt="Concentric circles pattern" 
                    width={270}
                    height={360}
                    className="w-full h-full object-cover rounded-lg max-w-[270px]"
                  />
                </div>
              </motion.div>
              
              <motion.div variants={fadeIn} className="relative top-6">
                <div className="overflow-hidden rounded-lg shadow-sm h-full">
                  <Image 
                    src="/assets/images/hero/hero-5.svg" 
                    alt="Dotted pattern" 
                    width={270}
                    height={360}
                    className="w-full h-full object-cover rounded-lg max-w-[270px]"
                  />
                </div>
              </motion.div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background pointer-events-none"></div>
        </div>

        {/* Hero Content - moved up to overlap with scrolling images */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative flex flex-col items-center justify-center text-center gap-8 max-w-full md:max-w-[650px] mx-auto px-4 mt-0 -mb-20 z-10"
        >
          <h1 className="text-3xl md:text-5xl font-sans font-thin text-zinc-50 leading-tight text-balance">
            The next gen AI <span className="font-bold italic">video creation</span> platform
          </h1>
          <p className="text-md md:text-lg text-zinc-300 font-thin font-sans">
            Create stunning AI videos featuring the best generative technology in your personal AI studio
          </p>
          
          {/* Search/CTA Button */}
          <div className="z-10 relative w-full md:w-[450px]">
            <Link
              href="/app/video"
              className="relative flex items-center group cursor-pointer"
            >
              <input
                type="text"
                placeholder=""
                className="w-full h-[56px] border border-zinc-800 rounded-full px-6 text-zinc-200 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-700 transition-colors backdrop-blur-sm bg-white/10 group-hover:border-zinc-700 pointer-events-none"
                value=""
                readOnly
              />
              <div className="whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary shadow hover:bg-primary/90 h-9 px-4 absolute right-2 bg-gradient-to-l from-[#FF74A2] to-[#FFA487] text-zinc-900 font-semibold py-4 rounded-full text-md tracking-wide flex flex-row items-center justify-center gap-2 overflow-hidden before:absolute before:inset-0 before:bg-[#FFA487] before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-300 group-hover:scale-[102%] transition-all duration-300 ease-out">
                <span className="relative z-10 flex flex-row items-center justify-center gap-2">
                  Try now
                  <ArrowRight className="!w-4 !h-4" />
                </span>
              </div>
            </Link>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FF74A2] to-[#FFA487] blur-[100px] max-w-[200px] mx-auto -z-10 opacity-50"></div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 mb-8"
      >
        <a 
          href="#video" 
          className="flex flex-col items-center gap-2 animate-bounce cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            const videoSection = document.getElementById('video');
            if (videoSection) {
              videoSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'center' // Center the element in the viewport
              });
            }
          }}
        >
          <span className="text-zinc-50 text-lg font-medium">Learn more</span>
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
            <path d="M8 12L2 6L3.4 4.6L8 9.2L12.6 4.6L14 6L8 12Z" fill="currentColor" />
          </svg>
        </a>
      </motion.div>
    </section>
  );
}

export default HeroSection; 