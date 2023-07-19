import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Book } from 'src/models/book';
import { AppState } from 'src/state/library.state';
import { Genres } from './components/tool-bar/tool-bar.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {

  listedBooks?: Book[];
  readingList?: Book[];
  isDarkMode: boolean = false;
  isBookSelected: boolean = false;

  booksAvailable: number = 13;
  pages: number = 0;
  genre: string = '';

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('library')
      .subscribe(library => {
        this.readingList = library.readingList;
        this.isBookSelected = library.isBookSelected;

        const { pages, genre } = library.libraryFilter
        this.listedBooks = this.filterListedBooks(library.booksList, pages, genre);

        this.booksAvailable = this.listedBooks.length
      })

    window.addEventListener('storage', (event: StorageEvent) => {
      if (event.key === 'listedBooks') {
        const updateListedBooks = JSON.parse(event.newValue ?? '[]') as Book[];

        this.listedBooks = this.filterListedBooks(updateListedBooks, this.pages, this.genre);
        this.booksAvailable = this.listedBooks.length
      }
    })
  }

  private filterListedBooks(bookList: Book[], pages: number, genre: string) {
    let listedBooks = bookList.filter(bookListed => this.readingList?.every(bookReading => bookListed.ISBN !== bookReading.ISBN))
    if (pages > 0) listedBooks = listedBooks.filter(book => book.pages <= pages)

    if (genre !== Genres.todos && genre !== '') listedBooks = listedBooks.filter(book => book.genre.toLowerCase() === genre.toLowerCase())

    localStorage.setItem('listedBooks', JSON.stringify(listedBooks))
    return listedBooks;
  }
}

