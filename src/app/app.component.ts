import { Component, OnInit } from '@angular/core';
import { VotingDataService } from './voting-data.service';
import { UserDataService } from './user-data.service';
import { MLabService } from './m-lab.service';

@Component({
  selector: 'sym-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [VotingDataService, UserDataService, MLabService]
})
export class AppComponent implements OnInit {

  constructor(
    private votingDataService: VotingDataService,
    private userDataService: UserDataService,
    private mLab: MLabService) { }

  ngOnInit(): void {
    this.getOptionsFromDB();
  }

  getOptionsFromDB(): void {
    fetch(this.mLab.GET_OPTIONS_URL + this.mLab.API_KEY).then(res => {
      res.json().then(data => {
        this.votingDataService.options = data;
        this.votingDataService.sortOptions();
      })
    });
  }
}
