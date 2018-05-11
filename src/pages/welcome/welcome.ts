import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  //Buttons
  login(){
    this.navCtrl.push(LoginPage,  {}, {animate:false});

    }
  
    signup(){
    this.navCtrl.push(SignupPage, {}, {animate:false});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

}