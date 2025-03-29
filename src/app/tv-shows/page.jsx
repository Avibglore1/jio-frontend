"use client";

import React, { useState, useEffect } from "react";
import HeroTvshows from "../../components/Banner/HeroTvshows";
import MovieList from "@/components/MovieList";
import { ArrowUp } from "lucide-react";
import TvBadge from "@/components/Badge/TvBadge";

export default function TvShowsHome() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Define genre IDs for TV shows
  // Comedy: 35, Crime: 80, Drama: 18, Action & Adventure: 10759
  const tvGenreIds = {
    comedy: 35,
    crime: 80,
    drama: 18,
    action: 10759
  };
  
  return (
    <div className="bg-black text-white relative">
      <div id="top-of-page"></div>
      <TvBadge />
      <HeroTvshows />
      
      <div id="comedyTv-section" className="scroll-mt-16">
        <MovieList 
          category="genre" 
          genreId={tvGenreIds.comedy} 
          title="Top Comedy Shows" 
          contentType="tv" 
        />
      </div>
      
      <div id="crimeTv-section" className="scroll-mt-16">
        <MovieList 
          category="genre" 
          genreId={tvGenreIds.crime} 
          title="Top Crime Shows" 
          contentType="tv" 
        />
      </div>
      
      <div id="dramaTv-section" className="scroll-mt-16">
        <MovieList 
          category="genre" 
          genreId={tvGenreIds.drama} 
          title="Top Drama Shows" 
          contentType="tv" 
        />
      </div>
      
      <div id="actionTv-section" className="scroll-mt-16">
        <MovieList 
          category="genre" 
          genreId={tvGenreIds.action} 
          title="Top Action & Adventure Shows" 
          contentType="tv" 
        />
      </div>
      
      {showBackToTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-gray-800 hover:bg-gray-700 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}