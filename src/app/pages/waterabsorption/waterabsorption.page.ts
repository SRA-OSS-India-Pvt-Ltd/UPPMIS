import { Router } from '@angular/router';
import { HttpcallsserviceService } from './../../services/httpcallsservice.service';
/* eslint-disable radix */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable use-isnan */
/* eslint-disable no-var */
import { AlertController, Platform, LoadingController } from '@ionic/angular';
import { ToastserviceService } from './../../services/toastservice.service';
import { Constants } from 'src/app/common/constants';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

import * as watermark from 'watermarkjs';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-waterabsorption',
  templateUrl: './waterabsorption.page.html',
  styleUrls: ['./waterabsorption.page.scss'],
})
export class WaterabsorptionPage implements AfterViewInit  {
  @ViewChild('canvas') canvasEl: ElementRef;
  @ViewChild('canvas1') canvasEl1: ElementRef;
  @ViewChild('canvas2') canvasEl2: ElementRef;


  imageElement: any;
  oea: any;

  signaturePad;
  signaturePad1;
  signaturePad2;
  signatureImg: string;
  signatureImg1: string;
  signatureImg2: string;
  base641: any;
  base642: any;
  base643: any;

  qcreportno: any;
  clusterName: any;
  districtName: any;
  agencyName: any;
  schemeName: any;
  agrementNo: any;
  valOfContract: any;
  detailsList: any = [];
  dates: any;
  joindate: any;
  stageOfwork: any;

  latitude: any;
  longitude: any;
  locationCordinates: any;
  loadingLocation: boolean;
  item56: any;
  blobImage: any;
  itemboreholepic2: any;
  blobImagepic2: any;
  contractorName: any;
  upjnName: any;
  originalImage: any;
  originalImage2pic: any;
  weight1: any;
  weight2: any;
  weight3: any;

  weight21: any;
  weight22: any;
  weight23: any;

  diff1: any;
  diff2: any;
  diff3: any;

  per1: any;
  per2: any;
  per3: any;

  remarks: any;
  total: any;
  average: any;




  constructor(
    private toastSer: ToastserviceService,
    private alertCtrl: AlertController,
    private platform: Platform,
    private httpSer: HttpcallsserviceService,
    private router: Router,
    private loadingController: LoadingController
    ) {
this.setViews();
   }
   ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
    this.signaturePad1 = new SignaturePad(this.canvasEl1.nativeElement);
    this.signaturePad2 = new SignaturePad(this.canvasEl2.nativeElement);
  }




  setViews(){
    this.detailsList = Constants.schemedetailsList.filter((user: any)=>user.work_name.includes(Constants.workName));
   console.log('detailslist: ',this.detailsList);
   if(this.detailsList.length>0){
     this.qcreportno = 'Qc_swtest_'+Constants.workId+'_emp'+Constants.empid;
     this.clusterName = this.detailsList[0].cluster_name;
     this.districtName = this.detailsList[0].dist_name;
     this.agencyName = this.detailsList[0].agency_name;
     this.schemeName = this.detailsList[0].package_no;
     this.agrementNo = this.detailsList[0].agreement_no;
     this.valOfContract = this.detailsList[0].tender_value;
   }
   this.dates = new Date().toISOString();
   this.joindate =new Date().toLocaleString();

  }
  locationcheck(){


    if(this.latitude === undefined || this.longitude === undefined
      ||this.latitude === null || this.longitude === null||
      this.latitude === '' || this.longitude === ''){
            this.toastSer.presentError('Please Enter Latitude and Longitude.');


    }else{
      this.takePicture()
    }
  }


  locationcheck2(){


    if(this.latitude === undefined || this.longitude === undefined
      ||this.latitude === null || this.longitude === null||
      this.latitude === '' || this.longitude === ''){

        this.toastSer.presentError('Please Enter Latitude and Longitude.');


    }else{
      this.takePicture2()
    }
  }


  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      correctOrientation: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });
    this.addTextWatermark(image.webPath)

  }

  async takePicture2() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      correctOrientation: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });
    this.addTextWatermark2(image.webPath)

  }


  async addTextWatermark(base64String){
    const result = await watermark([base64String])
        .dataUrl(watermark.text.atPos(this.xy78,this.y63,'Latitude: '+this.latitude, '50px bold', '#FF0000', 0))
        .load('assets/icon/rv.png')
      .dataUrl(watermark.text.atPos(this.xy78,this.y83,'Longitude: '+this.longitude, '50px bold', '#FF0000', 0, 48))
      .load('assets/icon/rv.png')
      .dataUrl(watermark.text.atPos(this.xy78,this.y103,'Date: '+this.joindate, '50px bold', '#FF0000', 0, 48))


        .then( image  => {
          console.log('img',image);
          this.oea = image;
          return image;
        }).catch(error => {
          console.log('img');

         return 'error';
        });
    return result;
}

async addTextWatermark2(base64String){
  const result = await watermark([base64String])
      .dataUrl(watermark.text.atPos(this.xy78,this.y63,'Latitude: '+this.latitude, '50px bold', '#FF0000', 0))
      .load('assets/icon/rv.png')
    .dataUrl(watermark.text.atPos(this.xy78,this.y83,'Longitude: '+this.longitude, '50px bold', '#FF0000', 0, 48))
    .load('assets/icon/rv.png')
    .dataUrl(watermark.text.atPos(this.xy78,this.y103,'Date: '+this.joindate, '50px bold', '#FF0000', 0, 48))


      .then( image  => {
        console.log('img',image);
        this.imageElement = image;
        return image;
      }).catch(error => {
        console.log('img');

       return 'error';
      });
  return result;
}


    xy78(coffee, metrics, context) {
      return 28;
    };
    y63(coffee, metrics, context) {
      return 63;
    };
    y83(coffee, metrics, context) {
      return 113;
    };
    y103(coffee, metrics, context) {
      return 163;
    };  clear1() {
      this.signaturePad.clear();
    }
    clear2() {
      this.signaturePad1.clear();
    }
    clear3() {
      this.signaturePad2.clear();
    }
    startDrawing(event: Event) {
      console.log(event);
      // works in device not in browser
    }

    moved(event: Event) {
      // works in device not in browser
    }

    cumweightListioner(){
      let e11: any;
      let e12: any;
      let e13: any;
      let e14: any;
let e15: any;



      if(this.weight1 !== undefined && this.weight1 !== '' && this.weight1 !== null &&
      this.weight21 !== undefined && this.weight21 !== '' && this.weight21 !== null){

        const b11 = parseInt(this.weight1);
        const c11=  parseInt(this.weight21);

        const  d11 = c11-b11;
       if(d11 !==NaN){
          this.diff1 = d11;
          e11 = (d11/b11)*100;
          if(e11 !== NaN){
            this.per1 = e11;
          }
        }



      }


      if(this.weight2 !== undefined && this.weight2 !== '' && this.weight2 !== null &&
      this.weight22 !== undefined && this.weight22 !== '' && this.weight22 !== null){

        const b12 = parseInt(this.weight2);
        const c12=  parseInt(this.weight22);

        const  d12 = c12-b12;
       if(d12 !==NaN){
          this.diff2 = d12;
          e12 = (d12/b12)*100;
          if(e12 !== NaN){
            this.per2 = e12;
          }
        }



      }

      if(this.weight3 !== undefined && this.weight3 !== '' && this.weight3 !== null &&
      this.weight23 !== undefined && this.weight23 !== '' && this.weight23 !== null){

        const b13 = parseInt(this.weight3);
        const c13=  parseInt(this.weight23);

        const  d13 = c13-b13;
       if(d13 !==NaN){
          this.diff3 = d13;
          e13 = (d13/b13)*100;
          if(e13 !== NaN){
            this.per3 = e13;
          }
        }



      }

      if(e11 !== undefined && e12!== undefined && e13 !== undefined){
         e14 = e11+e12+e13;
        if(e14 !== NaN){
          this.total = e14;
          e15 = e14/3;
          this.average = e15;
          if(e15 <= 15){
            this.remarks = 'The Bricks are confirming to Higher class as per Clause 7.2 Table-1 of IS 1077-1992 and can be used for construction of External walls,columns and arches';
          }else{
            this.remarks = 'The Bricks are not confirming to Higher class as per Clause 7.2 Table-1 of IS 1077-1992 and can be used for construction of External walls,columns and arches';

          }
        }
      }






    }

    submit(){
      if(this.dates === undefined){
        this.toastSer.presentError('Please Enter Date of testing	')
      }else if(this.dates === null){
        this.toastSer.presentError('Please Enter Date of testing	')
      }else if(this.dates === ''){
        this.toastSer.presentError('Please Enter Date of testing	')
      }
      else if(this.stageOfwork === undefined){
        this.toastSer.presentError('Please Enter Stage of work		')
      }else if(this.stageOfwork === null){
        this.toastSer.presentError('Please Enter Stage of work		')
      }else if(this.stageOfwork === ''){
        this.toastSer.presentError('Please Enter Stage of work		')
      }else if(this.weight1 === undefined){
        this.toastSer.presentError('Please Enter Dry Weight (W1) in gms			 1	')
      }else if(this.weight1 === null){
        this.toastSer.presentError('Please Enter Dry Weight (W1) in gms			 1	')
      }else if(this.weight1 === ''){
        this.toastSer.presentError('Please Enter Dry Weight (W1) in gms			 1	')
      }
      else if(this.weight2 === undefined){
        this.toastSer.presentError('Please Enter Dry Weight (W1) in gms			 2	')
      }else if(this.weight2 === null){
        this.toastSer.presentError('Please Enter Dry Weight (W1) in gms			 2	')
      }else if(this.weight2 === ''){
        this.toastSer.presentError('Please Enter Dry Weight (W1) in gms			 2	')
      }

      else if(this.weight3 === undefined){
        this.toastSer.presentError('Please Enter Dry Weight (W1) in gms			 3	')
      }else if(this.weight3 === null){
        this.toastSer.presentError('Please Enter Dry Weight (W1) in gms			 3	')
      }else if(this.weight3 === ''){
        this.toastSer.presentError('Please Enter Dry Weight (W1) in gms			 3	')
      }

      else if(this.weight21 === undefined){
        this.toastSer.presentError('Please Enter Wet Weight (W2) in gms	 1')
      }else if(this.weight21 === null){
        this.toastSer.presentError('Please Enter Wet Weight (W2) in gms	 1')
      }else if(this.weight21 === ''){
        this.toastSer.presentError('Please Enter Wet Weight (W2) in gms	 1')
      }


      else if(this.weight22 === undefined){
        this.toastSer.presentError('Please Enter Wet Weight (W2) in gms	 2')
      }else if(this.weight22 === null){
        this.toastSer.presentError('Please Enter Wet Weight (W2) in gms	 2')
      }else if(this.weight22 === ''){
        this.toastSer.presentError('Please Enter Wet Weight (W2) in gms	 2')
      }

      else if(this.weight23 === undefined){
        this.toastSer.presentError('Please Enter Wet Weight (W2) in gms	 3')
      }else if(this.weight23 === null){
        this.toastSer.presentError('Please Enter Wet Weight (W2) in gms	 3')
      }else if(this.weight23 === ''){
        this.toastSer.presentError('Please Enter Wet Weight (W2) in gms	 3')
      }







      else if (this.oea === undefined || this.oea === '') {
        this.toastSer.presentError('Please upload  Photograph1');
      }else if (this.imageElement=== undefined || this.imageElement === '') {
        this.toastSer.presentError('Please upload  Photograph2');
      }else if (this.signaturePad.toDataURL() ===
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAAAXNSR0IArs4c6QAABGJJREFUeF7t1AEJAAAMAsHZv/RyPNwSyDncOQIECEQEFskpJgECBM5geQICBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAgQdWMQCX4yW9owAAAABJRU5ErkJggg==' ) {
        this.toastSer.presentError('please Enter the Employee Signature' );
      }else if(this.contractorName === undefined){
        this.toastSer.presentError('Please Enter  Contractor Name');
      }else if(this.contractorName === null){
        this.toastSer.presentError('Please Enter  Contractor Name');
      }else if(this.contractorName === ''){
        this.toastSer.presentError('Please Enter  Contractor Name');
      }else if (this.signaturePad1.toDataURL() ===
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAAAXNSR0IArs4c6QAABGJJREFUeF7t1AEJAAAMAsHZv/RyPNwSyDncOQIECEQEFskpJgECBM5geQICBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAgQdWMQCX4yW9owAAAABJRU5ErkJggg==' ) {
      this.toastSer.presentError('please Enter the Contractor Signature' );
    }else if(this.upjnName === undefined){
      this.toastSer.presentError('Please Enter  UPJN Name');
    }else if(this.upjnName === null){
      this.toastSer.presentError('Please Enter  UPJN Name');
    }else if(this.upjnName === ''){
      this.toastSer.presentError('Please Enter  UPJN Name');
    }else if (this.signaturePad2.toDataURL() ===
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAAAXNSR0IArs4c6QAABGJJREFUeF7t1AEJAAAMAsHZv/RyPNwSyDncOQIECEQEFskpJgECBM5geQICBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAgQdWMQCX4yW9owAAAABJRU5ErkJggg==' ) {
    this.toastSer.presentError('please Enter the UPJN Signature' );
   }else{
     this.autoLoader();
     this.callService();
   }
    }
    cancel(){
      this.router.navigate(['formselection']);

    }
    callService(){
      this.platform.ready().then(() => {
        if (this.platform.is('android')) {
          if(window.navigator.connection.type === 'none'){
            this.toastSer.presentError('Please check your internet connection');
         }else{
          this.httpSer.addWaterAbsTest(Constants.workId,Constants.empid,this.dates,this.stageOfwork,
            this.weight1,this.weight2,this.weight3,
            this.weight21,this.weight22,this.weight23,
            this.diff1,this.diff2,this.diff3,
            this.per1,this.per2,this.per3,
            this.total,this.average,this.remarks,
            this.oea,this.imageElement,this.signaturePad.toDataURL(),this.contractorName,
            this.signaturePad1.toDataURL(),this.upjnName,this.signaturePad2.toDataURL()).subscribe((response: any)=>{
                if(response.error === false){
                  this.toastSer.presentSuccess(response.msg)
                  this.router.navigate(['formselection']);
                }else{
                  this.toastSer.presentSuccess(response.msg)

                }
              });

          }

        }else{
          this.httpSer.addWaterAbsTest(Constants.workId,Constants.empid,this.dates,this.stageOfwork,
            this.weight1,this.weight2,this.weight3,
            this.weight21,this.weight22,this.weight23,
            this.diff1,this.diff2,this.diff3,
            this.per1,this.per2,this.per3,
            this.total,this.average,this.remarks,
            this.oea,this.imageElement,this.signaturePad.toDataURL(),this.contractorName,
            this.signaturePad1.toDataURL(),this.upjnName,this.signaturePad2.toDataURL()).subscribe((response: any)=>{
              if(response.error === false){
                this.toastSer.presentSuccess(response.msg)
                this.router.navigate(['formselection']);
              }else{
                this.toastSer.presentSuccess(response.msg)

              }
            });


        }
      });

    }

    autoLoader() {
      this.loadingController.create({
        spinner:'lines',
        message: 'Uploading Data. Please do not close or click back button ',
        duration: 20000
      }).then((response) => {
        response.present();
        response.onDidDismiss().then((response1) => {
          console.log('Loader dismissed', response);
        });
      });
    }
}


