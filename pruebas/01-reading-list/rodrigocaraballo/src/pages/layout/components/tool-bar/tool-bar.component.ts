import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'

import { AppState, setLibraryGenreFilter, setLibraryPagesFilter } from 'src/state/library.state';

export enum Genres {
  todos = 'Todos',
  terror = 'Terror',
  cienciaFiccion = 'Ciencia Ficción',
  zombies = 'Zombies',
  fantasia = 'Fantasía',
}

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {

  rangeValue: number = 1300
  genresOptions: string[] = Object.values(Genres);
  selectedGenre: string = Genres.todos;


  @Input() booksAvailable: number = 13;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    window.addEventListener('storage', (event: StorageEvent) => {

      if (event.key === 'libraryPagesFilter') {
        const newRangeValue = parseInt(event.newValue ?? '1300');
        this.rangeValue = newRangeValue

        const booksLS = JSON.parse(localStorage.getItem('listedBooks') ?? '[]');
        this.booksAvailable = booksLS?.length ?? 13
      }

      if (event.key === 'libraryGenreFilter') {
        const newGenreValue = event.newValue ?? '';
        this.selectedGenre = newGenreValue

        const booksLS = JSON.parse(localStorage.getItem('listedBooks') ?? '[]');
        this.booksAvailable = booksLS?.length ?? 13
      }
    })
  }

  onRangeChange(event: Event) {
    this.rangeValue = +(event.target as HTMLInputElement).value;
    this.store.dispatch(setLibraryPagesFilter({ pages: this.rangeValue }))
    localStorage.setItem('libraryPagesFilter', this.rangeValue.toString())
  }

  onSelectChange(event: Event) {
    this.selectedGenre = (event.target as HTMLInputElement).value

    this.store.dispatch(setLibraryGenreFilter({ genre: this.selectedGenre }))
    localStorage.setItem('libraryGenreFilter', this.selectedGenre.toString())
  }
}
