import { Injectable } from '@angular/core';

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

  API_KEY: string = 'yI91dhkKuGjCZFNSXzNNwuejIJMU4tOw';
  MLAB_URL: string = 'https://api.mlab.com/api/1/databases/voting-app/collections/users?apiKey=';

  constructor(public af: AngularFireAuth) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.email = firebase.auth().currentUser.email;
        this.getUserDataFromDB();
      }
    });
  }

  getUserDataFromDB(): void {
    fetch(this.MLAB_URL + this.API_KEY).then(res => {
      res.json().then(data => {
        data.map(user => {
          if (user.email === this.email) {
            this.voted = user.voted;
            this.votedOption = user.votedOption;
            this.id =  user._id.$oid;
          }
        });
      })
    });
  }

}
