import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from "rxjs/Observable";
import { AngularFireAuth } from 'angularfire2/auth';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public collection: AngularFirestoreCollection<any>;
  public user: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private af: AngularFirestore,
  private afAuth: AngularFireAuth) {
    af.firestore.settings({ timestampsInSnapshots: true })

    //Checks what user is logged in and inserts details into user observable.
    afAuth.authState.subscribe(auth => {
      this.collection = af.collection<any>('users', (ref) => {
      return ref.where('uid', '==', auth.uid);
    });
      this.user = this.collection.valueChanges();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  signOut() {
    this.af.app.auth().signOut();
  }

}
