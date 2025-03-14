'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface VideoShowcaseProps {
  // Add any props if needed
}

export function VideoShowcase({}: VideoShowcaseProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section id="video" className="py-20">
      <div className="relative w-full max-w-screen-xl mx-auto overflow-hidden px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16 leading-tight max-w-2xl mx-auto"
        >
          <h2 className="text-3xl font-sans font-thin mb-2 text-zinc-200">
            Introducing AI Video Bakery with <span className="font-bold italic">AI-Powered</span> Video Creation
          </h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
          className="aspect-video relative group cursor-pointer rounded-xl"
          onClick={togglePlayPause}
        >
          <div className={`absolute inset-0 bg-background/60 group-hover:bg-background/40 z-10 transition-all duration-500 ease-out rounded-xl ${isPlaying ? 'opacity-0' : 'opacity-100'}`}></div>
          
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <button 
                className="w-20 h-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 ease-out group-hover:scale-110" 
                aria-label="Play video"
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlayPause();
                }}
              >
                <svg 
                  className="w-12 h-12 text-white fill-white translate-x-[2px]" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 20 20" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m16.26 8.71-11-6.503c-.893-.528-2.262-.015-2.262 1.29v13.004c0 1.172 1.272 1.878 2.263 1.29l11-6.5c.98-.578.984-2.003 0-2.58Z" stroke="None"></path>
                </svg>
              </button>
            </div>
          )}
          
          <video 
            ref={videoRef}
            id="video-preview" 
            className="w-full h-full object-cover rounded-xl"
            poster="/assets/images/hero/video.jpg"
            playsInline
            muted
            onEnded={() => setIsPlaying(false)}
          >
            <source src="/assets/movies/Video v45.2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      </div>
    </section>
  );
}

export default VideoShowcase; 