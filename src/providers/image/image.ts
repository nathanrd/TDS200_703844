import { HttpClient } from '@angular/common/http';
import { Injectable, Pipe, PipeTransform } from '@angular/core';
import 'rxjs/add/operator/map';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireStorage} from 'angularfire2/storage';


/*
  Generated class for the ImageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class ImageProvider{

  public cameraImage: String;

  constructor(public http: HttpClient, private camera: Camera, private storage: AngularFireStorage) {
    //console.log('Hello ImageProvider Provider');
  }

  takePhoto() : Promise<any>
  {
    return new Promise(resolve => 
    {
      //Camera Options

      let options: CameraOptions = {
        quality: 50,
        targetHeight: 640,
        targetWidth: 640,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true
      };

      this.camera.getPicture(options)
      .then((data) => {
        this.cameraImage = `data:image/jpeg;base64,${data}`;
        resolve(this.cameraImage);
      })
    })
      
    
  }

}
