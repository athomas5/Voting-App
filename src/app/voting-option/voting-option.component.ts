import { Component, OnInit, Input } from '@angular/core';
import { VotingDataService } from '../voting-data.service';

@Component({
  selector: 'sym-voting-option',
  templateUrl: './voting-option.component.html',
  styleUrls: ['./voting-option.component.scss']
})
export class VotingOptionComponent implements OnInit {
  @Input('name') name: string;
  @Input('votes') votes: number;
  active: boolean = false;

  constructor(private votingDataService: VotingDataService) { }

  ngOnInit() {
  }

  getOptionIndex(): number {
    for (let i = 0; i < this.votingDataService.options.length; i++) {
      if (this.votingDataService.options[i].name === this.name) {
        return i;
      }
    }
  }

}
