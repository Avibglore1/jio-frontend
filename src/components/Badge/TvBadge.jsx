"use client";
import React from 'react';
import { Badge } from "@/components/ui/badge";

function TvBadge() {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className='bg-black text-white px-4 py-3 flex gap-3'>
      <Badge 
        className="cursor-pointer hover:bg-gray-700 rounded-full" 
        onClick={() => scrollToSection('comedyTv-section')}
      >
        Comedy
      </Badge>
      <Badge 
        className="cursor-pointer hover:bg-gray-700 rounded-full" 
        onClick={() => scrollToSection('crimeTv-section')}
      >
        Crime
      </Badge>
      <Badge 
        className="cursor-pointer hover:bg-gray-700 rounded-full" 
        onClick={() => scrollToSection('dramaTv-section')}
      >
        Drama
      </Badge>
      <Badge 
        className="cursor-pointer hover:bg-gray-700 rounded-full" 
        onClick={() => scrollToSection('actionTv-section')}
      >
        Action
      </Badge>
    </div>
  );
}

export default TvBadge;