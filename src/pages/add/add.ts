import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { ImageProvider } from '../../providers/image/image';
import { DatabaseProvider } from '../../providers/database/database';
import { AngularFireStorage} from 'angularfire2/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { PlacesProvider } from '../../providers/places/places';
import { Geolocation } from '@ionic-native/geolocation';

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
  public placeAddress : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
  private imageProvider: ImageProvider, private data: DatabaseProvider, private af: AngularFirestore, 
  private storage: AngularFireStorage, private afAuth: AngularFireAuth, private places: PlacesProvider,
  private geolocation: Geolocation) {
    this.afAuth.authState.subscribe(auth => {

    this.collection = af.collection<any>('users', (ref) => {
      return ref.where('uid', '==', auth.uid);
    });
    this.user = this.collection.valueChanges();
    console.log(this.user);
    });

    console.log(this.placeAddress);
      this.form = formBuilder.group({
        username: [''],
        firstname: [''],
        lastname: [''],
        title: ['', Validators.required],
        author: ['', Validators.required],
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

  getGeoLocation() {
    this.geolocation.getCurrentPosition({enableHighAccuracy: false})
    .then(location => {
      this.places.getLocation(location.coords.latitude, location.coords.longitude)
      .then((place: any) => {
        if(place.error.message) {
          console.log(place.error_message);
        } else {
          this.placeAddress = place.results[2].formatted_address;
        }
      })
    })
    .catch(error => {
      console.error(error);
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage');
  }

}
