import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import Search from "./Search";
import { useAuth } from "../context/AuthContext";

function Home() {
  const [movies, setMovies] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { user } = useAuth(); 
    


  const fetchPopularMovies = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${
          import.meta.env.VITE_TMDB_KEY
        }&language=en-US&page=1`
      );
      setMovies(res.data.results);
      setIsSearchActive(false); 
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };


  useEffect(() => {
    fetchPopularMovies();
  }, []);

  
  const handleSearchResults = (results) => {
    setMovies(results); 
    setIsSearchActive(true); 
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🎬 Movies</h1>

      {isSearchActive && (
        <button
          onClick={fetchPopularMovies}
          style={{ marginBottom: "20px", padding: "8px 12px" }}
        >
          Back to Home Page
        </button>
      )}

      <Search onSearchResults={handleSearchResults} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} userId={user.id} />
        ))}
      </div>
    </div>
  );
}

export default Home;
