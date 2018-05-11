import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {  
  public user = {
    email: '',
    password: ''
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private af: AngularFirestore, 
    private toast: ToastController) {
  }

  //Login method.
  loginUser() {
    this.af.app.auth().signInWithEmailAndPassword(this.user.email, this.user.password)
      .then(response => {
        console.log(response);
        this.navCtrl.setRoot('TabsPage');
      })
      .catch(error => {
        this.toast.create({
          message: error.message,
          duration: 2000
        }).present();
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
