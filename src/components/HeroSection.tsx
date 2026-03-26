import { useState, useEffect } from 'react';
import { Github, Facebook, X, Instagram, Linkedin, ChevronDown } from 'lucide-react';

const roles = ['Grafiker', 'Web Developer', 'Full-Stack Dev.', 'Freelancer'];

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: X, href: 'https://x.com/', label: 'X' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
];

const HeroSection = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const typeSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.substring(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentRole.substring(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRoleIndex]);

  return (
    <section id="home" className="relative min-h-screen code-bg flex items-center justify-center overflow-hidden">
      {/* Geometric decorations */}
      <div className="absolute top-20 left-10 w-64 h-64 opacity-10">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <polygon
            points="100,10 190,50 190,150 100,190 10,150 10,50"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-foreground"
          />
        </svg>
      </div>
      <div className="absolute bottom-20 right-10 w-48 h-48 opacity-10">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <polygon
            points="100,10 190,50 190,150 100,190 10,150 10,50"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-foreground"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 text-center z-10">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in">
          Yekta Asım ELLİ
        </h1>
        <div className="text-xl md:text-2xl text-muted-foreground mb-12 h-8 flex items-center justify-center gap-2">
          <span className="text-primary">{displayText}</span>
          <span className="cursor-blink text-primary">|</span>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-6 mb-16" style={{ animationDelay: '0.3s' }}>
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
              aria-label={label}
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#about"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-bounce-slow"
        aria-label="Scroll down"
      >
        <ChevronDown size={32} />
      </a>
    </section>
  );
};

export default HeroSection;
