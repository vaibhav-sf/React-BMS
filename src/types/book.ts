export type BookType = "printed" | "ebook";

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publicationDate: string;
  genre: string;
  bookType: BookType;
  size: number;
}