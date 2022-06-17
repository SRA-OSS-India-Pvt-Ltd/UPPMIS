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
  selector: 'app-ca12',
  templateUrl: './ca12.page.html',
  styleUrls: ['./ca12.page.scss'],
})
export class Ca12Page implements AfterViewInit  {
  @ViewChild('canvas') canvasEl: ElementRef;
  @ViewChild('canvas1') canvasEl1: ElementRef;
  @ViewChild('canvas2') canvasEl2: ElementRef;



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
  date4: any;
  joindate: any;
  stageOfwork: any;
  remarks: any;
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
  materialSource: any;
  sizeofMaterial: any;
  weightOfSample = 5000;
  weight1: any;
  weight2: any;
  weight3: any;
  weight4: any;


  cumwt1: any;
  cumwt2: any;
  cumwt3: any;
  cumwt4: any;


  retainwt1: any;
  retainwt2: any;
  retainwt3: any;
  retainwt4: any;


  paasing1: any;
  paasing2: any;
  paasing3: any;
  paasing4: any;

  imageElement: any;
  oea: any;


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
     this.qcreportno = 'Qc_c20mm_'+Constants.workId+'_emp'+Constants.empid;
     this.clusterName = this.detailsList[0].cluster_name;
     this.districtName = this.detailsList[0].dist_name;
     this.agencyName = this.detailsList[0].agency_name;
     this.schemeName = this.detailsList[0].package_no;
     this.agrementNo = this.detailsList[0].agreement_no;
     this.valOfContract = this.detailsList[0].tender_value;
   }
   this.date4 = new Date().toISOString();
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
      let c13;
      let d13;
      let e13;
      let j13;

      let c14;
      let d14;
      let e14;
      let j14;
      let c15;
      let d15;
      let e15;
      let j15;
      let c16;
      let d16;
      let e16;
      let j16;







      const i10= this.weightOfSample;
      if(this.weight1 !== undefined && this.weight1 !== '' && this.weight1 !== null){


        const  b13 = parseInt(this.weight1);
        c13 = b13
      this.cumwt1 = c13;
      if(this.cumwt1 !== undefined && this.cumwt1 !== '' && this.cumwt1 !== null){
        if(c13 !== NaN){
          d13 = (c13/i10)*100;
          this.retainwt1 = d13;
          e13 =((i10-c13)/i10)*100;

          this.paasing1 = e13;

        }
      }


      if(this.paasing1 !== undefined && this.paasing1 !== '' && this.paasing1 !== null){
        if(e13 !== NaN){
         if(e13 === 100){
           j13 = 1;
         }else{
           j13 = -1;
         }
        }
      }



      }


      if(this.weight2 !== undefined && this.weight2 !== '' && this.weight2 !== null &&
      this.cumwt1 !== undefined && this.cumwt1 !== '' && this.cumwt1 !== null){

        const  cc13 = parseInt(this.cumwt1);

        const  b14 = parseInt(this.weight2);
        c14 = cc13+ b14;
      this.cumwt2 = c14;
      if(this.cumwt2 !== undefined && this.cumwt2 !== '' && this.cumwt2 !== null){
        if(c14 !== NaN){
          d14 = (c14/i10)*100;
          this.retainwt2 = d14;
          e14 =((i10-c14)/i10)*100;

          this.paasing2 = e14;

        }
      }


      if(this.paasing2 !== undefined && this.paasing2 !== '' && this.paasing2 !== null){
        if(e14 !== NaN){
         if(e14 >= 90){
           j14 = 1;
         }else{
           j14 = -1;
         }
        }
      }



      }


      if(this.weight3 !== undefined && this.weight3 !== '' && this.weight3 !== null &&
      this.cumwt2 !== undefined && this.cumwt2 !== '' && this.cumwt2 !== null){

        const  cc14 = parseInt(this.cumwt2);

        const  b15 = parseInt(this.weight3);
        c15 = cc14+ b15;
      this.cumwt3 = c15;
      if(this.cumwt3 !== undefined && this.cumwt3 !== '' && this.cumwt3 !== null){
        if(c15 !== NaN){
          d15 = (c15/i10)*100;
          this.retainwt3 = d15;
          e15 =((i10-c15)/i10)*100;

          this.paasing3 = e15;

        }
      }


      if(this.paasing3 !== undefined && this.paasing3 !== '' && this.paasing3 !== null){
        if(e15 !== NaN){
          if(e15 >= 40 && e15 <=85){
            j15 = 1;
         }else{
           j15 = -1;
         }
        }
      }



      }


      if(this.weight4 !== undefined && this.weight4 !== '' && this.weight4 !== null &&
      this.cumwt3 !== undefined && this.cumwt3 !== '' && this.cumwt3 !== null){

        const  cc15 = parseInt(this.cumwt3);

        const  b16 = parseInt(this.weight4);
        c16 = cc15+ b16;
      this.cumwt4 = c16;
      if(this.cumwt4 !== undefined && this.cumwt4 !== '' && this.cumwt4 !== null){
        if(c16 !== NaN){
          d16 = (c16/i10)*100;
          this.retainwt4 = d16;
          e16 =((i10-c16)/i10)*100;

          this.paasing4 = e16;

        }
      }


      if(this.paasing4 !== undefined && this.paasing4 !== '' && this.paasing4 !== null){
        if(e16 !== NaN){
         if(e16 >=0 && e16 <=10){
           j16 = 1;
         }else{
           j16 = -1;
         }
        }
      }



      }






      if(j14 !== undefined && j15 !== undefined && j16 !== undefined && j13 !== undefined){
      if(j14 === 1 && j15 === 1 && j16 === 1 && j13 === 1 ){
        this.remarks ='The Coarse aggregate tested are confirming to the conditions of Table-7 Clause-6.2 of IS 383-2016';
      }else{
        this.remarks = 'The Coarse aggregate tested are not  confirming to the conditions of Table-7 Clause-6.2 of IS 383-2016'
      }

    }

    }

    submit(){
      if(this.date4 === undefined){
        this.toastSer.presentError('Please Enter Date of testing	')
      }else if(this.date4 === null){
        this.toastSer.presentError('Please Enter Date of testing	')
      }else if(this.date4 === ''){
        this.toastSer.presentError('Please Enter Date of testing	')
      }else if(this.materialSource === undefined){
        this.toastSer.presentError('Please Enter Material Source			')
      }else if(this.materialSource === null){
        this.toastSer.presentError('Please Enter Material Source	')
      }else if(this.materialSource === ''){
        this.toastSer.presentError('Please Enter Material Source	')
      }
      else if(this.stageOfwork === undefined){
        this.toastSer.presentError('Please Enter Stage of work		')
      }else if(this.stageOfwork === null){
        this.toastSer.presentError('Please Enter Stage of work		')
      }else if(this.stageOfwork === ''){
        this.toastSer.presentError('Please Enter Stage of work		')
      }else if(this.sizeofMaterial === undefined){
        this.toastSer.presentError('Please Enter Size of Material	')
      }else if(this.sizeofMaterial === null){
        this.toastSer.presentError('Please Enter Size of Material	')
      }else if(this.sizeofMaterial === ''){
        this.toastSer.presentError('Please Enter Size of Material	')
      }else if(this.weight1 === undefined){
        this.toastSer.presentError('Please Enter Weight Retained (grms)	 1	')
      }else if(this.weight1 === null){
        this.toastSer.presentError('Please Enter Weight Retained (grms)	 1	')
      }else if(this.weight1 === ''){
        this.toastSer.presentError('Please Enter Weight Retained (grms)	 1	')
      }
      else if(this.weight2 === undefined){
        this.toastSer.presentError('Please Enter Weight Retained (grms)	 2	')
      }else if(this.weight2 === null){
        this.toastSer.presentError('Please Enter Weight Retained (grms)	 2	')
      }else if(this.weight2 === ''){
        this.toastSer.presentError('Please Enter Weight Retained (grms)	 2	')
      }

      else if(this.weight3 === undefined){
        this.toastSer.presentError('Please Enter Weight Retained (grms)	 3	')
      }else if(this.weight3 === null){
        this.toastSer.presentError('Please Enter Weight Retained (grms)	 3	')
      }else if(this.weight3 === ''){
        this.toastSer.presentError('Please Enter Weight Retained (grms)	 3	')
      }

      else if(this.weight4 === undefined){
        this.toastSer.presentError('Please Enter Weight Retained (grms)	 4	')
      }else if(this.weight4 === null){
        this.toastSer.presentError('Please Enter Weight Retained (grms)	 4	')
      }else if(this.weight4 === ''){
        this.toastSer.presentError('Please Enter Weight Retained (grms)	 4	')
      }



      else if(this.cumwt1 === undefined){
        this.toastSer.presentError('Please Enter Cumulative Weight retained in grms	1	')
      }else if(this.cumwt1 === null){
        this.toastSer.presentError('Please Enter Cumulative Weight retained in grms	1	')
      }else if(this.cumwt1 === ''){
        this.toastSer.presentError('Please Enter Cumulative Weight retained in grms	1	')
      }
      else if(this.retainwt1 === undefined){
        this.toastSer.presentError('Please Enter Cum % weight Retained		1	')
      }else if(this.retainwt1 === null){
        this.toastSer.presentError('Please Enter Cum % weight Retained		1	')
      }else if(this.retainwt1 === ''){
        this.toastSer.presentError('Please Enter Cum % weight Retained		1	')
      }
      else if(this.paasing1 === undefined){
        this.toastSer.presentError('Please Enter % Passing		1	')
      }else if(this.paasing1 === null){
        this.toastSer.presentError('Please Enter % Passing		1	')
      }else if(this.paasing1 === ''){
        this.toastSer.presentError('Please Enter % Passing	1	')
      }else if (this.oea === undefined || this.oea === '') {
        this.toastSer.presentError('Please upload  Photograph1');
      }else if (this.imageElement=== undefined || this.imageElement === '') {
        this.toastSer.presentError('Please upload  Photograph2');
      }
        else if (this.signaturePad.toDataURL() ===
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
          this.httpSer.addCAGrade12_5Test(Constants.workId,Constants.empid,this.date4,this.materialSource,this.sizeofMaterial,this.stageOfwork,
            this.weight1,this.cumwt1,this.retainwt1,this.paasing1,
            this.weight2,this.cumwt2,this.retainwt2,this.paasing2,
            this.weight3,this.cumwt3,this.retainwt3,this.paasing3,
            this.weight4,this.cumwt4,this.retainwt4,this.paasing4,
            this.remarks,this.oea,
            this.imageElement,this.signaturePad.toDataURL(),this.contractorName,
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
          this.httpSer.addCAGrade12_5Test(Constants.workId,Constants.empid,this.date4,this.materialSource,this.sizeofMaterial,this.stageOfwork,
            this.weight1,this.cumwt1,this.retainwt1,this.paasing1,
            this.weight2,this.cumwt2,this.retainwt2,this.paasing2,
            this.weight3,this.cumwt3,this.retainwt3,this.paasing3,
            this.weight4,this.cumwt4,this.retainwt4,this.paasing4,
            this.remarks,this.oea,
            this.imageElement.nativeElement.src,this.signaturePad.toDataURL(),this.contractorName,
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



