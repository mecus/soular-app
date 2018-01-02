import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app-service';
import { Observable } from 'rxjs/Observable';
import { tApplicant } from '../../models/application';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {
  applications$;
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.applications$ = this.appService.getApplications().map(snapshot => {
      return snapshot.map(ap =>{
        let data = ap.payload.doc.data();
        let id = ap.payload.doc.id;
        return {id, ...data};
      });
    });
  }

}
