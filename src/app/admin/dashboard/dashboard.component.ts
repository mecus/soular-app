import { Component, OnInit } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboard:boolean =false;
  updateid; applicandId;
  today = Date.now();
  loading: boolean = false;
  services:boolean = false; newService: boolean = false;
  updateService: boolean = false; application:boolean = false;
  users:boolean = false; applicant: boolean = false;
  currentUser;
  constructor(private route:ActivatedRoute, private authService:AuthService, private _router: Router) {

   }
   loadItem(e){
     e.preventDefault();
     e.stopPropagation();
    // console.log(e.target.id);
    this.dashboard = false;
    this.services = false;
    this.newService = false;
    this.updateService = false;
    this.application = false;
    this.users = false;
    this.applicant = false;
    this.loading = true;
    let service = e.target.id;
    this._router.navigate(["../admin/dashboard/?", {display: service}]);
    setTimeout(()=>{
      this.navigationControl();
      this.loading = false;
    }, 300);
   }

   navigationControl(){
    let param = this.route.params.forEach(param => {
      // console.log(param['name']);
      let pam = param['display'];
      let id = param['id'];
      // setTimeout(()=>{
      //   this.loading = false;
      // }, 500)
      switch(pam){
        case "dashboard":
          this.dashboard = true;
          break;
        case  "services":
          this.services = true;
          this.updateService = false;
          this.newService = false;
          break;
        case "new_service":
          this.newService = true;
          this.services = false;
          break;
        case "update_service":
          this.updateid = id;
          this.updateService = true;
          this.services = false;
          break;
        case "applications": 
          this.application = true;
          this.applicant = false;
          break;
        case "applicant":
          this.applicant = true;
          this.applicandId = id;
          this.application = false;
          break;
        case "users":
          this.users = true;
      }
        
    });
   }
  ngOnInit() {
    this.authService.authUserState().subscribe((user) => {
      this.currentUser = user;
    },(err) => {
      console.log(err);
    });
    setTimeout(()=>{
      this.navigationControl();
    }, 100);
  }

}
