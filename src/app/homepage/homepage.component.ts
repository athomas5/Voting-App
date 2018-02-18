import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserDataService } from '../user-data.service';
import { VotingDataService } from '../voting-data.service';
import { MLabService } from '../m-lab.service';

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
  dataLoaded: boolean = false;
  email: string;
  totalVotes: number;

  constructor(
    public af: AngularFireAuth,
    public votingDataService: VotingDataService,
    public userDataService: UserDataService,
    private router: Router,
    private mLab: MLabService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(): void {
    this.getOptionsFromDB();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.userDataService.email = firebase.auth().currentUser.email;
        this.userDataService.getUserDataFromDB();
      }
    });
    setTimeout(() => {  
      this.dataLoaded = true;
    }, 1000);
  }

  getOptionsFromDB() {
    fetch(this.mLab.GET_OPTIONS_URL + this.mLab.API_KEY).then(res => {
      res.json().then(data => {
        this.votingDataService.options = data;
        this.votingDataService.sortOptions();
      })
    });
  }

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
