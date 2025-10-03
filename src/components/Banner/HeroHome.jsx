"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

const HeroHomeCarousel = () => {
  const [movies, setMovies] = useState([]);
  const router = useRouter();

  const truncate = (text, length = 25) => {
    if (!text) return "No description available.";
    return text.split(" ").slice(0, length).join(" ") + (text.split(" ").length > length ? "..." : "");
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const data = await res.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  const handleWatchNow = (movieId) => {
    router.push(`/movies/watch?id=${movieId}`);
  };

  if (movies.length === 0) {
    return (
      <div className="h-[500px] flex items-center justify-center bg-black text-white">
        <p>Loading movies...</p>
      </div>
    );
  }

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      loop
      className="relative w-full h-[500px] overflow-hidden"
    >
      {movies.map((movie) => (
        <SwiperSlide key={movie.id}>
          <div className="relative h-[500px] w-full">
            {movie.backdrop_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title || "Movie Poster"}
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            ) : (
              <div className="bg-gray-800 w-full h-full flex items-center justify-center">
                <p className="text-white">No Image Available</p>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>

            <div className="absolute bottom-10 left-10 text-white max-w-[600px]">
              <h1 className="text-5xl font-extrabold drop-shadow-lg">{movie.title}</h1>
              <p className="mt-3 text-lg leading-snug opacity-90">
                {truncate(movie.overview, 25)}
              </p>
              <Button
                size="lg"
                className="mt-4 px-6 py-2 bg-pink-500 text-black rounded hover:bg-white hover:text-black transition duration-300"
                onClick={() => handleWatchNow(movie.id)}
              >
                Watch Now
              </Button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroHomeCarousel;
