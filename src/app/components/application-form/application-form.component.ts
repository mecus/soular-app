import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { tApplicant } from '../../models/application';
import { AuthService } from '../../services/auth.service';
import { AppService } from '../../services/app-service';
import * as Async from 'async';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
declare let $:any;

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent implements OnInit, OnDestroy {
  application: FormGroup;
  siaFile;
  fileName = "file name";
  currentUser;
  progress;
  invaliMsg;
  constructor(
    private FB: FormBuilder, 
    private authService: AuthService,
    private appService: AppService,
    private _router: Router
  ) {
    $(document).ready(() => {
      $('select').material_select();
      $('select#day').change(e => {
        console.log(e.target.value);
        this.application.patchValue({
          birthday: {
            day: e.target.value
          }
        });
      });
      $('select#month').change(e => {
        console.log(e.target.value);
        this.application.patchValue({
          birthday: {
            month: e.target.value
          }
        });
      });
    }); 
    this.application = FB.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: [""],
      telephone: [""],
      houseNo: [""],
      address: [""],
      county: [""],
      postCode: [""],
      country: ["United Kingdom"],
      siaCard: [""],
      siaNumber: [""],
      ageLimit: [""],
      elegibility: [""],
      sex: [""],
      birthday: FB.group({
        day: "",
        month: "",
        year: ""
      })
  
    });
    
  }

  @HostListener('change', ['$event']) fileUpload(e: any){
    if(!e.target.files){
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    if(e.target.files.length){
      console.log(e);
      this.siaFile = e.target.files[0];
      this.fileName = e.target.files[0].name;
    }
  }
  appValue(applicant){
    // console.log(applicant);
    if(this.application.invalid){
      return this.invaliMsg = "your form is not valid";
    }
    if(this.siaFile && applicant){
      let storageRef = firebase.storage().ref();
      let file = this.siaFile;
      let metadata = {
        contentType: 'image/jpeg'
      };
      let userRef = applicant.firstName+applicant.birthday.year;
      // Upload file and metadata to the object 'images/mountains.jpg'
      var uploadTask = storageRef.child('applications/' + userRef + "/"+ file.name).put(file, metadata);
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot: any) => {
          this.progress = "Uploading Sia License Photo...";
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        }, (error: any) => {
          this.progress = "Error occur while uploading photo";
          setTimeout(()=>{
            this.progress = null;
          },5000);
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;

          case 'storage/canceled':
            // User canceled the upload
            break;

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, () => {
        this.progress = "Successfully uploaded photo";
        // Upload completed successfully, now we can get the download URL
        let downloadURL = uploadTask.snapshot.downloadURL;
        let application = {
          ...applicant,
          siaCard: downloadURL,
          image: this.siaFile.name,
          uid: this.currentUser.uid,
          submitedOn: Date.now()
        }
        let userUpd = {
          address: {
            houseNo: applicant.houseNo,
            street: applicant.address,
            county: applicant.county,
            postCode: applicant.postCode
          },
          siaCard: {
            siaNumber: applicant.siaNumber,
            imageUrl: downloadURL,
            imageName: this.siaFile.name,
            expires: "01/12/2020"
          },
          birthday: {
            day: applicant.birthday.day,
            month: applicant.birthday.month,
            year: applicant.birthday.year
          },
          sex: applicant.sex
        }
        this.progress = "Saving your data to the database...";
        this.appService.sendApplication(application)
        .then((res) => {
          // console.log(res);
          this.progress = "Updating your account info...";
          this.authService.updateUserAccount(this.currentUser.uid, userUpd)
          .then(ref => {
            this.progress = "Your application proccess was completed successfully.";
            setTimeout(()=>{
              this._router.navigate(["/career"]);
            }, 5000);
          })
          .catch(err => {
            this.progress = "Error while updating user information";
            setTimeout(()=>{
              this.progress = null;
            }, 5000);
            console.log(err);
          });

        }, (err) => {
          this.progress = err.message;
          setTimeout(()=>{
            this.progress = null;
          }, 5000);
          console.log(err);
        });    
      });
    }
  }

  ngOnInit() {
    this.authService.authUserState()
    .subscribe((user) => {
      this.currentUser = user;
      this.application.patchValue({
        email: user.email,
        telephone: user.phoneNumber,
      });
    }, (err) => {
      console.log(err);
    });
  }
  ngOnDestroy() {
    $('select').material_select('destroy');
  }

}
