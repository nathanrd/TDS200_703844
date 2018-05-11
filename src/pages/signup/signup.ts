import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { DatabaseProvider } from '../../providers/database/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {


  public user = {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private af: AngularFirestore, 
    private toast: ToastController,
    private afAuth: AngularFireAuth,
    private afDb: AngularFireDatabase) {
    af.firestore.settings({ timestampsInSnapshots: true })
  }

  registerUser() {
    this.af.app.auth().createUserWithEmailAndPassword(this.user.email, this.user.password)
      .then(response => {
        let profile = {
          username: this.user.username,
          firstname: this.user.firstname,
          lastname: this.user.lastname
        }
        this.afAuth.authState.subscribe(auth => {
           let collection = this.af.collection<any>('users');
           collection.add({
            username: this.user.username,
            firstname: this.user.firstname,
            lastname: this.user.lastname,
            uid: auth.uid
           });
        })
        //Runs if user was registered properly.
        console.log(response);
      })
      .catch(error => {
        //If user wasnt registered
        this.toast.create({
          message: error.message,
          duration: 2000
        }).present();
      });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
