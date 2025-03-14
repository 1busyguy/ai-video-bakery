import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { VideoShowcase } from '@/components/home/VideoShowcase';
import { ImageModelsSection } from '@/components/home/ImageModelsSection';
import { CommunitySpotlight } from '@/components/home/CommunitySpotlight';
import { FaqSection } from '@/components/home/FaqSection';
import { CtaSection } from '@/components/home/CtaSection';

export default function Home() {
  return (
    <div className="relative flex h-full min-h-screen flex-col bg-background">
      <Header />
      <div className="h-full flex flex-col items-center gap-20">
        <HeroSection />
        <VideoShowcase />
        <ImageModelsSection />
        <CommunitySpotlight />
        <FaqSection />
        <CtaSection />
      </div>
      <Footer />
    </div>
  );
} 