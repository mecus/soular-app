import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

declare let $:any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users$;
  accessForm:boolean = false;
  selectedUser;
  constructor(private authService: AuthService, private _router: Router) { }
  getForm(user){
    this.accessForm = true;
    this.selectedUser = user;
    $(document).ready(() => {
      $('select').material_select();
    });
  }
  closeForm(){
    this.accessForm = false;
  }
  setPrivilege(access){
    if(!access) {return;}
    // console.log(access+" "+this.selectedUser.uid);
    let user = {
      uid: this.selectedUser.uid,
      privilege: access
    }
    this.authService.setUserPrivilege(user)
    .subscribe((res) => {
      this._router.navigate(["/admin/dashboard/?", {display: "user"}]);
      this.accessForm = false;
    });
  }
  deleteUser(user){
    console.log(user);
  }
  ngOnInit() {
    this.authService.listAllUsers().subscribe((users: any)=> {
      console.log(users.users);
      this.users$ = users.users;
    });
  }
}
