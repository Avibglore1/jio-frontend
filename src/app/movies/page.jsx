"use client";
import React, { useState, useEffect } from "react";
import HeroMovies from "../../components/Banner/HeroMovies"
import MovieList from "@/components/MovieList";
import MovieBadge from "../../components/Badge/MovieBadge"
import { ArrowUp } from "lucide-react";

export default function MoviesHome() {
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

  // Define genre IDs for each category
  // Comedy: 35, Horror: 27, Romance: 10749, Action: 28
  const genreIds = {
    comedy: 35,
    horror: 27,
    romance: 10749,
    action: 28
  };

  return (
    <div className="bg-black text-white relative">
      <div id="top-of-page"></div>
      <MovieBadge />
      <HeroMovies />
      
      <div id="comedy-section" className="scroll-mt-16">
        <MovieList category="genre" genreId={genreIds.comedy} title="Top Comedy Movies" />
      </div>
      
      <div id="horror-section" className="scroll-mt-16">
        <MovieList category="genre" genreId={genreIds.horror} title="Top Horror Movies" />
      </div>
      
      <div id="romance-section" className="scroll-mt-16">
        <MovieList category="genre" genreId={genreIds.romance} title="Top Romance Movies" />
      </div>

      <div id="action-section" className="scroll-mt-16">
        <MovieList category="genre" genreId={genreIds.action} title="Top Action Movies" />
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