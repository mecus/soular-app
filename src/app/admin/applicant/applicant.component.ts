import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { AppService } from '../../services/app-service';
declare let $:any;

@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.scss']
})
export class ApplicantComponent implements OnInit {
  applicant$;
  constructor(private _router: Router, 
    private appService: AppService,
    private route:ActivatedRoute) { }

  printPage(){
    // let body = document.getElementsByName('body');
    window.print();
  }
  ngOnInit() {
    this.route.paramMap.subscribe((param) => {
      let id = param.get('id');
      this.applicant$ = this.appService.getApplicant(id).map((snapshot) => {
        if(snapshot.payload.exists == true){
          let data = snapshot.payload.data();
          let id = snapshot.payload.id;
          return {id, ...data};
        }
      });
    });


    $(document).ready(() => {
      $('select').material_select();
    });

  }

}