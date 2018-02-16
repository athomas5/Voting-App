import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class VotingDataService implements OnInit {
  options: any = [];
  totalVotes: number;
  API_KEY: string = 'yI91dhkKuGjCZFNSXzNNwuejIJMU4tOw';
  MLAB_URL: string = 'https://api.mlab.com/api/1/databases/voting-app/collections/options/';

  constructor() { }

  ngOnInit() { }

  addVote(index: number): void {
    this.options[index].votes++;
    this.updateVotesInDB(index);
    this.sortOptions();
  }

  updateVotesInDB(index: number): void {
    fetch(this.MLAB_URL + this.options[index]._id.$oid + '?apiKey=' + this.API_KEY, {
      method: 'PUT',
      body: JSON.stringify(this.options[index]), 
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
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
