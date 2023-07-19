import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Book } from 'src/models/book';
import { AppState, addToReadingList, clearSelectedBook, removeFromBooksList } from 'src/state/library.state';
import { transition, style, animate, trigger } from '@angular/animations';

const enterTransition = transition(':enter', [
  style({
    opacity: 0
  }),
  animate('1s ease-in', style({ opacity: 1})),
]);
const exitTransition = transition(':leave', [
  style({
    opacity: 1
  }),
  animate('1s ease-out', style({ opacity: 0})),
]);

const fadeIn = trigger('fadeIn', [enterTransition])
const fadeOut = trigger('fadeOut', [exitTransition])

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.css'],
  animations: [fadeIn, fadeOut]
})
export class BookInfoComponent implements OnInit {
  book?: Book;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('library')
      .subscribe(library => {
        this.book = library.selectedBook
      })
  }

  addBook() {
    if (!this.book) return

    this.store.dispatch(addToReadingList({ book: this.book }))
    this.store.dispatch(removeFromBooksList({ book: this.book }))
    this.store.dispatch(clearSelectedBook())
    this.store.select('library')
      .subscribe(library => {
        localStorage.setItem('readingList', JSON.stringify(library.readingList))
        localStorage.setItem('listedBooks', JSON.stringify(library.booksList))
      })
  }

  closeWindow() {
    this.store.dispatch(clearSelectedBook())
  }
}
