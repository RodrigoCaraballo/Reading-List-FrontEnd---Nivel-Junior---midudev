import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core";
import { Book } from "../models/book";
import { Observable, map } from "rxjs";
import { JsonResponse } from "src/models/response/books.response";

@Injectable()
export class BookService {

  constructor(private readonly http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<JsonResponse>("../assets/books.json")
    .pipe(map( i => {
      return i.library.map( library => library.book)
    }))
  }
}
