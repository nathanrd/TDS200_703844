import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';

@Injectable()
export class DatabaseProvider {

  public collection: AngularFirestoreCollection<any>;
  public posts: Observable<any[]>;


  constructor(public http: HttpClient, private af: AngularFirestore, private storage: AngularFireStorage) {
  }

  //Add post method
  addPost(post) : Promise<any> {
    return new Promise((resolve) => {
      this.collection = this.af.collection<any>('posts');
      this.collection.add({post});
      resolve(true);
    });
  }

  //Upload image to firebaseStorage.
  uploadImage(imageString) : Promise<any> {
    let imageName : string = `book-${new Date().getTime()}.jpg`;
    return new Promise((resolve, reject) => {
    let task = this.storage
      .ref(imageName)
      .putString(imageString, 'base64', { contentType: 'image/jpg' });

    let uploadEvent = task.downloadURL();
    uploadEvent.subscribe((uploadedImageUrl) => {
      resolve(uploadedImageUrl);
    })
    }); 
  }
}
