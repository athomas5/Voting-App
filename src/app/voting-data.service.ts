import { Injectable, OnInit } from '@angular/core';
import { UserDataService } from './user-data.service';

@Injectable()
export class VotingDataService implements OnInit {
  options: any = [];
  totalVotes: number;
  API_KEY: string = 'yI91dhkKuGjCZFNSXzNNwuejIJMU4tOw';
  MLAB_URL_OPTIONS: string = 'https://api.mlab.com/api/1/databases/voting-app/collections/options/';
  MLAB_URL_USERS: string = 'https://api.mlab.com/api/1/databases/voting-app/collections/users/';
  MLAB_URL: string = 'https://api.mlab.com/api/1/databases/voting-app/collections/users?apiKey=';

  constructor(private userDataService: UserDataService) { }

  ngOnInit() { }

  addVote(index: number): void {
    if (this.userDataService.votedOption !== this.options[index].name) {
      this.options[index].votes++;
      if (this.userDataService.voted) {
        this.removePreviousOption();
      }
      this.updateVotesInDB(index);
      this.updateUserDataInDB(index);
      this.sortOptions();
    }
  }

  updateUserDataInDB(index: number): void {
    let userObject = {
      "_id": {
          "$oid": this.userDataService.id
      },
      "email": this.userDataService.email,
      "voted": true,
      "votedOption": this.options[index].name
    }

    fetch(this.MLAB_URL_USERS + this.userDataService.id + '?apiKey=' + this.API_KEY, {
      method: 'PUT',
      body: JSON.stringify(userObject), 
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => res.json())
    .then(() => this.userDataService.getUserDataFromDB())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
  }

  updateVotesInDB(index: number): void {
    fetch(this.MLAB_URL_OPTIONS + this.options[index]._id.$oid + '?apiKey=' + this.API_KEY, {
      method: 'PUT',
      body: JSON.stringify(this.options[index]), 
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
  }

  removePreviousOption(): void {
    for (let i = 0; i < this.options.length; i++) {
      if (this.options[i].name === this.userDataService.votedOption) {
        this.options[i].votes--;
      }
    }
  }
  
  sortOptions(): void {
    for (let i = 0; i < this.options.length; i++) {
      let temp = this.options[i];
      let j = i - 1;
      
      while (j >= 0 && this.options[j].votes < temp.votes) {
        this.options[j + 1] = this.options[j];
        j--;
      }
      this.options[j + 1] = temp;
    }
  }
}
