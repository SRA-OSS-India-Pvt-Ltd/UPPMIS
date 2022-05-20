/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpcallsserviceService {

  constructor(public httpClient: HttpClient) {}

  logionService(username: any, password: any, type: any,deviid) {
    const parameters = { empusername: username, empuserpwd: password,logintype: type,device_id: deviid };
    console.log('JSON', JSON.stringify(parameters));

    return this.httpClient.post(
      `${environment.apiUrl}/emplogin`,
      JSON.stringify(parameters)
    );
  }
  updatedeviceid(empid: any,type: any,devid: any) {
    const parameters = { id: empid,logintype: type,device_id:devid};
    console.log('JSON', JSON.stringify(parameters));

    return this.httpClient.post(
      `${environment.apiUrl}/update_deviceid`,
      JSON.stringify(parameters)
    );
  }

  getSchemeDetails(empid: any) {
    const parameters = { emp_id: empid};
    console.log('JSON', JSON.stringify(parameters));

    return this.httpClient.post(
      `${environment.apiUrl}/getSchemeDetails`,
      JSON.stringify(parameters)
    );
  }

  addSlitContent(workid: any,empid: any,dateoftest: any,stagework: any,matetype: any,samplevl1: any,
    samplevl2: any,slitvol1: any,slitvol2: any,to1: any,t2: any,avg: any,rems: any,pt1: any,
    pt2: any,empsign: any,contname: any,contsign: any,upjnname: any,upjnsign: any) {
    const parameters = {work_id:workid, emp_id: empid,date_of_testing: dateoftest,stage_work:stagework,
      material_type: matetype,sample_vol1: samplevl1,sample_vo12: samplevl2,slit_vol1: slitvol1,
      slit_vol2: slitvol2,tot1: to1,tot2: t2,avg_result: avg,remarks: rems,photo1:pt1,
      photo2: pt2,emp_sign: empsign,cont_agency_name: contname,cont_agency_sign: contsign,
      upjn_name: upjnname,upjn_sign: upjnsign};
    console.log('JSON', JSON.stringify(parameters));

    return this.httpClient.post(
      `${environment.apiUrl}/addSlitContent`,
      JSON.stringify(parameters)
    );
  }
  addSlumpTest(workid: any,empid: any,dateoftest: any,grades: any,stagework: any,
    ht: any,slumpdiff: any,
    rems: any,pt1: any,
    pt2: any,empsign: any,contname: any,contsign: any,upjnname: any,upjnsign: any) {
    const parameters = {work_id:workid, emp_id: empid,date_of_testing: dateoftest,grade: grades,
      stage_work:stagework,height: ht,slump_diff: slumpdiff,
      remarks: rems,photo1:pt1,
      photo2: pt2,emp_sign: empsign,cont_agency_name: contname,cont_agency_sign: contsign,
      upjn_name: upjnname,upjn_sign: upjnsign};
    console.log('JSON', JSON.stringify(parameters));

    return this.httpClient.post(
      `${environment.apiUrl}/addSlumpTest`,
      JSON.stringify(parameters)
    );
  }

  addCC_Cube_28Test(workid: any,empid: any,deptname: any,qunt: any,grades: any,stagework: any,
    castdate1: any,testdate1: any,age1: any,den1,lod1: any,str1: any,avg: any,charstr1: any,
    smpl1: any,
    castdate2: any,testdate2: any,age2: any,den2,lod2: any,str2: any,charstr2: any,smpl2: any,
    castdate3: any,testdate3: any,age3: any,den3,lod3: any,str3: any,charstr3: any,smpl3: any,
    rems: any,pt1: any,
    pt2: any,empsign: any,contname: any,contsign: any,upjnname: any,upjnsign: any) {
    const parameters = {work_id:workid, emp_id: empid,dept_name: deptname,quantity:qunt,
      grade: grades,stage_work:stagework,
      casting_date1: castdate1,testing_date1:testdate1,cube_age1:age1,density1:den1,load1:lod1,strength1: str1,avg1: avg,char_strength1:charstr1,sample1: smpl1,
      casting_date2: castdate2,testing_date2:testdate2,cube_age2:age2,density2:den2,load2:lod2,strength2: str2,char_strength2:charstr2,sample2: smpl2,
      casting_date3: castdate3,testing_date3:testdate3,cube_age3:age3,density3:den3,load3:lod3,strength3: str3,char_strength3:charstr3,sample3: smpl3,
     remarks: rems,photo1:pt1,
      photo2: pt2,emp_sign: empsign,cont_agency_name: contname,cont_agency_sign: contsign,
      upjn_name: upjnname,upjn_sign: upjnsign};
    console.log('JSON', JSON.stringify(parameters));

    return this.httpClient.post(
      `${environment.apiUrl}/addCC_Cube_28Test`,
      JSON.stringify(parameters)
    );
  }

}
