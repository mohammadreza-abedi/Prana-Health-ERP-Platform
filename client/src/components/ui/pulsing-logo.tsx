import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface PulsingLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  showText?: boolean;
  className?: string;
}

export default function PulsingLogo({ 
  size = 'md', 
  color = 'from-tiffany to-aqua', 
  showText = true,
  className = ''
}: PulsingLogoProps) {
  
  const [isHovered, setIsHovered] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);

  // Size styles
  const getSize = () => {
    switch(size) {
      case 'sm': return 'w-8 h-8';
      case 'md': return 'w-12 h-12';
      case 'lg': return 'w-16 h-16';
      case 'xl': return 'w-24 h-24';
      default: return 'w-12 h-12';
    }
  };

  // Text size
  const getTextSize = () => {
    switch(size) {
      case 'sm': return 'text-sm';
      case 'md': return 'text-base';
      case 'lg': return 'text-lg';
      case 'xl': return 'text-2xl';
      default: return 'text-base';
    }
  };

  // Start random pulsing effect for realistic heartbeat
  useEffect(() => {
    if (!isPulsing) return;
    
    // Simulate realistic heartbeat pattern with varying intervals
    const createHeartbeatInterval = () => {
      const randomDelay = () => Math.floor(Math.random() * 500) + 700; // Between 700-1200ms
      
      const interval = setTimeout(() => {
        setIsPulsing(prev => !prev);
        
        // Reset after a short delay to create the "beat" effect
        setTimeout(() => {
          setIsPulsing(true);
          createHeartbeatInterval(); // Set up the next beat
        }, 150);
        
      }, randomDelay());
      
      return interval;
    };
    
    const intervalId = createHeartbeatInterval();
    return () => clearTimeout(intervalId);
  }, [isPulsing]);

  // Animation variants
  const containerVariants = {
    normal: { scale: 1 },
    pulse: { scale: 1.1, transition: { duration: 0.15 } },
    hover: { scale: 1.15, transition: { duration: 0.2 } }
  };

  const glowVariants = {
    normal: { opacity: 0.5, scale: 1.2 },
    pulse: { opacity: 0.8, scale: 1.4, transition: { duration: 0.3 } },
    hover: { opacity: 0.8, scale: 1.5, transition: { duration: 0.3 } }
  };

  const currentState = isHovered ? 'hover' : (isPulsing ? 'normal' : 'pulse');

  return (
    <div 
      className={`flex items-center ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative flex items-center justify-center">
        {/* Background glow effect */}
        <motion.div 
          className={`absolute rounded-full bg-gradient-to-r ${color} blur-xl`}
          variants={glowVariants}
          initial="normal"
          animate={currentState}
          style={{ width: '100%', height: '100%' }}
        />
        
        {/* Logo container */}
        <motion.div
          className={`relative z-10 flex items-center justify-center rounded-xl bg-gradient-to-br ${color} ${getSize()}`}
          variants={containerVariants}
          initial="normal"
          animate={currentState}
        >
          <Heart className="text-white w-1/2 h-1/2" fill="white" />
        </motion.div>
      </div>
      
      {/* Text */}
      {showText && (
        <motion.h1 
          className={`mr-2 font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent ${getTextSize()}`}
          animate={{ 
            opacity: isHovered ? 1 : 0.9,
            y: isHovered ? 0 : 1
          }}
        >
          پرانا - دستیار هوشمند سلامت
        </motion.h1>
      )}
    </div>
  );
}