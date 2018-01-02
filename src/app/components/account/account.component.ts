import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
declare let $:any;


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  passwordForm: FormGroup;
  addressForm: FormGroup;
  personalForm: FormGroup;
  siaForm: FormGroup;
  currentUser;
  account;
  incompletAccountMsg;
  siaFile;
  fileName;
  flash;
  flashCounter;
  constructor(private authService: AuthService, private fb:FormBuilder) {
    this.personalForm = fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: [""],
      phoneNumber: [""],
    })
    this.passwordForm = fb.group({
      oldPassword: [""],
      newPassword: [""],
      repeatPassword: [""]
    });
    this.addressForm = fb.group({
      houseNo: [""],
      street: [""],
      county: [""],
      postCode: [""],
      country: ["United Kingdom"]
    });
    this.siaForm = fb.group({
      siaNumber: [""],
      imageUrl: [""],
      imageName: [""],
      expires: [""]
    });
   }
   @HostListener('change', ['$vent']) newSiaCard(e: any){
     if(!e.target.files.length){
       return;
     }
     e.preventDefault();
     e.stopPropagation();
     if(e.target.files.length){
      console.log(e.target.files[0]);
      this.siaFile = e.target.files[0];
      this.fileName = e.target.files[0].name;
     }
   }

   // Form manipulation methods
   personalDetail(update){
     if(!update.firstName){
       return;
     }
    //  console.log(update);
     this.authService.updateUserAccount(this.currentUser.uid, update)
     .then((res) => {
      // Flash notice
      setTimeout(()=>{
        this.flash = {
          counter: this.flashCounter,
          timeout: "3000",
          text: "Your account information was successfully updated",
          textColor: "#ffffff",
          background: "rgba(3,97,22, 0.8)"
        }
      }, 2000);
      this.flashCounter++;
      // console.log(res);
     })
     .catch((err) => {
      console.log(err);
     });
   }
   changePassword(password){
     console.log(password);
   }
   addressUpdate(address){
     console.log(address);
   }
   siaLicenseUpdate(sia){
    console.log(sia);
   }

  ngOnInit() {
    this.authService.authUserState().subscribe((user)=>{
      if(user){
        this.currentUser = user;
        this.authService.getUserAccount(user.uid)
        .map(snapshot => {
          if(snapshot.payload.exists == false){
            return {msg: "Account not exists"};
          }
            let id = snapshot.payload.id;
            let data = snapshot.payload.data();
            return {id, ...data};
        }).subscribe((account) => {
          if(account.msg == "Account not exists"){
            return this.incompletAccountMsg = "Please complete all sections of your account details!.";
          }
          console.log(account);
          this.account = account;

          // Patching view forms
          this.personalForm.patchValue({
            firstName: account.firstName,
            lastName: account.lastName,
            email: account.email,
            phoneNumber: account.phoneNumber,
          });
          if(account.address){
            this.addressForm.patchValue({
              houseNo: account.address.houseNo,
              street: account.address.street,
              county: account.address.county,
              postCode: account.address.postCode,
              country: "United Kingdom"
            });
          }
          if(account.siaCard){
            this.fileName = account.siaCard.imageName
            this.siaForm.patchValue({
              siaNumber: account.siaCard.siaNumber, 
              expires: account.siaCard.expires,
              imageUrl: account.siaCard.imageUrl,
              imageName: account.siaCard.imageName,

            });
          }
        }, (err) => {
          console.log(err);
        });
      }
    }, (err)=> {
      console.log(err);
    });

    $(document).ready(() => {
      $('.collapsible').collapsible();
    });
  }

}
