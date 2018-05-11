import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the BooksProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BooksProvider {

  constructor(public http: HttpClient) {
    //console.log('Hello BooksProvider Provider');
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
