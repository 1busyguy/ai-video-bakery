'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface CtaSectionProps {
  // Add any props if needed
}

export function CtaSection({}: CtaSectionProps) {
  return (
    <section id="cta" className="w-full relative p-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FF74A2]/10 to-[#FFA487]/10 blur-[100px] max-w-[400px] mx-auto"></div>
      
      <div className="relative flex flex-col items-center justify-center text-center gap-8">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-xl font-bold font-medium text-zinc-200"
        >
          Get started for free...
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Link
            href="/app/video"
            className="whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary shadow hover:bg-primary/90 h-9 px-4 w-[180px] relative bg-gradient-to-l from-[#FF74A2] to-[#FFA487] text-zinc-900 font-semibold py-6 rounded-full text-md tracking-wide flex flex-row items-center justify-center gap-2 overflow-hidden before:absolute before:inset-0 before:bg-[#FFA487] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 hover:scale-[102%] transition-all duration-300 ease-out"
          >
            <span className="relative z-10">Create</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default CtaSection; 