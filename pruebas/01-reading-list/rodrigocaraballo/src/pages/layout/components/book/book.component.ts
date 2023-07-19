import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { trigger, transition, animate, style } from '@angular/animations';

import { Book } from 'src/models/book';
import { AppState, setSelectedBook } from 'src/state/library.state';

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
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  animations: [fadeIn, fadeOut]
})
export class BookComponent {
  @Input()
  book!: Book
  isShow = true;
  animationState: string = 'from';

  constructor(private store: Store<AppState>) {}

  selectBook() {
    this.store.dispatch(setSelectedBook({book: this.book}))
  }
}
