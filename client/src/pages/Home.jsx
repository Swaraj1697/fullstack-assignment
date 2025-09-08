import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import Search from "./Search";

function Home() {
  const [movies, setMovies] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false); // track if search was performed
  const userId = "6800ce71f036304b30f47318"; // hardcoded for now

  // Function to fetch popular movies
  const fetchPopularMovies = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${
          import.meta.env.VITE_TMDB_KEY
        }&language=en-US&page=1`
      );
      setMovies(res.data.results);
      setIsSearchActive(false); // reset search state
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  // Fetch popular movies on component mount
  useEffect(() => {
    fetchPopularMovies();
  }, []);

  // Callback to receive search results from Search component
  const handleSearchResults = (results) => {
    setMovies(results); // replace the movies list with search results
    setIsSearchActive(true); // mark that a search has been performed
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🎬 Movies</h1>

      {/* Show button only if search was performed */}
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
          <MovieCard key={movie.id} movie={movie} userId={userId} />
        ))}
      </div>
    </div>
  );
}

export default Home;
