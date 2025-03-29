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

const HeroMoviesCarousel = () => {
  const [movies, setMovies] = useState([]);
  const router = useRouter();

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

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      className="w-full"
      slidesPerView={1}
    >
      {movies.map((movie) => (
        <SwiperSlide key={movie.id}>
          <div className="relative h-[60vh] w-full">
            {/* Background Image with fallback */}
            {movie.backdrop_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            ) : (
              <div className="bg-gray-800 w-full h-full flex items-center justify-center">
                <p className="text-white">No Image Available</p>
              </div>
            )}

            {/* Dark Gradient Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-black/70 to-transparent opacity-80"></div>

            {/* Movie Content */}
            <div className="relative z-10 flex flex-col justify-end h-full p-8 max-w-3xl">
              <h2 className="text-4xl font-bold text-white mb-4">{movie.title}</h2>

              <p className="text-white/90 text-lg mb-6">
                {movie.overview?.length > 150
                  ? movie.overview.substring(0, 150) + "..."
                  : movie.overview || "No description available."}
              </p>

              {/* Watch Now Button */}
              <Button
                size="lg"
                className="w-fit bg-pink-500 text-black rounded cursor-pointer hover:bg-white hover:text-black transition duration-300"
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

export default HeroMoviesCarousel;
