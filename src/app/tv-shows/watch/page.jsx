"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Star, Clock, Bookmark } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

function TvShowWatchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  const posterPath = searchParams.get("poster_path");
  
  const { isLoggedIn } = useSelector((state) => state.user);
  
  const [videoKey, setVideoKey] = useState("");
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [rating, setRating] = useState(0);
  const [firstAirDate, setFirstAirDate] = useState("");
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [fullPosterPath, setFullPosterPath] = useState("");

  useEffect(() => {
    if (!id) {
      setError(true);
      setLoading(false);
      return;
    }

    const fetchTvShowDetails = async () => {
      try {
        // Fetch TV show details
        const detailsResponse = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const detailsData = await detailsResponse.json();
        
        // Fetch TV show videos
        const videosResponse = await fetch(
          `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const videosData = await videosResponse.json();

        // Set TV show details
        setTitle(detailsData.name);
        setOverview(detailsData.overview);
        setRating(detailsData.vote_average);
        setFirstAirDate(detailsData.first_air_date);
        setGenres(detailsData.genres);
        
        // Use poster from search params or fetch from details
        const poster = posterPath || detailsData.poster_path;
        setFullPosterPath(`https://image.tmdb.org/t/p/w500${poster}`);

        // Find trailer or teaser
        const trailer = videosData.results.find(
          (video) => 
            video.type === "Trailer" || 
            video.type === "Teaser" ||
            video.site === "YouTube"
        );

        if (trailer) {
          setVideoKey(trailer.key);
          setError(false);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching TV show details:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTvShowDetails();

    // Check if TV show is already in watchlist
    const checkWatchlist = async () => {
      if (!isLoggedIn) return;

      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        const data = await response.json();
        const isInList = data.wishlist.some(
          (item) => item.id === parseInt(id)
        );
        setIsInWatchlist(isInList);
      } catch (error) {
        console.error('Error checking watchlist:', error);
      }
    };

    checkWatchlist();
  }, [id, isLoggedIn, posterPath]);

  const handleAddToWatchlist = async () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
  
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
  
    try {
      const res = await fetch("http://localhost:5000/api/user/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: parseInt(id),
          poster_path: fullPosterPath,
          name: title,
          type: "tv" // Added to distinguish between movies and TV shows
        }),
      });
  
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server Error: ${errorText}`);
      }
  
      const data = await res.json();
      
      if (data.success) {
        setIsInWatchlist(true);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }
  };

  const handleRemoveFromWatchlist = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
  
    try {
      const res = await fetch(`http://localhost:5000/api/user/remove/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server Error: ${errorText}`);
      }
  
      const data = await res.json();
      
      if (data.success) {
        setIsInWatchlist(false);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error removing from watchlist:", error);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  // Error state
  if (error || !videoKey) {
    return (
      <div className="h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl mb-4">Video not available</h1>
        <p className="mb-6">Sorry, we couldn't find a trailer for this TV show.</p>
        <Link 
          href="/tvshows" 
          className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full transition"
        >
          <ArrowLeft size={16} />
          Back to TV Shows
        </Link>
      </div>
    );
  }

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Navigation and Watchlist Button */}
      <div className="p-4 flex justify-between items-center">
        <Link 
          href="/tvshows" 
          className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition"
        >
          <ArrowLeft size={16} />
          Back to TV Shows
        </Link>

        {/* Add to Watchlist Button - Only show if logged in */}
        {isLoggedIn && (
          <button 
            onClick={isInWatchlist ? handleRemoveFromWatchlist : handleAddToWatchlist}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${
              isInWatchlist 
                ? 'bg-green-500 text-white' 
                : 'bg-pink-400 text-black hover:bg-pink-500'
            }`}
          >
            <Bookmark size={16} />
            {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
          </button>
        )}
      </div>
      
      <div className="container mx-auto px-4 pb-10">
        {/* TV Show Title */}
        <h1 className="text-2xl md:text-3xl mb-4 font-bold">{title}</h1>
        
        {/* TV Show Details */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          {/* TV Show Metadata */}
          <div className="flex items-center gap-4 text-gray-300">
            <div className="flex items-center gap-2">
              <Star size={20} className="text-yellow-500" />
              <span>{rating.toFixed(1)}/10</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={20} className="text-gray-400" />
              <span>{formatDate(firstAirDate)}</span>
            </div>
            <div className="flex gap-2">
              {genres.map((genre) => (
                <span 
                  key={genre.id} 
                  className="bg-gray-700 px-2 py-1 rounded-full text-xs"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* TV Show Overview */}
        <p className="text-gray-300 mb-6">{overview}</p>
        
        {/* Video player */}
        <div className="relative pt-[56.25%] w-full shadow-2xl">
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default function TvShowWatchPage() {
  return (
    <Suspense fallback={
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-600"></div>
      </div>
    }>
      <TvShowWatchPageContent />
    </Suspense>
  );
}