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
  selector: 'app-cccube07',
  templateUrl: './cccube07.page.html',
  styleUrls: ['./cccube07.page.scss'],
})
export class Cccube07Page  implements AfterViewInit {
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
  date3: any;
  joindate: any;
  stagework: any;
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
  gradeOfConcrete: any;
  volumofcube = 3375000  ;
  quantityOfConcrete: any;
  noofsamples: any;
  castdate1: any;
  casttest1: any;
  castdate2: any;
  casttest2: any;
  castdate3: any;
  casttest3: any;
  casttest11: any;
  casttest22: any;
  casttest33: any;
  age1: any;
  weight1: any;
  age2: any;
  weight2: any;
  age3: any;
  weight3: any;
  density1: any;
  load1: any;

  density2: any;
  load2: any;
  density3: any;
  load3: any;
  avgStrength: any;
  charstr1: any;
  smplacce1: any;
  charstr2: any;
  smplacce2: any;
  charstr3: any;
  smplacce3: any;
  strength1: any;
  strength2: any;
  strength3: any;
  smplacce11: any;
  smplacce22: any;
  smplacce33: any;

  department: any;

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

  departmentChange($event){
    this.department = $event.target.value;
    console.log('department',this.department);
  }

  setViews(){

    this.detailsList = Constants.schemedetailsList.filter((user: any)=>user.work_name.includes(Constants.workName));
   console.log('detailslist: ',this.detailsList);
   if(this.detailsList.length>0){
     this.qcreportno = 'Qc_cccube_'+Constants.workId+'_emp'+Constants.empid;
     this.clusterName = this.detailsList[0].cluster_name;
     this.districtName = this.detailsList[0].dist_name;
     this.agencyName = this.detailsList[0].agency_name;
     this.schemeName = this.detailsList[0].package_no;
     this.agrementNo = this.detailsList[0].agreement_no;
     this.valOfContract = this.detailsList[0].tender_value;
   }
   this.date3 = new Date().toISOString();
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
    quantityListioner(){
      let k9;
      if(this.quantityOfConcrete !== undefined && this.quantityOfConcrete !== '' && this.quantityOfConcrete !== null){
        const d9 = parseInt(this.quantityOfConcrete);
        if(d9 >= 1 && d9 <= 5){
          k9 = 1;
          this.noofsamples = 1;
        }else if(d9>=6 && d9<= 15){
          k9 = 2;
          this.noofsamples = 2;
        }else if(d9>=16 && d9<= 30){
          k9 = 3;
          this.noofsamples = 3;
        }else if(d9>=31 && d9<= 50){
          k9 = 4;
          this.noofsamples = 4;
        }else{
          k9 = 0;
          this.noofsamples = 0;

        }
      }
    }
    gradeListioners(){
      let k6;
      if(this.gradeOfConcrete !== undefined && this.gradeOfConcrete !== '' && this.gradeOfConcrete !== null){
         k6 = parseInt(this.gradeOfConcrete);
         this.charstr1 = k6 *0.6666;
         this.charstr2 = k6 *0.6666;
         this.charstr3 = k6 *0.6666;

      }
    }
    weightListioners(){
      let f11;
      let f12;
      let f13;
      if(this.weight1 !== undefined && this.weight1 !== '' && this.weight1 !== null){
        f11= (parseInt(this.weight1) * 1000)/3375000
        if(f11 !== NaN){
          this.density1 = f11;
        }
      }

      if(this.weight2 !== undefined && this.weight2 !== '' && this.weight2 !== null){
        f12= (parseInt(this.weight2) * 1000)/3375000
        if(f12 !== NaN){
          this.density2 = f12;
        }
      }

      if(this.weight3 !== undefined && this.weight3 !== '' && this.weight3 !== null){
        f13= (parseInt(this.weight3) * 1000)/3375000;
        if(f13 !== NaN){
          this.density3 = f13;
        }
      }

    }
    loadListioners(){
      let h11;
      let h12;
      let h13;
      let j11;
      let l11;
      let l12;
      let l13;
      let l14;
      let l15;
      let l16;
      if(this.load1 !== undefined && this.load1 !== '' && this.load1 !== null){
        h11 = (parseInt(this.load1)/3375000)*100000;
        if(h11 !== NaN){
          this.strength1 = h11;
        }
      }
      if(this.load2 !== undefined && this.load2 !== '' && this.load2 !== null){
        h12 = (parseInt(this.load2)/3375000)*100000;
        if(h12 !== NaN){
          this.strength2 = h12;
        }
      }

      if(this.load3 !== undefined && this.load3 !== '' && this.load3 !== null){
        h13 = (parseInt(this.load3)/3375000)*100000;
        if(h13 !== NaN){
          this.strength3 = h13;
        }
      }
      if(h11 !== undefined && h11 !== '' && h11 !== null &&
      h12 !== undefined && h12 !== '' && h12 !== null &&
      h13 !== undefined && h13 !== '' && h13 !== null){

        var sum =h11+h12+h13;
        j11 = (sum)/3
        if(j11 !== NaN){
          this.avgStrength = j11;
          if(j11 >=25){
            this.remarks = 'The rate of gain of strength of the cube is Satisfactory as per IS: 456 2000'
          }else{
            this.remarks = 'The rate of gain of strength of the cube is not Satisfactory as per IS:456 2000'
          }
        }
        l11 = h11*1.15;
        l14 = (h11 * 1)/1.15;
        if(l11 !== NaN){
          this.smplacce1 = l11;
        }
        l14 = (h11 * 1)/1.15;
        if(l14 !== NaN){
          this.smplacce11 = l14;
        }


        l12 = h12*1.15;
        if(l12 !== NaN){
          this.smplacce2 = l12;
        }

        l15 = (h12 * 1)/1.15;
        if(l15 !== NaN){
          this.smplacce22 = l15;
        }

        l13 = h13*1.15;
        if(l13 !== NaN){
          this.smplacce3 = l13;
        }

        l16 = (h13 * 1)/1.15;
        if(l16 !== NaN){
          this.smplacce33 = l16;
        }




      }

    }
    datesListioners(){
      if(this.castdate1 !== undefined && this.castdate1 !== null && this.castdate1 !== '' ){
        var tempDate = new Date(this.castdate1);
        tempDate.setDate(tempDate.getDate() +  7)
        console.log('datess', tempDate.toISOString());
        this.casttest11 = tempDate.toISOString();
        var dates= tempDate.toISOString();
        this.casttest1= dates.substring(8,10)+'-'+dates.substring(5,7)+'-'+dates.substring(0,4)
        this.age1 = 7

      }

      if(this.castdate2 !== undefined && this.castdate2 !== null && this.castdate2 !== ''){
        var tempDate = new Date(this.castdate2);
        tempDate.setDate(tempDate.getDate() +  7)
        console.log('datess', tempDate.toLocaleString());
        this.casttest22 = tempDate.toISOString();
        var dates= tempDate.toISOString();
        this.casttest2= dates.substring(8,10)+'-'+dates.substring(5,7)+'-'+dates.substring(0,4)
        this.age2 = 7
      }

      if(this.castdate3 !== undefined && this.castdate3 !== null && this.castdate3 !== ''){
        var tempDate = new Date(this.castdate3);
        tempDate.setDate(tempDate.getDate() +  7)
        console.log('datess', tempDate.toLocaleString());
        this.casttest33 = tempDate.toISOString();
        var dates= tempDate.toISOString();
        this.casttest3= dates.substring(8,10)+'-'+dates.substring(5,7)+'-'+dates.substring(0,4)
        this.age3 = 7
      }





    }

    submit(){
      if(this.department === undefined){
        this.toastSer.presentError('Please Select Department	')

      }else if(this.department === null){
        this.toastSer.presentError('Please Select Department	')

      }else if(this.department === ''){
        this.toastSer.presentError('Please Select Department	')

      }
       else if(this.gradeOfConcrete === undefined){
        this.toastSer.presentError('Please Enter Grade of Concrete				')
      }else if(this.gradeOfConcrete === null){
        this.toastSer.presentError('Please Enter Grade of Concrete				')
      }else if(this.gradeOfConcrete === ''){
        this.toastSer.presentError('Please Enter Grade of Concrete				')
      }else if(this.stagework === undefined){
        this.toastSer.presentError('Please Enter Stage of work		')
      }else if(this.stagework === null){
        this.toastSer.presentError('Please Enter Stage of work		')
      }else if(this.stagework === ''){
        this.toastSer.presentError('Please Enter Stage of work		')
      }else if(this.quantityOfConcrete === undefined){
        this.toastSer.presentError('Please Enter Quantity of concrete laid in m		')
      }else if(this.quantityOfConcrete === ''){
        this.toastSer.presentError('Please Enter Quantity of concrete laid in m		')
      }else if(this.quantityOfConcrete === null){
        this.toastSer.presentError('Please Enter Quantity of concrete laid in m		')
      }else if(this.noofsamples === undefined){
        this.toastSer.presentError('Please Enter Number of Samples		')
      }else if(this.noofsamples === ''){
        this.toastSer.presentError('Please Enter Number of Samples		')
      }else if(this.noofsamples === null){
        this.toastSer.presentError('Please Enter Number of Samples		')
      }
      else if(this.castdate1 === undefined){
        this.toastSer.presentError('Please Enter Date of Casting 1	')
      }else if(this.castdate1 === ''){
        this.toastSer.presentError('Please Enter Date of Casting 1	')
      }else if(this.castdate1 === null){
        this.toastSer.presentError('Please Enter Date of Casting 1	')
      }
      else if(this.casttest1 === undefined){
        this.toastSer.presentError('Please Enter Date of Testing 1	')
      }else if(this.casttest1 === ''){
        this.toastSer.presentError('Please Enter Date of Testing 1	')
      }else if(this.casttest1 === null){
        this.toastSer.presentError('Please Enter Date of Testing 1	')
      }
      else if(this.castdate2 === undefined){
        this.toastSer.presentError('Please Enter Date of Casting 2	')
      }else if(this.castdate2 === ''){
        this.toastSer.presentError('Please Enter Date of Casting 2	')
      }else if(this.castdate2 === null){
        this.toastSer.presentError('Please Enter Date of Casting 2	')
      }
      else if(this.casttest2 === undefined){
        this.toastSer.presentError('Please Enter Date of Testing 2	')
      }else if(this.casttest2 === ''){
        this.toastSer.presentError('Please Enter Date of Testing 2	')
      }else if(this.casttest2 === null){
        this.toastSer.presentError('Please Enter Date of Testing 2	')
      }

      else if(this.castdate3 === undefined){
        this.toastSer.presentError('Please Enter Date of Casting 3	')
      }else if(this.castdate3 === ''){
        this.toastSer.presentError('Please Enter Date of Casting 3	')
      }else if(this.castdate3 === null){
        this.toastSer.presentError('Please Enter Date of Casting 3	')
      }
      else if(this.casttest3 === undefined){
        this.toastSer.presentError('Please Enter Date of Testing 3	')
      }else if(this.casttest3 === ''){
        this.toastSer.presentError('Please Enter Date of Testing 3	')
      }else if(this.casttest3 === null){
        this.toastSer.presentError('Please Enter Date of Testing 3	')
      }else if(this.weight1 === undefined){
        this.toastSer.presentError('Please Enter weight of the cube 1	')
      }else if(this.weight1 === ''){
        this.toastSer.presentError('Please Enter weight of the cube 1	')
      }else if(this.weight1 === null){
        this.toastSer.presentError('Please Enter weight of the cube 1	')
      }else if(this.weight2 === undefined){
        this.toastSer.presentError('Please Enter weight of the cube 2	')
      }else if(this.weight2 === ''){
        this.toastSer.presentError('Please Enter weight of the cube 2	')
      }else if(this.weight2 === null){
        this.toastSer.presentError('Please Enter weight of the cube 2	')
      }else if(this.weight3 === undefined){
        this.toastSer.presentError('Please Enter weight of the cube 3	')
      }else if(this.weight3 === ''){
        this.toastSer.presentError('Please Enter weight of the cube 3	')
      }else if(this.weight3 === null){
        this.toastSer.presentError('Please Enter weight of the cube 3	')
      }else if(this.load1 === undefined){
        this.toastSer.presentError('Please Enter Load in KN (1 Tonne =10 KN) 1	')
      }else if(this.load1 === null){
        this.toastSer.presentError('Please Enter Load in KN (1 Tonne =10 KN) 1	')
      }else if(this.load1 === ''){
        this.toastSer.presentError('Please Enter Load in KN (1 Tonne =10 KN) 1	')
      }else if(this.load2 === undefined){
        this.toastSer.presentError('Please Enter Load in KN (1 Tonne =10 KN) 2	')
      }else if(this.load2 === null){
        this.toastSer.presentError('Please Enter Load in KN (1 Tonne =10 KN) 2	')
      }else if(this.load2 === ''){
        this.toastSer.presentError('Please Enter Load in KN (1 Tonne =10 KN) 2	')
      }else if(this.load3 === undefined){
        this.toastSer.presentError('Please Enter Load in KN (1 Tonne =10 KN) 3	')
      }else if(this.load3 === null){
        this.toastSer.presentError('Please Enter Load in KN (1 Tonne =10 KN) 3	')
      }else if(this.load3 === ''){
        this.toastSer.presentError('Please Enter Load in KN (1 Tonne =10 KN) 3	')
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
            this.httpSer.addCC_Cube_7Test(Constants.workId,Constants.empid,this.department,this.quantityOfConcrete,
              this.gradeOfConcrete,this.stagework,this.noofsamples,
              this.castdate1,this.casttest11,this.age1,this.density1,this.load1,this.strength1,this.avgStrength,this.charstr1,this.smplacce1,this.smplacce11,
              this.castdate2,this.casttest22,this.age2,this.density2,this.load2,this.strength2,this.charstr2,this.smplacce2,this.smplacce22,
              this.castdate3,this.casttest33,this.age3,this.density3,this.load3,this.strength3,this.charstr3,this.smplacce3,this.smplacce33,
              this.remarks,this.weight1,this.weight2,this.weight3,
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
          this.httpSer.addCC_Cube_7Test(Constants.workId,Constants.empid,this.department,this.quantityOfConcrete,
            this.gradeOfConcrete,this.stagework,this.noofsamples,
            this.castdate1,this.casttest11,this.age1,this.density1,this.load1,this.strength1,this.avgStrength,this.charstr1,this.smplacce1,this.smplacce11,
            this.castdate2,this.casttest22,this.age2,this.density2,this.load2,this.strength2,this.charstr2,this.smplacce2,this.smplacce22,
            this.castdate3,this.casttest33,this.age3,this.density3,this.load3,this.strength3,this.charstr3,this.smplacce3,this.smplacce33,
            this.remarks,this.weight1,this.weight2,this.weight3,
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

