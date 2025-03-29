"use client";
import React, { useState, useEffect } from "react";
import HeroHome from "../components/Banner/HeroHome"
import MovieList from "@/components/MovieList";
import HomeBadge from "@/components/Badge/HomeBadge";
import { ArrowUp } from "lucide-react";

export default function Home() {
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

  return (
    <div className="bg-black text-white relative">
      <div id="top-of-page"></div>
      <HomeBadge />
      <HeroHome />
      
      <div id="trending-section" className="scroll-mt-16">
        <MovieList category="popular" title="Trending Now" />
      </div>
      
      <div id="top-rated-section" className="scroll-mt-16">
        <MovieList category="top_rated" title="Top Rated" />
      </div>
      
      <div id="upcoming-section" className="scroll-mt-16">
        <MovieList category="upcoming" title="Upcoming Movies" />
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