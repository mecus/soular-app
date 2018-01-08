import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { WWDOService } from '../../services/wwdo.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  service$: Observable<any>;
  constructor(private af:AngularFirestore, private wwdo:WWDOService, private _router: Router) { }

  goToService(id, name){
    this._router.navigate(["/ss/service/?", {id: id, service: name}]);
  
  }

  ngOnInit() {
    this.service$ = this.wwdo.getServices().map(snapshot => {
      return snapshot.map(s => {
        let data = s.payload.doc.data();
        let id = s.payload.doc.id;
        return {id: id, ...data};
      });
    });
  }

}
