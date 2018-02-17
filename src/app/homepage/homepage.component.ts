import { Component, OnInit } from '@angular/core';
import { VotingDataService } from '../voting-data.service';
import { Router } from '@angular/router';

// Firebase
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'sym-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  email: string;

  constructor(public af: AngularFireAuth, 
    public votingDataService: VotingDataService,
    public userDataService: UserDataService,
    private router: Router) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.email = userDataService.email;
        }
      });
      
    }

  ngOnInit() { }

  signOut(): void {
    firebase.auth().signOut().then(() => {
      this.router.navigate(['']);
    }).catch(function(error) {
      console.log(error.code + ': ' + error.message);
    });
  }

}
