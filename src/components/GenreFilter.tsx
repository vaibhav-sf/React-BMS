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
      className="w-full sm:w-auto rounded-lg border border-slate-300 bg-white text-slate-700 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"    >
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
