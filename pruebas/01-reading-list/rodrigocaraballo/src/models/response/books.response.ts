import { Book } from "../book";

export interface JsonResponse {
  library: Library[];
}

export interface Library {
  book: Book
}
