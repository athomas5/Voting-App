import { Component, OnInit, Input, ViewChild, ElementRef, AfterContentChecked } from '@angular/core';
import { VotingDataService } from '../voting-data.service';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'sym-voting-option',
  templateUrl: './voting-option.component.html',
  styleUrls: ['./voting-option.component.scss']
})
export class VotingOptionComponent implements OnInit, AfterContentChecked {
  @ViewChild('barProgressRef') barProgressRef: ElementRef;
  @Input('name') name: string;
  @Input('votes') votes: number;
  active: boolean = false;

  constructor(public votingDataService: VotingDataService, public userDataService: UserDataService) { }

  ngOnInit() {
    this.updateBarProgress();
   }

  ngAfterContentChecked() {
    this.active = (this.userDataService.votedOption === this.name) ? true : false;
    this.updateBarProgress()
  }

  updateBarProgress(): void {
    let percentage = 100 * (this.votingDataService.options[this.getOptionIndex()].votes / this.getTotalVotes());
    this.barProgressRef.nativeElement.style.width = percentage + '%';
  }

  getTotalVotes(): number {
    let totalVotes = 0;

    this.votingDataService.options.map(option => {
      totalVotes += option.votes;
    });
    return totalVotes;
  }

  getOptionIndex(): number {
    for (let i = 0; i < this.votingDataService.options.length; i++) {
      if (this.votingDataService.options[i].name === this.name) {
        return i;
      }
    }
  }

}
