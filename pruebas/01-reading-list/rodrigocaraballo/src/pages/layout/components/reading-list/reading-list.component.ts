import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Book } from 'src/models/book';
import { AppState, addToBooksList, removeFromReadingList } from 'src/state/library.state';
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
  selector: 'app-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.css'],
  animations: [fadeIn, fadeOut]
})
export class ReadingListComponent implements OnInit {
  readingList!: Book[]
  showReadingList: boolean = false

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('library')
      .subscribe(library => {
        this.readingList = library.readingList
    this.showReadingList = this.readingList.length > 0
      })

      window.addEventListener('storage', (event: StorageEvent) => {
        if(event.key === 'readingList') {
          const updateReadingList = JSON.parse(event.newValue || '[]') as Book[];
          this.readingList = updateReadingList
          this.showReadingList = updateReadingList.length > 0
      }
    })
  }

  removeBook(book: Book) {
    if (!this.readingList) return;

    this.readingList?.filter(listedBook => listedBook.ISBN !== book.ISBN)
    this.store.dispatch(removeFromReadingList({ book }))
    this.store.dispatch(addToBooksList({ book }))

    this.store.select('library').subscribe(library => localStorage.setItem('listedBooks', JSON.stringify(library.booksList)))
    localStorage.setItem('readingList', JSON.stringify(this.readingList))
    this.showReadingList = this.readingList.length > 0
  }

}
