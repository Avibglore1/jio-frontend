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

const HeroTvCarousel = () => {
  const [tvShows, setTvShows] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTvShows = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const data = await res.json();
        setTvShows(data.results || []);
      } catch (error) {
        console.error("Error fetching TV shows:", error);
      }
    };
    fetchTvShows();
  }, []);

  const handleWatchNow = (showId) => {
    router.push(`/tv-shows/watch?id=${showId}`);
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
      {tvShows.map((show) => (
        <SwiperSlide key={show.id}>
          <div className="relative h-[60vh] w-full">
            {/* Background Image with fallback */}
            {show.backdrop_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/original${show.backdrop_path}`}
                alt={show.name}
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

            {/* TV Show Content */}
            <div className="relative z-10 flex flex-col justify-end h-full p-8 max-w-3xl">
              <h2 className="text-4xl font-bold text-white mb-4">{show.name}</h2>

              <p className="text-white/90 text-lg mb-6">
                {show.overview?.length > 150
                  ? show.overview.substring(0, 150) + "..."
                  : show.overview || "No description available."}
              </p>

              {/* Watch Now Button with click handler */}
              <Button
                size="lg"
                className="w-fit bg-pink-500 text-black rounded cursor-pointer hover:bg-white hover:text-black transition duration-300"
                onClick={() => handleWatchNow(show.id)}
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

export default HeroTvCarousel;
