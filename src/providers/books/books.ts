import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BooksProvider {

  constructor(public http: HttpClient) {
  }

  //Will implement this provider in the next version of the app.
  getBooks(search: string) {
    let url = `https://www.googleapis.com/books/v1/volumes?q=${search}`;
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        (response) => {

        },
        (error) => {
          reject(error);
        }
      );
    });
  }

}
