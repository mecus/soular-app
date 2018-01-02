import { Injectable } from '@angular/core';
import { AngularFirestore, 
  AngularFirestoreDocument, 
  AngularFirestoreCollection 
} from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { tApplicant } from '../models/application';

@Injectable()
export class AppService {
  applications: AngularFirestoreCollection<tApplicant>;
  constructor(private afs: AngularFirestore) { 
    this.applications = afs.collection<tApplicant>('applications');
  }

  sendApplication(applicant){
    return this.applications.add(applicant);
  }
  getApplications(){
    return this.applications.snapshotChanges();
  }
  getApplicant(uid){
    return this.applications.doc(uid).snapshotChanges();
  }
}
