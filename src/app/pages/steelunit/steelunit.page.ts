import { Router } from '@angular/router';
import { HttpcallsserviceService } from './../../services/httpcallsservice.service';
/* eslint-disable radix */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable use-isnan */
/* eslint-disable no-var */
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { ToastserviceService } from './../../services/toastservice.service';
import { Constants } from 'src/app/common/constants';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

import * as watermark from 'watermarkjs';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-steelunit',
  templateUrl: './steelunit.page.html',
  styleUrls: ['./steelunit.page.scss'],
})
export class SteelunitPage implements AfterViewInit  {
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
  remarks1: any;
  remarks2: any;
  remarks3: any;
  remarks4: any;
  remarks5: any;

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
  gradeOfSteel: any;
  weight1: any;
  weight2: any;
  weight3: any;
  weight4: any;
  weight5: any;
  diff1: any;
  diff2: any;
  diff3: any;
  diff4: any;
  diff5: any;
  observation1: any;
  observation2: any;
  observation3: any;
  observation4: any;
  observation5: any;


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
    };
    clear1() {
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
      let f12: any;
      let f13: any;
      let f14: any;
      let f15: any;
      let f16: any;



      if(this.weight1 !== undefined && this.weight1 !== '' && this.weight1 !== null){


        const  e12 = parseInt(this.weight1);

        f12= e12-395;
        if(f12!== NaN){
          this.diff1 = f12;
          if(f12 > -31.6){
            this.observation1='The results for 8 mm Dia of Steel confirming to specifications of IS 1786-2008'
          }else{
            this.observation1 = 'The results for 8 mm Dia of Steel not confirming to specifications of IS 1786-2008'
          }
        }


      }

      if(this.weight2 !== undefined && this.weight2 !== '' && this.weight2 !== null){


        const  e13 = parseInt(this.weight2);

        f13= e13-617;
        if(f13!== NaN){
          this.diff2 = f13;
          if(f13 > -49.36){
            this.observation2='The results for 10 mm Dia of Steel confirming to specifications of IS 1786-2008'
          }else{
            this.observation2 = 'The results for 10 mm Dia of Steel not confirming to specifications of IS 1786-2008'
          }
        }


      }

      if(this.weight3 !== undefined && this.weight3 !== '' && this.weight3 !== null){


        const  e14 = parseInt(this.weight3);

        f14= e14-888;
        if(f14!== NaN){
          this.diff3 = f14;
          if(f14 > -53.28){
            this.observation3='The results for 12 mm Dia of Steel confirming to specifications of IS 1786-2008'
          }else{
            this.observation3 = 'The results for 12 mm Dia of Steel not confirming to specifications of IS 1786-2008'
          }
        }


      }
      if(this.weight4 !== undefined && this.weight4 !== '' && this.weight4 !== null){


        const  e15 = parseInt(this.weight4);

        f15= e15-1580;
        if(f15!== NaN){
          this.diff4 = f15;
          if(f15 > -94.80){
            this.observation4='The results for 16 mm Dia of Steel confirming to specifications of IS 1786-2008'
          }else{
            this.observation4 = 'The results for 16 mm Dia of Steel not confirming to specifications of IS 1786-2008'
          }
        }


      }

      if(this.weight5 !== undefined && this.weight5 !== '' && this.weight5 !== null){


        const  e16 = parseInt(this.weight5);

        f16= e16-2470;
        if(f16!== NaN){
          this.diff5 = f16;
          if(f16 > -94.80){
            this.observation5='The results for 20 mm Dia of Steel confirming to specifications of IS 1786-2008'
          }else{
            this.observation5 = 'The results for 20 mm Dia of Steel not confirming to specifications of IS 1786-2008'
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
      }else if(this.gradeOfSteel === undefined){
        this.toastSer.presentError('Please Enter Grade of steel				')
      }else if(this.gradeOfSteel === null){
        this.toastSer.presentError('Please Enter Grade of steel		')
      }else if(this.gradeOfSteel === ''){
        this.toastSer.presentError('Please Enter Grade of steel		')
      }
      else if(this.weight1 === undefined){
        this.toastSer.presentError('Please Enter Actual Weight in grms			 1	')
      }else if(this.weight1 === null){
        this.toastSer.presentError('Please Enter Actual Weight in grms			 1	')
      }else if(this.weight1 === ''){
        this.toastSer.presentError('Please Enter Actual Weight in grms			 1	')
      }
      else if(this.weight2 === undefined){
        this.toastSer.presentError('Please Enter Actual Weight in grms			 2	')
      }else if(this.weight2 === null){
        this.toastSer.presentError('Please Enter Actual Weight in grms			 2	')
      }else if(this.weight2 === ''){
        this.toastSer.presentError('Please Enter Actual Weight in grms			 2	')
      }

      else if(this.weight3 === undefined){
        this.toastSer.presentError('Please Enter Actual Weight in grms			 3	')
      }else if(this.weight3 === null){
        this.toastSer.presentError('Please Enter Actual Weight in grms			 3	')
      }else if(this.weight3 === ''){
        this.toastSer.presentError('Please Enter Actual Weight in grms			 3	')
      }

      else if(this.weight4 === undefined){
        this.toastSer.presentError('Please Enter Actual Weight in grms			 4	')
      }else if(this.weight4 === null){
        this.toastSer.presentError('Please Enter Actual Weight in grms			 4	')
      }else if(this.weight4 === ''){
        this.toastSer.presentError('Please Enter Actual Weight in grms			 4	')
      }

      else if(this.weight5 === undefined){
        this.toastSer.presentError('Please Enter Actual Weight in grms			 5	')
      }else if(this.weight5 === null){
        this.toastSer.presentError('Please Enter Actual Weight in grms			 5	')
      }else if(this.weight5 === ''){
        this.toastSer.presentError('Please Enter Actual Weight in grms			 5	')
      }
      else if(this.remarks1 === undefined){
        this.toastSer.presentError('Please Enter Remarks 1')
      }else if(this.remarks1 === null){
        this.toastSer.presentError('Please Enter Remarks 1	')
      }else if(this.remarks1 === ''){
        this.toastSer.presentError('Please Enter Remarks 1')
      }
      else if(this.remarks2 === undefined){
        this.toastSer.presentError('Please Enter Remarks 2')
      }else if(this.remarks2 === null){
        this.toastSer.presentError('Please Enter Remarks 2	')
      }else if(this.remarks2 === ''){
        this.toastSer.presentError('Please Enter Remarks 2')
      }
      else if(this.remarks3 === undefined){
        this.toastSer.presentError('Please Enter Remarks 3')
      }else if(this.remarks3 === null){
        this.toastSer.presentError('Please Enter Remarks 3	')
      }else if(this.remarks3 === ''){
        this.toastSer.presentError('Please Enter Remarks 3')
      }
      else if(this.remarks4 === undefined){
        this.toastSer.presentError('Please Enter Remarks 4')
      }else if(this.remarks4 === null){
        this.toastSer.presentError('Please Enter Remarks 4	')
      }else if(this.remarks4 === ''){
        this.toastSer.presentError('Please Enter Remarks 4')
      }
      else if(this.remarks5 === undefined){
        this.toastSer.presentError('Please Enter Remarks 5')
      }else if(this.remarks5 === null){
        this.toastSer.presentError('Please Enter Remarks 5	')
      }else if(this.remarks5 === ''){
        this.toastSer.presentError('Please Enter Remarks 5')
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
          this.httpSer.addSteelUnitWtTest(Constants.workId,Constants.empid,this.dates,this.gradeOfSteel,this.stageOfwork,
            395,617,888,1580,2470,this.weight1,this.weight2,this.weight3,this.weight4,this.weight5,
            this.diff1,this.diff2,this.diff3,this.diff4,this.diff5,this.observation1,this.observation2,this.observation3,this.observation4,this.observation5,
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
          this.httpSer.addSteelUnitWtTest(Constants.workId,Constants.empid,this.dates,this.gradeOfSteel,this.stageOfwork,
            395,617,888,1580,2470,this.weight1,this.weight2,this.weight3,this.weight4,this.weight5,
            this.diff1,this.diff2,this.diff3,this.diff4,this.diff5,this.observation1,this.observation2,this.observation3,this.observation4,this.observation5,
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


