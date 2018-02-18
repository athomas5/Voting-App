import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { MLabService } from '../m-lab.service';
import { UserDataService } from '../user-data.service';

// Firebase
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'sym-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('emailRef') emailRef: ElementRef;
  @ViewChild('passwordRef') passwordRef: ElementRef;
  user: Observable<firebase.User>;
  errorMessage: string;

  constructor(public af: AngularFireAuth, private router: Router, private mLab: MLabService, private userDataService: UserDataService) { }

  ngOnInit() {
    this.af.authState.subscribe(auth => {
      if (auth != null) {
        this.user = this.af.authState;
        this.router.navigate(['/home']);
      }
    });
    console.log(this.userDataService.email);
  }

  // Enter key: Eventlistener
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.signIn();
    }
  }

  signIn(): void {
    firebase.auth().signInWithEmailAndPassword(this.emailRef.nativeElement.value, this.passwordRef.nativeElement.value)
      .catch(error => {
        this.displayErrorMessage(error);
    });
  }

  signUp(): void {
    firebase.auth().createUserWithEmailAndPassword(this.emailRef.nativeElement.value, this.passwordRef.nativeElement.value)
      .then(() => {
        this.addNewUserToDB();
      }).catch(error => {
        this.displayErrorMessage(error);
    });
  }

  addNewUserToDB(): void {
    fetch(this.mLab.GET_USERS_URL + this.mLab.API_KEY, {
      method: 'POST',
      body: JSON.stringify({ "email": this.emailRef.nativeElement.value, "voted": false, "votedOption": null }), 
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => res.json())
    .catch(error => {
      this.displayErrorMessage(error);
    });
  }

  displayErrorMessage(error): void {
    this.errorMessage = error.message;
      setTimeout(() => {
        this.errorMessage = '';
    }, 4000);
  }

}
