const GENRES = [
  "Religious",
  "Action",
  "Adventure",
  "Comedy",
  "Historical",
  "Mystery",
  "Romance",
  "Thriller",
  "Other",
];

interface GenreFilterProps {
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
}

const GenreFilter = ({
  selectedGenre,
  onGenreChange,
}: GenreFilterProps) => {
  return (
    <select
      value={selectedGenre}
      onChange={(e) =>
        onGenreChange(e.target.value)
      }
      className="rounded-lg border border-blue-800 bg-blue-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black transition-colors"
    >
      <option value="">All Genres</option>
      {GENRES.map((genre) => (
        <option key={genre} value={genre}>
          {genre}
        </option>
      ))}
    </select>
  );
};

export default GenreFilter;
