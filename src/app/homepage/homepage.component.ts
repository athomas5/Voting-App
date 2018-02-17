import { Component, OnInit } from '@angular/core';
import { VotingDataService } from '../voting-data.service';
import { Router } from '@angular/router';

// Firebase
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'sym-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(public af: AngularFireAuth, 
    public votingDataService: VotingDataService,
    private router: Router) { }

  ngOnInit() { }

  signOut(): void {
    firebase.auth().signOut().then(() => {
      this.router.navigate(['']);
    }).catch(function(error) {
      console.log(error.code + ': ' + error.message);
    });
  }

}
