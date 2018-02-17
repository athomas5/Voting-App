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

  API_KEY: string = 'yI91dhkKuGjCZFNSXzNNwuejIJMU4tOw';
  MLAB_URL: string = 'https://api.mlab.com/api/1/databases/voting-app/collections/users?apiKey=';

  constructor(public af: AngularFireAuth, private router: Router) {
    this.af.authState.subscribe(auth => {
      if (auth != null) {
        this.user = af.authState;
        this.router.navigate(['/home']);
      }
    });
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
      .then(() => {
        this.addNewUserToDB();
      }).catch(error => {
        if (error.code == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(error.message);
        }
        console.log(error);
    });
  }

  addNewUserToDB(): void {
    fetch(this.MLAB_URL + this.API_KEY, {
      method: 'POST',
      body: JSON.stringify({ "email": firebase.auth().currentUser.email, "voted": false, "votedOption": null }), 
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
  }

}
