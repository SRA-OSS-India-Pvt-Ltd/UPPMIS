import { Component, OnInit } from '@angular/core';



import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

import { Geolocation, Position } from '@capacitor/geolocation';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-seive',
  templateUrl: './seive.page.html',
  styleUrls: ['./seive.page.scss'],
})
export class SeivePage implements OnInit {
  imageElement: any;
  imageUrl: any;
  latitude: any;
  longitude: any;
  position: Position = null;

  constructor() {

this.getCurrentPosition();

  }
 async takeSnap() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      correctOrientation: true,

      resultType: CameraResultType.Uri
    });

     this.imageUrl = image.webPath;

     console.log('path',this.imageUrl);

    this.imageElement = this.imageUrl;

  }
  async getLatLong() {
   await Geolocation.getCurrentPosition().then((resp: any)=>{
      this.latitude = resp.coords.latitude;

      this.longitude = resp.coords.longitude;
      console.log('lati',this.latitude);


    });

    }



    async takePicture() {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        correctOrientation: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
      });

      this.imageElement = image.webPath;
    }
    async getCurrentPosition() {
      const coordinates = await Geolocation.getCurrentPosition();

      this.position = coordinates;
    }

    async share() {
      await Share.share({
        title: 'Come and find me',
        text: `Here's my current location:
          ${this.position.coords.latitude},
          ${this.position.coords.longitude}`,
        url: 'http://ionicacademy.com/'
      });
    }






  ngOnInit() {
  }

}
