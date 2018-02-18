import { Injectable } from '@angular/core';

import { MLabService } from './m-lab.service';

// Firebase
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserDataService {
  id: string;
  email: string;
  voted: boolean;
  votedOption: string;

  constructor(public af: AngularFireAuth, private mLab: MLabService) { }

  getUserDataFromDB() {
    fetch(this.mLab.GET_USERS_URL + this.mLab.API_KEY).then(res => {
      res.json().then(data => {
        data.map(user => {
          console.log(user);
          if (user.email === this.email) {
            this.voted = user.voted;
            this.votedOption = user.votedOption;
            this.id = user._id.$oid;
          }
        });
      })
    });
  }

}
