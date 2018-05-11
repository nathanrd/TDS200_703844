import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from './config';
import { Geolocation } from '@ionic-native/geolocation';

/*
  Generated class for the PlacesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlacesProvider {

  
  constructor(public http: HttpClient, private geolocation: Geolocation) {
    console.log('Hello PlacesProvider Provider');
  }
  getLocation(lat, lng) {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true&key=${config.apiKey}`;
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        (response) => {
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
