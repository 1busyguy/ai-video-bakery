'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, MessageSquare, Send } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  // Add any props if needed
}

export function FaqSection({}: FaqSectionProps) {
  const [openItem, setOpenItem] = useState<number | null>(0);

  const faqItems: FaqItem[] = [
    {
      question: "What is AI Video Bakery?",
      answer: "AI Video Bakery is a content creation platform that allows users to generate high-quality videos, images, and audio. It combines advanced AI technology with intuitive tools to streamline the content creation process for creators, marketers, and businesses."
    },
    {
      question: "How do I get started with AI video creation?",
      answer: "Simply sign up for an account, navigate to the Video section, enter a detailed description of the video you want to create, select your preferred style and settings, and click Generate. The AI will do the rest!"
    },
    {
      question: "How do I generate a general-purpose video?",
      answer: "Go to the Video section, describe what you want in your video, set parameters like style, length, and quality, then click Generate. You can further customize the result with our editing tools."
    },
    {
      question: "How do I generate an image?",
      answer: "Navigate to the Image section, enter a detailed prompt describing the image you want, select style options, and click Generate. You can refine your results by adjusting settings like aspect ratio, style, and more."
    },
    {
      question: "What kind of videos can I make?",
      answer: "You can create a wide variety of videos, including explainers, product demonstrations, social media content, advertisements, educational content, and more. Our AI adapts to many styles and formats."
    },
    {
      question: "How many free generations do I get each day?",
      answer: "Free users receive a limited number of video and image generations per day. For unlimited access and higher quality outputs, consider upgrading to one of our premium plans."
    },
    {
      question: "Can I add voiceovers or AI-generated speech?",
      answer: "Yes! Our platform features advanced text-to-speech technology that can generate natural-sounding voiceovers in multiple languages and voice styles. You can add these directly to your videos."
    },
    {
      question: "What are the benefits of upgrading to a premium plan?",
      answer: "Premium plans offer higher resolution outputs, more generations per day, advanced editing features, priority processing, access to exclusive models and styles, and commercial usage rights."
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <section id="faq" className="w-full py-20">
      <div className="w-full px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-secondary/80 bg-zinc-900 border-zinc-800 text-zinc-400 px-6 py-2 rounded-full text-sm !font-medium border-none tracking-wider uppercase">
            FAQS
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center mb-16 leading-tight max-w-2xl mx-auto"
        >
          <h2 className="text-3xl font-thin mb-2 text-zinc-200 font-bold italic">AI Video Bakery FAQ</h2>
          <p className="text-lg text-zinc-400 font-thin">Find answers to commonly asked questions</p>
        </motion.div>

        {/* Support Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16 w-full max-w-[864px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="rounded-xl border text-card-foreground shadow bg-zinc-900 border-zinc-900"
          >
            <div className="flex flex-col space-y-1.5 p-6 pb-2">
              <MessageSquare className="!h-6 !w-6 mb-4" />
              <h3 className="text-2xl font-bold font-normal">Join Discord</h3>
            </div>
            <div className="p-6 pt-0 text-zinc-400 font-sans text-sm">Connect with our growing community.</div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="rounded-xl border text-card-foreground shadow bg-zinc-900 border-zinc-900"
          >
            <div className="flex flex-col space-y-1.5 p-6 pb-2">
              <Send className="!h-6 !w-6 mb-4" />
              <h3 className="text-2xl font-bold font-normal">Give us feedback</h3>
            </div>
            <div className="p-6 pt-0 text-zinc-400 font-sans text-sm">Share suggestions, improvements and more.</div>
          </motion.div>
        </div>

        {/* FAQ Accordion */}
        <div className="flex justify-center">
          <div className="max-w-[640px] w-full" data-orientation="vertical">
            {faqItems.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                viewport={{ once: true }}
                data-state={openItem === index ? "open" : "closed"} 
                data-orientation="vertical" 
                className="border-b border-zinc-900 py-2 w-full font-sans font-normal"
              >
                <h3 data-orientation="vertical" data-state={openItem === index ? "open" : "closed"} className="flex">
                  <button 
                    type="button"
                    aria-expanded={openItem === index}
                    className="flex flex-1 items-center justify-between py-4 transition-all text-left [&[data-state=open]>svg]:rotate-180 text-lg font-normal hover:no-underline w-full text-zinc-50"
                    onClick={() => toggleItem(index)}
                  >
                    {item.question}
                    <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${openItem === index ? 'rotate-180' : ''}`} />
                  </button>
                </h3>
                {openItem === index && (
                  <div className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <div className="pb-4 pt-0 text-zinc-200">
                      {item.answer}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FaqSection; 