import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LayoutComponent } from './layout.component';
import { BookComponent } from './components/book/book.component';
import { LayoutRoutingModule } from './layout.routing.module';
import { BookInfoComponent } from './components/book-info/book-info.component';
import { ReadingListComponent } from './components/reading-list/reading-list.component';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';

@NgModule({
  declarations: [
    LayoutComponent,
    BookComponent,
    BookInfoComponent,
    ReadingListComponent,
    ToolBarComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FormsModule,
  ]
})
export class LayoutModule { }
