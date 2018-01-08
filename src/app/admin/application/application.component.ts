import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app-service';
import { Observable } from 'rxjs/Observable';
import { tApplicant } from '../../models/application';
import { Router } from '@angular/router';
declare let $:any;


@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {
  applications$;
  constructor(private appService: AppService, private _router: Router) { }

  viewApplicant(candidate){
    this._router.navigate(["/admin/applicant/" + candidate.id]);
  }

  ngOnInit() {
    this.applications$ = this.appService.getApplications().map(snapshot => {
      return snapshot.map(ap =>{
        let data = ap.payload.doc.data();
        let id = ap.payload.doc.id;
        let byear = 2000;
        // let currentYear = Date.now();
        // console.log(currentYear);
        if(data.birthday){
          byear = data.birthday['year']
        }
        let age = 2018 - Number(byear);
        return {id, age, ...data};
      });
    });
    $(document).ready(function() {
      $('select').material_select();
    });
  }

}
