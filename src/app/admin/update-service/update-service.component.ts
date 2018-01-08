import { Component, OnInit, Input, HostListener } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { FormBuilder, FormControl, FormGroup, Validator } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { tService } from '../../models/service';
import { WWDOService } from '../../services/wwdo.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-update-service',
  templateUrl: './update-service.component.html',
  styleUrls: ['./update-service.component.scss']
})
export class UpdateServiceComponent implements OnInit {
  @Input() updateId;
  newServiceForm: FormGroup;
  errMsg: string;
  progress;
  upImage: string;
  constructor(private af: AngularFirestore, private FB: FormBuilder, private wwdo:WWDOService,
  private _router: Router, private route: ActivatedRoute) {
    this.formFunction()
  }

  formFunction(){
    this.newServiceForm = this.FB.group({
      service_name: [""],
      short_description: [""],
      long_description: [""],
      service_image: [""],
      image_name: [""],
      publish: ['']
    });
  }
  updateService(data){
    // console.log(data);
    let id = this.updateId;
    this.wwdo.updateService(id, data).then(()=>{
      this._router.navigate(["/admin/dashboard/?", {display: "services"}]);
    }).catch(err=>{
      console.log(err);
    });
  }
  @HostListener('change', ['event']) onImageLoad(e){
    // console.log(e.target.files[0]);
    let file = e.target.files[0];
    e.preventDefault();
    e.stopPropagation();
    this.uploadImage(file);
  }

  // addData(){
  //   let service = this.af.collection('services');
  //   service.add({
  //     title: "Security Guard",
  //     description: "Providing services for public sector"
  //   })
  //   .then(()=>{
  //     console.log("Service added");
  //   })
  //   .catch((err)=> {
  //     console.log("Cought Error: ", err);
  //   });
  // }
  uploadImage(data){
    // File or Blob named mountains.jpg
    let storageRef: any = firebase.storage();
    let file = data;

    // Create the file metadata
    let metadata = {
      contentType: 'image/jpeg'
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    let uploadTask = storageRef.ref('images/services/' + file.name).put(file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + this.progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, (error) => {

      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          this.errMsg = "you don't have permission to upload image";
          // User doesn't have permission to access the object
          break;

        case 'storage/canceled':
          // User canceled the upload
          this.errMsg = "Upload process canceled";
          break;

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          this.errMsg = "Fetal Error just occur";
          break;
      }
    }, () => {
      // Upload completed successfully, now we can get the download URL
      let downloadURL = uploadTask.snapshot.downloadURL;
      this.upImage = uploadTask.snapshot.downloadURL;
      this.newServiceForm.patchValue({
        service_image: downloadURL,
        image_name: file.name
      });
      this.progress = false;
    });
  }
  ngOnInit() {
    this.route.paramMap.subscribe((param)=> {
      let id = param.get('id');
      this.wwdo.getOneService(id).subscribe((service: tService)=> {
        // console.log(service);
        if(service){
          this.upImage = service.service_image;
          this.newServiceForm.patchValue({
            service_name: service.service_name,
            short_description: service.short_description,
            long_description: service.long_description,
            service_image: service.service_image,
            image_name: service.image_name || null
            // publish: service.publish
          });
        }
      }, ((err) => {
        console.log(err);
      }));
    }, ((err) => {
      console.log(err);
    }));
  }

}
