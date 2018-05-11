import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { Observable } from "rxjs/Observable";
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Post } from '../../models/Post';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public collection: AngularFirestoreCollection<any>;
  public posts: Observable<any[]>;

  constructor(public navCtrl: NavController, private data: DatabaseProvider, private af: AngularFirestore) {
    af.firestore.settings({ timestampsInSnapshots: true })

    this.collection = this.af.collection<any>('posts');
    this.posts = this.collection.snapshotChanges().map(actions => { // .map traverserer et array for å modifisere objektene i det
      return actions.map(action => {
        let data = action.payload.doc.data();
        let id = action.payload.doc.id;
        return {
        id,
        ...data // Dette er spread operator, og “pakker ut” data-objektets innhold https://goo.gl/6TV33L
        } // Vi returnerer et objekt som inneholder både metadata (ID) og dataen til posten
      });
    });
    console.log(this.posts)
  }
  
}
