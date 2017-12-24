import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { tService } from '../models/service';
import * as firebase from 'firebase';

@Injectable()

export class WWDOService {
    serviceCollection;
    constructor(private af:AngularFirestore){
        this.serviceCollection = af.collection('services');
    }

    createService(data){
        let serviceTable =  this.af.collection('services');
        return serviceTable.add(data)
        .then(()=>{
            console.log("One Service Added");
        })
        .catch((err)=>{
            console.log(err);
        });
    }
    getServices(){
        let serviceTable =  this.af.collection<tService>('services');
        return serviceTable.snapshotChanges();
    }
    getOneService(id){
        let service = this.af.collection<tService>('services').doc(id);
        return service.valueChanges();
    }
    updateService(id, data){
        // console.log({id, ...data});
        let service = this.af.collection<tService>('services').doc(id);
        return service.update(data).then(ref => {
            console.log("Service Updated");
        }).catch(err => {
            console.log(err);
        });
    }
    deleteService(id){
        // console.log(id);
        let service = this.af.collection<tService>('services').doc(id);
        return service.delete().then(ref => {
            console.log("Service Deleted");
        }).catch(err => {
            console.log(err);
        });
    }
    removeServiceImage(image){
        let storageDelRef: any = firebase.storage().ref();
        let removeImage = storageDelRef.child("images/services/"+image);
        removeImage.delete().then(()=>{
          console.log("Cloud: Service image successfully removed");
        }).catch(err => {
          console.log(err);
        });
    
      }
}