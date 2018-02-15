import { Component, OnInit, Input } from '@angular/core';

export type svgOption = 'User' | 'Password';

@Component({
  selector: 'sym-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.scss']
})
export class SvgComponent implements OnInit {
  @Input() svgName: svgOption;
  @Input() style: 'light';

  constructor() { }

  ngOnInit() {
  }

}
