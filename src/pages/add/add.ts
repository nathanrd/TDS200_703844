import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { ImageProvider } from '../../providers/image/image';
import { DatabaseProvider } from '../../providers/database/database';
import { AngularFireStorage} from 'angularfire2/storage';

/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {

  private form: FormGroup;
  public postImage : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
  private imageProvider: ImageProvider, private data: DatabaseProvider, af: AngularFirestore, 
  private storage: AngularFireStorage) {
      this.form = formBuilder.group({
        title: ['', Validators.required],
        image: ['', Validators.required],
        category: ['', Validators.required],
        department: ['', Validators.required],
        description: ['', Validators.required]
     });
  }

  takePhoto() {
    this.imageProvider.takePhoto()
    .then((data) => {
        this.postImage = data;
    })
  }

  savePost() {
    let form = this.form.getRawValue();
    this.data.addPost(form);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage');
  }

}
