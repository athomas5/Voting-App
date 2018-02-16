import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingOptionComponent } from './voting-option.component';

describe('VotingOptionComponent', () => {
  let component: VotingOptionComponent;
  let fixture: ComponentFixture<VotingOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotingOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
