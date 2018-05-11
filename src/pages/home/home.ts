import { Component } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public collection: AngularFirestoreCollection<any>;
  public posts: Observable<any[]>;

  constructor(private af: AngularFirestore) {
    af.firestore.settings({ timestampsInSnapshots: true })

    //Finds all subcollections of posts and inserts them into posts observable.
    this.collection = this.af.collection<any>('posts');
    this.posts = this.collection.snapshotChanges().map(actions => {
      return actions.map(action => {
        let data = action.payload.doc.data();
        let id = action.payload.doc.id;
        return {
        id,
        ...data 
        } 
      });
    });
    console.log(this.posts)
  }
  
}
