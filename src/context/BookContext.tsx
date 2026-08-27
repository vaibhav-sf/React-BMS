import { useContext, createContext, useState, type ReactNode } from "react";
import type{Book} from '../types/book';

interface BookContextProps{
    books: Book[];
    addBook: (book: Book) => void;
    deleteBook: (id: string) => void;
    updateBook: (id: string, updatedBook: Book) => void;
}

const BookContext = createContext<BookContextProps | undefined>(
    undefined
);

interface BookProviderProps{
    children: ReactNode;
    initialBooks?: Book[];
}

export const BookProvider = ({
    children,
    initialBooks = []
} : BookProviderProps) => {
    const [books, setBooks] = useState<Book[]>(initialBooks);
    const addBook = (book: Book) => {
        setBooks((prevBooks) => 
            [...prevBooks, book]
        );
    }
    const updateBook = (
        id: string,
        updatedBook: Book
    ) => {
        setBooks((prevBooks) => 
            prevBooks.map((book) => 
                book.id === id ? updatedBook : book
            )
        );
    }
    const deleteBook = (id: string) => {
        setBooks((prevBooks) => 
            prevBooks.filter((book) => book.id !== id)
        );
    }
    return (
        <BookContext.Provider value={{books, addBook, deleteBook, updateBook}}>
            {children}
        </BookContext.Provider>
    )
    };  

export const useBookContext = () => {

  const context = useContext(BookContext);

  if (!context) {
    throw new Error(
      "useBookContext must be used inside BookProvider"
    );
  }

  return context;
};