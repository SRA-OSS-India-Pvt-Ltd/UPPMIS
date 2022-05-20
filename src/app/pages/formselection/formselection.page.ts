import { ToastserviceService } from './../../services/toastservice.service';
import { Constants } from 'src/app/common/constants';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formselection',
  templateUrl: './formselection.page.html',
  styleUrls: ['./formselection.page.scss'],
})
export class FormselectionPage implements OnInit {
  worklist: any = [];
  slist: any;
  workid: any;
  form: any;

  constructor(private router: Router,
    private toastSer: ToastserviceService) {
    this.worklist = Constants.schemedetailsList;
  }

  ionViewDidEnter(){
    this.worklist = Constants.schemedetailsList;

  }

  ngOnInit() {
  }

  workchange($event){
    this.slist = [$event.target.value];
    console.log('slist',this.slist);

    if(this.slist.length>0){
      this.workid =this.slist[0].work_id;
      Constants.workName = this.slist[0].work_name;
      Constants.workId = this.slist[0].work_id;
      console.log('workid',this.workid,Constants.workName);


    }
  }

  formchange($event){
    this.form = $event.target.value;
    console.log('form: ',$event.target.value);
      }


  onClick(){
  this.router.navigate(['dashboard']);
  }

  move(){
    if(this.workid === undefined){
      this.toastSer.presentError('Please select work');
    }else if(this.form === undefined){
      this.toastSer.presentError('Please select Form');
    }else{
      if(this.form === 'Slit Content'){
        this.router.navigate(['slitcontent']);
      }else if(this.form === 'Slump Test'){
        this.router.navigate(['slumptest']);
      }else if(this.form === 'CC-Cube test for 28 days'){
        this.router.navigate(['cccube28']);
      }else if(this.form === 'Seive analysis-concrete'){
        this.router.navigate(['seive']);
      }

    }
  }
}
