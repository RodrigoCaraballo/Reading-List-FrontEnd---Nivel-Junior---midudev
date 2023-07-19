import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { BookService } from './book.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [BookService]
})
export class ServiceModule { }
