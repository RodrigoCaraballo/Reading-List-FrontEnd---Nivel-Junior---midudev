import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Book } from 'src/models/book';
import { BookService } from 'src/services/book.service';
import { AppState, loadBooksList } from 'src/state/library.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rodrigocaraballo';

  constructor(private bookService: BookService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next: (books: Book[]) => {
        this.store.dispatch(loadBooksList({ books }));
        localStorage.setItem('listedBooks', JSON.stringify(books))
      },
      error: (error) => console.log(error)
    })
  }


}
