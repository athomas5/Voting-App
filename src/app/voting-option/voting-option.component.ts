import { Component, OnInit, Input, AfterContentChecked } from '@angular/core';
import { VotingDataService } from '../voting-data.service';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'sym-voting-option',
  templateUrl: './voting-option.component.html',
  styleUrls: ['./voting-option.component.scss']
})
export class VotingOptionComponent implements OnInit, AfterContentChecked {
  @Input('name') name: string;
  @Input('votes') votes: number;
  active: boolean = false;

  constructor(public votingDataService: VotingDataService, public userDataService: UserDataService) { }

  ngOnInit() { }

  ngAfterContentChecked() {
    this.active = (this.userDataService.votedOption === this.name) ? true : false;
  }

  getOptionIndex(): number {
    for (let i = 0; i < this.votingDataService.options.length; i++) {
      if (this.votingDataService.options[i].name === this.name) {
        return i;
      }
    }
  }

}
