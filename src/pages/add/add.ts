import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { ImageProvider } from '../../providers/image/image';
import { DatabaseProvider } from '../../providers/database/database';
import { AngularFireStorage} from 'angularfire2/storage';
import { AngularFireAuth } from 'angularfire2/auth';

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
  public collection: AngularFirestoreCollection<any>;
  public user: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
  private imageProvider: ImageProvider, private data: DatabaseProvider, private af: AngularFirestore, 
  private storage: AngularFireStorage, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(auth => {

    this.collection = af.collection<any>('users', (ref) => {
      return ref.where('uid', '==', auth.uid);
    });
    this.user = this.collection.valueChanges();
    console.log(this.user);
    });
      this.form = formBuilder.group({
        username: [''],
        firstname: [''],
        lastname: [''],
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
