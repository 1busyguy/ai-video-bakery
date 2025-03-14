'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ImageModelCard {
  id: string;
  title: string;
  imageUrl: string;
  logo: string;
}

export function ImageModelsSection() {
  const [activeTab, setActiveTab] = useState<'video' | 'image' | 'audio'>('video');

  // Example image model data
  const imageModels: ImageModelCard[] = [
    {
      id: 'recraft-v3-1',
      title: 'Recraft V3',
      imageUrl: '/assets/images/samples/aurora.jpg',
      logo: '/assets/images/logos/recraft-logo.svg',
    },
    {
      id: 'flux-pro-1',
      title: 'Flux Pro',
      imageUrl: '/assets/images/samples/fantasy.jpg',
      logo: '/assets/images/logos/flux-logo.svg',
    },
    {
      id: 'recraft-v3-2',
      title: 'Recraft V3',
      imageUrl: '/assets/images/samples/ocean.jpg',
      logo: '/assets/images/logos/recraft-logo.svg',
    },
    {
      id: 'flux-pro-2',
      title: 'Flux Pro',
      imageUrl: '/assets/images/samples/business.jpg',
      logo: '/assets/images/logos/flux-logo.svg',
    },
    {
      id: 'recraft-v3-3',
      title: 'Recraft V3',
      imageUrl: '/assets/images/samples/elderly.jpg',
      logo: '/assets/images/logos/recraft-logo.svg',
    },
  ];

  const getTabDescription = () => {
    switch (activeTab) {
      case 'video':
        return 'From lifelike characters to dynamic scenes, generate high-quality videos with unmatched diversity, style, and control';
      case 'image':
        return 'Create stunning AI-generated images for any purpose with just a text prompt';
      case 'audio':
        return 'Generate realistic voice-overs, music, and sound effects with customizable styles and tones';
      default:
        return '';
    }
  };

  const renderVideoContent = () => {
    return (
      <div className="w-full max-w-4xl mx-auto mt-6 mb-12">
        <div className="relative aspect-video rounded-lg overflow-hidden bg-zinc-800 shadow-xl">
          <video
            src="/assets/movies/Landing Video v2.mp4"
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
          {/* Video duration */}
          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs text-white">
            01:24
          </div>
        </div>
      </div>
    );
  };
  
  const renderAudioContent = () => {
    return (
      <div className="w-full max-w-4xl mx-auto mt-6 mb-12">
        <div className="bg-zinc-900 rounded-lg p-8">
          <div className="flex flex-col gap-6">
            {/* Audio waveform visualization */}
            <div className="h-24 bg-zinc-800 rounded-lg overflow-hidden">
              <div className="h-full w-full flex items-center justify-center">
                <div className="flex items-end h-16 gap-1">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="w-1.5 bg-gradient-to-t from-blue-400 to-purple-500"
                      style={{ 
                        height: `${Math.sin(i * 0.4) * 50 + 50}%`,
                        opacity: i > 30 ? 0.3 : 1
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Audio player controls */}
            <div className="flex items-center justify-between">
              <div className="text-white text-sm">00:42 / 01:30</div>
              <div className="flex items-center gap-4">
                <button className="text-white p-2 rounded-full hover:bg-zinc-800">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <polygon points="19 20 9 12 19 4 19 20"></polygon>
                    <line x1="5" y1="19" x2="5" y2="5"></line>
                  </svg>
                </button>
                <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <polygon points="6 3 20 12 6 21 6 3"></polygon>
                  </svg>
                </button>
                <button className="text-white p-2 rounded-full hover:bg-zinc-800">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <polygon points="5 4 15 12 5 20 5 4"></polygon>
                    <line x1="19" y1="5" x2="19" y2="19"></line>
                  </svg>
                </button>
              </div>
              <div className="text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" x2="12" y1="19" y2="22"></line>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderImageContent = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {imageModels.map((model) => (
          <Link 
            href={`/app/${activeTab}`}
            key={model.id}
            className="block bg-black rounded-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
          >
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
              <Image
                src={model.imageUrl}
                alt={model.title}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 p-4 flex flex-col gap-1">
                <div className="w-8 h-8 bg-black/70 rounded-full flex items-center justify-center">
                  <Image 
                    src={model.logo} 
                    alt={`${model.title} logo`} 
                    width={16} 
                    height={16} 
                  />
                </div>
                <span className="text-white font-medium text-sm">{model.title}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <section id="image-models" className="w-full py-20 bg-black">
      <div className="w-full max-w-screen-xl mx-auto px-4">
        {/* HOW IT WORKS Button */}
        <div className="flex justify-center mb-6">
          <button className="px-6 py-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-zinc-300 transition-colors text-sm">
            HOW IT WORKS
          </button>
        </div>

        {/* Main Heading */}
        <h1 className="text-center text-3xl md:text-4xl text-white font-light mb-8">
          Create stunning videos and <br />
          images <span className="italic font-medium">fast</span> all in one platform
        </h1>

        {/* Segmented Control */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center bg-zinc-900 p-1 rounded-full">
            <button 
              className={`px-6 py-2 rounded-full flex items-center gap-2 transition-colors ${
                activeTab === 'video' 
                  ? 'text-zinc-900 bg-zinc-100 font-medium' 
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              onClick={() => setActiveTab('video')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <polygon points="6 3 20 12 6 21 6 3"></polygon>
              </svg>
              Video
            </button>
            <button 
              className={`px-6 py-2 rounded-full flex items-center gap-2 transition-colors ${
                activeTab === 'image' 
                  ? 'text-zinc-900 bg-zinc-100 font-medium' 
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              onClick={() => setActiveTab('image')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                <circle cx="9" cy="9" r="2"></circle>
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
              </svg>
              Image
            </button>
            <button 
              className={`px-6 py-2 rounded-full flex items-center gap-2 transition-colors ${
                activeTab === 'audio' 
                  ? 'text-zinc-900 bg-zinc-100 font-medium' 
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              onClick={() => setActiveTab('audio')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" x2="12" y1="19" y2="22"></line>
              </svg>
              Audio
            </button>
          </div>
        </div>

        {/* Section Title */}
        <h2 className="text-center text-zinc-200 font-light text-xl mb-8 max-w-3xl mx-auto">
          {getTabDescription()}
        </h2>

        {/* Content based on active tab */}
        {activeTab === 'video' && renderVideoContent()}
        {activeTab === 'image' && renderImageContent()}
        {activeTab === 'audio' && renderAudioContent()}

        {/* Navigation Arrows (only for image tab) */}
        {activeTab === 'image' && (
          <div className="flex justify-center gap-2 mt-12">
            <button className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="m15 18-6-6 6-6"></path>
              </svg>
            </button>
            <button className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ImageModelsSection; 