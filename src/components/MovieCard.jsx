const MovieDetails = ({ movie }) => {
    return (
      <div className="p-10 bg-black text-white min-h-screen">
        <h1 className="text-4xl font-bold">{movie.title}</h1>
        <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="w-full h-[400px] object-cover my-4" />
        <p className="text-lg">{movie.overview}</p>
        <button className="mt-4 bg-red-600 px-6 py-2 text-lg rounded">Watch Trailer</button>
      </div>
    );
  };
  
  export default MovieDetails;
  