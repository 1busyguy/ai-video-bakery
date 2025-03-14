'use client';

import React from 'react';
import Link from 'next/link';

interface CommunityProject {
  id: string;
  title: string;
  videoUrl: string;
  creator: string;
}

export function CommunitySpotlight() {
  // Sample community projects data - mapped to actual video files
  const communityProjects: CommunityProject[] = [
    {
      id: 'grandmas-cookies',
      title: "Grandma's Cookies",
      videoUrl: '/assets/movies/Grandma_s Cookies_Made By Brian.mp4',
      creator: 'Brian',
    },
    {
      id: 'hair-oil-commercial',
      title: 'Hair Oil Commercial',
      videoUrl: '/assets/movies/Hair Oil Commercial_Made by Andrew.mp4',
      creator: 'Andrew',
    },
    {
      id: 'skydiver',
      title: 'Skydiver',
      videoUrl: '/assets/movies/Skydiver_Made by Lauren.mp4',
      creator: 'Lauren',
    },
    {
      id: 'rooftop',
      title: 'The Rooftop',
      videoUrl: '/assets/movies/The Rooftop_Made By Jack.mp4',
      creator: 'Jack',
    },
    {
      id: 'cat-takeover',
      title: 'Cat Takeover',
      videoUrl: '/assets/movies/Cat Takeover_Made By Clara.mp4',
      creator: 'Clara',
    },
  ];

  return (
    <section className="w-full py-20 bg-black">
      <div className="w-full max-w-screen-xl mx-auto px-4">
        {/* Section Label */}
        <div className="flex justify-center mb-6">
          <div className="px-6 py-2 rounded-full bg-zinc-900 text-zinc-400 text-sm">
            SHOWCASE
          </div>
        </div>

        {/* Section Title */}
        <h2 className="text-center text-3xl md:text-4xl text-white font-light mb-4">
          Community spotlight
        </h2>

        {/* Section Description */}
        <p className="text-center text-zinc-400 max-w-2xl mx-auto mb-12">
          Explore a showcase of the most innovative and diverse creations. 
          Want to be featured? Start creating today!
        </p>

        {/* Community Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {communityProjects.map((project) => (
            <Link 
              href={`/community/${project.id}`} 
              key={project.id}
              className="block overflow-hidden group"
            >
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                <video 
                  src={project.videoUrl}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  muted
                  loop
                  playsInline
                  autoPlay
                />
                {/* Play button overlay that appears on hover */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                      <polygon points="6 3 20 12 6 21 6 3"></polygon>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <h3 className="text-white font-medium">{project.title}</h3>
                <p className="text-zinc-500 text-sm">Made by {project.creator}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center gap-2 mt-12">
          <button className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="m15 18-6-6 6-6"></path>
            </svg>
          </button>
          <button className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default CommunitySpotlight; 