import { Link } from "react-router-dom";
import { useBookContext } from "../context/BookContext";

const Dashboard = () => {

  const { books } = useBookContext();

  const totalBooks = books.length;

  const printedBooks = books.filter(
    (b) => b.bookType === "printed"
  ).length;

  const ebooks = books.filter(
    (b) => b.bookType === "ebook"
  ).length;

  const uniqueGenres = new Set(
    books.map((b) => b.genre)
  ).size;

  const recentBooks = books.slice(-5).reverse();

  const metrics = [
    {
      label: "Total Books",
      value: totalBooks,
      icon: "📚",
      color: "border-blue-500",
    },
    {
      label: "Printed Books",
      value: printedBooks,
      icon: "📖",
      color: "border-sky-500",
    },
    {
      label: "Ebooks",
      value: ebooks,
      icon: "💻",
      color: "border-emerald-500",
    },
    {
      label: "Genres",
      value: uniqueGenres,
      icon: "🏷️",
      color: "border-amber-500",
    },
  ];

  return (
    <div>

      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Dashboard
        </h1>
        <p className="text-slate-500 mt-1">
          Overview of your book collection
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className={`bg-white border-l-4 ${metric.color} rounded-lg p-4 shadow-sm hover:scale-105 transition-transform duration-200`}
          >
            <div className="text-2xl mb-1">
              {metric.icon}
            </div>
            <p className="text-2xl font-bold text-slate-900">
              {metric.value}
            </p>
            <p className="text-sm text-slate-500">
              {metric.label}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3 mb-8">
        <Link
          to="/books/add"
          className="bg-blue-500 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 text-sm transition-colors"
        >
          + Add New Book
        </Link>
        <Link
          to="/books"
          className="bg-blue-500 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 text-sm transition-colors"
        >
          View All Books
        </Link>
      </div>

      {/* Recent Books */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Recently Added
        </h2>

        {recentBooks.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-lg p-8 text-center shadow-sm">
            <p className="text-slate-500">
              No books yet. Add your first book!
            </p>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-left px-4 py-3 text-slate-600 font-medium">
                    Title
                  </th>
                  <th className="text-left px-4 py-3 text-slate-600 font-medium hidden sm:table-cell">
                    Author
                  </th>
                  <th className="text-left px-4 py-3 text-slate-600 font-medium hidden md:table-cell">
                    Genre
                  </th>
                  <th className="text-left px-4 py-3 text-slate-600 font-medium">
                    Type
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentBooks.map((book) => (
                  <tr
                    key={book.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-blue-50/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <Link
                        to={`/books/${book.id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        {book.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-slate-600 hidden sm:table-cell">
                      {book.author}
                    </td>
                    <td className="px-4 py-3 text-slate-600 hidden md:table-cell">
                      {book.genre}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${book.bookType === "printed"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-emerald-100 text-emerald-700"
                          }`}
                      >
                        {book.bookType === "printed"
                          ? "Printed"
                          : "Ebook"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default Dashboard;