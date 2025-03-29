// Movie API Functions
export const fetchMovies = async (category) => {
  try {
    let endpoint;
    switch (category) {
      case "trending":
        endpoint = `/trending/movie/week`;
        break;
      case "popular":
        endpoint = `/movie/popular`;
        break;
      case "upcoming":
        endpoint = `/movie/upcoming`;
        break;
      case "top_rated":
        endpoint = `/movie/top_rated`;
        break;
      default:
        endpoint = `/movie/popular`;
    }

    const res = await fetch(
      `https://api.themoviedb.org/3${endpoint}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
    );
    
    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }
    
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export const fetchMoviesByGenre = async (genreId) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=${genreId}&language=en-US&sort_by=popularity.desc`
    );
    
    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }
    
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    return [];
  }
};

// TV Show API Functions
export const fetchTvShows = async (category) => {
  try {
    let endpoint;
    switch (category) {
      case "trending":
        endpoint = `/trending/tv/week`;
        break;
      case "popular":
        endpoint = `/tv/popular`;
        break;
      case "top_rated":
        endpoint = `/tv/top_rated`;
        break;
      case "on_the_air":
        endpoint = `/tv/on_the_air`;
        break;
      default:
        endpoint = `/tv/popular`;
    }

    const res = await fetch(
      `https://api.themoviedb.org/3${endpoint}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
    );
    
    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }
    
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching TV shows:", error);
    return [];
  }
};

export const fetchTvShowsByGenre = async (genreId) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=${genreId}&language=en-US&sort_by=popularity.desc`
    );
    
    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }
    
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching TV shows by genre:", error);
    return [];
  }
};