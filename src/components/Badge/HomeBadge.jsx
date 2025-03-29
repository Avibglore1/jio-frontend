"use client";
import React from 'react';
import { Badge } from "@/components/ui/badge";

function HomeBadge() {
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
        onClick={() => scrollToSection('trending-section')}
      >
        Trending Now
      </Badge>
      <Badge 
        className="cursor-pointer hover:bg-gray-700 rounded-full" 
        onClick={() => scrollToSection('top-rated-section')}
      >
        Top Rated
      </Badge>
      <Badge 
        className="cursor-pointer hover:bg-gray-700 rounded-full" 
        onClick={() => scrollToSection('upcoming-section')}
      >
        Upcoming Movies
      </Badge>
    </div>
  );
}

export default HomeBadge;