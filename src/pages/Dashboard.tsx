import { Link } from "react-router-dom";
import { useBookContext } from "../context/BookContext";

const Dashboard = () => {
  const { books } = useBookContext();

  const totalBooks = books.length;

  const printedBooks = books.filter(
    (book) => book.bookType === "printed"
  ).length;

  const ebooks = books.filter(
    (book) => book.bookType === "ebook"
  ).length;

  const uniqueGenres = new Set(
    books.map((book) => book.genre)
  ).size;

  const recentBooks = books.slice(-5).reverse();

  const metrics = [
    {
      label: "Total Books",
      value: totalBooks,
      icon: "📚",
      color: "border-blue-500",
      iconBg: "bg-blue-50",
    },
    {
      label: "Printed Books",
      value: printedBooks,
      icon: "📖",
      color: "border-cyan-500",
      iconBg: "bg-cyan-50",
    },
    {
      label: "Ebooks",
      value: ebooks,
      icon: "💻",
      color: "border-emerald-500",
      iconBg: "bg-emerald-50",
    },
    {
      label: "Genres",
      value: uniqueGenres,
      icon: "🏷️",
      color: "border-amber-500",
      iconBg: "bg-amber-50",
    },
  ];

  return (
    <div>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="text-slate-500 mt-1">
          Overview of your book collection
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        {metrics.map((metric) => (
          <div
            key={metric.label}
            className={`bg-white border border-slate-200 border-l-4 ${metric.color} rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow`}
          >

            <div
              className={`w-11 h-11 ${metric.iconBg} rounded-lg flex items-center justify-center text-xl mb-4`}
            >
              {metric.icon}
            </div>

            <p className="text-2xl font-bold text-slate-900">
              {metric.value}
            </p>

            <p className="text-sm text-slate-500 mt-1">
              {metric.label}
            </p>

          </div>
        ))}

      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 mb-8">

        <Link
          to="/books/add"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2.5 text-sm transition-colors"
        >
          + Add New Book
        </Link>

        <Link
          to="/books"
          className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-lg px-4 py-2.5 text-sm transition-colors"
        >
          View All Books
        </Link>

      </div>

      {/* Recently Added */}
      <section>

        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Recently Added
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Your latest books
            </p>
          </div>

          {recentBooks.length > 0 && (
            <Link
              to="/books"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              View all →
            </Link>
          )}
        </div>

        {recentBooks.length === 0 ? (

          <div className="bg-white border border-slate-200 rounded-xl p-10 text-center shadow-sm">

            <div className="w-14 h-14 mx-auto mb-4 bg-blue-50 rounded-full flex items-center justify-center text-2xl">
              📚
            </div>

            <h3 className="text-base font-semibold text-slate-800 mb-1">
              No books yet
            </h3>

            <p className="text-sm text-slate-500 mb-5">
              Add your first book to get started.
            </p>

            <Link
              to="/books/add"
              className="inline-flex bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 text-sm transition-colors"
            >
              + Add Book
            </Link>

          </div>

        ) : (

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">

            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">

                    <th className="text-left px-5 py-3 text-slate-500 font-medium">
                      Title
                    </th>

                    <th className="text-left px-5 py-3 text-slate-500 font-medium hidden sm:table-cell">
                      Author
                    </th>

                    <th className="text-left px-5 py-3 text-slate-500 font-medium hidden md:table-cell">
                      Genre
                    </th>

                    <th className="text-left px-5 py-3 text-slate-500 font-medium">
                      Type
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {recentBooks.map((book) => (
                    <tr
                      key={book.id}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors"
                    >

                      <td className="px-5 py-3.5">
                        <Link
                          to={`/books/${book.id}`}
                          className="font-medium text-slate-800 hover:text-blue-600 transition-colors"
                        >
                          {book.title}
                        </Link>
                      </td>

                      <td className="px-5 py-3.5 text-slate-600 hidden sm:table-cell">
                        {book.author}
                      </td>

                      <td className="px-5 py-3.5 text-slate-600 hidden md:table-cell">
                        {book.genre}
                      </td>

                      <td className="px-5 py-3.5">

                        <span
                          className={`inline-flex text-xs font-medium px-2.5 py-1 rounded-full ${
                            book.bookType === "printed"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-emerald-50 text-emerald-700"
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

          </div>

        )}

      </section>

    </div>
  );
};

export default Dashboard;