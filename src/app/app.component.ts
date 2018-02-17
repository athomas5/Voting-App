import { Component, OnInit } from '@angular/core';
import { VotingDataService } from './voting-data.service';
import { UserDataService } from './user-data.service';


@Component({
  selector: 'sym-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [VotingDataService, UserDataService]
})
export class AppComponent implements OnInit {
  API_KEY: string = 'yI91dhkKuGjCZFNSXzNNwuejIJMU4tOw';
  MLAB_URL: string = 'https://api.mlab.com/api/1/databases/voting-app/collections/options?apiKey=';

  constructor(private votingDataService: VotingDataService, private userDataService: UserDataService) { }

  ngOnInit(): void {
    this.getOptionsFromDB();
  }

  getOptionsFromDB(): void {
    fetch(this.MLAB_URL + this.API_KEY).then(res => {
      res.json().then(data => {
        this.votingDataService.options = data;
        this.votingDataService.sortOptions();
      })
    });
  }
}
