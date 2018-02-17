import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserDataService } from '../user-data.service';
import { VotingDataService } from '../voting-data.service';

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
  email: string;
  totalVotes: number;

  constructor(
    public af: AngularFireAuth,
    public votingDataService: VotingDataService,
    public userDataService: UserDataService,
    private router: Router) { }

  ngOnInit() { }

  ngAfterContentChecked() {
    this.email = this.userDataService.email;
    this.totalVotes = this.getTotalVotes();
  }

  signOut(): void {
    firebase.auth().signOut().then(() => {
      this.router.navigate(['']);
    }).catch(function (error) {
      console.log(error.code + ': ' + error.message);
    });
  }

  getTotalVotes(): number {
    let totalVotes = 0;
    this.votingDataService.options.map(option => {
      totalVotes += option.votes;
    });
    return totalVotes;
  }

}
