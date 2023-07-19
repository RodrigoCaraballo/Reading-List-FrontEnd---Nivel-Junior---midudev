// user-token.actions.ts
import { createAction, createReducer, on, props } from '@ngrx/store';

import { Book } from '../models/book';

// STATE INTERFACES
export interface AppState {
  library: LibraryState;
}

// ACTIONS

export const loadBooksList = createAction(
  '[Books] Load Books List',
  props<{ books: Book[] }>()
);

export const addToBooksList = createAction(
  '[Books] Add To Books List',
  props<{ book: Book }>()
);

export const removeFromBooksList = createAction(
  '[Books] Remove From Books List',
  props<{ book: Book }>()
);

export const addToReadingList = createAction(
  '[Books] Add To Reading List',
  props<{ book: Book }>()
);

export const removeFromReadingList = createAction(
  '[Books] Remove From Reading List',
  props<{ book: Book }>()
);

export const setSelectedBook = createAction(
  '[Book] Set Selected Book',
  props<{ book: Book }>()
);

export const clearSelectedBook = createAction(
  '[Book] Clear Selected Book',
);

export const setLibraryPagesFilter = createAction(
  '[Book] Set Library Pages Filter',
  props<{ pages: number }>()
);

// export const setLibraryBooksFilter = createAction(
//   '[Book] Set Library Books Filter',
//   props<{ books: number }>()
// );

export const setLibraryGenreFilter = createAction(
  '[Book] Set Library Genre Filter',
  props<{ genre: string }>()
);

// REDUCERS
export interface LibraryState {
  booksList: Array<Book>,
  readingList: Book[],
  selectedBook: Book | undefined,
  isBookSelected: boolean,
  libraryFilter: {
    // booksAvailable: number,
    pages: number,
    genre: string
  }
}

export const initialState: LibraryState = {
  booksList: [],
  readingList: getReadingList(),
  selectedBook: undefined,
  isBookSelected: false,
  libraryFilter: {
    // booksAvailable: 0,
    pages: 0,
    genre: ''
  }
};

export const booksReducer = createReducer(
  initialState,
  on(loadBooksList, (state, { books }) => ({ ...state, booksList: [...state.booksList, ...books] })),
  on(addToBooksList, (state, { book }) => ({ ...state, booksList: [book, ...state.booksList] })),
  on(removeFromBooksList, (state, { book }) => ({ ...state, booksList: [...state.booksList.filter(listedBook => listedBook.ISBN !== book.ISBN)] })),
  on(addToReadingList, (state, { book }) => ({ ...state, readingList: [book,...state.readingList] })),
  on(removeFromReadingList, (state, { book }) => ({ ...state, readingList: [...state.readingList.filter(listedBook => listedBook.ISBN !== book.ISBN)] })),
  on(setSelectedBook, (state, { book }) => ({ ...state, selectedBook: book, isBookSelected: true })),
  on(clearSelectedBook, (state,) => ({ ...state, selectedBook: undefined, isBookSelected: false })),
  // on(setLibraryBooksFilter, (state, { books }) => ({ ...state, libraryFilter: { ...state.libraryFilter, books } })),
  on(setLibraryPagesFilter, (state, { pages }) => ({ ...state, libraryFilter: { ...state.libraryFilter, pages } })),
  on(setLibraryGenreFilter, (state, { genre }) => ({ ...state, libraryFilter: { ...state.libraryFilter, genre } }))
);

// HELPERS FUNCTIONS

function getReadingList() {
  const readingListLS = localStorage.getItem('readingList');

  if (readingListLS) return JSON.parse(readingListLS);

  return [];
}
