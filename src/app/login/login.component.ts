import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(public af: AngularFireAuth, private router: Router) {
    this.af.authState.subscribe(auth => {
      console.log(auth);
      if (auth != null) {
        this.user = af.authState;
        this.router.navigate(['/home']);
      }
    });
    console.log(af.authState);
   }

  ngOnInit() { }

  signIn(): void {
    firebase.auth().signInWithEmailAndPassword(this.emailRef.nativeElement.value, this.passwordRef.nativeElement.value)
      .catch(function(error) {
        console.log(error.code + ': ' + error.message);
    });
  }

  signUp(): void {
    firebase.auth().createUserWithEmailAndPassword(this.emailRef.nativeElement.value, this.passwordRef.nativeElement.value)
      .catch(error => {
        console.log(error.code + ': ' + error.message);
    });
  }

}
