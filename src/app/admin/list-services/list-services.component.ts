import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tService } from '../../models/service';
import { WWDOService } from '../../services/wwdo.service';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

@Component({
  selector: 'app-list-services',
  templateUrl: './list-services.component.html',
  styleUrls: ['./list-services.component.scss']
})
export class ListServicesComponent implements OnInit {
  services$: Observable<tService[]>;
  constructor(private wwdo: WWDOService, private _router: Router) { }

  removeService(id, image){
    // console.log(id);
    let confirmation = confirm("Are you sure you want to delete this service ?");
    if(confirmation){
      this.wwdo.deleteService(id).then(()=>{
        this.wwdo.removeServiceImage(image);
        this._router.navigate(["../admin/dashboard/?", {display: "services"}]);
      }).catch(err=>{
        console.log(err);
      });
    }
  }
  goToUpdate(service){
    this._router.navigate(["/admin/services/edit/?", {name: service.service_name, id: service.id}])
  }
  ngOnInit() {
    this.services$ = this.wwdo.getServices().map(snapshot =>{
      return snapshot.map(s => {
        let data = s.payload.doc.data() as tService;
        let id = s.payload.doc.id;
        // console.log({id, ...data});
        return {id, ...data};
      })
    });
  }

}
