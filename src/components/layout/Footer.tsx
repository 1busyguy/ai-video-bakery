'use client';

import React from 'react';
import Link from 'next/link';

interface FooterProps {
  // Add any props if needed
}

export function Footer({}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="z-elevated relative bg-black border-t border-t-zinc-800 py-10 lg:py-20 px-4 sm:px-6 lg:px-8 min-h-[650px]">
      <div className="max-w-7xl mx-auto overflow-hidden z-10">
        <div className="flex flex-col gap-10 md:flex-row">
          {/* Logo and copyright */}
          <div className="flex flex-grow flex-col gap-6 md:gap-12">
            <div className="space-y-6">
              <Link className="flex items-center" href="/">
                <span className="flex items-center text-bright">
                  <svg viewBox="0 0 24 24" width="22" height="22" className="text-primary">
                    <path
                      fill="currentColor"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"
                    />
                  </svg>
                  <span className="ml-2 font-bold text-lg text-white">AI Video Bakery</span>
                </span>
              </Link>
              <p className="text-sm text-zinc-400">AI Video Bakery, Inc, © {currentYear}</p>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-3">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-zinc-400 w-7.5 h-7.5 grid place-content-center hover:text-zinc-200 transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="18" height="18">
                  <path d="M8.48 6.03L13.17.67h-2.15L7.49 4.72 4.43.67H0l5.29 6.92-5.02 5.73h2.15L6.3 8.9l3.38 4.42H14L8.48 6.03zm1.79 6.01L2.51 1.89h1.28l7.68 10.15h-1.2z" fill="currentColor" />
                </svg>
              </a>
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-zinc-400 w-7.5 h-7.5 grid place-content-center hover:text-zinc-200 transition-colors duration-300"
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                  <path d="M17.073 0h-4.045v16.348c0 1.948-1.556 3.548-3.492 3.548s-3.491-1.6-3.491-3.548c0-1.913 1.52-3.478 3.388-3.548V8.696C5.319 8.766 2 12.139 2 16.348 2 20.59 5.388 24 9.57 24c4.184 0 7.572-3.444 7.572-7.652V7.965A9.366 9.366 0 0022.5 9.774V5.67c-3.042-.105-5.427-2.61-5.427-5.67z" fill="currentColor" />
                </svg>
              </a>
              <a 
                href="https://discord.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-zinc-400 w-7.5 h-7.5 grid place-content-center hover:text-zinc-200 transition-colors duration-300"
              >
                <svg viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                  <path d="M16.93 1.641A16.491 16.491 0 0012.86.38a.062.062 0 00-.066.03c-.175.313-.37.721-.506 1.042a15.226 15.226 0 00-4.573 0A10.538 10.538 0 007.2.41a.064.064 0 00-.065-.031 16.447 16.447 0 00-4.07 1.262.058.058 0 00-.028.024C.444 5.538-.266 9.316.083 13.047a.069.069 0 00.026.047 16.586 16.586 0 004.994 2.524.064.064 0 00.07-.023c.385-.525.728-1.079 1.022-1.661a.063.063 0 00-.035-.088 10.917 10.917 0 01-1.56-.744.064.064 0 01-.007-.107c.105-.078.21-.16.31-.242a.062.062 0 01.065-.009c3.273 1.494 6.817 1.494 10.051 0a.061.061 0 01.066.008c.1.082.204.165.31.243a.064.064 0 01-.005.107c-.499.291-1.017.537-1.561.743a.064.064 0 00-.034.089c.3.581.643 1.135 1.02 1.66a.063.063 0 00.07.024 16.532 16.532 0 005.003-2.524.065.065 0 00.026-.046c.417-4.314-.699-8.062-2.957-11.384a.05.05 0 00-.026-.024zM6.684 10.776c-.985 0-1.797-.905-1.797-2.016 0-1.11.796-2.016 1.797-2.016 1.01 0 1.814.913 1.798 2.016 0 1.111-.796 2.016-1.798 2.016zm6.646 0c-.986 0-1.797-.905-1.797-2.016 0-1.11.796-2.016 1.797-2.016 1.009 0 1.813.913 1.797 2.016 0 1.111-.788 2.016-1.797 2.016z" fill="currentColor" />
                </svg>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-zinc-400 w-7.5 h-7.5 grid place-content-center hover:text-zinc-200 transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="18" height="18">
                  <path d="M12.96 0H1.03C.47-.01.01.44 0 1.01v11.98c.01.56.47 1.02 1.03 1.01h11.93c.57 0 1.04-.45 1.04-1.01V1.01C14 .45 13.53 0 12.96 0zM4.15 11.93H2.07V5.25h2.08v6.68zM3.11 4.34a1.2 1.2 0 01-1.2-1.21c0-.66.54-1.2 1.2-1.2s1.2.54 1.2 1.2c.01.67-.53 1.21-1.2 1.21zm8.82 7.59H9.85V8.68c0-.78-.02-1.77-1.08-1.77-1.08 0-1.25.84-1.25 1.72v3.3H5.46V5.25h1.99v.91h.03c.28-.52.95-1.08 1.97-1.08 2.1 0 2.49 1.38 2.49 3.18v3.67z" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>

          {/* Footer links */}
          <div className="flex flex-wrap gap-12 md:gap-0">
            {/* Product Column */}
            <div className="space-y-4 min-w-[136px] lg:min-w-[192px]">
              <h3 className="text-sm font-sans leading-[22px] text-zinc-200 tracking-[0.0375rem] uppercase">Product</h3>
              <ul className="space-y-4">
                <li>
                  <Link className="text-zinc-400 text-sm font-sans leading-[22px] tracking-[0.0375rem] hover:text-zinc-200 transition-color duration-300" href="/app/video">
                    Create
                  </Link>
                </li>
                <li>
                  <Link className="text-zinc-400 text-sm font-sans leading-[22px] tracking-[0.0375rem] hover:text-zinc-200 transition-color duration-300" href="/app/stylize">
                    Stylize
                  </Link>
                </li>
                <li>
                  <a className="text-zinc-400 text-sm font-sans leading-[22px] tracking-[0.0375rem] hover:text-zinc-200 transition-color duration-300" href="https://discord.com" target="_blank" rel="noopener noreferrer">
                    Community
                  </a>
                </li>
                <li>
                  <a className="text-zinc-400 text-sm font-sans leading-[22px] tracking-[0.0375rem] hover:text-zinc-200 transition-color duration-300" href="https://feedback.aivideokitchen.com" target="_blank" rel="noopener noreferrer">
                    Feedback
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div className="space-y-4 min-w-[136px] lg:min-w-[192px]">
              <h3 className="text-sm font-sans leading-[22px] text-zinc-200 tracking-[0.0375rem] uppercase">Company</h3>
              <ul className="space-y-4">
                <li>
                  <Link className="text-zinc-400 text-sm font-sans leading-[22px] tracking-[0.0375rem] hover:text-zinc-200 transition-color duration-300" href="/about">
                    About
                  </Link>
                </li>
                <li>
                  <Link className="text-zinc-400 text-sm font-sans leading-[22px] tracking-[0.0375rem] hover:text-zinc-200 transition-color duration-300" href="/careers">
                    Careers
                  </Link>
                </li>
                <li>
                  <a className="text-zinc-400 text-sm font-sans leading-[22px] tracking-[0.0375rem] hover:text-zinc-200 transition-color duration-300" href="mailto:support@aivideokitchen.com">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Column */}
            <div className="space-y-4 min-w-[136px] lg:min-w-[192px]">
              <h3 className="text-sm font-sans leading-[22px] text-zinc-200 tracking-[0.0375rem] uppercase">Legal</h3>
              <ul className="space-y-4">
                <li>
                  <Link className="text-zinc-400 text-sm font-sans leading-[22px] tracking-[0.0375rem] hover:text-zinc-200 transition-color duration-300" href="/privacy">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link className="text-zinc-400 text-sm font-sans leading-[22px] tracking-[0.0375rem] hover:text-zinc-200 transition-color duration-300" href="/terms">
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link className="text-zinc-400 text-sm font-sans leading-[22px] tracking-[0.0375rem] hover:text-zinc-200 transition-color duration-300" href="/acceptable-use">
                    Acceptable Use Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Large Faded Text - Half Cut Off */}
        <div className="mt-16 w-full relative overflow-hidden" style={{ height: '60px', marginBottom: '0px' }}>
          <div className="absolute left-1/2 -translate-x-1/2 top-0 text-[120px] md:text-[180px] lg:text-[250px] tracking-widest font-bold text-transparent bg-clip-text bg-gradient-to-b from-zinc-800/30 to-transparent select-none whitespace-nowrap">
            cooking
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 