import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SvgComponent } from './svgs/svg/svg.component';
import { HomepageComponent } from './homepage/homepage.component';
import { VotingOptionComponent } from './voting-option/voting-option.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomepageComponent }
];

export const firebaseConfig = {
  apiKey: "AIzaSyD--S_fNlm6V3voKte2XDvKCkotfpDAWjU",
  authDomain: "voting-app-c35f2.firebaseapp.com",
  databaseURL: "https://voting-app-c35f2.firebaseio.com",
  projectId: "voting-app-c35f2",
  storageBucket: "",
  messagingSenderId: "717992199863"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SvgComponent,
    HomepageComponent,
    VotingOptionComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
