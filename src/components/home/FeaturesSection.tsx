'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Image, Mic } from 'lucide-react';

interface FeaturesSectionProps {
  // Add any props if needed
}

export function FeaturesSection({}: FeaturesSectionProps) {
  const [activeTab, setActiveTab] = useState<'video' | 'image' | 'audio'>('video');

  return (
    <section id="demo" className="py-20">
      <div className="flex flex-col items-center justify-center w-full px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-secondary/80 bg-zinc-900 border-zinc-800 text-zinc-400 px-6 py-2 rounded-full text-sm !font-medium border-none tracking-wider uppercase">
            HOW IT WORKS
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center mb-8 leading-tight max-w-2xl mx-auto text-balance"
        >
          <h2 className="text-3xl font-sans font-thin text-zinc-200">
            Create stunning videos and images <span className="font-bold italic">fast</span> all in one platform
          </h2>
        </motion.div>

        <div dir="ltr" data-orientation="horizontal" className="w-full max-w-screen-xl min-h-[750px] mx-auto">
          <div 
            role="tablist" 
            aria-orientation="horizontal" 
            className="items-center justify-center bg-muted p-1 text-muted-foreground grid w-full grid-cols-3 gap-2 max-w-xs mx-auto border border-zinc-800 rounded-full px-1 py-1 h-full text-xl" 
            tabIndex={-1} 
            data-orientation="horizontal"
          >
            <button 
              type="button" 
              role="tab" 
              aria-selected={activeTab === 'video'} 
              className={`inline-flex items-center justify-center whitespace-nowrap px-3 py-1 text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-zinc-400 hover:bg-zinc-800 transition-colors h-8 rounded-full
                ${activeTab === 'video' ? 'bg-zinc-300 text-zinc-800' : ''}`}
              onClick={() => setActiveTab('video')}
            >
              <Play className="w-4 h-4 mr-2" />
              Video
            </button>
            <button 
              type="button" 
              role="tab" 
              aria-selected={activeTab === 'image'}
              className={`inline-flex items-center justify-center whitespace-nowrap px-3 py-1 text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-zinc-400 hover:bg-zinc-800 transition-colors h-8 rounded-full
                ${activeTab === 'image' ? 'bg-zinc-300 text-zinc-800' : ''}`}
              onClick={() => setActiveTab('image')}
            >
              <Image className="w-4 h-4 mr-2" />
              Image
            </button>
            <button 
              type="button" 
              role="tab" 
              aria-selected={activeTab === 'audio'}
              className={`inline-flex items-center justify-center whitespace-nowrap px-3 py-1 text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-zinc-400 hover:bg-zinc-800 transition-colors h-8 rounded-full
                ${activeTab === 'audio' ? 'bg-zinc-300 text-zinc-800' : ''}`}
              onClick={() => setActiveTab('audio')}
            >
              <Mic className="w-4 h-4 mr-2" />
              Audio
            </button>
          </div>
          
          <div 
            data-state={activeTab === 'video' ? 'active' : 'inactive'} 
            data-orientation="horizontal"
            role="tabpanel"
            className={`ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-6 max-w-screen-lg mx-auto ${activeTab !== 'video' ? 'hidden' : ''}`}
          >
            <div className="text-center mb-12 leading-tight mx-auto text-balance">
              <h2 className="text-lg font-sans font-thin mb-2 text-zinc-400">
                From lifelike characters to dynamic scenes, generate high-quality videos with unmatched diversity, style, and control
              </h2>
            </div>
            <div className="relative w-full mx-auto rounded-xl overflow-hidden">
              <div className="aspect-video relative">
                <video 
                  autoPlay
                  playsInline
                  muted
                  loop
                  className="w-full h-full object-cover rounded-xl shadow-2xl" 
                  poster="/assets/images/hero/video.jpg"
                >
                  <source src="/assets/videos/landing-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
          
          <div 
            data-state={activeTab === 'image' ? 'active' : 'inactive'} 
            data-orientation="horizontal" 
            role="tabpanel"
            className={`ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-6 ${activeTab !== 'image' ? 'hidden' : ''}`}
          >
            <div className="text-center mb-12 leading-tight mx-auto text-balance">
              <h2 className="text-lg font-sans font-thin mb-2 text-zinc-400">
                Create stunning AI-generated images for any purpose with just a text prompt
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto max-w-4xl">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-lg overflow-hidden"
              >
                <img src="/assets/images/samples/sample-1.jpg" alt="AI Generated Image" className="w-full h-auto" />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-lg overflow-hidden"
              >
                <img src="/assets/images/samples/sample-2.jpg" alt="AI Generated Image" className="w-full h-auto" />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-lg overflow-hidden"
              >
                <img src="/assets/images/samples/sample-3.jpg" alt="AI Generated Image" className="w-full h-auto" />
              </motion.div>
            </div>
          </div>
          
          <div 
            data-state={activeTab === 'audio' ? 'active' : 'inactive'} 
            data-orientation="horizontal" 
            role="tabpanel"
            className={`ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-6 ${activeTab !== 'audio' ? 'hidden' : ''}`}
          >
            <div className="text-center mb-12 leading-tight mx-auto text-balance">
              <h2 className="text-lg font-sans font-thin mb-2 text-zinc-400">
                Generate natural-sounding voiceovers, background music, and sound effects for your videos
              </h2>
            </div>
            <div className="max-w-2xl mx-auto">
              <div className="bg-zinc-900 p-6 rounded-xl">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                        <Mic className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">Professional Male Voice</h3>
                        <p className="text-zinc-400 text-sm">Clear, articulate voiceover</p>
                      </div>
                    </div>
                    <button className="bg-zinc-700 hover:bg-zinc-600 text-white rounded-full p-2">
                      <Play className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                        <Mic className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">Friendly Female Voice</h3>
                        <p className="text-zinc-400 text-sm">Warm, approachable tone</p>
                      </div>
                    </div>
                    <button className="bg-zinc-700 hover:bg-zinc-600 text-white rounded-full p-2">
                      <Play className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                        <Mic className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">Cinematic Background</h3>
                        <p className="text-zinc-400 text-sm">Epic orchestral soundtrack</p>
                      </div>
                    </div>
                    <button className="bg-zinc-700 hover:bg-zinc-600 text-white rounded-full p-2">
                      <Play className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection; 